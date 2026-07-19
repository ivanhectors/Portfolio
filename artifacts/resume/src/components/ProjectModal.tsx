import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Smartphone, Monitor, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="modal-glass w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden pointer-events-auto"
              style={{ '--accent': project.accentColor } as React.CSSProperties}
            >
              {/* Header */}
              <div className="relative px-8 pt-8 pb-6 flex-shrink-0">
                {/* Accent gradient top strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-70"
                  style={{ background: `linear-gradient(90deg, ${project.accentColor}80, transparent)` }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${project.accentColor}20`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}30`,
                        }}
                      >
                        {project.type === 'mobile'
                          ? <Smartphone className="w-3 h-3" />
                          : <Monitor className="w-3 h-3" />}
                        {project.type === 'mobile' ? 'Mobile App' : 'Web App'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-foreground/60 border border-foreground/10 bg-foreground/5">
                        {project.industry}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">{project.title}</h2>
                    <p className="text-foreground/60 font-medium">
                      Client: <span className="text-foreground/80">{project.client}</span>
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="modal-close-btn flex-shrink-0 p-2 rounded-full transition-all"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-7 modal-scroll">
                {/* Description */}
                <p className="text-foreground/80 leading-relaxed">{project.description}</p>

                {/* Key Insights */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-4">
                    Key Insights
                  </h3>
                  <ul className="space-y-3">
                    {project.keyInsights.map((insight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                        className="flex gap-3 items-start"
                      >
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: project.accentColor }}
                        />
                        <span className="text-sm text-foreground/75 leading-relaxed">{insight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border bg-foreground/5 border-foreground/10 text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-3">
                    Gallery
                  </h3>
                  {project.images.length > 0 ? (
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
                      {project.images.map((src, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 snap-start rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/5"
                          style={{
                            width: project.type === 'mobile' ? '180px' : '280px',
                            height: project.type === 'mobile' ? '320px' : '180px',
                          }}
                        >
                          <img
                            src={src}
                            alt={`${project.title} screenshot ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {/* Placeholder slots — replace project.images with your screenshot paths */}
                      {(project.type === 'mobile' ? [1, 2, 3, 4] : [1, 2, 3]).map((n) => (
                        <div
                          key={n}
                          className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground/20 bg-foreground/3 text-foreground/30"
                          style={{
                            width: project.type === 'mobile' ? '160px' : '260px',
                            height: project.type === 'mobile' ? '290px' : '165px',
                          }}
                        >
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-xs text-center px-3">
                            Screenshot {n}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {project.images.length === 0 && (
                    <p className="text-xs text-foreground/40 mt-2">
                      Add screenshot paths to <code className="font-mono">projects.ts</code> → <code className="font-mono">images[]</code> to populate the gallery.
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              {project.link && project.link !== '#' && (
                <div className="px-8 py-5 border-t border-foreground/10 flex-shrink-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    style={{ background: project.accentColor }}
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
