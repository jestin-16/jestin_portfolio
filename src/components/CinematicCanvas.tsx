import { useEffect, useRef } from "react";

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates for gentle attraction / repulsion
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Define particle instances
    class Speck {
      x!: number;
      y!: number;
      size!: number;
      speedX!: number;
      speedY!: number;
      opacity!: number;
      fadeSpeed!: number;
      color!: string;
      depth!: number;

      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial spread
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2 + 0.5;
        this.depth = Math.random() * 0.8 + 0.2; // parallax factor
        this.speedX = (Math.random() * 0.4 - 0.2) * this.depth;
        this.speedY = -(Math.random() * 0.8 + 0.2) * this.depth;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.002 + 0.0005;

        const colors = [
          "rgba(59, 130, 246,", // Electric blue
          "rgba(6, 182, 212,",  // Cyan
          "rgba(168, 85, 247,", // Soft purple
          "rgba(255, 255, 255," // Warm mist
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Gentle magnetic pull toward mouse targets
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.x += dx * 0.002 * this.depth;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Speck[] = [];
    const particleCount = Math.min(65, Math.floor(width / 20));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Speck());
    }

    // Render loop
    const render = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)"; // Soft trails for flowing fog look
      ctx.fillRect(0, 0, width, height);

      // Damp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Subtle atmospheric volumetric fog orbs (cinematic)
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        50,
        mouse.x,
        mouse.y,
        width * 0.6
      );
      gradient.addColorStop(0, "rgba(37, 99, 235, 0.04)");
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render cosmic particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
