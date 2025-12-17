"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const values = [
  {
    title: "AI-Powered Understanding",
    description:
      "Our advanced models decode the language of plants, translating biological signals into insights you can act on.",
    accent: "#4ade80",
  },
  {
    title: "Emotional Connection",
    description:
      "We believe the bond between humans and plants is precious. Our technology deepens this connection, never replaces it.",
    accent: "#f472b6",
  },
  {
    title: "Environment-Centric Design",
    description:
      "Every feature we build is designed to help your plants thrive. Happy plants, happy humans.",
    accent: "#60a5fa",
  },
  {
    title: "Joyful Interaction",
    description:
      "Plant care should be delightful. From emoji feedback to artistic transformations, we make it fun.",
    accent: "#fbbf24",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 bg-[#0d0d0d] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#4ade80]/5 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#22c55e]/5 blur-[120px]" />
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-[#4ade80]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#4ade80] font-medium">
                Our Vision
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8"
            >
              Using AI to Help People{" "}
              <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
                Better Interact
              </span>{" "}
              With Plants
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 mb-8"
            >
              <p className="text-lg text-white/60 leading-relaxed">
                At PlantTalk AI, we believe that the relationship between humans 
                and plants is one of the most fundamental connections we have with 
                the natural world. Yet for too long, this relationship has been 
                one-sided — we care for plants, but rarely understand them.
              </p>
              
              <p className="text-white/40 leading-relaxed">
                Our mission is to bridge this gap using cutting-edge AI. We&apos;ve 
                developed sophisticated growth models that understand plant biology, 
                environmental needs, and even emotional states. From real-time 
                disease diagnosis to enabling actual conversations with your plants, 
                we&apos;re creating technology that makes plant care intuitive, 
                rewarding, and genuinely connected.
              </p>
            </motion.div>

            {/* Core Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-[#141414] rounded border border-white/5 mb-8"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                <span className="text-sm font-medium text-[#4ade80]">Core Philosophy</span>
              </div>
              <p className="text-xl font-medium text-white leading-relaxed">
                &ldquo;We don&apos;t replace the human-plant connection — we 
                <span className="text-[#4ade80]"> amplify</span> it through 
                <span className="text-[#4ade80]"> emotional value</span> and 
                <span className="text-[#4ade80]"> intelligent growth modeling</span>.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/vision"
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-6 py-3 rounded font-semibold inline-flex items-center gap-2 group hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Explore Our Vision
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </Link>
              <Link
                href="/about"
                className="border border-white/20 text-white px-6 py-3 rounded font-medium inline-flex items-center gap-2 hover:border-[#4ade80]/50 hover:bg-[#4ade80]/5 transition-all"
              >
                Meet the Team
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group p-6 bg-[#141414] rounded border border-white/5 hover:border-[#4ade80]/30 transition-all duration-300"
              >
                <div 
                  className="w-3 h-3 rounded-full mb-4 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: value.accent }}
                />

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#4ade80] transition-colors">
                  {value.title}
                </h3>

                <p className="text-sm text-white/50">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
