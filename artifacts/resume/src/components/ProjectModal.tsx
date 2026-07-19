import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Smartphone, Monitor, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';

// App Store and Play Store SVG icons
function AppStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M3.18 23.76c.27.15.58.16.87.04L13.86 12 3.18.2C2.72.37 2.4.8 2.4 1.31v21.38c0 .51.32.94.78 1.07zM16.47 8.53 5.86 2.17l9.93 10.16-1.32-3.8zm2.87 5.47L17.04 12l2.3-1.3L23 12zm-13.48 8.83 10.61-6.36-1.27-1.27z"/>
    </svg>
  );
}

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

  const hasCtaButtons = project && (
    project.siteUrl || project.appStoreUrl || project.playStoreUrl
  );

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

          {/* Modal — top-aligned with safe clearance from navbar */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-0 z-50 flex items-start justify-center pt-20 pb-4 px-4 pointer-events-none"
          >
            <div
              className="modal-glass w-full max-w-2xl rounded-3xl flex flex-col overflow-hidden pointer-events-auto"
              style={{
                '--accent': project.accentColor,
                maxHeight: 'calc(100vh - 6rem)',
              } as React.CSSProperties}
            >
              {/* Header */}
              <div className="relative px-7 pt-7 pb-5 flex-shrink-0">
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
                    <p className="text-foreground/60 font-medium text-sm">
                      Client:{' '}
                      {project.clientUrl ? (
                        <a
                          href={project.clientUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/80 hover:underline underline-offset-2 transition-colors hover:opacity-80"
                        >
                          {project.client}
                          <ExternalLink className="inline w-3 h-3 ml-1 opacity-60" />
                        </a>
                      ) : (
                        <span className="text-foreground/80">{project.client}</span>
                      )}
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
              <div className="flex-1 overflow-y-auto px-7 pb-7 space-y-6 modal-scroll">
                {/* Description */}
                <p className="text-foreground/80 leading-relaxed">{project.description}</p>

                {/* Key Insights */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3">
                    Key Insights
                  </h3>
                  <ul className="space-y-2.5">
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
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3">
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
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3">
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
                      {(project.type === 'mobile' ? [1, 2, 3, 4] : [1, 2, 3]).map((n) => (
                        <div
                          key={n}
                          className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground/20 bg-foreground/3 text-foreground/30"
                          style={{
                            width: project.type === 'mobile' ? '160px' : '260px',
                            height: project.type === 'mobile' ? '280px' : '160px',
                          }}
                        >
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-xs text-center px-3">Screenshot {n}</span>
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

              {/* Footer CTA buttons */}
              {hasCtaButtons && (
                <div className="px-7 py-5 border-t border-foreground/10 flex-shrink-0 flex flex-wrap gap-3">
                  {project.siteUrl && (
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
                      style={{ background: project.accentColor }}
                    >
                      <Monitor className="w-4 h-4" />
                      Visit Website
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  )}

                  {project.appStoreUrl && (
                    <a
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10"
                    >
                      <AppStoreIcon />
                      App Store
                      <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                  )}

                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10"
                    >
                      <PlayStoreIcon />
                      Play Store
                      <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
