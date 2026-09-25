"use client";

import { useLanguage } from "@/components/language";
import { PageFrame } from "@/components/page-frame";
import { ActionLink } from "@/components/ui/action-link";

export function NotFoundContent() {
  const { dict } = useLanguage();
  const n = dict.notFound;
  return (
    <PageFrame eyebrow={n.eyebrow} title={n.title} description={n.body}>
      <section className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <ActionLink href="/">{n.home}</ActionLink>
        <ActionLink href="/products" variant="secondary">
          {n.products}
        </ActionLink>
      </section>
    </PageFrame>
  );
}
