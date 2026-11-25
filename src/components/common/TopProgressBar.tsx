import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Next.js-style ultra-thin top progress loader for zero-jank client-side route transitions.
 * Eliminates full-screen center spinners and layout shift during navigation.
 */
export const TopProgressBar: React.FC = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Only animate if the pathname actually changed
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;

      // Start transition
      setVisible(true);
      setProgress(25);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setProgress(75);
      }, 50);

      const completeTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 200);
      }, 150);

      return () => {
        clearTimeout(timerRef.current);
        clearTimeout(completeTimer);
      };
    }
  }, [location.pathname, location.search]);

  if (!visible && progress === 0) return null;

  return (
    <div
      role="progressbar"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none overflow-hidden transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-[0_0_10px_rgba(37,84,240,0.8)] transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "150ms" : "300ms",
        }}
      />
    </div>
  );
};

/**
 * Fallback loader for React Suspense that keeps layout completely stable
 */
export const SlimPageFallback: React.FC = () => (
  <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none overflow-hidden">
    <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-[0_0_10px_rgba(37,84,240,0.8)] animate-[indeterminate_0.8s_infinite_linear] origin-left" />
  </div>
);
