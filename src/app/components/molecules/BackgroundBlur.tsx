"use client";

import { useEffect, useState } from "react";

interface LineConfig {
  left: number;
  delay: number;
  duration: number;
  fontSize: number;
  code: string;
}

export default function BackgroundBlur() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-background)] [contain:strict]">
      <LineDrops />
    </div>
  );
}

function LineDrops() {
  const [lines, setLines] = useState<LineConfig[]>([]);
  useEffect(() => {
    const isSmall = window.matchMedia("(max-width: 640px)").matches;
    const total = isSmall ? 12 : 28;
    setLines(
      Array.from({ length: total }, () => ({
        left: Math.random() * 140 - 20,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 10,
        fontSize: 12 + Math.random() * 8,
        code: generateRandomCode(),
      }))
    );
  }, []);

  return (
    <>
      {lines.map(({ left, delay, duration, fontSize, code }, i) => (
        <div
          key={i}
          className="absolute motion-reduce:hidden whitespace-pre text-xs font-mono text-[var(--color-foreground)]/6"
          style={{
            left: `${left}%`,
            top: "-200px",
            fontSize: `${fontSize}px`,
            opacity: 0.1,
            willChange: "transform",
            animation: `codeFall ${duration}s linear ${delay}s infinite`,
          }}
        >
          {code}
        </div>
      ))}
    </>
  );
}

function generateRandomCode() {
  const chars = "TURNING COFFEE INTO CODE";
  let result = "";
  for (let i = 0; i < 20; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    result += char + "\n";
  }
  return result;
}
