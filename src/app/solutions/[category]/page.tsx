"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const productsData: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    longDescription: string;
    heroImage: string;
    logoImage: string;
    color: string;
    features: { title: string; description: string }[];
    useCases: string[];
  }
> = {
  ezplants: {
    name: "EZplants",
    tagline: "AI Plant Doctor",
    description: "Advanced AI growth model that diagnoses plant diseases in real-time.",
    longDescription:
      "EZplants combines cutting-edge computer vision with our proprietary plant growth models to deliver instant, accurate plant health assessments. Simply snap a photo or start a live video session, and our AI will identify issues, explain the causes, and provide step-by-step treatment plans tailored to your specific plant and environment.",
    heroImage: "/images/products/ezplants-hero.jpg",
    logoImage: "/images/logos/ezplants-logo.png",
    color: "#fbbf24",
    features: [
      { title: "AI Disease Detection", description: "Our model recognizes 500+ plant diseases with 99.2% accuracy, trained on 50 million images." },
      { title: "Live Video Diagnosis", description: "Real-time consultation with our AI. Point your camera and get instant answers." },
      { title: "Instant Care Plans", description: "Personalized treatment recommendations based on your plant species and local conditions." },
      { title: "Growth Tracking", description: "Monitor your plant's health over time with progress photos and milestone celebrations." },
      { title: "Care Reminders", description: "Smart notifications for watering, feeding, and seasonal care adjustments." },
      { title: "Preventive Alerts", description: "Early warning system detects issues before they become visible to the naked eye." },
    ],
    useCases: ["Home gardeners wanting healthier houseplants", "Commercial greenhouses optimizing crop health", "Plant nurseries reducing stock loss", "Agricultural operations preventing disease spread"],
  },
  planttalk: {
    name: "PlantTalk",
    tagline: "Converse with Nature",
    description: "Revolutionary AI that lets you have real conversations with your plants.",
    longDescription:
      "PlantTalk creates a unique AI personality for each of your plants based on their species, age, health, and environment. These AI agents can express needs, share 'thoughts' about their day, and even interact with other plants. It's not just a notification system — it's a relationship builder that makes plant care deeply personal and emotionally rewarding.",
    heroImage: "/images/products/planttalk-hero.jpg",
    logoImage: "/images/logos/planttalk-logo.png",
    color: "#60a5fa",
    features: [
      { title: "Natural Conversations", description: "Chat naturally with your plants. Ask questions, get updates, and hear their 'thoughts'." },
      { title: "Unique Personalities", description: "Each plant develops a distinct personality based on species traits and your interactions." },
      { title: "Plant Social Network", description: "Your plants can 'talk' to each other and share updates in a private social feed." },
      { title: "Emotional Intelligence", description: "Plants express happiness, concern, or excitement based on their actual health status." },
      { title: "Daily Stories", description: "Wake up to morning messages from your plants about how they're feeling." },
      { title: "Conversation History", description: "Look back on your relationship with each plant over weeks, months, and years." },
    ],
    useCases: ["Plant lovers seeking deeper connection with their greenery", "Families wanting to teach kids about plant care", "Seniors who find companionship in their plants", "Anyone who has ever wondered what their plant might say"],
  },
  plantiemoji: {
    name: "Plantiemoji",
    tagline: "Plants Speak Emoji",
    description: "Smart sensor that communicates plant status through expressive emojis.",
    longDescription:
      "Plantiemoji is a compact, beautiful sensor that monitors temperature, humidity, light, and soil moisture around your plant. But here's the magic: instead of confusing graphs or numbers, it translates all that data into simple, expressive emojis. A quick glance tells you exactly how your plant feels — no interpretation needed.",
    heroImage: "/images/products/plantiemoji-hero.jpg",
    logoImage: "/images/logos/plantiemoji-logo.png",
    color: "#4ade80",
    features: [
      { title: "4-in-1 Sensor", description: "Monitors temperature, humidity, light levels, and soil moisture simultaneously." },
      { title: "Emoji Expression", description: "Cute e-ink display shows your plant's current mood at a glance." },
      { title: "Instant Alerts", description: "Push notifications when your plant needs attention, before problems occur." },
      { title: "Learning System", description: "Gets smarter over time, learning your plant's preferences and patterns." },
      { title: "6-Month Battery", description: "Set it and forget it — rechargeable battery lasts up to 6 months." },
      { title: "Historical Data", description: "Track trends over time with beautiful, simple charts in the app." },
    ],
    useCases: ["Busy professionals who forget to check on plants", "Plant parents with many plants to monitor", "Gift for plant lovers who want peace of mind", "Offices wanting to maintain healthy indoor plants"],
  },
};

export default function ProductPage() {
  const params = useParams();
  const category = params.category as string;
  const product = productsData[category];

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Product not found</h1>
          <Link href="/solutions" className="text-[#4ade80] hover:underline">
            ← Back to Solutions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/0" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            ← Back to All Products
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: product.color }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: product.color }}
            >
              {product.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            {product.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mb-12"
          >
            {product.longDescription}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {product.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="p-5 bg-[#141414]/80 backdrop-blur-sm rounded border border-white/5 hover:border-white/10 transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: product.color }}
                />
                <h3 className="text-base font-extrabold text-white mb-1">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Logo on Left - Rotated 20 degrees */}
        <div className="absolute top-1/2 left-1/8 -translate-y-1/2 hidden lg:block pointer-events-none">
          <div 
            className="w-[500px] h-[500px] bg-contain bg-center bg-no-repeat opacity-100 rounded overflow-hidden"
              style={{ 
                backgroundImage: `url(${product.logoImage})`,
                transform: 'rotate(-10deg)',
              filter: `drop-shadow(0 0 30px ${product.color}30)`
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Perfect <span style={{ color: product.color }}>For</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {product.useCases.map((useCase, index) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-[#141414] rounded"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="text-white/80">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Ready to Try{" "}
              <span style={{ color: product.color }}>{product.name}</span>?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Join thousands of plant lovers already using {product.name} to transform
              their relationship with plants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="text-black px-8 py-4 rounded font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                style={{ backgroundColor: product.color }}
              >
                Start Free Trial →
              </Link>
              <Link
                href="/solutions"
                className="border border-white/20 text-white px-8 py-4 rounded font-medium inline-flex items-center justify-center gap-2 hover:border-white/40 transition-all"
              >
                Explore Other Products
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
