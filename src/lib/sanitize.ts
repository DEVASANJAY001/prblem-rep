/**
 * sanitize.ts — XSS-safe HTML sanitization utilities using DOMPurify.
 *
 * Use sanitizeHtml() when rendering user-supplied content via dangerouslySetInnerHTML.
 * Use sanitizeText() to strip all HTML tags for plain-text contexts (meta, aria-label, etc.).
 *
 * USAGE:
 *   <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(problem.description) }} />
 *   <meta name="description" content={sanitizeText(problem.description)} />
 */
import DOMPurify from "dompurify";

/** Allowed HTML tags for rich user content (comments, problem descriptions) */
const ALLOWED_TAGS = [
  "p", "br", "strong", "em", "u", "s",
  "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "blockquote", "code", "pre",
  "a",
];

/** Allowed attributes on those tags */
const ALLOWED_ATTR = ["href", "target", "rel"];

/**
 * Sanitize user-supplied HTML — strips all script/event handlers and dangerous tags.
 * Safe to inject via dangerouslySetInnerHTML.
 */
export function sanitizeHtml(dirty: string | undefined | null): string {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Force all links to open safely
    FORCE_BODY: false,
    ADD_ATTR: ["target"],
    // Prevent DOM clobbering
    SANITIZE_DOM: true,
  });
}

/**
 * Strip ALL HTML tags, returning plain text.
 * Use for: meta descriptions, aria-labels, alt text, CSV/PDF exports.
 */
export function sanitizeText(dirty: string | undefined | null): string {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

/**
 * Convenience: create a safe dangerouslySetInnerHTML object.
 *
 * @example
 * <div {...safeHtml(problem.description)} />
 */
export function safeHtml(dirty: string | undefined | null): { dangerouslySetInnerHTML: { __html: string } } {
  return { dangerouslySetInnerHTML: { __html: sanitizeHtml(dirty) } };
}
