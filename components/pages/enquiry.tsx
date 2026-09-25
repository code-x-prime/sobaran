"use client";

import Image from "next/image";
import { Package, Store, Users } from "lucide-react";
import { useLanguage } from "@/components/language";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageFrame } from "@/components/page-frame";
import { Reveal } from "@/components/home/reveal";
import { site } from "@/data/site";

function PartnerComposition() {
  const { dict } = useLanguage();
  const roles = dict.enquiryPage.roles;
  const items = [
    { Icon: Store, label: roles.retailer },
    { Icon: Users, label: roles.distributor },
    { Icon: Package, label: roles.partner },
  ];
  return (
    <Reveal delay={0.3} className="relative mx-auto w-full max-w-[540px] pb-6 sm:pb-0">
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-[0_24px_50px_rgba(36,19,15,0.16)]">
        <Image
          src={site.finalImage}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-cover"
        />
        <div className="from-dark-burgundy/60 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>
      <div className="bg-dark-burgundy text-ivory relative -mt-16 ml-4 max-w-[340px] rounded-xl p-5 shadow-xl sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:ml-0">
        <Image
          src={site.logoGold}
          alt="SOBARAN"
          width={694}
          height={502}
          sizes="64px"
          className="h-11 w-auto"
        />
        <ul className="mt-4 grid gap-2.5">
          {items.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm">
              <span className="border-light-gold/35 text-light-gold flex h-8 w-8 items-center justify-center rounded-full border">
                <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function EnquiryContent() {
  const { dict } = useLanguage();
  const e = dict.enquiryPage;
  return (
    <PageFrame
      variant="split"
      crumb={e.crumb}
      eyebrow={e.eyebrow}
      title={e.title}
      description={e.description}
      aside={<PartnerComposition />}
    >
      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <p className="text-gold text-[11px] font-semibold tracking-[0.22em] uppercase">
            {e.sideEyebrow}
          </p>
          <h2 className="text-burgundy mt-4 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.2]">
            {e.sideTitle}
          </h2>
          <p className="text-muted mt-5 max-w-md text-sm leading-8">{e.sideBody}</p>
          <div className="border-gold text-muted mt-8 border-t pt-6 text-sm leading-7">
            {e.company}
            <br />
            {e.location}
          </div>
        </div>
        <EnquiryForm />
      </section>
    </PageFrame>
  );
}
