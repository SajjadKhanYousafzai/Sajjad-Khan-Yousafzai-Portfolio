"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Detect active section
      const sections = ["about", "skills", "projects", "experience", "education", "certifications", "contact"]
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group relative inline-block text-xl font-heading font-bold text-gradient-static transition-all duration-300 py-1"
          >
            <span>Sajjad Ali Shah</span>
            {/* Calligraphic flourish underline */}
            <svg
              viewBox="0 0 240 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-1.5 left-0 w-full h-[14px] overflow-visible pointer-events-none transition-all duration-500 ease-out origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="brush-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path
                d="M 2 16.5 C 10 11, 20 8, 26 10 C 31 11.5, 33 16.5, 37 21 C 41 23.5, 48 21, 56 18 C 90 12, 150 9, 238 12.5 C 160 8, 92 8, 54 13.5 C 44 15, 38 19, 34 16 C 29 11, 22 5, 14 6.5 C 8 8, 4 12, 2 16.5 Z"
                fill="url(#brush-stroke-grad)"
              />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-foreground bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:scale-110 transition-all duration-300 hover:bg-muted/50"
              aria-label="Toggle theme"
            >
              <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
            </Button>

            {/* CTA Button - Desktop */}
            <Button
              size="sm"
              className="hidden md:inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 border-0 px-5"
              asChild
            >
              <Link href="#contact">Let&apos;s Talk</Link>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mt-4 pb-4 space-y-1 border-t border-border/50 pt-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                } ${
                  activeSection === item.href.slice(1)
                    ? "text-foreground bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-border/50">
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start rounded-lg hover:bg-muted/50 transition-all duration-300"
              >
                <Sun className="h-4 w-4 mr-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 ml-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="ml-7">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
