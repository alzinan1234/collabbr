"use client";

import { useState, useRef } from "react";
import {
  Heart,
  MessageSquare,
  Star,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
  Check,
  Bell,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  MapPin,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Badge = "gold" | "blue" | "purple" | "diamond" | "green" | "orange";

interface Influencer {
  id: number;
  name: string;
  avatar: string;
  categories: string[];
  location: string;
  platforms: ("instagram" | "tiktok" | "youtube" | "twitch")[];
  rating: number;
  audience: "Nano" | "Micro" | "Macro" | "Mega";
  priceMin: number;
  priceMax: number;
  badge: Badge;
  followers: number;
  engagement: number;
  fraudScore: number;
  roiScore: number;
  audienceOverlap: number;
  repeatBrands: number;
  deliverySpeed: number;
  reliabilityScore: number;
  verified: boolean;
  liked: boolean;
  country: string;
  ageRange: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_CATEGORIES = [
  "Lifestyle & Personal",
  "Beauty & Fashion",
  "Food & Beverage",
  "Health, Fitness & Wellness",
  "Travel & Adventure",
  "Technology & Gadgets",
  "Gaming & Esports",
  "Business, Finance & Ent.",
];

const BADGE_CONFIG: Record<Badge, { color: string; bg: string; label: string }> = {
  gold: { color: "#F59E0B", bg: "#FEF3C7", label: "Gold" },
  blue: { color: "#3B82F6", bg: "#DBEAFE", label: "Verified" },
  purple: { color: "#8B5CF6", bg: "#EDE9FE", label: "Elite" },
  diamond: { color: "#1E293B", bg: "#F1F5F9", label: "Diamond" },
  green: { color: "#10B981", bg: "#D1FAE5", label: "Rising" },
  orange: { color: "#F97316", bg: "#FFEDD5", label: "Hot" },
};

const SORT_OPTIONS_AI = ["AI Best Match", "Highest ROI Prediction", "Lowest Audience Overlap"];
const SORT_OPTIONS_DIR = ["Newest", "Highest Engagement", "Lowest Fraud Risk", "Best Price-to-Engagement", "Lowest Price", "Highest Followers"];

// ─── Fake Data ────────────────────────────────────────────────────────────────

const BADGES: Badge[] = ["gold", "blue", "purple", "diamond", "green", "orange"];

function makeInfluencers(count: number): Influencer[] {
  const names = ["Sara Afrin", "Nadia Islam", "Riya Sen", "Priya Roy", "Mitu Hossain", "Tasnia Khan", "Disha Paul", "Anika Chowdhury"];
  const locs = ["Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh", "Mumbai, India", "Dhaka, Bangladesh"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${i + 10}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
    categories: ["Fashion", "Makeup"],
    location: locs[i % locs.length],
    platforms: ["instagram", "tiktok", "youtube", "twitch"],
    rating: 4.8,
    audience: "Macro",
    priceMin: 120 + (i % 3) * 10,
    priceMax: 150 + (i % 3) * 10,
    badge: BADGES[i % BADGES.length],
    followers: 150000 + i * 12000,
    engagement: 3.5 + (i % 5) * 0.4,
    fraudScore: 5 + (i % 10),
    roiScore: 70 + (i % 25),
    audienceOverlap: 10 + (i % 20),
    repeatBrands: 3 + (i % 8),
    deliverySpeed: 1 + (i % 5),
    reliabilityScore: 85 + (i % 15),
    verified: i % 3 !== 0,
    liked: false,
    country: i % 4 === 0 ? "India" : "Bangladesh",
    ageRange: ["18-24", "25-34", "35-44"][i % 3],
  }));
}

const ALL_INFLUENCERS = makeInfluencers(40);

// ─── Detail Page Components ───────────────────────────────────────────────────

