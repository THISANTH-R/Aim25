import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function LiveTerminal({ logs }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto glass-panel p-1 rounded-xl overflow-hidden shadow-2xl"
        >
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 text-xs text-gray-500 font-mono flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    atlas_agent_v2.exe --verbose
                </div>
            </div>

            <div className="bg-black/80 h-96 overflow-y-auto p-4 font-mono text-sm space-y-2">
                {logs.length === 0 && (
                    <div className="text-gray-600 animate-pulse">Initializing system... Waiting for target...</div>
                )}

                {logs.map((log, i) => (
                    <div key={i} className="flex gap-2 text-green-400/80 border-l-2 border-green-900/30 pl-2">
                        <span className="opacity-50 text-[10px] pt-1">
                            {new Date().toLocaleTimeString().split(' ')[0]}
                        </span>
                        <span>{log}</span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </motion.div>
    );
}
