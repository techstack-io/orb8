const stages = [
    {
      name: "Visibility",
      score: 72,
      detail: "Market demand exists and relevant search activity is present.",
      color: "bg-[#CDF414]",
    },
    {
      name: "Audience",
      score: 64,
      detail:
        "Interest is present, but the strongest audience segment is still unclear.",
      color: "bg-white/55",
    },
    {
      name: "Demand",
      score: 58,
      detail:
        "Problem discussion is observable, but buying intent remains mixed.",
      color: "bg-white/55",
    },
    {
      name: "Conversion",
      score: 31,
      detail:
        "Evidence suggests positioning is not translating interest into action.",
      color: "bg-[#DAB5F6]",
    },
  ];
  
  export default function TractionDiagnostic() {
    return (
      <div className="rounded-[22px] border border-white/[0.08] bg-black/30 p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-system text-[10px] uppercase tracking-[0.2em] text-white/35">
              Traction Diagnostic
            </div>
  
            <h2 className="mt-2 font-heading text-[24px] font-semibold">
              Where momentum is breaking
            </h2>
          </div>
  
          <div className="font-system text-[9px] uppercase tracking-[0.16em] text-white/30">
            Visibility → Audience → Demand → Conversion
          </div>
        </div>
  
        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="border-t border-white/[0.08] pt-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-system text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {stage.name}
                </span>
  
                <span className="font-system text-[12px] text-white/65">
                  {stage.score}%
                </span>
              </div>
  
              <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${stage.color}`}
                  style={{ width: `${stage.score}%` }}
                />
              </div>
  
              <p className="mt-5 text-[13px] leading-6 text-white/40">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }