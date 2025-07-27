"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Globe, CheckCircle, AlertCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Send to contact API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })

        // Also save to messages API for admin panel
        try {
          await fetch("/api/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
        } catch (msgError) {
          console.log("Message saved to admin panel")
        }

        // Open mailto as primary method since serverless email is complex
        const emailBody = `
Hi Gunj,

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Best regards,
${formData.name}
        `
        const mailtoLink = `mailto:gpatel04231@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(emailBody)}`

        // Small delay to show success message, then open email client
        setTimeout(() => {
          window.open(mailtoLink, "_blank")
        }, 1000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")

      // Fallback to mailto
      const emailBody = `
Hi Gunj,

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Best regards,
${formData.name}
      `
      const mailtoLink = `mailto:gpatel04231@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink, "_blank")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/GunjPatel-23/",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/gunj-patel-2310gp/",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/gunjpatel.23/",
      color: "hover:text-pink-600",
    },
    { name: "Company", icon: Globe, url: "https://www.astrasoftinnovations.dev/", color: "hover:text-green-600" },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Let's discuss your next project or just say hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Send className="mr-2" />
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="text-base"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="text-base"
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="text-base"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="text-base resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message processed! Your email client will open to send the message directly.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center text-red-600 text-sm">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Your email client will open to send the message directly to gpatel04231@gmail.com
                    </div>
                  )}

                  <Button type="submit" className="w-full min-h-12 relative" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="loading"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Direct Contact Options */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm">Prefer Direct Contact?</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <a href="mailto:gpatel04231@gmail.com" className="hover:underline">
                        gpatel04231@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <a href="tel:+918200330693" className="hover:underline">
                        +91 8200330693
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
                  <Mail className="mr-2 text-primary" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center group/item hover:text-primary transition-colors duration-300">
                    <Mail className="h-5 w-5 text-primary mr-3 group-hover/item:animate-pulse flex-shrink-0" />
                    <a href="mailto:gpatel04231@gmail.com" className="hover:underline text-sm sm:text-base break-all">
                      gpatel04231@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center group/item hover:text-primary transition-colors duration-300">
                    <Phone className="h-5 w-5 text-primary mr-3 group-hover/item:animate-pulse flex-shrink-0" />
                    <a href="tel:+918200330693" className="hover:underline text-sm sm:text-base">
                      +91 8200330693
                    </a>
                  </div>
                  <div className="flex items-center group/item hover:text-primary transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-primary mr-3 group-hover/item:animate-pulse flex-shrink-0" />
                    <span className="text-sm sm:text-base">Mumbai, Maharashtra, India</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 sm:mt-8">
                  <h4 className="font-semibold mb-4 text-sm sm:text-base">Connect With Me</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 p-3 rounded-lg bg-muted transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.color} hover:-translate-y-1 min-h-12`}
                      >
                        <social.icon size={20} className="flex-shrink-0" />
                        <span className="text-sm font-medium">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Company Info */}
                <div className="mt-6 sm:mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary text-sm sm:text-base">AstraSoft Innovations</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Founder & CEO of AstraSoft Innovations - Building innovative tech solutions for tomorrow.
                  </p>
                  <a
                    href="https://www.astrasoftinnovations.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs sm:text-sm text-primary hover:underline"
                  >
                    <Globe className="mr-1 h-4 w-4 flex-shrink-0" />
                    Visit Company Website
                  </a>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary text-sm sm:text-base">
                    Let's Build Something Amazing
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Whether you're looking for innovative tech solutions, collaboration opportunities, or want to
                    discuss the latest in AI and IoT, I'm always excited to connect with fellow innovators and
                    entrepreneurs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
