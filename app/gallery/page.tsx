"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import galleryData from "../gallery.json"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

interface GalleryRow {
  id: string
  direction: "left" | "right"
  images: GalleryImage[]
}

const MarqueeRow = ({ row, index }: { row: GalleryRow; index: number }) => {
  const [isPaused, setIsPaused] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const duplicatedImages = [...row.images, ...row.images, ...row.images]

  return (
    <>
      <div 
        className="relative overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={{
            x: row.direction === "left" 
              ? isPaused ? 0 : ["-33.333%", "0%"]
              : isPaused ? 0 : ["0%", "-33.333%"]
          }}
          transition={{
            duration: isPaused ? 0 : 30,
            ease: "linear",
            repeat: isPaused ? 0 : Infinity,
          }}
          style={{
            width: "300%"
          }}
        >
          {duplicatedImages.map((image, imgIndex) => (
            <motion.div
              key={`${image.id}-${imgIndex}`}
              className="relative flex-shrink-0 cursor-pointer group"
              style={{ width: "calc(100% / 18)" }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-auto">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white text-lg font-semibold mb-1">{selectedImage.alt}</h3>
              <span className="text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
                {selectedImage.category}
              </span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Gallery...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                {galleryData.gallery.title}
              </h1>
              <p className="text-white/80 text-lg">
                {galleryData.gallery.description}
              </p>
            </div>
            
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Gallery Rows */}
      <div className="space-y-8 pb-16">
        {galleryData.gallery.rows.map((row, index) => (
          <MarqueeRow key={row.id} row={row as GalleryRow} index={index} />
        ))}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/80 text-sm">
          Hover to pause • Click to view
        </div>
      </div>
    </div>
  )
}