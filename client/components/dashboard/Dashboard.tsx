"use client";

import { Header } from "@/components/Header";
import { useState } from "react";
import TextType from "@/components/react-bits/TextType";

import DashboardHeader from "./DashboardHeader";
import DiagnosisSummary from "./DiagnosisSummary";
import TractionDiagnostic from "./TractionDiagnostic";
import EvidencePanel from "./EvidencePanel";
import RecommendedExperiment from "./RecommendedExperiment";
import ExperimentQueue from "./ExperimentQueue";

export default function Dashboard() {
  const [diagnosisStarted, setDiagnosisStarted] = useState(false);
  const [hasDiagnosis, setHasDiagnosis] = useState(false);
  const [ventureDescription, setVentureDescription] = useState("");

  // ---------------------------------------------------------
  // STATE 1: DIAGNOSTIC AGENT
  // ---------------------------------------------------------

  if (diagnosisStarted && !hasDiagnosis) {
    return (
      <main className="min-h-screen bg-[#120F17] text-white">
        <Header />

        <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
          <DashboardHeader />

          <section className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
            <div className="grid min-h-[620px] lg:grid-cols-[1.15fr_0.85fr]">
              {/* Agent conversation */}
              <div className="flex flex-col border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
                <div className="mb-10 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#D6FF4D]" />

                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                    Diagnostic agent
                  </span>

                  <span className="rounded-full border border-[#D6FF4D]/20 bg-[#D6FF4D]/5 px-3 py-1 text-[11px] text-[#D6FF4D]">
                    In progress
                  </span>
                </div>

                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Venture context
                  </p>

                  <h1 className="mt-5 text-4xl font-medium leading-[1.15] tracking-[-0.04em] sm:text-5xl">
                    Let&apos;s establish what we&apos;re diagnosing.
                  </h1>

                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/55">
                    Tell ORB8 what you&apos;re building, who it&apos;s for, and
                    what traction problem you&apos;re experiencing.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="rounded-2xl border border-white/[0.07] bg-black/10 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#D6FF4D]">
                      ORB8
                    </p>

                    <p className="mt-3 text-base leading-7 text-white/80">
                      What are you building, who is it for, and what seems to be
                      going wrong with traction?
                    </p>
                  </div>

                  <textarea
                    value={ventureDescription}
                    onChange={(event) =>
                      setVentureDescription(event.target.value)
                    }
                    placeholder="Example: Mettavia is an AI meditation companion for people dealing with everyday emotional difficulty. We have very little traction and I don't know whether the problem is positioning, audience, or acquisition."
                    className="mt-4 min-h-[180px] w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#D6FF4D]/40"
                  />
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
                  <button
                    type="button"
                    disabled={!ventureDescription.trim()}
                    onClick={() => setHasDiagnosis(true)}
                    className="rounded-full bg-[#D6FF4D] px-6 py-3.5 text-sm font-semibold text-[#120F17] transition enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    onClick={() => setDiagnosisStarted(false)}
                    className="rounded-full border border-white/10 px-6 py-3.5 text-sm text-white/55 transition hover:border-white/20 hover:text-white"
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Pipeline */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="mb-7 text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Diagnostic pipeline
                </p>

                <div className="space-y-3">
                  {[
                    {
                      number: "01",
                      title: "Venture context",
                      status: "Active",
                      active: true,
                    },
                    {
                      number: "02",
                      title: "Market research",
                      status: "Waiting",
                      active: false,
                    },
                    {
                      number: "03",
                      title: "Evidence collection",
                      status: "Waiting",
                      active: false,
                    },
                    {
                      number: "04",
                      title: "Constraint analysis",
                      status: "Waiting",
                      active: false,
                    },
                    {
                      number: "05",
                      title: "Experiment design",
                      status: "Waiting",
                      active: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.number}
                      className={`grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-2xl border p-5 ${
                        item.active
                          ? "border-[#D6FF4D]/25 bg-[#D6FF4D]/[0.035]"
                          : "border-white/[0.07] bg-black/10"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          item.active ? "text-[#D6FF4D]" : "text-white/25"
                        }`}
                      >
                        {item.number}
                      </span>

                      <span className="text-sm font-medium text-white/85">
                        {item.title}
                      </span>

                      <span
                        className={`text-xs ${
                          item.active ? "text-[#D6FF4D]" : "text-white/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-7">
                  <p className="text-sm leading-6 text-white/35">
                    ORB8 will use your answers to build the venture context,
                    determine what evidence is missing, and decide when external
                    market research should be run.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------
  // STATE 2: FIRST LOGIN / NO DIAGNOSIS
  // ---------------------------------------------------------

  if (!hasDiagnosis) {
    return (
      <main className="min-h-screen bg-[#120F17] text-white">
        <Header />

        <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
          <DashboardHeader />

          <section className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
            <div className="grid min-h-[620px] lg:grid-cols-[1.15fr_0.85fr]">
              {/* Left */}
              <div className="flex flex-col justify-between border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
                <div>
                  <div className="mb-10 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#D6FF4D]" />

                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                      Diagnosis status
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55">
                      Not started
                    </span>
                  </div>

                  <p className="mb-5 text-xs uppercase tracking-[0.18em] text-white/40">
                    Evidence before answers
                  </p>

                  <h1 className="max-w-4xl text-4xl font-medium leading-[1.4] tracking-[-0.045em] sm:text-5xl lg:text-4xl">
                    <TextType
                      text="Diagnose what is blocking traction."
                      typingSpeed={60}
                      showCursor
                      cursorCharacter="|"
                      loop={false}
                    />
                  </h1>

                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                    ORB8 analyzes your product, market, customer, and behavioral
                    evidence to identify the constraint most likely preventing
                    traction.
                  </p>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setDiagnosisStarted(true)}
                    className="rounded-full bg-[#D6FF4D] px-6 py-3.5 text-sm font-semibold text-[#120F17] transition hover:brightness-95"
                  >
                    Start Diagnosis
                  </button>

                  <span className="text-sm text-white/35">
                    Your metrics appear after ORB8 has evidence to analyze.
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="mb-7 text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Diagnostic pipeline
                </p>

                <div className="space-y-3">
                  {[
                    {
                      number: "01",
                      title: "Venture context",
                      status: "Waiting",
                    },
                    {
                      number: "02",
                      title: "Market research",
                      status: "Waiting",
                    },
                    {
                      number: "03",
                      title: "Evidence collection",
                      status: "Waiting",
                    },
                    {
                      number: "04",
                      title: "Constraint analysis",
                      status: "Waiting",
                    },
                    {
                      number: "05",
                      title: "Experiment design",
                      status: "Waiting",
                    },
                  ].map((item) => (
                    <div
                      key={item.number}
                      className="grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-5"
                    >
                      <span className="text-xs text-[#D6FF4D]">
                        {item.number}
                      </span>

                      <span className="text-sm font-medium text-white/85">
                        {item.title}
                      </span>

                      <span className="text-xs text-white/30">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------
  // STATE 3: COMPLETED DIAGNOSIS
  // ---------------------------------------------------------

  return (
    <main className="min-h-screen bg-[#120F17] text-white">
      <Header />

      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">
        <DashboardHeader />

        <section className="mt-8">
          <DiagnosisSummary />
        </section>

        <section className="mt-5">
          <TractionDiagnostic />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <EvidencePanel />
          <RecommendedExperiment />
        </section>

        <section className="mt-5">
          <ExperimentQueue />
        </section>
      </div>
    </main>
  );
}