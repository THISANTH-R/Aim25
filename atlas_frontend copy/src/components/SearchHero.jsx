import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

export default function SearchHero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-white opacity-[0.02] rounded-full blur-[80px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center w-full max-w-2xl px-6"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-gray-400" />
          <span className="text-sm uppercase tracking-[0.2em] text-gray-400">Atlas Intelligence</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
          <span className="text-gradient">Autonomous</span> <br />
          Corporate Research
        </h1>

        <form onSubmit={handleSubmit} className="relative w-full group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter company domain (e.g. openai.com)..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-14 pr-6 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] focus:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-white transition-colors" />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="absolute right-3 top-3 bottom-3 bg-white text-black px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Investigate
          </motion.button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          Powered by Local LLMs & Autonomous Browns
        </p>
      </motion.div>
    </div>
  );
}
