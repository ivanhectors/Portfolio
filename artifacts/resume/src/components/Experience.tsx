import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';

interface RoleEntry {
  title: string;
  period: string;
  description: string;
}

interface ExperienceEntry {
  company: string;
  companyUrl?: string;
  current?: boolean;
  roles: RoleEntry[];
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Nexus Studio',
    companyUrl: 'https://example.com/nexus',
    current: true,
    roles: [
      {
        title: 'Senior Frontend Engineer',
        period: '2022 — Present',
        description:
          'Lead frontend architecture for high-profile client projects. Mentor junior engineers, establish design systems, and reduced initial load times across the portfolio by 40%.',
      },
      {
        title: 'Frontend Engineer',
        period: '2021 — 2022',
        description:
          'Shipped pixel-perfect UI components and led migration from a legacy CRA setup to Vite, cutting build times from 90s to 8s and dramatically improving DX across the team.',
      },
    ],
  },
  {
    company: 'Fintech Innovations',
    companyUrl: 'https://example.com/fintech',
    roles: [
      {
        title: 'UI Engineer',
        period: '2019 — 2021',
        description:
          'Built complex data visualization dashboards for institutional investors and led a sweeping redesign of the core web platform, collaborating directly with product and design.',
      },
      {
        title: 'Junior UI Developer',
        period: '2018 — 2019',
        description:
          'Implemented component library from Figma specs, maintained cross-browser compatibility, and contributed to an internal accessibility audit that improved WCAG compliance to AA level.',
      },
    ],
  },
  {
    company: 'Creative Agency Co.',
    companyUrl: 'https://example.com/creative',
    roles: [
      {
        title: 'Frontend Developer',
        period: '2016 — 2018',
        description:
          'Developed interactive marketing sites and digital campaigns for global brands. Specialized in WebGL shaders and advanced CSS animations that pushed creative boundaries.',
      },
    ],
  },
];

function CompanyCard({ exp, index }: { exp: ExperienceEntry; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const hasMultipleRoles = exp.roles.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline dot */}
      <div className="absolute w-3 h-3 bg-foreground rounded-full -left-[43px] md:-left-[38px] top-6 border-2 border-background" />

      <div className="glass-panel rounded-2xl overflow-hidden">
        {/* Company header */}
        <button
          onClick={() => hasMultipleRoles && setExpanded((v) => !v)}
          className={`w-full text-left px-6 md:px-8 pt-6 pb-5 flex items-start justify-between gap-4 ${
            hasMultipleRoles ? 'cursor-pointer group' : 'cursor-default'
          }`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xl font-bold hover:underline underline-offset-2 transition-colors hover:opacity-80"
                >
                  {exp.company}
                </a>
              ) : (
                <span className="text-xl font-bold">{exp.company}</span>
              )}
              {exp.current && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Current
                </span>
              )}
            </div>
            <p className="text-sm text-foreground/50">
              {exp.roles[0].period.split('—')[0].trim()} —{' '}
              {exp.roles[exp.roles.length - 1].period.split('—').at(-1)?.trim()}
              {hasMultipleRoles && (
                <span className="ml-2 inline-flex items-center gap-1 text-foreground/40">
                  <TrendingUp className="w-3 h-3" />
                  {exp.roles.length} roles
                </span>
              )}
            </p>
          </div>

          {hasMultipleRoles && (
            <div className="flex-shrink-0 mt-1">
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-1.5 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-foreground/50" />
              </motion.div>
            </div>
          )}
        </button>

        {/* Roles */}
        <AnimatePresence initial={false}>
          {(expanded || !hasMultipleRoles) && (
            <motion.div
              key="roles"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 space-y-0">
                {exp.roles.map((role, ri) => (
                  <div key={ri} className="relative">
                    {/* Connector line between roles */}
                    {ri < exp.roles.length - 1 && (
                      <div className="absolute left-[7px] top-8 bottom-0 w-px bg-foreground/10" />
                    )}
                    <div className="flex gap-4 py-4">
                      {/* Role indicator dot */}
                      <div className="relative flex-shrink-0 mt-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-2 border-foreground/30 bg-background"
                          style={ri === 0 ? { borderColor: 'hsl(var(--foreground) / 0.7)', background: 'hsl(var(--foreground) / 0.15)' } : {}}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h3 className={`font-semibold leading-tight ${ri === 0 ? 'text-base' : 'text-sm text-foreground/80'}`}>
                            {role.title}
                            {ri === 0 && hasMultipleRoles && (
                              <span className="ml-2 text-[10px] font-normal uppercase tracking-wider text-foreground/40">
                                Latest
                              </span>
                            )}
                          </h3>
                          <span className="inline-block px-2.5 py-0.5 rounded-full glass-panel text-xs font-medium whitespace-nowrap self-start text-foreground/60">
                            {role.period}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl font-bold tracking-tight mb-12"
        >
          Experience
        </motion.h2>

        <div className="relative border-l border-foreground/10 ml-4 md:ml-0 md:pl-8 space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <CompanyCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
