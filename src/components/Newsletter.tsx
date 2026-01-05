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
    <section ref={containerRef} className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00e5d0]/12 blur-[180px] -translate-y-1/2"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-[#00c4b0]/10 blur-[180px] -translate-y-1/2"
          animate={{ 
            scale: [1.15, 1, 1.15],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00e5d0]/5 blur-[150px]" />
        
        {/* Tech grid */}
        <div className="absolute inset-0 tech-grid opacity-40" />
        
        {/* Neural dots - hidden on mobile */}
        <div className="hidden sm:block absolute inset-0 neural-dots opacity-30" />
        
        {/* Wave lines - hidden on mobile */}
        <div className="hidden sm:block wave-lines opacity-40" />
        
        {/* Floating particles - hidden on mobile */}
        <div className="hidden lg:block absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#00e5d0]/50"
              style={{
                left: `${10 + i * 9}%`,
                top: `${30 + (i % 3) * 15}%`,
              }}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Enhanced decorative line elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="hidden sm:flex items-center justify-center gap-3 mb-6"
          >
            <motion.div 
              className="h-px w-12 bg-[#00e5d0]"
              animate={{ 
                boxShadow: ['0 0 5px rgba(0, 245, 212, 0.3)', '0 0 15px rgba(0, 245, 212, 0.6)', '0 0 5px rgba(0, 245, 212, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.span 
              className="w-2 h-2 rounded-full bg-[#00e5d0]"
              animate={{ 
                boxShadow: ['0 0 5px rgba(0, 245, 212, 0.5)', '0 0 20px rgba(0, 245, 212, 0.8)', '0 0 5px rgba(0, 245, 212, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-px w-12 bg-[#00e5d0]"
              animate={{ 
                boxShadow: ['0 0 5px rgba(0, 245, 212, 0.3)', '0 0 15px rgba(0, 245, 212, 0.6)', '0 0 5px rgba(0, 245, 212, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4"
          >
            Join the <span className="text-[#00e5d0]">PlantTalk</span> Community
          </motion.h2>

          {/* Description - hidden on mobile for cleaner look */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:block text-white/50 mb-8 text-base"
          >
            Get early access to new features, plant care tips from our AI, and stories from fellow plant lovers.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4"
          >
            <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Enhanced input with glow */}
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 glass-card-glow rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00e5d0]/50 border border-white/10 transition-all text-sm sm:text-base"
                  required
                />
                {/* Input focus glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 20px rgba(0, 245, 212, 0.1)' }} />
              </div>
              
              {/* Enhanced button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="relative bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 min-w-[140px] sm:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base overflow-hidden group"
              >
                {/* Button glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                {/* Shimmer effect */}
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-40 transition-opacity" />
                <span className="relative">
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Joining...
                    </span>
                  ) : status === "success" ? (
                    "Welcome! ✓"
                  ) : (
                    "Subscribe →"
                  )}
                </span>
              </button>
            </div>

            {/* Checkbox - simplified on mobile */}
            <label className="flex items-start gap-2 sm:gap-3 text-left cursor-pointer justify-center group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 sm:mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#00e5d0] focus:ring-[#00e5d0] focus:ring-offset-0 flex-shrink-0 transition-all"
              />
              <span className="text-xs sm:text-sm text-white/40 group-hover:text-white/50 transition-colors">
                <span className="sm:hidden">I accept the </span>
                <span className="hidden sm:inline">I agree to receive updates and accept the </span>
                <a href="/privacy" className="text-[#00e5d0] hover:text-[#4df8e8] transition-colors relative">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00e5d0] group-hover:w-full transition-all duration-300" />
                </a>
              </span>
            </label>
          </motion.form>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-4 p-3 glass-card-glow rounded-lg border border-[#00e5d0]/30"
            >
              <p className="text-sm text-[#00e5d0]">
                You&apos;re in! Check your inbox for a welcome message from our plants. 🌱
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Decorative side accents - desktop only */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-px h-4 bg-[#00e5d0]/30"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                height: ['16px', '24px', '16px']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-px h-4 bg-[#00c4b0]/30"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                height: ['16px', '24px', '16px']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 + 0.5
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
