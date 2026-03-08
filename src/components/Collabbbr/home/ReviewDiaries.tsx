"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    text: "“I now spend less time on admin and more time creating. The direct communication feature is amazing.”",
    name: "Sarah Jenkins",
    role: "Lifestyle Creator, UK",
    image: "https://randomuser.me/api/portraits/women/44.jpg" // আপনার ইমেজের পাথ দিন
  },
  {
    id: 2,
    text: "“Finding the right influencers used to take weeks. Now it takes minutes with their smart matching system.”",
    name: "Mark Thompson",
    role: "Marketing Manager, USA",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    text: "“The escrow system gives me peace of mind. I know I'll get paid for my hard work on time.”",
    name: "Elena Rodriguez",
    role: "Fashion Blogger, Spain",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const ReviewDiaries: React.FC = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Text Content */}
          <div className="lg:w-1/2">
            <p className=" text-2xl md:text-[40px]  font-bold text-[#2D3142] leading-tight mb-6">
              Review Diaries, Stories from Real Collaborations
            </p>
            <p className="text-gray-500  max-w-xl">
              Discover honest experiences and detailed feedback from businesses and influencers. 
              Reviews help build transparency, improve collaboration quality, and allow everyone 
              to make confident, informed decisions before working together.
            </p>
          </div>

          {/* Right Side: Swiper Slider */}
          <div className="lg:w-1/2 w-full">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="testimonial-swiper pb-16"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white p-10 md:p-10 rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
                    <p className="text-[#5E6282]   italic leading-relaxed mb-10">
                      {item.text}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#6366F1]/20">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg  text-[#2D3142]">{item.name}</h4>
                        <p className="text-gray-500 text-sm font-medium">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Pagination Style Customization */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #E2E8F0;
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #6366F1 !important;
          width: 24px;
          border-radius: 6px;
        }
        .testimonial-swiper .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default ReviewDiaries;