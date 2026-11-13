import React, { useState } from "react";
import { CareerRoleData } from "../types";
import { X, Search, ArrowRight, TrendingUp, DollarSign, Sparkles } from "lucide-react";

interface ExploreCareersModalProps {
  isOpen: boolean;
  onClose: () => void;
  careers: CareerRoleData[];
  onSelectCareer: (careerId: string) => void;
}

export const ExploreCareersModal: React.FC<ExploreCareersModalProps> = ({
  isOpen,
  onClose,
  careers,
  onSelectCareer
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = ["All", ...Array.from(new Set(careers.map((c) => c.category)))];

  const filtered = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.requiredSkills.some((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c101d] border border-indigo-900/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-950/80 bg-slate-900/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">Explore Tech Career Paths</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any role to analyze your current skill alignment and generate an 8-week curriculum.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 sm:p-6 border-b border-indigo-950/60 bg-[#090d18] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search careers by title, keyword, or skill (e.g. Python, SQL, React)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Careers Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              No career paths matched your filter. Try adjusting your search term.
            </div>
          ) : (
            filtered.map((career) => (
              <div
                key={career.id}
                className="group relative p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {career.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      {career.demandLevel} Demand
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {career.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {career.shortDescription}
                  </p>

                  <div className="flex items-center gap-1 mt-3 text-xs text-slate-300 font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{career.salaryRange}</span>
                  </div>

                  {/* Skills badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {career.requiredSkills.slice(0, 4).map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50"
                      >
                        {s.name}
                      </span>
                    ))}
                    {career.requiredSkills.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                        +{career.requiredSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCareer(career.id);
                    onClose();
                  }}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all"
                >
                  <span>Build Roadmap for this Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};