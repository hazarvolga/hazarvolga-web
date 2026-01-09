"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileWarning, RefreshCw, Lock, Globe, Clock, Activity } from "lucide-react";

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
    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setAuthorized(true);
            fetchStats();
        } else {
            alert("Ah ah ah! You didn't say the magic word.");
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/stats");
            const data = await res.json();
            if (data.pageViews) {
                setStats(data.pageViews.reverse());
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
        setHasAttemptedFetch(true);
    };

    // Group by session to calculate total time per user
    const sessions = stats.reduce((acc, curr) => {
        if (!acc[curr.sessionId]) {
            acc[curr.sessionId] = {
                country: curr.country || 'Unknown',
                ip: curr.ip || 'Unknown',
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
            <div className="h-screen flex flex-col items-center justify-center bg-[#050505] text-white selection:bg-accent selection:text-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md p-8 border border-white/10 bg-zinc-900/50 backdrop-blur-md relative z-10"
                >
                    <div className="flex justify-center mb-6 text-accent">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-center mb-2 tracking-tighter">RESTRICTED AREA</h1>
                    <p className="text-gray-500 text-center mb-8 font-mono text-xs uppercase tracking-widest">Authorized Personnel Only</p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ACCESS KEY"
                            className="bg-black/50 border border-white/10 p-4 text-center text-xl tracking-widest focus:outline-none focus:border-accent text-white font-mono placeholder:text-gray-700 transition-colors"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="bg-white text-black py-4 font-bold uppercase tracking-wider hover:bg-accent transition-colors mt-2 font-mono"
                        >
                            Authenticate
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const sessionCount = Object.keys(sessions).length;
    const totalTime = Object.values(sessions).reduce((acc: number, s: any) => acc + s.totalDuration, 0);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-accent selection:text-black relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none fixed" />

            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-white/10 pb-8 relative z-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tighter">
                        ANALYTICS<span className="text-accent">.</span>
                    </h1>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Real-time Visitor Intelligence</p>
                </div>
                <div className="flex gap-4 mt-6 md:mt-0">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 transition-all"
                    >
                        <RefreshCw size={14} /> Refresh
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto relative z-10">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-gray-500 font-mono text-xs uppercase">Total Sessions</h3>
                            <Activity size={16} className="text-accent" />
                        </div>
                        <p className="text-4xl font-display font-bold">{sessionCount}</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-gray-500 font-mono text-xs uppercase">Total Interaction</h3>
                            <Clock size={16} className="text-accent" />
                        </div>
                        <p className="text-4xl font-display font-bold">{Math.round(totalTime / 60)} <span className="text-lg text-gray-500 font-sans font-normal">min</span></p>
                    </div>
                    <div className="p-6 border border-white/10 bg-zinc-900/20 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-gray-500 font-mono text-xs uppercase">Top Region</h3>
                            <Globe size={16} className="text-accent" />
                        </div>
                        <p className="text-4xl font-display font-bold truncate">Global</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <RefreshCw className="animate-spin text-accent" size={32} />
                    </div>
                ) : sessionCount === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-sm">
                        <FileWarning className="text-gray-600 mb-6" size={48} />
                        <h2 className="text-2xl font-display font-bold text-gray-300 mb-2">No Signal Detected</h2>
                        <p className="text-gray-500 max-w-md text-center mb-8">
                            Visitor data has not been captured yet. Interact with the website in another tab to generate live telemetry.
                        </p>
                        <a
                            href="/"
                            target="_blank"
                            className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-accent transition-colors font-mono text-sm"
                        >
                            Open Site & Generate Data
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {/* Header Row */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-wider">
                            <div className="col-span-3">Timestamp / ID</div>
                            <div className="col-span-2">Location</div>
                            <div className="col-span-2">Duration</div>
                            <div className="col-span-5">Interaction Heatmap</div>
                        </div>

                        <AnimatePresence>
                            {Object.entries(sessions).reverse().map(([sessionId, data]) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    key={sessionId}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 md:py-4 md:px-6 bg-zinc-900/20 hover:bg-zinc-800/30 border border-white/5 hover:border-accent/30 transition-all items-center group"
                                >
                                    {/* ID & Time */}
                                    <div className="col-span-12 md:col-span-3">
                                        <div className="flex flex-col">
                                            <span className="text-white font-mono text-sm group-hover:text-accent transition-colors">
                                                {new Date(data.startTime).toLocaleTimeString()}
                                            </span>
                                            <span className="text-gray-600 text-xs font-mono pt-1">
                                                {new Date(data.startTime).toLocaleDateString()}
                                            </span>
                                            <span className="text-gray-700 text-[10px] font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">ID: {sessionId.substring(0, 8)}...</span>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="col-span-6 md:col-span-2">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${data.country !== 'Unknown' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                <span className="font-bold">{data.country}</span>
                                            </div>
                                            <span className="text-xs text-gray-500 font-mono mt-1">{data.ip}</span>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="col-span-6 md:col-span-2">
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold font-display">{Math.round(data.totalDuration)}<span className="text-sm font-sans font-normal text-gray-500">s</span></span>
                                        </div>
                                    </div>

                                    {/* Heatmap */}
                                    <div className="col-span-12 md:col-span-5 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(data.sections).map(([sec, dur]: any) => (
                                                <div
                                                    key={sec}
                                                    className={`px-3 py-1 text-xs font-mono uppercase border ${dur > 10 ? 'border-accent text-accent bg-accent/5' : 'border-white/10 text-gray-500'}`}
                                                >
                                                    {sec}: <span className="font-bold">{Math.round(dur)}s</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
