import React, { useState, useMemo } from 'react';
import { advisories } from '../data/newsData';
import { useData } from '../context/DataContext';
import { DownloadProgressModal } from './DownloadProgressModal';
import { 
  BookOpen, Calendar, Clock, ArrowRight, ShieldAlert, 
  FileText, ExternalLink, X, Share2, Sparkles, Filter 
} from 'lucide-react';

export function NewsSection() {
  const { news } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [gazetteDownload, setGazetteDownload] = useState(null);

  const categories = ['All', 'Wage Order', 'Productivity', 'Kasambahay', 'E-Services', 'GAD Corner'];

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'All') return news;
    return news.filter(item => item.category === selectedCategory);
  }, [selectedCategory, news]);

  return (
    <section id="news" className="py-10 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>NWPC Press Room & Advisories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Latest News, Wage Orders & Statements
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main News Articles Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4 text-center">
                        <BookOpen className="w-10 h-10 text-amber-400/80" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-900 text-white shadow-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 hover:text-blue-900 transition leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900">
                  <span>Read Full Release</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Official Commission Advisories & Gazette */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Advisories Card */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  NWPC Advisories
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-800">
                  Official Guidance
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {advisories.map((adv) => (
                  <div
                    key={adv.id}
                    onClick={() => {
                      alert(`Advisory Reference: ${adv.ref}\n\nTitle: ${adv.title}\n\nThis advisory contains binding guidelines issued by the Commission under RA 6727.`);
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono mb-1">
                      <span>{adv.ref}</span>
                      <span className="text-slate-400 text-[10px]">{adv.date}</span>
                    </div>
                    <div className="text-xs font-bold text-white hover:text-amber-300 transition line-clamp-2">
                      {adv.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wage Gazette / Publications Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-800" />
                The Wage Gazette
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                Official Compendium of Philippine Wage Orders & Decisions
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Access verified jurisprudence, RTWPB public hearing minutes, and economic research journals on real wage developments in the Philippines.
              </p>
              <button
                onClick={() => setGazetteDownload({
                  region: 'National Compendium',
                  regionFullName: 'All 17 Regional Tripartite Wages and Productivity Boards',
                  wageOrderNo: 'NWPC Official Wage Gazette (2026 Edition)',
                  jurisdictionCities: 'Nationwide Private Sector Jurisdictions',
                  effectiveDate: '2026 Comprehensive Edition',
                  nonAgriculture: 755,
                  agriculture: 401,
                  kasambahayRate: 6500,
                  rates: [
                    { sector: 'NCR Non-Agriculture Floor', basicRate: 755, cola: 0, totalDailyRate: 755 },
                    { sector: 'Regional Minimum Floor (BARMM)', basicRate: 401, cola: 0, totalDailyRate: 401 }
                  ]
                })}
                className="w-full mt-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                Download Latest Wage Gazette
              </button>
            </div>

          </div>

        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 relative">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400">
                  Published: {activeArticle.date}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                Source: {activeArticle.author}
              </div>

              {activeArticle.image && (
                <div className="my-4 h-64 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-4">
                {activeArticle.content}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  National Wages and Productivity Commission
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share Release
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Official Compendium Download Progress Dialog */}
      <DownloadProgressModal
        isOpen={!!gazetteDownload}
        onClose={() => setGazetteDownload(null)}
        documentData={gazetteDownload}
      />
    </section>
  );
}
