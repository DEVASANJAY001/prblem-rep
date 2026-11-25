/**
 * Lightweight In-Memory Stale-While-Revalidate (SWR) Cache
 * Enables 0ms instant display on back/forward and repeat route visits.
 * Eliminates skeleton loading flickers on cached views.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

export const swrCache = {
  get<T>(key: string, maxAgeMs = 5 * 60 * 1000): T | null {
    const entry = cacheStore.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > maxAgeMs) {
      cacheStore.delete(key);
      return null;
    }
    return entry.data as T;
  },

  set<T>(key: string, data: T): void {
    cacheStore.set(key, {
      data,
      timestamp: Date.now(),
    });
  },

  has(key: string): boolean {
    return cacheStore.has(key);
  },

  clear(): void {
    cacheStore.clear();
  },
};
