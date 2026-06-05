import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  RotateCcw, 
  Monitor, 
  Eye, 
  Zap, 
  Check, 
  Activity, 
  SlidersHorizontal,
  Compass,
  Layers,
  Sparkle
} from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function ProfileStudio() {
  const [activeTheme, setActiveTheme] = useState<"particles" | "matrix" | "gravity" | "hyperspace">("particles");
  
  // Custom Live Motion Overlays
  const [hudBrackets, setHudBrackets] = useState(true);
  const [laserScan, setLaserScan] = useState(true);
  const [cyberCompass, setCyberCompass] = useState(true);
  const [breathingEffect, setBreathingEffect] = useState(true);
  const [hologramScanlines, setHologramScanlines] = useState(true);
  const [glowTint, setGlowTint] = useState<"none" | "cyan" | "purple" | "emerald">("cyan");
  const [avatarStyle, setAvatarStyle] = useState<"cyber-visor" | "abstract-monogram" | "clean-likeness">("cyber-visor");
  
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSuccess, setIsSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Secure config confirmation flash
  const handleSaveConfig = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  // Reset editor properties
  const handleReset = () => {
    setGlowTint("cyan");
    setHudBrackets(true);
    setLaserScan(true);
    setCyberCompass(true);
    setBreathingEffect(true);
    setHologramScanlines(true);
    setAvatarStyle("cyber-visor");
    setActiveTheme("particles");
  };

  // Monitor Mouse Positions for interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // High Performance Live Motion Graphics Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles for "particles" theme
    const particlesArray: Particle[] = [];
    const particleCount = 45;
    const colorsList = ["#3b82f6", "#06b6d4", "#6366f1", "#a855f7"];

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colorsList[Math.floor(Math.random() * colorsList.length)],
        alpha: Math.random() * 0.3 + 0.2
      });
    }

    // Stars array for "hyperspace" theme
    const starsArray: {x: number; y: number; z: number}[] = [];
    for (let i = 0; i < 60; i++) {
      starsArray.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width
      });
    }

    let gravityTick = 0;

    // Drawing loops
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render theme 1: Interactive connecting Particle Grid
      if (activeTheme === "particles") {
        particlesArray.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary bounce
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse attraction
          if (isHovered) {
            const dx = mousePos.x - p.x;
            const dy = mousePos.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              p.x += dx * 0.02;
              p.y += dy * 0.02;
            }
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Search neighbors to draw lines
          for (let j = index + 1; j < particlesArray.length; j++) {
            const p2 = particlesArray[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 65) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - dist / 65) * 0.12;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      }

      // Render theme 2: Holographic Core Matrix Nodes
      else if (activeTheme === "matrix") {
        ctx.font = "8px monospace";
        ctx.fillStyle = "#06b6d4";
        ctx.globalAlpha = 0.35;
        
        for (let x = 10; x < width; x += 18) {
          const char = Math.floor(Math.random() * CHAR_ARRAY_CYBER.length);
          const rawChar = CHAR_ARRAY_CYBER[char];
          const speed = (x % 3) + 1;
          const y = ((gravityTick * speed) % (height - 10)) + 10;
          ctx.fillText(rawChar, x, y);
        }

        // Concentric cybernetic crosshair patterns
        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 70 + Math.sin(gravityTick * 0.02) * 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 100 + Math.cos(gravityTick * 0.015) * 10, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs lines
        ctx.beginPath();
        ctx.moveTo(width / 2 - 120, height / 2);
        ctx.lineTo(width / 2 - 80, height / 2);
        ctx.moveTo(width / 2 + 80, height / 2);
        ctx.lineTo(width / 2 + 120, height / 2);
        ctx.stroke();
      }

      // Render theme 3: Dynamic Gravity Ripple Spectrum
      else if (activeTheme === "gravity") {
        gravityTick += 1;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
        
        ctx.beginPath();
        for (let x = 0; x < width; x += 3) {
          const distToCenter = Math.abs(x - width / 2);
          const damping = Math.max(0, 1 - distToCenter / 150);
          const y = height / 2 + Math.sin(x * 0.05 + gravityTick * 0.1) * 22 * damping;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Secondary cyan spectrum line
        ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
        ctx.beginPath();
        for (let x = 0; x < width; x += 3) {
          const distToCenter = Math.abs(x - width / 2);
          const damping = Math.max(0, 1 - distToCenter / 150);
          const y = height / 2 + Math.cos(x * 0.04 - gravityTick * 0.08) * 18 * damping;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Render theme 4: Space-Time Starfield Warping
      else if (activeTheme === "hyperspace") {
        starsArray.forEach((s) => {
          s.z -= 1.5;
          if (s.z <= 0) {
            s.z = width;
            s.x = (Math.random() - 0.5) * width;
            s.y = (Math.random() - 0.5) * height;
          }

          // Projection onto screen coordinates
          const k = 120 / s.z;
          const px = s.x * k + width / 2;
          const py = s.y * k + height / 2;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const rad = (1 - s.z / width) * 2 + 0.5;
            ctx.beginPath();
            ctx.arc(px, py, rad, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = 1 - s.z / width;
            ctx.fill();
          }
        });
      }

      ctx.globalAlpha = 1;
      gravityTick += 0.5;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [activeTheme, isHovered, mousePos]);

  // Pick color base based on Glow Tint parameter
  const getGlowColorClass = () => {
    switch (glowTint) {
      case "cyan": return "shadow-[0_0_35px_rgba(6,182,212,0.45)] border-cyan-500/50";
      case "purple": return "shadow-[0_0_35px_rgba(168,85,247,0.45)] border-purple-500/50";
      case "emerald": return "shadow-[0_0_35px_rgba(16,185,129,0.45)] border-emerald-500/50";
      default: return "shadow-[0_4px_24px_rgba(0,0,0,0.8)] border-neutral-800";
    }
  };

  const getGlowTextClass = () => {
    switch (glowTint) {
      case "cyan": return "text-[#06b6d4]";
      case "purple": return "text-[#a855f7]";
      case "emerald": return "text-[#10b881]";
      default: return "text-white";
    }
  };

  const getActiveGlowHex = () => {
    switch (glowTint) {
      case "cyan": return "#06b6d4";
      case "purple": return "#a855f7";
      case "emerald": return "#10b881";
      default: return "#ffffff";
    }
  };

  const CHAR_ARRAY_CYBER = ["0", "1", "X", "Y", "Z", "Ø", "Æ", "◇", "[", "]", "•"];

  return (
    <div 
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 text-left"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. Motion Graphics Canvas & Avatar Frame Box (Col span: 6) */}
      <div className="lg:col-span-6 flex flex-col justify-center items-center relative">
        <div 
          className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-neutral-900 bg-[#07070a]/90 flex flex-col items-center justify-center p-6"
        >
          {/* Backdrops Canvas: High Performance Animation Stream */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
          />

          {/* Interactive Mouse pointer light beam aura */}
          <div 
            className="absolute w-44 h-44 rounded-full bg-cyan-500/[0.05] blur-[50px] pointer-events-none transition-transform duration-100 ease-out z-0"
            style={{
              transform: `translate(${mousePos.x - 88}px, ${mousePos.y - 88}px)`,
              opacity: isHovered ? 1 : 0
            }}
          />

          {/* Hologram Matrix HUD scan indicators */}
          <div className="absolute inset-x-8 top-10 flex justify-between items-center text-[8px] font-mono tracking-widest text-[#555] z-10 pointer-events-none">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#06b6d4] animate-pulse" />
              <span>CORE_VISUAL_STREAM</span>
            </span>
            <span>ZOOM: 1.0X</span>
          </div>

          <div className="absolute inset-x-8 bottom-10 flex justify-between items-center text-[8px] font-mono tracking-widest text-[#555] z-10 pointer-events-none">
            <span>RES: DEFAULT_STUDIO</span>
            <span className="text-[#06b6d4] font-bold">MODE: {activeTheme.toUpperCase()}</span>
          </div>

          {/* Double Dynamic Orbit Concentric Guides */}
          <div className="absolute w-72 h-72 rounded-full border border-white/[0.02] inline-flex items-center justify-center animate-[spin_24s_linear_infinite] pointer-events-none z-0">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/30 absolute top-0" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 absolute bottom-12 left-10" />
          </div>

          {/* MAIN PROFILED AVATAR DISPLAY WITH FILTERS */}
          <div className="relative z-10 flex flex-col items-center select-none">
            
            {/* COMPASS GRAPHICS: Spinning absolute rings surrounding the border */}
            <AnimatePresence>
              {cyberCompass && (
                <>
                  <motion.div
                    className="absolute -inset-4 border border-dashed border-cyan-500/35 rounded-full pointer-events-none z-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-6 border border-cyan-400/15 rounded-full pointer-events-none z-0"
                    style={{ borderStyle: "double", borderWidth: "3px" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-8 border border-white/[0.03] rounded-full pointer-events-none z-0"
                    animate={{ rotate: 180 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Pulsating Wrapper */}
            <motion.div
              animate={breathingEffect ? { scale: [1, 1.04, 1] } : {}}
              transition={breathingEffect ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
              className="relative"
            >
              <div 
                className={`relative w-48 h-48 rounded-full border-4 overflow-hidden transition-all duration-500 bg-[#0c0d13]/95 ${getGlowColorClass()}`}
              >
                {/* HUD Corners Overlaid inside the picture clip */}
                <AnimatePresence>
                  {hudBrackets && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none z-30"
                    >
                      {/* Technical visual corner target boundaries */}
                      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#06b6d4] opacity-90" />
                      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#06b6d4] opacity-90" />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#06b6d4] opacity-90" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#06b6d4] opacity-90" />
                      
                      {/* Target reticle cross center */}
                      <div className="absolute top-1/2 left-3 w-1.5 h-px bg-[#06b6d4]/50" />
                      <div className="absolute top-1/2 right-3 w-1.5 h-px bg-[#06b6d4]/50" />
                      <div className="absolute left-1/2 top-3 w-px h-1.5 bg-[#06b6d4]/50" />
                      <div className="absolute left-1/2 bottom-3 w-px h-1.5 bg-[#06b6d4]/50" />
                      
                      {/* Scanning lock tracking tag */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[6px] font-mono text-[#06b6d4] tracking-widest bg-neutral-950/80 px-1 py-0.5 rounded border border-cyan-500/20 font-bold scale-90">
                        SYS_LOCK_ACTIVE
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Vertical/Horizontal moving laser scan banner */}
                <AnimatePresence>
                  {laserScan && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent shadow-[0_0_12px_#06b6d4] z-25 pointer-events-none"
                      animate={{ opacity: 1, top: ["5%", "95%", "5%"] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>

                {/* Vector Avatar Models Render Box */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={avatarStyle}
                    className="w-full h-full bg-[#0a0b12] p-1 flex items-center justify-center relative z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {avatarStyle === "cyber-visor" && (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-800">
                        {/* Neck and Throat line */}
                        <path d="M40 76 L60 76 L57 60 L43 60 Z" fill="#cf9c82" />
                        <path d="M43 60 L57 60 C57 66, 43 66, 43 60 Z" fill="#b1765c" />
                        {/* Face shape */}
                        <path d="M33 38 C33 30, 67 30, 67 38 C67 55, 60 64, 50 64 C40 64, 33 55, 33 38 Z" fill="#deb19a" />
                        {/* Ears */}
                        <circle cx="31" cy="44" r="5" fill="#deb19a" />
                        <circle cx="69" cy="44" r="5" fill="#deb19a" />
                        {/* Bold neat black hair with customize highlight streaks */}
                        <path d="M31 34 C25 28, 30 14, 40 10 C46 8, 54 8, 60 10 C70 14, 75 28, 69 34 C66 28, 63 26, 50 25 C37 26, 34 28, 31 34 Z" fill="#0c0d12" />
                        <path d="M38 18 Q45 12 55 14" stroke={getActiveGlowHex()} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
                        
                        {/* Sleek cyber visor goggle unit */}
                        <g>
                          {/* Inner dark bar */}
                          <path d="M28 35 C28 35, 32 32, 50 32 C68 32, 72 35, 72 35 C74 46, 70 47, 50 47 C30 47, 26 46, 28 35 Z" fill="#040406" stroke={getActiveGlowHex()} strokeWidth="2.2" />
                          {/* Glowing laser strip inside specs */}
                          <path 
                            d="M32 39 L68 39" 
                            stroke={glowTint === "none" ? "#3b82f6" : getActiveGlowHex()} 
                            strokeWidth="2.5" 
                            strokeLinecap="round"
                            opacity="0.95"
                          />
                          {/* Technical grid micro ticks on specs */}
                          <line x1="36" y1="41" x2="41" y2="41" stroke={getActiveGlowHex()} strokeWidth="0.8" opacity="0.8" />
                          <line x1="64" y1="41" x2="59" y2="41" stroke={getActiveGlowHex()} strokeWidth="0.8" opacity="0.8" />
                          <circle cx="50" cy="36" r="1.2" fill="#ef4444" className="animate-ping" />
                        </g>
                        {/* Stylish Mustache & Mouth */}
                        <path d="M38 52 Q44 49 50 51 Q56 49 62 52 Q64 54 60 55 Q50 53 40 55 Q36 54 38 52 Z" fill="#0c0d12" />
                        <path d="M44 57 Q50 60 56 57" stroke="#b45852" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        {/* Tech Collar & Shirt */}
                        <path d="M15 82 L35 76 L40 85 L35 96 Z" fill="#0a0a0f" />
                        <path d="M85 82 L65 76 L60 85 L65 96 Z" fill="#0a0a0f" />
                        <path d="M25 78 C35 76, 65 76, 75 78 L85 100 L15 100 Z" fill="#13141c" />
                        
                        {/* Matrix vertical code line cascading over shoulder */}
                        <line x1="20" y1="70" x2="20" y2="90" stroke={getActiveGlowHex()} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                        <line x1="80" y1="70" x2="80" y2="90" stroke={getActiveGlowHex()} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                      </svg>
                    )}

                    {avatarStyle === "abstract-monogram" && (
                      <div className="relative w-full h-full flex items-center justify-center bg-[#07070c]">
                        {/* Dynamic 3D Floating Wireframe Cube Logo representational vector */}
                        <svg viewBox="0 0 100 100" className="w-3/4 h-3/4" style={{ color: getActiveGlowHex() }}>
                          {/* Interactive tech background circles */}
                          <circle 
                            cx="50" cy="50" r="42" 
                            stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 6" fill="none" 
                          />
                          <circle 
                            cx="50" cy="50" r="32" 
                            stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3"
                          />
                          {/* Isometric Wireframe Cube representing Backend Systems/Java Cloud Nodes */}
                          <g transform="translate(50, 48)">
                            {/* Top Panel */}
                            <polygon 
                              points="0,-24 20,-12 0,0 -20,-12" 
                              fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"
                            />
                            {/* Left Panel */}
                            <polygon 
                              points="-20,-12 0,0 0,22 -20,10" 
                              fill="#3b82f6" fillOpacity="0.15" stroke="#3782f6" strokeWidth="1.5"
                            />
                            {/* Right Panel */}
                            <polygon 
                              points="0,0 20,-12 20,10 0,22" 
                              fill="#131424" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5"
                            />
                            {/* Inner Nucleus Node */}
                            <circle 
                              cx="0" cy="4" r="5" 
                              fill="currentColor"
                            />
                            {/* Connector vectors */}
                            <line x1="0" y1="4" x2="0" y2="-24" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="4" x2="-20" y2="-12" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                            <line x1="0" y1="4" x2="20" y2="-12" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                          </g>
                        </svg>
                      </div>
                    )}

                    {avatarStyle === "clean-likeness" && (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-800">
                        {/* Original Clean Likeness (Without cybervisor) */}
                        {/* Neck and Throat line */}
                        <path d="M40 76 L60 76 L57 60 L43 60 Z" fill="#e6b194" />
                        <path d="M43 60 L57 60 C57 66, 43 66, 43 60 Z" fill="#d29676" />
                        {/* Face shape */}
                        <path d="M33 38 C33 30, 67 30, 67 38 C67 55, 60 64, 50 64 C40 64, 33 55, 33 38 Z" fill="#f5c2a7" />
                        {/* Ears */}
                        <circle cx="31" cy="44" r="5" fill="#f5c2a7" />
                        <circle cx="69" cy="44" r="5" fill="#f5c2a7" />
                        {/* Neat black hair */}
                        <path d="M31 34 C25 28, 30 14, 40 10 C46 8, 54 8, 60 10 C70 14, 75 28, 69 34 C66 28, 63 26, 50 25 C37 26, 34 28, 31 34 Z" fill="#0d0d0f" />
                        {/* Sideburns */}
                        <path d="M32 34 L34 42 L36 42 L34 34 Z" fill="#0d0d0f" />
                        <path d="M68 34 L66 42 L64 42 L66 34 Z" fill="#0d0d0f" />
                        {/* Eyebrows */}
                        <path d="M37 34 Q43 31 47 33" stroke="#0d0d0f" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                        <path d="M63 34 Q57 31 53 33" stroke="#0d0d0f" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                        {/* Realistic calm deep brown eyes */}
                        <ellipse cx="42" cy="39" rx="3.5" ry="2.2" fill="#fff" />
                        <ellipse cx="58" cy="39" rx="3.5" ry="2.2" fill="#fff" />
                        <circle cx="42" cy="39" r="1.6" fill="#311910" />
                        <circle cx="58" cy="39" r="1.6" fill="#311910" />
                        {/* Nose details */}
                        <path d="M48 37 L48 48 Q48 51 50 51 Q52 51 52 48" stroke="#d29676" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                        {/* Stylish Mustache (highly characteristic element) */}
                        <path d="M38 52 Q44 49 50 51 Q56 49 62 52 Q64 54 60 55 Q50 53 40 55 Q36 54 38 52 Z" fill="#0f0f12" />
                        {/* Friendly mouth lips */}
                        <path d="M44 57 Q50 60 56 57" stroke="#ca726c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        {/* Collar & Shirt */}
                        <path d="M15 82 L35 76 L40 85 L35 96 Z" fill="#14141a" />
                        <path d="M85 82 L65 76 L60 85 L65 96 Z" fill="#14141a" />
                        <path d="M25 78 C35 76, 65 76, 75 78 L85 100 L15 100 Z" fill="#1b1c22" />
                        {/* Golden tech pendant badge */}
                        <path d="M47 88 L53 88 L55 95 L50 99 L45 95 Z" fill={getActiveGlowHex()} opacity="0.8" />
                        <line x1="50" y1="76" x2="50" y2="88" stroke="#444" strokeWidth="1" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Holographic grid scan overlay */}
                {hologramScanlines && (
                  <div 
                    className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                    style={{ 
                      backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
                      backgroundSize: "100% 4px",
                      opacity: 0.25
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* Profile context titles */}
            <div className="text-center mt-5 space-y-1">
              <span className={`text-[11px] font-mono tracking-widest uppercase font-extrabold ${getGlowTextClass()}`}>
                • HOLOGRAM AVATAR RENDER •
              </span>
              <h4 className="text-sm font-bold text-white font-sans">
                Jestin Shaji (Vector Likeness)
              </h4>
              <p className="text-[10px] font-mono text-neutral-500 leading-none">
                Dynamic visual simulation streaming live
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Style Adjuster / Controller Panels (Col span: 6) */}
      <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-5">
        
        {/* Interactive Controls Segment */}
        <div className="space-y-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white tracking-tight">Holographic Avatar controls</h4>
            </div>
            <p className="text-neutral-500 text-xs font-sans leading-relaxed">
              Dynamically manipulate neon glows, holographic systems, and color spectrum matrices to customize Jestin's console portal. All models rendering directly on hardware-accelerated canvas grids.
            </p>
          </div>

          <div className="space-y-4 bg-neutral-950/45 border border-neutral-900/60 rounded-2xl p-4">
            
            {/* Vector style selector buttons */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">
                // AVATAR FORM SELECTOR
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "cyber-visor", label: "Cyber Visor" },
                  { id: "abstract-monogram", label: "Abstract Cube" },
                  { id: "clean-likeness", label: "Clean Dev" },
                ].map((avStyle) => (
                  <button
                    key={avStyle.id}
                    onClick={() => setAvatarStyle(avStyle.id as any)}
                    className={`py-2 px-1.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer flex flex-col justify-center items-center gap-0.5 ${
                      avatarStyle === avStyle.id
                        ? "bg-white/5 border-[#06b6d4] text-cyan-300"
                        : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                    }`}
                  >
                    <span className="uppercase font-bold text-[8px] tracking-wider text-center leading-none">{avStyle.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aura Framing picker */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">
                // SYSTEM EMISSION AURA GLOW
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(["none", "cyan", "purple", "emerald"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setGlowTint(color)}
                    className={`py-1.5 rounded-xl text-[9px] font-mono uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                      glowTint === color 
                        ? "bg-white/5 border-cyan-500/50 text-cyan-300" 
                        : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* PORTRAIT HUD OVERLAY SYSTEM */}
            <div className="space-y-2 pt-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#06b6d4] block font-bold">
                // SYSTEM MOTION OVERLAYS
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                <button
                  onClick={() => setCyberCompass(!cyberCompass)}
                  className={`px-1 py-2 rounded-xl text-[10px] font-mono border transition-all cursor-pointer flex flex-col justify-center items-center gap-1 ${
                    cyberCompass 
                      ? "bg-[#06b6d4]/5 border-[#06b6d4]/30 text-cyan-300" 
                      : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                  }`}
                >
                  <span className="uppercase font-bold text-[7px] tracking-tight">Compass</span>
                  <span className="text-[6px] text-gray-400 font-extrabold">{cyberCompass ? "ACTIVE" : "OFF"}</span>
                </button>

                <button
                  onClick={() => setHudBrackets(!hudBrackets)}
                  className={`px-1 py-2 rounded-xl text-[10px] font-mono border transition-all cursor-pointer flex flex-col justify-center items-center gap-1 ${
                    hudBrackets 
                      ? "bg-[#06b6d4]/5 border-[#06b6d4]/30 text-cyan-300" 
                      : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                  }`}
                >
                  <span className="uppercase font-bold text-[7px] tracking-tight">Target HUD</span>
                  <span className="text-[6px] text-gray-400 font-extrabold">{hudBrackets ? "ACTIVE" : "OFF"}</span>
                </button>

                <button
                  onClick={() => setLaserScan(!laserScan)}
                  className={`px-1 py-2 rounded-xl text-[10px] font-mono border transition-all cursor-pointer flex flex-col justify-center items-center gap-1 ${
                    laserScan 
                      ? "bg-[#06b6d4]/5 border-[#06b6d4]/30 text-cyan-300" 
                      : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                  }`}
                >
                  <span className="uppercase font-bold text-[7px] tracking-tight">Laser sweep</span>
                  <span className="text-[6px] text-gray-400 font-extrabold">{laserScan ? "ACTIVE" : "OFF"}</span>
                </button>

                <button
                  onClick={() => setBreathingEffect(!breathingEffect)}
                  className={`px-1 py-2 rounded-xl text-[10px] font-mono border transition-all cursor-pointer flex flex-col justify-center items-center gap-1 ${
                    breathingEffect 
                      ? "bg-[#06b6d4]/5 border-[#06b6d4]/30 text-cyan-300" 
                      : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                  }`}
                >
                  <span className="uppercase font-bold text-[7px] tracking-tight">Pulse Wave</span>
                  <span className="text-[6px] text-gray-400 font-extrabold">{breathingEffect ? "ACTIVE" : "OFF"}</span>
                </button>

                <button
                  onClick={() => setHologramScanlines(!hologramScanlines)}
                  className={`px-1 py-2 rounded-xl text-[10px] font-mono border transition-all cursor-pointer flex flex-col justify-center items-center gap-1 col-span-2 sm:col-span-1 ${
                    hologramScanlines 
                      ? "bg-[#06b6d4]/5 border-[#06b6d4]/30 text-cyan-300" 
                      : "bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-400 hover:border-neutral-850"
                  }`}
                >
                  <span className="uppercase font-bold text-[7px] tracking-tight text-center">Scanline</span>
                  <span className="text-[6px] text-gray-400 font-extrabold">{hologramScanlines ? "ACTIVE" : "OFF"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Motion Graphics selection */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#777]">
              // ACTIVE CANVAS BACKGROUND MOTION GRAPHICS
            </h4>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {[
              { id: "particles", label: "Interactive Grid", desc: "Attractor particles" },
              { id: "matrix", label: "Trace Crosshair", desc: "Subtle orbit rings" },
              { id: "gravity", label: "Wave Spectrum", desc: "Sinuous sound waves" },
              { id: "hyperspace", label: "Hyper Flight", desc: "Linear starlight path" }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id as any)}
                className={`p-3 rounded-xl border flex flex-col text-left transition-all cursor-pointer ${
                  activeTheme === theme.id 
                    ? "bg-[#3b82f6]/5 border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                    : "bg-[#07070a]/30 border-neutral-900 text-neutral-500 hover:text-neutral-300 hover:border-neutral-850"
                }`}
              >
                <span className="font-extrabold uppercase text-[10px]">{theme.label}</span>
                <span className="text-[8px] text-gray-500 uppercase font-semibold mt-0.5">{theme.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lock system action buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSaveConfig}
            className="flex-1 py-4 bg-[#121212] hover:bg-[#1a1a1a] text-white border border-neutral-950 hover:border-neutral-850 rounded-2xl text-xs font-mono font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">CONFIG SECURED ✔</span>
              </>
            ) : (
              <>
                <Sparkle className="w-4 h-4 text-purple-400" />
                <span>SAVE PORTAL PROFILE</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            title="Reset Filters"
            className="p-4 bg-neutral-900/40 hover:bg-neutral-850 text-neutral-400 hover:text-white border border-neutral-900/60 hover:border-neutral-800 rounded-2xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
