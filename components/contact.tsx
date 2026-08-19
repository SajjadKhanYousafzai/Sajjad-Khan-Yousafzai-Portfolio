"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "sajjadkhanyousafzai47@gmail.com",
      href: "mailto:sajjadkhanyousafzai47@gmail.com",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+92 316 9671878",
      href: "tel:+923169671878",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Islamabad, Pakistan",
      href: "#",
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate on your next AI or data science project? Let&apos;s discuss how we
              can transform your data into intelligent solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div
              className={`lg:col-span-2 space-y-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div>
                <h3 className="text-2xl font-heading font-semibold mb-4 text-foreground">
                  Let&apos;s Connect
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  I&apos;m always excited to discuss new opportunities, collaborations, or innovative
                  projects in AI and data science.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Link
                    key={index}
                    href={info.href}
                    className="glass-card rounded-xl p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group block"
                  >
                    <div
                      className={`flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-r ${info.gradient} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <div className="text-white">{info.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{info.title}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`lg:col-span-3 glass-card rounded-2xl p-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form and I&apos;ll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
                    <CheckCircle className="h-12 w-12 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for reaching out. I&apos;ll respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsSubmitting(true)
                    setError(null)
                    try {
                      const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          access_key: "149805cb-3bd1-4026-900c-9db15e668a73",
                          name: formData.name,
                          email: formData.email,
                          subject: formData.subject,
                          message: formData.message,
                        }),
                      })
                      const result = await response.json()
                      if (result.success) {
                        setIsSubmitted(true)
                        setFormData({ name: "", email: "", subject: "", message: "" })
                      } else {
                        setError(result.message || "Failed to send message. Please try again.")
                      }
                    } catch {
                      setError("Failed to send message. Please try again or contact me directly.")
                    } finally {
                      setIsSubmitting(false)
                    }
                  }}
                >
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary/50 rounded-lg transition-all duration-300"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary/50 rounded-lg transition-all duration-300"
                    />
                  </div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((f) => ({ ...f, subject: e.target.value }))}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 rounded-lg transition-all duration-300"
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 rounded-lg resize-none transition-all duration-300"
                  />
                  <Button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 border-0"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
