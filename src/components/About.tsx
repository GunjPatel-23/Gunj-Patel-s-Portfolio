import React, { useEffect, useRef, useState } from 'react';
import { Code, Users, Target, Award } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Passionate about clean code, modern frameworks, and scalable architecture"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Leadership",
      description: "Experienced in leading development teams and managing complex projects"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Problem Solving",
      description: "Strategic thinking to turn complex challenges into innovative solutions"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Committed to staying updated with latest technologies and industry trends"
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get to know the person behind the code
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                My Journey in Technology
              </h3>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  As a B.Tech IT student and tech entrepreneur, I've developed a deep passion for creating innovative 
                  software solutions that make a real difference. I'm the Founder of AstraSoft Innovations – a tech startup 
                  focused on scalable, AI-powered software solutions that address real-world challenges.
                </p>
                
                <p>
                  As Founder & Chairperson of TECHFORGE Society, MBIT – a student-led tech community, I foster 
                  innovation, leadership, and collaboration among aspiring technologists. Through various projects 
                  and leadership roles, I've gained hands-on experience in full-stack development, team management, 
                  and agile methodologies.
                </p>
                
                <p>
                  I believe in the power of clean code, collaborative development, and continuous learning. 
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or mentoring fellow students through TECHFORGE Society.
                </p>
              </div>

              {/* Personal Interests */}
              <div className="pt-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Beyond Development
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Entrepreneurship', 'AI/ML', 'Startup Leadership', 'Tech Communities', 'Open Source', 'Innovation'].map((interest) => (
                    <span 
                      key={interest}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className={`p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    {highlight.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            {[
              { number: '10+', label: 'Projects Completed' },
              { number: '3+', label: 'Years Learning' },
              { number: '5+', label: 'Technologies' },
              { number: '100%', label: 'Commitment' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;