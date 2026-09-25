"use client";

import { Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/language";

/**
 * Slim brand strip under the hero. The track holds the phrases four times (wide enough for large screens) and GSAP slides it by
 * half its width in a loop, so the seam is invisible. It pauses while off-screen and stays
 * still for reduced-motion users.
 */
export function Marquee() {
  const { dict } = useLanguage();
  const track = useRef<HTMLDivElement>(null);
  const items = dict.home.marquee;

  useEffect(() => {
    const element = track.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.to(element, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });
      cleanup = () => {
        trigger.kill();
        tween.kill();
        gsap.set(element, { clearProps: "transform" });
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // Restart with the new phrases when the language changes.
  }, [items]);

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-serif text-lg whitespace-nowrap sm:px-8 sm:text-xl">
            {item}
          </span>
          <Sparkle size={14} strokeWidth={1.5} className="text-light-gold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={items.join(" · ")}
      className="bg-burgundy text-ivory border-light-gold/20 relative overflow-hidden border-y py-3.5"
    >
      <div ref={track} className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </section>
  );
}
