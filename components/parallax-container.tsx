"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxContainerProps {
  children: React.ReactNode
}

export function ParallaxContainer({ children }: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrolled = window.pageYOffset
      const parallaxElements = containerRef.current.querySelectorAll("[data-parallax]")

      parallaxElements.forEach((element) => {
        const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.5")
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <div ref={containerRef}>{children}</div>
}
