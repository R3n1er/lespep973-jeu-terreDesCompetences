// Assure les types Worker dans ce contexte
declare const self: DedicatedWorkerGlobalScope;
export {};

let last = performance.now();
let remaining = 150000;
let running = false;

self.onmessage = (
  e: MessageEvent<{
    type: "START" | "PAUSE" | "SET";
    payload?: { remaining: number };
  }>
) => {
  const { type, payload } = e.data;
  if (type === "START") {
    running = true;
    last = performance.now();
  }
  if (type === "PAUSE") {
    running = false;
  }
  if (type === "SET") {
    if (payload && typeof payload.remaining === "number") {
      remaining = payload.remaining;
    }
  }
};

function tick() {
  const now = performance.now();
  if (running) {
    const delta = now - last;
    remaining = Math.max(0, remaining - delta);
    self.postMessage({ type: "TICK", remaining });
  }
  last = now;
  setTimeout(tick, 50);
}
tick();
