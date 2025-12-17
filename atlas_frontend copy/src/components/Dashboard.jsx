import { motion } from 'framer-motion';
import { Building2, Globe, Users, MapPin, Server, FileText, Phone, Mail, Link as LinkIcon, Briefcase } from 'lucide-react';

export default function Dashboard({ data, pdfUrl }) {
    if (!data) return null;

    // Helper to construct logo URL
    const logoUrl = data.logo_url || `https://logo.clearbit.com/${data.domain}`;

    return (
        <div className="w-full pb-24 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-8"
            >
                {/* 1. Header & Identity */}
                <div className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 overflow-hidden shadow-lg border border-white/10">
                            <img
                                src={logoUrl}
                                alt={`${data.name} logo`}
                                onError={(e) => { e.target.style.display = 'none' }}
                                className="w-full h-full object-contain"
                            />
                            {/* Fallback if img error */}
                            <div className="text-black font-bold text-2xl hidden">{data.name.charAt(0)}</div>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">{data.name}</h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                                <a href={`https://${data.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                                    <Globe className="w-4 h-4" />
                                    {data.domain}
                                </a>
                                <span className="w-1 h-1 rounded-full bg-gray-500" />
                                <span className="flex items-center gap-1.5">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    {data.industry}
                                    {data.sub_industry && <span className="text-gray-500"> / {data.sub_industry}</span>}
                                </span>
                            </div>
                        </div>
                    </div>


                </div>

                {/* 2. Main content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COL (Overview, Tech, Contact) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Description */}
                        <div className="glass-panel p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white/90">
                                <Building2 className="w-5 h-5 text-blue-400" />
                                Company Profile
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Summary</h4>
                                    <p className="text-gray-300 leading-relaxed text-base">
                                        {data.description_short}
                                    </p>
                                </div>
                                {data.description_long && (
                                    <div className="pt-4 border-t border-white/5">
                                        <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Detailed Overview</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {data.description_long}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tech Stack Signals */}
                        <div className="glass-panel p-6">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                <Server className="w-4 h-4 text-purple-400" />
                                Tech Stack Signals
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.tech_stack?.map((tech, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-purple-500/10 text-purple-200 border border-purple-500/20 rounded-md text-sm font-mono">
                                        {tech}
                                    </span>
                                ))}
                                {(!data.tech_stack || data.tech_stack.length === 0) && <span className="text-gray-600 italic">No technology signals detected</span>}
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="glass-panel p-6">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-400" />
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.contact_email && (
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-200">{data.contact_email}</span>
                                    </div>
                                )}
                                {data.contact_phone && (
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-200">{data.contact_phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <LinkIcon className="w-4 h-4 text-gray-400" />
                                    <a href={`https://${data.domain}`} target="_blank" className="text-sm text-blue-400 hover:underline">Official Company Page</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COL (People, Locations, Products) */}
                    <div className="space-y-6">

                        {/* Key People */}
                        <div className="glass-panel p-6">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4 text-yellow-400" />
                                Key People
                            </h3>
                            <div className="space-y-3">
                                {data.key_people?.slice(0, 8).map((person, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 mt-1">
                                            {person.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white text-sm">{person.name}</div>
                                            <div className="text-xs text-gray-500">{person.title}</div>
                                            {person.role_category && <span className="text-[10px] text-gray-600 px-1.5 py-0.5 bg-white/5 rounded border border-white/5 mt-1 inline-block">{person.role_category}</span>}
                                        </div>
                                    </div>
                                ))}
                                {(!data.key_people || data.key_people.length === 0) && <span className="text-gray-600 italic">No leadership data found</span>}
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="glass-panel p-6">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-400" />
                                Locations
                            </h3>
                            <ul className="space-y-3">
                                {data.locations?.slice(0, 6).map((loc, i) => (
                                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                                        <MapPin className="w-3 h-3 text-gray-600 mt-1 shrink-0" />
                                        {loc}
                                    </li>
                                ))}
                                {(!data.locations || data.locations.length === 0) && <span className="text-gray-600 italic">Remote / Unknown</span>}
                            </ul>
                        </div>

                        {/* Products */}
                        <div className="glass-panel p-6">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-blue-400" />
                                Products & Services
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.products_services?.map((prod, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-full text-xs">
                                        {prod}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Download */}
                        <div className="p-4 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                            <FileText className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            <div className="text-sm font-medium text-gray-400 group-hover:text-white">Download Full Dossier</div>
                            <div className="text-xs text-gray-600">JSON + PDF Format</div>
                        </div>

                    </div>

                </div>
            </motion.div>
        </div>
    );
}
