"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import Link from "next/link";

type View = "overview" | "market" | "evidence" | "hypotheses" | "experiments";
const sections: { id: View; label: string; number: string; description: string }[] = [
  { id: "overview", label: "Overview", number: "01", description: "Evaluation workspace" },
  { id: "market", label: "Market research", number: "02", description: "External demand signals" },
  { id: "evidence", label: "Customer evidence", number: "03", description: "Surveys and observed behavior" },
  { id: "hypotheses", label: "Hypotheses", number: "04", description: "Assumptions to validate" },
  { id: "experiments", label: "Experiments", number: "05", description: "Commercial validation tests" },
];

const assumptions = [
  { title: "A clear customer problem exists", detail: "What evidence demonstrates the problem and its urgency?" },
  { title: "Customers will pay for a solution", detail: "What behavior demonstrates willingness to pay?" },
  { title: "The business can acquire customers sustainably", detail: "What are the acquisition costs and repeat-use patterns?" },
];

const card = "rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6";
const label = "font-mono text-[10px] uppercase tracking-[0.18em] text-white/40";

export default function Home() {
  const [view, setView] = useState<View>("overview");
  const params = useParams<{ id: string }>();
  const [venture, setVenture] = useState("Loading venture...");
  const [found, setFound] = useState(false);
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("orb8_ventures") || "[]");
      const selected = Array.isArray(items) ? items.find((v: { id: string; name: string }) => v.id === params.id) : null;
      if (selected && typeof selected.name === "string") { setVenture(selected.name); setDraftVenture(selected.name); setFound(true); }
      else { setVenture("Venture not found"); setFound(false); }
    } catch { setVenture("Venture not found"); setFound(false); }
  }, [params.id]);
  const [editingVenture, setEditingVenture] = useState(false);
  const [draftVenture, setDraftVenture] = useState("");
  const current = sections.find((item) => item.id === view)!;

  return (
    <main className="min-h-screen bg-[#120f17] text-[#f6f3f9]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-5 pt-5 sm:px-8"><Link href="/ventures" className="text-xs text-white/50 hover:text-[#CDF414]">← My ventures</Link></div>
      {!found && venture === "Venture not found" ? <div className="mx-auto max-w-5xl p-8">Venture not found in this browser. <Link className="text-[#CDF414]" href="/ventures">View ventures</Link></div> : <>

      <div className="mx-auto grid max-w-[1500px] md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 p-5 md:min-h-[calc(100vh-85px)] md:border-b-0 md:border-r md:p-6">
          <p className={label}>Workspace</p>
          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible" aria-label="Research sections">
            {sections.map((item) => (
              <button key={item.id} type="button" onClick={() => setView(item.id)} aria-current={view === item.id ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors md:w-full ${view === item.id ? "bg-[#CDF414]/10 text-[#CDF414]" : "text-white/55 hover:bg-white/5 hover:text-white"}`}>
                <span className="font-mono text-[10px] opacity-60">{item.number}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-10 hidden rounded-xl border border-white/10 bg-white/[0.025] p-4 md:block">
            <p className={label}>Research principle</p>
            <p className="mt-3 text-sm leading-6 text-white/60">Separate what people say from what they actually do.</p>
          </div>
        </aside>

        <div className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className={label}>ORB8 / {current.number} — {current.label}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{view === "overview" ? "Venture intelligence." : current.label + "."}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">{view === "overview" ? "Investigate demand, distinguish evidence from assumptions, and decide what to test next." : current.description}</p>
            </div>
            <div className="min-w-[230px] rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
              <p className={label}>Active venture</p>
              {editingVenture ? (
                <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (draftVenture.trim()) { setVenture(draftVenture.trim()); const items = JSON.parse(localStorage.getItem("orb8_ventures") || "[]"); if (Array.isArray(items)) localStorage.setItem("orb8_ventures", JSON.stringify(items.map((v: { id: string; name: string }) => v.id === params.id ? { ...v, name: draftVenture.trim() } : v))); } setEditingVenture(false); }}>
                  <input autoFocus aria-label="Venture name" value={draftVenture} onChange={(e) => setDraftVenture(e.target.value)} className="min-w-0 flex-1 rounded border border-white/20 bg-[#120f17] px-2 py-1 text-sm outline-none focus:border-[#CDF414]" />
                  <button type="submit" className="text-xs text-[#CDF414]">Save</button>
                </form>
              ) : (
                <button type="button" onClick={() => { setDraftVenture(venture); setEditingVenture(true); }} className="mt-2 flex w-full items-center justify-between gap-3 text-left text-lg font-semibold hover:text-[#CDF414]">
                  {venture} <span className="text-xs font-normal text-white/40">Edit</span>
                </button>
              )}
            </div>
          </div>

          {view === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  { eyebrow: "Research", title: "Market signals", text: "Explore demand indicators and external market context.", target: "market" as View },
                  { eyebrow: "Evidence", title: "Customer behavior", text: "Organize interviews, surveys, usage, and purchasing evidence.", target: "evidence" as View },
                  { eyebrow: "Decision", title: "Next best test", text: "Define the commercial question to validate before scaling.", target: "experiments" as View },
                ].map((item) => (
                  <button key={item.target} type="button" onClick={() => setView(item.target)} className={card + " text-left transition-colors hover:border-[#CDF414]/40"}>
                    <p className={label}>{item.eyebrow}</p>
                    <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/50">{item.text}</p>
                    <p className="mt-7 text-xs font-medium text-[#CDF414]">Open workspace →</p>
                  </button>
                ))}
              </div>
              <section className={card}>
                <p className={label}>Current evaluation focus</p>
                <h2 className="mt-3 text-2xl font-semibold">Does {venture} have demonstrated market demand?</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">Establish who needs the product, which alternatives they use, and what actions demonstrate commitment.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Market demand", "Customer segments", "Willingness to pay", "Acquisition economics"].map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">{tag}</span>)}
                </div>
              </section>
            </div>
          )}

          {view === "market" && (
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                ["Search demand", "Google Trends", "Investigate interest and seasonality around the problem and competing solutions."],
                ["Demographic context", "Data Commons", "Identify relevant populations and socioeconomic characteristics."],
                ["Economic context", "World Bank", "Review broader economic indicators where relevant."],
                ["Competitive landscape", "Research input", "Document existing products, substitutes, positioning, and pricing."],
              ].map(([title, source, description]) => (
                <section key={title} className={card}>
                  <p className={label}>{source}</p>
                  <h2 className="mt-3 text-xl font-semibold">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/55">{description}</p>
                  <p className="mt-6 text-xs text-white/35">No live results loaded in this workspace.</p>
                </section>
              ))}
              <p className="text-sm text-white/45 lg:col-span-2">The Python backend already contains market collection and diagnosis routes. Live results will appear here once the frontend is connected to those endpoints.</p>
            </div>
          )}

          {view === "evidence" && (
            <div className="space-y-5">
              <section className={card}>
                <p className={label}>Evidence pipeline / Planned</p>
                <h2 className="mt-3 text-2xl font-semibold">From customer feedback to behavioral evidence.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">Future ingestion will support survey responses, UAT transcripts, interviews, and observed product events. The analysis must preserve source attribution and distinguish positive sentiment from demonstrated commitment.</p>
              </section>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["01", "Collect", "Pollfish responses, interviews, UAT transcripts, usage records."],
                  ["02", "Classify", "Sentiment, politeness, stated intent, reported behavior."],
                  ["03", "Corroborate", "Check claims against transactions and other observed actions."],
                ].map(([number, title, description]) => (
                  <section key={number} className={card}>
                    <p className="font-mono text-sm text-[#CDF414]">{number}</p>
                    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
                  </section>
                ))}
              </div>
            </div>
          )}

          {view === "hypotheses" && (
            <div className="space-y-4">
              <p className="text-sm text-white/45">Starting hypotheses for discussion — not research findings or validated claims.</p>
              {assumptions.map((item, index) => (
                <section key={item.title} className={card + " flex flex-wrap items-start gap-4"}>
                  <span className="font-mono text-sm text-[#CDF414]">H{index + 1}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/50">{item.detail}</p>
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/55">Unverified</span>
                </section>
              ))}
            </div>
          )}

          {view === "experiments" && (
            <div className="space-y-5">
              <section className={card}>
                <p className={label}>Candidate experiment / Not launched</p>
                <h2 className="mt-3 text-2xl font-semibold">Test a real paid offer before scaling acquisition.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">Select one customer segment and a specific, deliverable report. Measure qualified traffic, checkout starts, completed purchases, acquisition cost, and customer feedback. Define decision thresholds before launching.</p>
              </section>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Target segment", "To be selected", "Compare urgency and existing alternatives."],
                  ["Offer and price", "To be validated", "Use a deliverable offer with clear terms."],
                  ["Success criteria", "To be defined", "Base thresholds on sample size and unit economics."],
                ].map(([heading, value, description]) => (
                  <section key={heading} className={card}>
                    <p className={label}>{heading}</p>
                    <h3 className="mt-4 text-lg font-semibold">{value}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
                  </section>
                ))}
              </div>
            </div>
          )}
          <footer className="mt-16 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/30">ORB8 / Evidence before assumptions</footer>
        </div>
      </div></> 
    </main>
  );
}
