import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Code2, Layers, Cpu, Cloud, Database, Wrench } from "lucide-react";
import { TechLogo } from "./TechIcons";

interface TechIconDef {
  name: string;
  category: "Languages" | "Backend" | "Frontend" | "Databases" | "Cloud" | "DevOps" | "AI" | "Tools";
  iconUrl: string;
  fallbackUrl?: string;
  secondaryFallback?: string;
  badgeColor?: string;
}

// Inverted Triangle Grid structure matching portfolio layout: 11 -> 9 -> 7 -> 6 -> 3 -> 2 -> 1
const TECH_TRIANGLE_ROWS: TechIconDef[][] = [
  // Row 1 (11 items - Top base of triangle)
  [
    {
      name: "Java",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/java/java-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/openjdk/ED8B00",
      secondaryFallback: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/java/java-plain.svg",
      badgeColor: "#ED8B00",
    },
    {
      name: "Python",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/python/python-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/python/3776AB",
      badgeColor: "#3776AB",
    },
    {
      name: "JavaScript",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/javascript/javascript-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/javascript/F7DF1E",
      badgeColor: "#F7DF1E",
    },
    {
      name: "TypeScript",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/typescript/typescript-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/typescript/3178C6",
      badgeColor: "#3178C6",
    },
    {
      name: "C",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/c/c-original.svg",
      fallbackUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/c/c-plain.svg",
      badgeColor: "#A8B9CC",
    },
    {
      name: "C++",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/cplusplus/00599C",
      badgeColor: "#00599C",
    },
    {
      name: "Kotlin",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/kotlin/kotlin-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/kotlin/7F52FF",
      badgeColor: "#7F52FF",
    },
    {
      name: "HTML5",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/html5/html5-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/html5/E34F26",
      badgeColor: "#E34F26",
    },
    {
      name: "CSS3",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/css3/css3-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/css3/1572B6",
      secondaryFallback: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/css3/css3-original-wordmark.svg",
      badgeColor: "#1572B6",
    },
    {
      name: "Bash",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/bash/bash-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/gnubash/4EAA25",
      badgeColor: "#4EAA25",
    },
    {
      name: "React",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/react/react-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/react/61DAFB",
      badgeColor: "#61DAFB",
    },
  ],

  // Row 2 (9 items)
  [
    {
      name: "Spring Boot",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/spring/spring-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/springboot/6DB33F",
      badgeColor: "#6DB33F",
    },
    {
      name: "Node.js",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/nodejs/nodejs-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      badgeColor: "#5FA04E",
    },
    {
      name: "Next.js",
      category: "Frontend",
      iconUrl: "https://cdn.simpleicons.org/nextdotjs/white",
      fallbackUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/nextjs/nextjs-original.svg",
      badgeColor: "#FFFFFF",
    },
    {
      name: "Django",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/django/django-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/django/092E20",
      badgeColor: "#092E20",
    },
    {
      name: "FastAPI",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/fastapi/fastapi-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/fastapi/009688",
      badgeColor: "#009688",
    },
    {
      name: "Tailwind",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      badgeColor: "#06B6D4",
    },
    {
      name: "Bootstrap",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/bootstrap/7952B3",
      badgeColor: "#7952B3",
    },
    {
      name: "OpenCV",
      category: "AI",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/opencv/opencv-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/opencv/5C3EE8",
      badgeColor: "#5C3EE8",
    },
    {
      name: "NumPy",
      category: "AI",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/numpy/numpy-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/numpy/013243",
      badgeColor: "#013243",
    },
  ],

  // Row 3 (7 items)
  [
    {
      name: "PostgreSQL",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/postgresql/postgresql-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
      badgeColor: "#4169E1",
    },
    {
      name: "MySQL",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/mysql/mysql-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/mysql/4479A1",
      badgeColor: "#4479A1",
    },
    {
      name: "MongoDB",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/mongodb/mongodb-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/mongodb/47A248",
      badgeColor: "#47A248",
    },
    {
      name: "Firebase",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/firebase/firebase-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/firebase/FFCA28",
      badgeColor: "#FFCA28",
    },
    {
      name: "Redis",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/redis/redis-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/redis/FF4438",
      badgeColor: "#FF4438",
    },
    {
      name: "Docker",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/docker/docker-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/docker/2496ED",
      badgeColor: "#2496ED",
    },
    {
      name: "Azure",
      category: "Cloud",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/azure/azure-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/microsoftazure/0078D4",
      secondaryFallback: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/azure/azure-original.svg",
      badgeColor: "#0089D6",
    },
  ],

  // Row 4 (6 items - including AWS, OCI, Git, GitHub, Linux, VS Code)
  [
    {
      name: "AWS",
      category: "Cloud",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      fallbackUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
      secondaryFallback: "https://cdn.simpleicons.org/amazonaws/FF9900",
      badgeColor: "#FF9900",
    },
    {
      name: "OCI",
      category: "Cloud",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/oracle/oracle-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/oracle/F80000",
      secondaryFallback: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/oracle/oracle-plain.svg",
      badgeColor: "#F80000",
    },
    {
      name: "Git",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/git/git-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/git/F05032",
      badgeColor: "#F05032",
    },
    {
      name: "GitHub",
      category: "Tools",
      iconUrl: "https://cdn.simpleicons.org/github/white",
      fallbackUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/github/github-original.svg",
      badgeColor: "#FFFFFF",
    },
    {
      name: "Linux",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/linux/linux-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/linux/FCC624",
      badgeColor: "#FCC624",
    },
    {
      name: "VS Code",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/vscode/vscode-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
      secondaryFallback: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/vscode/vscode-original.svg",
      badgeColor: "#007ACC",
    },
  ],

  // Row 5 (3 items)
  [
    {
      name: "Postman",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/postman/postman-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/postman/FF6C37",
      badgeColor: "#FF6C37",
    },
    {
      name: "Figma",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/figma/figma-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/figma/F24E1E",
      badgeColor: "#F24E1E",
    },
    {
      name: "Photoshop",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/photoshop/photoshop-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/adobephotoshop/31A8FF",
      secondaryFallback: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/photoshop/photoshop-line.svg",
      badgeColor: "#31A8FF",
    },
  ],

  // Row 6 (2 items)
  [
    {
      name: "Hugging Face",
      category: "AI",
      iconUrl: "https://cdn.simpleicons.org/huggingface/FFD21E",
      fallbackUrl: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/huggingface.svg",
      badgeColor: "#FFD21E",
    },
    {
      name: "Vercel",
      category: "Cloud",
      iconUrl: "https://cdn.simpleicons.org/vercel/white",
      fallbackUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/vercel/vercel-original.svg",
      badgeColor: "#FFFFFF",
    },
  ],

  // Row 7 (1 item - Tip of inverted triangle)
  [
    {
      name: "Kubernetes",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
      fallbackUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/kubernetes/kubernetes-original.svg",
      secondaryFallback: "https://cdn.simpleicons.org/kubernetes/326CE5",
      badgeColor: "#326CE5",
    },
  ],
];