function InfluencerDetailPage({
  influencer,
  liked,
  onLike,
  onBack,
}: {
  influencer: Influencer;
  liked: Set<number>;
  onLike: (id: number) => void;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"work" | "reviews" | "about">("work");
  const isLiked = liked.has(influencer.id);

  const tabs = [
    { key: "work", label: "My Work" },
    { key: "reviews", label: "Ratings & Reviews" },
    { key: "about", label: "More About Me" },
  ];

  const badgeCfg = BADGE_CONFIG[influencer.badge];
  const badgeLabels: Record<Badge, string> = {
    gold: "Impact Leader",
    blue: "Verified",
    purple: "Elite Creator",
    diamond: "Diamond",
    green: "Rising Star",
    orange: "Hot Creator",
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Back button */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-15 pb-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </button>

        {/* Profile Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
          {/* Left: Avatar + Info */}
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-16 h-16 rounded-full bg-gray-100 object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{influencer.name}</h1>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                  • Online
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-0.5">@sana_afrin03</div>
              <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {influencer.location}
              </div>
            </div>
          </div>

          {/* Right: Like counter */}
          <button
            onClick={() => onLike(influencer.id)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart className="w-5 h-5" fill={isLiked ? "#EF4444" : "none"} stroke={isLiked ? "#EF4444" : "currentColor"} />
            <span className="text-sm font-medium text-gray-600">278</span>
          </button>
        </div>

        {/* Category + Stats row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          {/* Left: Category, Bio, Price */}
          <div className="flex-1 max-w-lg">
            <div className="mb-3">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Category</div>
              <div className="text-sm text-gray-700 font-medium">
                Fashion & Model • Makeup • Art
              </div>
            </div>
            <div className="mb-3">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Bio</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Passionate about skincare and clean beauty. Sharing real product experiences and
                everyday glow moments.<br />
                Partnered with 20+ local and international beauty brands.
              </p>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Per Post</div>
              <div className="text-base font-bold text-gray-900">
                ${influencer.priceMin}–{influencer.priceMax}
              </div>
            </div>
          </div>

          {/* Right: Stats + Badges + Buttons */}
          <div className="flex flex-col items-end gap-3 min-w-[260px]">
            {/* Fraud + Engagement */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">74/100</div>
                <div className="text-xs text-gray-400">Fraud score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">92%</div>
                <div className="text-xs text-gray-400">Engagement Rate</div>
              </div>
            </div>

            {/* Rating + Badge + Reviews */}
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-2">
              <div className="text-center">
                <div className="text-base font-bold text-gray-900">4.0</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= 4 ? "text-yellow-400" : "text-gray-200"}`} fill={s <= 4 ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: badgeCfg.bg, color: badgeCfg.color }}
                >
                  {influencer.badge === "gold" && "🏆"}
                  {influencer.badge === "blue" && "✓"}
                  {influencer.badge === "purple" && "◉"}
                  {influencer.badge === "diamond" && "◆"}
                  {influencer.badge === "green" && "●"}
                  {influencer.badge === "orange" && "🔥"}
                  <span>{badgeLabels[influencer.badge]}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-base font-bold text-gray-900">322</div>
                <div className="text-xs text-gray-400">Reviews</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 w-full">
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors">
                Hire Me
              </button>
              <button className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-xl transition-colors border border-indigo-100">
                Message Me
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 mb-6">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "work" && <MyWorkTab influencer={influencer} />}
        {activeTab === "reviews" && <ReviewsTab influencer={influencer} />}
        {activeTab === "about" && <AboutTab influencer={influencer} />}
      </div>
    </div>
  );
}

// Portfolio placeholder card
function PortfolioCard({ index }: { index: number }) {
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
      <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-gray-300 text-3xl">🖼️</div>
      </div>
      <div className="p-2">
        <p className="text-xs text-gray-400 truncate">Influencers Collaboration Hub is an Ai...</p>
      </div>
    </div>
  );
}

function MyWorkTab({ influencer }: { influencer: Influencer }) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <PortfolioCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function ReviewsTab({ influencer }: { influencer: Influencer }) {
  const [showCount, setShowCount] = useState(10);

  const reviews = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: "Sara Afrin",
    handle: "@sana_afrin03",
    location: "Dhaka, Bangladesh",
    rating: 4.0,
    timeAgo: "3 months ago",
    text: "Super smooth collaboration! The influencer delivered exactly what we needed and was very responsive throughout the campaign.",
    replies: 2,
  }));

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Big rating number */}
        <div className="flex-shrink-0">
          <div className="text-6xl font-bold text-gray-900">4.0</div>
          <div className="flex gap-1 mt-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-5 h-5 ${s <= 4 ? "text-yellow-400" : "text-gray-200"}`} fill={s <= 4 ? "currentColor" : "none"} />
            ))}
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="flex-1 max-w-md">
          <div className="text-sm font-medium text-gray-600 mb-3">Ratings (322)</div>
          {[
            { star: 5, count: 12, pct: 4 },
            { star: 4, count: 310, pct: 96 },
            { star: 3, count: 0, pct: 0 },
            { star: 2, count: 0, pct: 0 },
            { star: 1, count: 0, pct: 0 },
          ].map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-3 mb-1.5">
              <span className="text-xs text-gray-500 w-3">{star}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">({count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Showing</span>
          <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>of 322 Reviews</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Most Recent</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="pb-4 border-b border-gray-50">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${review.id + 50}&backgroundColor=b6e3f4`}
                  alt={review.name}
                  className="w-9 h-9 rounded-full bg-gray-100"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.handle} • {review.location}</div>
                </div>
              </div>
              <button className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
                {review.replies} replies <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1.5 ml-12">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(review.rating) ? "text-yellow-400" : "text-gray-200"}`} fill={s <= Math.floor(review.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">{review.rating}/5</span>
              <span className="text-xs text-gray-400">• {review.timeAgo}</span>
            </div>
            <p className="text-sm text-gray-600 ml-12">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutTab({ influencer }: { influencer: Influencer }) {
  const socialLinks = [
    {
      platform: "Instagram",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
      followers: "1.2M followers",
      color: "bg-pink-50 border-pink-100",
    },
    {
      platform: "Tiktok",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
        </svg>
      ),
      followers: "32.3K followers",
      color: "bg-gray-50 border-gray-100",
    },
    {
      platform: "YouTube",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      ),
      followers: "148K subscribers",
      color: "bg-red-50 border-red-100",
    },
    {
      platform: "Twitch",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-purple-500">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
      ),
      followers: "3.36M followers",
      color: "bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="max-w-sm space-y-5">
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Audience</div>
        <div className="text-sm font-semibold text-gray-800">{influencer.audience}</div>
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Member Since</div>
        <div className="text-sm font-semibold text-gray-800">August 25, 2025</div>
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">View on Social Media</div>
        <div className="space-y-2">
          {socialLinks.map((s) => (
            <div
              key={s.platform}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl border ${s.color}`}
            >
              <div className="flex items-center gap-3">
                {s.icon}
                <div>
                  <div className="text-sm font-semibold text-gray-800">{s.platform}</div>
                  <div className="text-xs text-gray-500">{s.followers}</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BadgeIcon({ badge }: { badge: Badge }) {
  const cfg = BADGE_CONFIG[badge];
  const symbols: Record<Badge, string> = {
    gold: "★",
    blue: "✓",
    purple: "◉",
    diamond: "◆",
    green: "●",
    orange: "◉",
  };
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
      style={{ background: cfg.bg, color: cfg.color }}
      title={cfg.label}
    >
      {symbols[badge]}
    </span>
  );
}

function PlatformIcons({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex gap-1.5 items-center">
      {platforms.map((p) => (
        <span key={p} className="text-gray-400 text-xs" title={p}>
          {p === "instagram" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          )}
          {p === "tiktok" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
            </svg>
          )}
          {p === "youtube" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
          )}
          {p === "twitch" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

function InfluencerCard({
  influencer,
  onLike,
  onClick,
}: {
  influencer: Influencer;
  onLike: (id: number) => void;
  onClick: (influencer: Influencer) => void;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-3.5 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-indigo-200 group"
      onClick={() => onClick(influencer)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="w-10 h-10 rounded-full bg-gray-100 object-cover"
            />
            {influencer.verified && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors">
                {influencer.name}
              </span>
              <BadgeIcon badge={influencer.badge} />
            </div>
            <div className="text-xs text-gray-500 flex flex-wrap gap-1">
              {influencer.categories.map((c, i) => (
                <span key={c}>
                  {c}
                  {i < influencer.categories.length - 1 && (
                    <span className="mx-0.5">•</span>
                  )}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-400">{influencer.location}</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(influencer.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              influencer.liked
                ? "bg-red-50 text-red-500"
                : "bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-400"
            }`}
          >
            <Heart className="w-3.5 h-3.5" fill={influencer.liked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-500 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Platforms + Rating */}
      <div className="flex items-center justify-between mt-3">
        <PlatformIcons platforms={influencer.platforms} />
        <div className="flex items-center gap-1 text-indigo-500">
          <Star className="w-3.5 h-3.5" fill="currentColor" />
          <span className="text-xs font-semibold text-gray-700">{influencer.rating}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
        <div className="text-xs text-gray-500">
          Audience <span className="font-medium text-gray-700">{influencer.audience}</span>
        </div>
        <div className="text-xs text-gray-500">
          Per Post{" "}
          <span className="font-semibold text-gray-800">
            ${influencer.priceMin}–{influencer.priceMax}
          </span>
        </div>
      </div>
    </div>
  );
}

function DropdownFilter({
  label,
  options,
  value,
  onChange,
  multiSelect = false,
}: {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multiSelect?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayValue = Array.isArray(value)
    ? value.length > 0
      ? `${label} (${value.length})`
      : label
    : value || label;

  const isSelected = (opt: string) =>
    Array.isArray(value) ? value.includes(opt) : value === opt;

  const toggle = (opt: string) => {
    if (multiSelect && Array.isArray(value)) {
      onChange(isSelected(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
    } else {
      onChange(value === opt ? "" : opt);
      setOpen(false);
    }
  };

  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
          hasValue
            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
        }`}
      >
        {displayValue}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        {hasValue && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange(multiSelect ? [] : "");
            }}
            className="ml-0.5 text-indigo-400 hover:text-indigo-700"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[160px] py-1 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between gap-2 ${
                isSelected(opt) ? "text-indigo-700 font-medium" : "text-gray-700"
              }`}
            >
              {opt}
              {isSelected(opt) && <Check className="w-3.5 h-3.5 text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SortDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
      >
        {value || label || options[0]}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[200px] py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                value === opt ? "text-indigo-700 font-medium" : "text-gray-700"
              }`}
            >
              {opt}
              {value === opt && <Check className="w-3.5 h-3.5 text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InfluencerGrid({
  influencers,
  liked,
  onLike,
  onCardClick,
}: {
  influencers: Influencer[];
  liked: Set<number>;
  onLike: (id: number) => void;
  onCardClick: (influencer: Influencer) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {influencers.map((inf) => (
        <InfluencerCard
          key={inf.id}
          influencer={{ ...inf, liked: liked.has(inf.id) }}
          onLike={onLike}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

function Section({
  title,
  influencers,
  liked,
  onLike,
  onCardClick,
  initialCount = 8,
}: {
  title: string;
  influencers: Influencer[];
  liked: Set<number>;
  onLike: (id: number) => void;
  onCardClick: (influencer: Influencer) => void;
  initialCount?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? influencers : influencers.slice(0, initialCount);

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <InfluencerGrid influencers={displayed} liked={liked} onLike={onLike} onCardClick={onCardClick} />
      {influencers.length > initialCount && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
          >
            {showAll ? "View less" : "View more"}
            <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}
    </section>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

type Page = "home" | "directory" | "ai-directory";

function HomePage({
  liked,
  onLike,
  filtered,
  onCardClick,
}: {
  liked: Set<number>;
  onLike: (id: number) => void;
  filtered: Influencer[];
  onCardClick: (influencer: Influencer) => void;
}) {
  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
            🚀
          </div>
          <div>
            <p className="font-semibold text-gray-800">Ready to launch your campaign?</p>
            <p className="text-sm text-gray-500">
              Create targeted influencer campaigns that match your business goals and budget.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:shadow-sm transition-all whitespace-nowrap">
          Create New Campaign
        </button>
      </div>

      <Section
        title="Perfect Match for Your Brand"
        influencers={filtered.slice(0, 16)}
        liked={liked}
        onLike={onLike}
        onCardClick={onCardClick}
        initialCount={8}
      />
      <Section
        title="Top Rated Influencers"
        influencers={filtered.slice(4, 20)}
        liked={liked}
        onLike={onLike}
        onCardClick={onCardClick}
        initialCount={4}
      />
      <Section
        title="Verified & Trusted"
        influencers={filtered.filter((i) => i.verified).slice(0, 12)}
        liked={liked}
        onLike={onLike}
        onCardClick={onCardClick}
        initialCount={4}
      />
    </div>
  );
}

function DirectoryPage({
  liked,
  onLike,
  filtered,
  aiMode,
  onCardClick,
}: {
  liked: Set<number>;
  onLike: (id: number) => void;
  filtered: Influencer[];
  aiMode: boolean;
  onCardClick: (influencer: Influencer) => void;
}) {
  const [platform, setPlatform] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [followers, setFollowers] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [badge, setBadge] = useState<string[]>([]);
  const [engagement, setEngagement] = useState("");
  const [fraudScore, setFraudScore] = useState("");
  const [audienceCountry, setAudienceCountry] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const [sort1, setSort1] = useState(aiMode ? SORT_OPTIONS_AI[0] : SORT_OPTIONS_DIR[0]);
  const [sort2, setSort2] = useState(aiMode ? SORT_OPTIONS_AI[1] : SORT_OPTIONS_DIR[2]);
  const [sort3, setSort3] = useState(aiMode ? SORT_OPTIONS_AI[2] : SORT_OPTIONS_DIR[3]);

  const aiFilters = [
    { label: "Predicted ROI Score", options: ["High (>80)", "Medium (50-80)", "Low (<50)"], value: "", onChange: () => {} },
    { label: "Audience Overlap", options: ["<10%", "10-20%", ">20%"], value: "", onChange: () => {} },
    { label: "Past Campaign Performance", options: ["Excellent", "Good", "Average"], value: "", onChange: () => {} },
    { label: "Repeat Brand Collaborations", options: ["5+", "3-5", "1-2"], value: "", onChange: () => {} },
    { label: "Delivery Speed", options: ["Fast (<2 days)", "Normal (2-5 days)", "Slow (5+ days)"], value: "", onChange: () => {} },
    { label: "Influencer Reliability Score", options: [">90", "70-90", "<70"], value: "", onChange: () => {} },
  ];

  let local = [...filtered];
  if (platform.length > 0) {
    local = local.filter((i) => platform.some((p) => i.platforms.includes(p as any)));
  }
  if (location) {
    local = local.filter((i) => i.location.toLowerCase().includes(location.toLowerCase()));
  }
  if (followers) {
    const ranges: Record<string, [number, number]> = {
      "1K–10K": [1000, 10000],
      "10K–100K": [10000, 100000],
      "100K–1M": [100000, 1000000],
      "1M+": [1000000, Infinity],
    };
    const r = ranges[followers];
    if (r) local = local.filter((i) => i.followers >= r[0] && i.followers <= r[1]);
  }
  if (badge.length > 0) {
    local = local.filter((i) => badge.includes(i.badge));
  }

  const sortFn = (a: Influencer, b: Influencer) => {
    const s = sort1;
    if (s === "Highest Engagement" || s === "Highest ROI Prediction") return b.engagement - a.engagement;
    if (s === "Lowest Fraud Risk") return a.fraudScore - b.fraudScore;
    if (s === "Best Price-to-Engagement") return b.engagement / b.priceMax - a.engagement / a.priceMax;
    if (s === "Lowest Price") return a.priceMin - b.priceMin;
    if (s === "Highest Followers") return b.followers - a.followers;
    return 0;
  };
  local.sort(sortFn);

  return (
    <div>
      <div className="mb-5">
        {aiMode ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {aiFilters.map((f) => (
              <DropdownFilter key={f.label} label={f.label} options={f.options} value={f.value} onChange={f.onChange} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <DropdownFilter label="Platform" options={["instagram", "tiktok", "youtube", "twitch"]} value={platform} onChange={(v) => setPlatform(v as string[])} multiSelect />
            <DropdownFilter label="Location" options={["Dhaka, Bangladesh", "Chittagong, Bangladesh", "Mumbai, India"]} value={location} onChange={(v) => setLocation(v as string)} />
            <DropdownFilter label="Followers Range" options={["1K–10K", "10K–100K", "100K–1M", "1M+"]} value={followers} onChange={(v) => setFollowers(v as string)} />
            <DropdownFilter label="Price Range" options={["$0–$50", "$50–$150", "$150–$500", "$500+"]} value={priceRange} onChange={(v) => setPriceRange(v as string)} />
            <DropdownFilter label="Badge Level" options={["gold", "blue", "purple", "diamond", "green", "orange"]} value={badge} onChange={(v) => setBadge(v as string[])} multiSelect />
            <DropdownFilter label="Engagement Rate" options={[">5%", "3-5%", "1-3%", "<1%"]} value={engagement} onChange={(v) => setEngagement(v as string)} />
            <DropdownFilter label="Fraud Score" options={["Low (<10)", "Medium (10-30)", "High (>30)"]} value={fraudScore} onChange={(v) => setFraudScore(v as string)} />
            <DropdownFilter label="Audience Country" options={["Bangladesh", "India", "Pakistan", "USA"]} value={audienceCountry} onChange={(v) => setAudienceCountry(v as string)} />
            <DropdownFilter label="Age Range" options={["18-24", "25-34", "35-44", "45+"]} value={ageRange} onChange={(v) => setAgeRange(v as string)} />
          </div>
        )}
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Suggested Influencer for your business</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sorted by</span>
            <SortDropdown options={aiMode ? SORT_OPTIONS_AI : SORT_OPTIONS_DIR} value={sort1} onChange={setSort1} />
            <SortDropdown options={aiMode ? SORT_OPTIONS_AI : SORT_OPTIONS_DIR} value={sort2} onChange={setSort2} />
            {aiMode && <SortDropdown options={SORT_OPTIONS_AI} value={sort3} onChange={setSort3} />}
          </div>
        </div>
        <InfluencerGrid influencers={local.slice(0, 8)} liked={liked} onLike={onLike} onCardClick={onCardClick} />
        {local.length > 8 && (
          <div className="mt-4 text-center">
            <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors inline-flex items-center gap-1">
              View more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top rated influencers</h2>
        <InfluencerGrid
          influencers={[...local].sort((a, b) => b.rating - a.rating).slice(0, 4)}
          liked={liked}
          onLike={onLike}
          onCardClick={onCardClick}
        />
        <div className="mt-4 text-center">
          <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors inline-flex items-center gap-1">
            View more <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InfluencerDirectory() {
  const [page, setPage] = useState<Page>("home");
  const [activeCategory, setActiveCategory] = useState("Beauty & Fashion");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [aiMode, setAiMode] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCardClick = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedInfluencer(null);
  };

  const filtered = ALL_INFLUENCERS.filter((inf) => {
    const matchSearch =
      !search ||
      inf.name.toLowerCase().includes(search.toLowerCase()) ||
      inf.categories.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  // ── Detail view ──
  if (selectedInfluencer) {
    return (
      <div className="min-h-screen bg-white font-sans">
        {/* Top Nav */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-0.5">
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedInfluencer(null);
                    setPage("directory");
                  }}
                  className={`px-3 py-3 text-sm whitespace-nowrap font-medium border-b-2 transition-colors ${
                    activeCategory === cat
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <InfluencerDetailPage
          influencer={selectedInfluencer}
          liked={liked}
          onLike={toggleLike}
          onBack={handleBack}
        />
      </div>
    );
  }

  // ── Directory / Home view ──
  return (
    <div className="min-h-screen bg-white font-sans ">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-0.5">
            {NAV_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPage("directory");
                }}
                className={`px-3 py-3 text-sm whitespace-nowrap font-medium border-b-2 transition-colors ${
                  activeCategory === cat && page !== "home"
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        {page === "home" ? (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, Luna Glow! 👋</h1>
            <p className="text-gray-500 text-sm">Find the perfect influencers for your next campaign.</p>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Influencer Directory</h1>
              <p className="text-gray-500 text-sm mt-1">{activeCategory}</p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setAiMode(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!aiMode ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                </span>
              </button>
              <button
                onClick={() => setAiMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${aiMode ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <span className="flex items-center gap-1.5">✨ AI Match</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick nav pills */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setPage("home")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${page === "home" ? "bg-indigo-100 text-indigo-700" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`}
          >
             Home
          </button>
          <button
            onClick={() => { setPage("directory"); setAiMode(false); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${page === "directory" && !aiMode ? "bg-indigo-100 text-indigo-700" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`}
          >
             Directory
          </button>
          <button
            onClick={() => { setPage("directory"); setAiMode(true); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${page === "directory" && aiMode ? "bg-indigo-100 text-indigo-700" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"}`}
          >
             AI Match
          </button>
          {liked.size > 0 && (
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-600 border border-red-100">
              ❤️ Saved ({liked.size})
            </span>
          )}
        </div>

        {search && (
          <div className="mb-4 p-3 bg-indigo-50 rounded-xl text-sm text-indigo-700 flex items-center justify-between">
            <span>Showing results for <strong>"{search}"</strong> — {filtered.length} influencers found</span>
            <button onClick={() => setSearch("")} className="text-indigo-400 hover:text-indigo-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {page === "home" ? (
          <HomePage liked={liked} onLike={toggleLike} filtered={filtered} onCardClick={handleCardClick} />
        ) : (
          <DirectoryPage liked={liked} onLike={toggleLike} filtered={filtered} aiMode={aiMode} onCardClick={handleCardClick} />
        )}
      </div>
    </div>
  );
}