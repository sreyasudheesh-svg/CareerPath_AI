import { CareerAssessmentRecord } from "../db/database";

interface ChatInput {
  assessment?: CareerAssessmentRecord;
  message: string;
  conversationHistory: { role: string; content: string }[];
}

export async function generateChatResponse(input: ChatInput): Promise<string> {
  const { assessment, message, conversationHistory } = input;
  const apiKey = process.env.GEMINI_API_KEY;

  const targetRole = assessment?.targetCareerTitle || "Software & Tech Careers";
  const readiness = assessment?.readinessScore ?? 0;
  const missing = assessment?.skillComparison?.filter((s) => s.status === "missing").map((s) => s.skill) || [];
  const improve = assessment?.skillComparison?.filter((s) => s.status === "improve").map((s) => s.skill) || [];
  const mastered = assessment?.skillComparison?.filter((s) => s.status === "mastered").map((s) => s.skill) || [];

  // If Gemini API Key is available, invoke it
  if (apiKey) {
    try {
      const systemInstruction = `You are CareerPath AI's senior career advisor.
Student Context:
- Target Career: ${targetRole}
- Overall Readiness Score: ${readiness}%
- Skills Mastered: ${mastered.join(", ") || "None yet"}
- Skills Needing Improvement: ${improve.join(", ") || "None"}
- Missing Skills: ${missing.join(", ") || "None"}
- Available Weekly Hours: ${assessment?.availableHoursPerWeek || 10} hours/week

Provide encouraging, actionable, highly specific advice with code snippets, recommended study paths, or interview tips when helpful. Format your output with markdown headers, bullet points, and clean syntax.`;

      const contents = [
        ...conversationHistory.slice(-6).map((c) => ({
          role: c.role === "assistant" ? "model" : "user",
          parts: [{ text: c.content }]
        })),
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\nStudent question: ${message}` }]
        }
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents })
        }
      );

      if (res.ok) {
        const json: any = await res.json();
        const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to intelligent career advisor engine:", err);
    }
  }

  // Intelligent Contextual Advisor Engine Fallback
  const q = message.toLowerCase();

  if (q.includes("why should i learn") || q.includes("why learn") || q.includes("why is") && q.includes("important")) {
    const matchedSkill = [...missing, ...improve, ...mastered].find((s) => q.includes(s.toLowerCase())) || "this skill";
    return `### 💡 Why ${matchedSkill} is Crucial for a ${targetRole}

In your journey toward becoming a **${targetRole}**, **${matchedSkill}** serves as a core competency pillar for several reasons:

1. **Market Standard**: Over 85% of job requisitions for **${targetRole}** list ${matchedSkill} as a non-negotiable benchmark.
2. **Workflow Multiplier**: It allows you to build scalable solutions rather than ad-hoc workarounds.
3. **Interview Differentiation**: Senior hiring managers evaluate your mastery of this skill to gauge your engineering maturity.

${missing.includes(matchedSkill) ? `> [!TIP]\n> **Action Item**: Since **${matchedSkill}** is currently identified as **missing** in your skill profile, prioritize it in Week 1–3 of your roadmap!` : `> [!NOTE]\n> You already have experience in this area! Focus on elevating it to an advanced level through practical projects.`}`;
  }

  if (q.includes("after sql") || q.includes("what should i learn after") || q.includes("next step")) {
    return `### 🚀 Recommended Next Step After SQL

Once you feel confident writing joins, window functions, and aggregations in SQL, your recommended progression for **${targetRole}** is:

1. **Python for Data Wrangling (Pandas & NumPy)**: Combine your relational queries with Python scripts to automate end-to-end data pipelines.
2. **Data Visualization (Plotly / Tableau / Power BI)**: Transform raw tabular query outputs into executive visual stories.
3. **Statistical Modeling & Machine Learning**: Apply statistical significance tests, linear regressions, and classification algorithms on top of your transformed database tables.

> Check out **Week 4 & 5** of your personalized 8-Week Roadmap—that is where we transition seamlessly from SQL query design into predictive pipelines!`;
  }

  if (q.includes("machine learning") && (q.includes("necessary") || q.includes("needed") || q.includes("required"))) {
    return `### 🤖 Is Machine Learning Necessary for a ${targetRole}?

For your chosen role as a **${targetRole}**:
- **Core Requirement?** ${targetRole.toLowerCase().includes("data") || targetRole.toLowerCase().includes("ai") ? "**Yes, absolutely essential.** You will need to understand supervised learning, model evaluation metrics, and feature engineering." : "**Beneficial but secondary.** Having foundational ML literacy (e.g. calling LLM APIs or understanding model outputs) will make you a standout candidate, but core software architecture remains your primary priority."}
- **Recommended Focus**: Do not get bogged down in pure mathematical proofs initially. Instead, focus on **practical implementation**: data preprocessing, training models with Scikit-Learn or calling modern AI APIs, and evaluating accuracy on real datasets.`;
  }

  if (q.includes("interview") || q.includes("prepare for interview") || q.includes("hire") || q.includes("job")) {
    return `### 🎯 Technical Interview Blueprint for ${targetRole}

Here is a 4-step strategy to ace your upcoming interviews:

1. **Master the High-Frequency Questions**:
   - For **${targetRole}**, review core syntax, system trade-offs, and live coding exercises.
2. **Lead with Portfolio Impact**:
   - Speak about the **3 mini-projects** generated in your dashboard. Frame them using the STAR method: *Situation, Task, Action, and Measurable Result*.
3. **Demonstrate Communication & Storytelling**:
   - Always explain *why* you chose a particular library or data structure before writing the code.
4. **Targeted Preparation**:
   - Dedicate the final week of your roadmap (**Week 8**) to mock technical screenings and timed problem-solving.`;
  }

  if (q.includes("explain") || q.includes("what is")) {
    return `### 📘 Concept Breakdown for ${targetRole}

When breaking down complex engineering concepts for **${targetRole}**, the best approach is:

1. **Intuition First**: What real-world bottleneck or inefficiency does this concept solve?
2. **Minimal Working Example**: How do we implement it in 5–10 lines of clean code?
3. **Edge Cases & Trade-offs**: When should you *avoid* using it (e.g., memory overhead, latency limits)?

*If you would like a deep-dive explanation of a specific algorithm, architecture, or tool, just ask with the exact term!*`;
  }

  // General encouraging reply
  return `### 💡 Career Advisor Insight for ${targetRole}

You are currently tracking at a **${readiness}% Career Readiness Score** for **${targetRole}**.

Here is how you can optimize your learning pace:
- **Missing Skills**: We have identified **${missing.slice(0, 3).join(", ") || "none - great job!"}** as primary growth areas.
- **Study Schedule**: With your available commitment of **${assessment?.availableHoursPerWeek || 10} hours/week**, maintaining consistent daily 1–2 hour sprints is far more effective than cramming on weekends.
- **Flagship Project**: Start reviewing the **${assessment?.portfolioProjects?.[0]?.title || "Capstone Project"}** in your dashboard to anchor your learning around real-world deliverables.

*Feel free to ask me to explain any difficult concept, recommend resources, or give interview advice!*`;
}
