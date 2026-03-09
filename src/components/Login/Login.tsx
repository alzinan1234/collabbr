"use client";
import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Mail } from "lucide-react";

// --- Types for Navigation ---
type Screen = "welcome" | "social" | "email";

// --- Left Branding Panel ---
const BrandSection = () => (
  <div className="hidden md:flex w-1/2 bg-[#F8F9FB] flex-col items-center justify-center p-12 select-none border-r border-gray-100">
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
      {/* This is where your Frame 55.png asset lives */}
      <img 
        src="./Frame 55.png" 
        alt="Collabbr Branding" 
        className="max-w-[280px] object-contain pointer-events-none transition-transform hover:scale-105 duration-500"
      />
    </div>
  </div>
);

// --- Shared Footer ---
const AuthFooter = () => (
  <div className="mt-8 text-center">
    <p className="text-[10px] text-gray-400 leading-relaxed px-6">
      By signing in, you agree to our <a href="#" className="text-[#5D5FEF] underline hover:text-indigo-700">Terms & Conditions</a> and review our <a href="#" className="text-[#5D5FEF] underline hover:text-indigo-700">Privacy Policy</a> to learn how we protect your data.
    </p>
  </div>
);

// --- Screen 1: Welcome ---
const WelcomeScreen = ({ next }: { next: () => void }) => (
  <div className="flex flex-col items-center text-center p-8 md:p-12 animate-in fade-in zoom-in-95 duration-500">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Collabbr</h2>
    <p className="text-sm text-gray-500 mb-10 max-w-[300px] leading-relaxed">
      AI-powered influencer discovery, secure escrow, and transparent performance tracking
    </p>
    
    <div className="w-full space-y-4">
      <button className="w-full py-3.5 bg-[#5D5FEF] hover:bg-[#4a4cd6] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 transform hover:-translate-y-0.5">
        Hire an Influencer
      </button>
      <button className="w-full py-3.5 bg-[#5D5FEF] hover:bg-[#4a4cd6] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 transform hover:-translate-y-0.5">
        Become an Influencer
      </button>
      
      <div className="flex items-center py-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="px-4 text-[11px] text-gray-300 font-bold uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <button 
        onClick={next} 
        className="w-full py-3.5 border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 text-[#5D5FEF] text-sm font-bold rounded-xl transition-all"
      >
        Sign In
      </button>
    </div>
    <AuthFooter />
  </div>
);

// --- Screen 2: Social Options ---
const SocialScreen = ({ back, email }: { back: () => void; email: () => void }) => (
  <div className="flex flex-col p-8 md:p-12 animate-in slide-in-from-right-8 duration-300">
    <h2 className="text-2xl font-bold text-gray-900 mb-8">Sign in to your account</h2>
    
    <div className="space-y-3.5">
      <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all group">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
        <span className="text-sm font-semibold text-gray-700">Continue with Google</span>
      </button>
      <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all group">
        <img src="https://www.svgrepo.com/show/442923/apple.svg" className="w-5 h-5" alt="Apple" />
        <span className="text-sm font-semibold text-gray-700">Continue with Apple</span>
      </button>
      <button 
        onClick={email} 
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all group"
      >
        <Mail size={18} className="text-gray-400 group-hover:text-[#5D5FEF]" />
        <span className="text-sm font-semibold text-gray-700">Continue with Email</span>
      </button>
    </div>

    <div className="text-center my-7">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Or continue with</span>
    </div>

    <div className="flex gap-4 mb-8">
      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-blue-50/50 transition-all group">
        <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-4 h-4" alt="LinkedIn" />
        <span className="text-xs font-bold text-gray-600 group-hover:text-[#0A66C2]">LinkedIn</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-blue-50/50 transition-all group">
        <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-4 h-4" alt="Facebook" />
        <span className="text-xs font-bold text-gray-600 group-hover:text-[#1877F2]">Facebook</span>
      </button>
    </div>

    <p className="text-center text-sm text-gray-500">
      Don't have an account? <button className="text-[#5D5FEF] font-bold hover:underline ml-1">Sign Up</button>
    </p>
    <AuthFooter />
  </div>
);

// --- Screen 3: Email & Password ---
const EmailScreen = ({ back }: { back: () => void }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col p-8 md:p-12 animate-in slide-in-from-right-8 duration-300">
      <button 
        onClick={back} 
        className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 mb-8 hover:bg-gray-100 hover:text-gray-600 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-8">
        Continue with your email/username and password
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email or username</label>
          <input 
            type="text" 
            placeholder="Enter email or username" 
            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-[#5D5FEF] outline-none text-sm transition-all placeholder:text-gray-300" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <input 
              type={show ? "text" : "password"} 
              placeholder="Enter password" 
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-[#5D5FEF] outline-none text-sm transition-all placeholder:text-gray-300" 
            />
            <button 
              onClick={() => setShow(!show)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[#5D5FEF] focus:ring-[#5D5FEF] cursor-pointer" 
              defaultChecked 
            />
            <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">Remember Me</span>
          </label>
          <button className="text-xs font-bold text-[#5D5FEF] hover:underline">Forgot Password?</button>
        </div>

        <button className="w-full py-4 bg-[#5D5FEF] hover:bg-[#4a4cd6] text-white font-bold rounded-xl shadow-xl shadow-indigo-100 transform hover:-translate-y-0.5 transition-all">
          Sign In
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        Don't have an account? <button className="text-[#5D5FEF] font-bold hover:underline ml-1">Sign Up</button>
      </p>
      <AuthFooter />
    </div>
  );
};

// --- Main Layout ---
export default function CollabbrAuth() {
  const [screen, setScreen] = useState<Screen>("welcome");

  return (
    <div className="min-h-screen w-full bg-[#5D5FEF] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
        
        {/* Your Background Image (Frame 55 or similar pattern) */}
        <img 
          src="./Sign In Page.png" 
          alt="" 
          className=""
        />

        {/* 2. Watermark Text Style */}
        {/* <div className="absolute bottom-6 right-10 opacity-10">
          <h1 className="text-[120px] md:text-[200px] font-black tracking-tighter text-white leading-none">
            Collabbr
          </h1>
        </div> */}
      </div>

      {/* 3. Main Card Container */}
      <div className="w-full max-w-[920px] bg-white rounded-[40px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex min-h-[640px] relative z-10 border border-white/40 backdrop-blur-sm">
        
        {/* Left Side: Branding Asset */}
        <BrandSection />
        
        {/* Right Side: Auth Logic */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center relative">
          {screen === "welcome" && (
            <WelcomeScreen next={() => setScreen("social")} />
          )}
          {screen === "social" && (
            <SocialScreen 
              back={() => setScreen("welcome")} 
              email={() => setScreen("email")} 
            />
          )}
          {screen === "email" && (
            <EmailScreen back={() => setScreen("social")} />
          )}
        </div>
      </div>
    </div>
  );
}