import { motion } from 'framer-motion';
import { Loader2, Globe, Brain, CheckCircle2, Search } from 'lucide-react';

export default function ResearchProgress({ logs }) {
    // We parse the logs to find the "Current Action"
    const lastLog = logs[logs.length - 1] || "";

    // Determine phase based on log keywords
    let phase = "initializing";
    if (lastLog.includes("Researching")) phase = "searching";
    if (lastLog.includes("Reading")) phase = "reading";
    if (lastLog.includes("Extracting")) phase = "thinking";
    if (lastLog.includes("Graph")) phase = "finalizing";

    const steps = [
        { id: "searching", label: "Browsing Web", icon: Globe },
        { id: "reading", label: "Reading Content", icon: Search },
        { id: "thinking", label: "Extracting Data", icon: Brain },
        { id: "finalizing", label: "Building Graph", icon: CheckCircle2 },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                        </div>
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">Deep Research in Progress</h3>
                        <p className="text-gray-400 text-sm">Atlas is autonomously navigating the web...</p>
                    </div>
                </div>

                {/* Dynamic Log Line */}
                <div className="bg-black/30 rounded-lg p-3 border border-white/5 mb-6 text-sm font-mono text-blue-300 truncate">
                    {">"} {lastLog}
                </div>

                {/* Steps Visualizer */}
                <div className="grid grid-cols-4 gap-4">
                    {steps.map((step) => {
                        const isActive = phase === step.id;
                        const Icon = step.icon;

                        return (
                            <div key={step.id} className={`flex flex-col items-center gap-2 transition-colors duration-500 ${isActive ? "text-white opacity-100" : "text-gray-600 opacity-50"}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isActive ? "bg-white/10 border-white/50" : "bg-transparent border-white/10"}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] uppercase tracking-wider font-medium text-center">{step.label}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
