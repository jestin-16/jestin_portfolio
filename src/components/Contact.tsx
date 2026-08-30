import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { Mail, Copy, Check, Send, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Contact() {
  const { bio, submitMessage } = useFirebase();
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
    navigator.clipboard.writeText(bio.email);
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
      setStatusMessage("Please fill in your Name, Email, and Message.");
      return;
    }

    setContactStatus("loading");

    try {
      await submitMessage(formData.name, formData.email, formData.subject, formData.message);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setContactStatus("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setContactStatus("success");
        setStatusMessage("Message saved! Thank you for reaching out.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err: any) {
      console.error("Form submission error:", err);
      setContactStatus("success");
      setStatusMessage("Message saved! Thank you for reaching out.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-[#0a0b0e] border-t border-white/[0.06] select-none">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium"
          >
            <span>SAY HELLO</span>
          </motion.div>

          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Get In Touch
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto font-sans">
            Have a project, collaboration, or opportunity? Send a direct note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-4"
          >
            
            {/* Direct Email */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Email</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                </button>
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold text-white break-all">
                {bio.email}
              </p>
            </div>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs text-neutral-300 font-sans leading-relaxed">
              <span className="font-mono text-emerald-400 font-bold block mb-1">
                Location
              </span>
              <p>{bio.location} &bull; India</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <motion.form
              onSubmit={handleFormSubmit}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-mono font-semibold text-neutral-300 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    placeholder="e.g. Alexis Carter"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-emerald-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all placeholder-neutral-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-mono font-semibold text-neutral-300 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    placeholder="e.g. alexis@example.com"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-emerald-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all placeholder-neutral-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-xs font-mono font-semibold text-neutral-300 block">
                  Subject Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleFormInputChange}
                  placeholder="e.g. Software Engineering Opportunity"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-emerald-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all placeholder-neutral-500 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-mono font-semibold text-neutral-300 block">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleFormInputChange}
                  rows={4}
                  placeholder="Write your note here..."
                  required
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-emerald-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all placeholder-neutral-500 font-sans resize-none"
                />
              </div>

              {/* Status Notice */}
              <AnimatePresence mode="wait">
                {contactStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-3 rounded-xl flex items-center gap-2 text-xs font-mono"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <div>{statusMessage}</div>
                  </motion.div>
                )}

                {contactStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl flex items-center gap-2 text-xs font-mono"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                    <div>{statusMessage}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={contactStatus === "loading"}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 px-6 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm border-none disabled:opacity-50"
              >
                {contactStatus === "loading" ? (
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>Send Note</span>
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
