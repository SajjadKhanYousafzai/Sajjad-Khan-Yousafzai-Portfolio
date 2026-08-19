"use client"

import { useState, useEffect, useRef } from "react"
import { GraduationCap, CalendarDays, MapPin, BookOpen, Award, Sparkles, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Education() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const coursework = [
    "Artificial Intelligence",
    "Machine Learning & Deep Learning",
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Object-Oriented Software Engineering",
    "Distributed Systems & Cloud",
    "Natural Language Processing",
    "Computer Vision Fundamentals",
  ]

  const highlights = [
    "Rigorous curriculum covering software design patterns, enterprise system architecture, and algorithmic complexity",
    "Specialized coursework in AI algorithms, neural network architectures, and distributed systems",
    "Active participant in technical workshops, data science challenges, and collaborative engineering projects",
  ]

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Academic <span className="text-gradient">Foundation</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Formal education in Software Engineering with an intensive focus on Artificial Intelligence and intelligent systems.
            </p>
          </div>

          {/* Large Project-Style Education Showcase Card */}
          <div
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-primary/10 border border-border/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
          >
            <div className="grid lg:grid-cols-12 gap-0">
              {/* Left Column: University & Degree Hero Panel */}
              <div className="lg:col-span-5 p-8 md:p-10 bg-gradient-to-br from-cyan-500/10 via-primary/5 to-violet-500/10 border-b lg:border-b-0 lg:border-r border-border/50 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-3 py-1 text-xs">
                      Undergraduate Degree
                    </Badge>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 leading-snug">
                    Bachelor of Science in Software Engineering
                  </h3>
                  <p className="text-base font-semibold text-primary mb-6">
                    COMSATS University Islamabad (Wah Campus)
                  </p>

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2.5">
                      <CalendarDays className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <span>Sep 2022 – Jul 2026</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-violet-400 flex-shrink-0" />
                      <span>Wah Cantt, Islamabad, Pakistan</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Award className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>Major: Software Engineering & AI Track</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/40">
                  <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/40">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                      Academic Focus
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      AI Engineering, Machine Learning Systems, Scalable Software Architecture
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Highlights & Coursework */}
              <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-8">
                {/* Academic Highlights */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-heading font-bold text-lg text-foreground">
                      Key Academic Highlights
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Coursework & Competencies */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-violet-400" />
                    <h4 className="font-heading font-bold text-lg text-foreground">
                      Core Coursework & Competencies
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((course, index) => (
                      <span
                        key={index}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-medium glass-card text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
