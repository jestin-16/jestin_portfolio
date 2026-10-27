import { ArrowUp, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const footerLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "tech", label: "Toolkit" },
  { id: "blog", label: "Writing" },
];

export default function Footer({ onNavigate }: FooterProps) {
  const { bio } = useFirebase();
  return (
    <footer id="footer" className="portfolio-footer px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="footer-main">
          <button type="button" onClick={() => onNavigate("home")} aria-label={`${bio.name}, back to top`} className="group inline-flex items-center gap-2.5 text-left">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7dfc9] text-[10px] font-medium text-[#71854e] transition-colors group-hover:bg-[#eaf0de]">JS</span>
            <span className="font-display text-sm font-medium text-neutral-800">{bio.name}<span className="mt-0.5 block font-sans text-[9px] font-normal tracking-normal text-neutral-500">Backend &amp; cloud engineering</span></span>
          </button>
          <nav aria-label="Footer navigation" className="footer-navigation">
            {footerLinks.map(({ id, label }) => <button key={id} type="button" onClick={() => onNavigate(id)} className="footer-link">{label}</button>)}
          </nav>
          <div className="footer-socials">
            <a href={bio.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><Github size={15} aria-hidden="true" /></a>
            <a href={bio.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><Linkedin size={15} aria-hidden="true" /></a>
            <a href={`mailto:${bio.email}`} aria-label={`Email ${bio.name}`}><ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {bio.name}</span>
          <span className="hidden text-[#8b947b] sm:block">Made with intention in {bio.location}.</span>
          <button type="button" onClick={() => onNavigate("home")} className="group inline-flex min-h-10 items-center gap-2 transition-colors hover:text-[#506237]">Back to top<ArrowUp size={12} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5" /></button>
        </div>
      </div>
    </footer>
  );
}
