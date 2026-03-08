"use client";
import React, { useState } from "react";
import { Calendar, Filter, TrendingUp, TrendingDown, Eye, DollarSign } from "lucide-react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Tab = "Executive Summary" | "Campaign Performance" | "Influencer Performance" | "Funnel & Attribution" | "Audience Analytics";

const TABS: Tab[] = [
  "Executive Summary",
  "Campaign Performance",
  "Influencer Performance",
  "Funnel & Attribution",
  "Audience Analytics",
];

const CAMPAIGN_ROWS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  sl: String(i + 1).padStart(2, "0"),
  title: "Eid Elegance '25 – Celebrate Style with Grace",
  influencers: "03",
  budget: "$250",
  impression: "85.4K",
  click: "64.58K",
  conversion: "93.25K",
  cpa: "$3.5",
  roas: "$4.5",
}));

const INFLUENCER_ROWS = [
  { sl: "01", name: "Ibna Afroz Roza", handle: "@roza043", cats: ["Fashion", "Makeup"], engagement: "85.4K", fraud: "12/100", conversion: "93.25K", click: "45.6K", roas: "$4.5" },
  { sl: "02", name: "Ibna Afroz Roza", handle: "@roza043", cats: ["Fashion", "Makeup"], engagement: "85.4K", fraud: "12/100", conversion: "93.25K", click: "45.6K", roas: "$4.5" },
  { sl: "03", name: "Ibna Afroz Roza", handle: "@roza043", cats: ["Fashion", "Makeup"], engagement: "85.4K", fraud: "12/100", conversion: "93.25K", click: "45.6K", roas: "$4.5" },
];

const FUNNEL_STEPS = [
  { label: "Impression", value: "84.45K", pct: 100 },
  { label: "Reach",      value: "69.25K", pct: 82  },
  { label: "Clicks",     value: "52.12K", pct: 62  },
  { label: "Purchase",   value: "35.50K", pct: 42  },
];

const COUNTRIES = [
  { name: "USA",        pct: 32.15 },
  { name: "Pakistan",   pct: 26.76 },
  { name: "Bangladesh", pct: 20.32 },
  { name: "India",      pct: 10.32 },
  { name: "France",     pct: 5.54  },
];

const CITIES = [
  { name: "New York", pct: 72.45 },
  { name: "Dhaka",    pct: 34.32 },
  { name: "Kolkata",  pct: 25.23 },
  { name: "Paris",    pct: 13.00 },
  { name: "Lahore",   pct: 7.41  },
];

const AGE_RANGES = [
  { label: "18-24",    pct: 56.00 },
  { label: "25-34",    pct: 34.45 },
  { label: "13-17",    pct: 11.08 },
  { label: "35-44",    pct: 6.65  },
  { label: "Over 44",  pct: 3.56  },
];

