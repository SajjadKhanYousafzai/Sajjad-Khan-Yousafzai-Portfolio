"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Continent data as [lat, lon] coordinate pairs
function generateContinentPoints(): [number, number][] {
  const points: [number, number][] = []
  const rng = (seed: number) => {
    let s = seed
    return () => {
      s = (s * 16807 + 0) % 2147483647
      return s / 2147483647
    }
  }
  const rand = rng(42)

  const fill = (latMin: number, latMax: number, lonMin: number, lonMax: number, density: number) => {
    for (let i = 0; i < density; i++) {
      points.push([
        latMin + rand() * (latMax - latMin),
        lonMin + rand() * (lonMax - lonMin),
      ])
    }
  }

  // North America
  fill(25, 50, -130, -65, 280)
  fill(50, 65, -140, -60, 160)
  fill(30, 48, -125, -100, 120)
  fill(65, 72, -170, -60, 80)
  fill(15, 25, -105, -80, 60)
  // Central America
  fill(8, 20, -100, -75, 60)
  fill(18, 23, -88, -72, 40)
  // South America
  fill(-5, 12, -80, -35, 200)
  fill(-23, -5, -75, -35, 220)
  fill(-40, -23, -72, -50, 140)
  fill(-55, -40, -75, -63, 50)
  // Europe
  fill(36, 45, -10, 30, 180)
  fill(45, 55, -5, 40, 180)
  fill(55, 65, 5, 45, 100)
  fill(65, 72, 10, 40, 60)
  // Africa
  fill(20, 37, -18, 40, 150)
  fill(5, 20, -18, 50, 240)
  fill(-5, 5, 8, 42, 150)
  fill(-18, -5, 12, 45, 160)
  fill(-35, -18, 16, 40, 120)
  // Middle East
  fill(12, 38, 35, 65, 120)
  // Russia / Central Asia
  fill(45, 55, 40, 140, 200)
  fill(55, 70, 30, 180, 200)
  fill(70, 75, 40, 180, 60)
  // South Asia
  fill(8, 35, 65, 90, 160)
  fill(5, 20, 75, 88, 60)
  // East Asia
  fill(20, 42, 100, 135, 220)
  fill(42, 55, 75, 135, 140)
  fill(30, 45, 128, 145, 60)
  // Southeast Asia
  fill(-8, 20, 95, 140, 200)
  fill(-10, 5, 100, 150, 120)
  // Australia
  fill(-40, -12, 113, 155, 220)
  fill(-45, -40, 145, 170, 30)
  // New Zealand
  fill(-47, -34, 166, 178, 40)
  // Greenland
  fill(60, 83, -55, -15, 80)
  // Ocean scatter
  fill(-60, 70, -180, 180, 300)

  return points
}

