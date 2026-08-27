import React, { useState } from 'react';
import { productivityModules } from '../data/productivityData';
import { useData } from '../context/DataContext';
import { 
  Layers, CheckCircle2, Award, Clock, 
  Users, Calendar, ChevronRight, FileText, 
  ArrowUpRight, Sparkles 
} from 'lucide-react';

export function ProductivityHub({ onOpenTraining }) {
  const { schedules } = useData();
  const [selectedModule, setSelectedModule] = useState(productivityModules[0]);

  return (
    <section id="productivity" className="py-12 bg-slate-100 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-amber-100 text-amber-950 mb-2 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>DOLE Enterprise Capability Development Program</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            DOLE-NWPC Productivity Toolbox
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Free government training modules, technical coaching, and productivity improvement programs tailored for micro, small, and medium enterprises (MSMEs) in the Philippines.
          </p>
        </div>

        {/* 6 Core Toolboxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {productivityModules.map((mod) => {
            const isSelected = selectedModule.id === mod.id;
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className={`bg-white rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-blue-700 shadow-md ring-2 ring-blue-700/20' 
                    : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-900 text-white">
                      {mod.code}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {mod.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-900" />
                    {mod.duration.split('+')[0]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTraining(mod.title);
                    }}
                    className="font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline"
                  >
                    <span>Request Module</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Module Deep-Dive Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          
          {/* Header Banner (Solid Blue) */}
          <div className="bg-blue-900 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-bold text-xs rounded">
                    {selectedModule.code} MODULE
                  </span>
                  <span className="text-xs text-blue-200 font-medium">
                    {selectedModule.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedModule.title}
                </h3>
                <p className="text-xs text-blue-100 mt-1 max-w-2xl">
                  {selectedModule.description}
                </p>
              </div>

              <button
                onClick={() => onOpenTraining(selectedModule.title)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-sm transition shrink-0 self-start md:self-auto"
              >
                <Award className="w-4 h-4" />
                <span>Enroll in {selectedModule.code} Training</span>
              </button>
            </div>
          </div>

          {/* Module Pillars & Details */}
          <div className="p-6">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-900" />
              Core Pillars & Implementation Curriculum
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {selectedModule.pillars.map((pillar, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pillar.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Metadata Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Target Sector / Audience</span>
                <span className="text-slate-600">{selectedModule.targetAudience}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Training Duration</span>
                <span className="text-slate-600">{selectedModule.duration}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Expected Deliverables</span>
                <span className="text-slate-600">{selectedModule.deliverables}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Upcoming Training Calendar Schedule Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Official DOLE Calendar • 2026 Batch Schedules
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Upcoming Nationwide Training Sessions
              </h3>
            </div>
            <button
              onClick={() => onOpenTraining(selectedModule.title)}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 self-start"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Register for a Batch
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Training Module</th>
                  <th className="py-3 px-4">Date & Schedule</th>
                  <th className="py-3 px-4">Venue / Platform</th>
                  <th className="py-3 px-4 text-center">Registration Fee</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {schedules.map((ts) => (
                  <tr key={ts.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {ts.module}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div className="font-semibold text-slate-900">{ts.date}</div>
                      <div className="text-[11px] text-slate-500">{ts.time}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {ts.venue}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-800">
                      {ts.fee}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onOpenTraining(ts.module)}
                        className="px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold transition shadow-sm"
                      >
                        Enroll
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
