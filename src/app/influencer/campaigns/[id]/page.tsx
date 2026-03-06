"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight,
  Share2,
  Bookmark,
  Layout,
} from 'lucide-react';
import Link from 'next/link';

// --- ডাইনামিক ইমেজসহ আপডেট করা ডামি ডেটা ফাংশন ---
const getCampaignDetails = (id: string) => {
  // id এর উপর ভিত্তি করে আলাদা আলাদা ইমেজ জেনারেট করার জন্য logic
  const seed = id ? id.length : Math.floor(Math.random() * 100);
  
  return {
    id: id,
    title: 'Eid Glow Campaign – GlowSkin Beauty',
    description: 'A festive skincare collaboration highlighting GlowSkin\'s new "Eid Radiance" line, focusing on natural beauty and glowing skin during Eid celebrations.',
    goal: 'Increase brand visibility and drive product awareness before Eid through influencer-led Reels and Stories.',
    deliverable: '1 YouTube Short + 3 Instagram Stories.',
    startDate: '25 Aug 2025',
    endDate: '04 Sep 2025',
    duration: '10 Days',
    budget: 250,
    // ডাইনামিক ব্যানার ইমেজ (id অনুযায়ী পরিবর্তন হবে)
    imageUrl: `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200&sig=${seed}`,
    business: {
      name: 'LunaGlow Cosmetics',
      handle: '@lunaglow_official',
      location: 'Kuala Lumpur, Malaysia',
      // ডাইনামিক বিজনেস লোগো/অ্যাভাটার
      avatar: `https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&q=80&w=150&sig=${seed + 1}`
    }
  };
};

export default function CampaignDetailsPage() {
  const params = useParams();
  // params.id ব্যবহার করে ডাইনামিক ডেটা কল করা হচ্ছে
  const campaign = getCampaignDetails(params.id as string);

  return (
    <div className="min-h-screen bg-[#FCFCFD] pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-6">
          <Link href="/influencer/campaigns" className="hover:text-[#5D5FEF] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-[#1e293b] font-medium">Campaign</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-[#1e293b] tracking-tight">
            Campaign Details
          </h1>
          <div className="flex gap-2">
             <button className="p-2.5 rounded-[12px] border border-gray-100 bg-white text-gray-400 hover:text-[#5D5FEF] hover:bg-gray-50 transition-all shadow-sm">
                <Share2 size={18} />
             </button>
             <button className="p-2.5 rounded-[12px] border border-gray-100 bg-white text-gray-400 hover:text-[#5D5FEF] hover:bg-gray-50 transition-all shadow-sm">
                <Bookmark size={18} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-[16px] overflow-hidden aspect-video bg-gray-100 border border-gray-100">
              <img 
                src={campaign.imageUrl} 
                alt={campaign.title} 
                className="w-full h-full object-cover transition-opacity duration-500" 
                key={campaign.imageUrl} // ইমেজ লোডিং স্মুথ করার জন্য
              />
            </div>

            <div className="bg-white rounded-[16px] border border-gray-100 p-6 sm:p-8 space-y-8 shadow-sm">
              <section className="space-y-6">
                <h2 className="text-lg font-bold text-[#1e293b]">Campaign Details</h2>
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Campaign Title</h4>
                    <p className="text-[16px] font-semibold text-[#1e293b]">{campaign.title}</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Description</h4>
                    <p className="text-gray-500 leading-relaxed text-[14px]">{campaign.description}</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Goal</h4>
                    <p className="text-gray-500 leading-relaxed text-[14px]">{campaign.goal}</p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-50" />

              <section className="space-y-6">
                <h2 className="text-lg font-bold text-[#1e293b]">Content Details</h2>
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Deliverable</h4>
                  <p className="text-gray-700 font-medium text-[14px]">{campaign.deliverable}</p>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-4">Creative Guideline</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square bg-[#F8F9FB] rounded-[16px] border border-gray-100 flex items-center justify-center">
                        <Layout className="text-gray-200" size={24} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column (Sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Budget & Timeline Card */}
            <div className="bg-white rounded-[16px] border border-gray-100 p-6 space-y-6 shadow-sm">
              <h3 className="text-md font-bold text-[#1e293b]">Budget & Timeline</h3>
              
              <div className="space-y-5">
                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 rounded-[12px] bg-indigo-50 flex items-center justify-center text-[#5D5FEF]">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-none mb-1">Timeline</p>
                    <p className="text-[14px] font-semibold text-[#1e293b]">{campaign.startDate} - {campaign.endDate}</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 rounded-[12px] bg-orange-50 flex items-center justify-center text-orange-500">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-none mb-1">Duration</p>
                    <p className="text-[14px] font-semibold text-[#1e293b]">{campaign.duration}</p>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-50 flex justify-between items-center">
                 <span className="text-2xl font-bold text-[#5D5FEF] tracking-tight">${campaign.budget}</span>
                 <div className="bg-[#FF5C00] text-white w-7 h-7 rounded-[8px] flex items-center justify-center shadow-md shadow-orange-100">
                    <span className="font-bold text-[10px]">B</span>
                 </div>
              </div>
            </div>  
            
            {/* Business Info Card */}
            <div className="bg-white rounded-[16px] border border-gray-100 p-6 space-y-5 shadow-sm">
              <h3 className="text-md font-bold text-[#1e293b]">Business Info</h3>
              
              <div className="flex items-center gap-3">
                <img 
                  src={campaign.business.avatar} 
                  className="w-11 h-11 rounded-full object-cover border border-gray-100" 
                  alt="Avatar" 
                  key={campaign.business.avatar}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[14px] text-[#1e293b] truncate leading-tight">{campaign.business.name}</h4>
                  <p className="text-[11px] text-gray-400 font-medium truncate">{campaign.business.handle}</p>
                </div>
                <button className="text-[11px] font-bold text-[#5D5FEF] hover:underline whitespace-nowrap">View Details</button>
              </div>

              <div className="flex items-center gap-1.5 text-gray-400 py-1">
                <MapPin size={13} />
                <span className="text-[12px] font-medium">{campaign.business.location}</span>
              </div>

              <button className="w-full bg-[#5D5FEF] text-white py-3.5 rounded-[12px] font-bold text-[14px] hover:bg-[#4a4cd4] transition-all shadow-md shadow-indigo-50 flex items-center justify-center gap-2 group">
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}