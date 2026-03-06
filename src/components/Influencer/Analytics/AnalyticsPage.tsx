"use client";

import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';
import { div } from 'framer-motion/client';

// --- Types & Interfaces ---
interface StatData {
  title: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down';
}

// --- Mock Data ---
const EARNINGS_DATA: StatData[] = [
  { title: "Waiting for release", value: "$1,752", subtext: "From last month", trend: 'up' },
  { title: "Ongoing orders", value: "$576", subtext: "From last month", trend: 'down' },
  { title: "Total earnings", value: "$10,546", subtext: "From last month", trend: 'up' },
  { title: "Completed orders", value: "$2,453", subtext: "From last month", trend: 'down' },
];

const CAMPAIGN_EARNINGS = [
  { id: 1, sl: '01', name: 'Urban Fit Collection 2025', amount: '$250', status: 'Released' },
  { id: 2, sl: '02', name: 'Eid Elegance \'25 – Celebrate Style with Grace', amount: '$475', status: 'Pending' },
  { id: 3, sl: '03', name: 'Glow Beyond Limits – Summer Skincare Routine', amount: '$124', status: 'Released' },
  { id: 4, sl: '04', name: 'Pure Beauty by Nature – Organic Care Line Launch', amount: '$756', status: 'Released' },
];

const GROWTH_DATA = [
  { date: '1st Sept', value: 200 },
  { date: '5th Sept', value: 1200 },
  { date: '10th Sept', value: 2100 },
  { date: '15th Sept', value: 1800 },
  { date: '20th Sept', value: 2200 },
  { date: '25th Sept', value: 2700 }, // Highlighted in design
  { date: '30th Sept', value: 3100 },
];

const AUDIENCE_STATS = {
  countries: [
    { label: 'USA', value: 32.15 },
    { label: 'Pakistan', value: 26.76 },
    { label: 'Bangladesh', value: 20.32 },
    { label: 'India', value: 10.32 },
    { label: 'France', value: 5.54 },
  ],
  cities: [
    { label: 'New York', value: 72.45 },
    { label: 'Dhaka', value: 34.32 },
    { label: 'Kolkata', value: 25.23 },
    { label: 'Paris', value: 13.00 },
    { label: 'Lahore', value: 7.41 },
  ],
  age: [
    { label: '18-24', value: 56.00 },
    { label: '25-34', value: 34.45 },
    { label: '13-17', value: 11.08 },
    { label: '35-44', value: 6.65 },
    { label: 'Over 44', value: 3.56 },
  ],
  gender: [
    { label: 'Women', value: 65.57 },
    { label: 'Men', value: 34.43 },
  ],
};

// --- Sub-Components ---

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2D3748] px-3 py-2 rounded-[12px]  border border-gray-700">
        <p className="text-[10px] text-gray-400 mb-1">25 Sep 2025</p>
        <p className="text-white font-bold text-sm">{(payload[0].value / 1000).toFixed(1)}K</p>
      </div>
    );
  }
  return null;
};

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div className="mb-5">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-[#4A5568]">{label}</span>
      <span className="text-sm font-semibold text-[#2D3748]">{percentage.toFixed(2)}%</span>
    </div>
    <div className="w-full h-[7px] bg-[#EDF2F7] rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#6366F1] rounded-full transition-all duration-700 ease-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const CardWrapper = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-[16px] p-6  ${className}`}>
    {title && <h3 className="text-[#2D3748] font-bold text-lg mb-6">{title}</h3>}
    {children}
  </div>
);

