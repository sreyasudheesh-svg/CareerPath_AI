import fs from "fs";
import path from "path";
import { CAREER_ROLES, ALL_SKILLS_CATALOG } from "../data/careerData";

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
  category?: string;
}

export interface UserAccountRecord {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
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

export interface ChatMessageRecord {
  id: string;
  assessmentId: string;
  userId?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

interface DatabaseSchema {
  users: UserAccountRecord[];
  students: StudentRecord[];
  assessments: CareerAssessmentRecord[];
  chatMessages: ChatMessageRecord[];
}

const DB_DIR = path.resolve(__dirname, "../../data");
const DB_FILE = path.join(DB_DIR, "careerpath.json");

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      users: [],
      students: [],
      assessments: [],
      chatMessages: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (!parsed.users) parsed.users = [];
    if (!parsed.students) parsed.students = [];
    if (!parsed.assessments) parsed.assessments = [];
    if (!parsed.chatMessages) parsed.chatMessages = [];
    return parsed as DatabaseSchema;
  } catch (err) {
    const fallback: DatabaseSchema = {
      users: [],
      students: [],
      assessments: [],
      chatMessages: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

function writeDb(data: DatabaseSchema): void {
  ensureDbFile();
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempFile, DB_FILE);

  // Optional Supabase cloud synchronization hook
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    // Asynchronous background sync to Supabase REST endpoint
    syncToSupabase(data).catch((err) => {
      console.warn("Supabase background sync notice:", err.message);
    });
  }
}

async function syncToSupabase(data: DatabaseSchema) {
  const sbUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const sbKey = process.env.SUPABASE_KEY;
  if (!sbUrl || !sbKey) return;

  // Supabase REST sync for assessments
  try {
    for (const a of data.assessments.slice(0, 5)) {
      await fetch(`${sbUrl}/rest/v1/career_assessments`, {
        method: "POST",
        headers: {
          "apikey": sbKey,
          "Authorization": `Bearer ${sbKey}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          id: a.id,
          target_career: a.targetCareer,
          readiness_score: a.readinessScore,
          created_at: a.createdAt
        })
      });
    }
  } catch (err) {
    // Non-blocking
  }
}

export const db = {
  getCareers() {
    return CAREER_ROLES;
  },

  getSkillsCatalog() {
    return ALL_SKILLS_CATALOG;
  },

  // User Management
  createUser(user: UserAccountRecord): UserAccountRecord {
    const data = ensureDbFile();
    data.users.push(user);
    writeDb(data);
    return user;
  },

  findUserByEmail(email: string): UserAccountRecord | undefined {
    const data = ensureDbFile();
    return data.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  },

  findUserById(id: string): UserAccountRecord | undefined {
    const data = ensureDbFile();
    return data.users.find((u) => u.id === id);
  },

  updateUserProfile(
    id: string,
    updates: { name?: string; educationLevel?: string; degree?: string; studyYear?: string }
  ): UserAccountRecord | null {
    const data = ensureDbFile();
    const user = data.users.find((u) => u.id === id);
    if (!user) return null;

    if (updates.name) user.name = updates.name.trim();
    if (updates.educationLevel) user.educationLevel = updates.educationLevel;
    if (updates.degree) user.degree = updates.degree.trim();
    if (updates.studyYear) user.studyYear = updates.studyYear;
    user.updatedAt = new Date().toISOString();

    writeDb(data);
    return user;
  },

  updateUserSkills(userId: string, skills: StudentSkillItem[]): StudentSkillItem[] | null {
    const data = ensureDbFile();
    const user = data.users.find((u) => u.id === userId);
    if (!user) return null;

    user.skills = skills;
    user.updatedAt = new Date().toISOString();
    writeDb(data);
    return user.skills;
  },

  getUserSkills(userId: string): StudentSkillItem[] {
    const data = ensureDbFile();
    const user = data.users.find((u) => u.id === userId);
    return user?.skills || [];
  },

  // Assessments
  saveAssessment(record: CareerAssessmentRecord): CareerAssessmentRecord {
    const data = ensureDbFile();
    const existingIndex = data.assessments.findIndex((a) => a.id === record.id);
    if (existingIndex >= 0) {
      data.assessments[existingIndex] = record;
    } else {
      data.assessments.unshift(record);
    }

    const studentIdx = data.students.findIndex((s) => s.id === record.student.id);
    if (studentIdx >= 0) {
      data.students[studentIdx] = record.student;
    } else {
      data.students.push(record.student);
    }

    writeDb(data);
    return record;
  },

  getAssessmentById(id: string): CareerAssessmentRecord | undefined {
    const data = ensureDbFile();
    return data.assessments.find((a) => a.id === id);
  },

  getAllAssessments(userId?: string): CareerAssessmentRecord[] {
    const data = ensureDbFile();
    if (userId) {
      return data.assessments.filter((a) => a.userId === userId);
    }
    return data.assessments;
  },

  toggleTaskCompletion(assessmentId: string, taskId: string): WeeklyTaskItem | null {
    const data = ensureDbFile();
    const assessment = data.assessments.find((a) => a.id === assessmentId);
    if (!assessment) return null;

    const task = assessment.roadmap.find((t) => t.id === taskId);
    if (!task) return null;

    task.completed = !task.completed;
    writeDb(data);
    return task;
  },

  saveChatMessage(
    assessmentId: string,
    role: "user" | "assistant",
    content: string,
    userId?: string
  ): ChatMessageRecord {
    const data = ensureDbFile();
    const msg: ChatMessageRecord = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      assessmentId,
      userId,
      role,
      content,
      timestamp: new Date().toISOString()
    };
    data.chatMessages.push(msg);
    writeDb(data);
    return msg;
  },

  getChatHistory(assessmentId: string): ChatMessageRecord[] {
    const data = ensureDbFile();
    return data.chatMessages.filter((m) => m.assessmentId === assessmentId);
  }
};
