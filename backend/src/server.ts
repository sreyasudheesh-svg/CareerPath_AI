import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { apiRouter } from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount API routes
app.use("/api", apiRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "CareerPath AI Backend API",
    version: "1.0.0",
    time: new Date().toISOString()
  });
});

// Production Static Serving for Frontend
const candidateStaticPaths = [
  path.resolve(__dirname, "../../frontend/dist"),
  path.resolve(__dirname, "../frontend/dist"),
  path.resolve(process.cwd(), "frontend/dist"),
  path.resolve(process.cwd(), "../frontend/dist")
];

let staticDir: string | null = null;
for (const p of candidateStaticPaths) {
  if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
    staticDir = p;
    break;
  }
}

if (staticDir) {
  console.log(`📦 Serving production frontend build from: ${staticDir}`);
  app.use(express.static(staticDir));

  // Catch-all route for SPA client-side routing
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path === "/health") {
      return next();
    }
    res.sendFile(path.join(staticDir!, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 CareerPath AI Server running at http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
});
