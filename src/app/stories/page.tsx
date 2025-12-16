"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "All",
  "Product Updates",
  "Research",
  "Tutorials",
  "Community",
  "Company News",
];

const stories = [
  {
    id: 1,
    title: "Introducing EZplants 2.0: Live Video Diagnosis is Here",
    excerpt:
      "Our most requested feature is finally live. Now you can get real-time plant diagnosis through video chat with our AI. Simply point your camera and get instant answers to any plant health question.",
    date: "Dec 2024",
    category: "Product Updates",
    image: "/images/stories/story-1.jpg",
    featured: true,
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "The Science Behind PlantTalk: How We Model Plant Personalities",
    excerpt:
      "A deep dive into the AI architecture that gives each plant its unique voice. From species-specific traits to environmental adaptations, here's how we bring plants to life with personality.",
    date: "Nov 2024",
    category: "Research",
    image: "/images/stories/story-2.jpg",
    featured: true,
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Plantiemoji Sensor Setup: A Complete Guide",
    excerpt:
      "Everything you need to know to get your Plantiemoji sensor up and running. From pairing to interpreting those adorable emoji updates.",
    date: "Oct 2024",
    category: "Tutorials",
    image: "/images/stories/story-3.jpg",
    featured: false,
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "50 Million Plants Later: What We've Learned About Plant Health",
    excerpt:
      "Analyzing data from our first 50 million plant diagnoses has revealed fascinating patterns about common issues, seasonal trends, and care misconceptions.",
    date: "Sep 2024",
    category: "Research",
    image: "/images/stories/story-4.jpg",
    featured: false,
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Community Spotlight: The Teacher Using PlantTalk in Classrooms",
    excerpt:
      "How one elementary school teacher is using our platform to teach kids about biology, empathy, and environmental science through plant conversations.",
    date: "Aug 2024",
    category: "Community",
    image: "/images/stories/story-5.jpg",
    featured: false,
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "PlantTalk AI Raises $25M Series A to Expand Global Reach",
    excerpt:
      "We're thrilled to announce our Series A funding, led by Green Ventures. This investment will help us bring our AI-powered plant care to millions more plant lovers worldwide.",
    date: "Jul 2024",
    category: "Company News",
    image: "/images/stories/story-6.jpg",
    featured: false,
    readTime: "3 min read",
  },
];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = stories.filter((story) => {
    const matchesCategory = activeCategory === "All" || story.category === activeCategory;
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredStories = filteredStories.filter((s) => s.featured);
  const regularStories = filteredStories.filter((s) => !s.featured);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/images/hero/stories-hero.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#4ade80] font-medium">
              Stories & Updates
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            From the
            <br />
            <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
              PlantTalk Garden
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl"
          >
            Product updates, research insights, tutorials, and stories from our 
            community of plant lovers and AI enthusiasts.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-6 border-y border-white/5 sticky top-20 z-30 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#4ade80] transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-[#4ade80] text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
Featured
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredStories.map((story, index) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/stories/${story.id}`} className="block group">
                    <div className="relative h-[400px] lg:h-[450px] bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-[#4ade80]/30 transition-all duration-300 card-hover">
                      <div className="absolute inset-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${story.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>

                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <span className="px-3 py-1 bg-[#4ade80] text-black text-xs font-semibold uppercase tracking-wider rounded-lg">
                          Featured
                        </span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                          {story.category}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <span className="text-white/50">{story.date}</span>
                          <span className="text-white/30">•</span>
                          <span className="text-white/50">{story.readTime}</span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#4ade80] transition-colors">
                          {story.title}
                        </h3>

                        <p className="text-white/60 line-clamp-2 mb-6">
                          {story.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-2 text-[#4ade80] font-medium group-hover:gap-3 transition-all">
                          Read Story →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Stories Grid */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {regularStories.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-8">All Stories</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularStories.map((story, index) => (
                  <motion.article
                    key={story.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/stories/${story.id}`} className="block group">
                      <div className="bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-[#4ade80]/30 transition-all duration-300 card-hover">
                        <div className="relative h-[200px] overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${story.image})` }}
                          />
                          <div className="absolute inset-0 bg-black/20" />

                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                              {story.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3 text-sm">
                            <span className="text-white/40">{story.date}</span>
                            <span className="text-white/20">•</span>
                            <span className="text-white/40">{story.readTime}</span>
                          </div>

                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors line-clamp-2">
                            {story.title}
                          </h3>

                          <p className="text-white/50 text-sm line-clamp-2 mb-4">
                            {story.excerpt}
                          </p>

                          <span className="inline-flex items-center gap-2 text-[#4ade80] text-sm font-medium group-hover:gap-3 transition-all">
                            Read Story →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}

          {filteredStories.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">
                No stories found matching your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-[#4ade80] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
