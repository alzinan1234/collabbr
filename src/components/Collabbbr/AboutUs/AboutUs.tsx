import React from 'react';

// Use standard unplash image link, can replace with actual image links
const aboutImage = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop";
const missionImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop";
const visionImage = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop";


const AboutUs: React.FC = () => {
    const valueItems = [
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.477 5 20.268 7.943 21.542 12C20.268 16.057 16.477 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            label: 'Transparency',
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M12 3L4 5V11C4 16.55 7.38 21.74 12 23C16.62 21.74 20 16.55 20 11V5L12 3Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            label: 'Trust & Security',
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17M13 13L16 16M16 16L19 13M16 16V10M10 13L7 10M7 10L4 13M7 10V16" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 16L16 6M7 16V13" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            label: 'Data-Driven Growth',
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9M10 9H14M10 9C8.89543 9 8 9.89543 8 11V15C8 16.1046 8.89543 17 10 17H14C15.1046 17 16 16.1046 16 15V11C16 9.89543 15.1046 9 14 9ZM10 17H14M10 17V21M14 17V21" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 13.5V11C18 9.89543 17.1046 9 16 9M6 13.5V11C6 9.89543 6.89543 9 8 9" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 13.5V15C18 16.1046 17.1046 17 16 17M6 13.5V15C6 16.1046 6.89543 17 8 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            label: 'Long-Term Partnerships',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Banner - Using the background color of the first block from image */}
            <header className="bg-indigo-50 py-24 px-6 md:px-12 pt-30 md:pt-34 md:pb-20 font-sans">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-left">
                        <h1 className="text-4xl font-bold text-gray-950 mb-6">About Us</h1>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                            Collabbr is a trusted collaboration platform that helps businesses launch high-impact influencer campaigns while ensuring creators get paid securely and on time.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img 
                            src={aboutImage} 
                            alt="Team working together" 
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    </div>
                </div>
            </header>

            {/* Mission Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <img 
                            src={missionImage} 
                            alt="Group meeting in conference room" 
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <h2 className="text-4xl font-bold text-gray-950 mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Our mission is to build a transparent and trustworthy creator economy where every collaboration is fair, measurable, and secure. We aim to remove uncertainty from influencer marketing by combining technology, analytics, and trust-based systems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="flex-1">
                        <img 
                            src={visionImage}  
                            alt="Team collaborating with laptops" 
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <h2 className="text-4xl font-bold text-gray-950 mb-6">Our Vision</h2>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Our vision is to create the most trusted collaboration ecosystem where businesses and influencers grow together through transparency, fairness, and data-driven decisions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-6 md:px-12 text-center">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-950 mb-16">Our Values</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {valueItems.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="p-4 bg-indigo-100 rounded-full mb-6">
                                    {item.icon}
                                </div>
                                <p className="text-lg font-medium text-[#334155] leading-tight">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;