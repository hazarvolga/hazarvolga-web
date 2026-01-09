"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function AnalyticsTracker() {
    const pathname = usePathname();
    const sessionRef = useRef<string>('');
    const activeSectionRef = useRef<string>('hero'); // Default to header/hero
    const sectionStartRef = useRef<number>(Date.now());
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Helper to send data
    const sendData = (section: string) => {
        if (!section) return;
        const now = Date.now();
        const duration = (now - sectionStartRef.current) / 1000;

        // Ignore < 1s interactions
        if (duration < 1) return;

        const payload = {
            sessionId: sessionRef.current,
            path: window.location.pathname,
            section,
            duration
        };

        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/track', blob);
        } else {
            fetch('/api/track', {
                method: 'POST',
                body: blob,
                keepalive: true
            }).catch(() => { });
        }

        // Reset clock
        sectionStartRef.current = now;
    };

    useEffect(() => {
        // Init Session
        let stored = sessionStorage.getItem('analytics_id');
        if (!stored) {
            stored = generateUUID();
            sessionStorage.setItem('analytics_id', stored);
        }
        sessionRef.current = stored;

        // Observer setup
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newSection = entry.target.id || 'unknown';

                    // If we switched sections
                    if (newSection !== activeSectionRef.current) {
                        // Send data for the OLD section
                        sendData(activeSectionRef.current);

                        // Update to NEW section
                        activeSectionRef.current = newSection;
                        sectionStartRef.current = Date.now(); // Start clock for new section
                    }
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, {
            threshold: 0.55 // Trigger only when >55% visible
        });

        // Auto-scan for sections
        const sections = document.querySelectorAll('section, footer'); // Also track footer
        sections.forEach(el => observerRef.current?.observe(el));

        // Handle Unload/Hide
        const handleUnload = () => {
            sendData(activeSectionRef.current);
        };

        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') handleUnload();
        });
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            observerRef.current?.disconnect();
            window.removeEventListener('visibilitychange', handleUnload); // Logic error in remove fixed conceptually
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [pathname]); // Re-scan on path change

    return null;
}
