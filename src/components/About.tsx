"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const values = [
  {
    title: "AI-Powered Understanding",
    description:
      "Our advanced models decode the language of plants, translating biological signals into insights you can act on.",
    accent: "#00e5d0",
  },
  {
    title: "Emotional Connection",
    description:
      "We believe the bond between humans and plants is precious. Our technology deepens this connection, never replaces it.",
    accent: "#00c4b0",
  },
  {
    title: "Environment-Centric Design",
    description:
      "Every feature we build is designed to help your plants thrive. Happy plants, happy humans.",
    accent: "#4df8e8",
  },
  {
    title: "Joyful Interaction",
    description:
      "Plant care should be delightful. From emoji feedback to artistic transformations, we make it fun.",
    accent: "#00a896",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Static glow orbs */}
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full bg-[#00e5d0]/10 blur-[150px]" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-[#00c4b0]/8 blur-[150px]" />
        
        {/* Tech grid */}
        <div className="tech-grid" />
        
        {/* Neural dots - hidden on mobile */}
        <div className="hidden sm:block neural-dots" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div 
                className="h-px w-12 bg-[#00e5d0]"
                animate={{ 
                  boxShadow: ['0 0 10px rgba(0, 245, 212, 0.3)', '0 0 20px rgba(0, 245, 212, 0.6)', '0 0 10px rgba(0, 245, 212, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs uppercase tracking-[0.3em] text-[#00e5d0] font-medium">
                Our Vision
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 sm:mb-8"
            >
              Using AI to Help People{" "}
              <span className="bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] bg-clip-text text-transparent">
                Better Interact
              </span>{" "}
              With Plants
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6 mb-6 sm:mb-8"
            >
              <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                At PlantTalk AI, we believe that the relationship between humans 
                and plants is one of the most fundamental connections we have with 
                the natural world. Yet for too long, this relationship has been 
                one-sided — we care for plants, but rarely understand them.
              </p>
              
              {/* Second paragraph hidden on mobile for simplicity */}
              <p className="hidden sm:block text-base text-white/40 leading-relaxed">
                Our mission is to bridge this gap using cutting-edge AI. We&apos;ve 
                developed sophisticated growth models that understand plant biology, 
                environmental needs, and even emotional states. From real-time 
                disease diagnosis to enabling actual conversations with your plants, 
                we&apos;re creating technology that makes plant care intuitive, 
                rewarding, and genuinely connected.
              </p>
            </motion.div>

            {/* Core Philosophy - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-4 sm:p-6 glass-card-glow rounded-xl border border-[#00e5d0]/20 mb-6 sm:mb-8 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-30" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-[#00e5d0] to-transparent" />
              <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-[#00e5d0] to-transparent" />
              <div className="absolute bottom-0 right-0 w-8 h-px bg-gradient-to-l from-[#00e5d0] to-transparent" />
              <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-[#00e5d0] to-transparent" />
              
              <div className="relative flex items-center gap-2 mb-2 sm:mb-3">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[#00e5d0]"
                  animate={{ 
                    boxShadow: ['0 0 5px rgba(0, 245, 212, 0.5)', '0 0 15px rgba(0, 245, 212, 0.8)', '0 0 5px rgba(0, 245, 212, 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs sm:text-sm font-medium text-[#00e5d0]">Core Philosophy</span>
              </div>
              <p className="relative text-base sm:text-xl font-medium text-white leading-relaxed">
                &ldquo;We don&apos;t replace the human-plant connection — we 
                <span className="text-[#00e5d0]"> amplify</span> it through 
                <span className="text-[#00e5d0]"> emotional value</span> and 
                <span className="text-[#00e5d0]"> intelligent growth modeling</span>.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="/vision"
                className="relative bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 group transition-all text-sm sm:text-base overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Explore Our Vision
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              </Link>
              {/* Secondary CTA hidden on mobile */}
              <Link
                href="/about"
                className="hidden sm:inline-flex border border-[#00e5d0]/30 text-white px-6 py-3 rounded-lg font-medium items-center justify-center gap-2 hover:border-[#00e5d0]/60 hover:bg-[#00e5d0]/5 transition-all text-base group"
              >
                <span className="relative">Meet the Team</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Values Grid - hidden on mobile */}
          <div className="hidden sm:grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group relative p-6 glass-card rounded-xl border border-white/5 hover:border-[#00e5d0]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${value.accent}15 0%, transparent 60%)`
                  }}
                />
                
                {/* Corner accent */}
                <div 
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(225deg, ${value.accent}20 0%, transparent 60%)`
                  }}
                />
                
                <motion.div 
                  className="relative w-3 h-3 rounded-full mb-4 group-hover:scale-125 transition-transform"
                  style={{ 
                    backgroundColor: value.accent,
                  }}
                  whileHover={{
                    boxShadow: `0 0 25px ${value.accent}80`
                  }}
                  initial={{
                    boxShadow: `0 0 15px ${value.accent}60`
                  }}
                />

                <h3 className="relative text-lg font-semibold text-white mb-2 group-hover:text-[#00e5d0] transition-colors">
                  {value.title}
                </h3>

                <p className="relative text-sm text-white/50">{value.description}</p>
                
                {/* Bottom gradient line */}
                <div 
                  className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${value.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Decorative data visualization elements - desktop only */}
        <div className="hidden xl:block absolute top-1/2 -right-8 transform -translate-y-1/2">
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[20, 34, 44, 48, 44, 34, 20, 6, 0, 6, 20, 34].map((baseWidth, i) => (
              <motion.div
                key={i}
                className="h-px bg-[#00e5d0]/30"
                style={{ width: `${baseWidth}px` }}
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  width: [`${baseWidth}px`, `${baseWidth + 15}px`, `${baseWidth}px`]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
