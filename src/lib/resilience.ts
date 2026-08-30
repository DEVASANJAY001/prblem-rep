/**
 * Resilience & Fault-Tolerance Engine
 * Provides exponential backoff with full jitter to eliminate retry storms during traffic spikes.
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
  let timer: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(timeoutErrorMessage)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
}
