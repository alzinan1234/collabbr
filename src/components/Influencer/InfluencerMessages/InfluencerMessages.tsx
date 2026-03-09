"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Image as ImageIcon } from "lucide-react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type MessageSide = "sent" | "received";

interface Message {
  id: number;
  text: string;
  time: string;
  side: MessageSide;
}

interface Conversation {
  id: number;
  handle: string;
  avatar: string;
  preview: string;
  time: string;
  unread: number;
  lastActive: string;
  messages: Message[];
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    handle: "safir_984",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=101&backgroundColor=b6e3f4",
    preview: "Hi, good afternoon. Are y...",
    time: "3:45 PM",
    unread: 3,
    lastActive: "Last active 34 minutes ago",
    messages: [
      { id: 1, text: "Hi! We love your content style. We're running a winter campaign and think you'd be a great fit. Are you available for a product-review promo next week?", time: "Today, 03:23 PM", side: "sent" },
      { id: 2, text: "Hi! Thank you so much 😊\n Yes, I'm available. Could you share the campaign details?", time: "Today, 03:26 PM", side: "received" },
      { id: 3, text: "Sure. We need:\n\n1 Instagram Reel, 3 Story posts,\nDeliverable deadline: within 5 day, Budget: $150\n\nLet me know if that works.", time: "Today, 03:30 PM", side: "sent" },
      { id: 4, text: "Sure! Based on current statistics, Manchester City has a 76% win probability.", time: "Today, 03:34 PM", side: "received" },
    ],
  },
  {
    id: 2,
    handle: "safir_984",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=202&backgroundColor=c0aede",
    preview: "Hi, good afternoon. Are y...",
    time: "3:45 PM",
    unread: 3,
    lastActive: "Last active 1 hour ago",
    messages: [
      { id: 1, text: "Good afternoon! Are you interested in a collaboration?", time: "Today, 02:00 PM", side: "sent" },
      { id: 2, text: "Hi! Yes, tell me more.", time: "Today, 02:05 PM", side: "received" },
    ],
  },
  {
    id: 3,
    handle: "safir_984",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=303&backgroundColor=d1d4f9",
    preview: "Hi, good afternoon. Are y...",
    time: "3:45 PM",
    unread: 0,
    lastActive: "Last active 2 hours ago",
    messages: [
      { id: 1, text: "Hey! Quick question about the campaign brief.", time: "Today, 01:30 PM", side: "sent" },
    ],
  },
  {
    id: 4,
    handle: "safir_984",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=404&backgroundColor=ffd5dc",
    preview: "Hi, good afternoon. Are y...",
    time: "3:45 PM",
    unread: 3,
    lastActive: "Last active 3 hours ago",
    messages: [
      { id: 1, text: "Looking forward to working with you!", time: "Today, 12:00 PM", side: "sent" },
      { id: 2, text: "Same here!", time: "Today, 12:10 PM", side: "received" },
    ],
  },
  {
    id: 5,
    handle: "safir_984",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=505&backgroundColor=1e293b",
    preview: "Hi, good afternoon. Are y...",
    time: "3:45 PM",
    unread: 3,
    lastActive: "Last active 4 hours ago",
    messages: [
      { id: 1, text: "Please review the attached brief.", time: "Today, 11:00 AM", side: "sent" },
    ],
  },
  {
    id: 6,
    handle: "safir_984",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=606&backgroundColor=a7f3d0",
    preview: "Hi! We love your content ...",
    time: "3:45 PM",
    unread: 0,
    lastActive: "Last active 5 hours ago",
    messages: [
      { id: 1, text: "Hi! We love your content style. We're running a winter campaign and think you'd be a great fit. Are you available for a product-review promo next week?", time: "Today, 03:23 PM", side: "sent" },
      { id: 2, text: "Hi! Thank you so much 😊\n Yes, I'm available. Could you share the campaign details?", time: "Today, 03:26 PM", side: "received" },
      { id: 3, text: "Sure. We need:\n\n1 Instagram Reel, 3 Story posts,\nDeliverable deadline: within 5 day, Budget: $150\n\nLet me know if that works.", time: "Today, 03:30 PM", side: "sent" },
      { id: 4, text: "Sure! Based on current statistics, Manchester City has a 76% win probability.", time: "Today, 03:34 PM", side: "received" },
    ],
  },
];

