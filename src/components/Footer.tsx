"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = {
  products: [
    { name: "Plantiemoji", href: "/#plantiemoji" },
    { name: "EZplants", href: "/#ezplants" },
    { name: "PlantTalk", href: "/#planttalk" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Vision", href: "/vision" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={containerRef} className="bg-[#0a0a0a] border-t border-[#00e5d0]/15 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Tech grid */}
        <div className="tech-grid" />
        
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00e5d0]/8 blur-[180px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00c4b0]/6 blur-[150px]"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Neural dots - subtle in footer */}
        <div className="hidden lg:block neural-dots" />
        
        {/* Gradient overlay from top */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      </div>
      
      {/* Main Footer */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Contact */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-8 group">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-white group-hover:text-white/90 transition-colors">
                  PlantTalk
                </span>
                <motion.span 
                  className="text-lg uppercase tracking-[0.2em] text-[#00e5d0] font-medium"
                  animate={{ 
                    textShadow: ['0 0 10px rgba(0, 245, 212, 0.3)', '0 0 20px rgba(0, 245, 212, 0.5)', '0 0 10px rgba(0, 245, 212, 0.3)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  AI
                </motion.span>
              </div>
            </Link>

            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">
              Using AI to help people better interact with plants. 
              Building technology that deepens the human-nature connection.
            </p>

            <div className="space-y-3">
              <div className="text-white/60 text-sm flex items-center gap-2">
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-[#00e5d0]"
                  animate={{ 
                    boxShadow: ['0 0 5px rgba(0, 245, 212, 0.3)', '0 0 10px rgba(0, 245, 212, 0.6)', '0 0 5px rgba(0, 245, 212, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                San Francisco, CA & Remote
              </div>

              <a
                href="mailto:hello@planttalk.ai"
                className="text-white/60 text-sm hover:text-[#00e5d0] transition-colors flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c4b0] opacity-60 group-hover:opacity-100 transition-opacity" />
                hello@planttalk.ai
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-4 h-px bg-[#00e5d0]" />
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#00e5d0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#00e5d0] transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-4 h-px bg-[#00e5d0]" />
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#00e5d0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#00e5d0] transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Decorative elements - desktop only */}
      <div className="hidden xl:block absolute top-1/2 right-8 -translate-y-1/2">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-px bg-[#00e5d0]/20"
              style={{ width: `${10 + (i % 3) * 8}px` }}
              animate={{ 
                opacity: [0.15, 0.35, 0.15],
                width: [`${10 + (i % 3) * 8}px`, `${15 + (i % 3) * 10}px`, `${10 + (i % 3) * 8}px`]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-[#00e5d0]/10">
        {/* Shimmer effect on border */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 245, 212, 0.3), transparent)'
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
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="hover:text-[#00e5d0]/60 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-[#00e5d0]/20">|</span>
                  )}
                </span>
              ))}
            </div>

            <div className="text-xs text-white/30 flex items-center gap-2">
              <span>© {new Date().getFullYear()} PlantTalk AI. Made with</span>
              <motion.span 
                className="text-[#00e5d0]"
                animate={{ 
                  textShadow: ['0 0 5px rgba(0, 245, 212, 0.3)', '0 0 15px rgba(0, 245, 212, 0.6)', '0 0 5px rgba(0, 245, 212, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                love
              </motion.span>
              <span>for plants everywhere.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
