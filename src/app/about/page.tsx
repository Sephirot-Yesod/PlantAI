"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import Link from "next/link";

const values = [
  { title: "Plants First", description: "Every decision we make starts with one question: How does this help the plant?" },
  { title: "Community Driven", description: "Our best features come from listening to plant lovers around the world." },
  { title: "Science Backed", description: "We partner with botanists and researchers to ensure accuracy in everything." },
  { title: "Accessible to All", description: "Plant care shouldn't be intimidating. We make it simple and joyful." },
];

const stats = [
  { value: "50M+", label: "Plants Analyzed" },
  { value: "2M+", label: "Active Users" },
  { value: "180+", label: "Countries" },
  { value: "99.2%", label: "Accuracy" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/hero/about-hero.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#4ade80] font-medium">
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
          >
            We&apos;re Building the Future of{" "}
            <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
              Human-Plant Connection
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto mb-16"
          >
            PlantTalk AI was founded with a simple belief: technology should bring us 
            closer to nature, not further from it. We&apos;re a team of AI researchers, 
            botanists, and plant lovers on a mission to help everyone build deeper 
            relationships with the green world around them.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image on Right */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(/images/about-story.jpg)` 
            }}
          />
          {/* Gradient overlays to blend into page */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
              Our <span className="text-[#4ade80]">Story</span>
            </h2>

            <div className="space-y-8 text-lg text-white/70 leading-relaxed">
              <p className="text-2xl text-white/90 font-medium">
                Plantalk is building a new kind of intelligence—one that helps people live closer to the natural world.
              </p>

              <p>
                We believe the next era of technology shouldn&apos;t only optimize productivity. It should strengthen what modern life quietly erodes: attention, patience, care, and our sense of belonging on a living planet. Nature is not a backdrop. It is the foundation we all share.
              </p>

              <p>
                Our work starts with plants—not because they are trendy, but because they are essential. They shape the ecosystems that sustain life, yet they remain largely &ldquo;silent&rdquo; in human spaces. We use AI to translate complexity into understanding, so more people can notice what&apos;s happening, respond with confidence, and feel supported rather than overwhelmed.
              </p>

              <p>
                Plantalk is not here to replace human intuition or turn nature into something synthetic. We build with respect for reality and for the emotional side of care: the small moments of progress, calm, and connection that make responsibility feel meaningful.
              </p>
            </div>
          </motion.div>

          {/* Where We're Going */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mt-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Where we&apos;re <span className="text-[#4ade80]">going</span>
            </h3>

            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              We are developing a plant-centered intelligence foundation that can grow into a broad ecosystem, expanding across:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] flex-shrink-0 mt-2.5" />
                <span className="text-lg text-white/70">
                  Home and lifestyle experiences that nurture everyday connection with nature
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] flex-shrink-0 mt-2.5" />
                <span className="text-lg text-white/70">
                  Education and wellbeing programs that make learning and care more accessible
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] flex-shrink-0 mt-2.5" />
                <span className="text-lg text-white/70">
                  Long-term solutions that support more resilient, sustainable agricultural systems
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-[#4ade80]">Values</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 bg-[#141414] rounded-2xl border border-white/5 hover:border-[#4ade80]/30 transition-all text-center"
              >
                <div className="w-3 h-3 rounded-full bg-[#4ade80] mx-auto mb-6 group-hover:scale-150 transition-transform" />

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors">
                  {value.title}
                </h3>

                <p className="text-sm text-white/50">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your{" "}
              <span className="text-[#4ade80]">Plant Journey?</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Join millions of plant lovers using PlantTalk AI to nurture their green companions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/solutions"
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Explore Our Products →
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center gap-2 hover:border-[#4ade80]/50 hover:bg-[#4ade80]/5 transition-all"
              >
                Get in Touch
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
