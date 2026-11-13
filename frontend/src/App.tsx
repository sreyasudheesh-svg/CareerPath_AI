import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingHero } from "./components/LandingHero";
import { DashboardView } from "./components/DashboardView";
import { AssessmentWizard } from "./components/AssessmentWizard";
import { ExploreCareersModal } from "./components/ExploreCareersModal";
import { HistoryModal } from "./components/HistoryModal";
import { AIChatDrawer } from "./components/AIChatDrawer";
import { AuthModal } from "./components/AuthModal";
import { ProfileModal } from "./components/ProfileModal";
import { 
  CareerAssessmentRecord, 
  CareerRoleData, 
  SkillCatalogItem,
  UserAccount 
} from "./types";
import { 
  fetchCareers, 
  fetchSkillsCatalog, 
  fetchAllAssessments, 
  submitAssessment,
  fetchCurrentUser,
  logoutStudent
} from "./utils/api";
import { Sparkles } from "lucide-react";

export const App: React.FC = () => {
  const [careers, setCareers] = useState<CareerRoleData[]>([]);
  const [skillsCatalog, setSkillsCatalog] = useState<SkillCatalogItem[]>([]);
  const [savedAssessments, setSavedAssessments] = useState<CareerAssessmentRecord[]>([]);
  const [activeAssessment, setActiveAssessment] = useState<CareerAssessmentRecord | null>(null);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Modals & Navigation
  const [viewMode, setViewMode] = useState<"landing" | "dashboard">("landing");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [preselectedCareerId, setPreselectedCareerId] = useState<string | undefined>(undefined);

  // Load initial datasets & verify session
  useEffect(() => {
    async function init() {
      try {
        const [cList, sList, aList, user] = await Promise.all([
          fetchCareers(),
          fetchSkillsCatalog(),
          fetchAllAssessments(),
          fetchCurrentUser()
        ]);
        setCareers(cList);
        setSkillsCatalog(sList);
        setSavedAssessments(aList);
        if (user) {
          setCurrentUser(user);
        }
        
        // If there are prior assessments, default active to the most recent one
        if (aList && aList.length > 0) {
          setActiveAssessment(aList[0]);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }
    init();
  }, []);

  const handleStartAssessment = (careerId?: string) => {
    setPreselectedCareerId(careerId);
    setIsWizardOpen(true);
  };

  const handleGenerate = async (formData: any) => {
    const result = await submitAssessment(formData);
    setActiveAssessment(result);
    setSavedAssessments((prev) => [result, ...prev.filter((a) => a.id !== result.id)]);
    setViewMode("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    logoutStudent();
    setCurrentUser(null);
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        onStartAssessment={handleStartAssessment}
        onOpenExploreCareers={() => setIsExploreOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onToggleChat={() => setIsChatDrawerOpen(!isChatDrawerOpen)}
        hasActiveAssessment={!!activeAssessment}
        onViewDashboard={() => {
          setViewMode("dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        user={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {viewMode === "landing" || !activeAssessment ? (
          <LandingHero
            onStartAssessment={() => handleStartAssessment()}
            onOpenExploreCareers={() => setIsExploreOpen(true)}
          />
        ) : (
          <DashboardView
            assessment={activeAssessment}
            onRetake={() => handleStartAssessment(activeAssessment.targetCareer)}
            onSwitchCareer={() => setIsExploreOpen(true)}
            onUpdateAssessment={(updated) => {
              setActiveAssessment(updated);
              setSavedAssessments((prev) =>
                prev.map((a) => (a.id === updated.id ? updated : a))
              );
            }}
          />
        )}
      </main>

      {/* Floating Action Button for AI Advisor */}
      <button
        onClick={() => setIsChatDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all"
        title="Open AI Career Navigator Coach"
      >
        <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
        <span className="hidden sm:inline">Ask AI Career Coach</span>
        <span className="sm:hidden">AI Coach</span>
      </button>

      {/* Modals & Drawers */}
      <AssessmentWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        careers={careers}
        skillsCatalog={skillsCatalog}
        preselectedCareerId={preselectedCareerId}
        currentUser={currentUser}
        onGenerate={handleGenerate}
      />

      <ExploreCareersModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        careers={careers}
        onSelectCareer={(cId) => handleStartAssessment(cId)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        assessments={savedAssessments}
        onSelectAssessment={(assessment) => {
          setActiveAssessment(assessment);
          setViewMode("dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNewAssessment={() => handleStartAssessment()}
      />

      <AIChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        assessment={activeAssessment || undefined}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
      />

      {currentUser && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          onUpdateUser={(updated) => setCurrentUser(updated)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};
export default App;