const CATEGORIES = [
  { id: "ALL", label: "All Tech", icon: Layers },
  { id: "Backend", label: "Backend & Java", icon: Cpu },
  { id: "Cloud", label: "Cloud & DevOps", icon: Cloud },
  { id: "Databases", label: "Databases", icon: Database },
  { id: "Tools", label: "Tools & AI", icon: Wrench },
];

function TechCard({
  item,
  activeFilter,
}: {
  item: TechIconDef;
  activeFilter: string;
  key?: React.Key;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isMatched =
    activeFilter === "ALL" ||
    (activeFilter === "Backend" && (item.category === "Backend" || item.category === "Languages")) ||
    (activeFilter === "Cloud" && (item.category === "Cloud" || item.category === "DevOps")) ||
    (activeFilter === "Databases" && item.category === "Databases") ||
    (activeFilter === "Tools" && (item.category === "Tools" || item.category === "AI" || item.category === "Frontend"));

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-2 rounded-xl transition-all duration-300 select-none ${
        isHovered
          ? "bg-black text-white border border-black shadow-md z-30"
          : isMatched
          ? "bg-white border border-black/10 hover:border-black opacity-100 shadow-xs"
          : "bg-neutral-50 border border-black/5 opacity-25 scale-95 grayscale"
      }`}
    >
      {/* Official Brand Logo */}
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center transition-transform">
        <TechLogo
          name={item.name}
          size={24}
          className={`w-full h-full object-contain transition-all duration-300 ${
            isHovered
              ? "scale-110 invert"
              : "opacity-90 hover:opacity-100"
          }`}
        />
      </div>

      {/* Clean, Readable Label */}
      <span
        className={`mt-1.5 text-[9px] sm:text-[10px] font-sans font-medium truncate max-w-[56px] text-center leading-tight transition-colors duration-200 ${
          isHovered
            ? "text-white font-bold"
            : isMatched
            ? "text-black font-semibold"
            : "text-neutral-400"
        }`}
      >
        {item.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <section
      id="tech"
      className="relative py-24 sm:py-28 px-4 sm:px-8 bg-white text-black select-none overflow-hidden border-t border-black/[0.08]"
    >
      {/* Refined Ambient Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dot matrix grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-neutral-800 text-xs font-mono font-medium tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>CORE CAPABILITIES &amp; ECOSYSTEM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-display font-black tracking-tight text-black uppercase"
          >
            TECH STACK
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-600 font-sans text-xs sm:text-sm max-w-md mx-auto"
          >
            Comprehensive architecture across backend services, distributed data, and cloud infrastructure
          </motion.p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto pt-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-black text-white border border-black font-bold shadow-xs"
                    : "bg-white text-neutral-700 border border-black/10 hover:text-black hover:border-black hover:bg-neutral-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-neutral-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Inverted Triangle Grid */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 py-4 max-w-4xl mx-auto">
          {TECH_TRIANGLE_ROWS.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: rowIndex * 0.05 }}
              className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 w-full"
            >
              {row.map((item) => (
                <TechCard
                  key={item.name}
                  item={item}
                  activeFilter={activeFilter}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Bottom Capability Summary Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto text-center p-3 rounded-xl bg-neutral-50 border border-black/10"
        >
          <p className="text-xs text-neutral-600 font-sans">
            <span className="text-black font-mono font-bold">39+ technologies</span> across Java ecosystem, cloud platforms (AWS, Azure, OCI), microservices, containerization, and distributed data tiers.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

