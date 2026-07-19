import { motion } from 'framer-motion';
import { Code2, Globe, Layers, Zap } from 'lucide-react';

const STATS = [
  { label: 'Years Experience', value: '8+', icon: Zap },
  { label: 'Projects Completed', value: '45+', icon: Layers },
  { label: 'Global Clients', value: '20+', icon: Globe },
  { label: 'Core Technologies', value: '12', icon: Code2 },
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 md:p-12 rounded-3xl"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-6">About Me</h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
            <p>
              I'm a senior frontend engineer and interface designer who believes software should feel 
              physical, responsive, and crafted with intent. I bridge the gap between design and engineering, 
              ensuring that beautiful mockups translate into performant, accessible, and delightful products.
            </p>
            <p>
              My philosophy is rooted in restraint. I don't build things just because I can; I build things 
              that solve problems elegantly. When I'm not writing code, you'll find me exploring typography, 
              studying architecture, or tweaking the motion curves on a single button until it feels just right.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 glass-panel-hover group"
              >
                <div className="p-3 rounded-xl bg-foreground/5 text-foreground/70 group-hover:text-primary transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-xs font-medium text-foreground/60 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
