"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  IndianRupee,
  Info,
  Leaf,
  Package,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/components/language";
import { Reveal } from "@/components/home/reveal";
import { ScrollEffects } from "@/components/home/scroll-effects";
import { ProductGallery } from "@/components/products/product-gallery";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ActionLink } from "@/components/ui/action-link";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { Eyebrow, IconBadge, TextLink, container, h2Class, sectionY } from "@/components/pages/ui";
import { products } from "@/data/products";
import { whatsappUrl } from "@/data/site";
import { format } from "@/lib/i18n";

type Field = { Icon: LucideIcon; label: string; value: string; wide?: boolean };

export function ProductDetailContent({ slug }: { slug: string }) {
  const { dict, pick } = useLanguage();
  const d = dict.product;
  const product = products.find((item) => item.slug === slug);
  const [pack, setPack] = useState(product?.packSizes[0] ?? "");
  const rail = useRef<HTMLDivElement>(null);
  if (!product) return null;

  const related = products.filter((item) => item.slug !== product.slug);
  const whatsapp = whatsappUrl(format(d.message, { product: pick(product.name), size: pack }));

  // Only fields with real data are shown; nothing is invented.
  const fields: Field[] = [
    { Icon: Info, label: d.fields.about, value: pick(product.detail), wide: true },
    { Icon: Package, label: d.fields.packSizes, value: product.packSizes.join(" · ") },
    { Icon: Scale, label: d.fields.netQuantity, value: pack },
  ];
  if (product.mrp)
    fields.push({ Icon: IndianRupee, label: d.fields.mrp, value: pick(product.mrp) });
  if (product.ingredients)
    fields.push({
      Icon: Leaf,
      label: d.fields.ingredients,
      value: pick(product.ingredients),
      wide: true,
    });
  if (product.storage)
    fields.push({
      Icon: Archive,
      label: d.fields.storage,
      value: pick(product.storage),
      wide: true,
    });
  const labelPending = !product.mrp || !product.ingredients || !product.storage;

  const scrollRail = (direction: 1 | -1) =>
    rail.current?.scrollBy({
      left: direction * rail.current.clientWidth * 0.8,
      behavior: "smooth",
    });

  return (
    <>
      <ScrollEffects />
      <SiteHeader />
      <main className="bg-ivory text-brown overflow-x-clip">
        {/* Product hero */}
        <section className="bg-cream relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(101,0,11,0.08)_1px,transparent_1px)] [mask-image:linear-gradient(to_right,black,transparent_70%)] [background-size:20px_20px]"
          />
          <div className="relative mx-auto max-w-[1400px] px-4 pt-6 pb-14 sm:px-6 lg:px-10 lg:pt-8 lg:pb-20">
            <nav
              aria-label={dict.nav.breadcrumb}
              className="text-muted flex items-center gap-1.5 text-xs"
            >
              <Link href="/" className="hover:text-burgundy">
                {dict.nav.home}
              </Link>
              <ChevronRight size={12} aria-hidden="true" />
              <Link href="/products" className="hover:text-burgundy">
                {d.crumb}
              </Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-burgundy">{pick(product.name)}</span>
            </nav>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
              <ProductGallery name={pick(product.name)} images={product.images} />
              <Reveal delay={0.1}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-burgundy/[0.06] text-burgundy inline-flex rounded-md px-2.5 py-1 text-xs font-semibold">
                    {dict.categories[product.category]}
                  </span>
                  {product.comingSoon && (
                    <span className="bg-gold/15 text-gold inline-flex rounded-md px-2.5 py-1 text-xs font-semibold">
                      {dict.common.comingSoon}
                    </span>
                  )}
                </div>
                <h1 className="text-burgundy mt-4 font-serif text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.18]">
                  {pick(product.name)}
                </h1>
                <p className="text-brown/85 mt-3 font-serif text-xl leading-snug">
                  {pick(product.description)}
                </p>
                <p className="text-muted mt-4 max-w-xl text-[15px] leading-8">
                  {pick(product.detail)}
                </p>

                <fieldset className="mt-7">
                  <legend className="text-muted text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {d.selectPack}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2" role="radiogroup">
                    {product.packSizes.map((size) => {
                      const selected = pack === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setPack(size)}
                          className={`relative min-h-11 min-w-20 rounded-lg border px-4 text-sm font-semibold transition-colors duration-300 ${selected ? "border-burgundy text-ivory" : "border-gold/50 text-burgundy hover:border-burgundy bg-ivory"}`}
                        >
                          {selected && (
                            <motion.span
                              layoutId="pack-selected"
                              className="bg-burgundy absolute inset-0 rounded-[7px]"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <span className="relative">{size}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {product.mrp && (
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="text-muted text-sm">{d.mrp}</span>
                    <span className="text-burgundy font-serif text-2xl">{pick(product.mrp)}</span>
                  </p>
                )}

                <ul className="mt-6 grid gap-2">
                  {product.highlights.map((item) => (
                    <li key={item.en} className="text-brown flex items-center gap-2.5 text-sm">
                      <span className="bg-gold/15 text-gold flex h-5 w-5 items-center justify-center rounded-md">
                        <Check size={13} aria-hidden="true" />
                      </span>
                      {pick(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ActionLink href={whatsapp} icon={<WhatsappIcon width={16} height={16} />}>
                    {d.ask}
                  </ActionLink>
                  <ActionLink href={`/enquiry?product=${product.slug}`} variant="secondary">
                    {d.bulk}
                  </ActionLink>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* At a glance */}
        <section className={`bg-ivory ${sectionY}`}>
          <div className={container}>
            <Eyebrow>{d.infoEyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{d.infoTitle}</h2>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fields.map(({ Icon, label, value, wide }) => (
                <div
                  key={label}
                  className={`group bg-cream flex items-start gap-4 rounded-xl p-5 ${wide ? "sm:col-span-2" : ""}`}
                >
                  <IconBadge Icon={Icon} className="h-11 w-11" />
                  <div className="min-w-0">
                    <dt className="text-muted text-[11px] font-semibold tracking-[0.16em] uppercase">
                      {label}
                    </dt>
                    <dd className="text-brown mt-1.5 text-[15px] leading-7">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            {labelPending && (
              <p className="text-muted mt-5 flex items-start gap-2 text-xs leading-6">
                <Info size={14} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                {d.labelNote}
              </p>
            )}
          </div>
        </section>

        {/* Product story */}
        <section className={`bg-cream ${sectionY}`}>
          <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={product.images[1] ?? product.image}
                alt={format(dict.common.servingAlt, { name: pick(product.name) })}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-image-reveal
                className="object-cover"
              />
            </div>
            <Reveal>
              <Eyebrow>{d.storyEyebrow}</Eyebrow>
              <h2 className={`${h2Class} text-burgundy mt-4`}>{d.storyTitle}</h2>
              <p className="text-muted mt-5 text-[15px] leading-8">{pick(product.detail)}</p>
              <ul className="mt-6 grid gap-3">
                {product.highlights.map((item) => (
                  <li key={item.en} className="text-brown flex items-center gap-3 text-[15px]">
                    <Leaf
                      size={17}
                      strokeWidth={1.5}
                      className="text-gold shrink-0"
                      aria-hidden="true"
                    />
                    {pick(item)}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TextLink href="/quality">{d.storyQuality}</TextLink>
              </div>
            </Reveal>
          </div>
        </section>

        {/* How to use — only when official usage data exists */}
        {product.usage && (
          <section className={`bg-ivory ${sectionY}`}>
            <div className={container}>
              <h2 className={`${h2Class} text-burgundy`}>{d.usageTitle}</h2>
              <p className="text-muted mt-4 max-w-2xl text-[15px] leading-8">
                {pick(product.usage)}
              </p>
            </div>
          </section>
        )}

        {/* Related — horizontal rail */}
        <section className={`bg-ivory ${sectionY}`}>
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>{d.moreEyebrow}</Eyebrow>
                <h2 className={`${h2Class} text-burgundy mt-4`}>{d.moreTitle}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRail(-1)}
                  aria-label={d.previous}
                  className="border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-ivory flex h-11 w-11 items-center justify-center rounded-lg border transition-colors"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail(1)}
                  aria-label={d.next}
                  className="border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-ivory flex h-11 w-11 items-center justify-center rounded-lg border transition-colors"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <ActionLink
                  href="/products"
                  variant="secondary"
                  className="ml-2 hidden sm:inline-flex"
                >
                  {d.allProducts}
                </ActionLink>
              </div>
            </div>
          </div>
          <div
            ref={rail}
            className="mt-8 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:max-w-[1400px] lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group bg-cream hover:border-gold/70 w-[78vw] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-xl border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(36,19,15,0.1)] sm:w-[46vw] lg:w-[31%]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={format(dict.common.servingAlt, { name: pick(item.name) })}
                    fill
                    sizes="(max-width: 640px) 78vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="bg-ivory/90 text-burgundy absolute top-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                    {dict.categories[item.category]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="text-burgundy font-serif text-2xl leading-tight">
                      {pick(item.name)}
                    </h3>
                    <p className="text-muted mt-1 text-xs">{item.packSizes.join(" · ")}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="text-burgundy shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
