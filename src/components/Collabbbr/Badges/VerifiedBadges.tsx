"use client";
import React from 'react';
import { ArrowUp, Check, Star, Gem, Crown } from 'lucide-react';

const badges = [
  {
    icon: <ArrowUp className="text-white" size={32} />,
    color: "bg-[#4CAF50]",
    label: "Starter",
    desc: "Entry level credibility"
  },
  {
    icon: <Check className="text-white" size={32} />,
    color: "bg-[#2196F3]",
    label: "Verified",
    desc: "Identity & activity verified"
  },
  {
    icon: <Star className="text-white fill-white" size={32} />,
    color: "bg-[#FFC107]",
    label: "Pro",
    desc: "Proven campaign performance"
  },
  {
    icon: <Gem className="text-white" size={32} />,
    color: "bg-[#000000]",
    label: "Elite",
    desc: "High ROI & brand trust"
  },
  {
    icon: <Crown className="text-white fill-white" size={32} />,
    color: "bg-[#9C27B0]",
    label: "Impact Leader",
    desc: "Industry leading influence"
  }
];

const VerifiedBadges: React.FC = () => {
  return (
    <section className="w-full bg-white">
      {/* Header with light blue background */}
      <div className="bg-[#F0F5FF] py-16 px-4 text-center pt-30 md:pt-34 md:pb-20">
        <h2 className="text-[32px] md:text-[42px] font-bold text-[#1a1f36] mb-4">
          Build Trust with Verified Badges
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Badges represent credibility, performance, and professionalism on Collabbr.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Badge Levels Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a1f36] text-center mb-16">
          Badge Levels
        </h3>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`${badge.color} w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm`}>
                {badge.icon}
              </div>
              <h4 className="font-bold text-[#1a1f36] mb-2">{badge.label}</h4>
              <p className="text-gray-500 text-xs md:text-sm px-2">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Progression Rules */}
        <div className="max-w-2xl text-left">
          <h3 className="text-2xl font-bold text-[#1a1f36] mb-6">
            Progression Rules
          </h3>
          <ul className="space-y-3">
            {[
              "Only one badge can be active at a time",
              "Next badge unlocks after meeting performance criteria",
              "Upgrading disables previous badge automatically"
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm md:text-base">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VerifiedBadges;