import { SkillComparisonItem, WeeklyTaskItem } from "../db/database";

interface RoadmapInput {
  targetCareer: string;
  targetCareerTitle: string;
  availableHours: number;
  learningPreferences: string[];
  skillComparison: SkillComparisonItem[];
}

export function generatePersonalizedRoadmap(input: RoadmapInput): WeeklyTaskItem[] {
  const { targetCareerTitle, availableHours, learningPreferences, skillComparison } = input;

  // Identify prioritized missing and improvable skills
  const missingSkills = skillComparison
    .filter((s) => s.status === "missing")
    .sort((a, b) => b.weight - a.weight);

  const improveSkills = skillComparison
    .filter((s) => s.status === "improve")
    .sort((a, b) => b.weight - a.weight);

  const masteredSkills = skillComparison
    .filter((s) => s.status === "mastered");

  // Safe allocated study hours (between 3 and availableHours, typically 85-100% of budget)
  const allocatedHours = Math.max(3, Math.min(availableHours, Math.round(availableHours * 0.95)));

  // Generate dynamic 8-week progression tailored to role
  const weeks: WeeklyTaskItem[] = [];

  // Career-specific templates with real verified links
  const normalizedRole = targetCareerTitle.toLowerCase();

  if (normalizedRole.includes("data scientist") || normalizedRole.includes("machine learning") || normalizedRole.includes("ai")) {
    weeks.push({
      id: "w1",
      weekNumber: 1,
      topic: "Python Core & Mathematical Foundations",
      skills: ["Python Syntax", "Data Structures", "Vectors & Matrices"],
      learningObjectives: [
        "Master idiomatic Python list comprehensions, lambda functions, and OOP principles.",
        "Understand linear algebra fundamentals: vector multiplication, dot products, and matrix determinants.",
        "Set up a reproducible Jupyter Lab and VS Code data environment."
      ],
      resources: [
        { title: "Python for Everybody", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", type: "Tutorial" },
        { title: "Python Official Documentation", provider: "Python.org", url: "https://docs.python.org/3/tutorial/", type: "Docs" },
        { title: "Kaggle Python Micro-Course", provider: "Kaggle", url: "https://www.kaggle.com/learn/python", type: "Interactive" }
      ],
      practicalExercises: [
        "Build a command-line statistics calculator for variance and standard deviation.",
        "Solve 5 algorithmic data manipulation challenges on HackerRank or LeetCode."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Execute automated data processing scripts in Python without external libraries.",
      completed: false
    });

    weeks.push({
      id: "w2",
      weekNumber: 2,
      topic: "High-Performance Data Wrangling with NumPy & Pandas",
      skills: ["NumPy Arrays", "Pandas DataFrames", "Data Imputation", "Aggregation"],
      learningObjectives: [
        "Manipulate multi-dimensional numerical arrays with vectorized NumPy operations.",
        "Filter, group, and reshape complex tabular data using Pandas pivot tables and merges.",
        "Detect and treat missing values, outliers, and type discrepancies in raw CSV datasets."
      ],
      resources: [
        { title: "Pandas User Guide", provider: "Pandas.pydata.org", url: "https://pandas.pydata.org/docs/user_guide/index.html", type: "Docs" },
        { title: "Kaggle Pandas Course", provider: "Kaggle", url: "https://www.kaggle.com/learn/pandas", type: "Interactive" },
        { title: "Data Analysis with Python", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", type: "Video" }
      ],
      practicalExercises: [
        "Clean a messy 10,000-row real estate or sales CSV dataset.",
        "Calculate rolling monthly growth rates and group metrics by category."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Produce a cleaned, analysis-ready dataset with an automated preprocessing pipeline.",
      completed: false
    });

    weeks.push({
      id: "w3",
      weekNumber: 3,
      topic: "Exploratory Data Analysis & Advanced Visualization",
      skills: ["Matplotlib", "Seaborn", "Statistical Distributions", "Insight Storytelling"],
      learningObjectives: [
        "Construct histograms, box plots, scatter matrices, and heatmaps to discover correlations.",
        "Interpret normal, skewed, and binomial distributions with statistical significance tests.",
        "Synthesize complex numerical insights into executive charts with clear annotations."
      ],
      resources: [
        { title: "Seaborn Official Tutorials", provider: "Seaborn", url: "https://seaborn.pydata.org/tutorial.html", type: "Docs" },
        { title: "Kaggle Data Visualization", provider: "Kaggle", url: "https://www.kaggle.com/learn/data-visualization", type: "Interactive" },
        { title: "Statistical Thinking for Data Science", provider: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/mathematics-for-data-science/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Generate a publication-ready 6-panel exploratory dashboard examining demographic trends.",
        "Perform Pearson correlation analysis and explain feature collinearity in markdown."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Publish an annotated exploratory data story illustrating key variance factors.",
      completed: false
    });

    weeks.push({
      id: "w4",
      weekNumber: 4,
      topic: "Relational Databases & Advanced SQL Analytics",
      skills: ["SQL Joins", "Window Functions", "Subqueries", "Database Indexing"],
      learningObjectives: [
        "Query enterprise relational databases with multi-table INNER, LEFT, and FULL joins.",
        "Apply window functions (RANK, DENSE_RANK, LEAD, LAG, PARTITION BY) for cohort analysis.",
        "Connect Python scripts to SQLite/PostgreSQL to stream and transform batch data."
      ],
      resources: [
        { title: "SQL Tutorial", provider: "W3Schools", url: "https://www.w3schools.com/sql/", type: "Tutorial" },
        { title: "PostgreSQL Tutorial", provider: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", type: "Docs" },
        { title: "SQLBolt Interactive Lessons", provider: "SQLBolt", url: "https://sqlbolt.com/", type: "Interactive" }
      ],
      practicalExercises: [
        "Write queries calculating customer retention rates month-over-month.",
        "Build a Python script that pulls transactional data directly from SQLite into a DataFrame."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Query complex multi-table schemas and export aggregated cohorts under 500ms.",
      completed: false
    });

    weeks.push({
      id: "w5",
      weekNumber: 5,
      topic: "Supervised Machine Learning & Feature Engineering",
      skills: ["Scikit-Learn", "Linear & Logistic Regression", "Decision Trees & Random Forests"],
      learningObjectives: [
        "Implement feature scaling, one-hot encoding, and train-test splits with cross-validation.",
        "Train classification and regression models using Scikit-Learn pipelines.",
        "Evaluate predictive performance using RMSE, MAE, ROC-AUC, and Confusion Matrices."
      ],
      resources: [
        { title: "Scikit-Learn Documentation", provider: "Scikit-Learn.org", url: "https://scikit-learn.org/stable/tutorial/index.html", type: "Docs" },
        { title: "Intro to Machine Learning", provider: "Kaggle", url: "https://www.kaggle.com/learn/intro-to-machine-learning", type: "Interactive" },
        { title: "Machine Learning with Python", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/machine-learning-with-python/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Train a Random Forest classifier to predict customer churn with >85% accuracy.",
        "Perform grid search hyperparameter tuning to prevent overfitting."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Deploy a validated ML pipeline with automated metric benchmarking.",
      completed: false
    });

    weeks.push({
      id: "w6",
      weekNumber: 6,
      topic: "Advanced AI / Deep Learning / Unsupervised Modeling",
      skills: ["K-Means Clustering", "PCA Dimensionality Reduction", "Neural Networks / LLM APIs"],
      learningObjectives: [
        "Cluster multi-dimensional behavioral customer data using K-Means and Elbow curves.",
        "Reduce high-dimensional feature spaces using Principal Component Analysis (PCA).",
        "Integrate transformer embeddings and LLM APIs for automated text classification."
      ],
      resources: [
        { title: "Deep Learning Foundations", provider: "Kaggle", url: "https://www.kaggle.com/learn/intro-to-deep-learning", type: "Interactive" },
        { title: "PyTorch Official Tutorials", provider: "PyTorch.org", url: "https://pytorch.org/tutorials/", type: "Docs" },
        { title: "Hugging Face NLP Course", provider: "Hugging Face", url: "https://huggingface.co/learn/nlp-course/chapter1/1", type: "Tutorial" }
      ],
      practicalExercises: [
        "Segment an e-commerce customer base into distinct buying personas using unsupervised clustering.",
        "Implement sentiment analysis on product reviews using pre-trained embeddings."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Generate actionable behavioral clusters and semantic embeddings from raw data.",
      completed: false
    });

    weeks.push({
      id: "w7",
      weekNumber: 7,
      topic: "End-to-End Production Capstone System",
      skills: ["FastAPI / Streamlit", "Model Serialization (Pickle/ONNX)", "Dockerization"],
      learningObjectives: [
        "Serialize trained models and build a low-latency REST API using FastAPI.",
        "Construct an interactive web dashboard in Streamlit or React for real-time model inference.",
        "Containerize the entire data and inference pipeline using Docker for cloud reproducibility."
      ],
      resources: [
        { title: "FastAPI Documentation", provider: "FastAPI", url: "https://fastapi.tiangolo.com/tutorial/", type: "Docs" },
        { title: "Streamlit Getting Started", provider: "Streamlit.io", url: "https://docs.streamlit.io/get-started", type: "Docs" },
        { title: "Docker for Beginners", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/news/what-is-docker-used-for-a-docker-container-tutorial-for-beginners/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Build a web service where users enter profile attributes and receive instant model predictions.",
        "Write Dockerfile and docker-compose configurations to spin up the service in one command."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Working cloud-ready web application delivering real-time predictions.",
      completed: false
    });

    weeks.push({
      id: "w8",
      weekNumber: 8,
      topic: "Technical Portfolio, Code Audit & Interview Preparation",
      skills: ["GitHub Documentation", "Technical Case Study", "Resume Alignment", "System Design"],
      learningObjectives: [
        "Write comprehensive GitHub READMEs with architecture diagrams, installation guides, and benchmark tables.",
        "Craft a professional portfolio project writeup highlighting business impact and trade-offs.",
        "Practice high-frequency interview technical questions (SQL live coding, ML theory, A/B testing)."
      ],
      resources: [
        { title: "How to Build a Data Science Portfolio", provider: "Towards Data Science", url: "https://towardsdatascience.com/how-to-build-a-data-science-portfolio-5f5665b1ac0f", type: "Tutorial" },
        { title: "Data Science Interview Handbook", provider: "GitHub", url: "https://github.com/alexeygrigorev/data-science-interviews", type: "Docs" },
        { title: "Make a README", provider: "Make a README", url: "https://www.makeareadme.com/", type: "Docs" }
      ],
      practicalExercises: [
        "Deploy project repositories on GitHub with clean commit histories and live interactive demo links.",
        "Conduct a 45-minute timed mock interview solving SQL aggregations and ML scenario prompts."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Industry-grade GitHub portfolio and complete job-application readiness.",
      completed: false
    });
  } else {
    // Universal Full Stack / Software / Cloud / Security / UI curriculum
    const isFrontend = normalizedRole.includes("frontend") || normalizedRole.includes("ui");
    const isSecurity = normalizedRole.includes("cyber") || normalizedRole.includes("security");
    const isCloud = normalizedRole.includes("cloud") || normalizedRole.includes("devops");

    weeks.push({
      id: "w1",
      weekNumber: 1,
      topic: `Foundational Engineering & Core Tools for ${targetCareerTitle}`,
      skills: ["Core Syntax & Types", "Git Version Control", "Terminal Workflow"],
      learningObjectives: [
        "Master language syntax, functional patterns, error handling, and type safety.",
        "Establish version control best practices: branching, rebasing, and GitHub collaboration.",
        "Configure automated linting and formatting environments."
      ],
      resources: [
        { title: "MDN Web Docs", provider: "Mozilla", url: "https://developer.mozilla.org/en-US/", type: "Docs" },
        { title: "Git & GitHub Crash Course", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/news/git-and-github-crash-course/", type: "Tutorial" },
        { title: "W3Schools Learn Tech", provider: "W3Schools", url: "https://www.w3schools.com/", type: "Interactive" }
      ],
      practicalExercises: [
        "Initialize a modular GitHub repository with branch protection and automated markdown specs.",
        "Build 3 algorithmic utilities demonstrating data transformations and error boundaries."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: `Milestone: Solidified baseline setup and automated code workflows for ${targetCareerTitle}.`,
      completed: false
    });

    weeks.push({
      id: "w2",
      weekNumber: 2,
      topic: isFrontend ? "Modern Component Architecture & Reactive State" : isSecurity ? "Network Protocols & Packet Inspection" : "Data Layer Design & Relational Modeling",
      skills: isFrontend ? ["React Hooks", "Component Tree", "Props & State"] : isSecurity ? ["TCP/IP", "Wireshark", "DNS & HTTP/S"] : ["SQL DDL/DML", "Normalization", "Indexes"],
      learningObjectives: [
        isFrontend ? "Build modular UI components with unidirectional data flow and clean prop contracts." : isSecurity ? "Capture, filter, and analyze live network packets to identify protocol anomalies." : "Design 3NF relational database schemas with foreign keys and cascade rules.",
        "Implement predictable state transitions and defensive data validations.",
        "Profile performance bottlenecks and measure query/render latency."
      ],
      resources: [
        { title: isFrontend ? "React Official Docs" : isSecurity ? "Wireshark User Guide" : "PostgreSQL Tutorial", provider: "Official", url: isFrontend ? "https://react.dev/" : isSecurity ? "https://www.wireshark.org/docs/" : "https://www.postgresqltutorial.com/", type: "Docs" },
        { title: "Interactive Exercises", provider: "W3Schools", url: "https://www.w3schools.com/", type: "Interactive" }
      ],
      practicalExercises: [
        "Implement transactional workflows with rigorous validation checks.",
        "Perform benchmark testing under varied input loads."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Functional architectural foundation adhering to industry best practices.",
      completed: false
    });

    weeks.push({
      id: "w3",
      weekNumber: 3,
      topic: isFrontend ? "Responsive UI Systems & Modern CSS / Tailwind" : isSecurity ? "Vulnerability Scanning & Penetration Testing Basics" : "High-Throughput RESTful API Architecture",
      skills: isFrontend ? ["Tailwind CSS", "Flexbox & Grid", "Accessibility (a11y)"] : isSecurity ? ["Nmap", "OWASP Top 10", "Burp Suite"] : ["Express / FastAPI", "Middleware", "HTTP Status Contracts"],
      learningObjectives: [
        "Design responsive, accessible layouts or secure API endpoints following standard conventions.",
        "Enforce strict input sanitization, rate-limiting, and structured status codes.",
        "Write integration tests validating all edge cases and error responses."
      ],
      resources: [
        { title: "Official Documentation", provider: "Developer Docs", url: "https://developer.mozilla.org/", type: "Docs" },
        { title: "Security Best Practices", provider: "OWASP", url: "https://owasp.org/www-project-top-ten/", type: "Docs" }
      ],
      practicalExercises: [
        "Construct resilient endpoints / UI views handling network failures gracefully.",
        "Execute automated security and lint audits."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Production-grade component / service with 100% test coverage.",
      completed: false
    });

    weeks.push({
      id: "w4",
      weekNumber: 4,
      topic: "Authentication, State Management & Data Security",
      skills: ["JWT & Sessions", "Role-Based Access Control", "State Containers"],
      learningObjectives: [
        "Implement secure token-based authentication (JWT, refresh cookies, password hashing with bcrypt).",
        "Enforce role-based permission checks across private routes and database queries.",
        "Manage shared application state with atomic updates and zero memory leaks."
      ],
      resources: [
        { title: "Authentication Guide", provider: "MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms", type: "Docs" },
        { title: "Web Security Fundamentals", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/news/user-authentication-with-jwt-and-cookies/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Build a protected login/register system with refresh token rotation.",
        "Implement automated token expiry handling and unauthorized redirection."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Battle-tested auth flow preventing unauthorized access and CSRF exploits.",
      completed: false
    });

    weeks.push({
      id: "w5",
      weekNumber: 5,
      topic: isCloud ? "Container Orchestration & Docker Pipelines" : "Full Stack Integration & Asynchronous Workflows",
      skills: ["Docker / Containers", "WebSockets / Async Workers", "Caching (Redis)"],
      learningObjectives: [
        "Containerize applications with multi-stage Docker builds to reduce image footprint.",
        "Implement background job queues or real-time event subscriptions.",
        "Cache high-frequency read queries to achieve sub-50ms response times."
      ],
      resources: [
        { title: "Docker Docs", provider: "Docker", url: "https://docs.docker.com/get-started/", type: "Docs" },
        { title: "Redis Documentation", provider: "Redis.io", url: "https://redis.io/docs/", type: "Docs" }
      ],
      practicalExercises: [
        "Create Dockerfile and docker-compose files spinning up database, cache, and app services.",
        "Add an asynchronous queue processing email or calculation notifications."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Fully containerized multi-tier stack spinning up in one command.",
      completed: false
    });

    weeks.push({
      id: "w6",
      weekNumber: 6,
      topic: "Cloud Infrastructure, CI/CD & Automated Deployment",
      skills: ["GitHub Actions", "Cloud Deployment (AWS/Vercel/Render)", "Environment Secret Management"],
      learningObjectives: [
        "Configure continuous integration (CI) workflows executing linters, type checks, and tests on pull request.",
        "Automate continuous deployment (CD) pipelines pushing artifacts to cloud environments.",
        "Audit cloud environment variables and secrets using least-privilege policies."
      ],
      resources: [
        { title: "GitHub Actions Guide", provider: "GitHub Docs", url: "https://docs.github.com/en/actions", type: "Docs" },
        { title: "Cloud Deployment Tutorial", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/news/how-to-deploy-web-apps/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Setup automated GitHub Actions pipeline validating builds on every push.",
        "Deploy staging and production environments with SSL certification."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Live production deployment with automated green CI pipeline.",
      completed: false
    });

    weeks.push({
      id: "w7",
      weekNumber: 7,
      topic: "End-to-End Capstone Product Engineering",
      skills: ["System Architecture", "Performance Profiling", "Documentation"],
      learningObjectives: [
        "Engineer a complete flagship project demonstrating your target competencies.",
        "Profile network payloads, Lighthouse metrics, database query plans, and memory consumption.",
        "Conduct peer-style code reviews to refactor code smells and enhance modularity."
      ],
      resources: [
        { title: "System Design Primer", provider: "GitHub", url: "https://github.com/donnemartin/system-design-primer", type: "Docs" },
        { title: "Web Performance Profiling", provider: "web.dev", url: "https://web.dev/fast/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Implement end-to-end feature sets with comprehensive automated testing.",
        "Run Lighthouse and stress tests targeting 90+ performance scores."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Feature-complete capstone product ready for real users and recruiters.",
      completed: false
    });

    weeks.push({
      id: "w8",
      weekNumber: 8,
      topic: "Portfolio Showcase, Tech Interview Mastery & Career Launch",
      skills: ["Technical Storytelling", "Resume Optimization", "Live Coding Interviews"],
      learningObjectives: [
        "Write an engineering case study detailing architecture choices, trade-offs, and measurable impact.",
        "Refactor your GitHub profile with interactive live demo URLs and clean project READMEs.",
        "Master technical behavioral and algorithmic interview problem solving."
      ],
      resources: [
        { title: "Tech Interview Handbook", provider: "Yangshun Tay", url: "https://www.techinterviewhandbook.org/", type: "Docs" },
        { title: "Developer Portfolio Guide", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/", type: "Tutorial" }
      ],
      practicalExercises: [
        "Record a 3-minute video walkthrough or interactive demo of your top project.",
        "Complete 3 simulated 45-minute technical interview challenge sessions."
      ],
      estimatedHours: allocatedHours,
      weeklyMilestone: "Milestone: Complete career readiness package, validated portfolio, and interview confidence.",
      completed: false
    });
  }

  // Adjust resource recommendations according to student's learning preferences
  if (learningPreferences.includes("Video tutorials")) {
    for (const week of weeks) {
      if (!week.resources.some((r) => r.type === "Video")) {
        week.resources.unshift({
          title: `${week.topic} Video Walkthrough`,
          provider: "freeCodeCamp / YouTube",
          url: "https://www.youtube.com/c/Freecodecamp",
          type: "Video"
        });
      }
    }
  }

  return weeks;
}
