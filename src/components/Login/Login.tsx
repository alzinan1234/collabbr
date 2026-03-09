"use client";
import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Mail } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "welcome" | "signin" | "email-signin";

// ─── Collabbr Logo ────────────────────────────────────────────────────────────

function CollabbrLogo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const iconSize = size === "lg" ? 72 : 56;
  const textSize = size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Icon */}
      <div
        style={{ width: iconSize, height: iconSize }}
        className="rounded-2xl bg-[#5D5FEF] flex items-center justify-center shadow-lg"
      >
        <svg width={iconSize * 0.6} height={iconSize * 0.6} viewBox="0 0 44 44" fill="none">
          <path
            d="M22 8C14.268 8 8 14.268 8 22s6.268 14 14 14c3.2 0 6.15-1.07 8.5-2.85L25 27.6A8 8 0 1122 30a7.97 7.97 0 014.6-1.45l5.55 5.55A13.93 13.93 0 0036 22c0-7.732-6.268-14-14-14z"
            fill="white"
            fillOpacity="0.9"
          />
          <circle cx="22" cy="22" r="4" fill="white" />
        </svg>
      </div>
      {/* Text */}
      <span className={`${textSize} font-bold text-[#5D5FEF] tracking-tight`}>Collabbr</span>
    </div>
  );
}

// ─── Left Panel ───────────────────────────────────────────────────────────────

function LeftPanel() {
  return (
    <div className="hidden md:flex w-[45%] bg-[#F5F5FA] rounded-l-3xl flex-col items-center justify-center p-10">
      <CollabbrLogo size="lg" />
    </div>
  );
}

// ─── Screen 1: Welcome ────────────────────────────────────────────────────────

function WelcomeScreen({ onHireInfluencer, onBecomeInfluencer, onSignIn }: {
  onHireInfluencer: () => void;
  onBecomeInfluencer: () => void;
  onSignIn: () => void;
}) {
  return (
    <div className="flex flex-col justify-center px-10 py-14 gap-6">
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Collabbr</h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
          AI-powered influencer discovery, secure escrow, and transparent performance tracking
        </p>
      </div>

      <button
        onClick={onHireInfluencer}
        className="w-full py-3 bg-gradient-to-r from-[#5D5FEF] to-[#6366F1] hover:from-[#4a4cd6] hover:to-[#5a5dd8] text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Hire an Influencer
      </button>

      <button
        onClick={onBecomeInfluencer}
        className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#5D5FEF] hover:from-[#5a5dd8] hover:to-[#4a4cd6] text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Become an Influencer
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        onClick={onSignIn}
        className="w-full py-3 border-2 border-gray-200 hover:border-[#5D5FEF] text-gray-700 hover:text-[#5D5FEF] font-semibold rounded-xl text-sm transition-all hover:bg-indigo-50"
      >
        Sign In
      </button>

      <p className="text-center text-[11px] text-gray-400 leading-relaxed mt-1">
        By signing in, you agree to our{" "}
        <a href="#" className="text-[#5D5FEF] underline">Terms & Conditions</a>{" "}
        and review our{" "}
        <a href="#" className="text-[#5D5FEF] underline">Privacy Policy</a>{" "}
        to learn how we protect your data.
      </p>
    </div>
  );
}

// ─── Screen 2: Sign In (Social) ───────────────────────────────────────────────

