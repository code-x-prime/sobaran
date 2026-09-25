"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Leaf } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/language";
import { HeroSequence } from "@/components/home/hero-sequence";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ScrollEffects } from "@/components/home/scroll-effects";

type Variant = "image" | "split" | "dark";

/**
 * Shared inner-page shell. Three hero compositions keep inner pages from looking alike:
 * - image: full-bleed photograph with overlay (story, quality)
 * - split: cream editorial hero with a visual on the side (products, where to buy)
 * - dark:  burgundy campaign band with brand watermark (contact, enquiry, legal)
 */
export function PageFrame({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  aside,
  actions,
  crumb,
  variant = "dark",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  actions?: ReactNode;
  crumb?: string;
  variant?: Variant;
  children: ReactNode;
}) {
  const { dict } = useLanguage();
  const light = variant === "split";
  const content = (
    <HeroSequence
      eyebrow={
        <div className="flex flex-col gap-4">
          {crumb && (
            <nav
              aria-label={dict.nav.breadcrumb}
              className={`flex items-center gap-1.5 text-xs ${light ? "text-muted" : "text-ivory/70"}`}
            >
              <Link href="/" className={light ? "hover:text-burgundy" : "hover:text-light-gold"}>
                {dict.nav.home}
              </Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className={light ? "text-burgundy" : "text-light-gold"}>{crumb}</span>
            </nav>
          )}
          <p
            className={`before:bg-gold flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-8 ${light ? "text-[#996c28]" : "text-light-gold"}`}
          >
            {eyebrow}
          </p>
        </div>
      }
      heading={
        <h1
          className={`mt-5 font-serif text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.18] whitespace-pre-line ${light ? "text-burgundy" : "text-ivory"}`}
        >
          {title}
        </h1>
      }
      body={
        <p
          className={`mt-5 max-w-xl text-[15px] leading-8 sm:text-base ${light ? "text-muted" : "text-[#ead8be]"}`}
        >
          {description}
        </p>
      }
      actions={
        actions ? (
          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
            {actions}
          </div>
        ) : null
      }
    />
  );

  return (
    <>
      <ScrollEffects />
      <SiteHeader overlay={variant === "image"} />
      <main className="bg-ivory text-brown min-h-screen overflow-x-clip">
        {variant === "image" && (
          <section className="bg-dark-burgundy text-ivory relative flex min-h-[520px] items-end overflow-hidden pt-28 pb-12 sm:min-h-[580px] lg:min-h-[72svh] lg:pb-20">
            {image && (
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                data-parallax
                className="scale-110 object-cover object-center"
              />
            )}
            <div className="from-brown/95 via-brown/65 to-brown/10 absolute inset-0 bg-gradient-to-r" />
            <div className="from-brown/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
              {content}
            </div>
            <Leaf
              aria-hidden="true"
              size={120}
              strokeWidth={0.5}
              className="text-light-gold/25 absolute right-8 bottom-10 hidden rotate-12 lg:block"
            />
          </section>
        )}

        {variant === "split" && (
          <section className="bg-cream relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(101,0,11,0.09)_1px,transparent_1px)] [mask-image:linear-gradient(to_left,black,transparent_65%)] [background-size:22px_22px]"
            />
            <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:px-10 lg:py-20">
              <div>{content}</div>
              {aside}
            </div>
          </section>
        )}

        {variant === "dark" && (
          <section className="bg-dark-burgundy text-ivory relative overflow-hidden py-14 md:py-20 lg:py-24">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -bottom-8 font-serif text-[28vw] leading-none text-white/[0.035] select-none lg:text-[15vw]"
            >
              SOBARAN
            </span>
            {image && (
              <>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="100vw"
                  data-image-reveal
                  className="object-cover opacity-30 mix-blend-luminosity"
                />
                <div className="from-dark-burgundy via-dark-burgundy/85 to-dark-burgundy/40 absolute inset-0 bg-gradient-to-r" />
              </>
            )}
            <div className="relative mx-auto grid max-w-[1400px] items-end gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-10">
              {content}
              {aside}
            </div>
          </section>
        )}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
