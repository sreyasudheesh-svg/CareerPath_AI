import { Router, Response } from "express";
import { db, UserAccountRecord } from "../db/database";
import { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  requireAuth, 
  AuthenticatedRequest 
} from "../utils/auth";

export const authRouter = Router();

// Helper to strip sensitive fields
function sanitizeUser(user: UserAccountRecord) {
  const { passwordHash, salt, ...safe } = user;
  return safe;
}

// POST /api/auth/register
authRouter.post("/register", (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, name, educationLevel, degree, studyYear, skills } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "A valid email address is required." });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ success: false, error: "Password must be at least 6 characters." });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, error: "An account with this email already exists. Please log in." });
    }

    const { hash, salt } = hashPassword(password);
    const newUser: UserAccountRecord = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: email.trim().toLowerCase(),
      passwordHash: hash,
      salt,
      name: name?.trim() || "Student",
      educationLevel: educationLevel || "Undergraduate",
      degree: degree?.trim() || "Computer Science",
      studyYear: studyYear || "3rd Year",
      skills: Array.isArray(skills) ? skills : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = db.createUser(newUser);
    const token = generateToken({
      userId: saved.id,
      email: saved.email,
      name: saved.name
    });

    res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(saved)
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
authRouter.post("/login", (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    const valid = verifyPassword(password, user.passwordHash, user.salt);
    if (!valid) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name
    });

    res.json({
      success: true,
      token,
      user: sanitizeUser(user)
    });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/me - Current logged-in student profile
authRouter.get("/me", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = db.findUserById(req.user!.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User profile not found." });
    }
    res.json({ success: true, user: sanitizeUser(user) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/auth/profile - Update student profile
authRouter.put("/profile", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, educationLevel, degree, studyYear } = req.body;
    const updated = db.updateUserProfile(req.user!.userId, {
      name,
      educationLevel,
      degree,
      studyYear
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    res.json({ success: true, user: sanitizeUser(updated) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/student/skills - Get student saved skills
authRouter.get("/skills", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const skills = db.getUserSkills(req.user!.userId);
    res.json({ success: true, data: skills });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/student/skills - Update student saved skills
authRouter.put("/skills", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { skills } = req.body;
    if (!Array.isArray(skills)) {
      return res.status(400).json({ success: false, error: "Skills must be an array." });
    }

    const updated = db.updateUserSkills(req.user!.userId, skills);
    if (!updated) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
