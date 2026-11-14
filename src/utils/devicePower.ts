// Weak devices (<= 4 cores or <= 4 GB of memory) get cheaper effects: fewer
// animated layers, a lighter WebGL renderer, a lower frame rate.
export function isLowPowerDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
}
