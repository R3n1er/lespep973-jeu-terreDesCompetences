let last = performance.now()
let remaining = 150000
let running = false

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = (e as any).data
  if (type === 'START') {
    running = true
    last = performance.now()
  }
  if (type === 'PAUSE') {
    running = false
  }
  if (type === 'SET') {
    remaining = payload.remaining
  }
}

function tick() {
  const now = performance.now()
  if (running) {
    const delta = now - last
    remaining = Math.max(0, remaining - delta)
    ;(self as any).postMessage({ type: 'TICK', remaining })
  }
  last = now
  setTimeout(tick, 50)
}
tick()

