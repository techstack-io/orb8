const evidence = [
    {
      source: "Google Trends",
      signal: "Search demand",
      score: 78,
      finding:
        "Consistent interest across several adjacent problem categories.",
    },
    {
      source: "Reddit",
      signal: "Problem frequency",
      score: 84,
      finding:
        "Users repeatedly describe the problem in their own language.",
    },
    {
      source: "Competitor Reviews",
      signal: "Unmet need",
      score: 71,
      finding:
        "Existing products solve parts of the problem but create recurring friction.",
    },
    {
      source: "YouTube",
      signal: "Audience behavior",
      score: 62,
      finding:
        "Strong educational interest, but relatively weak product-directed intent.",
    },
  ];
  
  export default function EvidencePanel() {
    return (
      <div className="rounded-[22px] border border-white/[0.08] bg-black/30">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-7 py-6">
          <div>
            <div className="font-system text-[10px] uppercase tracking-[0.2em] text-white/35">
              Evidence
            </div>
  
            <h2 className="mt-2 font-heading text-[22px] font-semibold">
              What the market is telling us
            </h2>
          </div>
  
          <button className="font-system text-[9px] uppercase tracking-[0.16em] text-[#CDF414]">
            View all evidence
          </button>
        </div>
  
        <div>
          {evidence.map((item) => (
            <div
              key={item.source}
              className="grid gap-4 border-b border-white/[0.06] px-7 py-5 last:border-b-0 md:grid-cols-[130px_150px_70px_1fr]"
            >
              <div className="font-system text-[11px] text-white/70">
                {item.source}
              </div>
  
              <div className="text-[13px] text-white/45">{item.signal}</div>
  
              <div className="font-system text-[13px] text-[#CDF414]">
                {item.score}
              </div>
  
              <div className="text-[13px] leading-6 text-white/50">
                {item.finding}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }