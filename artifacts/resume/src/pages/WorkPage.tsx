import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Smartphone, Monitor, Search } from 'lucide-react';
import { Link } from 'wouter';
import { PROJECTS, ALL_INDUSTRIES } from '../data/projects';
import { ProjectModal } from '../components/ProjectModal';
import type { Project } from '../data/projects';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';

export function WorkPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = PROJECTS.filter((p) => {
    const matchesIndustry = selectedIndustry === 'All' || p.industry === selectedIndustry;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesIndustry && matchesSearch;
  });

  return (
    <>
      {/* Background orbs (same as home page) */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative min-h-screen z-10">
        {/* Top nav */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 z-40 px-4 md:px-8 py-4 flex justify-center"
        >
          <div className="w-full max-w-6xl flex items-center justify-between glass-panel rounded-2xl px-6 py-3">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <span className="w-px h-4 bg-foreground/15" />
              <span className="text-sm font-semibold">All Work</span>
            </div>
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Page header */}
        <div className="px-4 md:px-8 pt-12 pb-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-3">
                Complete Portfolio
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                All Work
              </h1>
              <p className="text-foreground/60 max-w-xl">
                Every project, every client, every industry. Filter by sector to find relevant case studies.
              </p>
            </motion.div>

            {/* Search + filter row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* Search */}
              <div className="relative flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="search"
                  placeholder="Search projects…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2.5 text-sm rounded-full glass-panel border-0 bg-transparent placeholder-foreground/40 text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 w-48"
                />
              </div>

              {/* Industry filter pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {ALL_INDUSTRIES.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedIndustry === industry
                        ? 'bg-foreground text-background shadow-md'
                        : 'glass-panel text-foreground/65 hover:text-foreground'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-xs text-foreground/40"
            >
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              {selectedIndustry !== 'All' ? ` in ${selectedIndustry}` : ' across all industries'}
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="px-4 md:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div
                  key={selectedIndustry + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setActiveProject(project)}
                    >
                      <div className="glass-panel rounded-2xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl">
                        {/* Highlight badge */}
                        {project.highlight && (
                          <div
                            className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              background: `${project.accentColor}20`,
                              color: project.accentColor,
                              border: `1px solid ${project.accentColor}30`,
                            }}
                          >
                            Featured
                          </div>
                        )}

                        <div
                          className={`absolute -inset-px bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0 blur-lg`}
                        />

                        <div className="relative z-10 flex flex-col flex-grow">
                          {/* Badges */}
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
                            <span className="text-[11px] text-foreground/50 bg-foreground/5 border border-foreground/10 px-2 py-0.5 rounded-full font-medium">
                              {project.industry}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                          <p className="text-xs text-foreground/55 font-medium mb-3">
                            for {project.client}
                          </p>
                          <p className="text-sm text-foreground/70 leading-relaxed mb-5 flex-grow line-clamp-3">
                            {project.description}
                          </p>

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

                          <div className="mt-4 pt-4 border-t border-foreground/10">
                            <span className="text-xs text-foreground/40 group-hover:text-foreground/60 transition-colors">
                              Click to view case study
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel rounded-2xl p-16 text-center"
                >
                  <p className="text-foreground/40 text-lg font-medium">No projects found</p>
                  <p className="text-foreground/30 text-sm mt-1">Try a different industry or search term.</p>
                  <button
                    onClick={() => { setSelectedIndustry('All'); setSearchQuery(''); }}
                    className="mt-4 px-4 py-2 rounded-full text-sm font-medium glass-panel hover:opacity-80 transition-opacity"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Footer />
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
