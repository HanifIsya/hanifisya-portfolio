import type { Project } from "@/data/projects";

/**
 * Derive a distinctive 2-letter monogram.
 *
 * `TemplaFill` → TF, `temuUNAIR` → TU, `SiBeni` → SB,
 * `find_gas_station` → FG, `market_core` → MC.
 */
function monogram(name: string): string {
  // Drop trailing version suffixes: temuUNAIR-v2 → temuUNAIR
  const cleaned = name.replace(/[-_]v\d+$/i, "");
  const words = cleaned.split(/[_\s-]+/).filter(Boolean);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  // Single token: first char + first following capital, else second char.
  const letters = cleaned.replace(/[^a-zA-Z]/g, "");
  const second = letters.slice(1).match(/[A-Z]/);
  return (letters[0] + (second ? second[0] : (letters[1] ?? ""))).toUpperCase();
}

/**
 * Generated project artwork.
 *
 * No stock imagery, no placeholders — each project's visual identity is
 * derived from its own name and accent hue, rendered as pure CSS + SVG so
 * it stays crisp at any size and costs zero bytes of image payload.
 *
 * Shared by the bento grid (dark) and the pinned track (light).
 */
export function ProjectArtwork({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        // Layered stops keep colour saturated to the edges instead of
        // fading to the card's grey surface.
        background: `linear-gradient(145deg, hsl(${project.hue} 72% 46%) 0%, hsl(${project.hue} 68% 30%) 48%, hsl(${project.hue} 64% 18%) 100%)`,
      }}
    >
      {/* Contour lines — a technical, architectural feel */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.22]"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <path
            key={i}
            d={`M -20 ${40 + i * 26} C 90 ${20 + i * 26}, 180 ${70 + i * 26}, 420 ${30 + i * 26}`}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.75"
          />
        ))}
      </svg>

      {/* Grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        aria-hidden
      >
        <defs>
          <pattern
            id={`grid-${project.name}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.name})`} />
      </svg>

      {/* Soft light bloom in the upper-left */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 70% at 18% 8%, hsla(${project.hue}, 100%, 72%, 0.45) 0%, transparent 62%)`,
        }}
      />

      {/* Big monogram */}
      <span
        className="absolute -bottom-7 right-3 font-mono text-[7rem] font-bold leading-none text-white/14 select-none"
        aria-hidden
      >
        {monogram(project.name)}
      </span>

      {/* Gloss */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_45%)]" />
    </div>
  );
}
