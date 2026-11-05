import { useId } from "react";
import { neuralEdges, neuralNodes } from "./structure";

/** Deliberately static, also serves readers before JS or without a GPU context. */
export function NeuralStill() {
  const gradientId = useId();
  // JS engines can differ in the last sin/cos bit; stable SVG strings hydrate exactly.
  const round = (value: number) => Number(value.toFixed(3));
  const point = (index: number) => {
    const node = neuralNodes[index];
    const scale = 250 / (Math.tan(Math.PI / 8) * (5 - node.z));
    return { x: round(300 + node.x * scale), y: round(250 - node.y * scale) };
  };
  return (
    <svg
      className="neural-fallback"
      viewBox="0 0 600 500"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop stopColor="#4a4f5a" stopOpacity="0.66" />
          <stop offset="0.25" stopColor="#454b56" stopOpacity="0.35" />
          <stop offset="0.75" stopColor="#3f4550" stopOpacity="0.16" />
          <stop offset="1" stopColor="#3f4550" stopOpacity="0" />
        </radialGradient>
      </defs>
      {neuralEdges.map(([source, target]) => {
        const a = point(source);
        const b = point(target);
        return (
          <path
            key={`${source}-${target}`}
            d={`M${a.x} ${a.y} Q${round((a.x + b.x) / 2 + Math.sin(source) * 16)} ${round((a.y + b.y) / 2 + 14)} ${b.x} ${b.y}`}
            stroke="#454b56"
            strokeOpacity="0.32"
            strokeWidth="0.8"
          />
        );
      })}
      {neuralNodes.map((node, index) => {
        const { x, y } = point(index);
        const radius = round(node.size * 24);
        return (
          <g
            key={index}
            transform={`translate(${x} ${y}) rotate(${index * 19})`}
          >
            <ellipse
              rx={radius}
              ry={round(radius * 0.88)}
              fill={`url(#${gradientId})`}
            />
            <path
              d={`M ${round(-radius * 0.78)} 0 C ${-radius} ${round(-radius * 0.7)}, ${round(radius * 0.4)} ${-radius}, ${round(radius * 0.8)} ${round(-radius * 0.22)} S ${round(radius * 0.5)} ${radius}, ${round(-radius * 0.15)} ${round(radius * 0.72)} S ${round(-radius * 0.8)} ${round(radius * 0.5)}, ${round(-radius * 0.78)} 0`}
              stroke="#454b56"
              strokeOpacity="0.24"
              strokeWidth="0.7"
            />
            <circle r={round(radius * 0.14)} fill="#4a4f5a" opacity="0.55" />
          </g>
        );
      })}
    </svg>
  );
}
