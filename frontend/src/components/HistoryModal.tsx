import React from "react";
import { CareerAssessmentRecord } from "../types";
import { X, History, ArrowRight, Calendar, Target, Clock } from "lucide-react";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessments: CareerAssessmentRecord[];
  onSelectAssessment: (assessment: CareerAssessmentRecord) => void;
  onNewAssessment: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  assessments,
  onSelectAssessment,
  onNewAssessment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c101d] border border-indigo-900/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-950/80 bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <History className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Saved Career Roadmaps</h2>
              <p className="text-xs text-slate-400">
                Revisit your previous skill assessments and continue your 8-week progress.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {assessments.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No saved roadmaps yet.</p>
              <button
                onClick={() => {
                  onClose();
                  onNewAssessment();
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
              >
                Create Your First Roadmap
              </button>
            </div>
          ) : (
            assessments.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectAssessment(item);
                  onClose();
                }}
                className="group p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.targetCareerTitle}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item.readinessScore}% Match
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.student.name || "Student"} ({item.student.degree})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.availableHoursPerWeek} hrs/wk</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-white transition-colors">
                  <span>Open Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/60 border-t border-indigo-950/80 flex justify-end">
          <button
            onClick={() => {
              onClose();
              onNewAssessment();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Create New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
