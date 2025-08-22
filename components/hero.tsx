"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/skateboarding-action.png" alt="Skateboarding background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-slide-in">
        <h1 className="font-heading font-bold text-5xl md:text-7xl mb-6">Johnson Varghese</h1>
        <p className="text-xl md:text-2xl mb-4 font-medium">Senior Art Director</p>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Skate the Edge, Create the Impact</p>
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg"
          onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
        >
          View My Work
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
