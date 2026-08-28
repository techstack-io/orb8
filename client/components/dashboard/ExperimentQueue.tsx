const experiments = [
    {
      priority: "01",
      title: "Test positioning against the highest-intent audience",
      description:
        "Create two landing-page variants using language extracted from high-confidence customer evidence.",
      evidence: "Positioning constraint",
      impact: "High",
    },
    {
      priority: "02",
      title: "Validate willingness to act",
      description:
        "Run a commitment test with a concrete offer rather than another interest survey.",
      evidence: "Demand uncertainty",
      impact: "High",
    },
    {
      priority: "03",
      title: "Narrow the initial audience",
      description:
        "Compare conversion behavior across the two strongest audience clusters.",
      evidence: "Audience ambiguity",
      impact: "Medium",
    },
  ];
  
  export default function ExperimentQueue() {
    return (
      <div className="rounded-[22px] border border-white/[0.08] bg-black/30">
        <div className="border-b border-white/[0.08] px-7 py-6">
          <div className="font-system text-[10px] uppercase tracking-[0.2em] text-white/35">
            Experiment Queue
          </div>
  
          <h2 className="mt-2 font-heading text-[22px] font-semibold">
            What ORB8 recommends testing next
          </h2>
        </div>
  
        {experiments.map((experiment) => (
          <div
            key={experiment.priority}
            className="grid gap-5 border-b border-white/[0.06] px-7 py-6 last:border-b-0 lg:grid-cols-[60px_1fr_160px_100px]"
          >
            <div className="font-system text-[12px] text-white/25">
              {experiment.priority}
            </div>
  
            <div>
              <div className="font-heading text-[17px] font-medium">
                {experiment.title}
              </div>
  
              <p className="mt-2 max-w-[720px] text-[13px] leading-6 text-white/40">
                {experiment.description}
              </p>
            </div>
  
            <div>
              <div className="font-system text-[8px] uppercase tracking-[0.16em] text-white/25">
                Evidence
              </div>
  
              <div className="mt-2 text-[12px] text-white/55">
                {experiment.evidence}
              </div>
            </div>
  
            <div>
              <div className="font-system text-[8px] uppercase tracking-[0.16em] text-white/25">
                Impact
              </div>
  
              <div className="mt-2 text-[12px] text-[#CDF414]">
                {experiment.impact}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }