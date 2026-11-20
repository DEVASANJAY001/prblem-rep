import React, { useState, useRef, useMemo, useEffect } from "react";
import { CompanyDoc } from "@/types";
import {
  parseCompanyCsv,
  generateSampleCompanyCsv,
  exportCompaniesToCsv,
  downloadCsvFile,
  ParsedCompanyRow,
} from "@/lib/csv/companyCsvHelper";
import { bulkSaveCompaniesToFirestore } from "@/lib/firebase/services/companiesService";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import confetti from "canvas-confetti";
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Search,
  Sparkles,
  Check,
  RotateCcw,
  Building2,
  Layers,
  ArrowRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface AdminBulkCompanyImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: (createdCount: number, mergedCount: number) => void;
  existingCompanies: CompanyDoc[];
}

export const AdminBulkCompanyImportModal: React.FC<AdminBulkCompanyImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
  existingCompanies,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Layout mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Step: "upload" | "preview" | "importing" | "complete"
  const [step, setStep] = useState<"upload" | "preview" | "importing" | "complete">("upload");
  const [inputTab, setInputTab] = useState<"file" | "paste">("file");

  // Raw input state
  const [rawCsvText, setRawCsvText] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);

  // Parsed & validation state
  const [parsedRows, setParsedRows] = useState<ParsedCompanyRow[]>([]);
  const [parseErrors, setParseErrors] = useState<Array<{ row: number; field: string; message: string }>>([]);
  const [detectedHeaders, setDetectedHeaders] = useState<string[]>([]);
  const [previewFilter, setPreviewFilter] = useState<string>("");
  const [filterAction, setFilterAction] = useState<"all" | "create" | "merge">("all");
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);

  // Execution state
  const [importProgress, setImportProgress] = useState<{ current: number; total: number; currentName: string }>({
    current: 0,
    total: 0,
    currentName: "",
  });
  const [importedResult, setImportedResult] = useState<{ created: number; merged: number }>({
    created: 0,
    merged: 0,
  });

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep("upload");
      setRawCsvText("");
      setFileName(null);
      setParsedRows([]);
      setParseErrors([]);
      setDetectedHeaders([]);
      setPreviewFilter("");
      setFilterAction("all");
      setImportProgress({ current: 0, total: 0, currentName: "" });
      setImportedResult({ created: 0, merged: 0 });
    }
  }, [isOpen]);

  const processAndPreviewCsv = (text: string) => {
    const result = parseCompanyCsv(text, existingCompanies);
    setParsedRows(result.rows);
    setParseErrors(result.errors);
    setDetectedHeaders(result.headersDetected);
    if (result.rows.length > 0) {
      setStep("preview");
    }
  };

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setRawCsvText(content);
        processAndPreviewCsv(content);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const template = generateSampleCompanyCsv();
    downloadCsvFile("companies-bulk-import-template.csv", template);
  };

  const handleExportExisting = () => {
    const exported = exportCompaniesToCsv(existingCompanies);
    downloadCsvFile(`prblms-companies-export-${new Date().toISOString().slice(0, 10)}.csv`, exported);
  };

  // Filter preview rows
  const filteredRows = useMemo(() => {
    return parsedRows.filter((row) => {
      if (filterAction !== "all" && row.action !== filterAction) return false;
      if (!previewFilter.trim()) return true;
      const q = previewFilter.toLowerCase().trim();
      return (
        row.name.toLowerCase().includes(q) ||
        row.website.toLowerCase().includes(q) ||
        row.industry.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q)
      );
    });
  }, [parsedRows, previewFilter, filterAction]);

  const newCount = useMemo(() => parsedRows.filter((r) => r.action === "create").length, [parsedRows]);
  const mergeCount = useMemo(() => parsedRows.filter((r) => r.action === "merge").length, [parsedRows]);

  // Execute bulk import
  const handleExecuteImport = async () => {
    if (parsedRows.length === 0) return;

    setStep("importing");
    const docsToSave = parsedRows.map((r) => r.finalCompanyDoc);
    setImportProgress({ current: 0, total: docsToSave.length, currentName: docsToSave[0]?.name || "" });

    let completed = 0;
    for (const doc of docsToSave) {
      setImportProgress({
        current: completed + 1,
        total: docsToSave.length,
        currentName: doc.name,
      });
      if (docsToSave.length > 5) {
        await new Promise((r) => setTimeout(r, 40));
      }
      completed++;
    }

    await bulkSaveCompaniesToFirestore(docsToSave);

    setImportedResult({ created: newCount, merged: mergeCount });
    setStep("complete");

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    if (onImportComplete) {
      onImportComplete(newCount, mergeCount);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className={`relative flex flex-col bg-surface text-on-surface rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden transition-all duration-300 ${
          isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-5xl max-h-[92vh] h-[850px]"
        }`}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-on-surface tracking-tight">Bulk Companies Studio</h2>
                <span className="rounded-full bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 text-xs font-bold text-primary border border-primary/20">
                  CSV & Excel
                </span>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60">
                  Auto-Deduplication & Merge
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Upload or paste enterprise partners in bulk. Existing companies are matched by Name or Domain and merged without duplicates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHelpGuide(!showHelpGuide)}
              title="Column Formatting Guide"
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors hidden sm:inline-flex"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              title="Close Modal"
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Format Spec Sheet Accordion */}
        {showHelpGuide && (
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30 text-xs text-on-surface-variant animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-on-surface">Supported Company CSV / Excel Column Format:</span>
              <button
                onClick={() => setShowHelpGuide(false)}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Hide Guide
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/30">
                <span className="font-bold text-on-surface block mb-0.5">Name (Required)</span>
                <p className="text-[11px]">Primary partner name (e.g. Nvidia, Google, Stripe).</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/30">
                <span className="font-bold text-on-surface block mb-0.5">Website</span>
                <p className="text-[11px]">Official website link. Domain is used to prevent duplicates.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/30">
                <span className="font-bold text-on-surface block mb-0.5">Logo URL (Optional)</span>
                <p className="text-[11px]">Square image URL. Auto-falls back to favicon/clearbit if blank.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/30">
                <span className="font-bold text-on-surface block mb-0.5">Industry & Verified</span>
                <p className="text-[11px]">Industry tag (Healthcare, AI, FinTech) and verified badge.</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto">
          {/* STEP 1: UPLOAD / PASTE */}
          {step === "upload" && (
            <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-full max-w-2xl space-y-6">
                {/* Method Tabs */}
                <div className="flex rounded-xl bg-surface-container-low p-1 border border-outline-variant/30 w-full max-w-sm mx-auto">
                  <button
                    onClick={() => setInputTab("file")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                      inputTab === "file"
                        ? "bg-surface text-primary shadow-xs"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Upload CSV / Excel</span>
                  </button>
                  <button
                    onClick={() => setInputTab("paste")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                      inputTab === "paste"
                        ? "bg-surface text-primary shadow-xs"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                    <span>Paste Table Text</span>
                  </button>
                </div>

                {/* File Upload Zone */}
                {inputTab === "file" && (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant/60 hover:border-primary/80 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-surface-container-lowest/50 hover:bg-primary/5 transition-all group"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      }}
                      accept=".csv,text/csv,text/plain,.tsv"
                      className="hidden"
                    />
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform mb-4 border border-primary/20">
                      <Upload className="h-8 w-8" />
                    </div>
                    <h3 className="text-base font-bold text-on-surface mb-1">
                      Choose CSV / Excel File or Drag & Drop Here
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mb-4">
                      Accepts standard <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px]">.csv</code>,{" "}
                      <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px]">.tsv</code>, or Excel-exported tables.
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm group-hover:bg-primary/90 transition-colors">
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                      <span>Browse Files</span>
                    </span>
                  </div>
                )}

                {/* Paste Text Zone */}
                {inputTab === "paste" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface">
                        Paste Spreadsheet Columns (from Excel / Google Sheets):
                      </label>
                      <button
                        onClick={() => {
                          const sample = generateSampleCompanyCsv();
                          setRawCsvText(sample);
                        }}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        Paste Demo Sample
                      </button>
                    </div>
                    <textarea
                      value={rawCsvText}
                      onChange={(e) => setRawCsvText(e.target.value)}
                      placeholder={`Name\tWebsite\tLogo URL\tIndustry\tDescription\nNvidia\thttps://nvidia.com\thttps://.../nvidia.png\tAI\tAccelerated computing\nGoogle\thttps://google.com\thttps://.../google.png\tHealthcare\tClinical search`}
                      rows={9}
                      className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-3.5 font-mono text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                    />
                    <button
                      disabled={!rawCsvText.trim()}
                      onClick={() => processAndPreviewCsv(rawCsvText)}
                      className="w-full py-2.5 rounded-xl bg-primary disabled:opacity-40 text-white font-bold text-xs shadow-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Parse and Preview Companies</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Template Downloads & Helper Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
                  <button
                    onClick={handleDownloadTemplate}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant/60 bg-surface text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5 text-primary" />
                    <span>Download Blank Template (CSV)</span>
                  </button>

                  <button
                    onClick={handleExportExisting}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant/60 bg-surface text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors shadow-xs"
                  >
                    <FileText className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Export Existing ({existingCompanies.length}) as CSV</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PREVIEW & DEDUPLICATION AUDIT */}
          {step === "preview" && (
            <div className="p-6 space-y-4">
              {/* Summary Stats Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileSpreadsheet className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-on-surface">{parsedRows.length}</div>
                    <div className="text-[11px] text-on-surface-variant font-medium">Total Rows Parsed</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-emerald-800 dark:text-emerald-300">{newCount}</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">New Companies</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-700 dark:text-blue-400">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-blue-800 dark:text-blue-300">{mergeCount}</div>
                    <div className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold">Existing to Merge</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-500/20 text-on-surface-variant">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-on-surface">
                      {existingCompanies.length + newCount}
                    </div>
                    <div className="text-[11px] text-on-surface-variant font-medium">Total After Import</div>
                  </div>
                </div>
              </div>

              {/* Parsing Warnings / Errors if any */}
              {parseErrors.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-bold">Parsing Notice ({parseErrors.length} skipped):</span>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                      {parseErrors.slice(0, 3).map((err, i) => (
                        <li key={i}>Row {err.row}: {err.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Table Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-on-surface-variant" />
                    <input
                      type="text"
                      value={previewFilter}
                      onChange={(e) => setPreviewFilter(e.target.value)}
                      placeholder="Search parsed preview..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-outline-variant/60 bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Filter by Action */}
                  <div className="flex rounded-xl bg-surface-container-low p-1 border border-outline-variant/30 text-xs">
                    <button
                      onClick={() => setFilterAction("all")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                        filterAction === "all" ? "bg-surface text-primary shadow-xs" : "text-on-surface-variant"
                      }`}
                    >
                      All ({parsedRows.length})
                    </button>
                    <button
                      onClick={() => setFilterAction("create")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                        filterAction === "create" ? "bg-surface text-emerald-600 shadow-xs" : "text-on-surface-variant"
                      }`}
                    >
                      New ({newCount})
                    </button>
                    <button
                      onClick={() => setFilterAction("merge")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                        filterAction === "merge" ? "bg-surface text-blue-600 shadow-xs" : "text-on-surface-variant"
                      }`}
                    >
                      Merged ({mergeCount})
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => setStep("upload")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/60 bg-surface text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Upload Different File</span>
                  </button>
                </div>
              </div>

              {/* Parsed Rows Table */}
              <div className="border border-outline-variant/30 rounded-xl overflow-hidden bg-surface shadow-xs">
                <div className="overflow-x-auto max-h-[420px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-surface-container-low text-on-surface-variant font-bold sticky top-0 z-10 border-b border-outline-variant/30">
                      <tr>
                        <th className="py-2.5 px-3 w-12 text-center">#</th>
                        <th className="py-2.5 px-3">Action</th>
                        <th className="py-2.5 px-3">Company</th>
                        <th className="py-2.5 px-3">Industry</th>
                        <th className="py-2.5 px-3">Website</th>
                        <th className="py-2.5 px-3 text-center">Verified</th>
                        <th className="py-2.5 px-3 text-right">Bounties</th>
                        <th className="py-2.5 px-3 text-right">Total Rewards</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {filteredRows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-surface-container-lowest/60 transition-colors"
                        >
                          <td className="py-2.5 px-3 text-center text-on-surface-variant font-mono text-[11px]">
                            {row._rawRowIndex}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {row.action === "create" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 font-bold text-[10px]">
                                <Sparkles className="h-3 w-3" />
                                <span>New</span>
                              </span>
                            ) : (
                              <span
                                title={`Matches existing company "${row.matchedExisting?.name}". Details will be merged.`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/60 font-bold text-[10px]"
                              >
                                <RefreshCw className="h-3 w-3" />
                                <span>Merge Duplicate</span>
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <CompanyLogo
                                logoUrl={row.logoUrl}
                                name={row.name}
                                website={row.website}
                                size="sm"
                                className="w-7 h-7 rounded-lg border border-outline-variant/30 shrink-0"
                              />
                              <div>
                                <div className="font-semibold text-on-surface">{row.name}</div>
                                <div className="text-[10px] text-on-surface-variant line-clamp-1 max-w-[200px]">
                                  {row.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[11px] font-medium">
                              {row.industry}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <a
                              href={row.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[11px]"
                            >
                              <span>{row.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                              <ExternalLink className="h-3 w-3 text-primary/60" />
                            </a>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {row.verified ? (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-primary border border-primary/20 text-[10px] font-bold">
                                <ShieldCheck className="h-3 w-3" />
                                <span>Verified</span>
                              </span>
                            ) : (
                              <span className="text-on-surface-variant/40">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-on-surface">
                            {row.problemBountiesCount}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-on-surface">
                            {row.totalRewardsAwarded > 0 ? `₹${row.totalRewardsAwarded.toLocaleString()}` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: IMPORTING PROGRESS */}
          {step === "importing" && (
            <div className="p-12 flex flex-col items-center justify-center min-h-[450px] text-center space-y-6">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary animate-pulse">
                <RefreshCw className="h-10 w-10 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-on-surface">Saving & Merging Companies...</h3>
                <p className="text-xs text-on-surface-variant max-w-sm">
                  Writing to Cloud Firestore and local storage. Updating "{importProgress.currentName}"...
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-on-surface">
                  <span>Progress</span>
                  <span>
                    {importProgress.current} / {importProgress.total}
                  </span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <div
                    className="h-full bg-primary transition-all duration-150 rounded-full"
                    style={{
                      width: `${
                        importProgress.total > 0
                          ? (importProgress.current / importProgress.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: IMPORT COMPLETE */}
          {step === "complete" && (
            <div className="p-12 flex flex-col items-center justify-center min-h-[450px] text-center space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-on-surface">Bulk Import Complete!</h3>
                <p className="text-xs text-on-surface-variant max-w-md">
                  All enterprise partners and venture solvers have been synced live to Cloud Firestore. Zero duplicate companies created.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
                <div className="text-center px-4">
                  <div className="text-2xl font-black text-emerald-600">{importedResult.created}</div>
                  <div className="text-xs text-on-surface-variant font-medium">New Companies Added</div>
                </div>
                <div className="h-8 w-px bg-outline-variant/30" />
                <div className="text-center px-4">
                  <div className="text-2xl font-black text-blue-600">{importedResult.merged}</div>
                  <div className="text-xs text-on-surface-variant font-medium">Existing Merged (No Duplicates)</div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
              >
                Done & Return to Directory
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        {step === "preview" && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest shrink-0">
            <div className="text-xs text-on-surface-variant">
              <span>Ready to process </span>
              <strong className="text-on-surface font-bold">{parsedRows.length}</strong> companies (
              <span className="text-emerald-600 font-semibold">{newCount} new</span>,{" "}
              <span className="text-blue-600 font-semibold">{mergeCount} merged</span>).
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-outline-variant/60 text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteImport}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
              >
                <Check className="h-4 w-4" />
                <span>Confirm & Import {parsedRows.length} Companies</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
