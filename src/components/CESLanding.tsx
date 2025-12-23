"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function CESLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const contactReasons = [
    { value: "preorder", label: "Preorder Question" },
    { value: "partnership", label: "Partnership" },
    { value: "press", label: "Press & Media" },
    { value: "investor", label: "Investor Inquiry" },
    { value: "other", label: "Other" },
  ];
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: "",
          reason: formData.reason || "other",
          message: formData.message || "Interested in Plantiemoji from CES landing page",
        }),
      });

      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", reason: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="min-h-screen h-screen flex flex-col bg-gradient-to-b from-[#0a0a0a] via-[#0d1a0f] to-[#0a0a0a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#4ade80]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#22c55e]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4ade80]/3 rounded-full blur-[100px]" />
      </div>

      {/* CES Banner */}
      <div className="pt-28 lg:pt-32 pb-6 lg:pb-8 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <div className="relative inline-block">
            {/* Boom/Burst Effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[120%] h-[120%] bg-gradient-radial from-[#4ade80]/30 via-[#4ade80]/10 to-transparent rounded-full blur-xl" />
            </motion.div>

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute w-3 h-3 bg-[#4ade80] rounded-full blur-sm"
                style={{
                  top: `${20 + Math.sin(i * 0.8) * 40}%`,
                  left: `${10 + i * 11}%`,
                }}
              />
            ))}

            {/* Rays */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.1, 1.2] }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-32 bg-gradient-to-t from-transparent via-[#4ade80]/40 to-transparent origin-bottom"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight whitespace-nowrap relative z-10"
            >
              <span className="text-white">Plantiemoji</span>
              <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent"> is on CES</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/50 max-w-3xl mx-auto"
          >
            The future of plant care arrives <span className="text-[#4ade80] font-semibold">Spring 2026</span>
          </motion.p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="flex-1 relative z-10 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            
            {/* Preorder Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4ade80]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative h-full">
                {/* Left: Pricing & Features */}
                <div>
                  <div className="inline-block bg-[#4ade80]/10 rounded-full px-4 py-1.5 mb-4">
                    <span className="text-xs font-bold text-[#4ade80] tracking-wider uppercase">Limited Early Bird</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-6xl font-extrabold text-white mb-4 whitespace-nowrap">Preorder Now</h2>
                  <p className="text-white/50 mb-5 text-lg lg:text-xl">
                    Be among the first to experience Plantiemoji.
                  </p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl lg:text-6xl font-black text-white">$69</span>
                      <span className="text-white/40 line-through text-lg">$99</span>
                    </div>
                    <span className="text-[#4ade80] text-sm font-medium">Save 30% • Early Bird Pricing</span>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {["Smart emoji display", "Real-time plant health", "Mobile app included", "Free shipping"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/70">
                        <span className="text-[#4ade80]">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* QR Codes - Absolutely Positioned */}
                <div className="absolute bottom-0 right-8 flex gap-6">
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/40 mb-3 text-center">Instagram</p>
                    <Image
                      src="/QRCode/QRCode1.png"
                      alt="Instagram QR Code"
                      width={112}
                      height={112}
                      className="w-24 h-24 lg:w-28 lg:h-28 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white/40 mb-3 text-center">Facebook</p>
                    <Image
                      src="/QRCode/QRCode2.png"
                      alt="Facebook QR Code"
                      width={112}
                      height={112}
                      className="w-24 h-24 lg:w-28 lg:h-28 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interested Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-8 lg:p-10 flex flex-col"
            >
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">Interested in Us?</h2>
              <p className="text-white/50 mb-6 text-sm lg:text-base">
                Have questions or want to learn more? Drop us a message.
              </p>

              {status === "success" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-[#4ade80]/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50 text-sm mb-4">We&apos;ll be in touch soon.</p>
                  <button onClick={() => setStatus("idle")} className="text-[#4ade80] text-sm hover:underline">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">Reason *</label>
                      <select
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#4ade80] transition-colors"
                      >
                        <option value="" className="bg-[#141414]">Select reason</option>
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value} className="bg-[#141414]">
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-colors resize-none"
                      placeholder="Tell us what you're curious about..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

