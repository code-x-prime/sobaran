"use client";

import { useWhatsappHref } from "@/components/ui/use-whatsapp";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Leaf,
  MapPin,
  Package,
  ShieldCheck,
  Sunrise,
  Coffee,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useLanguage } from "@/components/language";
import { ActionLink } from "@/components/ui/action-link";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/social-icons";
import { GoldLine, Reveal, RevealGroup, RevealItem } from "@/components/home/reveal";
import {
  HeroFlourish,
  HeroSequence,
  HeroMobileVisual,
  HeroVisual,
  SplitWords,
} from "@/components/home/hero-sequence";
import { products } from "@/data/products";
import { site } from "@/data/site";

/** Flat view of the homepage copy for the active language, plus the full dictionary. */
function useHomeCopy() {
  const { dict } = useLanguage();
  const h = dict.home;
  return {
    dict,
    eyebrow: h.hero.eyebrow,
    heroTitle: h.hero.title,
    heroBody: h.hero.body,
    explore: dict.common.exploreProducts,
    contact: h.hero.secondary,
    scroll: h.hero.scroll,
    statementEyebrow: h.statement.eyebrow,
    statementBody: h.statement.body,
    signatureEyebrow: h.signature.eyebrow,
    signatureTitle: h.signature.title,
    signatureBody: h.signature.body,
    signatureNote: h.signature.note,
    viewProduct: dict.common.viewProduct,
    ingredientEyebrow: h.ingredient.eyebrow,
    ingredientTitle: h.ingredient.title,
    ingredientBody: h.ingredient.body,
    storyEyebrow: h.story.eyebrow,
    storyTitle: h.story.title,
    storyBody: h.story.body,
    storyLink: h.story.link,
    valuesEyebrow: h.values.eyebrow,
    valuesTitle: h.values.title,
    whereEyebrow: h.where.eyebrow,
    whereTitle: h.where.title,
    whereBody: h.where.body,
    whereLink: h.where.link,
    businessEyebrow: h.business.eyebrow,
    businessTitle: h.business.title,
    businessBody: h.business.body,
    retailer: h.business.retailer,
    distributor: h.business.distributor,
    galleryEyebrow: h.gallery.eyebrow,
    galleryTitle: h.gallery.title,
    finalTitle: h.final.title,
    finalSecondary: h.final.secondary,
  };
}

const container = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10";
const h2 = "font-serif text-[clamp(2.3rem,4.4vw,4rem)] leading-[1.2] whitespace-pre-line";

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p
      className={`before:bg-gold flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase before:h-px before:w-8 ${light ? "text-light-gold" : "text-[#996c28]"}`}
    >
      {text}
    </p>
  );
}

function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[13px] font-semibold ${light ? "text-light-gold" : "text-burgundy"}`}
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

/* 01 · Cinematic ------------------------------------------------------------ */
export function Hero() {
  const whatsappHref = useWhatsappHref();
  const c = useHomeCopy();
  return (
    <section
      data-hero
      id="home"
      className="bg-dark-burgundy text-ivory relative flex min-h-[88svh] items-end overflow-hidden pt-24 pb-10 sm:min-h-[700px] md:pb-16 lg:min-h-[max(88svh,680px)] lg:items-center lg:pt-32 lg:pb-20"
    >
      <div data-hero-image className="absolute inset-0 will-change-transform">
        <Image
          src={site.heroImage}
          alt={c.dict.home.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
      </div>
      <div className="from-brown/95 via-brown/70 to-brown/20 md:from-brown/90 md:via-brown/50 absolute inset-0 bg-gradient-to-r md:to-transparent" />
      <div className="from-brown/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      <HeroFlourish />

      <div className={`${container} relative z-10 flex items-center justify-between gap-12`}>
        <HeroSequence
          eyebrow={<Eyebrow text={c.eyebrow} light />}
          visual={<HeroMobileVisual />}
          heading={
            <h1 className="mt-5 font-serif text-[clamp(2.7rem,6.6vw,5.9rem)] leading-[1.14] tracking-[-0.01em] whitespace-pre-line">
              {c.heroTitle}
            </h1>
          }
          body={
            <p className="mt-5 max-w-[480px] text-[15px] leading-7 whitespace-pre-line text-[#f1e2d1] sm:text-base sm:leading-8">
              {c.heroBody}
            </p>
          }
          actions={
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
              <ActionLink href="/products" variant="gold">
                {c.explore}
              </ActionLink>
              <ActionLink
                href={whatsappHref}
                variant="outlineLight"
                icon={<WhatsappIcon width={16} height={16} />}
              >
                {c.contact}
              </ActionLink>
            </div>
          }
        />
        <HeroVisual />
      </div>

      <div className="text-light-gold/80 absolute right-6 bottom-6 hidden items-center gap-3 text-[10px] tracking-[0.25em] uppercase md:flex">
        <span className="bg-light-gold/50 h-px w-10" />
        {c.scroll}
      </div>
    </section>
  );
}

/* 02 · Minimal ------------------------------------------------------------- */
export function BrandStatement() {
  const c = useHomeCopy();
  return (
    <section className="bg-ivory relative overflow-hidden py-16 md:py-20 lg:py-24">
      <Image
        src={site.iconGold}
        alt=""
        aria-hidden="true"
        width={662}
        height={660}
        className="pointer-events-none absolute top-1/2 -right-16 w-64 -translate-y-1/2 opacity-[0.07] md:w-96"
      />
      <div className={`${container} relative`}>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-gold flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
              <span className="bg-gold h-px w-8" />
              {c.statementEyebrow}
              <span className="bg-gold h-px w-8" />
            </p>
          </Reveal>
          <h2
            data-split-reveal
            className="text-burgundy mt-5 font-serif text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.22]"
          >
            <SplitWords text={c.dict.home.statement.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="text-muted mx-auto mt-5 max-w-2xl text-[15px] leading-8">
              {c.statementBody}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="mt-8 flex flex-col items-center gap-6">
          <TextLink href="/about">{c.dict.home.statement.link}</TextLink>
          <div className="text-gold flex items-center gap-3" aria-hidden="true">
            <span className="bg-gold/50 h-px w-12" />
            <Leaf size={20} strokeWidth={1.2} />
            <span className="bg-gold/50 h-px w-12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 03 · Promise ------------------------------------------------------------- */
export function BrandPromise() {
  const c = useHomeCopy();
  const promise = c.dict.home.promise;
  const icons = [Leaf, Sparkles, ShieldCheck, Package];
  return (
    <section className="bg-cream border-beige border-y py-14 md:py-16">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow text={promise.eyebrow} />
            <h2 className="text-burgundy mt-3 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.25]">
              {promise.title}
            </h2>
          </div>
          <GoldLine className="hidden w-32 md:block" />
        </div>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {promise.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <RevealItem
                key={item.title}
                className="group bg-ivory hover:border-gold/60 relative flex h-full items-start gap-4 rounded-xl border border-[#e3d4ba] p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(36,19,15,0.08)] min-[400px]:flex-col min-[400px]:gap-0 min-[400px]:p-5 sm:p-6"
              >
                <span className="border-gold/40 text-burgundy group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-light-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500">
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-rotate-6"
                  />
                </span>
                <div>
                  <h3 className="text-burgundy font-serif text-[1.35rem] leading-snug min-[400px]:mt-5 min-[400px]:text-[1.45rem]">
                    {item.title}
                  </h3>
                  <p className="text-muted mt-1 text-sm leading-6">{item.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* 07 · Food moments -------------------------------------------------------- */
export function FoodMoments() {
  const c = useHomeCopy();
  const moments = c.dict.home.moments;
  const images = ["/images/upma.jpg", "/images/gallery-cooking.jpg", "/images/gallery-chai.jpg"];
  const icons = [Sunrise, UtensilsCrossed, Coffee];
  const ratios = [
    "aspect-[4/3] lg:aspect-[4/5]",
    "aspect-[4/5] lg:aspect-[3/4]",
    "aspect-[4/5] lg:aspect-[4/5]",
  ];
  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24">
      <div className={container}>
        <div className="max-w-2xl">
          <Eyebrow text={moments.eyebrow} />
          <h2 className="text-burgundy mt-5 font-serif text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.2]">
            {moments.title}
          </h2>
        </div>
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_1fr] lg:items-end">
          {moments.items.map((moment, index) => {
            const Icon = icons[index];
            return (
              <RevealItem
                key={moment.title}
                className={`group relative overflow-hidden rounded-2xl ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className={`relative overflow-hidden ${ratios[index]}`}>
                  <Image
                    src={images[index]}
                    alt={moment.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 34vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="from-brown/85 via-brown/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                </div>
                <div className="text-ivory absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="border-light-gold/40 text-light-gold bg-brown/40 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-[1.7rem] leading-tight">{moment.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{moment.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* 04 · Dark campaign ------------------------------------------------------- */
export function SignatureProduct() {
  const c = useHomeCopy();
  const product = products[0];
  return (
    <section className="bg-burgundy text-ivory relative overflow-hidden py-16 md:py-20 lg:py-24">
      <span
        data-drift
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-serif text-[34vw] leading-none whitespace-nowrap text-white/[0.035] select-none lg:text-[22vw]"
        aria-hidden="true"
      >
        SOBARAN
      </span>
      <Leaf
        aria-hidden="true"
        size={96}
        strokeWidth={0.6}
        className="text-light-gold/30 pointer-events-none absolute top-8 right-4 -rotate-12 lg:top-16 lg:right-16"
      />
      <div
        className={`${container} relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}
      >
        <Reveal className="relative mx-auto w-full max-w-[500px]">
          <div className="border-light-gold/40 absolute -top-4 -left-4 h-full w-full rounded-xl border" />
          <div className="group bg-dark-burgundy relative aspect-[4/5] overflow-hidden rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
            <Image
              src={product.image}
              alt={c.dict.home.signature.imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="bg-light-gold text-dark-burgundy absolute -right-2 -bottom-5 rounded-lg px-4 py-3 shadow-lg sm:-right-5">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase">
              {c.dict.home.signature.packLabel}
            </p>
            <p className="font-serif text-xl">{product.packSizes.join(" · ")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow text={c.signatureEyebrow} light />
          <h2 className={`${h2} mt-5`}>{c.signatureTitle}</h2>
          <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#ead8be]">{c.signatureBody}</p>
          <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-3">
            {c.dict.home.signature.points.map((point) => (
              <RevealItem
                as="li"
                key={point}
                className="border-light-gold/25 flex items-center gap-2.5 rounded-lg border bg-white/[0.04] px-3.5 py-3 text-sm text-[#f3dfb5]"
              >
                <span className="bg-light-gold/15 text-light-gold flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
                  <Check size={14} aria-hidden="true" />
                </span>
                {point}
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ActionLink href={`/products/${product.slug}`} variant="gold">
              {c.viewProduct}
            </ActionLink>
            <p className="text-xs text-[#d9c5a8]">{c.signatureNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 05 · Photography --------------------------------------------------------- */
export function IngredientStory() {
  const c = useHomeCopy();
  const positions = [
    "lg:top-[22%] lg:left-[52%]",
    "lg:top-[48%] lg:left-[72%]",
    "lg:top-[72%] lg:left-[58%]",
  ];
  return (
    <section className="bg-ivory py-4 md:py-6">
      <div
        data-clip-reveal
        className="bg-brown text-ivory relative mx-auto min-h-[520px] overflow-hidden md:mx-4 md:rounded-xl lg:min-h-[600px]"
      >
        <Image
          src={site.ingredientImage}
          alt={c.dict.home.ingredient.imageAlt}
          fill
          sizes="100vw"
          data-parallax
          className="scale-110 object-cover object-[66%_center]"
        />
        <div className="from-brown/95 via-brown/60 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div
          className={`${container} relative flex min-h-[520px] flex-col justify-between gap-10 py-14 lg:min-h-[600px] lg:py-20`}
        >
          <Reveal className="max-w-xl">
            <Eyebrow text={c.ingredientEyebrow} light />
            <h2 className={`${h2} mt-5`}>{c.ingredientTitle}</h2>
            <p className="mt-5 max-w-md text-[15px] leading-8 text-white/80">{c.ingredientBody}</p>
          </Reveal>
          <RevealGroup as="ul" className="flex flex-wrap gap-2.5 lg:contents" stagger={0.15}>
            {c.dict.home.ingredient.labels.map((label, index) => (
              <RevealItem as="li" key={label} className={`lg:absolute ${positions[index]}`}>
                <span className="border-light-gold/40 bg-brown/55 flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="bg-light-gold/40 absolute inset-0 scale-150 rounded-full" />
                    <span className="bg-light-gold relative h-2.5 w-2.5 rounded-full" />
                  </span>
                  <span className="text-light-gold text-[10px] font-semibold tracking-[0.18em]">
                    0{index + 1}
                  </span>
                  <span className="font-serif text-lg">{label}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* 06 · Story --------------------------------------------------------------- */
export function StorySection() {
  const c = useHomeCopy();
  return (
    <section className="bg-ivory py-16 md:py-20 lg:py-24" id="story">
      <div className={`${container} grid items-center lg:grid-cols-12`}>
        <div className="relative lg:col-span-7">
          <div className="bg-beige relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[5/4]">
            <Image
              src={site.storyImage}
              alt={c.dict.home.story.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              data-image-reveal
              className="object-cover object-[40%_center]"
            />
          </div>
          <Reveal
            delay={0.3}
            className="bg-burgundy text-ivory absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl px-4 py-3 shadow-[0_16px_36px_rgba(58,7,8,0.3)] sm:left-8 lg:top-8 lg:bottom-auto lg:-left-6"
          >
            <MapPin size={18} className="text-light-gold" aria-hidden="true" />
            <div>
              <p className="text-light-gold text-[10px] font-semibold tracking-[0.18em] uppercase">
                {c.dict.home.story.badgeLabel}
              </p>
              <p className="font-serif text-lg leading-tight">{c.dict.home.story.badge}</p>
            </div>
          </Reveal>
        </div>
        <Reveal
          delay={0.1}
          className="border-gold bg-cream relative z-10 mt-12 rounded-xl border-t-2 p-6 shadow-[0_24px_60px_rgba(36,19,15,0.1)] sm:p-9 lg:col-span-5 lg:mt-0 lg:-ml-20 lg:p-11"
        >
          <Eyebrow text={c.storyEyebrow} />
          <h2 className="text-burgundy mt-5 font-serif text-[clamp(2.2rem,3.8vw,3.5rem)] leading-[1.2] whitespace-pre-line">
            {c.storyTitle}
          </h2>
          <GoldLine className="mt-6 w-16" />
          <p className="text-muted mt-6 text-[15px] leading-8">{c.storyBody}</p>
          <div className="mt-7">
            <TextLink href="/about">{c.storyLink}</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 08 · Trust --------------------------------------------------------------- */
export function BrandValues() {
  const c = useHomeCopy();
  const icons = [Leaf, BadgeCheck, Sparkles, ShieldCheck];
  return (
    <section className="bg-ivory py-16 md:py-20 lg:py-24">
      <div className={`${container}`}>
        <div className="bg-cream grid overflow-hidden rounded-xl lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-beige relative flex flex-col justify-between gap-8 border-b p-6 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
            <div>
              <Eyebrow text={c.valuesEyebrow} />
              <h2 className="text-burgundy mt-5 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.25] whitespace-pre-line">
                {c.valuesTitle}
              </h2>
            </div>
            <Leaf className="text-gold" size={30} strokeWidth={1.1} aria-hidden="true" />
          </div>
          <RevealGroup className="grid sm:grid-cols-2">
            {c.dict.home.values.items.map((value, index) => {
              const Icon = icons[index];
              return (
                <RevealItem
                  key={value.title}
                  className={`group border-beige hover:bg-ivory relative border-b p-6 transition-colors duration-500 sm:p-8 ${index % 2 === 0 ? "sm:border-r" : ""} ${index >= 2 ? "sm:border-b-0" : ""} ${index === 3 ? "border-b-0" : ""}`}
                >
                  <span className="bg-gold absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="border-gold/40 text-burgundy group-hover:bg-burgundy group-hover:text-light-gold flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 group-hover:-translate-y-0.5 group-hover:-rotate-6">
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="text-gold text-[11px] font-semibold tracking-[0.2em]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-burgundy mt-6 font-serif text-[1.7rem] leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-6">{value.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* 09 · Location ------------------------------------------------------------ */
export function WhereToBuy() {
  const whatsappHref = useWhatsappHref();
  const c = useHomeCopy();
  const cities = [
    { key: "pratapgarh", image: "/images/gallery-market.jpg" },
    { key: "prayagraj", image: "/images/gallery-spices.jpg" },
  ] as const;
  return (
    <section className="bg-cream relative overflow-hidden py-16 md:py-20 lg:py-24" id="where">
      {/* map-like decoration: dotted grid + contour rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(101,0,11,0.12)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_80%_40%,black,transparent_70%)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="border-gold/20 pointer-events-none absolute top-10 -right-40 h-[520px] w-[520px] rounded-full border"
      />
      <div
        aria-hidden="true"
        className="border-gold/15 pointer-events-none absolute top-24 -right-24 h-[360px] w-[360px] rounded-full border border-dashed"
      />

      <div
        className={`${container} relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16`}
      >
        <Reveal>
          <Eyebrow text={c.whereEyebrow} />
          <h2 className={`${h2} text-burgundy mt-5`}>{c.whereTitle}</h2>
          <p className="text-muted mt-4 max-w-sm text-[15px] leading-8">{c.whereBody}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionLink href={whatsappHref} icon={<WhatsappIcon width={16} height={16} />}>
              {c.dict.common.whatsappAsk}
            </ActionLink>
            <ActionLink href="/where-to-buy" variant="secondary">
              {c.whereLink}
            </ActionLink>
          </div>
        </Reveal>
        <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.12}>
          {cities.map(({ key, image }) => {
            const city = c.dict.cities[key];
            return (
              <RevealItem key={key}>
                <Link
                  href="/where-to-buy"
                  className="group bg-ivory hover:border-gold/70 block overflow-hidden rounded-xl border border-[#e3d4ba] p-2.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(36,19,15,0.1)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={city.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="bg-ivory/90 text-burgundy absolute top-3 left-3 flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                      <MapPin size={12} aria-hidden="true" /> {c.dict.home.where.stateBadge}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-3 px-2.5 pt-4 pb-2">
                    <div>
                      <h3 className="text-burgundy font-serif text-[1.7rem] leading-tight">
                        {city.name}
                      </h3>
                      <p className="text-muted mt-1 text-xs">{city.note}</p>
                    </div>
                    <span className="border-burgundy/20 text-burgundy group-hover:bg-burgundy group-hover:text-ivory flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300">
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* 10 · CTA ----------------------------------------------------------------- */
export function BusinessCTA() {
  const whatsappHref = useWhatsappHref();
  const c = useHomeCopy();
  const leaves = [
    "top-10 left-[8%] rotate-[-20deg]",
    "bottom-12 left-[38%] rotate-[35deg]",
    "top-16 right-[30%] rotate-[10deg]",
    "bottom-8 right-[6%] rotate-[-40deg]",
  ];
  return (
    <section className="bg-ivory py-4 md:py-6">
      <div className="bg-dark-burgundy text-ivory relative overflow-hidden md:mx-4 md:rounded-xl">
        <span
          data-drift
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[6vw] left-0 font-serif text-[30vw] leading-none whitespace-nowrap text-white/[0.03] select-none lg:text-[20vw]"
        >
          SOBARAN
        </span>
        {leaves.map((position) => (
          <Leaf
            key={position}
            aria-hidden="true"
            size={70}
            strokeWidth={0.6}
            className={`text-light-gold/[0.08] pointer-events-none absolute hidden md:block ${position}`}
          />
        ))}
        <div
          className={`${container} relative grid gap-10 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24`}
        >
          <Reveal>
            <Eyebrow text={c.businessEyebrow} light />
            <h2 className={`${h2} mt-5 max-w-3xl`}>{c.businessTitle}</h2>
            <GoldLine className="bg-light-gold mt-6 w-20" />
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-[#ead8be]">{c.businessBody}</p>
          </Reveal>
          <RevealGroup className="flex flex-col gap-3" stagger={0.1}>
            <RevealItem>
              <ActionLink
                href="/enquiry?type=retailer"
                variant="gold"
                className="w-full justify-between"
              >
                {c.retailer}
              </ActionLink>
            </RevealItem>
            <RevealItem>
              <ActionLink
                href="/enquiry?type=distributor"
                variant="outlineLight"
                className="w-full justify-between"
              >
                {c.distributor}
              </ActionLink>
            </RevealItem>
            <RevealItem>
              <ActionLink
                href={whatsappHref}
                variant="outlineLight"
                className="w-full justify-between"
                icon={<WhatsappIcon width={16} height={16} />}
              >
                {c.dict.common.whatsappTalk}
              </ActionLink>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* 13 · Social -------------------------------------------------------------- */
export function SocialGallery() {
  const c = useHomeCopy();
  const instagram: string | null = site.instagram;
  const images = [
    "/images/gallery-cooking.jpg",
    "/images/gallery-chai.jpg",
    "/images/gallery-market.jpg",
    "/images/gallery-spices.jpg",
    "/images/tea-masala.jpg",
    "/images/khichdi.jpg",
  ];
  // Masonry on desktop: 4 columns x 3 rows, filled exactly by these spans.
  const spans = [
    "lg:col-span-2 lg:row-span-2",
    "lg:row-span-2",
    "",
    "",
    "lg:col-span-2",
    "lg:col-span-2",
  ];
  return (
    <section className="bg-ivory py-16 md:py-20 lg:py-24">
      <div className={`${container} flex flex-wrap items-end justify-between gap-5`}>
        <div>
          <Eyebrow text={c.galleryEyebrow} />
          <h2 className={`${h2} text-burgundy mt-5`}>{c.galleryTitle}</h2>
        </div>
        <p className="text-muted flex max-w-xs items-center gap-2 text-xs leading-6">
          <InstagramIcon width={16} height={16} className="text-gold shrink-0" />
          {c.dict.home.gallery.note}
        </p>
      </div>
      <RevealGroup
        className="mt-8 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-3 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-[1400px] lg:auto-rows-[200px] lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-10 xl:auto-rows-[230px] [&::-webkit-scrollbar]:hidden"
        stagger={0.07}
      >
        {images.map((src, index) => {
          const tile = (
            <>
              <Image
                src={src}
                alt={c.dict.home.gallery.alts[index]}
                fill
                sizes="(max-width: 1024px) 70vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="bg-brown/0 group-hover:bg-brown/45 absolute inset-0 transition-colors duration-500" />
              <span className="text-ivory absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <InstagramIcon width={26} height={26} />
                {instagram && (
                  <span className="text-xs font-semibold">{c.dict.home.gallery.view}</span>
                )}
              </span>
            </>
          );
          return (
            <RevealItem
              key={src}
              className={`group bg-beige relative aspect-[4/5] w-[70vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[42vw] lg:aspect-auto lg:w-auto lg:max-w-none ${spans[index]}`}
            >
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.dict.home.gallery.view}: ${c.dict.home.gallery.alts[index]}`}
                  className="absolute inset-0"
                >
                  {tile}
                </a>
              ) : (
                tile
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}

/* 12 · Final campaign ------------------------------------------------------ */
export function FinalCampaign() {
  const c = useHomeCopy();
  return (
    <section className="bg-brown text-ivory relative flex min-h-[520px] items-center overflow-hidden py-20 lg:min-h-[600px]">
      <Image
        src={site.finalImage}
        alt={c.dict.home.final.imageAlt}
        fill
        sizes="100vw"
        data-parallax
        className="scale-110 object-cover object-[65%_center]"
      />
      <div className="from-brown/95 via-brown/60 absolute inset-0 bg-gradient-to-r to-transparent" />
      <div className={`${container} relative`}>
        <Reveal>
          <Image
            src={site.logoGold}
            alt="SOBARAN"
            width={694}
            height={502}
            sizes="120px"
            className="h-16 w-auto sm:h-20"
          />
          <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,5.4vw,5rem)] leading-[1.18] whitespace-pre-line">
            {c.finalTitle}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="/products" variant="gold">
              {c.explore}
            </ActionLink>
            <ActionLink href="/about" variant="outlineLight">
              {c.finalSecondary}
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
