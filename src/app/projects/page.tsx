"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "All",
  "Sun Shading",
  "Textile Architecture",
  "Pools",
  "Hospitality",
  "Sports",
];

const projects = [
  {
    id: 1,
    title: "Ritz Paris Terrace",
    location: "Paris, France",
    category: "Sun Shading",
    year: "2024",
    image: "/images/projects/project-5.jpg",
    description:
      "Elegant sun shading solution for the iconic Place Vendôme terrace, blending greenery, signature cocktails, and refined tapas.",
  },
  {
    id: 2,
    title: "Santiago Bernabéu Stadium",
    location: "Madrid, Spain",
    category: "Textile Architecture",
    year: "2024",
    image: "/images/projects/project-6.jpg",
    description:
      "Revolutionary retractable roof system for Real Madrid's legendary football stadium, awarded the ACHE Building Structure award.",
  },
  {
    id: 3,
    title: "Paris 2024 Olympics",
    location: "Paris, France",
    category: "Textile Architecture",
    year: "2024",
    image: "/images/projects/project-7.jpg",
    description:
      "Innovative temporary construction project that left its mark on one of the world's most iconic cities during the Olympic Games.",
  },
  {
    id: 4,
    title: "El Hormiguero Pool",
    location: "Madrid, Spain",
    category: "Pools",
    year: "2025",
    image: "/images/projects/project-8.jpg",
    description:
      "10×10m modular pool designed and manufactured in just 72 hours for live TV, demonstrating precision, safety, and engineering excellence.",
  },
  {
    id: 5,
    title: "Four Seasons Resort",
    location: "Bora Bora, French Polynesia",
    category: "Hospitality",
    year: "2023",
    image: "/images/projects/project-9.jpg",
    description:
      "Luxurious parasol installations for overwater bungalows and beach areas at this world-renowned resort destination.",
  },
  {
    id: 6,
    title: "Melbourne Tennis Center",
    location: "Melbourne, Australia",
    category: "Sports",
    year: "2023",
    image: "/images/projects/project-10.jpg",
    description:
      "Retractable roof solution for the outdoor courts, allowing play in all weather conditions during the Australian Open.",
  },
  {
    id: 7,
    title: "Mandarin Oriental",
    location: "Barcelona, Spain",
    category: "Hospitality",
    year: "2023",
    image: "/images/projects/project-11.jpg",
    description:
      "Custom pergola system for the rooftop terrace, featuring integrated lighting and climate control.",
  },
  {
    id: 8,
    title: "Dubai Marina Waterfront",
    location: "Dubai, UAE",
    category: "Sun Shading",
    year: "2022",
    image: "/images/projects/project-12.jpg",
    description:
      "Large-scale awning installations providing shade along the prestigious waterfront promenade.",
  },
  {
    id: 9,
    title: "Private Villa Pool",
    location: "Ibiza, Spain",
    category: "Pools",
    year: "2022",
    image: "/images/projects/project-13.jpg",
    description:
      "Automated pool cover system for a luxury private residence with infinity pool overlooking the Mediterranean.",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/hero/projects-hero.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#c9a86c]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a86c] font-medium">
              Landmark Projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            Creating Spaces That
            <br />
            <span className="text-[#c9a86c]">Define New Trends</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl"
          >
            Explore our portfolio of iconic installations worldwide, from
            luxury resorts to world-class sports venues.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-white/40 text-sm flex-shrink-0">Filter:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-[#c9a86c] text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
              >
                <Link href={`/projects/${project.id}`} className="block group">
                  <div className="bg-[#141414] rounded overflow-hidden border border-white/5 hover:border-[#c9a86c]/30 transition-all duration-300 card-hover">
                    <div className="relative h-[300px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#c9a86c] text-black text-xs font-semibold uppercase tracking-wider rounded-sm">
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="text-white/60 text-sm">
                          {project.year}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white/60 text-sm mb-2">
                          {project.location}
                        </div>
                        <h3 className="text-xl font-extrabold text-white group-hover:text-[#c9a86c] transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-white/50 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[#c9a86c] text-sm font-medium group-hover:gap-3 transition-all">
                        View Project →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Let our team of experts help you create your next landmark
              installation. We&apos;re ready to turn your vision into reality.
            </p>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-8 py-4 rounded font-semibold inline-flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              Start Your Project →
            </Link>
          </motion.div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}

