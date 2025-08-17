"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Bot, Brain, Database, Eye, TrendingUp } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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

  const dataScience = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500 transition-transform duration-300" />,
      title: "Statistical Analysis & Modeling",
      description:
        "Advanced statistical modeling, hypothesis testing, A/B testing, experimental design, and Bayesian analysis for extracting meaningful insights from complex datasets and driving data-driven decision making.",
      color: "blue",
    },
    {
      icon: <Database className="h-8 w-8 text-blue-500 transition-transform duration-300" />,
      title: "Data Engineering & Architecture",
      description:
        "Building robust ETL pipelines, data warehousing solutions, big data processing with Apache Spark, database optimization, and scalable data infrastructure for enterprise-level analytics.",
      color: "blue",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500 transition-transform duration-300" />,
      title: "Predictive Analytics & Forecasting",
      description:
        "Time series forecasting, regression modeling, ensemble methods, and advanced machine learning algorithms for business intelligence, demand forecasting, and predictive maintenance.",
      color: "blue",
    },
  ]

  const aiEngineering = [
    {
      icon: <Bot className="h-8 w-8 text-purple-500 transition-transform duration-300" />,
      title: "Conversational AI & Chatbots",
      description:
        "Developing intelligent chatbots with natural language understanding, context awareness, multi-turn conversations, intent recognition, and seamless integration with business systems and APIs.",
      color: "purple",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500 transition-transform duration-300" />,
      title: "RAG Systems & Agentic AI",
      description:
        "Building Retrieval-Augmented Generation systems with vector databases, autonomous AI agents with reasoning capabilities, tool integration, and decision-making frameworks for complex workflows.",
      color: "purple",
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-500 transition-transform duration-300" />,
      title: "Computer Vision & NLP Solutions",
      description:
        "Real-time object detection, image classification, OCR systems, sentiment analysis, text processing, named entity recognition, and multi-modal AI applications for intelligent automation.",
      color: "purple",
    },
  ]

  const stats = [
    { number: "2+", label: "Years Experience", color: "text-primary" },
    { number: "25+", label: "DS + AI Projects", color: "text-blue-500" },
    { number: "15+", label: "AI Systems Built", color: "text-purple-500" },
    { number: "94%", label: "Avg Model Accuracy", color: "text-green-500" },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
      {/* Subtle background animation - theme aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 dark:from-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Dual Expertise</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full transition-all duration-500 hover:w-32" />
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              I bring together the analytical rigor of <strong className="text-blue-500">Data Science</strong> with the
              innovation of
              <strong className="text-purple-500"> AI Engineering</strong>. From extracting insights from complex
              datasets to building intelligent systems that can understand, reason, and interact - I deliver end-to-end
              solutions that transform businesses.
            </p>
          </div>

          {/* Animated Stats - theme aware */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ease-out hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 hover:scale-110 ${stat.color}`}
                >
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Data Science Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-foreground">Data Science Expertise</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {dataScience.map((item, index) => (
                <Card
                  key={index}
                  className={`border-0 bg-background dark:bg-card shadow-sm hover:shadow-lg dark:hover:shadow-primary/10 transition-all duration-500 ease-out cursor-pointer ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${hoveredCard === index ? "scale-105 shadow-xl dark:shadow-primary/20" : ""}`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg transition-all duration-300 ${
                          hoveredCard === index ? "bg-blue-500/20 dark:bg-blue-500/30 scale-110" : ""
                        }`}
                      >
                        <div
                          className={`transition-transform duration-300 ${
                            hoveredCard === index ? "scale-110 rotate-3" : ""
                          }`}
                        >
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-foreground transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Engineering Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-foreground">AI Engineering Expertise</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {aiEngineering.map((item, index) => (
                <Card
                  key={index}
                  className={`border-0 bg-background dark:bg-card shadow-sm hover:shadow-lg dark:hover:shadow-primary/10 transition-all duration-500 ease-out cursor-pointer ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${hoveredCard === (index + 3) ? "scale-105 shadow-xl dark:shadow-primary/20" : ""}`}
                  style={{ transitionDelay: `${700 + index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index + 3)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg transition-all duration-300 ${
                          hoveredCard === (index + 3) ? "bg-purple-500/20 dark:bg-purple-500/30 scale-110" : ""
                        }`}
                      >
                        <div
                          className={`transition-transform duration-300 ${
                            hoveredCard === (index + 3) ? "scale-110 rotate-3" : ""
                          }`}
                        >
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-foreground transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
