import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { Link } from 'wouter';
import { HIGHLIGHT_PROJECTS } from '../data/projects';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../data/projects';

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2">
              Portfolio
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Highlight Projects</h2>
            <p className="text-foreground/60">
              A curated selection of client work — mobile apps, web platforms, and everything in between.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap self-start md:self-auto"
          >
            View All Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* 3-column × 2-row grid — 6 highlight projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGHLIGHT_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              <div
                className="glass-panel rounded-2xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl"
                style={
                  {
                    '--hover-glow': project.accentColor,
                  } as React.CSSProperties
                }
              >
                {/* Accent glow on hover */}
                <div
                  className={`absolute -inset-px bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0 pointer-events-none blur-lg`}
                />

                <div className="relative z-10 flex-grow flex flex-col">
                  {/* Type + industry badges */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        background: `${project.accentColor}18`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}30`,
                      }}
                    >
                      {project.type === 'mobile'
                        ? <Smartphone className="w-2.5 h-2.5" />
                        : <Monitor className="w-2.5 h-2.5" />}
                      {project.type === 'mobile' ? 'Mobile' : 'Web'}
                    </span>
                    <span className="text-[11px] font-medium text-foreground/50 bg-foreground/5 border border-foreground/10 px-2 py-0.5 rounded-full">
                      {project.industry}
                    </span>
                  </div>

                  {/* Title + client */}
                  <h3 className="text-lg font-bold mb-1 group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground/55 font-medium mb-3">
                    for {project.client}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-foreground/70 leading-relaxed mb-5 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-medium text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-[11px] font-medium text-foreground/40">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Click hint */}
                  <div className="mt-4 pt-4 border-t border-foreground/10 flex items-center justify-between">
                    <span className="text-xs text-foreground/40 group-hover:text-foreground/60 transition-colors">
                      Click to view details
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                      style={{ background: project.accentColor }}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 text-center"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors border border-foreground/15 hover:border-foreground/30 bg-foreground/3 hover:bg-foreground/8"
          >
            See all projects &amp; case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
