"use client";
import React, { useState } from 'react';
import { Search, Info, ChevronDown, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EarningsAndWithdrawals() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
   <div className='bg-white pt-30 py-10 pb-20'>
     <div className="max-w-[1440px] mx-auto p-8  min-h-screen font-sans text-slate-800">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Earnings & Withdrawals</h1>
      </div>

      {/* Overview Section */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-6">Overview</h2>
        <div className="grid grid-cols-1 gap-6">
          {/* Main Available Balance Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-indigo-600">$1,752</span>
                <Info size={16} className="text-slate-300 cursor-help" />
              </div>
              <p className="text-slate-400 text-sm font-medium">Available balance</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Withdraw Balance
              </button>
              <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all">
                Purchase Subscription
              </button>
            </div>
          </div>

          {/* Secondary Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard label="Waiting for release" value="$1,752" />
            <StatsCard label="Total earnings" value="$1,752" />
            <StatsCard label="Total withdrawals" value="$1,752" />
            <StatsCard label="On going orders" value="$576" />
            <StatsCard label="Earnings on Oct 2025" value="$576" />
            <StatsCard label="Withdrawals on Oct 2025" value="$576" />
          </div>
        </div>
      </section>

      {/* Transaction Table Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
           <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              Showing 
              <div className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 cursor-pointer">
                20 <ChevronDown size={14} />
              </div>
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search transaction or order ID" 
                className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none w-80 focus:ring-2 focus:ring-indigo-50 transition-all"
              />
           </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-50">
              <tr>
                <th className="px-6 py-4 uppercase text-[11px] tracking-wider">SL</th>
                <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Date</th>
                <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Order ID</th>
                <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Transaction Type</th>
                <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.map((row) => (
                <tr key={row.sl} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-5 text-slate-600 font-medium">{row.sl}</td>
                  <td className="px-6 py-5 text-slate-600 leading-tight">
                    {row.date}<br/><span className="text-[11px] text-slate-400">{row.time}</span>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-800 uppercase">{row.txId}</td>
                  <td className="px-6 py-5 uppercase text-slate-500">{row.orderId}</td>
                  <td className="px-6 py-5 text-slate-800 font-medium">{row.type}</td>
                  <td className="px-6 py-5 font-bold text-slate-800">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <WithdrawModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
   </div>
  );
}

// --- Sub-Components ---

function StatsCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl font-bold text-slate-800">{value}</span>
        <Info size={14} className="text-slate-300 cursor-help" />
      </div>
      <p className="text-slate-400 text-xs font-medium">{label}</p>
    </div>
  );
}

function WithdrawModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[28px] p-8 shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold">Withdraw Amount</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Withdraw Amount</label>
              <input 
                type="text" 
                placeholder="Enter amount" 
                className="p-3.5 border border-slate-100 rounded-xl text-sm bg-white outline-none focus:border-indigo-300" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Rest Amount</label>
              <input 
                type="text" 
                disabled 
                value="$566" 
                className="p-3.5 border border-slate-50 bg-slate-50/50 rounded-xl text-sm text-slate-500 font-medium" 
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <label className="text-sm font-bold text-slate-700">Transfer Via</label>
            <div className="border border-indigo-600 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                </div>
                <span className="font-bold text-indigo-600 text-[15px]">stripe</span>
              </div>
            </div>
            {/* Payment Logos Mockup */}
      <div className="flex gap-4 items-center px-2">
    <img src="/logos_paypal.png" alt="paypal" className="h-6 w-auto object-contain" />
    <img src="/logos_google-pay.png" alt="gpay" className="h-6 w-auto object-contain" />
    <img src="/logos_apple-pay.png" alt="applepay" className="h-6 w-auto object-contain" />
    <img src="/logos_mastercard.png" alt="mastercard" className="h-6 w-auto object-contain" />
    <img src="/logos_visa.png" alt="visa" className="h-6 w-auto object-contain" />
  </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl flex items-center gap-3">
            <AlertTriangle className="text-amber-500" size={18} />
            <span className="text-[13px] font-medium text-amber-700">Minimum withdraw amount <span className="font-bold">$50</span></span>
          </div>

          <div className="flex gap-4 pt-4">
             <button 
              onClick={onClose}
              className="flex-1 py-3.5 border border-red-100 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-all"
             >
               Cancel
             </button>
             <button className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
               Confirm & Withdraw
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Data ---
const tableData = [
  { sl: '01', date: '25 Aug 2025', time: '11:34 PM', txId: '8766789KJGD4', orderId: 'HGD74648HDG', type: 'Order Completed', amount: '$250' },
  { sl: '02', date: '25 Aug 2025', time: '11:34 PM', txId: '8766789KJGD4', orderId: 'HGD74648HDG', type: 'Balance Withdrawals', amount: '$250' },
  { sl: '03', date: '25 Aug 2025', time: '11:34 PM', txId: '8766789KJGD4', orderId: 'HGD74648HDG', type: 'Order Completed', amount: '$250' },
  { sl: '04', date: '25 Aug 2025', time: '11:34 PM', txId: '8766789KJGD4', orderId: 'HGD74648HDG', type: 'Order Completed', amount: '$250' },
];