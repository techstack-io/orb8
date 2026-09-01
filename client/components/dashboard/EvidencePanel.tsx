import React from "react";
import Link from "next/link";

const evidence = [
  {
  source: "Pollfish",
  type: "Primary research",
  signal: "Concept validation",
  score: null,
  finding:
    "Direct respondent evidence from the Mettavia concept test. Open the survey analysis for question-level results and segment findings.",
  href: "/dashboard/evidence",
  primary: true,
  },
  {
    source: "DataForSEO",
    type: "Behavioral",
    signal: "Search demand",
    score: null,
    finding:
      "Search-interest evidence across core meditation and problem-intent terms.",
  },
  {
    source: "Competitor Reviews",
    type: "Market",
    signal: "Unmet need",
    score: null,
    finding:
      "Review evidence can surface recurring friction, dissatisfaction, and unmet expectations.",
  },
];

export default function EvidencePanel() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#120F17]/10 bg-white">
      <div className="flex flex-col gap-4 border-b border-[#120F17]/10 px-7 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#120F17]/35">
            Evidence
          </div>

          <h2 className="mt-2 font-heading text-[22px] font-semibold text-[#120F17]">
            What the evidence is telling us
          </h2>

          <p className="mt-2 max-w-[620px] text-[13px] leading-6 text-[#120F17]/45">
            Behavioral, market, and primary-research signals supporting the
            current venture diagnosis.
          </p>
        </div>

        <button
          type="button"
          className="font-system text-[9px] uppercase tracking-[0.16em] text-[#778A00]"
        >
          View all evidence
        </button>
      </div>

      <div>
        {evidence.map((item) => {
          if (item.primary && item.href) {
            return (
              <Link
                key={item.source}
                href={item.href}
                className="group grid gap-4 border-b border-white/[0.08] bg-[#120F17] px-7 py-6 text-white transition-colors hover:bg-[#1A1621] md:grid-cols-[130px_130px_150px_1fr_auto] md:items-center"
              >
                <div>
                  <div className="font-system text-[11px] font-medium text-white">
                    {item.source}
                  </div>

                  <div className="mt-1 font-system text-[8px] uppercase tracking-[0.14em] text-[#CDF414]">
                    Primary
                  </div>
                </div>

                <div className="text-[12px] text-white/40">
                  {item.type}
                </div>

                <div className="text-[13px] text-white/60">
                  {item.signal}
                </div>

                <div className="text-[13px] leading-6 text-white/50">
                  {item.finding}
                </div>

                <div className="font-system text-[10px] uppercase tracking-[0.14em] text-[#CDF414] transition-transform group-hover:translate-x-1">
                  Open →
                </div>
              </Link>
            );
          }

          return (
            <div
              key={item.source}
              className="grid gap-4 border-b border-[#120F17]/[0.07] px-7 py-5 last:border-b-0 md:grid-cols-[130px_130px_150px_1fr] md:items-center"
            >
              <div className="font-system text-[11px] text-[#120F17]/75">
                {item.source}
              </div>

              <div className="font-system text-[10px] uppercase tracking-[0.12em] text-[#120F17]/35">
                {item.type}
              </div>

              <div className="text-[13px] text-[#120F17]/55">
                {item.signal}
              </div>

              <div className="text-[13px] leading-6 text-[#120F17]/45">
                {item.finding}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
