import React from "react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { Zap, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const About: React.FC = () => {
  const { getField, loading } = usePageContent("about");
  const headline = getField("mission", "mission_headline", "Mapping the World's Unsolved Problems");
  const body = getField(
    "mission",
    "mission_body",
    "ProblemAtlas is dedicated to accelerating human progress by categorizing, quantifying, and distributing the most urgent real-world problems to founders, researchers, and builders."
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
          <Zap className="h-6 w-6 fill-white" />
        </div>
        {loading ? (
          <div className="mt-4 flex flex-col items-center gap-3 animate-pulse">
            <div className="h-10 w-3/4 max-w-md bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-4 w-1/2 max-w-xs bg-zinc-100 dark:bg-zinc-850 rounded-xl" />
          </div>
        ) : (
          <div className="animate-fade-in">
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              {headline}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 max-w-lg mx-auto">
              Every Great Innovation Starts With A Problem — Not A Product.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Our Mission</h2>
          {loading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded" />
            </div>
          ) : (
            <p className="animate-fade-in">{body}</p>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">The Verification Standard</h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Specific Trigger Point:</strong>
                <p className="text-zinc-500">Problems must specify exactly when the friction happens and who bears the financial cost.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">10-Point AI Diagnostics:</strong>
                <p className="text-zinc-500">Every submission is screened for spam, duplicate detection, and scored on TAM, urgency, and willingness to pay.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Human Moderation Barrier:</strong>
                <p className="text-zinc-500">Nothing auto-publishes. An expert moderator reviews every ticket in our review queue.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center pt-4">
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-white shadow hover:bg-primary/90"
          >
            <span>Submit a Problem Today</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
