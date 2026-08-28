export default function DashboardHeader() {
    return (
      <header className="flex flex-col gap-6 border-b border-white/[0.08] pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-system text-[10px] uppercase tracking-[0.22em] text-[#CDF414]">
            ORB8 / Venture Diagnosis
          </div>
  
          <h1 className="mt-3 font-heading text-[34px] font-semibold tracking-[-0.02em] sm:text-[42px]">
            Mettavia
          </h1>
  
          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-white/45">
            Evidence-based traction diagnosis across market visibility, audience
            fit, demand, and conversion.
          </p>
        </div>
  
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-white/10 px-4 py-2 font-system text-[9px] uppercase tracking-[0.15em] text-white/45">
            Updated 12 min ago
          </div>
  
          <button className="rounded-full bg-[#CDF414] px-5 py-2.5 font-system text-[10px] font-semibold uppercase tracking-[0.14em] text-[#120F17]">
            Run Diagnosis
          </button>
        </div>
      </header>
    );
  }