import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { 
  Printer, ArrowLeft, Search, 
  Calendar, Clock, Mail, Phone,
  X, CheckCircle2
} from 'lucide-react';

export function TrainingReportPage({ onBackToAdmin }) {
  const { trainingApplications } = useData();

  // Parse month from hash URL (e.g. #training-report?month=2026-08)
  const getInitialMonth = () => {
    try {
      const hash = window.location.hash;
      const queryIndex = hash.indexOf('?');
      if (queryIndex !== -1) {
        const params = new URLSearchParams(hash.substring(queryIndex));
        const m = params.get('month');
        if (m) return m;
      }
    } catch (e) {
      console.error(e);
    }
    return 'all';
  };

  const [selectedMonth, setSelectedMonth] = useState(getInitialMonth);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Format "2026-08" to "August 2026"
  const formatMonthLabel = (monthStr) => {
    if (!monthStr || monthStr === 'all') return 'All Months';
    const [year, month] = monthStr.split('-');
    if (!year || !month) return monthStr;
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Extract unique available months
  const availableMonths = useMemo(() => {
    const set = new Set();
    (trainingApplications || []).forEach(app => {
      if (app.monthYear) set.add(app.monthYear);
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [trainingApplications]);

  // Filtered dataset
  const filteredDataset = useMemo(() => {
    return (trainingApplications || []).filter(app => {
      if (selectedMonth !== 'all' && app.monthYear !== selectedMonth) {
        return false;
      }
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          app.companyName?.toLowerCase().includes(q) ||
          app.contactPerson?.toLowerCase().includes(q) ||
          app.referenceCode?.toLowerCase().includes(q) ||
          app.region?.toLowerCase().includes(q) ||
          app.moduleTitle?.toLowerCase().includes(q) ||
          app.email?.toLowerCase().includes(q) ||
          app.phone?.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [trainingApplications, selectedMonth, statusFilter, searchQuery]);

  // Month Statistics
  const stats = useMemo(() => {
    const apps = selectedMonth === 'all' 
      ? (trainingApplications || []) 
      : (trainingApplications || []).filter(a => a.monthYear === selectedMonth);
    return {
      total: apps.length,
      pending: apps.filter(a => a.status === 'Pending').length,
      reviewed: apps.filter(a => a.status === 'Reviewed').length,
      approved: apps.filter(a => a.status === 'Approved').length,
      completed: apps.filter(a => a.status === 'Completed').length,
    };
  }, [trainingApplications, selectedMonth]);

  const docRefNumber = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `DOC-REF: NWPC-TRN-${today}`;
  }, []);

  // Minimalist Status Badge
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Approved
          </span>
        );
      case 'Reviewed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
            Under Review
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200/60">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/60">
            Cancelled
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans print:bg-white print:p-0">
      
      {/* Precision A4 Portrait Print Stylesheet */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 10mm 6mm 10mm 6mm;
        }
        @media print {
          *, *:before, *:after {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            width: 100% !important;
            max-width: 100% !important;
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 7.5pt !important;
          }
          .print-hidden, .print\\:hidden {
            display: none !important;
          }
          .max-w-7xl, .page-container {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .overflow-x-auto {
            overflow: visible !important;
          }
          table {
            width: 100% !important;
            max-width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            font-size: 6.8pt !important;
            line-height: 1.2 !important;
            border: 1px solid #94a3b8 !important;
          }
          thead th {
            background-color: #f1f5f9 !important;
            color: #1e293b !important;
            border: 1px solid #cbd5e1 !important;
            padding: 4px 2px !important;
            font-size: 6.2pt !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            word-break: break-word !important;
            white-space: normal !important;
          }
          tbody td {
            padding: 3.5px 2px !important;
            border: 1px solid #e2e8f0 !important;
            font-size: 6.8pt !important;
            vertical-align: middle !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            white-space: normal !important;
          }
          td span, td div, td a {
            white-space: normal !important;
            word-break: break-word !important;
            font-size: 6.8pt !important;
          }
        }
      `}</style>

      {/* Top Subtle Gov Banner */}
      <div className="bg-white border-b border-slate-200/80 px-6 py-2 text-xs text-slate-500 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">GOVPH</span>
          <span>&bull;</span>
          <span>Republic of the Philippines</span>
          <span>&bull;</span>
          <span>National Wages and Productivity Commission</span>
        </div>
        <div className="text-slate-500">
          Philippine Standard Time: <span className="font-medium text-slate-700">{new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Clean Minimalist Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm print:border-none print:p-0 print:shadow-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3.5">
              <img 
                src="/nwpc-header-logo.png" 
                alt="NWPC DOLE Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => { e.target.src = '/nwpc-logo.png'; e.target.onerror = null; }} 
              />
            </div>

            <div className="text-left md:text-right space-y-0.5">
              <div className="inline-block bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium">
                {docRefNumber}
              </div>
              <div className="text-[11px] text-slate-400">
                Generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Report Sub-header & Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">
                  Training Assistance Requests & Enrollment Registry
                </h2>
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
                  {formatMonthLabel(selectedMonth)}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official registry of enterprise training applications submitted through the DOLE-NWPC Portal.
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              {onBackToAdmin ? (
                <button
                  onClick={onBackToAdmin}
                  className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs transition border border-slate-200 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Admin</span>
                </button>
              ) : (
                <button
                  onClick={() => window.close()}
                  className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs transition border border-slate-200 flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Minimalist Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 print:hidden">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Total Requests</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Pending Review</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Under Evaluation</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="text-2xl font-bold text-emerald-600">{stats.approved}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Approved & Scheduled</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.completed}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Completed</div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-xs print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search company, reference, contact, region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-slate-50/50 text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Month Selector in Report Page */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="font-medium text-slate-600 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Month:</span>
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                window.location.hash = `#training-report?month=${e.target.value}`;
              }}
              className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
            >
              <option value="all">All Months ({trainingApplications.length})</option>
              {availableMonths.map(my => (
                <option key={my} value={my}>{formatMonthLabel(my)}</option>
              ))}
            </select>
            <span className="text-slate-400 font-medium text-[11px]">
              ({filteredDataset.length} records)
            </span>
          </div>
        </div>

        {/* Minimalist Data Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden print:border print:border-slate-300 print:rounded-none print:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              
              {/* Minimalist Clean Table Header with Proportional Column Widths */}
              <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-2 text-center w-[4%] font-semibold">#</th>
                  <th className="py-3 px-3 w-[11%] font-semibold">Ref Code</th>
                  <th className="py-3 px-3 w-[11%] font-semibold">Date Submitted</th>
                  <th className="py-3 px-3 w-[18%] font-semibold">Enterprise / Company Name</th>
                  <th className="py-3 px-3 w-[12%] font-semibold">Contact Person</th>
                  <th className="py-3 px-3 w-[14%] font-semibold">Contact Info</th>
                  <th className="py-3 px-2 w-[8%] font-semibold text-center">Region</th>
                  <th className="py-3 px-3 w-[14%] font-semibold">Productivity Module</th>
                  <th className="py-3 px-2 w-[4%] font-semibold text-center">Pax</th>
                  <th className="py-3 px-3 w-[8%] font-semibold">Preferred Mode</th>
                </tr>
              </thead>

              {/* Clean Table Body */}
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDataset.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-14 text-center text-slate-400">
                      <div className="font-medium text-slate-600">No training applications found</div>
                      <div className="text-xs text-slate-400 mt-1">There are no records matching the selected criteria for {formatMonthLabel(selectedMonth)}.</div>
                    </td>
                  </tr>
                ) : (
                  filteredDataset.map((app, idx) => (
                    <tr key={app.id} className="hover:bg-slate-50/75 transition-colors">
                      
                      {/* Row Index */}
                      <td className="py-3 px-4 text-center font-mono text-slate-400 text-xs">
                        {idx + 1}
                      </td>

                      {/* Reference Code */}
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                          {app.referenceCode || app.id}
                        </span>
                      </td>

                      {/* Date Submitted */}
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {app.submissionDate || 'N/A'}
                      </td>

                      {/* Company Name & Notes */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 text-[13px]">{app.companyName}</div>
                        {app.notes && (
                          <div className="text-[11px] text-slate-400 italic mt-0.5 truncate max-w-xs">
                            Note: {app.notes}
                          </div>
                        )}
                      </td>

                      {/* Contact Person */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">{app.contactPerson}</div>
                        <div className="text-[11px] text-slate-400">{app.designation || 'Representative'}</div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div>
                          <a href={`mailto:${app.email}`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            {app.email}
                          </a>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{app.phone}</div>
                      </td>

                      {/* Region */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium">
                          RTWPB {app.region}
                        </span>
                      </td>

                      {/* Productivity Module */}
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {app.moduleTitle || app.moduleId}
                      </td>

                      {/* Pax */}
                      <td className="py-3 px-4 text-center font-semibold text-slate-800">
                        {app.paxCount}
                      </td>

                      {/* Delivery Mode */}
                      <td className="py-3 px-4 text-slate-600">
                        {app.preferredMode}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Minimalist Printable Signatures Block */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-10 text-xs">
          <div>
            <div className="border-t border-slate-300 pt-2.5 mt-8">
              <div className="font-semibold text-slate-900">NWPC Training Secretariat</div>
              <div className="text-slate-400 text-[11px]">Enterprise Assistance & Technical Services Division</div>
            </div>
          </div>

          <div>
            <div className="border-t border-slate-300 pt-2.5 mt-8">
              <div className="font-semibold text-slate-900">Regional Board Secretary</div>
              <div className="text-slate-400 text-[11px]">Regional Tripartite Wages and Productivity Board (RTWPB)</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
