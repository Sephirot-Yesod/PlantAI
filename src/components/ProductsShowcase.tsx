"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const products = [
  {
    id: "plantiemoji",
    name: "Plantiemoji",
    tagline: "Plants Speak Emoji",
    description: "Smart sensor that communicates plant status through expressive emojis.",
    longDescription:
      "Plantiemoji is a compact, beautiful sensor that monitors temperature, humidity, light, and soil moisture around your plant. But here's the magic: instead of confusing graphs or numbers, it translates all that data into simple, expressive emojis. A quick glance tells you exactly how your plant feels — no interpretation needed.",
    heroImage: "/images/products/plantiemoji-hero.jpg",
    logoImage: "/images/logos/plantiemoji-logo.png",
    color: "#4ade80",
    features: [
      { 
        title: "4-in-1 Sensor Array", 
        description: "Comprehensive environmental monitoring with precision sensors for temperature, humidity, light intensity, and soil moisture. Each sensor is calibrated for plant-specific accuracy, giving you a complete picture of your plant's world.",
      },
      { 
        title: "Expressive Emoji Display", 
        description: "Our custom e-ink display shows your plant's mood through carefully designed emoji expressions. Happy, thirsty, cold, hot, or stressed — understand your plant's state instantly without interpreting complex data.",
      },
      { 
        title: "Proactive Alert System", 
        description: "Receive intelligent push notifications before problems occur. Our predictive algorithms analyze environmental trends and alert you when conditions are heading toward stress zones, giving you time to act.",
      },
      { 
        title: "Adaptive Learning Engine", 
        description: "Plantiemoji learns your plant's unique preferences over time. It observes how your plant responds to different conditions and adjusts its recommendations accordingly, becoming more accurate with every passing week.",
      },
      { 
        title: "6-Month Battery Life", 
        description: "Set it and forget it. Our ultra-efficient design combined with smart sleep modes means you only need to recharge twice a year. When it's time, a gentle notification reminds you — no sudden deaths.",
      },
      { 
        title: "Rich Historical Analytics", 
        description: "Beautiful, intuitive charts track your plant's environmental history over days, weeks, and months. Identify patterns, correlate events with plant health changes, and become a better plant parent through data.",
      },
    ],
    useCases: [
      "Busy professionals who forget to check on plants",
      "Plant parents with many plants to monitor",
      "Gift for plant lovers who want peace of mind",
      "Offices wanting to maintain healthy indoor plants",
    ],
  },
  {
    id: "planttalk",
    name: "PlantTalk",
    tagline: "Converse with Nature",
    description: "Revolutionary AI that lets you have real conversations with your plants.",
    longDescription:
      "PlantTalk creates a unique AI personality for each of your plants based on their species, age, health, and environment. These AI agents can express needs, share 'thoughts' about their day, and even interact with other plants. It's not just a notification system — it's a relationship builder that makes plant care deeply personal and emotionally rewarding.",
    heroImage: "/images/products/planttalk-hero.jpg",
    logoImage: "/images/logos/planttalk-logo.png",
    color: "#60a5fa",
    features: [
      { 
        title: "Natural Language Conversations", 
        description: "Chat with your plants like you would with a friend. Ask how they're feeling, what they need, or just say good morning. Our AI understands context, remembers past conversations, and responds with genuine personality.",
      },
      { 
        title: "Evolving Plant Personalities", 
        description: "Each plant develops its own distinct character based on species traits, age, care history, and your interactions. A young succulent might be curious and energetic, while an old fern could be wise and contemplative.",
      },
      { 
        title: "Plant Social Network", 
        description: "Your plants can 'talk' to each other! Watch them share updates, compliment each other, or even gossip in a private social feed. It's a delightful way to see your indoor garden as a living community.",
      },
      { 
        title: "Emotional Intelligence Layer", 
        description: "Plants express authentic emotions based on their actual health status. Joy when thriving, concern when stressed, excitement after watering. These emotional cues make care intuitive and deeply satisfying.",
      },
      { 
        title: "Morning Stories & Updates", 
        description: "Wake up to personalized messages from your plants about their night, their dreams, and their hopes for the day. It's a gentle, joyful way to start your morning and stay connected to nature.",
      },
      { 
        title: "Relationship Memory", 
        description: "Look back on your journey with each plant over weeks, months, and years. Milestone celebrations, memorable conversations, and growth moments are all preserved in a beautiful timeline.",
      },
    ],
    useCases: [
      "Plant lovers seeking deeper connection with their greenery",
      "Families wanting to teach kids about plant care",
      "Seniors who find companionship in their plants",
      "Anyone who has ever wondered what their plant might say",
    ],
  },
  {
    id: "ezplants",
    name: "EZplants",
    tagline: "AI Plant Doctor",
    description: "Advanced AI growth model that diagnoses plant diseases in real-time.",
    longDescription:
      "EZplants combines cutting-edge computer vision with our proprietary plant growth models to deliver instant, accurate plant health assessments. Simply snap a photo or start a live video session, and our AI will identify issues, explain the causes, and provide step-by-step treatment plans tailored to your specific plant and environment.",
    heroImage: "/images/products/ezplants-hero.jpg",
    logoImage: "/images/logos/ezplants-logo.png",
    color: "#fbbf24",
    features: [
      { 
        title: "Advanced Disease Recognition", 
        description: "Our AI model recognizes over 500 plant diseases, pests, and deficiencies with 99.2% accuracy. Trained on 50 million real-world images, it catches problems that even experienced gardeners might miss.",
      },
      { 
        title: "Live Video Consultation", 
        description: "Point your camera at any plant for real-time diagnosis. Our AI guides you to capture the right angles, zooms in on problem areas, and explains exactly what it sees — like having a plant doctor in your pocket.",
      },
      { 
        title: "Personalized Treatment Plans", 
        description: "Every diagnosis comes with step-by-step treatment recommendations tailored to your specific plant species, local climate, and available resources. Clear instructions, product suggestions, and expected recovery timelines.",
      },
      { 
        title: "Visual Growth Tracking", 
        description: "Document your plant's health journey with progress photos. Our AI tracks changes over time, celebrates recovery milestones, and alerts you if a condition is worsening despite treatment.",
      },
      { 
        title: "Smart Care Scheduling", 
        description: "Intelligent reminders for watering, fertilizing, repotting, and seasonal care adjustments. Schedules adapt to your plant's actual needs based on health status, growth stage, and environmental conditions.",
      },
      { 
        title: "Early Warning Detection", 
        description: "Our preventive scanning detects subtle signs of stress before they become visible problems. Slight color changes, growth patterns, and leaf texture variations trigger early warnings so you can act fast.",
      },
    ],
    useCases: [
      "Home gardeners wanting healthier houseplants",
      "Commercial greenhouses optimizing crop health",
      "Plant nurseries reducing stock loss",
      "Agricultural operations preventing disease spread",
    ],
  },
];

