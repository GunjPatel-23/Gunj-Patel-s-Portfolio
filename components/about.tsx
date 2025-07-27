"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Code, Database, Brain, Award, GraduationCap, Heart, Music, Car, Users } from "lucide-react"
import { CounterAnimation } from "@/components/counter-animation"
import { MdSportsCricket } from "react-icons/md"

export function About() {
  const skills = [
    { name: "JavaScript/TypeScript", level: 95, icon: Code },
    { name: "React/Next.js", level: 90, icon: Code },
    { name: "Node.js/Express", level: 85, icon: Database },
    { name: "Python/AI/ML", level: 88, icon: Brain },
    { name: "IoT/Hardware", level: 82, icon: Brain },
    { name: "Database Systems", level: 80, icon: Database },
  ]

  const achievements = [
    { number: 10, label: "Projects Completed", icon: Code },
    { number: 3, label: "Years Experience", icon: Award },
    { number: 8, label: "Technologies Mastered", icon: Brain },
    { number: 100, label: "Happy Clients", icon: Users },
  ]

  const leadership = [
    "Founder of AstraSoft Innovations",
    "Founder & Chairperson of TechForge Society, MBIT",
    "National-level hackathon leadership",
    "AI project innovation",
    "RFID-based security systems",
    "Tech community building",
  ]

  const hobbies = [
    { name: "Cricket", icon: MdSportsCricket },
    { name: "Traveling", icon: Car },
    { name: "Singing & Music", icon: Music },
    { name: "Tech Blogging", icon: Code },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Passionate about creating innovative solutions and pushing the boundaries of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="h-full group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary via-purple-500 to-secondary rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center text-2xl sm:text-4xl font-bold text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  GP
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Gunj Patel</h3>
                <div className="space-y-2 mb-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs sm:text-sm">
                    Founder, AstraSoft Innovations
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0 text-xs sm:text-sm">
                    Founder & Chairperson, TechForge Society
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">Full-Stack Developer & Tech Leader</p>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  Passionate innovator and tech leader with expertise in AI, IoT, and web technologies. Founder of
                  AstraSoft Innovations and Chairperson of TechForge Society at MBIT, driving impactful tech solutions
                  and building vibrant tech communities.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary">Leadership & Innovation</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {leadership.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="h-full">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
                  <Code className="mr-2" />
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs sm:text-sm font-medium flex items-center">
                          <skill.icon size={14} className="mr-2" />
                          {skill.name}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education & Hobbies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">B.Tech Information Technology</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Madhuben & Bhanubhai Patel Institute of Technology (MBIT) CVM University • 2022-2026</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">S.Sc & H.Sc. GSEB</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">BAPS Swaminarayan Vidhyamandir • 2020-2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                  <Heart className="mr-2" />
                  Hobbies & Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby) => (
                    <Badge key={hobby.name} variant="secondary" className="flex items-center text-xs">
                      <hobby.icon size={12} className="mr-1" />
                      {hobby.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <Card key={achievement.label} className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <achievement.icon className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 sm:mb-4 text-primary" />
                  <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                    <CounterAnimation end={achievement.number} />
                    {achievement.label === "Happy Clients" && "%"}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{achievement.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
