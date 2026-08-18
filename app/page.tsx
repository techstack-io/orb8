import GradientWaves from "@/components/GradientWaves";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BuildModel } from "@/components/BuildModel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120f17]">
      {/* Full-page Gradient Waves */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={0.8}
          opacity={0.75}
          grain
          grainIntensity={0.05}
          mouseInteraction={false}
          parallaxStrength={0.5}
        />
      </div>

      {/* Everything above Gradient Waves */}
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