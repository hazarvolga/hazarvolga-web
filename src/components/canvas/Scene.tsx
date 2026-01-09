"use client";

import { Environment } from "@react-three/drei";

export default function Scene() {
    return (
        <>
            <color attach="background" args={["#0a0a0a"]} />
            <ambientLight intensity={0.2} />
            <Environment preset="city" />
            <fogExp2 attach="fog" args={["#0a0a0a", 0.015]} />
        </>
    );
}
