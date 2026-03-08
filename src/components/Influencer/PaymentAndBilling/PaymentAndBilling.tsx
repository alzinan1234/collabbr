"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Plus, ShieldCheck } from 'lucide-react';

type SubTab = 'All Transaction' | 'Balance' | 'Payment Method' | 'Billing Information';

export default function PaymentAndBilling() {
  const [activeTab, setActiveTab] = useState<SubTab>('All Transaction');

  const tabs: SubTab[] = ['All Transaction', 'Balance', 'Payment Method', 'Billing Information'];

  return (
   <div className='bg-[#ffffff] py-10 pb-20 pt-30 '>
     <div className="max-w-[1440px] mx-auto p-8   font-sans text-slate-800">
      <h1 className="text-2xl font-bold mb-8">Payment & Billing</h1>

      {/* Sub-Tabs Navigation */}
      <div className="flex gap-8 mb-8 border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[15px] font-semibold transition-all relative ${
              activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Rendering */}
      <div className="mt-6">
        {activeTab === 'All Transaction' && <AllTransactionsTab />}
        {activeTab === 'Balance' && <BalanceTab />}
        {activeTab === 'Payment Method' && <PaymentMethodTab />}
        {activeTab === 'Billing Information' && <BillingInfoTab />}
      </div>
    </div>
   </div>
  );
}

// --- 1. All Transactions Tab ---
function AllTransactionsTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          Showing 
          <div className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 font-medium cursor-pointer">
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
              <th className="px-6 py-4"><input type="checkbox" className="rounded accent-indigo-600" /></th>
              <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Created At</th>
              <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Transaction ID</th>
              <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Order ID</th>
              <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Purpose</th>
              <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Transaction Type</th>
              <th className="px-6 py-4 uppercase text-[11px] tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-5"><input type="checkbox" className="rounded accent-indigo-600" /></td>
                <td className="px-6 py-5 text-slate-600">25 Aug 205,<br/>11:34 PM</td>
                <td className="px-6 py-5 font-medium text-slate-800 uppercase">8766789KJGD4</td>
                <td className="px-6 py-5 uppercase text-slate-500">HGD74648HDG</td>
                <td className="px-6 py-5 text-slate-800">Escrow Payment</td>
                <td className="px-6 py-5 text-slate-800">Order Payment</td>
                <td className="px-6 py-5 font-bold text-slate-800">$250</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- 2. Balance Tab ---
function BalanceTab() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-slate-800">Available balance</h2>
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-16">
        <div>
          <h3 className="text-4xl font-bold text-indigo-600 mb-2">$1,723</h3>
          <p className="text-slate-400 text-sm">Escrow balance</p>
        </div>
        <div className="border-l border-slate-100 pl-16">
          <h4 className="font-bold text-slate-800 mb-2">From Completed Orders</h4>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            This balance is made up from all completed orders. You can withdraw or purchase subscription through this balance.
          </p>
          <button className="text-indigo-600 text-[13px] font-bold mt-4 underline decoration-indigo-200 underline-offset-4">
            See your earnings & withdrawals
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. Payment Method Tab ---
function PaymentMethodTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Payment methods</h2>
        <p className="text-slate-400 text-sm">Easily manage your bank details and payout preferences</p>
      </div>
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
        <div className="flex items-center gap-4 border border-slate-100 px-6 py-5 rounded-2xl w-full max-w-xs">
          <div className="bg-indigo-50 p-2.5 rounded-lg">
            <ShieldCheck className="text-indigo-600" size={24} />
          </div>
          <span className="font-medium text-slate-500">Escrow</span>
        </div>
        <button className="flex items-center gap-3 border-2 border-dashed border-slate-200 px-8 py-5 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 transition-all">
          <Plus size={20} />
          Add Payment Method
        </button>
      </div>
    </div>
  );
}

// --- 4. Billing Info Tab ---
function BillingInfoTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Billing Information</h2>
        <p className="text-slate-400 text-sm">Stay on top of your expenses with clear billing records</p>
      </div>
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm max-w-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Full Name</label>
            <input type="text" placeholder="Write full name" className="p-3.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400" />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Business Name</label>
            <input type="text" placeholder="Write business name" className="p-3.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400" />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold text-slate-700">Country</label>
            <select className="p-3.5 border border-slate-200 rounded-xl text-sm appearance-none bg-white outline-none focus:border-indigo-400">
              <option>Select country</option>
            </select>
            <ChevronDown className="absolute right-4 top-[45px] text-slate-400 pointer-events-none" size={16} />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold text-slate-700">State/Region</label>
            <select className="p-3.5 border border-slate-200 rounded-xl text-sm appearance-none bg-white outline-none focus:border-indigo-400">
              <option>Select state</option>
            </select>
            <ChevronDown className="absolute right-4 top-[45px] text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <h5 className="text-sm font-bold text-slate-700">Invoice</h5>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="w-5 h-5 border-2 border-indigo-600 rounded flex items-center justify-center bg-indigo-600">
              <div className="w-2 h-3 border-r-2 border-b-2 border-white rotate-45 mb-1" />
            </div>
            <span className="text-sm text-slate-600 font-medium">I want to get invoices via email</span>
          </label>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Enter your email address</label>
            <input type="email" defaultValue="saraafrin@gmail.com" className="p-3.5 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>

        <button className="bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}