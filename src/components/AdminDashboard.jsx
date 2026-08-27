import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ConfirmModal } from './ConfirmModal';
import { TrainingApplicationsManager } from './TrainingApplicationsManager';
import { 
  Lock, Key, LogOut, Save, RotateCcw, 
  FileSpreadsheet, HelpCircle, Newspaper, 
  Calendar, Settings, Plus, Trash2, Edit3, 
  Check, ArrowLeft, Shield, AlertCircle, Eye,
  Building, Phone, Mail, Globe, Sparkles, CheckCircle2,
  Image as ImageIcon, Upload, X as CloseIcon, GraduationCap 
} from 'lucide-react';

export function AdminDashboard({ onBackToLiveSite }) {
  const {
    wages, setWages,
    news, setNews,
    schedules, setSchedules,
    faqs, setFaqs,
    settings, setSettings,
    trainingApplications,
    summaryStats,
    isAuthenticated, login, logout,
    resetToDefaults
  } = useData();

  // Login Form State
  const [username, setUsername] = useState('admin@nwpc.dole.gov.ph');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab: 'wages' | 'faqs' | 'news' | 'schedules' | 'applications' | 'settings'
  const [activeTab, setActiveTab] = useState('wages');
  const [savedNotification, setSavedNotification] = useState('');

  // Custom Confirmation Dialog Modal State
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    type: 'danger',
    onConfirm: () => {}
  });

  // Editing Modals / States
  const [editingWage, setEditingWage] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isNewFaq, setIsNewFaq] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [isNewNews, setIsNewNews] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isNewSchedule, setIsNewSchedule] = useState(false);

  const showNotification = (msg) => {
    setSavedNotification(msg);
    setTimeout(() => setSavedNotification(''), 3000);
  };

  // --- Handlers: Login ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = login(username, password);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setLoginError('');
    }
  };

  // --- Handlers: Wage Editing ---
  const handleSaveWage = (e) => {
    e.preventDefault();
    if (!editingWage) return;
    setWages(prev => prev.map(w => w.id === editingWage.id ? editingWage : w));
    setEditingWage(null);
    showNotification(`Updated rates for ${editingWage.region}`);
  };

  // --- Handlers: FAQ ---
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!editingFaq) return;
    if (isNewFaq) {
      const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 0;
      setFaqs(prev => [{ ...editingFaq, id: newId }, ...prev]);
      showNotification('New FAQ successfully added');
    } else {
      setFaqs(prev => prev.map(f => f.id === editingFaq.id ? editingFaq : f));
      showNotification('FAQ successfully updated');
    }
    setEditingFaq(null);
    setIsNewFaq(false);
  };

  const handleDeleteFaq = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete FAQ Item?',
      message: 'Are you sure you want to delete this FAQ question and answer? It will be immediately removed from the knowledge base.',
      confirmText: 'Delete FAQ',
      type: 'danger',
      onConfirm: () => {
        setFaqs(prev => prev.filter(f => f.id !== id));
        showNotification('FAQ item deleted');
      }
    });
  };

  // --- Handlers: News ---
  const handleSaveNews = (e) => {
    e.preventDefault();
    if (!editingNews) return;
    if (isNewNews) {
      const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
      setNews(prev => [{ ...editingNews, id: newId }, ...prev]);
      showNotification('New announcement posted');
    } else {
      setNews(prev => prev.map(n => n.id === editingNews.id ? editingNews : n));
      showNotification('Article updated');
    }
    setEditingNews(null);
    setIsNewNews(false);
  };

  const handleDeleteNews = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Press Release / Advisory?',
      message: 'Are you sure you want to delete this news article? It will be removed from the public portal.',
      confirmText: 'Delete Article',
      type: 'danger',
      onConfirm: () => {
        setNews(prev => prev.filter(n => n.id !== id));
        showNotification('Article deleted');
      }
    });
  };

  // --- Handlers: Schedule ---
  const handleSaveSchedule = (e) => {
    e.preventDefault();
    if (!editingSchedule) return;
    if (isNewSchedule) {
      const newId = `ts-${Date.now()}`;
      setSchedules(prev => [...prev, { ...editingSchedule, id: newId }]);
      showNotification('Training schedule batch added');
    } else {
      setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? editingSchedule : s));
      showNotification('Schedule updated');
    }
    setEditingSchedule(null);
    setIsNewSchedule(false);
  };

  const handleDeleteSchedule = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Remove Training Schedule Batch?',
      message: 'Are you sure you want to delete this training batch schedule?',
      confirmText: 'Remove Schedule',
      type: 'danger',
      onConfirm: () => {
        setSchedules(prev => prev.filter(s => s.id !== id));
        showNotification('Training batch removed');
      }
    });
  };

  // --- Handlers: Settings ---
  const handleSaveSettings = (e) => {
    e.preventDefault();
    showNotification('Portal settings updated and saved to live site');
  };

  // -------------------------------------------------------------
  // If not authenticated, render Clean Login Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-200">
          
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              NWPC Portal Admin
            </h2>
            <p className="text-xs text-slate-500">
              Content Management System & Wage Setting Console
            </p>
          </div>

          {loginError && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admin Email / Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 space-y-0.5">
              <div className="font-bold">Default Admin Credentials:</div>
              <div>Username: <code className="bg-white px-1 py-0.5 rounded border border-blue-200 font-mono">admin@nwpc.dole.gov.ph</code></div>
              <div>Password: <code className="bg-white px-1 py-0.5 rounded border border-blue-200 font-mono">admin123</code></div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition shadow flex items-center justify-center gap-1.5"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>Log In to Admin Console</span>
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-slate-100 text-center">
            <button
              onClick={onBackToLiveSite}
              className="text-xs font-semibold text-slate-500 hover:text-blue-900 flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Authenticated Admin Dashboard Layout
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      
      {/* Admin Top Navbar */}
      <header className="bg-blue-950 text-white border-b border-slate-800 sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Branding */}
            <div className="flex items-center space-x-3">
              <img src="/nwpc-seal.png" alt="NWPC Seal" className="w-9 h-9 object-contain" />
              <div>
                <div className="font-bold text-white text-sm">
                  NWPC Admin Management Console
                </div>
                <div className="text-[11px] text-blue-200">
                  Republic of the Philippines • DOLE Attached Agency
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={onBackToLiveSite}
                className="px-3.5 py-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded-lg transition border border-blue-700 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>View Live Site</span>
              </button>

              <button
                onClick={() => {
                  setConfirmState({
                    isOpen: true,
                    title: 'Reset All Data to Factory Defaults?',
                    message: 'Are you sure you want to restore all wage rates, FAQs, news releases, schedules, and settings back to initial official datasets? All manual edits will be overwritten.',
                    confirmText: 'Reset Defaults',
                    type: 'warning',
                    onConfirm: () => {
                      resetToDefaults();
                      showNotification('All portal datasets reset to default');
                    }
                  });
                }}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700 flex items-center gap-1"
                title="Reset to default seed data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset Defaults</span>
              </button>

              <button
                onClick={logout}
                className="px-3.5 py-2 bg-rose-700 hover:bg-rose-600 text-white font-semibold rounded-lg transition flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{savedNotification}</span>
        </div>
      )}

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 mb-6 scrollbar-thin">
          <button
            onClick={() => setActiveTab('wages')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wages' 
                ? 'bg-blue-900 text-white shadow' 
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Regional Wage Orders ({wages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'faqs' 
                ? 'bg-blue-900 text-white shadow' 
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs Knowledge Base ({faqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'news' 
                ? 'bg-blue-900 text-white shadow' 
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Press Releases & Advisories ({news.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'schedules' 
                ? 'bg-blue-900 text-white shadow' 
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Training Batches ({schedules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'applications' 
                ? 'bg-blue-900 text-white shadow' 
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Training Requests ({(trainingApplications || []).length})</span>
            {(trainingApplications || []).filter(a => a.status === 'Pending').length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ml-0.5">
                {(trainingApplications || []).filter(a => a.status === 'Pending').length} New
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings' 
                ? 'bg-blue-900 text-white shadow' 
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>General Site Settings</span>
          </button>
        </div>

        {/* -------------------------------------------------------- */}
        {/* TAB 1: REGIONAL WAGE ORDERS MANAGER */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'wages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Minimum Wage Matrix Management (17 Regional Boards)
                </h3>
                <p className="text-xs text-slate-500">
                  Edit Non-Agri rates, Agriculture rates, Kasambahay pay, and Wage Order effectivities. All updates immediately update the live matrix and calculators.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Wage Order No.</th>
                    <th className="py-3 px-4 text-right">Non-Agriculture</th>
                    <th className="py-3 px-4 text-right">Agriculture</th>
                    <th className="py-3 px-4 text-right">Kasambahay (Monthly)</th>
                    <th className="py-3 px-4">Effectivity Date</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {wages.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div>{w.region}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{w.regionFullName}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-900">
                        {w.wageOrderNo}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                        ₱ {w.nonAgriculture}.00
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-700">
                        ₱ {w.agriculture}.00
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-purple-900">
                        ₱ {w.kasambahayRate?.toLocaleString()}.00
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {w.effectiveDate}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setEditingWage({ ...w })}
                          className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Rates</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 2: FAQS KNOWLEDGE BASE MANAGER */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Frequently Asked Questions (FAQs) Repository
                </h3>
                <p className="text-xs text-slate-500">
                  Manage questions and answers displayed in the public Knowledge Base section.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewFaq(true);
                  setEditingFaq({
                    category: 'Minimum Wage & Wage Orders',
                    question: '',
                    answer: ''
                  });
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add New FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-4xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                      {faq.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setIsNewFaq(false);
                        setEditingFaq({ ...faq });
                      }}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
                      title="Edit Question"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs transition"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 3: PRESS RELEASES & ADVISORIES */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Press Releases & Wage Advisories Manager
                </h3>
                <p className="text-xs text-slate-500">
                  Publish or modify official news articles, wage advisories, and policy announcements.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewNews(true);
                  setEditingNews({
                    title: '',
                    category: 'Press Release',
                    date: '',
                    excerpt: '',
                    content: '',
                    image: '',
                    author: '',
                    tag: 'General'
                  });
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
                  {item.image && (
                    <div className="h-36 w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900 text-white shadow">
                        {item.category}
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-grow">
                    {!item.image && (
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.date}
                        </span>
                      </div>
                    )}
                    {item.image && (
                      <div className="text-[11px] text-slate-400 font-medium mb-1.5">
                        {item.date}
                      </div>
                    )}
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
                    <span className="text-slate-400 text-[11px]">Author: {item.author || 'NWPC'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsNewNews(false);
                          setEditingNews({ ...item });
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded transition"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 4: TRAINING BATCH SCHEDULES */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'schedules' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Productivity Training Calendar Schedules
                </h3>
                <p className="text-xs text-slate-500">
                  Add or edit nationwide MSME training dates, platforms, and slot availability.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsNewSchedule(true);
                  setEditingSchedule({
                    module: '',
                    moduleId: '',
                    date: '',
                    time: '',
                    venue: '',
                    slotsAvailable: 30,
                    fee: 'FREE',
                    status: 'Open'
                  });
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Training Batch</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Course / Module</th>
                    <th className="py-3 px-4">Schedule Date & Time</th>
                    <th className="py-3 px-4">Platform / Venue</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {schedules.map((ts) => (
                    <tr key={ts.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {ts.module}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{ts.date}</div>
                        <div className="text-[11px] text-slate-500">{ts.time}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {ts.venue}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ts.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ts.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsNewSchedule(false);
                              setEditingSchedule({ ...ts });
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition"
                            title="Edit Batch"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(ts.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded transition"
                            title="Delete Batch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 5: APPLICANT TRAINING REQUESTS & EXCEL DOWNLOAD */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'applications' && (
          <TrainingApplicationsManager
            setConfirmState={setConfirmState}
            showNotification={showNotification}
          />
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 6: GENERAL PORTAL SETTINGS */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Portal Contact Details & Global Settings
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Updates made here immediately change the addresses, hotline numbers, and social links across the footer and headers.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Central Office Address
                  </label>
                  <input
                    type="text"
                    value={settings.centralOfficeAddress}
                    onChange={(e) => setSettings({ ...settings, centralOfficeAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      DOLE Hotline & Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.doleHotline}
                      onChange={(e) => setSettings({ ...settings, doleHotline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Official Public Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={settings.officialEmail}
                      onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
                    Social Media Channels (Floating Sidebar Links)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Facebook Page URL</label>
                      <input
                        type="url"
                        value={settings.facebookUrl}
                        onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">X (Twitter) URL</label>
                      <input
                        type="url"
                        value={settings.xUrl}
                        onChange={(e) => setSettings({ ...settings, xUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL</label>
                      <input
                        type="url"
                        value={settings.youtubeUrl}
                        onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Viber Community URL</label>
                      <input
                        type="url"
                        value={settings.viberUrl}
                        onChange={(e) => setSettings({ ...settings, viberUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition shadow flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Save Global Settings</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>

      {/* -------------------------------------------------------- */}
      {/* MODAL: EDIT REGIONAL WAGE ORDER */}
      {/* -------------------------------------------------------- */}
      {editingWage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4">
              Edit Minimum Wage Rates — {editingWage.regionFullName}
            </h3>

            <form onSubmit={handleSaveWage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Non-Agriculture Daily (₱) *</label>
                  <input
                    type="number"
                    required
                    value={editingWage.nonAgriculture}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setEditingWage({
                        ...editingWage,
                        nonAgriculture: val,
                        rates: editingWage.rates.map((r, i) => i === 0 ? { ...r, basicRate: val, totalDailyRate: val } : r)
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 font-bold text-blue-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Agriculture Daily (₱) *</label>
                  <input
                    type="number"
                    required
                    value={editingWage.agriculture}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setEditingWage({
                        ...editingWage,
                        agriculture: val,
                        rates: editingWage.rates.map((r, i) => i === 1 ? { ...r, basicRate: val, totalDailyRate: val } : r)
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 font-bold text-emerald-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kasambahay Monthly (₱) *</label>
                  <input
                    type="number"
                    required
                    value={editingWage.kasambahayRate}
                    onChange={(e) => setEditingWage({ ...editingWage, kasambahayRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 font-bold text-purple-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Wage Order Number *</label>
                  <input
                    type="text"
                    required
                    value={editingWage.wageOrderNo}
                    onChange={(e) => setEditingWage({ ...editingWage, wageOrderNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Effectivity Date *</label>
                  <input
                    type="text"
                    required
                    value={editingWage.effectiveDate}
                    onChange={(e) => setEditingWage({ ...editingWage, effectiveDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Covered Cities & Municipalities</label>
                <textarea
                  rows={2}
                  value={editingWage.jurisdictionCities || ''}
                  onChange={(e) => setEditingWage({ ...editingWage, jurisdictionCities: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Legal Advisory / Notes</label>
                <textarea
                  rows={2}
                  value={editingWage.notes || ''}
                  onChange={(e) => setEditingWage({ ...editingWage, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingWage(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition"
                >
                  Save Wage Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT FAQ */}
      {/* -------------------------------------------------------- */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4">
              {isNewFaq ? 'Add New Knowledge Base FAQ' : 'Edit FAQ Item'}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="AERW Annual Wage Report">AERW Annual Wage Report</option>
                  <option value="Minimum Wage & Wage Orders">Minimum Wage & Wage Orders</option>
                  <option value="Wage Exemptions">Wage Exemptions</option>
                  <option value="Wage Distortion & 2TWS">Wage Distortion & 2TWS</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Question Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How are wage distortions resolved?"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Answer *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Provide complete official guidelines and legal basis..."
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT NEWS ARTICLE */}
      {/* -------------------------------------------------------- */}
      {editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4">
              {isNewNews ? 'Post New Announcement' : 'Edit Press Release / Advisory'}
            </h3>

            <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Press Release">Press Release</option>
                    <option value="Wage Advisory">Wage Advisory</option>
                    <option value="Productivity Hub">Productivity Hub</option>
                    <option value="Regional Milestone">Regional Milestone</option>
                    <option value="Gender & Development">Gender & Development</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="text"
                    value={editingNews.date}
                    onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>
              </div>

              {/* Featured Photo Upload & Preview */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-900" />
                    <span>Featured Article Photo (Syncs Live to Public Portal)</span>
                  </label>
                  {editingNews.image && (
                    <button
                      type="button"
                      onClick={() => setEditingNews({ ...editingNews, image: '' })}
                      className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                {editingNews.image ? (
                  <div className="relative h-36 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
                    <img 
                      src={editingNews.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      Photo Uploaded
                    </span>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center space-y-2 bg-white">
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="text-xs text-slate-600">
                      Upload an image file from your device or paste a web URL
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  {/* File Upload Input */}
                  <label className="w-full sm:w-auto px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg cursor-pointer transition flex items-center justify-center gap-1.5 text-xs shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 4 * 1024 * 1024) {
                          alert('Please select an image smaller than 4MB.');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (uploadEvent) => {
                          setEditingNews(prev => ({
                            ...prev,
                            image: uploadEvent.target.result
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>

                  {/* URL Text Input */}
                  <input
                    type="url"
                    placeholder="Or paste image URL (e.g. https://...)"
                    value={editingNews.image || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingNews.excerpt}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Content</label>
                <textarea
                  rows={6}
                  value={editingNews.content || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT TRAINING SCHEDULE */}
      {/* -------------------------------------------------------- */}
      {editingSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4">
              {isNewSchedule ? 'Add Training Batch Schedule' : 'Edit Training Schedule'}
            </h3>

            <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Module Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7S of Good Housekeeping for MSMEs"
                  value={editingSchedule.module}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, module: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Schedule Dates *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. May 15-16, 2026"
                    value={editingSchedule.date}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 9:00 AM - 4:00 PM"
                    value={editingSchedule.time}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Platform / Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Online via Zoom or RTWPB Training Hall"
                    value={editingSchedule.venue}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, venue: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingSchedule.status}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Open">Open</option>
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSchedule(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Clean Confirmation Dialog Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        type={confirmState.type}
        onConfirm={confirmState.onConfirm}
        onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
}
