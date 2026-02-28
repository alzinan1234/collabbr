"use client";
import React from 'react';

const GrowAndEarn: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12">
      {/* Main Container with Light Cream/Yellow Background */}
      <div className="max-w-7xl mx-auto bg-[#FFF8E7] rounded-[16px] overflow-hidden p-8 md:p-9 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Dashboard Preview Image */}
        <div className="flex-1 w-full max-w-[550px] order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/Analytics.png" // আপনার ড্যাশবোর্ড গ্রাফিক ইমেজ পাথ
              alt="Creative Boost Dashboard" 
              className="w-full h-auto object-cover rounded-2xl" 
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex-1 text-left order-1 lg:order-2">
          <h2 className=" text-2xl md:text-[40px]  font-bold text-[#5A401E] leading-tight mb-2">
            Grow & Earn
          </h2>
          <h3 className="text-[32px] md:text-[44px] font-medium text-[#7C5E30] leading-tight mb-6">
            Your Creativity. Your Earnings
          </h3>
          
          <p className="text-[#5E6282] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Work with trusted brands, set your own rates, and enjoy transparent, 
            hassle-free payouts for every campaign.
          </p>

          <button className="bg-[#5A401E] hover:bg-[#453117] text-white px-3 py-2 md:px-8 md:py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg">
            Become an Influencer
          </button>
        </div>

      </div>
    </section>
  );
};

export default GrowAndEarn;