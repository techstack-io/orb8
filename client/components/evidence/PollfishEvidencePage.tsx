import React from "react";

type PollfishSignal = {
  label: string;
  strength: "Strong" | "Moderate" | "Weak" | "Uncertain" | "Emerging";
  score?: number;
  finding: string;
};

type PollfishMetric = {
  label: string;
  value: string;
  note?: string;
};

type PollfishSegment = {
  segment: string;
  value: string;
  index?: string;
  note?: string;
};

type PollfishQuestion = {
  id: string;
  question: string;
  responses: Array<{
    label: string;
    count?: number;
    percent?: number;
  }>;
};

type PollfishEvidence = {
  surveyTitle: string;
  venture: string;
  respondentCount?: number;
  statusLabel?: string;
  metrics: PollfishMetric[];
  signals: PollfishSignal[];
  segments: PollfishSegment[];
  questions: PollfishQuestion[];
  conclusion?: string;
  known?: string[];
  unknown?: string[];
  recommendedTest?: {
    title: string;
    description: string;
    emphasis?: string;
  };
};

/*
 * IMPORTANT:
 *
 * These arrays are intentionally empty.
 *
 * We will populate them with the ACTUAL Pollfish workbook results
 * rather than hard-coding the illustrative numbers from the mockup.
 */
const pollfishEvidence: PollfishEvidence = {
  surveyTitle: "Single Product Concept Testing",
  venture: "Mettavia",
  statusLabel: "Primary Research",
  metrics: [],
  signals: [],
  segments: [],
  questions: [],
  known: [],
  unknown: [],
};

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#120F17]/10 bg-white px-5 py-5">
      <div className="font-system text-[9px] uppercase tracking-[0.18em] text-[#120F17]/45">
        {label}
      </div>

      <div className="mt-3 font-heading text-[28px] font-semibold tracking-[-0.025em] text-[#120F17]">
        {value}
      </div>

      {note && (
        <div className="mt-1 text-[12px] leading-5 text-[#120F17]/45">
          {note}
        </div>
      )}
    </div>
  );
}

