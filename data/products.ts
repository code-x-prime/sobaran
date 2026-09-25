import type { Localized } from "@/lib/i18n/config";

/** Language-neutral category keys; labels live in the dictionaries under `categories`. */
export const categories = ["all", "spices", "breakfast", "millets", "beverages"] as const;
export type CategoryFilter = (typeof categories)[number];
export type ProductCategory = Exclude<CategoryFilter, "all">;

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  name: Localized;
  description: Localized;
  detail: Localized;
  packSizes: string[];
  image: string;
  images: string[];
  /** Official values are not available yet — null renders a "from the pack label" note. */
  mrp: Localized | null;
  ingredients: Localized | null;
  storage: Localized | null;
  /** Usage directions from the official label; the section is hidden while null. */
  usage: Localized | null;
  highlights: Localized[];
};

export const products: Product[] = [
  {
    id: "dardara-sabzi-masala",
    slug: "dardara-sabzi-masala",
    category: "spices",
    name: { hi: "दरदरा सब्जी मसाला", en: "Dardara Sabzi Masala" },
    description: {
      hi: "एक मसाला — रोज़ की कई सब्ज़ियों के लिए।",
      en: "One masala for many everyday vegetable dishes.",
    },
    detail: {
      hi: "भारतीय सब्ज़ियों के परिचित स्वाद से प्रेरित एक दरदरा मसाला।",
      en: "A coarse masala inspired by the familiar flavours of Indian vegetable dishes.",
    },
    packSizes: ["100g", "200g"],
    image: "/images/dardara.jpg",
    images: ["/images/dardara.jpg", "/images/ingredients.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [
      { hi: "रोज़ की सब्ज़ियों के लिए", en: "For everyday vegetables" },
      { hi: "दरदरा टेक्सचर", en: "Coarse texture" },
    ],
  },
  {
    id: "premium-upma",
    slug: "premium-upma",
    category: "breakfast",
    name: { hi: "प्रीमियम उपमा", en: "Premium Upma" },
    description: {
      hi: "एक आसान सुबह के लिए परिचित नाश्ते का स्वाद।",
      en: "A familiar breakfast for an easy morning.",
    },
    detail: {
      hi: "सुबह के सहज, भारतीय नाश्ते से प्रेरित।",
      en: "Inspired by the comfort of a simple Indian breakfast.",
    },
    packSizes: ["200g"],
    image: "/images/upma.jpg",
    images: ["/images/upma.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "सुबह के नाश्ते के लिए", en: "For the morning table" }],
  },
  {
    id: "millet-khichdi",
    slug: "millet-khichdi",
    category: "millets",
    name: { hi: "मिलेट खिचड़ी", en: "Millet Khichdi" },
    description: {
      hi: "मिलेट्स और भारतीय भोजन का सहज मेल।",
      en: "Millets meet a familiar Indian meal.",
    },
    detail: {
      hi: "भारतीय खिचड़ी की सहजता से प्रेरित मिलेट भोजन।",
      en: "A millet meal inspired by the comfort of Indian khichdi.",
    },
    packSizes: ["200g"],
    image: "/images/khichdi.jpg",
    images: ["/images/khichdi.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "मिलेट से बना", en: "Made with millets" }],
  },
  {
    id: "tea-masala",
    slug: "tea-masala",
    category: "beverages",
    name: { hi: "चाय मसाला", en: "Tea Masala" },
    description: {
      hi: "हर प्याले में गर्माहट और खुशबू।",
      en: "Warmth and aroma in every cup.",
    },
    detail: {
      hi: "भारतीय चाय के सुगंधित स्वाद से प्रेरित।",
      en: "Inspired by the aromatic ritual of Indian chai.",
    },
    packSizes: ["50g", "100g"],
    image: "/images/tea-masala.jpg",
    images: ["/images/tea-masala.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "चाय के लिए", en: "For your cup of chai" }],
  },
];

/** Matches a query against both the Hindi and English name and description. */
export function searchProducts(list: Product[], query: string) {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return list;
  return list.filter((product) =>
    [product.name.hi, product.name.en, product.description.hi, product.description.en]
      .join(" ")
      .toLocaleLowerCase()
      .includes(q),
  );
}
