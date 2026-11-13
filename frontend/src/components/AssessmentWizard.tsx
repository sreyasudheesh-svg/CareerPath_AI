import React, { useState, useEffect } from "react";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Search, 
  Check, 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  User, 
  Code, 
  Clock, 
  Compass, 
  BookOpen 
} from "lucide-react";
import { CareerRoleData, SkillCatalogItem, StudentSkillItem, UserAccount } from "../types";

interface AssessmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  careers: CareerRoleData[];
  skillsCatalog: SkillCatalogItem[];
  preselectedCareerId?: string;
  currentUser?: UserAccount | null;
  onGenerate: (data: {
    student: {
      name: string;
      educationLevel: string;
      degree: string;
      studyYear: string;
    };
    currentSkills: StudentSkillItem[];
    targetCareer: string;
    availableHours: number;
    learningPreferences: string[];
  }) => Promise<void>;
}

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({
  isOpen,
  onClose,
  careers,
  skillsCatalog,
  preselectedCareerId,
  currentUser,
  onGenerate
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [studentName, setStudentName] = useState("");
  const [educationLevel, setEducationLevel] = useState("Undergraduate");
  const [degree, setDegree] = useState("Computer Science");
  const [studyYear, setStudyYear] = useState("3rd Year");

  // Step 2: Skills
  const [currentSkills, setCurrentSkills] = useState<StudentSkillItem[]>([
    { name: "Python", proficiency: "Beginner", category: "programming" },
    { name: "HTML & CSS", proficiency: "Intermediate", category: "technical" },
    { name: "Communication", proficiency: "Intermediate", category: "soft" }
  ]);
  const [skillSearch, setSkillSearch] = useState("");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");
  const [customSkillName, setCustomSkillName] = useState("");
  const [customSkillProficiency, setCustomSkillProficiency] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [customSkillCategory, setCustomSkillCategory] = useState<"programming" | "technical" | "tools" | "soft">("technical");

  // Step 3: Target Career
  const [targetCareer, setTargetCareer] = useState<string>(preselectedCareerId || "data-scientist");
  const [customCareer, setCustomCareer] = useState("");
  const [isCustomCareer, setIsCustomCareer] = useState(false);

  // Step 4: Study Time
  const [hoursOption, setHoursOption] = useState<number>(10);
  const [customHours, setCustomHours] = useState("");

  // Step 5: Learning Preferences
  const [preferences, setPreferences] = useState<string[]>([
    "Video tutorials",
    "Practical projects",
    "Interactive coding"
  ]);

  useEffect(() => {
    if (preselectedCareerId) {
      setTargetCareer(preselectedCareerId);
      setIsCustomCareer(false);
    }
    if (currentUser) {
      if (currentUser.name) setStudentName(currentUser.name);
      if (currentUser.educationLevel) setEducationLevel(currentUser.educationLevel);
      if (currentUser.degree) setDegree(currentUser.degree);
      if (currentUser.studyYear) setStudyYear(currentUser.studyYear);
      if (currentUser.skills && currentUser.skills.length > 0) {
        setCurrentSkills(currentUser.skills);
      }
    }
  }, [preselectedCareerId, currentUser]);

  if (!isOpen) return null;

  // Add skill helper
  const addSkill = (name: string, category: "programming" | "technical" | "tools" | "soft" = "technical", defaultProf: "Beginner" | "Intermediate" | "Advanced" = "Beginner") => {
    if (currentSkills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      return;
    }
    setCurrentSkills([...currentSkills, { name, proficiency: defaultProf, category }]);
    setSkillSearch("");
  };

  const removeSkill = (name: string) => {
    setCurrentSkills(currentSkills.filter((s) => s.name !== name));
  };

  const updateSkillProficiency = (name: string, proficiency: "Beginner" | "Intermediate" | "Advanced") => {
    setCurrentSkills(
      currentSkills.map((s) => (s.name === name ? { ...s, proficiency } : s))
    );
  };

  // Preference toggle
  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      if (preferences.length > 1) {
        setPreferences(preferences.filter((p) => p !== pref));
      }
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  // Validation
  const validateAndProceed = () => {
    setErrorMsg(null);
    if (step === 2) {
      if (currentSkills.length === 0) {
        setErrorMsg("Please add at least 1 skill to calculate your gap analysis.");
        return;
      }
    }
    if (step === 3) {
      if (isCustomCareer && !customCareer.trim()) {
        setErrorMsg("Please specify your custom target career.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  // Final submission
  const handleSubmit = async () => {
    setErrorMsg(null);
    setLoading(true);

    const stages = [
      "Analyzing your current skill profile & proficiencies...",
      "Matching against target industry benchmarks & market weightings...",
      "Calculating readiness score and identifying critical missing skills...",
      "Synthesizing customized 8-week progressive roadmap...",
      "Designing exactly 3 tailored portfolio capstone projects..."
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setLoadingStage(currentStage);
      }
    }, 600);

    const chosenCareer = isCustomCareer ? customCareer.trim() : targetCareer;
    const finalHours = customHours && Number(customHours) > 0 ? Number(customHours) : hoursOption;

    try {
      await onGenerate({
        student: {
          name: studentName,
          educationLevel,
          degree,
          studyYear
        },
        currentSkills,
        targetCareer: chosenCareer,
        availableHours: finalHours,
        learningPreferences: preferences
      });
      clearInterval(interval);
      onClose();
    } catch (err: any) {
      clearInterval(interval);
      setLoading(false);
      setErrorMsg(err.message || "Failed to generate roadmap. Please try again.");
    }
  };

  const filteredCatalog = skillsCatalog.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesCategory = selectedSkillCategory === "All" || s.category === selectedSkillCategory.toLowerCase();
    const notAlreadyAdded = !currentSkills.some((cur) => cur.name.toLowerCase() === s.name.toLowerCase());
    return matchesQuery && matchesCategory && notAlreadyAdded;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0b0f1a] border border-indigo-900/50 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 bg-[#090d18]/95 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 relative">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              <Sparkles className="w-4 h-4 text-cyan-400 absolute top-2 right-2 animate-pulse" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2">
              Building Your AI Career Navigator
            </h3>

            <p className="text-sm text-indigo-300 font-medium max-w-md h-12 flex items-center justify-center">
              {[
                "Analyzing your technical and soft skill profile...",
                "Matching against target industry benchmarks & market weightings...",
                "Calculating readiness score and identifying critical missing skills...",
                "Synthesizing customized 8-week progressive roadmap...",
                "Designing exactly 3 tailored portfolio capstone projects..."
              ][loadingStage]}
            </p>

            <div className="w-64 h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${((loadingStage + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-950/80 bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Student Career Assessment</h2>
              <span className="text-xs text-slate-400">Step {step} of 5</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-slate-900 h-1">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Body Steps */}
        <div className="p-6 overflow-y-auto max-h-[68vh]">
          {/* STEP 1: Student Information */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-400" />
                  Step 1: Student Information
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tell us a bit about your academic or self-taught background.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Education Level
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Undergraduate">Undergraduate (B.Tech, B.S., B.E., etc.)</option>
                    <option value="Postgraduate">Postgraduate (M.S., M.Tech, MCA)</option>
                    <option value="High School">High School / Pre-University</option>
                    <option value="Bootcamp / Self-Taught">Bootcamp / Self-Taught</option>
                    <option value="Working Professional">Working Professional Switcher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Current Year of Study
                  </label>
                  <select
                    value={studyYear}
                    onChange={(e) => setStudyYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="1st Year">1st Year / Freshman</option>
                    <option value="2nd Year">2nd Year / Sophomore</option>
                    <option value="3rd Year">3rd Year / Junior</option>
                    <option value="Final Year">Final Year / Senior</option>
                    <option value="Recent Graduate">Recent Graduate (Within 1 Year)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Degree or Major Course
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, Information Technology, Data Science..."
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Current Skills */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-indigo-400" />
                  Step 2: Current Skills & Proficiency
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Add all the skills you currently possess and assign your self-assessed proficiency.
                </p>
              </div>

              {/* Added Skills List */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Added Skills ({currentSkills.length})
                </label>
                <div className="flex flex-wrap gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 min-h-[70px]">
                  {currentSkills.length === 0 ? (
                    <span className="text-xs text-slate-500 self-center">
                      No skills added yet. Search or add from the catalog below.
                    </span>
                  ) : (
                    currentSkills.map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                      >
                        <span className="font-medium">{s.name}</span>
                        <select
                          value={s.proficiency}
                          onChange={(e) =>
                            updateSkillProficiency(s.name, e.target.value as any)
                          }
                          className="bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-[11px] text-indigo-300 focus:outline-none"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        <button
                          onClick={() => removeSkill(s.name)}
                          className="text-slate-400 hover:text-rose-400 transition-colors ml-0.5"
                          title="Remove skill"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Skill Search & Filter */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search skill catalog (e.g. Python, SQL, Docker, React)..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {["All", "Programming", "Technical", "Tools", "Soft"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedSkillCategory(cat)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                          selectedSkillCategory === cat
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800/80 text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Autocomplete chips */}
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                  {filteredCatalog.slice(0, 15).map((item) => (
                    <button
                      key={item.name}
                      onClick={() => addSkill(item.name, item.category)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-indigo-600/30 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs border border-slate-700/50 transition-all"
                    >
                      <Plus className="w-3 h-3 text-indigo-400" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                  {filteredCatalog.length === 0 && (
                    <span className="text-xs text-slate-500 italic p-1">
                      No matching catalog skills found. You can add it as a custom skill below!
                    </span>
                  )}
                </div>
              </div>

              {/* Add Custom Skill */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="text"
                  placeholder="Can't find a skill? Type custom skill name..."
                  value={customSkillName}
                  onChange={(e) => setCustomSkillName(e.target.value)}
                  className="w-full sm:flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <select
                  value={customSkillProficiency}
                  onChange={(e) => setCustomSkillProficiency(e.target.value as any)}
                  className="px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  onClick={() => {
                    if (customSkillName.trim()) {
                      addSkill(customSkillName.trim(), customSkillCategory, customSkillProficiency);
                      setCustomSkillName("");
                    }
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Target Career */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  Step 3: Target Career Goal
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Choose your desired career track or enter a custom job role.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {careers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setTargetCareer(c.id);
                      setIsCustomCareer(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      !isCustomCareer && targetCareer === c.id
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                      !isCustomCareer && targetCareer === c.id ? "border-indigo-400 bg-indigo-600" : "border-slate-600"
                    }`}>
                      {!isCustomCareer && targetCareer === c.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{c.shortDescription}</div>
                      <div className="text-[10px] text-indigo-400 font-medium mt-1">{c.salaryRange}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
                <div
                  onClick={() => setIsCustomCareer(true)}
                  className="flex items-center gap-2 cursor-pointer mb-2"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isCustomCareer ? "border-indigo-400 bg-indigo-600" : "border-slate-600"
                  }`}>
                    {isCustomCareer && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs font-semibold text-white">
                    Or Enter a Custom Job Role
                  </span>
                </div>

                {isCustomCareer && (
                  <input
                    type="text"
                    placeholder="e.g. Blockchain Core Developer, Quantum Computing Researcher, Game Engine Developer..."
                    value={customCareer}
                    onChange={(e) => setCustomCareer(e.target.value)}
                    className="w-full mt-2 px-3.5 py-2 bg-slate-900 border border-indigo-500/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Available Study Time */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  Step 4: Available Study Time
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  How many hours can you dedicate each week? The 8-week roadmap will never exceed this budget.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "3–5 Hours / Week", val: 5, sub: "Casual / Light Pace (~45 min/day)" },
                  { label: "6–10 Hours / Week", val: 10, sub: "Balanced (~1.5 hours/day)" },
                  { label: "11–15 Hours / Week", val: 15, sub: "Intensive (~2 hours/day)" },
                  { label: "16–20 Hours / Week", val: 20, sub: "Fast-Track (~3 hours/day)" },
                  { label: "20+ Hours / Week", val: 25, sub: "Full Immersion (Bootcamp style)" }
                ].map((opt) => (
                  <div
                    key={opt.val}
                    onClick={() => {
                      setHoursOption(opt.val);
                      setCustomHours("");
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      hoursOption === opt.val && !customHours
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{opt.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{opt.sub}</div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-3">
                <span className="text-xs text-slate-300 font-medium">Or enter custom hours:</span>
                <input
                  type="number"
                  min="3"
                  max="60"
                  placeholder="e.g. 12"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  className="w-24 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400">hours per week</span>
              </div>
            </div>
          )}

          {/* STEP 5: Learning Preferences */}
          {step === 5 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Step 5: Learning Preferences
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Select your preferred learning formats to personalize your roadmap resources.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "Video tutorials", desc: "YouTube, Coursera, freeCodeCamp walkthroughs" },
                  { id: "Documentation", desc: "Official docs, MDN, DevDocs, PyData" },
                  { id: "Interactive coding", desc: "Hands-on browser challenges, Kaggle, W3Schools" },
                  { id: "Practical projects", desc: "Mini-projects, repos, GitHub starter templates" },
                  { id: "Reading materials", desc: "In-depth engineering articles, GeeksforGeeks, books" }
                ].map((pref) => {
                  const isSelected = preferences.includes(pref.id);
                  return (
                    <div
                      key={pref.id}
                      onClick={() => togglePreference(pref.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                          : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-indigo-400 bg-indigo-600" : "border-slate-700"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{pref.id}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{pref.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300">
                <span className="font-semibold text-white">Ready to Synthesize: </span>
                Targeting <strong className="text-indigo-300">{isCustomCareer ? customCareer : careers.find((c) => c.id === targetCareer)?.title || targetCareer}</strong> with{" "}
                <strong className="text-cyan-300">{currentSkills.length} existing skills</strong> and an allocated commitment of{" "}
                <strong className="text-emerald-300">{customHours || hoursOption} hours/week</strong>.
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-indigo-950/80 bg-slate-900/40 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => {
                setErrorMsg(null);
                setStep((prev) => prev - 1);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={validateAndProceed}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My AI Career Roadmap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
