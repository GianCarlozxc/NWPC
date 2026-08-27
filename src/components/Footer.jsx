import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, Phone, Mail, MapPin, Globe, 
  ShieldCheck, FileText, ExternalLink, Heart, Lock 
} from 'lucide-react';

export function Footer({ onNavigateTo, onOpenAbout, onOpenTraining, onOpenAdmin }) {
  const { settings } = useData();

  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner Contact Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            
            {/* Central Office Address */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Central Office</span>
                <span className="text-white font-medium text-[11px] leading-tight block">
                  {settings.centralOfficeAddress}
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-semibold block mt-0.5">
                  Tel: (02) {settings.centralOfficePhone}
                </span>
              </div>
            </div>

            {/* DOLE Hotline & Telephone */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">DOLE Hotline</span>
                <span className="text-white font-mono font-bold text-sm block">{settings.doleHotline}</span>
                <span className="text-[10px] text-slate-400">DOLE Short Code: {settings.doleShortCode || '1349'}</span>
              </div>
            </div>

            {/* Official Inquiries */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Official Inquiries</span>
                <a href={`mailto:${settings.officialEmail}`} className="text-amber-400 hover:underline font-medium text-[11px] block">
                  {settings.officialEmail}
                </a>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center justify-start md:justify-end">
              <button
                onClick={onOpenTraining}
                className="w-full md:w-auto px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold text-xs shadow-sm transition"
              >
                Request Free Training
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: NWPC About with authentic seal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/nwpc-seal.png" 
                alt="NWPC Official Seal" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
                  National Wages and Productivity Commission
                </h4>
                <p className="text-[11px] text-slate-400">
                  Department of Labor and Employment (DOLE)
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              An attached agency of the DOLE mandated by Republic Act No. 6727 to formulate policies on wages, incomes, and productivity, and to coordinate the operations of the 17 Regional Tripartite Wages and Productivity Boards.
            </p>

            {/* Official Government Badges in Footer */}
            <div className="flex items-center gap-3 pt-2">
              <img 
                src="/transparency-seal.png" 
                alt="Transparency Seal" 
                className="h-10 w-auto object-contain cursor-pointer hover:opacity-90 transition"
                onClick={onOpenAbout}
                title="Transparency Seal"
              />
              <a 
                href="https://www.foi.gov.ph/agencies/nwpc/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/foi-logo.png" 
                  alt="Freedom of Information" 
                  className="h-10 w-auto object-contain hover:opacity-90 transition"
                  title="Freedom of Information (FOI)"
                />
              </a>
              <img 
                src="/bagong-pilipinas-logo.png" 
                alt="Bagong Pilipinas" 
                className="h-10 w-auto object-contain"
                title="Bagong Pilipinas"
              />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTo('wage-matrix')} className="hover:text-amber-400 transition">
                  Daily Minimum Wage Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('productivity')} className="hover:text-amber-400 transition">
                  Productivity Toolbox (7S, ISTIV)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('news')} className="hover:text-amber-400 transition">
                  News & Press Releases
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('faqs')} className="hover:text-amber-400 transition">
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('rtwpb')} className="hover:text-amber-400 transition">
                  17 Regional Boards Directory
                </button>
              </li>
              <li>
                <button onClick={onOpenTraining} className="hover:text-amber-400 transition">
                  Online Training Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Attached DOLE Agencies */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              DOLE Family
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.dole.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  DOLE Central Portal <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://nlrc.dole.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  NLRC Commission <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://ncmb.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  NCMB Conciliation <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://tesda.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  TESDA Skills <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://owwa.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  OWWA Welfare <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Republic of the Philippines GOVPH */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Republic of the Philippines
            </h5>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src="/gov-seal-footer.png" 
                alt="Republic of the Philippines Seal" 
                className="w-10 h-10 object-contain opacity-80"
              />
              <span className="text-[11px] text-slate-300 font-semibold leading-tight">
                Official National Government
              </span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                  Official Gazette (gov.ph)
                </a>
              </li>
              <li>
                <a href="https://president.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                  Office of the President
                </a>
              </li>
              <li>
                <a href="https://senate.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                  Senate of the Philippines
                </a>
              </li>
              <li>
                <a href="https://congress.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                  House of Representatives
                </a>
              </li>
              <li>
                <a href="https://sc.judiciary.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                  Supreme Court
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} National Wages and Productivity Commission (NWPC). All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onOpenAbout} className="hover:text-white transition">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenAbout} className="hover:text-white transition">
              Terms of Use
            </button>
            <span>•</span>
            <button 
              onClick={onOpenAdmin} 
              className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-400 transition"
              title="NWPC Management Portal (/admin)"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
