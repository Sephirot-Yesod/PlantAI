"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const plantiemojiData = {
  name: "Plantiemoji",
  tagline: "Plants Speak Emoji",
  description: "Smart sensor that communicates plant status through expressive emojis.",
  longDescription:
    "Plantiemoji is a compact, beautiful sensor that monitors temperature, humidity, light, and soil moisture around your plant. But here's the magic: instead of confusing graphs or numbers, it translates all that data into simple, expressive emojis. A quick glance tells you exactly how your plant feels — no interpretation needed.",
  heroImage: "/images/products/plantiemoji-hero.jpg",
  logoImage: "/images/logos/plantiemoji-logo.png",
  color: "#00e5d0",
  features: [
    { title: "4-in-1 Sensor", description: "Monitors temperature, humidity, light levels, and soil moisture simultaneously." },
    { title: "Emoji Expression", description: "Cute e-ink display shows your plant's current mood at a glance." },
    { title: "Instant Alerts", description: "Push notifications when your plant needs attention, before problems occur." },
    { title: "Learning System", description: "Gets smarter over time, learning your plant's preferences and patterns." },
    { title: "6-Month Battery", description: "Set it and forget it — rechargeable battery lasts up to 6 months." },
    { title: "Historical Data", description: "Track trends over time with beautiful, simple charts in the app." },
  ],
  useCases: [
    "Busy professionals who forget to check on plants",
    "Plant parents with many plants to monitor",
    "Gift for plant lovers who want peace of mind",
    "Offices wanting to maintain healthy indoor plants",
  ],
};

export default function Plantiemoji() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="plantiemoji" ref={containerRef} className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${plantiemojiData.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
          {/* Cyan glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5d0]/5 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ 
                backgroundColor: plantiemojiData.color,
                boxShadow: `0 0 20px ${plantiemojiData.color}60`
              }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: plantiemojiData.color }}
            >
              {plantiemojiData.tagline}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            {plantiemojiData.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mb-12"
          >
            {plantiemojiData.longDescription}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {plantiemojiData.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="p-5 glass-card rounded-xl border border-white/5 hover:border-[#00e5d0]/20 transition-all"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ 
                    backgroundColor: plantiemojiData.color,
                    boxShadow: `0 0 10px ${plantiemojiData.color}60`
                  }}
                />
                <h3 className="text-base font-extrabold text-white mb-1">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-24 relative overflow-hidden bg-[#0a0a0a]">
        {/* Background effects */}
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 radial-glow opacity-20" />
        
        {/* Background Logo */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 hidden lg:block pointer-events-none">
          <div
            className="w-[500px] h-[500px] bg-contain bg-center bg-no-repeat opacity-20 rounded overflow-hidden"
            style={{
              backgroundImage: `url(${plantiemojiData.logoImage})`,
              transform: "rotate(-10deg)",
              filter: `drop-shadow(0 0 40px ${plantiemojiData.color}40)`,
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:ml-auto lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                Perfect <span style={{ color: plantiemojiData.color }}>For</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {plantiemojiData.useCases.map((useCase, index) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5 hover:border-[#00e5d0]/20 transition-all"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ 
                      backgroundColor: plantiemojiData.color,
                      boxShadow: `0 0 10px ${plantiemojiData.color}60`
                    }}
                  />
                  <span className="text-white/80">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 bg-[#0a0a0a] relative">
        {/* Background wave pattern */}
        <div className="absolute inset-0 wave-lines opacity-30" />
        
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
              Ready to Try{" "}
              <span style={{ color: plantiemojiData.color }}>{plantiemojiData.name}</span>?
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Join thousands of plant lovers already using {plantiemojiData.name} to transform
              their relationship with plants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="relative text-black px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all group overflow-hidden"
                style={{ backgroundColor: plantiemojiData.color }}
              >
                <span 
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: plantiemojiData.color }}
                />
                <span className="relative">Get in Touch →</span>
              </Link>
              <Link
                href="/solutions"
                className="border border-[#00e5d0]/30 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center gap-2 hover:border-[#00e5d0]/60 hover:bg-[#00e5d0]/5 transition-all"
              >
                Explore Other Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
