"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PageView {
    id: string;
    sessionId: string;
    path: string;
    section: string;
    duration: number;
    timestamp: string;
    country: string;
    ip: string;
}

export default function Dashboard() {
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [stats, setStats] = useState<PageView[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") { // Simple hardcoded password for now
            setAuthorized(true);
            fetchStats();
        } else {
            alert("Wrong password");
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/stats");
            const data = await res.json();
            if (data.pageViews) {
                setStats(data.pageViews.reverse()); // Show newest first
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // Group by session to calculate total time per user
    const sessions = stats.reduce((acc, curr) => {
        if (!acc[curr.sessionId]) {
            acc[curr.sessionId] = {
                country: curr.country,
                ip: curr.ip,
                startTime: curr.timestamp,
                totalDuration: 0,
                sections: {}
            };
        }
        acc[curr.sessionId].totalDuration += curr.duration;
        acc[curr.sessionId].sections[curr.section] = (acc[curr.sessionId].sections[curr.section] || 0) + curr.duration;
        return acc;
    }, {} as Record<string, any>);

    if (!authorized) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <h1 className="text-2xl font-mono uppercase">Private Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Key"
                        className="bg-zinc-900 border border-zinc-800 p-2 text-center focus:outline-none focus:border-green-500 transition-colors"
                    />
                    <button type="submit" className="bg-white text-black py-2 font-bold uppercase hover:bg-gray-200">Unlock</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono">
            <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
                <h1 className="text-2xl text-accent">Analytics Dashboard</h1>
                <button onClick={fetchStats} className="text-xs uppercase bg-zinc-900 px-4 py-2 hover:bg-zinc-800">Refresh Data</button>
            </header>

            {loading && <p className="text-gray-500">Loading...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(sessions).map(([sessionId, data]) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={sessionId}
                        className="bg-zinc-950 border border-white/5 p-6 rounded-sm hover:border-accent/20 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs text-gray-500">{new Date(data.startTime).toLocaleString()}</span>
                            <span className="text-xs bg-accent text-black px-2 py-0.5 font-bold">{data.country}</span>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs text-gray-600 mb-1">IP ADDR</p>
                            <p className="text-sm">{data.ip}</p>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-600 mb-1">TOTAL TIME</p>
                            <p className="text-xl font-bold">{Math.round(data.totalDuration)}s</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs text-gray-600 border-b border-white/5 pb-1">Interest Breakdown</p>
                            {Object.entries(data.sections).map(([sec, dur]: any) => (
                                <div key={sec} className="flex justify-between text-xs">
                                    <span className="uppercase text-gray-400">{sec}</span>
                                    <span className={dur > 10 ? "text-green-400" : "text-gray-600"}>{Math.round(dur)}s</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
