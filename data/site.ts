export const site = {
  name: "SOBARAN™",
  promise: "Better Taste · Better Quality · With Trust",
  location: "Pratapgarh, Uttar Pradesh",
  phone: null,
  email: null,
  whatsapp: null,
  instagram: null,
  facebook: null,
  youtube: null,
  fssai: null,
  /** Google Maps embed URL; when set, /where-to-buy shows a live map instead of the illustration. */
  mapEmbedUrl: null,
  contact: "/contact",
  cities: ["Pratapgarh", "Prayagraj"],
  logoGold: "/branding/sobaran-gold.png",
  logoBurgundy: "/branding/sobaran-burgundy.png",
  iconGold: "/branding/sobaran-mark-gold.png",
  heroImage: "/images/hero.jpg",
  ingredientImage: "/images/ingredients.jpg",
  storyImage: "/images/story.jpg",
  finalImage: "/images/table.jpg",
} as const;

const whatsappNumber: string | null = site.whatsapp;

/** WhatsApp deep link with an encoded greeting once a verified number exists; /contact until then. */
export function whatsappUrl(message: string) {
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : "/contact";
}
