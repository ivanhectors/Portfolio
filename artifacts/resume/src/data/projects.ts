export type ProjectType = 'mobile' | 'web';

export interface Project {
  id: string;
  title: string;
  client: string;
  /** URL of the client's website — shown as a hyperlink in the modal */
  clientUrl?: string;
  industry: string;
  type: ProjectType;
  description: string;
  keyInsights: string[];
  tags: string[];
  color: string;
  accentColor: string;
  images: string[]; // Replace with real screenshot paths, e.g. '/screenshots/project-1.png'
  /** Live website URL (opens in new tab) */
  siteUrl?: string;
  /** Apple App Store URL */
  appStoreUrl?: string;
  /** Google Play Store URL */
  playStoreUrl?: string;
  highlight: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'finvault',
    title: 'FinVault Mobile',
    client: 'FinServe Corp',
    industry: 'Fintech',
    type: 'mobile',
    description:
      'A wealth management app enabling institutional investors to monitor portfolios, execute trades, and receive AI-driven insights — all from their phone. Designed for speed and clarity under pressure.',
    keyInsights: [
      'Built real-time portfolio tracking with WebSocket feeds updating every 500ms without UI jank',
      'Implemented biometric auth with secure enclave storage for sensitive credentials',
      'Designed a custom charting system using React Native Skia for buttery-smooth 60fps graphs',
      'Reduced app cold-start time from 4.2s to 1.1s through code splitting and asset optimization',
      'Deployed to both iOS and Android with feature parity and zero platform-specific bugs at launch',
    ],
    tags: ['React Native', 'TypeScript', 'Skia', 'WebSockets', 'Biometrics'],
    color: 'from-blue-500/20 to-indigo-500/20',
    accentColor: '#3b82f6',
    images: [],
    highlight: true,
  },
  {
    id: 'lumina',
    title: 'Lumina Storefront',
    client: 'Lumina Beauty',
    industry: 'E-commerce',
    type: 'web',
    description:
      'A high-performance e-commerce flagship for a luxury beauty brand, featuring 3D product visualization, seamless Shopify integration, and editorial-grade page transitions that match their campaign aesthetics.',
    keyInsights: [
      'Built 3D product viewers with Three.js achieving <2s load on mobile with progressive LOD rendering',
      'Achieved 98 Lighthouse performance score on mobile via aggressive image optimization pipeline',
      'Integrated headless CMS with incremental static regeneration — zero-downtime content updates',
      'Cart-to-checkout conversion rate improved by 34% over the previous monolithic storefront',
      'Implemented a custom editorial layout engine for campaign pages without developer involvement',
    ],
    tags: ['Next.js', 'Three.js', 'Shopify', 'Framer Motion', 'Sanity'],
    color: 'from-rose-500/20 to-orange-500/20',
    accentColor: '#f43f5e',
    images: [],
    highlight: true,
  },
  {
    id: 'healthtrack',
    title: 'HealthTrack Pro',
    client: 'MediSync Health',
    industry: 'Healthcare',
    type: 'mobile',
    description:
      'A chronic disease management app for patients and care teams. Enables medication adherence tracking, symptom logging, and direct messaging with clinicians — with HIPAA-compliant data handling throughout.',
    keyInsights: [
      'Architected end-to-end encrypted messaging system compliant with HIPAA Safe Harbor standards',
      'Integrated with Apple HealthKit and Google Fit for passive health data ingestion',
      'Built an offline-first data layer with conflict resolution for low-connectivity clinic environments',
      'Care team dashboard reduced average patient check-in time from 12 minutes to 3 minutes',
      'Achieved 4.8-star App Store rating within 2 months of launch with 10,000+ active patients',
    ],
    tags: ['React Native', 'HIPAA', 'HealthKit', 'Offline-first', 'Encrypted'],
    color: 'from-emerald-500/20 to-teal-500/20',
    accentColor: '#10b981',
    images: [],
    highlight: true,
  },
  {
    id: 'orbit',
    title: 'Orbit Workspace',
    client: 'Acme SaaS',
    industry: 'SaaS',
    type: 'web',
    description:
      'A real-time collaborative document editor with multiplayer cursors, block-based rich text, and deep integrations with Slack, Notion, and GitHub — built to replace three separate tools in one unified workspace.',
    keyInsights: [
      'Implemented CRDT-based conflict resolution using Yjs, enabling true simultaneous editing without locks',
      'Built a plugin architecture allowing custom block types with zero core bundle impact',
      'WebSocket infrastructure supports 500+ concurrent collaborators per document at p99 < 80ms latency',
      'Reduced customer tool sprawl by 60% — average team replaced 3 separate SaaS subscriptions',
      'Full offline mode with background sync on reconnect, handling conflicts gracefully',
    ],
    tags: ['React', 'Yjs', 'ProseMirror', 'WebSockets', 'GraphQL'],
    color: 'from-violet-500/20 to-purple-500/20',
    accentColor: '#8b5cf6',
    images: [],
    highlight: true,
  },
  {
    id: 'velocity',
    title: 'Velocity EV',
    client: 'Velocity Motors',
    industry: 'Transportation',
    type: 'mobile',
    description:
      'Companion app for electric vehicle owners, providing real-time charging status, intelligent route planning with charging stops, remote climate control, and a community for EV enthusiasts.',
    keyInsights: [
      'Built Mapbox-powered route planner that accounts for battery SoC, elevation, and charger availability',
      'Real-time push notifications for charge completion, anomalies, and time-of-use pricing alerts',
      'Remote vehicle control (climate, lock/unlock) via BLE and over-the-air with <2s response time',
      'Community features (trip sharing, charger reviews) drove 40% DAU increase post-launch',
      'Designed adaptive UI that changes based on vehicle charge state — contextual, not cluttered',
    ],
    tags: ['React Native', 'Mapbox', 'BLE', 'GraphQL', 'Push Notifications'],
    color: 'from-cyan-500/20 to-sky-500/20',
    accentColor: '#06b6d4',
    images: [],
    highlight: true,
  },
  {
    id: 'nexus-crm',
    title: 'Nexus CRM',
    client: 'Nexus Ventures',
    industry: 'SaaS',
    type: 'web',
    description:
      'A deal-flow CRM purpose-built for venture capital firms — replacing spreadsheets with a clean pipeline view, portfolio analytics, founder communication hub, and LP reporting automation.',
    keyInsights: [
      'Kanban pipeline with drag-and-drop across 7 deal stages, supporting 300+ concurrent deals per fund',
      'Automated LP report generation reduced quarterly reporting time from 3 days to 2 hours',
      'Email threading and CRM sync integrated with Gmail and Outlook via OAuth',
      'Custom analytics module surfaces pattern-matched deal signals from historical fund data',
      'Role-based access control supporting GP, partner, and analyst permission tiers',
    ],
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Recharts', 'OAuth'],
    color: 'from-amber-500/20 to-yellow-500/20',
    accentColor: '#f59e0b',
    images: [],
    highlight: true,
  },
  {
    id: 'fieldops',
    title: 'FieldOps Mobile',
    client: 'BuildRight Construction',
    industry: 'Construction',
    type: 'mobile',
    description:
      'A field operations app for construction project managers — digitizing site inspections, punch lists, material tracking, and subcontractor coordination for large commercial builds.',
    keyInsights: [
      'Offline-capable forms and photo capture work in basements and remote sites without connectivity',
      'AI-powered defect tagging suggests issue categories from site photos reducing logging time by 70%',
      'Deep-linked push notifications route field crew directly to specific punch list items',
      'Replaced a paper-based system, cutting inspection-to-report turnaround from 3 days to 4 hours',
    ],
    tags: ['React Native', 'SQLite', 'Camera', 'Push', 'Offline-first'],
    color: 'from-orange-500/20 to-red-500/20',
    accentColor: '#f97316',
    images: [],
    highlight: false,
  },
  {
    id: 'agri-sense',
    title: 'AgriSense Dashboard',
    client: 'GreenField Tech',
    industry: 'Agriculture',
    type: 'web',
    description:
      'A precision agriculture platform that aggregates drone imagery, soil sensor data, and weather forecasts into a unified dashboard — giving farm managers actionable crop health insights.',
    keyInsights: [
      'Rendered 50M+ data points from IoT sensors using WebGL-accelerated mapping with Deck.gl',
      'ML-driven crop health scoring model achieved 89% accuracy vs. manual scouting',
      'Alert system notifies farmers of anomalies (pest pressure, irrigation failure) within 15 minutes',
      'Custom tile server for drone orthomosaic imagery handles 200GB+ per farm season',
    ],
    tags: ['React', 'Deck.gl', 'MapboxGL', 'Python', 'PostgreSQL'],
    color: 'from-lime-500/20 to-green-500/20',
    accentColor: '#84cc16',
    images: [],
    highlight: false,
  },
];

export const HIGHLIGHT_PROJECTS = PROJECTS.filter((p) => p.highlight);

export const ALL_INDUSTRIES = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.industry))).sort()];