function PlantGrowthTheory() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hardware Showcase */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              Beautiful <span className="text-[#4ade80]">Hardware</span> Design
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Plantiemoji combines sophisticated sensing technology with an adorable expressive display.
              It monitors soil temperature, watering cycles, and displays status at a glance.
            </p>
          </motion.div>

          {/* Hardware Images Grid - 1 vertical + 2 horizontal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">
            {/* Vertical image on the left - spans both rows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:row-span-2 rounded overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300 aspect-[3/4] lg:aspect-auto"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/plantiemoji/hardware-vertical-1.jpg)` }}
              />
            </motion.div>

            {/* Two horizontal images stacked on the right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[16/10] lg:col-span-2 rounded overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/plantiemoji/hardware-horizontal-1.jpg)` }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-[16/10] lg:col-span-2 rounded overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/plantiemoji/hardware-horizontal-2.jpg)` }}
              />
            </motion.div>
          </div>

          {/* Sensor Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="text-4xl font-extrabold text-[#4ade80] mb-2">Soil Temp</div>
              <p className="text-white/60">Real-time soil temperature monitoring</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="text-4xl font-extrabold text-[#60a5fa] mb-2">Watering Cycle</div>
              <p className="text-white/60">Smart watering schedule tracking</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6"
            >
              <div className="text-4xl font-extrabold text-[#fbbf24] mb-2">Status Display</div>
              <p className="text-white/60">Expressive emoji feedback system</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductSection({ product, index }: { product: typeof products[0]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isPlantiemoji = product.id === "plantiemoji";

  return (
    <section id={product.id} ref={sectionRef} className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            {product.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mb-12"
          >
            {product.longDescription}
          </motion.p>
        </div>
      </div>

      {/* Plantiemoji-specific content */}
      {isPlantiemoji && <PlantGrowthTheory />}

      {/* Dedicated Features Section */}
      <div className="py-12 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ backgroundColor: product.color }} />
              <span 
                className="text-xs uppercase tracking-[0.3em] font-medium"
                style={{ color: product.color }}
              >
                Key Features
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
              What Makes{" "}
              <span style={{ color: product.color }}>{product.name}</span>
              {" "}Special
            </h3>
          </motion.div>

          {/* Features Grid - 2 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {product.features.map((feature, featureIndex) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                className="group"
              >
                <div className="p-5 bg-[#141414] rounded border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: product.color }}
                    />
                    <h4 className="text-base lg:text-lg font-extrabold text-white group-hover:text-white/90 transition-colors">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed pl-5">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center py-16">
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left side - Demo Photos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4 min-h-[500px]"
            >
              <div className="bg-[#141414] rounded overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/${product.id}/demo-1.jpg)` }}
                />
              </div>
              <div className="bg-[#141414] rounded overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/${product.id}/demo-2.jpg)` }}
                />
              </div>
            </motion.div>

            {/* Right side - Logo and Use Cases */}
            <div>
              {/* Logo above text */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div
                  className="w-[200px] h-[200px] bg-contain bg-center bg-no-repeat rounded overflow-hidden mx-auto lg:mx-0"
                  style={{ backgroundImage: `url(${product.logoImage})` }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                  Perfect <span style={{ color: product.color }}>For</span>
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 gap-4">
                {product.useCases.map((useCase, useCaseIndex) => (
                  <motion.div
                    key={useCase}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: useCaseIndex * 0.1 }}
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
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
              Ready to Try{" "}
              <span style={{ color: product.color }}>{product.name}</span>?
            </h3>
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
                Get in Touch →
              </Link>
              <Link
                href="/solutions"
                className="border border-white/20 text-white px-8 py-4 rounded font-medium inline-flex items-center justify-center gap-2 hover:border-white/40 transition-all"
              >
                Explore All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section ref={headerRef} className="relative py-32 bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#4ade80]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#22c55e]/5 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
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
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Three Ways to Connect
              <br />
              <span className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
                With Your Plants
              </span>
            </motion.h2>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function ProductsShowcase() {
  return (
    <>
      <SectionHeader />
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}
    </>
  );
}

