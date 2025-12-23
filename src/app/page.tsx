import Navigation from "@/components/Navigation";
import CESLanding from "@/components/CESLanding";
import Hero from "@/components/Hero";
import ProductsShowcase from "@/components/ProductsShowcase";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <CESLanding />
      <Hero />
      <ProductsShowcase />
      <About />
      <Newsletter />
      <Footer />
    </main>
  );
}
