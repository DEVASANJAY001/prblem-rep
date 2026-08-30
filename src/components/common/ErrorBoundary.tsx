import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Copy, Check, Trash2, ChevronDown, ChevronUp, LifeBuoy } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null, copied: false, showDetails: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught application runtime error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, copied: false, showDetails: false });
    window.location.reload();
  };

  private handleClearCacheAndHome = () => {
    try {
      sessionStorage.clear();
      // Keep essential auth tokens, clear cache entries
      const keysToKeep = ["prblms_auth_user", "firebase:authUser"];
      Object.keys(localStorage).forEach((key) => {
        if (!keysToKeep.some((k) => key.includes(k))) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn("Could not clear cache:", e);
    }
    window.location.href = "/";
  };

  private handleCopyDiagnostics = () => {
    const report = `--- ProblemAtlas Error Report ---
Timestamp: ${new Date().toISOString()}
URL: ${window.location.href}
UserAgent: ${navigator.userAgent}
Error: ${this.state.error?.name || "Error"}: ${this.state.error?.message || "Unknown error"}
Stack:
${this.state.error?.stack || "No stack trace"}
Component Stack:
${this.state.errorInfo?.componentStack || "No component stack"}
---------------------------------`;

    navigator.clipboard.writeText(report);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 3000);
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] w-full flex items-center justify-center p-4 sm:p-6 font-['Poppins',sans-serif] text-on-surface">
          <div className="max-w-xl w-full bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 animate-fade-in">
            {/* Error Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm">
              <AlertTriangle className="h-8 w-8" />
            </div>

            {/* Error Title & Explanations */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
                Something unexpected occurred
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                An isolated interface error happened while rendering this section. Your personal account, drafts, and data remain secure.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary-container transition-all cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Return to Home</span>
              </a>
            </div>

            {/* Secondary Diagnostics & Reset Options */}
            <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-center gap-2 text-xs">
              <button
                onClick={this.handleCopyDiagnostics}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
              >
                {this.state.copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{this.state.copied ? "Diagnostic Report Copied!" : "Copy Diagnostics"}</span>
              </button>

              <button
                onClick={this.handleClearCacheAndHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                title="Clears cached session data and redirects to homepage"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cache & Reset</span>
              </button>

              <button
                onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
              >
                <span>{this.state.showDetails ? "Hide Error Details" : "View Details"}</span>
                {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Collapsible Error Stack Details */}
            {this.state.showDetails && this.state.error && (
              <div className="mt-4 text-left animate-fade-in">
                <div className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto space-y-2 max-h-60 overflow-y-auto">
                  <p className="text-rose-400 font-bold">{this.state.error.name}: {this.state.error.message}</p>
                  {this.state.error.stack && (
                    <pre className="text-zinc-500 whitespace-pre-wrap text-[10px] leading-relaxed">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
