"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import Link from "next/link";

const pillars = [
  {
    title: "Plant Growth Model For Science",
    color: "#60a5fa",
    description:
      "At the core of our technology is a sophisticated AI growth model that understands plant biology at a deep level. Trained on millions of data points, it can predict needs, diagnose issues, and optimize care for any species.",
    points: [
      "Species-specific care recommendations",
      "Environmental adaptation algorithms",
      "Predictive health monitoring",
      "Personalized growth optimization",
    ],
  },
  {
    title: "Emotional Value for Humanity",
    color: "#f472b6",
    description:
      "Plants provide profound emotional benefits — reducing stress, boosting mood, and creating a sense of nurturing purpose. Our technology amplifies these benefits by making plant care more rewarding, less stressful, and deeply connected.",
    points: [
      "Reduce plant care anxiety with real-time guidance",
      "Celebrate growth milestones and achievements",
      "Build meaningful relationships with your plants",
      "Experience joy through playful interactions",
    ],
  },
];

const timeline = [
  { year: "2024", title: "App for User", description: "Launching our consumer app to help plant lovers care for their greenery with AI-powered guidance." },
  { year: "2025", title: "Smart Hardware Sensor", description: "Introducing intelligent sensors that monitor plant health and environment in real-time." },
  { year: "2026", title: "Data Flywheel", description: "Building a powerful data ecosystem that continuously improves our AI models through user insights." },
  { year: "2027", title: "AI Environment-Centric Growth Model", description: "Deploying advanced AI that understands complete environmental contexts for optimal plant growth." },
];

const values = [
  { title: "Plant-First Design", description: "Every feature starts with the question: How does this help the plant?" },
  { title: "Accessible to All", description: "From first-time plant parents to professional horticulturists." },
  { title: "Science-Backed", description: "Built on peer-reviewed research and validated by botanists." },
  { title: "Sustainable Future", description: "Promoting biodiversity and environmental stewardship." },
];

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/hero/vision-hero.jpg)` }}
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
              Our Vision
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-5xl mx-auto leading-tight"
          >
            Use AI to Help People{" "}
            <span className="bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
              Better Interact
            </span>{" "}
            With Plants
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            We believe technology should deepen our connection to nature, not replace it. 
            Our AI understands plants so you can too — making every interaction more meaningful, 
            every care decision more confident, and every moment with your plants more joyful.
          </motion.p>
        </div>
      </section>

      {/* Two Pillars Section */}
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
              Two Core <span className="text-[#4ade80]">Pillars</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Our approach is built on two fundamental beliefs about the human-plant relationship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#141414] rounded-2xl p-8 lg:p-12 border border-white/5"
              >
                <div 
                  className="w-4 h-4 rounded-full mb-6"
                  style={{ backgroundColor: pillar.color }}
                />

                <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: pillar.color }}>
                  {pillar.title}
                </h3>

                <p className="text-white/60 mb-8 leading-relaxed">
                  {pillar.description}
                </p>

                <ul className="space-y-4">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span 
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                        style={{ backgroundColor: pillar.color }}
                      />
                      <span className="text-white/70">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4ade80]/5 via-transparent to-[#22c55e]/5" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <blockquote className="space-y-8 text-xl md:text-2xl text-white/80 leading-relaxed">
              <p>
                Musk&apos;s dream of resettling on Mars is, in a way, the old logic of animals: when the ground turns harsh, you shake off the dust and go.
              </p>
              <p>
                But a plant&apos;s life is decided in the moment it touches earth and sends down its first root—born here, grown here. It can&apos;t escape. So it survives by engaging more deeply with what&apos;s around them: sunlight, rain, soil, wind—adjusting, adapting, and solving problems where they stand. That&apos;s a kind of <span className="text-[#4ade80] font-semibold">intelligence that belongs to plants</span>.
              </p>
              <p>
                Maybe if humans want to live better with Earth, we need to understand that kind of intelligence more. Because measured against the vastness of the cosmos, this planet is not just home—it is the <span className="text-[#4ade80] font-semibold">only shore our fragile species can stand on</span>.
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
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
              Our <span className="text-[#4ade80]">Journey</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              From a simple idea to a global platform connecting millions with their plants
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#4ade80]/50 via-[#4ade80]/20 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-[#4ade80] transform -translate-x-1/2 shadow-lg shadow-green-500/50" />

                  {/* Content */}
                  <div className={`ml-20 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <span className="text-[#4ade80] font-bold text-xl">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                    <p className="text-white/50 mt-2">{item.description}</p>
                  </div>

                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What We <span className="text-[#4ade80]">Stand For</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              The principles that guide every decision we make
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
                className="group p-8 bg-[#141414] rounded-xl border border-white/5 hover:border-[#4ade80]/30 transition-all text-center"
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-sm text-[#4ade80] font-medium">
                Join the Movement
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your
              <br />
              <span className="text-[#4ade80]">Plant Relationship?</span>
            </h2>
            
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Experience the future of plant care. Start your journey with PlantTalk AI today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/solutions"
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Explore Products →
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
