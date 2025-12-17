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
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/20" />
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#4ade80]/30"
              initial={{ 
                x: `${20 + i * 15}%`, 
                y: "-10%",
                opacity: 0.3
              }}
              animate={{ 
                y: "110%",
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Decorative glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4ade80]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#22c55e]/8 blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full"
      >
        <div className="max-w-5xl">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8"
          >
            <span className="block text-white/60 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              In the age of AI,
            </span>
            <span className="block text-white font-extrabold">Plants are humanity&apos;s</span>
            <span className="block bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-[#16a34a] bg-clip-text text-transparent font-extrabold">
              last Eden.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
          >
            We build AI that understands plants. From diagnosing diseases to enabling 
            genuine conversations with your greenery — PlantTalk AI bridges the gap 
            between technology and nature.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/solutions"
              className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-8 py-4 rounded font-semibold inline-flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-green-500/25 transition-all hover:-translate-y-0.5"
            >
              Explore Our Products
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            
            <button className="relative px-8 py-4 rounded font-semibold inline-flex items-center justify-center gap-3 group border border-white/20 text-white hover:border-[#4ade80]/50 hover:bg-[#4ade80]/5 transition-all">
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#4ade80] group-hover:bg-[#4ade80]/10 transition-all">
                ▶
              </span>
              Watch Demo
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#4ade80] rounded text-[10px] text-black font-medium">
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
            <div key={index} className="text-right">
              <div className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-wider text-white/40">
          Discover more
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#4ade80]/60"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-24 right-12 hidden xl:block">
        <div className="w-px h-24 bg-gradient-to-b from-[#4ade80]/50 to-transparent" />
      </div>
      <div className="absolute bottom-24 left-12 hidden xl:block">
        <div className="w-px h-24 bg-gradient-to-t from-[#4ade80]/50 to-transparent" />
      </div>
    </section>
  );
}
