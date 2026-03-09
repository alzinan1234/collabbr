"use client";
import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const features = [
    {
      icon: "💳", // এখানে আপনি আপনার পছন্দমতো ইমেজ বা SVG ব্যবহার করতে পারেন
      title: "Get Paid Securely",
      desc: "Every payment is protected through our escrow system No delays, No risks"
    },
    {
      icon: "💼",
      title: "Work with Trusted Brands",
      desc: "Collaborate with verified businesses that value your creativity"
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      desc: "Track engagement, conversions, and revenue from every campaign"
    }
  ];

  return (
    <section className="relative w-full pt-12">
      {/* Background Image Container */}
      <div 
        className="relative h-[500px] md:h-[600px] w-full  flex items-center justify-start bg-cover bg-center px-4 sm:px-6 lg:px-8"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop')` 
        }}
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-[48px] font-bold mb-4 leading-tight">
              Connect. Collaborate. Grow.
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              The all-in-one platform where brands and creators build meaningful partnerships.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mb-8">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by influencer, category or tag"
                className="w-full py-4 pl-12 pr-4 rounded-lg bg-white text-gray-900 focus:outline-none shadow-lg text-sm md:text-base"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#6366F1] hover:bg-[#4f52d9] text-sm text-white px-3 py-2 md:px-8 md:py-3 rounded-lg md:font-semibold transition-all">
                Hire an Influencer
              </button>
              <button className="bg-[#6366F1] hover:bg-[#4f52d9] text-white px-3 py-2 md:px-8 md:py-3 rounded-lg md:font-semibold transition-all">
                Become an Influencer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Feature Cards Section */}
      <div className="relative -mt-20 md:-mt-24 z-10 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-[1440px] mx-auto">
          <div 
            className="bg-white rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 text-center"
            style={{ 
              boxShadow: '0px 20px 25px -5px #0000001A, 0px 8px 10px -6px #0000001A' 
            }}
          >
            {features.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;