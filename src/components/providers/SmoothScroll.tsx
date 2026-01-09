"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle Anchor Links for Smooth Scroll
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const href = anchor.getAttribute("href");
                if (href && href !== "#") {
                    const target = document.querySelector(href);
                    if (target) {
                        lenis.scrollTo(href, { offset: 0 }); // offset: -80 if header needs space
                    }
                }
            });
        });

        // Cleanup
        return () => {
            lenis.destroy();
            // Remove listeners if needed (optional for simple unmount)
        };
    }, []);

    return null; // Logic only
}
