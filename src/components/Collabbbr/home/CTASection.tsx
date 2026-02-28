"use client";
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="text-[32px] md:text-[42px] font-bold text-[#2D3142] mb-4 tracking-tight">
          Start Your Collaboration Journey
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-500 text-lg mb-10">
          Join with us
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#4F46E5] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-indigo-100">
            Hire an Influencer
          </button>
          
          <button className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#4F46E5] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-indigo-100">
            Become an Influencer
          </button>
        </div>

      </div>
    </section>
  );
};

export default CTASection;