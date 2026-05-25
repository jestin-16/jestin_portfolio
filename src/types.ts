export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectStep {
  title: string;
  description: string;
  time?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "devops" | "automation" | "fullstack" | "ai_ml";
  tags: string[];
  metrics: ProjectMetric[];
  features: string[];
  architectureDiagramTitle: string;
  architectureDetails: string[];
  steps: ProjectStep[];
  githubUrl: string;
  demoUrl?: string;
  colorPreset: "blue" | "cyan" | "purple" | "indigo";
}

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "programming" | "ai_ml" | "tools";
  proficiency?: string; // e.g. "Advanced", "Intermediate"
  glowingColor: string; // Tailwind glow border color or custom HEX
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  institution: string;
  location: string;
  description: string;
  achievements: string[];
  category: "academic" | "development" | "certification";
}

export interface BlogPost {
  id: string;
  title: string;
  category: "microservices" | "springboot" | "docker" | "kubernetes" | "ai";
  summary: string;
  date: string;
  readTime: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}
