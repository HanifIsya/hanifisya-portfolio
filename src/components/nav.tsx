"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { nav, site } from "@/data/site";
import { useGsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { GitHub } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const barRef = useRef<HTMLElement>(null);

  // Shrink + blur in once the user leaves the hero.
  useGsap(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Section-aware active state.
      let current = "";
      for (const item of nav) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.4) {
          current = item.id;
          break;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, barRef);

  // Entrance: the bar fades in after the hero headline has landed.
  useGsap(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (prefersReducedMotion()) {
      gsap.set(bar, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      bar,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.9, delay: 1.1, ease: EASE.expo },
    );
  }, barRef);

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
    >
      <nav
        className={[
          "flex w-full max-w-[1200px] items-center justify-between rounded-full border transition-all duration-500 ease-expo",
          scrolled
            ? "border-white/12 bg-black/70 py-2 pl-5 pr-2 shadow-[0_1px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent py-2.5 pl-5 pr-2.5",
        ].join(" ")}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-paper"
          aria-label={`${site.name} — back to top`}
        >
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white text-[11px] font-semibold text-black">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              HI
            </span>
            <span className="absolute inset-0 translate-y-full bg-blue transition-transform duration-500 ease-expo group-hover:translate-y-0" />
          </span>
          <span className="text-telemetry hidden text-paper/90 sm:inline">
            {site.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  "relative block rounded-full px-3.5 py-1.5 text-telemetry transition-colors duration-300",
                  active === item.id
                    ? "text-white"
                    : scrolled
                      ? "text-white/55 hover:text-white"
                      : "text-ink-3 hover:text-paper",
                ].join(" ")}
              >
                {active === item.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/10" />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-ink transition-all duration-500 ease-expo hover:bg-blue sm:flex"
          >
            <GitHub className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:scale-110" />
            <span className="text-telemetry">GitHub</span>
          </a>
          <MobileMenu siteUrl={site.github.url} />
        </div>
      </nav>
    </header>
  );
}
