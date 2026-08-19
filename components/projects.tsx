"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
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

  const projects = [
    {
      title: "Saamay AI",
      subtitle: "Quran Memorization Assistant",
      tag: "Final Year Project",
      description:
        "Designed an end-to-end speech recognition system for Quran memorization. Fine-tuned speech-to-text (STT) models and deployed real-time, low-latency inference on Hugging Face and AWS.",
      image: "/saamay-ai.jpg",
      technologies: ["Hugging Face", "AWS", "Speech-to-Text", "Python", "Fine-tuning", "Deep Learning"],
      highlights: [
        "End-to-end speech recognition pipeline",
        "Real-time, low-latency STT inference",
        "Deployed on Hugging Face & AWS",
      ],
      gradient: "from-cyan-500 to-blue-500",
      github: "https://github.com/SajjadKhanYousafzai",
    },
    {
      title: "RAG Medical Chatbot",
      subtitle: "LLM / Generative AI Application",
      tag: "GenAI Project",
      description:
        "Built a Retrieval-Augmented Generation (RAG) system using LangChain and FAISS for medical Q&A, improving response accuracy via semantic search over curated datasets.",
      image: "/medical-chatbot.jpg",
      technologies: ["LangChain", "FAISS", "RAG", "Python", "Semantic Search", "LLM"],
      highlights: [
        "Semantic search over curated medical datasets",
        "Improved response accuracy with RAG pipeline",
        "Context-aware multi-turn conversations",
      ],
      gradient: "from-violet-500 to-purple-500",
      github: "https://github.com/SajjadKhanYousafzai",
    },
    {
      title: "Sign Language Detection",
      subtitle: "Computer Vision System",
      tag: "CV Project",
      description:
        "Developed a real-time ASL recognition system using CNNs, OpenCV, and MediaPipe achieving ~90% classification accuracy, integrated into a cross-platform Flutter mobile app for on-device inference.",
      image: "/sign-language.jpg",
      technologies: ["CNNs", "OpenCV", "MediaPipe", "Flutter", "TensorFlow", "Python"],
      highlights: [
        "~90% real-time classification accuracy",
        "Cross-platform Flutter mobile app",
        "On-device inference capability",
      ],
      gradient: "from-emerald-500 to-teal-500",
      github: "https://github.com/SajjadKhanYousafzai",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-world AI systems — from speech recognition to medical chatbots to computer vision
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-700 ease-out group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${hoveredProject === index ? "shadow-2xl shadow-primary/10" : ""}`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className={`relative h-64 md:h-auto overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.subtitle}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-background/20" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 text-xs px-3 py-1`}>
                        {project.tag}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1 group-hover:text-gradient-static transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">{project.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                          {h}
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium glass-card text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group/btn"
                        asChild
                      >
                        <Link href={project.github} target="_blank">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                          <ArrowUpRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
