import React, { useCallback } from "react";
import { Link, LinkProps } from "react-router-dom";
import { prefetchRoute } from "@/lib/routePrefetch";

export interface SmartLinkProps extends LinkProps {
  /**
   * Whether to prefetch the target route chunk on hover / touch / focus.
   * Defaults to true (Next.js Link default behavior).
   */
  prefetch?: boolean;
}

/**
 * Drop-in replacement for React Router's Link with Next.js-grade route prefetching.
 * Preloads the target page's code chunk when hovered, touched, or focused.
 */
export const SmartLink = React.forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ to, prefetch = true, onMouseEnter, onTouchStart, onFocus, ...props }, ref) => {
    const handlePrefetch = useCallback(() => {
      if (prefetch) {
        prefetchRoute(to);
      }
    }, [to, prefetch]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      handlePrefetch();
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
      handlePrefetch();
      if (onTouchStart) onTouchStart(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
      handlePrefetch();
      if (onFocus) onFocus(e);
    };

    return (
      <Link
        ref={ref}
        to={to}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onFocus={handleFocus}
        {...props}
      />
    );
  }
);

SmartLink.displayName = "SmartLink";
