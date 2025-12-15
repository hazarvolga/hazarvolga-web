"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { createNoise3D } from "simplex-noise";

// --- OPUS + AXON JUNCTION CONFIGURATION ---

const NODE_COUNT = 55;
const CONNECTION_THRESHOLD = 5.0;
const SPACE_SIZE = 16;
const CURVE_DETAIL = 18;

const noise3D = createNoise3D();
const _temp = new THREE.Vector3();
const _color = new THREE.Color();

// --- SHADERS ---

const nodeVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aActivity;
  attribute float aJunctionInflux;
  attribute vec3 color;
  
  varying vec3 vColor;
  varying float vPhase;
  varying float vActivity;
  varying float vJunction;
  varying float vDepth;

  void main() {
    vColor = color;
    vPhase = aPhase;
    vActivity = aActivity;
    vJunction = aJunctionInflux;
    
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPos.z;
    
    float breath = 1.0 + sin(aPhase) * 0.06;
    float junctionSwell = 1.0 + aJunctionInflux * 0.08;
    
    gl_PointSize = aSize * breath * junctionSwell * (380.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const nodeFragmentShader = `
  uniform float uTime;
  
  varying vec3 vColor;
  varying float vPhase;
  varying float vActivity;
  varying float vJunction;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Organic irregular edge
    float deform = 0.018 * sin(angle * 3.0 + uTime * 0.3 + vPhase);
    deform += 0.012 * cos(angle * 5.0 - uTime * 0.25);
    float edge = 0.38 + deform;
    
    // Membrane and nucleus
    float membrane = smoothstep(edge + 0.06, edge - 0.03, dist);
    float nucleus = 1.0 - smoothstep(0.0, 0.2, dist);
    
    // JUNCTION GLOW: Internal, not surface
    // "Light diffusing through semi-organic tissue"
    // Slightly elongated toward angle based on junction influx
    float junctionCore = nucleus * vJunction * 0.4;
    
    // Base presence
    float basePresence = 0.55;
    float alpha = membrane * basePresence + nucleus * 0.2 + junctionCore;
    
    if (alpha < 0.03) discard;
    
    // Color: Micro temperature shift at junction
    // "Very slight temperature shift" - warmer direction
    float warmth = sin(uTime * 0.025 + vPhase) * 0.02;
    float junctionWarmth = vJunction * 0.03;
    vec3 tinted = vColor + vec3(warmth + junctionWarmth, 0.0, -junctionWarmth * 0.3);
    
    // Internal brightness increase (not saturation)
    vec3 finalColor = tinted + nucleus * vJunction * 0.12;
    
    // Depth softening
    float depthFade = smoothstep(25.0, 8.0, vDepth);
    alpha *= mix(0.6, 1.0, depthFade);
    
    gl_FragColor = vec4(finalColor, min(alpha, 0.9));
  }
`;

// --- MAIN COMPONENT ---

function LivingNeuralSystem() {
    const intensity = useStore((s) => s.intensity);
    const shaderRef = useRef<THREE.ShaderMaterial>(null);

    const [nodes] = useState(() => {
        const arr = [];
        const palette = [
            new THREE.Color("#3f4550"),
            new THREE.Color("#454b56"),
            new THREE.Color("#3a3f4a"),
            new THREE.Color("#4a4f5a"),
            new THREE.Color("#45404a"),
        ];

        for (let i = 0; i < NODE_COUNT; i++) {
            arr.push({
                pos: new THREE.Vector3(
                    (Math.random() - 0.5) * SPACE_SIZE,
                    (Math.random() - 0.5) * SPACE_SIZE * 0.9,
                    (Math.random() - 0.5) * SPACE_SIZE * 0.4
                ),
                origin: new THREE.Vector3(),
                phase: Math.random() * Math.PI * 2,
                noiseKey: Math.random() * 999,
                color: palette[Math.floor(Math.random() * palette.length)],
                size: 1.2 + Math.random() * 0.5,
                activity: 0,
                junctionInflux: 0,
                junctionTarget: 0,
                lastPulseTime: -999,
            });
            arr[i].origin.copy(arr[i].pos);
        }
        return arr;
    });

    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const groupRef = useRef<THREE.Group>(null);

    const { pointsGeo, linesGeo, maxVerts } = useMemo(() => {
        const pGeo = new THREE.BufferGeometry();
        const pos = new Float32Array(NODE_COUNT * 3);
        const col = new Float32Array(NODE_COUNT * 3);
        const sizes = new Float32Array(NODE_COUNT);
        const phases = new Float32Array(NODE_COUNT);
        const activities = new Float32Array(NODE_COUNT);
        const junctions = new Float32Array(NODE_COUNT);

        nodes.forEach((n, i) => {
            pos[i * 3] = n.pos.x;
            pos[i * 3 + 1] = n.pos.y;
            pos[i * 3 + 2] = n.pos.z;
            col[i * 3] = n.color.r;
            col[i * 3 + 1] = n.color.g;
            col[i * 3 + 2] = n.color.b;
            sizes[i] = n.size;
            phases[i] = n.phase;
            activities[i] = 0;
            junctions[i] = 0;
        });

        pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        pGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        pGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
        pGeo.setAttribute("aActivity", new THREE.BufferAttribute(activities, 1));
        pGeo.setAttribute("aJunctionInflux", new THREE.BufferAttribute(junctions, 1));

        const maxConns = NODE_COUNT * 4;
        const maxV = maxConns * CURVE_DETAIL * 2;
        const lGeo = new THREE.BufferGeometry();
        lGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxV * 3), 3));
        lGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxV * 3), 3));

        return { pointsGeo: pGeo, linesGeo: lGeo, maxVerts: maxV };
    }, [nodes]);

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

        const t = state.clock.elapsedTime;
        if (shaderRef.current) shaderRef.current.uniforms.uTime.value = t;

        let drift = 0.1;
        if (intensity === "high") drift = 0.25;
        if (intensity === "low") drift = 0.04;

        const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const actArr = pointsRef.current.geometry.attributes.aActivity.array as Float32Array;
        const phaseArr = pointsRef.current.geometry.attributes.aPhase.array as Float32Array;
        const juncArr = pointsRef.current.geometry.attributes.aJunctionInflux.array as Float32Array;

        // Update nodes
        nodes.forEach((n, i) => {
            const nx = noise3D(n.noiseKey, t * drift, 0);
            const ny = noise3D(n.noiseKey + 100, t * drift, 0);
            const nz = noise3D(n.noiseKey + 200, t * drift, 0);

            n.pos.x = n.origin.x + nx * 2.5;
            n.pos.y = n.origin.y + ny * 2.0;
            n.pos.z = n.origin.z + nz * 1.0;

            posArr[i * 3] = n.pos.x;
            posArr[i * 3 + 1] = n.pos.y;
            posArr[i * 3 + 2] = n.pos.z;

            n.phase += 0.006;
            phaseArr[i] = n.phase;

            // JUNCTION INFLUX: Gradual accumulation and fade
            // "Brightness emerges gradually, then dissipates"
            const lerpSpeed = 0.03;
            n.junctionInflux += (n.junctionTarget - n.junctionInflux) * lerpSpeed;
            n.junctionTarget *= 0.985; // Slow decay of target

            n.activity *= 0.97;
            actArr[i] = n.activity;
            juncArr[i] = n.junctionInflux;
        });

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.aPhase.needsUpdate = true;
        pointsRef.current.geometry.attributes.aActivity.needsUpdate = true;
        pointsRef.current.geometry.attributes.aJunctionInflux.needsUpdate = true;

        // Build connections
        const lPos = linesRef.current.geometry.attributes.position.array as Float32Array;
        const lCol = linesRef.current.geometry.attributes.color.array as Float32Array;
        let vi = 0;

        for (let i = 0; i < NODE_COUNT; i++) {
            let conns = 0;
            for (let j = i + 1; j < NODE_COUNT && conns < 3; j++) {
                const d = nodes[i].pos.distanceTo(nodes[j].pos);
                if (d < CONNECTION_THRESHOLD) {
                    conns++;

                    // AXON JUNCTION: Imperfect timing, not rhythmic
                    // "Neural activity is not rhythmic"
                    const timeSinceLastPulse = t - nodes[i].lastPulseTime;
                    const pulseChance = 0.0008 + (timeSinceLastPulse > 5 ? 0.002 : 0);

                    if (Math.random() < pulseChance) {
                        // "Brief energy accumulation" - set target, not instant
                        const pulseStrength = 0.3 + Math.random() * 0.3;
                        nodes[i].junctionTarget = Math.min(nodes[i].junctionTarget + pulseStrength, 1);
                        nodes[j].junctionTarget = Math.min(nodes[j].junctionTarget + pulseStrength * 0.8, 1);
                        nodes[i].lastPulseTime = t + Math.random() * 0.5; // Imperfect timing
                        nodes[j].lastPulseTime = t + Math.random() * 0.8;
                    }

                    // Curve with organic sag
                    _temp.copy(nodes[i].pos).add(nodes[j].pos).multiplyScalar(0.5);
                    _temp.y += Math.sin(t * 0.4 + i + j) * 0.2;

                    const curve = new THREE.CatmullRomCurve3([nodes[i].pos, _temp, nodes[j].pos]);
                    const pts = curve.getPoints(CURVE_DETAIL);

                    // Junction activity level
                    const junctionLevel = (nodes[i].junctionInflux + nodes[j].junctionInflux) * 0.5;

                    // Base axon color (very dim)
                    const baseR = 0.16, baseG = 0.19, baseB = 0.24;

                    for (let k = 0; k < pts.length - 1 && vi < maxVerts - 2; k++) {
                        const progress = k / (pts.length - 1);

                        // "Energy trace" that peaks at ends (junctions)
                        // NOT at center - biological accumulation at synapses
                        const endProximity = 1 - Math.abs(progress - 0.5) * 2;
                        const junctionGlow = (1 - endProximity) * junctionLevel * 0.4;

                        // Color: Internal warmth at junctions
                        const warmShift = junctionGlow * 0.08;
                        _color.setRGB(
                            baseR + junctionGlow * 0.15 + warmShift,
                            baseG + junctionGlow * 0.12,
                            baseB + junctionGlow * 0.08
                        );

                        lPos[vi * 3] = pts[k].x;
                        lPos[vi * 3 + 1] = pts[k].y;
                        lPos[vi * 3 + 2] = pts[k].z;
                        lCol[vi * 3] = _color.r;
                        lCol[vi * 3 + 1] = _color.g;
                        lCol[vi * 3 + 2] = _color.b;
                        vi++;

                        lPos[vi * 3] = pts[k + 1].x;
                        lPos[vi * 3 + 1] = pts[k + 1].y;
                        lPos[vi * 3 + 2] = pts[k + 1].z;
                        lCol[vi * 3] = _color.r;
                        lCol[vi * 3 + 1] = _color.g;
                        lCol[vi * 3 + 2] = _color.b;
                        vi++;
                    }
                }
            }
        }

        for (let k = vi; k < lPos.length / 3; k++) {
            lPos[k * 3] = lPos[k * 3 + 1] = lPos[k * 3 + 2] = 0;
        }

        linesRef.current.geometry.setDrawRange(0, vi);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.color.needsUpdate = true;

        groupRef.current.rotation.y = Math.sin(t * 0.018) * 0.025;
    });

    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    return (
        <group ref={groupRef}>
            <points ref={pointsRef} geometry={pointsGeo}>
                <shaderMaterial
                    ref={shaderRef}
                    vertexShader={nodeVertexShader}
                    fragmentShader={nodeFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <lineSegments ref={linesRef} geometry={linesGeo}>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.32}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}

export default function Scene() {
    return (
        <>
            <color attach="background" args={["#0a0a0a"]} />
            <ambientLight intensity={0.12} />
            <LivingNeuralSystem />
            <fogExp2 attach="fog" args={["#0a0a0a", 0.04]} />
        </>
    );
}
