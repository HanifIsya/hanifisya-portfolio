"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { nav } from "@/data/site";
import { useGsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight, GitHub } from "@/components/icons";

/**
 * Mobile navigation.
 *
 * The desktop nav collapses to a floating pill bar on small screens. This
 * sheet slides up from the bottom with a full-screen backdrop, and locks
 * body scroll while open.
 *
 * It is rendered through a portal so that `position: fixed` resolves
 * against the viewport rather than the nav's flex container.
 */
export function MobileMenu({ siteUrl }: { siteUrl: string }) {
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGsap(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (prefersReducedMotion()) {
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(panel, { y: "0%" });
      gsap.set("[data-menu='item']", { opacity: 1, y: 0 });
      return;
    }

    gsap
      .timeline()
      .fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: EASE.quart },
      )
      .fromTo(
        panel,
        { y: "108%" },
        { y: "0%", duration: 0.65, ease: EASE.expo },
        "<0.05",
      )
      .fromTo(
        "[data-menu='item']",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: EASE.expo,
          stagger: 0.055,
        },
        "<0.15",
      );
  }, panelRef, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-paper backdrop-blur-sm transition-colors duration-500 hover:bg-white/10 md:hidden"
      >
        <span className="flex flex-col items-center gap-[5px]">
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </span>
      </button>

      {/* Sheet */}
      {open &&
        createPortal(
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[70] flex items-end bg-black/60 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          >
            <div
              ref={panelRef}
              className="w-full rounded-t-[36px] border-t border-white/12 bg-black/95 pb-8 pt-6 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex max-w-[520px] flex-col px-6">
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-telemetry text-ink-3">Index</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-ink-2 transition-colors duration-500 hover:bg-white/10 hover:text-paper"
                  >
                    <span className="relative block h-3.5 w-3.5">
                      <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                      <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
                    </span>
                  </button>
                </div>

                <ul className="flex flex-col">
                  {nav.map((item, i) => (
                    <li key={item.id} data-menu="item">
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between border-b border-white/8 py-4"
                      >
                        <span className="text-utility text-paper transition-colors duration-300 group-hover:text-blue-lite">
                          {item.label}
                        </span>
                        <span className="text-telemetry text-ink-3">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-menu="item"
                  className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-blue px-6 py-3.5 text-control text-white"
                >
                  <GitHub className="h-4 w-4" />
                  GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
