"use client"

export function FloatingElements() {
  const elements = [
    { icon: "📊", delay: "0s", duration: "6s" },
    { icon: "🤖", delay: "1s", duration: "8s" },
    { icon: "📈", delay: "2s", duration: "7s" },
    { icon: "🧠", delay: "3s", duration: "9s" },
    { icon: "⚡", delay: "4s", duration: "5s" },
    { icon: "🔬", delay: "5s", duration: "10s" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute text-4xl opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: element.delay,
            animationDuration: element.duration,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  )
}
