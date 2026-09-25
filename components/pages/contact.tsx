"use client";

import { ArrowRight, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/language";
import { ContactForm } from "@/components/contact-form";
import { PageFrame } from "@/components/page-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/home/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { useWhatsappHref } from "@/components/ui/use-whatsapp";
import { Eyebrow, IconBadge, TextLink, container, h2Class, sectionY } from "@/components/pages/ui";
import { site } from "@/data/site";

type Block = { Icon: LucideIcon; label: string; value: string; href: string | null };

export function ContactContent() {
  const { dict } = useLanguage();
  const whatsappHref = useWhatsappHref();
  const c = dict.contactPage;
  const phone: string | null = site.phone;
  const email: string | null = site.email;

  const blocks: Block[] = [
    {
      Icon: Phone,
      label: c.blocks.phone,
      value: phone ?? c.blocks.pending,
      href: phone ? `tel:${phone}` : null,
    },
    {
      Icon: Mail,
      label: c.blocks.email,
      value: email ?? c.blocks.pending,
      href: email ? `mailto:${email}` : null,
    },
    {
      Icon: MessageCircle,
      label: c.blocks.whatsapp,
      value: c.blocks.whatsappValue,
      href: whatsappHref,
    },
    { Icon: MapPin, label: c.blocks.location, value: dict.footer.address, href: null },
  ];

  return (
    <PageFrame
      crumb={c.crumb}
      eyebrow={c.eyebrow}
      title={c.title}
      description={c.description}
      image={site.finalImage}
      imageAlt={c.heroImageAlt}
      actions={
        <ActionLink href={whatsappHref} variant="gold" icon={<MessageCircle size={16} />}>
          {dict.common.whatsappAsk}
        </ActionLink>
      }
    >
      <section className={`bg-ivory ${sectionY}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}>
          <div>
            <Eyebrow>{c.info.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{c.info.title}</h2>
            <p className="text-muted mt-4 max-w-md text-[15px] leading-8">{c.info.body}</p>
            <RevealGroup
              as="ul"
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {blocks.map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <IconBadge Icon={Icon} />
                    <span className="min-w-0">
                      <span className="text-muted block text-[11px] font-semibold tracking-[0.16em] uppercase">
                        {label}
                      </span>
                      <span className="text-brown mt-1 block text-[15px] leading-6 break-words">
                        {value}
                      </span>
                    </span>
                  </>
                );
                const box =
                  "group bg-cream flex h-full items-center gap-4 rounded-xl border border-transparent p-4 transition-all duration-300";
                return (
                  <RevealItem as="li" key={label}>
                    {href ? (
                      <a
                        href={href}
                        className={`${box} hover:border-gold/60 hover:-translate-y-0.5`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={box}>{inner}</div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
            <div className="mt-6">
              <TextLink href="/enquiry">{c.enquiry}</TextLink>
            </div>
          </div>
          <div>
            <Eyebrow>{c.formEyebrow}</Eyebrow>
            <h2 className="text-burgundy mt-4 mb-6 font-serif text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.2]">
              {c.formTitle}
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-14 md:pb-20">
        <div className={container}>
          <Reveal className="bg-burgundy text-ivory relative flex flex-col gap-6 overflow-hidden rounded-2xl p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
            <MessageCircle
              aria-hidden="true"
              size={200}
              strokeWidth={0.4}
              className="text-light-gold/[0.08] pointer-events-none absolute -right-8 -bottom-12"
            />
            <div className="relative">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.2]">
                {c.cta.title}
              </h2>
              <p className="mt-2 text-[15px] text-[#ead8be]">{c.cta.body}</p>
            </div>
            <ActionLink
              href={whatsappHref}
              variant="gold"
              className="relative"
              icon={<ArrowRight size={16} />}
            >
              {dict.common.whatsappAsk}
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </PageFrame>
  );
}
