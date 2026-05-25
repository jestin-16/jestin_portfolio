import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JESTIN_BIO } from "../data";
import { Mail, Phone, Copy, Check, Send, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(JESTIN_BIO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement> | React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setContactStatus("error");
      setStatusMessage("Please provide your Name, Email, and Message before dispatching.");
      return;
    }

    setContactStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const parsed = await res.json();

      if (res.ok) {
        setContactStatus("success");
        setStatusMessage(parsed.message || "Message dispatched successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setContactStatus("error");
        setStatusMessage(parsed.error || "Something failed during request validation.");
      }
    } catch (err: any) {
      console.error("Form transmission error:", err);
      setContactStatus("error");
      setStatusMessage("System route error: Could not connect to backend server.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-white/[0.03]">
      {/* Dynamic background lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 radial-glow-cyan rounded-full opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] radial-glowRounded-full opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-8 bg-gradient-to-r from-purple-500 to-[#3B82F6]" />
            <span className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-bold">
              06 / Transmission
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
            Get In Touch.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl">
            Establish a secure connection with Jestin. Dispatch system inquiries, technical briefs, or academic collaborations instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Fast Connect and Info cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick click copy container */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-panel p-6 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Mail className="w-5 h-5 text-[#06B6D4] mb-4" />
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider mb-1">
                    Direct Email Endpoint
                  </span>
                  <p className="text-sm font-bold text-white font-mono break-all leading-tight select-all">
                    {JESTIN_BIO.email}
                  </p>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 p-2.5 rounded-lg text-white transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400 animate-pulse" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Direct Dial Endpoint */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-panel p-6"
            >
              <Phone className="w-5 h-5 text-purple-500 mb-4" />
              <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider mb-1">
                Direct Telephony Line
              </span>
              <a
                href={`tel:${JESTIN_BIO.phone}`}
                className="text-base font-bold text-white font-mono hover:text-[#3B82F6] transition-colors"
              >
                {JESTIN_BIO.phone}
              </a>
              <span className="text-[10px] text-gray-500 block mt-2">
                Available: IST working hours
              </span>
            </motion.div>

            {/* Verification Security Notice */}
            <div className="text-xs text-gray-500 leading-relaxed space-y-2 select-none border-l-2 border-white/10 pl-4 py-1">
              <span className="font-mono text-[10px] text-[#3B82F6] font-bold block uppercase tracking-wider">
                [SECURE FILTER PIPELINE]
              </span>
              <p>All transmitted logs are safely validated and queued in memory on full-stack nodes running in container infrastructures.</p>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-8">
            <motion.form
              onSubmit={handleFormSubmit}
              className="glass-panel p-6 md:p-8 space-y-6 relative"
            >
              <p className="text-xs font-mono text-[#06B6D4] uppercase tracking-wider mb-2 font-bold select-none">
                &lt;Interactive Dispatch Protocol /&gt;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-widest block font-bold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    placeholder="e.g. Alexis Carter"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#3B82F6] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-widest block font-bold">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    placeholder="e.g. alexis@cloud.org"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#3B82F6] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono text-gray-400 uppercase tracking-widest block font-bold">
                  SUBJECT TOPIC
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleFormInputChange}
                  placeholder="e.g. Scaling Spring Boot Microservices Blueprints"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#3B82F6] outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-widest block font-bold">
                  TRANSMISSION BODY *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleFormInputChange}
                  rows={4}
                  placeholder="Deconstruct your message content here..."
                  required
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#3B82F6] outline-none transition-colors resize-none"
                />
              </div>

              {/* Submission status feedback notifications */}
              <AnimatePresence mode="wait">
                {contactStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-start gap-3 text-xs"
                  >
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold uppercase font-mono tracking-wide block mb-1">DISPATCH RECEIVED</span>
                      {statusMessage}
                    </div>
                  </motion.div>
                )}

                {contactStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 text-xs"
                  >
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold uppercase font-mono tracking-wide block mb-1">TRANSMISSION OVERFLOW</span>
                      {statusMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={contactStatus === "loading"}
                className="w-full bg-white hover:bg-neutral-200 text-black py-4 px-6 rounded-xl font-medium text-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 font-mono uppercase tracking-widest shadow-lg shadow-white/5 active:shadow-none disabled:opacity-50"
              >
                {contactStatus === "loading" ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit System Request</span>
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
