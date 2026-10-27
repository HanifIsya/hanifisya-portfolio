/**
 * Project data — VERIFIED against the GitHub REST API.
 *
 * Contribution counts come from `/repos/{owner}/{repo}/contributors`.
 * Repos where HanifIsya has zero commits are intentionally absent
 * (see PLAN.md §2.1 for the exclusion list and the reason).
 *
 * Ordering is deliberate: flagship AI/ML work leads, then platform
 * work, then the Laravel/Flutter cluster.
 */

export type Project = {
  /** Repo name as it appears on GitHub */
  name: string;
  /** Display title */
  title: string;
  /** One-line positioning statement */
  tagline: string;
  /** 2–3 sentence description of what it does and why it matters */
  description: string;
  /** Owner's commits to this repo */
  commits: number;
  /** Total commits in the repo */
  totalCommits: number;
  /** True when the owner is the only contributor */
  solo: boolean;
  /** Primary domain of the project */
  domain: "AI / ML" | "Platform" | "Data" | "Mobile" | "Web" | "Marketplace";
  /** Technology stack */
  stack: string[];
  /** Highlighted metrics — real, not invented */
  metrics: { label: string; value: string }[];
  /** GitHub URL */
  repo: string;
  /** Live URL when deployed */
  live?: string;
  /** Accent hue for the generated artwork (deg on the blue channel) */
  hue: number;
  /** Layout size in the bento grid */
  span: "wide" | "tall" | "normal";
};

export const projects: Project[] = [
  {
    name: "TemplaFill",
    title: "TemplaFill",
    tagline: "AI document engine that fills your templates — perfectly.",
    description:
      "Extracts structured fields from unstructured PDFs using Retrieval-Augmented Generation and Gemini 3.6 Flash, then populates Word, Excel, and PowerPoint templates while preserving 100% of the original formatting. A deterministic heuristic fallback keeps the pipeline alive when the model is unavailable, and an account tier routes to DeepSeek with zero Google calls.",
    commits: 82,
    totalCommits: 82,
    solo: true,
    domain: "AI / ML",
    stack: ["FastAPI", "Next.js 16", "Gemini", "DeepSeek", "RAG", "Docker", "Postgres"],
    metrics: [
      { label: "Tests", value: "286" },
      { label: "Eval F1", value: "1.00" },
      { label: "Formats", value: "3" },
    ],
    repo: "https://github.com/HanifIsya/TemplaFill",
    hue: 212,
    span: "wide",
  },
  {
    name: "temuUNAIR-v2",
    title: "TemuUNAIR",
    tagline: "Lost today, found together — AI matching for campus.",
    description:
      "A lost-and-found platform for Universitas Airlangga that matches items across text, photo, location, and time. Built as a Turborepo + pnpm monorepo with a nine-domain documentation system, twenty-five numbered backend and frontend contracts, and an ML matching pipeline — documents and contracts are written before a line of implementation.",
    commits: 37,
    totalCommits: 37,
    solo: true,
    domain: "AI / ML",
    stack: ["TypeScript", "Next.js", "Python", "Turborepo", "Postgres", "Docker"],
    metrics: [
      { label: "Doc domains", value: "9" },
      { label: "Contracts", value: "25" },
      { label: "Monorepo", value: "5 apps" },
    ],
    repo: "https://github.com/HanifIsya/temuUNAIR-v2",
    hue: 199,
    span: "tall",
  },
  {
    name: "SiBeni",
    title: "SiBeni",
    tagline: "Safety-first operations for the mining industry.",
    description:
      "Siaga Bencana Dini — an integrated occupational health and safety system for PT Consnet Mining, connecting field workers in the open pit, on haul roads, and in the workshop with HSE, Supervisors, and Executive Management. Works in real time and offline. Ships with a PRD, an implementation roadmap, and a v3.0 design system with a four-level K3 risk taxonomy.",
    commits: 22,
    totalCommits: 22,
    solo: true,
    domain: "Mobile",
    stack: ["Flutter 3", "Next.js", "Supabase", "Postgres", "Auth", "Offline-First"],
    metrics: [
      { label: "Risk levels", value: "4" },
      { label: "Design system", value: "v3.0" },
      { label: "Offline", value: "Yes" },
    ],
    repo: "https://github.com/HanifIsya/SiBeni",
    hue: 174,
    span: "wide",
  },
  {
    name: "IdentraStudio",
    title: "IdentraStudio",
    tagline: "A service marketplace, built end to end.",
    description:
      "A Laravel platform for a creative studio — full authentication, a service catalogue with admin CRUD, payment processing, real-time chat, asset management, and complete transaction history. A Flutter mobile companion brings the same catalogue to handheld devices.",
    commits: 12,
    totalCommits: 27,
    solo: false,
    domain: "Marketplace",
    stack: ["Laravel", "Blade", "Tailwind", "Payments", "Chat", "Flutter"],
    metrics: [
      { label: "Modules", value: "8" },
      { label: "Roles", value: "2" },
      { label: "Chat", value: "Realtime" },
    ],
    repo: "https://github.com/HanifIsya/IdentraStudio",
    hue: 258,
    span: "normal",
  },
  {
    name: "Porto-Fifi",
    title: "Porto-Fifi",
    tagline: "A portfolio with a Three.js hero and a Supabase admin panel.",
    description:
      "A production-grade portfolio site: Next.js 16 App Router, React 19, Tailwind 4, and a Three.js / React-Three-Fiber hero with soft blobs and grain particles, plus Framer Motion reveals and staggered counters. Supabase Auth with row-level security backs a full admin panel where every section of the site is editable without touching code.",
    commits: 11,
    totalCommits: 11,
    solo: true,
    domain: "Web",
    stack: ["Next.js 16", "React 19", "Tailwind 4", "Three.js", "Framer Motion", "Supabase"],
    metrics: [
      { label: "Admin", value: "Full CRUD" },
      { label: "RLS", value: "Yes" },
      { label: "3D", value: "R3F" },
    ],
    repo: "https://github.com/HanifIsya/Porto-Fifi",
    live: "https://porto-fifi.vercel.app",
    hue: 286,
    span: "normal",
  },
  {
    name: "IdentraStudio-Mobile",
    title: "IdentraStudio Mobile",
    tagline: "The studio's marketplace, in your pocket.",
    description:
      "A Flutter client paired with a purpose-built Laravel API. The backend models the full marketplace domain — chat and messages, offers, orders, projects and project files, services, and transactions — exposed through a clean REST surface for the app to consume.",
    commits: 8,
    totalCommits: 8,
    solo: true,
    domain: "Mobile",
    stack: ["Flutter", "Dart", "Laravel", "REST API", "Chat", "Orders"],
    metrics: [
      { label: "Models", value: "8" },
      { label: "Platforms", value: "2" },
      { label: "Role", value: "Solo" },
    ],
    repo: "https://github.com/HanifIsya/IdentraStudio-Mobile",
    hue: 225,
    span: "normal",
  },
  {
    name: "Porto-Nura",
    title: "Porto-Nura",
    tagline: "A Laravel portfolio with a slide-driven hero.",
    description:
      "A portfolio platform built on Laravel and Blade with a Tailwind and Vite asset pipeline. Hero slides, education, experience, and site settings are all database-driven models, so the content is managed from the database rather than the codebase.",
    commits: 8,
    totalCommits: 10,
    solo: true,
    domain: "Web",
    stack: ["Laravel", "Blade", "Tailwind", "Vite", "MySQL", "Auth"],
    metrics: [
      { label: "Models", value: "5" },
      { label: "Assets", value: "Vite" },
      { label: "Role", value: "Primary" },
    ],
    repo: "https://github.com/HanifIsya/Porto-Nura",
    hue: 32,
    span: "normal",
  },
  {
    name: "bacaloka",
    title: "Bacaloka",
    tagline: "A digital library with a real circulation workflow.",
    description:
      "Perpustakaan Digital — a Laravel application for managing a library: book records, member management, and the return process, each with its own controller and role-aware dashboard. The admin and member experiences are separated rather than bolted together.",
    commits: 8,
    totalCommits: 8,
    solo: true,
    domain: "Web",
    stack: ["Laravel", "Blade", "PHP", "MySQL", "Roles", "Admin"],
    metrics: [
      { label: "Modules", value: "3" },
      { label: "Roles", value: "2" },
      { label: "Role", value: "Solo" },
    ],
    repo: "https://github.com/HanifIsya/bacaloka",
    hue: 145,
    span: "normal",
  },
  {
    name: "find_gas_station",
    title: "find_gas_station",
    tagline: "SPBU finder — a Laravel API and a Flutter app.",
    description:
      "A two-part project: a Laravel backend exposing a REST API over gas-station records, and a Flutter front end consuming it. The separation keeps the mobile client independent of the server implementation and makes the API reusable by any client.",
    commits: 6,
    totalCommits: 6,
    solo: true,
    domain: "Mobile",
    stack: ["Laravel", "REST API", "Flutter", "Dart", "MySQL"],
    metrics: [
      { label: "Clients", value: "2" },
      { label: "API", value: "REST" },
      { label: "Role", value: "Solo" },
    ],
    repo: "https://github.com/HanifIsya/find_gas_station",
    hue: 48,
    span: "normal",
  },
  {
    name: "market_core",
    title: "market_core",
    tagline: "A multi-vendor marketplace with real role separation.",
    description:
      "A Laravel marketplace where buyers and sellers get genuinely different tools — separate product and order controllers per role, plus a cart and checkout flow. The seller experience is first-class, not an afterthought bolted onto the buyer flow.",
    commits: 4,
    totalCommits: 4,
    solo: true,
    domain: "Marketplace",
    stack: ["Laravel", "Blade", "PHP", "MySQL", "Cart", "Roles"],
    metrics: [
      { label: "Roles", value: "2" },
      { label: "Flows", value: "4" },
      { label: "Role", value: "Solo" },
    ],
    repo: "https://github.com/HanifIsya/market_core",
    hue: 12,
    span: "normal",
  },
];

/** The three flagship projects, shown in the pinned horizontal track. */
export const featured = [projects[0], projects[1], projects[2]];

/** Repo where the owner is the sole contributor in a shared organisation. */
export const teamCredits = [
  {
    name: "SimLog",
    org: "AgilePemdigi-2026",
    commits: 7,
    repo: "https://github.com/AgilePemdigi-2026/SimLog",
    note: "TypeScript project contributed to as the sole author.",
  },
];

/**
 * Aggregate stats.
 *
 * `commits` = 205, counted from the GitHub REST API across the default
 * branch of all eleven credited repositories (see PLAN.md §2.2).
 *   10 featured repos → 198  +  SimLog → 7
 */
export const stats = {
  projects: projects.length + teamCredits.length,
  commits:
    projects.reduce((sum, p) => sum + p.commits, 0) +
    teamCredits.reduce((s, c) => s + c.commits, 0),
  soloRepos: projects.filter((p) => p.solo).length,
  languages: 8,
  tests: 286,
};
