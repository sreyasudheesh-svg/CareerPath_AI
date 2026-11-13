export interface StudentRecord {
  id: string;
  name: string;
  educationLevel: string;
  degree: string;
  studyYear: string;
  createdAt: string;
}

export interface StudentSkillItem {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced";
  category?: "programming" | "technical" | "tools" | "soft";
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  educationLevel: string;
  degree: string;
  studyYear: string;
  skills: StudentSkillItem[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillComparisonItem {
  skill: string;
  category: string;
  currentLevel: "None" | "Beginner" | "Intermediate" | "Advanced";
  requiredLevel: "Beginner" | "Intermediate" | "Advanced";
  status: "mastered" | "improve" | "missing";
  weight: number;
  whyItMatters: string;
  scoreCredit: number;
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: "Docs" | "Tutorial" | "Interactive" | "Video" | "Project";
  provider: string;
}

export interface WeeklyTaskItem {
  id: string;
  weekNumber: number;
  topic: string;
  skills: string[];
  learningObjectives: string[];
  resources: RoadmapResource[];
  practicalExercises: string[];
  estimatedHours: number;
  weeklyMilestone: string;
  completed: boolean;
}

export interface PortfolioProjectItem {
  id: string;
  title: string;
  description: string;
  realWorldProblem: string;
  technologies: string[];
  skillsDemonstrated: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedCompletionTime: string;
  implementationPlan: { step: number; title: string; details: string }[];
  expectedOutput: string;
  showcaseTips: string[];
}

export interface CareerAssessmentRecord {
  id: string;
  userId?: string;
  student: StudentRecord;
  targetCareer: string;
  targetCareerTitle: string;
  availableHoursPerWeek: number;
  learningPreferences: string[];
  readinessScore: number;
  totalRequiredSkills: number;
  masteredSkillsCount: number;
  skillsNeedingImprovementCount: number;
  missingSkillsCount: number;
  skillComparison: SkillComparisonItem[];
  roadmap: WeeklyTaskItem[];
  portfolioProjects: PortfolioProjectItem[];
  createdAt: string;
}

export interface CareerRoleData {
  id: string;
  title: string;
  category: string;
  icon: string;
  salaryRange: string;
  demandLevel: "Very High" | "High" | "Moderate";
  shortDescription: string;
  fullDescription: string;
  requiredSkills: {
    name: string;
    category: "programming" | "technical" | "tools" | "soft";
    requiredLevel: "Beginner" | "Intermediate" | "Advanced";
    weight: number;
    whyItMatters: string;
  }[];
}

export interface SkillCatalogItem {
  name: string;
  category: "programming" | "technical" | "tools" | "soft";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}