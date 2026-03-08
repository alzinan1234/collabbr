"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// --- ডামি ডেটা (একই ফাইলে রাখা হয়েছে যাতে এরর না দেয়) ---
const orderData = [
  { id: 1, campaign: 'Summer Glow Launch', influencer: 'Sara Afrin', influencerAvatar: 'https://i.pravatar.cc/150?u=1', campaignImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100', date: '25 Aug 2025', expiry: '5 Days', budget: 250, status: 'Pending' },
  { id: 2, campaign: 'Beauty Glow Series', influencer: 'Zayan Ahmed', influencerAvatar: 'https://i.pravatar.cc/150?u=2', campaignImage: 'https://images.unsplash.com/photo-1596462502278-27bfac4023c6?w=100', date: '25 Aug 2025', expiry: '5 Days', budget: 250, status: 'In Progress' },
  { id: 3, campaign: 'Lipstick Promo', influencer: 'Mila Islam', influencerAvatar: 'https://i.pravatar.cc/150?u=3', campaignImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100', date: '21 Aug 2025', expiry: 'Delivered', budget: 320, status: 'Delivered' },
  { id: 4, campaign: 'Skincare Routine', influencer: 'Rohan Fazal', influencerAvatar: 'https://i.pravatar.cc/150?u=4', campaignImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100', date: '25 Aug 2025', expiry: '5 Days', budget: 250, status: 'Completed' },
  { id: 5, campaign: 'Night Cream Ad', influencer: 'Nila Khan', influencerAvatar: 'https://i.pravatar.cc/150?u=5', campaignImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=100', date: '25 Aug 2025', expiry: 'Rejected', budget: 250, status: 'Rejected' },
  { id: 6, campaign: 'Hydration Boost', influencer: 'Sara Afrin', influencerAvatar: 'https://i.pravatar.cc/150?u=6', campaignImage: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=100', date: '18 Aug 2025', expiry: 'Delivered', budget: 400, status: 'Delivered' },
  { id: 7, campaign: 'Matte Finish Foundation', influencer: 'Aria Noor', influencerAvatar: 'https://i.pravatar.cc/150?u=7', campaignImage: 'https://images.unsplash.com/photo-1590156221122-c748e78f2a4a?w=100', date: '15 Aug 2025', expiry: 'Delivered', budget: 180, status: 'Delivered' },
  { id: 8, campaign: 'Vitamin C Serum', influencer: 'Zayan Ahmed', influencerAvatar: 'https://i.pravatar.cc/150?u=8', campaignImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100', date: '12 Aug 2025', expiry: 'Delivered', budget: 550, status: 'Delivered' },
];

const tabs = ['Active', 'Delivered', 'Completed', 'Rejected'];

const OrdersTable = () => {
  const [activeTab, setActiveTab] = useState('Active');

  // --- ট্যাব অনুযায়ী ফিল্টার লজিক ---
  const filteredData = useMemo(() => {
    if (activeTab === 'Active') {
      // Active ট্যাবে Pending এবং In Progress দুটিই দেখাবে
      return orderData.filter(item => item.status === 'Pending' || item.status === 'In Progress');
    }
    return orderData.filter(item => item.status === activeTab);
  }, [activeTab]);

  return (
    <div className='bg-white min-h-screen'>
      <div className="max-w-[1440px] mx-auto pt-10 py-10 px-4">
        {/* Header */}
        <h2 className="text-[28px] font-bold text-[#1e293b] mb-8">Orders</h2>

        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[14px] font-medium whitespace-nowrap transition-all relative ${
                activeTab === tab ? 'text-[#5D5FEF]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#5D5FEF] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-100 rounded-[16px]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 accent-[#5D5FEF] cursor-pointer" 
                  />
                </th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Campaign</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Assigned Influencer</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Created At</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Expired In</th>
                <th className="py-4 px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Budget</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-5 px-6 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 accent-[#5D5FEF] cursor-pointer" 
                    />
                  </td>
                  
                  {/* Campaign Column */}
                  <td className="py-5 px-4">
                    <Link href={`/influencer/orders/${order.id}`} className="flex items-center gap-3">
                      <img 
                        src={order.campaignImage} 
                        className="w-[50px] h-[35px] object-cover rounded-[6px] flex-shrink-0 bg-gray-100 shadow-sm" 
                        alt="campaign"
                      />
                      <span className="text-[13px] font-bold text-[#1e293b] group-hover:text-[#5D5FEF] transition-colors">{order.campaign}</span>
                    </Link>
                  </td>

                  {/* Influencer Column */}
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={order.influencerAvatar} 
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0" 
                        alt="influencer"
                      />
                      <span className="text-[13px] font-medium text-gray-600">{order.influencer}</span>
                    </div>
                  </td>

                  <td className="py-5 px-4 text-[13px] text-gray-500 font-medium">{order.date}</td>
                  <td className="py-5 px-4 text-[13px] text-[#1e293b] font-bold">{order.expiry}</td>
                  <td className="py-5 px-4 text-[14px] font-bold text-[#1e293b]">${order.budget}</td>
                  
                  {/* Status Column */}
                  <td className="py-5 px-6 text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[12px] font-medium text-gray-900">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-gray-400 font-semibold">
                    No data found for "{activeTab}" category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;