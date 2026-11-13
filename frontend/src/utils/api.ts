import { 
  CareerAssessmentRecord, 
  CareerRoleData, 
  SkillCatalogItem, 
  UserAccount, 
  StudentSkillItem 
} from "../types";

const API_BASE = (import.meta.env.VITE_API_URL ? (import.meta.env.VITE_API_URL as string).replace(/\/$/, '') : '') + "/api";

const TOKEN_KEY = "careerpath_auth_token";

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function getHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders
  };
  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// Auth API Calls
export async function registerStudent(payload: {
  email: string;
  password: string;
  name: string;
  educationLevel: string;
  degree: string;
  studyYear: string;
  skills?: StudentSkillItem[];
}): Promise<{ user: UserAccount; token: string }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Registration failed");
  setAuthToken(data.token);
  return data;
}

export async function loginStudent(payload: {
  email: string;
  password: string;
}): Promise<{ user: UserAccount; token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Login failed");
  setAuthToken(data.token);
  return data;
}

export async function fetchCurrentUser(): Promise<UserAccount | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!data.success) {
      clearAuthToken();
      return null;
    }
    return data.user;
  } catch (err) {
    return null;
  }
}

export async function updateUserProfile(payload: {
  name?: string;
  educationLevel?: string;
  degree?: string;
  studyYear?: string;
}): Promise<UserAccount> {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to update profile");
  return data.user;
}

export async function fetchStudentSkills(): Promise<StudentSkillItem[]> {
  const res = await fetch(`${API_BASE}/student/skills`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) return [];
  return data.data;
}

export async function saveStudentSkills(skills: StudentSkillItem[]): Promise<StudentSkillItem[]> {
  const res = await fetch(`${API_BASE}/student/skills`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ skills })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to save skills");
  return data.data;
}

export function logoutStudent(): void {
  clearAuthToken();
}

// Core Career & Assessment API Calls
export async function fetchCareers(): Promise<CareerRoleData[]> {
  const res = await fetch(`${API_BASE}/careers`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch careers");
  return data.data;
}

export async function fetchSkillsCatalog(): Promise<SkillCatalogItem[]> {
  const res = await fetch(`${API_BASE}/skills`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch skills");
  return data.data;
}

export async function submitAssessment(payload: {
  student: {
    name: string;
    educationLevel: string;
    degree: string;
    studyYear: string;
  };
  currentSkills: {
    name: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced";
    category?: string;
  }[];
  targetCareer: string;
  availableHours: number;
  learningPreferences: string[];
}): Promise<CareerAssessmentRecord> {
  const res = await fetch(`${API_BASE}/assess`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to generate roadmap");
  return data.data;
}

export async function fetchAssessmentById(id: string): Promise<CareerAssessmentRecord> {
  const res = await fetch(`${API_BASE}/assessments/${id}`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch assessment");
  return data.data;
}

export async function fetchAllAssessments(): Promise<CareerAssessmentRecord[]> {
  const res = await fetch(`${API_BASE}/assessments`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to fetch history");
  return data.data;
}

export async function toggleRoadmapTask(assessmentId: string, taskId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/assessments/${assessmentId}/tasks/${taskId}/toggle`, {
    method: "PATCH",
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to update task");
  return data.data;
}

export async function sendChatMessage(assessmentId: string | undefined, message: string): Promise<string> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ assessmentId, message })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "Failed to send message");
  return data.reply;
}

export async function fetchChatHistory(assessmentId: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/chat/${assessmentId}`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) return [];
  return data.data;
}