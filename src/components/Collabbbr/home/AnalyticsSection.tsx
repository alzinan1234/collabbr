"use client";
import React from 'react';

const AnalyticsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12">
      {/* Main Container with Light Blue Background */}
      <div className="max-w-7xl mx-auto bg-[#E0E7FF] rounded-[16px] overflow-hidden p-8 md:p-9 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Content Side */}
        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-[40px] font-light  text-[#2D3142] mb-6">
            Grow Your Business with <br />
            <span className="font-bold italic">Powerful Influencer Analytics</span>
          </h2>
          
          <p className="text-[#5E6282] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Make smarter marketing decisions with real-time analytics, trusted data, 
            and performance-driven insights that help you track every campaign, 
            measure real ROI, and turn opportunities into lasting business growth.
          </p>

          <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-10 py-4px-3 py-2 md:px-8 md:py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-indigo-200">
            Hire an Influencer
          </button>
        </div>

        {/* Right Image/Graphic Side */}
        <div className="flex-1 w-full max-w-[600px]">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* এখানে আপনার গ্রাফিক ইমেজটি বসাবেন */}
            <img 
              src="/Analytics.png" // আপনার ইমেজের পাথ দিন
              alt="Influencer Analytics Dashboard" 
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AnalyticsSection;