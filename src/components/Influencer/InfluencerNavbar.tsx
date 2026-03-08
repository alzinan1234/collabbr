"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Bell, MessageSquareMore, 
  Settings, User, BarChart3, Star, 
  Heart, Wallet, CreditCard, LogOut, 
  BadgeCheck, CheckCircle2, Trash2
} from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', href: '/influencer/dashboard' },
  { name: 'Orders', href: '/influencer/orders' },
  { name: 'Campaigns', href: '/influencer/campaigns' },
  { name: 'Analytics', href: '/influencer/analytics' },
  { name: 'Subscription', href: '/influencer/influencer-subscription' },
  { name: 'Badges', href: '/influencer/badges' },
];

const notificationsData = [
  { id: 1, text: "GlowMore costmetics sent you an offer request", time: "11:42 PM, 11 Aug 2025", isRead: false },
  { id: 2, text: "You delivery request has been accepted by GlowMore Cosmetics", time: "11:42 PM, 11 Aug 2025", isRead: false },
  { id: 3, text: "GlowMore Cosmetics sent you an message", time: "11:42 PM, 11 Aug 2025", isRead: false },
  { id: 4, text: "GlowMore Cosmetics has been accepted your offer request.", time: "11:42 PM, 11 Aug 2025", isRead: false },
];

const InfluencerNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Unread');
  const pathname = usePathname();
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/collabbr-logo.png" alt="Collabbr Logo" className="max-w-[160px] md:max-w-[210px] " />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[15px] font-medium transition-colors ${
                  pathname === link.href ? 'text-[#5D5FEF]' : 'text-[#4B5563] hover:text-[#5D5FEF]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <button className="text-gray-500 hover:text-[#5D5FEF] transition-colors">
              <MessageSquareMore size={24} strokeWidth={1.5} />
            </button>
            
            {/* Notification Section */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsProfileOpen(false); // Close profile if notification is opened
                }}
                className={`p-1 transition-colors relative ${isNotificationOpen ? 'text-[#5D5FEF]' : 'text-gray-500 hover:text-[#5D5FEF]'}`}
              >
                <Bell size={24} strokeWidth={1.5} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {isNotificationOpen && (
                <div className="absolute right-[-70px] sm:right-0 mt-3 w-[calc(100vw-32px)] sm:w-[450px] md:w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[60] overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="flex justify-between items-center p-4 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-[#1e293b]">Notifications</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                      <Settings size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 p-4 border-b border-gray-50">
                    {['Unread', 'Read', 'All'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          activeTab === tab ? 'bg-[#5D5FEF] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {tab}
                        <span className="text-[10px] bg-red-400 text-white px-1.5 rounded-full">04</span>
                      </button>
                    ))}
                    <button className="ml-auto text-xs font-semibold text-green-600 hover:text-green-700">
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-[350px] overflow-y-auto">
                    {notificationsData.map((noti) => (
                      <div key={noti.id} className="flex items-start gap-3 p-4 hover:bg-blue-50/50 border-b border-gray-50 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#5D5FEF] shrink-0">
                          <MessageSquareMore size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 leading-snug">{noti.text}</p>
                          <p className="text-[11px] text-gray-400 mt-1 font-semibold">{noti.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50/50 flex justify-center">
                    <button className="flex items-center gap-2 text-sm font-bold text-red-500 px-4 py-2 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={16} /> Clear all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section */}
            <div className="relative" ref={profileRef}>
              <div 
                onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationOpen(false); // Close notification if profile is opened
                }}
                className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${
                  isProfileOpen ? 'border-[#5D5FEF] ring-4 ring-indigo-50' : 'border-gray-200 hover:border-[#5D5FEF]'
                }`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-[320px] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 z-[70] overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                  <div className="px-5 py-4 flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                      alt="Sara Afrin"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-[#1e293b] text-base truncate">Sara Afrin</h4>
                        <span className="text-gray-400 text-[10px] font-normal shrink-0">@sana_afrin03</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">sana_afrin03@gmail.com</p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 border-b border-gray-100">
                    <Link 
                      href="/influencer/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex justify-center items-center py-2.5 border-2 border-[#5D5FEF] text-[#5D5FEF] font-bold rounded-xl text-sm hover:bg-indigo-50 transition-all"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div className="py-1 border-b border-gray-100">
                    <ProfileItem href="/influencer/analytics" icon={<BarChart3 size={18} />} label="Analytics" onClick={() => setIsProfileOpen(false)} />
                    <ProfileItem href="/influencer/influencer-subscription" icon={<BadgeCheck size={18} />} label="Subscription" onClick={() => setIsProfileOpen(false)} />
                    <ProfileItem href="/influencer/reviews" icon={<Star size={18} />} label="My reviews" onClick={() => setIsProfileOpen(false)} />
                    <ProfileItem href="/influencer/saved" icon={<Heart size={18} />} label="Saved Lists" onClick={() => setIsProfileOpen(false)} />
                  </div>

                  <div className="py-1 border-b border-gray-100">
                    <ProfileItem href="/influencer/earnings" icon={<Wallet size={18} />} label="Earnings & Withdrawals" onClick={() => setIsProfileOpen(false)} />
                    <ProfileItem href="/influencer/payment-billing" icon={<CreditCard size={18} />} label="Payment & Billing" onClick={() => setIsProfileOpen(false)} />
                    <ProfileItem href="/influencer/settings" icon={<Settings size={18} />} label="Account Settings" onClick={() => setIsProfileOpen(false)} />
                  </div>

                  <div className="py-1">
                    <button className="w-full flex items-center gap-4 px-6 py-2.5 text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={18} />
                      <span className="font-semibold text-[15px]">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 text-gray-600"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Drawer (Omitted for brevity but keep your previous implementation) */}
    </nav>
  );
};

// Helper component for dropdown items
const ProfileItem = ({ href, icon, label, onClick }: { href: string, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="flex items-center gap-4 px-6 py-2.5 text-[#334155] hover:bg-gray-50 transition-colors group"
  >
    <span className="text-[#64748b] group-hover:text-[#5D5FEF] transition-colors">{icon}</span>
    <span className="font-semibold text-[15px]">{label}</span>
  </Link>
);

export default InfluencerNavbar;