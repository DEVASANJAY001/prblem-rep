import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getFormById } from "@/lib/storage";
import { createOrUpdateForm } from "@/lib/firebase/services/formsService";
import { useAuth } from "@/contexts/AuthContext";
import { FormFieldSchema, FieldType, FormSchema, FormStatus } from "@/types";
import {
  GripVertical,
  Plus,
  Trash2,
  Copy,
  Settings,
  Sliders,
  CheckCircle,
  UploadCloud,
  FileText,
  Radio,
  Type,
  AlignLeft,
  Calendar,
  CheckSquare,
} from "lucide-react";

export const AdminFormBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userDoc } = useAuth();

  const isEditing = id && id !== "new";
  const existingForm = isEditing ? getFormById(id) : null;

  const [title, setTitle] = useState(existingForm?.title || "New Problem Intake Form");
  const [description, setDescription] = useState(
    existingForm?.description || "Help us identify acute operational bottlenecks."
  );
  const [slug, setSlug] = useState(existingForm?.slug || `form-${Date.now().toString().slice(-4)}`);
  const [status, setStatus] = useState<FormStatus>(existingForm?.status || "published");
  const [requiresLogin, setRequiresLogin] = useState(true);
  const [allowAnonymous, setAllowAnonymous] = useState(existingForm?.allowAnonymous ?? true);

  const [fields, setFields] = useState<FormFieldSchema[]>(
    existingForm?.fields || [
      {
        id: "f_1",
        type: "short_text",
        label: "Problem Title",
        placeholder: "Enter brief description...",
        required: true,
        order: 1,
      },
      {
        id: "f_2",
        type: "single_select",
        label: "Industry Segment",
        placeholder: "",
        required: false,
        order: 2,
        options: ["Technology", "Healthcare", "Finance"],
      },
      {
        id: "f_3",
        type: "file_upload",
        label: "Supporting Evidence",
        placeholder: "Drag and drop files here",
        required: false,
        order: 3,
      },
    ]
  );

  const [activeFieldId, setActiveFieldId] = useState<string>("f_1");
  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeField = fields.find((f) => f.id === activeFieldId) || fields[0];

  const handleAddField = () => {
    const newField: FormFieldSchema = {
      id: `f_${Date.now()}`,
      type: "short_text",
      label: "New Question Label",
      placeholder: "Enter placeholder...",
      required: false,
      order: fields.length + 1,
    };
    setFields([...fields, newField]);
    setActiveFieldId(newField.id);
  };

  const handleRemoveField = (fieldId: string) => {
    setFields(fields.filter((f) => f.id !== fieldId));
    if (activeFieldId === fieldId) {
      setActiveFieldId(fields[0]?.id || "");
    }
  };

  const handleUpdateActiveField = (updates: Partial<FormFieldSchema>) => {
    if (!activeField) return;
    setFields(fields.map((f) => (f.id === activeField.id ? { ...f, ...updates } : f)));
  };

  const handlePublish = async () => {
    const payload: FormSchema = {
      id: isEditing && existingForm ? existingForm.id : `form-${Date.now()}`,
      title,
      description,
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      fields,
      status: "published",
      requiresAuth: requiresLogin,
      allowAnonymous,
      createdBy: userDoc ? userDoc.name : "Admin",
      createdByUid: userDoc ? userDoc.uid : "admin_1",
      createdAt: existingForm?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responseCount: existingForm?.responseCount || existingForm?.responsesCount || 0,
      responsesCount: existingForm?.responsesCount || existingForm?.responseCount || 0,
    };

    await createOrUpdateForm(payload);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate("/admin/forms");
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-surface md:flex-row font-body-md text-on-surface -m-4 md:-m-8">
      {/* Main Canvas Area (60%) matching Stitch */}
      <div className="flex-grow p-4 md:p-8 flex flex-col w-full md:w-[60%] border-r border-outline-variant/30">
        {/* Top Bar Area */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-4 border-b border-outline-variant/30 gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[280px]">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter form title..."
              className="bg-transparent border-none text-headline-sm md:text-headline-md font-headline-sm text-on-surface focus:outline-none focus:ring-0 w-full placeholder:text-outline"
            />
            <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider font-semibold">
              Draft
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 rounded-lg border border-outline text-on-surface text-label-md font-label-md hover:bg-surface-variant transition-colors"
            >
              {previewMode ? "Edit Canvas" : "Preview"}
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary text-label-md font-label-md hover:bg-primary-container transition-colors shadow-sm"
            >
              {saved ? "Saved!" : "Publish"}
            </button>
          </div>
        </div>

        {/* Form Builder Canvas */}
        <div className="flex flex-col gap-4 pb-24 relative" id="form-canvas">
          {fields.map((field) => {
            const isActive = activeFieldId === field.id;

            return (
              <div
                key={field.id}
                onClick={() => setActiveFieldId(field.id)}
                className={`rounded-2xl p-6 shadow-sm border relative group flex items-start gap-4 cursor-pointer transition-all ${
                  isActive
                    ? "bg-surface-container-lowest border-l-4 border-l-primary border-t-outline-variant border-r-outline-variant border-b-outline-variant shadow-md"
                    : "bg-surface border-outline-variant hover:border-outline"
                }`}
              >
                <div className="text-outline-variant hover:text-outline cursor-grab mt-1">
                  <GripVertical className="h-5 w-5" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-mono text-label-sm font-bold uppercase">
                      {field.type.replace("_", " ")}
                    </span>
                    {field.required && (
                      <span className="text-error text-label-sm font-label-sm ml-auto font-bold">
                        *Required
                      </span>
                    )}
                  </div>

                  <p className="text-headline-sm font-headline-sm text-on-surface mb-1">
                    {field.label}
                  </p>
                  <p className="text-body-md font-body-md text-outline">
                    {field.placeholder || "No placeholder specified"}
                  </p>

                  {/* Render Options if single_select */}
                  {field.options && field.options.length > 0 && (
                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-surface-variant mt-3">
                      {field.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2 text-on-surface-variant text-body-md">
                          <div className="w-3.5 h-3.5 rounded-full border border-outline-variant" />
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions on hover */}
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveField(field.id);
                    }}
                    className="p-1.5 rounded-md hover:bg-error-container text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add Field Floating Action matching Stitch */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleAddField}
              className="flex items-center gap-2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-transform font-label-md text-label-md"
            >
              <Plus className="h-4 w-4" />
              <span>Add Field</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Properties Panel (40%) matching Stitch */}
      <div className="w-full md:w-[40%] bg-surface-container-low border-l border-outline-variant/30 p-6 sticky top-0 h-auto md:h-screen overflow-y-auto">
        <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6 flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <span>Field Settings</span>
        </h2>

        {activeField ? (
          <div className="space-y-6">
            <div>
              <label className="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
                Field Label
              </label>
              <input
                type="text"
                value={activeField.label}
                onChange={(e) => handleUpdateActiveField({ label: e.target.value })}
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>

            <div>
              <label className="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
                Placeholder Text
              </label>
              <input
                type="text"
                value={activeField.placeholder || ""}
                onChange={(e) => handleUpdateActiveField({ placeholder: e.target.value })}
                placeholder="Enter placeholder..."
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>

            {/* Required Field Toggle */}
            <div className="bg-surface border border-outline-variant rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-md font-body-md text-on-surface font-semibold">
                    Required Field
                  </p>
                  <p className="text-label-sm text-on-surface-variant">Prevent submission without this</p>
                </div>
                <input
                  type="checkbox"
                  checked={activeField.required}
                  onChange={(e) => handleUpdateActiveField({ required: e.target.checked })}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="h-px bg-outline-variant/30 w-full my-6" />

            {/* Form Global Settings from Stitch */}
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6 flex items-center gap-2">
              <Sliders className="h-5 w-5 text-on-surface-variant" />
              <span>Form Settings</span>
            </h2>

            <div className="bg-surface border border-outline-variant rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div>
                  <p className="text-body-md font-body-md text-on-surface font-semibold">
                    Requires Login
                  </p>
                  <p className="text-label-sm text-on-surface-variant">Users must authenticate</p>
                </div>
                <input
                  type="checkbox"
                  checked={requiresLogin}
                  onChange={(e) => setRequiresLogin(e.target.checked)}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-body-md font-body-md text-on-surface font-semibold">
                    Allow Anonymous
                  </p>
                  <p className="text-label-sm text-on-surface-variant">Submissions without attribution</p>
                </div>
                <input
                  type="checkbox"
                  checked={allowAnonymous}
                  onChange={(e) => setAllowAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-on-surface-variant text-body-md">Select a field to customize settings.</p>
        )}
      </div>
    </div>
  );
};