type FilterTab = "All messages" | "Unread" | "Unanswered";

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 p-10">
      {/* Illustration */}
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
        {/* Phone body */}
        <rect x="58" y="28" width="64" height="104" rx="10" fill="#E8E9F5" />
        <rect x="63" y="38" width="54" height="80" rx="4" fill="white" />
        {/* Notch */}
        <rect x="76" y="30" width="28" height="5" rx="2.5" fill="#C4C6E7" />
        {/* Home bar */}
        <rect x="76" y="124" width="28" height="3" rx="1.5" fill="#C4C6E7" />
        {/* Chat bubbles on screen */}
        <rect x="68" y="48" width="36" height="14" rx="7" fill="#5D5FEF" />
        <rect x="76" y="72" width="36" height="14" rx="7" fill="#E8E9F5" />
        <rect x="68" y="96" width="28" height="10" rx="5" fill="#5D5FEF" opacity="0.5" />
        {/* Left person */}
        <circle cx="38" cy="72" r="14" fill="#C4C6E7" />
        <circle cx="38" cy="62" r="8" fill="#9EA0D6" />
        <path d="M24 86c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#C4C6E7" />
        {/* Right person */}
        <circle cx="142" cy="60" r="14" fill="#E8E9F5" />
        <circle cx="142" cy="50" r="8" fill="#C4C6E7" />
        <path d="M128 74c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#E8E9F5" />
        {/* Leaves */}
        <ellipse cx="28" cy="108" rx="12" ry="6" fill="#5D5FEF" opacity="0.15" transform="rotate(-30 28 108)" />
        <ellipse cx="152" cy="96" rx="10" ry="5" fill="#5D5FEF" opacity="0.12" transform="rotate(20 152 96)" />
        {/* Dots on right bubble */}
        <circle cx="89" cy="79" r="2" fill="#9EA0D6" />
        <circle cx="95" cy="79" r="2" fill="#9EA0D6" />
        <circle cx="101" cy="79" r="2" fill="#9EA0D6" />
      </svg>
      <p className="text-base font-semibold text-gray-700">Open a Conversation</p>
      <p className="text-sm text-[#5D5FEF] text-center">Select user from your message list to continue the chat</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const InfluencerMessages: React.FC = () => {
  const [filterTab, setFilterTab] = useState<FilterTab>("All messages");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find(c => c.id === selectedId) ?? null;

  const filtered = conversations.filter(c => {
    if (filterTab === "Unread") return c.unread > 0;
    if (filterTab === "Unanswered") return c.messages[c.messages.length - 1]?.side === "sent";
    return true;
  }).filter(c =>
    !search || c.handle.toLowerCase().includes(search.toLowerCase()) || c.preview.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, selected?.messages.length]);

  // Clear unread on open
  const handleSelectConversation = (id: number) => {
    setSelectedId(id);
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    );
  };

  const handleSend = () => {
    if (!draft.trim() || !selectedId) return;
    const now = new Date();
    const timeStr = `Today, ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    const newMsg: Message = { id: Date.now(), text: draft.trim(), time: timeStr, side: "sent" };
    setConversations(prev =>
      prev.map(c =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMsg], preview: draft.trim().slice(0, 28) + "..." }
          : c
      )
    );
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className=" bg-white font-sans pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 pt-30">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Chat Inbox</h1>

        {/* Main Layout */}
        <div className="flex gap-4 h-[600px]">

          {/* ── Left: Conversation List ── */}
          <div className="w-[260px] flex-shrink-0 border border-gray-200 rounded-2xl flex flex-col overflow-hidden bg-white">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-3 pb-2">
              {(["All messages", "Unread", "Unanswered"] as FilterTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    filterTab === tab
                      ? "bg-[#5D5FEF] text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="px-3 pb-2">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search here.."
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-[#5D5FEF] transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filtered.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`w-full flex items-start gap-3 px-3 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${
                    selectedId === conv.id ? "bg-indigo-50/60" : ""
                  }`}
                >
                  <img
                    src={conv.avatar}
                    alt={conv.handle}
                    className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-100 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800 truncate">{conv.handle}</span>
                      <span className="text-[11px] text-gray-400 flex-shrink-0 ml-1">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-gray-400 truncate flex-1">{
                        selectedId === conv.id && conv.messages.length > 0
                          ? conv.messages[conv.messages.length - 1].text.slice(0, 22) + "..."
                          : conv.preview
                      }</span>
                      {conv.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-[#5D5FEF] text-white text-[10px] font-bold flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400">No conversations</div>
              )}
            </div>
          </div>

          {/* ── Right: Chat Window ── */}
          <div className="flex-1 border border-gray-200 rounded-2xl flex flex-col overflow-hidden bg-white">
            {selected ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <img
                    src={selected.avatar}
                    alt={selected.handle}
                    className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{selected.handle}</div>
                    <div className="text-xs text-gray-400">{selected.lastActive}</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {selected.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.side === "sent" ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-[65%]">
                        {msg.side === "sent" ? (
                          <>
                            <div className="bg-[#5D5FEF] text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm leading-relaxed whitespace-pre-line">
                              {msg.text}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1 text-right">{msg.time}</div>
                          </>
                        ) : (
                          <>
                            <div className="bg-gray-50 border border-gray-100 text-gray-800 text-sm px-4 py-3 rounded-2xl rounded-tl-sm leading-relaxed whitespace-pre-line">
                              {msg.text}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1">{msg.time}</div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div className="border-t border-gray-100 px-4 py-3">
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type message here..."
                    rows={3}
                    className="w-full text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none"
                  />
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button className="p-2 text-gray-400 hover:text-[#5D5FEF] transition-colors">
                      <ImageIcon size={18} />
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={!draft.trim()}
                      className="flex items-center gap-2 px-5 py-2 bg-[#5D5FEF] hover:bg-[#4a4cd6] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default InfluencerMessages;