import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "gold" | "outline" | "outlineLight";

const variants: Record<Variant, string> = {
  primary: "bg-burgundy text-ivory hover:bg-dark-burgundy shadow-[0_6px_18px_rgba(101,0,11,0.18)]",
  secondary:
    "border border-burgundy/35 text-burgundy hover:border-burgundy hover:bg-burgundy/[0.04]",
  gold: "bg-light-gold text-dark-burgundy hover:bg-[#e3bf6c] shadow-[0_6px_18px_rgba(0,0,0,0.18)]",
  outline: "border border-burgundy/35 text-burgundy hover:border-burgundy hover:bg-burgundy/[0.04]",
  outlineLight:
    "border border-light-gold/55 text-ivory hover:border-light-gold hover:bg-white/[0.07]",
};

export const buttonClass = (variant: Variant = "primary", className = "") =>
  `group/btn focus-visible:outline-gold inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`;

export function ButtonArrow({ icon }: { icon?: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex transition-transform duration-300 group-hover/btn:translate-x-1"
    >
      {icon ?? <ArrowRight size={16} strokeWidth={1.8} />}
    </span>
  );
}

/** Premium link-button used across the site. External hrefs render a plain anchor. */
export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}) {
  const classes = buttonClass(variant, className);
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ButtonArrow icon={icon} />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      <ButtonArrow icon={icon} />
    </Link>
  );
}
