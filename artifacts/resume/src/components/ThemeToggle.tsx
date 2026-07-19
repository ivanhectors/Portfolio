import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[68px] h-9 glass-panel rounded-full" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="glass-panel relative flex h-9 w-[68px] items-center rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
      data-testid="button-theme-toggle"
    >
      <div className="flex w-full justify-between px-1.5 z-10 text-muted-foreground">
        <Sun className="h-4 w-4" />
        <Moon className="h-4 w-4" />
      </div>
      <motion.div
        className="absolute h-7 w-7 rounded-full bg-foreground/10 backdrop-blur-md shadow-sm border border-foreground/10 z-0"
        initial={false}
        animate={{
          x: isDark ? 31 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </button>
  );
}
