"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    id: "plantiemoji",
    name: "Plantiemoji",
    tagline: "Plants Speak Emoji",
    description:
      "A delightful smart sensor that monitors your plant's environment and communicates its status through expressive emojis. See at a glance if your plant is happy, thirsty, cold, or basking in perfect conditions.",
    image: "/images/products/plantiemoji-hero.jpg",
    color: "#4ade80",
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
    color: "#60a5fa",
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
    color: "#fbbf24",
    features: ["AI-powered disease detection", "Live video diagnosis", "Instant care recommendations", "Growth tracking & milestones"],
    stats: { accuracy: "99.2%", species: "180+", diagnoses: "50M+" },
  },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/hero/solutions-hero.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#4ade80]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#4ade80] font-medium">
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
            <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
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
      </section>

      {/* Products List */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative group">
                      <div
                        className="absolute -inset-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                        style={{ backgroundColor: `${product.color}20` }}
                      />
                      <div className="relative h-[400px] lg:h-[500px] rounded overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Stats overlay */}
                        <div className="absolute bottom-6 left-6 right-6 flex gap-6">
                          {Object.entries(product.stats).map(([key, value]) => (
                            <div key={key} className="bg-black/50 backdrop-blur-sm rounded px-4 py-2">
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
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: product.color }}
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
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {product.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 rounded bg-white/5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color }} />
                          <span className="text-sm text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/#${product.id}`}
                      className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
                      style={{ color: product.color }}
                    >
                      Learn More About {product.name}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Ready to Start Your{" "}
              <span className="text-[#4ade80]">Plant Journey?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Whether you&apos;re a first-time plant parent or a seasoned horticulturist,
              we have the perfect tools to help your plants thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-8 py-4 rounded font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Get in Touch
                <span>→</span>
              </Link>
              <Link
                href="/stories"
                className="border border-white/20 text-white px-8 py-4 rounded font-medium inline-flex items-center justify-center gap-2 hover:border-[#4ade80]/50 hover:bg-[#4ade80]/5 transition-all"
              >
                See Success Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
