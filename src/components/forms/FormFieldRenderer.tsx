import React from "react";
import { FormFieldSchema } from "@/types";
import { Star, UploadCloud } from "lucide-react";

interface FormFieldRendererProps {
  field: FormFieldSchema;
  value: any;
  onChange: (val: any) => void;
  error?: string;
  disabled?: boolean;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const { id, type, label, placeholder, options = [], required, description } = field;

  // 1. Section Break
  if (type === "section_break") {
    return (
      <div className="my-6 border-b border-zinc-200 pb-3 pt-2 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{label}</h3>
        {description && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
        {field.type === "rating" && value && (
          <span className="text-xs font-semibold text-primary">{value} / 5</span>
        )}
      </div>

      {description && <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>}

      {/* Short Text */}
      {type === "short_text" && (
        <input
          id={id}
          type="text"
          value={value || ""}
          placeholder={placeholder || "Enter text..."}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
            error ? "border-rose-400 focus:ring-rose-400/20" : "border-zinc-300"
          }`}
        />
      )}

      {/* Long Text */}
      {type === "long_text" && (
        <textarea
          id={id}
          rows={4}
          value={value || ""}
          placeholder={placeholder || "Enter detailed response..."}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-white p-3.5 text-sm text-zinc-900 shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
            error ? "border-rose-400 focus:ring-rose-400/20" : "border-zinc-300"
          }`}
        />
      )}

      {/* Single Select */}
      {type === "single_select" && (
        <div className="space-y-2">
          {options.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm transition-all ${
                value === opt
                  ? "border-primary bg-primary/5 text-primary dark:bg-primary/10 font-medium"
                  : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name={id}
                  value={opt}
                  checked={value === opt}
                  disabled={disabled}
                  onChange={() => onChange(opt)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <span>{opt}</span>
              </div>
            </label>
          ))}
        </div>
      )}

      {/* Multi Select */}
      {type === "multi_select" && (
        <div className="space-y-2">
          {options.map((opt) => {
            const arr = Array.isArray(value) ? value : [];
            const isSelected = arr.includes(opt);
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 text-primary dark:bg-primary/10 font-medium"
                    : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={disabled}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...arr, opt]);
                      } else {
                        onChange(arr.filter((item: string) => item !== opt));
                      }
                    }}
                    className="h-4 w-4 rounded text-primary focus:ring-primary"
                  />
                  <span>{opt}</span>
                </div>
              </label>
            );
          })}
        </div>
      )}

      {/* Single Checkbox */}
      {type === "checkbox" && (
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3.5 text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <input
            type="checkbox"
            checked={!!value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded text-primary focus:ring-primary"
          />
          <span className="text-zinc-800 dark:text-zinc-200">{placeholder || label}</span>
        </label>
      )}

      {/* Rating (1 to 5 Stars) */}
      {type === "rating" && (
        <div className="flex items-center gap-2 pt-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = (value || 0) >= star;
            return (
              <button
                key={star}
                type="button"
                disabled={disabled}
                onClick={() => onChange(star)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all ${
                  isFilled
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-primary/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                }`}
              >
                <Star className={`h-4 w-4 ${isFilled ? "fill-white" : ""}`} />
              </button>
            );
          })}
        </div>
      )}

      {/* Date */}
      {type === "date" && (
        <input
          id={id}
          type="date"
          value={value || ""}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        />
      )}

      {/* File Upload Simulation */}
      {type === "file_upload" && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <UploadCloud className="h-8 w-8 text-zinc-400" />
          <p className="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {value ? `Uploaded file: ${value}` : "Drag & drop files or click to upload"}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-400">PDF, PNG, JPG, MP4 (Max 20MB)</p>
          <input
            type="file"
            className="mt-3 cursor-pointer text-xs"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onChange(e.target.files[0].name);
              }
            }}
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
};
