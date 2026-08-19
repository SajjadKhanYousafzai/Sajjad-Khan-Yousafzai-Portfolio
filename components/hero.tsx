"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const TYPING_TITLES = [
  "AI Engineer",
  "Data Scientist",
  "ML Specialist",
  "LLM/RAG Developer",
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const current = TYPING_TITLES[titleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length)
        }
      }
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Ultra-Clean, Lightweight Neural Constellation Canvas Animation
  const animationRef = useRef<number>()
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false })

  interface MinimalNeuron {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    alpha: number
    isCyan: boolean
  }

  const neuronsRef = useRef<MinimalNeuron[]>([])

  const initNeurons = useCallback((canvas: HTMLCanvasElement) => {
    // Keep node count small and elegant (~28 to 36 nodes) for zero visual clutter
    const count = 32
    neuronsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.5 + 1.2,
      alpha: Math.random() * 0.3 + 0.25,
      isCyan: Math.random() > 0.45,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mousePosRef.current.active = false
    }

    window.addEventListener("mousemove", handleCanvasMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initNeurons(canvas)
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const neurons = neuronsRef.current
      const mouse = mousePosRef.current
      const maxDistance = 140

      // 1. Update Positions
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        n.x += n.vx
        n.y += n.vy

        // Wrap around smoothly
        if (n.x < -10) n.x = w + 10
        if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10
        if (n.y > h + 10) n.y = -10
      }

      // 2. Draw Subtle Synaptic Connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const n1 = neurons[i]
          const n2 = neurons[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.1

            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y)
            grad.addColorStop(0, `rgba(6, 182, 212, ${alpha})`)
            grad.addColorStop(1, `rgba(139, 92, 246, ${alpha})`)

            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      // 3. Connect subtly to mouse if nearby
      if (mouse.active) {
        for (let i = 0; i < neurons.length; i++) {
          const n = neurons[i]
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.22
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // 4. Render Neurons
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        const color = n.isCyan ? `rgba(6, 182, 212, ${n.alpha})` : `rgba(139, 92, 246, ${n.alpha})`

        // Faint glow halo
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = n.isCyan ? "rgba(6, 182, 212, 0.08)" : "rgba(139, 92, 246, 0.08)"
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleCanvasMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [initNeurons])

  const techBadges = [
    { label: "Python", delay: "0s" },
    { label: "LangChain", delay: "0.5s" },
    { label: "TensorFlow", delay: "1s" },
    { label: "OpenCV", delay: "1.5s" },
    { label: "FastAPI", delay: "2s" },
    { label: "AWS", delay: "2.5s" },
  ]

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-background"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-full blur-[100px] transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            left: "5%",
            top: "10%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-violet-500/8 to-emerald-500/8 rounded-full blur-[100px] transition-transform duration-1000"
          style={{
            transform: `translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`,
            right: "5%",
            bottom: "15%",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div
              className={`space-y-6 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              {/* Subtitle with typewriter */}
              <div
                className="flex items-center gap-3 transition-all duration-700"
                style={{ transitionDelay: "200ms" }}
              >
                <span className="w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                  {displayText}
                  <span className="inline-block w-[2px] h-4 bg-primary ml-1 animate-pulse" />
                </span>
              </div>

              {/* Name */}
              <h1
                className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-[1.1] transition-all duration-700"
                style={{ transitionDelay: "400ms" }}
              >
                Sajjad Ali
                <span className="block text-gradient">Shah</span>
              </h1>

              {/* Summary */}
              <p
                className="text-lg text-muted-foreground leading-relaxed max-w-xl transition-all duration-700"
                style={{ transitionDelay: "600ms" }}
              >
                AI Engineer and Data Scientist designing and deploying{" "}
                <strong className="text-foreground">Machine Learning, NLP, Computer Vision</strong>, and{" "}
                <strong className="text-foreground">LLM/RAG solutions</strong> — building scalable,
                production-ready AI systems that turn complex data into actionable insights.
              </p>
            </div>

            {/* Tech badges */}
            <div
              className={`flex flex-wrap gap-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "700ms" }}
            >
              {techBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="px-3 py-1.5 text-xs font-medium rounded-full glass-card text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 cursor-default"
                >
                  {badge.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 border-0 group px-6"
                asChild
              >
                <Link href="#projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full hover:scale-[1.02] transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:bg-primary/5 group px-6"
                asChild
              >
                <a
                  href="./Sajjad%20Ali%20Shah%20CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Sajjad Ali Shah CV.pdf"
                >
                  <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div
              className={`flex items-center gap-4 pt-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "1000ms" }}
            >
              {[
                { icon: Github, href: "https://github.com/SajjadKhanYousafzai", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/sajjad-ali-shah-120341305", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sajjadkhanyousafzai47@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  className="p-3 rounded-full glass-card text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Photo - Circle format */}
          <div
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative group flex justify-center">
              {/* Glowing ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-2xl animate-pulse-ring" />
              </div>

              {/* Photo container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 p-[3px] animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-background" />
                </div>
                <div className="absolute inset-[6px] rounded-full overflow-hidden">
                  <Image
                    src="/profile pic.png"
                    alt="Sajjad Ali Shah — AI Engineer & Data Scientist"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Floating accent shapes */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 blur-sm animate-float" />
              <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-gradient-to-r from-violet-500/15 to-emerald-500/15 blur-sm animate-float-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
