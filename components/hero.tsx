"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterText } from "@/components/typewriter-text"

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto text-center relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className="gradient-text block sm:inline">Gunj Patel</span>
          </motion.h1>

          <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground h-12 sm:h-16">
            <TypewriterText texts={["Full-Stack Developer", "AI Enthusiast", "IoT Innovator", "Problem Solver"]} />
          </div>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate software developer with expertise in modern web technologies, artificial intelligence, and IoT
            solutions. I create innovative digital experiences that make a difference.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-500 hover:scale-105 hover:shadow-xl min-h-12"
              onClick={() => {
                // Create a dummy resume download
                const link = document.createElement("a")
                link.href = "/placeholder.svg?height=800&width=600&text=Gunj+Patel+Resume"
                link.download = "Gunj_Patel_Resume.pdf"
                link.click()
              }}
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">View Resume</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto group relative overflow-hidden bg-transparent hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-600/10 transition-all duration-500 hover:scale-105 hover:shadow-xl border-2 hover:border-primary min-h-12"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10">Contact Me</span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <ArrowDown className="h-6 w-6 animate-bounce text-muted-foreground" />
        </motion.div>
      </div>

      {/* Floating Elements - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-primary/10 rounded-full floating-animation"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-4 sm:right-20 w-10 sm:w-16 h-10 sm:h-16 bg-secondary/20 rounded-full floating-animation"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          className="absolute bottom-40 left-4 sm:left-20 w-8 sm:w-12 h-8 sm:h-12 bg-accent/30 rounded-full floating-animation"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ animationDelay: "4s" }}
        />
      </div>
    </section>
  )
}
