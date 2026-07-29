import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { PricingSection } from "./components/PricingSection";
import { Testimonial } from "./components/Testimonial";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <PricingSection />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
