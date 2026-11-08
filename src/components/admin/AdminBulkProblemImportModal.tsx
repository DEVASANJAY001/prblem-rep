import React, { useState, useRef, useMemo, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createProblem } from "@/lib/firebase/services/problemsService";
import {
  parseProblemsFromCsv,
  generateSampleProblemCsv,
  downloadCsvFile,
  PROBLEM_CSV_SPEC,
  ParsedProblemRow,
} from "@/lib/csv/problemCsvHelper";
import { ProblemStatus, ProblemSeverity, EvidenceDocument } from "@/types";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { getProblemDetailUrl } from "@/lib/seoUrls";
import confetti from "canvas-confetti";
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  BarChart3,
  DollarSign,
  Search,
  Code,
  Rocket,
  Zap,
  Sparkles,
  Check,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCode,
  Sliders,
  HelpCircle,
  ArrowRight,
  Maximize2,
  Minimize2,
  Trash2,
  Plus,
  ArrowLeft,
  Layers,
  ChevronRight,
  Globe,
  Clock,
  Briefcase,
  Copy,
} from "lucide-react";

interface AdminBulkProblemImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: (importedCount: number) => void;
  onOpenProblemEditor?: (problemId: string) => void;
}

export const AdminBulkProblemImportModal: React.FC<AdminBulkProblemImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
  onOpenProblemEditor,
}) => {
  const { user, userDoc } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Layout mode: full screen by default for big screen studio preview
  const [isFullscreen, setIsFullscreen] = useState(true);

  // Step: "upload" | "preview" | "importing" | "complete"
  const [step, setStep] = useState<"upload" | "preview" | "importing" | "complete">("upload");
  const [inputTab, setInputTab] = useState<"file" | "paste">("file");

  // Raw input state
  const [rawCsvText, setRawCsvText] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);

  // Settings
  const [defaultStatus, setDefaultStatus] = useState<ProblemStatus>("approved");
  const [customSubmitterName, setCustomSubmitterName] = useState<string>(
    userDoc?.name || user?.displayName || "Admin Dossier Scout"
  );

  // Parsed & validation state
  const [parsedRows, setParsedRows] = useState<ParsedProblemRow[]>([]);
  const [parseErrors, setParseErrors] = useState<Array<{ row: number; field: string; message: string }>>([]);
  const [detectedHeaders, setDetectedHeaders] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [previewFilter, setPreviewFilter] = useState<string>("");
  const [showSpecSheet, setShowSpecSheet] = useState<boolean>(false);

  // Active Selected Row for Deep 6-Module Inline Editing
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);
  const [activeModuleTab, setActiveModuleTab] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [mobilePane, setMobilePane] = useState<"list" | "detail">("list");

  // Execution state
  const [importProgress, setImportProgress] = useState<{ current: number; total: number; currentTitle: string }>({
    current: 0,
    total: 0,
    currentTitle: "",
  });
  const [createdResults, setCreatedResults] = useState<
    Array<{ id: string; title: string; success: boolean; error?: string }>
  >([]);

  // Keyboard shortcut: Esc to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && step !== "importing") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, step, onClose]);

  // Filtered rows for search in preview
  const filteredRows = useMemo(() => {
    return parsedRows
      .map((row, originalIndex) => ({ row, originalIndex }))
      .filter(({ row }) => {
        if (!previewFilter.trim()) return true;
        const q = previewFilter.toLowerCase();
        return (
          row.title.toLowerCase().includes(q) ||
          row.industry.toLowerCase().includes(q) ||
          row.description.toLowerCase().includes(q) ||
          row.location.toLowerCase().includes(q)
        );
      });
  }, [parsedRows, previewFilter]);

  if (!isOpen) return null;

  // Active row being inspected/edited
  const activeRow: ParsedProblemRow | undefined = parsedRows[activeRowIndex];

  // ─────────────────────────────────────────────────────────────────────────
  // Inline Editing Mutators
  // ─────────────────────────────────────────────────────────────────────────

  const updateActiveRow = (updater: (prev: ParsedProblemRow) => ParsedProblemRow) => {
    setParsedRows((prev) => {
      const next = [...prev];
      if (next[activeRowIndex]) {
        next[activeRowIndex] = updater(next[activeRowIndex]);
      }
      return next;
    });
  };

  const updateActiveField = <K extends keyof ParsedProblemRow>(field: K, value: ParsedProblemRow[K]) => {
    updateActiveRow((row) => ({ ...row, [field]: value }));
  };

  // Module 2: Data Points
  const handleUpdateDataPoint = (index: number, metric: string, label: string) => {
    updateActiveRow((row) => {
      const next = [...row.dataPoints];
      next[index] = { metric, label };
      return { ...row, dataPoints: next };
    });
  };

  const handleAddDataPoint = () => {
    updateActiveRow((row) => ({
      ...row,
      dataPoints: [...row.dataPoints, { metric: "50%", label: "Key statistical telemetry metric" }],
    }));
  };

  const handleRemoveDataPoint = (index: number) => {
    updateActiveRow((row) => ({
      ...row,
      dataPoints: row.dataPoints.filter((_, i) => i !== index),
    }));
  };

  // Module 2: Evidence Documents
  const handleUpdateEvidenceDoc = (index: number, field: keyof EvidenceDocument, value: string) => {
    updateActiveRow((row) => {
      const next = [...row.evidenceDocuments];
      next[index] = { ...next[index], [field]: value };
      return { ...row, evidenceDocuments: next };
    });
  };

  const handleAddEvidenceDoc = () => {
    updateActiveRow((row) => ({
      ...row,
      evidenceDocuments: [
        ...row.evidenceDocuments,
        {
          title: "New Research Paper / Industry Audit",
          url: "https://",
          description: "Benchmark survey and empirical report findings",
          type: "pdf",
        },
      ],
    }));
  };

  const handleRemoveEvidenceDoc = (index: number) => {
    updateActiveRow((row) => ({
      ...row,
      evidenceDocuments: row.evidenceDocuments.filter((_, i) => i !== index),
    }));
  };

  // Module 4: Competitors
  const handleUpdateCompetitor = (index: number, field: "solution" | "pros" | "cons", value: string) => {
    updateActiveRow((row) => {
      const next = [...row.competitors];
      next[index] = { ...next[index], [field]: value };
      return { ...row, competitors: next };
    });
  };

  const handleAddCompetitor = () => {
    updateActiveRow((row) => ({
      ...row,
      competitors: [
        ...row.competitors,
        { solution: "Legacy Alternative", pros: "High adoption", cons: "High manual overhead, poor scalability" },
      ],
    }));
  };

  const handleRemoveCompetitor = (index: number) => {
    updateActiveRow((row) => ({
      ...row,
      competitors: row.competitors.filter((_, i) => i !== index),
    }));
  };

  // Module 5: MVP Features
  const handleUpdateMvpFeature = (index: number, value: string) => {
    updateActiveRow((row) => {
      const next = [...row.mvpFeatures];
      next[index] = value;
      return { ...row, mvpFeatures: next };
    });
  };

  const handleAddMvpFeature = () => {
    updateActiveRow((row) => ({
      ...row,
      mvpFeatures: [...row.mvpFeatures, "New Core MVP Feature Specification"],
    }));
  };

  const handleRemoveMvpFeature = (index: number) => {
    updateActiveRow((row) => ({
      ...row,
      mvpFeatures: row.mvpFeatures.filter((_, i) => i !== index),
    }));
  };

  // Module 6: Startup Solution Gaps
  const handleUpdateStartupGap = (
    index: number,
    field: "name" | "description" | "weaknessType" | "weakness",
    value: string
  ) => {
    updateActiveRow((row) => {
      const next = [...row.startupSolutionsGaps];
      next[index] = { ...next[index], [field]: value };
      return { ...row, startupSolutionsGaps: next };
    });
  };

  const handleAddStartupGap = () => {
    updateActiveRow((row) => ({
      ...row,
      startupSolutionsGaps: [
        ...row.startupSolutionsGaps,
        {
          name: "Existing Player",
          description: "Incumbent solution in the market",
          weaknessType: "Weakness",
          weakness: "High friction and cost prohibitive for mid-tier practitioners",
        },
      ],
    }));
  };

  const handleRemoveStartupGap = (index: number) => {
    updateActiveRow((row) => ({
      ...row,
      startupSolutionsGaps: row.startupSolutionsGaps.filter((_, i) => i !== index),
    }));
  };

  // Module 6: Startup Exploration Directions
  const handleUpdateStartupDirection = (
    index: number,
    field: "type" | "title" | "description" | "pros" | "cons" | "techStack",
    value: any
  ) => {
    updateActiveRow((row) => {
      const next = [...row.startupDirections];
      next[index] = { ...next[index], [field]: value };
      return { ...row, startupDirections: next };
    });
  };

  const handleAddStartupDirection = () => {
    updateActiveRow((row) => ({
      ...row,
      startupDirections: [
        ...row.startupDirections,
        {
          type: "software",
          title: "Automated SaaS Platform",
          description: "Cloud micro-service delivering real-time workflow orchestration.",
          pros: "High gross margins, fast self-serve onboarding",
          cons: "Requires initial API integrations",
          techStack: ["Next.js", "Python / FastAPI", "PostgreSQL"],
        },
      ],
    }));
  };

  const handleRemoveStartupDirection = (index: number) => {
    updateActiveRow((row) => ({
      ...row,
      startupDirections: row.startupDirections.filter((_, i) => i !== index),
    }));
  };

  // Row Management
  const handleDeleteRow = (index: number) => {
    setParsedRows((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (activeRowIndex >= next.length) {
        setActiveRowIndex(Math.max(0, next.length - 1));
      }
      return next;
    });
    setSelectedIndices((prev) => {
      const next = new Set<number>();
      prev.forEach((idx) => {
        if (idx < index) next.add(idx);
        else if (idx > index) next.add(idx - 1);
      });
      return next;
    });
  };

  const handleDuplicateRow = (index: number) => {
    const toClone = parsedRows[index];
    if (!toClone) return;
    const cloned: ParsedProblemRow = {
      ...toClone,
      title: `${toClone.title} (Copy)`,
      _rawRowIndex: parsedRows.length + 1,
    };
    setParsedRows((prev) => [...prev, cloned]);
    setSelectedIndices((prev) => new Set([...prev, parsedRows.length]));
    setActiveRowIndex(parsedRows.length);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Handlers: File & Paste
  // ─────────────────────────────────────────────────────────────────────────

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setRawCsvText(text);
      processCsvText(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setRawCsvText(text);
      processCsvText(text);
    };
    reader.readAsText(file);
  };

  const handleLoadDemoData = () => {
    const sample = generateSampleProblemCsv();
    setFileName("sample-problems-demo.csv");
    setRawCsvText(sample);
    processCsvText(sample);
  };

  const handleDownloadTemplate = () => {
    const sample = generateSampleProblemCsv();
    downloadCsvFile("prblms-bulk-import-template.csv", sample);
  };

  const processCsvText = (text: string) => {
    if (!text.trim()) return;

    const result = parseProblemsFromCsv(text, {
      defaultStatus,
      defaultSubmitterName: customSubmitterName.trim() || userDoc?.name || "Admin Scout",
    });

    setParsedRows(result.validProblems);
    setParseErrors(result.errors);
    setDetectedHeaders(result.headersDetected);

    // Select all valid rows by default
    const allValid = new Set<number>();
    result.validProblems.forEach((_, idx) => allValid.add(idx));
    setSelectedIndices(allValid);
    setActiveRowIndex(0);

    if (result.validProblems.length > 0) {
      setStep("preview");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Row Selection Handlers
  // ─────────────────────────────────────────────────────────────────────────

  const toggleSelectRow = (index: number) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIndices.size === filteredRows.length) {
      setSelectedIndices(new Set());
    } else {
      const next = new Set<number>();
      filteredRows.forEach((item) => next.add(item.originalIndex));
      setSelectedIndices(next);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Bulk Execution Engine
  // ─────────────────────────────────────────────────────────────────────────

  const handleStartImport = async () => {
    const toImport = parsedRows.filter((_, idx) => selectedIndices.has(idx));
    if (toImport.length === 0) return;

    setStep("importing");
    setImportProgress({ current: 0, total: toImport.length, currentTitle: "" });
    const results: Array<{ id: string; title: string; success: boolean; error?: string }> = [];

    for (let i = 0; i < toImport.length; i++) {
      const p = toImport[i];
      setImportProgress({ current: i + 1, total: toImport.length, currentTitle: p.title });

      try {
        const authorName = p.isAnonymous
          ? "Anonymous Scout"
          : p.submitterName || customSubmitterName || userDoc?.name || "Admin Scout";

        const res = await createProblem({
          title: p.title.trim(),
          description: p.description.trim(),
          industry: p.industry,
          severity: p.severity,
          location: p.location.trim() || "Global",
          submittedByUid: userDoc?.uid || user?.uid || "admin",
          submittedByName: authorName,
          submitterUsername: p.isAnonymous ? undefined : userDoc?.username || undefined,
          whenItHappens: p.whenItHappens.trim(),
          whoFacesIt: p.whoFacesIt.trim(),
          whyFrustrating: p.whyFrustrating.trim(),
          frequency: p.frequency,
          currentSolution: p.currentSolution.trim(),
          audienceSize: p.audienceSize.trim(),
          willingnessToPay: p.willingnessToPay.trim(),
          estimatedValue: p.tam.trim(),
          psFrom: p.psFrom && p.psFrom.length > 0 ? p.psFrom : ["Own Thinking"],
          psFromCustom: p.psFromCustom?.trim() || "",
          marketData: {
            tam: p.tam.trim() || "$1.0B",
            currentPenetration: p.currentPenetration,
            wastedCost: p.wastedCost.trim() || "$250M",
            citizensAffected: p.citizensAffected.trim() || "5M+",
          },
          evidenceDocuments: p.evidenceDocuments,
          evidenceUrls: p.evidenceUrls,
          evidenceLinks: p.evidenceUrls,
          dataPoints: p.dataPoints,
          researchData: {
            keyFindings: p.keyFindings,
            methodology: p.researchMethodology.trim(),
            academicReferences: p.academicReferences,
          },
          competitorData: p.competitors,
          suggestedMVP: {
            coreFeatures: p.mvpFeatures,
            technicalRequirements: p.technicalRequirements.trim(),
            complianceStandards: p.complianceStandards,
          },
          hasStartupMode: p.hasStartupMode,
          startupModeEnabled: p.hasStartupMode,
          startupModeConfig: {
            enabled: p.hasStartupMode,
            thesis: p.startupThesis.trim(),
            targetSegments: p.startupTargetSegments,
            avgWillingnessToPay: p.startupWillingnessToPay.trim(),
            valuePropositionDraft: p.startupValueProp.trim(),
            existingSolutionsGaps: p.startupSolutionsGaps,
            directionsToExplore: p.startupDirections,
            validationQuestions: p.startupValidationQuestions,
            discoveryInterviewPrompt: p.discoveryInterviewPrompt.trim(),
            complianceStandards: p.complianceStandards,
          },
          aiScores: {
            suggestedAngles: p.suggestedAngles,
            keyRisks: p.keyRisks,
            aiConfidence: 96,
          } as any,
          status: p.status || defaultStatus,
        });

        if (res.success && res.problemId) {
          results.push({ id: res.problemId, title: p.title, success: true });
        } else {
          results.push({
            id: `err-${i}`,
            title: p.title,
            success: false,
            error: res.firestoreError || "Database save rejected",
          });
        }
      } catch (err: any) {
        results.push({
          id: `err-${i}`,
          title: p.title,
          success: false,
          error: err?.message || "Execution exception",
        });
      }
    }

    setCreatedResults(results);
    setStep("complete");

    const successCount = results.filter((r) => r.success).length;
    if (successCount > 0) {
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      onImportComplete?.(successCount);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setRawCsvText("");
    setFileName(null);
    setParsedRows([]);
    setParseErrors([]);
    setSelectedIndices(new Set());
    setActiveRowIndex(0);
    setCreatedResults([]);
  };

  // Severity color badges
  const getSeverityBadge = (severity: ProblemSeverity) => {
    switch (severity) {
      case "critical":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-500/10 text-rose-600 border border-rose-500/20">Critical</span>;
      case "major":
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20">Major</span>;
      case "medium":
        return <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20">Medium</span>;
      case "minor":
      default:
        return <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-zinc-500/10 text-zinc-600 border border-zinc-500/20">Minor</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm font-['Poppins',sans-serif] animate-fade-in p-0 md:p-3">
      {/* ── Main Container: Full Screen or Maximized Window ──────────────── */}
      <div
        className={`w-full h-full bg-surface-container-lowest text-on-surface flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen
            ? "fixed inset-0 rounded-0"
            : "max-w-7xl max-h-[94vh] rounded-3xl border border-outline-variant/30 shadow-2xl"
        }`}
      >
        {/* ── TOP HEADER BAR (Big Screen Popup Header with Close) ──────────── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-outline-variant/20 bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-2xs shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-on-surface tracking-tight truncate">
                  Bulk Problem Statement Ingestion Studio
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/15 text-primary uppercase">
                  Full 6-Module Live Editor
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant hidden md:block">
                Upload CSV dossiers, preview all modules, perform live inline editing, and push atomically to Cloud Firestore.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {step === "preview" && (
              <div className="hidden lg:flex items-center gap-2 mr-2">
                <span className="text-xs font-semibold text-on-surface-variant">
                  <strong className="text-primary">{selectedIndices.size}</strong> of {parsedRows.length} selected
                </span>
              </div>
            )}

            <button
              onClick={handleDownloadTemplate}
              className="px-2.5 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              title="Download standard universal 6-module CSV template"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span className="hidden md:inline">Universal CSV Template</span>
            </button>

            <button
              onClick={() => setShowSpecSheet(!showSpecSheet)}
              className="px-2.5 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="View Column Schema & Delimiter Reference"
            >
              <HelpCircle className="w-3.5 h-3.5 text-secondary" />
              <span className="hidden md:inline">Format Guide</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface hidden md:flex items-center justify-center transition-all cursor-pointer"
              title={isFullscreen ? "Restore windowed view" : "Maximize to full screen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={step === "importing"}
              className="w-8 h-8 rounded-xl bg-surface-container hover:bg-rose-500/10 hover:text-rose-600 text-on-surface-variant flex items-center justify-center transition-all cursor-pointer disabled:opacity-30"
              title="Close Bulk Ingestion Studio (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Slide-down CSV Specification Sheet ─────────────────────────── */}
        {showSpecSheet && (
          <div className="p-4 bg-surface-container-low border-b border-outline-variant/20 max-h-64 overflow-y-auto text-xs space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-on-surface uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                <span>6-Module Universal CSV Reference</span>
              </span>
              <button onClick={() => setShowSpecSheet(false)} className="text-[11px] text-primary font-bold hover:underline">
                Close Guide
              </button>
            </div>
            <p className="text-on-surface-variant text-[11px] leading-relaxed">
              Every column name is case-insensitive. Lists can be separated by <code className="font-mono text-primary font-bold">|</code> or <code className="font-mono text-primary font-bold">;</code>. Sub-fields use <code className="font-mono text-primary font-bold">::</code> (e.g. <code>metric::label</code>, <code>solution::pros::cons</code>).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {PROBLEM_CSV_SPEC.slice(0, 16).map((spec) => (
                <div key={spec.key} className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface text-[11px]">{spec.header}</span>
                    <span className="text-[9px] text-primary">{spec.module.split(".")[1]?.trim()}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5 truncate">{spec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 1: Upload / Input Zone ─────────────────────────────────── */}
        {step === "upload" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full flex flex-col justify-center space-y-6 animate-fade-in">
            {/* Quick Banner & Settings Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Default Publication Status</span>
                </label>
                <select
                  value={defaultStatus}
                  onChange={(e) => setDefaultStatus(e.target.value as ProblemStatus)}
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary font-medium cursor-pointer"
                >
                  <option value="approved">Approved & Verified (Publish Directly to Platform)</option>
                  <option value="pending">Pending (Send to Admin Review Queue)</option>
                  <option value="under_review">Under Review</option>
                </select>
                <span className="text-[10px] text-on-surface-variant">
                  Can be edited inline for each row before publishing.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  <span>Submitter Attribution</span>
                </label>
                <input
                  type="text"
                  value={customSubmitterName}
                  onChange={(e) => setCustomSubmitterName(e.target.value)}
                  placeholder="e.g. Admin Dossier Scout"
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary font-medium placeholder:text-on-surface-variant"
                />
                <span className="text-[10px] text-on-surface-variant">
                  Current user: <strong>{userDoc?.name || "Admin"}</strong>
                </span>
              </div>
            </div>

            {/* Input Mode Selector */}
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInputTab("file")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inputTab === "file"
                      ? "bg-primary text-white shadow-2xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload CSV File</span>
                </button>
                <button
                  onClick={() => setInputTab("paste")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inputTab === "paste"
                      ? "bg-primary text-white shadow-2xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Paste Raw CSV Text</span>
                </button>
              </div>

              <button
                onClick={handleLoadDemoData}
                className="px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load 3 Production Demo Statements</span>
              </button>
            </div>

            {/* Drag & Drop Upload Zone */}
            {inputTab === "file" && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-outline-variant/50 hover:border-primary/70 bg-surface-container-low/40 hover:bg-surface-container-low transition-all rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-4 cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv,text/plain"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="w-16 h-16 rounded-2xl bg-surface-container-high group-hover:scale-105 group-hover:bg-primary/10 text-primary flex items-center justify-center transition-all shadow-sm">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-on-surface">
                    Drop your CSV file here to preview & edit
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-md">
                    Seamlessly parses all 6 modules from Excel or Google Sheets exports. You will get full inline editing capabilities on the next screen.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs">
                    Browse CSV Files
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadTemplate();
                    }}
                    className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold border border-outline-variant/30 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Template</span>
                  </button>
                </div>
              </div>
            )}

            {/* Raw Textarea Paste Tab */}
            {inputTab === "paste" && (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={14}
                  value={rawCsvText}
                  onChange={(e) => setRawCsvText(e.target.value)}
                  placeholder={`"Problem Title","Description","Industry","Severity","Location","Frequency","Who Faces It","When It Happens","Why Frustrating","Current Solution","Data Points","TAM","Competitors","MVP Features","Startup Mode Enabled"
"Data Interoperability Failure in Rural Clinics","Rural clinics lack a unified record system...","Healthcare","critical","Global","Daily","Rural clinic admins...","During patient transfers...","Staff spend hours faxing...","Thermal fax","64%::Fax reliance | $1.8B::Annual waste","$4.8B","Epic::Seamless within Epic::Expensive | Fax::Universal::Zero parsing","Universal FHIR bridge | Offline SQLite cache","true"`}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl text-xs font-mono text-on-surface outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-y placeholder:text-on-surface-variant"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    disabled={!rawCsvText.trim()}
                    onClick={() => processCsvText(rawCsvText)}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>Inspect & Open Studio Preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: FULL-SCREEN MASTER-DETAIL INLINE EDITING STUDIO ─────── */}
        {step === "preview" && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-surface">
            {/* ── LEFT PANE: MASTER ROW LIST ──────────────────────────────── */}
            <div
              className={`w-full md:w-80 lg:w-96 border-r border-outline-variant/20 flex flex-col bg-surface-container-lowest shrink-0 ${
                mobilePane === "detail" ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Search & Bulk Select Strip */}
              <div className="p-3 border-b border-outline-variant/20 space-y-2 bg-surface-container-low/40">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant" />
                  <input
                    type="text"
                    value={previewFilter}
                    onChange={(e) => setPreviewFilter(e.target.value)}
                    placeholder="Search statements..."
                    className="w-full pl-8 pr-3 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary placeholder:text-on-surface-variant"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={toggleSelectAll}
                    className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-1.5 text-[11px]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      {selectedIndices.size === filteredRows.length ? "Deselect All" : "Select All"} ({selectedIndices.size}/{filteredRows.length})
                    </span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="text-on-surface-variant hover:text-on-surface text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-upload</span>
                  </button>
                </div>
              </div>

              {/* Rows List */}
              <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/15">
                {filteredRows.map(({ row, originalIndex }) => {
                  const isSelected = selectedIndices.has(originalIndex);
                  const isActive = activeRowIndex === originalIndex;

                  return (
                    <div
                      key={originalIndex}
                      onClick={() => {
                        setActiveRowIndex(originalIndex);
                        setMobilePane("detail");
                      }}
                      className={`p-3 transition-all cursor-pointer group flex items-start gap-2.5 ${
                        isActive
                          ? "bg-primary/10 border-l-4 border-primary"
                          : "hover:bg-surface-container-low/60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelectRow(originalIndex);
                        }}
                        className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer mt-0.5 shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono font-bold text-on-surface-variant">
                            #{originalIndex + 1}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-secondary/10 text-secondary border border-secondary/20">
                            {row.industry}
                          </span>
                          {getSeverityBadge(row.severity)}
                        </div>
                        <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                          {row.title}
                        </p>
                        <p className="text-[10px] text-on-surface-variant line-clamp-1">
                          {row.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
                        <span className="text-[9px] font-mono text-on-surface-variant font-semibold">
                          {row.tam || "$1.0B"}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 text-on-surface-variant ${isActive ? "text-primary" : ""}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT PANE: DETAIL 6-MODULE INLINE STUDIO ────────────────── */}
            {activeRow ? (
              <div
                className={`flex-1 flex flex-col overflow-hidden bg-surface-container-lowest ${
                  mobilePane === "list" ? "hidden md:flex" : "flex"
                }`}
              >
                {/* Active Row Top Breadcrumb & Actions */}
                <div className="p-3 sm:p-4 border-b border-outline-variant/20 bg-surface-container-low/30 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => setMobilePane("list")}
                      className="md:hidden p-1.5 rounded-lg bg-surface-container text-on-surface"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-surface-container text-on-surface-variant">
                      Dossier #{activeRowIndex + 1} of {parsedRows.length}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-on-surface truncate">
                      {activeRow.title || "Untitled Statement"}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDuplicateRow(activeRowIndex)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold text-on-surface flex items-center gap-1 cursor-pointer"
                      title="Duplicate this dossier"
                    >
                      <Copy className="w-3.5 h-3.5 text-secondary" />
                      <span className="hidden sm:inline">Duplicate</span>
                    </button>

                    <button
                      onClick={() => handleDeleteRow(activeRowIndex)}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      title="Remove this dossier from import"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>

                {/* 6-Module Navigation Tabs Bar */}
                <div className="px-3 sm:px-6 pt-2 border-b border-outline-variant/20 bg-surface-container-lowest flex items-center gap-1 overflow-x-auto hide-scrollbar shrink-0">
                  {[
                    { id: 1, label: "1. Core Narrative", icon: FileText },
                    { id: 2, label: "2. Evidence & Data", icon: BarChart3 },
                    { id: 3, label: "3. Market & Impact", icon: DollarSign },
                    { id: 4, label: "4. Research & Rivals", icon: Search },
                    { id: 5, label: "5. MVP Specs", icon: Code },
                    { id: 6, label: "6. Startup Mode", icon: Rocket },
                  ].map((tab) => {
                    const isActive = activeModuleTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveModuleTab(tab.id as any)}
                        className={`px-3 py-2 rounded-t-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                          isActive
                            ? "border-primary text-primary bg-primary/5"
                            : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Module Inline Form Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                  {/* ── MODULE 1: CORE NARRATIVE ────────────────────────── */}
                  {activeModuleTab === 1 && (
                    <div className="space-y-4 max-w-4xl animate-fade-in text-xs">
                      {/* Problem Statement Title */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                          <span>Problem Statement Title <span className="text-error">*</span></span>
                          <span className="text-[10px] text-on-surface-variant font-normal">Domain-focused headline</span>
                        </label>
                        <input
                          type="text"
                          value={activeRow.title}
                          onChange={(e) => updateActiveField("title", e.target.value)}
                          placeholder="e.g. Data Interoperability Failure in Rural Clinics"
                          className="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs md:text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      {/* Problem Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                          <span>Core Issue Summary / Description <span className="text-error">*</span></span>
                          <span className="text-[10px] text-on-surface-variant font-normal">Operational abstract</span>
                        </label>
                        <textarea
                          rows={4}
                          value={activeRow.description}
                          onChange={(e) => updateActiveField("description", e.target.value)}
                          placeholder="Detailed explanation of the friction..."
                          className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                        />
                      </div>

                      {/* Industry, Severity, Location, Frequency */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Industry Domain</label>
                          <select
                            value={activeRow.industry}
                            onChange={(e) => updateActiveField("industry", e.target.value)}
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                          >
                            {REAL_INDUSTRIES.map((ind) => (
                              <option key={ind.id} value={ind.name}>{ind.name}</option>
                            ))}
                            {!REAL_INDUSTRIES.some((ind) => ind.name === activeRow.industry) && (
                              <option value={activeRow.industry}>{activeRow.industry}</option>
                            )}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Severity</label>
                          <select
                            value={activeRow.severity}
                            onChange={(e) => updateActiveField("severity", e.target.value as ProblemSeverity)}
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary cursor-pointer capitalize"
                          >
                            <option value="critical">Critical</option>
                            <option value="major">Major</option>
                            <option value="medium">Medium</option>
                            <option value="minor">Minor</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Location / Region</label>
                          <input
                            type="text"
                            value={activeRow.location}
                            onChange={(e) => updateActiveField("location", e.target.value)}
                            placeholder="e.g. Global, Rural US"
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Frequency</label>
                          <select
                            value={activeRow.frequency}
                            onChange={(e) => updateActiveField("frequency", e.target.value)}
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                          >
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Continuous">Continuous</option>
                            <option value="Rare / Critical">Rare / Critical</option>
                          </select>
                        </div>
                      </div>

                      {/* Who Faces It & When It Happens */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Who Faces It (Affected Demographic)</label>
                          <textarea
                            rows={2}
                            value={activeRow.whoFacesIt}
                            onChange={(e) => updateActiveField("whoFacesIt", e.target.value)}
                            className="p-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">When It Happens (Workflow Trigger)</label>
                          <textarea
                            rows={2}
                            value={activeRow.whenItHappens}
                            onChange={(e) => updateActiveField("whenItHappens", e.target.value)}
                            className="p-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      {/* Why Frustrating & Current Solution */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Why Frustrating (Operational Friction)</label>
                          <textarea
                            rows={2}
                            value={activeRow.whyFrustrating}
                            onChange={(e) => updateActiveField("whyFrustrating", e.target.value)}
                            className="p-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Current Solution / Workarounds</label>
                          <textarea
                            rows={2}
                            value={activeRow.currentSolution}
                            onChange={(e) => updateActiveField("currentSolution", e.target.value)}
                            className="p-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      {/* Submitter & Attribution */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-outline-variant/20">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Submitter Name</label>
                          <input
                            type="text"
                            value={activeRow.submitterName}
                            onChange={(e) => updateActiveField("submitterName", e.target.value)}
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Submitter Role</label>
                          <input
                            type="text"
                            value={activeRow.submitterRole || ""}
                            onChange={(e) => updateActiveField("submitterRole", e.target.value)}
                            placeholder="e.g. Lead Clinical Director"
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface">Credits / Challenge Source</label>
                          <input
                            type="text"
                            value={activeRow.psFrom.join("; ")}
                            onChange={(e) =>
                              updateActiveField(
                                "psFrom",
                                e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="e.g. Own Thinking; SIH 2026"
                            className="px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── MODULE 2: EVIDENCE & DATA ───────────────────────── */}
                  {activeModuleTab === 2 && (
                    <div className="space-y-5 max-w-4xl animate-fade-in text-xs">
                      {/* Telemetry Data Points */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-primary" />
                            <span>Telemetry Metrics ({activeRow.dataPoints.length})</span>
                          </span>
                          <button
                            onClick={handleAddDataPoint}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Data Point</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {activeRow.dataPoints.map((dp, i) => (
                            <div key={i} className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/20">
                              <input
                                type="text"
                                value={dp.metric}
                                onChange={(e) => handleUpdateDataPoint(i, e.target.value, dp.label)}
                                placeholder="e.g. 64%"
                                className="w-24 px-2 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-mono font-bold text-primary"
                              />
                              <input
                                type="text"
                                value={dp.label}
                                onChange={(e) => handleUpdateDataPoint(i, dp.metric, e.target.value)}
                                placeholder="Metric label and explanation"
                                className="flex-1 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs text-on-surface"
                              />
                              <button
                                onClick={() => handleRemoveDataPoint(i)}
                                className="p-1.5 text-error hover:bg-error/10 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Evidence Documents */}
                      <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-secondary" />
                            <span>Attached Evidence Documents ({activeRow.evidenceDocuments.length})</span>
                          </span>
                          <button
                            onClick={handleAddEvidenceDoc}
                            className="px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Document</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {activeRow.evidenceDocuments.map((doc, i) => (
                            <div key={i} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={doc.title}
                                  onChange={(e) => handleUpdateEvidenceDoc(i, "title", e.target.value)}
                                  placeholder="Document title"
                                  className="flex-1 px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-bold text-on-surface"
                                />
                                <input
                                  type="text"
                                  value={doc.url}
                                  onChange={(e) => handleUpdateEvidenceDoc(i, "url", e.target.value)}
                                  placeholder="https://..."
                                  className="w-48 px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs text-primary font-mono"
                                />
                                <button
                                  onClick={() => handleRemoveEvidenceDoc(i)}
                                  className="p-1.5 text-error hover:bg-error/10 rounded-lg"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <input
                                type="text"
                                value={doc.description || ""}
                                onChange={(e) => handleUpdateEvidenceDoc(i, "description", e.target.value)}
                                placeholder="Brief description of the document"
                                className="w-full px-2.5 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-[11px] text-on-surface-variant"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Evidence URLs */}
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-outline-variant/20">
                        <label className="text-xs font-bold text-on-surface">External Reference URLs (Separated by semicolons)</label>
                        <input
                          type="text"
                          value={activeRow.evidenceUrls.join("; ")}
                          onChange={(e) =>
                            updateActiveField(
                              "evidenceUrls",
                              e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="https://...; https://..."
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs font-mono text-primary outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── MODULE 3: MARKET & IMPACT ───────────────────────── */}
                  {activeModuleTab === 3 && (
                    <div className="space-y-4 max-w-4xl animate-fade-in text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                          <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                            <span>Total Addressable Market (TAM)</span>
                          </label>
                          <input
                            type="text"
                            value={activeRow.tam}
                            onChange={(e) => updateActiveField("tam", e.target.value)}
                            placeholder="e.g. $4.8B"
                            className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-extrabold text-on-surface font-mono"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                          <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                            <span>Current Solution Penetration (%)</span>
                          </label>
                          <input
                            type="number"
                            value={activeRow.currentPenetration}
                            onChange={(e) => updateActiveField("currentPenetration", parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-extrabold text-on-surface font-mono"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                          <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                            <span>Annual Wasted Inefficiency Cost</span>
                          </label>
                          <input
                            type="text"
                            value={activeRow.wastedCost}
                            onChange={(e) => updateActiveField("wastedCost", e.target.value)}
                            placeholder="e.g. $1.8B"
                            className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-extrabold text-on-surface font-mono"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                          <label className="text-xs font-bold text-on-surface">Citizens / Individuals Impacted</label>
                          <input
                            type="text"
                            value={activeRow.citizensAffected}
                            onChange={(e) => updateActiveField("citizensAffected", e.target.value)}
                            placeholder="e.g. 46 million"
                            className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs font-bold text-on-surface"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                          <label className="text-xs font-bold text-on-surface">Target Audience Size</label>
                          <input
                            type="text"
                            value={activeRow.audienceSize}
                            onChange={(e) => updateActiveField("audienceSize", e.target.value)}
                            placeholder="e.g. 4,500+ clinics & 28,000 specialists"
                            className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs font-bold text-on-surface"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
                          <label className="text-xs font-bold text-on-surface">Willingness To Pay (ACV)</label>
                          <input
                            type="text"
                            value={activeRow.willingnessToPay}
                            onChange={(e) => updateActiveField("willingnessToPay", e.target.value)}
                            placeholder="e.g. $150/mo per practitioner"
                            className="px-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs font-bold text-emerald-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── MODULE 4: RESEARCH & RIVALS ─────────────────────── */}
                  {activeModuleTab === 4 && (
                    <div className="space-y-5 max-w-4xl animate-fade-in text-xs">
                      {/* Competitor Analysis */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5 text-purple-600" />
                            <span>Competitor Landscape ({activeRow.competitors.length})</span>
                          </span>
                          <button
                            onClick={handleAddCompetitor}
                            className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Competitor</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeRow.competitors.map((c, i) => (
                            <div key={i} className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                              <div className="flex items-center justify-between">
                                <input
                                  type="text"
                                  value={c.solution}
                                  onChange={(e) => handleUpdateCompetitor(i, "solution", e.target.value)}
                                  placeholder="Competitor / Status Quo Name"
                                  className="w-full px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-extrabold text-on-surface"
                                />
                                <button
                                  onClick={() => handleRemoveCompetitor(i)}
                                  className="p-1.5 text-error hover:bg-error/10 rounded-lg ml-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={c.pros}
                                onChange={(e) => handleUpdateCompetitor(i, "pros", e.target.value)}
                                placeholder="Pros / Strengths..."
                                className="w-full p-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-[11px] text-emerald-600"
                              />
                              <textarea
                                rows={2}
                                value={c.cons}
                                onChange={(e) => handleUpdateCompetitor(i, "cons", e.target.value)}
                                placeholder="Cons / Fatal Flaws..."
                                className="w-full p-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-[11px] text-rose-600"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Research Methodology */}
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-outline-variant/20">
                        <label className="text-xs font-bold text-on-surface">Research Methodology</label>
                        <textarea
                          rows={2}
                          value={activeRow.researchMethodology}
                          onChange={(e) => updateActiveField("researchMethodology", e.target.value)}
                          placeholder="How empirical research was performed..."
                          className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface"
                        />
                      </div>

                      {/* Key Findings */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-on-surface">Key Research Findings (Separated by | or newlines)</label>
                        <textarea
                          rows={3}
                          value={activeRow.keyFindings.join(" | ")}
                          onChange={(e) =>
                            updateActiveField(
                              "keyFindings",
                              e.target.value.split(/[|\n]/).map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface font-mono"
                        />
                      </div>

                      {/* Academic References */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-on-surface">Academic Publications & Citations (Separated by |)</label>
                        <input
                          type="text"
                          value={activeRow.academicReferences.join(" | ")}
                          onChange={(e) =>
                            updateActiveField(
                              "academicReferences",
                              e.target.value.split("|").map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="'Paper Title', Journal (2026)"
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── MODULE 5: MVP SPECS ─────────────────────────────── */}
                  {activeModuleTab === 5 && (
                    <div className="space-y-5 max-w-4xl animate-fade-in text-xs">
                      {/* Suggested Core Features */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5 text-cyan-600" />
                            <span>Suggested MVP Features ({activeRow.mvpFeatures.length})</span>
                          </span>
                          <button
                            onClick={handleAddMvpFeature}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add MVP Feature</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {activeRow.mvpFeatures.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/20">
                              <span className="w-6 text-center font-mono font-bold text-on-surface-variant">
                                #{i + 1}
                              </span>
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => handleUpdateMvpFeature(i, e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-medium text-on-surface"
                              />
                              <button
                                onClick={() => handleRemoveMvpFeature(i)}
                                className="p-1.5 text-error hover:bg-error/10 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Requirements */}
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-outline-variant/20">
                        <label className="text-xs font-bold text-on-surface">Technical & Architecture Requirements</label>
                        <textarea
                          rows={3}
                          value={activeRow.technicalRequirements}
                          onChange={(e) => updateActiveField("technicalRequirements", e.target.value)}
                          placeholder="Latency, protocols, database schemas, hosting requirements..."
                          className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface font-mono leading-relaxed"
                        />
                      </div>

                      {/* Compliance Standards */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-on-surface">Compliance & Regulatory Standards (Separated by semicolons)</label>
                        <input
                          type="text"
                          value={activeRow.complianceStandards.join("; ")}
                          onChange={(e) =>
                            updateActiveField(
                              "complianceStandards",
                              e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="e.g. HIPAA BAA Compliant; SOC2 Type II Ready; FHIR / HL7"
                          className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── MODULE 6: STARTUP MODE ──────────────────────────── */}
                  {activeModuleTab === 6 && (
                    <div className="space-y-5 max-w-4xl animate-fade-in text-xs">
                      {/* Enable Switch */}
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                        <div>
                          <span className="font-extrabold text-on-surface block text-xs">Enable Startup Mode & Venture Blueprint</span>
                          <span className="text-[10px] text-on-surface-variant">Generates founder discovery blueprint and investment telemetry</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={activeRow.hasStartupMode}
                          onChange={(e) => updateActiveField("hasStartupMode", e.target.checked)}
                          className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                        />
                      </div>

                      {activeRow.hasStartupMode && (
                        <>
                          {/* Venture Thesis */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-on-surface">Venture Investment Thesis</label>
                            <textarea
                              rows={3}
                              value={activeRow.startupThesis}
                              onChange={(e) => updateActiveField("startupThesis", e.target.value)}
                              placeholder="Why this is a venture-scale opportunity..."
                              className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface leading-relaxed"
                            />
                          </div>

                          {/* Target Segments & Value Prop */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-on-surface">Target Beachhead Segments (Separated by ;)</label>
                              <input
                                type="text"
                                value={activeRow.startupTargetSegments.join("; ")}
                                onChange={(e) =>
                                  updateActiveField(
                                    "startupTargetSegments",
                                    e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
                                  )
                                }
                                placeholder="Segment 1; Segment 2..."
                                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-on-surface">Draft Value Proposition</label>
                              <input
                                type="text"
                                value={activeRow.startupValueProp}
                                onChange={(e) => updateActiveField("startupValueProp", e.target.value)}
                                placeholder="One-sentence value proposition"
                                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface"
                              />
                            </div>
                          </div>

                          {/* Existing Solutions Gaps */}
                          <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                                <Rocket className="w-3.5 h-3.5 text-amber-600" />
                                <span>Existing Solutions Gaps ({activeRow.startupSolutionsGaps.length})</span>
                              </span>
                              <button
                                onClick={handleAddStartupGap}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Gap</span>
                              </button>
                            </div>

                            <div className="space-y-2">
                              {activeRow.startupSolutionsGaps.map((g, i) => (
                                <div key={i} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={g.name}
                                      onChange={(e) => handleUpdateStartupGap(i, "name", e.target.value)}
                                      placeholder="Solution name"
                                      className="w-44 px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-bold text-on-surface"
                                    />
                                    <select
                                      value={g.weaknessType}
                                      onChange={(e) => handleUpdateStartupGap(i, "weaknessType", e.target.value as any)}
                                      className="px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-semibold text-on-surface"
                                    >
                                      <option value="Weakness">Weakness</option>
                                      <option value="Gap">Gap</option>
                                    </select>
                                    <button
                                      onClick={() => handleRemoveStartupGap(i)}
                                      className="p-1.5 text-error hover:bg-error/10 rounded-lg ml-auto"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={g.weakness}
                                    onChange={(e) => handleUpdateStartupGap(i, "weakness", e.target.value)}
                                    placeholder="Specific weakness or market gap..."
                                    className="w-full px-2.5 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-[11px] text-rose-600"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Exploration Directions */}
                          <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-primary" />
                                <span>Venture Exploration Directions ({activeRow.startupDirections.length})</span>
                              </span>
                              <button
                                onClick={handleAddStartupDirection}
                                className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Direction</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {activeRow.startupDirections.map((dir, i) => (
                                <div key={i} className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <input
                                      type="text"
                                      value={dir.title}
                                      onChange={(e) => handleUpdateStartupDirection(i, "title", e.target.value)}
                                      placeholder="Direction Title"
                                      className="flex-1 px-2.5 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-extrabold text-on-surface"
                                    />
                                    <select
                                      value={dir.type}
                                      onChange={(e) => handleUpdateStartupDirection(i, "type", e.target.value)}
                                      className="px-2 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-xs font-semibold text-primary ml-2 uppercase text-[10px]"
                                    >
                                      <option value="software">Software</option>
                                      <option value="service">Service</option>
                                      <option value="hardware">Hardware</option>
                                      <option value="hybrid">Hybrid</option>
                                    </select>
                                    <button
                                      onClick={() => handleRemoveStartupDirection(i)}
                                      className="p-1 text-error hover:bg-error/10 rounded-lg ml-1"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={dir.description}
                                    onChange={(e) => handleUpdateStartupDirection(i, "description", e.target.value)}
                                    placeholder="Direction concept and architecture..."
                                    className="w-full p-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-[11px] text-on-surface"
                                  />
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={dir.techStack?.join(", ") || ""}
                                      onChange={(e) =>
                                        handleUpdateStartupDirection(
                                          i,
                                          "techStack",
                                          e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                        )
                                      }
                                      placeholder="Tech stack (comma-separated)"
                                      className="w-full px-2 py-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-[10px] font-mono text-on-surface-variant"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Validation Questions & Discovery Prompt */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-outline-variant/20">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-on-surface">Founder Validation Questions (Separated by |)</label>
                              <textarea
                                rows={3}
                                value={activeRow.startupValidationQuestions.join(" | ")}
                                onChange={(e) =>
                                  updateActiveField(
                                    "startupValidationQuestions",
                                    e.target.value.split("|").map((s) => s.trim()).filter(Boolean)
                                  )
                                }
                                className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface font-mono"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-on-surface">Customer Discovery Interview Prompt</label>
                              <textarea
                                rows={3}
                                value={activeRow.discoveryInterviewPrompt}
                                onChange={(e) => updateActiveField("discoveryInterviewPrompt", e.target.value)}
                                placeholder="Primary question for interviews..."
                                className="w-full p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface leading-relaxed"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8 text-on-surface-variant">
                <p className="text-xs">Select a dossier from the list to preview and edit its 6 modules.</p>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: Executing / Progress Screen ─────────────────────────── */}
        {step === "importing" && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center shadow-md animate-pulse">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-on-surface">
                Publishing Dossiers to Platform...
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Posting problem #{importProgress.current} of {importProgress.total}:
              </p>
              <p className="text-xs font-bold text-primary mt-1 truncate max-w-xs mx-auto">
                "{importProgress.currentTitle}"
              </p>
            </div>

            <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden border border-outline-variant/20">
              <div
                className="bg-primary h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.round((importProgress.current / Math.max(1, importProgress.total)) * 100)}%`,
                }}
              />
            </div>

            <span className="text-xs font-mono font-bold text-on-surface-variant">
              {Math.round((importProgress.current / Math.max(1, importProgress.total)) * 100)}% Complete
            </span>
          </div>
        )}

        {/* ── STEP 4: Completion Screen ─────────────────────────────────── */}
        {step === "complete" && (
          <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-6 flex flex-col justify-center animate-fade-in">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-on-surface">
                Bulk Import Finished!
              </h3>
              <p className="text-xs text-on-surface-variant max-w-md">
                Successfully posted <strong>{createdResults.filter((r) => r.success).length}</strong> of{" "}
                <strong>{createdResults.length}</strong> dossiers to Cloud Firestore and local registry.
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20">
              {createdResults.map((r, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {r.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-error shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="font-bold text-on-surface block truncate">{r.title}</span>
                      {r.success ? (
                        <span className="text-[10px] font-mono text-emerald-600">ID: {r.id}</span>
                      ) : (
                        <span className="text-[10px] text-error font-medium">{r.error}</span>
                      )}
                    </div>
                  </div>

                  {r.success && (
                    <div className="flex items-center gap-2 shrink-0">
                      {onOpenProblemEditor && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenProblemEditor(r.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Edit in Studio
                        </button>
                      )}
                      <a
                        href={getProblemDetailUrl(r.id, r.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-all"
                        title="Open Live Public Dossier"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BOTTOM FOOTER CONTROLS ─────────────────────────────────────── */}
        <div className="px-4 sm:px-6 py-3 border-t border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between gap-3 shrink-0">
          {step === "upload" && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer transition-all"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadDemoData}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold text-on-surface transition-all cursor-pointer shadow-2xs"
                >
                  Load Demo Data
                </button>
              </div>
            </>
          )}

          {step === "preview" && (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer transition-all border border-outline-variant/20"
                >
                  Discard & Re-upload
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[11px] text-on-surface-variant font-medium">Status for selected:</span>
                  <select
                    value={defaultStatus}
                    onChange={(e) => setDefaultStatus(e.target.value as ProblemStatus)}
                    className="px-2.5 py-1 bg-surface-container border border-outline-variant/30 rounded-lg text-xs font-semibold text-on-surface outline-none cursor-pointer"
                  >
                    <option value="approved">Approved & Verified</option>
                    <option value="pending">Pending Review</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={selectedIndices.size === 0}
                  onClick={handleStartImport}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Publish {selectedIndices.size} Problems to Platform →</span>
                </button>
              </div>
            </>
          )}

          {step === "importing" && (
            <div className="w-full flex items-center justify-center text-xs font-semibold text-on-surface-variant">
              <span>Synchronizing dossiers to Cloud Firestore... please keep this window open.</span>
            </div>
          )}

          {step === "complete" && (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-primary hover:underline cursor-pointer transition-all"
              >
                Import Another Batch
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Done & Return to Control System
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
