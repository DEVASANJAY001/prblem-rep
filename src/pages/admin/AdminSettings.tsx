import React, { useState, useEffect } from "react";
import { generateAdminInvite, subscribeAuditLogs, logAdminAction } from "@/lib/firebase/services/adminService";
import { seedAllToFirebase, SeedResult } from "@/lib/firebase/services/seedService";
import { useAuth } from "@/contexts/AuthContext";
import { AuditLogDoc } from "@/types";
import { Settings, Key, Shield, Check, Copy, Activity, RefreshCw, Trash2, Sparkles, CheckCircle2, CloudUpload, Database, Globe, Download, FileCode } from "lucide-react";
import { saveProblem, getProblems } from "@/lib/storage";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { buildSitemapXml } from "@/lib/sitemapGenerator";
import { ProblemDoc } from "@/types";

export const AdminSettings: React.FC = () => {
  const { userDoc } = useAuth();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [tokenList, setTokenList] = useState<string[]>([]);
  const [logs, setLogs] = useState<AuditLogDoc[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [seeding, setSeeding] = useState<boolean>(false);
  const [seedLogs, setSeedLogs] = useState<string[]>([]);
  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [sitemapCopied, setSitemapCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAuditLogs((list) => setLogs(list));
    const unsubProblems = subscribeProblems({ status: "approved" }, (list) => setAllProblems(list));
    return () => {
      unsubscribe();
      unsubProblems();
    };
  }, []);

  const handleGenerate = async () => {
    const token = await generateAdminInvite(userDoc?.uid || "admin_master");
    setTokenList([token, ...tokenList]);
    setCopiedToken(token);
    navigator.clipboard.writeText(`${window.location.origin}/admin/register?token=${token}`);
    setTimeout(() => setCopiedToken(null), 3000);
  };

  const handlePushToFirebase = async () => {
    setSeeding(true);
    setSeedLogs([]);
    try {
      const res: SeedResult = await seedAllToFirebase((msg) => {
        setSeedLogs((prev) => [...prev, msg]);
      });
      if (res.success) {
        setActionNotice(`Successfully synced ${res.totalPushed} real production documents to Firebase Cloud!`);
        await logAdminAction(
          userDoc ? { uid: userDoc.uid, name: userDoc.name } : { uid: "admin", name: "Admin" },
          "firebase.cloud_seed",
          "all_collections",
          "system",
          `Pushed ${res.totalPushed} real-world problem statements, CMS pages, and industries to Firestore.`
        );
      } else {
        setActionNotice("Firebase seeding completed with warnings. Check logs below.");
      }
    } catch (err) {
      setActionNotice("Error pushing data to Firebase. Check console.");
    } finally {
      setSeeding(false);
      setTimeout(() => setActionNotice(null), 5000);
    }
  };

  const handleClearData = async () => {
    if (window.confirm("Are you sure you want to clear all problems? The feed will be completely fresh.")) {
      localStorage.setItem("prblms_problems_v1", JSON.stringify([]));
      await logAdminAction(
        userDoc ? { uid: userDoc.uid, name: userDoc.name } : { uid: "admin", name: "Admin" },
        "data.clear",
        "problems_all",
        "system",
        "Cleared all problems data to start completely fresh"
      );
      setActionNotice("All problem data cleared! Moderation queue is fresh.");
      setTimeout(() => setActionNotice(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200/80 pb-5">
        <h1 className="text-2xl font-black text-zinc-950 tracking-tight">Admin Settings & Security</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Security controls, Firebase Cloud Synchronization, single-use invite tokens, and system database operations.
        </p>
      </div>

      {actionNotice && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Grid: Invite Generator & Database Operations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Box 1: Invite Generator */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Key className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Admin Invite Token Generator
            </h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Admin registration is strictly invite-only. Generate single-use, 24-hour expiration tokens for trusted moderators.
          </p>

          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1657FF] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0E47E6] transition-all"
          >
            <Key className="h-4 w-4" />
            <span>{copiedToken ? "Invite Link Copied to Clipboard!" : "Generate New Invite Token"}</span>
          </button>

          {tokenList.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3">
              <span className="text-[11px] font-bold text-zinc-400 uppercase">Recently Generated Tokens:</span>
              {tokenList.map((t) => (
                <div key={t} className="flex items-center justify-between rounded-xl bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-mono text-[#1657FF]">
                  <span className="truncate">{window.location.origin}/admin/register?token={t}</span>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 shrink-0 ml-2">Valid 24h</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Box 2: Firebase Cloud Seeder & Data Control */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#1657FF] border border-blue-100">
              <CloudUpload className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Firebase Cloud Synchronization
            </h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Push real-world verified problems, App Controller CMS pages, industry verticals, bounties, and user schemas straight into live Firestore cloud database.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePushToFirebase}
              disabled={seeding}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary-container transition-all disabled:opacity-50"
            >
              <CloudUpload className={`h-4 w-4 ${seeding ? "animate-bounce" : ""}`} />
              <span>{seeding ? "Pushing Data to Firebase..." : "Push Real Data to Firebase"}</span>
            </button>

            <button
              onClick={handleClearData}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear Local Data</span>
            </button>
          </div>

          {seedLogs.length > 0 && (
            <div className="mt-3 p-3 bg-zinc-900 text-zinc-200 rounded-xl text-[11px] font-mono max-h-40 overflow-y-auto space-y-1">
              {seedLogs.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          )}
        </div>

        {/* Box 3: Real-Time Dynamic XML Sitemap & SEO Engine */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Globe className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                SEO & Dynamic XML Sitemap
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Live Index
            </span>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            Generate and export dynamic, search engine crawler-compliant XML sitemaps with Amazon-style semantic slugs for all {allProblems.length} approved problem statements.
          </p>

          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-3 flex items-center justify-between text-xs">
            <span className="text-zinc-600 font-medium">Indexable URLs Ready:</span>
            <span className="font-mono font-bold text-zinc-900">
              {allProblems.length * 2 + 18} URLs
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const xml = buildSitemapXml(allProblems);
                const blob = new Blob([xml], { type: "application/xml" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "sitemap.xml";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setActionNotice("sitemap.xml downloaded successfully!");
                setTimeout(() => setActionNotice(null), 3000);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download Live sitemap.xml</span>
            </button>

            <button
              onClick={() => {
                const xml = buildSitemapXml(allProblems);
                navigator.clipboard.writeText(xml);
                setSitemapCopied(true);
                setTimeout(() => setSitemapCopied(false), 2500);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-all cursor-pointer shadow-xs"
            >
              {sitemapCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <FileCode className="h-4 w-4" />}
              <span>{sitemapCopied ? "XML Copied!" : "Copy XML Code"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#1657FF]" />
          <h3 className="text-sm font-bold text-zinc-900">Immutable Audit Verification Log</h3>
        </div>

        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl bg-zinc-50 border border-zinc-100 p-3 text-xs gap-2">
              <div>
                <span className="font-bold text-zinc-900">{log.actorName}</span>
                <span className="text-zinc-500 ml-2">[{log.action}]</span>
                <p className="text-zinc-600 mt-0.5">{log.details}</p>
              </div>
              <span className="font-mono text-[11px] text-zinc-400 shrink-0">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
