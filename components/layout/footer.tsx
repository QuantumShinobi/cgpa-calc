export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <p className="text-sm text-muted-foreground p-6">
          Built with Next.js and Tailwind CSS
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          © {new Date().getFullYear()} CGPA Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
