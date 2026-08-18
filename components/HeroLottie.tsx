"use client";

import { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

export function HeroLottie() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animation: AnimationItem | undefined;

    fetch("/animations/magic-particles.json")
      .then((response) => response.json())
      .then((animationData) => {
        if (!containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });
      });

    return () => animation?.destroy();
  }, []);

  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden lg:h-[700px]">
      <div
        ref={containerRef}
        className="h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}