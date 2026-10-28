
import Link from "next/link";
import { Header } from "@/components/Header";
import Ferrofluid from "@/components/Ferrofluid";

const steps = [
  {
    number: "01",
    title: "Investigate",
    description:
      "Understand your market, customers, competitors, and demand signals.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Separate evidence from assumptions and identify potential traction constraints.",
  },
  {
    number: "03",
    title: "Validate",
    description:
      "Design focused experiments to test what matters before investing further.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0A10] text-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#070609]">

        {/* FERROFLUID ANIMATION */}
        <div
          className="absolute inset-0 z-0"
          style={{ width: "100%", height: "100%", position: "absolute" }}
          aria-hidden="true"
        >
          <Ferrofluid
            colors={["#ffffff", "#ffffff", "#ffffff"]}
            spikeHeight={1}
            sharpness={2.5}
            tilt={48}
            mouseInteraction
            clickPulse
          />
        </div>

        {/* HERO CONTENT */}
        <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-28">
          <div className="max-w-4xl">

            <p className="mb-7 font-mono text-xs uppercase tracking-[0.25em] text-[#CDF414]">
              Market intelligence / Venture validation
            </p>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
              What’s holding your business back.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">
              ORB8 investigates your market, customers,
              competitors, and demand signals to help you
              understand what’s working, what’s uncertain,
              and what to test next.
            </p>

            <div className="pointer-events-auto mt-10 flex flex-wrap gap-4">

              <Link
                href="/onboarding"
                className="rounded-full bg-[#CDF414] px-7 py-3.5 font-semibold text-[#120f17] transition hover:bg-[#dfff35]"
              >
                Start an evaluation
              </Link>

              <Link
                href="#how-it-works"
                className="rounded-full border border-white/20 px-7 py-3.5 text-white/80 transition hover:border-white/50"
              >
                How ORB8 works
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* HOW ORB8 WORKS */}
      <section
        id="how-it-works"
        className="border-t border-white/10 bg-white/[0.02] py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#CDF414]">
            The ORB8 process
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            Evidence before assumptions.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-8"
              >
                <span className="font-mono text-sm text-[#CDF414]">
                  {step.number}
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-white/50">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
