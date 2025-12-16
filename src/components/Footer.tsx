"use client";

import Link from "next/link";

const footerLinks = {
  products: [
    { name: "EZplants", href: "/solutions/ezplants" },
    { name: "PlantTalk", href: "/solutions/planttalk" },
    { name: "Plantiemoji", href: "/solutions/plantiemoji" },
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
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  PlantTalk
                </span>
                <span className="text-lg uppercase tracking-[0.2em] text-[#4ade80] font-medium">
                  AI
                </span>
              </div>
            </Link>

            <p className="text-white/50 text-sm mb-6 max-w-xs">
              Using AI to help people better interact with plants. 
              Building technology that deepens the human-nature connection.
            </p>

            <div className="space-y-3">
              <div className="text-white/60 text-sm">
                San Francisco, CA & Remote
              </div>

              <a
                href="mailto:hello@planttalk.ai"
                className="text-white/60 text-sm hover:text-white transition-colors block"
              >
                hello@planttalk.ai
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#4ade80] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#4ade80] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="hover:text-white/60 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-white/10">|</span>
                  )}
                </span>
              ))}
            </div>

            <div className="text-xs text-white/30 flex items-center gap-2">
              <span>© {new Date().getFullYear()} PlantTalk AI. Made with</span>
              <span className="text-[#4ade80]">love</span>
              <span>for plants everywhere.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
