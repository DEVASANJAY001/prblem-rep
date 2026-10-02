/**
 * Resilience & Fault-Tolerance Engine
 * Provides exponential backoff with full jitter to eliminate retry storms during traffic spikes,
 * plus a Circuit Breaker that opens automatically after repeated failures to prevent
 * N independent components from hammering a degraded service simultaneously.
 */

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * Execute an async operation with exponential backoff and randomized jitter.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelayMs = 250,
    maxDelayMs = 4000,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Exponential backoff: baseDelay * 2^attempt
      const exponentialDelay = baseDelayMs * Math.pow(2, attempt - 1);
      // Full jitter: random between 0 and exponentialDelay to avoid synchronized thundering herd
      const jitteredDelay = Math.min(
        maxDelayMs,
        Math.random() * exponentialDelay
      );

      await new Promise((resolve) => setTimeout(resolve, jitteredDelay));
    }
  }
}

/**
 * Async timeout wrapper to prevent long-hanging connections
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 8000,
  timeoutErrorMessage: string = "Operation timed out"
): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(timeoutErrorMessage)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Circuit Breaker
// Prevents repeated calls to a consistently-failing service.
// States: CLOSED (normal) → OPEN (blocking) → HALF_OPEN (trial) → CLOSED/OPEN
// ─────────────────────────────────────────────────────────────────────────────

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface CircuitBreakerOptions {
  /** Number of consecutive failures before opening the circuit. Default: 5 */
  failureThreshold?: number;
  /** Milliseconds to keep the circuit OPEN before attempting a trial call. Default: 30s */
  recoveryTimeMs?: number;
  /** Human-readable name for logging. */
  name?: string;
}

export class CircuitBreaker {
  private state: CircuitState = "CLOSED";
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly failureThreshold: number;
  private readonly recoveryTimeMs: number;
  private readonly name: string;

  constructor(options: CircuitBreakerOptions = {}) {
    this.failureThreshold = options.failureThreshold ?? 5;
    this.recoveryTimeMs = options.recoveryTimeMs ?? 30_000;
    this.name = options.name ?? "CircuitBreaker";
  }

  /**
   * Execute fn through the circuit breaker.
   * Throws immediately with a CircuitOpenError when the circuit is OPEN.
   */
  public async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      const elapsed = Date.now() - this.lastFailureTime;
      if (elapsed < this.recoveryTimeMs) {
        throw new CircuitOpenError(
          `[${this.name}] Circuit is OPEN — service unavailable. Retry in ${Math.ceil((this.recoveryTimeMs - elapsed) / 1000)}s.`
        );
      }
      // Transition to HALF_OPEN for a single trial call
      this.state = "HALF_OPEN";
      console.info(`[${this.name}] Circuit → HALF_OPEN (trial call)`);
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess(): void {
    if (this.state !== "CLOSED") {
      console.info(`[${this.name}] Circuit → CLOSED (service recovered)`);
    }
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.state === "HALF_OPEN" || this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
      console.warn(
        `[${this.name}] Circuit → OPEN after ${this.failureCount} failure(s). ` +
          `Will retry in ${this.recoveryTimeMs / 1000}s.`
      );
    }
  }

  public getState(): CircuitState {
    return this.state;
  }

  /** Manually reset the circuit (useful for testing or forced recovery). */
  public reset(): void {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.lastFailureTime = 0;
  }
}

export class CircuitOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CircuitOpenError";
  }
}

/**
 * Pre-wired Firestore circuit breaker — shared across all service modules.
 * Import this instead of creating ad-hoc instances.
 */
export const firestoreCircuit = new CircuitBreaker({
  name: "Firestore",
  failureThreshold: 5,
  recoveryTimeMs: 30_000,
});
