export function Header() {
  return (
    <header className="border-b hairline">
      <div className="container-shell flex h-24 items-center justify-between">
        <div className="flex items-center gap-7">
          <a href="/" className="flex items-center" aria-label="ORB8 home">
            <img
              src="/logos/orb8-cgpt2.png"
              alt="ORB8"
              className="h-18 w-auto"
            />
          </a>

          <div className="hidden h-5 w-px bg-white/15 sm:block" />

          <span className="hidden font-system text-[10px] uppercase tracking-[0.2em] text-white/50 sm:block">
            Dan Collins / AI Engineer
          </span>
        </div>

        <nav className="hidden gap-8 text-xs uppercase tracking-[0.14em] text-white/70 md:flex">
          <a className="transition-colors hover:text-[#CDF414]" href="#work">
            Work
          </a>
          <a className="transition-colors hover:text-[#CDF414]" href="#writing">
            Writing
          </a>
          <a className="transition-colors hover:text-[#CDF414]" href="#about">
            About
          </a>
          <a className="transition-colors hover:text-[#CDF414]" href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
