"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Briefcase, Building2 } from "lucide-react"

export function Experience() {
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

  const experiences = [
    {
      title: "AI & Software Developer",
      company: "Harobanx Industries Pvt Ltd — Atomic Energy Pakistan",
      location: "Islamabad, Pakistan",
      period: "Mar 2026 – Jun 2026",
      description:
        "Built and deployed production AI systems for defense technology operations, including web platforms and on-premise RAG chatbots.",
      achievements: [
        "Built and deployed the company's official website using Next.js, React, and Tailwind CSS with modern UI/UX for defense technology showcase",
        "Deployed an on-premise RAG chatbot using LangChain, self-hosted LLMs, and FAISS to automate support queries offline",
        "Ensured zero data exposure for sensitive defense operations through fully offline infrastructure",
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "LangChain", "FAISS", "Self-hosted LLMs"],
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Machine Learning Engineer",
      company: "Omdena — AI Innovation Challenge: CropLogic",
      location: "USA (Remote)",
      period: "Sep 2025 – Nov 2025",
      description:
        "Collaborated with a global team on AI-driven agricultural crop-intelligence solutions.",
      achievements: [
        "Collaborated with 40+ data scientists across 20+ countries to build predictive models for crop intelligence",
        "Executed data preprocessing and feature engineering in Python for agricultural datasets",
        "Worked via Git in an Agile, cross-functional environment to iterate on model performance",
      ],
      technologies: ["Python", "Scikit-learn", "Pandas", "Git", "Agile"],
      gradient: "from-violet-500 to-purple-500",
    },
    {
      title: "Machine Learning Intern",
      company: "Digital Empowerment Network",
      location: "Islamabad, Pakistan",
      period: "Sep 2024 – Oct 2024",
      description:
        "Trained and fine-tuned supervised ML models, achieving high accuracy through systematic feature engineering.",
      achievements: [
        "Trained and fine-tuned supervised ML models (TensorFlow, Scikit-learn), achieving up to 93% accuracy",
        "Built data preprocessing pipelines using Python and Pandas for data quality assurance",
        "Validated datasets with cross-functional teams via feature engineering and hyperparameter tuning",
      ],
      technologies: ["TensorFlow", "Scikit-learn", "Python", "Pandas"],
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Professional <span className="text-gradient">Journey</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From ML internships to deploying production AI systems for defense organizations
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-violet-500/40 to-emerald-500/40 hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 -translate-x-1/2 hidden md:flex">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.gradient} shadow-lg shadow-primary/20 ring-4 ring-background`} />
                  </div>

                  {/* Card */}
                  <div className="md:ml-20 glass-card rounded-xl p-6 md:p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-gradient-static transition-all duration-300">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-primary">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2.5 mb-5">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.gradient} mt-1.5 flex-shrink-0`} />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
