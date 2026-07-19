import { motion } from 'framer-motion';

interface Client {
  name: string;
  /** Path to logo image, e.g. '/logos/google.svg'. Leave empty to show text monogram. */
  logo?: string;
  /** Accent color for the monogram background when no logo is provided */
  color: string;
}

const CLIENTS: Client[] = [
  { name: 'FinServe Corp',        color: '#3b82f6' },
  { name: 'Lumina Beauty',        color: '#f43f5e' },
  { name: 'MediSync Health',      color: '#10b981' },
  { name: 'Acme SaaS',            color: '#8b5cf6' },
  { name: 'Velocity Motors',      color: '#06b6d4' },
  { name: 'Nexus Ventures',       color: '#f59e0b' },
  { name: 'BuildRight',           color: '#f97316' },
  { name: 'GreenField Tech',      color: '#84cc16' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Clients() {
  return (
    <section className="py-20 px-4 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3">
            Trusted by
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground/80">
            Brands I've worked with
          </h2>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-panel rounded-2xl px-5 py-5 flex flex-col items-center gap-3 h-full">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 w-auto object-contain opacity-70 dark:opacity-60 dark:invert"
                  />
                ) : (
                  /* Monogram placeholder — replace with a real logo by adding logo: '/logos/client.svg' */
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold tracking-wide flex-shrink-0"
                    style={{ background: `${client.color}30`, color: client.color, border: `1px solid ${client.color}25` }}
                  >
                    {initials(client.name)}
                  </div>
                )}
                <span className="text-xs font-medium text-foreground/60 text-center leading-snug">
                  {client.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle divider */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </div>
    </section>
  );
}
