"use client"

import { motion, Variants } from "framer-motion"
import { AnimatedText } from "@/components/ui/animated-text"

// Animation for the main panel
const panelVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Video Panel (Full Screen Background) */}
      <div className="absolute inset-0 h-full w-full">
        <video
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
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedText />
      </motion.div>
    </section>
  )
}
