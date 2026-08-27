import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PageContent, ContentSection, ContentField } from "@/types";
import {
  subscribeToAllPages,
  savePageContentDraft,
  publishPageContentLive,
} from "@/lib/firebase/services/contentService";
import { INITIAL_SITE_CONTENT } from "@/data/initialContent";
import { AdminProblems } from "./AdminProblems";

export const AdminAppController: React.FC = () => {
  const { user } = useAuth();
  const [controlMode, setControlMode] = useState<"problems" | "cms">("problems");
  const [pages, setPages] = useState<PageContent[]>(INITIAL_SITE_CONTENT);
  const [selectedPageId, setSelectedPageId] = useState<string>("home");
  const [editingSections, setEditingSections] = useState<ContentSection[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
    searches: true,
    stats: false,
    how_it_works: false,
    cta: false,
  });
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string>("Just now");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Subscribe to real-time pages list
  useEffect(() => {
    const unsubscribe = subscribeToAllPages((updatedPages, connected) => {
      setPages(updatedPages);
      setIsConnected(connected);
    });
    return () => unsubscribe();
  }, []);

  // Update current editing sections when selectedPageId changes or pages load
  useEffect(() => {
    const currentPage = pages.find((p) => p.pageId === selectedPageId) || INITIAL_SITE_CONTENT.find((p) => p.pageId === selectedPageId);
    if (currentPage) {
      // Deep clone to allow non-destructive local edits
      setEditingSections(JSON.parse(JSON.stringify(currentPage.sections)));
    }
  }, [selectedPageId, pages]);

  const selectedPage = pages.find((p) => p.pageId === selectedPageId) || INITIAL_SITE_CONTENT.find((p) => p.pageId === selectedPageId) || INITIAL_SITE_CONTENT[0];

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle updating a single field value
  const handleFieldChange = (sectionIndex: number, fieldIndex: number, newValue: string | string[]) => {
    setEditingSections((prev) => {
      const copy = [...prev];
      copy[sectionIndex] = {
        ...copy[sectionIndex],
        fields: [...copy[sectionIndex].fields],
      };
      copy[sectionIndex].fields[fieldIndex] = {
        ...copy[sectionIndex].fields[fieldIndex],
        value: newValue,
      };
      return copy;
    });
  };

  // Tag list handlers
  const handleAddTag = (sectionIndex: number, fieldIndex: number) => {
    setEditingSections((prev) => {
      const copy = [...prev];
      const field = copy[sectionIndex].fields[fieldIndex];
      const tags = Array.isArray(field.value) ? [...field.value] : [];
      tags.push("New Tag");
      copy[sectionIndex].fields[fieldIndex] = { ...field, value: tags };
      return copy;
    });
  };

  const handleTagValueChange = (sectionIndex: number, fieldIndex: number, tagIndex: number, val: string) => {
    setEditingSections((prev) => {
      const copy = [...prev];
      const field = copy[sectionIndex].fields[fieldIndex];
      const tags = Array.isArray(field.value) ? [...field.value] : [];
      tags[tagIndex] = val;
      copy[sectionIndex].fields[fieldIndex] = { ...field, value: tags };
      return copy;
    });
  };

  const handleDeleteTag = (sectionIndex: number, fieldIndex: number, tagIndex: number) => {
    setEditingSections((prev) => {
      const copy = [...prev];
      const field = copy[sectionIndex].fields[fieldIndex];
      const tags = Array.isArray(field.value) ? [...field.value] : [];
      tags.splice(tagIndex, 1);
      copy[sectionIndex].fields[fieldIndex] = { ...field, value: tags };
      return copy;
    });
  };

  // Save Draft
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await savePageContentDraft(selectedPageId, editingSections, user?.uid || "admin_1");
      setLastSaved("Just now");
      showToast("Draft saved successfully to Cloud Firestore!");
    } catch (err: any) {
      showToast(err?.message || "Failed to save draft to Firestore", "error");
    } finally {
      setSaving(false);
    }
  };

  // Publish Live
  const handlePublishLive = async () => {
    setSaving(true);
    try {
      await publishPageContentLive(selectedPageId, editingSections, user?.uid || "admin_1");
      setLastSaved("Just now");
      showToast("Published live to Cloud Firestore! Changes are active across all devices.");
    } catch (err: any) {
      showToast(err?.message || "Failed to publish live to Firestore", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-surface-dim font-body-md text-on-surface">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl border ${
              notification.type === "success"
                ? "bg-secondary-container text-on-secondary-container border-secondary/20"
                : "bg-error-container text-on-error-container border-error/20"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {notification.type === "success" ? "check_circle" : "error"}
            </span>
            <span className="text-sm font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Controller Mode Selector */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-3.5 flex items-center justify-between shadow-2xs z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setControlMode("problems")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              controlMode === "problems"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            Problem Statements Control System
          </button>
          <button
            onClick={() => setControlMode("cms")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              controlMode === "cms"
                ? "bg-primary text-white shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            Site Content CMS Pages
          </button>
        </div>
      </div>

      {controlMode === "problems" ? (
        <div className="flex-1 p-6 overflow-y-auto">
          <AdminProblems />
        </div>
      ) : (
        /* Main CMS Container */
        <div className="flex flex-1 h-[calc(100vh-120px)] overflow-hidden">
          {/* Left Navigation (Pages Sidebar) */}
          <div className="w-64 bg-surface shrink-0 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 border-r border-outline-variant/30">
            <div className="p-6">
              <h2 className="text-on-surface font-headline-sm font-bold text-lg">Pages</h2>
              <p className="text-on-surface-variant font-body-md text-xs mt-1">
                Select a page to edit content
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1.5">
            {pages.map((page) => {
              const isSelected = page.pageId === selectedPageId;
              return (
                <button
                  key={page.pageId}
                  onClick={() => setSelectedPageId(page.pageId)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group text-left ${
                    isSelected
                      ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                      : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isSelected ? "text-on-primary-container" : "text-outline group-hover:text-on-surface"
                      }`}
                      style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {page.icon || "article"}
                    </span>
                    <span className="font-label-md text-sm">{page.pageName}</span>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      page.status === "published"
                        ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                        : "bg-amber-400"
                    }`}
                    title={page.status === "published" ? "Live & Published" : "Draft Status"}
                  />
                </button>
              );
            })}
          </div>

          {/* Connection Status Pill */}
          <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest/50 flex items-center justify-between text-xs text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
                }`}
              />
              {isConnected ? "Firestore Live" : "Offline Cache"}
            </span>
            <span className="font-mono text-[10px] text-outline">v1.2</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-surface-dim">
          <div className="max-w-4xl mx-auto p-8 lg:p-12 space-y-8 pb-32">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-outline-variant/30">
              <div>
                <h1 className="text-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  Editing: {selectedPage.pageName}
                </h1>
                <p className="text-body-md text-on-surface-variant mt-2 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">public</span>
                  Changes reflect live on the public site ({selectedPage.path})
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <span className="text-label-sm text-on-surface-variant text-xs hidden md:inline">
                  Last saved {lastSaved}
                </span>

                <Link
                  to={selectedPage.path}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-container text-on-surface font-label-md transition-all shadow-sm flex items-center gap-2 border border-outline-variant/30 text-sm hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Preview Live
                </Link>

                <button
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md transition-all shadow-sm flex items-center gap-2 text-sm border border-outline-variant/40"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Draft
                </button>

                <button
                  onClick={handlePublishLive}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 flex items-center gap-2 text-sm font-semibold hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  {saving ? "Publishing..." : "Publish Live"}
                </button>
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-6">
              {editingSections.map((section, sIndex) => {
                const isOpen = openSections[section.sectionId] ?? true;
                return (
                  <div
                    key={section.sectionId}
                    className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden group/card transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(section.sectionId)}
                      className="w-full flex items-center justify-between p-6 bg-surface hover:bg-surface-container/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="material-symbols-outlined text-primary bg-primary-container/20 p-2.5 rounded-xl text-[22px]">
                          {section.icon || "view_carousel"}
                        </span>
                        <h3 className="text-headline-sm font-bold text-on-surface text-lg">
                          {section.sectionLabel}
                        </h3>
                      </div>
                      <span
                        className={`material-symbols-outlined text-outline transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-6 pt-2 space-y-6 border-t border-outline-variant/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {section.fields.map((field, fIndex) => {
                            if (field.type === "textarea") {
                              return (
                                <div key={field.fieldId} className="space-y-2 col-span-2">
                                  <label className="text-label-md font-semibold text-on-surface text-sm block">
                                    {field.label}
                                  </label>
                                  {field.helpText && (
                                    <p className="text-xs text-on-surface-variant">{field.helpText}</p>
                                  )}
                                  <textarea
                                    rows={3}
                                    value={typeof field.value === "string" ? field.value : ""}
                                    onChange={(e) =>
                                      handleFieldChange(sIndex, fIndex, e.target.value)
                                    }
                                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
                                  />
                                </div>
                              );
                            }

                            if (field.type === "tag_list") {
                              const tags = Array.isArray(field.value) ? field.value : [];
                              return (
                                <div key={field.fieldId} className="space-y-3 col-span-2">
                                  <div>
                                    <label className="text-label-md font-semibold text-on-surface text-sm block">
                                      {field.label}
                                    </label>
                                    <p className="text-xs text-on-surface-variant mt-0.5">
                                      {field.helpText || "These repeatable tags appear as interactive filters and search prompts."}
                                    </p>
                                  </div>

                                  <div className="space-y-2.5">
                                    {tags.map((tag, tIndex) => (
                                      <div
                                        key={tIndex}
                                        className="flex items-center gap-3 bg-surface-container-low p-2.5 rounded-xl group border border-outline-variant/30 hover:border-primary/40 transition-colors"
                                      >
                                        <span className="material-symbols-outlined text-outline cursor-grab text-[18px]">
                                          drag_indicator
                                        </span>
                                        <input
                                          type="text"
                                          value={tag}
                                          onChange={(e) =>
                                            handleTagValueChange(sIndex, fIndex, tIndex, e.target.value)
                                          }
                                          className="flex-1 bg-transparent border-none text-body-md text-on-surface focus:outline-none font-medium text-sm"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteTag(sIndex, fIndex, tIndex)}
                                          className="p-1.5 text-error/70 hover:text-error hover:bg-error-container rounded-lg transition-colors"
                                          title="Remove Tag"
                                        >
                                          <span className="material-symbols-outlined text-[18px]">
                                            delete
                                          </span>
                                        </button>
                                      </div>
                                    ))}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleAddTag(sIndex, fIndex)}
                                    className="mt-2 flex items-center gap-2 text-primary font-label-md hover:bg-primary-container/20 px-4 py-2 rounded-xl transition-colors text-sm font-semibold border border-primary/20"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Tag
                                  </button>
                                </div>
                              );
                            }

                            // Standard text input
                            return (
                              <div
                                key={field.fieldId}
                                className={`space-y-2 ${
                                  field.fieldId.includes("heading") || field.fieldId.includes("title")
                                    ? "col-span-2"
                                    : "col-span-2 md:col-span-1"
                                }`}
                              >
                                <label className="text-label-md font-semibold text-on-surface text-sm block">
                                  {field.label}
                                </label>
                                {field.helpText && (
                                  <p className="text-xs text-on-surface-variant">{field.helpText}</p>
                                )}
                                <input
                                  type="text"
                                  value={typeof field.value === "string" ? field.value : ""}
                                  onChange={(e) =>
                                    handleFieldChange(sIndex, fIndex, e.target.value)
                                  }
                                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Floating Return to Admin Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link
          to="/admin"
          className="flex items-center gap-2 px-4 py-3 bg-surface text-on-surface hover:bg-surface-container rounded-xl font-label-md transition-all shadow-xl border border-outline-variant/40 hover:scale-105"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Return to Admin
        </Link>
      </div>
    </div>
  );
};
