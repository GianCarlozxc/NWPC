import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { productivityModules } from '../data/productivityData';
import { 
  X, CheckCircle, Award, Building, 
  Send, ShieldCheck, Mail, Phone, User, Calendar 
} from 'lucide-react';

export function TrainingModal({ isOpen, onClose, initialModule = '7s' }) {
  const { wages, addTrainingApplication } = useData();
  // Helper to resolve initial module ID
  const resolveModuleId = (mod) => {
    if (!mod) return '7s';
    const found = productivityModules.find(m => 
      m.id === mod || 
      m.title.toLowerCase().includes(mod.toLowerCase()) || 
      mod.toLowerCase().includes(m.id) ||
      mod.toLowerCase().includes(m.code.toLowerCase())
    );
    return found ? found.id : '7s';
  };

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    region: 'NCR',
    module: resolveModuleId(initialModule),
    paxCount: '10',
    preferredMode: 'Zoom / Hybrid Webinar',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdRefCode, setCreatedRefCode] = useState('');

  // Sync module whenever initialModule changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        module: resolveModuleId(initialModule)
      }));
      setSubmitted(false);
      setCreatedRefCode('');
    }
  }, [isOpen, initialModule]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedMod = productivityModules.find(m => m.id === formData.module) || productivityModules[0];
    
    if (addTrainingApplication) {
      const created = addTrainingApplication({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        designation: formData.designation || 'Representative',
        email: formData.email,
        phone: formData.phone,
        region: formData.region,
        moduleId: formData.module,
        moduleTitle: selectedMod.title,
        paxCount: formData.paxCount,
        preferredMode: formData.preferredMode,
        notes: formData.notes
      });
      setCreatedRefCode(created?.referenceCode || `TRN-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      setCreatedRefCode(`TRN-${Math.floor(100000 + Math.random() * 900000)}`);
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const selectedModuleObj = productivityModules.find(m => m.id === formData.module) || productivityModules[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Training Request Submitted!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong>{formData.contactPerson}</strong>. Your training application for <strong>{formData.companyName}</strong> has been routed to the <strong>RTWPB {formData.region}</strong> Training Secretariat and recorded in the NWPC portal system.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 text-left space-y-1">
              <div><strong>Reference Code:</strong> <span className="font-mono text-blue-900 font-bold">{createdRefCode}</span></div>
              <div><strong>Selected Module:</strong> {selectedModuleObj.title} ({selectedModuleObj.code})</div>
              <div><strong>Delivery Mode:</strong> {formData.preferredMode}</div>
              <div><strong>Official Notice:</strong> A DOLE training coordinator will contact you at <em>{formData.email}</em> / <em>{formData.phone}</em> within 2 working days.</div>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div>
            {/* Form Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  DOLE-NWPC Free Public Service
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  Request Free Productivity Training / Assistance
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
              
              {/* Pre-Selected Module Notification Banner */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-900 text-white text-[10px] font-bold rounded">
                    ENROLLING IN
                  </span>
                  <span className="font-bold text-blue-950 text-xs sm:text-sm">
                    {selectedModuleObj.title}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  100% FREE
                </span>
              </div>

              {/* Company & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Enterprise Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Manufacturing Corp."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="juan@company.com.ph"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile / Landline No. *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0917-000-0000 / (02) 8000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Module Dropdown Selection & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Productivity Module *</label>
                  <select
                    value={formData.module}
                    onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                  >
                    {productivityModules.map(m => (
                      <option key={m.id} value={m.id}>{m.title} ({m.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operating Region / RTWPB *</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {(wages || []).map(w => (
                      <option key={w.id} value={w.region}>{w.region} - {w.regionFullName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Estimated Pax & Preferred Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Number of Participants</label>
                  <select
                    value={formData.paxCount}
                    onChange={(e) => setFormData({ ...formData, paxCount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="1-5">1 - 5 Employees</option>
                    <option value="6-10">6 - 10 Employees</option>
                    <option value="11-25">11 - 25 Employees</option>
                    <option value="26+">26+ Employees (Exclusive Enterprise Batch)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Training Mode</label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Online via Zoom">Online via Zoom</option>
                    <option value="Onsite Company Workshop">Onsite Company Workshop</option>
                    <option value="RTWPB Regional Center (Face-to-Face)">RTWPB Regional Center (Face-to-Face)</option>
                  </select>
                </div>
              </div>

              {/* Additional Inquiries / Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Productivity Concerns / Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Workplace clutter, high scrap rate, customer complaints, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>

              {/* Policy note */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>DOLE Guarantee:</strong> All NWPC productivity toolbox trainings and technical coaching modules are subsidized by the government and completely free of charge for Philippine enterprises.
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Training Enrollment</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
