"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createPhysicsEngine } from "@/lib/physics/setup";

export default function HeroGravity() {
    const { t } = useLanguage();
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<any>(null);

    useEffect(() => {
        // ... physics setup remains SAME ...
        if (!sceneRef.current) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const { engine, render, runner } = createPhysicsEngine(sceneRef.current, width, height);
        engineRef.current = engine;

        const words = [
            "STRATEGY", "DESIGN", "MOTION", "CODE",
            "VISION", "IMPACT", "FUTURE", "CRAFT"
        ];

        // ... rest of physics logic remains SAME until return ...
        const bodies = words.map((word) => {
            const x = Math.random() * (width - 200) + 100;
            const y = -Math.random() * 800 - 100;
            const boxWidth = word.length * 20 + 40;
            const boxHeight = 60;
            return Matter.Bodies.rectangle(x, y, boxWidth, boxHeight, {
                chamfer: { radius: 0 },
                restitution: 0.5,
                friction: 0.1,
                render: { fillStyle: "transparent", strokeStyle: "#FAFAFA", lineWidth: 1 },
                label: word,
            });
        });
        Matter.World.add(engine.world, [...bodies]);
        Matter.Events.on(render, "afterRender", () => {
            const context = render.context;
            bodies.forEach((body) => {
                const { x, y } = body.position;
                const angle = body.angle;
                context.save();
                context.translate(x, y);
                context.rotate(angle);
                context.font = "800 24px 'Syne', sans-serif";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillStyle = "#FAFAFA";
                context.fillText(body.label, 0, 0);
                context.restore();
            });
        });
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.1, render: { visible: false } }
        });
        Matter.World.add(engine.world, mouseConstraint);
        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
            <div ref={sceneRef} className="absolute inset-0 z-10 opacity-60" />
            <div className="relative z-20 text-center mix-blend-difference text-white pointer-events-none">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    <motion.h1
                        className="font-display text-[12vw] leading-[0.85] font-bold tracking-tighter tracking-tight mb-4"
                        variants={{
                            hidden: { y: 100, opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                        }}
                    >
                        {t.hero.titlePart1}<span className="text-transparent stroke-text text-accent">&</span>{t.hero.titlePart2}
                    </motion.h1>

                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 1 } }
                        }}
                    >
                        <p className="font-sans text-lg uppercase tracking-widest max-w-sm text-center md:text-right text-gray-400">
                            {t.hero.subtitle}
                        </p>

                        <div className="h-12 w-[1px] bg-accent/50 hidden md:block" />

                        <p className="font-sans text-sm text-gray-500 max-w-xs text-center md:text-left">
                            {t.hero.desc}
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 z-30"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-500">{t.hero.scroll}</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-4 h-4 text-accent" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
