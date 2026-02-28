"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Youtube, Twitter } from 'lucide-react';

// ফুটার ডাটা অবজেক্ট
const footerSections = [
  {
    title: 'Categories',
    links: [
      { name: 'Lifestyle & Personal', href: '/categories/lifestyle' },
      { name: 'Beauty & Fashion', href: '/categories/beauty' },
      { name: 'Food & Beverage', href: '/categories/food' },
      { name: 'Health, Fitness & Wellness', href: '/categories/health' },
      { name: 'Travel & Adventure', href: '/categories/travel' },
      { name: 'Technology & Gadgets', href: '/categories/tech' },
      { name: 'Gaming & Esports', href: '/categories/gaming' },
      { name: 'Business, Finance & Entrepreneurship', href: '/categories/business' },
      { name: 'Art, Design & Creativity', href: '/categories/art' },
      { name: 'Music & Performing Arts', href: '/categories/music' },
      { name: 'Automotive', href: '/categories/automotive' },
      { name: 'Home, Decor & Real Estate', href: '/categories/home' },
      { name: 'Pets & Animals', href: '/categories/pets' },
    ],
  },
  {
    title: 'Legal & Policy',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Refund Policy (Summary)', href: '/refund' },
      { name: 'Cookie Policy', href: '/cookie' },
      { name: 'Refund & Cancellation Policy', href: '/cancellation' },
      { name: 'Escrow Terms', href: '/escrow' },
      { name: 'Community Guidelines', href: '/guidelines' },
      { name: 'Influencer Agreement', href: '/agreement' },
      { name: 'DMCA / Copyright Policy', href: '/dmca' },
      { name: 'Acceptable Use Policy', href: '/acceptable-use' },
      { name: 'DPA (Enterprise)', href: '/dpa' },
    ],
  },
  {
    title: 'Features',
    links: [
      { name: 'Badges Explained', href: '/features/badges' },
      { name: 'Trust & Safety', href: '/features/trust' },
      { name: 'Fraud Detection Explained', href: '/features/fraud' },
      { name: 'Audience Overlap Explained', href: '/features/audience' },
      { name: 'AI Matching & ROI Prediction', href: '/features/ai-matching' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Request a demo', href: '/demo' },
    ],
  },
];

const socialLinks = [
  { icon: <Instagram size={20} />, href: "#" },
  { icon: <Facebook size={20} />, href: "#" },
  { icon: <Linkedin size={20} />, href: "#" },
  { icon: <Youtube size={20} />, href: "#" },
  { icon: <Twitter size={20} />, href: "#" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-30 pb-12">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        
        {/* Grid Layout: ৫টি কলাম */}
        <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
          
          {/* Column 1: Logo, Description & Socials */}
          <div className="lg:col-span-1 pr-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/collabbr-logo.png" alt="Collabbr Logo" className="h-8 w-auto" />
             
            </Link>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
              Influencers Collaboration Hub is an AI-powered platform that connects brands and influencers for seamless, secure, and data-driven collaborations. Businesses can easily discover the right influencers, manage campaigns, and make payments safely through escrow — all in one place.
            </p>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
              Our mission is to make influencer marketing smarter, transparent, and more impactful for both creators and brands.
            </p>
            <div className="flex gap-4 text-gray-400">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="hover:text-[#5D5FEF] transition-colors">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2, 3, 4, 5: Dynamic Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-gray-900 text-sm mb-6 uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-500 text-[13px] hover:text-[#5D5FEF] transition-all duration-200 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-sm">
          <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center text-[10px] font-medium italic">
            C
          </div>
          <span className="font-medium">Brand Name 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;