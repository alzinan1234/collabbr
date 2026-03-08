"use client";

import React, { useState, useRef } from 'react';
import { 
  User, 
  Share2, 
  KeyRound, 
  Camera, 
  Pencil, 
  Instagram, 
  Youtube, 
  Twitch,
  ChevronRight,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type TabType = 'Account Info' | 'Social Account' | 'Change Password';

const BusinessesAccounntSetting = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Account Info');
  const [onlineStatus, setOnlineStatus] = useState(true);

  const tabs = [ 
    { name: 'Account Info', icon: <User size={18} /> },
    { name: 'Social Account', icon: <Share2 size={18} /> },
    { name: 'Change Password', icon: <KeyRound size={18} /> },
  ];

  return (
    <div className="bg-white  text-[#2D3748]  pb-20">
      <div className="max-w-[1440px] p-4 md:p-8 mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A202C]">Account Settings</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Online Status</span>
            <button 
              onClick={() => setOnlineStatus(!onlineStatus)}
              className={`w-12 h-6 rounded-full transition-colors relative ${onlineStatus ? 'bg-[#6366F1]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${onlineStatus ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="border border-gray-100 rounded-xl p-2 bg-white shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all font-medium ${
                    activeTab === tab.name 
                      ? 'bg-[#6366F1] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 border border-gray-100 rounded-xl p-6 bg-white shadow-sm min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }} 
              >
                {activeTab === 'Account Info' && <AccountInfoView />}
                {activeTab === 'Social Account' && <SocialAccountView />}
                {activeTab === 'Change Password' && <ChangePasswordView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const InputField = ({ label, placeholder, type = "text", icon, defaultValue }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
    <div className="relative">
      <input 
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#6366F1] transition-colors text-sm"
      />
      {icon && <div className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">{icon}</div>}
    </div>
  </div>
);

const AccountInfoView = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#6366F1] text-3xl font-bold mb-3 overflow-hidden cursor-pointer border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-all"
        >
          {profileImg ? (
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            "B"
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-[#6366F1] text-xs font-semibold hover:underline"
        >
          <Camera size={14} /> Upload New Photo
        </button>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <InputField label="Username" placeholder="username" defaultValue="sana_afrin" />
        <InputField label="Full Name" placeholder="Write full name" defaultValue="Sara Afrin" />
        <InputField label="Email Address" placeholder="Write email address" defaultValue="saraafrin@gmail.com" icon={<Pencil size={14} />} />
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Bio</label>
          <textarea 
            placeholder="Write your bio"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#6366F1] min-h-[100px] text-sm resize-none"
          />
        </div>
        <InputField label="Price Per Post" placeholder="Input price per post" defaultValue="$250" />
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Your Category</label>
          <div className="relative">
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none bg-white text-sm appearance-none cursor-pointer">
              <option>Fashion & Lifestyle</option>
              <option>Technology</option>
              <option>Travel</option>
              <option>Food & Drink</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
        <button className="bg-[#6366F1] text-white px-10 py-3 rounded-lg font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-[#5558e3] transition-all ml-auto block active:scale-95">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const SocialAccountView = () => {
  const [accounts, setAccounts] = useState([
    { platform: 'Instagram', user: 'sana.672', icon: <Instagram className="text-pink-600" size={18} /> },
    { platform: 'Tiktok', user: 'sana.672', icon: <img src="https://www.svgrepo.com/show/333611/tiktok.svg" className="w-4 h-4" alt="tiktok" /> },
  ]);

  const removeAccount = (platform: string) => {
    setAccounts(accounts.filter(acc => acc.platform !== platform));
  };

  return (
    <div className="space-y-4">
      {accounts.map((item) => (
        <div key={item.platform} className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              {item.icon} {item.platform}
            </div>
            <button 
              onClick={() => removeAccount(item.platform)}
              className="text-[11px] font-bold border border-red-100 px-3 py-1 rounded-md text-red-500 hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-50">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user}`} alt="avatar" className="w-full h-full" />
            </div>
            <span className="text-sm font-bold text-slate-800">{item.user}</span>
          </div>
        </div>
      ))}
      
      {/* Add New Accounts */}
      <div className="border-2 border-dashed border-slate-100 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-bold group-hover:text-indigo-600">
          <Youtube size={18} className="text-red-600" /> Add Youtube Account
        </div>
        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600" />
      </div>

      <div className="border-2 border-dashed border-slate-100 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-bold group-hover:text-indigo-600">
          <Twitch size={18} className="text-purple-600" /> Add Twitch Account
        </div>
        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600" />
      </div>
    </div>
  );
};

const ChangePasswordView = () => (
  <div className="max-w-xl mx-auto space-y-2">
    <InputField label="Current Password" type="password" placeholder="Write current password" />
    <InputField label="New Password" type="password" placeholder="Write new password" />
    <InputField label="Confirm New Password" type="password" placeholder="Re-type your new password" />
    <div className="flex justify-end mt-6">
      <button className="bg-[#6366F1] text-white px-10 py-3 rounded-lg font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-[#5558e3] transition-all active:scale-95">
        Change Password
      </button>
    </div>
  </div>
);

function Check({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default BusinessesAccounntSetting;