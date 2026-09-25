"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/components/language";
import {
  FieldError,
  fieldClass,
  labelClass,
  validateEmail,
  validatePhone,
} from "@/components/contact-form";
import { buttonClass } from "@/components/ui/action-link";
import { products } from "@/data/products";
import { format } from "@/lib/i18n";

const enquiryTypes = ["retailer", "distributor", "product", "general"] as const;
type EnquiryType = (typeof enquiryTypes)[number];
type Field = "name" | "mobile" | "email" | "city" | "message";

const fields: {
  name: Exclude<Field, "message"> | "company" | "state";
  type: string;
  required: boolean;
  autoComplete: string;
}[] = [
  { name: "name", type: "text", required: true, autoComplete: "name" },
  { name: "company", type: "text", required: false, autoComplete: "organization" },
  { name: "mobile", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", type: "email", required: false, autoComplete: "email" },
  { name: "city", type: "text", required: true, autoComplete: "address-level2" },
  { name: "state", type: "text", required: false, autoComplete: "address-level1" },
];

/** Integration point for a future API (e.g. POST /api/enquiry). Nothing is transmitted today. */
async function submitEnquiry(payload: Record<string, string>) {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 900));
}

export function EnquiryForm() {
  const { dict, pick } = useLanguage();
  const t = dict.enquiryForm;
  const errorsCopy = dict.contactForm.errors;
  const reduced = useReducedMotion();
  const [type, setType] = useState<EnquiryType>("retailer");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, true>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Pre-select the type (and product) from links such as /enquiry?type=distributor.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("type");
    if (requested === "retailer" || requested === "distributor") setType(requested);
    const product = products.find((item) => item.slug === params.get("product"));
    if (product) {
      setType("product");
      setMessage(format(t.regarding, { product: pick(product.name) }));
    }
    // Runs once on arrival; later language switches must not overwrite what the user typed.
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(
      [...new FormData(form).entries()].map(([key, value]) => [key, String(value)]),
    );
    const found: Partial<Record<Field, true>> = {};
    if (!data.name?.trim()) found.name = true;
    if (!validatePhone(data.mobile ?? "")) found.mobile = true;
    if (!validateEmail(data.email ?? "")) found.email = true;
    if (!data.city?.trim()) found.city = true;
    if (!data.message?.trim()) found.message = true;
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    await submitEnquiry({ ...data, type });
    form.reset();
    setMessage("");
    setStatus("success");
  }

  const errorText = (field: Field) => {
    if (!errors[field]) return undefined;
    return field === "mobile" ? errorsCopy.phone : errorsCopy[field];
  };
  const clear = (field: string) => field in errors && setErrors({ ...errors, [field]: undefined });

  return (
    <div className="bg-ivory rounded-xl border border-[#e3d4ba] p-5 shadow-[0_20px_50px_rgba(36,19,15,0.07)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
          >
            <span className="bg-gold/15 text-gold flex h-16 w-16 items-center justify-center rounded-xl">
              <CheckCircle2 size={30} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="text-burgundy mt-6 max-w-sm font-serif text-[1.9rem] leading-snug">
              {dict.contactForm.success}
            </p>
            <p className="text-muted mt-3 max-w-sm text-sm leading-6">{dict.contactForm.pending}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-burgundy border-burgundy/40 hover:border-burgundy mt-6 border-b pb-0.5 text-[13px] font-semibold"
            >
              {dict.contactForm.again}
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
            <fieldset className="sm:col-span-2">
              <legend className={labelClass}>{t.type}</legend>
              <div className="mt-1 flex flex-wrap gap-2">
                {enquiryTypes.map((option) => {
                  const selected = type === option;
                  return (
                    <button
                      type="button"
                      key={option}
                      aria-pressed={selected}
                      onClick={() => setType(option)}
                      className={`min-h-10 rounded-lg border px-4 text-[13px] font-semibold transition-colors ${selected ? "border-burgundy bg-burgundy text-ivory" : "text-burgundy hover:border-burgundy border-[#dccbb0]"}`}
                    >
                      {t.types[option]}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            {fields.map((field) => {
              const invalid = field.name in errors && errors[field.name as Field];
              return (
                <div key={field.name}>
                  <label htmlFor={`enquiry-${field.name}`} className={labelClass}>
                    {t[field.name]}
                    {field.required && <span aria-hidden="true"> *</span>}
                  </label>
                  <input
                    id={`enquiry-${field.name}`}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    placeholder={t[`${field.name}Placeholder`]}
                    aria-invalid={invalid ? true : undefined}
                    aria-describedby={invalid ? `enquiry-${field.name}-error` : undefined}
                    onInput={() => clear(field.name)}
                    className={`${fieldClass} ${invalid ? "border-burgundy/70" : "border-[#dccbb0]"}`}
                  />
                  <FieldError
                    id={`enquiry-${field.name}-error`}
                    message={
                      field.name === "company" || field.name === "state"
                        ? undefined
                        : errorText(field.name)
                    }
                  />
                </div>
              );
            })}
            <div className="sm:col-span-2">
              <label htmlFor="enquiry-message" className={labelClass}>
                {t.message} <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="enquiry-message"
                name="message"
                rows={5}
                value={message}
                placeholder={t.messagePlaceholder}
                onChange={(event) => {
                  setMessage(event.target.value);
                  clear("message");
                }}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "enquiry-message-error" : undefined}
                className={`${fieldClass} resize-y ${errors.message ? "border-burgundy/70" : "border-[#dccbb0]"}`}
              />
              <FieldError id="enquiry-message-error" message={errorText("message")} />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={buttonClass("primary", "disabled:cursor-wait sm:col-span-2")}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  {dict.contactForm.sending}
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
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
