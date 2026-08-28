"use client";

import DotField from "@/components/react-bits/DotField";
import { PillButton } from "@/components/ui/PillButton";
import TextType from "@/components/react-bits/TextType";
import CountUp from "@/components/react-bits/CountUp";
import BlurText from "@/components/react-bits/BlurText";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#120F17]">
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
          lg:grid-cols-[1.05fr_auto_0.95fr]
        "
      >
        {/* LEFT: EVIDENCE ENGINE */}
        <div className="hidden lg:flex lg:justify-start">
          <div
            className="
              w-full
              max-w-[550px]
              rounded-[22px]
              border border-white/10
              bg-black/55
              p-8
              backdrop-blur-md
            "
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-system text-[11px] uppercase tracking-[0.2em] text-white/40">
                ORB8 / EVIDENCE ENGINE
              </span>

              <span className="font-system text-[10px] uppercase tracking-[0.16em] text-[#CDF414]">
                ● ANALYZING
              </span>
            </div>

            <div className="min-h-[42px]">
              <span className="mr-2 font-system text-[#CDF414]">&gt;</span>

              <TextType
                text={[
                  "scanning market signals",
                  "mapping competitive positions",
                  "analyzing customer evidence",
                  "testing demand hypothesis",
                  "pattern detected",
                ]}
                typingSpeed={42}
                pauseDuration={1300}
                deletingSpeed={22}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                className="font-system text-[14px] uppercase tracking-[0.1em] text-[#CDF414]"
                cursorClassName="text-[#CDF414]"
              />
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 border-y border-white/10 py-6">
              <div>
                <div className="font-system text-[22px] text-white">327</div>
                <div className="mt-1 font-system text-[9px] uppercase tracking-[0.15em] text-white/35">
                  Signals
                </div>
              </div>

              <div>
                <div className="font-system text-[22px] text-white">14</div>
                <div className="mt-1 font-system text-[9px] uppercase tracking-[0.15em] text-white/35">
                  Competitors
                </div>
              </div>

              <div>
                <div className="font-system text-[22px] text-white">8</div>
                <div className="mt-1 font-system text-[9px] uppercase tracking-[0.15em] text-white/35">
                  Patterns
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="font-system text-[10px] uppercase tracking-[0.18em] text-white/35">
                Pattern detected
              </div>

              <p className="mt-3 max-w-[430px] text-[15px] leading-7 text-white/65">
                Prospects understand the problem, but they don't understand why
                this solution is different.
              </p>
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="font-system text-[9px] uppercase tracking-[0.18em] text-white/35">
                Primary constraint
              </div>

              <div className="mt-2 flex items-baseline gap-4">
                <div className="font-system text-[16px] uppercase tracking-[0.12em] text-[#dab5f6]">
                  Positioning
                </div>

                <div className="font-system text-[28px] text-[#dab5f6]">
                  <CountUp
                    from={0}
                    to={87}
                    separator=","
                    direction="up"
                    duration={1}
                    delay={0}
                    className="count-up-text"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="hidden h-[420px] w-px bg-transparent lg:block" />{" "}
        {/* RIGHT: HERO COPY */}
        <div className="max-w-[760px]">
          <h1
            className="
                    font-heading
                    text-[3.4rem]
                    font-semibold
                    leading-[1.04]
                    tracking-[-0.02em]
                    sm:text-[4.3rem]
                    lg:text-[5.0rem]
                  "
          >
            <BlurText
              text="Need Traction?"
              animateBy="words"
              direction="top"
              delay={180}
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

          <p className="mt-8 max-w-[560px] text-[17px] leading-8 text-white/60">
            ORB8 finds out why your venture isn't gaining traction. We diagnose
            where the breakdown is happening, then turn real market and customer
            evidence into the next experiment you should run.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton href="#contact">Diagnose</PillButton>

            <PillButton href="#build" variant="secondary">
              See how it works
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
