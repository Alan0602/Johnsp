// src/app/page.tsx
"use client"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Hobbies } from "@/components/hobbies"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <Hero />

      {/* Sections with responsive spacing */}
      <div className="relative z-10">
        <About />
        <Services />
        <Gallery />
        <Hobbies />
        <Contact />
      </div>
    </main>
  )
}