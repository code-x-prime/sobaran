import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/pages/product-detail";
import { products } from "@/data/products";
import { format } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/server";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { language, dict } = await getDictionary();
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: dict.meta.notFound.title };
  const title = format(dict.meta.product.title, { name: product.name[language] });
  const description = product.description[language];
  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const { language, dict } = await getDictionary();
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name[language],
      description: product.description[language],
      image: product.images.map((src) => `${base}${src}`),
      brand: { "@type": "Brand", name: "SOBARAN" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: dict.nav.home, item: base },
        {
          "@type": "ListItem",
          position: 2,
          name: dict.product.crumb,
          item: `${base}/products`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name[language],
          item: `${base}/products/${slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetailContent slug={slug} />
    </>
  );
}
