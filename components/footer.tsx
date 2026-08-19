import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

// Custom Kaggle icon component
const KaggleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
  </svg>
)

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6 relative">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-heading font-bold mb-4 text-gradient-static">
                Sajjad Ali Shah
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md leading-relaxed">
                AI Engineer & Data Scientist specializing in Machine Learning, LLM/RAG systems,
                Computer Vision, and NLP solutions. Building intelligent systems that transform
                data into actionable insights.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/SajjadKhanYousafzai", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/sajjad-ali-shah-120341305",
                    label: "LinkedIn",
                  },
                  { icon: Mail, href: "mailto:sajjadkhanyousafzai47@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    className="p-2.5 rounded-full glass-card text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
                <Link
                  href="https://www.kaggle.com/sajjadalishah"
                  target="_blank"
                  className="p-2.5 rounded-full glass-card text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Kaggle"
                >
                  <KaggleIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-foreground text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "#about", label: "About" },
                  { href: "#skills", label: "Skills" },
                  { href: "#projects", label: "Projects" },
                  { href: "#experience", label: "Experience" },
                  { href: "#contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-foreground text-sm">
                Expertise
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Machine Learning",
                  "LLM / RAG Systems",
                  "Computer Vision",
                  "NLP Solutions",
                  "Data Science",
                  "MLOps & Deployment",
                ].map((service) => (
                  <li key={service} className="text-sm text-muted-foreground">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border/50 mt-10 pt-8">
            <div className="flex justify-center items-center">
              <p className="text-muted-foreground text-xs">
                &copy; {new Date().getFullYear()} Sajjad Ali Shah. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
