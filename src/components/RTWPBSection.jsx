import React, { useState, useMemo } from 'react';
import { rtwpbDirectory } from '../data/rtwpbData';
import { 
  Building2, Phone, Mail, MapPin, UserCheck, 
  Search, ExternalLink, ShieldCheck, Sparkles, Send 
} from 'lucide-react';

export function RTWPBSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIsland, setSelectedIsland] = useState('All'); // 'All', 'Luzon', 'Visayas', 'Mindanao'

  const islandMap = {
    'rtwpb-ncr': 'Luzon',
    'rtwpb-car': 'Luzon',
    'rtwpb-1': 'Luzon',
    'rtwpb-2': 'Luzon',
    'rtwpb-3': 'Luzon',
    'rtwpb-4a': 'Luzon',
    'rtwpb-4b': 'Luzon',
    'rtwpb-5': 'Luzon',
    'rtwpb-6': 'Visayas',
    'rtwpb-7': 'Visayas',
    'rtwpb-8': 'Visayas',
    'rtwpb-9': 'Mindanao',
    'rtwpb-10': 'Mindanao',
    'rtwpb-11': 'Mindanao',
    'rtwpb-12': 'Mindanao',
    'rtwpb-13': 'Mindanao',
    'rtwpb-barmm': 'Mindanao'
  };

  const filteredBoards = useMemo(() => {
    return rtwpbDirectory.filter(board => {
      const island = islandMap[board.id] || 'Luzon';
      const matchesIsland = selectedIsland === 'All' || island === selectedIsland;
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery.trim() || 
        board.name.toLowerCase().includes(q) ||
        board.region.toLowerCase().includes(q) ||
        board.jurisdiction.toLowerCase().includes(q) ||
        board.boardChair.toLowerCase().includes(q) ||
        board.boardSecretary.toLowerCase().includes(q);

      return matchesIsland && matchesSearch;
    });
  }, [searchQuery, selectedIsland]);

  return (
    <section id="rtwpb" className="py-12 bg-slate-100 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tripartite Representation Across 17 Regions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Regional Tripartite Wages & Productivity Boards (RTWPBs)
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Created pursuant to RA 6727, each RTWPB is composed of the DOLE Regional Director as Chairperson, NEDA & DTI Regional Directors as Vice-Chairpersons, and two representatives each from the Workers and Employers sectors.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Island Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            {['All', 'Luzon', 'Visayas', 'Mindanao'].map((island) => (
              <button
                key={island}
                onClick={() => setSelectedIsland(island)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedIsland === island
                    ? 'bg-blue-900 text-white shadow'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {island}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by region, official, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoards.map((board) => (
            <div
              key={board.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-blue-900 text-white">
                    {board.region}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {islandMap[board.id]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {board.name}
                </h3>

                {/* Key Officials */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">BOARD CHAIRPERSON</span>
                      <strong className="text-slate-800">{board.boardChair}</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 pt-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">BOARD SECRETARY</span>
                      <strong className="text-slate-800">{board.boardSecretary}</strong>
                    </div>
                  </div>
                </div>

                {/* Address & Contact info */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{board.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-mono text-[11px]">{board.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate text-[11px] text-blue-700">{board.email}</span>
                  </div>
                </div>
              </div>

              {/* Jurisdiction */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Jurisdiction Scope:
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                  {board.jurisdiction}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
