import { useState, useRef } from "react";
import {
  X, ChevronRight, ChevronLeft, CheckCircle2, Upload, Trash2,
  User, Phone, Mail, MapPin, FileText, Calendar, Building2,
  Printer, Copy, Check,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | "success";

interface FormData {
  // Step 1
  name: string;
  phone: string;
  email: string;
  address: string;
  nid: string;
  // Step 2
  type: string;
  category: string;
  title: string;
  description: string;
  incidentDate: string;
  location: string;
  // Step 3
  files: File[];
}

const TYPES = ["অভিযোগ", "মতামত", "পরামর্শ", "তথ্যের অনুরোধ"];
const CATEGORIES = [
  "রাস্তা ও অবকাঠামো",
  "পানি ও পয়ঃনিষ্কাশন",
  "বর্জ্য ব্যবস্থাপনা",
  "কর ও লাইসেন্স",
  "স্বাস্থ্য ও পরিচ্ছন্নতা",
  "পার্ক ও বিনোদন",
  "আলো ও বিদ্যুৎ",
  "অন্যান্য",
];

const STEPS = [
  { num: 1, label: "ব্যক্তিগত তথ্য" },
  { num: 2, label: "বিবরণ" },
  { num: 3, label: "সংযুক্তি" },
  { num: 4, label: "পর্যালোচনা" },
];

function generateRef() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const r = Math.floor(1000 + Math.random() * 9000);
  return `BCC-${y}${m}${d}-${r}`;
}

const empty: FormData = {
  name: "", phone: "", email: "", address: "", nid: "",
  type: "", category: "", title: "", description: "",
  incidentDate: "", location: "", files: [],
};

import type { Complaint } from "./AdminDashboard";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (c: Complaint) => void;
}

