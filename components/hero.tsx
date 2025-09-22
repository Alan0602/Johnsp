"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"

//================================================================================
// MAIN COMPONENT: Hero
//================================================================================
export function Hero() {
  // State for mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // State for the new typewriter text effect
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const fullText = "SKATE THE EDGE"
  const typingSpeed = 150
  const cursorBlinkSpeed = 530
  const initialAnimationFinishTime = .1 // Laser scan (1.5s) + small buffer

  // Effect for mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  
  // Effect for the typewriter animation
  useEffect(() => {
    // Start typing only after the initial laser scan/wipe animations are done
    const startTypingTimeout = setTimeout(() => {
      if (currentIndex < fullText.length) {
        const typingTimeout = setTimeout(() => {
          setDisplayedText(prev => prev + fullText[currentIndex])
          setCurrentIndex(prev => prev + 1)
        }, typingSpeed)
        return () => clearTimeout(typingTimeout)
      }
    }, initialAnimationFinishTime * 1000) // Convert seconds to milliseconds

    return () => clearTimeout(startTypingTimeout)
  }, [currentIndex, fullText])
  
  // Effect for the blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, cursorBlinkSpeed)
    return () => clearInterval(interval)
  }, [])

  // Calculate delays based on typing animation duration
  const typingDuration = fullText.length * (typingSpeed / 1000)
  const subheadlineDelay = initialAnimationFinishTime + typingDuration + 0.5
  const roleDelay = subheadlineDelay + 0.7
  const underlineDelay = roleDelay + 0.6

  // Scroll parallax effect
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 1. Kept: Initial Scan Laser */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-cyan-400/70 z-50"
        style={{ boxShadow: '0 0 15px 5px #06b6d4' }}
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
      />
      
      {/* 2. Kept: Background Video with Pan and Wipe Reveal */}
      <motion.div 
        className="absolute inset-0 h-full w-full"
        initial={{ clipPath: 'inset(0 100% 0 0)'}}
        animate={{ clipPath: 'inset(0 0 0 0)'}}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <motion.video
          autoPlay loop muted playsInline
          className="h-full w-full object-cover"
          poster="/skate-poster.jpg"
          initial={{ scale: 1.15, x: "2%"}}
          animate={{ x: "-2%" }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <source src="/skate2.mp4" type="video/mp4" />
        </motion.video>
      </motion.div>

      {/* 3. Kept: Overlays and Interactive Mouse Distortion */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`}}/>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.8) 30%)`, mixBlendMode: 'multiply' }}/>

      {/* 4. New: Typewriter Text Content with Gradient Styling and Layout */}
      <motion.div 
        className="relative z-10 flex min-h-screen w-full items-center justify-center px-4"
        style={{ y, opacity }}
      >
        <motion.div
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          className="text-center space-y-8 max-w-6xl mx-auto"
        >
          {/* SKATE THE EDGE - Typewriter Effect */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: initialAnimationFinishTime }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight"
            style={{ minHeight: '1.2em' }} // Prevents layout shift during typing
          >
            {displayedText}
            <motion.span
              animate={{ opacity: showCursor && currentIndex === fullText.length ? [0, 1, 0] : 1 }}
              transition={{ duration: cursorBlinkSpeed / 1000, repeat: Infinity }}
              className="inline-block w-1 h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-purple-400 to-blue-400 ml-2 align-top"
              style={{ marginTop: '0.1em' }}
            />
          </motion.h1>

          {/* CREATE THE IMPACT */}
          <motion.h2
            className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: subheadlineDelay }}
          >
            CREATE THE IMPACT
          </motion.h2>

          {/* Senior Art Director + Underline */}
          <div className="inline-block relative">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: roleDelay, duration: 0.8 }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-white/80 tracking-wide"
            >
              Senior Art Director
            </motion.p>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: underlineDelay }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}