import { useState } from "react";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/sections/Hero";
import { TransitionStrip } from "@/sections/TransitionStrip";
import { About } from "@/sections/About";
import { Challenge } from "@/sections/Challenge";
import { Solution } from "@/sections/Solution";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { WhyUs } from "@/sections/WhyUs";
import { Statement } from "@/sections/Statement";
import { Partners } from "@/sections/Partners";
import { Pricing } from "@/sections/Pricing";
import { Audience } from "@/sections/Audience";
import { FinalCTA } from "@/sections/FinalCTA";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Cursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1001] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TransitionStrip />
        <About />
        <Challenge />
        <Solution />
        <Services />
        <Process />
        <WhyUs />
        <Statement />
        <Partners />
        <Pricing />
        <Audience />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
