"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/language";
import { format } from "@/lib/i18n";

export function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [selected, setSelected] = useState(0);
  const { dict } = useLanguage();
  return (
    <div>
      <div className="group bg-beige relative aspect-[4/4.2] overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(36,19,15,0.16)] lg:aspect-[4/3.6]">
        <Image
          src={images[selected]}
          alt={format(dict.common.servingAlt, { name })}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <p className="bg-ivory/90 text-burgundy absolute right-4 bottom-4 left-4 rounded-lg px-4 py-2.5 text-[11px] leading-5 backdrop-blur sm:right-auto">
          {dict.product.galleryNote}
        </p>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, index) => (
            <button
              type="button"
              key={src}
              onClick={() => setSelected(index)}
              aria-label={format(dict.product.viewImage, { n: index + 1 })}
              aria-pressed={selected === index}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${selected === index ? "border-gold" : "border-transparent"}`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
