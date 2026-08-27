import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFormById } from "@/lib/storage";
import { subscribeFormResponses, exportResponsesToCSV } from "@/lib/firebase/services/formsService";
import { FormResponseDoc } from "@/types";
import {
  ArrowLeft,
  Download,
  Search,
  Eye,
  X,
  Trash2,
  Calendar,
  Settings,
} from "lucide-react";

export const AdminFormResponses: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const form = id ? getFormById(id) : null;
  const [responses, setResponses] = useState<FormResponseDoc[]>([]);
  const [search, setSearch] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<FormResponseDoc | null>(null);

  useEffect(() => {
    if (id) {
      const unsubscribe = subscribeFormResponses(id, (list) => {
        setResponses(list);
        if (list.length > 0 && !selectedResponse) {
          setSelectedResponse(list[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [id]);

  if (!form) {
    return (
      <div className="text-center py-20 text-on-surface-variant font-body-md">
        <h2 className="text-headline-sm font-headline-sm text-on-surface">Form not found</h2>
        <Link to="/admin/forms" className="mt-2 text-primary hover:underline text-body-md block">
          Back to Forms
        </Link>
      </div>
    );
  }

  const handleDownloadCSV = () => {
    if (responses.length === 0) return;
    const csvContent = exportResponsesToCSV(form, responses);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${form.slug}-responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = responses.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.respondentName?.toLowerCase().includes(q) ||
      r.respondentEmail?.toLowerCase().includes(q) ||
      Object.values(r.answers).some((val) => String(val).toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] font-body-md text-on-surface -m-4 md:-m-8 relative overflow-hidden bg-surface">
      {/* Page Header matching Stitch */}
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-5 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/forms"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-headline-md text-headline-md text-on-surface">
                Responses — {form.title}
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                {responses.length} responses
              </span>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant mt-0.5">
              Form ID: {form.slug} • Last submission: Today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className="h-10 px-4 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2 font-label-md text-label-md"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Actions Bar from Stitch */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-surface z-10 border-b border-outline-variant/10">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search responses..."
            type="text"
          />
        </div>

        <button
          onClick={handleDownloadCSV}
          disabled={responses.length === 0}
          className="h-10 px-4 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center gap-2 font-label-md text-label-md shadow-sm disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Data Table Container */}
      <div className="flex-1 overflow-auto bg-surface p-6 flex gap-6">
        <div className="flex-1 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold sticky left-0 bg-surface-container-low z-10 border-r border-outline-variant/10">
                    Respondent Name
                  </th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Primary Problem Identified</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                  <th className="px-6 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-body-md text-on-surface divide-y divide-outline-variant/10">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-on-surface-variant">
                      No responses found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((resp) => {
                    const isSelected = selectedResponse?.id === resp.id;
                    const primaryAnswer = Object.values(resp.answers)[0] || "No answer recorded";

                    return (
                      <tr
                        key={resp.id}
                        onClick={() => setSelectedResponse(resp)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary/5 hover:bg-primary/10"
                            : "hover:bg-surface-container-low/50"
                        }`}
                      >
                        <td className="px-6 py-4 sticky left-0 bg-surface-container-lowest z-10 border-r border-outline-variant/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-label-md font-bold">
                              {resp.respondentName?.[0]?.toUpperCase() || "R"}
                            </div>
                            <span className="font-medium">{resp.respondentName || "Anonymous Scout"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant font-mono text-xs">
                          {resp.respondentEmail || "anon@problem.org"}
                        </td>
                        <td className="px-6 py-4 max-w-[250px] truncate text-on-surface-variant">
                          {String(primaryAnswer)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-on-surface-variant text-sm">
                          {new Date(resp.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedResponse(resp);
                            }}
                            className="p-1.5 rounded-md hover:bg-surface-container text-outline hover:text-primary transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Drawer (Right Sliding Panel) matching Stitch */}
        {selectedResponse && (
          <div className="w-[420px] max-w-[90vw] bg-surface-container-lowest shadow-xl rounded-xl border border-outline-variant/30 flex flex-col shrink-0">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-lowest sticky top-0 z-10">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Response Details</h2>
              <button
                onClick={() => setSelectedResponse(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-surface rounded-xl p-5 border border-outline-variant/20 flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
                  {selectedResponse.respondentName?.[0]?.toUpperCase() || "R"}
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    {selectedResponse.respondentName || "Anonymous Scout"}
                  </h3>
                  <p className="text-body-md text-on-surface-variant font-mono text-xs mb-2">
                    {selectedResponse.respondentEmail || "anon@problem.org"}
                  </p>
                  <div className="flex items-center gap-1.5 text-label-sm text-outline">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Submitted: {new Date(selectedResponse.submittedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Form Data Fields */}
              <div className="space-y-4">
                <h4 className="font-label-md uppercase tracking-wider text-outline border-b border-outline-variant/20 pb-2">
                  Form Answers
                </h4>

                {form.fields.map((f) => {
                  const ans = selectedResponse.answers[f.id];
                  return (
                    <div
                      key={f.id}
                      className="bg-surface rounded-xl p-5 border border-outline-variant/20 shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 rounded-l-xl" />
                      <div className="text-label-md text-on-surface-variant mb-2 font-medium">
                        {f.label}
                      </div>
                      <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-line">
                        {Array.isArray(ans) ? ans.join(", ") : String(ans || "—")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-lowest sticky bottom-0">
              <button
                onClick={() => {
                  setResponses(responses.filter((r) => r.id !== selectedResponse.id));
                  setSelectedResponse(null);
                }}
                className="w-full h-11 rounded-lg border border-error text-error hover:bg-error-container/40 transition-colors flex items-center justify-center gap-2 font-label-md font-semibold"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Response</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
