"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const products = [
  {
    id: "plantiemoji",
    name: "Plantiemoji",
    href: "#plantiemoji",
    tagline: "Plants Speak Emoji",
    description:
      "Smart environmental sensor that monitors your plant's surroundings and communicates its status through expressive emojis. A fun, intuitive way to understand plant health at a glance.",
    features: ["Multi-sensor monitoring", "Real-time emoji status", "Mobile notifications", "Historical trends"],
    image: "/images/products/plantiemoji-hero.jpg",
    color: "#00e5d0",
    gradient: "from-[#00e5d0] to-[#00c4b0]",
  },
  {
    id: "ezplants",
    name: "EZplants",
    href: "/solutions/ezplants",
    tagline: "AI Plant Doctor",
    description:
      "Advanced AI growth model that diagnoses plant diseases in real-time and provides personalized care recommendations. Features live video consultation with our cutting-edge vision model.",
    features: ["Real-time disease detection", "Live video diagnosis", "Growth predictions", "Personalized care plans"],
    image: "/images/products/ezplants-hero.jpg",
    color: "#4df8e8",
    gradient: "from-[#4df8e8] to-[#00c4b0]",
  },
  {
    id: "planttalk",
    name: "PlantTalk",
    href: "/solutions/planttalk",
    tagline: "Converse with Nature",
    description:
      "Revolutionary platform that creates a unique AI agent for each plant, allowing genuine conversations. Your plants can express their needs, share stories, and even chat with each other.",
    features: ["Unique plant personalities", "Emotional expressions", "Need-based communication", "Plant social network"],
    image: "/images/products/planttalk-hero.jpg",
    color: "#00c4b0",
    gradient: "from-[#00c4b0] to-[#00a896]",
  },
];

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#00e5d0]/15 to-transparent rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-[#00c4b0]/12 to-transparent rounded-full blur-[150px]"
          animate={{ 
            scale: [1.15, 1, 1.15],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional accent orbs */}
        <div className="hidden lg:block absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-[#4df8e8]/10 blur-[100px]" />
        <div className="hidden lg:block absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-[#00a896]/10 blur-[80px]" />
        
        {/* Tech grid with enhanced visibility */}
        <div className="absolute inset-0 tech-grid opacity-50" />
        
        {/* Hex pattern for AI feel */}
        <div className="hidden lg:block absolute inset-0 hex-grid opacity-30" />
        
        {/* Neural dots */}
        <div className="hidden sm:block absolute inset-0 neural-dots opacity-25" />
        
        {/* Radial glow */}
        <div className="absolute inset-0 radial-glow opacity-30" />
        
        {/* Wave lines */}
        <div className="hidden sm:block wave-lines opacity-40" />
        
        {/* Floating particles */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: i % 3 === 0 ? '#00e5d0' : i % 3 === 1 ? '#00c4b0' : '#4df8e8',
                left: `${5 + i * 6}%`,
                top: `${10 + (i % 5) * 20}%`,
                opacity: 0.3
              }}
              animate={{ 
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Data stream lines */}
        <div className="hidden xl:block absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#00e5d0]/30 to-transparent" />
        <div className="hidden xl:block absolute right-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-[#00c4b0]/30 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
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
                Our Products
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Three Ways to Connect
              <br />
              <span className="bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] bg-clip-text text-transparent">
                With Your Plants
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/solutions"
              className="relative border border-[#00e5d0]/30 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 group hover:border-[#00e5d0]/60 hover:bg-[#00e5d0]/5 transition-all overflow-hidden"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0]/5 to-transparent" />
              </span>
              <span className="relative">View All Products</span>
              <span className="relative transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={index === 0 ? "lg:col-span-2" : ""}
            >
              <Link href={product.href} className="block group h-full">
                <div className={`relative glass-card rounded-xl overflow-hidden card-hover h-full border border-white/5 hover:border-[#00e5d0]/30 transition-all ${
                  index === 0 ? "min-h-[80vh]" : "min-h-[320px]"
                }`}>
                  {/* Image */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                    {/* Cyan overlay on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, ${product.color}15 0%, transparent 60%)` }}
                    />
                    {/* Tech overlay */}
                    <div className="absolute inset-0 tech-grid-dense opacity-20" />
                  </div>

                  {/* Scan line effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${product.color}10 50%, transparent 100%)`,
                      backgroundSize: '100% 200%',
                      animation: hoveredId === product.id ? 'stream-flow 3s linear infinite' : 'none'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    {/* Tagline */}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`w-3 h-3 rounded-full bg-gradient-to-br ${product.gradient}`}
                        animate={hoveredId === product.id ? { 
                          boxShadow: [`0 0 15px ${product.color}60`, `0 0 25px ${product.color}80`, `0 0 15px ${product.color}60`]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ boxShadow: `0 0 15px ${product.color}60` }}
                      />
                      <span className="text-xs uppercase tracking-wider font-medium" style={{ color: product.color }}>
                        {product.tagline}
                      </span>
                    </div>

                    <h3 className={`font-extrabold text-white mb-3 group-hover:text-[#00e5d0] transition-colors ${
                      index === 0 ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
                    }`}>
                      {product.name}
                    </h3>

                    <p className={`text-white/60 mb-4 ${index === 0 ? "text-base max-w-xl" : "text-sm line-clamp-2"}`}>
                      {product.description}
                    </p>

                    {/* Features (show more on featured card) */}
                    {index === 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.features.map((feature, fIndex) => (
                          <motion.span
                            key={feature}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + fIndex * 0.1 }}
                            className="px-3 py-1.5 glass-card-glow rounded-lg text-xs text-white/70 border border-[#00e5d0]/20"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ color: product.color }}>
                      Learn More
                      <span>→</span>
                    </div>
                  </div>

                  {/* Enhanced hover glow border */}
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-500 pointer-events-none"
                    style={{ 
                      borderColor: hoveredId === product.id ? `${product.color}40` : 'transparent',
                      boxShadow: hoveredId === product.id ? `inset 0 0 40px ${product.color}15, 0 0 30px ${product.color}10` : 'none'
                    }}
                  />
                  
                  {/* Corner accents on hover */}
                  <div 
                    className="absolute top-0 left-0 w-16 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, ${product.color}, transparent)` }}
                  />
                  <div 
                    className="absolute top-0 left-0 w-px h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to bottom, ${product.color}, transparent)` }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-16 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to left, ${product.color}, transparent)` }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-px h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${product.color}, transparent)` }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm">
            Not sure which product is right for you?{" "}
            <Link
              href="/contact"
              className="text-[#00e5d0] hover:text-[#4df8e8] transition-colors relative group"
            >
              Let&apos;s find the perfect solution together →
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00e5d0] group-hover:w-full transition-all duration-300" />
            </Link>
          </p>
        </motion.div>
      </div>
      
      {/* Decorative side elements - desktop only */}
      <div className="hidden xl:block absolute left-4 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-[#00e5d0]"
            animate={{ 
              boxShadow: ['0 0 5px rgba(0, 245, 212, 0.3)', '0 0 15px rgba(0, 245, 212, 0.6)', '0 0 5px rgba(0, 245, 212, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-px h-32 bg-gradient-to-b from-[#00e5d0]/50 to-transparent" />
        </motion.div>
      </div>
      <div className="hidden xl:block absolute right-4 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-px h-32 bg-gradient-to-t from-[#00c4b0]/50 to-transparent" />
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-[#00c4b0]"
            animate={{ 
              boxShadow: ['0 0 5px rgba(0, 212, 170, 0.3)', '0 0 15px rgba(0, 212, 170, 0.6)', '0 0 5px rgba(0, 212, 170, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