function SignalBadge({
  strength,
}: {
  strength: PollfishSignal["strength"];
}) {
  const classes: Record<PollfishSignal["strength"], string> = {
    Strong: "bg-[#CDF414]/20 text-[#536700]",
    Moderate: "bg-[#E9D8FF] text-[#6F45A2]",
    Weak: "bg-[#FFD9D2] text-[#A74532]",
    Uncertain: "bg-[#FFE8B7] text-[#996300]",
    Emerging: "bg-[#DCE9FF] text-[#315D9C]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 font-system text-[9px] uppercase tracking-[0.14em] ${classes[strength]}`}
    >
      {strength}
    </span>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-dashed border-[#120F17]/15 bg-[#FAF9F6] px-5 py-6 text-[13px] leading-6 text-[#120F17]/45">
      {children}
    </div>
  );
}

export default function PollfishEvidencePage() {
  const data = pollfishEvidence;

  const hasMetrics = data.metrics.length > 0;
  const hasSignals = data.signals.length > 0;
  const hasSegments = data.segments.length > 0;
  const hasQuestions = data.questions.length > 0;

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#120F17]">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10">

        {/* HEADER */}

        <header className="border-b border-[#120F17]/10 pb-7">
          <div className="font-system text-[10px] uppercase tracking-[0.22em] text-[#778A00]">
            ORB8 / Evidence / Pollfish
          </div>

          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-[34px] font-semibold tracking-[-0.025em] sm:text-[42px]">
                  Pollfish Survey Results
                </h1>

                <span className="rounded-full bg-[#E9D8FF] px-3 py-1 font-system text-[9px] uppercase tracking-[0.14em] text-[#6F45A2]">
                  {data.statusLabel}
                </span>
              </div>

              <p className="mt-2 text-[14px] leading-6 text-[#120F17]/50">
                {data.surveyTitle} · {data.venture}
                {data.respondentCount
                  ? ` · n=${data.respondentCount.toLocaleString()}`
                  : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-full border border-[#120F17]/10 bg-white px-5 py-2.5 font-system text-[9px] uppercase tracking-[0.14em] text-[#120F17]/65">
                Export Evidence
              </button>

              <button className="rounded-full bg-[#120F17] px-5 py-2.5 font-system text-[9px] font-semibold uppercase tracking-[0.14em] text-[#CDF414]">
                Create Experiment
              </button>
            </div>
          </div>
        </header>

        {/* METRICS */}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {hasMetrics ? (
            data.metrics.slice(0, 5).map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))
          ) : (
            <>
              <MetricCard
                label="Respondents"
                value="—"
                note="Awaiting Pollfish data"
              />

              <MetricCard
                label="Concept Appeal"
                value="—"
                note="Awaiting Pollfish data"
              />

              <MetricCard
                label="Purchase Intent"
                value="—"
                note="Awaiting Pollfish data"
              />

              <MetricCard
                label="Top Segment"
                value="—"
                note="Awaiting Pollfish data"
              />

              <MetricCard
                label="Field Dates"
                value="—"
                note="Awaiting Pollfish data"
              />
            </>
          )}
        </section>

        {/* SIGNALS + ORB8 INTERPRETATION */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">

          <div className="rounded-[22px] border border-[#120F17]/10 bg-white">
            <div className="border-b border-[#120F17]/10 px-7 py-6">
              <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#120F17]/35">
                Key Signals
              </div>

              <h2 className="mt-2 font-heading text-[22px] font-semibold">
                What respondents are telling us
              </h2>
            </div>

            <div className="p-5">
              {hasSignals ? (
                <div className="divide-y divide-[#120F17]/10">
                  {data.signals.map((signal) => (
                    <div
                      key={signal.label}
                      className="grid gap-3 px-2 py-5 md:grid-cols-[180px_110px_70px_1fr] md:items-center"
                    >
                      <div className="font-system text-[11px] text-[#120F17]/75">
                        {signal.label}
                      </div>

                      <SignalBadge strength={signal.strength} />

                      <div className="font-system text-[13px] text-[#778A00]">
                        {signal.score ?? "—"}
                      </div>

                      <div className="text-[13px] leading-6 text-[#120F17]/52">
                        {signal.finding}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState>
                  Signal analysis will populate from the actual Pollfish survey
                  results. No survey percentages are hard-coded here.
                </EmptyState>
              )}
            </div>
          </div>

          <div className="rounded-[22px] border border-[#120F17]/10 bg-[#120F17] p-7 text-white">
            <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#CDF414]">
              ORB8 / Interpretation
            </div>

            <h2 className="mt-3 max-w-lg font-heading text-[27px] font-semibold leading-tight tracking-[-0.025em]">
              Evidence first. Recommendation second.
            </h2>

            {data.conclusion ? (
              <p className="mt-5 text-[14px] leading-7 text-white/60">
                {data.conclusion}
              </p>
            ) : (
              <p className="mt-5 text-[14px] leading-7 text-white/45">
                Once the Pollfish results are loaded, ORB8 will synthesize the
                actual respondent evidence here and identify what the survey
                supports, contradicts, or leaves unresolved.
              </p>
            )}

            {data.recommendedTest && (
              <div className="mt-7 rounded-[18px] border border-[#CDF414]/20 bg-[#CDF414]/[0.05] p-5">
                <div className="font-system text-[9px] uppercase tracking-[0.16em] text-[#CDF414]">
                  Recommended next test
                </div>

                <div className="mt-3 font-heading text-xl font-semibold">
                  {data.recommendedTest.title}
                </div>

                <p className="mt-2 text-[13px] leading-6 text-white/55">
                  {data.recommendedTest.description}
                </p>

                {data.recommendedTest.emphasis && (
                  <div className="mt-4 font-system text-[12px] text-[#CDF414]">
                    {data.recommendedTest.emphasis}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* SEGMENTS + QUESTIONS */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">

          <div className="rounded-[22px] border border-[#120F17]/10 bg-white">
            <div className="border-b border-[#120F17]/10 px-7 py-6">
              <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#120F17]/35">
                Segments
              </div>

              <h2 className="mt-2 font-heading text-[22px] font-semibold">
                Who is most responsive?
              </h2>
            </div>

            <div className="p-5">
              {hasSegments ? (
                <div className="divide-y divide-[#120F17]/10">
                  {data.segments.map((segment) => (
                    <div
                      key={segment.segment}
                      className="grid gap-2 px-2 py-4 sm:grid-cols-[1fr_auto_auto]"
                    >
                      <div>
                        <div className="text-[13px] font-medium">
                          {segment.segment}
                        </div>

                        {segment.note && (
                          <div className="mt-1 text-[12px] leading-5 text-[#120F17]/45">
                            {segment.note}
                          </div>
                        )}
                      </div>

                      <div className="font-system text-[13px] text-[#120F17]/75">
                        {segment.value}
                      </div>

                      <div className="font-system text-[12px] text-[#778A00]">
                        {segment.index ?? ""}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState>
                  Segment rankings will appear once we derive the actual
                  cross-tabs from the Pollfish responses.
                </EmptyState>
              )}
            </div>
          </div>

          <div className="rounded-[22px] border border-[#120F17]/10 bg-white">
            <div className="flex items-end justify-between gap-5 border-b border-[#120F17]/10 px-7 py-6">
              <div>
                <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#120F17]/35">
                  By Question
                </div>

                <h2 className="mt-2 font-heading text-[22px] font-semibold">
                  Survey response distribution
                </h2>
              </div>

              <span className="font-system text-[9px] uppercase tracking-[0.14em] text-[#120F17]/35">
                {data.questions.length} questions
              </span>
            </div>

            <div className="p-5">
              {hasQuestions ? (
                <div className="space-y-4">
                  {data.questions.slice(0, 4).map((question, index) => (
                    <div
                      key={question.id}
                      className="rounded-[18px] border border-[#120F17]/10 bg-[#FAF9F6] p-5"
                    >
                      <div className="font-system text-[9px] uppercase tracking-[0.16em] text-[#778A00]">
                        Q{String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="mt-2 text-[14px] font-medium leading-6">
                        {question.question}
                      </h3>

                      <div className="mt-4 space-y-3">
                        {question.responses.map((response) => (
                          <div key={response.label}>
                            <div className="mb-1.5 flex items-center justify-between gap-4 text-[12px]">
                              <span className="text-[#120F17]/60">
                                {response.label}
                              </span>

                              <span className="font-system text-[#120F17]/65">
                                {response.percent != null
                                  ? `${response.percent.toFixed(1)}%`
                                  : response.count ?? "—"}
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-[#120F17]/10">
                              <div
                                className="h-full rounded-full bg-[#CDF414]"
                                style={{
                                  width: `${Math.max(
                                    0,
                                    Math.min(
                                      100,
                                      response.percent ?? 0
                                    )
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState>
                  Question charts will render here once we connect the actual
                  Pollfish response distributions.
                </EmptyState>
              )}
            </div>
          </div>
        </section>

        {/* KNOWN / UNKNOWN */}

        <section className="mt-5 grid gap-5 lg:grid-cols-2">

          <div className="rounded-[22px] border border-[#120F17]/10 bg-white p-7">
            <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#778A00]">
              What we know
            </div>

            {data.known && data.known.length > 0 ? (
              <ul className="mt-5 space-y-3 text-[13px] leading-6 text-[#120F17]/60">
                {data.known.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#778A00]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[13px] leading-6 text-[#120F17]/45">
                ORB8 will only list findings directly supported by the survey.
              </p>
            )}
          </div>

          <div className="rounded-[22px] border border-[#120F17]/10 bg-white p-7">
            <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#996300]">
              What remains uncertain
            </div>

            {data.unknown && data.unknown.length > 0 ? (
              <ul className="mt-5 space-y-3 text-[13px] leading-6 text-[#120F17]/60">
                {data.unknown.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#996300]">?</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[13px] leading-6 text-[#120F17]/45">
                Unresolved hypotheses will appear here after the survey
                evidence is analyzed.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
