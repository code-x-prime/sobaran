"use client";

import { useWhatsappHref } from "@/components/ui/use-whatsapp";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/language";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { buttonClass } from "@/components/ui/action-link";

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
};

type Field = "name" | "phone" | "email" | "message";
type Errors = Partial<Record<Field, true>>;

/**
 * Integration point: replace the body with a real request (e.g. POST /api/contact) once a
 * backend exists. Nothing is transmitted today.
 */
async function submitContact(payload: ContactPayload) {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 900));
}

/** Shared by the contact and enquiry forms so both validate identically. */
export function validatePhone(value: string) {
  return /^[+]?[\d\s-]{10,15}$/.test(value.trim());
}
export function validateEmail(value: string) {
  return !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export const fieldClass =
  "w-full rounded-lg border bg-cream/50 px-4 py-3 text-[15px] text-brown outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted/60 focus:border-burgundy focus:bg-ivory focus:ring-4 focus:ring-gold/20";
export const labelClass = "text-burgundy mb-1.5 block text-[13px] font-semibold";

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-burgundy mt-1.5 text-xs font-medium"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/** Leading icon inside a form field; the field itself adds `pl-11`. */
function FieldIcon({ Icon, children }: { Icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon
        size={17}
        strokeWidth={1.6}
        aria-hidden="true"
        className="text-gold pointer-events-none absolute top-[15px] left-4"
      />
      {children}
    </div>
  );
}

export function ContactForm() {
  const whatsappHref = useWhatsappHref();
  const { dict } = useLanguage();
  const t = dict.contactForm;
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: ContactPayload): Errors {
    const next: Errors = {};
    if (!data.name.trim()) next.name = true;
    if (!validatePhone(data.phone)) next.phone = true;
    if (!validateEmail(data.email)) next.email = true;
    if (!data.message.trim()) next.message = true;
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: ContactPayload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      type: String(data.get("type") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const found = validate(payload);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    await submitContact(payload);
    form.reset();
    setStatus("success");
  }

  // Errors are stored as flags, so messages re-render in the active language.
  const message = (field: Field) => (errors[field] ? t.errors[field] : undefined);
  const aria = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: `${fieldClass} pl-11 ${errors[field] ? "border-burgundy/70" : "border-[#dccbb0]"}`,
    onInput: () => errors[field] && setErrors({ ...errors, [field]: undefined }),
  });

  return (
    <div className="bg-ivory relative overflow-hidden rounded-xl border border-[#e3d4ba] p-5 shadow-[0_20px_50px_rgba(36,19,15,0.07)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={reduced ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 0.7, 0.2, 1] }}
              className="bg-gold/15 text-gold flex h-16 w-16 items-center justify-center rounded-xl"
            >
              <CheckCircle2 size={30} strokeWidth={1.5} aria-hidden="true" />
            </motion.span>
            <p className="text-burgundy mt-6 max-w-sm font-serif text-[1.9rem] leading-snug">
              {t.success}
            </p>
            <p className="text-muted mt-3 max-w-sm text-sm leading-6">{t.pending}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-burgundy border-burgundy/40 hover:border-burgundy mt-6 border-b pb-0.5 text-[13px] font-semibold transition-colors"
            >
              {t.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5"
          >
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                {t.name} <span aria-hidden="true">*</span>
              </label>
              <FieldIcon Icon={User}>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={t.namePlaceholder}
                  {...aria("name")}
                />
              </FieldIcon>
              <FieldError id="contact-name-error" message={message("name")} />
            </div>
            <div>
              <label htmlFor="contact-phone" className={labelClass}>
                {t.phone} <span aria-hidden="true">*</span>
              </label>
              <FieldIcon Icon={Phone}>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder={t.phonePlaceholder}
                  {...aria("phone")}
                />
              </FieldIcon>
              <FieldError id="contact-phone-error" message={message("phone")} />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                {t.email}
              </label>
              <FieldIcon Icon={Mail}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.emailPlaceholder}
                  {...aria("email")}
                />
              </FieldIcon>
              <FieldError id="contact-email-error" message={message("email")} />
            </div>
            <div>
              <label htmlFor="contact-type" className={labelClass}>
                {t.type}
              </label>
              <select
                id="contact-type"
                name="type"
                defaultValue=""
                className={`${fieldClass} appearance-none border-[#dccbb0]`}
              >
                <option value="">{t.typeNone}</option>
                {t.types.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className={labelClass}>
                {t.message} <span aria-hidden="true">*</span>
              </label>
              <FieldIcon Icon={MessageSquare}>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder={t.messagePlaceholder}
                  {...aria("message")}
                />
              </FieldIcon>
              <FieldError id="contact-message-error" message={message("message")} />
            </div>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className={buttonClass(
                  "primary",
                  "min-w-44 disabled:cursor-wait disabled:opacity-80",
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    {t.sending}
                  </>
                ) : (
                  <>
                    {t.submit}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </>
                )}
              </button>
              <span className="text-muted hidden text-xs sm:inline">{t.or}</span>
              <a href={whatsappHref} className={buttonClass("secondary")}>
                <WhatsappIcon width={16} height={16} />
                {dict.common.whatsappTalk}
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
