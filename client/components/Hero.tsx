"use client";

import DotField from "@/components/react-bits/DotField";
import { PillButton } from "@/components/ui/PillButton";
import TextType from "@/components/react-bits/TextType";
import BlurText from "@/components/react-bits/BlurText";

const interests = [
  "Document intelligence",
  "Technical search",
  "Agentic systems",
  "Applied AI",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#120F17]">
      {/* Interactive background */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(168, 85, 247, 0.35)"
          gradientTo="rgba(180, 151, 207, 0.25)"
          glowColor="#120F17"
        />
      </div>

      <div
        className="
          container-shell relative z-10
          grid min-h-[720px] items-center gap-16 py-20
          lg:grid-cols-[0.95fr_auto_1.05fr]
        "
      >
        {/* LEFT: ORB8 SYSTEM PANEL */}
        <div className="hidden lg:flex lg:justify-start">
          <div
            className="
              w-full max-w-[550px]
              rounded-[22px]
              border border-white/10
              bg-black/55
              p-8
              backdrop-blur-md
            "
          >
            {/* Panel header */}
            <div className="mb-8 flex items-center justify-between">
              <span className="font-system text-[11px] uppercase tracking-[0.2em] text-white/40">
                ORB8 / CURRENT INTERESTS
              </span>

              <span className="font-system text-[10px] uppercase tracking-[0.16em] text-[#CDF414]">
                ● BUILDING
              </span>
            </div>

            {/* Animated terminal line */}
            <div className="min-h-[42px]">
              <span className="mr-2 font-system text-[#CDF414]">&gt;</span>

              <TextType
                text={[
                  "building applied AI systems",
                  "exploring document intelligence",
                  "rethinking technical search",
                  "designing useful AI products",
                ]}
                typingSpeed={42}
                pauseDuration={1500}
                deletingSpeed={22}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                className="font-system text-[14px] uppercase tracking-[0.1em] text-[#CDF414]"
                cursorClassName="text-[#CDF414]"
              />
            </div>

            {/* Interests */}
            <div className="mt-7 border-y border-white/10 py-6">
              <div className="mb-5 font-system text-[9px] uppercase tracking-[0.18em] text-white/35">
                Areas of focus
              </div>

              <div className="space-y-4">
                {interests.map((interest, index) => (
                  <div
                    key={interest}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-system text-[10px] text-white/25">
                        0{index + 1}
                      </span>

                      <span className="font-system text-[13px] uppercase tracking-[0.12em] text-white/75">
                        {interest}
                      </span>
                    </div>

                    <span className="text-[#CDF414]">→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current project */}
            <div className="mt-7">
              <div className="font-system text-[9px] uppercase tracking-[0.18em] text-white/35">
                Current build
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-system text-[15px] uppercase tracking-[0.12em] text-[#dab5f6]">
                    Clark AI Engineering
                  </div>

                  <p className="mt-2 text-[13px] leading-6 text-white/45">
                    Document intelligence for commercial AV engineering.
                  </p>
                </div>
              </div>
            </div>

            {/* Stack */}
            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="font-system text-[9px] uppercase tracking-[0.18em] text-white/35">
                Working with
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {["Python", "FastAPI", "Next.js", "Postgres", "LLMs"].map(
                  (item) => (
                    <span
                      key={item}
                      className="
                        rounded-full border border-white/15
                        px-3 py-1
                        font-system text-[9px] uppercase
                        tracking-[0.12em] text-white/55
                      "
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spacing column */}
        <div className="hidden h-[420px] w-px bg-transparent lg:block" />

        {/* RIGHT: PERSONAL HERO */}
        <div className="max-w-[760px]">
          <div className="mb-6 font-system text-[10px] uppercase tracking-[0.22em] text-[#CDF414]">
            Applied AI / Product Engineering
          </div>

          <h1
            className="
              font-heading
              text-[3.4rem]
              font-semibold
              leading-[1.02]
              tracking-[-0.025em]
              sm:text-[4.3rem]
              lg:text-[5rem]
            "
          >
            <BlurText
              text="I build intelligent systems."
              animateBy="words"
              direction="top"
              delay={140}
              stepDuration={0.45}
              className="text-white"
              animationFrom={{
                filter: "blur(14px)",
                opacity: 0,
                y: 24,
              }}
              animationTo={[
                {
                  filter: "blur(5px)",
                  opacity: 0.6,
                  y: 6,
                },
                {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                },
              ]}
            />
          </h1>

          <p className="mt-8 max-w-[600px] text-[17px] leading-8 text-white/60">
            I&apos;m Dan Collins, an AI engineer focused on applied AI,
            document intelligence, technical search, and product development.
          </p>

          <p className="mt-4 max-w-[600px] text-[17px] leading-8 text-white/45">
            I build systems that turn complex information into useful tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton href="#work">
              View my work
            </PillButton>

            <PillButton href="#writing" variant="secondary">
              Read my writing
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
