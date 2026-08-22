import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BuildModel } from "@/components/BuildModel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120f17]">
      <Header />
      <Hero />

      <section id="thesis">
        {/* thesis content */}
      </section>

      <BuildModel />

      <section id="ventures">
        {/* ventures content */}
      </section>

      <section id="contact">
        {/* contact content */}
      </section>
    </main>
  );
}