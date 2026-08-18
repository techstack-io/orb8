export function Header() {
  return (
    <header className="border-b hairline">
      <div className="container-shell flex h-20 items-center justify-between">
      <a
        href="/"
        className="flex items-center gap-2"
        aria-label="ORB8 home"
      >
        <img
          src="/logos/orb8logo.png"
          alt=""
          className="h-24 w-24"
        />
      </a>

        <nav className="hidden gap-8 text-xs uppercase tracking-[0.14em] text-white/70 md:flex">
          <a href="#thesis">Thesis</a>
          <a href="#build">How we build</a>
          <a href="#ventures">Ventures</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
