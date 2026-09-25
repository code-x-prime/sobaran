"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Shared building blocks so every inner page speaks the same visual language. */
export const container = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10";
export const sectionY = "py-14 md:py-20 lg:py-24";
export const h2Class =
  "font-serif text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.2] whitespace-pre-line";
export const h3Class = "font-serif text-[1.55rem] leading-snug";

export function Eyebrow({
  children,
  light = false,
  center = false,
}: {
  children: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <p
      className={`before:bg-gold flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-8 ${light ? "text-light-gold" : "text-[#996c28]"} ${center ? "after:bg-gold justify-center after:h-px after:w-8" : ""}`}
    >
      {children}
    </p>
  );
}

export function IconBadge({
  Icon,
  dark = false,
  className = "",
}: {
  Icon: LucideIcon;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${dark ? "border-light-gold/35 text-light-gold group-hover:bg-light-gold group-hover:text-dark-burgundy" : "border-gold/40 text-burgundy group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-light-gold"} ${className}`}
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-rotate-6"
      />
    </span>
  );
}

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold ${light ? "text-light-gold" : "text-burgundy"}`}
    >
      <span className="border-b border-current/40 pb-0.5 transition-colors duration-300 group-hover:border-current">
        {children}
      </span>
      <ArrowRight
        size={15}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}
