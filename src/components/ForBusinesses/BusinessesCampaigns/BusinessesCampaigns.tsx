"use client";
import React, { useState, useRef } from "react";
import { Check, Upload, Calendar, X, ChevronLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type CampaignStatus = "Active" | "Inactive";

interface Campaign {
  id: number;
  title: string;
  thumbnail: string;
  influencers: number;
  timeline: string;
  expiredIn: string;
  budget: string;
  status: CampaignStatus;
}

// ─── Fake Data ─────────────────────────────────────────────────────────────────

const CAMPAIGNS: Campaign[] = [
  { id: 1,  title: "Urban Fit Collection 2025",                         thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Active" },
  { id: 2,  title: "Eid Elegance '25 – Celebrate Style with Grace",     thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Active" },
  { id: 3,  title: "Glow Beyond Limits – Summer Skincare Routine",      thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Active" },
  { id: 4,  title: "Pure Beauty by Nature – Organic Care Line Launch",  thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Active" },
  { id: 5,  title: "Ramadan Recharge – Stay Active, Stay Balanced",     thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Active" },
  { id: 6,  title: "Luxury Redefined – Seasonal Capsule Drop",          thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Inactive" },
  { id: 7,  title: "Taste the Joy – Eid Feast Specials",                thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Inactive" },
  { id: 8,  title: "Morning Brew Moments – Coffee Lovers Edition",      thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Inactive" },
  { id: 9,  title: "Farm to Table Freshness – Organic Brand Push",      thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Inactive" },
  { id: 10, title: "Farm to Table Freshness – Organic Brand Push",      thumbnail: "", influencers: 3, timeline: "25 Aug 2025", expiredIn: "5 Days", budget: "$250", status: "Active" },
];

// ─── Step Form State ──────────────────────────────────────────────────────────

interface Step1Data { title: string; description: string; goal: string; thumbnail: File | null; }
interface Step2Data { deliverables: string; guideline: File | null; }
interface Step3Data { budget: string; timeline: string; duration: string; }

const defaultStep1: Step1Data = { title: "", description: "", goal: "", thumbnail: null };
const defaultStep2: Step2Data = { deliverables: "", guideline: null };
const defaultStep3: Step3Data = { budget: "", timeline: "", duration: "" };

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step, currentStep }: { step: number; currentStep: number }) {
  const labels = ["Campaign Details", "Content Details", "Budget & Timeline"];
  const done = currentStep > step;
  const active = currentStep === step;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
          ${done ? "bg-green-500 border-green-500 text-white" : active ? "bg-[#5D5FEF] border-[#5D5FEF] text-white" : "bg-white border-gray-300 text-gray-400"}`}
      >
        {done ? <Check size={16} strokeWidth={3} /> : step}
      </div>
      <span className={`text-xs font-semibold whitespace-nowrap ${active ? "text-[#5D5FEF]" : done ? "text-gray-700" : "text-gray-400"}`}>
        {labels[step - 1]}
      </span>
    </div>
  );
}

function StepLine({ done }: { done: boolean }) {
  return (
    <div className={`flex-1 h-0.5 mb-5 rounded-full transition-all ${done ? "bg-green-400" : "bg-gray-200"}`} />
  );
}

// ─── Upload Box ───────────────────────────────────────────────────────────────

function UploadBox({
  label,
  subLabel,
  file,
  onFile,
  accept,
}: {
  label: string;
  subLabel: string;
  file: File | null;
  onFile: (f: File | null) => void;
  accept: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border border-gray-300 rounded-xl flex flex-col items-center justify-center py-10 cursor-pointer hover:border-[#5D5FEF] hover:bg-indigo-50/30 transition-all gap-2"
    >
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={e => onFile(e.target.files?.[0] ?? null)} />
      {file ? (
        <div className="flex flex-col items-center gap-1">
          <Check size={28} className="text-green-500" />
          <span className="text-sm text-black font-medium">{file.name}</span>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onFile(null); }}
            className="text-xs text-red-400 hover:text-red-600 mt-1"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <Upload size={28} className="text-gray-400" />
          <span className="text-sm text-black">{label}</span>
          <span className="text-xs text-black">Supported format: {subLabel}</span>
        </>
      )}
    </div>
  );
}

// ─── Create Campaign Modal ────────────────────────────────────────────────────

function CreateCampaignModal({ onClose, onCreated }: { onClose: () => void; onCreated: (c: Campaign) => void }) {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>(defaultStep1);
  const [step2, setStep2] = useState<Step2Data>(defaultStep2);
  const [step3, setStep3] = useState<Step3Data>(defaultStep3);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!step1.title.trim()) e.title = "Campaign title is required";
    if (!step1.description.trim()) e.description = "Description is required";
    return e;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!step2.deliverables.trim()) e.deliverables = "Deliverables are required";
    return e;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!step3.budget.trim()) e.budget = "Budget is required";
    if (!step3.timeline.trim()) e.timeline = "Timeline is required";
    return e;
  };

  const handleNext = () => {
    if (step === 1) {
      const e = validateStep1();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    if (step === 2) {
      const e = validateStep2();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleCreate = () => {
    const e = validateStep3();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newCampaign: Campaign = {
      id: Date.now(),
      title: step1.title,
      thumbnail: "",
      influencers: 0,
      timeline: step3.timeline || "TBD",
      expiredIn: step3.duration ? `${step3.duration} Days` : "—",
      budget: step3.budget ? `$${step3.budget}` : "$0",
      status: "Active",
    };
    onCreated(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-[100] flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[700px] mx-4 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Step Indicator */}
        <div className="px-10 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-0 max-w-md mx-auto">
            <StepIndicator step={1} currentStep={step} />
            <StepLine done={step > 1} />
            <StepIndicator step={2} currentStep={step} />
            <StepLine done={step > 2} />
            <StepIndicator step={3} currentStep={step} />
          </div>
        </div>

        {/* Form Body */}
        <div className="px-10 py-8">

          {/* ── Step 1: Campaign Details ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  <span className="text-red-500">*</span>Campaign Title
                </label>
                <input
                  type="text"
                  placeholder="Write campaign title"
                  value={step1.title}
                  onChange={e => setStep1(s => ({ ...s, title: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] transition-all ${errors.title ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.title
                  ? <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  : <p className="text-xs text-black mt-1">Helper Text</p>
                }
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  <span className="text-red-500">*</span>Description
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Write brief description..."
                    value={step1.description}
                    maxLength={500}
                    onChange={e => setStep1(s => ({ ...s, description: e.target.value }))}
                    rows={5}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] resize-none transition-all ${errors.description ? "border-red-400" : "border-gray-300"}`}
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-red-400">{step1.description.length}/500</span>
                </div>
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Goal</label>
                <div className="relative">
                  <textarea
                    placeholder="Write campaign goal..."
                    value={step1.goal}
                    maxLength={500}
                    onChange={e => setStep1(s => ({ ...s, goal: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] resize-none transition-all"
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-red-400">{step1.goal.length}/500</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Thumbnail</label>
                <UploadBox
                  label="Upload a thumbnail"
                  subLabel="PNG, JPEG"
                  file={step1.thumbnail}
                  onFile={f => setStep1(s => ({ ...s, thumbnail: f }))}
                  accept="image/png,image/jpeg"
                />
              </div>
            </div>
          )}

          {/* ── Step 2: Content Details ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  <span className="text-red-500">*</span>Deliverables
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Write brief description..."
                    value={step2.deliverables}
                    maxLength={500}
                    onChange={e => setStep2(s => ({ ...s, deliverables: e.target.value }))}
                    rows={7}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] resize-none transition-all ${errors.deliverables ? "border-red-400" : "border-gray-300"}`}
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-red-400">{step2.deliverables.length}/500</span>
                </div>
                {errors.deliverables && <p className="text-xs text-red-500 mt-1">{errors.deliverables}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Creative Guideline</label>
                <UploadBox
                  label="Upload brand kit, hashtags, references"
                  subLabel="PDF, PNG, JPEG"
                  file={step2.guideline}
                  onFile={f => setStep2(s => ({ ...s, guideline: f }))}
                  accept="application/pdf,image/png,image/jpeg"
                />
              </div>
            </div>
          )}

          {/* ── Step 3: Budget & Timeline ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  <span className="text-red-500">*</span>Budget Allocation
                </label>
                <input
                  type="text"
                  placeholder="Write campaign title"
                  value={step3.budget}
                  onChange={e => setStep3(s => ({ ...s, budget: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] transition-all ${errors.budget ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.budget && <p className="text-xs text-red-500 mt-1">{errors.budget}</p>}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-black mb-1">
                    <span className="text-red-500">*</span>Campaign Timeline
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={step3.timeline}
                      onChange={e => setStep3(s => ({ ...s, timeline: e.target.value }))}
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] transition-all appearance-none ${errors.timeline ? "border-red-400" : "border-gray-300"}`}
                    />
                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.timeline && <p className="text-xs text-red-500 mt-1">{errors.timeline}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-black mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    value={step3.duration}
                    onChange={e => setStep3(s => ({ ...s, duration: e.target.value }))}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => { setErrors({}); setStep(s => s - 1); }}
                className="px-10 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl text-sm hover:border-gray-400 transition-all"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-14 py-3 bg-[#5D5FEF] hover:bg-[#4a4cd6] text-white font-bold rounded-xl text-sm transition-all"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreate}
                className="px-12 py-3 bg-[#5D5FEF] hover:bg-[#4a4cd6] text-white font-bold rounded-xl text-sm transition-all"
              >
                Create Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Campaign Table ───────────────────────────────────────────────────────────

function CampaignTable({ campaigns, showStatus }: { campaigns: Campaign[]; showStatus?: boolean }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleAll = () => {
    if (selected.size === campaigns.length) setSelected(new Set());
    else setSelected(new Set(campaigns.map(c => c.id)));
  };

  const toggle = (id: number) => {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="w-10 pl-4 py-4">
              <input
                type="checkbox"
                checked={selected.size === campaigns.length && campaigns.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-gray-300 accent-[#5D5FEF] cursor-pointer"
              />
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-600">Campaign</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-600">Influencers</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-600">Timeline</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-600">Expired In</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-600">Budget</th>
            {showStatus && <th className="text-left py-4 px-4 font-semibold text-gray-600">Status</th>}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={c.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i === campaigns.length - 1 ? "border-b-0" : ""}`}>
              <td className="pl-4 py-4">
                <input
                  type="checkbox"
                  checked={selected.has(c.id)}
                  onChange={() => toggle(c.id)}
                  className="w-4 h-4 rounded border-gray-300 accent-[#5D5FEF] cursor-pointer"
                />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-10 rounded-lg bg-gray-200 flex-shrink-0" />
                  <span className="text-gray-800 font-medium leading-snug">{c.title}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-700">{String(c.influencers).padStart(2, "0")}</td>
              <td className="py-4 px-4 text-gray-700">{c.timeline}</td>
              <td className="py-4 px-4 text-gray-700">{c.expiredIn}</td>
              <td className="py-4 px-4 text-gray-700">{c.budget}</td>
              {showStatus && (
                <td className="py-4 px-4">
                  <span className={`text-sm font-semibold ${c.status === "Active" ? "text-green-600" : "text-gray-400"}`}>
                    {c.status}
                  </span>
                </td>
              )}
            </tr>
          ))}
          {campaigns.length === 0 && (
            <tr>
              <td colSpan={showStatus ? 7 : 6} className="text-center py-12 text-gray-400 text-sm">
                No campaigns found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type TabType = "Active Campaign" | "Inactive Campaign" | "All Campaign";

const TABS: TabType[] = ["Active Campaign", "Inactive Campaign", "All Campaign"];

const BusinessesCampaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Active Campaign");
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [showModal, setShowModal] = useState(false);

  const activeCampaigns   = campaigns.filter(c => c.status === "Active");
  const inactiveCampaigns = campaigns.filter(c => c.status === "Inactive");

  const handleCreated = (c: Campaign) => {
    setCampaigns(prev => [c, ...prev]);
    setActiveTab("Active Campaign");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-[#5D5FEF] hover:bg-[#4a4cd6] text-white font-bold rounded-xl text-sm transition-all shadow-sm"
          >
            Create New Campaign
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab
                  ? "border-[#5D5FEF] text-[#5D5FEF]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        {activeTab === "Active Campaign"   && <CampaignTable campaigns={activeCampaigns} />}
        {activeTab === "Inactive Campaign" && <CampaignTable campaigns={inactiveCampaigns} />}
        {activeTab === "All Campaign"      && <CampaignTable campaigns={campaigns} showStatus />}

      </div>

      {/* Modal */}
      {showModal && (
        <CreateCampaignModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
};

export default BusinessesCampaigns;