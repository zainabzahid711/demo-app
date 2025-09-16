// components/layout/HeroSection.tsx
import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="flex-1 bg-[#001439] relative overflow-hidden min-h-screen">
      {/* Support Button (commented out) */}
      {/* <div className="absolute top-6 right-6 z-10">
        <button className="flex items-center px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/20 transition-colors">
          <div className="w-3 h-3 bg-white/50 rounded-full mr-2"></div>
          Support
        </button>
      </div> */}

      {/* Main Content - Centered text and image */}

      <div className="flex flex-col justify-center items-center text-center px-12 z-10 h-full pt-24 gap-12 lg:pt-0">
        {/* Doctor Card - Now positioned below text */}
        <div className="mt-4">
          <Image
            src="/PlatformNeed.png"
            alt="need"
            width={535}
            height={555}
            className="object-contain"
          />
        </div>
        {/* Text Content */}
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          Everything You Need in
          <br />
          One Platform
        </h2>

        <p className="text-blue-100/80 text-sm lg:text-base max-w-md leading-relaxed mb-8">
          Unlock the full potential of Healentra with complete access to
          advanced medical services, personalized health tools, secure patient
          records, smart scheduling, and seamless consultations—all in one
          place.*
        </p>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroSection;
