"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle, Navigation, Store, Truck } from "lucide-react";
import { useLanguage } from "@/components/language";
import { PageFrame } from "@/components/page-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/home/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { useWhatsappHref } from "@/components/ui/use-whatsapp";
import { Eyebrow, IconBadge, container, h2Class, sectionY } from "@/components/pages/ui";
import { site } from "@/data/site";

const cities = [
  { key: "pratapgarh", image: "/images/places/pratapgarh.jpg" },
  { key: "prayagraj", image: "/images/places/prayagraj.jpg" },
] as const;

/**
 * Illustrated, non-geographic map of the two launch cities. When `site.mapEmbedUrl` is set
 * the live Google Maps embed is rendered in its place.
 */
function MapPanel() {
  const { dict } = useLanguage();
  const reduced = useReducedMotion();
  const embed: string | null = site.mapEmbedUrl;
  const m = dict.wherePage.map;

  if (embed) {
    return (
      <iframe
        src={embed}
        title={m.title.replace("\n", " ")}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[5/4] w-full rounded-2xl border border-[#e3d4ba]"
      />
    );
  }

  const pins = [
    { key: "pratapgarh" as const, x: 33, y: 37.5, main: true, label: m.origin },
    { key: "prayagraj" as const, x: 66, y: 67.5, main: false, label: m.next },
  ];

  return (
    <div
      data-clip-reveal
      className="bg-ivory relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-[#e3d4ba] shadow-[0_24px_60px_rgba(36,19,15,0.1)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(rgba(101,0,11,0.14)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      {[84, 60, 36].map((size) => (
        <span
          key={size}
          aria-hidden="true"
          style={{ width: `${size}%` }}
          className="border-gold/25 absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        />
      ))}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 80"
        className="text-gold absolute inset-0 h-full w-full"
        fill="none"
      >
        <motion.path
          d="M33 30 C 45 34, 55 44, 66 54"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
      {pins.map((pin, index) => (
        <motion.div
          key={pin.key}
          initial={reduced ? false : { opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.9 }}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
        >
          <span
            className={`rounded-lg px-3 py-1.5 text-center shadow-md ${pin.main ? "bg-burgundy text-ivory" : "bg-ivory text-burgundy border-gold/40 border"}`}
          >
            <span className="block font-serif text-base leading-tight sm:text-lg">
              {dict.cities[pin.key].name}
            </span>
            <span
              className={`block text-[10px] font-semibold tracking-[0.12em] uppercase ${pin.main ? "text-light-gold" : "text-gold"}`}
            >
              {pin.label}
            </span>
          </span>
          <MapPin
            size={26}
            strokeWidth={1.6}
            className={`mt-1 ${pin.main ? "text-burgundy fill-light-gold" : "text-gold fill-ivory"}`}
            aria-hidden="true"
          />
        </motion.div>
      ))}
      <span className="text-muted absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase">
        <Navigation size={13} aria-hidden="true" /> {m.region}
      </span>
    </div>
  );
}

export function WhereContent() {
  const { dict } = useLanguage();
  const whatsappHref = useWhatsappHref();
  const w = dict.wherePage;
  const partners = [
    { Icon: Store, copy: w.partner.retailer, href: "/enquiry?type=retailer" },
    { Icon: Truck, copy: w.partner.distributor, href: "/enquiry?type=distributor" },
  ];

  return (
    <PageFrame
      variant="image"
      crumb={w.crumb}
      eyebrow={w.eyebrow}
      title={w.title}
      description={w.description}
      image="/images/places/prayagraj.jpg"
      imageAlt={w.heroImageAlt}
      actions={
        <ActionLink href={whatsappHref} variant="gold" icon={<MessageCircle size={16} />}>
          {w.cta}
        </ActionLink>
      }
    >
      {/* Current locations */}
      <section className={`bg-ivory ${sectionY}`}>
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>{w.locations.eyebrow}</Eyebrow>
              <h2 className={`${h2Class} text-burgundy mt-4`}>{w.locations.title}</h2>
            </div>
            <p className="text-muted max-w-sm text-sm leading-7">{w.locations.body}</p>
          </div>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.12}>
            {cities.map(({ key, image }, index) => {
              const city = dict.cities[key];
              return (
                <RevealItem key={key}>
                  <article className="group bg-cream hover:border-gold/60 h-full overflow-hidden rounded-2xl border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(36,19,15,0.1)]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={image}
                        alt={city.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="bg-burgundy text-ivory absolute top-4 left-4 rounded-md px-2.5 py-1 text-[11px] font-semibold">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex items-start gap-4 p-6 sm:p-7">
                      <IconBadge Icon={MapPin} />
                      <div>
                        <h3 className="text-burgundy font-serif text-[2rem] leading-tight">
                          {city.name}
                        </h3>
                        <p className="text-gold mt-1 text-xs font-semibold">{city.note}</p>
                        <p className="text-muted mt-3 text-sm leading-7">{city.description}</p>
                      </div>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Map */}
      <section className={`bg-cream ${sectionY}`}>
        <div
          className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16`}
        >
          <Reveal>
            <Eyebrow>{w.map.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{w.map.title}</h2>
            <p className="text-muted mt-5 max-w-md text-[15px] leading-8">{w.map.body}</p>
          </Reveal>
          <MapPanel />
        </div>
      </section>

      {/* Availability */}
      <section className="bg-ivory pt-4 md:pt-6">
        <div className="bg-burgundy text-ivory relative overflow-hidden md:mx-4 md:rounded-2xl">
          <MessageCircle
            aria-hidden="true"
            size={260}
            strokeWidth={0.4}
            className="text-light-gold/[0.07] pointer-events-none absolute -right-12 -bottom-16"
          />
          <div
            className={`${container} relative grid gap-8 py-14 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center`}
          >
            <Reveal>
              <Eyebrow light>{w.availability.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.2]">
                {w.availability.title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#ead8be]">
                {w.availability.body}
              </p>
            </Reveal>
            <ActionLink href={whatsappHref} variant="gold" icon={<MessageCircle size={16} />}>
              {dict.common.whatsappAsk}
            </ActionLink>
          </div>
        </div>
      </section>

      {/* Retailer / distributor */}
      <section className={`bg-ivory ${sectionY}`}>
        <div className={container}>
          <Eyebrow>{w.partner.eyebrow}</Eyebrow>
          <h2 className={`${h2Class} text-burgundy mt-4`}>{w.partner.title}</h2>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
            {partners.map(({ Icon, copy, href }) => (
              <RevealItem key={href}>
                <Link
                  href={href}
                  className="group border-beige hover:border-gold/70 bg-cream relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(36,19,15,0.1)] sm:p-9"
                >
                  <Icon
                    aria-hidden="true"
                    size={150}
                    strokeWidth={0.5}
                    className="text-gold/10 pointer-events-none absolute -right-6 -bottom-8 transition-transform duration-700 group-hover:-translate-y-2"
                  />
                  <IconBadge Icon={Icon} />
                  <h3 className="text-burgundy mt-6 font-serif text-[2.1rem] leading-tight">
                    {copy.title}
                  </h3>
                  <p className="text-muted relative mt-3 max-w-sm text-[15px] leading-7">
                    {copy.body}
                  </p>
                  <span className="text-burgundy relative mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    {copy.cta}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </PageFrame>
  );
}
