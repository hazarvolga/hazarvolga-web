import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import AboutContact from "@/components/sections/AboutContact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Work />
      <Process />
      <AboutContact />
    </main>
  );
}
