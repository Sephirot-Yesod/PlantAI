import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Plantiemoji from "@/components/Plantiemoji";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <Hero />
      <Solutions />
      <Plantiemoji />
      <About />
      <Newsletter />
      <Footer />
    </main>
  );
}
