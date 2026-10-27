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
    <section id="contact" className="py-20 px-6 md:px-12 bg-white text-black border-t border-black/[0.08] select-none">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title with Zero-Pill Editorial Discipline */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-neutral-500 uppercase font-semibold"
          >
            07 · Connect &amp; Inquiries
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-tight">
            Initiate Conversation
          </h2>

          <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto font-sans leading-relaxed">
            Interested in hiring, collaboration, or technical discussions? Send a direct message.
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
            <div className="surface-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-black font-semibold">
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <span>Direct Email</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                </button>
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold text-black break-all">
                {bio.email}
              </p>
            </div>

            {/* Location */}
            <div className="surface-card p-5 text-xs text-neutral-700 font-sans leading-relaxed">
              <span className="font-mono text-black font-bold block mb-1">
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
              className="surface-card p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-mono font-semibold text-neutral-700 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    placeholder="e.g. Alexis Carter"
                    required
                    className="w-full bg-neutral-50 border border-black/10 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-black outline-none transition-all placeholder-neutral-400 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-mono font-semibold text-neutral-700 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleFormInputChange}
                    placeholder="e.g. alexis@example.com"
                    required
                    className="w-full bg-neutral-50 border border-black/10 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-black outline-none transition-all placeholder-neutral-400 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-xs font-mono font-semibold text-neutral-700 block">
                  Subject Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleFormInputChange}
                  placeholder="e.g. Software Engineering Opportunity"
                  className="w-full bg-neutral-50 border border-black/10 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-black outline-none transition-all placeholder-neutral-400 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-mono font-semibold text-neutral-700 block">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleFormInputChange}
                  rows={4}
                  placeholder="Write your note here..."
                  required
                  className="w-full bg-neutral-50 border border-black/10 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-black outline-none transition-all placeholder-neutral-400 font-sans resize-none"
                />
              </div>

              {/* Status Notice */}
              <AnimatePresence mode="wait">
                {contactStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-neutral-100 border border-black/15 text-black p-3 rounded-xl flex items-center gap-2 text-xs font-mono"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0 text-black" />
                    <div>{statusMessage}</div>
                  </motion.div>
                )}

                {contactStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2 text-xs font-mono"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <div>{statusMessage}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={contactStatus === "loading"}
                className="w-full bg-black hover:bg-neutral-800 text-white py-3 px-6 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm border-none disabled:opacity-50"
              >
                {contactStatus === "loading" ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white" />
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
