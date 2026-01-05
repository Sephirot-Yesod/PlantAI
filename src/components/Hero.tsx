"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/hero/home-hero.jpg)` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        
        {/* Simple glow orbs - static, no animation */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-72 lg:w-[500px] h-72 lg:h-[500px] rounded-full bg-[#00e5d0]/15 blur-[150px]" />
        <div className="hidden sm:block absolute bottom-1/3 right-1/4 w-80 lg:w-[600px] h-80 lg:h-[600px] rounded-full bg-[#00c4b0]/10 blur-[180px]" />
        
        {/* Tech grid pattern - hidden on mobile */}
        <div className="hidden sm:block tech-grid" />
        
        {/* Neural network dots effect - hidden on mobile */}
        <div className="hidden lg:block neural-dots" />
        
        {/* Final gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full"
      >
        <div className="max-w-5xl">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8"
          >
            <span className="block text-white/50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              In the age of AI,
            </span>
            <span className="block text-white font-extrabold">Plants are humanity&apos;s</span>
            <motion.span 
              className="block bg-gradient-to-r from-[#00e5d0] via-[#00c4b0] to-[#00a896] bg-clip-text text-transparent font-extrabold"
              animate={{ 
                textShadow: ['0 0 30px rgba(0, 245, 212, 0.3)', '0 0 60px rgba(0, 245, 212, 0.5)', '0 0 30px rgba(0, 245, 212, 0.3)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              last Eden.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mb-8 sm:mb-12 leading-relaxed"
          >
            We build AI that understands plants. From diagnosing diseases to enabling 
            genuine conversations with your greenery — PlantTalk AI bridges the gap 
            between technology and nature.
          </motion.p>

          {/* CTAs - only primary CTA on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/solutions"
              className="relative bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 group transition-all hover:-translate-y-0.5 text-sm sm:text-base overflow-hidden"
            >
              {/* Glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Explore Our Products
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
            
            {/* Watch Demo button - hidden on mobile */}
            <button className="hidden sm:inline-flex relative px-8 py-4 rounded-lg font-semibold items-center justify-center gap-3 group border border-[#00e5d0]/30 text-white hover:border-[#00e5d0]/60 hover:bg-[#00e5d0]/5 transition-all text-base backdrop-blur-sm">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0]/5 to-transparent" />
              </span>
              <span className="relative w-10 h-10 rounded-full border border-[#00e5d0]/30 flex items-center justify-center group-hover:border-[#00e5d0] group-hover:bg-[#00e5d0]/10 transition-all">
                <span className="text-[#00e5d0]">▶</span>
              </span>
              <span className="relative">Watch Demo</span>
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] rounded text-[10px] text-black font-medium">
                coming soon
              </span>
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-0 right-12 lg:right-24 hidden lg:flex items-end gap-12"
        >
          {[
            { value: "50M+", label: "Plants Analyzed" },
            { value: "99.2%", label: "Diagnosis Accuracy" },
            { value: "180+", label: "Plant Species" },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <div className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40">
          Discover more
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#00e5d0]/70"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Decorative corner elements with enhanced glows */}
      <div className="absolute top-24 right-12 hidden xl:flex flex-col items-center gap-2">
        <motion.div 
          className="w-2 h-2 rounded-full bg-[#00e5d0]"
          animate={{ 
            boxShadow: ['0 0 10px rgba(0, 245, 212, 0.3)', '0 0 25px rgba(0, 245, 212, 0.7)', '0 0 10px rgba(0, 245, 212, 0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="w-px h-24 bg-gradient-to-b from-[#00e5d0]/60 to-transparent" />
      </div>
      <div className="absolute bottom-24 left-12 hidden xl:flex flex-col items-center gap-2">
        <div className="w-px h-24 bg-gradient-to-t from-[#00e5d0]/60 to-transparent" />
        <motion.div 
          className="w-2 h-2 rounded-full bg-[#00c4b0]"
          animate={{ 
            boxShadow: ['0 0 10px rgba(0, 212, 170, 0.3)', '0 0 25px rgba(0, 212, 170, 0.7)', '0 0 10px rgba(0, 212, 170, 0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      {/* Floating corner accents */}
      <motion.div 
        className="absolute top-32 left-20 hidden xl:block w-1 h-1 rounded-full bg-[#00e5d0]/60"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-32 right-20 hidden xl:block w-1.5 h-1.5 rounded-full bg-[#00c4b0]/50"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      />
      
      {/* Energy rings decoration */}
      <div className="absolute top-1/2 right-24 hidden xl:block">
        <motion.div 
          className="w-32 h-32 rounded-full border border-[#00e5d0]/10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
