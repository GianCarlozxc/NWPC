import React from 'react';
import { 
  X, ShieldCheck, Award, Target, Eye, 
  Users, CheckCircle2, FileText, Scale 
} from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200">
          <img 
            src={`${import.meta.env.BASE_URL}nwpc-seal.png`} 
            alt="NWPC Seal" 
            className="w-14 h-14 object-contain"
          />
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              About the Commission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              National Wages and Productivity Commission
            </h2>
            <span className="text-xs text-slate-500">Department of Labor and Employment (DOLE)</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Mandate & Legal Basis */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <ShieldCheck className="w-5 h-5 text-blue-900" />
              <span>Mandate & Legal Basis (Republic Act No. 6727)</span>
            </div>
            <p>
              The <strong>National Wages and Productivity Commission (NWPC)</strong> is a key attached agency of the Department of Labor and Employment (DOLE) created pursuant to <strong>Republic Act No. 6727</strong>, otherwise known as the <em>Wage Rationalization Act</em> of 1989.
            </p>
            <p>
              NWPC serves as the advisory body to the President and Congress on matters relating to wages, incomes, and productivity. It exercises technical and administrative supervision over the <strong>17 Regional Tripartite Wages and Productivity Boards (RTWPBs)</strong> nationwide.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-blue-900 text-sm mb-2">
                <Eye className="w-4 h-4 text-blue-800" />
                <span>Our Vision</span>
              </div>
              <p className="text-xs text-slate-700">
                A nationally recognized leader in wage and productivity policies, promoting sustainable enterprise growth and equitable distribution of income towards social justice and human development.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-2">
                <Target className="w-4 h-4 text-emerald-800" />
                <span>Our Mission</span>
              </div>
              <p className="text-xs text-slate-700">
                To formulate policies on wages, incomes, and productivity, and ensure their effective implementation through proactive tripartite consultation and capacity building of MSMEs.
              </p>
            </div>
          </div>

          {/* Quality Policy */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Quality Policy (ISO 9001:2015 Certified)</span>
            </div>
            <p className="text-xs text-slate-600">
              We, the officials and employees of the NWPC, commit to delivering excellent, prompt, transparent, and gender-responsive services in wage determination and productivity improvement, adhering to highest public service standards.
            </p>
          </div>

          {/* Commission Structure */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Users className="w-5 h-5 text-indigo-900" />
              <span>Composition of the Commission</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900">Secretary of Labor and Employment</div>
                <div className="text-slate-500 text-[11px]">Chairperson Ex-Officio</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900">NEDA Director General / Secretary</div>
                <div className="text-slate-500 text-[11px]">Vice-Chairperson Ex-Officio</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900">NWPC Executive Director</div>
                <div className="text-slate-500 text-[11px]">Executive Head & Secretariat</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900">Workers & Employers Representatives</div>
                <div className="text-slate-500 text-[11px]">Tripartite Members appointed by the President</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
