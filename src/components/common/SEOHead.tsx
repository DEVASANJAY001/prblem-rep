import React, { useEffect } from "react";

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  /** When true, adds <meta name="robots" content="noindex,nofollow"> */
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage,
  jsonLd,
  noindex = false,
}) => {
  useEffect(() => {
    // 1. Set Title
    const formattedTitle = title.includes("Stuckhere") ? title : `${title} | Stuckhere`;
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 2. Robots directive (noindex for private/utility pages)
    if (noindex) {
      setMetaTag("name", "robots", "noindex,nofollow");
    } else {
      setMetaTag("name", "robots", "index,follow");
    }

    // 3. Standard Meta Tags
    setMetaTag("name", "description", description);
    if (keywords && keywords.length > 0) {
      setMetaTag("name", "keywords", keywords.join(", "));
    }

    const activeOrigin =
      typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")
        ? window.location.origin
        : "https://stuckhere.davns.com";

    const resolveUrl = (url?: string) => {
      if (!url) return typeof window !== "undefined" ? `${activeOrigin}${window.location.pathname}` : `${activeOrigin}/`;
      if (url.startsWith("/")) return `${activeOrigin}${url}`;
      try {
        const parsed = new URL(url);
        return `${activeOrigin}${parsed.pathname}${parsed.search}`;
      } catch {
        return url;
      }
    };

    const resolvedCanonical = resolveUrl(canonicalUrl);
    const resolvedOgImage = ogImage
      ? (ogImage.startsWith("/") ? `${activeOrigin}${ogImage}` : ogImage)
      : `${activeOrigin}/og-image.png`;

    // 4. Open Graph Tags (LinkedIn, WhatsApp, Facebook)
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", resolvedCanonical);
    setMetaTag("property", "og:image", resolvedOgImage);

    // 5. Twitter / X Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", resolvedOgImage);

    // 6. Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", resolvedCanonical);

    // 7. JSON-LD Structured Data for Google Rich Snippets
    let scriptTag = document.getElementById("json-ld-structured-data");
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-structured-data";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, jsonLd, noindex]);

  return null;
};
