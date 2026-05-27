import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory array to store contact messages during the session
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
const contactMessages: ContactMessage[] = [];

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API - Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. API - Contact Form Submission
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields (name, email, message)" });
  }

  const newMessage: ContactMessage = {
    id: `msg_${Math.random().toString(36).substr(2, 9)}`,
    name,
    email,
    subject: subject || "No Subject",
    message,
    timestamp: new Date().toISOString(),
  };

  contactMessages.push(newMessage);
  console.log(`[Contact Form] Submitted message from ${name} (${email}): ${message.slice(0, 50)}...`);

  res.json({
    success: true,
    message: "Thank you for reaching out! Your message was received successfully.",
    data: newMessage,
  });
});

// 3. API - Custom Gemini Chatbot Proxy
// Acts as Jestin Shaji's digital twin / interactive assistant.
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body; // Expects array of messages: { role: 'user' | 'model', content: string }[]

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages array provided." });
  }

  try {
    const client = getGeminiClient();

    // Map the message history into system/user/model inputs
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const currentMessage = messages[messages.length - 1].content;

    const systemPrompt = `
      You are Jestin's interactive AI assistant (Jestin's Digital Double) representation of Jestin Shaji.
      Speak inside a professional, highly engaging, clean, creative, and slightly futuristic tone.
      You represent Jestin in first-person ("I" / "my") or as "creative engineering companion".

      Here are Jestin's actual credentials, experiences, and details. Ground your answers strictly on this context:
      - Name: Jestin Shaji
      - Role: Backend Java Developer | Spring Boot Architect | DevOps Enthusiast | MCA Student
      - Location: Kerala, India
      - Email: jestinshaji777@gmail.com
      - Phone: +91 9020336092
      
      Positioning:
      - Focused on building scalable backend products, cloud-native systems, in-house automation, and clean-software architectures.
      
      About Jestin:
      - Passionate Backend Java & Spring Boot Developer currently pursuing MCA.
      - Enjoys combining clean coding architectures with cloud deployment practices, efficient database, microservices, DevOps workflows, and intelligent software automation.
      
      Tech Stack:
      - Frontend: React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap
      - Backend: Java, Spring Boot, REST APIs, Node.js
      - Databases: MySQL, PostgreSQL, MongoDB
      - DevOps & Cloud: Docker, Kubernetes, Jenkins, Git, GitHub, CI/CD, Docker Hub
      - Programming Languages: Java, Python, JavaScript, C
      - AI & Machine Learning: Machine Learning, Artificial Intelligence, Recommendation Systems
      - Productivity Tools: IntelliJ IDEA, VS Code, Postman, Android Studio, MySQL Workbench
      
      Featured Projects:
      1. CI/CD Pipeline for Microservices (DevOps Engineering Showcase): Implemented full automated deployment consisting of Jenkins integration, Docker build containers, Kubernetes orchestrating microservices deployments, and Github Webhook webhooks.
      2. College Lab Automation System (Smart Infrastructure): An automated seat and system allocation hub, managing lab attendance via barcode, active device asset tracking, and device asset tracking.
      3. Event Management System (Backend-Focused SaaS Core): Complex Spring Boot core handling seat/event registrations, JWT security filter chains, role privileges, and dual admin controls.
      4. Mood-Based Music Recommendation App (AI/ML App): A custom Android application detecting mood based on face recognition models or user questions, pairing personalized song recommendations.
      
      Guiding Rules for Chat responses:
      1. Always speak positively, clearly, and concisely. Keep answers readable and split into short paragraphs or clean bullet points where appropriate (maximum 2-3 short paragraphs).
      2. If asked about contact info, provide email (jestinshaji777@gmail.com) and phone (+91 9020336092).
      3. If a user asks a technical or personal question outside of these topics, relate back creatively to your passion for scalability and continuous learning, or say "While I'm focusing my expert lens on backend, microservices, and AI development, I'd love to chat about how we can build scalable systems together!".
      4. Avoid making up mock projects that are not on this list.
    `;

    // Initiate chat using the GoogleGenAI SDK's Chats representation
    // Since the system uses direct chats, we can construct the session
    const chatInstance = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
      history: history,
    });

    const response = await chatInstance.sendMessage({ message: currentMessage });
    const replyText = response.text || "I apologize, but I could not formulate a response at the moment.";

    res.json({ role: "model", content: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat endpoint:", error);
    res.status(500).json({
      error: error.message || "An internal error occurred in the AI engine.",
      keyMissing: !process.env.GEMINI_API_KEY,
    });
  }
});

// Serve Frontend (Vite Middleware in development, Static serving in production)
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  setupServer().catch((err) => {
    console.error("Failed to bootstrap the full-stack server:", err);
  });
}

export default app;
