"use client";
import React from 'react';
import { Sparkles, ShieldCheck, Briefcase, Star } from 'lucide-react';

const matches = [
  {
    icon: <Sparkles size={40} strokeWidth={1.5} />,
    title: "Smart Recommendations"
  },
  {
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    title: "Verified Collaboration Score"
  },
  {
    icon: <Briefcase size={40} strokeWidth={1.5} />,
    title: "Campaign Suggestions"
  },
  {
    icon: <Star size={40} strokeWidth={1.5} />,
    title: "Interest & Niche Filters"
  }
];

const PerfectMatch: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3142]">
            Find Your Perfect Match
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {matches.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Icon with subtle hover effect */}
              <div className="text-[#2D3142] mb-6 group-hover:text-[#6366F1] transition-colors duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#2D3142] leading-tight max-w-[200px]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PerfectMatch;