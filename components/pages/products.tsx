"use client";

import { useWhatsappHref } from "@/components/ui/use-whatsapp";
import Image from "next/image";
import { Leaf, Package, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/language";
import { format } from "@/lib/i18n";
import { PageFrame } from "@/components/page-frame";
import { ProductCatalog } from "@/components/product-catalog";
import { Reveal } from "@/components/home/reveal";
import { products } from "@/data/products";
import { ActionLink } from "@/components/ui/action-link";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { Eyebrow, IconBadge, container, h2Class, sectionY } from "@/components/pages/ui";

function ProductCollage() {
  const { dict, pick } = useLanguage();
  const [main, second, third] = products;
  return (
    <Reveal delay={0.3} className="relative mx-auto w-full max-w-[560px]">
      <div className="grid grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
        <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_24px_50px_rgba(36,19,15,0.18)]">
          <Image
            src={main.image}
            alt={format(dict.common.servingAlt, { name: pick(main.name) })}
            fill
            priority
            sizes="(max-width: 1024px) 55vw, 30vw"
            className="object-cover"
          />
          <span className="bg-ivory/90 text-burgundy absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold backdrop-blur">
            {pick(main.name)}
          </span>
        </div>
        {[second, third].map((product) => (
          <div
            key={product.slug}
            className="relative aspect-square overflow-hidden rounded-xl shadow-[0_16px_36px_rgba(36,19,15,0.14)]"
          >
            <Image
              src={product.image}
              alt={format(dict.common.servingAlt, { name: pick(product.name) })}
              fill
              sizes="(max-width: 1024px) 40vw, 22vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="bg-burgundy text-ivory absolute -bottom-5 left-6 rounded-xl px-4 py-3 shadow-lg sm:left-10">
        <p className="text-light-gold text-[10px] font-semibold tracking-[0.18em] uppercase">
          {dict.productsPage.rangeLabel}
        </p>
        <p className="font-serif text-lg">{dict.productsPage.range}</p>
      </div>
      <Leaf
        aria-hidden="true"
        size={42}
        strokeWidth={1}
        className="text-gold/60 absolute -top-6 -left-4 -rotate-12"
      />
      <Leaf
        aria-hidden="true"
        size={28}
        strokeWidth={1}
        className="text-gold/50 absolute -right-3 bottom-16 rotate-45"
      />
    </Reveal>
  );
}

/** Large editorial feature for the signature product. */
function FeaturedProduct() {
  const { dict, pick } = useLanguage();
  const product = products[0];
  return (
    <section className={`bg-ivory ${sectionY}`}>
      <div className={container}>
        <div className="bg-cream grid overflow-hidden rounded-2xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px]">
            <Image
              src={product.image}
              alt={format(dict.common.servingAlt, { name: pick(product.name) })}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              data-parallax
              className="scale-110 object-cover"
            />
            <span className="bg-light-gold text-dark-burgundy absolute top-5 left-5 rounded-md px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase">
              {dict.common.signature}
            </span>
          </div>
          <Reveal className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <Eyebrow>{dict.productsPage.featured.eyebrow}</Eyebrow>
            <h2 className={`${h2Class} text-burgundy mt-4`}>{pick(product.name)}</h2>
            <p className="text-muted mt-4 text-[15px] leading-8">{pick(product.detail)}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.highlights.map((item) => (
                <li
                  key={item.en}
                  className="text-brown bg-ivory flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                >
                  <Leaf size={14} strokeWidth={1.6} className="text-gold" aria-hidden="true" />
                  {pick(item)}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <Package size={18} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
              <span className="text-muted text-sm">{dict.product.packSizes}:</span>
              <span className="text-burgundy font-semibold">{product.packSizes.join(" · ")}</span>
            </div>
            <ActionLink href={`/products/${product.slug}`} className="mt-8 self-start">
              {dict.productsPage.featured.cta}
            </ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ProductsContent() {
  const whatsappHref = useWhatsappHref();
  const { dict } = useLanguage();
  const p = dict.productsPage;
  return (
    <PageFrame
      variant="split"
      crumb={p.crumb}
      eyebrow={p.eyebrow}
      title={p.title}
      description={p.description}
      aside={<ProductCollage />}
      actions={
        <>
          <ActionLink href="/products#catalog">{p.browse}</ActionLink>
          <ActionLink
            href={whatsappHref}
            variant="secondary"
            icon={<WhatsappIcon width={16} height={16} />}
          >
            {dict.common.whatsappAsk}
          </ActionLink>
        </>
      }
    >
      <FeaturedProduct />
      <section id="catalog" className="bg-cream scroll-mt-20 py-14 md:py-20">
        <div className={container}>
          <Eyebrow>{p.catalogEyebrow}</Eyebrow>
          <h2 className={`${h2Class} text-burgundy mt-4 mb-8`}>{p.catalogTitle}</h2>
          <ProductCatalog />
        </div>
      </section>
      <section className="bg-ivory py-14 md:py-16">
        <div className={container}>
          <Reveal className="border-gold/40 flex flex-col gap-6 rounded-2xl border border-dashed p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <IconBadge Icon={ShoppingBag} />
              <div>
                <h2 className="text-burgundy font-serif text-[1.9rem] leading-tight">
                  {p.helpTitle}
                </h2>
                <p className="text-muted mt-1 text-[15px]">{p.helpBody}</p>
              </div>
            </div>
            <ActionLink href={whatsappHref} icon={<WhatsappIcon width={16} height={16} />}>
              {dict.common.whatsappAsk}
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </PageFrame>
  );
}
