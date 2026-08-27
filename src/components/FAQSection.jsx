import React, { useState, useMemo } from 'react';
import { faqCategories } from '../data/faqData';
import { useData } from '../context/DataContext';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  Check, Copy 
} from 'lucide-react';

export function FAQSection() {
  const { faqs } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 0: true, 21: true, 25: true });
  const [copiedId, setCopiedId] = useState(null);

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all = {};
    filteredFaqs.forEach(item => { all[item.id] = true; });
    setOpenItems(all);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        item.question.toLowerCase().includes(q) || 
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery, faqs]);

  const handleCopyFaq = (item) => {
    const text = `NWPC FAQ:
Q: ${item.question}
A: ${item.answer}
Source: National Wages and Productivity Commission (NWPC - DOLE) https://nwpc.dole.gov.ph/faqs/`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="faqs" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-100 text-blue-900 mb-2 border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-800" />
            <span>Official DOLE-NWPC Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Official guidelines on minimum wage determination, exemption rules, wage distortion resolution, Two-Tiered Wage System (2TWS), and AERW reporting.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm mb-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search questions, topics, exemptions, 2TWS..."
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

            {/* Quick Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-300 transition"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-300 transition"
              >
                Collapse All
              </button>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {faqCategories.map((cat, idx) => {
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

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
              No questions found matching "<strong className="text-slate-800">{searchQuery}</strong>". Try searching for "exemption", "distortion", "2TWS", or "wage order".
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-colors shadow-sm overflow-hidden ${
                    isOpen ? 'border-blue-400 ring-1 ring-blue-300' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isOpen ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Q
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-0.5">
                          {item.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className="p-1 rounded-full text-slate-400 hover:text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-blue-900" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Answer Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <div className="pl-9 space-y-3">
                        <p className="whitespace-pre-line text-slate-800 leading-relaxed">
                          {item.answer}
                        </p>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                          <span className="text-[11px] text-slate-500 font-medium">
                            Republic Act No. 6727 • NWPC Omnibus Rules
                          </span>

                          <button
                            onClick={() => handleCopyFaq(item)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:text-blue-950 hover:underline"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-blue-800" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
