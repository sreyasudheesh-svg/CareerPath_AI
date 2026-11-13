import React, { useState } from "react";
import { 
  CareerAssessmentRecord, 
  WeeklyTaskItem 
} from "../types";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Compass, 
  Target, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  Clock, 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Layers,
  BarChart3
} from "lucide-react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from "recharts";
import confetti from "canvas-confetti";
import { exportRoadmapToPDF } from "../utils/pdfExport";
import { toggleRoadmapTask, sendChatMessage } from "../utils/api";

interface DashboardViewProps {
  assessment: CareerAssessmentRecord;
  onRetake: () => void;
  onSwitchCareer: () => void;
  onUpdateAssessment: (updated: CareerAssessmentRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  assessment,
  onRetake,
  onSwitchCareer,
  onUpdateAssessment
}) => {
  const [activeTab, setActiveTab] = useState<"analysis" | "roadmap" | "projects" | "progress" | "chat">("analysis");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  // Chat State
  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: `Hello ${assessment.student.name || "there"}! I am your contextual AI Career Navigator for **${assessment.targetCareerTitle}**.\n\nYou currently have a **${assessment.readinessScore}% Career Readiness Score**. Ask me anything about your 8-week roadmap, skill gaps, or how to prepare for interviews!`
    }
  ]);

  // Task Toggle Handler
  const handleToggleTask = async (taskId: string) => {
    try {
      const updatedTask: WeeklyTaskItem = await toggleRoadmapTask(assessment.id, taskId);
      const newRoadmap = assessment.roadmap.map((t) =>
        t.id === taskId ? { ...t, completed: updatedTask.completed } : t
      );
      
      const newAssessment = { ...assessment, roadmap: newRoadmap };
      onUpdateAssessment(newAssessment);

      if (updatedTask.completed) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  // Chat Submission Handler
  const handleSendChat = async (msgToSend?: string) => {
    const text = msgToSend || chatMessage;
    if (!text.trim() || chatLoading) return;

    const userMsg = { role: "user" as const, content: text };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!msgToSend) setChatMessage("");
    setChatLoading(true);

    try {
      const reply = await sendChatMessage(assessment.id, text);
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I had trouble generating a response. Please check your network or try again."
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Calculate Progress Metrics
  const totalTasks = assessment.roadmap.length;
  const completedTasks = assessment.roadmap.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Chart data for Recharts Radar / Bar
  const radarData = [
    {
      domain: "Programming",
      Student: assessment.skillComparison.filter((s) => s.category === "programming" && s.status === "mastered").length * 30 + 20,
      Target: 100
    },
    {
      domain: "Technical",
      Student: assessment.skillComparison.filter((s) => s.category === "technical" && s.status !== "missing").length * 25 + 15,
      Target: 100
    },
    {
      domain: "Tools",
      Student: assessment.skillComparison.filter((s) => s.category === "tools" && s.status !== "missing").length * 30 + 10,
      Target: 100
    },
    {
      domain: "Soft Skills",
      Student: assessment.skillComparison.filter((s) => s.category === "soft" && s.status === "mastered").length * 40 + 20,
      Target: 100
    }
  ];

  // PDF Export
  const handleExportPDF = () => {
    setIsExportingPDF(true);
    try {
      exportRoadmapToPDF(assessment);
    } finally {
      setTimeout(() => setIsExportingPDF(false), 800);
    }
  };

  // Readiness Tier
  const getReadinessTier = (score: number) => {
    if (score >= 80) return { label: "Job-Ready Candidate", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" };
    if (score >= 55) return { label: "Strong Foundation", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" };
    if (score >= 30) return { label: "Moderate Alignment", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" };
    return { label: "Early Foundations", color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10" };
  };

  const tier = getReadinessTier(assessment.readinessScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-indigo-950/70">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-slate-400">
            <span>CareerPath AI</span>
            <span>/</span>
            <span>Assessment Dossier</span>
            <span>/</span>
            <span className="text-indigo-400 font-semibold">{assessment.targetCareerTitle}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {assessment.targetCareerTitle}
            </h1>
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tier.border} ${tier.bg} ${tier.color}`}>
              {tier.label}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Student: <strong className="text-slate-200">{assessment.student.name || "Student"}</strong> •{" "}
            {assessment.student.educationLevel} ({assessment.student.degree}) • Weekly Commitment:{" "}
            <strong className="text-indigo-300">{assessment.availableHoursPerWeek} hrs/week</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isExportingPDF ? "Generating PDF..." : "Download PDF Roadmap"}</span>
          </button>

          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <button
            onClick={onSwitchCareer}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Switch Role</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Row: Readiness Gauge & Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {/* Readiness Circular Progress Gauge */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl flex items-center justify-between gap-6 border-indigo-500/20">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Career Readiness Score
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-white">
                {assessment.readinessScore}%
              </span>
              <span className="text-xs text-slate-400">Match</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Weighted calculation reflecting required proficiency credit against industry hiring benchmarks.
            </p>
          </div>

          {/* Animated Circular SVG */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="#1e293b"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="url(#readinessGradient)"
                strokeWidth="8"
                strokeDasharray={289}
                strokeDashoffset={289 - (289 * assessment.readinessScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <span className="text-lg font-extrabold text-white">
                {assessment.readinessScore}%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Status Metric Cards */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Mastered Skills</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-3">
            {assessment.masteredSkillsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Already job-ready or exceeds standard
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Needs Improvement</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 mt-3">
            {assessment.skillsNeedingImprovementCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Possessed at lower proficiency
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between border-rose-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Missing Skills</span>
            <XCircle className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 mt-3">
            {assessment.missingSkillsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            High priority curriculum focus
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 sm:gap-2 mt-8 border-b border-indigo-950/80 overflow-x-auto pb-px">
        {[
          { id: "analysis", label: "Skill Gap Analysis", icon: Target },
          { id: "roadmap", label: "8-Week Roadmap", icon: Calendar },
          { id: "projects", label: "Portfolio Projects (3)", icon: Briefcase },
          { id: "progress", label: "Progress Tracker", icon: TrendingUp },
          { id: "chat", label: "AI Career Assistant", icon: Bot }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? "border-indigo-500 text-white bg-indigo-500/10 rounded-t-xl"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: SKILL GAP ANALYSIS */}
      {activeTab === "analysis" && (
        <div className="mt-6 space-y-6 animate-fade-in">
          {/* Dual Column: Comparison Matrix & Domain Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Skill Comparison Table */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Skill Comparison Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Detailed comparison against role hiring prerequisites with importance weighting.
                  </p>
                </div>
                <span className="text-xs text-indigo-400 font-mono">
                  {assessment.skillComparison.length} Competencies Evaluated
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="pb-3 font-semibold">Required Skill</th>
                      <th className="pb-3 font-semibold">Current Level</th>
                      <th className="pb-3 font-semibold">Required Level</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-center">Weight</th>
                      <th className="pb-3 font-semibold text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {assessment.skillComparison.map((item) => (
                      <React.Fragment key={item.skill}>
                        <tr 
                          onClick={() => setExpandedSkill(expandedSkill === item.skill ? null : item.skill)}
                          className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                        >
                          <td className="py-3.5 font-bold text-white">
                            {item.skill}
                          </td>
                          <td className="py-3.5">
                            <span className={
                              item.currentLevel === "None" 
                                ? "text-rose-400 font-medium" 
                                : item.currentLevel === "Beginner" 
                                ? "text-amber-400 font-medium" 
                                : "text-emerald-400 font-medium"
                            }>
                              {item.currentLevel}
                            </span>
                          </td>
                          <td className="py-3.5 text-slate-300 font-medium">
                            {item.requiredLevel}
                          </td>
                          <td className="py-3.5">
                            {item.status === "mastered" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Already Have
                              </span>
                            ) : item.status === "improve" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                <AlertTriangle className="w-3 h-3" /> Needs Improvement
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                                <XCircle className="w-3 h-3" /> Missing
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 text-center font-mono text-indigo-300">
                            {item.weight}/10
                          </td>
                          <td className="py-3.5 text-right text-slate-400">
                            {expandedSkill === item.skill ? (
                              <ChevronUp className="w-4 h-4 ml-auto" />
                            ) : (
                              <ChevronDown className="w-4 h-4 ml-auto" />
                            )}
                          </td>
                        </tr>

                        {/* Expandable Explanation Row */}
                        {expandedSkill === item.skill && (
                          <tr className="bg-indigo-950/20 border-b border-indigo-950/60">
                            <td colSpan={6} className="p-4 text-xs">
                              <div className="flex items-start gap-2.5">
                                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-indigo-300">Why this skill matters for {assessment.targetCareerTitle}:</strong>
                                  <p className="mt-1 text-slate-300 leading-relaxed">{item.whyItMatters}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Radar Comparison Chart */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Competency Alignment</h3>
                <p className="text-xs text-slate-400">
                  Current proficiency versus target role baseline benchmark across tech domains.
                </p>
              </div>

              <div className="h-64 w-full my-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="domain" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                    <Radar
                      name="Your Profile"
                      dataKey="Student"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.4}
                    />
                    <Radar
                      name="Role Requirement"
                      dataKey="Target"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.15}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: 8, fontSize: 12 }} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Recommendation: </span>
                Address missing skills first to rapidly increase your readiness score above 70%.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: 8-WEEK ROADMAP */}
      {activeTab === "roadmap" && (
        <div className="mt-6 space-y-6 animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Personalized 8-Week Learning Timeline</h3>
              <p className="text-xs text-slate-400 mt-1">
                Structured into progressive weekly milestones, allocated strictly within your {assessment.availableHoursPerWeek} hrs/week budget.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-semibold">
                {completedTasks} of {totalTasks} Weeks Completed ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Week by Week Cards */}
          <div className="space-y-4">
            {assessment.roadmap.map((week) => (
              <div
                key={week.id}
                className={`glass-panel p-6 rounded-2xl transition-all border ${
                  week.completed
                    ? "border-emerald-500/40 bg-emerald-950/10"
                    : "border-indigo-900/40 hover:border-indigo-500/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTask(week.id)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      title={week.completed ? "Mark incomplete" : "Mark week as complete"}
                    >
                      {week.completed ? (
                        <CheckSquare className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Square className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase text-indigo-400">
                          Week {week.weekNumber}
                        </span>
                        <span className="text-slate-600">•</span>
                        <h4 className="text-base font-bold text-white">{week.topic}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {week.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="flex items-center gap-1 text-xs text-slate-300 font-medium px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{week.estimatedHours} Hours</span>
                    </span>
                  </div>
                </div>

                {/* Week Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Objectives & Practical Exercises */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-indigo-400" />
                      Learning Objectives
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {week.learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>

                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-4 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Practical Exercises
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {week.practicalExercises.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curated Resources */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      Curated Real Learning Resources
                    </h5>
                    <div className="space-y-2">
                      {week.resources.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-200 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-indigo-300">
                              {res.type}
                            </span>
                            <span className="font-medium group-hover:text-white transition-colors">
                              {res.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-cyan-400">
                            <span>{res.provider}</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Milestone pill */}
                    <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                      <strong className="text-white">{week.weeklyMilestone}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: PORTFOLIO PROJECTS */}
      {activeTab === "projects" && (
        <div className="mt-6 space-y-6 animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">AI Portfolio Mini-Projects</h3>
              <p className="text-xs text-slate-400 mt-1">
                Exactly three progressive project ideas designed to demonstrate your target competencies on GitHub.
              </p>
            </div>
          </div>

          {/* Project Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {assessment.portfolioProjects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedProjectIndex === idx
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-indigo-400">
                    Project 0{idx + 1}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    proj.difficulty === "Beginner" 
                      ? "bg-emerald-500/10 text-emerald-300" 
                      : proj.difficulty === "Intermediate" 
                      ? "bg-cyan-500/10 text-cyan-300" 
                      : "bg-violet-500/10 text-violet-300"
                  }`}>
                    {proj.difficulty}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{proj.title}</h4>
                <div className="text-[11px] text-slate-500 mt-1">{proj.estimatedCompletionTime}</div>
              </button>
            ))}
          </div>

          {/* Selected Project Full Dossier */}
          {assessment.portfolioProjects[selectedProjectIndex] && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border-indigo-500/30">
              {(() => {
                const p = assessment.portfolioProjects[selectedProjectIndex];
                return (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-mono font-bold text-indigo-400">
                            Capstone Project 0{selectedProjectIndex + 1}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-400">Estimated: {p.estimatedCompletionTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mt-1">{p.title}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                        {p.difficulty} Level
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Project Description
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>

                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-4 mb-1.5">
                          Real-World Problem It Solves
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed">{p.realWorldProblem}</p>

                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-4 mb-2">
                          Required Technologies
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.map((t) => (
                            <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 border border-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>

                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-4 mb-2">
                          Skills Demonstrated
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {p.skillsDemonstrated.map((s) => (
                            <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-slate-800">
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          5-Stage Step-by-Step Implementation Blueprint
                        </h5>
                        <div className="space-y-3">
                          {p.implementationPlan.map((step) => (
                            <div key={step.step} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                              <span className="font-bold text-indigo-400">Step {step.step}: {step.title}</span>
                              <p className="text-slate-400 mt-1 leading-relaxed">{step.details}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                          <span className="font-bold text-white">Expected Final Output:</span>
                          <p className="text-slate-400 mt-1">{p.expectedOutput}</p>
                        </div>
                      </div>
                    </div>

                    {/* GitHub Showcase Tips */}
                    <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-800/40 text-xs">
                      <h5 className="font-bold text-violet-300 mb-1.5 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-violet-400" />
                        How to Showcase on GitHub & Your Resume
                      </h5>
                      <ul className="space-y-1 text-slate-300">
                        {p.showcaseTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-violet-400">✦</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: PROGRESS TRACKER */}
      {activeTab === "progress" && (
        <div className="mt-6 space-y-6 animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Learning Progress & Milestones</h3>
            <p className="text-xs text-slate-400 mb-6">
              Track your weekly completed topics and watch your overall roadmap completion percentage climb.
            </p>

            {/* Overall Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Overall 8-Week Roadmap Progress</span>
                <span className="text-indigo-400">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Weekly Checklist Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {assessment.roadmap.map((w) => (
                <div
                  key={w.id}
                  onClick={() => handleToggleTask(w.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    w.completed
                      ? "bg-emerald-950/20 border-emerald-500/40 text-white"
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">
                      Week {w.weekNumber}
                    </span>
                    {w.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{w.topic}</h4>
                  <span className="text-[11px] text-slate-500 mt-2">
                    {w.completed ? "✓ Completed" : "○ Incomplete (Click to toggle)"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: AI CAREER ASSISTANT CHAT */}
      {activeTab === "chat" && (
        <div className="mt-6 glass-panel rounded-2xl overflow-hidden flex flex-col h-[650px] animate-fade-in border-indigo-900/50">
          <div className="p-4 bg-slate-900/60 border-b border-indigo-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">AI Career Navigator Coach</h4>
                <p className="text-[11px] text-slate-400">
                  Context-aware assistant trained on your {assessment.targetCareerTitle} roadmap
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-2xl ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                  msg.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-800 text-indigo-400"
                }`}>
                  {msg.role === "user" ? "You" : <Sparkles className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 animate-pulse">
                <Bot className="w-4 h-4" />
                <span>AI Navigator is generating advice...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/40 flex gap-2 overflow-x-auto">
            {[
              "Why should I learn Python?",
              "What should I learn after SQL?",
              "Is machine learning necessary for my career?",
              "How can I prepare for technical interviews?",
              "Explain how to showcase projects on GitHub"
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSendChat(q)}
                className="px-2.5 py-1 text-[11px] font-medium whitespace-nowrap bg-slate-800/80 hover:bg-indigo-600/30 hover:text-white text-slate-300 rounded-lg border border-slate-700/60 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <div className="p-4 bg-slate-900/80 border-t border-indigo-950/80 flex gap-2">
            <input
              type="text"
              placeholder={`Ask a question about ${assessment.targetCareerTitle}, skills, or projects...`}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleSendChat()}
              disabled={chatLoading || !chatMessage.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
