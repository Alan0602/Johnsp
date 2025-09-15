"use client"

import { motion, Variants } from "framer-motion"

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

export function AnimatedText() {
  return (
    <motion.div
      className="relative max-w-full sm:max-w-lg md:max-w-2xl text-left z-10 px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1
        className="font-heading font-bold uppercase drop-shadow-sm"
        style={{
          fontSize: "clamp(2.5rem, 10vw, 5rem)",
          lineHeight: "1.1",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-white rounded-tl-[2rem] sm:rounded-tl-[3rem] rounded-br-[2rem] sm:rounded-br-[3rem] -rotate-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            variants={itemVariants}
            className="relative text-gray-800 p-2 sm:p-3"
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
  )
}
