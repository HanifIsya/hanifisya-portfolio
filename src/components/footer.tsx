import { site, nav } from "@/data/site";
import { ArrowUpRight, GitHub } from "@/components/icons";

/**
 * The copyright year is cached so the page can stay fully static.
 * Under Next.js 16 Cache Components, an uncached `new Date()` would force
 * the route out of prerender.
 */
async function getYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="relative border-t border-white/10 bg-black py-14 text-paper">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Identity */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
                HI
              </span>
              <span className="text-control">{site.name}</span>
            </div>
            <p className="mt-4 text-control leading-relaxed text-ink-3">
              {site.role}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <span className="text-telemetry text-ink-3">Index</span>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-control text-ink-2 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <span className="text-telemetry text-ink-3">Elsewhere</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-control text-ink-2 transition-colors duration-300 hover:text-paper"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Base line */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-telemetry text-ink-3">
            © {year} {site.name}
          </span>
          <div className="flex items-center gap-6">
            <span className="text-telemetry text-ink-3">
              Built with Next.js · GSAP
            </span>
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-telemetry text-ink-3 transition-colors duration-300 hover:text-paper"
            >
              <GitHub className="h-3.5 w-3.5" />
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
