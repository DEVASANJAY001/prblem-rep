import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFormBySlug, submitFormResponse } from "@/lib/firebase/services/formsService";
import { FormSchema } from "@/types";
import { FormFieldRenderer } from "@/components/forms/FormFieldRenderer";
import { useAuth } from "@/contexts/AuthContext";
import confetti from "canvas-confetti";
import { CheckCircle2, ArrowRight, ArrowLeft, Shield, FileText } from "lucide-react";
import { HumanVerification } from "@/components/common/HumanVerification";

export const PublicFormRunner: React.FC = () => {
  const { formSlug } = useParams<{ formSlug: string }>();
  const { user, userDoc } = useAuth();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function loadForm() {
      if (formSlug) {
        const found = await getFormBySlug(formSlug);
        setForm(found);
      }
      setLoading(false);
    }
    loadForm();
  }, [formSlug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-xs text-zinc-400">
        Loading form...
      </div>
    );
  }

  if (!form) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Form Not Found</h2>
        <p className="mt-2 text-sm text-zinc-500">The requested form does not exist or has been closed.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          <ArrowLeft className="h-4 w-4" /> Return to Prblms
        </Link>
      </div>
    );
  }

  const handleFieldChange = (fieldId: string, val: any) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: val }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    form.fields.forEach((f) => {
      if (f.required && (answers[f.id] === undefined || answers[f.id] === "" || (Array.isArray(answers[f.id]) && answers[f.id].length === 0))) {
        newErrors[f.id] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isHumanVerified) {
      setSubmitError("Please complete the 'I am not a robot' verification check.");
      return;
    }

    setSubmitError(null);
    await submitFormResponse(form.id, answers, {
      respondentUid: userDoc?.uid || user?.uid,
      respondentEmail: userDoc?.email || user?.email || undefined,
      respondentName: userDoc?.name || undefined,
    });

    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-5 text-2xl font-extrabold text-zinc-900 dark:text-white">Response Recorded!</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Thank you for submitting your input for <strong>{form.title}</strong>. Your feedback has been logged into the response registry.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-primary/90"
        >
          <span>Return to ProblemAtlas</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Top Form Header Card */}
      <div className="rounded-2xl border-t-8 border-t-primary border-x border-b border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-primary" />
            ProblemAtlas Form Engine
          </span>
          {form.allowAnonymous && <span>Anonymous Submissions Allowed</span>}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-zinc-950 dark:text-white sm:text-3xl">
          {form.title}
        </h1>
        {form.description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {form.description}
          </p>
        )}
      </div>

      {/* Form Fields Render Canvas */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {form.fields.map((field) => (
          <div
            key={field.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <FormFieldRenderer
              field={field}
              value={answers[field.id]}
              onChange={(val) => handleFieldChange(field.id, val)}
              error={errors[field.id]}
            />
          </div>
        ))}

        {submitError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700">
            {submitError}
          </div>
        )}

        <div className="pt-2">
          <HumanVerification
            onVerify={() => {
              setIsHumanVerified(true);
              setSubmitError(null);
            }}
            onExpire={() => setIsHumanVerified(false)}
          />
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            className="rounded-xl bg-primary px-7 py-3 text-xs font-extrabold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
          >
            Submit Response
          </button>
          <span className="text-xs text-zinc-400">Powered by ProblemAtlas Dynamic Form Engine</span>
        </div>
      </form>
    </div>
  );
};
