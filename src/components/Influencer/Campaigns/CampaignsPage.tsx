"use client";
import React, { useState, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface Campaign {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  appliedCount: number;
  budget: number;
  niche: string;
  imageUrl: string;
  userAvatars: string[];
}

// --- Mock Data ---
const categories = [
  'Lifestyle & Personal',
  'Beauty & Fashion',
  'Food & Beverage',
  'Health, Fitness & Wellness',
  'Travel & Adventure',
  'Technology & Gadgets',
  'Gaming & Esports',
  'Business, Finance & Ent...',
];

const mockCampaigns: Campaign[] = Array(12).fill(null).map((_, index) => ({
  id: index + 1,
  title: 'Summer Glow Launch',
  startDate: '15 Sep 25',
  endDate: '25 Sep 25',
  daysLeft: 11,
  appliedCount: 34,
  budget: 100,
  niche: index < 8 ? 'Beauty & Fashion' : 'Travel & Adventure',
  imageUrl: `https://picsum.photos/seed/${index + 40}/600/400`, 
  userAvatars: [
    'https://i.pravatar.cc/150?u=1',
    'https://i.pravatar.cc/150?u=2',
    'https://i.pravatar.cc/150?u=3',
  ],
}));

const sortOptions = ['Most recent', 'Highest Budget', 'Lowest Budget', 'Ending Soon'];

// --- CampaignCard Component ---
const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  return (
    <Link href={`/influencer/campaigns/${campaign.id}`}>
      <div className="bg-white rounded-[16px] sm:rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500 group cursor-pointer h-full">
        <div className="relative aspect-[16/11] overflow-hidden">
          <img 
            src={campaign.imageUrl} 
            alt={campaign.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <button 
            onClick={(e) => { e.preventDefault(); /* Like logic here */ }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2.5 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10"
          >
            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
        
        <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
          <h3 className="font-semibold text-[14px] sm:text-[17px] text-[#1e293b] group-hover:text-[#5D5FEF] transition-colors line-clamp-1">
            {campaign.title}
          </h3>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-[11px] sm:text-[13px] text-gray-500 font-medium gap-1">
            <span>{campaign.startDate} - {campaign.endDate}</span>
            <span className="text-[#5D5FEF] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5D5FEF]" />
              {campaign.daysLeft} Days
            </span>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex -space-x-2 sm:-space-x-2.5">
                {campaign.userAvatars.slice(0, 3).map((url, i) => (
                  <img key={i} src={url} alt="User" className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <span className="text-[10px] sm:text-[12px] font-medium text-gray-500">{campaign.appliedCount} applied</span>
            </div>
            <div className="text-right">
              <p className="text-[14px] sm:text-[16px] font-bold text-[#1e293b]">${campaign.budget}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Main Page Component ---
const CampaignsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse drag scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const currentCategory = searchParams.get('category') || categories[0];
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || sortOptions[0];

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // --- Mouse Drag Scroll Logic ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryClick = (category: string) => {
    if (!isDragging) updateParams({ category });
  };

  const allFiltered = mockCampaigns.filter(c => 
    (currentCategory === categories[0] || c.niche === currentCategory) &&
    (!currentSearch || c.title.toLowerCase().includes(currentSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FCFCFD] pt-20 sm:pt-24 pb-20">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* --- Category Section (Mouse Drag Enabled) --- */}
        <div className="border-b border-gray-100 overflow-hidden">
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          >
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`pb-4 text-[13px] sm:text-[14px] font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                  category === currentCategory 
                    ? 'text-[#5D5FEF] border-[#5D5FEF]' 
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- Header & Search --- */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b] tracking-tight">Campaigns</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={(e) => { e.preventDefault(); updateParams({ search: searchInput }); }} className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search your suitable campaign"
                className="w-full pl-12 pr-4 py-3 bg-white border text-black border-gray-100 rounded-xl text-[14px] outline-none focus:ring-2 focus:ring-[#5D5FEF]/10 focus:border-[#5D5FEF] transition-all"
              />
            </form>

            <div className="relative" ref={sortRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between w-full md:w-auto gap-3 px-5 py-3 bg-white border border-gray-100 rounded-xl text-[14px] font-medium text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Sort by:</span>
                  <span className="text-[#1e293b] font-semibold">{currentSort}</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-full md:w-52 bg-white rounded-xl shadow-2xl z-50 py-2 border border-gray-50 animate-in fade-in slide-in-from-top-2">
                  {sortOptions.map(option => (
                    <button 
                      key={option}
                      onClick={() => { updateParams({ sort: option }); setIsSortOpen(false); }}
                      className={`w-full text-left px-5 py-2 text-[14px] ${option === currentSort ? 'text-[#5D5FEF] bg-indigo-50/50 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Campaign Sections (Responsive Grid) --- */}
        {[
          { title: "Based on Your Niche", data: allFiltered.slice(0, 8) },
          { title: "Campaigns you may like", data: allFiltered.slice(8, 12) }
        ].map((section, idx) => (
          <section key={idx} className="space-y-6">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1e293b]">{section.title}</h2>
            {section.data.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {section.data.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} />)}
              </div>
            ) : <NoResults />}
            <div className="flex justify-center pt-4">
              <button className="w-full sm:w-auto px-8 py-2.5 border border-[#5D5FEF] text-[#5D5FEF] rounded-full text-[14px] font-semibold hover:bg-[#5D5FEF] hover:text-white transition-all duration-300">
                View more
              </button>
            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

const NoResults = () => (
  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
    <p className="text-gray-500 font-medium text-sm sm:text-base">No campaigns found.</p>
  </div>
);

export default CampaignsPage;