export function ComplaintModal({ open, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [refNo, setRefNo] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const set = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  // ── Validation ──────────────────────────────────────────────────────────
  function validateStep(s: Step): boolean {
    const e: typeof errors = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = "নাম আবশ্যক";
      if (!form.phone.trim()) e.phone = "মোবাইল নম্বর আবশ্যক";
      else if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) e.phone = "সঠিক মোবাইল নম্বর দিন";
      if (!form.address.trim()) e.address = "ঠিকানা আবশ্যক";
    }
    if (s === 2) {
      if (!form.type) e.type = "ধরন নির্বাচন করুন";
      if (!form.category) e.category = "বিষয় নির্বাচন করুন";
      if (!form.title.trim()) e.title = "শিরোনাম আবশ্যক";
      if (!form.description.trim()) e.description = "বিবরণ আবশ্যক";
      else if (form.description.trim().length < 30) e.description = "কমপক্ষে ৩০ অক্ষর লিখুন";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === "success") return;
    if (!validateStep(step as Step)) return;
    if (step === 4) {
      const ref = generateRef();
      setRefNo(ref);
      onSubmit?.({
        ref,
        name: form.name,
        phone: form.phone,
        type: form.type,
        category: form.category,
        title: form.title,
        description: form.description,
        date: new Date().toLocaleDateString("bn-BD"),
        status: "pending",
      });
      setStep("success");
    } else {
      setStep(((step as number) + 1) as Step);
    }
  }

  function back() {
    if (step === "success" || step === 1) return;
    setStep(((step as number) - 1) as Step);
  }

  function handleFiles(fl: FileList | null) {
    if (!fl) return;
    const added = Array.from(fl).filter((f) => f.size <= 5 * 1024 * 1024);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...added].slice(0, 5) }));
  }

  function removeFile(i: number) {
    setForm((prev) => ({ ...prev, files: prev.files.filter((_, idx) => idx !== i) }));
  }

  function handleClose() {
    setStep(1);
    setForm(empty);
    setErrors({});
    setRefNo("");
    setCopied(false);
    onClose();
  }

  function copyRef() {
    navigator.clipboard.writeText(refNo).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Field helpers ────────────────────────────────────────────────────────
  const Field = ({
    label, required, error, children,
  }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-[#333] mb-1" style={{ fontSize: "13px", fontWeight: 600 }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{error}</p>}
    </div>
  );

  const Input = ({
    field, placeholder, type = "text",
  }: { field: keyof FormData; placeholder?: string; type?: string }) => (
    <input
      type={type}
      value={form[field] as string}
      onChange={(e) => set(field, e.target.value)}
      placeholder={placeholder}
      className={`w-full border rounded-lg px-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 transition ${
        errors[field] ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"
      }`}
      style={{ fontSize: "13px" }}
    />
  );

  const Select = ({
    field, options, placeholder,
  }: { field: keyof FormData; options: string[]; placeholder: string }) => (
    <select
      value={form[field] as string}
      onChange={(e) => set(field, e.target.value)}
      className={`w-full border rounded-lg px-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 transition ${
        errors[field] ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"
      }`}
      style={{ fontSize: "13px" }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  // ── Progress bar ─────────────────────────────────────────────────────────
  const numStep = step === "success" ? 5 : (step as number);
  const progress = ((numStep - 1) / 4) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full flex flex-col"
        style={{ maxWidth: "640px", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B6B3A] to-[#085530] rounded-t-2xl px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-white" style={{ fontSize: "16px", fontWeight: 700 }}>
              অভিযোগ / মতামত জানিয়ে চিঠি লিখুন
            </h2>
            <p className="text-white/70" style={{ fontSize: "11px" }}>
              বগুড়া সিটি কর্পোরেশন • নাগরিক সেবা পোর্টাল
            </p>
          </div>
          <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        {step !== "success" && (
          <div className="px-5 pt-4 flex-shrink-0">
            {/* Step labels */}
            <div className="flex justify-between mb-2">
              {STEPS.map((s) => (
                <div key={s.num} className="flex flex-col items-center" style={{ width: "25%" }}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center mb-1 transition-all"
                    style={{
                      backgroundColor:
                        (step as number) > s.num
                          ? "#0B6B3A"
                          : (step as number) === s.num
                          ? "#C8A34D"
                          : "#e5e7eb",
                      color:
                        (step as number) >= s.num ? "white" : "#9ca3af",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {(step as number) > s.num ? <Check size={13} /> : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      color: (step as number) === s.num ? "#0B6B3A" : "#9ca3af",
                      fontWeight: (step as number) === s.num ? 600 : 400,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: "#C8A34D" }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-[#666]" style={{ fontSize: "12px" }}>
                আপনার সঠিক তথ্য প্রদান করুন। এই তথ্য গোপনীয় রাখা হবে।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="পূর্ণ নাম" required error={errors.name}>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="আপনার পূর্ণ নাম"
                      className={`w-full border rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 transition ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"}`}
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{errors.name}</p>}
                </Field>
                <Field label="মোবাইল নম্বর" required error={errors.phone}>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className={`w-full border rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 transition ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"}`}
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{errors.phone}</p>}
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="ইমেইল (ঐচ্ছিক)">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="example@email.com"
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 focus:border-[#0B6B3A] transition"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                </Field>
                <Field label="জাতীয় পরিচয়পত্র নম্বর (ঐচ্ছিক)">
                  <Input field="nid" placeholder="NID নম্বর" />
                </Field>
              </div>
              <Field label="বর্তমান ঠিকানা" required error={errors.address}>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="ওয়ার্ড নম্বর, মহল্লা, বগুড়া"
                    rows={2}
                    className={`w-full border rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 resize-none transition ${errors.address ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"}`}
                    style={{ fontSize: "13px" }}
                  />
                </div>
                {errors.address && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{errors.address}</p>}
              </Field>
            </div>
          )}

          {/* ── STEP 2: Details ── */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-[#666]" style={{ fontSize: "12px" }}>
                আপনার অভিযোগ বা মতামত সুস্পষ্টভাবে বর্ণনা করুন।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="চিঠির ধরন" required error={errors.type}>
                  <Select field="type" options={TYPES} placeholder="ধরন নির্বাচন করুন" />
                  {errors.type && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{errors.type}</p>}
                </Field>
                <Field label="বিষয় শ্রেণি" required error={errors.category}>
                  <Select field="category" options={CATEGORIES} placeholder="বিষয় নির্বাচন করুন" />
                  {errors.category && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{errors.category}</p>}
                </Field>
              </div>
              <Field label="শিরোনাম" required error={errors.title}>
                <div className="relative">
                  <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="আপনার অভিযোগ / মতামতের শিরোনাম"
                    className={`w-full border rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 transition ${errors.title ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"}`}
                    style={{ fontSize: "13px" }}
                  />
                </div>
                {errors.title && <p className="text-red-500 mt-1" style={{ fontSize: "11px" }}>{errors.title}</p>}
              </Field>
              <Field label="বিস্তারিত বিবরণ" required error={errors.description}>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="আপনার অভিযোগ বা মতামত বিস্তারিত লিখুন (ন্যূনতম ৩০ অক্ষর)..."
                  rows={5}
                  className={`w-full border rounded-lg px-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 resize-none transition ${errors.description ? "border-red-400" : "border-gray-200 focus:border-[#0B6B3A]"}`}
                  style={{ fontSize: "13px" }}
                />
                <div className="flex justify-between mt-1">
                  {errors.description
                    ? <p className="text-red-500" style={{ fontSize: "11px" }}>{errors.description}</p>
                    : <span />}
                  <span style={{ fontSize: "11px", color: "#9ca3af" }}>{form.description.length} অক্ষর</span>
                </div>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="ঘটনার তারিখ (ঐচ্ছিক)">
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={form.incidentDate}
                      onChange={(e) => set("incidentDate", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 focus:border-[#0B6B3A] transition"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                </Field>
                <Field label="সংশ্লিষ্ট স্থান (ঐচ্ছিক)">
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="ওয়ার্ড / এলাকার নাম"
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 focus:border-[#0B6B3A] transition"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 3: Attachments ── */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-[#666]" style={{ fontSize: "12px" }}>
                প্রাসঙ্গিক ছবি বা ডকুমেন্ট সংযুক্ত করুন (ঐচ্ছিক)। সর্বোচ্চ ৫টি ফাইল, প্রতিটি ৫ MB পর্যন্ত।
              </p>
              {/* Upload area */}
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-[#0B6B3A]/30 rounded-xl p-8 text-center cursor-pointer hover:bg-[#f0f8f4] transition-colors"
              >
                <Upload size={32} className="mx-auto text-[#0B6B3A]/50 mb-2" />
                <p className="text-[#0B6B3A]" style={{ fontSize: "14px", fontWeight: 600 }}>
                  ফাইল আপলোড করুন
                </p>
                <p className="text-gray-400 mt-1" style={{ fontSize: "11px" }}>
                  JPG, PNG, PDF, DOC • সর্বোচ্চ ৫ MB
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
              {/* File list */}
              {form.files.length > 0 && (
                <div className="space-y-2">
                  {form.files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#f0f8f4] border border-[#0B6B3A]/15 rounded-lg px-3 py-2">
                      <FileText size={16} className="text-[#0B6B3A] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[#333]" style={{ fontSize: "12px", fontWeight: 500 }}>{f.name}</p>
                        <p className="text-gray-400" style={{ fontSize: "11px" }}>
                          {(f.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(i)}
                        className="text-red-400 hover:text-red-600 transition-colors shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {form.files.length === 0 && (
                <p className="text-center text-gray-400" style={{ fontSize: "12px" }}>
                  কোনো ফাইল সংযুক্ত করা হয়নি (এই ধাপটি ঐচ্ছিক)
                </p>
              )}
            </div>
          )}

          {/* ── STEP 4: Review ── */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-[#666]" style={{ fontSize: "12px" }}>
                দাখিল করার আগে আপনার তথ্য পর্যালোচনা করুন।
              </p>
              {/* Personal info review */}
              <div className="bg-[#f8faf9] border border-[#0B6B3A]/10 rounded-xl p-4 space-y-2">
                <h3 className="text-[#0B6B3A]" style={{ fontSize: "13px", fontWeight: 700 }}>ব্যক্তিগত তথ্য</h3>
                {[
                  ["নাম", form.name],
                  ["মোবাইল", form.phone],
                  form.email && ["ইমেইল", form.email],
                  ["ঠিকানা", form.address],
                  form.nid && ["NID", form.nid],
                ].filter(Boolean).map(([label, val]) => (
                  <div key={label as string} className="flex gap-2">
                    <span className="text-gray-500 shrink-0" style={{ fontSize: "12px", minWidth: "60px" }}>{label}:</span>
                    <span className="text-[#333]" style={{ fontSize: "12px" }}>{val as string}</span>
                  </div>
                ))}
              </div>
              {/* Complaint details review */}
              <div className="bg-[#f8faf9] border border-[#0B6B3A]/10 rounded-xl p-4 space-y-2">
                <h3 className="text-[#0B6B3A]" style={{ fontSize: "13px", fontWeight: 700 }}>অভিযোগ / মতামতের বিবরণ</h3>
                {[
                  ["ধরন", form.type],
                  ["বিষয়", form.category],
                  ["শিরোনাম", form.title],
                  form.incidentDate && ["তারিখ", form.incidentDate],
                  form.location && ["স্থান", form.location],
                ].filter(Boolean).map(([label, val]) => (
                  <div key={label as string} className="flex gap-2">
                    <span className="text-gray-500 shrink-0" style={{ fontSize: "12px", minWidth: "60px" }}>{label}:</span>
                    <span className="text-[#333]" style={{ fontSize: "12px" }}>{val as string}</span>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-[#0B6B3A]/10">
                  <p className="text-gray-500 mb-1" style={{ fontSize: "12px" }}>বিবরণ:</p>
                  <p className="text-[#333]" style={{ fontSize: "12px", lineHeight: 1.7 }}>{form.description}</p>
                </div>
              </div>
              {/* Attachments */}
              {form.files.length > 0 && (
                <div className="bg-[#f8faf9] border border-[#0B6B3A]/10 rounded-xl p-4">
                  <h3 className="text-[#0B6B3A] mb-2" style={{ fontSize: "13px", fontWeight: 700 }}>
                    সংযুক্তি ({form.files.length}টি ফাইল)
                  </h3>
                  {form.files.map((f, i) => (
                    <p key={i} className="text-[#555] truncate" style={{ fontSize: "12px" }}>• {f.name}</p>
                  ))}
                </div>
              )}
              {/* Declaration */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                <span className="text-amber-600 text-lg shrink-0">⚠️</span>
                <p className="text-amber-800" style={{ fontSize: "11px", lineHeight: 1.6 }}>
                  আমি ঘোষণা করছি যে উপরের তথ্য সঠিক ও সত্য। মিথ্যা তথ্য প্রদান আইনত দণ্ডনীয়।
                </p>
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === "success" && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full bg-[#edf8f2] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={44} className="text-[#0B6B3A]" />
              </div>
              <h3 className="text-[#0B6B3A]" style={{ fontSize: "22px", fontWeight: 700 }}>
                সফলভাবে দাখিল হয়েছে!
              </h3>
              <p className="text-gray-500 mt-2" style={{ fontSize: "13px" }}>
                আপনার {form.type || "চিঠি"} সফলভাবে গ্রহণ করা হয়েছে।
              </p>

              {/* Reference number */}
              <div className="mt-5 bg-[#f0f8f4] border-2 border-[#0B6B3A]/20 rounded-xl p-4">
                <p className="text-gray-500 mb-1" style={{ fontSize: "11px" }}>আপনার রেফারেন্স নম্বর</p>
                <p className="text-[#0B6B3A] font-mono" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "0.05em" }}>
                  {refNo}
                </p>
                <button
                  onClick={copyRef}
                  className="mt-2 inline-flex items-center gap-1.5 text-[#0B6B3A] hover:text-[#085530] transition-colors"
                  style={{ fontSize: "12px" }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "কপি হয়েছে!" : "নম্বর কপি করুন"}
                </button>
              </div>

              {/* Timeline */}
              <div className="mt-5 text-left space-y-3">
                {[
                  { icon: "✅", label: "দাখিল নিশ্চিত", sub: "আজই" },
                  { icon: "🔍", label: "পর্যালোচনা শুরু", sub: "১–২ কার্যদিবসের মধ্যে" },
                  { icon: "📞", label: "কর্মকর্তার যোগাযোগ", sub: "৩–৫ কার্যদিবসের মধ্যে" },
                  { icon: "✉️", label: "চূড়ান্ত সমাধান ও জবাব", sub: "সর্বোচ্চ ১৫ কার্যদিবস" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-3 py-2.5">
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    <div>
                      <p className="text-[#333]" style={{ fontSize: "12px", fontWeight: 600 }}>{item.label}</p>
                      <p className="text-gray-400" style={{ fontSize: "11px" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 mt-4" style={{ fontSize: "11px" }}>
                রেফারেন্স নম্বর সংরক্ষণ করুন। এই নম্বর দিয়ে আপনার অভিযোগের অগ্রগতি ট্র্যাক করা যাবে।
              </p>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          {step === "success" ? (
            <div className="flex gap-3 w-full">
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 border border-[#0B6B3A] text-[#0B6B3A] rounded-lg py-2.5 hover:bg-[#f0f8f4] transition-colors"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                <Printer size={15} /> প্রিন্ট করুন
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-[#0B6B3A] text-white rounded-lg py-2.5 hover:bg-[#085530] transition-colors"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                সম্পন্ন
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={back}
                disabled={step === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                style={{ fontSize: "13px" }}
              >
                <ChevronLeft size={15} /> পূর্ববর্তী
              </button>
              <div className="text-gray-400" style={{ fontSize: "11px" }}>
                ধাপ {step} / ৪
              </div>
              <button
                onClick={next}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0B6B3A] text-white hover:bg-[#085530] transition-colors"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                {step === 4 ? "দাখিল করুন" : "পরবর্তী"} <ChevronRight size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
