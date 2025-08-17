import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

// Custom Kaggle icon component
const KaggleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-background dark:bg-background border-t border-border dark:border-border py-12 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Sajjad Ali Shah</h3>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Data Scientist & AI Engineer specializing in machine learning, statistical analysis, intelligent
                chatbots, RAG systems, computer vision, and NLP solutions that transform data into actionable insights
                and intelligent systems.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/SajjadKhanYousafzai"
                  className="p-2 rounded-full bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/60 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/sajjad-ali-shah-120341305"
                  className="p-2 rounded-full bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/60 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link
                  href="https://www.kaggle.com/sajjadalishah"
                  className="p-2 rounded-full bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/60 transition-colors"
                  aria-label="Kaggle"
                >
                  <KaggleIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "#about", label: "About" },
                  { href: "#skills", label: "Skills" },
                  { href: "#projects", label: "Projects" },
                  { href: "#experience", label: "Experience" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Services</h4>
              <ul className="space-y-3">
                {[
                  "Data Science & Analytics",
                  "Machine Learning Models",
                  "Chatbot Development",
                  "RAG Systems",
                  "Computer Vision",
                  "NLP Solutions",
                ].map((service) => (
                  <li key={service} className="text-muted-foreground">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border dark:border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">&copy; 2024 Sajjad Ali Shah. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
