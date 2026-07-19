import { motion } from 'framer-motion';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3/Sass', 'Python', 'GraphQL']
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Vue', 'React Native', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'Vite', 'Webpack', 'Figma', 'Vercel', 'AWS', 'Docker']
  },
  {
    category: 'Concepts',
    skills: ['Responsive Design', 'Accessibility (a11y)', 'Performance Optimization', 'Design Systems', 'Micro-interactions']
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl font-bold tracking-tight mb-12"
        >
          Capabilities
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-3xl"
            >
              <h3 className="text-lg font-semibold mb-6 text-foreground/90">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.05), ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full glass-panel text-sm font-medium text-foreground/80 cursor-default hover:text-foreground relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
