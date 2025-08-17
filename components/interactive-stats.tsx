"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function InteractiveStats() {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    accuracy: 0,
    models: 0,
    experience: 0,
  })

  const finalStats = {
    projects: 50,
    accuracy: 94,
    models: 25,
    experience: 5,
  }

  useEffect(() => {
    const animateStats = () => {
      Object.keys(finalStats).forEach((key) => {
        let current = 0
        const final = finalStats[key as keyof typeof finalStats]
        const increment = final / 60

        const timer = setInterval(() => {
          current += increment
          if (current >= final) {
            current = final
            clearInterval(timer)
          }
          setAnimatedStats((prev) => ({
            ...prev,
            [key]: Math.floor(current),
          }))
        }, 50)
      })
    }

    const timer = setTimeout(animateStats, 1000)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      value: animatedStats.projects,
      suffix: "+",
      label: "Projects Completed",
      icon: "🚀",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      value: animatedStats.accuracy,
      suffix: "%",
      label: "Model Accuracy",
      icon: "🎯",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      value: animatedStats.models,
      suffix: "+",
      label: "ML Models Deployed",
      icon: "🤖",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      value: animatedStats.experience,
      suffix: "+",
      label: "Years Experience",
      icon: "⭐",
      gradient: "from-orange-500/20 to-red-500/20",
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
          <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.gradient} backdrop-blur-sm`}>
            <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm" />
            <CardContent className="relative z-10 p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
