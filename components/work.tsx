'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import data from '@/app/data.json'

interface Project {
  id: string
  title: string
  category: string
  tagline?: string
  imageUrl: string
  client?: string
  details?: {
    overview: string
    myRole?: string[]
    challenge?: string
    solution?: string
    designThinking?: string
    execution?: string[]
    keyFeatures?: string[]
    impact?: string
    lookingAhead?: string
    approach?: string
    videoUrl?: string
    galleryImages?: string[]
  }
}

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = data.projects

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(project => project.category)))
    return ['All', ...uniqueCategories]
  }, [projects])

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter(project => project.category === selectedCategory)
  }, [projects, selectedCategory])

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            My Work
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            A collection of creative projects spanning branding, campaigns, illustrations, and digital experiences.
          </p>
          <Link href="/gallery">
            <Button 
              variant="outline" 
              className="group flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300"
            >
              <ExternalLink size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              View Gallery
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="transition-all duration-300 hover:scale-105"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground mb-2">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {project.title}
                        </h3>
                        {project.tagline && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            {project.tagline}
                          </p>
                        )}
                        {project.client && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Client: {project.client}
                          </p>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </DialogTrigger>
                
                {/* Project Detail Modal */}
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Main Project Image */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    </div>

                    {/* Project Details */}
                    {project.details && (
                      <div className="space-y-6">
                        {/* Overview */}
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Overview</h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {project.details.overview}
                          </p>
                        </div>

                        {/* My Role */}
                        {project.details.myRole && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3">My Role</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.details.myRole.map((role, idx) => (
                                <span key={idx} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Challenge */}
                        {project.details.challenge && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3">Challenge</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {project.details.challenge}
                            </p>
                          </div>
                        )}

                        {/* Solution */}
                        {project.details.solution && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3">Solution</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {project.details.solution}
                            </p>
                          </div>
                        )}

                        {/* Gallery Images */}
                        {project.details.galleryImages && project.details.galleryImages.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3">Gallery</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {project.details.galleryImages.map((image, idx) => (
                                <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                  <Image
                                    src={image}
                                    alt={`${project.title} gallery ${idx + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Video */}
                        {project.details.videoUrl && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3">Video</h4>
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                              <iframe
                                src={project.details.videoUrl.replace('watch?v=', 'embed/')}
                                title={`${project.title} video`}
                                className="w-full h-full"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No projects found in this category.
          </p>
        </motion.div>
      )}
    </section>
  )
}

export default Work