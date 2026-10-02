/**
 * SWR (Stale-While-Revalidate) In-Memory Cache with Single-Flight Request Coalescing
 * and LRU (Least Recently Used) eviction to prevent unbounded memory growth.
 * Modeled after Amazon/Flipkart/Stripe high-efficiency client caching architecture.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  lastAccessed: number; // used for LRU eviction ordering
}

class SWRCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private inFlight = new Map<string, Promise<any>>();
  private defaultTTL = 30_000; // 30 seconds default in-memory TTL
  private maxEntries: number;

  constructor(maxEntries = 200) {
    this.maxEntries = maxEntries;
  }

  /**
   * Evict the least-recently-used entries when the cache exceeds maxEntries.
   * Called before every set() to keep memory footprint bounded.
   */
  private evictIfNeeded(): void {
    if (this.cache.size < this.maxEntries) return;

    // Sort entries by lastAccessed ascending (oldest first)
    const sorted = [...this.cache.entries()].sort(
      ([, a], [, b]) => a.lastAccessed - b.lastAccessed
    );

    // Evict the oldest 20% of entries
    const evictCount = Math.max(1, Math.floor(this.maxEntries * 0.2));
    for (let i = 0; i < evictCount; i++) {
      this.cache.delete(sorted[i][0]);
    }
  }

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
      entry.lastAccessed = now; // bump LRU position
      return entry.data;
    }

    // 2. Coalesce in-flight requests (if 10 components ask for "prob-1" simultaneously, run only 1 fetch)
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key)!;
    }

    // 3. If stale cache exists, return stale data immediately (Stale-While-Revalidate)
    // and quietly trigger the in-flight revalidation
    const fetchPromise = (async () => {
      try {
        const fresh = await fetcher();
        this.evictIfNeeded();
        this.cache.set(key, {
          data: fresh,
          timestamp: Date.now(),
          expiresAt: Date.now() + ttlMs,
          lastAccessed: Date.now(),
        });
        return fresh;
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, fetchPromise);

    if (entry) {
      // Revalidate in background, return stale immediately
      entry.lastAccessed = now;
      return entry.data;
    }

    return fetchPromise;
  }

  /**
   * Directly get from memory without async
   */
  public get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (entry) entry.lastAccessed = Date.now();
    return entry?.data;
  }

  /**
   * Set cache entry directly (useful for optimistic updates)
   */
  public set<T>(key: string, data: T, ttlMs: number = this.defaultTTL): void {
    this.evictIfNeeded();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMs,
      lastAccessed: Date.now(),
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

  /**
   * Returns cache stats for debugging / monitoring
   */
  public stats(): { size: number; inFlight: number; maxEntries: number } {
    return {
      size: this.cache.size,
      inFlight: this.inFlight.size,
      maxEntries: this.maxEntries,
    };
  }
}

export const swrCache = new SWRCacheManager(200);
