import React from 'react';
import { 
  FileSpreadsheet, Layers, Users, 
  Building2, ArrowUpRight, Sparkles, Award, ShieldCheck,
  BookOpen, HelpCircle
} from 'lucide-react';

export function QuickLinks({ onNavigateTo, onOpenTraining, onOpenAbout }) {
  const links = [
    {
      title: "Daily Minimum Wage Rates",
      desc: "Complete matrix of Non-Agri and Agriculture rates across all 17 regions.",
      icon: FileSpreadsheet,
      iconBg: "bg-blue-900",
      badge: "Updated 2026",
      action: () => onNavigateTo('wage-matrix')
    },
    {
      title: "Productivity Toolbox",
      desc: "Explore 7S, ISTIV, Lean Management, Green ME, and book free DOLE training.",
      icon: Layers,
      iconBg: "bg-amber-700",
      badge: "Free MSME Assistance",
      action: () => onNavigateTo('productivity')
    },
    {
      title: "Kasambahay Rates & Rights",
      desc: "Domestic worker minimum monthly wage rates and statutory social benefit rules.",
      icon: Users,
      iconBg: "bg-indigo-900",
      badge: "RA 10361",
      action: () => onNavigateTo('wage-matrix')
    },
    {
      title: "Frequently Asked Questions",
      desc: "Comprehensive answers on wage orders, exemptions, 2TWS, and AERW.",
      icon: HelpCircle,
      iconBg: "bg-emerald-800",
      badge: "NWPC FAQs",
      action: () => onNavigateTo('faqs')
    },
    {
      title: "17 Regional Boards (RTWPBs)",
      desc: "Direct hotlines, emails, and office locations of all regional tripartite secretariats.",
      icon: Building2,
      iconBg: "bg-slate-800",
      badge: "Nationwide Directory",
      action: () => onNavigateTo('rtwpb')
    },
    {
      title: "Online Training Portal",
      desc: "Submit training requests for company productivity workshops and coaching.",
      icon: Award,
      iconBg: "bg-teal-800",
      badge: "E-Services",
      action: onOpenTraining
    }
  ];

  return (
    <section className="py-8 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Quick Access Hub
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Essential Public Services & Tools
            </h3>
          </div>
          <button
            onClick={onOpenAbout}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-950 hover:underline"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Learn About NWPC Mandate
          </button>
        </div>

        {/* 6 Grid Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {links.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${item.iconBg} text-white flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 hover:text-blue-900 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900">
                  <span>Access Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
