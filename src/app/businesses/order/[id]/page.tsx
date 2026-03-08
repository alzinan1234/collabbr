"use client";
import React, { useState } from 'react';
import { Check, Copy, ChevronUp, MapPin, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderDetails = () => {
  const [currentStep, setCurrentStep] = useState(0); 
  const steps = ["Pending", "Confirmed", "In Progress", "Delivered", "Accepted"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-10 font-sans">
      <div className="max-w-[1440px] mx-auto p-4 md:p-8 lg:p-10">
        
        {/* Navigation & Header - Responsive Flex */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <nav className="text-xs md:text-sm text-gray-400 flex items-center gap-2 mb-5">
              <button onClick={handleBack} className="hover:text-[#5D5FEF] transition-colors flex items-center gap-1">
                <ChevronLeft size={16} /> Back
              </button>
              <span>/</span>
              <span className="hidden sm:inline">Dashboard / Orders /</span>
              <span className="text-gray-600 font-medium">Details</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b]">Order Details</h1>
          </div>
          
          {/* Mobile visible Step indicator (Optional, for better UX) */}
          <div className="md:hidden bg-[#5D5FEF]/10 px-3 py-1 rounded-full w-fit">
            <span className="text-[#5D5FEF] text-xs font-bold">Step {currentStep + 1} of 5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Side: Progress & Timeline */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Stepper Card - Horizontal on Desktop, Scrollable/Scaled on Mobile */}
            <div className="bg-white p-5 md:p-8 rounded-[16px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-bold text-[#1e293b] text-sm md:text-base">Order Progress</h3>
                <button className="flex items-center gap-1 text-[#5D5FEF] text-xs md:text-sm font-medium">
                  History <ChevronUp size={16} />
                </button>
              </div>

              {/* Stepper Container - Handles overflow on very small screens */}
              <div className="relative flex justify-between items-center px-2 md:px-4 min-w-[300px]">
                <div className="absolute top-3 left-0 w-full px-8 md:px-10 h-0 border-t-2 border-dashed border-gray-100 -z-0" />
                
                <motion.div 
                  className="absolute top-3 left-0 px-8 md:px-10 h-0 border-t-2 border-[#5D5FEF] -z-0 transition-all duration-500"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      idx <= currentStep ? 'bg-[#5D5FEF] border-[#5D5FEF] scale-110 shadow-md' : 'bg-white border-gray-200'
                    }`}>
                      {idx <= currentStep ? (
                        <Check size={12} className="text-white" />
                      ) : (
                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                      )}
                    </div>
                    {/* Hide labels on extra small screens if they overlap, or use smaller text */}
                    <span className={`text-[10px] md:text-[11px] lg:text-[12px] font-semibold text-center max-w-[60px] md:max-w-none ${idx <= currentStep ? 'text-[#5D5FEF]' : 'text-gray-400'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white p-6 md:p-8 rounded-[16px] border border-gray-100 shadow-sm min-h-[300px]">
               <div className="space-y-6 md:space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-50">
                  {currentStep >= 0 && <TimelineItem title="You got an invitation to @glow_more844" time="24 Oct 2025, 07:54 PM" />}
                  {currentStep >= 1 && <TimelineItem title="Order has been confirmed & paid" time="24 Oct 2025, 08:10 PM" />}
                  {currentStep >= 2 && <TimelineItem title="Order has been started" time="24 Oct 2025, 08:15 PM" />}
                  {currentStep >= 3 && <TimelineItem title="You delivered the order" time="25 Oct 2025, 10:30 AM" />}
                  {currentStep >= 4 && <TimelineItem title="Delivery has been accepted" time="26 Oct 2025, 11:00 AM" />}
               </div>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 md:p-6 rounded-[16px] border border-gray-100 shadow-sm sticky lg:top-8">
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" 
                className="w-full h-40 md:h-48 object-cover rounded-[12px] mb-4" 
                alt="campaign" 
              />
              <h4 className="font-bold text-[#1e293b] text-lg">Summer Glow Launch</h4>
              <button className="text-[#5D5FEF] text-[11px] font-bold bg-[#5D5FEF]/5 px-3 py-1.5 rounded-lg mt-2 hover:bg-[#5D5FEF]/10 transition-all">View Details</button>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-400 text-xs md:text-sm mb-4">Time left to deliver</p>
                {currentStep < 2 ? (
                   <div className="bg-gray-50 p-4 rounded-xl text-center mb-4 text-gray-400 text-xs border border-dashed border-gray-200">
                     Delivery timeline will appear here
                   </div>
                ) : currentStep === 4 ? (
                  <div className="bg-green-50 p-4 rounded-xl text-center text-green-600 text-sm font-bold border border-green-100">
                    Order Completed
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 md:p-4 rounded-xl mb-6">
                    <TimerBlock value="09" label="D" />
                    <TimerBlock value="04" label="H" />
                    <TimerBlock value="23" label="M" />
                    <TimerBlock value="27" label="S" />
                  </div>
                )}

                <div className="space-y-3">
                  {currentStep === 0 && <ActionButton onClick={handleNext} label="Interested to work" />}
                  {currentStep === 1 && <ActionButton onClick={handleNext} label="Start Work" variant="outline" />}
                  {currentStep === 2 && <ActionButton onClick={handleNext} label="Deliver Now" />}
                  {currentStep === 3 && (
                    <div className="p-4 bg-amber-50 rounded-xl text-amber-600 text-center text-xs font-bold border border-amber-100 animate-pulse">
                      Waiting for approval...
                    </div>
                  )}
                  {currentStep < 3 && (
                    <button className="w-full text-[#EF4444] font-bold text-xs pt-2 hover:underline">Not interested</button>
                  )}
                </div>
              </div>

              {/* Order Info Rows */}
              <div className="mt-6 space-y-3 md:space-y-4 text-xs md:text-sm">
                <InfoRow label="Create date" value="28 Aug 2025" />
                <InfoRow label="Delivery date" value="04 Sep 2025" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Order ID</span>
                  <div className="flex items-center gap-1 font-bold text-[#1e293b]">
                    8765GF...47 <Copy size={12} className="text-gray-300 cursor-pointer" />
                  </div>
                </div>
                <div className="flex justify-end pt-2 border-t border-gray-50 mt-2">
                  <span className="text-xl md:text-2xl font-black text-[#5D5FEF]">$250</span>
                </div>
              </div>

              {/* Influencer Mobile Responsive */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-400 text-[11px] mb-3 uppercase tracking-wider font-semibold">Assigned Influencer</p>
                <div className="flex items-center justify-between gap-2">
                   <div className="flex items-center gap-2 md:gap-3">
                      <img src="https://i.pravatar.cc/150?u=1" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 shadow-sm" alt="Sara" />
                      <div className="overflow-hidden">
                        <p className="font-bold text-[#1e293b] text-xs md:text-sm truncate">Sara Afrin</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin size={10}/> Dhaka</p>
                      </div>
                   </div>
                   <button className="shrink-0 text-[#5D5FEF] text-[10px] font-bold bg-[#5D5FEF]/5 px-2 py-1 rounded-md hover:bg-indigo-100">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components (Keep same for reusability) ---
const TimelineItem = ({ title, time }: { title: string; time: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 items-start relative z-10 bg-white group">
    <div className="w-6 h-6 shrink-0 bg-[#5D5FEF] rounded-full flex items-center justify-center mt-1 ring-4 ring-indigo-50 shadow-md">
      <Check size={12} className="text-white" />
    </div>
    <div className="pb-2">
      <p className="text-[13px] md:text-[14px] font-bold text-[#1e293b] leading-tight">{title}</p>
      <p className="text-[11px] text-gray-400 mt-1">{time}</p>
    </div>
  </motion.div>
);

const TimerBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-[#5D5FEF] font-bold text-base md:text-lg leading-none">{value}</p>
    <p className="text-[9px] text-gray-400 mt-1 font-medium">{label}</p>
  </div>
);

const ActionButton = ({ onClick, label, variant = 'solid' }: any) => (
  <button onClick={onClick} className={`w-full py-3 md:py-4 rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${
    variant === 'solid' ? 'bg-[#5D5FEF] text-white hover:bg-[#4b4dc7] shadow-lg shadow-indigo-100' : 'bg-indigo-50 text-[#5D5FEF] hover:bg-indigo-100'
  }`}>
    {label}
  </button>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 text-xs md:text-sm">{label}</span>
    <span className="font-bold text-[#1e293b] text-xs md:text-sm">{value}</span>
  </div>
);

export default OrderDetails;