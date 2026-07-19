import { motion } from 'framer-motion';

const EXPERIENCE = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Nexus Studio',
    period: '2021 — Present',
    description: 'Lead frontend architecture for high-profile client projects. Mentored junior engineers, established design systems, and reduced initial load times across the portfolio by 40%.',
  },
  {
    role: 'UI Engineer',
    company: 'Fintech Innovations',
    period: '2018 — 2021',
    description: 'Built complex data visualization dashboards for institutional investors. Collaborated closely with the design team to implement a sweeping redesign of the core web platform.',
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Agency Co.',
    period: '2016 — 2018',
    description: 'Developed interactive marketing sites and digital campaigns for global brands. Specialized in webGL and advanced CSS animations.',
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl font-bold tracking-tight mb-12"
        >
          Experience
        </motion.h2>

        <div className="relative border-l border-foreground/10 ml-4 md:ml-0 md:pl-8 space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 md:pl-0"
            >
              <div className="absolute w-3 h-3 bg-foreground rounded-full -left-[43px] md:-left-[38px] top-2 border-2 border-background" />
              
              <div className="glass-panel p-6 md:p-8 rounded-2xl glass-panel-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-foreground/70 font-medium">{exp.company}</p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full glass-panel text-xs font-medium whitespace-nowrap self-start">
                    {exp.period}
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
