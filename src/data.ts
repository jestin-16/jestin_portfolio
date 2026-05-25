import { Project, TechItem, ExperienceItem, BlogPost } from "./types";

export const JESTIN_BIO = {
  name: "Jestin Shaji",
  title: "Full Stack Developer",
  subtitle: "Spring Boot Specialist & Cloud Architect Enthusiast",
  aboutFull: `I am a forward-thinking Full Stack & Spring Boot Developer currently pursuing my Master of Computer Applications (MCA). My core passion lies in engineering ultra-scalable backend systems, orchestrating automated cloud-native infrastructures, and deploying intelligent software networks. Focusing deeply on REST APIs, microservices, and robust performance engineering, I bridge the gap between software discipline and modern architectural innovation.`,
  tagline: "I engineer scalable digital products, cloud-native architectures, and intelligent applications that solve real-world problems.",
  location: "Kerala, India",
  email: "jestinshaji777@gmail.com",
  phone: "+91 9020336092",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:jestinshaji777@gmail.com"
  },
  stats: [
    { label: "Architecture Speed", value: "< 120ms response" },
    { label: "Projects Completed", value: "15+ engineered" },
    { label: "Orchestration Efficiency", value: "0% downtime target" },
    { label: "Learning Engine", value: "MCA Candidate" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "microservices-cicd",
    title: "Orchestrated CI/CD Microservices Pipeline",
    subtitle: "Enterprise DevOps Engineering Showcase",
    description: "A continuous deployment and automation setup utilizing multi-stage Jenkins pipelines, isolated container environments, and active Kubernetes rolling deployments.",
    longDescription: "Designed and engineered an automated CI/CD blueprint for microservices. By orchestrating robust Jenkinsfiles, containerizing Java Spring Boot nodes, and employing Kubernetes container strategies, the architecture ensures 0-downtime horizontal scaling and automatic failover handling triggered directly by incoming changes.",
    category: "devops",
    tags: ["Jenkins", "Docker", "Kubernetes", "Spring Boot", "Git/GitHub", "Microservices"],
    colorPreset: "blue",
    metrics: [
      { label: "Build & Deploy Speed", value: "-60% overhead" },
      { label: "Downtime Percentage", value: "0.00% absolute" },
      { label: "Container Registry Link", value: "Docker Hub synced" }
    ],
    features: [
      "Dynamic GitHub webhooks activating fully isolated automated orchestration builders",
      "Multi-stage Maven builds packed inside lightweight alpine Docker environments",
      "Kubernetes deployment triggers handling active-passive canary updates",
      "Automated log visualizers mapping pipeline logs cleanly for debugging"
    ],
    architectureDiagramTitle: "Enterprise Microservices Delivery Layout",
    architectureDetails: [
      "Local Developer pushing updates to GitHub trigger pipeline hook.",
      "Webhook wakes Jenkins Executor which builds and packages Java targets into artifacts.",
      "Finished artifacts are isolated into Docker Images and deployed onto Docker Hub Registry.",
      "Kubernetes Cluster receives rolling-update instructions, safely spawning healthy replicas."
    ],
    steps: [
      { title: "Git Push Hook", description: "Webhook payload triggers secure Jenkins pipeline scanner.", time: "0.0s" },
      { title: "Artifact Assembly", description: "Jenkins pulls code & runs unit test suite via Maven compiler.", time: "+45.0s" },
      { title: "Containerization", description: "Docker builds layered images and tags them as stable release.", time: "+1m 15s" },
      { title: "Pod Orchestration", description: "Kubernetes clusters deploy the pods with automated rollback fallback.", time: "+2m 00s" }
    ],
    githubUrl: "https://github.com"
  },
  {
    id: "lab-automation",
    title: "College Lab Automation System",
    subtitle: "High Density Device & Attendance Management",
    description: "A smart infrastructure hub that automates physical laboratory attendance, live seat distribution, and active tracking for workstation computing resources.",
    longDescription: "Engineered a high-performance system for university computer labs. Utilizing real-time barcode scanning systems, the platform manages attendance, automates individual desktop seating assignments based on student IDs, and features a clean administrator interface to audit server memory usage, dynamic hardware configurations, and asset lifecycles.",
    category: "automation",
    tags: ["Java", "Spring Boot", "MySQL", "Barcode SDK", "Thymeleaf", "Responsive UI"],
    colorPreset: "cyan",
    metrics: [
      { label: "Daily Active Seats", value: "120+ allocated" },
      { label: "Manual Tracking Saved", value: "100% saved" },
      { label: "Admin Seat Mapping", value: "< 0.5s response" }
    ],
    features: [
      "Live barcode reader parsing physical student cards to secure entrance access",
      "Algorithmic computer terminal allocation calculating best hardware compatibility",
      "Dynamic workstation diagnostics panel capturing server statistics in real-time",
      "Automatic asset auditing tracker saving hours of physical database inventory checking"
    ],
    architectureDiagramTitle: "Automated Lab Node and Seat Allocation Flow",
    architectureDetails: [
      "Student scans barcode badge at the entry station.",
      "Server checks system registers to guarantee valid student credentials.",
      "Lab database reserves a workspace machine node and returns seat token instantly.",
      "Admin controller logs the attendance and displays active server health."
    ],
    steps: [
      { title: "Badge Swipe", description: "Hardware scanner grabs physical student ID.", time: "0.0s" },
      { title: "Active Auth", description: "Spring Boot checks database registers for student validation.", time: "+0.1s" },
      { title: "Seat Lock", description: "Allocation Engine locks healthy terminal & sends token to screen.", time: "+0.3s" },
      { title: "Terminal Live", description: "Workstation session active, administrative monitoring log saved.", time: "+0.5s" }
    ],
    githubUrl: "https://github.com"
  },
  {
    id: "event-management",
    title: "Event Micro-SaaS Dashboard",
    subtitle: "Secure Real-Time Booking & Registration",
    description: "A secure analytical full-stack dashboard supporting physical and digital event reservations, administrator calendar schedules, and attendee analytics.",
    longDescription: "Developed an enterprise event platform with beautiful visual summaries. Implemented a robust Spring Boot backend handling high concurrent check-ins, paired with granular security filters to isolate user registries. Administrators can instantly edit calendars, check registered seat layouts, and review revenue charts.",
    category: "fullstack",
    tags: ["React.js", "Spring Boot", "PostgreSQL", "Tailwind CSS", "JWT Security", "Spring Data JPA"],
    colorPreset: "purple",
    metrics: [
      { label: "Simultaneous Visitors", value: "5k concurrent" },
      { label: "Dashboard Frame Rate", value: "60 FPS fluid" },
      { label: "DB Registration Latency", value: "< 35ms query" }
    ],
    features: [
      "Secure JSON Web Token auth workflow guarding student registries and staff controls",
      "Interactive calendar planner displaying real-time date collisions and scheduling",
      "Interactive analytics charts tracing active attendee growth and demographic scales",
      "Automated e-mail scheduler generating QR ticket badges upon booking completion"
    ],
    architectureDiagramTitle: "SaaS Reservation and State Dispatch Structure",
    architectureDetails: [
      "User registers for targeted event through highly responsive React portal.",
      "React dispatches token-authorized API request to the backend controllers.",
      "Spring Boot validates security parameters, querying safe PostgreSQL schemas.",
      "Confirmation engine completes transaction, scheduling a push notification."
    ],
    steps: [
      { title: "Seat Reservation", description: "User chooses designated tickets and hits pay.", time: "0.0s" },
      { title: "Filter Pipeline", description: "Spring Security parses JWT to check access token legitimacy.", time: "+0.1s" },
      { title: "Database Sync", description: "Safe ACID Transaction persists event inventory details.", time: "+0.2s" },
      { title: "Ticket Generated", description: "Microservices build customized digital ticket layout.", time: "+0.4s" }
    ],
    githubUrl: "https://github.com"
  },
  {
    id: "music-recommender",
    title: "Mood-Based Music Recommendation Engine",
    subtitle: "Artificial Intelligence Mobile App",
    description: "An intelligent app leveraging computer vision mood classifiers and personalized algorithmic feeds to queue ambient music lists reflecting user sentiment.",
    longDescription: "A groundbreaking blend of mobile design and machine learning systems. By analyzing emotional micro-expressions on facial captures or answering contextual emotion quizzes, the system processes mood signals and maps them to track parameters, creating a customized auditory journey.",
    category: "ai_ml",
    tags: ["Android Studio", "Machine Learning", "Python", "Flask API", "Spotify API Sync", "Recsys"],
    colorPreset: "indigo",
    metrics: [
      { label: "Expression Accuracy", value: "92.4% success" },
      { label: "Audio Sync Latency", value: "< 125ms delay" },
      { label: "Recommendation Score", value: "4.8 / 5 satisfaction" }
    ],
    features: [
      "Integrated neural computer vision classification model analyzing localized sentiment",
      "Intelligent content-based filtration engine sorting audio tracks logically",
      "Elegant custom responsive Android audio player featuring rich fluid waveforms",
      "Dynamic weather and environment context matching to further improve feed target"
    ],
    architectureDiagramTitle: "Intelligent Neural recommendation Workflow",
    architectureDetails: [
      "Mobile App safely requests front camera capture (with permission indicator).",
      "Image processing extracts facial contours, passing metrics to Python service.",
      "Machine learning models classify the baseline emotion vectors.",
      "Recommendation engine pulls database tracks, returning the custom audio queue."
    ],
    steps: [
      { title: "Image Capture", description: "Device takes localized camera input contour profile.", time: "0.0s" },
      { title: "Vector Analysis", description: "Convolutional Neural Network evaluates localized mouth & eye curves.", time: "+0.2s" },
      { title: "Audio Matching", description: "Flask REST controllers match emotion vector to BPM indices.", time: "+0.3s" },
      { title: "Queue Loaded", description: "User speaker begins playing tailored soothing acoustic selection.", time: "+0.4s" }
    ],
    githubUrl: "https://github.com"
  }
];

