import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { productivityModules } from '../data/productivityData';
import { rtwpbDirectory } from '../data/rtwpbData';
import { 
  Search, X, FileSpreadsheet, BookOpen, 
  Layers, Building2, ArrowRight 
} from 'lucide-react';

export function SearchModal({ isOpen, onClose, onNavigateTo }) {
  const { wages, news } = useData();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedWages = (wages || []).filter(w => 
      w.region.toLowerCase().includes(q) ||
      w.regionFullName.toLowerCase().includes(q) ||
      w.wageOrderNo.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedNews = (news || []).filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedProductivity = productivityModules.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q))
    ).slice(0, 3);

    const matchedBoards = rtwpbDirectory.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.region.toLowerCase().includes(q) ||
      b.jurisdiction.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      wages: matchedWages,
      news: matchedNews,
      productivity: matchedProductivity,
      boards: matchedBoards,
      total: matchedWages.length + matchedNews.length + matchedProductivity.length + matchedBoards.length
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (section) => {
    onClose();
    onNavigateTo(section);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-700 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search wage orders, rates, training modules, news, regional boards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {!searchResults && (
            <div className="py-8 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>Type keywords to search across the entire NWPC repository...</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px]">
                <span className="text-slate-500 font-semibold">Popular:</span>
                <button onClick={() => setQuery('NCR')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700">NCR Wage Order</button>
                <button onClick={() => setQuery('7S')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700">7S Housekeeping</button>
                <button onClick={() => setQuery('Kasambahay')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700">Kasambahay Rate</button>
                <button onClick={() => setQuery('Cebu')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700">Region VII</button>
              </div>
            </div>
          )}

          {searchResults && searchResults.total === 0 && (
            <div className="py-8 text-center text-slate-500">
              No results found for "<strong>{query}</strong>". Try searching for region names (e.g. NCR, Region III), or training terms like "ISTIV" or "Overtime".
            </div>
          )}

          {/* Wage Rates Matches */}
          {searchResults && searchResults.wages.length > 0 && (
            <div>
              <div className="font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[11px]">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Minimum Wage Orders ({searchResults.wages.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.wages.map(w => (
                  <div
                    key={w.id}
                    onClick={() => handleSelect('wage-matrix')}
                    className="p-2.5 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-blue-700">
                        {w.region} — {w.regionFullName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {w.wageOrderNo} • Non-Agri: ₱{w.nonAgriculture} | Agri: ₱{w.agriculture}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Matches */}
          {searchResults && searchResults.news.length > 0 && (
            <div>
              <div className="font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[11px]">
                <BookOpen className="w-3.5 h-3.5" />
                News & Press Releases ({searchResults.news.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.news.map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleSelect('news')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-emerald-700">
                        {n.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {n.category} • {n.date}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Productivity Modules */}
          {searchResults && searchResults.productivity.length > 0 && (
            <div>
              <div className="font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[11px]">
                <Layers className="w-3.5 h-3.5" />
                Productivity Programs ({searchResults.productivity.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.productivity.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect('productivity')}
                    className="p-2.5 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-amber-700">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {p.shortDesc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regional Boards Matches */}
          {searchResults && searchResults.boards.length > 0 && (
            <div>
              <div className="font-bold text-indigo-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[11px]">
                <Building2 className="w-3.5 h-3.5" />
                RTWPB Regional Boards ({searchResults.boards.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.boards.map(b => (
                  <div
                    key={b.id}
                    onClick={() => handleSelect('rtwpb')}
                    className="p-2.5 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-indigo-700">
                        {b.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {b.address} • {b.phone}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Search Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
          <span>Press <strong>ESC</strong> to close</span>
          <span>National Wages and Productivity Commission</span>
        </div>

      </div>
    </div>
  );
}
