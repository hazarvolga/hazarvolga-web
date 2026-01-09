"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
    {
        quote: "They didn't just build a website; they translated our chaotic vision into a digital masterpiece. Truly world-class engineering.",
        author: "Alex V.",
        role: "CEO, NexTech",
        company: "NexTech"
    },
    {
        quote: "The attention to detail is obsessive in the best way possible. Every interaction, every pixel feels intentional.",
        author: "Sarah J.",
        role: "Director, ArtHouse",
        company: "ArtHouse"
    },
    {
        quote: "A rare combination of strategic thinking and artistic execution. They redefined how we are perceived in the market.",
        author: "Marcus R.",
        role: "Founder, Elevate",
        company: "Elevate"
    }
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-background relative z-20">
            <div className="container-wide">
                <h2 className="sr-only">Testimonials</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="py-16 md:px-12 flex flex-col justify-between min-h-[400px] group hover:bg-surface transition-colors duration-500"
                        >
                            <div>
                                <Quote className="w-8 h-8 text-accent mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                                <p className="font-display text-2xl font-medium text-white leading-tight">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="mt-12">
                                <div className="w-12 h-[1px] bg-white/20 mb-6 group-hover:w-full group-hover:bg-accent transition-all duration-500" />
                                <p className="font-sans text-white font-bold uppercase text-sm tracking-wider">
                                    {t.author}
                                </p>
                                <p className="font-mono text-xs text-gray-500 mt-1">
                                    {t.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
