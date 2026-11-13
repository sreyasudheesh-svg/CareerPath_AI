import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Target, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Code2, 
  BrainCircuit, 
  BarChart2, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

interface LandingHeroProps {
  onStartAssessment: () => void;
  onOpenExploreCareers: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAssessment,
  onOpenExploreCareers
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-violet-600/25 rounded-full blur-[140px]" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyan-600/15 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered Career Navigator for Aspiring Tech Professionals</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Your Dream Career{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Starts With a Plan.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            CareerPath AI dynamically evaluates your existing technical and soft skills against target job benchmarks, pinpoints critical gaps, and synthesizes an 8-week milestone roadmap and portfolio project ideas.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Build My Career Roadmap</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenExploreCareers}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 hover:border-slate-600 transition-all"
            >
              <Compass className="w-5 h-5 text-violet-400" />
              <span>Explore Career Paths</span>
            </button>
          </div>

          {/* Highlights Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">15+</div>
              <div className="text-xs text-slate-400 mt-1">Tech Career Tracks</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Dynamic Calculation</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">8 Weeks</div>
              <div className="text-xs text-slate-400 mt-1">Paced Curriculum</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-violet-400">3 Projects</div>
              <div className="text-xs text-slate-400 mt-1">Portfolio Builders</div>
            </div>
          </div>
        </div>

        {/* Live Interactive Dashboard Preview Card */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-indigo-500/30 via-violet-500/20 to-transparent shadow-2xl shadow-indigo-950/80">
          <div className="bg-[#0b101e] rounded-[15px] p-6 sm:p-8 border border-indigo-900/40">
            {/* Header bar of preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-950/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Sample Analysis: Data Scientist</h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live Simulation
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Target Role: Senior Predictive Analytics & ML</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Career Readiness Score</div>
                  <div className="text-xl font-extrabold text-indigo-400">42% Match</div>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#6366f1"
                      strokeWidth="4"
                      strokeDasharray={125.6}
                      strokeDashoffset={125.6 - (125.6 * 42) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-white">42%</span>
                </div>
              </div>
            </div>

            {/* Preview Mini Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-semibold">Required Skill</th>
                    <th className="pb-3 font-semibold">Current Level</th>
                    <th className="pb-3 font-semibold">Required Level</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Importance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="py-3 font-medium text-white flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Python
                    </td>
                    <td className="py-3 text-amber-400">Beginner</td>
                    <td className="py-3 text-slate-400">Advanced</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        Needs Improvement
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono">10/10</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white flex items-center gap-2">
                      <BarChart2 className="w-3.5 h-3.5 text-cyan-400" /> SQL & Aggregations
                    </td>
                    <td className="py-3 text-red-400 font-medium">None</td>
                    <td className="py-3 text-slate-400">Advanced</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Missing
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono">9/10</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Communication & Storytelling
                    </td>
                    <td className="py-3 text-emerald-400 font-medium">Intermediate</td>
                    <td className="py-3 text-slate-400">Intermediate</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        Mastered
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono">7/10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Preview Pill */}
            <div className="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Generated 8-Week Timeline tailored to <strong>10 hrs/week</strong></span>
              </span>
              <button
                onClick={onStartAssessment}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>Run Your Assessment</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="features-section" className="py-20 border-t border-indigo-950/60 bg-[#060912]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-indigo-400 mb-3">
              Intelligent Guidance Engine
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Three Pillars of Your Career Roadmap
            </h3>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              From discovering skill blind spots to building resume-grade mini-projects, CareerPath AI provides an end-to-end launchpad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-panel glass-panel-hover p-8 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  1. AI Skill Gap Analysis
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Evaluate your current skill proficiencies against real industry job standards. Our weighted scoring algorithm gives extra credit for critical role prerequisites and highlights exactly which skills need improvement vs. what is missing.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Weighted mathematical matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Color-coded competency matrix
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Detailed rationale for each requirement
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel glass-panel-hover p-8 rounded-2xl relative flex flex-col justify-between border-violet-500/30">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  2. Personalized 8-Week Roadmap
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Never get overwhelmed by generic 6-month syllabi. Receive an adaptive 8-week timeline strictly budgeted to your weekly hours, complete with weekly milestones, practical exercises, and curated real-world learning links.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400" /> Budgeted study hour enforcement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400" /> Verified official documentation & tutorials
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400" /> Interactive milestone check-offs
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel glass-panel-hover p-8 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  3. Portfolio Mini-Projects
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Prove your skills to hiring managers with exactly 3 resume-worthy mini-projects. Each project comes with the business problem solved, tech stack, a 5-step implementation plan, and tips on showcasing it on GitHub.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 3 tiered projects (Beginner to Advanced)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Step-by-step technical blueprints
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> GitHub & recruiter presentation tips
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#070a13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-violet-400 mb-3">
              Simple 4-Step Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              How CareerPath AI Navigates Your Future
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Profile & Current Skills",
                desc: "Enter your background, degree, and current skills across programming, tools, and soft domains."
              },
              {
                step: "02",
                title: "Select Target Career",
                desc: "Choose from 12+ pre-mapped industry roles or input your own custom dream job role."
              },
              {
                step: "03",
                title: "AI Skill Gap Analysis",
                desc: "Our weighted algorithm calculates your Readiness Score and outlines what needs improvement."
              },
              {
                step: "04",
                title: "8-Week Roadmap & Projects",
                desc: "Track weekly study milestones, complete 3 capstone projects, and export your roadmap to PDF."
              }
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative">
                <div className="text-3xl font-extrabold text-indigo-500/40 font-mono mb-2">
                  {s.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 text-center">
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <span>Start Your Career Assessment Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070d] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">CareerPath AI</span>
              <span className="text-indigo-400">• Personal AI Career Navigator</span>
            </div>
            <p className="mt-1 text-slate-500">
              Know Your Skills. Discover Your Gaps. Build Your Future.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenExploreCareers} className="hover:text-white transition-colors">
              Explore Careers
            </button>
            <button onClick={onStartAssessment} className="hover:text-white transition-colors">
              Assessment
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-slate-500">
            &copy; {new Date().getFullYear()} CareerPath AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};