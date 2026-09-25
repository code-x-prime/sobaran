"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/language";
import { products } from "@/data/products";
import { format } from "@/lib/i18n";

const ease = [0.22, 0.7, 0.2, 1] as const;

export function HeroSequence({
  eyebrow,
  heading,
  body,
  actions,
  visual,
}: {
  visual?: ReactNode;
  eyebrow: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  actions: ReactNode;
}) {
  const reduced = useReducedMotion();
  const item = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  };

  return (
    <motion.div
      data-hero-content
      className="max-w-[720px]"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
    >
      <motion.div variants={item}>{eyebrow}</motion.div>
      {visual && <motion.div variants={item}>{visual}</motion.div>}
      <motion.div variants={item}>
        {heading}
        <motion.span
          aria-hidden="true"
          className="from-light-gold mt-6 block h-px w-24 origin-left bg-gradient-to-r to-transparent"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: reduced ? 0 : 0.8, ease }}
        />
      </motion.div>
      <motion.div variants={item}>{body}</motion.div>
      <motion.div variants={item}>{actions}</motion.div>
    </motion.div>
  );
}

const ROTATE_MS = 4500;

/**
 * Index that advances through the products on a timer. Pauses while `paused` is true and
 * never auto-advances for reduced-motion users (they can still use the dots).
 */
function useRotatingIndex(length: number, paused: boolean) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || reduced || length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, length]);
  return [index, setIndex] as const;
}

/** All product photos stacked; only the active one is visible, so switches never flash. */
function StackedImages({ active, sizes }: { active: number; sizes: string }) {
  const { dict, pick } = useLanguage();
  return (
    <>
      {products.map((product, index) => (
        <Image
          key={product.slug}
          src={product.image}
          alt={index === active ? format(dict.common.servingAlt, { name: pick(product.name) }) : ""}
          aria-hidden={index === active ? undefined : true}
          fill
          priority={index === 0}
          sizes={sizes}
          className={`object-cover transition-[opacity,transform] duration-1000 ease-out group-hover:scale-[1.04] ${index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
        />
      ))}
    </>
  );
}

function Dots({
  active,
  onSelect,
  className = "",
}: {
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  const { pick } = useLanguage();
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {products.map((product, index) => (
        <button
          key={product.slug}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={pick(product.name)}
          aria-current={index === active ? "true" : undefined}
          className="flex h-6 items-center"
        >
          <span
            className={`block h-1 rounded-full transition-all duration-500 ${index === active ? "bg-light-gold w-6" : "w-2.5 bg-white/35 hover:bg-white/60"}`}
          />
        </button>
      ))}
    </div>
  );
}

/** Label: "Signature" for the flagship, otherwise the product's category. */
function useBadge(index: number) {
  const { dict } = useLanguage();
  return index === 0 ? dict.common.signature : dict.categories[products[index].category];
}

/** Rotating product card that rises into the hero after the copy (desktop). */
export function HeroVisual() {
  const { pick } = useLanguage();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useRotatingIndex(products.length, paused);
  const product = products[active];
  const badge = useBadge(active);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: reduced ? 0 : 0.75, ease }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      className="relative hidden w-[300px] lg:block xl:w-[330px]"
    >
      <div className="border-light-gold/40 absolute -top-4 -right-4 h-[calc(100%-2rem)] w-full rounded-xl border" />
      <Link
        href={`/products/${product.slug}`}
        data-hero-product
        className="group bg-dark-burgundy/70 relative block overflow-hidden rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-sm"
      >
        <div className="relative aspect-[4/4.2] overflow-hidden">
          <StackedImages active={active} sizes="330px" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-light-gold text-dark-burgundy absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase"
            >
              {badge}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-end justify-between gap-3 p-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              aria-live={paused ? "polite" : "off"}
            >
              <p className="text-ivory font-serif text-xl leading-snug">{pick(product.name)}</p>
              <p className="text-light-gold mt-1 text-[11px] tracking-[0.12em]">
                {product.packSizes.join(" · ")}
              </p>
            </motion.div>
          </AnimatePresence>
          <span className="border-light-gold/40 text-light-gold group-hover:bg-light-gold group-hover:text-dark-burgundy flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 group-hover:translate-x-0.5">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
      <Dots active={active} onSelect={setActive} className="mt-3 justify-center" />
    </motion.div>
  );
}

/** Mobile/tablet composition: the rotating product sits between label and headline. */
export function HeroMobileVisual() {
  const { pick } = useLanguage();
  const [active, setActive] = useRotatingIndex(products.length, false);
  const product = products[active];
  const badge = useBadge(active);
  return (
    <div className="mt-5 max-w-[520px] lg:hidden" aria-roledescription="carousel">
      <Link
        href={`/products/${product.slug}`}
        className="group relative block aspect-[16/10] overflow-hidden rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/15"
      >
        <StackedImages active={active} sizes="(max-width: 640px) 92vw, 520px" />
        <div className="from-brown/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        <span className="bg-light-gold text-dark-burgundy absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase">
          {badge}
        </span>
        <span className="text-ivory absolute right-3 bottom-3 left-3 flex items-end justify-between gap-2">
          <span className="font-serif text-lg leading-tight">{pick(product.name)}</span>
          <span className="text-light-gold shrink-0 text-[11px]">
            {product.packSizes.join(" · ")}
          </span>
        </span>
      </Link>
      <Dots active={active} onSelect={setActive} className="mt-2" />
    </div>
  );
}

export function HeroFlourish() {
  const reduced = useReducedMotion();
  return (
    <>
      {[
        { className: "top-[24%] right-[38%]", size: 20, delay: 0, duration: 9 },
        { className: "top-[62%] right-[8%]", size: 14, delay: 1.5, duration: 11 },
      ].map((leaf) => (
        <motion.span
          key={leaf.className}
          aria-hidden="true"
          className={`text-light-gold/60 pointer-events-none absolute hidden lg:block ${leaf.className}`}
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: [0, -10, 0], rotate: [-10, 4, -10] }}
          transition={{
            opacity: { duration: 1.2, delay: 1.4 + leaf.delay },
            y: { duration: leaf.duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: leaf.duration, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Leaf size={leaf.size} strokeWidth={1.2} />
        </motion.span>
      ))}
    </>
  );
}

/** Renders text as word spans so GSAP can reveal them; `data-split` marks the group. */
export function SplitWords({ text }: { text: string }) {
  return (
    <span data-split className="whitespace-pre-line">
      {text.split("\n").map((line, lineIndex) => (
        <span key={`${text}-${lineIndex}`} className="block">
          {line.split(" ").map((word, index) => (
            <span key={index} data-split-word className="inline-block">
              {word}
              {index < line.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
