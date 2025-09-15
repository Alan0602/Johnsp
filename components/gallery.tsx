"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

const categories = ["All", "Branding", "Digital", "Print", "Campaign"]

const projects = [
  {
    id: 1,
    title: "Urban Skatewear Brand",
    category: "Branding",
    image: "/urban-skateboard-brand.png",
    description:
      "Complete brand identity for an emerging skatewear company, including logo design, packaging, and brand guidelines.",
    details:
      "This project involved creating a bold, street-inspired identity that resonates with the skateboarding community while maintaining commercial appeal.",
  },
  {
    id: 2,
    title: "Tech Startup Website",
    category: "Digital",
    image: "/modern-tech-website.png",
    description:
      "Responsive website design for a fintech startup, focusing on user experience and conversion optimization.",
    details: "Designed a clean, trustworthy interface that simplifies complex financial concepts for everyday users.",
  },
  {
    id: 3,
    title: "Music Festival Campaign",
    category: "Campaign",
    image: "/vibrant-music-festival-poster.png",
    description:
      "Comprehensive visual campaign for a major music festival, including posters, digital assets, and merchandise.",
    details: "Created an energetic visual system that captured the festival's diverse lineup and urban culture.",
  },
  {
    id: 4,
    title: "Luxury Magazine Layout",
    category: "Print",
    image: "/luxury-magazine-layout.png",
    description: "Editorial design for a high-end lifestyle magazine, emphasizing typography and visual hierarchy.",
    details: "Developed a sophisticated layout system that balances readability with visual impact.",
  },
  {
    id: 5,
    title: "E-commerce Platform",
    category: "Digital",
    image: "/ecommerce-product-showcase.png",
    description:
      "User interface design for a premium e-commerce platform specializing in streetwear and lifestyle products.",
    details: "Created an immersive shopping experience that reflects the brand's urban aesthetic.",
  },
  {
    id: 6,
    title: "Coffee Brand Identity",
    category: "Branding",
    image: "/artisanal-coffee-packaging.png",
    description: "Brand identity and packaging design for an artisanal coffee roastery with focus on sustainability.",
    details: "Developed a warm, approachable identity that communicates quality and environmental consciousness.",
  },
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated selection of projects that showcase the intersection of creativity and strategy.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-accent font-medium mb-2">{project.category}</div>
                  <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">{selectedProject?.title}</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={800}
                  height={384}
                  className="w-full h-96 object-cover rounded-lg"
                  priority
                />
                <div className="space-y-4">
                  <div className="text-sm text-accent font-medium">{selectedProject.category}</div>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.details}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
