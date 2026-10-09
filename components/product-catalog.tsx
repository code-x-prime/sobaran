"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language";
import { categories, products, searchProducts, type CategoryFilter } from "@/data/products";
import { format } from "@/lib/i18n";

export function ProductCatalog() {
  const { dict, pick } = useLanguage();
  const reduced = useReducedMotion();
  const p = dict.productsPage;
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const matches = searchProducts(
    category === "all" ? products : products.filter((product) => product.category === category),
    query,
  );
  const featured = category === "all" && !query.trim();

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 border-b border-[#dccbb0] pb-5 lg:flex-row lg:items-end">
        <div
          role="group"
          aria-label={dict.home.showcase.filterLabel}
          className="-mx-4 flex snap-x [scrollbar-width:none] gap-6 overflow-x-auto px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((item) => {
            const selected = category === item;
            return (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={selected}
                className={`relative min-h-11 shrink-0 snap-start pb-2.5 text-[13px] font-semibold transition-colors ${selected ? "text-burgundy" : "text-muted hover:text-burgundy"}`}
              >
                {dict.categories[item]}
                {selected && (
                  <motion.span
                    layoutId="catalog-category"
                    className="bg-gold absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
        <label className="bg-ivory focus-within:border-burgundy focus-within:ring-gold/20 flex min-h-11 w-full items-center gap-2 rounded-lg border border-[#dccbb0] px-3 transition-[border-color,box-shadow] focus-within:ring-4 lg:w-72">
          <Search size={17} className="text-burgundy shrink-0" aria-hidden="true" />
          <span className="sr-only">{p.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={p.searchPlaceholder}
            className="placeholder:text-muted/70 text-brown w-full bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={p.reset}
              className="text-muted hover:text-burgundy shrink-0"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      <p role="status" className="text-muted mt-4 text-xs">
        {format(p.results, { count: matches.length })}
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {matches.map((product, index) => {
            // When unfiltered the lead product spans two columns on wide screens; the rest stay square.
            const wide = featured && index === 0;
            return (
              <motion.article
                key={product.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className={wide ? "xl:col-span-2" : ""}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className={`group bg-ivory hover:border-gold/70 block h-full overflow-hidden rounded-xl border border-[#e3d4ba] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(36,19,15,0.1)] ${wide ? "xl:grid xl:grid-cols-2" : ""}`}
                >
                  <div className={`bg-beige relative aspect-square overflow-hidden`}>
                    <Image
                      src={product.image}
                      alt={format(dict.common.servingAlt, { name: pick(product.name) })}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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
                    className={`flex flex-col p-6 sm:p-7 ${wide ? "xl:justify-center xl:p-10" : ""}`}
                  >
                    <p className="text-gold text-xs font-semibold tracking-[0.12em]">
                      {product.packSizes.join(" · ")}
                    </p>
                    <h3 className="text-burgundy mt-3 font-serif text-[1.9rem] leading-[1.2] sm:text-[2.1rem]">
                      {pick(product.name)}
                    </h3>
                    <p className="text-muted mt-3 text-sm leading-7">{pick(product.description)}</p>
                    <span className="text-burgundy mt-6 inline-flex items-center gap-2 text-[13px] font-semibold">
                      {dict.common.viewProduct}
                      <ArrowRight
                        size={15}
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
      </div>

      {matches.length === 0 && (
        <div className="bg-cream/60 mt-2 rounded-xl border border-dashed border-[#dccbb0] px-6 py-14 text-center">
          <p className="text-burgundy font-serif text-2xl">{p.empty}</p>
          <p className="text-muted mt-2 text-sm">{p.emptyHint}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="text-burgundy border-burgundy/40 hover:border-burgundy mt-5 border-b pb-0.5 text-[13px] font-semibold"
          >
            {p.reset}
          </button>
        </div>
      )}
      <p className="text-muted mt-7 text-xs">{dict.common.servingNote}</p>
    </div>
  );
}
