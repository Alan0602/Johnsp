// src/components/about.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaCamera, 
  FaPaintBrush, 
  FaLaptopCode, 
  FaSkating,
  FaPalette,
  FaDesktop,
  FaPhotoVideo,
  FaBrush,
  FaCode,
  FaTabletAlt,
  FaMobile,
  FaVectorSquare
} from "react-icons/fa";

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export function About() {
  const [isInView, setIsInView] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={aboutSectionRef} className="bg-white text-gray-800 py-16 sm:py-20 lg:py-24">
      <h2 className="  font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-4xl md:text-5xl text-center mb-8 mt-2">About Me</h2>
      <motion.div 
        className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left Panel: Text Content */}
        <div className="flex flex-col justify-center space-y-6">
          <motion.div className="flex items-center gap-4" variants={itemVariants}>
            <Image
              src="/Johns.png"
              alt="Johnson Varghese"
              width={80}
              height={80}
              className="rounded-full shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                Johnson Varghese
              </h2>
              <p className="text-base text-gray-600 sm:text-lg">Senior Art Director</p>
            </div>
          </motion.div>
<div className="h-8"></div>
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-3xl lg:text-4xl" 
            variants={itemVariants}
          >
            Skate the Edge, Create the Impact.
          </motion.h3>

          <motion.p 
            className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg" 
            variants={itemVariants}
          >
            Born in Kochi and now riding the creative streets of Bangalore, I treat every project like a fresh run—full of momentum, precision, and a willingness to take risks. My work blends bold storytelling with design impact to elevate brands and leave a lasting impression.
          </motion.p>

          {/* <motion.div variants={itemVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:text-sm">
              Trusted by leading brands
            </h4>
            <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-6">
              {["intel.svg", "wipro.svg", "acer.svg", "jabra.svg", "aws.svg"].map((logo) => (
                <Image
                  key={logo}
                  src={`/logos/${logo}`}
                  alt={logo.split('.')[0]}
                  width={80}
                  height={40}
                  className="h-6 w-auto object-contain transition-transform duration-300 hover:scale-110 sm:h-8"
                />
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* Right Panel: Video Display */}
        <motion.div 
          className="flex items-center justify-center" 
          variants={visualVariants}
        >
          <div className="relative h-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <Image
              src="/about-tab-display.png"
              alt="Display Frame"
              width={1000}
              height={800}
              className="h-full w-full"
            />
            <video
              src="/trail.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={(e) => {
                console.log('Video failed to load:', e);
                // Fallback to skate1.mp4 if trail.mp4 fails
                e.currentTarget.src = '/skate1.mp4';
              }}
              className="absolute left-1/2 top-1/2 h-[82%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg object-cover sm:h-[84%] sm:w-[92%] lg:h-[86%] lg:w-[94%]"
            >
              <source src="/trail.mp4" type="video/mp4" />
              <source src="/skate1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </motion.div>
      <div className="relative h-20 overflow-hidden">
        <div className="marquee absolute top-0 left-0 h-full w-full flex items-center justify-around">
          {[
            { icon: FaSkating, name: "Skateboarding" },
            { icon: FaCamera, name: "Photography" },
            { icon: FaPaintBrush, name: "Design" },
            { icon: FaLaptopCode, name: "Development" },
            { icon: FaPalette, name: "Art" },
            { icon: FaDesktop, name: "UI/UX" },
            { icon: FaPhotoVideo, name: "Media" },
            { icon: FaBrush, name: "Creative" },
            { icon: FaCode, name: "Coding" },
            { icon: FaTabletAlt, name: "Mobile" },
            { icon: FaMobile, name: "Apps" },
            { icon: FaVectorSquare, name: "Graphics" },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                className="mx-4 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <IconComponent
                  className="h-8 w-8 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                  title={item.name}
                />
              </motion.div>
            );
          })}
        </div>
        <style jsx>{`
          .marquee {
        animation: slide 20s linear infinite;
          }

          @keyframes slide {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-100%);
        }
          }
        `}</style>
      </div>
    </section>
  );
}