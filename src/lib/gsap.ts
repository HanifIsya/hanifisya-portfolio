"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

/**
 * Shared GSAP registration.
 *
 * SplitText and ScrollTrigger are both bundled with GSAP 3.13+ (SplitText
 * became free in 3.13), so no Club membership is required.
 *
 * Registration must happen once, client-side, before any GSAP code runs.
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  registered = true;
}

/** Easing tokens mirroring DESIGN.md §8.1 */
export const EASE = {
  expo: "expo.out",
  quart: "power4.out",
  quint: "power3.inOut",
  spring: "back.out(1.7)",
} as const;

/** Duration tokens mirroring DESIGN.md §8.2 */
export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * `useGSAP` with the shared registration applied and a scope ref.
 *
 * @param setup        the animation setup function
 * @param scope        a ref to the container the animations are scoped to
 * @param dependencies re-runs the setup when these change (default: once)
 */
export function useGsap(
  setup: () => void,
  scope?: React.RefObject<HTMLElement | null>,
  dependencies: unknown[] = [],
) {
  registerGsap();
  return useGSAP(setup, { scope, dependencies });
}

/**
 * A scroll-reactive pointer follower for magnetic elements.
 *
 * Uses `gsap.quickTo` so each frame only writes a single transform value
 * instead of allocating a new tween — this is the cheap path for
 * high-frequency pointer effects.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.35,
  ref?: React.RefObject<T | null>,
) {
  registerGsap();
  const internal = useRef<T>(null);
  const target = (ref ?? internal) as React.RefObject<T | null>;

  useGSAP(
    () => {
      const el = target.current;
      if (!el || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: EASE.quart });
      const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: EASE.quart });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: target },
  );

  return target;
}
