// "use client";

// import React, { useState, useMemo } from 'react';
// import InfluencerCard from './InfluencerDirectory';

// import { 
//   ChevronDown, MapPin, Target, DollarSign, 
//   ShieldCheck, Zap, Bot, Search 
// } from 'lucide-react';
// import { FilterOptions, Influencer } from './types';

// export default function FilteringAndSuggested({ initialInfluencers }: { initialInfluencers: Influencer[] }) {
//   const [filters, setFilters] = useState<FilterOptions>({});
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filtering Logic
//   const filteredInfluencers = useMemo(() => {
//     return initialInfluencers.filter((inf) => {
//       const matchesBadge = !filters.badgeLevel || filters.badgeLevel.includes(inf.badge);
//       const matchesSearch = inf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                             inf.category.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesLocation = !filters.location || filters.location.includes(inf.location);
      
//       return matchesBadge && matchesSearch && matchesLocation;
//     });
//   }, [filters, searchQuery, initialInfluencers]);

//   return (
//     <div className="space-y-8">
//       {/* Search & Main Title */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         <h1 className="text-4xl font-black text-gray-900 dark:text-white">Influencer Directory</h1>
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
//           <input 
//             type="text" 
//             placeholder="Search by name or category..."
//             className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500/20"
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="flex flex-wrap gap-3 py-6 border-y border-gray-100 dark:border-zinc-900">
//         <FilterDropdown 
//           title="Platform" 
//           icon={<Target size={18} className="text-purple-600" />} 
//           options={['Instagram', 'Tiktok', 'Youtube', 'Twitch']}
//           onChange={(val) => setFilters({...filters, platform: [val]})}
//         />
//         <FilterDropdown 
//           title="Badge Level" 
//           icon={<ShieldCheck size={18} className="text-blue-600" />} 
//           options={['Verified', 'Impact Leader', 'Macro']}
//           onChange={(val) => setFilters({...filters, badgeLevel: [val]})}
//         />
//         <FilterDropdown 
//           title="Location" 
//           icon={<MapPin size={18} className="text-red-500" />} 
//           options={['Dhaka, Bangladesh', 'London, UK', 'New York, USA']}
//           onChange={(val) => setFilters({...filters, location: [val]})}
//         />
//       </div>

//       {/* Grid Display */}
//       <div>
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-xl font-bold dark:text-white">
//             Suggested Influencers <span className="text-gray-400 text-sm font-normal">({filteredInfluencers.length} found)</span>
//           </h2>
//         </div>

//         {filteredInfluencers.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredInfluencers.map((inf) => (
//               <InfluencerCard key={inf.id} influencer={inf} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800">
//             <Zap size={40} className="mx-auto text-gray-300 mb-4" />
//             <h3 className="text-lg font-bold dark:text-white">No Influencers Found</h3>
//             <p className="text-gray-500">Try changing your filters or search keywords.</p>
//           </div>
//         )}
//       </div>

//       {/* Load More */}
//       <div className="flex justify-center pt-10">
//         <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-8 py-3 rounded-full font-bold hover:shadow-md transition-all dark:text-white">
//           <Bot size={20} className="text-indigo-600" />
//           AI Load More Match
//         </button>
//       </div>
//     </div>
//   );
// }

// // Reusable Dropdown Component
// function FilterDropdown({ title, icon, options, onChange }: any) {
//   const [selected, setSelected] = useState("");
//   return (
//     <div className="relative group">
//       <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-4 py-2.5 rounded-full text-sm font-semibold hover:border-indigo-500 transition-all dark:text-white">
//         {icon}
//         {selected || title}
//         <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
//       </button>
//       <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
//         {options.map((opt: string) => (
//           <button 
//             key={opt}
//             onClick={() => { setSelected(opt); onChange(opt); }}
//             className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors dark:text-gray-300"
//           >
//             {opt}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }