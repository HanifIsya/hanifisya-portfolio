/**
 * Site identity & navigation.
 *
 * Every value marked `TODO` is a placeholder for the owner to edit.
 * Everything else is derived from verified GitHub API data.
 */

export const site = {
  name: "Hanif Isya Annafi",
  shortName: "Hanif",
  role: "Full-stack & AI Engineer", // TODO
  tagline:
    "I build AI extraction pipelines, safety-critical systems, and production web platforms.", // TODO
  bio: "Full-stack and AI engineer building systems where the model, the database, and the interface all have to hold up at the same time.", // TODO
  location: "Surabaya, Indonesia", // TODO
  email: "hanifisya.annafi02@gmail.com", // TODO
  availability: "Open to new opportunities", // TODO

  github: {
    handle: "HanifIsya",
    url: "https://github.com/HanifIsya",
    avatar: "/avatar.png",
  },

  // TODO: replace with your real handles
  socials: [
    { label: "GitHub", handle: "@HanifIsya", href: "https://github.com/HanifIsya" },
    { label: "Email", handle: "hanifisya.annafi02@gmail.com", href: "mailto:hanifisya.annafi02@gmail.com" },
  ],
} as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "github", label: "GitHub" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type NavItem = (typeof nav)[number];
