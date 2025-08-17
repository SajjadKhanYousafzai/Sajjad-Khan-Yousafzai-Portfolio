"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [filter, setFilter] = useState<"all" | "data-science" | "ai-engineering">("all")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    // Data Science Projects
    {
      title: "Customer Churn Prediction Model",
      description:
        "Built a machine learning model to predict customer churn with 94% accuracy using ensemble methods and comprehensive feature engineering.",
  image: "/Customer Churn Prediction Model.png",
      technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib"],
      impact: "Reduced customer churn by 23% and increased revenue by $2.3M annually",
      category: "data-science",
      type: "Data Science",
    },
    {
      title: "Sales Forecasting Dashboard",
      description:
        "Interactive dashboard for sales forecasting using time series analysis and ARIMA models with real-time data integration.",
      image: "/Sales Forecasting Dashboard.png",
      technologies: ["R", "Shiny", "Prophet", "ggplot2", "PostgreSQL"],
      impact: "Improved forecast accuracy by 15% and reduced planning time by 40%",
      category: "data-science",
      type: "Data Science",
    },
    {
      title: "A/B Testing Platform",
      description:
        "Statistical platform for designing and analyzing A/B tests with automated significance testing and reporting.",
      image: "/AB Testing Platform.png",
      technologies: ["Python", "Streamlit", "SciPy", "PostgreSQL", "Docker"],
      impact: "Reduced experiment analysis time by 50% across 20+ teams",
      category: "data-science",
      type: "Data Science",
    },
    // AI Engineering Projects
    {
      title: "Intelligent RAG Chatbot",
      description:
        "Built an advanced RAG system with document retrieval, context-aware responses, and multi-turn conversations using LangChain and vector databases.",
      image: "/Intelligent RAG Chatbot.png",
      technologies: ["Python", "LangChain", "OpenAI", "ChromaDB", "Streamlit"],
      impact: "Achieved 95% accuracy in document-based Q&A with 3x faster response time",
      category: "ai-engineering",
      type: "AI Engineering",
    },
    {
      title: "Computer Vision Object Detector",
      description:
        "Developed a real-time object detection system using YOLO and OpenCV for automated inventory management and quality control.",
      image: "/Computer Vision Object Detector.png",
      technologies: ["Python", "YOLO", "OpenCV", "TensorFlow", "Flask"],
      impact: "Improved detection accuracy to 92% with real-time processing at 30 FPS",
      category: "ai-engineering",
      type: "AI Engineering",
    },
    {
      title: "Agentic AI Assistant",
      description:
        "Created an autonomous AI agent capable of reasoning, planning, and executing tasks across multiple domains with tool integration.",
      image: "/Agentic AI Assistant.png",
      technologies: ["Python", "LangChain", "OpenAI", "AutoGPT", "FastAPI"],
      impact: "Automated 80% of routine tasks with intelligent decision-making",
      category: "ai-engineering",
      type: "AI Engineering",
    },
    {
      title: "NLP Sentiment Analysis Engine",
      description:
        "Built a comprehensive sentiment analysis system for social media monitoring with real-time processing and emotion detection.",
      image: "/NLP Sentiment Analysis Engine.png",
      technologies: ["Python", "NLTK", "Transformers", "spaCy", "MongoDB"],
      impact: "Processed 1M+ texts with 94% sentiment classification accuracy",
      category: "ai-engineering",
      type: "AI Engineering",
    },
    {
      title: "Multi-Modal AI Chatbot",
      description:
        "Developed an advanced chatbot supporting text, voice, and image inputs with context understanding and personalized responses.",
      image: "/Multi-Modal AI Chatbot.png",
      technologies: ["Python", "Whisper", "GPT-4V", "LangChain", "React"],
      impact: "Increased user engagement by 150% with multi-modal interactions",
      category: "ai-engineering",
      type: "AI Engineering",
    },
    {
      title: "AI-Powered Document Analyzer",
      description:
        "Created an intelligent document processing system for automated extraction, classification, and insights generation from various document types.",
      image: "/AI-Powered Document Analyzer.png",
      technologies: ["Python", "OCR", "NLP", "PyPDF2", "Hugging Face"],
      impact: "Reduced document processing time by 90% with 98% accuracy",
      category: "ai-engineering",
      type: "AI Engineering",
    },
  ]

  const filteredProjects = projects.filter((project) => filter === "all" || project.category === filter)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-6 bg-muted/30 dark:bg-muted/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 dark:from-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full transition-all duration-500 hover:w-32" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive portfolio showcasing both Data Science analytics and AI Engineering solutions
            </p>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="transition-all duration-300"
              >
                All Projects ({projects.length})
              </Button>
              <Button
                variant={filter === "data-science" ? "default" : "outline"}
                onClick={() => setFilter("data-science")}
                className="transition-all duration-300 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Data Science ({projects.filter((p) => p.category === "data-science").length})
              </Button>
              <Button
                variant={filter === "ai-engineering" ? "default" : "outline"}
                onClick={() => setFilter("ai-engineering")}
                className="transition-all duration-300 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
              >
                AI Engineering ({projects.filter((p) => p.category === "ai-engineering").length})
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className={`border-0 bg-background dark:bg-card shadow-sm hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-500 ease-out overflow-hidden group cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${hoveredProject === index ? "scale-105 shadow-2xl dark:shadow-primary/30" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - ${project.description}`}
                    fill
                    className={`object-cover transition-all duration-700 ease-out ${
                      hoveredProject === index ? "scale-110" : "scale-100"
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(project.title)}`
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-background/80 dark:from-background/90 to-transparent transition-opacity duration-300 ${
                      hoveredProject === index ? "opacity-90" : "opacity-60"
                    }`}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {project.type}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-foreground transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-muted dark:bg-muted/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="p-3 bg-muted/50 dark:bg-muted/20 rounded-lg transition-all duration-300 group-hover:bg-primary/5 dark:group-hover:bg-primary/10">
                    <p className="text-sm text-muted-foreground font-medium">Impact:</p>
                    <p className="text-sm text-foreground">{project.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
