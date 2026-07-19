import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Aura Dashboard',
    client: 'FinServe Corp',
    description: 'A comprehensive wealth management dashboard featuring real-time data visualization and a custom design system.',
    tags: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    color: 'from-blue-500/20 to-indigo-500/20',
    link: '#'
  },
  {
    title: 'Lumina Storefront',
    client: 'Lumina Beauty',
    description: 'High-performance e-commerce experience with seamless page transitions, 3D product viewers, and integrated headless CMS.',
    tags: ['Next.js', 'Framer Motion', 'Three.js', 'Shopify'],
    color: 'from-rose-500/20 to-orange-500/20',
    link: '#'
  },
  {
    title: 'Orbit Workspace',
    client: 'Acme SaaS',
    description: 'Collaborative document editor with real-time multiplayer cursors, offline support, and advanced rich-text capabilities.',
    tags: ['React', 'Yjs', 'ProseMirror', 'WebSockets'],
    color: 'from-emerald-500/20 to-teal-500/20',
    link: '#'
  },
  {
    title: 'Velocity Mobile',
    client: 'Velocity Motors',
    description: 'Companion app for EV owners to track charging status, plan routes, and control vehicle climate remotely.',
    tags: ['React Native', 'GraphQL', 'Mapbox'],
    color: 'from-violet-500/20 to-purple-500/20',
    link: '#'
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Selected Work</h2>
            <p className="text-foreground/70">A collection of projects built with craft and intention.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="glass-panel rounded-3xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                {/* Accent glow on hover */}
                <div className={`absolute -inset-px bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0 pointer-events-none blur-xl`} />
                
                <div className="relative z-10 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                      <p className="text-sm text-foreground/60 font-medium">for {project.client}</p>
                    </div>
                    <a 
                      href={project.link} 
                      className="p-2 rounded-full glass-panel text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <p className="text-foreground/80 mb-8 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium text-foreground/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
