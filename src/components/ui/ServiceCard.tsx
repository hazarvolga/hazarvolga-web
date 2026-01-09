"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Share2, Search, Zap, BarChart } from "lucide-react";

const icons = {
    "Web Design & Development": Code,
    "UI/UX Design": Palette,
    "Digital Marketing": Share2,
    "Social Media Management": Zap, // Using Zap as placeholder/creative choice
    "Brand Identity": Search, // Using Search as placeholder
    "SEO & Analytics": BarChart,
};

interface ServiceCardProps {
    title: string;
    description: string;
    index: number;
}

export default function ServiceCard({ title, description, index }: ServiceCardProps) {
    const Icon = icons[title as keyof typeof icons] || Code;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            className="group relative h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl opacity-0 group-hover:opacity-100" />

            <div className="relative h-full bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl overflow-hidden hover:border-neon-blue/50 transition-colors duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon size={120} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 p-4 bg-white/5 w-fit rounded-xl group-hover:bg-neon-blue/20 transition-colors">
                        <Icon className="w-8 h-8 text-neon-blue" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-blue transition-colors">
                        {title}
                    </h3>

                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                        {description}
                    </p>

                    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neon-purple group-hover:text-neon-blue transition-colors">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