const CONTINENT_POINTS = generateContinentPoints()

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const targetRotRef = useRef({ x: 0, y: 0 })
  const currentRotRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 8 + 2
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // Mouse/touch interaction
  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    // Normalize to -1..1 relative to canvas center
    const nx = ((clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((clientY - rect.top) / rect.height - 0.5) * 2

    mouseRef.current = { x: nx, y: ny, active: true }
    targetRotRef.current = { x: ny * 0.4, y: nx * 0.8 }
  }, [])

  const handlePointerLeave = useCallback(() => {
    mouseRef.current.active = false
    targetRotRef.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener("mousemove", handlePointerMove)
    canvas.addEventListener("mouseleave", handlePointerLeave)
    canvas.addEventListener("touchmove", handlePointerMove as EventListener, { passive: true })
    canvas.addEventListener("touchend", handlePointerLeave)

    return () => {
      canvas.removeEventListener("mousemove", handlePointerMove)
      canvas.removeEventListener("mouseleave", handlePointerLeave)
      canvas.removeEventListener("touchmove", handlePointerMove as EventListener)
      canvas.removeEventListener("touchend", handlePointerLeave)
    }
  }, [handlePointerMove, handlePointerLeave])

  // Particle globe canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const canvasSize = 360
    canvas.width = canvasSize * dpr
    canvas.height = canvasSize * dpr
    canvas.style.width = `${canvasSize}px`
    canvas.style.height = `${canvasSize}px`
    ctx.scale(dpr, dpr)

    const cx = canvasSize / 2
    const cy = canvasSize / 2 - 8
    const radius = 130
    let autoRotation = 0
    let animFrame: number
    const totalContinent = CONTINENT_POINTS.length - 300

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      // Smooth interpolation for mouse interaction
      const lerp = 0.06
      currentRotRef.current.x += (targetRotRef.current.x - currentRotRef.current.x) * lerp
      currentRotRef.current.y += (targetRotRef.current.y - currentRotRef.current.y) * lerp

      const interactX = currentRotRef.current.x
      const interactY = currentRotRef.current.y

      // Base tilt + mouse interaction
      const tilt = 0.3 + interactX
      const cosTilt = Math.cos(tilt)
      const sinTilt = Math.sin(tilt)

      // Background glow under globe
      const baseGlow = ctx.createRadialGradient(cx, cy + radius + 18, 0, cx, cy + radius + 18, 90)
      baseGlow.addColorStop(0, "rgba(6, 182, 212, 0.12)")
      baseGlow.addColorStop(0.3, "rgba(139, 92, 246, 0.05)")
      baseGlow.addColorStop(1, "transparent")
      ctx.fillStyle = baseGlow
      ctx.fillRect(0, 0, canvasSize, canvasSize)

      // Globe ambient glow
      const ambientGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.5)
      ambientGlow.addColorStop(0, "rgba(6, 182, 212, 0.05)")
      ambientGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.02)")
      ambientGlow.addColorStop(1, "transparent")
      ctx.fillStyle = ambientGlow
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Draw particles
      const totalRotY = autoRotation + interactY

      for (let i = 0; i < CONTINENT_POINTS.length; i++) {
        const [lat, lon] = CONTINENT_POINTS[i]
        const isOcean = i >= totalContinent

        const latRad = (lat * Math.PI) / 180
        const lonRad = (lon * Math.PI) / 180 + totalRotY

        // Spherical to Cartesian
        let x = Math.cos(latRad) * Math.sin(lonRad)
        let y = -Math.sin(latRad)
        let z = Math.cos(latRad) * Math.cos(lonRad)

        // Apply tilt
        const y2 = y * cosTilt - z * sinTilt
        const z2 = y * sinTilt + z * cosTilt

        if (z2 < -0.1) continue

        const screenX = cx + x * radius
        const screenY = cy + y2 * radius
        const depth = (z2 + 1) / 2

        if (isOcean) {
          const alpha = depth * 0.06
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
          ctx.fillRect(screenX - 0.3, screenY - 0.3, 0.6, 0.6)
        } else {
          const alpha = 0.12 + depth * 0.75
          const size = 0.5 + depth * 1.3

          // Cyan-to-violet gradient based on latitude for visual variety
          const latNorm = (lat + 60) / 120
          const r = Math.round(6 + latNorm * 133)   // 6 → 139
          const g = Math.round(182 - latNorm * 90)   // 182 → 92
          const b = Math.round(212 + latNorm * 34)    // 212 → 246

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.beginPath()
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fill()

          // Glow on bright front-facing particles
          if (depth > 0.65 && Math.random() > 0.55) {
            const glowR = Math.round(100 + latNorm * 80)
            const glowG = Math.round(200 - latNorm * 60)
            const glowB = Math.round(255)
            ctx.fillStyle = `rgba(${glowR}, ${glowG}, ${glowB}, ${depth * 0.12})`
            ctx.beginPath()
            ctx.arc(screenX, screenY, size * 2.8, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Atmospheric rim light
      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.1)
      rimGrad.addColorStop(0, "transparent")
      rimGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.05)")
      rimGrad.addColorStop(0.8, "rgba(139, 92, 246, 0.03)")
      rimGrad.addColorStop(1, "transparent")
      ctx.fillStyle = rimGrad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2)
      ctx.fill()

      // Orbital ring
      ctx.save()
      ctx.translate(cx, cy)

      ctx.beginPath()
      ctx.ellipse(0, 0, radius + 28, 20, 0.12, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)"
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Sweeping bright arc
      const arcStart = autoRotation * 3
      ctx.beginPath()
      ctx.ellipse(0, 0, radius + 28, 20, 0.12, arcStart, arcStart + 1.5)
      const arcGrad = ctx.createLinearGradient(
        Math.cos(arcStart) * (radius + 28), Math.sin(arcStart) * 20,
        Math.cos(arcStart + 1.5) * (radius + 28), Math.sin(arcStart + 1.5) * 20
      )
      arcGrad.addColorStop(0, "rgba(6, 182, 212, 0.5)")
      arcGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.4)")
      arcGrad.addColorStop(1, "rgba(139, 92, 246, 0.1)")
      ctx.strokeStyle = arcGrad
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Bright point
      const brightAngle = arcStart + 0.75
      const bx = Math.cos(brightAngle) * (radius + 28)
      const by = Math.sin(brightAngle) * 20
      const spotGlow = ctx.createRadialGradient(bx, by, 0, bx, by, 8)
      spotGlow.addColorStop(0, "rgba(200, 220, 255, 0.9)")
      spotGlow.addColorStop(0.3, "rgba(6, 182, 212, 0.4)")
      spotGlow.addColorStop(0.6, "rgba(139, 92, 246, 0.15)")
      spotGlow.addColorStop(1, "transparent")
      ctx.fillStyle = spotGlow
      ctx.beginPath()
      ctx.arc(bx, by, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // Top highlight
      const topShine = ctx.createRadialGradient(cx + 20, cy - radius * 0.65, 0, cx + 20, cy - radius * 0.65, 40)
      topShine.addColorStop(0, "rgba(200, 220, 255, 0.1)")
      topShine.addColorStop(0.5, "rgba(6, 182, 212, 0.04)")
      topShine.addColorStop(1, "transparent")
      ctx.fillStyle = topShine
      ctx.beginPath()
      ctx.arc(cx + 20, cy - radius * 0.65, 40, 0, Math.PI * 2)
      ctx.fill()

      // Base holographic glow
      const pedGlow = ctx.createRadialGradient(cx, cy + radius + 22, 0, cx, cy + radius + 22, 60)
      pedGlow.addColorStop(0, "rgba(6, 182, 212, 0.14)")
      pedGlow.addColorStop(0.2, "rgba(139, 92, 246, 0.06)")
      pedGlow.addColorStop(1, "transparent")
      ctx.fillStyle = pedGlow
      ctx.beginPath()
      ctx.ellipse(cx, cy + radius + 22, 60, 10, 0, 0, Math.PI * 2)
      ctx.fill()

      autoRotation += 0.004
      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background select-none"
          style={{ cursor: "grab" }}
        >
          {/* Globe */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <canvas
              ref={canvasRef}
              style={{ cursor: "grab" }}
            />
          </motion.div>

          {/* Name + Description */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-center mt-6 mb-6"
          >
            <h1
              className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sajjad Ali Shah
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-[11px] md:text-xs tracking-[0.3em] uppercase font-medium"
              style={{
                background: "linear-gradient(90deg, rgba(6, 182, 212, 0.7), rgba(139, 92, 246, 0.7))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Engineer & Data Scientist
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="relative h-[2.5px] rounded-full overflow-hidden mb-3"
            style={{ background: "rgba(6, 182, 212, 0.08)" }}
          >
            <motion.div
              className="h-full rounded-full relative"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #c084fc)",
                boxShadow: "0 0 12px rgba(6, 182, 212, 0.4), 0 0 30px rgba(139, 92, 246, 0.15)",
                transition: "width 0.1s ease-out",
              }}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                style={{
                  background: "white",
                  boxShadow: "0 0 6px #06b6d4, 0 0 14px rgba(139, 92, 246, 0.6)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Percentage */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[11px] font-mono tracking-[0.3em]"
            style={{
              background: "linear-gradient(90deg, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
