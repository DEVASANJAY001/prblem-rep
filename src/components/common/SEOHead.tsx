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
    const formattedTitle = title.includes("ProblemAtlas") ? title : `${title} | ProblemAtlas`;
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

    // 4. Open Graph Tags (LinkedIn, WhatsApp, Facebook)
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    if (canonicalUrl) {
      setMetaTag("property", "og:url", canonicalUrl);
    }
    if (ogImage) {
      setMetaTag("property", "og:image", ogImage);
    }

    // 5. Twitter / X Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description);
    if (ogImage) {
      setMetaTag("name", "twitter:image", ogImage);
    }

    // 6. Canonical Link
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }

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
