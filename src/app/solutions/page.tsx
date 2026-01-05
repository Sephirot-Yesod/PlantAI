"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const products = [
  {
    id: "plantiemoji",
    name: "Plantiemoji",
    tagline: "Plants Speak Emoji",
    description:
      "A delightful smart sensor that monitors your plant's environment and communicates its status through expressive emojis. See at a glance if your plant is happy, thirsty, cold, or basking in perfect conditions.",
    image: "/images/products/plantiemoji-hero.jpg",
    color: "#00e5d0",
    features: ["Multi-sensor monitoring", "Expressive emoji feedback", "Real-time notifications", "Learning algorithms"],
    stats: { sensors: "4-in-1", battery: "6 months", setup: "30 sec" },
  },
  {
    id: "planttalk",
    name: "PlantTalk",
    tagline: "Converse with Nature",
    description:
      "Every plant has a story. PlantTalk creates a unique AI agent for each of your plants, allowing genuine two-way conversations. Ask about their needs, hear about their day, and build a real relationship.",
    image: "/images/products/planttalk-hero.jpg",
    color: "#00c4b0",
    features: ["Natural conversations", "Unique plant personalities", "Plant social network", "Emotional intelligence"],
    stats: { plants: "1M+", messages: "100M+", happiness: "+89%" },
  },
  {
    id: "ezplants",
    name: "EZplants",
    tagline: "AI Plant Doctor",
    description:
      "Our flagship product uses advanced computer vision and AI growth models to diagnose plant diseases in real-time. Get instant answers through photo analysis or live video consultation with our AI plant doctor.",
    image: "/images/products/ezplants-hero.jpg",
    color: "#4df8e8",
    features: ["AI-powered disease detection", "Live video diagnosis", "Instant care recommendations", "Growth tracking & milestones"],
    stats: { accuracy: "99.2%", species: "180+", diagnoses: "50M+" },
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Product-specific glow */}
      <motion.div 
        className="absolute -inset-20 rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: `${product.color}08` }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          index % 2 === 1 ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image */}
        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
          <div className="relative group">
            <motion.div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
              style={{ backgroundColor: `${product.color}30` }}
            />
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-all">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Tech overlay on hover */}
              <div className="absolute inset-0 tech-grid-dense opacity-0 group-hover:opacity-30 transition-opacity" />
              
              {/* Corner accents */}
              <div 
                className="absolute top-0 left-0 w-20 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, ${product.color}, transparent)` }}
              />
              <div 
                className="absolute top-0 left-0 w-px h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to bottom, ${product.color}, transparent)` }}
              />
              <div 
                className="absolute bottom-0 right-0 w-20 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to left, ${product.color}, transparent)` }}
              />
              <div 
                className="absolute bottom-0 right-0 w-px h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to top, ${product.color}, transparent)` }}
              />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                {Object.entries(product.stats).map(([key, value]) => (
                  <div key={key} className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                    <div className="text-xl font-extrabold" style={{ color: product.color }}>
                      {value}
                    </div>
                    <div className="text-xs text-white/50 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={index % 2 === 1 ? "lg:order-1" : ""}>
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: product.color }}
              animate={{ 
                boxShadow: [`0 0 15px ${product.color}50`, `0 0 25px ${product.color}70`, `0 0 15px ${product.color}50`]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                {product.name}
              </h2>
              <p className="text-sm font-medium" style={{ color: product.color }}>
                {product.tagline}
              </p>
            </div>
          </div>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {product.features.map((feature, fIndex) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + fIndex * 0.1 }}
                className="group/feature flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/8 transition-all"
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: product.color }}
                  whileHover={{ boxShadow: `0 0 10px ${product.color}` }}
                />
                <span className="text-sm text-white/70 group-hover/feature:text-white/80 transition-colors">{feature}</span>
              </motion.div>
            ))}
          </div>

          <Link
            href={`/#${product.id}`}
            className="group inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
            style={{ color: product.color }}
          >
            <span>Learn More About {product.name}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#050a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/hero/solutions-hero.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a0a]/90 via-[#050a0a]/50 to-[#050a0a]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a0a] via-transparent to-[#050a0a]/40" />
        </div>
        
        {/* AI Glow effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00e5d0]/15 blur-[180px]"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.22, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00c4b0]/12 blur-[150px]"
            animate={{ 
              scale: [1.15, 1, 1.15],
              opacity: [0.12, 0.18, 0.12]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-20 right-1/3 w-40 h-40 rounded-full bg-[#4df8e8]/15 blur-[80px]" />
        </div>
        
        {/* Tech grid */}
        <div className="tech-grid" />
        
        {/* Neural dots */}
        <div className="hidden lg:block neural-dots" />
        
        {/* Floating particles */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => {
            const xPos = 8 + i * 9;
            const yPos = 15 + (i % 5) * 15;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#00e5d0]/50"
                style={{
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                }}
                animate={{ 
                  y: [0, -25, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
        
        {/* Wave lines */}
        <div className="hidden sm:block wave-lines" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-glow border border-[#00e5d0]/20 mb-6"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-[#00e5d0]"
              animate={{ 
                boxShadow: ['0 0 5px rgba(0, 229, 208, 0.5)', '0 0 15px rgba(0, 229, 208, 0.8)', '0 0 5px rgba(0, 229, 208, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-[#00e5d0]/80 font-medium tracking-wide">AI-Powered Plant Solutions</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div 
              className="h-px w-12 bg-[#00e5d0]"
              animate={{ 
                boxShadow: ['0 0 5px rgba(0, 229, 208, 0.3)', '0 0 15px rgba(0, 229, 208, 0.6)', '0 0 5px rgba(0, 229, 208, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.3em] text-[#00e5d0] font-medium">
              Our Products
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            Three Ways to
            <br />
            <span className="bg-gradient-to-r from-[#00e5d0] via-[#4df8e8] to-[#00c4b0] bg-clip-text text-transparent">
              Connect With Plants
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl"
          >
            From AI-powered diagnosis to artistic transformations, 
            discover the complete PlantTalk AI ecosystem.
          </motion.p>
        </div>
        
        {/* Decorative corner elements */}
        <div className="hidden xl:flex absolute top-24 right-12 flex-col items-center gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-[#00e5d0]"
            animate={{ 
              boxShadow: ['0 0 10px rgba(0, 229, 208, 0.3)', '0 0 20px rgba(0, 229, 208, 0.6)', '0 0 10px rgba(0, 229, 208, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-px h-24 bg-gradient-to-b from-[#00e5d0]/50 to-transparent" />
        </div>
        <div className="hidden xl:flex absolute bottom-24 left-12 flex-col items-center gap-2">
          <div className="w-px h-24 bg-gradient-to-t from-[#00e5d0]/50 to-transparent" />
          <motion.div 
            className="w-2 h-2 rounded-full bg-[#00c4b0]"
            animate={{ 
              boxShadow: ['0 0 10px rgba(0, 196, 176, 0.3)', '0 0 20px rgba(0, 196, 176, 0.6)', '0 0 10px rgba(0, 196, 176, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </section>

      {/* Products List */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Animated glow orbs */}
          <motion.div 
            className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full bg-[#00e5d0]/8 blur-[200px]"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-[#00c4b0]/8 blur-[180px]"
            animate={{ 
              scale: [1.1, 1, 1.1],
              x: [0, -50, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4df8e8]/5 blur-[200px]"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Tech grid */}
          <div className="tech-grid" />
          
          {/* Hex grid pattern */}
          <div className="hidden lg:block hex-grid" />
          
          {/* Data stream lines on sides */}
          <div className="hidden xl:block absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#00e5d0]/30 to-transparent" />
          <div className="hidden xl:block absolute right-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-[#00c4b0]/30 to-transparent" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="space-y-32">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a1414]">
          {/* Animated center glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00e5d0]/10 blur-[150px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Tech grid */}
          <div className="tech-grid" />
          
          {/* Wave lines */}
          <div className="hidden sm:block wave-lines" />
          
          {/* Neural dots */}
          <div className="hidden lg:block neural-dots" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-[#00e5d0] to-[#4df8e8] bg-clip-text text-transparent">Plant Journey?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
              Whether you&apos;re a first-time plant parent or a seasoned horticulturist,
              we have the perfect tools to help your plants thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="relative bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 group overflow-hidden transition-all"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 transition-opacity" />
                <span className="relative">Get in Touch</span>
                <span className="relative transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/stories"
                className="relative border border-[#00e5d0]/30 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center gap-2 hover:border-[#00e5d0]/60 hover:bg-[#00e5d0]/5 transition-all group overflow-hidden"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0]/5 to-transparent" />
                </span>
                <span className="relative">See Success Stories</span>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
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

      <Newsletter />
      <Footer />
    </main>
  );
}
