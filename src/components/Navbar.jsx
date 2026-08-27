import React, { useState } from 'react';
import { 
  Search, Menu, X, ChevronDown, Award, Briefcase, 
  Layers, Phone, HelpCircle, FileSpreadsheet, 
  ExternalLink, Building2, UserCheck, ShieldCheck, 
  Users, BookOpen, Landmark, Lock
} from 'lucide-react';

export function Navbar({ 
  onOpenSearch, 
  onOpenAbout, 
  onOpenTraining, 
  onNavigateTo,
  onOpenAgencies,
  onOpenAdmin,
  currentPage = 'home'
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNavClick = (sectionId) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigateTo(sectionId);
  };

  const handleAgenciesClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onOpenAgencies();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Main Branding Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left-Aligned Official NWPC Logo */}
          <div 
            className="flex items-center cursor-pointer py-1 text-left" 
            onClick={() => handleNavClick('hero')}
            title="National Wages and Productivity Commission - Home"
          >
            <img 
              src={`${import.meta.env.BASE_URL}nwpc-header-logo.png`} 
              alt="Department of Labor and Employment - National Wages and Productivity Commission" 
              className="h-12 sm:h-14 md:h-16 lg:h-16 w-auto object-contain object-left"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${import.meta.env.BASE_URL}nwpc-logo.png`;
              }}
            />
          </div>

          {/* Right-Aligned Action Tools & Bagong Pilipinas */}
          <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
            {/* Bagong Pilipinas Logo */}
            <div className="hidden sm:flex items-center pr-1">
              <img 
                src={`${import.meta.env.BASE_URL}bagong-pilipinas-logo.png`} 
                alt="Bagong Pilipinas" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium transition"
              title="Search Portal (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-blue-900" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden lg:inline text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-300 text-slate-500 font-mono">⌘K</kbd>
            </button>

            {/* Free Training Request Action */}
            <button
              onClick={onOpenTraining}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition"
            >
              <Award className="w-3.5 h-3.5" />
              Request Training
            </button>

            {/* Admin Console Action */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/40 shadow-sm transition"
                title="Admin Management Console"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Admin
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-blue-900 text-white border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1 text-sm font-semibold">
            
            {/* Home */}
            <li>
              <button
                onClick={() => handleNavClick('hero')}
                className={`px-3.5 py-2.5 transition flex items-center gap-1 font-bold ${
                  currentPage === 'home' ? 'text-amber-300 bg-blue-950/40' : 'hover:bg-blue-800 text-white'
                }`}
              >
                HOME
              </button>
            </li>

            {/* About Us Dropdown */}
            <li className="relative group" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                onClick={onOpenAbout}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1"
              >
                ABOUT US
                <ChevronDown className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute left-0 top-full w-64 bg-white text-slate-800 rounded-b-lg shadow-lg border border-slate-200 py-2 hidden group-hover:block z-50">
                <button 
                  onClick={onOpenAbout}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  Mandate & Legal Basis (RA 6727)
                </button>
                <button 
                  onClick={onOpenAbout}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-700" />
                  Vision, Mission & Quality Policy
                </button>
                <button 
                  onClick={onOpenAbout}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-indigo-700" />
                  Commission Members & Board Officials
                </button>
                <button 
                  onClick={() => handleNavClick('rtwpb')}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-amber-700" />
                  Regional Tripartite Boards (RTWPBs)
                </button>
              </div>
            </li>

            {/* Attached Agencies - Direct Next Page Link */}
            <li>
              <button
                onClick={handleAgenciesClick}
                className={`px-3.5 py-2.5 transition flex items-center font-bold ${
                  currentPage === 'agencies' ? 'text-amber-300 bg-blue-950/60 ring-1 ring-amber-300/40' : 'hover:bg-blue-800 text-white'
                }`}
              >
                AGENCIES
              </button>
            </li>

            {/* Wage Dropdown */}
            <li className="relative group" onMouseEnter={() => setActiveDropdown('wage')} onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                onClick={() => handleNavClick('wage-matrix')}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1"
              >
                WAGE
                <ChevronDown className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute left-0 top-full w-72 bg-white text-slate-800 rounded-b-lg shadow-lg border border-slate-200 py-2 hidden group-hover:block z-50">
                <button 
                  onClick={() => handleNavClick('wage-matrix')}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-700" />
                  Daily Minimum Wage Rates (17 Regions)
                </button>
                <button 
                  onClick={() => handleNavClick('wage-matrix')}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  Kasambahay (Domestic Worker) Wages
                </button>
                <button 
                  onClick={() => handleNavClick('faqs')}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  Two-Tiered Wage System (TTWS) FAQs
                </button>
              </div>
            </li>

            {/* Productivity Dropdown */}
            <li className="relative group" onMouseEnter={() => setActiveDropdown('productivity')} onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                onClick={() => handleNavClick('productivity')}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1"
              >
                PRODUCTIVITY
                <ChevronDown className="w-3.5 h-3.5 text-blue-200 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute left-0 top-full w-72 bg-white text-slate-800 rounded-b-lg shadow-lg border border-slate-200 py-2 hidden group-hover:block z-50">
                <button 
                  onClick={() => handleNavClick('productivity')}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-green-700" />
                  Productivity Toolbox (7S, ISTIV, Lean, Green ME)
                </button>
                <button 
                  onClick={onOpenTraining}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-700" />
                  Free Online Training Request Portal
                </button>
                <button 
                  onClick={() => handleNavClick('productivity')}
                  className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-100 hover:text-blue-900 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-rose-700" />
                  Productivity Olympics & Awards
                </button>
              </div>
            </li>

            {/* Media & News */}
            <li>
              <button
                onClick={() => handleNavClick('news')}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1"
              >
                MEDIA & NEWS
              </button>
            </li>

            {/* FAQs */}
            <li>
              <button
                onClick={() => handleNavClick('faqs')}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1 text-emerald-300 font-semibold"
              >
                FAQS
              </button>
            </li>

            {/* RTWPBs Directory */}
            <li>
              <button
                onClick={() => handleNavClick('rtwpb')}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1"
              >
                REGIONAL BOARDS
              </button>
            </li>

            {/* Contact Us */}
            <li>
              <button
                onClick={() => handleNavClick('footer')}
                className="px-3.5 py-2.5 hover:bg-blue-800 transition flex items-center gap-1"
              >
                CONTACT US
              </button>
            </li>

          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('hero')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-amber-400 font-bold text-sm"
            >
              HOME
            </button>
            <button
              onClick={handleAgenciesClick}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-amber-300 text-sm font-bold"
            >
              ATTACHED AGENCIES
            </button>
            <button
              onClick={onOpenAbout}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 text-sm flex items-center justify-between"
            >
              <span>ABOUT US</span>
              <ShieldCheck className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('wage-matrix')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 text-sm flex items-center justify-between"
            >
              <span>DAILY MINIMUM WAGE RATES</span>
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => handleNavClick('productivity')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 text-sm flex items-center justify-between"
            >
              <span>PRODUCTIVITY TOOLBOX & TRAINING</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </button>
            <button
              onClick={() => handleNavClick('news')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 text-sm flex items-center justify-between"
            >
              <span>NEWS & ADVISORIES</span>
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-emerald-400 text-sm flex items-center justify-between font-bold"
            >
              <span>FAQS (KNOWLEDGE BASE)</span>
              <HelpCircle className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => handleNavClick('rtwpb')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-slate-200 text-sm flex items-center justify-between"
            >
              <span>RTWPBs REGIONAL DIRECTORY</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="w-full text-left py-2 px-3 rounded bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-sm font-bold flex items-center justify-between"
            >
              <span>ADMIN MANAGEMENT CONSOLE</span>
              <Lock className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={onOpenTraining}
              className="w-full text-left py-2 px-3 rounded bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold mt-2 text-center"
            >
              REQUEST FREE TRAINING
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
