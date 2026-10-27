import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, LoaderCircle, MapPin } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

const emptyForm = { name: "", email: "", subject: "", message: "" };
const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { bio, submitMessage } = useFirebase();
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState(emptyForm);
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const handleCopyEmail = async () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(bio.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    copyTimer.current = setTimeout(() => setCopyStatus("idle"), 3000);
  };

  const handleFormInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (contactStatus !== "loading") setContactStatus("idle");
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactStatus === "loading") return;
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setContactStatus("error");
      setStatusMessage("Please add your name, email, and a message.");
      return;
    }

    setContactStatus("loading");
    let saved = false;
    try {
      await submitMessage(formData.name, formData.email, formData.subject, formData.message);
      saved = true;
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      if (!saved) {
        setContactStatus("error");
        setStatusMessage("Your message couldn't be sent. Please try again, or email me directly.");
        return;
      }
    }
    setContactStatus("success");
    setStatusMessage("Your note is on its way. Thanks for reaching out!");
    setFormData(emptyForm);
  };

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease },
  });

  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-section border-t border-black/[0.08] px-6 py-14 sm:px-10 sm:py-16 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-20">
        <motion.div {...reveal()} className="md:pt-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">07 &middot; Get in touch</span>
          <h2 id="contact-heading" className="mt-4 font-display text-4xl leading-[1.12] text-[#252921] sm:text-[42px]">
            A good place<br />to <span className="font-serif italic text-[#71854e]">start.</span>
          </h2>
          <p className="mt-4 max-w-xs text-[13px] leading-6 text-neutral-500">Have a project or an opportunity in mind?<br />Send a note. I&apos;d love to hear about it.</p>
          <div className="mt-5 flex items-center gap-2">
            <a href={"mailto:" + bio.email} className="contact-email group inline-flex min-w-0 items-center gap-2 py-2 text-xs font-medium text-[#4f623b]">
              <span className="break-all">{bio.email}</span><ArrowUpRight size={13} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button type="button" onClick={handleCopyEmail} aria-label={copyStatus === "copied" ? "Email copied" : "Copy email address"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#71854e] transition-colors hover:bg-[#edf2e5]">
              {copyStatus === "copied" ? <Check size={13} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
            </button>
          </div>
          <p role="status" className="min-h-4 text-[10px] text-neutral-500">
            {copyStatus === "copied" ? "Email address copied." : copyStatus === "error" ? "Couldn't copy. You can select the address or open the email link." : ""}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-500"><MapPin size={12} aria-hidden="true" />{bio.location}</span>
            <a href={bio.socials.github} target="_blank" rel="noopener noreferrer" className="contact-social"><Github size={13} aria-hidden="true" />GitHub</a>
            <a href={bio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social"><Linkedin size={13} aria-hidden="true" />LinkedIn</a>
          </div>
        </motion.div>

        <motion.form {...reveal(0.1)} onSubmit={handleFormSubmit} aria-label="Send Jestin a message" aria-busy={contactStatus === "loading"} className="contact-form">
          <fieldset disabled={contactStatus === "loading"} className="min-w-0 space-y-4 disabled:opacity-60">
            <legend className="sr-only">Your message details</legend>
            <div className="grid grid-cols-2 gap-4">
              <div className="contact-field">
                <label htmlFor="contact-name">Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                <input id="contact-name" name="name" autoComplete="name" type="text" value={formData.name} onChange={handleFormInputChange} placeholder="Your name" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                <input id="contact-email" name="email" autoComplete="email" type="email" value={formData.email} onChange={handleFormInputChange} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-subject">Subject <span className="contact-optional">optional</span></label>
              <input id="contact-subject" name="subject" type="text" value={formData.subject} onChange={handleFormInputChange} placeholder="What do you have in mind?" />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Message <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <textarea id="contact-message" name="message" value={formData.message} onChange={handleFormInputChange} rows={2} placeholder="A little about your idea..." required />
            </div>
          </fieldset>
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              {(contactStatus === "success" || contactStatus === "error") && (
                <motion.p key={contactStatus} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className={contactStatus === "success" ? "mt-4 rounded-lg bg-[#edf2e3] p-3 text-xs leading-5 text-[#52683a]" : "mt-4 rounded-lg bg-[#fbf1ed] p-3 text-xs leading-5 text-[#975a41]"}>{statusMessage}</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="contact-actions mt-5 flex items-center justify-between gap-3">
            <span className="text-[10px] text-neutral-500">* Required fields</span>
            <motion.button type="submit" disabled={contactStatus === "loading"} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="hero-primary gap-3 disabled:cursor-wait disabled:opacity-60">
              {contactStatus === "loading" ? "Sending..." : "Send message"}
              {contactStatus === "loading" ? <LoaderCircle size={13} className="animate-spin" aria-hidden="true" /> : <ArrowUpRight size={14} aria-hidden="true" />}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
