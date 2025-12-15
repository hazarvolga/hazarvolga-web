"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

interface IntensitySensorProps {
    intensity: 'low' | 'medium' | 'high';
}

export default function IntensitySensor({ intensity }: IntensitySensorProps) {
    const setIntensity = useStore((state) => state.setIntensity);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntensity(intensity);
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible (adjust as needed)
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [intensity, setIntensity]);

    return <div ref={ref} style={{ position: 'absolute', top: 0, height: '100%', width: '1px', pointerEvents: 'none', opacity: 0 }} aria-hidden />;
}
