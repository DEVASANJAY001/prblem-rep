import { useState, useEffect, useMemo, useCallback } from "react";
import { PageContent } from "@/types";
import { subscribeToPageContent } from "@/lib/firebase/services/contentService";
import { INITIAL_SITE_CONTENT } from "@/data/initialContent";

export function usePageContent(pageId: string) {
  const defaultPage = useMemo(() => {
    return INITIAL_SITE_CONTENT.find((p) => p.pageId === pageId) || null;
  }, [pageId]);

  const [content, setContent] = useState<PageContent | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToPageContent(pageId, (updated, connected) => {
      setContent(updated || defaultPage);
      setIsConnected(connected);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pageId, defaultPage]);

  /**
   * Helper to retrieve a field's value with robust fallback
   */
  const getField = useCallback(
    <T = string>(sectionId: string, fieldId: string, fallbackDefault?: T): T => {
      if (content?.sections) {
        const sec = content.sections.find((s) => s.sectionId === sectionId);
        if (sec) {
          const field = sec.fields.find((f) => f.fieldId === fieldId);
          if (field && field.value !== undefined && field.value !== null && field.value !== "") {
            return field.value as unknown as T;
          }
        }
      }

      // Check default page
      if (defaultPage?.sections) {
        const sec = defaultPage.sections.find((s) => s.sectionId === sectionId);
        if (sec) {
          const field = sec.fields.find((f) => f.fieldId === fieldId);
          if (field && field.value !== undefined) {
            return field.value as unknown as T;
          }
        }
      }

      return (fallbackDefault !== undefined ? fallbackDefault : ("" as unknown as T));
    },
    [content, defaultPage]
  );

  return {
    content,
    getField,
    isConnected,
    loading,
  };
}
