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
  },
  {
    name: "EZplants",
    href: "/#ezplants",
    description: "AI-powered plant diagnosis & growth optimization",
  },
  {
    name: "PlantTalk",
    href: "/#planttalk",
    description: "Converse with your plants through AI agents",
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
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
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
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                  Solutions
                  <span className="text-xs ml-1 opacity-60">▼</span>
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
                      <div className="bg-[#141414] border border-white/10 rounded shadow-2xl p-6 min-w-[380px]">
                        <div className="space-y-1">
                          {products.map((product) => (
                            <Link
                              key={product.name}
                              href={product.href}
                              className="group/item flex flex-col gap-1 p-3 rounded hover:bg-white/5 transition-colors"
                            >
                              <h4 className="font-semibold text-white group-hover/item:text-[#4ade80] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-white/50">
                                {product.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <Link
                            href="/solutions"
                            className="text-sm text-[#4ade80] hover:text-[#86efac] font-medium transition-colors"
                          >
                            View All Solutions →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/vision"
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Vision
              </Link>

              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              {/* CTA */}
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black px-6 py-3 rounded font-semibold text-sm hover:shadow-lg hover:shadow-green-500/25 transition-all hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
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
            className="fixed inset-0 z-40 bg-[#0a0a0a] lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute inset-y-0 right-0 w-full max-w-md bg-[#141414] border-l border-white/10"
            >
              <div className="pt-24 px-6 pb-6 h-full overflow-y-auto">
                <div className="space-y-4">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="text-xs uppercase tracking-wider text-white/40 mb-4">
                      Solutions
                    </h3>
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-white/80 hover:text-[#4ade80] transition-colors"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <Link
                      href="/vision"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-white hover:text-[#4ade80] transition-colors"
                    >
                      Vision
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-white hover:text-[#4ade80] transition-colors"
                    >
                      About
                    </Link>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black w-full block text-center py-4 rounded font-semibold"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
