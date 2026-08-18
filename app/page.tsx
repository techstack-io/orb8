import { Aurora } from "@/components/Aurora";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BuildModel } from "@/components/BuildModel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120f17]">
      {/* Full-page Aurora */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Aurora
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          amplitude={1}
          blend={0.5}
        />
      </div>

      {/* Everything above Aurora */}
      <div className="relative z-10">
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
      </div>
    </main>
  );
}