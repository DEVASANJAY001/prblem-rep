/**
 * SWR (Stale-While-Revalidate) In-Memory Cache with Single-Flight Request Coalescing
 * Modeled after Amazon/Flipkart/Stripe high-efficiency client caching architecture.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class SWRCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private inFlight = new Map<string, Promise<any>>();
  private defaultTTL = 30_000; // 30 seconds default in-memory TTL

  /**
   * Get cached data if fresh; otherwise return stale data and revalidate in background.
   */
  public async fetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number = this.defaultTTL
  ): Promise<T> {
    const now = Date.now();
    const entry = this.cache.get(key);

    // 1. If fresh cache exists, return immediately (0ms, 0 network reads)
    if (entry && now < entry.expiresAt) {
      return entry.data;
    }

    // 2. Coalesce in-flight requests (if 10 components ask for "prob-1" simultaneously, run only 1 fetch)
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key)!;
    }

    // 3. If stale cache exists, return stale data immediately (Optimistic / Stale-While-Revalidate)
    // and quietly trigger the in-flight revalidation
    const fetchPromise = (async () => {
      try {
        const fresh = await fetcher();
        this.cache.set(key, {
          data: fresh,
          timestamp: Date.now(),
          expiresAt: Date.now() + ttlMs,
        });
        return fresh;
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, fetchPromise);

    if (entry) {
      // Revalidate in background, return stale immediately
      return entry.data;
    }

    return fetchPromise;
  }

  /**
   * Directly get from memory without async
   */
  public get<T>(key: string): T | undefined {
    return this.cache.get(key)?.data;
  }

  /**
   * Set cache entry directly (useful for optimistic updates)
   */
  public set<T>(key: string, data: T, ttlMs: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMs,
    });
  }

  /**
   * Invalidate specific key or prefix
   */
  public invalidate(keyOrPrefix: string): void {
    for (const k of this.cache.keys()) {
      if (k === keyOrPrefix || k.startsWith(keyOrPrefix)) {
        this.cache.delete(k);
      }
    }
  }

  /**
   * Clear all cache
   */
  public clear(): void {
    this.cache.clear();
    this.inFlight.clear();
  }
}

export const swrCache = new SWRCacheManager();
