"use client"

import { useEffect, useRef, useState } from "react"

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const skillCategories = [
    {
      title: "Languages",
      gradient: "from-cyan-500 to-blue-500",
      skills: ["Python", "SQL", "Dart", "TypeScript", "HTML", "CSS"],
    },
    {
      title: "ML & Deep Learning",
      gradient: "from-violet-500 to-purple-500",
      skills: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "CNNs", "RNNs", "LSTMs", "Transformers", "Predictive Modeling"],
    },
    {
      title: "Generative AI & LLMs",
      gradient: "from-pink-500 to-rose-500",
      skills: ["Hugging Face", "OpenAI API", "LangChain", "RAG", "Prompt Engineering", "LLM Fine-tuning"],
    },
    {
      title: "Data Science & Analytics",
      gradient: "from-emerald-500 to-teal-500",
      skills: ["Pandas", "NumPy", "ETL Pipelines", "Power BI", "Tableau"],
    },
    {
      title: "NLP & Computer Vision",
      gradient: "from-amber-500 to-orange-500",
      skills: ["NLTK", "SpaCy", "OpenCV", "MediaPipe", "Matplotlib"],
    },
    {
      title: "Backend & APIs",
      gradient: "from-blue-500 to-indigo-500",
      skills: ["FastAPI", "Flask", "REST APIs"],
    },
    {
      title: "Cloud, MLOps & DB",
      gradient: "from-teal-500 to-cyan-500",
      skills: ["AWS", "Docker", "Kubernetes", "Git", "MySQL", "Supabase", "Pinecone", "ChromaDB", "FAISS"],
    },
  ]

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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive toolkit spanning AI/ML, data engineering, and cloud-native deployment
            </p>
          </div>

          {/* Category Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {skillCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-primary/20"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].gradient}`}
                />
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {skillCategories[activeCategory].title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <span
                    key={`${activeCategory}-${skill}`}
                    className="px-5 py-2.5 rounded-full text-sm font-medium glass-card text-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default"
                    style={{
                      animation: `slide-in-bottom 0.4s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* All Skills Overview - Marquee */}
          <div
            className={`mt-12 overflow-hidden transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="flex animate-marquee whitespace-nowrap py-4">
                {[...skillCategories.flatMap((c) => c.skills), ...skillCategories.flatMap((c) => c.skills)].map(
                  (skill, i) => (
                    <span
                      key={i}
                      className="mx-3 px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground/60 border border-border/30"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
