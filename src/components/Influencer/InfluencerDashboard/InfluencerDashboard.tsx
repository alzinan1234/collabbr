"use client";
import React, { useState } from 'react';
import { BadgeCheck, Star, ChevronDown, ChevronUp } from 'lucide-react';

const InfluencerDashboard = () => {
  // State for the Collapsible Table functionality
  const [isTableOpen, setIsTableOpen] = useState(true);

  // Mock data with images
  const activeOrders = [
    { 
      sl: "01", 
      name: "Urban Fit Collection 2025", 
      expired: "5 Days 4 hrs", 
      budget: "$250", 
      status: "In Progress",
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80" 
    },
    { 
      sl: "02", 
      name: "Eid Elegance '25 – Celebrate Style with Grace", 
      expired: "5 Days 4 hrs", 
      budget: "$250", 
      status: "In Progress",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80"
    },
    { 
      sl: "03", 
      name: "Glow Beyond Limits – Summer Skincare Routine", 
      expired: "5 Days 4 hrs", 
      budget: "$250", 
      status: "In Progress",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=80"
    },
    { 
      sl: "04", 
      name: "Pure Beauty by Nature – Organic Care Line Launch", 
      expired: "5 Days 4 hrs", 
      budget: "$250", 
      status: "In Progress",
      img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&q=80"
    },
  ];

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-8 text-[#4B5563] font-sans pt-38">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[320px] space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-gray-50">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" 
                  alt="Sara Afrin" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h2 className="text-xl font-bold text-[#111827]">Sara Afrin</h2>
              <p className="text-sm text-gray-500">@sana_afrin03</p>
              <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
            </div>
            
            <button className="w-full py-2.5 border border-[#5D5FEF] text-[#5D5FEF] rounded-xl font-semibold hover:bg-[#5D5FEF] hover:text-white transition-all mb-8">
              View Profile
            </button>

            <div className="space-y-4 border-t border-gray-50 pt-6">
              <h3 className="text-sm font-bold text-[#111827] mb-4">Profile Overview</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm">Badge</span>
                <div className="flex items-center gap-1 text-[#5D5FEF]">
                  <span className="text-sm font-bold">Verified</span>
                  <BadgeCheck size={18} fill="#5D5FEF" color="white" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Fraud Score</span>
                <span className="text-sm font-bold text-[#111827]">25/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rating</span>
                <div className="flex items-center gap-1 text-[#5D5FEF]">
                  <span className="text-sm font-bold">4.8/5</span>
                  <Star size={18} fill="#5D5FEF" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-6">Earnings</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm">Earned this month</span>
                <span className="text-sm font-bold text-[#111827]">$235</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Available balance</span>
                <span className="text-sm font-bold text-[#111827]">$525</span>
              </div>
            </div>
            <button className="w-full py-2.5 border border-[#5D5FEF] text-[#5D5FEF] rounded-xl font-semibold hover:bg-[#5D5FEF] hover:text-white transition-all">
              View Details
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Welcome back, Sana Afrin!</h1>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
              Empower your influence - track performance, grow your audience, and turn your content into income.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Functional Toggle Header */}
            <div 
              className="px-6 py-5 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsTableOpen(!isTableOpen)}
            >
              <h3 className="text-sm font-bold text-[#111827]">
                Active order list - <span className="text-gray-400 font-medium">4 ($765)</span>
              </h3>
              {isTableOpen ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>

            {/* Collapsible Content */}
            {isTableOpen && (
              <div className="overflow-x-auto transition-all">
                <table className="w-full text-left">
                  <thead className="bg-[#fcfcfd] text-[12px] uppercase text-gray-400 font-semibold border-b border-gray-50">
                    <tr>
                      <th className="px-6 py-4">SL</th>
                      <th className="px-6 py-4">Campaign</th>
                      <th className="px-6 py-4">Expired In</th>
                      <th className="px-6 py-4">Budget</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activeOrders.map((order) => (
                      <tr key={order.sl} className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <td className="px-6 py-5 text-sm font-medium text-gray-400">{order.sl}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                               <img src={order.img} alt={order.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold text-[#374151] line-clamp-1">{order.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm font-medium text-[#374151]">{order.expired}</td>
                        <td className="px-6 py-5 text-sm font-bold text-[#374151]">{order.budget}</td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-medium text-[#4B5563]">{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;