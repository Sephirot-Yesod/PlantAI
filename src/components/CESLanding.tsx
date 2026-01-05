"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CESLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const contactReasons = [
    { value: "investor", label: "Invest in us" },
    { value: "distributor", label: "Become our distributor" },
    { value: "press", label: "Press & Media" },
    { value: "preorder", label: "Preorder question" },
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
    <>
      {/* Hero Section with Banner */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Full-screen CES Banner Background - Desktop */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/ces-banner.jpg"
            alt="Plantiemoji on CES - Jan 6-9, 2026 Las Vegas, NV - Booth #52269"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient overlay for readability at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Full-screen CES Banner Background - Mobile */}
        <div className="absolute inset-0 top-16 md:hidden bg-black">
          <Image
            src="/images/ces-banner-mobile.jpg"
            alt="Plantiemoji on CES - Jan 6-9, 2026 Las Vegas, NV - Booth #52269"
            fill
            className="object-contain object-top"
            priority
          />
        </div>

        {/* Desktop: Content overlay - positioned at bottom */}
        <div className="relative z-10 min-h-screen hidden md:flex items-end justify-center px-4 sm:px-8 pb-16 sm:pb-20 lg:pb-24">
          <div className="w-full max-w-[1400px]">
            {/* Horizontal layout - Preorder & Cocreate side by side */}
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
                
                {/* Preorder Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
                >
                  <div className="inline-block bg-[#00e5d0] rounded-full px-4 py-1.5 mb-4">
                    <span className="text-xs font-bold text-black tracking-wider uppercase">Limited Early Bird • Free Shipping</span>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">Preorder Now</h2>
                  <p className="text-white/60 mb-6 text-base">
                    Be among the first to experience Plantiemoji.
                  </p>

                  {/* Two Products */}
                  <div className="space-y-3">
                    {/* Root Snorkel */}
                    <Link href="/#plantiemoji" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[#00e5d0]/30 transition-all cursor-pointer gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white">Root Snorkel</h3>
                        <p className="text-sm text-white/50">Smart soil moisture sensor</p>
                      </div>
                      <div className="text-right flex items-baseline gap-2 flex-shrink-0">
                        <span className="text-base text-white/40 line-through">$39</span>
                        <span className="text-3xl font-black text-white">$29</span>
                      </div>
                    </Link>

                    {/* Emoji LED */}
                    <Link href="/#plantiemoji" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[#00e5d0]/30 transition-all cursor-pointer gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white">Emoji LED</h3>
                        <p className="text-sm text-white/50">Expressive plant display</p>
                      </div>
                      <div className="text-right flex items-baseline gap-2 flex-shrink-0">
                        <span className="text-base text-white/40 line-through">$49</span>
                        <span className="text-3xl font-black text-white">$39</span>
                      </div>
                    </Link>
                  </div>

                  <p className="text-[#00e5d0] font-semibold mt-5 text-base">Kickstarter coming March 2026!</p>
                </motion.div>

                {/* Cocreate Section - Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
                >
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Interested or Not Satisfied? Cocreate with Us!</h2>
                  <p className="text-white/50 mb-5 text-base">
                    Interested in partnering or collaborating? Drop us a message.
                  </p>

                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                      <div className="w-16 h-16 bg-[#00e5d0]/20 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl text-[#00e5d0]">✓</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Sent!</h3>
                      <p className="text-white/50 text-base mb-3">We&apos;ll be in touch.</p>
                      <button onClick={() => setStatus("idle")} className="text-[#00e5d0] text-base hover:underline">
                        Send another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Row with Name, Email, Reason */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-1.5">Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5d0] transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-1.5">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5d0] transition-colors"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-1.5">Reason *</label>
                          <select
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00e5d0] transition-colors"
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
                      
                      {/* Message and QR codes row */}
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-white/70 text-sm mb-1.5">Message</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5d0] transition-colors resize-none"
                            placeholder="Tell us what you're curious about..."
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1 pt-6">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <Image
                                src="/QRCode/QRCode1.png"
                                alt="Instagram"
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-lg"
                              />
                              <span className="text-xs text-white/50 mt-1">Instagram</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image
                                src="/QRCode/QRCode2.png"
                                alt="Facebook"
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-lg"
                              />
                              <span className="text-xs text-white/50 mt-1">Facebook</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {status === "error" && (
                        <p className="text-red-400 text-sm">Something went wrong.</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black py-3 rounded-lg font-semibold text-base transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-[#00e5d0]/20"
                      >
                        {status === "loading" ? "Sending..." : "Send Message →"}
                      </button>
                    </form>
                  )}
                </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Mobile: Cocreate Section Below Banner */}
      <section className="md:hidden bg-[#0a0a0a] px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-3xl font-black text-white mb-2 text-center">Interested or Not Satisfied? Cocreate with Us!</h2>
          <p className="text-white/50 mb-6 text-base text-center">
            Interested in partnering or collaborating? Drop us a message.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              href="/contact"
              className="w-full bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black py-4 rounded-xl font-semibold text-base text-center"
            >
              Contact Us →
            </Link>
            <div className="flex items-center justify-center gap-6 pt-2">
              <a href="https://instagram.com" className="text-white/40 hover:text-[#00e5d0] text-base">Instagram</a>
              <a href="https://facebook.com" className="text-white/40 hover:text-[#00e5d0] text-base">Facebook</a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
