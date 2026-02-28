import AnalyticsSection from "@/components/Collabbbr/home/AnalyticsSection";
import CTASection from "@/components/Collabbbr/home/CTASection";
import FAQSection from "@/components/Collabbbr/home/FAQSection";
import GrowAndEarn from "@/components/Collabbbr/home/GrowAndEarn";
import HeroSection from "@/components/Collabbbr/home/HeroSection";
import HowItWorks from "@/components/Collabbbr/home/HowItWorks";
import PerfectMatch from "@/components/Collabbbr/home/PerfectMatch";
import ReviewDiaries from "@/components/Collabbbr/home/ReviewDiaries";


export default function Home() {
  return (
    <div className=" bg-white">
       <HeroSection />
       <HowItWorks />
       <AnalyticsSection />
       <GrowAndEarn />
       <PerfectMatch />
       <ReviewDiaries />
       <FAQSection />
       <CTASection  />
    </div>
  );
}
