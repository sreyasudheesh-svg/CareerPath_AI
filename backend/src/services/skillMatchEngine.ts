import { CAREER_ROLES, CareerRoleData, SkillRequirement } from "../data/careerData";
import { SkillComparisonItem, StudentSkillItem } from "../db/database";

export interface SkillMatchResult {
  targetCareerId: string;
  targetCareerTitle: string;
  readinessScore: number;
  totalRequiredSkills: number;
  masteredSkillsCount: number;
  skillsNeedingImprovementCount: number;
  missingSkillsCount: number;
  comparison: SkillComparisonItem[];
  categoryBreakdown: {
    category: string;
    studentScore: number;
    requiredScore: number;
    percentage: number;
  }[];
}

const LEVEL_NUMERIC: Record<string, number> = {
  None: 0,
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3
};

function normalizeSkill(s: string): string {
  const clean = s.trim().toLowerCase();
  if (clean === "js" || clean === "javascript") return "javascript";
  if (clean === "ts" || clean === "typescript") return "typescript";
  if (clean === "py" || clean === "python") return "python";
  if (clean.includes("react")) return "react.js";
  if (clean.includes("node")) return "node.js & express";
  if (clean.includes("sql")) return "sql";
  if (clean.includes("html") || clean.includes("css")) return "html & css";
  if (clean.includes("docker")) return "docker";
  if (clean.includes("git")) return "git & version control";
  if (clean.includes("machine learning") || clean === "ml") return "machine learning";
  if (clean.includes("statistics")) return "statistics & probability";
  return clean;
}

export function analyzeSkillGap(
  targetCareerIdOrTitle: string,
  studentSkills: StudentSkillItem[]
): SkillMatchResult {
  // Find matching career role or create a dynamic fallback for custom job titles
  let role: CareerRoleData | undefined = CAREER_ROLES.find(
    (c) =>
      c.id.toLowerCase() === targetCareerIdOrTitle.toLowerCase() ||
      c.title.toLowerCase() === targetCareerIdOrTitle.toLowerCase()
  );

  if (!role) {
    // Dynamic role generation for custom careers entered by user
    role = {
      id: targetCareerIdOrTitle.toLowerCase().replace(/\s+/g, "-"),
      title: targetCareerIdOrTitle,
      category: "Specialized Tech",
      icon: "Sparkles",
      salaryRange: "$80,000 - $150,000",
      demandLevel: "High",
      shortDescription: `Custom specialized roadmap for ${targetCareerIdOrTitle}.`,
      fullDescription: `Tailored curriculum and competency roadmap targeting industry readiness for ${targetCareerIdOrTitle}.`,
      requiredSkills: [
        { name: "Core Programming", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Essential foundation for building software and scripts." },
        { name: "Domain Architecture & Design", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Required to structure robust systems and solve domain challenges." },
        { name: "Tooling & Workflow Automation", category: "tools", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Maximizes productivity and integrates modern industry practices." },
        { name: "Data Management & Storage", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Handling structured inputs and state reliably." },
        { name: "Testing & Code Quality", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Ensuring robustness and verifying requirements." },
        { name: "Problem Solving & Analytical Thinking", category: "soft", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Breaking down complex specifications into functional deliverables." }
      ]
    };
  }

  // Create lookup map of student skills
  const studentMap = new Map<string, "Beginner" | "Intermediate" | "Advanced">();
  for (const s of studentSkills) {
    studentMap.set(normalizeSkill(s.name), s.proficiency);
  }

  let totalWeight = 0;
  let earnedScore = 0;

  const comparison: SkillComparisonItem[] = [];
  let masteredCount = 0;
  let improveCount = 0;
  let missingCount = 0;

  for (const req of role.requiredSkills) {
    const normReq = normalizeSkill(req.name);
    // Search exact normalized or substring match
    let currentLevel: "None" | "Beginner" | "Intermediate" | "Advanced" = "None";

    for (const [stSkill, stProf] of studentMap.entries()) {
      if (stSkill === normReq || normReq.includes(stSkill) || stSkill.includes(normReq)) {
        currentLevel = stProf;
        break;
      }
    }

    const curNum = LEVEL_NUMERIC[currentLevel];
    const reqNum = LEVEL_NUMERIC[req.requiredLevel];

    let credit = 0;
    let status: "mastered" | "improve" | "missing" = "missing";

    if (currentLevel === "None") {
      credit = 0;
      status = "missing";
      missingCount++;
    } else if (curNum >= reqNum) {
      credit = 1.0;
      status = "mastered";
      masteredCount++;
    } else {
      // currentLevel < reqNum
      status = "improve";
      improveCount++;
      if (req.requiredLevel === "Advanced") {
        credit = currentLevel === "Intermediate" ? 0.65 : 0.35;
      } else if (req.requiredLevel === "Intermediate") {
        credit = 0.5;
      } else {
        credit = 0.4;
      }
    }

    totalWeight += req.weight;
    earnedScore += credit * req.weight;

    comparison.push({
      skill: req.name,
      category: req.category,
      currentLevel,
      requiredLevel: req.requiredLevel,
      status,
      weight: req.weight,
      whyItMatters: req.whyItMatters,
      scoreCredit: Math.round(credit * 100) / 100
    });
  }

  // Also include student bonus skills that are relevant
  for (const s of studentSkills) {
    const isAlreadyIn = comparison.some(
      (c) => normalizeSkill(c.skill) === normalizeSkill(s.name)
    );
    if (!isAlreadyIn) {
      comparison.push({
        skill: s.name,
        category: (s.category as any) || "technical",
        currentLevel: s.proficiency,
        requiredLevel: "Beginner",
        status: "mastered",
        weight: 5,
        whyItMatters: "Valuable supplementary skill that enhances your overall engineering versatility.",
        scoreCredit: 1.0
      });
      masteredCount++;
    }
  }

  const rawReadiness = totalWeight > 0 ? (earnedScore / totalWeight) * 100 : 0;
  const readinessScore = Math.min(100, Math.max(5, Math.round(rawReadiness)));

  // Category breakdown for Radar Chart / Bar Visuals
  const categories = ["programming", "technical", "tools", "soft"];
  const categoryBreakdown = categories.map((cat) => {
    const items = comparison.filter((c) => c.category === cat);
    if (items.length === 0) {
      return { category: cat.toUpperCase(), studentScore: 0, requiredScore: 100, percentage: 0 };
    }
    const catTotalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const catEarned = items.reduce((sum, item) => sum + item.scoreCredit * item.weight, 0);
    const pct = Math.round((catEarned / catTotalWeight) * 100);
    return {
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      studentScore: pct,
      requiredScore: 100,
      percentage: pct
    };
  });

  return {
    targetCareerId: role.id,
    targetCareerTitle: role.title,
    readinessScore,
    totalRequiredSkills: role.requiredSkills.length,
    masteredSkillsCount: masteredCount,
    skillsNeedingImprovementCount: improveCount,
    missingSkillsCount: missingCount,
    comparison,
    categoryBreakdown
  };
}
