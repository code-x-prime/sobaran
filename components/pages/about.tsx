"use client";

import Image from "next/image";
import { BookOpen, Leaf, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language";
import { PageFrame } from "@/components/page-frame";
import { SplitWords } from "@/components/home/hero-sequence";
import { GoldLine, Reveal, RevealGroup, RevealItem } from "@/components/home/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow, IconBadge, container, h2Class, h3Class, sectionY } from "@/components/pages/ui";
import { site } from "@/data/site";

export function AboutContent() {
  const { dict } = useLanguage();
  const a = dict.about;
  const principleIcons = [Leaf, Sparkles, ShieldCheck];

  return (
    <PageFrame
      variant="image"
      crumb={a.crumb}
      eyebrow={a.eyebrow}
      title={a.title}
      description={a.description}
      image={site.storyImage}
      imageAlt={a.pratapgarh.imageAlt}
      actions={
        <ActionLink href="/about#origin" variant="gold">
          {a.heroCta}
        </ActionLink>
      }
    >
      {/* Origin — overlapping image and text */}
      <section id="origin" className={`bg-ivory scroll-mt-20 ${sectionY}`}>
        <div className={`${container} grid items-center lg:grid-cols-12`}>
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
              <Image
                src={site.finalImage}
                alt={a.origin.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                data-image-reveal
                className="object-cover"
              />
            </div>
            <Reveal
              delay={0.3}
              className="bg-gold text-dark-burgundy absolute -bottom-5 left-4 max-w-[260px] rounded-xl px-5 py-4 shadow-lg sm:left-8"
            >
              <p className="font-serif text-xl leading-snug">“{a.origin.quote}”</p>
            </Reveal>
          </div>
          <Reveal
            delay={0.1}
            className="bg-cream border-gold relative z-10 mt-12 rounded-2xl border-t-2 p-6 shadow-[0_24px_60px_rgba(36,19,15,0.1)] sm:p-9 lg:col-span-5 lg:mt-0 lg:-ml-24 lg:p-11"
          >
            <IconBadge Icon={BookOpen} />
            <div className="mt-6">
              <Eyebrow>{a.origin.eyebrow}</Eyebrow>
            </div>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{a.origin.title}</h2>
            <GoldLine className="mt-6 w-16" />
            <p className="text-brown/85 mt-6 text-[15px] leading-8">{a.origin.body}</p>
            <p className="text-muted mt-4 text-[15px] leading-8">{a.origin.body2}</p>
          </Reveal>
        </div>
      </section>

      {/* Pratapgarh — image + editorial timeline */}
      <section className={`bg-cream ${sectionY}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
          <div
            data-clip-reveal
            className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-2 lg:aspect-[4/5]"
          >
            <Image
              src={site.storyImage}
              alt={a.pratapgarh.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[40%_center]"
            />
            <span className="bg-ivory/90 text-burgundy absolute top-4 left-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold backdrop-blur">
              <MapPin size={15} strokeWidth={1.6} className="text-gold" aria-hidden="true" />
              {dict.cities.pratapgarh.name}, {dict.common.region}
            </span>
          </div>
          <div>
            <Eyebrow>{a.pratapgarh.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{a.pratapgarh.title}</h2>
            <p className="text-muted mt-5 max-w-xl text-[15px] leading-8">{a.pratapgarh.body}</p>
            <RevealGroup as="ol" className="relative mt-8 grid gap-6 pl-10">
              <span
                aria-hidden="true"
                className="from-gold via-gold/50 absolute top-2 bottom-2 left-[13px] w-px bg-gradient-to-b to-transparent"
              />
              {a.pratapgarh.steps.map((step, index) => (
                <RevealItem as="li" key={step.title} className="relative">
                  <span className="bg-burgundy text-light-gold absolute top-0.5 -left-10 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold">
                    {index + 1}
                  </span>
                  <h3 className={`${h3Class} text-burgundy`}>{step.title}</h3>
                  <p className="text-muted mt-1 text-sm leading-7">{step.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Philosophy — statement + principles */}
      <section className={`bg-ivory ${sectionY}`}>
        <div className={container}>
          <Reveal className="mx-auto max-w-4xl text-center">
            <Eyebrow center>{a.philosophy.eyebrow}</Eyebrow>
            <h2
              data-split-reveal
              className="text-burgundy mt-5 font-serif text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.25] whitespace-pre-line"
            >
              <SplitWords text={a.philosophy.title} />
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
            {a.philosophy.items.map((item, index) => (
              <RevealItem
                key={item.title}
                className="group bg-cream hover:border-gold/60 rounded-xl border border-transparent p-6 transition-all duration-500 hover:-translate-y-1 sm:p-8"
              >
                <IconBadge Icon={principleIcons[index]} />
                <h3 className={`${h3Class} text-burgundy mt-6`}>{item.title}</h3>
                <p className="text-muted mt-2 text-sm leading-7">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Vision — dark burgundy with gold type */}
      <section className="bg-ivory pb-4 md:pb-6">
        <div
          className={`bg-dark-burgundy text-ivory relative overflow-hidden md:mx-4 md:rounded-2xl ${sectionY}`}
        >
          <span
            data-drift
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-serif text-[30vw] leading-none whitespace-nowrap text-white/[0.03] select-none lg:text-[18vw]"
          >
            SOBARAN
          </span>
          <div
            className={`${container} relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end`}
          >
            <Reveal>
              <Eyebrow light>{a.vision.eyebrow}</Eyebrow>
              <h2 className="text-light-gold mt-5 font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.15]">
                {a.vision.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#ead8be]">{a.vision.body}</p>
            </Reveal>
            <RevealGroup as="ul" className="grid gap-3">
              {a.vision.points.map((point) => (
                <RevealItem
                  as="li"
                  key={point}
                  className="border-light-gold/20 flex items-center gap-4 rounded-xl border bg-white/[0.04] px-5 py-4"
                >
                  <Sparkles
                    size={18}
                    strokeWidth={1.5}
                    className="text-light-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-xl">{point}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Future — text + collage */}
      <section className={`bg-ivory ${sectionY}`}>
        <div
          className={`${container} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16`}
        >
          <Reveal>
            <Eyebrow>{a.future.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{a.future.title}</h2>
            <p className="text-muted mt-5 text-[15px] leading-8">{a.future.body}</p>
            <p className="border-gold/60 text-brown/80 mt-6 border-l-2 pl-4 text-sm leading-7">
              {a.future.note}
            </p>
          </Reveal>
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 sm:gap-4">
            {[site.ingredientImage, "/images/khichdi.jpg", "/images/gallery-chai.jpg"].map(
              (src, index) => (
                <Reveal
                  key={src}
                  delay={index * 0.12}
                  className={`relative overflow-hidden rounded-xl ${index === 0 ? "row-span-2 aspect-[3/4] sm:aspect-auto" : "aspect-square"}`}
                >
                  <Image
                    src={src}
                    alt={a.future.alts[index]}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA — image band */}
      <section className="bg-ivory pb-14 md:pb-20">
        <div className={container}>
          <div className="bg-brown text-ivory relative overflow-hidden rounded-2xl">
            <Image
              src={site.heroImage}
              alt=""
              fill
              sizes="100vw"
              data-parallax
              className="scale-110 object-cover"
            />
            <div className="from-brown/95 via-brown/70 absolute inset-0 bg-gradient-to-r to-transparent" />
            <Reveal className="relative max-w-xl px-6 py-14 sm:px-12 sm:py-16">
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.2]">
                {a.cta.title}
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-white/80">{a.cta.body}</p>
              <ActionLink href="/products" variant="gold" className="mt-7">
                {a.cta.button}
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
