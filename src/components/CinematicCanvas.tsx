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
          "rgba(16, 185, 129,",  // Sage Emerald
          "rgba(52, 211, 153,",  // Soft Mint
          "rgba(251, 191, 36,",  // Warm Sand Amber
          "rgba(148, 163, 184,"  // Slate Light
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
    const particleCount = Math.min(35, Math.max(16, Math.floor(width / 40)));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Speck());
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Render specks
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

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
