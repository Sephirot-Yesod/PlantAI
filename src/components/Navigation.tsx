"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    name: "Plantiemoji",
    href: "/#plantiemoji",
    description: "Smart sensors that speak in emojis",
    color: "#00e5d0",
  },
  {
    name: "EZplants",
    href: "/#ezplants",
    description: "AI-powered plant diagnosis & growth optimization",
    color: "#4df8e8",
  },
  {
    name: "PlantTalk",
    href: "/#planttalk",
    description: "Converse with your plants through AI agents",
    color: "#00c4b0",
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-[#00e5d0]/15 shadow-[0_4px_30px_rgba(0,245,212,0.08)]"
            : "bg-transparent"
        }`}
      >
        {/* Subtle shimmer line on scroll */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-px w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0, 245, 212, 0.4), transparent)'
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        )}
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center mt-6 -ml-7"
              >
                <Image
                  src="/images/logos/logo.jpg"
                  alt="PlantTalk AI"
                  width={260}
                  height={78}
                  className="h-[73px] lg:h-[83px] w-auto invert"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Solutions Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("solutions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/70 hover:text-[#00e5d0] transition-colors">
                  Solutions
                  <motion.span 
                    className="text-xs ml-1 opacity-60 group-hover:text-[#00e5d0]"
                    animate={activeDropdown === "solutions" ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeDropdown === "solutions" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="glass-card-glow bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#00e5d0]/15 rounded-xl shadow-2xl shadow-[#00e5d0]/10 p-6 min-w-[400px] relative overflow-hidden">
                        {/* Gradient background glow */}
                        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-[#00e5d0]/15 to-transparent pointer-events-none" />
                        
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-[#00e5d0]/50 to-transparent" />
                        <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-[#00e5d0]/50 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-12 h-px bg-gradient-to-l from-[#00e5d0]/50 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-[#00e5d0]/50 to-transparent" />
                        
                        {/* Tech grid subtle background */}
                        <div className="absolute inset-0 tech-grid-dense opacity-20 rounded-xl" />
                        
                        <div className="relative space-y-1">
                          {products.map((product, index) => (
                            <motion.div
                              key={product.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <Link
                                href={product.href}
                                className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-[#00e5d0]/5 transition-all border border-transparent hover:border-[#00e5d0]/15"
                              >
                                <motion.div 
                                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                  style={{ backgroundColor: product.color }}
                                  whileHover={{ 
                                    boxShadow: `0 0 15px ${product.color}80`
                                  }}
                                />
                                <div>
                                  <h4 className="font-semibold text-white group-hover/item:text-[#00e5d0] transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-white/50 group-hover/item:text-white/60">
                                    {product.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        <div className="relative mt-4 pt-4 border-t border-[#00e5d0]/15">
                          <Link
                            href="/solutions"
                            className="text-sm text-[#00e5d0] hover:text-[#4df8e8] font-medium transition-colors inline-flex items-center gap-1 group/link"
                          >
                            View All Solutions 
                            <span className="transition-transform group-hover/link:translate-x-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/vision"
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-[#00e5d0] transition-colors group"
              >
                Vision
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#00e5d0] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              <Link
                href="/about"
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-[#00e5d0] transition-colors group"
              >
                About
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#00e5d0] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              {/* CTA with enhanced glow effect */}
              <Link
                href="/contact"
                className="relative bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 group overflow-hidden"
              >
                {/* Glow effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                {/* Shimmer effect */}
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30 transition-opacity" />
                <span className="relative">Get in Touch</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#00e5d0] transition-colors relative"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <span className="text-2xl">✕</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </motion.div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-2xl lg:hidden"
          >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-1/4 right-0 w-96 h-96 bg-[#00e5d0]/12 rounded-full blur-[150px] pointer-events-none"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.12, 0.18, 0.12]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#00c4b0]/10 rounded-full blur-[120px] pointer-events-none"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Tech grid */}
              <div className="absolute inset-0 tech-grid opacity-20" />
            </div>
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute inset-y-0 right-0 w-full max-w-md bg-[#0a0a0a]/60 backdrop-blur-xl border-l border-[#00e5d0]/15"
            >
              <div className="pt-24 px-6 pb-6 h-full overflow-y-auto">
                <div className="space-y-4">
                  <div className="pb-4 border-b border-[#00e5d0]/15">
                    <h3 className="text-xs uppercase tracking-wider text-[#00e5d0]/60 mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#00e5d0]/40" />
                      Solutions
                    </h3>
                    {products.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={product.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-3 text-white/80 hover:text-[#00e5d0] transition-colors group"
                        >
                          <motion.span 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: product.color }}
                            whileHover={{ boxShadow: `0 0 10px ${product.color}` }}
                          />
                          {product.name}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto">→</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    className="space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Link
                      href="/vision"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-[#00e5d0] transition-colors group"
                    >
                      Vision
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-[#00e5d0] transition-colors group"
                    >
                      About
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </motion.div>

                  <motion.div 
                    className="pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] text-black w-full block text-center py-4 rounded-lg font-semibold shadow-lg shadow-[#00e5d0]/25 overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00e5d0] to-[#00c4b0] blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                      <span className="relative">Get in Touch</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
