"use client";

import { useEffect } from "react";

/**
 * Homepage scroll storytelling. GSAP is loaded lazily and every tween/ScrollTrigger lives inside
 * a gsap.matchMedia context, so it is reverted on unmount and skipped for reduced motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function start() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;

          // 1 · Hero: slow background scale + content drifting up as the hero leaves.
          const hero = document.querySelector<HTMLElement>("[data-hero]");
          const heroImage = hero?.querySelector<HTMLElement>("[data-hero-image]");
          const heroContent = hero?.querySelector<HTMLElement>("[data-hero-content]");
          if (hero && heroImage) {
            gsap.fromTo(
              heroImage,
              { scale: 1.08 },
              { scale: 1, duration: 2.2, ease: "power2.out" },
            );
            gsap.to(heroImage, {
              yPercent: desktop ? 12 : 6,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
            if (heroContent && desktop) {
              gsap.to(heroContent, {
                y: -60,
                opacity: 0.2,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
              });
            }
          }

          // 2 · Word-by-word statement reveal.
          for (const group of document.querySelectorAll<HTMLElement>("[data-split-reveal]")) {
            gsap.fromTo(
              group.querySelectorAll("[data-split-word]"),
              { opacity: 0.12, y: 14 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.06,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: group, start: "top 82%", once: true },
              },
            );
          }

          // 3 · Ingredient photograph opens up like a curtain.
          for (const block of document.querySelectorAll<HTMLElement>("[data-clip-reveal]")) {
            gsap.fromTo(
              block,
              { clipPath: desktop ? "inset(8% 6% 8% 6% round 16px)" : "inset(4% 3% round 12px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 12px)",
                ease: "none",
                scrollTrigger: { trigger: block, start: "top 90%", end: "top 35%", scrub: 0.5 },
              },
            );
          }

          // 4 · Subtle image reveal (scale settles) — once only.
          for (const image of document.querySelectorAll<HTMLElement>("[data-image-reveal]")) {
            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.3,
                ease: "power2.out",
                scrollTrigger: { trigger: image, start: "top 88%", once: true },
              },
            );
          }

          if (!desktop) return;

          // Hero product card floats up slightly faster than the background.
          const heroProduct = hero?.querySelector<HTMLElement>("[data-hero-product]");
          if (hero && heroProduct) {
            gsap.to(heroProduct, {
              y: -70,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
          }

          // 5 · Desktop only: parallax photography + drifting giant wordmarks.
          for (const image of document.querySelectorAll<HTMLElement>("[data-parallax]")) {
            gsap.fromTo(
              image,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
          for (const word of document.querySelectorAll<HTMLElement>("[data-drift]")) {
            gsap.fromTo(
              word,
              { xPercent: 4 },
              {
                xPercent: -12,
                ease: "none",
                scrollTrigger: {
                  trigger: word.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        },
      );
      cleanup = () => mm.revert();
    }

    void start();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
