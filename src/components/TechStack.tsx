import { useState, type CSSProperties, type FC } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Cloud, Code2, GitBranch, Layers, Server, Sparkles, type LucideIcon } from "lucide-react";
import { TechLogo } from "./TechIcons";

interface TechBranch {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  tint: string;
  groups: { name: string; technologies: string[] }[];
}

const branches: TechBranch[] = [
  {
    id: "backend", title: "Backend & data", subtitle: "The foundations", icon: Server,
    color: "#71854e", tint: "#edf2e5",
    groups: [
      { name: "Services", technologies: ["Spring Boot", "Node.js", "Django", "FastAPI"] },
      { name: "Databases", technologies: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Redis"] },
    ],
  },
  {
    id: "web", title: "Languages & web", subtitle: "Ideas into interfaces", icon: Code2,
    color: "#718b9c", tint: "#ebf0f3",
    groups: [
      { name: "Languages", technologies: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "Kotlin"] },
      { name: "Frontend", technologies: ["React", "Next.js", "HTML5", "CSS3", "Tailwind", "Bootstrap"] },
    ],
  },
  {
    id: "cloud", title: "Cloud & DevOps", subtitle: "Built to ship", icon: Cloud,
    color: "#9e805b", tint: "#f5eee4",
    groups: [
      { name: "Platforms", technologies: ["AWS", "Azure", "OCI", "Vercel"] },
      { name: "Delivery", technologies: ["Docker", "Kubernetes", "Linux", "Bash"] },
    ],
  },
  {
    id: "tools", title: "Tools & AI", subtitle: "A little extra possibility", icon: Sparkles,
    color: "#8a779e", tint: "#f0ecf5",
    groups: [
      { name: "Everyday tools", technologies: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Photoshop"] },
      { name: "Intelligence", technologies: ["OpenCV", "NumPy", "Hugging Face"] },
    ],
  },
];

const technologyCount = branches.reduce((total, branch) => total + branch.groups.reduce((count, group) => count + group.technologies.length, 0), 0);

const Technology: FC<{ name: string }> = ({ name }) => {
  // These existing logo assets have white marks and need a dark backing.
  const darkLogo = ["AWS", "GitHub", "Vercel"].includes(name);
  return (
    <li className="tech-leaf">
      <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${darkLogo ? "bg-[#30342b] p-1" : "p-0.5"}`}>
        <TechLogo name={name === "C++" ? "cplusplus" : name} size={20} className="h-full w-full object-contain" />
      </span>
      <span>{name}</span>
    </li>
  );
};

export default function TechStack() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="tech" aria-labelledby="tech-heading" className="relative overflow-hidden border-t border-black/[0.08] px-6 py-20 text-neutral-950 sm:px-10 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">03 &middot; The toolkit</span>
          <h2 id="tech-heading" className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Rooted in code. <span className="ml-1 font-serif italic text-[#71854e]">Built to grow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500">
            A connected toolkit, from the first line of Java to the final cloud deployment.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Highlight a technology branch">
          <button type="button" className="tech-filter" aria-pressed={activeBranch === null} onClick={() => setActiveBranch(null)}>
            <Layers size={13} aria-hidden="true" /> Full tree
          </button>
          {branches.map(({ id, title, icon: Icon }) => (
            <button key={id} type="button" className="tech-filter" aria-pressed={activeBranch === id} onClick={() => setActiveBranch((current) => current === id ? null : id)}>
              <Icon size={13} aria-hidden="true" /> {title}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-neutral-500" role="status">
          {activeBranch ? `${branches.find((branch) => branch.id === activeBranch)?.title} highlighted. Select Full tree to reset.` : `${technologyCount} technologies. Select a branch to take a closer look.`}
        </p>

        <div className="tech-tree mt-12 sm:mt-14">
          <div className="tech-tree-root">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0de] text-[#71854e]"><GitBranch size={20} strokeWidth={1.5} aria-hidden="true" /></span>
            <span><span className="block text-sm font-semibold tracking-tight">My engineering toolkit</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-500">One foundation. Many possibilities.</span></span>
          </div>

          <ul className="tech-tree-branches" aria-label="Technology branches">
            {branches.map((branch, index) => {
              const Icon = branch.icon;
              const isSelected = activeBranch === branch.id;
              return (
                <motion.li
                  key={branch.id}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.08 }}
                  className="tech-branch"
                  data-selected={isSelected}
                  data-muted={activeBranch !== null && !isSelected}
                  style={{ "--branch-color": branch.color, "--branch-tint": branch.tint } as CSSProperties}
                >
                  <div className="tech-branch-heading">
                    <span className="tech-branch-icon"><Icon size={18} strokeWidth={1.5} aria-hidden="true" /></span>
                    <div><h3 className="text-[13px] font-semibold tracking-tight">{branch.title}</h3><p className="mt-1 text-[10px] text-neutral-500">{branch.subtitle}</p></div>
                    <span className="ml-auto font-mono text-[9px] text-neutral-400">0{index + 1}</span>
                  </div>
                  <ul className="tech-groups" aria-label={`${branch.title} categories`}>
                    {branch.groups.map((group) => (
                      <li key={group.name} className="tech-group">
                        <h4 className="tech-group-title">{group.name}<span>{group.technologies.length.toString().padStart(2, "0")}</span></h4>
                        <ul className="tech-leaves" aria-label={group.name}>
                          {group.technologies.map((name) => <Technology key={name} name={name} />)}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-[11px] text-neutral-500">
          <span className="h-px w-8 bg-[#d9dfd0]" aria-hidden="true" />
          <span>Always learning. Always adding a new branch.</span>
          <span className="h-px w-8 bg-[#d9dfd0]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
