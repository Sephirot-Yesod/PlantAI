"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
    setAgreed(false);
    
    // Reset after showing success
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section ref={containerRef} className="relative py-24 bg-[#141414]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#141414]" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#4ade80]/5 blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#22c55e]/5 blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#4ade80]" />
            <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <div className="h-px w-12 bg-[#4ade80]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Join the <span className="text-[#4ade80]">PlantTalk</span> Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 mb-8"
          >
            Get early access to new features, plant care tips from our AI, and stories from fellow plant lovers.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-colors"
                required
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-8 py-4 rounded font-semibold inline-flex items-center justify-center gap-2 min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                {status === "loading" ? (
                  "Joining..."
                ) : status === "success" ? (
                  "Welcome! ✓"
                ) : (
                  "Subscribe →"
                )}
              </button>
            </div>

            <label className="flex items-start gap-3 text-left cursor-pointer justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#4ade80] focus:ring-[#4ade80] focus:ring-offset-0"
              />
              <span className="text-sm text-white/40">
                I agree to receive updates and accept the{" "}
                <a href="/privacy" className="text-[#4ade80] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </motion.form>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-[#4ade80]"
            >
              You&apos;re in! Check your inbox for a welcome message from our plants.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
