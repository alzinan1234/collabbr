"use client";
import React from 'react';
import { Briefcase, ShieldCheck, Send, Banknote } from 'lucide-react';

const steps = [
  {
    icon: <Briefcase className="text-[#6366F1]" size={32} />,
    title: "Create campaign",
    desc: "Define your goals, deliverables, timeline, and budget. Choose influencers that match your niche."
  },
  {
    icon: <ShieldCheck className="text-[#6366F1]" size={32} />,
    title: "Escrow",
    desc: "Funds are securely held in escrow to protect both businesses and influencers."
  },
  {
    icon: <Send className="text-[#6366F1]" size={32} />,
    title: "Deliver",
    desc: "Influencers create and submit content based on agreed guidelines."
  },
  {
    icon: <Banknote className="text-[#6366F1]" size={32} />,
    title: "Get paid",
    desc: "Businesses approve deliverables, payments are released, performance is tracked in real time."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-6">
            How does it works
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
            Create campaigns, secure payments in escrow, collaborate with confidence, and complete projects 
            smoothly, every step designed to keep your workflow transparent, safe, and hassle-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Icon Container with subtle animation */}
              <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-[#6366F1]/5 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-[#1F2937] mb-4">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;