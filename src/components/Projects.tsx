"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const useCases = [
  {
    id: 1,
    title: "Smart Greenhouse Network",
    client: "AgriTech Solutions",
    category: "Enterprise",
    year: "2024",
    image: "/images/projects/project-1.jpg",
    description: "Deployed EZplants across 50+ greenhouses, reducing crop loss by 34% through early disease detection.",
    featured: true,
    stats: { plants: "2M+", accuracy: "99.4%" },
  },
  {
    id: 2,
    title: "Urban Jungle Café Chain",
    client: "GreenLeaf Hospitality",
    category: "Hospitality",
    year: "2024",
    image: "/images/projects/project-2.jpg",
    description: "Plantiemoji sensors in 120 cafés let customers see plant happiness in real-time, boosting engagement 5x.",
    featured: true,
    stats: { locations: "120", engagement: "+500%" },
  },
  {
    id: 3,
    title: "Children's Museum Interactive",
    client: "Wonder Science Museum",
    category: "Education",
    year: "2024",
    image: "/images/projects/project-3.jpg",
    description: "PlantTalk powers an exhibit where kids can have conversations with rare plants and learn about ecosystems.",
    featured: false,
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const featuredCases = useCases.filter((p) => p.featured);
  const otherCases = useCases.filter((p) => !p.featured);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#0d0d0d]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #4ade80 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
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
                Success Stories
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Growing Success
              <br />
              <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
                Across Industries
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/stories"
              className="border border-white/20 text-white px-6 py-3 rounded font-medium inline-flex items-center gap-2 group hover:border-[#4ade80]/50 hover:bg-[#4ade80]/5 transition-all"
            >
              View All Cases
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
          </motion.div>
        </div>

        {/* Featured Cases - Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featuredCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredId(useCase.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/stories/${useCase.id}`} className="block group">
                <div className="relative h-[500px] lg:h-[550px] bg-[#141414] rounded overflow-hidden card-hover">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${useCase.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Category Badge */}
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-2 bg-[#4ade80] text-black text-xs font-semibold uppercase tracking-wider rounded">
                        {useCase.category}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-8 right-8">
                      <span className="text-white/60 text-sm font-medium">
                        {useCase.year}
                      </span>
                    </div>

                    <div className="text-white/60 text-sm mb-3">
                      {useCase.client}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-[#4ade80] transition-colors">
                      {useCase.title}
                    </h3>

                    <p className="text-white/60 mb-6 max-w-md">
                      {useCase.description}
                    </p>

                    {/* Stats */}
                    {useCase.stats && (
                      <div className="flex gap-6 mb-6">
                        {Object.entries(useCase.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-2xl font-extrabold text-[#4ade80]">{value}</div>
                            <div className="text-xs text-white/40 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[#4ade80] font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Read Case Study
                      <span>→</span>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div
                    className={`absolute inset-0 border-2 rounded transition-colors duration-300 ${
                      hoveredId === useCase.id
                        ? "border-[#4ade80]/50"
                        : "border-transparent"
                    }`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Other Cases - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Link href={`/stories/${useCase.id}`} className="block group">
                <div className="relative h-[280px] bg-[#141414] rounded overflow-hidden card-hover flex">
                  {/* Image */}
                  <div className="relative w-2/5">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${useCase.image})` }}
                    />
                  </div>

                  {/* Content */}
                  <div className="w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/10 text-[#4ade80] text-xs font-semibold uppercase tracking-wider rounded mb-4">
                        {useCase.category}
                      </span>

                      <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-[#4ade80] transition-colors">
                        {useCase.title}
                      </h3>

                      <div className="text-white/50 text-sm mb-3">
                        {useCase.client}
                      </div>

                      <p className="text-white/50 text-sm line-clamp-2">
                        {useCase.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[#4ade80] text-sm font-medium">
                      Read Story
                      <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