// --- Main Component ---

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'Earnings' | 'Audience'>('Earnings');

  return (
    <div className='bg-[#ffffff]  pt-20'>
        <div className="p-6 md:p-10 max-w-7xl mx-auto  min-h-screen font-sans text-[#2D3748]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#1A202C] mb-6">Analytics</h1>
        
        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#E2E8F0]">
          {['Earnings Tracker', 'Audience Insight'].map((tab) => {
            const isTarget = (tab.startsWith('Earnings') && activeTab === 'Earnings') || (tab.startsWith('Audience') && activeTab === 'Audience');
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.startsWith('Earnings') ? 'Earnings' : 'Audience')}
                className={`pb-4 text-sm font-semibold transition-all relative ${
                  isTarget ? 'text-[#6366F1]' : 'text-[#718096]'
                }`}
              >
                {tab}
                {isTarget && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6366F1]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shared Balance Display */}
      <div className="text-center mb-10">
        <p className="text-[32px] font-bold text-[#6366F1]">$1,723</p>
        <p className="text-xs text-[#718096] font-medium tracking-wide">Available balance</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-between items-center bg-white border border-[#E2E8F0] rounded-[16px] px-6 py-4 mb-8 ">
        <span className="font-bold text-[#2D3748] text-sm">30Sep 2025 - 30 Oct 2025</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#A0AEC0] uppercase tracking-widest">Filter</span>
          <button className="flex items-center gap-2 border border-[#E2E8F0] rounded-[12px] px-4 py-2 text-sm font-medium text-[#4A5568] bg-white hover:bg-gray-50 transition-colors shadow-sm">
            Select Date <Calendar size={16} className="text-[#A0AEC0]" />
          </button>
        </div>
      </div>

      {activeTab === 'Earnings' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EARNINGS_DATA.map((item, idx) => (
              <CardWrapper key={idx} className="flex flex-col">
                <p className="text-[28px] font-bold text-[#2D3748] mb-1">{item.value}</p>
                <p className="text-xs font-medium text-[#718096] mb-4">{item.title}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-[10px] text-[#A0AEC0] font-medium">{item.subtext}</span>
                   <div className={`flex items-center gap-1 px-2 py-1 rounded-[12px] text-[11px] font-bold shadow-sm ${(
                     item.trend === 'up' ? 'bg-[#F0FFF4] text-[#48BB78]' : 'bg-[#FFF5F5] text-[#F56565]'
                   )}`}>
                     {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                     {item.trend === 'up' ? '+5.25%' : '-7.85%'}
                   </div>
                </div>
              </CardWrapper>
            ))}
          </div>

          {/* Campaign Table */}
          <CardWrapper title="Earned by campaign">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#F7FAFC]">
                    <th className="pb-4 text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">SL</th>
                    <th className="pb-4 text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">Campaign</th>
                    <th className="pb-4 text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">Earnings</th>
                    <th className="pb-4 text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest text-right">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7FAFC]">
                  {CAMPAIGN_EARNINGS.map((row) => (
                    <tr key={row.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-5 text-sm font-medium text-[#718096]">{row.sl}</td>
                      <td className="py-5 flex items-center gap-4">
                        <div className="w-12 h-8 rounded-[12px] bg-pink-100 flex-shrink-0 shadow" />
                        <span className="text-sm font-semibold text-[#2D3748] leading-tight">{row.name}</span>
                      </td>
                      <td className="py-5 text-sm font-bold text-[#2D3748]">{row.amount}</td>
                      <td className="py-5 text-right">
                        <span className={`text-xs font-bold ${
                          row.status === 'Released' ? 'text-[#48BB78]' : 'text-[#A0AEC0]'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardWrapper>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Audience Growth Chart */}
          <CardWrapper className="h-[400px]">
             <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-[#2D3748]">Audience Growth</h3>
               <div className="bg-[#EBEDFF] text-[#6366F1] text-[10px] font-black px-3 py-1 rounded-[16px] uppercase shadow">
                 Sep 2025
               </div>
             </div>
             <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA} margin={{ left: -20, right: 10 }}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#F7FAFC" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#A0AEC0', fontSize: 11, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366F1" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorGrowth)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#6366F1' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </CardWrapper>

          {/* Stats Progress Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CardWrapper title="Top 5 countries">
              {AUDIENCE_STATS.countries.map(s => <ProgressBar key={s.label} label={s.label} percentage={s.value} />)}
            </CardWrapper>
            <CardWrapper title="Top 5 cities">
              {AUDIENCE_STATS.cities.map(s => <ProgressBar key={s.label} label={s.label} percentage={s.value} />)}
            </CardWrapper>
            <CardWrapper title="Top age ranges">
              {AUDIENCE_STATS.age.map(s => <ProgressBar key={s.label} label={s.label} percentage={s.value} />)}
            </CardWrapper>
            <CardWrapper title="Gender">
              {AUDIENCE_STATS.gender.map(s => <ProgressBar key={s.label} label={s.label} percentage={s.value} />)}
            </CardWrapper>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}