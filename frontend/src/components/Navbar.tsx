import React from "react";
import { Sparkles, Compass, History, BookOpen, Bot, User, LogIn } from "lucide-react";
import { UserAccount } from "../types";

interface NavbarProps {
  onStartAssessment: (careerId?: string) => void;
  onOpenExploreCareers: () => void;
  onOpenHistory: () => void;
  onToggleChat: () => void;
  hasActiveAssessment: boolean;
  onViewDashboard?: () => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartAssessment,
  onOpenExploreCareers,
  onOpenHistory,
  onToggleChat,
  hasActiveAssessment,
  onViewDashboard,
  user,
  onOpenAuth,
  onOpenProfile
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-950/60 bg-[#070a13]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-[#090d19] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                CareerPath<span className="text-indigo-400">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Navigator
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Know Your Skills. Discover Your Gaps. Build Your Future.
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={onOpenExploreCareers}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Compass className="w-4 h-4 text-violet-400" />
            Explore Careers
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("features-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Features
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <History className="w-4 h-4 text-indigo-400" />
            Saved Roadmaps
          </button>

          {hasActiveAssessment && onViewDashboard && (
            <button
              onClick={onViewDashboard}
              className="px-3 py-1.5 text-xs uppercase font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all"
            >
              Current Dashboard
            </button>
          )}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 shadow-sm transition-all"
            title="Ask AI Career Coach"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>

          {/* User Auth or Profile Button */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition-all"
              title="Manage Profile"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[90px] truncate hidden sm:inline">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={() => onStartAssessment()}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Build Roadmap</span>
          </button>
        </div>
      </div>
    </header>
  );
};