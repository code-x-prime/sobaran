import { NotFoundContent } from "@/components/pages/not-found";
import { getDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
  const { dict } = await getDictionary();
  return { title: dict.meta.notFound.title, description: dict.meta.notFound.description };
}

export default function NotFound() {
  return <NotFoundContent />;
}
