import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, RefreshCw, AlertCircle, Terminal, HelpCircle, ShieldCheck } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_init",
      role: "model",
      content: "Hello! I am Jestin Shaji's AI assistant, his digital companion engineered using Google's modern Gemini models. Ask me anything about Jestin's Spring Boot microservices structures, DevOps automatic pipelines, college lab automation solutions, or how we can collaborate!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const starterPrompts = [
    "Tell me about your Spring Boot skills.",
    "Show me your Jenkins CI/CD pipeline.",
    "Are you open to full-time roles?",
    "Explain the Lab Automation project."
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);
    setErrorDetails(null);

    try {
      // Assemble message history sequence for the backend proxy
      // Map roles correctly to 'user' vs 'model' pairs
      const messageHistoryPayload = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageHistoryPayload })
      });

      const data = await res.json();

      if (res.ok) {
        const modelMsg: ChatMessage = {
          id: `msg_${Math.random().toString(36).substr(2, 9)}`,
          role: "model",
          content: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        // Handle explicit keyMissing signals
        if (data.keyMissing) {
          setErrorDetails("The GEMINI_API_KEY is missing on this workspace host. Ask the project administrator to setup GEMINI_API_KEY in the Settings > Secrets tab.");
        } else {
          setErrorDetails(data.error || "A gateway error occurred on the AI backend.");
        }
      }
    } catch (err) {
      console.error("Chat communication failure:", err);
      setErrorDetails("Could not connect to the remote AI helper server.");
    } finally {
      setIsTyping(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: "msg_init",
        role: "model",
        content: "Hello! I am Jestin Shaji's AI assistant, his digital companion engineered using Google's modern Gemini models. Ask me anything about Jestin's Spring Boot microservices structures, DevOps automatic pipelines, college lab automation solutions, or how we can collaborate!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorDetails(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-black hover:bg-neutral-800 shadow-xl flex items-center justify-center text-white cursor-pointer relative group border border-black"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Expandable Chat Screen Widget Layer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[400px] h-[550px] rounded-2xl border border-black/15 bg-white shadow-2xl overflow-hidden flex flex-col text-black"
          >
            {/* Widget top header */}
            <div className="bg-neutral-50 border-b border-black/[0.08] px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black leading-tight flex items-center gap-1">
                    <span>Jestin AI Digital Assistant</span>
                  </h4>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">
                    Powered by gemini-3.5-flash
                  </span>
                </div>
              </div>

              {/* Reset action button */}
              <button
                onClick={clearChatHistory}
                title="Clear logs"
                className="text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Body messages list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth bg-neutral-50/50">
              {messages.map((msg) => {
                const isModel = msg.role === "model";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isModel ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs shrink-0 ${
                        isModel
                          ? "bg-neutral-100 border-black/10 text-black"
                          : "bg-black text-white border-black"
                      }`}
                    >
                      {isModel ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    <div className="space-y-1 max-w-[78%]">
                      <div
                        className={`p-3 rounded-xl text-xs leading-relaxed font-sans ${
                          isModel
                            ? "bg-white border border-black/10 text-neutral-800 shadow-xs"
                            : "bg-black text-white"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[9px] text-neutral-400 block px-1 text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicators status */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-neutral-100 border border-black/10 flex items-center justify-center text-xs shrink-0">
                    <Bot className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div className="bg-white border border-black/10 p-3 rounded-xl flex items-center gap-1.5 py-4 shadow-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-200" />
                  </div>
                </div>
              )}

              {/* Error alerts notification details */}
              {errorDetails && (
                <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <div className="space-y-1 leading-snug">
                    <span className="font-mono text-[9px] uppercase tracking-wider block font-bold text-red-700">
                      AI Gateway Override
                    </span>
                    <p>{errorDetails}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter prompts list */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 border-t border-black/[0.06] bg-neutral-50">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1.5 font-bold flex items-center gap-1 select-none">
                  <HelpCircle className="w-3 h-3 text-black" /> Suggested Queries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {starterPrompts.map((pr) => (
                    <button
                      key={pr}
                      onClick={() => handleSendMessage(pr)}
                      className="text-[10px] bg-white border border-black/10 hover:border-black py-1 px-2.5 rounded-full text-neutral-700 hover:text-black transition-all cursor-pointer shadow-2xs"
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message input elements controls */}
            <div className="bg-white border-t border-black/[0.08] p-3 flex gap-2">
              <input
                type="text"
                placeholder="Inquire about custom backend architectures..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-neutral-50 border border-black/10 focus:border-black rounded-xl px-4 py-3 text-xs text-black focus:outline-none placeholder-neutral-400"
              />

              <button
                onClick={() => handleSendMessage()}
                className="w-10 h-10 shrink-0 bg-black hover:bg-neutral-800 text-white rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
