import type { MetadataRoute } from "next";
import { products } from "@/data/products";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/about",
    "/quality",
    "/where-to-buy",
    "/enquiry",
    "/contact",
    "/privacy",
    "/terms",
    ...products.map((product) => `/products/${product.slug}`),
  ];
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
