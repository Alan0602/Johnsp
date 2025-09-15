// src/app/page.tsx
"use client"
import { motion, useScroll, useSpring, Transition } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import Work from "@/components/work"
import { Hobbies } from "@/components/hobbies"
import { Contact } from "@/components/contact"
import { useEffect, useState } from "react"

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
}

// Scroll progress bar component
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.main 
      className="min-h-screen bg-white overflow-x-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ScrollProgress />
      <Navigation />
      <Hero />

      {/* Sections with enhanced animations */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <About />
        <Services />
        <Work />
        <Hobbies />
        <Contact />
      </motion.div>
    </motion.main>
  )
}