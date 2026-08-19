"use client"

import { useState, useEffect, useRef } from "react"
import { Award, ExternalLink, Sparkles, CheckCircle2, Trophy, BookMarked, Cpu, Brain, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Kaggle Icon Component
const KaggleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
  </svg>
)

export function Certifications() {
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

  const certifications = [
    {
      title: "AI Engineering",
      issuer: "IBM",
      platform: "Coursera",
      category: "AI & Deep Learning",
      icon: <Cpu className="h-5 w-5 text-white" />,
      gradient: "from-cyan-500 to-blue-500",
      skills: ["Deep Learning", "Computer Vision", "NLP", "Model Deployment", "PyTorch"],
    },
    {
      title: "IBM Data Science",
      issuer: "IBM",
      platform: "Coursera",
      category: "Data Science & Analytics",
      icon: <Layers className="h-5 w-5 text-white" />,
      gradient: "from-blue-500 to-indigo-500",
      skills: ["Data Analysis", "Python & SQL", "Predictive Modeling", "Statistical Analysis", "Data Pipelines"],
    },
    {
      title: "IBM Machine Learning",
      issuer: "IBM",
      platform: "Coursera",
      category: "Machine Learning",
      icon: <Brain className="h-5 w-5 text-white" />,
      gradient: "from-indigo-500 to-violet-500",
      skills: ["Supervised ML", "Unsupervised Learning", "Ensemble Methods", "Feature Engineering", "Time Series"],
    },
    {
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      platform: "Coursera",
      category: "Neural Architectures",
      icon: <Sparkles className="h-5 w-5 text-white" />,
      gradient: "from-violet-500 to-purple-500",
      skills: ["Neural Networks", "CNNs", "Sequence Models", "Hyperparameter Tuning", "Optimization"],
    },
    {
      title: "Generative AI for Data Scientists",
      issuer: "DeepLearning.AI",
      platform: "Coursera",
      category: "Generative AI & LLMs",
      icon: <Award className="h-5 w-5 text-white" />,
      gradient: "from-purple-500 to-pink-500",
      skills: ["Large Language Models", "Prompt Engineering", "RAG Systems", "Transformers", "Fine-tuning"],
    },
    {
      title: "ML Specialization",
      issuer: "Stanford / DeepLearning.AI",
      platform: "Coursera",
      category: "Core Algorithms",
      icon: <BookMarked className="h-5 w-5 text-white" />,
      gradient: "from-pink-500 to-rose-500",
      skills: ["Supervised Learning", "Advanced Algorithms", "Decision Trees", "Unsupervised Learning", "Recommender Systems"],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[130px]" />
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
              Certifications & <span className="text-gradient">Activities</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional credentials, recognized specializations, and competitive data science achievements
            </p>
          </div>

          {/* Featured Achievement: Kaggle Master Showcase Card */}
          <div
            className={`mb-12 glass-card rounded-2xl p-8 md:p-10 border border-border/60 relative overflow-hidden transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-cyan-500/10 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-violet-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/25 flex-shrink-0">
                  <KaggleIcon className="h-9 w-9 text-white" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/30 font-semibold px-3 py-1">
                      <Trophy className="h-3.5 w-3.5 mr-1.5 inline text-amber-400" />
                      Global Master Rank
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground border-border/60 text-xs">
                      2023 – Present
                    </Badge>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    Kaggle Notebooks Master
                  </h3>

                  <p className="text-primary font-medium text-sm">
                    Kaggle Data Science Community
                  </p>

                  <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed pt-1">
                    Recognized as a Notebooks Master on the premier global data science platform, creating open-source machine learning pipelines, exploratory analytics, and deep learning architectures for the international AI community.
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 lg:self-center">
                <Button
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/20 px-6 group"
                  asChild
                >
                  <Link href="https://www.kaggle.com/sajjadalishah" target="_blank">
                    View Kaggle Profile
                    <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`glass-card rounded-2xl p-7 border border-border/50 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] flex flex-col justify-between group cursor-default ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${250 + index * 80}ms` }}
              >
                <div>
                  {/* Top bar with icon and issuer */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${cert.gradient} shadow-md shadow-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      {cert.icon}
                    </div>
                    <Badge variant="outline" className="text-xs text-muted-foreground border-border/60 bg-background/40">
                      {cert.platform}
                    </Badge>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1.5 group-hover:text-gradient-static transition-all duration-300">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-semibold text-primary mb-4 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    {cert.issuer}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="pt-4 border-t border-border/40 mt-4">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2.5">
                    Key Competencies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/40 text-muted-foreground group-hover:text-foreground group-hover:bg-primary/10 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
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
