"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import OriginalNeuralScene from "./OriginalNeuralScene";

type Props = { active: boolean; onReady: () => void; onFailure: () => void };

function RendererLifecycle({ onReady, onFailure }: Omit<Props, "active">) {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    let failed = false;
    const fail = () => { failed = true; onFailure(); };
    const previous = gl.debug.onShaderError;
    // Three.js owns this imperative renderer; register its shader-error callback.
    // eslint-disable-next-line react-hooks/immutability
    gl.debug.onShaderError = fail;
    canvas.addEventListener("webglcontextlost", fail);
    // Wait until the initial canvas frame has had a chance to compile its shaders.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => { if (!failed) onReady(); });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      gl.debug.onShaderError = previous;
      canvas.removeEventListener("webglcontextlost", fail);
    };
  }, [gl, onReady, onFailure]);
  return null;
}

export default function OriginalNeuralCanvas({ active, onReady, onFailure }: Props) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }} frameloop={active ? "always" : "demand"}>
      <RendererLifecycle onReady={onReady} onFailure={onFailure} />
      <OriginalNeuralScene active={active} />
    </Canvas>
  );
}
