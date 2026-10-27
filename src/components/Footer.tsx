import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { JESTIN_BIO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(JESTIN_BIO.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${JESTIN_BIO.email}`;
    }
  };

  const socialLinks = [
    { name: "GitHub", url: JESTIN_BIO.socials.github, icon: Github },
    { name: "LinkedIn", url: JESTIN_BIO.socials.linkedin, icon: Linkedin },
    { name: "Email", url: JESTIN_BIO.socials.email, icon: Mail },
  ];

  const footerLinks = [
    { id: "about", label: "About" },
    { id: "projects", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "blog", label: "Writing" },
  ];

  return (
    <footer className="border-t border-black/[0.08] bg-[#f5f4ef] px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-8 border-b border-black/10 pb-12 sm:pb-14 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">Have a system to build?</span>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Let&apos;s make it <span className="font-serif italic text-neutral-500">reliable.</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ y: -3, backgroundColor: "#b9e878", color: "#171714" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("contact")}
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 py-4 text-xs font-medium text-white transition-colors"
          >
            Start a conversation <ArrowUpRight size={15} />
          </motion.button>
        </motion.div>

        <div className="grid gap-10 border-b border-black/10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <button onClick={() => onNavigate("home")} className="group mb-4 flex items-center gap-2.5 text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-semibold text-white transition-transform duration-300 group-hover:rotate-[-8deg]">JS</span>
              <span className="font-display text-sm font-semibold tracking-tight">Jestin Shaji</span>
            </button>
            <p className="max-w-sm text-xs leading-6 text-neutral-500">
              Backend Java and cloud engineering. Based in {JESTIN_BIO.location}.
            </p>
            <button
              onClick={handleCopyEmail}
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-neutral-800 transition-colors hover:text-[#668d35]"
            >
              {copiedEmail ? <Check size={14} /> : <Copy size={13} />}
              {copiedEmail ? "Email copied" : JESTIN_BIO.email}
            </button>
          </div>

          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">Explore</h3>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-3">
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="w-fit text-left text-xs text-neutral-600 transition-colors hover:text-neutral-950"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">Elsewhere</h3>
            <div className="grid gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-2 text-xs text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    <Icon size={14} />
                    {social.name}
                    <ArrowUpRight size={11} className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-[10px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Jestin Shaji</span>
          <span>Made with intention in Kerala, India</span>
        </div>
      </div>
    </footer>
  );
}
