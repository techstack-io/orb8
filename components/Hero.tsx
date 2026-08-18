"use client";

import { PillButton } from "@/components/ui/PillButton";
import TextType from "@/components/ui/TextType";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent">
      {/* Hero content */}
      <div className="container-shell relative z-10 grid min-h-[720px] items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="eyebrow mb-6">
            <TextType
                text="// AI-NATIVE COMPANY BUILDER"
                typingSpeed={35}
                initialDelay={250}
                loop={false}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.7}
                hideCursorWhileTyping={false}
                className="font-system text-[#c9a2ff]"
                cursorClassName="text-[#c9a2ff]"
              />
          </div>

          <h1
            className="
              font-display
              max-w-[680px]
              text-5xl
              font-normal
              leading-[1.1]
              tracking-[-0.035em]
              sm:text-6xl
              lg:text-[4.5rem]
              xl:text-[3.0rem]
            "
          >
            Building AI-Native Startups
          </h1>

          <p className="mt-8 max-w-[620px] text-[18px] leading-8 text-white/65">
            ORB8 creates companies from the ground up, combining small human
            teams with agentic systems to build and operate at a scale once
            reserved for much larger organizations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton href="#contact">Get in touch</PillButton>

            <PillButton href="#build" variant="secondary">
              See how we build
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}