function SignInScreen({ onBack, onEmailSignIn }: {
  onBack: () => void;
  onEmailSignIn: () => void;
}) {
  return (
    <div className="flex flex-col justify-center px-10 py-12 gap-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to your account</h1>

      {/* Google */}
      <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 hover:border-[#5D5FEF] rounded-xl text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
          <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
        </svg>
        Continue with Google
      </button>

      {/* Apple */}
      <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 hover:border-[#5D5FEF] rounded-xl text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
          <path d="M13.173 9.497c-.013-1.564.688-2.745 2.104-3.618-.788-1.126-1.97-1.749-3.524-1.88-1.466-.126-3.07.855-3.657.855-.618 0-2.055-.814-3.151-.814C2.67 4.077 0 5.9 0 9.625c0 1.073.196 2.18.588 3.322.524 1.503 2.414 5.183 4.383 5.121 1.027-.025 1.755-.733 3.088-.733 1.294 0 1.968.733 3.112.733 1.984-.028 3.696-3.393 4.196-4.9-2.664-1.26-2.194-3.69-2.194-3.671z"/>
          <path d="M11.678 2.893C12.632 1.76 12.55.47 12.525 0 11.504.06 10.32.693 9.65 1.468c-.724.832-1.228 1.875-1.12 3.073 1.116.086 2.133-.51 3.148-1.648z"/>
        </svg>
        Continue with Apple
      </button>

      {/* Email */}
      <button
        onClick={onEmailSignIn}
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 hover:border-[#5D5FEF] rounded-xl text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm"
      >
        <Mail size={16} className="text-gray-500" />
        Continue with Email
      </button>

      {/* Or continue with */}
      <div className="text-center text-sm text-gray-500 font-medium mt-2">Social Sign-In</div>

      <div className="flex gap-3">
        {/* LinkedIn */}
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-[#0A66C2] rounded-xl text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>

        {/* Facebook */}
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-[#1877F2] rounded-xl text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-2">
        Don't have an account?{" "}
        <a href="#" className="text-[#5D5FEF] font-semibold hover:underline">Sign Up</a>
      </p>

      <p className="text-center text-[11px] text-gray-400 leading-relaxed">
        By signing in, you agree to our{" "}
        <a href="#" className="text-[#5D5FEF] underline">Terms & Conditions</a>{" "}
        and review our{" "}
        <a href="#" className="text-[#5D5FEF] underline">Privacy Policy</a>{" "}
        to learn how we protect your data.
      </p>
    </div>
  );
}

// ─── Screen 3: Email Sign In ──────────────────────────────────────────────────

function EmailSignInScreen({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim()) e.email = "Email or username is required";
    if (!password.trim()) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSignIn = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center px-10 py-16 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Signed in successfully!</h2>
        <p className="text-sm text-gray-500">Welcome back to Collabbr.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center px-10 py-10 gap-4">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors self-start"
      >
        <ChevronLeft size={20} />
      </button>

      <div>
        <h1 className="text-xl font-bold text-gray-900 leading-snug">
          Continue with your email/username<br />and password
        </h1>
      </div>

      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email or username</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email or username"
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] transition-all placeholder:text-gray-400 ${errors.email ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#5D5FEF] transition-all placeholder:text-gray-400 ${errors.password ? "border-red-400" : "border-gray-200"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-[#5D5FEF]"
            />
            <span className="text-sm text-gray-600">Remember Me</span>
          </label>
          <a href="#" className="text-sm text-[#5D5FEF] font-semibold hover:underline">Forgot Password?</a>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-[#5D5FEF] to-[#6366F1] hover:from-[#4a4cd6] hover:to-[#5a5dd8] disabled:opacity-70 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
              </svg>
              Signing in...
            </>
          ) : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="#" className="text-[#5D5FEF] font-semibold hover:underline">Sign Up</a>
      </p>

      <p className="text-center text-[11px] text-gray-400 leading-relaxed">
        By signing in, you agree to our{" "}
        <a href="#" className="text-[#5D5FEF] underline">Terms & Conditions</a>{" "}
        and review our{" "}
        <a href="#" className="text-[#5D5FEF] underline">Privacy Policy</a>{" "}
        to learn how we protect your data.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const CollabbrAuth: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("welcome");

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#5D5FEF] via-[#6366F1] to-[#4a4cd6]"
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Large faint text bottom right */}
        <span
          className="absolute bottom-[-40px] right-[-20px] text-[130px] font-black tracking-tight select-none"
          style={{ color: "rgba(255,255,255,0.08)", fontFamily: "sans-serif", lineHeight: 1 }}
        >
          <img src="/collabbr-logo.png" alt="Collabbr Logo" className="max-w-[160px] md:max-w-[210px] " />
        </span>
        {/* Top-right blob */}
        <div
          className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
        {/* Bottom-left blob */}
        <div
          className="absolute bottom-[-60px] left-[-60px] w-52 h-52 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        {/* Mid right blob */}
        <div
          className="absolute top-[40%] right-[-40px] w-32 h-32 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[640px] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex border border-white/20 backdrop-blur-sm"
        style={{ minHeight: 420 }}
      >
        {/* Left panel */}
        <LeftPanel />

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center overflow-y-auto">
          {screen === "welcome" && (
            <WelcomeScreen
              onHireInfluencer={() => setScreen("signin")}
              onBecomeInfluencer={() => setScreen("signin")}
              onSignIn={() => setScreen("signin")}
            />
          )}
          {screen === "signin" && (
            <SignInScreen
              onBack={() => setScreen("welcome")}
              onEmailSignIn={() => setScreen("email-signin")}
            />
          )}
          {screen === "email-signin" && (
            <EmailSignInScreen onBack={() => setScreen("signin")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CollabbrAuth;