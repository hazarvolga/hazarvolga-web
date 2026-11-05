/** Seeded scatter preserves the original spatial field without hydration randomness. */
export function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

const random = seededRandom(720455);
export const neuralNodes = Array.from({ length: 55 }, () => {
  return {
    x: (random() - 0.5) * 16,
    y: (random() - 0.5) * 14.4,
    z: (random() - 0.5) * 6.4,
    size: 1.2 + random() * 0.5,
    phase: random() * Math.PI * 2,
    noiseKey: random() * 999,
    colorIndex: Math.floor(random() * 5),
  };
});

export const neuralEdges = neuralNodes.flatMap((node, index) => {
  const neighbours = neuralNodes
    .map((other, target) => ({
      target,
      distance: Math.hypot(node.x - other.x, node.y - other.y, node.z - other.z),
    }))
    .filter((entry) => entry.target > index && entry.distance < 5)
    .slice(0, 3);
  return neighbours.map(({ target }) => [index, target] as const);
});
