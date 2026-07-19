import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300 flex justify-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`w-full max-w-5xl flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? 'glass-panel px-6 py-3' : 'px-2 py-4'
        }`}
      >
        <a 
          href="#" 
          className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
          data-testid="link-home"
        >
          JD.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/work"
            className="text-sm font-medium px-4 py-1.5 rounded-full glass-panel text-foreground/80 hover:text-foreground transition-colors"
          >
            All Work
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground/70 hover:text-foreground"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 glass-panel rounded-2xl p-6 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground/80 hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground/80 hover:text-foreground"
            >
              All Work
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
