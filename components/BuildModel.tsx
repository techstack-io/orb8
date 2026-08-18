"use client";

import { useState } from "react";
import LineSidebar from "@/components/ui/LineSidebar";

const principles = [
  {
    title: "People + agents",
    lead: "Human judgment where it matters. Machine capability everywhere else.",
    body:
      "Small teams remain responsible for direction, judgment, and accountability. Agentic systems expand their ability to execute, analyze, and operate.",
  },
  {
    title: "AI-native by design",
    lead: "Companies designed for AI from day one, not retrofitted later.",
    body:
      "Workflows, tools, memory, automation, and human oversight are designed together from the beginning rather than added to a traditional organization later.",
  },
  {
    title: "Systemize the work",
    lead: "Repeatable work becomes infrastructure.",
    body:
      "When a workflow proves useful, ORB8 turns it into a reusable capability rather than solving the same operational problem again and again.",
  },
  {
    title: "Build to endure",
    lead: "Technology changes quickly. Durable companies should not.",
    body:
      "ORB8 uses emerging AI capabilities aggressively without making any single model, vendor, or tool the foundation of the company.",
  },
];

export function BuildModel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = principles[activeIndex];

  return (
    <section id="build" className="container-shell py-24">
      <div className="eyebrow">// 02 — How we build</div>

      <h2 className="mt-4 text-4xl tracking-[-0.03em]">
        An agentic operating model.
      </h2>

      <div className="mt-16 grid gap-16 lg:grid-cols-[360px_1fr] lg:gap-24">
        <div>
          <LineSidebar
            items={principles.map((item) => item.title)}
            accentColor="#5eead4"
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
            {String(principles.length).padStart(2, "0")}
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