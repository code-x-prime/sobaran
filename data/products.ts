import type { Localized } from "@/lib/i18n/config";

/** Language-neutral category keys; labels live in the dictionaries under `categories`. */
export const categories = [
  "all",
  "spices",
  "beverages",
  "wellness",
  "breakfast",
  "millets",
] as const;
export type CategoryFilter = (typeof categories)[number];
export type ProductCategory = Exclude<CategoryFilter, "all">;

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  /** True for the Phase 1 flagship products that lead the catalog and homepage. */
  flagship?: boolean;
  /** True for a product that is planned but not yet launched — shown with a "coming soon" badge. */
  comingSoon?: boolean;
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
  // ---- Phase 1: launch flagships ----------------------------------------
  {
    id: "dardara-sabzi-masala",
    slug: "dardara-sabzi-masala",
    category: "spices",
    flagship: true,
    name: { hi: "दरदरा सब्जी मसाला", en: "Dardara Sabzi Masala" },
    description: {
      hi: "एक मसाला — रोज़ की कई सब्ज़ियों के लिए।",
      en: "One masala for many everyday vegetable dishes.",
    },
    detail: {
      hi: "भारतीय सब्ज़ियों के परिचित स्वाद से प्रेरित एक दरदरा मसाला।",
      en: "A coarse masala inspired by the familiar flavours of Indian vegetable dishes.",
    },
    packSizes: ["50g", "100g", "200g"],
    image: "/images/products/dardara-sabzi-masala.jpg",
    images: ["/images/products/dardara-sabzi-masala.jpg", "/images/ingredients.jpg"],
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
    id: "dardara-chai-masala",
    slug: "dardara-chai-masala",
    category: "beverages",
    flagship: true,
    name: { hi: "दरदरा चाय मसाला", en: "Dardara Chai Masala" },
    description: {
      hi: "हर प्याले में गर्माहट और खुशबू।",
      en: "Warmth and aroma in every cup.",
    },
    detail: {
      hi: "भारतीय चाय के सुगंधित स्वाद से प्रेरित एक दरदरा चाय मसाला।",
      en: "A coarse tea masala inspired by the aromatic ritual of Indian chai.",
    },
    packSizes: ["50g", "100g"],
    image: "/images/products/dardara-chai-masala.jpg",
    images: ["/images/products/dardara-chai-masala.jpg", "/images/gallery-chai.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "चाय के लिए", en: "For your cup of chai" }],
  },

  // ---- Phase 2: premium food range ---------------------------------------
  {
    id: "amla-multigrain-roasted-dalia",
    slug: "amla-multigrain-roasted-dalia",
    category: "wellness",
    name: { hi: "आंवला मल्टीग्रेन रोस्टेड दलिया", en: "Amla Multigrain Roasted Dalia" },
    description: {
      hi: "आंवला और मल्टीग्रेन का सेहतमंद मेल।",
      en: "A wholesome blend of amla and roasted multigrain.",
    },
    detail: {
      hi: "भुने हुए मल्टीग्रेन दलिया में आंवला की ताज़गी — रोज़ के नाश्ते के लिए एक सेहतमंद शुरुआत।",
      en: "Roasted multigrain dalia with the freshness of amla — a wholesome start to the day.",
    },
    packSizes: ["250g", "500g"],
    image: "/images/products/amla-roasted-dalia.jpg",
    images: ["/images/products/amla-roasted-dalia.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [
      { hi: "आंवला से बना", en: "Made with amla" },
      { hi: "मल्टीग्रेन पोषण", en: "Multigrain nutrition" },
    ],
  },
  {
    id: "amla-candy",
    slug: "amla-candy",
    category: "wellness",
    name: { hi: "आंवला कैंडी", en: "Amla Candy" },
    description: {
      hi: "मीठी-खट्टी आंवला कैंडी, हर उम्र के लिए।",
      en: "Sweet and tangy amla candy, enjoyed by everyone.",
    },
    detail: {
      hi: "चुनिंदा आंवले से बनी प्रीमियम कैंडी — एक सेहतमंद और स्वादिष्ट मिठास।",
      en: "A premium candy made from selected amla — a wholesome, flavourful sweetness.",
    },
    packSizes: ["100g", "200g"],
    image: "/images/products/amla-candy.jpg",
    images: ["/images/products/amla-candy.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "चुनिंदा आंवले से बनी", en: "Made from selected amla" }],
  },
  {
    id: "amla-jam",
    slug: "amla-jam",
    category: "wellness",
    name: { hi: "आंवला जैम", en: "Amla Jam" },
    description: {
      hi: "सुबह की रोटी या ब्रेड के साथ आंवला जैम।",
      en: "Amla jam for your morning toast or paratha.",
    },
    detail: {
      hi: "गाढ़ा, सुगंधित आंवला जैम — परिवार के हर सदस्य के लिए रोज़ की सेहतमंद मिठास।",
      en: "A thick, aromatic amla jam — an everyday wholesome sweetness for the whole family.",
    },
    packSizes: ["200g", "500g"],
    image: "/images/products/amla-jam.jpg",
    images: ["/images/products/amla-jam.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "रोज़ के नाश्ते के लिए", en: "For the everyday breakfast table" }],
  },

  // ---- Coming soon ---------------------------------------------------------
  {
    id: "premium-kabuli-chana",
    slug: "premium-kabuli-chana",
    category: "millets",
    comingSoon: true,
    name: { hi: "प्रीमियम काबुली चना", en: "Premium Kabuli Chana" },
    description: {
      hi: "बड़े और मोटे दाने वाला प्रीमियम काबुली चना।",
      en: "Large, premium-grade Kabuli chana.",
    },
    detail: {
      hi: "सोच-समझकर चुना गया काबुली चना, जल्द ही SOBARAN की रेंज में शामिल होगा।",
      en: "Carefully selected Kabuli chana, coming soon to the SOBARAN range.",
    },
    packSizes: ["500g", "1kg"],
    image: "/images/products/kabuli-chana.jpg",
    images: ["/images/products/kabuli-chana.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [],
  },
  {
    id: "premium-soya-badi",
    slug: "premium-soya-badi",
    category: "millets",
    comingSoon: true,
    name: { hi: "प्रीमियम सोया बड़ी", en: "Premium Soya Badi" },
    description: {
      hi: "प्रोटीन से भरपूर प्रीमियम सोया बड़ी।",
      en: "High-protein, premium-grade soya badi.",
    },
    detail: {
      hi: "रोज़ के भोजन में प्रोटीन जोड़ने के लिए, जल्द ही SOBARAN की रेंज में शामिल होगी।",
      en: "A protein-rich addition to everyday meals, coming soon to the SOBARAN range.",
    },
    packSizes: ["200g"],
    image: "/images/products/soya-badi.jpg",
    images: ["/images/products/soya-badi.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [],
  },
  {
    id: "pure-mustard-oil",
    slug: "pure-mustard-oil",
    category: "spices",
    comingSoon: true,
    name: { hi: "शुद्ध सरसों का तेल", en: "Pure Mustard Oil" },
    description: {
      hi: "कच्ची घानी, शुद्ध सरसों का तेल।",
      en: "Kachi ghani, pure mustard oil.",
    },
    detail: {
      hi: "भारतीय रसोई के परिचित स्वाद के लिए शुद्ध सरसों का तेल, जल्द ही उपलब्ध।",
      en: "Pure mustard oil for the familiar taste of Indian cooking, coming soon.",
    },
    packSizes: ["1L"],
    image: "/images/products/mustard-oil.jpg",
    images: ["/images/products/mustard-oil.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [],
  },
  {
    id: "pink-sendha-salt",
    slug: "pink-sendha-salt",
    category: "spices",
    comingSoon: true,
    name: { hi: "पिंक/सेंधा नमक", en: "Pink / Sendha Salt" },
    description: {
      hi: "शुद्ध पिंक हिमालयन और सेंधा नमक।",
      en: "Pure pink Himalayan and sendha rock salt.",
    },
    detail: {
      hi: "व्रत और रोज़ के भोजन दोनों के लिए शुद्ध नमक, जल्द ही SOBARAN की रेंज में शामिल होगा।",
      en: "Pure salt for both everyday meals and fasting, coming soon to the SOBARAN range.",
    },
    packSizes: ["500g", "1kg"],
    image: "/images/products/pink-salt.jpg",
    images: ["/images/products/pink-salt.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [],
  },
  {
    id: "millet-khichdi",
    slug: "millet-khichdi",
    category: "millets",
    comingSoon: true,
    name: { hi: "मिलेट खिचड़ी", en: "Millet Khichdi" },
    description: {
      hi: "मिलेट्स और भारतीय भोजन का सहज मेल।",
      en: "Millets meet a familiar Indian meal.",
    },
    detail: {
      hi: "भारतीय खिचड़ी की सहजता से प्रेरित मिलेट भोजन, जल्द ही उपलब्ध।",
      en: "A millet meal inspired by the comfort of Indian khichdi, coming soon.",
    },
    packSizes: ["200g"],
    image: "/images/products/millet-khichdi.jpg",
    images: ["/images/products/millet-khichdi.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "मिलेट से बना", en: "Made with millets" }],
  },
  {
    id: "sattu-upma-poha",
    slug: "sattu-upma-poha",
    category: "breakfast",
    comingSoon: true,
    name: { hi: "सत्तू उपमा पोहा", en: "Sattu Upma Poha" },
    description: {
      hi: "भुने सत्तू, पोहा और जड़ी-बूटियों का सेहतमंद नाश्ता।",
      en: "A wholesome breakfast blend of roasted sattu, poha and herbs.",
    },
    detail: {
      hi: "एक आसान सुबह के लिए सेहतमंद और परिचित नाश्ते का स्वाद, जल्द ही उपलब्ध।",
      en: "A wholesome, familiar breakfast for an easy morning, coming soon.",
    },
    packSizes: ["200g"],
    image: "/images/products/sattu-upma-poha.jpg",
    images: ["/images/products/sattu-upma-poha.jpg"],
    mrp: null,
    ingredients: null,
    storage: null,
    usage: null,
    highlights: [{ hi: "सुबह के नाश्ते के लिए", en: "For the morning table" }],
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
