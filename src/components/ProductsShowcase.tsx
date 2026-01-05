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
    color: "#00e5d0",
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
    color: "#00c4b0",
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
    color: "#4df8e8",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    // Hide entire hardware section on mobile
    <div ref={sectionRef} className="hidden sm:block bg-[#0a0a0a] relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="radial-glow-top opacity-50" />
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00e5d0]/10 blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00c4b0]/8 blur-[180px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Tech grid */}
        <div className="absolute inset-0 tech-grid opacity-40" />
        {/* Neural dots */}
        <div className="absolute inset-0 neural-dots opacity-25" />
      </div>
      
      {/* Hardware Showcase */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              Beautiful <span className="text-[#00e5d0]">Hardware</span> Design
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Plantiemoji combines sophisticated sensing technology with an adorable expressive display.
              It monitors soil temperature, watering cycles, and displays status at a glance.
            </p>
          </motion.div>

          {/* Hardware Images Grid - 1 vertical + 2 horizontal on desktop, only horizontal on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">
            {/* Vertical image on the left - spans both rows, HIDDEN on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:block lg:row-span-2 rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300 glass-card-hover group relative"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(/images/plantiemoji/hardware-vertical-1.jpg)` }}
              />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00e5d0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Two horizontal images stacked on the right (full width on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[16/10] lg:col-span-2 rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300 glass-card-hover group relative"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(/images/plantiemoji/hardware-horizontal-1.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00e5d0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-[16/10] lg:col-span-2 rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300 glass-card-hover group relative"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(/images/plantiemoji/hardware-horizontal-2.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00e5d0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          {/* Sensor Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Soil Temp", desc: "Real-time soil temperature monitoring", color: "#00e5d0" },
              { label: "Watering Cycle", desc: "Smart watering schedule tracking", color: "#00c4b0" },
              { label: "Status Display", desc: "Expressive emoji feedback system", color: "#4df8e8" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="group relative text-center p-6 glass-card-glow rounded-xl border border-white/5 hover:border-[#00e5d0]/20 transition-all overflow-hidden"
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${item.color}15 0%, transparent 60%)`
                  }}
                />
                <div className="relative text-4xl font-extrabold mb-2" style={{ color: item.color }}>{item.label}</div>
                <p className="relative text-white/60">{item.desc}</p>
              </motion.div>
            ))}
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
          {/* Cyan glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5d0]/8 via-transparent to-transparent" />
          {/* Tech grid */}
          <div className="absolute inset-0 tech-grid opacity-30" />
          {/* Animated glow orb */}
          <motion.div 
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px]"
            style={{ backgroundColor: `${product.color}15` }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{ 
                backgroundColor: product.color,
              }}
              animate={{ 
                boxShadow: [`0 0 20px ${product.color}40`, `0 0 35px ${product.color}60`, `0 0 20px ${product.color}40`]
              }}
              transition={{ duration: 2, repeat: Infinity }}
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
        
        {/* Floating particles - desktop only */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const xPos = 10 + i * 12;
            const yPos = 20 + (i % 4) * 15;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                  backgroundColor: product.color,
                  opacity: 0.4
                }}
                animate={{ 
                  y: [0, -30, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Plantiemoji-specific content */}
      {isPlantiemoji && <PlantGrowthTheory />}

      {/* Dedicated Features Section */}
      <div className="py-10 sm:py-12 bg-[#0a0a0a] relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="tech-grid opacity-40" />
          {/* Animated glow */}
          <motion.div 
            className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[180px]"
            style={{ backgroundColor: `${product.color}08` }}
            animate={{ 
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Neural dots - desktop only */}
          <div className="hidden lg:block absolute inset-0 neural-dots opacity-20" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <motion.div 
                className="h-px w-8 sm:w-12" 
                style={{ backgroundColor: product.color }}
                animate={{ 
                  boxShadow: [`0 0 5px ${product.color}30`, `0 0 15px ${product.color}50`, `0 0 5px ${product.color}30`]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span 
                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium"
                style={{ color: product.color }}
              >
                Key Features
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
              What Makes{" "}
              <span style={{ color: product.color }}>{product.name}</span>
              {" "}Special
            </h3>
          </motion.div>

          {/* Features Grid - 2 columns on desktop, show only 3 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {product.features.map((feature, featureIndex) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                className={`group ${featureIndex >= 3 ? 'hidden sm:block' : ''}`}
              >
                <div 
                  className="relative p-4 sm:p-5 glass-card rounded-xl border border-white/5 hover:border-[#00e5d0]/20 transition-all duration-300 h-full overflow-hidden"
                  style={{ 
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)'
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${product.color}10 0%, transparent 50%)`
                    }}
                  />
                  
                  <div className="relative flex items-start gap-2 sm:gap-3 mb-2">
                    <motion.div
                      className="w-2 h-2 rounded-full mt-1 sm:mt-1.5 flex-shrink-0"
                      style={{ 
                        backgroundColor: product.color,
                      }}
                      whileHover={{
                        boxShadow: `0 0 15px ${product.color}80`
                      }}
                      initial={{
                        boxShadow: `0 0 10px ${product.color}60`
                      }}
                    />
                    <h4 className="text-sm sm:text-base lg:text-lg font-extrabold text-white group-hover:text-white/90 transition-colors">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="relative text-white/60 text-xs sm:text-sm leading-relaxed pl-4 sm:pl-5">
                    {feature.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(to right, ${product.color}, transparent)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="min-h-[auto] lg:min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center py-12 lg:py-16">
        {/* Enhanced background */}
        <div className="absolute inset-0">
          <div className="radial-glow opacity-25" />
          {/* Animated orbs */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px]"
            style={{ backgroundColor: `${product.color}10` }}
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.18, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Wave lines - desktop only */}
          <div className="hidden lg:block wave-lines opacity-30" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left side - Demo Photos - hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden sm:grid grid-cols-2 gap-4 min-h-[350px] lg:min-h-[500px]"
            >
              <div className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-[#00e5d0]/20 transition-all group relative">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(/images/${product.id}/demo-1.jpg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-[#00e5d0]/20 transition-all group relative">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(/images/${product.id}/demo-2.jpg)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>

            {/* Right side - Logo and Use Cases */}
            <div>
              {/* Logo above text - hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="hidden sm:block mb-6 lg:mb-8"
              >
                <div
                  className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] bg-contain bg-center bg-no-repeat rounded overflow-hidden mx-auto lg:mx-0"
                  style={{ backgroundImage: `url(${product.logoImage})` }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6 lg:mb-8"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                  Perfect <span style={{ color: product.color }}>For</span>
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {product.useCases.map((useCase, useCaseIndex) => (
                  <motion.div
                    key={useCase}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: useCaseIndex * 0.1 }}
                    className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card rounded-xl border border-white/5 hover:border-[#00e5d0]/20 transition-all overflow-hidden"
                  >
                    {/* Hover effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${product.color}08 0%, transparent 50%)`
                      }}
                    />
                    <motion.span
                      className="relative w-2 h-2 rounded-full flex-shrink-0"
                      style={{ 
                        backgroundColor: product.color,
                      }}
                      whileHover={{
                        boxShadow: `0 0 15px ${product.color}80`
                      }}
                      initial={{
                        boxShadow: `0 0 10px ${product.color}60`
                      }}
                    />
                    <span className="relative text-white/80 text-sm sm:text-base">{useCase}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Enhanced background */}
        <div className="absolute inset-0">
          <div className="wave-lines opacity-40" />
          {/* Animated center glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[150px]"
            style={{ backgroundColor: `${product.color}08` }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Tech grid */}
          <div className="absolute inset-0 tech-grid opacity-30" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6">
              Ready to Try{" "}
              <span style={{ color: product.color }}>{product.name}</span>?
            </h3>
            <p className="text-white/60 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-4">
              Join thousands of plant lovers already using {product.name} to transform
              their relationship with plants.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/contact"
                className="relative text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all text-sm sm:text-base overflow-hidden group"
                style={{ backgroundColor: product.color }}
              >
                {/* Glow effect */}
                <span 
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundColor: product.color }}
                />
                {/* Shimmer */}
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 transition-opacity" />
                <span className="relative">Get in Touch →</span>
              </Link>
              {/* Secondary CTA hidden on mobile */}
              <Link
                href="/solutions"
                className="hidden sm:inline-flex relative border border-[#00e5d0]/30 text-white px-8 py-4 rounded-lg font-medium items-center justify-center gap-2 hover:border-[#00e5d0]/60 hover:bg-[#00e5d0]/5 transition-all text-base overflow-hidden group"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0]/5 to-transparent" />
                </span>
                <span className="relative">Explore All Products</span>
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
    <section ref={headerRef} className="relative py-16 sm:py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#00e5d0]/12 to-transparent rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#00c4b0]/10 to-transparent rounded-full blur-[150px]"
          animate={{ 
            scale: [1.15, 1, 1.15],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Tech grid */}
        <div className="absolute inset-0 tech-grid opacity-40" />
        {/* Neural dots - desktop only */}
        <div className="hidden lg:block absolute inset-0 neural-dots opacity-25" />
        {/* Wave lines - desktop only */}
        <div className="hidden sm:block wave-lines opacity-30" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4 sm:mb-6"
            >
              <motion.div 
                className="h-px w-8 sm:w-12 bg-[#00e5d0]"
                animate={{ 
                  boxShadow: ['0 0 5px rgba(0, 245, 212, 0.3)', '0 0 15px rgba(0, 245, 212, 0.6)', '0 0 5px rgba(0, 245, 212, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00e5d0] font-medium">
                Our Products
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Three Ways to Connect
              <br />
              <span className="bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] bg-clip-text text-transparent">
                With Your Plants
              </span>
            </motion.h2>
          </div>

        </div>
      </div>
      
      {/* Decorative floating particles - desktop only */}
      <div className="hidden xl:block absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const xPos = 15 + i * 15;
          const yPos = 25 + (i % 3) * 20;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#00e5d0]/50"
              style={{
                left: `${xPos}%`,
                top: `${yPos}%`,
              }}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          );
        })}
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
