
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-[#120f17]">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="ORB8 home">
          <img
            src="/logos/orb8-cgpt2.png"
            alt="ORB8"
            className="h-18 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/#how-it-works"
            className="hidden text-white/60 hover:text-white sm:block"
          >
            How it works
          </Link>

          <Link
            href="/dashboard"
            className="hidden text-white/60 hover:text-white sm:block"
          >
            Dashboard
          </Link>

          <Link
            href="/onboarding"
            className="rounded-full bg-[#CDF414] px-5 py-2.5 font-semibold text-[#120f17]"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
