export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 relative z-10 border-t border-foreground/10 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
        <p>&copy; {currentYear} Julian Design. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with intent.
        </p>
      </div>
    </footer>
  );
}
