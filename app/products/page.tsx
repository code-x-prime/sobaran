import { ProductsContent } from "@/components/pages/products";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata() {
  return pageMetadata("products", "/products");
}

export default function ProductsPage() {
  return <ProductsContent />;
}
