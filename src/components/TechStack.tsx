import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Code2 } from "lucide-react";

interface TechIconDef {
  name: string;
  category: string;
  iconUrl: string;
  fallbackUrl?: string;
}

// Inverted Triangle Grid structure matching reference image: 11 -> 9 -> 7 -> 5 -> 3 -> 2 -> 1
const TECH_TRIANGLE_ROWS: TechIconDef[][] = [
  // Row 1 (11 items - Top base of triangle)
  [
    {
      name: "Python",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/python/python-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/python/3776AB",
    },
    {
      name: "JavaScript",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/javascript/javascript-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/javascript/F7DF1E",
    },
    {
      name: "TypeScript",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/typescript/typescript-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      name: "C",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/c/c-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/c/A8B9CC",
    },
    {
      name: "C++",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/cplusplus/00599C",
    },
    {
      name: "Kotlin",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/kotlin/kotlin-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/kotlin/7F52FF",
    },
    {
      name: "HTML5",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/html5/html5-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/html5/E34F26",
    },
    {
      name: "CSS3",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/css3/css3-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/css3/1572B6",
    },
    {
      name: "Bash",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/bash/bash-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/gnubash/4EAA25",
    },
    {
      name: "React",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/react/react-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/react/61DAFB",
    },
    {
      name: "Next.js",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/nextjs/nextjs-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/nextdotjs/white",
    },
  ],

  // Row 2 (9 items)
  [
    {
      name: "Node.js",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/nodejs/nodejs-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    },
    {
      name: "Spring Boot",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/spring/spring-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/springboot/6DB33F",
    },
    {
      name: "Django",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/django/django-plain.svg",
      fallbackUrl: "https://cdn.simpleicons.org/django/092E20",
    },
    {
      name: "FastAPI",
      category: "Backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/fastapi/fastapi-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/fastapi/009688",
    },
    {
      name: "Java",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/java/java-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/oracle/F80000",
    },
    {
      name: "Tailwind",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    },
    {
      name: "Bootstrap",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/bootstrap/7952B3",
    },
    {
      name: "OpenCV",
      category: "AI & ML",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/opencv/opencv-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/opencv/5C3EE8",
    },
    {
      name: "NumPy",
      category: "Data",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/numpy/numpy-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/numpy/013243",
    },
  ],

  // Row 3 (7 items)
  [
    {
      name: "MySQL",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/mysql/mysql-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/mysql/4479A1",
    },
    {
      name: "PostgreSQL",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/postgresql/postgresql-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
    },
    {
      name: "MongoDB",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/mongodb/mongodb-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/mongodb/47A248",
    },
    {
      name: "Firebase",
      category: "Cloud & DB",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/firebase/firebase-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/firebase/DD2C00",
    },
    {
      name: "Redis",
      category: "Databases",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/redis/redis-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/redis/FF4438",
    },
    {
      name: "Docker",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/docker/docker-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/docker/2496ED",
    },
    {
      name: "Azure",
      category: "Cloud",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/azure/azure-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/microsoftazure/0089D6",
    },
  ],

  // Row 4 (5 items)
  [
    {
      name: "Git",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/git/git-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/git/F05032",
    },
    {
      name: "GitHub",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/github/github-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/github/white",
    },
    {
      name: "Linux",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/linux/linux-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/linux/FCC624",
    },
    {
      name: "AWS",
      category: "Cloud",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      fallbackUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
    },
    {
      name: "VS Code",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/vscode/vscode-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
    },
  ],

  // Row 5 (3 items)
  [
    {
      name: "Postman",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/postman/postman-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/postman/FF6C37",
    },
    {
      name: "Figma",
      category: "Tools",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/figma/figma-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/figma/F24E1E",
    },
    {
      name: "Photoshop",
      category: "Design",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/photoshop/photoshop-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/adobephotoshop/31A8FF",
    },
  ],

  // Row 6 (2 items)
  [
    {
      name: "Hugging Face",
      category: "AI",
      iconUrl: "https://cdn.simpleicons.org/huggingface/FFD21E",
      fallbackUrl: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/huggingface.svg",
    },
    {
      name: "Vercel",
      category: "Cloud",
      iconUrl: "https://cdn.simpleicons.org/vercel/white",
      fallbackUrl: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
    },
  ],

  // Row 7 (1 item - Tip of inverted triangle)
  [
    {
      name: "Kubernetes",
      category: "DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/kubernetes/kubernetes-original.svg",
      fallbackUrl: "https://cdn.simpleicons.org/kubernetes/326CE5",
    },
  ],
];

function TechCard({ item }: { item: TechIconDef; key?: React.Key }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const sources = [
    item.iconUrl,
    item.fallbackUrl,
    `https://raw.githubusercontent.com/devicon/devicon/master/icons/${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}/${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}-original.svg`,
  ].filter(Boolean) as string[];

  const handleImageError = () => {
    if (currentSrcIndex < sources.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -6 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-2 rounded-2xl transition-all duration-300 backdrop-blur-md ${
        isHovered
          ? "bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)] z-30 scale-110"
          : "bg-[#0e1017]/80 border border-white/[0.08] hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      }`}
    >
      {/* Glowing corner dot matching portfolio emerald color theme */}
      <div
        className={`absolute top-1.5 right-1.5 w-1 h-1 rounded-full transition-all ${
          isHovered
            ? "bg-emerald-300 shadow-[0_0_8px_#34d399]"
            : "bg-emerald-500/30"
        }`}
      />

      {/* Official Brand Logo */}
      <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center transition-transform">
        {!hasFailedAll ? (
          <img
            src={sources[currentSrcIndex]}
            alt={`${item.name} logo`}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            style={{
              filter: isHovered
                ? "drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
                : "brightness(0) saturate(100%) invert(64%) sepia(61%) saturate(497%) hue-rotate(108deg) brightness(98%) contrast(90%)",
              transition: "filter 0.3s ease, transform 0.3s ease",
            }}
            className="w-full h-full object-contain"
          />
        ) : (
          <Code2 className="w-5 h-5 text-emerald-400" />
        )}
      </div>

      {/* Minimal Label */}
      <span className="mt-1 text-[9px] sm:text-[10px] font-sans font-medium text-neutral-300 truncate max-w-[56px] text-center leading-tight">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section
      id="tech"
      className="relative py-28 px-4 sm:px-8 bg-[#0a0b0e] text-white select-none overflow-hidden border-t border-white/[0.08]"
    >
      {/* Radiant Glowing Emerald Mesh & Grid Background matching dark charcoal portfolio theme */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glowing emerald sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-emerald-500/10 rounded-full blur-[170px]" />
        
        {/* Subtle grid mesh */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.35) 1px, transparent 1px)`,
            backgroundSize: "28px 28px"
          }}
        />

        {/* Ambient top light beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>CORE CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-emerald-300 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          >
            TECH STACK
          </motion.h2>
        </div>

        {/* Inverted Triangle Glass Grid */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 py-4 max-w-4xl mx-auto">
          {TECH_TRIANGLE_ROWS.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: rowIndex * 0.08 }}
              className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full"
            >
              {row.map((item) => (
                <TechCard key={item.name} item={item} />
              ))}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
