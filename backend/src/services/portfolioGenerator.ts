import { PortfolioProjectItem } from "../db/database";

export function generatePortfolioProjects(
  targetCareerTitle: string,
  readinessScore: number
): PortfolioProjectItem[] {
  const norm = targetCareerTitle.toLowerCase();

  if (norm.includes("data scientist") || norm.includes("machine learning")) {
    return [
      {
        id: "proj_ds_1",
        title: "Student Academic Performance & Dropout Risk Predictor",
        description: "An end-to-end predictive machine learning model that analyzes historical academic indicators, demographic factors, and engagement metrics to identify students at risk of falling behind.",
        realWorldProblem: "Educational institutions struggle to deliver timely proactive academic interventions before students fail or drop out due to lack of early risk detection systems.",
        technologies: ["Python", "Pandas", "Scikit-Learn", "FastAPI", "Streamlit"],
        skillsDemonstrated: ["Data Preprocessing & Imputation", "Feature Engineering", "Random Forest Classifier", "Model Evaluation (ROC-AUC)", "API Deployment"],
        difficulty: "Beginner",
        estimatedCompletionTime: "12 - 16 hours",
        implementationPlan: [
          { step: 1, title: "Dataset Acquisition & EDA", details: "Load student academic dataset, analyze missing values, inspect distribution of grades and attendance, and visualize correlations." },
          { step: 2, title: "Feature Engineering & Preprocessing", details: "Apply one-hot encoding on categorical attributes, scale numerical variables with StandardScaler, and balance classes using SMOTE." },
          { step: 3, title: "Model Training & Cross-Validation", details: "Train Baseline Logistic Regression, Decision Tree, and Random Forest models with 5-fold cross-validation." },
          { step: 4, title: "Hyperparameter Optimization", details: "Tune max_depth, n_estimators, and min_samples_split using GridSearchCV; evaluate precision, recall, and F1 score." },
          { step: 5, title: "Interactive Web UI & Deployment", details: "Build a lightweight Streamlit interface where educators input student metrics and receive instant risk percentages and factor explanations." }
        ],
        expectedOutput: "A functional web application that accepts student metrics and returns a calibrated risk score with key contributing features, accompanied by a documented GitHub repository.",
        showcaseTips: [
          "Include a clear confusion matrix and ROC curve in the README to demonstrate trade-offs between precision and recall.",
          "Host a live demo on Streamlit Community Cloud and link directly at the top of your resume.",
          "Write a 1-page case study describing how false negatives vs false positives affect educational intervention costs."
        ]
      },
      {
        id: "proj_ds_2",
        title: "E-Commerce Customer Behavioral Segmentation & Lifetime Value Engine",
        description: "An unsupervised customer segmentation pipeline utilizing RFM (Recency, Frequency, Monetary) analytics and K-Means clustering to discover distinct purchasing personas.",
        realWorldProblem: "Marketing teams waste substantial advertising budgets by broadcasting generic campaigns instead of targeting differentiated customer segments based on real purchasing habits.",
        technologies: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Plotly", "PostgreSQL"],
        skillsDemonstrated: ["RFM Calculation", "K-Means Clustering", "Elbow Method & Silhouette Scoring", "Interactive 3D Visualizations", "SQL Data Extraction"],
        difficulty: "Intermediate",
        estimatedCompletionTime: "18 - 24 hours",
        implementationPlan: [
          { step: 1, title: "Transactional Data Extraction", details: "Extract 50,000+ transaction rows from SQLite/PostgreSQL with SQL queries aggregating spend per customer." },
          { step: 2, title: "RFM Metric Formulation", details: "Calculate Recency days, Frequency count, and Monetary value per unique customer ID." },
          { step: 3, title: "Log Transformations & Outlier Handling", details: "Handle heavy right-skewed revenue distributions using log transformations and standard scaling." },
          { step: 4, title: "Optimal Cluster Identification", details: "Run K-Means across k=2 to k=10, evaluating with Elbow Curve inertia and Silhouette coefficient scores." },
          { step: 5, title: "Persona Profiling & Interactive Dashboard", details: "Label clusters ('VIP Champions', 'At Risk', 'Loyal Bargain Seekers') and construct an interactive Plotly dashboard." }
        ],
        expectedOutput: "An automated clustering pipeline and interactive visual dashboard enabling marketers to inspect customer cohorts and export tailored marketing segments.",
        showcaseTips: [
          "Show interactive Plotly 3D scatter plots showing customer cluster separation.",
          "Add a business recommendation table highlighting specific marketing strategies for each customer segment.",
          "Share code demonstrating modular Python scripts with clean docstrings and type annotations."
        ]
      },
      {
        id: "proj_ds_3",
        title: "Automated Real-Time Financial Fraud Detection Service",
        description: "A production-grade fraud classification pipeline addressing severe class imbalance (0.1% fraud rate) with automated model monitoring, low-latency API serving, and explainable AI.",
        realWorldProblem: "Payment gateways lose billions annually to fraudulent credit card transactions, requiring sub-100ms algorithmic scoring without frustrating legitimate customers with false declines.",
        technologies: ["Python", "XGBoost", "FastAPI", "Docker", "SHAP", "Uvicorn"],
        skillsDemonstrated: ["Severe Class Imbalance Handling", "XGBoost Gradient Boosting", "Explainable AI (SHAP)", "FastAPI Microservice", "Docker Containerization"],
        difficulty: "Advanced",
        estimatedCompletionTime: "25 - 35 hours",
        implementationPlan: [
          { step: 1, title: "Imbalanced Data Pipeline", details: "Ingest credit card transaction dataset, implement PR-AUC evaluation, and apply stratified sampling." },
          { step: 2, title: "Gradient Boosted Tree Architecture", details: "Train and tune XGBoost with scale_pos_weight parameter to heavily penalize missed fraud cases." },
          { step: 3, title: "Explainability with SHAP Values", details: "Integrate TreeSHAP to generate waterfall force plots showing why individual transactions were flagged as suspicious." },
          { step: 4, title: "Asynchronous REST API", details: "Wrap the trained model in FastAPI with Pydantic payload validation and latency profiling under 40ms." },
          { step: 5, title: "Docker Deployment & Documentation", details: "Build a production multi-stage Docker image and write an architecture document explaining deployment steps." }
        ],
        expectedOutput: "A high-performance Dockerized microservice scoring transaction payloads with SHAP explainability justifications in under 50 milliseconds.",
        showcaseTips: [
          "Document benchmark latency curves (P50, P95, P99) under simulated concurrent traffic using Locust or Apache Bench.",
          "Embed a GIF in the GitHub README demonstrating real-time transaction inference and SHAP force plots.",
          "Emphasize the business dollar value saved versus cost of false fraud flags."
        ]
      }
    ];
  }

  if (norm.includes("data analyst")) {
    return [
      {
        id: "proj_da_1",
        title: "Executive SaaS Revenue & Subscription Churn KPI Dashboard",
        description: "A comprehensive business intelligence dashboard tracking Monthly Recurring Revenue (MRR), customer lifetime value, cohort retention, and churn drivers.",
        realWorldProblem: "Executives lack a centralized single source of truth for recurring revenues, making it hard to forecast cash flow and detect churn inflection points.",
        technologies: ["SQL", "Power BI / Tableau", "Excel", "Data Modeling"],
        skillsDemonstrated: ["Data Modeling (Star Schema)", "DAX / Calculated Fields", "Cohort Retention Heatmaps", "Executive Dashboard UX"],
        difficulty: "Beginner",
        estimatedCompletionTime: "10 - 14 hours",
        implementationPlan: [
          { step: 1, title: "Data Model Architecture", details: "Design a Star Schema linking Fact_Subscriptions with Dim_Customers, Dim_Plans, and Dim_Date." },
          { step: 2, title: "SQL Metric Aggregation", details: "Write queries aggregating expansion MRR, contraction MRR, and new MRR across quarterly periods." },
          { step: 3, title: "DAX Measures Formulation", details: "Implement DAX measures for compound monthly growth rate (CMGR) and rolling 12-month customer retention." },
          { step: 4, title: "Interactive Visual Design", details: "Build an executive dashboard with interactive date slicers, dynamic KPI cards, and cohort heatmaps." },
          { step: 5, title: "Executive Summary Presentation", details: "Compile an executive slide deck summarizing key strategic takeaways and churn root causes." }
        ],
        expectedOutput: "A polished interactive Power BI / Tableau dashboard with drill-down capabilities and an accompanying PDF executive briefing.",
        showcaseTips: [
          "Publish interactive web dashboard link and embed high-resolution screenshots in the repository README.",
          "Include a clear explanation of business metrics: MRR, Net Retention Rate (NRR), and CAC Payback Period."
        ]
      },
      {
        id: "proj_da_2",
        title: "Supply Chain & Logistics Operational Efficiency Optimizer",
        description: "An analytical study investigating inventory turnover, delivery delays, and warehouse fulfillment bottlenecks using SQL and Python.",
        realWorldProblem: "Logistics companies face escalating delivery costs and late shipments due to inventory imbalances across regional fulfillment hubs.",
        technologies: ["SQL (PostgreSQL)", "Python (Pandas, Seaborn)", "Excel"],
        skillsDemonstrated: ["Complex SQL Window Functions", "Lead Time Distribution Analysis", "Root Cause Analysis", "Cost-Benefit Modeling"],
        difficulty: "Intermediate",
        estimatedCompletionTime: "15 - 20 hours",
        implementationPlan: [
          { step: 1, title: "Logistics Data Extraction", details: "Join shipments, warehouses, routes, and customer tables using multi-key SQL joins." },
          { step: 2, title: "Delivery Delay Analysis", details: "Calculate median lead times, route variance, and carrier reliability scores using SQL window functions." },
          { step: 3, title: "Python Statistical Auditing", details: "Conduct ANOVA tests to verify if regional warehouse delays are statistically significant." },
          { step: 4, title: "Inventory Reorder Optimization", details: "Model safety stock levels and reorder points to minimize stockouts while cutting holding costs by 15%." },
          { step: 5, title: "Visual Story & Recommendation", details: "Present findings with annotated charts highlighting high-impact route optimizations." }
        ],
        expectedOutput: "A complete reproducible SQL repository, Jupyter notebook analysis, and an operational optimization blueprint.",
        showcaseTips: [
          "Highlight specific business savings (e.g. '$240k projected inventory carrying cost reduction').",
          "Provide clean SQL scripts organized into logical migration and view files."
        ]
      },
      {
        id: "proj_da_3",
        title: "Healthcare Patient Readmission & Clinical Outcomes Explorer",
        description: "A clinical data analytics pipeline examining hospital readmission factors, patient stay lengths, and treatment efficacy.",
        realWorldProblem: "Hospitals receive federal penalties when patient 30-day readmission rates exceed benchmarks, requiring deep multi-variate analysis of clinical protocols.",
        technologies: ["SQL", "Python", "Tableau", "Hypothesis Testing"],
        skillsDemonstrated: ["A/B & Hypothesis Testing", "Risk Factor Scoring", "Healthcare Data Compliance", "Interactive Clinical Visuals"],
        difficulty: "Advanced",
        estimatedCompletionTime: "20 - 28 hours",
        implementationPlan: [
          { step: 1, title: "HIPAA Compliant Data Preparation", details: "Clean anonymized clinical patient records, normalizing diagnostic codes and medication dosages." },
          { step: 2, title: "Comorbidity Correlation Matrix", details: "Analyze correlations between pre-existing conditions and length of hospital stay." },
          { step: 3, title: "Two-Sample T-Tests & Chi-Square Tests", details: "Evaluate whether post-discharge telemedicine checkups significantly reduced 30-day readmission rates." },
          { step: 4, title: "Interactive Physician Dashboard", details: "Create role-based views in Tableau allowing medical chiefs to filter readmission risks by ward." },
          { step: 5, title: "Clinical Policy Recommendation Paper", details: "Synthesize medical insights into an actionable clinical guidelines memo." }
        ],
        expectedOutput: "An analytical dashboard and formal clinical outcomes report outlining statistically validated readmission risk factors.",
        showcaseTips: [
          "Demonstrate understanding of domain-specific data challenges such as missing vitals and observational bias.",
          "Include a video walkthrough walking through dashboard insights like a senior analytics consultant."
        ]
      }
    ];
  }

  // Universal Full Stack & Software Development projects
  return [
    {
      id: "proj_fs_1",
      title: "Full-Stack Task & Sprint Collaboration Engine (Kanban)",
      description: "A dynamic, responsive real-time Kanban project management tool with drag-and-drop task workflows, role permissions, and markdown support.",
      realWorldProblem: "Modern distributed engineering teams require fast, intuitive task boards without sluggish bloated enterprise interfaces.",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "SQLite/PostgreSQL"],
      skillsDemonstrated: ["Responsive UI Component Architecture", "REST API Development", "Drag-and-Drop Interaction", "Relational Database Schema Design", "JWT Auth"],
      difficulty: "Beginner",
      estimatedCompletionTime: "14 - 18 hours",
      implementationPlan: [
        { step: 1, title: "Schema Design & API Specs", details: "Model Users, Boards, Columns, and Tasks with database relations and define RESTful endpoints." },
        { step: 2, title: "Backend Authentication & CRUD", details: "Implement bcrypt password hashing, JWT cookie tokens, and complete CRUD routes for cards." },
        { step: 3, title: "Interactive Kanban UI", details: "Build column lists with HTML5 drag-and-drop or dnd-kit, optimistic state updates, and card editing." },
        { step: 4, title: "Filtering, Search & Activity Log", details: "Add full-text search, priority tag filtering, and automatic audit timestamps on card movements." },
        { step: 5, title: "Testing, Container & Deploy", details: "Write unit tests for state reducers and deploy frontend on Vercel and backend on Render." }
      ],
      expectedOutput: "A fully functional web application with persistent task boards, user authentication, and smooth drag-and-drop state updates.",
      showcaseTips: [
        "Record a 60-second GIF demonstrating instant drag-and-drop card movements and tag filtering.",
        "Highlight optimistic UI updates where cards move immediately while syncing in the background.",
        "Include Swagger/Postman API documentation in the repository."
      ]
    },
    {
      id: "proj_fs_2",
      title: "Real-Time Collaborative Document Workspace & Markdown Editor",
      description: "A cloud markdown editor with real-time WebSocket cursor synchronizing, autosave version history, and one-click PDF export.",
      realWorldProblem: "Engineers and remote writers frequently need lightweight synchronous documentation tools that support code blocks and instant export.",
      technologies: ["TypeScript", "React", "WebSockets / Socket.io", "Node.js", "Redis / SQLite"],
      skillsDemonstrated: ["Real-Time Event Streams", "Conflict Resolution", "Markdown AST Parsing", "Client-Side Caching", "Secure WebSockets"],
      difficulty: "Intermediate",
      estimatedCompletionTime: "20 - 26 hours",
      implementationPlan: [
        { step: 1, title: "WebSocket Server Architecture", details: "Establish Socket.io server handling room creation, client join/leave events, and broadcast buffers." },
        { step: 2, title: "Collaborative Cursor & Typing", details: "Sync active collaborator cursor positions and text insertions across multiple browser windows." },
        { step: 3, title: "Split-Pane Markdown Renderer", details: "Implement live split-screen editor with syntax highlighting, LaTeX math preview, and table formatting." },
        { step: 4, title: "Document History & Revisions", details: "Store snapshot diffs periodically and allow users to roll back changes to prior timestamps." },
        { step: 5, title: "Export Pipeline & Cloud Hosting", details: "Generate clean PDF and HTML downloads on demand and deploy live on cloud infrastructure." }
      ],
      expectedOutput: "A live multi-user editor where two different browser windows can type concurrently with real-time updates and document versioning.",
      showcaseTips: [
        "Include side-by-side screenshots showing two browser windows editing simultaneously.",
        "Explain how race conditions and concurrent edits were handled in your technical writeup.",
        "Demonstrate high performance with minimal re-renders using React profiler metrics."
      ]
    },
    {
      id: "proj_fs_3",
      title: "Enterprise Multi-Tenant SaaS Platform with Stripe Billing & RBAC",
      description: "A production-grade scalable multi-tenant SaaS foundation featuring role-based access control, subscription tiers with Stripe, rate-limiting, and audit logs.",
      realWorldProblem: "Startups spend hundreds of hours re-implementing billing webhooks, tenant isolation, and permissions instead of building core product features.",
      technologies: ["Next.js / React", "TypeScript", "Node.js / Express", "Stripe API", "PostgreSQL", "Docker"],
      skillsDemonstrated: ["Multi-Tenant Architecture", "Stripe Webhook Verification", "Role-Based Access Control (RBAC)", "Rate Limiting & Security", "Automated CI/CD"],
      difficulty: "Advanced",
      estimatedCompletionTime: "28 - 36 hours",
      implementationPlan: [
        { step: 1, title: "Tenant Isolation Schema", details: "Design database schemas enforcing strict tenant_id isolation across all relational tables." },
        { step: 2, title: "RBAC & Invite System", details: "Implement granular permission matrices (Owner, Admin, Member, Guest) and cryptographically signed invite links." },
        { step: 3, title: "Stripe Billing & Webhook Engine", details: "Integrate Stripe Checkout, customer portal, and idempotent webhook listeners for subscription lifecycle." },
        { step: 4, title: "Rate-Limiting & Security Guardrails", details: "Enforce IP and token-based rate limiting using sliding window algorithms and OWASP security headers." },
        { step: 5, title: "Observability, Docker & CI/CD", details: "Configure structured JSON logging, health check endpoints, and automated GitHub Actions testing." }
      ],
      expectedOutput: "A commercial-grade SaaS codebase complete with tenant isolation, live Stripe subscription integration, and security guardrails.",
      showcaseTips: [
        "Highlight your security posture (CSP headers, webhook HMAC verification, and parameterized queries).",
        "Include an architecture diagram detailing tenant routing and event-driven webhook processing.",
        "Provide a 1-command Docker Compose setup for prospective employers to test locally."
      ]
    }
  ];
}
