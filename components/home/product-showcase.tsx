"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/components/language";
import { categories, products, type CategoryFilter } from "@/data/products";
import { format } from "@/lib/i18n";

const ease = [0.22, 0.7, 0.2, 1] as const;

export function ProductShowcase() {
  const { dict, pick } = useLanguage();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<CategoryFilter>("all");
  const copy = dict.home.showcase;
  const visible =
    active === "all"
      ? products.slice(0, 5)
      : products.filter((product) => product.category === active);

  return (
    <section className="bg-cream py-16 md:py-20 lg:py-24" id="products">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="before:bg-gold flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] text-[#996c28] uppercase before:h-px before:w-8">
              {copy.eyebrow}
            </p>
            <h2 className="text-burgundy mt-5 max-w-[640px] font-serif text-[clamp(2.3rem,4.4vw,4rem)] leading-[1.2] whitespace-pre-line">
              {copy.title}
            </h2>
            <p className="text-muted mt-4 max-w-md text-[15px] leading-8">{copy.body}</p>
          </motion.div>
          <div
            role="group"
            aria-label={copy.filterLabel}
            className="-mx-4 flex [scrollbar-width:none] gap-6 overflow-x-auto px-4 whitespace-nowrap sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((item) => {
              const selected = active === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(item)}
                  className={`relative shrink-0 pb-2.5 text-[13px] font-semibold transition-colors duration-300 ${selected ? "text-burgundy" : "text-muted hover:text-burgundy"}`}
                >
                  {dict.categories[item]}
                  {selected ? (
                    <motion.span
                      layoutId="category-underline"
                      className="bg-gold absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                      transition={{ duration: 0.35, ease }}
                    />
                  ) : (
                    <span className="bg-burgundy/15 absolute inset-x-0 bottom-0 h-px" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout={!reduced}
          className="-mx-4 mt-8 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-10 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((product, index) => {
              // Unfiltered: the lead product spans two columns with image and text side by side.
              const wide = active === "all" && index === 0;
              return (
                <motion.article
                  key={product.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.1, ease }}
                  className={`w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-auto sm:max-w-none ${wide ? "sm:col-span-2" : ""}`}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className={`group bg-ivory hover:border-gold/70 flex h-full flex-col overflow-hidden rounded-xl border border-[#e3d4ba] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(36,19,15,0.12)] ${wide ? "sm:grid sm:grid-cols-2" : ""}`}
                  >
                    <div className="bg-beige relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={format(dict.common.servingAlt, { name: pick(product.name) })}
                        fill
                        sizes={
                          wide
                            ? "(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 33vw"
                            : "(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 30vw"
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="bg-ivory/90 text-burgundy absolute top-4 left-4 rounded-md px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                        {dict.categories[product.category]}
                      </span>
                      {product.comingSoon && (
                        <span className="bg-burgundy/90 text-light-gold absolute top-4 right-4 rounded-md px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                          {dict.common.comingSoon}
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex flex-1 flex-col p-5 sm:p-6 ${wide ? "sm:justify-center lg:p-10" : ""}`}
                    >
                      <p className="text-gold text-xs font-semibold tracking-[0.12em]">
                        {product.packSizes.join(" · ")}
                      </p>
                      <h3
                        className={`text-burgundy mt-2 font-serif leading-tight ${wide ? "text-[1.9rem] lg:text-[2.4rem]" : "text-[1.6rem]"}`}
                      >
                        {pick(product.name)}
                      </h3>
                      <p className="text-muted mt-2 max-w-sm text-sm leading-6">
                        {pick(product.description)}
                      </p>
                      <span className="text-burgundy mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold">
                        {dict.common.viewProduct}
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted text-[11px]">{dict.common.servingNote}</p>
          <Link
            href="/products"
            className="group text-burgundy inline-flex items-center gap-2 text-[13px] font-semibold"
          >
            <span className="border-burgundy/40 group-hover:border-burgundy border-b pb-0.5 transition-colors">
              {dict.common.viewAllProducts}
            </span>
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