export const TECH_STACK: TechItem[] = [
  // Frontend
  { name: "React.js", category: "frontend", proficiency: "Advanced", glowingColor: "rgba(59, 130, 246, 0.4)" },
  { name: "JavaScript", category: "frontend", proficiency: "Expert", glowingColor: "rgba(252, 211, 77, 0.4)" },
  { name: "HTML5", category: "frontend", proficiency: "Expert", glowingColor: "rgba(239, 68, 68, 0.4)" },
  { name: "CSS3", category: "frontend", proficiency: "Expert", glowingColor: "rgba(59, 130, 246, 0.4)" },
  { name: "Tailwind CSS", category: "frontend", proficiency: "Advanced", glowingColor: "rgba(6, 182, 212, 0.4)" },
  { name: "Bootstrap", category: "frontend", proficiency: "Intermediate", glowingColor: "rgba(139, 92, 246, 0.4)" },

  // Backend
  { name: "Java Enterprise", category: "backend", proficiency: "Expert", glowingColor: "rgba(239, 68, 68, 0.4)" },
  { name: "Spring Boot", category: "backend", proficiency: "Expert", glowingColor: "rgba(34, 197, 94, 0.4)" },
  { name: "REST APIs", category: "backend", proficiency: "Expert", glowingColor: "rgba(6, 182, 212, 0.4)" },
  { name: "Node.js", category: "backend", proficiency: "Advanced", glowingColor: "rgba(34, 197, 94, 0.4)" },

  // Database
  { name: "MySQL", category: "database", proficiency: "Advanced", glowingColor: "rgba(59, 130, 246, 0.4)" },
  { name: "PostgreSQL", category: "database", proficiency: "Advanced", glowingColor: "rgba(14, 116, 144, 0.4)" },
  { name: "MongoDB", category: "database", proficiency: "Intermediate", glowingColor: "rgba(34, 197, 94, 0.4)" },

  // DevOps & Cloud
  { name: "Docker", category: "devops", proficiency: "Advanced", glowingColor: "rgba(6, 182, 212, 0.4)" },
  { name: "Kubernetes", category: "devops", proficiency: "Intermediate", glowingColor: "rgba(59, 130, 246, 0.4)" },
  { name: "Jenkins", category: "devops", proficiency: "Advanced", glowingColor: "rgba(224, 73, 52, 0.4)" },
  { name: "Git & GitHub", category: "devops", proficiency: "Expert", glowingColor: "rgba(255, 255, 255, 0.4)" },
  { name: "CI/CD Workflows", category: "devops", proficiency: "Advanced", glowingColor: "rgba(168, 85, 247, 0.4)" },

  // Programming
  { name: "Java Language", category: "programming", proficiency: "Expert", glowingColor: "rgba(239, 68, 68, 0.4)" },
  { name: "Python", category: "programming", proficiency: "Advanced", glowingColor: "rgba(252, 211, 77, 0.4)" },
  { name: "C Language", category: "programming", proficiency: "Intermediate", glowingColor: "rgba(107, 114, 128, 0.4)" },

  // AI & ML
  { name: "Machine Learning", category: "ai_ml", proficiency: "Enthusiast", glowingColor: "rgba(168, 85, 247, 0.4)" },
  { name: "Artificial Intelligence", category: "ai_ml", proficiency: "Enthusiast", glowingColor: "rgba(6, 182, 212, 0.4)" },
  { name: "Recommendation Systems", category: "ai_ml", proficiency: "Intermediate", glowingColor: "rgba(59, 130, 246, 0.4)" },

  // Tools
  { name: "IntelliJ IDEA", category: "tools", proficiency: "Daily User", glowingColor: "rgba(168, 85, 247, 0.4)" },
  { name: "VS Code", category: "tools", proficiency: "Daily User", glowingColor: "rgba(6, 182, 212, 0.4)" },
  { name: "Postman API Client", category: "tools", proficiency: "Daily User", glowingColor: "rgba(249, 115, 22, 0.4)" },
  { name: "Android Studio", category: "tools", proficiency: "Advanced", glowingColor: "rgba(34, 197, 94, 0.4)" },
  { name: "MySQL Workbench", category: "tools", proficiency: "Advanced", glowingColor: "rgba(59, 130, 246, 0.4)" }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-academic",
    period: "2024 - Present",
    role: "MCA Student (Master of Computer Applications)",
    institution: "Federal Institute of Science and Technology (FISAT)",
    location: "Kerala, India",
    description: "Deepening theoretical and practical foundations in Advanced Database Systems, Algorithms Design, Software Engineering principles, Distributed Networks, and Computer Architectures.",
    achievements: [
      "Secured outstanding academic rankings in advanced data orchestration layers.",
      "Formed an on-campus cloud & development community organizing bootcamps.",
      "Authored a project blueprint mapping secure Spring API filters for cross-department academic records."
    ],
    category: "academic"
  },
  {
    id: "exp-dev",
    period: "2023 - Present",
    role: "Independent Full Stack Engineer & Open-Source Contributor",
    institution: "Digital Solutions & GitHub Lab Network",
    location: "Remote / Kerala, India",
    description: "Architecting, writing, and hosting bespoke software solutions and micro-services. Specialized in refactoring monolithic codebases into robust horizontal spring boot microservice units with secure JSON token endpoints.",
    achievements: [
      "Wrote and configured several deployment routines running cleanly on local Docker swarms and clusters.",
      "Optimized query bottlenecks in multi-table PostgreSQL systems, improving load rates by 40%.",
      "Created reusable modern UI kits incorporating framer animation loops and custom web-socket streams."
    ],
    category: "development"
  },
  {
    id: "exp-cert",
    period: "2024",
    role: "Advanced Backend & DevOps Certifications",
    institution: "Enterprise Platforms (Oracles, Docker Hub Network, Udemy)",
    location: "Kerala, India",
    description: "Rigorous self-directed curriculum mastery highlighting professional Docker orchestration, Spring Boot reactive programming models, and continuous deployment workflows.",
    achievements: [
      "Mastered multi-stage Docker builds, image slimming configurations, and layer caching techniques.",
      "Certified in relational database design principles and PostgreSQL index tuning metrics."
    ],
    category: "certification"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "microservices-patterns",
    title: "Orchestrating Microservices with Spring Boot & Docker",
    category: "microservices",
    summary: "A practical deep-dive into establishing service discovery, self-healing gateway routers, and modular Maven dependencies.",
    date: "April 18, 2026",
    readTime: "7 min read",
    content: "When engineering production service systems, separation of concerns is vital. This guide explores setting up a Spring Cloud Gateway combined with dynamic service registration, modular multi-stage Dockerfiles that reduce image weight by 70%, and safe service failovers using circuit breakers."
  },
  {
    id: "spring-api-hardening",
    title: "Securing Spring Boot REST APIs with JWT & Filter Chains",
    category: "springboot",
    summary: "Configure custom security filters, avoid common token validation traps, and implement clean CORS protocols in Spring Security.",
    date: "May 09, 2026",
    readTime: "5 min read",
    content: "API security should never be an afterthought. In this deep architectural breakdown, we write a custom OncePerRequestFilter, generate cryptographically signed JWT hashes using HS256, map granular user roles directly to controller routes, and set up resilient CORS parameters."
  },
  {
    id: "docker-kubernetes-workflow",
    title: "Kubernetes Local Cluster Setup for Spring microservices",
    category: "kubernetes",
    summary: "Step-by-step rolling deployment blueprint, environment variable injection, and service routing using Minikube.",
    date: "May 22, 2026",
    readTime: "9 min read",
    content: "Local microservice setups can quickly clutter machine resources. Learn how to map local Docker images directly to Minikube namespaces, construct tidy YAML manifest deployments, set up environment secrets, and expose ports cleanly using local Kubernetes Ingress controllers."
  }
];
