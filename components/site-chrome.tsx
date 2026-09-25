"use client";

import { useWhatsappHref } from "@/components/ui/use-whatsapp";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { useLanguage } from "@/components/language";
import { ButtonArrow, buttonClass } from "@/components/ui/action-link";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { format, type Dictionary, type Language } from "@/lib/i18n";

const navItems: { href: string; key: keyof Dictionary["nav"] }[] = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/about", key: "story" },
  { href: "/quality", key: "quality" },
  { href: "/where-to-buy", key: "whereToBuy" },
  { href: "/contact", key: "contact" },
];
const ease = [0.22, 0.7, 0.2, 1] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Segmented language control. Full labels ("हिन्दी | English") on wide screens,
 * short ("हिं | EN") where space is tight.
 */
function LanguageToggle({ dark, compact = false }: { dark: boolean; compact?: boolean }) {
  const { language, setLanguage, dict } = useLanguage();
  const options: { value: Language; full: string; short: string }[] = [
    { value: "hi", full: dict.language.hi, short: dict.language.hiShort },
    { value: "en", full: dict.language.en, short: dict.language.enShort },
  ];
  return (
    <div
      role="radiogroup"
      aria-label={dict.language.label}
      className={`flex h-9 items-center rounded-lg border p-0.5 text-[12px] font-semibold transition-colors duration-300 ${dark ? "border-white/25 bg-white/[0.04]" : "border-burgundy/15 bg-cream/70"}`}
    >
      {options.map((option) => {
        const selected = language === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            lang={option.value}
            onClick={() => setLanguage(option.value)}
            className={`relative flex h-full min-w-9 items-center justify-center rounded-md px-2.5 transition-colors duration-300 ${selected ? (dark ? "text-dark-burgundy" : "text-ivory") : dark ? "text-ivory/70 hover:text-ivory" : "text-burgundy/60 hover:text-burgundy"}`}
          >
            {selected && (
              <motion.span
                layoutId={compact ? "language-pill-drawer" : "language-pill"}
                className={`absolute inset-0 rounded-md shadow-sm ${dark ? "bg-light-gold" : "bg-burgundy"}`}
                transition={{ duration: 0.3, ease }}
              />
            )}
            <span className="relative">
              {compact ? (
                option.short
              ) : (
                <>
                  <span className="xl:hidden">{option.short}</span>
                  <span className="hidden xl:inline">{option.full}</span>
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const whatsappHref = useWhatsappHref();
  const pathname = usePathname();
  const { dict } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const transparent = overlay && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: transparent ? "rgba(255,253,248,0)" : "rgba(255,253,248,0.95)",
          borderColor: transparent ? "rgba(232,220,199,0)" : "rgba(232,220,199,1)",
          boxShadow: transparent
            ? "0 0 0 rgba(36,19,15,0)"
            : scrolled
              ? "0 8px 24px rgba(36,19,15,0.07)"
              : "0 0 0 rgba(36,19,15,0)",
        }}
        transition={{ duration: reduced ? 0 : 0.35, ease }}
        className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-50 border-b ${transparent ? "text-ivory" : "text-burgundy backdrop-blur-md"}`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 transition-[min-height] duration-300 sm:px-6 lg:px-10 ${scrolled ? "min-h-16 lg:min-h-[68px]" : "min-h-16 lg:min-h-[78px]"}`}
        >
          <Link
            href="/"
            aria-label={dict.nav.homeLabel}
            className="flex shrink-0 items-center rounded-sm py-3"
          >
            <Image
              src={transparent ? site.logoGold : site.logoBurgundy}
              alt="SOBARAN"
              width={694}
              height={502}
              priority
              sizes="72px"
              className={`w-auto object-contain transition-[height] duration-300 ${scrolled ? "h-10 lg:h-11" : "h-10 lg:h-12"}`}
            />
          </Link>

          <nav aria-label={dict.nav.mainLabel} className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navItems.map(({ href, key }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative block py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 ${transparent ? "hover:text-light-gold" : "hover:text-gold"} ${active ? (transparent ? "text-light-gold" : "text-burgundy") : ""}`}
                    >
                      {dict.nav[key]}
                      <span className="bg-gold absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      {active && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="bg-gold absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                          transition={{ duration: 0.35, ease }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/products"
              aria-label={dict.nav.search}
              className={`group hidden h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 sm:flex ${transparent ? "hover:bg-white/10" : "hover:bg-cream"}`}
            >
              <Search
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <LanguageToggle dark={transparent} />
            <a
              href={whatsappHref}
              className={`group/btn ml-1 hidden h-9 items-center gap-2 rounded-lg px-3.5 text-[12px] font-semibold transition-colors duration-300 lg:inline-flex ${transparent ? "bg-light-gold text-dark-burgundy hover:bg-[#e3bf6c]" : "bg-burgundy text-ivory hover:bg-dark-burgundy"}`}
            >
              <WhatsappIcon
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:-rotate-12"
              />
              WhatsApp
              <ButtonArrow icon={<ArrowUpRight size={14} />} />
            </a>
            <button
              type="button"
              aria-label={dict.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors lg:hidden ${transparent ? "border-white/25 hover:bg-white/10" : "border-burgundy/15 hover:bg-cream"}`}
            >
              <Menu size={19} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <button
              type="button"
              aria-label={dict.nav.closeMenu}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="bg-brown/50 absolute inset-0 backdrop-blur-[2px]"
            />
            <motion.nav
              id="mobile-navigation"
              aria-label={dict.nav.mobileLabel}
              initial={reduced ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduced ? undefined : { x: "100%" }}
              transition={{ duration: 0.42, ease }}
              className="bg-dark-burgundy text-ivory absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col overflow-y-auto"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 bottom-24 font-serif text-[9rem] leading-none text-white/[0.03] select-none"
              >
                S
              </span>
              <div className="border-light-gold/15 flex min-h-16 items-center justify-between border-b px-5">
                <Image
                  src={site.logoGold}
                  alt="SOBARAN"
                  width={694}
                  height={502}
                  sizes="60px"
                  className="h-10 w-auto object-contain"
                />
                <div className="flex items-center gap-2">
                  <LanguageToggle dark compact />
                  <button
                    type="button"
                    aria-label={dict.nav.closeMenu}
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 transition-colors hover:bg-white/10"
                  >
                    <X size={19} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <motion.ul
                className="relative flex-1 px-5 pt-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                }}
              >
                {navItems.map(({ href, key }, index) => {
                  const active = isActive(pathname, href);
                  return (
                    <motion.li
                      key={href}
                      variants={{
                        hidden: reduced ? { opacity: 1 } : { opacity: 0, x: 24 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className="group border-light-gold/12 flex items-baseline gap-4 border-b py-4"
                      >
                        <span className="text-light-gold/70 w-6 text-[11px] font-semibold tracking-[0.15em]">
                          0{index + 1}
                        </span>
                        <span
                          className={`group-hover:text-light-gold font-serif text-[1.7rem] leading-tight transition-colors duration-300 ${active ? "text-light-gold" : ""}`}
                        >
                          {dict.nav[key]}
                        </span>
                        <ArrowUpRight
                          size={18}
                          aria-hidden="true"
                          className="text-light-gold/60 ml-auto self-center transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                className="relative px-5 pt-8 pb-8"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.5, duration: 0.4 }}
              >
                <a href={whatsappHref} className={buttonClass("gold", "w-full")}>
                  <WhatsappIcon width={17} height={17} />
                  {dict.common.whatsappAsk}
                  <ButtonArrow />
                </a>
                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#cdb99c]">
                  <MapPin size={13} aria-hidden="true" /> {dict.footer.address}
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type Social = {
  label: string;
  url: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const socials: Social[] = [
  { label: "Instagram", url: site.instagram, Icon: InstagramIcon },
  { label: "Facebook", url: site.facebook, Icon: FacebookIcon },
  { label: "YouTube", url: site.youtube, Icon: YoutubeIcon },
  // Resolved per render so the link carries a greeting in the active language.
  { label: "WhatsApp", url: "whatsapp", Icon: MessageCircle },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group hover:text-light-gold inline-flex items-center text-sm text-[#e6d3b8] transition-colors duration-300"
      >
        <span className="bg-light-gold h-px w-0 transition-[width,margin] duration-300 group-hover:mr-1.5 group-hover:w-3" />
        {children}
      </Link>
    </li>
  );
}

function FooterColumn({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-light-gold/15 border-b lg:border-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="text-light-gold flex w-full items-center justify-between py-4 text-[11px] font-semibold tracking-[0.2em] uppercase lg:pointer-events-none lg:py-0"
      >
        {title}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform duration-300 lg:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul className={`flex-col gap-3 pb-5 lg:mt-5 lg:flex lg:pb-0 ${open ? "flex" : "hidden"}`}>
        {children}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const whatsappHref = useWhatsappHref();
  const { dict, pick } = useLanguage();
  const phone: string | null = site.phone;
  const email: string | null = site.email;

  return (
    <footer className="bg-dark-burgundy relative overflow-hidden text-[#e6d3b8]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-10 text-center font-serif text-[21vw] leading-none text-white/[0.03] select-none lg:bottom-4 lg:text-[18vw]"
      >
        SOBARAN
      </span>
      <div className="relative mx-auto max-w-[1400px] px-4 pt-14 pb-8 sm:px-6 lg:px-10 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <Image
              src={site.logoGold}
              alt="SOBARAN"
              width={694}
              height={502}
              sizes="200px"
              className="h-24 w-auto object-contain sm:h-32"
            />
            <div>
              <p className="text-ivory font-serif text-[1.9rem] leading-[1.25] sm:text-4xl">
                {dict.footer.tagline}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[#cdb99c]">{dict.footer.blurb}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a href={whatsappHref} className={buttonClass("gold")}>
              <WhatsappIcon width={17} height={17} />
              {dict.common.whatsappTalk}
              <ButtonArrow />
            </a>
            <div className="flex gap-2">
              {socials.map(({ label, url: rawUrl, Icon }) => {
                const url = rawUrl === "whatsapp" ? whatsappHref : rawUrl;
                return url ? (
                  <a
                    key={label}
                    href={url}
                    aria-label={label}
                    className="border-light-gold/30 text-light-gold hover:border-light-gold hover:bg-light-gold hover:text-dark-burgundy flex h-11 w-11 items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon />
                  </a>
                ) : (
                  <span
                    key={label}
                    title={format(dict.footer.socialSoon, { name: label })}
                    aria-label={format(dict.footer.socialSoon, { name: label })}
                    className="border-light-gold/20 text-light-gold/55 flex h-11 w-11 items-center justify-center rounded-lg border"
                  >
                    <Icon />
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="via-gold/60 mt-12 h-px bg-gradient-to-r from-transparent to-transparent" />

        <div className="grid gap-x-6 py-6 lg:grid-cols-[1fr_1fr_1fr_1.4fr] lg:gap-y-10 lg:py-12">
          <FooterColumn title={dict.footer.quickLinks}>
            <FooterLink href="/">{dict.nav.home}</FooterLink>
            <FooterLink href="/products">{dict.nav.products}</FooterLink>
            <FooterLink href="/where-to-buy">{dict.nav.whereToBuy}</FooterLink>
            <FooterLink href="/contact">{dict.nav.contact}</FooterLink>
          </FooterColumn>
          <FooterColumn title={dict.footer.products}>
            {products.slice(0, 4).map((product) => (
              <FooterLink key={product.slug} href={`/products/${product.slug}`}>
                {pick(product.name)}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title={dict.footer.company}>
            <FooterLink href="/about">{dict.nav.story}</FooterLink>
            <FooterLink href="/quality">{dict.nav.quality}</FooterLink>
            <FooterLink href="/enquiry?type=retailer">{dict.footer.retailer}</FooterLink>
            <FooterLink href="/enquiry?type=distributor">{dict.footer.distributor}</FooterLink>
          </FooterColumn>
          <div className="pt-8 lg:pt-0">
            <p className="text-light-gold text-[11px] font-semibold tracking-[0.2em] uppercase">
              {dict.footer.contact}
            </p>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={17} className="text-light-gold mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-ivory">{dict.footer.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={17} className="text-light-gold mt-0.5 shrink-0" aria-hidden="true" />
                {phone ? (
                  <a href={`tel:${phone}`} className="text-ivory hover:text-light-gold">
                    {phone}
                  </a>
                ) : (
                  <span className="text-[#cdb99c]">{dict.footer.phonePending}</span>
                )}
              </li>
              <li className="flex gap-3">
                <Mail size={17} className="text-light-gold mt-0.5 shrink-0" aria-hidden="true" />
                {email ? (
                  <a href={`mailto:${email}`} className="text-ivory hover:text-light-gold">
                    {email}
                  </a>
                ) : (
                  <span className="text-[#cdb99c]">{dict.footer.emailPending}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-gold/25 flex flex-col-reverse gap-4 border-t pt-6 text-xs text-[#b8a488] sm:flex-row sm:items-center sm:justify-between">
          <span>{format(dict.footer.rights, { year: new Date().getFullYear() })}</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-light-gold transition-colors">
              {dict.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-light-gold transition-colors">
              {dict.footer.terms}
            </Link>
            <Link href="/quality#fssai" className="hover:text-light-gold transition-colors">
              {dict.footer.fssai}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
