"use client";

import { useState } from "react";
import LineSidebar from "@/components/ui/LineSidebar";

const diagnosticSteps = [
  {
    title: "Observe the signal",
    lead:
      "Start with what is actually happening, not what you think is happening.",
    body:
      "ORB8 examines traffic, acquisition, customer behavior, conversion, retention, reviews, competitors, and market signals to establish the evidence.",
  },
  {
    title: "Locate the break",
    lead: "Find the point where momentum stops.",
    body:
      "ORB8 traces the problem across visibility, audience, message, demand, conversion, and retention to isolate the most likely failure point.",
  },
  {
    title: "Test the cause",
    lead: "Turn assumptions into evidence.",
    body:
      "ORB8 identifies what needs to be learned and designs focused experiments to distinguish the real cause from plausible explanations.",
  },
  {
    title: "Make the next move",
    lead: "Act on the highest-value evidence first.",
    body:
      "ORB8 turns the diagnosis into a specific next test, what to measure, and what the result means for the venture.",
  },
];

export function BuildModel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = diagnosticSteps[activeIndex];

  return (
    <section id="build" className="container-shell py-24">
      <div className="eyebrow !text-[#d1c5ea]">// 02 — HOW ORB8 DIAGNOSES</div>

      <h2 className="mt-4 max-w-3xl text-4xl tracking-[-0.03em] md:text-5xl">
        Find where the signal breaks.
      </h2>

      <div className="mt-16 grid gap-16 lg:grid-cols-[360px_1fr] lg:gap-24">
        <div>
          <LineSidebar
            items={diagnosticSteps.map((item) => item.title)}
            accentColor="#D6FF4D"
            textColor="#777d82"
            markerColor="#303438"
            showIndex
            showMarker
            proximityRadius={90}
            maxShift={14}
            falloff="smooth"
            markerLength={48}
            markerGap={16}
            tickScale={0.6}
            scaleTick
            itemGap={30}
            fontSize={1.05}
            smoothing={120}
            defaultActive={0}
            onItemClick={(index) => setActiveIndex(index)}
          />
        </div>

        <div className="border-l hairline pl-8 lg:pl-14">
          <div className="text-xs uppercase tracking-[0.16em] text-white/35">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(diagnosticSteps.length).padStart(2, "0")}
          </div>

          <h3 className="mt-6 text-3xl tracking-[-0.025em]">
            {active.title}
          </h3>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            {active.lead}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">
            {active.body}
          </p>
        </div>
      </div>
    </section>
  );
}