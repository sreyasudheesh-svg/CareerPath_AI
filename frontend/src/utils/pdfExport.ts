import jsPDF from "jspdf";
import { CareerAssessmentRecord } from "../types";

export function exportRoadmapToPDF(assessment: CareerAssessmentRecord): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("CareerPath AI", 14, 15);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("Personalized AI Career Roadmap & Skill Gap Dossier", 14, 22);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

  y = 44;

  // Student Profile & Target Role
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Student & Career Profile", 14, y);
  y += 7;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Candidate Name: ${assessment.student.name || "Student"}`, 14, y);
  doc.text(`Target Role: ${assessment.targetCareerTitle}`, 110, y);
  y += 6;
  doc.text(`Education: ${assessment.student.educationLevel} (${assessment.student.degree})`, 14, y);
  doc.text(`Study Commitment: ${assessment.availableHoursPerWeek} Hours / Week`, 110, y);
  y += 10;

  // Readiness Score Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 22, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229); // Indigo
  doc.text(`Career Readiness Score: ${assessment.readinessScore}% Match`, 20, y + 9);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Total Required Skills: ${assessment.totalRequiredSkills}  |  Mastered: ${assessment.masteredSkillsCount}  |  Improve: ${assessment.skillsNeedingImprovementCount}  |  Missing: ${assessment.missingSkillsCount}`,
    20,
    y + 16
  );
  y += 30;

  // Section: Skill Gap Analysis
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("Skill Comparison Matrix", 14, y);
  y += 6;

  // Table header
  doc.setFillColor(226, 232, 240);
  doc.rect(14, y, pageWidth - 28, 7, "F");
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text("Skill", 16, y + 5);
  doc.text("Current Level", 75, y + 5);
  doc.text("Required", 110, y + 5);
  doc.text("Status", 145, y + 5);
  doc.text("Weight", 175, y + 5);
  y += 9;

  doc.setFont("helvetica", "normal");
  for (const item of assessment.skillComparison) {
    if (y > 275) {
      doc.addPage();
      y = 18;
    }
    const statusText =
      item.status === "mastered"
        ? "Mastered"
        : item.status === "improve"
        ? "Needs Improvement"
        : "Missing";

    doc.text(item.skill, 16, y);
    doc.text(item.currentLevel, 75, y);
    doc.text(item.requiredLevel, 110, y);
    doc.text(statusText, 145, y);
    doc.text(`${item.weight}/10`, 175, y);
    y += 6;
  }

  y += 8;

  // Page 2: 8-Week Roadmap
  doc.addPage();
  y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Personalized 8-Week Learning Roadmap", 14, y);
  y += 8;

  for (const week of assessment.roadmap) {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text(`Week ${week.weekNumber}: ${week.topic} (${week.estimatedHours} hrs)`, 18, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const objText = week.learningObjectives[0] || "";
    doc.text(`Objective: ${objText.substring(0, 95)}`, 18, y + 12);
    doc.text(`${week.weeklyMilestone.substring(0, 95)}`, 18, y + 18);

    y += 28;
  }

  // Page 3: Portfolio Projects
  doc.addPage();
  y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Curated Portfolio Capstone Projects", 14, y);
  y += 8;

  for (let i = 0; i < assessment.portfolioProjects.length; i++) {
    const proj = assessment.portfolioProjects[i];
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, y, pageWidth - 28, 48, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`Project ${i + 1}: ${proj.title} [${proj.difficulty}]`, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Problem Solved: ${proj.realWorldProblem.substring(0, 110)}`, 18, y + 14);
    doc.text(`Technologies: ${proj.technologies.join(", ")}`, 18, y + 20);
    doc.text(`Expected Output: ${proj.expectedOutput.substring(0, 110)}`, 18, y + 26);
    doc.text(`Estimated Time: ${proj.estimatedCompletionTime}`, 18, y + 32);
    doc.text(`Key Milestone: ${proj.implementationPlan[0]?.title || "Initial Architecture"}`, 18, y + 38);

    y += 54;
  }

  // Save the PDF
  const filename = `CareerPath_${assessment.targetCareerTitle.replace(/\s+/g, "_")}_Roadmap.pdf`;
  doc.save(filename);
}