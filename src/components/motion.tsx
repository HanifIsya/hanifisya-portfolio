"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGsap, EASE, DURATION, prefersReducedMotion } from "@/lib/gsap";

/**
 * Generic scroll reveal.
 *
 * Wraps children in a container that animates in once it enters the
 * viewport. Children marked with `data-reveal-child` are staggered.
 */
export function Reveal({
  children,
  className = "",
  y = 36,
  delay = 0,
  stagger = 0.08,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const children = el.querySelectorAll("[data-reveal-child]");
    const targets = children.length ? children : [el];

    gsap.set(targets, { opacity: 0, y });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: DURATION.slow,
      delay,
      stagger,
      ease: EASE.expo,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, ref);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Split-text heading.
 *
 * Each line is masked and slides up from beneath the mask — the classic
 * cinematic reveal. Uses `SplitText` with `mask: "lines"` so the mask
 * wrappers are created for us.
 */
export function SplitHeading({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGsap(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const split = new SplitText(el, {
      type: "lines",
      mask: "lines",
      linesClass: "gsap-split-line",
      autoSplit: true,
    });

    const ctx = gsap.context(() => {
      gsap.set(split.lines, { yPercent: 110 });
      gsap.to(split.lines, {
        yPercent: 0,
        duration: 1.1,
        delay,
        ease: "expo.out",
        stagger: 0.09,
      });
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, ref);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
