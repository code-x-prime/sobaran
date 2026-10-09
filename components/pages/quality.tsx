"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Blend,
  CheckCircle2,
  Droplets,
  FileCheck2,
  Leaf,
  PackageCheck,
  ScanSearch,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import { useLanguage } from "@/components/language";
import { PageFrame } from "@/components/page-frame";
import { QualityTimeline } from "@/components/home/quality-timeline";
import { GoldLine, Reveal, RevealGroup, RevealItem } from "@/components/home/reveal";
import { Eyebrow, IconBadge, container, h2Class, h3Class, sectionY } from "@/components/pages/ui";
import { site } from "@/data/site";

export function QualityContent() {
  const { dict } = useLanguage();
  const q = dict.qualityPage;
  const fssai: string | null = site.fssai;
  const processIcons = [Sprout, Droplets, Settings2, Blend, ScanSearch, PackageCheck];
  const promiseIcons = [Leaf, ShieldCheck, Sparkles, BadgeCheck];

  return (
    <PageFrame
      variant="image"
      crumb={q.crumb}
      eyebrow={q.eyebrow}
      title={q.title}
      description={q.description}
      image={site.ingredientImage}
      imageAlt={q.ingredients.imageAlt}
    >
      {/* Intro */}
      <section className={`bg-ivory ${sectionY}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
          <Reveal>
            <Eyebrow>{q.intro.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{q.intro.title}</h2>
            <GoldLine className="mt-6 w-16" />
            <p className="text-muted mt-6 max-w-lg text-[15px] leading-8">{q.intro.body}</p>
          </Reveal>
          <RevealGroup as="ul" className="grid grid-cols-2 gap-3 self-center sm:grid-cols-3">
            {q.intro.areas.map((area, index) => (
              <RevealItem
                as="li"
                key={area}
                className="bg-cream hover:border-gold/60 flex flex-col gap-3 rounded-xl border border-transparent p-4 transition-colors duration-300 sm:p-5"
              >
                <span className="text-gold text-[11px] font-semibold tracking-[0.18em]">
                  0{index + 1}
                </span>
                <span className="text-burgundy font-serif text-lg leading-snug">{area}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process — six-step scroll timeline */}
      <QualityTimeline copy={q.process} icons={processIcons} />

      {/* Ingredients — full-bleed photography */}
      <section className="bg-ivory py-4 md:py-6">
        <div
          data-clip-reveal
          className="bg-brown text-ivory relative min-h-[480px] overflow-hidden md:mx-4 md:rounded-2xl lg:min-h-[560px]"
        >
          <Image
            src="/images/gallery-market.jpg"
            alt=""
            fill
            sizes="100vw"
            data-parallax
            className="scale-110 object-cover"
          />
          <div className="from-brown/95 via-brown/65 absolute inset-0 bg-gradient-to-r to-transparent" />
          <div
            className={`${container} relative flex min-h-[480px] flex-col justify-end py-14 lg:min-h-[560px] lg:py-20`}
          >
            <Reveal className="max-w-2xl">
              <Eyebrow light>{q.ingredients.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.2]">
                {q.ingredients.title}
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-8 text-white/80">
                {q.ingredients.body}
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-8 flex flex-wrap gap-2.5">
              {q.ingredients.labels.map((label) => (
                <RevealItem
                  as="li"
                  key={label}
                  className="border-light-gold/40 bg-brown/50 flex items-center gap-2 rounded-lg border px-4 py-2 font-serif text-lg backdrop-blur-sm"
                >
                  <Leaf
                    size={15}
                    strokeWidth={1.5}
                    className="text-light-gold"
                    aria-hidden="true"
                  />
                  {label}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className={`bg-ivory ${sectionY}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/products/dardara-sabzi-masala-box.jpg"
                alt={q.packaging.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-image-reveal
                className="object-cover"
              />
            </div>
            <div className="bg-burgundy text-light-gold absolute -right-2 -bottom-5 flex h-16 w-16 items-center justify-center rounded-xl shadow-lg sm:-right-5">
              <PackageCheck size={26} strokeWidth={1.4} aria-hidden="true" />
            </div>
          </div>
          <Reveal>
            <Eyebrow>{q.packaging.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{q.packaging.title}</h2>
            <p className="text-muted mt-5 text-[15px] leading-8">{q.packaging.body}</p>
            <ul className="mt-7 grid gap-3">
              {q.packaging.points.map((point) => (
                <li key={point} className="text-brown flex items-center gap-3 text-[15px]">
                  <CheckCircle2
                    size={19}
                    strokeWidth={1.6}
                    className="text-gold shrink-0"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Promise */}
      <section className={`bg-cream ${sectionY}`}>
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{q.promise.eyebrow}</Eyebrow>
              <h2 className={`${h2Class} text-burgundy mt-4`}>{q.promise.title}</h2>
            </div>
          </div>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {q.promise.items.map((item, index) => (
              <RevealItem
                key={item.title}
                className="group bg-ivory hover:border-gold/60 relative overflow-hidden rounded-xl border border-[#e3d4ba] p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7"
              >
                <span className="bg-gold absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <IconBadge Icon={promiseIcons[index]} />
                <h3 className={`${h3Class} text-burgundy mt-6`}>{item.title}</h3>
                <p className="text-muted mt-2 text-sm leading-6">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FSSAI — official information panel */}
      <section id="fssai" className={`bg-ivory scroll-mt-20 ${sectionY}`}>
        <div className={container}>
          <Reveal className="bg-dark-burgundy text-ivory relative overflow-hidden rounded-2xl p-6 sm:p-10 lg:p-14">
            <ShieldCheck
              aria-hidden="true"
              size={220}
              strokeWidth={0.4}
              className="text-light-gold/[0.07] pointer-events-none absolute -right-10 -bottom-10"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <Eyebrow light>{q.fssai.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.2]">
                  {q.fssai.title}
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-8 text-[#ead8be]">{q.fssai.body}</p>
              </div>
              <dl className="border-light-gold/25 rounded-xl border bg-white/[0.04] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <FileCheck2
                    size={22}
                    strokeWidth={1.5}
                    className="text-light-gold mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-light-gold text-[11px] font-semibold tracking-[0.18em] uppercase">
                      {q.fssai.licenceLabel}
                    </dt>
                    <dd className="mt-2 font-serif text-xl leading-snug">
                      {fssai ?? q.fssai.pending}
                    </dd>
                  </div>
                </div>
                <p className="border-light-gold/20 mt-5 border-t pt-4 text-xs leading-6 text-[#cdb99c]">
                  {q.fssai.note}
                </p>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </PageFrame>
  );
}
