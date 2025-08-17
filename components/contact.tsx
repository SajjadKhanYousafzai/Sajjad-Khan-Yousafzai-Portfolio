"use client"

import { useState, useEffect, useRef } from "react"
// Using Web3Forms for AJAX form submission
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"

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
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // ...existing code...

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "sajjadkhanyousafzai47@gmail.com",
      href: "mailto:sajjadkhanyousafzai47@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+92 316 9671878",
      href: "tel:+923169671878",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Punjab, Pakistan",
      href: "#",
    },
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-6 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate on your next AI or data science project? Let's discuss how we can transform your data
              into intelligent solutions and actionable insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm a passionate AI engineer and data scientist currently pursuing my degree in Software Engineering.
                  I'm always excited to discuss new opportunities, collaborations, or innovative projects in AI and data
                  science. Feel free to reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-background dark:bg-card shadow-sm hover:shadow-md dark:hover:shadow-primary/10 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg">
                          <div className="text-primary">{info.icon}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.title}</h4>
                          <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card
              className={`border-0 bg-background dark:bg-card shadow-sm transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <CardHeader>
                <CardTitle className="text-foreground">Send a Message</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground">
                      Your email client should have opened with your message. Thank you for reaching out!
                    </p>
                  </div>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      setError(null);
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
                        });
                        const result = await response.json();
                        if (result.success) {
                          setIsSubmitted(true);
                          setFormData({ name: "", email: "", subject: "", message: "" });
                        } else {
                          setError(result.message || "Failed to send message. Please try again or contact me directly.");
                        }
                      } catch (err) {
                        setError("Failed to send message. Please try again or contact me directly.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                          required
                          className="bg-background dark:bg-background border-border focus:border-primary dark:border-border dark:focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                          required
                          className="bg-background dark:bg-background border-border focus:border-primary dark:border-border dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={e => setFormData(f => ({ ...f, subject: e.target.value }))}
                        required
                        className="bg-background dark:bg-background border-border focus:border-primary dark:border-border dark:focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                        required
                        className="bg-background dark:bg-background border-border focus:border-primary dark:border-border dark:focus:border-primary resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
