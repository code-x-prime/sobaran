# SOBARAN website

Next.js 16, TypeScript and Tailwind CSS static brand website.

## Run

```bash
pnpm install
pnpm run dev
pnpm exec prettier --check .
pnpm run lint
pnpm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the verified production origin before deployment. See `.env.example`. This supplies the metadata base and sitemap URLs.

## Content to confirm before publishing

- Add official product pack photographs, ingredient lists, MRP and storage details in `data/products.ts` and product pages.
- Add verified phone, WhatsApp, email, store addresses and FSSAI licence details. The enquiry and contact forms currently copy a draft; they do not submit data.
- Replace local illustrative food photography with approved SOBARAN campaign assets when available. These images show food and ingredients, not official product packaging.
- Review privacy and terms text with the business owner.

The supplied official gold and burgundy logo assets are in `public/branding`.
