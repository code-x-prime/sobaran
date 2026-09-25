"use client";

import Link from "next/link";
import {
  ArrowRight,
  Blend,
  Droplets,
  Package,
  ScanSearch,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language";

const defaultIcons = [Sprout, Droplets, Blend, ScanSearch, Package];

type TimelineCopy = {
  eyebrow: string;
  title: string;
  body: string;
  link?: string;
  steps: { title: string; body: string }[];
};

/**
 * Scroll-driven process timeline. Defaults to the homepage copy; pages can pass their own
 * steps and icons (the Quality page uses six). Horizontal from `lg`, vertical below.
 */
export function QualityTimeline({
  copy: override,
  icons = defaultIcons,
  className = "bg-cream",
}: {
  copy?: TimelineCopy;
  icons?: LucideIcon[];
  className?: string;
}) {
  const { dict } = useLanguage();
  const copy: TimelineCopy = override ?? dict.home.quality;
  const steps = copy.steps;
  const listRef = useRef<HTMLOListElement>(null);
  const lineX = useRef<HTMLSpanElement>(null);
  const lineY = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const count = steps.length;
  // The horizontal line runs between the centres of the first and last columns.
  const inset = `${50 / count}%`;

  // GSAP ScrollTrigger drives the gold progress line and the active step together.
  useEffect(() => {
    const list = listRef.current;
    const lines = [lineX.current, lineY.current].filter(Boolean) as HTMLElement[];
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((line) => (line.style.transform = "none"));
      setShown(count - 1);
      return;
    }
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(lineX.current, { scaleX: 0 });
      gsap.set(lineY.current, { scaleY: 0 });
      const trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 85%",
        end: "bottom 50%",
        scrub: 0.4,
        onUpdate: ({ progress }) => {
          gsap.to(lineX.current, { scaleX: progress, duration: 0.25, overwrite: true });
          gsap.to(lineY.current, { scaleY: progress, duration: 0.25, overwrite: true });
          setShown(Math.min(count - 1, Math.floor(progress * count)));
        },
      });
      cleanup = () => {
        trigger.kill();
        gsap.killTweensOf(lines);
      };
    })();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [count]);

  return (
    <section className={`${className} relative overflow-hidden py-16 md:py-20 lg:py-24`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="before:bg-gold flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] text-[#996c28] uppercase before:h-px before:w-8">
              {copy.eyebrow}
            </p>
            <h2 className="text-burgundy mt-4 font-serif text-[clamp(2.3rem,4.4vw,4rem)] leading-[1.2] whitespace-pre-line">
              {copy.title}
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-muted text-sm leading-7">{copy.body}</p>
            {copy.link && (
              <Link
                href="/quality"
                className="group text-burgundy mt-4 inline-flex items-center gap-2 text-[13px] font-semibold"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                  {copy.link}
                </span>
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>

        <ol
          ref={listRef}
          className={`relative mt-10 grid gap-2 pl-12 lg:mt-14 lg:gap-5 lg:pl-0 ${count > 5 ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}
        >
          {/* tracks */}
          <span
            aria-hidden="true"
            className="bg-burgundy/15 absolute top-2 bottom-2 left-[21px] w-px lg:hidden"
          />
          <span
            aria-hidden="true"
            style={{ left: inset, right: inset }}
            className="bg-burgundy/15 absolute top-[22px] hidden h-px lg:block"
          />
          {/* progress */}
          <span
            ref={lineY}
            style={{ transform: "scaleY(0)" }}
            aria-hidden="true"
            className="bg-gold absolute top-2 bottom-2 left-[20.5px] w-0.5 origin-top lg:hidden"
          />
          <span
            ref={lineX}
            style={{ transform: "scaleX(0)", left: inset, right: inset }}
            aria-hidden="true"
            className="bg-gold absolute top-[21.5px] hidden h-0.5 origin-left lg:block"
          />
          {steps.map((step, index) => {
            const Icon = icons[index % icons.length];
            const isActive = index <= shown;
            const isCurrent = index === shown;
            return (
              <li
                key={step.title}
                className={`relative py-3 transition-[opacity,transform] duration-500 lg:flex lg:flex-col lg:items-center lg:py-0 lg:text-center ${isActive ? "opacity-100" : "opacity-55"} ${isCurrent ? "lg:scale-[1.04]" : ""}`}
              >
                <span
                  className={`absolute top-3 -left-12 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 lg:static ${isActive ? "border-gold bg-gold text-ivory shadow-[0_8px_20px_rgba(201,149,56,0.35)]" : "border-burgundy/20 bg-cream text-burgundy/60"}`}
                >
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="text-gold text-[11px] font-semibold tracking-[0.2em] lg:mt-5">
                  0{index + 1}
                </span>
                <h3
                  className={`mt-1 font-serif text-xl leading-snug transition-colors duration-500 lg:mt-2 xl:text-[1.4rem] ${isActive ? "text-burgundy" : "text-muted"}`}
                >
                  {step.title}
                </h3>
                <p className="text-muted mt-1.5 text-[13px] leading-6 lg:max-w-[200px]">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
