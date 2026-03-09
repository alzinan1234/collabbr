"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUp, CheckCircle2, Star, Diamond, Crown, 
  Calendar, Clock, Lock, HelpCircle,
  LucideProps
} from 'lucide-react';
import { BADGE_TIERS } from './data';

// ─── Types ────────────────────────────────────────────────────────────────────

type IconName = 'ArrowUp' | 'CheckCircle2' | 'Star' | 'Diamond' | 'Crown';

type HistoryItem = {
  id: string;
  transactionId: string;
  badgeName: string;
  purchaseDate: string;
  expireDate: string;
  amount: number;
  status: string;
};

type UserState = {
  currentBadgeId: string;
  status: string;
  earnedBadgeIds: string[];
  autoRenew: boolean;
  history: HistoryItem[];
};

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const iconMap: Record<IconName, React.FC<LucideProps>> = {
  ArrowUp,
  CheckCircle2,
  Star,
  Diamond,
  Crown,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function VerifiedBadges() {
  const [userState, setUserState] = useState<UserState>({
    currentBadgeId: 'impact',
    status: 'active',
    earnedBadgeIds: ['starter', 'verified', 'pro', 'elite', 'impact'],
    autoRenew: true,
    history: [
      {
        id: "1",
        transactionId: "8766789KJGD4",
        badgeName: "Impact Leader",
        purchaseDate: "25 Oct 25, 02:34:03 PM",
        expireDate: "05 Nov 2025, 11:45 PM",
        amount: 79.99,
        status: "Purchase"
      }
    ]
  });

  const activeBadge = BADGE_TIERS.find(b => b.id === userState.currentBadgeId);

  const handleAction = (tierId: string) => {
    const tier = BADGE_TIERS.find(t => t.id === tierId);
    const now = new Date();

    const formattedDate =
      now.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: '2-digit'
      }) + ", " +
      now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });

    const newTransaction: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      transactionId: Math.random().toString(36).toUpperCase().substr(0, 12),
      badgeName: tier?.name ?? "",
      purchaseDate: formattedDate,
      expireDate: "05 Nov 2026, 11:45 PM",
      amount: tier?.price ?? 0,
      status: (tier?.price ?? 0) > (activeBadge?.price ?? 0) ? "Upgrade" : "Purchase"
    };

    setUserState(prev => ({
      ...prev,
      currentBadgeId: tierId,
      status: 'active',
      earnedBadgeIds: prev.earnedBadgeIds.includes(tierId)
        ? prev.earnedBadgeIds
        : [...prev.earnedBadgeIds, tierId],
      history: [newTransaction, ...prev.history]
    }));
  };

  return (
    <div className='bg-white'>
      <div className="p-8 min-h-screen font-sans text-slate-800 max-w-[1440px] mx-auto pt-30">
        <h1 className="text-3xl font-bold mb-8">Badges</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Current Badge Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[180px] flex flex-col justify-between">
            {!userState.currentBadgeId ? (
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold">No Badge Found</h3>
                  <p className="text-sm text-slate-500">Badges you purchase will appear here once activated.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className={`w-14 h-14 ${activeBadge?.bg} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {activeBadge && React.createElement(
                        iconMap[activeBadge.icon as IconName],
                        { size: 28 }
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{activeBadge?.name} Badge</h3>
                      <p className="text-xs text-slate-400">Current badge</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                    userState.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-500'
                  }`}>
                    {userState.status === 'active' ? 'Active' : 'Canceled'}
                  </span>
                </div>

                <div className="mt-6 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">
                      {userState.status === 'active' ? 'Badge will auto renew on' : 'Badge canceled on'}
                    </p>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <span className="flex items-center gap-1"><Calendar size={14} /> 05 Nov 2025</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> 11:45 PM</span>
                    </div>
                  </div>
                  {userState.status === 'active' ? (
                    <button
                      onClick={() => setUserState(p => ({ ...p, autoRenew: !p.autoRenew }))}
                      className={`w-12 h-6 rounded-full transition-colors relative ${userState.autoRenew ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${userState.autoRenew ? 'left-7' : 'left-1'}`} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(userState.currentBadgeId)}
                      className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-semibold text-sm"
                    >
                      Purchase
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Earned Badges Progression */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-400 mb-4 font-medium">Your earned badges</p>
            <div className="flex justify-between items-center px-2">
              {BADGE_TIERS.map((tier) => {
                const isEarned = userState.earnedBadgeIds.includes(tier.id);
                const Icon = iconMap[tier.icon as IconName];
                return (
                  <div key={tier.id} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isEarned
                        ? `${tier.bg} text-white shadow-md`
                        : 'bg-slate-100 text-slate-400 border border-dashed border-slate-200'
                    }`}>
                      {isEarned ? <Icon size={24} /> : <Lock size={20} />}
                    </div>
                    <span className={`text-[10px] font-bold ${isEarned ? 'text-slate-700' : 'text-slate-400'}`}>
                      {tier.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <h2 className="text-lg font-bold mb-6 italic text-slate-700">Collabbr Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {BADGE_TIERS.map((tier) => {
            const isActive = userState.currentBadgeId === tier.id;
            const currentPrice = activeBadge?.price ?? 0;
            const isUpgrade = tier.price > currentPrice;
            const Icon = iconMap[tier.icon as IconName];

            return (
              <div
                key={tier.id}
                className={`bg-white p-5 rounded-2xl border-2 transition-all ${
                  isActive ? 'border-indigo-100 shadow-md ring-2 ring-indigo-50' : 'border-slate-50'
                }`}
              >
                <div className={`w-10 h-10 mb-4 rounded-lg flex items-center justify-center ${tier.bg} text-white`}>
                  <Icon size={20} />
                </div>
                <h4 className="font-bold text-sm mb-4">{tier.name}</h4>
                <div className="mb-6">
                  <span className="text-2xl font-black">${tier.price.toString().split('.')[0]}</span>
                  <span className="text-lg font-bold">.{tier.price.toString().split('.')[1]}</span>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">per month</p>
                </div>

                <button
                  onClick={() => handleAction(tier.id)}
                  disabled={isActive && userState.status === 'active'}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all border ${
                    isActive && userState.status === 'active'
                      ? 'bg-indigo-100 text-indigo-400 border-transparent cursor-not-allowed'
                      : isUpgrade
                        ? 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700 active:scale-95'
                        : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 active:scale-95'
                  }`}
                >
                  {isActive && userState.status === 'active' ? 'Active' : isUpgrade ? 'Upgrade' : 'Downgrade'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic History Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-medium text-slate-500">Badge History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-medium uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">SL</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Badge Name</th>
                  <th className="px-6 py-4">Purchase Date</th>
                  <th className="px-6 py-4">Expire Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence initial={false}>
                  {userState.history.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-medium">
                        Badge history will be appeared here
                      </td>
                    </tr>
                  ) : (
                    userState.history.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-slate-500">{(i + 1).toString().padStart(2, '0')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{item.transactionId}</td>
                        <td className="px-6 py-4 text-slate-600 font-semibold">{item.badgeName}</td>
                        <td className="px-6 py-4 text-slate-500 leading-tight">
                          {item.purchaseDate.split(',')[0]},<br />
                          <span className="text-[11px] opacity-70">{item.purchaseDate.split(',')[1]}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 leading-tight">
                          {item.expireDate.split(',')[0]},<br />
                          <span className="text-[11px] opacity-70">{item.expireDate.split(',')[1]}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">${item.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-center">
                          <button className={`px-4 py-1.5 rounded-lg text-xs font-bold min-w-[85px] transition-all hover:opacity-80 ${
                            item.status === 'Upgrade'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-indigo-50 text-indigo-600'
                          }`}>
                            {item.status}
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}