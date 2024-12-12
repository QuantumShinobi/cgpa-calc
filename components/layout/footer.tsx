import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Built with Next.js and Tailwind CSS
            </p>
            <p className="text-sm text-muted-foreground">
              By{" "}
              <a
                href="https://github.com/quantumshinobi"
                className="hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rishit Verma
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">CGPA Calculator</p>
            <a
              href="https://github.com/quantumshinobi/cgpa-calc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
