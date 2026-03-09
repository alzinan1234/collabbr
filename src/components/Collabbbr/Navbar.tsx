"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // পাথ চেক করার জন্য ইমপোর্ট করা হয়েছে
import { ChevronDown, Menu, X } from 'lucide-react';

// নেভিগেশন আইটেমগুলোর অবজেক্ট
const navLinks = [
  { name: 'Home', href: '/', hasDropdown: false },
  { name: 'Badges', href: '/badges', hasDropdown: false },
  { name: 'About Us', href: '/about', hasDropdown: false },
  { name: 'Pricing', href: '/price', hasDropdown: false },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // বর্তমান ইউআরএল পাথ জানার জন্য

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/collabbr-logo.png" alt="Collabbr Logo" className="max-w-[160px] md:max-w-[210px]" />
          </Link>

          {/* Desktop Navigation - Mapping Objects */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              // চেক করা হচ্ছে এই লিঙ্কটি অ্যাক্টিভ কি না
              const isActive = pathname === link.href;

              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isActive 
                      ? 'text-[#5D5FEF]' // অ্যাক্টিভ হলে এই কালার হবে
                      : 'text-[#374151] hover:text-[#5D5FEF]' // নরমাল কালার
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </Link>
              );
            })}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/signin">
              <button className="text-[#374151] font-semibold hover:text-[#5D5FEF] transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="border-2 border-[#5D5FEF] text-[#5D5FEF] px-6 py-2.5 rounded-xl font-bold hover:bg-[#5D5FEF] hover:text-white transition-all duration-300">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Mapping Objects */}
      <div className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-4 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex justify-between items-center py-2 font-medium border-b border-gray-50 ${
                  isActive ? 'text-[#5D5FEF]' : 'text-gray-700'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={18} />}
              </Link>
            );
          })}
          
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full text-center py-3 font-semibold text-gray-700">Sign In</button>
            </Link>
            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-[#5D5FEF] text-white py-3 rounded-xl font-bold">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;