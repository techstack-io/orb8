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
                text="// AI-NATIVE VENTURE STUDIO"
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
              max-w-[780px]
              text-5xl
              font-normal
              leading-[1.05]
              tracking-[-0.035em]
              sm:text-6xl
              lg:text-[4.5rem]
            "
          >
            <span className="block">Find the market.</span>
            <span className="block">Build the system.</span>
          </h1>

          <p className="mt-8 max-w-[620px] text-[18px] leading-8 text-white/65">
            Most startups automate their assumptions before testing them.
            ORB8 builds startups the other way: discover what the market actually says, then build the system that serves it.
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
