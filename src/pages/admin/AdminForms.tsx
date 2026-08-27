import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subscribeForms, deleteForm } from "@/lib/firebase/services/formsService";
import { FormSchema } from "@/types";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MessageSquare,
  Link as LinkIcon,
  Edit2,
  BarChart2,
  Trash2,
  MoreVertical,
  Check,
} from "lucide-react";

export const AdminForms: React.FC = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeForms((list) => setForms(list));
    return () => unsubscribe();
  }, []);

  const handleCopyLink = (slug: string, id: string) => {
    const url = `${window.location.origin}/f/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the form "${title}"?`)) {
      try {
        await deleteForm(id);
      } catch (err) {
        console.error("Failed to delete form:", err);
      }
    }
  };

  const filteredForms = forms.filter((f) =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-12 font-body-md text-on-surface">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-headline-lg font-headline-lg text-on-surface">Forms</h1>
        <Link
          to="/admin/forms/new"
          className="bg-primary text-on-primary px-6 py-3 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Form</span>
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline h-5 w-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant"
            placeholder="Search forms..."
            type="text"
          />
        </div>
        <button className="bg-surface-container text-on-surface-variant px-4 py-3 rounded-xl hover:bg-surface-container-high transition-colors flex items-center gap-2 text-label-md font-label-md">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
        <button className="bg-surface-container text-on-surface-variant px-4 py-3 rounded-xl hover:bg-surface-container-high transition-colors flex items-center gap-2 text-label-md font-label-md">
          <ArrowUpDown className="h-4 w-4" />
          <span>Sort</span>
        </button>
      </div>

      {/* Forms Grid */}
      {filteredForms.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant">
          <MessageSquare className="h-12 w-12 text-outline mx-auto mb-3 opacity-50" />
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1">No forms found</h3>
          <p className="text-body-md text-on-surface-variant mb-6">
            Create your first feedback survey, problem validation form, or questionnaire.
          </p>
          <Link
            to="/admin/forms/new"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Form</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredForms.map((form) => {
            const isPublished = form.status === "published" || form.status === "active";
            const isDraft = form.status === "draft";
            return (
              <div
                key={form.id}
                className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-outline-variant/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                {/* Status & Menu */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1.5 ${
                      isPublished
                        ? "bg-secondary/10 text-secondary font-semibold"
                        : isDraft
                        ? "bg-surface-variant text-on-surface-variant"
                        : "bg-error/10 text-error font-semibold"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isPublished ? "bg-secondary" : isDraft ? "bg-outline" : "bg-error"
                      }`}
                    />
                    <span className="capitalize">{form.status || "Published"}</span>
                  </span>
                  <button className="text-outline hover:text-on-surface transition-colors p-1">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 relative z-10 line-clamp-2 min-h-[56px]">
                  <Link to={`/admin/forms/${form.id}/edit`} className="hover:text-primary transition-colors">
                    {form.title}
                  </Link>
                </h3>

                {/* Responses */}
                <div className="flex items-center gap-2 text-on-surface-variant text-body-md font-body-md mb-4 relative z-10">
                  <MessageSquare className="h-4 w-4 text-outline" />
                  <span>{form.responsesCount || 0} responses</span>
                </div>

                {/* Created Date */}
                <div className="text-label-sm font-label-sm text-outline mb-6 relative z-10">
                  {form.createdAt
                    ? typeof form.createdAt === "string"
                      ? new Date(form.createdAt).toLocaleDateString()
                      : form.createdAt?.toDate
                      ? form.createdAt.toDate().toLocaleDateString()
                      : "Recently created"
                    : "Active Form"}
                </div>

                {/* Actions Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-container-high relative z-10">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleCopyLink(form.slug, form.id)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title={copiedId === form.id ? "Copied!" : "Copy Link"}
                    >
                      {copiedId === form.id ? <Check className="h-4 w-4 text-secondary" /> : <LinkIcon className="h-4 w-4" />}
                    </button>
                    <Link
                      to={`/admin/forms/${form.id}/edit`}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="flex gap-1">
                    <Link
                      to={`/admin/forms/${form.id}/responses`}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="View Responses"
                    >
                      <BarChart2 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(form.id, form.title)}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
