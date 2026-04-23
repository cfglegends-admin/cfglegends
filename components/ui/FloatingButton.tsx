"use client";

import React, { useRef, useState } from "react";

export default function LuxuryFloatingButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      href="https://carl-fuhlrott-gymnasium.chayns.site/cfg-legends-neu"
      target="_blank"
      rel="noopener noreferrer"
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // SAFARI FIX: pointer-events-auto entfernt.
      // LIQUID GLASS MOBILE: bg-black/20, backdrop-blur-xl, border-white/50 und Inset-Shadow (Lichtkante).
      // DESKTOP: sm:bg-black, sm:border-[#D4AF37] (Bleibt unberührt)
      className="relative flex active:scale-90 active:duration-75 shrink-0 aspect-square h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/20 backdrop-blur-xl sm:bg-black sm:backdrop-blur-none border border-white/50 sm:border-[#D4AF37] text-white sm:text-[#D4AF37] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] sm:shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 hidden sm:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(40px circle at ${position.x}px ${position.y}px, rgba(212, 175, 55, 0.4), transparent 100%)`,
        }}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="relative z-10 h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
        />
      </svg>
    </a>
  );
}
