import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { agenciesData as defaultAgencies, agencyCategories } from '../data/agenciesData';
import { 
  Building2, ExternalLink, Search, ShieldCheck, 
  Phone, Mail, MapPin, Globe, 
  Users, Award, Sparkles, Filter, CheckCircle2 
} from 'lucide-react';

export function AgenciesPage() {
  const { agencies } = useData();
  const [activeCategory, setActiveCategory] = useState('All Agencies');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgencies = useMemo(() => {
    const list = agencies || defaultAgencies;
    return list.filter(agency => {
      const matchCat = activeCategory === 'All Agencies' || agency.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        agency.name.toLowerCase().includes(q) || 
        agency.acronym.toLowerCase().includes(q) || 
        agency.mandate.toLowerCase().includes(q) ||
        agency.keyServices.some(s => s.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery, agencies]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Breadcrumb & Top Bar */}
      <div className="bg-blue-900 text-white py-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-200 mb-2">
                <span>Home</span>
                <span>/</span>
                <span className="text-amber-300 font-bold">Attached Agencies & DOLE Family</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Department of Labor and Employment Attached Agencies
              </h1>
              <p className="text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed">
                Directory of specialized statutory bodies, regulatory boards, and welfare institutions operating under and attached to the DOLE.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-blue-950/60 p-4 rounded-xl border border-blue-800 text-xs">
              <Building2 className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">9 Key Attached Institutions</div>
                <div className="text-blue-200">Serving Filipino workers and employers nationwide</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search agency name, acronym (NLRC, TESDA...), or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Total Results */}
            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900">{filteredAgencies.length}</strong> of {(agencies || defaultAgencies).length} attached agencies
            </div>

          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {agencyCategories.map((cat, idx) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Agencies Grid Cards with Official Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Strip with Official Logo */}
                <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                  <div className="flex items-start gap-3.5">
                    {/* Official Agency Logo */}
                    <div className="w-14 h-14 rounded-xl bg-white p-1.5 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                      <img
                        src={agency.logo.startsWith('http') ? agency.logo : `${import.meta.env.BASE_URL}${agency.logo.replace(/^\//, '')}`}
                        alt={`${agency.name} Logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${import.meta.env.BASE_URL}nwpc-seal.png`;
                        }}
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block mb-0.5">
                        {agency.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {agency.name}
                      </h3>
                      <div className="text-xs font-mono font-bold text-amber-700 mt-0.5">
                        ({agency.acronym})
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 shrink-0">
                    {agency.badge}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4 text-xs text-slate-700">
                  <p className="leading-relaxed text-slate-600">
                    {agency.mandate}
                  </p>

                  {/* Key Services Pills */}
                  <div>
                    <span className="font-bold text-slate-900 block mb-1.5 text-[11px] uppercase tracking-wide">
                      Core Frontline Mandates:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agency.keyServices.map((service, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Strip */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{agency.headOffice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-mono">{agency.hotline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{agency.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">Official Portal</span>
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <span>Visit {agency.acronym}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
