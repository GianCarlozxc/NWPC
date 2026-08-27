import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { DownloadProgressModal } from './DownloadProgressModal';
import { 
  FileSpreadsheet, Search, Filter, Download, 
  Copy, Check, ExternalLink, 
  Info, MapPin, Calendar, Building, Sparkles, Map 
} from 'lucide-react';

export function WageExplorer() {
  const { wages, summaryStats } = useData();
  const [selectedRegionId, setSelectedRegionId] = useState('ncr');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('private'); // 'private' or 'kasambahay'
  const [copiedId, setCopiedId] = useState(null);
  const [downloadModalData, setDownloadModalData] = useState(null);

  // Filtered list of regions
  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return wages;
    const q = searchQuery.toLowerCase();
    return wages.filter(r => 
      r.region.toLowerCase().includes(q) ||
      r.regionFullName.toLowerCase().includes(q) ||
      r.wageOrderNo.toLowerCase().includes(q) ||
      r.jurisdictionCities?.toLowerCase().includes(q) ||
      r.rates.some(rate => rate.coverage.toLowerCase().includes(q) || rate.sector.toLowerCase().includes(q))
    );
  }, [searchQuery, wages]);

  // Current active region data
  const currentRegion = useMemo(() => {
    return wages.find(r => r.id === selectedRegionId) || wages[0];
  }, [selectedRegionId, wages]);

  const handleCopyRates = (region) => {
    const text = `NWPC Official Minimum Wage Rates - ${region.regionFullName} (${region.wageOrderNo}):
Non-Agriculture: ₱${region.nonAgriculture}.00 / day
Agriculture / Micro: ₱${region.agriculture}.00 / day
Kasambahay: ₱${region.kasambahayRate.toLocaleString()}.00 / month (${region.kasambahayOrderNo})
Effective Date: ${region.effectiveDate}
Jurisdiction: ${region.jurisdictionCities}
Source: National Wages and Productivity Commission (NWPC - DOLE)`;

    navigator.clipboard.writeText(text);
    setCopiedId(region.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadPdf = (region) => {
    setDownloadModalData(region);
  };

  return (
    <section id="wage-matrix" className="py-10 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-blue-100 text-blue-900 mb-2 border border-blue-200">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Republic Act No. 6727 • Official RTWPB Wage Orders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            DAILY MINIMUM WAGE RATES
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Official summary of daily minimum wage rates per region in the Philippines as issued by the 17 Regional Tripartite Wages and Productivity Boards.
          </p>
        </div>

        {/* National Benchmark Stats Banner (Flat clean boxes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">Highest Daily Rate</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">₱ {summaryStats.highestDailyRate}.00</div>
            <span className="text-xs text-blue-900 font-semibold">{summaryStats.highestRegion}</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Regional Boards</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">17 Regions</div>
            <span className="text-xs text-emerald-800 font-semibold">Luzon, Visayas, Mindanao</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">Average National Wage</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">₱ {summaryStats.averageMinimumWage.toFixed(2)}</div>
            <span className="text-xs text-amber-800 font-semibold">Across all sectors</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
            <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wide">Workers Protected</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{summaryStats.totalWorkersCovered}</div>
            <span className="text-xs text-indigo-800 font-semibold">Private & Kasambahay</span>
          </div>
        </div>

        {/* Search and Fast Regional Tabs */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Box */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search region, city, province, or wage order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Toggle Sector View (Private Sector vs Domestic Worker Kasambahay) */}
            <div className="flex items-center bg-slate-200 p-1 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('private')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === 'private' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Private Sector Workers
              </button>
              <button
                onClick={() => setActiveTab('kasambahay')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === 'kasambahay' ? 'bg-purple-900 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Kasambahay (Domestic)
              </button>
            </div>

          </div>

          {/* Regional Quick Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {wages.map((reg) => {
              const isSelected = reg.id === currentRegion.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => {
                    setSelectedRegionId(reg.id);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {reg.region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Region Detailed Display Card */}
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
          
          {/* Header Banner for Selected Region (Solid Blue) */}
          <div className="bg-blue-900 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-bold text-xs rounded">
                    {currentRegion.region}
                  </span>
                  <span className="text-xs text-blue-200 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    Republic of the Philippines
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentRegion.regionFullName}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-blue-100">
                  <span className="flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    Wage Order: <strong className="text-white">{currentRegion.wageOrderNo}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Effectivity: <strong className="text-white">{currentRegion.effectiveDate}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons Header */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleCopyRates(currentRegion)}
                  className="px-3.5 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition border border-blue-700"
                >
                  {copiedId === currentRegion.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Rates Summary</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadPdf(currentRegion)}
                  className="px-3.5 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition border border-blue-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Wage Order PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Matrix Table */}
          <div className="p-6">
            {activeTab === 'private' ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-900" />
                    Wage Order for workers in the private sector ({currentRegion.wageOrderNo})
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">Currency: Philippine Peso (PHP ₱)</span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Sector / Classification</th>
                        <th className="py-3 px-4 text-right">Daily Minimum Rate</th>
                        <th className="py-3 px-4 text-right">Next Tranche / Stage</th>
                        <th className="py-3 px-4">Coverage Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {currentRegion.rates.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {row.sector}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-blue-900 bg-slate-50 text-base">
                            ₱ {row.basicRate.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-slate-700">
                            {row.secondTranche || 'Standardized'}
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
                            {row.coverage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Scope of Jurisdiction */}
                {currentRegion.jurisdictionCities && (
                  <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <Map className="w-3.5 h-3.5 text-blue-900" />
                      <span>Covered Cities & Municipalities in Jurisdiction:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {currentRegion.jurisdictionCities}
                    </p>
                  </div>
                )}

                {/* Notes box */}
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Legal Advisory:</strong> {currentRegion.notes}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Kasambahay Domestic Workers Table */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    Wage Order for Domestic Workers (Kasambahay) ({currentRegion.kasambahayOrderNo})
                  </h4>
                  <span className="text-xs text-purple-800 font-semibold bg-purple-100 px-2.5 py-0.5 rounded">
                    Governed by Republic Act No. 10361
                  </span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Area / Location Type</th>
                        <th className="py-3 px-4 text-right">Monthly Minimum Wage</th>
                        <th className="py-3 px-4">Designations Covered</th>
                        <th className="py-3 px-4">Mandatory Statutory Benefits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {currentRegion.kasambahayRates.map((kRow, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {kRow.area}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-purple-900 text-base">
                            ₱ {kRow.monthlyRate.toLocaleString()}.00 / mo.
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-600">
                            {kRow.coverage}
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-600">
                            SSS, PhilHealth, Pag-IBIG, 13th Month Pay, 5 days Service Incentive Leave (SIL)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-900 space-y-1">
                  <div><strong>Employer Note:</strong> Under the Kasambahay Law (RA 10361), if the monthly salary is below PHP 5,000.00, the employer must pay the full SSS, PhilHealth, and Pag-IBIG contributions without salary deduction.</div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Accurate Interactive Download Progress Modal */}
      <DownloadProgressModal
        isOpen={!!downloadModalData}
        onClose={() => setDownloadModalData(null)}
        documentData={downloadModalData}
      />
    </section>
  );
}
