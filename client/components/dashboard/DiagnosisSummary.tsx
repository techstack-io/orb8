function ScoreRing({
    score,
    label,
  }: {
    score: number;
    label: string;
  }) {
    return (
      <div className="flex items-center gap-4">
        <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
          <div className="font-system text-[25px] text-white">{score}</div>
          <div className="absolute inset-[7px] rounded-full border border-[#CDF414]/30" />
        </div>
  
        <div>
          <div className="font-system text-[9px] uppercase tracking-[0.2em] text-white/35">
            {label}
          </div>
          <div className="mt-1 text-[13px] text-white/55">
            Evidence confidence
          </div>
        </div>
      </div>
    );
  }
  
  export default function DiagnosisSummary() {
    return (
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div className="rounded-[22px] border border-white/[0.08] bg-black/30 p-7">
          <div className="flex items-center justify-between">
            <div className="font-system text-[10px] uppercase tracking-[0.2em] text-white/35">
              Primary Constraint
            </div>
  
            <div className="font-system text-[9px] uppercase tracking-[0.16em] text-[#DAB5F6]">
              High confidence
            </div>
          </div>
  
          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-heading text-[44px] font-semibold leading-none text-[#DAB5F6] sm:text-[58px]">
                Positioning
              </div>
  
              <p className="mt-5 max-w-[720px] text-[16px] leading-7 text-white/55">
                Prospects appear to understand the underlying problem, but current
                messaging does not make the product sufficiently differentiated
                from existing alternatives.
              </p>
            </div>
  
            <div className="shrink-0">
              <ScoreRing score={87} label="Diagnosis" />
            </div>
          </div>
        </div>
  
        <div className="rounded-[22px] border border-white/[0.08] bg-black/30 p-7">
          <div className="font-system text-[10px] uppercase tracking-[0.2em] text-white/35">
            Evidence Collected
          </div>
  
          <div className="mt-8 font-heading text-[48px] font-semibold">327</div>
  
          <div className="mt-2 text-[13px] text-white/40">
            normalized market signals
          </div>
  
          <div className="mt-8 border-t border-white/[0.08] pt-5 font-system text-[9px] uppercase tracking-[0.16em] text-white/35">
            6 active sources
          </div>
        </div>
  
        <div className="rounded-[22px] border border-white/[0.08] bg-black/30 p-7">
          <div className="font-system text-[10px] uppercase tracking-[0.2em] text-white/35">
            Confidence
          </div>
  
          <div className="mt-8 font-heading text-[48px] font-semibold">81%</div>
  
          <div className="mt-2 text-[13px] text-white/40">
            overall diagnostic confidence
          </div>
  
          <div className="mt-8 border-t border-white/[0.08] pt-5 font-system text-[9px] uppercase tracking-[0.16em] text-[#CDF414]">
            Evidence sufficient
          </div>
        </div>
      </div>
    );
  }