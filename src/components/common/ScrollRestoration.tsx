import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const SCROLL_STORAGE_KEY = "atlas_scroll_memory_v1";

// In-memory memory map for ultra-fast same-session route transitions
const scrollPositions = new Map<string, number>();

/**
 * Loads session scroll map safely from sessionStorage
 */
function getStoredPositions(): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Persists scroll map to sessionStorage
 */
function saveStoredPositions(positions: Record<string, number>) {
  try {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
  } catch (e) {
    // Ignore storage full errors in private browsing
  }
}

/**
 * MNC-Grade Smart Scroll Restoration Manager
 *
 * Behavior:
 * 1. Brand-New Route: Scrolls directly to top (0, 0)
 * 2. Revisited / History Back-Forward Route: Restores exact saved scroll coordinate smoothly
 * 3. Handles async data rendering with adaptive retry frames (prevents getting stuck on loading states)
 * 4. Supports #hash anchors smoothly
 */
export const ScrollRestoration: React.FC = () => {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' (back/forward), 'PUSH' (new link), 'REPLACE'
  const prevKeyRef = useRef<string>(location.pathname + location.search);
  const isInitialMount = useRef(true);

  // Disable default browser scroll restoration so our manager controls coordinates deterministically
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Continuously record scroll position before leaving current page
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentKey = location.pathname + location.search;
          const currentY = window.scrollY || window.pageYOffset || 0;
          scrollPositions.set(currentKey, currentY);

          // Save to sessionStorage every few scrolls
          const stored = getStoredPositions();
          stored[currentKey] = currentY;
          saveStoredPositions(stored);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, location.search]);

  // Handle route transitions
  useLayoutEffect(() => {
    const targetKey = location.pathname + location.search;
    const targetHash = location.hash;

    // 1. If anchor hash exists (e.g. #section-id), scroll to target element
    if (targetHash) {
      const elementId = targetHash.replace("#", "");
      const elem = document.getElementById(elementId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        prevKeyRef.current = targetKey;
        return;
      }
    }

    // 2. Check if this is a POP navigation (Browser Back/Forward) OR a previously visited page in this session
    const stored = getStoredPositions();
    const savedY = scrollPositions.get(targetKey) ?? stored[targetKey];

    // If POP (back/forward button) or we have a recorded position from earlier in this session
    if (savedY !== undefined && savedY > 0 && navType === "POP") {
      // Adaptive retrier: attempt to restore scroll position as DOM / async data loads
      let attempts = 0;
      const maxAttempts = 12; // ~600ms total window

      const tryScroll = () => {
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight
        );

        if (documentHeight >= savedY || attempts >= maxAttempts) {
          window.scrollTo({
            top: savedY,
            left: 0,
            behavior: "instant",
          });
        } else {
          attempts++;
          setTimeout(tryScroll, 40);
        }
      };

      tryScroll();
    } else {
      // 3. Brand-New Page Visit or regular PUSH navigation:
      // Always take user to top smoothly and cleanly
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: isInitialMount.current ? "instant" : "instant",
      });
    }

    isInitialMount.current = false;
    prevKeyRef.current = targetKey;
  }, [location.pathname, location.search, location.hash, navType]);

  return null;
};
