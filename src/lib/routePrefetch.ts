/**
 * Next.js-style Intelligent Client-Side Route Prefetcher
 * Preloads lazy route JavaScript chunks in the background on link hover or viewport intersection.
 * Reduces perceived click-to-render latency to 0ms.
 */

type RouteLoader = () => Promise<any>;

// Map of canonical route prefixes to lazy module loaders
const ROUTE_LOADERS: { prefix: RegExp; load: RouteLoader }[] = [
  { prefix: /^\/?$/, load: () => import("@/pages/public/Home") },
  { prefix: /^\/explore/, load: () => import("@/pages/public/Explore") },
  { prefix: /^\/problem\//, load: () => import("@/pages/public/ProblemDetail") },
  { prefix: /^\/startup-mode\//, load: () => import("@/pages/public/StartupMode") },
  { prefix: /^\/industries(\/.*)?$/, load: () => import("@/pages/public/Industries") },
  { prefix: /^\/learn$/, load: () => import("@/pages/public/AcademyHome") },
  { prefix: /^\/learn\/.*\/.*$/, load: () => import("@/pages/public/ChapterReader") },
  { prefix: /^\/learn\/.*$/, load: () => import("@/pages/public/SubjectPage") },
  { prefix: /^\/community/, load: () => import("@/pages/public/Community") },
  { prefix: /^\/methodology/, load: () => import("@/pages/public/Methodology") },
  { prefix: /^\/guides\//, load: () => import("@/pages/public/ProblemDiscoveryGuide") },
  { prefix: /^\/open-innovation/, load: () => import("@/pages/public/OpenInnovation") },
  { prefix: /^\/solutions/, load: () => import("@/pages/public/Solutions") },
  { prefix: /^\/companies/, load: () => import("@/pages/public/Companies") },
  { prefix: /^\/research/, load: () => import("@/pages/public/Research") },
  { prefix: /^\/features/, load: () => import("@/pages/public/Features") },
  { prefix: /^\/competitions/, load: () => import("@/pages/public/Competitions") },
  { prefix: /^\/about/, load: () => import("@/pages/public/About") },
  { prefix: /^\/contact/, load: () => import("@/pages/public/Contact") },
  { prefix: /^\/submit/, load: () => import("@/pages/public/SubmitProblem") },
  { prefix: /^\/login/, load: () => import("@/pages/public/AuthPage") },
  { prefix: /^\/register/, load: () => import("@/pages/public/AuthPage") },
];

const prefetchedRoutes = new Set<string>();

/**
 * Prefetches the JavaScript and asset chunk for a target route URL
 */
export function prefetchRoute(to: string | { pathname?: string }): void {
  if (typeof window === "undefined") return;

  const path = typeof to === "string" ? to : to.pathname || "";
  if (!path || path.startsWith("http") || path.startsWith("#") || path.startsWith("mailto:")) {
    return;
  }

  // Normalize path (strip query string and hash)
  const cleanPath = path.split("?")[0].split("#")[0] || "/";

  if (prefetchedRoutes.has(cleanPath)) return;
  prefetchedRoutes.add(cleanPath);

  // Find matching route loader
  const match = ROUTE_LOADERS.find((r) => r.prefix.test(cleanPath));
  if (match) {
    try {
      // Execute in idle time or requestAnimationFrame to keep the main thread 100% free
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(
          () => {
            match.load().catch(() => {
              prefetchedRoutes.delete(cleanPath);
            });
          },
          { timeout: 1500 }
        );
      } else {
        setTimeout(() => {
          match.load().catch(() => {
            prefetchedRoutes.delete(cleanPath);
          });
        }, 50);
      }
    } catch {
      prefetchedRoutes.delete(cleanPath);
    }
  }
}

/**
 * Preloads the top public routes during browser idle time
 */
export function preheatTopRoutes(): void {
  if (typeof window === "undefined") return;
  const topPaths = ["/explore", "/learn", "/industries", "/community", "/about"];
  topPaths.forEach((p) => {
    prefetchRoute(p);
  });
}
