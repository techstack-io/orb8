"use client";

import { useState } from "react";

type FredSeriesSummary = {
  id: string;
  title: string;
  frequency: string;
  units: string;
  seasonalAdjustment: string;
  lastUpdated: string;
  popularity: number;
};

type FredMatch = {
  series: FredSeriesSummary;
  change: {
    latest: {
      date: string;
      value: number;
    };
    previous: {
      date: string;
      value: number;
    };
    changePercent: number;
  } | null;
  recentObservations: {
    date: string;
    value: number;
  }[];
};

type FredResult = {
  question: string;
  searchQuery: string;
  reason: string;
  match: FredMatch | null;
  alternatives: {
    id: string;
    title: string;
    frequency: string;
    units: string;
    popularity: number;
  }[];
};

type FredResponse = {
  success: boolean;
  venture?: {
    product: string;
    audience: string | null;
    industry: string | null;
    geography: string;
    tractionProblem: string | null;
  };
  provider?: string;
  results?: FredResult[];
  error?: string;
};

const testVenture = {
  product: "AI-guided meditation and mindfulness app",
  audience:
    "Adults experiencing everyday stress, anxiety, overthinking, and emotional difficulty",
  industry: "Meditation and wellness",
  geography: "United States",
  tractionProblem:
    "Very low user acquisition and uncertainty about whether there is sufficient market demand",
};

function getDirection(changePercent: number | null | undefined) {
  if (changePercent == null) {
    return "No change data";
  }

  if (changePercent > 0) {
    return `Growing +${changePercent}%`;
  }

  if (changePercent < 0) {
    return `Declining ${changePercent}%`;
  }

  return "Flat";
}

export default function ResearchTestPage() {
  const [data, setData] = useState<FredResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function runResearch() {
    setLoading(true);
    setData(null);

    try {
      const response = await fetch("/api/research/fred", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testVenture),
      });

      const result = (await response.json()) as FredResponse;

      setData(result);
    } catch (error) {
      setData({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown research error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#120F17] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#D6FF4D]">
              ORB8 Research Test
            </p>

            <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              FRED market evidence
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">
              Test ORB8&apos;s economic research layer against a meditation and
              wellness venture.
            </p>
          </div>

          <button
            type="button"
            onClick={runResearch}
            disabled={loading}
            className="rounded-full bg-[#D6FF4D] px-6 py-3 text-sm font-semibold text-[#120F17] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Researching..." : "Run Research"}
          </button>
        </div>

        <section className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
            Venture
          </p>

          <h2 className="mt-3 text-xl font-medium">
            {testVenture.product}
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/50">
            {testVenture.tractionProblem}
          </p>
        </section>

        {!data && !loading && (
          <div className="mt-8 rounded-[24px] border border-dashed border-white/10 p-10 text-center">
            <p className="text-sm text-white/35">
              Run the research to retrieve live FRED data.
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.025] p-10">
            <p className="text-sm text-white/45">
              ORB8 is querying FRED...
            </p>
          </div>
        )}

        {data && !data.success && (
          <div className="mt-8 rounded-[24px] border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm text-red-300">
              {data.error ?? "Research failed."}
            </p>
          </div>
        )}

        {data?.success && data.results && (
          <>
            <section className="mt-8">
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Research findings
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {data.results.map((result) => (
                  <article
                    key={result.question}
                    className="rounded-[24px] border border-white/10 bg-white/[0.025] p-6"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-[#D6FF4D]">
                      FRED evidence
                    </p>

                    <h2 className="mt-4 text-xl font-medium leading-7">
                      {result.question}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-white/45">
                      {result.reason}
                    </p>

                    {result.match ? (
                      <>
                        <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/10 p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-sm font-medium text-white/85">
                              {result.match.series.title}
                            </span>

                            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
                              {result.match.series.frequency}
                            </span>
                          </div>

                          <div className="mt-5 flex items-end justify-between gap-4">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.15em] text-white/30">
                                Latest movement
                              </p>

                              <p className="mt-2 text-2xl font-medium text-[#D6FF4D]">
                                {getDirection(
                                  result.match.change?.changePercent
                                )}
                              </p>
                            </div>

                            {result.match.change && (
                              <div className="text-right">
                                <p className="text-xs text-white/35">
                                  {result.match.change.latest.date}
                                </p>

                                <p className="mt-1 text-sm text-white/65">
                                  {result.match.change.latest.value.toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="mt-5 border-t border-white/[0.07] pt-4">
                            <p className="text-xs text-white/30">
                              Series ID: {result.match.series.id}
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                              Units: {result.match.series.units}
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                              Updated: {result.match.series.lastUpdated}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="mb-3 text-[11px] uppercase tracking-[0.15em] text-white/30">
                            Recent observations
                          </p>

                          <div className="space-y-2">
                            {result.match.recentObservations.map(
                              (observation) => (
                                <div
                                  key={`${result.match?.series.id}-${observation.date}`}
                                  className="flex items-center justify-between rounded-xl border border-white/[0.05] px-4 py-3"
                                >
                                  <span className="text-xs text-white/35">
                                    {observation.date}
                                  </span>

                                  <span className="text-sm text-white/70">
                                    {observation.value.toLocaleString()}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {result.alternatives.length > 0 && (
                          <div className="mt-5">
                            <p className="mb-3 text-[11px] uppercase tracking-[0.15em] text-white/30">
                              Alternative series
                            </p>

                            <div className="space-y-2">
                              {result.alternatives.map((alternative) => (
                                <div
                                  key={alternative.id}
                                  className="rounded-xl border border-white/[0.05] px-4 py-3"
                                >
                                  <p className="text-sm text-white/55">
                                    {alternative.title}
                                  </p>

                                  <p className="mt-1 text-xs text-white/25">
                                    {alternative.id} · {alternative.frequency}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="mt-6 rounded-2xl border border-white/[0.07] p-5">
                        <p className="text-sm text-white/35">
                          No relevant FRED series found.
                        </p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[24px] border border-[#D6FF4D]/15 bg-[#D6FF4D]/[0.025] p-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#D6FF4D]">
                Preliminary ORB8 interpretation
              </p>

              <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em]">
                No obvious adjacent macro contraction.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-white/50">
                Health-care spending, health-care employment, and recreation
                services spending are currently showing positive movement in
                the retrieved FRED series. That does not prove demand for a
                meditation product, but it weakens the hypothesis that broad
                economic contraction alone explains very low acquisition.
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm text-white/40">
                  Next diagnostic focus: category demand, positioning,
                  discoverability, audience targeting, and acquisition.
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}