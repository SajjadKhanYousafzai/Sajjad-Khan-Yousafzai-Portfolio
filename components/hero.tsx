"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-background">
      {/* Subtle animated background elements - theme aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-primary/20 dark:from-primary/5 dark:to-primary/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-primary/8 to-primary/15 dark:from-primary/3 dark:to-primary/8 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            right: "10%",
            bottom: "20%",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div
              className={`space-y-4 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p
                className="text-primary font-medium text-lg transition-all duration-700 ease-out"
                style={{ transitionDelay: "200ms" }}
              >
                Data Scientist • AI Engineer • ML Specialist
              </p>
              <h1
                className="text-4xl md:text-6xl font-bold text-foreground leading-tight transition-all duration-700 ease-out"
                style={{ transitionDelay: "400ms" }}
              >
                Bridging Data Science
                <span className="text-primary block hover:scale-105 transition-transform duration-300 origin-left">
                  & AI Engineering
                </span>
              </h1>
              <p
                className="text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 ease-out"
                style={{ transitionDelay: "600ms" }}
              >
                Full-stack data professional combining{" "}
                <strong className="text-foreground">statistical analysis & machine learning</strong> with
                <strong className="text-foreground"> AI engineering expertise</strong>. From data insights to
                intelligent systems - chatbots, RAG, computer vision, and scalable ML solutions.
              </p>
            </div>

            {/* Dual Expertise Badges */}
            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">📊 Data Science</span>
              </div>
              <div className="px-4 py-2 bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 rounded-full">
                <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">🤖 AI Engineering</span>
              </div>
              <div className="px-4 py-2 bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 rounded-full">
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">⚡ MLOps</span>
              </div>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-primary/25"
                asChild
              >
                <Link href="#projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/10 bg-background border-border hover:border-primary/50"
                asChild
              >
              <Link href="/Sajjad%20Ali%20Shah%20Professional%20CV.pdf" target="_blank">
                  <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                  Download Resume
                </Link>
              </Button>
            </div>

            <div
              className={`flex space-x-6 pt-4 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              {[
                { icon: Github, href: "https://github.com/SajjadKhanYousafzai", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/sajjad-ali-shah-120341305", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sajjadkhanyousafzai47@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }, index) => (
                <Link
                  key={label}
                  href={href}
                  className="p-3 rounded-full bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/60 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-primary/10"
                  aria-label={label}
                  style={{ transitionDelay: `${1200 + index * 100}ms` }}
                >
                  <Icon className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Professional Photo */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="relative group">
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl dark:group-hover:shadow-primary/20">
                  <Image
                    src="/profile pic.png"
                    alt="Sajjad Ali Shah - Data Scientist & AI Engineer"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              {/* Subtle accent with animation - theme aware */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-2xl -z-10 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/15 dark:group-hover:bg-primary/25" />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/5 dark:bg-primary/10 rounded-2xl -z-10 transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/10 dark:group-hover:bg-primary/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
