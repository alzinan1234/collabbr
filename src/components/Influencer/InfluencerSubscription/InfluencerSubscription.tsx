"use client";
import React, { useState } from 'react';
import { Check, X, Calendar, Clock } from 'lucide-react';

type PlanType = 'Free' | 'Pro' | 'Enterprise';

interface FeatureRow {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

const features: FeatureRow[] = [    
  { name: "Basic Campaign Metrics (Spend, Clicks, Conversions, ROAS, CPA)", free: true, pro: true, enterprise: true },
  { name: "Real-Time Dashboard Updates", free: false, pro: true, enterprise: true },
  { name: "Influencer Leaderboard", free: "Limit - 5", pro: true, enterprise: "Exportable" },
  { name: "Campaign Funnel Analytics", free: false, pro: true, enterprise: true },
  { name: "Audience Demographics", free: false, pro: true, enterprise: true },
  { name: "Audience Overlap & Unique Reach", free: false, pro: "Basic", enterprise: "Advanced Matrix" },
  { name: "Fraud Detection Report", free: false, pro: true, enterprise: "AI anomaly detection" },
  { name: "ROI Prediction & Forecasting", free: false, pro: false, enterprise: "ML Model" }, 
  { name: "Engagement Quality Index (EQI)", free: false, pro: true, enterprise: true },
  { name: "Custom Dashboard Filters", free: "Limited", pro: true, enterprise: "Multi Filter + Save Views" },
  { name: "Export Tools (PDF, CSV, Scheduled Email)", free: false, pro: true, enterprise: "White - Label" },
  { name: "Data Refresh Frequency", free: "48h", pro: "24h", enterprise: "Real-time (hourly)" },
  { name: "API Access", free: false, pro: "Limited", enterprise: "Full" },
  { name: "Team Collaboration", free: false, pro: "2 Users", enterprise: "Unlimited Roles" },
  { name: "Benchmark Comparisons", free: false, pro: false, enterprise: true },
  { name: "Dedicated Support", free: "Community", pro: "Standard", enterprise: "Priority (Analyst Access)" },
];

const InfluencerSubscription = () => {
  const [activePlan, setActivePlan] = useState<PlanType>('Free');

  const btnGradient = "linear-gradient(180deg, #6265F1 0%, #5047E6 100%)";

  const RenderStatus = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? <Check className="text-green-500 mx-auto" size={20} /> : <X className="text-red-500 mx-auto" size={20} />;
    }
    return <span className="text-sm text-gray-600 font-medium">{val}</span>;
  };

  return (
    <section className="py-20 bg-white px-4 pt-38">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#2D3142] mb-12">Subscription Plan</h2>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Free Plan */}
          <div 
            onClick={() => setActivePlan('Free')}
            className={`relative p-6 rounded-[24px] border-2 cursor-pointer transition-all ${activePlan === 'Free' ? 'border-[#6265F1] bg-[#6265F1] text-white shadow-xl' : 'border-gray-100 bg-white text-black'}`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold">Free Plan</h3>
                <p className={`text-xs ${activePlan === 'Free' ? 'text-indigo-100' : 'text-gray-400'}`}>Currently You're Using</p>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
            </div>
            
            <div className="space-y-2 mb-8">
              <p className="text-xs opacity-80">Will expire on</p>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1"><Calendar size={14}/> 05 Nov 2025</span>
                <span className="flex items-center gap-1"><Clock size={14}/> 11:45 PM</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">$0<span className="text-sm font-normal opacity-80">/month</span></div>
              <div className="w-10 h-5 bg-white/30 rounded-full relative">
                 <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
         
          {/* Pro Plan */}
          <div 
            onClick={() => setActivePlan('Pro')}
            className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all ${activePlan === 'Pro' ? 'border-[#6265F1] bg-[#6265F1] text-white shadow-xl' : 'border-gray-100 bg-white text-black'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className={`text-xl font-bold ${activePlan === 'Pro' ? 'text-white' : 'text-[#6265F1]'}`}>Pro Plan</h3>
              <span className="bg-[#FFF8E7] text-[#7C5E30] px-3 py-1 rounded-lg text-xs font-bold">Popular</span>
            </div>
            <div className={`text-3xl font-bold mb-8 ${activePlan === 'Pro' ? 'text-white' : 'text-black'}`}>$199<span className={`text-sm font-normal ${activePlan === 'Pro' ? 'text-gray-200' : 'text-gray-400'}`}>/month</span></div>
            <button 
              style={{ background: btnGradient }}
              className="w-full py-3 text-white rounded-xl font-bold shadow-lg shadow-indigo-200"
            >
              Upgrade Now 
            </button>
          </div>

          {/* Enterprise Plan */}
          <div 
            onClick={() => setActivePlan('Enterprise')}
            className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all ${activePlan === 'Enterprise' ? 'border-[#6265F1] bg-[#6265F1] text-white shadow-xl' : 'border-gray-100 bg-white text-black'}`}
          >
            <h3 className={`text-xl font-bold mb-6 ${activePlan === 'Enterprise' ? 'text-white' : 'text-[#6265F1]'}`}>Enterprise Plan</h3>
            <div className={`text-3xl font-bold mb-8 ${activePlan === 'Enterprise' ? 'text-white' : 'text-black'}`}>$499<span className={`text-sm font-normal ${activePlan === 'Enterprise' ? 'text-gray-200' : 'text-gray-400'}`}>/month</span></div>
            <button 
              style={{ background: btnGradient }}
              className="w-full py-3 text-white rounded-xl font-bold shadow-lg shadow-indigo-200"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Feature Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-6 text-sm font-bold text-gray-600 border-b border-r border-gray-100 w-1/3 text-center">Feature</th>
                <th className="p-6 text-sm font-bold text-gray-600 border-b border-r border-gray-100 text-center">Free</th>
                <th className="p-6 text-sm font-bold text-gray-600 border-b border-r border-gray-100 text-center">Pro</th>
                <th className="p-6 text-sm font-bold text-gray-600 border-b border-gray-100 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-5 text-sm text-gray-600 border-b border-r border-gray-100">{feature.name}</td>
                  <td className="p-5 border-b border-r border-gray-100 text-center">{RenderStatus(feature.free)}</td>
                  <td className="p-5 border-b border-r border-gray-100 text-center">{RenderStatus(feature.pro)}</td>
                  <td className="p-5 border-b border-gray-100 text-center">{RenderStatus(feature.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default InfluencerSubscription;