const GENDERS = [
  { label: "Women", pct: 65.57 },
  { label: "Men",   pct: 34.43 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DateFilterBar() {
  return (
    <div className="flex items-center justify-between mb-6 pt-4">
      <span className="text-sm text-gray-500 font-medium">30Sep 2025 – 30 Oct 2025</span>
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-500 hover:text-[#5D5FEF] font-medium transition-colors flex items-center gap-1">
          <Filter size={14} /> Filter
        </button>
        <button className="text-sm text-gray-500 hover:text-[#5D5FEF] font-medium transition-colors flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg">
          Select Date <Calendar size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

// ── Executive Summary ─────────────────────────────────────────────────────────

function ExecutiveSummary() {
  const cards = [
    {
      label: "Total Spend",
      value: "$32,652",
      change: "+5.25%",
      up: true,
      icon: <span className="w-8 h-8 rounded-full border-2 border-red-400 flex items-center justify-center text-red-400 font-bold text-sm">$</span>,
    },
    {
      label: "Revenue",
      value: "$87,453",
      change: "+5.25%",
      up: true,
      icon: <span className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 font-bold text-sm">$</span>,
    },
    {
      label: "CPA",
      value: "$4.56",
      change: "-7.65%",
      up: false,
      icon: <span className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 font-bold text-sm">$</span>,
    },
    {
      label: "Unique Reach",
      value: "52.4K",
      change: "+5.25%",
      up: true,
      icon: <Eye size={18} className="text-gray-400" />,
    },
  ];

  return (
    <div>
      <DateFilterBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className={`p-6 bg-white ${i < cards.length - 1 ? "border-r border-gray-200" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-500 font-medium">{card.label}</span>
              {card.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{card.value}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">From last month</span>
              {card.up ? (
                <span className="flex items-center gap-0.5 text-xs font-semibold text-green-500">
                  <TrendingUp size={12} /> {card.change}
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500">
                  <TrendingDown size={12} /> {card.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Campaign Performance ──────────────────────────────────────────────────────

function CampaignPerformance() {
  return (
    <div>
      <DateFilterBar />
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600 w-12">SL</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Campaign</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Influencers</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Budget</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Impression</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Click</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Conversion</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">CPA</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {CAMPAIGN_ROWS.map((row, i) => (
              <tr key={row.id} className={`hover:bg-gray-50 transition-colors ${i < CAMPAIGN_ROWS.length - 1 ? "border-b border-gray-100" : ""}`}>
                <td className="py-4 px-4 text-gray-500 font-medium">{row.sl}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 rounded-lg bg-gray-200 flex-shrink-0" />
                    <span className="text-gray-800 font-medium leading-snug text-xs">{row.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{row.influencers}</td>
                <td className="py-4 px-4 text-gray-700">{row.budget}</td>
                <td className="py-4 px-4 text-gray-700">{row.impression}</td>
                <td className="py-4 px-4 text-gray-700">{row.click}</td>
                <td className="py-4 px-4 text-gray-700">{row.conversion}</td>
                <td className="py-4 px-4 text-gray-700">{row.cpa}</td>
                <td className="py-4 px-4 text-gray-700">{row.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Influencer Performance ────────────────────────────────────────────────────

function InfluencerPerformance() {
  return (
    <div>
      <DateFilterBar />
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600 w-12">SL</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Influencer</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Engagement Rate</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Fraud Score</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Conversion</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Click</th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-600">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {INFLUENCER_ROWS.map((row, i) => (
              <tr key={row.sl} className={`hover:bg-gray-50 transition-colors ${i < INFLUENCER_ROWS.length - 1 ? "border-b border-gray-100" : ""}`}>
                <td className="py-4 px-4 text-gray-500 font-medium">{row.sl}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${row.sl}&backgroundColor=b6e3f4`}
                      alt={row.name}
                      className="w-10 h-10 rounded-full bg-gray-100 object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-gray-800">{row.name}</span>
                        <span className="text-gray-400 text-xs">| {row.handle}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {row.cats.map((c, ci) => (
                          <span key={c} className="text-xs text-gray-400">
                            {c}{ci < row.cats.length - 1 ? " •" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{row.engagement}</td>
                <td className="py-4 px-4 text-gray-700">{row.fraud}</td>
                <td className="py-4 px-4 text-gray-700">{row.conversion}</td>
                <td className="py-4 px-4 text-gray-700">{row.click}</td>
                <td className="py-4 px-4 text-gray-700">{row.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Funnel & Attribution ──────────────────────────────────────────────────────

function FunnelAttribution() {
  // Trapezoid funnel rendered with SVG perspective-like CSS trapezoids
  // Each step is a trapezoid that narrows to the right, stacked horizontally
  // Using the provided dimensions: width~239, height~370, angle 90deg (horizontal funnel)

  const totalWidth = 560;
  const totalHeight = 240;
  const stepCount = FUNNEL_STEPS.length;

  // Each step width
  const stepW = totalWidth / stepCount;

  // Colors from the prototype (blue-purple gradient)
  const colors = ["#5D5FEF", "#6B6EF0", "#8587F3", "#9B9CF5"];

  // Top and bottom offsets for each step to create tapering funnel
  // Step i: top offset = i * (totalHeight * 0.12), bottom offset = i * (totalHeight * 0.12)
  // Actually we taper: leftmost is full height, rightmost is shortest
  const getY = (stepIndex: number) => {
    const taper = (stepIndex / (stepCount - 1)) * (totalHeight * 0.38);
    return { top: taper, bottom: totalHeight - taper };
  };

  return (
    <div>
      <DateFilterBar />
      <div className="flex items-center justify-center py-10">
        <svg width={totalWidth} height={totalHeight} viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
          {FUNNEL_STEPS.map((step, i) => {
            const x = i * stepW;
            const curr = getY(i);
            const next = i < stepCount - 1 ? getY(i + 1) : getY(i);

            // Polygon: left top, right top, right bottom, left bottom
            const points = [
              `${x},${curr.top}`,
              `${x + stepW},${next.top}`,
              `${x + stepW},${next.bottom}`,
              `${x},${curr.bottom}`,
            ].join(" ");

            const midX = x + stepW / 2;
            const midY = totalHeight / 2;

            return (
              <g key={step.label}>
                <polygon
                  points={points}
                  fill={colors[i]}
                  opacity={1 - i * 0.05}
                />
                {/* Value */}
                <text
                  x={midX}
                  y={midY - 10}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  {step.value}
                </text>
                {/* Label */}
                <text
                  x={midX}
                  y={midY + 8}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11"
                  fontFamily="sans-serif"
                >
                  {step.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ── Bar Row ───────────────────────────────────────────────────────────────────

function BarRow({ label, pct, maxPct = 100 }: { label: string; pct: number; maxPct?: number }) {
  const barWidth = (pct / maxPct) * 100;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-700">{pct.toFixed(2)}%</span>
      </div>
      <div className="h-2.5 bg-indigo-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#5D5FEF] rounded-full transition-all duration-700"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

// ── Audience Analytics ────────────────────────────────────────────────────────

function AudienceAnalytics() {
  const maxCountry = Math.max(...COUNTRIES.map(c => c.pct));
  const maxCity    = Math.max(...CITIES.map(c => c.pct));
  const maxAge     = Math.max(...AGE_RANGES.map(c => c.pct));
  const maxGender  = Math.max(...GENDERS.map(c => c.pct));

  return (
    <div>
      <DateFilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Top 5 countries */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Top 5 countries</h3>
          {COUNTRIES.map(c => (
            <BarRow key={c.name} label={c.name} pct={c.pct} maxPct={maxCountry} />
          ))}
        </div>

        {/* Top 5 cities */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Top 5 cities</h3>
          {CITIES.map(c => (
            <BarRow key={c.name} label={c.name} pct={c.pct} maxPct={maxCity} />
          ))}
        </div>

        {/* Top age ranges */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Top age ranges</h3>
          {AGE_RANGES.map(c => (
            <BarRow key={c.label} label={c.label} pct={c.pct} maxPct={maxAge} />
          ))}
        </div>

        {/* Gender */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Gender</h3>
          {GENDERS.map(c => (
            <BarRow key={c.label} label={c.label} pct={c.pct} maxPct={maxGender} />
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const BusinessesAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Executive Summary");

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-5">Analytics</h1>

        {/* Tabs */}
        <div className="flex items-center gap-0 border-b border-gray-200 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 mr-6 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab
                  ? "border-[#5D5FEF] text-[#5D5FEF]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Executive Summary"     && <ExecutiveSummary />}
          {activeTab === "Campaign Performance"  && <CampaignPerformance />}
          {activeTab === "Influencer Performance"&& <InfluencerPerformance />}
          {activeTab === "Funnel & Attribution"  && <FunnelAttribution />}
          {activeTab === "Audience Analytics"    && <AudienceAnalytics />}
        </div>

      </div>
    </div>
  );
};

export default BusinessesAnalytics;