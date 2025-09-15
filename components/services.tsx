"use client"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    title: "Brand Identity",
    description:
      "Creating distinctive visual identities that capture the essence of your brand and resonate with your audience.",
    icon: "🎨",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Digital Design",
    description:
      "Crafting engaging digital experiences across web, mobile, and interactive platforms with user-centered design.",
    icon: "💻",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Creative Direction",
    description:
      "Leading creative campaigns from concept to execution, ensuring cohesive visual storytelling across all touchpoints.",
    icon: "🎬",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Print Design",
    description:
      "Designing impactful print materials that bridge the gap between digital and physical brand experiences.",
    icon: "📄",
    color: "from-orange-500 to-red-500"
  },
]

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary">Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive creative solutions that blend strategic thinking with innovative design to elevate your brand.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
