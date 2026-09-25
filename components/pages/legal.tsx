"use client";

import { useLanguage } from "@/components/language";
import { PageFrame } from "@/components/page-frame";

export function LegalContent({ page }: { page: "privacy" | "terms" }) {
  const { dict } = useLanguage();
  const copy = dict.legal[page];
  return (
    <PageFrame
      crumb={copy.crumb}
      eyebrow={dict.legal.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <section className="text-muted mx-auto max-w-3xl space-y-6 px-4 py-14 text-[15px] leading-8 sm:px-6 lg:py-20">
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </PageFrame>
  );
}
