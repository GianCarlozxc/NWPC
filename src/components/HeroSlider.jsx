import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  ChevronLeft, ChevronRight, ArrowRight, Shield, 
  Users, BookOpen, ExternalLink, Sparkles, FileSpreadsheet 
} from 'lucide-react';

export function HeroSlider({ onNavigateTo, onOpenTraining }) {
  const { wages, summaryStats } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const ncrData = wages?.find(w => w.id === 'ncr') || wages?.[0] || {
    region: 'NCR',
    wageOrderNo: 'WO No. NCR-27',
    nonAgriculture: 755,
    agriculture: 718
  };

  const slides = [
    {
      id: 1,
      badge: "ANNUAL ESTABLISHMENT REVIEW",
      title: "2026 AERW Digital Submission Portal",
      subtitle: "Empowering Philippine enterprises with evidence-based wage metrics, industry compensation benchmarking, and productivity advisory.",
      accentColor: "bg-amber-400 hover:bg-amber-500 text-slate-950",
      buttonText: "Access AERW Portal",
      actionTarget: "wage-matrix",
      highlights: ["Free Industry Benchmarking", "Wage Distortion Prevention", "Online Compliance Tracker"]
    },
    {
      id: 2,
      badge: "WAGE POLICY UPDATE",
      title: `${ncrData.region} ${ncrData.wageOrderNo} & Regional Adjustments`,
      subtitle: `Daily minimum wage for Metro Manila workers set at ₱${ncrData.nonAgriculture}.00 for Non-Agri and ₱${ncrData.agriculture}.00 for Agri & Retail/Service establishments.`,
      accentColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      buttonText: "Explore 17 Regional Rates",
      actionTarget: "wage-matrix",
      highlights: ["Over 1.1M Workers Benefited", "Immediate Effectivity", "Includes Kasambahay Matrix"]
    },
    {
      id: 3,
      badge: "ENTERPRISE UPGRADE",
      title: "DOLE-NWPC Productivity Toolbox for MSMEs",
      subtitle: "Transform your operations with 7S Good Housekeeping, ISTIV values, Lean waste elimination, and Green ME eco-efficiency.",
      accentColor: "bg-green-600 hover:bg-green-700 text-white",
      buttonText: "Book Free Training",
      actionTarget: "productivity",
      highlights: ["100% Free DOLE Training", "Onsite & Zoom Workshops", "Productivity Olympics Pathway"]
    },
    {
      id: 4,
      badge: "GENDER & DEVELOPMENT (GAD)",
      title: "Mainstreaming Gender Equity & Safe Workplaces",
      subtitle: "Building inclusive, productive, and family-responsive workplaces under Republic Act No. 9710 (Magna Carta of Women).",
      accentColor: "bg-blue-600 hover:bg-blue-700 text-white",
      buttonText: "Learn About GAD Programs",
      actionTarget: "news",
      highlights: ["Workplace Ergonomics", "Lactation Stations", "Anti-Harassment Protocols"]
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section 
      className="relative bg-slate-900 text-white border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="hero"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-bold tracking-wider uppercase bg-slate-800 text-amber-400 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {current.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {current.subtitle}
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {current.highlights.map((h, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                  {h}
                </span>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTo(current.actionTarget)}
                className={`px-5 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 ${current.accentColor}`}
              >
                <span>{current.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTraining}
                className="px-5 py-3 rounded-lg font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
              >
                Free Training Programs
              </button>
            </div>
          </div>

          {/* Side Dynamic Card / Wage Snapshot */}
          <div className="lg:col-span-4">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Quick Reference (2026)
                </span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
                  DOLE-NWPC
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Highest Minimum Wage:</div>
                  <div className="text-xl font-mono font-bold text-emerald-400">
                    ₱{summaryStats.highestDailyRate.toFixed(2)}
                    <span className="text-xs text-slate-400 font-sans font-normal"> / day (NCR)</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Average Regional Floor:</div>
                  <div className="text-base font-mono font-bold text-white">
                    ₱{summaryStats.averageMinimumWage.toFixed(2)} / day
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Active Regional Wage Orders:</div>
                  <div className="text-base font-bold text-white">
                    17 Regions Nationwide
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTo('wage-matrix')}
                className="w-full mt-2 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded transition border border-blue-700 text-center"
              >
                View Full Regional Matrix →
              </button>
            </div>
          </div>

        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
