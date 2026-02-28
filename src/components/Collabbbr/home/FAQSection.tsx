"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// FAQ ডাটা অবজেক্ট
const faqData = [
  {
    question: "What is Collabbr?",
    answer: "Collabbr is an AI-powered influencer collaboration hub that connects brands and creators for seamless, secure, and data-driven marketing campaigns."
  },
  {
    question: "How does escrow payment work?",
    answer: "When a business creates a campaign, the payment is deposited into escrow. Funds are released to the influencer only after the deliverables are submitted and approved, ensuring safety for both parties."
  },
  {
    question: "Can I create a campaign with multiple influencers?",
    answer: "Yes, our platform allows you to manage multi-influencer campaigns simultaneously, tracking each creator's performance and deliverables in one centralized dashboard."
  },
  {
    question: "When does an influencer get paid?",
    answer: "Influencers receive payment once the business approves the final deliverables. The funds are then automatically transferred from escrow to the influencer's account."
  },
  {
    question: "Do badges require a subscription?",
    answer: "While basic features are free, certain specialized trust badges and advanced analytics features may require a professional subscription plan."
  }
];

const FAQSection: React.FC = () => {
  // কোন প্রশ্নটি খোলা থাকবে তা ট্রাক করার জন্য স্টেট
  const [openIndex, setOpenIndex] = useState<number | null>(1); // ডিফল্টভাবে ২য় প্রশ্নটি (index 1) খোলা থাকবে ইমেজের মতো

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F4F7FF] px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg">
            Have any thoughts? Look here
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-medium ${openIndex === index ? 'text-[#2D3142]' : 'text-gray-600'}`}>
                  {item.question}
                </span>
                {openIndex === index ? (
                  <Minus className="text-gray-400" size={24} />
                ) : (
                  <Plus className="text-gray-400" size={24} />
                )}
              </button>

              {/* Expandable Answer */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;