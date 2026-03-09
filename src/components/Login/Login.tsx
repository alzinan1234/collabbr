"use client";
import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Mail } from "lucide-react";

// --- Types for Navigation ---
type Screen = "welcome" | "social" | "email";

// --- Branding Component ---
const BrandSection = () => (
  <div className="hidden md:flex w-1/2 bg-slate-50 flex-col items-center justify-center p-12 select-none">
    <div className="flex flex-col items-center gap-4">
     <img src="./Frame 55.png" alt="" />
    </div>
  </div>
);

// --- Shared Footer ---
const AuthFooter = () => (
  <div className="mt-6 text-center">
    <p className="text-[10px] text-gray-400 leading-relaxed px-4">
      By signing in, you agree to our <a href="#" className="text-[#5D5FEF] underline">Terms & Conditions</a> and review our <a href="#" className="text-[#5D5FEF] underline">Privacy Policy</a> to learn how we protect your data.
    </p>
  </div>
);

// --- Screens ---

const WelcomeScreen = ({ next }: { next: () => void }) => (
  <div className="flex flex-col items-center text-center p-8 animate-in fade-in duration-500">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to Collabbr</h2>
    <p className="text-xs text-gray-500 mb-8 max-w-[280px]">AI-powered influencer discovery, secure escrow, and transparent performance tracking</p>
    
    <div className="w-full space-y-3">
      <button className="w-full py-3 bg-[#5D5FEF] hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all">Hire an Influencer</button>
      <button className="w-full py-3 bg-[#5D5FEF] hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all">Become an Influencer</button>
      
      <div className="flex items-center py-2">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="px-3 text-[10px] text-gray-300 font-bold uppercase">or</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <button onClick={next} className="w-full py-3 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 text-[#5D5FEF] text-sm font-semibold rounded-xl transition-all">
        Sign In
      </button>
    </div>
    <AuthFooter />
  </div>
);

const SocialScreen = ({ back, email }: { back: () => void; email: () => void }) => (
  <div className="flex flex-col p-8 animate-in slide-in-from-right-4 duration-300">
    <h2 className="text-xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
    
    <div className="space-y-3">
      <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
        <span className="text-sm font-medium text-gray-600">Continue with Google</span>
      </button>
      <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
        <img src="https://www.svgrepo.com/show/442923/apple.svg" className="w-5 h-5" alt="Apple" />
        <span className="text-sm font-medium text-gray-600">Continue with Apple</span>
      </button>
      <button onClick={email} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
        <Mail size={18} className="text-gray-400" />
        <span className="text-sm font-medium text-gray-600">Continue with Email</span>
      </button>
    </div>

    <div className="text-center my-5">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
    </div>

    <div className="flex gap-3 mb-6">
      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
        <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-4 h-4" alt="LinkedIn" />
        <span className="text-xs font-semibold text-gray-600">LinkedIn</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
        <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-4 h-4" alt="Facebook" />
        <span className="text-xs font-semibold text-gray-600">Facebook</span>
      </button>
    </div>

    <p className="text-center text-sm text-gray-500">
      Don't have an account? <button className="text-[#5D5FEF] font-bold hover:underline">Sign Up</button>
    </p>
    <AuthFooter />
  </div>
);

const EmailScreen = ({ back }: { back: () => void }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col p-8 animate-in slide-in-from-right-4 duration-300">
      <button onClick={back} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 mb-6 hover:bg-gray-100 transition-colors">
        <ChevronLeft size={18} />
      </button>

      <h2 className="text-xl font-bold text-gray-800 leading-tight mb-8">Continue with your email/username and password</h2>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email or username</label>
          <input type="text" placeholder="Enter email or username" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-[#5D5FEF] outline-none text-sm transition-all" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
          <div className="relative">
            <input type={show ? "text" : "password"} placeholder="Enter password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-[#5D5FEF] outline-none text-sm transition-all" />
            <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#5D5FEF] focus:ring-[#5D5FEF]" defaultChecked />
            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-800">Remember Me</span>
          </label>
          <button className="text-xs font-bold text-[#5D5FEF] hover:underline">Forgot Password?</button>
        </div>

        <button className="w-full py-4 bg-[#5D5FEF] hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all">Sign In</button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account? <button className="text-[#5D5FEF] font-bold hover:underline">Sign Up</button>
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
      {/* Background blobs for depth */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      {/* Large watermark text shown in prototype */}
      <div className="absolute bottom-4 right-8 opacity-10 pointer-events-none">
        <h1 className="text-[120px] font-black tracking-tighter text-white">Collabbr</h1>
      </div>

      <div className="w-full max-w-[860px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex min-h-[580px] relative z-10 border border-white/20">
        <BrandSection />
        
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center">
          {screen === "welcome" && <WelcomeScreen next={() => setScreen("social")} />}
          {screen === "social" && <SocialScreen back={() => setScreen("welcome")} email={() => setScreen("email")} />}
          {screen === "email" && <EmailScreen back={() => setScreen("social")} />}
        </div>
      </div>
    </div>
  );
}