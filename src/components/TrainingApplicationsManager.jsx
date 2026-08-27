import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { exportTrainingApplicationsToExcel } from '../utils/excelExport';
import { 
  FileSpreadsheet, Search, Filter, 
  CheckCircle2, Clock, AlertCircle, Trash2, Eye, 
  Mail, Phone, Building, User, Calendar, MapPin, 
  GraduationCap, ExternalLink, X, ChevronRight,
  Download, Table, Check, Inbox
} from 'lucide-react';

export function TrainingApplicationsManager({ setConfirmState, showNotification }) {
  const { 
    trainingApplications, 
    updateTrainingApplicationStatus, 
    deleteTrainingApplication,
    wages
  } = useData();

  // Dynamic current year-month helper
  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // Filters state
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [viewingApp, setViewingApp] = useState(null);

  // Helper to format "2026-08" into "August 2026"
  const formatMonthLabel = (monthStr) => {
    if (!monthStr || monthStr === 'all') return 'All Months';
    const [year, month] = monthStr.split('-');
    if (!year || !month) return monthStr;
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Extract list of all unique months present strictly in the real submitted applications
  const availableMonths = useMemo(() => {
    const set = new Set();
    (trainingApplications || []).forEach(app => {
      if (app.monthYear) {
        set.add(app.monthYear);
      }
    });

    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [trainingApplications]);

  // Compute month counts from real data
  const monthCounts = useMemo(() => {
    const counts = {};
    (trainingApplications || []).forEach(app => {
      const my = app.monthYear || getCurrentMonthYear();
      counts[my] = (counts[my] || 0) + 1;
    });
    return counts;
  }, [trainingApplications]);

  // Filtered applications based on active criteria
  const filteredApplications = useMemo(() => {
    return (trainingApplications || []).filter(app => {
      // Month Filter
      if (selectedMonth !== 'all' && app.monthYear !== selectedMonth) {
        return false;
      }
      // Status Filter
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false;
      }
      // Region Filter
      if (regionFilter !== 'all' && app.region !== regionFilter) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchCompany = app.companyName?.toLowerCase().includes(q);
        const matchContact = app.contactPerson?.toLowerCase().includes(q);
        const matchEmail = app.email?.toLowerCase().includes(q);
        const matchPhone = app.phone?.toLowerCase().includes(q);
        const matchRef = app.referenceCode?.toLowerCase().includes(q);
        const matchModule = app.moduleTitle?.toLowerCase().includes(q);
        const matchRegion = app.region?.toLowerCase().includes(q);
        if (!matchCompany && !matchContact && !matchEmail && !matchPhone && !matchRef && !matchModule && !matchRegion) {
          return false;
        }
      }
      return true;
    });
  }, [trainingApplications, selectedMonth, statusFilter, regionFilter, searchQuery]);

  // Statistics for selected view
  const currentMonthStats = useMemo(() => {
    const appsInCurrentView = selectedMonth === 'all' 
      ? (trainingApplications || []) 
      : (trainingApplications || []).filter(a => a.monthYear === selectedMonth);

    const total = appsInCurrentView.length;
    const pending = appsInCurrentView.filter(a => a.status === 'Pending').length;
    const reviewed = appsInCurrentView.filter(a => a.status === 'Reviewed').length;
    const approved = appsInCurrentView.filter(a => a.status === 'Approved').length;
    const completed = appsInCurrentView.filter(a => a.status === 'Completed').length;

    return { total, pending, reviewed, approved, completed };
  }, [trainingApplications, selectedMonth]);

  // Status update handler
  const handleStatusChange = (id, newStatus) => {
    updateTrainingApplicationStatus(id, newStatus);
    showNotification(`Application status updated to ${newStatus}`);
    if (viewingApp && viewingApp.id === id) {
      setViewingApp(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Delete handler with confirmation
  const handleDelete = (app) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Training Request?',
      message: `Are you sure you want to remove the training request from "${app.companyName}" (Ref: ${app.referenceCode})? This action cannot be undone.`,
      confirmText: 'Delete Request',
      type: 'danger',
      onConfirm: () => {
        deleteTrainingApplication(app.id);
        if (viewingApp && viewingApp.id === app.id) {
          setViewingApp(null);
        }
        showNotification('Training application record deleted');
      }
    });
  };

  // Switch to Training Assistance report page directly in place
  const handleGoToTrainingAssistance = () => {
    window.location.hash = `#training-report?month=${selectedMonth}`;
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Approved</span>;
      case 'Reviewed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Under Review</span>;
      case 'Completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Cancelled</span>;
      case 'Pending':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">Pending Review</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900">
              Enterprise Assistance
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Auto-synced with Public Training Request Modal
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Training Requests & Enrollment Management</span>
          </h3>
          <p className="text-xs text-slate-600">
            View applicant submissions, filter per month, update review statuses, and switch to the Training Assistance registry.
          </p>
        </div>

        {/* Go to Training Assistance Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGoToTrainingAssistance}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-2 hover:shadow"
            title={`Go to Training Assistance (${formatMonthLabel(selectedMonth)})`}
          >
            <span>Go to Training Assistance ({formatMonthLabel(selectedMonth)})</span>
            <ChevronRight className="w-4 h-4 text-blue-200" />
          </button>
        </div>
      </div>

      {/* 2. Monthly Filter Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-900" />
            <span>Filter By Month:</span>
          </label>
          <span className="text-xs text-slate-500">
            Showing <strong>{filteredApplications.length}</strong> of {trainingApplications.length} total applications
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              selectedMonth === 'all'
                ? 'bg-blue-900 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>All Months</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${
              selectedMonth === 'all' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {trainingApplications.length}
            </span>
          </button>

          {availableMonths.map(my => {
            const count = monthCounts[my] || 0;
            const isSelected = selectedMonth === my;
            return (
              <button
                key={my}
                onClick={() => setSelectedMonth(my)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{formatMonthLabel(my)}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${
                  isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Monthly Metrics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{currentMonthStats.total}</div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              {selectedMonth === 'all' ? 'Total All Time' : `${formatMonthLabel(selectedMonth)} Requests`}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-amber-700">{currentMonthStats.pending}</div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">Pending Action</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-700">{currentMonthStats.approved}</div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">Approved / Scheduled</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-purple-700">{currentMonthStats.completed}</div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">Completed Trainings</div>
          </div>
        </div>
      </div>

      {/* 4. Search and Secondary Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-grow w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company name, contact person, email, reference code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
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

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending Review</option>
            <option value="Reviewed">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Region Filter */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
          >
            <option value="all">All RTWPB Regions</option>
            {(wages || []).map(w => (
              <option key={w.id} value={w.region}>{w.region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">No training applications found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'all' || regionFilter !== 'all'
                ? 'Try clearing your filters or search query to view other entries.'
                : `No requests recorded for ${formatMonthLabel(selectedMonth)} yet. Applications submitted on the live site will automatically appear here.`}
            </p>
            <button
              onClick={() => {
                setSelectedMonth('all');
                setStatusFilter('all');
                setRegionFilter('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ref Code & Date</th>
                  <th className="py-3 px-4">Enterprise & Contact Person</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Module & Region</th>
                  <th className="py-3 px-4">Pax & Mode</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    
                    {/* Ref Code & Submission Date */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-blue-900 flex items-center gap-1">
                        <span>{app.referenceCode || app.id}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{app.submissionDate}</span>
                      </div>
                    </td>

                    {/* Company Name & Contact Person */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{app.companyName}</div>
                      <div className="text-[11px] text-slate-600">
                        {app.contactPerson} {app.designation ? `(${app.designation})` : ''}
                      </div>
                    </td>

                    {/* Contact details */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-slate-700">
                        <Mail className="w-3 h-3 text-blue-800 shrink-0" />
                        <a href={`mailto:${app.email}`} className="hover:underline hover:text-blue-900">
                          {app.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-700 shrink-0" />
                        <span>{app.phone}</span>
                      </div>
                    </td>

                    {/* Module & Region */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{app.moduleTitle}</div>
                      <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>RTWPB {app.region}</span>
                      </div>
                    </td>

                    {/* Pax & Delivery Mode */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{app.paxCount} participants</div>
                      <div className="text-[11px] text-slate-500">{app.preferredMode}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={app.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewingApp(app)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg transition"
                          title="View Full Application Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(app)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition"
                          title="Delete Request"
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
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL: APPLICATION FULL DETAILS & STATUS UPDATE                    */}
      {/* ------------------------------------------------------------------ */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setViewingApp(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {viewingApp.referenceCode || viewingApp.id}
                  </span>
                  <StatusBadge status={viewingApp.status} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {viewingApp.companyName}
                </h3>
                <p className="text-xs text-slate-500">
                  Submitted on {viewingApp.submissionDate}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Contact Person</div>
                <div className="font-bold text-slate-900">{viewingApp.contactPerson}</div>
                <div className="text-slate-600">{viewingApp.designation || 'Representative'}</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Operating Region</div>
                <div className="font-bold text-slate-900">RTWPB {viewingApp.region}</div>
                <div className="text-slate-600">Regional Tripartite Wages & Productivity Board</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Corporate Email</div>
                <div className="font-bold text-blue-900">{viewingApp.email}</div>
                <a 
                  href={`mailto:${viewingApp.email}?subject=DOLE-NWPC%20Training%20Application%20Update%20-%20${viewingApp.referenceCode}`}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-700 hover:underline font-semibold"
                >
                  <Mail className="w-3 h-3" />
                  <span>Send Official Email</span>
                </a>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Contact Number</div>
                <div className="font-bold text-slate-900">{viewingApp.phone}</div>
                <a 
                  href={`tel:${viewingApp.phone}`}
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:underline font-semibold"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Applicant</span>
                </a>
              </div>
            </div>

            {/* Requested Course & Logistics */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-blue-950 uppercase tracking-wider text-[11px]">
                Requested Training Course & Format
              </div>
              <div className="text-sm font-black text-blue-900">
                {viewingApp.moduleTitle}
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1 border-t border-blue-200/60">
                <div><strong>Participants (Pax):</strong> {viewingApp.paxCount}</div>
                <div><strong>Delivery Format:</strong> {viewingApp.preferredMode}</div>
              </div>
            </div>

            {/* Notes */}
            {viewingApp.notes && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-700">Specific Productivity Concerns / Notes:</div>
                <p className="text-slate-600 italic whitespace-pre-wrap">{viewingApp.notes}</p>
              </div>
            )}

            {/* Change Status Controls inside Modal */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <label className="font-bold text-slate-700">Update Status:</label>
                <select
                  value={viewingApp.status || 'Pending'}
                  onChange={(e) => handleStatusChange(viewingApp.id, e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white font-medium"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="Reviewed">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewingApp(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(viewingApp)}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
