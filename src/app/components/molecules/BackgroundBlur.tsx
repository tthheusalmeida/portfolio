"use client";

import { useEffect, useState } from "react";

export default function BackgroundBlur() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-background)] blur-[2px]">
      {/* animated colorful blobs */}
      <div className="absolute top-[-10%] left-[5%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-orange-400 opacity-30 rounded-full blur-[60px] sm:blur-[150px] animate-pulse-slow" />
      <div className="absolute top-[30%] left-[60%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-yellow-400 opacity-20 rounded-full blur-[68px] sm:blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-10%] right-[10%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-orange-400 opacity-25 rounded-full blur-[92px] sm:blur-[180px] animate-pulse-slow animate-delay-[2s]" />

      {/* lines drop */}
      <LineDrops />
    </div>
  );
}

function LineDrops() {
  const [lines, setLines] = useState<number[]>([]);
  const colorList = ["#ff8800", "#faa307", "#ffd60a", "#ffba08"];

  useEffect(() => {
    const isSmall = window.matchMedia("(max-width: 400px)").matches;
    const total = isSmall ? 30 : 80;
    setLines(Array.from({ length: total }, (_, i) => i));
  }, []);

  return (
    <>
      {lines.map((i) => {
        const left = Math.random() * 140 - 20;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 10;
        const fontSize = 12 + Math.random() * 8;
        const color = colorList[Math.floor(Math.random() * colorList.length)];

        return (
          <div
            key={i}
            className="absolute whitespace-pre text-xs font-mono"
            style={{
              left: `${left}%`,
              top: "-200px",
              fontSize: `${fontSize}px`,
              color,
              opacity: 0.1 + Math.random() * 0.6,
              animation: `codeFall ${duration}s linear ${delay}s infinite`,
            }}
          >
            {generateRandomCode()}
          </div>
        );
      })}
    </>
  );
}

function generateRandomCode() {
  const chars = `MY MAGIC IS NEVER GIVING UP`;
  let result = "";
  for (let i = 0; i < 20; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    result += char + "\n";
  }
  return result;
}
