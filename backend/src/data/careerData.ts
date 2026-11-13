export interface SkillRequirement {
  name: string;
  category: "programming" | "technical" | "tools" | "soft";
  requiredLevel: "Beginner" | "Intermediate" | "Advanced";
  weight: number; // 1 to 10 scale of importance
  whyItMatters: string;
}

export interface CareerRoleData {
  id: string;
  title: string;
  category: string;
  icon: string;
  salaryRange: string;
  demandLevel: "Very High" | "High" | "Moderate";
  shortDescription: string;
  fullDescription: string;
  requiredSkills: SkillRequirement[];
}

export const CAREER_ROLES: CareerRoleData[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    icon: "BrainCircuit",
    salaryRange: "$95,000 - $165,000",
    demandLevel: "Very High",
    shortDescription: "Extract insights, build predictive statistical models, and drive data-informed decisions.",
    fullDescription: "Data Scientists combine statistical analysis, machine learning algorithms, and domain expertise to solve complex business challenges and discover predictive insights from massive unstructured data.",
    requiredSkills: [
      { name: "Python", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Python is the primary lingua franca of modern data science, powering Pandas, NumPy, and Scikit-Learn." },
      { name: "SQL", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Essential for querying enterprise data warehouses, aggregating metrics, and joining complex tables." },
      { name: "Statistics & Probability", category: "technical", requiredLevel: "Intermediate", weight: 9, whyItMatters: "Foundational for hypothesis testing, confidence intervals, A/B testing, and regression analysis." },
      { name: "Machine Learning", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Required to train supervised and unsupervised models for classification, clustering, and prediction." },
      { name: "Data Visualization", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Communicating findings clearly to stakeholders using Matplotlib, Seaborn, or Tableau." },
      { name: "Pandas & NumPy", category: "tools", requiredLevel: "Advanced", weight: 8, whyItMatters: "The core data manipulation and matrix algebra libraries for preprocessing tabular datasets." },
      { name: "Git & Version Control", category: "tools", requiredLevel: "Intermediate", weight: 6, whyItMatters: "Standard workflow for code collaboration, model versioning, and reproducibility." },
      { name: "Problem Solving & Storytelling", category: "soft", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Translating business ambiguities into quantifiable experiments and clear executive narratives." }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & AI",
    icon: "BarChart3",
    salaryRange: "$70,000 - $115,000",
    demandLevel: "Very High",
    shortDescription: "Transform raw data into actionable dashboards, KPIs, and strategic business reports.",
    fullDescription: "Data Analysts inspect, clean, transform, and model data with the goal of discovering useful information, informing conclusions, and supporting organizational decision-making.",
    requiredSkills: [
      { name: "SQL", category: "technical", requiredLevel: "Advanced", weight: 10, whyItMatters: "The single most important skill for extracting and transforming relational business data." },
      { name: "Excel & Spreadsheets", category: "tools", requiredLevel: "Advanced", weight: 8, whyItMatters: "Universal tool for financial modeling, pivot tables, VLOOKUP/XLOOKUP, and rapid reporting." },
      { name: "Power BI / Tableau", category: "tools", requiredLevel: "Intermediate", weight: 9, whyItMatters: "Industry standard for building interactive executive dashboards and KPI trackers." },
      { name: "Python", category: "programming", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Automates repetitive data extraction workflows and cleans messy CSV/API inputs." },
      { name: "Data Cleaning", category: "technical", requiredLevel: "Advanced", weight: 8, whyItMatters: "Over 80% of analyst time is spent detecting anomalies, handling missing values, and formatting." },
      { name: "Critical Thinking", category: "soft", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Connecting vanity metrics with actual operational business drivers." },
      { name: "Communication", category: "soft", requiredLevel: "Advanced", weight: 8, whyItMatters: "Presenting analytical findings to non-technical managers and business stakeholders." }
    ]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "Data & AI",
    icon: "Sparkles",
    salaryRange: "$110,000 - $190,000",
    demandLevel: "Very High",
    shortDescription: "Build generative AI systems, LLM agents, RAG pipelines, and intelligent software.",
    fullDescription: "AI Engineers design, implement, and deploy production-ready artificial intelligence systems, specializing in Large Language Models (LLMs), retrieval-augmented generation (RAG), vector embeddings, and autonomous agentic workflows.",
    requiredSkills: [
      { name: "Python", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Dominates the AI ecosystem, serving as the interface for PyTorch, LangChain, and API SDKs." },
      { name: "Large Language Models & Prompt Engineering", category: "technical", requiredLevel: "Advanced", weight: 10, whyItMatters: "Core knowledge of LLM parameters, few-shot prompting, structured outputs, and context windows." },
      { name: "RAG & Vector Databases", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Building search systems over proprietary documents using ChromaDB, Pinecone, or FAISS." },
      { name: "LangChain / LlamaIndex", category: "tools", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Modern agentic frameworks for orchestrating multi-step AI reasoning and tool-calling." },
      { name: "FastAPI / REST APIs", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Serving AI inference endpoints efficiently with asynchronous Python backends." },
      { name: "Machine Learning Fundamentals", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Understanding loss functions, tokenization, fine-tuning, and model evaluation metrics." },
      { name: "Git & Docker", category: "tools", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Containerizing AI microservices for consistent deployment across GPU/cloud environments." },
      { name: "Ethical AI & Guardrails", category: "soft", requiredLevel: "Intermediate", weight: 6, whyItMatters: "Preventing hallucinations, prompt injections, and biased outputs in user-facing systems." }
    ]
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Data & AI",
    icon: "Cpu",
    salaryRange: "$105,000 - $180,000",
    demandLevel: "Very High",
    shortDescription: "Operationalize machine learning models, build MLOps pipelines, and scale training.",
    fullDescription: "ML Engineers sit between Data Science and Software Engineering, writing high-performance code to train, optimize, deploy, and monitor scalable ML models in production.",
    requiredSkills: [
      { name: "Python", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Standard for building neural networks, data pipelines, and distributed training jobs." },
      { name: "PyTorch / TensorFlow", category: "tools", requiredLevel: "Advanced", weight: 10, whyItMatters: "Deep learning frameworks essential for designing custom architectures and training loops." },
      { name: "MLOps & Model Deployment", category: "technical", requiredLevel: "Intermediate", weight: 9, whyItMatters: "CI/CD for ML using tools like MLflow, Docker, Kubernetes, and model registry servers." },
      { name: "Data Structures & Algorithms", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Optimizing memory usage and computational complexity for large batch pipelines." },
      { name: "SQL & Feature Stores", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Managing feature consistency between offline training and real-time online inference." },
      { name: "Cloud Platforms (AWS/GCP)", category: "tools", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Provisioning GPU clusters (SageMaker, Vertex AI) for distributed training." },
      { name: "Model Evaluation & Monitoring", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Detecting data drift, concept drift, latency degradation, and adversarial attacks." }
    ]
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Development",
    icon: "Layers",
    salaryRange: "$85,000 - $145,000",
    demandLevel: "Very High",
    shortDescription: "Engineer complete client and server web applications end-to-end.",
    fullDescription: "Full Stack Developers master both front-end client interfaces and back-end services, creating seamless, secure, scalable digital products from database to browser.",
    requiredSkills: [
      { name: "JavaScript / TypeScript", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "The universal language spanning client-side React and server-side Node.js." },
      { name: "React.js", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Industry-standard UI library for building dynamic reactive single-page applications." },
      { name: "Node.js & Express", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Backbone of modern full-stack web servers, handling auth, routing, and business logic." },
      { name: "SQL & Relational Databases", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Schema design, migrations, indexing, and querying with PostgreSQL or MySQL." },
      { name: "HTML & CSS / Tailwind", category: "technical", requiredLevel: "Advanced", weight: 8, whyItMatters: "Structuring semantic web pages and styling responsive modern user interfaces." },
      { name: "REST APIs & JSON", category: "technical", requiredLevel: "Advanced", weight: 8, whyItMatters: "Designing clean API contracts, authentication headers, and error handling." },
      { name: "Git & GitHub", category: "tools", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Essential for team collaboration, code reviews, branches, and version history." },
      { name: "Testing & Debugging", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Writing unit tests with Jest/Vitest and tracking client/server exceptions." }
    ]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Software Development",
    icon: "Layout",
    salaryRange: "$80,000 - $135,000",
    demandLevel: "High",
    shortDescription: "Craft responsive, accessible, high-performance web user interfaces.",
    fullDescription: "Frontend Developers bring user interfaces to life, translating designs into interactive, accessible, and blazing-fast web applications.",
    requiredSkills: [
      { name: "JavaScript & TypeScript", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Provides type safety and handles reactive state, events, and async HTTP calls." },
      { name: "React.js", category: "technical", requiredLevel: "Advanced", weight: 10, whyItMatters: "Primary component architecture, state management hooks, and virtual DOM." },
      { name: "HTML5 & Semantic Markup", category: "technical", requiredLevel: "Advanced", weight: 8, whyItMatters: "Ensures web accessibility (WCAG), SEO optimization, and browser compatibility." },
      { name: "CSS3 & Tailwind CSS", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Building responsive mobile-first layouts with Flexbox, Grid, and utility styling." },
      { name: "State Management", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Managing global application state using Zustand, Redux Toolkit, or React Context." },
      { name: "Web Performance & Core Web Vitals", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Optimizing bundle sizes, lazy loading assets, and minimizing layout shifts." },
      { name: "Git & Version Control", category: "tools", requiredLevel: "Intermediate", weight: 6, whyItMatters: "Branching strategies, resolving merge conflicts, and pull request reviews." }
    ]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Development",
    icon: "Server",
    salaryRange: "$88,000 - $150,000",
    demandLevel: "Very High",
    shortDescription: "Design resilient server architectures, high-throughput APIs, and database schemas.",
    fullDescription: "Backend Developers architect server systems, write business logic, build microservices, manage databases, and guarantee data integrity and security under heavy loads.",
    requiredSkills: [
      { name: "Python / Node.js / Java / Go", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Core server programming languages used for microservices and API gateways." },
      { name: "SQL & Database Optimization", category: "technical", requiredLevel: "Advanced", weight: 10, whyItMatters: "Complex queries, transaction isolation, indexing strategies, and normalization." },
      { name: "REST & GraphQL APIs", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Building resilient endpoints, rate-limiting, authentication (JWT/OAuth), and documentation." },
      { name: "System Design & Architecture", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Understanding caching (Redis), load balancing, messaging queues, and scalability." },
      { name: "Docker & Containerization", category: "tools", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Packaging backend applications for consistent cloud execution." },
      { name: "Security & OWASP Top 10", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Preventing SQL injection, CORS exploits, XSS, and unauthorized data breaches." }
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Infrastructure",
    icon: "Terminal",
    salaryRange: "$95,000 - $160,000",
    demandLevel: "Very High",
    shortDescription: "Automate CI/CD pipelines, manage Kubernetes infrastructure, and ensure 99.99% uptime.",
    fullDescription: "DevOps Engineers bridge software development and operations, standardizing automated build pipelines, container orchestration, monitoring, and cloud reliability.",
    requiredSkills: [
      { name: "Linux & Bash Scripting", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "The bedrock operating system for 95%+ of internet servers and container clusters." },
      { name: "Docker & Kubernetes", category: "tools", requiredLevel: "Advanced", weight: 10, whyItMatters: "Industry-standard container creation and production orchestration platforms." },
      { name: "CI/CD Pipelines (GitHub Actions/GitLab)", category: "tools", requiredLevel: "Advanced", weight: 9, whyItMatters: "Automating unit testing, artifact building, linting, and automated cloud deployments." },
      { name: "Infrastructure as Code (Terraform)", category: "tools", requiredLevel: "Intermediate", weight: 9, whyItMatters: "Declarative provisioning of cloud resources, preventing configuration drift." },
      { name: "Cloud Services (AWS / GCP / Azure)", category: "technical", requiredLevel: "Intermediate", weight: 9, whyItMatters: "Managing compute (EC2/EKS), networking (VPC/Route53), and storage buckets (S3)." },
      { name: "Monitoring & Observability (Prometheus/Grafana)", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Tracking server health, alerting on error budgets, and logging system events." }
    ]
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    category: "Infrastructure",
    icon: "Cloud",
    salaryRange: "$92,000 - $155,000",
    demandLevel: "High",
    shortDescription: "Architect, secure, and maintain distributed enterprise cloud infrastructures.",
    fullDescription: "Cloud Engineers build and optimize robust cloud architectures, ensuring high availability, disaster recovery, cost efficiency, and automated failover.",
    requiredSkills: [
      { name: "Cloud Architecture (AWS/Azure/GCP)", category: "technical", requiredLevel: "Advanced", weight: 10, whyItMatters: "Core knowledge of compute, storage, IAM, serverless, and VPC networking." },
      { name: "Linux & Networking Fundamentals", category: "technical", requiredLevel: "Intermediate", weight: 9, whyItMatters: "Understanding DNS, TCP/IP, subnets, VPNs, and firewall security groups." },
      { name: "Terraform / CloudFormation", category: "tools", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Reproducible multi-region infrastructure provisioning." },
      { name: "Python / Bash Scripting", category: "programming", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Automating backup policies, scaling triggers, and IAM compliance audits." },
      { name: "Cloud Security & IAM", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Enforcing principle of least privilege and encryption at rest/in transit." }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security",
    icon: "ShieldAlert",
    salaryRange: "$85,000 - $140,000",
    demandLevel: "Very High",
    shortDescription: "Defend networks, detect vulnerabilities, investigate incidents, and enforce security policies.",
    fullDescription: "Cybersecurity Analysts monitor network traffic, identify potential intrusions, conduct vulnerability assessments, and protect critical organizational assets against cyber threats.",
    requiredSkills: [
      { name: "Network Security & Protocols", category: "technical", requiredLevel: "Advanced", weight: 10, whyItMatters: "Deep understanding of OSI model, packet analysis with Wireshark, firewalls, and IDS/IPS." },
      { name: "Linux & Command Line", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Essential for inspecting server logs, file permissions, and security toolchains." },
      { name: "Vulnerability Assessment & Penetration Testing", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Scanning with Nmap, Nessus, and Burp Suite to identify exploitable attack vectors." },
      { name: "Incident Response & Forensics", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Containment of active threats, root-cause analysis, and security event triage." },
      { name: "Python for Security Automation", category: "programming", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Scripting log parsers, IOC extractors, and automated threat hunting workflows." },
      { name: "Security Compliance & Frameworks (NIST/ISO)", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Aligning security controls with legal standards, HIPAA, GDPR, and SOC2." }
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Design",
    icon: "Palette",
    salaryRange: "$75,000 - $130,000",
    demandLevel: "High",
    shortDescription: "Research user behaviors, craft wireframes, build design systems, and design intuitive UX.",
    fullDescription: "UI/UX Designers conduct user research, establish design systems, create high-fidelity prototypes in Figma, and ensure digital software is delightful, intuitive, and accessible.",
    requiredSkills: [
      { name: "Figma & Prototyping", category: "tools", requiredLevel: "Advanced", weight: 10, whyItMatters: "The industry standard tool for vector UI design, auto-layout, components, and animations." },
      { name: "User Research & Usability Testing", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Interviewing real users, synthesizing journey maps, and running unmoderated tests." },
      { name: "Design Systems & Component Architecture", category: "technical", requiredLevel: "Advanced", weight: 8, whyItMatters: "Creating scalable color palettes, typography tokens, and reusable UI libraries." },
      { name: "Wireframing & Information Architecture", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Organizing complex application screens into intuitive user task flows." },
      { name: "HTML/CSS Basics", category: "technical", requiredLevel: "Beginner", weight: 6, whyItMatters: "Helps design realistic layouts and communicate technical constraints to engineers." },
      { name: "Empathy & Communication", category: "soft", requiredLevel: "Advanced", weight: 9, whyItMatters: "Advocating for user needs while balancing technical feasibility and business goals." }
    ]
  },
  {
    id: "software-developer",
    title: "Software Developer",
    category: "Software Development",
    icon: "Code2",
    salaryRange: "$82,000 - $140,000",
    demandLevel: "Very High",
    shortDescription: "Write clean, testable code, solve algorithmic challenges, and engineer reliable software.",
    fullDescription: "Software Developers build, test, and maintain robust applications across various platforms, applying solid computer science principles, design patterns, and efficient algorithms.",
    requiredSkills: [
      { name: "Core Programming (Java / Python / C++ / C#)", category: "programming", requiredLevel: "Advanced", weight: 10, whyItMatters: "Strong command of OOP, memory management, syntax, and standard libraries." },
      { name: "Data Structures & Algorithms", category: "technical", requiredLevel: "Advanced", weight: 9, whyItMatters: "Crucial for writing optimal code (Big-O time/space complexity) and passing interviews." },
      { name: "Git & Version Control", category: "tools", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Collaborating via PRs, branching models, and clean commit hygiene." },
      { name: "Object-Oriented Design & Clean Code", category: "technical", requiredLevel: "Intermediate", weight: 8, whyItMatters: "Applying SOLID principles, design patterns, and writing self-documenting code." },
      { name: "Unit Testing & Test-Driven Development", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Writing automated test suites that prevent regressions in production." },
      { name: "Relational Databases & SQL", category: "technical", requiredLevel: "Intermediate", weight: 7, whyItMatters: "Storing, indexing, and retrieving persistent application data." }
    ]
  }
];

export const ALL_SKILLS_CATALOG = [
  // Programming
  { name: "Python", category: "programming" },
  { name: "JavaScript", category: "programming" },
  { name: "TypeScript", category: "programming" },
  { name: "C Programming", category: "programming" },
  { name: "C++", category: "programming" },
  { name: "Java", category: "programming" },
  { name: "C#", category: "programming" },
  { name: "Go (Golang)", category: "programming" },
  { name: "Rust", category: "programming" },
  { name: "Bash / Shell Scripting", category: "programming" },
  { name: "PHP", category: "programming" },
  { name: "Ruby", category: "programming" },
  
  // Technical
  { name: "SQL", category: "technical" },
  { name: "HTML & CSS", category: "technical" },
  { name: "Tailwind CSS", category: "technical" },
  { name: "React.js", category: "technical" },
  { name: "Node.js & Express", category: "technical" },
  { name: "REST APIs", category: "technical" },
  { name: "Data Structures & Algorithms", category: "technical" },
  { name: "Machine Learning", category: "technical" },
  { name: "Deep Learning (PyTorch/TensorFlow)", category: "technical" },
  { name: "Large Language Models & Prompt Engineering", category: "technical" },
  { name: "RAG & Vector Databases", category: "technical" },
  { name: "Statistics & Probability", category: "technical" },
  { name: "Data Visualization", category: "technical" },
  { name: "System Design", category: "technical" },
  { name: "Network Security & Protocols", category: "technical" },
  { name: "Cloud Architecture (AWS/GCP/Azure)", category: "technical" },
  { name: "Database Design & Optimization", category: "technical" },
  { name: "User Research & Usability Testing", category: "technical" },
  { name: "Wireframing & UI Architecture", category: "technical" },
  
  // Tools
  { name: "Git & GitHub", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "tools" },
  { name: "Linux / Ubuntu", category: "tools" },
  { name: "PostgreSQL", category: "tools" },
  { name: "MongoDB", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Power BI / Tableau", category: "tools" },
  { name: "Excel & Advanced Spreadsheets", category: "tools" },
  { name: "Pandas & NumPy", category: "tools" },
  { name: "CI/CD (GitHub Actions)", category: "tools" },
  { name: "Postman", category: "tools" },
  { name: "Jira", category: "tools" },
  { name: "Terraform", category: "tools" },
  
  // Soft Skills
  { name: "Problem Solving", category: "soft" },
  { name: "Communication", category: "soft" },
  { name: "Critical Thinking", category: "soft" },
  { name: "Team Collaboration", category: "soft" },
  { name: "Time Management", category: "soft" },
  { name: "Adaptability", category: "soft" },
  { name: "Technical Presentation", category: "soft" }
];
