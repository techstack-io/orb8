"use client";

import MosaicWaves from "@/components/react-bits/mosaic-waves";
import { PillButton } from "@/components/ui/PillButton";
import TextType from "@/components/ui/TextType";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#120F17]">
      <MosaicWaves
        className="absolute inset-0 z-0"
        width="100%"
        height="100%"
        pitch={10}
        fill={0.7}
        shape="dot"
        color="#A855F7"
        hotColor="#E9D5FF"
        backgroundColor="#120F17"
        falloff={7}
        vignette={0.35}
        opacity={0.8}
      />

      <div className="container-shell relative z-10 grid min-h-[720px] items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT */}
        <div className="max-w-[760px]">
          <div className="eyebrow mb-7">
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
              text-[3.4rem]
              font-normal
              leading-[1.04]
              tracking-[-0.045em]
              sm:text-[4.3rem]
              lg:text-[5.1rem]
            "
          >
            <span className="block">Find the market.</span>
            <span className="block text-white/70">
              Build the system.
            </span>
          </h1>

          <p className="mt-8 max-w-[560px] text-[17px] leading-8 text-white/60">
            ORB8 discovers what the market is actually telling you, validates
            the opportunity, and then builds the system around the evidence.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton href="#contact">Start a venture</PillButton>

            <PillButton href="#build" variant="secondary">
              See the system
            </PillButton>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block">
          <div className="ml-auto w-full max-w-[460px] rounded-[28px] border border-white/10 bg-black/25 p-7 backdrop-blur-md">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-system text-[11px] uppercase tracking-[0.2em] text-white/45">
                ORB8 SYSTEM
              </span>

              <span className="h-2 w-2 rounded-full bg-[#c9a2ff]" />
            </div>

            <div className="space-y-3">
              {[
                ["01", "Market Discovery"],
                ["02", "Problem Validation"],
                ["03", "Opportunity Model"],
                ["04", "System Build"],
              ].map(([num, label]) => (
                <div
                  key={num}
                  className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4"
                >
                  <span className="font-system text-[11px] text-[#c9a2ff]">
                    {num}
                  </span>

                  <span className="text-[15px] text-white/75">
                    {label}
                  </span>

                  <span className="ml-auto text-white/20">→</span>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="font-system text-[10px] uppercase tracking-[0.18em] text-white/35">
                Evidence before execution
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}