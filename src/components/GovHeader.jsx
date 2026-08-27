import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Clock, Lock 
} from 'lucide-react';

export function GovHeader({ onOpenAbout, onOpenAdmin }) {
  const [pstTime, setPstTime] = useState('');

  useEffect(() => {
    const updatePst = () => {
      const now = new Date();
      // Philippines is UTC+8
      const options = {
        timeZone: 'Asia/Manila',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setPstTime(new Intl.DateTimeFormat('en-PH', options).format(now));
    };

    updatePst();
    const interval = setInterval(updatePst, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-1.5 gap-2">
          
          {/* Left: GOVPH Official Tag & Links */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href="https://www.gov.ph" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 font-bold tracking-wider text-amber-400 hover:text-amber-300 transition"
            >
              <span className="text-sm font-black tracking-widest text-white hover:text-amber-300">
                GOVPH
              </span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button 
              onClick={onOpenAbout}
              className="hover:text-amber-300 transition hidden sm:flex items-center gap-1 text-slate-300"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Transparency Seal
            </button>
            <a 
              href="https://www.foi.gov.ph" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition hidden md:flex items-center gap-1 text-slate-300"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              FOI Portal
            </a>
            <span className="text-slate-400 hover:text-slate-200 transition hidden lg:inline">
              Citizen's Charter
            </span>
          </div>

          {/* Right: PST Clock & Admin Portal Shortcut */}
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px] font-medium tracking-tight">
                PST: {pstTime || 'Loading...'}
              </span>
            </div>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded border border-amber-500/40 hover:border-amber-400 transition"
                title="Open NWPC Admin Management Console"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                Admin Portal
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
