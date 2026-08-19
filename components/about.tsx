"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Brain, Database, Eye, TrendingUp, Cpu } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate stat counters
          stats.forEach((stat) => {
            const target = parseInt(stat.number)
            if (isNaN(target)) return
            let current = 0
            const increment = target / 40
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setAnimatedStats((prev) => ({ ...prev, [stat.label]: current }))
            }, 30)
          })
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const expertiseAreas = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Machine Learning & Deep Learning",
      description:
        "TensorFlow, Keras, PyTorch, Scikit-learn — CNNs, RNNs, LSTMs, Transformers for predictive modeling and intelligent systems.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Generative AI & LLMs",
      description:
        "Hugging Face, OpenAI API, LangChain — RAG systems, prompt engineering, LLM fine-tuning for intelligent conversational AI.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Science & Analytics",
      description:
        "Pandas, NumPy, ETL pipelines, Power BI, Tableau — transforming complex datasets into actionable business insights.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "NLP & Computer Vision",
      description:
        "NLTK, SpaCy, OpenCV, MediaPipe — real-time object detection, text processing, and multi-modal AI applications.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Backend & APIs",
      description:
        "FastAPI, Flask, REST APIs — building robust, production-grade backends for ML model serving and data pipelines.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Cloud, MLOps & Deployment",
      description:
        "AWS, Docker, Kubernetes, Git — scalable cloud infrastructure, CI/CD pipelines, and vector databases (Pinecone, FAISS, ChromaDB).",
      gradient: "from-amber-500 to-orange-500",
    },
  ]

  const stats = [
    { number: "1+", label: "Years Experience", suffix: "" },
    { number: "6", label: "Certifications", suffix: "+" },
    { number: "3", label: "Production Projects", suffix: "+" },
    { number: "93", label: "Model Accuracy", suffix: "%" },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              What I <span className="text-gradient">Bring</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI Engineer and Data Scientist with hands-on experience designing and deploying
              scalable AI systems — from intelligent chatbots and RAG pipelines to real-time
              computer vision applications.
            </p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center glass-card p-6 rounded-xl transition-all duration-700 ease-out hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-heading font-bold mb-2 text-gradient">
                  {stat.number === "1+"
                    ? "1+"
                    : `${Math.round(animatedStats[stat.label] || 0)}${stat.suffix}`}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Expertise Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((item, index) => (
              <div
                key={index}
                className={`glass-card p-6 rounded-xl transition-all duration-500 ease-out cursor-default group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${hoveredCard === index ? "scale-[1.03] shadow-xl shadow-primary/10" : ""}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${item.gradient} mb-4 transition-transform duration-300 ${
                    hoveredCard === index ? "scale-110 rotate-3" : ""
                  }`}
                >
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="text-lg font-heading font-semibold mb-3 text-foreground group-hover:text-gradient-static transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
