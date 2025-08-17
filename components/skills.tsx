"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const skillCategories = [
    // Data Science Skills
    {
      title: "Programming Languages",
      category: "data-science",
      skills: [
        { name: "Python", level: 95 },
        { name: "R", level: 88 },
        { name: "SQL", level: 92 },
        { name: "Dart", level: 78 },
        { name: "C++/Java", level: 72 },
      ],
    },
    {
      title: "Statistical Analysis",
      category: "data-science",
      skills: [
        { name: "Hypothesis Testing", level: 93 },
        { name: "A/B Testing", level: 91 },
        { name: "Time Series", level: 89 },
        { name: "Bayesian Analysis", level: 85 },
        { name: "Regression Models", level: 95 },
      ],
    },
    {
      title: "Data Engineering",
      category: "data-science",
      skills: [
        { name: "Pandas", level: 96 },
        { name: "NumPy", level: 94 },
        { name: "Apache Spark", level: 82 },
        { name: "Airflow", level: 80 },
        { name: "PostgreSQL", level: 90 },
      ],
    },
    // AI Engineering Skills
    {
      title: "AI & Machine Learning",
      category: "ai-engineering",
      skills: [
        { name: "TensorFlow", level: 92 },
        { name: "PyTorch", level: 88 },
        { name: "Scikit-learn", level: 94 },
        { name: "Hugging Face", level: 90 },
        { name: "LangChain", level: 85 },
      ],
    },
    {
      title: "NLP & Text Processing",
      category: "ai-engineering",
      skills: [
        { name: "NLTK", level: 90 },
        { name: "spaCy", level: 88 },
        { name: "Transformers", level: 92 },
        { name: "OpenAI API", level: 94 },
        { name: "Text Analytics", level: 89 },
      ],
    },
    {
      title: "Computer Vision",
      category: "ai-engineering",
      skills: [
        { name: "OpenCV", level: 87 },
        { name: "YOLO", level: 82 },
        { name: "CNN Models", level: 85 },
        { name: "Image Processing", level: 88 },
        { name: "Object Detection", level: 83 },
      ],
    },
    // Shared/MLOps Skills
    {
      title: "Data Visualization",
      category: "shared",
      skills: [
        { name: "Matplotlib", level: 90 },
        { name: "Plotly", level: 92 },
        { name: "Tableau", level: 85 },
        { name: "Seaborn", level: 88 },
        { name: "Power BI", level: 80 },
      ],
    },
    {
      title: "MLOps & Deployment",
      category: "shared",
      skills: [
        { name: "Docker", level: 85 },
        { name: "AWS", level: 87 },
        { name: "MLflow", level: 82 },
        { name: "Kubernetes", level: 78 },
        { name: "FastAPI", level: 90 },
      ],
    },
    {
      title: "AI Engineering Systems",
      category: "ai-engineering",
      skills: [
        { name: "RAG Systems", level: 91 },
        { name: "Chatbot Development", level: 93 },
        { name: "Agentic AI", level: 87 },
        { name: "Vector Databases", level: 85 },
        { name: "Prompt Engineering", level: 92 },
      ],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // Animate progress bars with staggered timing
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              setTimeout(
                () => {
                  let current = 0
                  const increment = skill.level / 60
                  const timer = setInterval(() => {
                    current += increment
                    if (current >= skill.level) {
                      current = skill.level
                      clearInterval(timer)
                    }
                    setAnimatedValues((prev) => ({
                      ...prev,
                      [skill.name]: current,
                    }))
                  }, 25)
                },
                categoryIndex * 200 + skillIndex * 100,
              )
            })
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 px-6 bg-background dark:bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Technical Skills</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full transition-all duration-500 hover:w-32" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive skill set spanning both Data Science and AI Engineering domains
            </p>

            {/* Legend */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Data Science</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">AI Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">MLOps & Shared</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className={`border-0 bg-background dark:bg-card shadow-sm hover:shadow-lg dark:hover:shadow-primary/10 transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${hoveredCategory === index ? "scale-105 shadow-xl dark:shadow-primary/20" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-foreground transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2 group">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {Math.round(animatedValues[skill.name] || 0)}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={animatedValues[skill.name] || 0}
                          className="h-2 bg-muted dark:bg-muted/50 transition-all duration-300 group-hover:h-3"
                        />
                        <div
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out group-hover:h-3"
                          style={{
                            width: `${animatedValues[skill.name] || 0}%`,
                            transitionDelay: `${index * 100 + skillIndex * 50}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
