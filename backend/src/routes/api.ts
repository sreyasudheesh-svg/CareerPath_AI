import { Router, Request, Response } from "express";
import { db, CareerAssessmentRecord } from "../db/database";
import { analyzeSkillGap } from "../services/skillMatchEngine";
import { generatePersonalizedRoadmap } from "../services/aiRoadmapService";
import { generatePortfolioProjects } from "../services/portfolioGenerator";
import { generateChatResponse } from "../services/chatService";
import { authRouter } from "./auth";
import { optionalAuth, AuthenticatedRequest } from "../utils/auth";

export const apiRouter = Router();

// Mount Auth and Student Skills endpoints
apiRouter.use("/auth", authRouter);
apiRouter.use("/student", authRouter);

// GET /api/careers - List all career role profiles
apiRouter.get("/careers", (req: Request, res: Response) => {
  try {
    const careers = db.getCareers();
    res.json({ success: true, data: careers });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/skills - List full skills catalog
apiRouter.get("/skills", (req: Request, res: Response) => {
  try {
    const catalog = db.getSkillsCatalog();
    res.json({ success: true, data: catalog });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/assess - Generate personalized assessment, 8-week roadmap & portfolio projects
apiRouter.post("/assess", optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { student, currentSkills, targetCareer, availableHours, learningPreferences } = req.body;

    if (!targetCareer) {
      return res.status(400).json({ success: false, error: "Target career is required." });
    }

    const safeHours = Number(availableHours) > 0 ? Number(availableHours) : 10;
    const skillsList = Array.isArray(currentSkills) ? currentSkills : [];
    const preferencesList = Array.isArray(learningPreferences) ? learningPreferences : ["Video tutorials", "Practical projects"];

    // 1. Skill gap analysis
    const matchResult = analyzeSkillGap(targetCareer, skillsList);

    // 2. 8-week dynamic roadmap
    const roadmap = generatePersonalizedRoadmap({
      targetCareer: matchResult.targetCareerId,
      targetCareerTitle: matchResult.targetCareerTitle,
      availableHours: safeHours,
      learningPreferences: preferencesList,
      skillComparison: matchResult.comparison
    });

    // 3. Exactly 3 portfolio projects
    const portfolioProjects = generatePortfolioProjects(
      matchResult.targetCareerTitle,
      matchResult.readinessScore
    );

    const loggedInUser = req.user ? db.findUserById(req.user.userId) : undefined;

    const studentRecord = {
      id: loggedInUser?.id || `std_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: loggedInUser?.name || student?.name?.trim() || "Aspiring Engineer",
      educationLevel: loggedInUser?.educationLevel || student?.educationLevel || "Undergraduate",
      degree: loggedInUser?.degree || student?.degree || "Computer Science / Information Technology",
      studyYear: loggedInUser?.studyYear || student?.studyYear || "3rd Year",
      createdAt: new Date().toISOString()
    };

    const assessmentRecord: CareerAssessmentRecord = {
      id: `asm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: req.user?.userId,
      student: studentRecord,
      targetCareer: matchResult.targetCareerId,
      targetCareerTitle: matchResult.targetCareerTitle,
      availableHoursPerWeek: safeHours,
      learningPreferences: preferencesList,
      readinessScore: matchResult.readinessScore,
      totalRequiredSkills: matchResult.totalRequiredSkills,
      masteredSkillsCount: matchResult.masteredSkillsCount,
      skillsNeedingImprovementCount: matchResult.skillsNeedingImprovementCount,
      missingSkillsCount: matchResult.missingSkillsCount,
      skillComparison: matchResult.comparison,
      roadmap,
      portfolioProjects,
      createdAt: new Date().toISOString()
    };

    const saved = db.saveAssessment(assessmentRecord);

    // If logged in, also sync their current skills
    if (req.user?.userId && skillsList.length > 0) {
      db.updateUserSkills(req.user.userId, skillsList);
    }

    res.status(201).json({ success: true, data: saved });
  } catch (err: any) {
    console.error("Error in /api/assess:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/assessments - List all assessments (filtered if authenticated)
apiRouter.get("/assessments", optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const list = db.getAllAssessments(req.user?.userId);
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/assessments/:id - Get specific assessment
apiRouter.get("/assessments/:id", (req: Request, res: Response) => {
  try {
    const assessment = db.getAssessmentById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, error: "Assessment not found" });
    }
    res.json({ success: true, data: assessment });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/assessments/:id/tasks/:taskId/toggle - Toggle task completion
apiRouter.patch("/assessments/:id/tasks/:taskId/toggle", (req: Request, res: Response) => {
  try {
    const task = db.toggleTaskCompletion(req.params.id, req.params.taskId);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task or assessment not found" });
    }
    res.json({ success: true, data: task });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/chat - Conversational AI Career Assistant
apiRouter.post("/chat", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { assessmentId, message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    const assessment = assessmentId ? db.getAssessmentById(assessmentId) : undefined;
    const history = assessmentId ? db.getChatHistory(assessmentId) : [];

    // Save user message
    if (assessmentId) {
      db.saveChatMessage(assessmentId, "user", message, req.user?.userId);
    }

    const reply = await generateChatResponse({
      assessment,
      message,
      conversationHistory: history.map((h) => ({ role: h.role, content: h.content }))
    });

    // Save assistant message
    if (assessmentId) {
      db.saveChatMessage(assessmentId, "assistant", reply, req.user?.userId);
    }

    res.json({ success: true, reply });
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/chat/:assessmentId - Get chat history
apiRouter.get("/chat/:assessmentId", (req: Request, res: Response) => {
  try {
    const history = db.getChatHistory(req.params.assessmentId);
    res.json({ success: true, data: history });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
