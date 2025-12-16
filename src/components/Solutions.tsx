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
    color: "#4ade80",
    gradient: "from-[#4ade80] to-[#22c55e]",
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
    color: "#fbbf24",
    gradient: "from-[#fbbf24] to-[#f59e0b]",
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
    color: "#60a5fa",
    gradient: "from-[#60a5fa] to-[#3b82f6]",
  },
];

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#4ade80]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#22c55e]/5 to-transparent" />
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
              <div className="h-px w-12 bg-[#4ade80]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#4ade80] font-medium">
                Our Products
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Three Ways to Connect
              <br />
              <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
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
              className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 group hover:border-[#4ade80]/50 hover:bg-[#4ade80]/5 transition-all"
            >
              View All Products
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
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
                <div className={`relative bg-[#141414] rounded-xl overflow-hidden card-hover h-full ${
                  index === 0 ? "min-h-[80vh]" : "min-h-[320px]"
                }`}>
                  {/* Image */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    {/* Tagline */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-br ${product.gradient}`}
                      />
                      <span className="text-xs uppercase tracking-wider font-medium" style={{ color: product.color }}>
                        {product.tagline}
                      </span>
                    </div>

                    <h3 className={`font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors ${
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
                        {product.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white/70 backdrop-blur-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ color: product.color }}>
                      Learn More
                      <span>→</span>
                    </div>
                  </div>

                  {/* Hover border */}
                  <div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-xl transition-colors duration-300"
                    style={{ 
                      borderColor: hoveredId === product.id ? `${product.color}30` : 'transparent' 
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
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
              className="text-[#4ade80] hover:text-[#86efac] transition-colors"
            >
              Let&apos;s find the perfect solution together →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
