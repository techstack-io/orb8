export default function RecommendedExperiment() {
    return (
      <div className="rounded-[22px] border border-[#CDF414]/15 bg-[#CDF414]/[0.035] p-7">
        <div className="font-system text-[10px] uppercase tracking-[0.2em] text-[#CDF414]">
          Recommended Next Test
        </div>
  
        <h2 className="mt-5 font-heading text-[28px] font-semibold leading-tight">
          Test the positioning before adding more traffic.
        </h2>
  
        <p className="mt-5 text-[14px] leading-7 text-white/50">
          Current evidence suggests acquisition volume is not the primary
          constraint. Test whether sharper differentiation improves commitment
          before investing in additional reach.
        </p>
  
        <div className="mt-8 space-y-4 border-t border-white/[0.08] pt-6">
          <div className="flex justify-between">
            <span className="font-system text-[9px] uppercase tracking-[0.16em] text-white/30">
              Expected learning
            </span>
  
            <span className="text-[12px] text-white/65">High</span>
          </div>
  
          <div className="flex justify-between">
            <span className="font-system text-[9px] uppercase tracking-[0.16em] text-white/30">
              Effort
            </span>
  
            <span className="text-[12px] text-white/65">Low</span>
          </div>
  
          <div className="flex justify-between">
            <span className="font-system text-[9px] uppercase tracking-[0.16em] text-white/30">
              Confidence
            </span>
  
            <span className="text-[12px] text-[#CDF414]">87%</span>
          </div>
        </div>
  
        <button className="mt-8 w-full rounded-full bg-white px-5 py-3 font-system text-[10px] font-semibold uppercase tracking-[0.14em] text-[#120F17]">
          Create Experiment
        </button>
      </div>
    );
  }