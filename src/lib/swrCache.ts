/**
 * SWR (Stale-While-Revalidate) Client Cache Manager
 * Multi-Tiered Architecture:
 *   Tier 1: High-Speed In-Memory LRU Cache (0ms, 0 allocations)
 *   Tier 2: SessionStorage Cache (Persists across page navigation & back/forward)
 *   Tier 3: Single-Flight Request Coalescing (Deduplicates simultaneous identical fetches)
 * 
 * Dramatically cuts Firestore reads when navigating between /explore and /problem/:id.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  lastAccessed: number;
}

const SESSION_PREFIX = "prblms_swr_";

class SWRCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private inFlight = new Map<string, Promise<any>>();
  private defaultTTL = 300_000; // 5 minutes default TTL for problem data
  private maxEntries: number;

  constructor(maxEntries = 250) {
    this.maxEntries = maxEntries;
  }

  /**
   * Safe SessionStorage Getter
   */
  private getFromSessionStorage<T>(key: string): CacheEntry<T> | null {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    try {
      const raw = window.sessionStorage.getItem(SESSION_PREFIX + key);
      if (!raw) return null;
      const parsed: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() > parsed.expiresAt) {
        window.sessionStorage.removeItem(SESSION_PREFIX + key);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  /**
   * Safe SessionStorage Setter
   */
  private saveToSessionStorage<T>(key: string, entry: CacheEntry<T>): void {
    if (typeof window === "undefined" || !window.sessionStorage) return;
    try {
      window.sessionStorage.setItem(SESSION_PREFIX + key, JSON.stringify(entry));
    } catch (e) {
      // Quota exceeded: clean up oldest session entries
      try {
        const toDelete: string[] = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const k = window.sessionStorage.key(i);
          if (k && k.startsWith(SESSION_PREFIX)) {
            toDelete.push(k);
          }
        }
        // Remove first 25% of SWR session keys
        const removeCount = Math.max(1, Math.floor(toDelete.length * 0.25));
        for (let i = 0; i < removeCount; i++) {
          window.sessionStorage.removeItem(toDelete[i]);
        }
      } catch {}
    }
  }

  /**
   * Safe SessionStorage Remover
   */
  private removeFromSessionStorage(keyOrPrefix: string): void {
    if (typeof window === "undefined" || !window.sessionStorage) return;
    try {
      const toDelete: string[] = [];
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const k = window.sessionStorage.key(i);
        if (k && (k === SESSION_PREFIX + keyOrPrefix || k.startsWith(SESSION_PREFIX + keyOrPrefix))) {
          toDelete.push(k);
        }
      }
      toDelete.forEach((k) => window.sessionStorage.removeItem(k));
    } catch {}
  }

  /**
   * Evict LRU entries when exceeding maxEntries in memory
   */
  private evictIfNeeded(): void {
    if (this.cache.size < this.maxEntries) return;

    const sorted = [...this.cache.entries()].sort(
      ([, a], [, b]) => a.lastAccessed - b.lastAccessed
    );

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
    let entry = this.cache.get(key);

    // If not in memory, check SessionStorage (Tier 2)
    if (!entry) {
      const sess = this.getFromSessionStorage<T>(key);
      if (sess) {
        entry = sess;
        this.cache.set(key, entry);
      }
    }

    // 1. If fresh cache exists, return immediately (0ms, 0 Firestore reads)
    if (entry && now < entry.expiresAt) {
      entry.lastAccessed = now;
      return entry.data;
    }

    // 2. Coalesce in-flight requests (simultaneous queries share single fetch)
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key)!;
    }

    // 3. Stale-While-Revalidate: fetch in background, return stale immediately if present
    const fetchPromise = (async () => {
      try {
        const fresh = await fetcher();
        this.set(key, fresh, ttlMs);
        return fresh;
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, fetchPromise);

    if (entry) {
      entry.lastAccessed = now;
      return entry.data; // Return stale immediately while revalidating
    }

    return fetchPromise;
  }

  /**
   * Synchronously get from Memory or SessionStorage
   */
  public get<T>(key: string): T | undefined {
    const now = Date.now();
    let entry = this.cache.get(key);

    if (!entry) {
      const sess = this.getFromSessionStorage<T>(key);
      if (sess) {
        entry = sess;
        this.cache.set(key, entry);
      }
    }

    if (entry && now < entry.expiresAt) {
      entry.lastAccessed = now;
      return entry.data;
    }

    return undefined;
  }

  /**
   * Check if fresh, unexpired cache exists in memory or sessionStorage
   */
  public has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Directly write to both Memory & SessionStorage
   */
  public set<T>(key: string, data: T, ttlMs: number = this.defaultTTL): void {
    if (data === undefined || data === null) return;
    this.evictIfNeeded();
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMs,
      lastAccessed: Date.now(),
    };
    this.cache.set(key, entry);
    this.saveToSessionStorage(key, entry);
  }

  /**
   * Seed multiple problem items in one batch (e.g., when catalog loads)
   */
  public setMany<T extends { id?: string }>(items: T[], keyPrefix = "problem_", ttlMs: number = this.defaultTTL): void {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      if (item && item.id) {
        this.set(`${keyPrefix}${item.id}`, item, ttlMs);
      }
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
    this.removeFromSessionStorage(keyOrPrefix);
  }

  /**
   * Clear all cache
   */
  public clear(): void {
    this.cache.clear();
    this.inFlight.clear();
    if (typeof window !== "undefined" && window.sessionStorage) {
      const toDelete: string[] = [];
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const k = window.sessionStorage.key(i);
        if (k && k.startsWith(SESSION_PREFIX)) {
          toDelete.push(k);
        }
      }
      toDelete.forEach((k) => window.sessionStorage.removeItem(k));
    }
  }

  /**
   * Returns cache stats
   */
  public stats(): { size: number; inFlight: number; maxEntries: number } {
    return {
      size: this.cache.size,
      inFlight: this.inFlight.size,
      maxEntries: this.maxEntries,
    };
  }
}

export const swrCache = new SWRCacheManager(300);
