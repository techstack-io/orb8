"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function PillButton({ href, children }: PillButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverLabelRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const circle = circleRef.current;

    if (!button || !circle) return;

    const { width: w, height: h } = button.getBoundingClientRect();

    const R = ((w * w) / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta =
      Math.ceil(
        R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))
      ) + 1;

    const originY = D - delta;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`,
    });

    gsap.set(labelRef.current, { y: 0 });

    gsap.set(hoverLabelRef.current, {
      y: h + 20,
      opacity: 0,
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(
      circle,
      {
        scale: 1.2,
        duration: 0.5,
        ease: "power3.out",
      },
      0
    );

    tl.to(
      labelRef.current,
      {
        y: -(h + 8),
        duration: 0.5,
        ease: "power3.out",
      },
      0
    );

    tl.to(
      hoverLabelRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      0
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseEnter={() => timelineRef.current?.play()}
      onMouseLeave={() => timelineRef.current?.reverse()}
      className="
        relative
        inline-flex
        h-[46px]
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-white
        px-7
        text-xs
        font-semibold
        uppercase
        tracking-[0.14em]
        text-black
      "
    >
      <span
        ref={circleRef}
        className="
          pointer-events-none
          absolute
          left-1/2
          z-[1]
          rounded-full
          bg-[#9414F4]
        "
      />

      <span className="relative z-[2]">
        <span
          ref={labelRef}
          className="inline-block"
        >
          {children}
        </span>

        <span
          ref={hoverLabelRef}
          className="
            absolute
            left-0
            top-0
            inline-block
            whitespace-nowrap
            text-[#090b0d]
          "
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </a>
  );
}