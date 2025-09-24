/// <reference lib="webworker" />

let last = performance.now();
let remaining = 150000;
let running = false;

const ctx = self as unknown as DedicatedWorkerGlobalScope;

ctx.onmessage = (e) => {
  const { type, payload } = e.data as {
    type: "START" | "PAUSE" | "SET";
    payload?: { remaining: number };
  };
  if (type === "START") {
    running = true;
    last = performance.now();
  }
  if (type === "PAUSE") {
    running = false;
  }
  if (type === "SET" && payload) {
    remaining = payload.remaining;
  }
};

function tick() {
  const now = performance.now();
  if (running) {
    const delta = now - last;
    remaining = Math.max(0, remaining - delta);
    ctx.postMessage({ type: "TICK", remaining });
  }
  last = now;
  setTimeout(tick, 50);
}

tick();
