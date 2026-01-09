import HeroGravity from "@/components/sections/HeroGravity";
import Services from "@/components/sections/Services";

import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import ParticleBackground from "@/components/effects/ParticleBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      <ParticleBackground />
      <HeroGravity />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
