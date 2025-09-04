// src/components/hero.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"

// Parent container for staggering text
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 2,
    },
  },
}

// Animation for individual text lines
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Animation for the main panel sliding in
const panelVariants: Variants = {
  intro: { x: 0 }, 
  final: { 
    x: "-100%", 
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
  }
}

// Mobile-specific panel variants
const mobilePanelVariants: Variants = {
  intro: { y: 0 }, 
  final: { 
    y: "-100%", 
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
  }
}

// **NEW**: Animation for the decorative floating circle
const floatingCircleVariants: Variants = {
    initial: { scale: 0, y: 0 },
    animate: {
        scale: 1,
        y: [0, -15, 0], // Floats up and down by 15px
        transition: {
            delay: 1.8,
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
        }
    }
}

// **NEW**: Animation for the decorative drawing curve
const drawingCurveVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: {
            delay: 2,
            duration: 1.5,
            ease: "easeInOut",
        }
    }
}

// Deterministic star data to prevent hydration mismatch
const STATIC_STARS = [
  { id: 0, x: 15, y: 20, delay: 0.5, size: 8 },
  { id: 1, x: 75, y: 10, delay: 1.2, size: 6 },
  { id: 2, x: 25, y: 60, delay: 0.8, size: 10 },
  { id: 3, x: 85, y: 45, delay: 1.8, size: 7 },
  { id: 4, x: 45, y: 25, delay: 0.3, size: 9 },
  { id: 5, x: 65, y: 70, delay: 1.5, size: 5 },
  { id: 6, x: 10, y: 80, delay: 0.9, size: 8 },
  { id: 7, x: 90, y: 15, delay: 1.1, size: 6 },
  { id: 8, x: 35, y: 85, delay: 0.7, size: 9 },
  { id: 9, x: 55, y: 35, delay: 1.6, size: 7 },
];

export function Hero() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only running client-side code after mount
  useEffect(() => {
    setIsClient(true);
    
    const timer = setTimeout(() => {
      setIntroFinished(true)
    }, 1500);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Use CSS-only responsive design for initial render
  const shouldUseDesktopAnimation = !isClient || !isMobile;

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Video Panel (Full Screen Background) */}
      <div className="absolute inset-0 h-full w-full">
        <video
          key={introFinished ? '1' : '0'}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="/skate-poster.jpg" 
        >
          <source src="/skate1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Text Panel (Responsive Animation) */}
      <motion.div
        className="absolute top-0 right-0 flex h-full w-full items-center justify-center p-4 sm:p-6 lg:p-8 lg:w-1/2"
        variants={shouldUseDesktopAnimation ? panelVariants : mobilePanelVariants}
        initial="intro"
        animate={introFinished ? "final" : "intro"}
      >
        {/* Decorative elements - only render after client mount */}
        {isClient && (
          <>
            <motion.div 
                className="absolute top-[15%] left-[10%] h-12 w-12 sm:h-16 sm:w-16 lg:h-24 lg:w-24 bg-blue-500/10 rounded-full"
                variants={floatingCircleVariants}
                initial="initial"
                animate="animate"
            />
            <svg className="absolute bottom-0 left-0 w-full h-1/3 sm:h-1/2 text-purple-500/20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M -50,150 C 150,0 350,300 550,150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    variants={drawingCurveVariants}
                    initial="hidden"
                    animate={introFinished ? "visible" : "hidden"}
                />
            </svg>
          </>
        )}

        <motion.div
          className="relative max-w-xs sm:max-w-sm md:max-w-md text-left z-10 px-2 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          animate={introFinished ? "visible" : "hidden"}
        >
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase drop-shadow-sm">
            
            {/* Container for the "leaf" shape background - responsive */}
            <div className="relative">
              {isClient && (
                <motion.div 
                  className="absolute inset-0 bg-white rounded-tl-[2rem] sm:rounded-tl-[3rem] lg:rounded-tl-[4rem] rounded-br-[2rem] sm:rounded-br-[3rem] lg:rounded-br-[4rem] -rotate-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5,  }}
                />
              )}
              <motion.div 
                variants={itemVariants} 
                className="relative text-gray-800 p-2 sm:p-3 lg:p-4"
                style={!isClient ? { backgroundColor: 'white', borderRadius: '2rem 0 2rem 0' } : {}}
              >
                Skate the Edge,
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-1 sm:mt-2"
            >
              Create
            </motion.div>
            <motion.div variants={itemVariants} className="text-white">
              the Impact.
            </motion.div>
          </h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-white font-medium"
          >
            Senior Art Director
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}