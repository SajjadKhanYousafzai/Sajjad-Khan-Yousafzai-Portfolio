"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, GraduationCap, Briefcase, MapPin } from "lucide-react"

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const experiences = [
    {
      type: "internship",
      title: "Machine Learning Intern",
      company: "Tech Innovators Inc.",
      location: "Remote",
      period: "2023 - Present",
      description:
        "Worked on developing machine learning models for predictive analytics and participated in the deployment of these models in production environments.",
      achievements: [
        "Contributed to the development of a predictive maintenance model",
        "Assisted in optimizing data pipelines for faster processing",
        "Learned and applied advanced machine learning techniques",
        "Collaborated with senior data scientists on ongoing projects",
      ],
      technologies: ["Python", "TensorFlow", "AWS", "Kubernetes", "MLflow"],
    },
    {
      type: "education",
      title: "Bachelor of Science in Software Engineering",
      company: "COMSATS University Wah Campus",
      location: "Wah Cantt, Pakistan",
      period: "Sep 2022 - Sep 2026 (Expected)",
      description:
        "Currently pursuing a degree in software engineering with a focus on developing robust and scalable software solutions.",
      achievements: [
        "Participated in multiple hackathons and won 2 awards",
        "Completed a capstone project on AI-driven chatbots",
        "Active member of the Software Engineering Club",
        "Maintained a GPA of 3.7/4.0",
      ],
      technologies: ["Programming", "Algorithms", "Software Engineering", "Mathematics", "AI"],
    },
  ]

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Academic & Internship Journey</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My academic background and internship experiences in software engineering and machine learning
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className={`border-0 bg-background shadow-sm hover:shadow-md transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      {exp.type === "work" ? (
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                      ) : exp.type === "internship" ? (
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-primary/10">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
                        <CardDescription className="text-base font-medium text-primary">{exp.company}</CardDescription>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Key Achievements:</h4>
                      <div className="grid gap-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Technologies & Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs bg-muted hover:bg-muted/80">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
