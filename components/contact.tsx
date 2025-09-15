"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Dribbble, Palette, ExternalLink } from "lucide-react"
import data from "@/app/data.json"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const { personalInfo } = data

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }
  
  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    // { name: "Dribbble", icon: Dribbble, href: "#", color: "hover:text-pink-400" },
    // { name: "Behance", icon: Palette, href: "#", color: "hover:text-blue-500" },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Let's Roll Together
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to create something amazing? Whether it's a bold campaign, a fresh brand identity, or a digital experience that turns heads – let's drop in and make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Drop Me a Line
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Tell me about your project and let's create something that makes an impact.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 border-2 focus:border-purple-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project... What's your vision? What impact do you want to create?"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="border-2 focus:border-purple-500 transition-colors resize-none"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Personal Info Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-800/30 dark:hover:to-purple-800/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-semibold text-gray-800 dark:text-white break-all">{personalInfo.email}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 hover:from-green-100 hover:to-blue-100 dark:hover:from-green-800/30 dark:hover:to-blue-800/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{personalInfo.phone}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{personalInfo.location}</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                  Follow My Journey
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-transparent bg-white dark:bg-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300 group ${social.color}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">{social.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            
            {/* Call to Action */}
            <motion.div 
              className="p-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-lg font-bold mb-2">Ready to Skate the Edge?</h4>
              <p className="text-sm opacity-90">
                Let's create something that makes an impact and turns heads.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
