import HeroSection from "../components/landing/HeroSection";
import ServicesSection from "../components/landing/ServicesSection";
import ContactForm from "../components/landing/ContactForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-cyber-darker text-white">
      <HeroSection />
      <ServicesSection />
      <ContactForm />
    </main>
  );
}
