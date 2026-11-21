// Single source of truth for all site copy.
// Sources: LinkedIn profile (docs/LINKEDIN_PROFILE.md, 2026-11-21), CV "PASCAL. A. TAMEKLOE CyberSEC" (Nov 2026),
// pascalmyprofile.netlify.app, owner brief. LinkedIn wins on dates/titles; ParoCyber comes from the owner brief.

export const site = {
  name: "Pascal A. Tamekloe",
  fullName: "Pascal Amoudzi Tamekloe",
  initials: "PAT",
  url: "https://pascaltamekloe.netlify.app",
  location: "Accra, Ghana",
  email: "pascalhugues0104@gmail.com",
  roles: [
    "Cybersecurity Consultant",
    "Application Security Pen Tester",
    "AI-Augmented Security Engineer",
    "Co-Founder @ ParoCyber",
  ],
  tagline:
    "I break applications before attackers do, then help teams build them back stronger. AI-augmented security testing, auditing and training out of Accra.",
  description:
    "Pascal A. Tamekloe: Co-Founder, Lead Cybersecurity Consultant and Instructor at ParoCyber. Application security, API pen testing, security auditing and AI-augmented security workflows.",
  social: {
    linkedin: "https://www.linkedin.com/in/pascal-a-tamekloe",
    github: "https://github.com/pascaleli",
    parocyber: "https://parocyber.com",
  },
};

export const stats = [
  { value: "6+", label: "Years in quality & security" },
  { value: "100+", label: "Critical scenarios automated" },
  { value: "3", label: "Continents per weekly release" },
  { value: "5", label: "Security & data certifications" },
];

export const about = {
  paragraphs: [
    "I'm a cybersecurity consultant who started in software quality engineering. That background changed how I see security: I don't just find vulnerabilities, I understand how they slip through the build, test and release cycle, and I fix the process that let them in.",
    "Since January 2024 I've been Co-Founder, Lead Cybersecurity Consultant and Instructor at ParoCyber. I lead application security audits, run API and web pen tests with Burp Suite, manage SIEM tooling like Splunk, and train the next wave of security practitioners in Ghana.",
    "Alongside that, I'm a Senior Software Quality Engineer at Purple Wave, where I own quality standards for the Accounting & Finance and CRM units, run API security testing with Burp Suite against the OWASP Top 10, and ship weekly releases with teams across the US, India and Ghana. I'm working toward CISSP, and I build with AI every day to move faster without cutting corners.",
  ],
  facts: [
    { k: "Based in", v: "Accra, Ghana" },
    { k: "Focus", v: "AppSec · API Pen Testing · Audit" },
    { k: "Currently", v: "ParoCyber · Purple Wave" },
    { k: "Languages", v: "English & French (fluent)" },
  ],
};

export const aiWorkflow = {
  lede:
    "AI doesn't replace the tester. It removes the drag. I run Claude and Claude Code as a disciplined security team: agents scope, analyse and draft, and I verify every finding before it reaches a client.",
  pipeline: [
    {
      id: "recon",
      step: "01",
      title: "Recon & Scoping",
      agent: "researcher agent",
      text: "Claude maps the attack surface from API specs, routes and docs, then proposes a test plan against OWASP Top 10 and API Top 10.",
      output: "attack-surface.md",
    },
    {
      id: "analyse",
      step: "02",
      title: "Code & Config Review",
      agent: "reviewer agent",
      text: "Claude Code reads the codebase for auth flaws, injection sinks, BOLA/BFLA paths, insecure JWT handling and leaked secrets.",
      output: "findings.json",
    },
    {
      id: "validate",
      step: "03",
      title: "Exploit Validation",
      agent: "human in the loop",
      text: "I confirm each candidate by hand in Burp Suite. If it doesn't reproduce, it doesn't ship. No AI-hallucinated vulns in a report.",
      output: "poc/",
    },
    {
      id: "report",
      step: "04",
      title: "Report & Remediate",
      agent: "writer agent",
      text: "Agents draft CVSS-scored write-ups and fix suggestions; I edit for accuracy, then pair with developers on the patch.",
      output: "report.pdf",
    },
    {
      id: "regress",
      step: "05",
      title: "Regression Guardrails",
      agent: "automation agent",
      text: "Each fixed vuln becomes an automated Playwright or API test in CI, so it never quietly comes back.",
      output: "security.spec.ts",
    },
  ],
  terminal: [
    { type: "cmd", text: "claude \"audit /api/v2 for broken object level auth\"" },
    { type: "out", text: "› scanning 48 routes, 12 controllers…" },
    { type: "warn", text: "⚠ GET /accounts/{id} lacks ownership check (BOLA candidate)" },
    { type: "warn", text: "⚠ JWT accepted with alg=none in legacy middleware" },
    { type: "out", text: "› drafted 2 findings → findings.json" },
    { type: "cmd", text: "burp: replay /accounts/1042 as user_b" },
    { type: "ok", text: "✔ confirmed: 200 OK, foreign account data returned" },
    { type: "ok", text: "✔ regression test added: bola.spec.ts" },
  ],
  principles: [
    {
      title: "Human verification, always",
      text: "Every AI-surfaced finding is reproduced manually before it is reported. Speed is useless without accuracy.",
    },
    {
      title: "Least-privilege agents",
      text: "Agents run with scoped permissions, sandboxed tools and no production credentials. I secure my own AI stack the way I'd audit a client's.",
    },
    {
      title: "Automate the repeatable",
      text: "Recon, triage, boilerplate tests and report drafts are automated so my hours go to the creative work of breaking things.",
    },
  ],
  tools: ["Claude", "Claude Code", "Subagents", "MCP", "Burp Suite", "Playwright", "GitHub Actions"],
};

export type Project = {
  title: string;
  category: "AI Security" | "AppSec" | "Infrastructure" | "Automation";
  summary: string;
  bullets: string[];
  tags: string[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    title: "Agentic AI Security Assessments",
    category: "AI Security",
    summary:
      "Security reviews of LLM-powered apps and AI agents, focused on what happens when a model can call tools.",
    bullets: [
      "Prompt-injection and indirect-injection testing through documents, web content and tool output",
      "Tool-permission and data-exfiltration review against the OWASP Top 10 for LLM Applications",
      "Guardrail recommendations: least-privilege tools, human approval gates, output validation",
    ],
    tags: ["OWASP LLM Top 10", "Prompt Injection", "Claude", "Threat Modeling"],
  },
  {
    title: "ParoCyberBank: AppSec Training Lab",
    category: "AppSec",
    summary:
      "A deliberately vulnerable online banking app with web UI and REST API, built to teach application security hands-on at ParoCyber.",
    bullets: [
      "Realistic flows: accounts, transfers, payees and a JSON API for Postman, curl and Burp Suite",
      "Seeded SQLi, broken access control and auth flaws for students to discover",
      "Runs on Kali in minutes; used in live classroom sessions",
    ],
    tags: ["Python", "Flask", "SQLite", "Burp Suite", "OWASP Top 10"],
  },
  {
    title: "Infrastructure & CI/CD Hardening",
    category: "Infrastructure",
    summary:
      "Hardening engagements that close the gaps between code, containers and the pipeline that ships them.",
    bullets: [
      "Vulnerability scanning with Nessus and OpenVAS, prioritised by real exploitability",
      "Docker image and CI/CD pipeline review: secrets, permissions, supply chain",
      "Zero Trust and security-by-design recommendations with Splunk-based monitoring",
    ],
    tags: ["Nessus", "OpenVAS", "Docker", "CI/CD", "Splunk", "Zero Trust"],
  },
  {
    title: "Python Network Intrusion Detection System",
    category: "Infrastructure",
    summary:
      "A Python IDS that captures live traffic, flags suspicious patterns and logs attacks for investigation.",
    bullets: [
      "Packet capture and analysis pipeline with structured attack logging",
      "Detects common scanning and flooding behaviour",
      "Built as a teaching tool for network defence fundamentals",
    ],
    tags: ["Python", "Scapy", "Network Security", "Detection"],
  },
  {
    title: "API Security & E2E Test Platform",
    category: "Automation",
    summary:
      "A centralised Playwright platform for finance software covering functional, API and security test cases across environments.",
    bullets: [
      "Authentication and authorization test suites against OWASP Top 10",
      "Cross-browser E2E automation with Xray reporting in Jira",
      "Smoke, regression and API suites wired into CI",
    ],
    tags: ["Playwright", "TypeScript", "API Security", "Jira Xray"],
  },
  {
    title: "Backend API Automation Framework",
    category: "Automation",
    summary:
      "A Java REST testing framework with suites for authentication and resource controllers, built for CI from day one.",
    bullets: [
      "JUnit 5 suites with shared TestBase for status, content-type and schema checks",
      "Allure reporting; Jenkins pipelines using Docker agents",
      "Config-driven endpoints and test data",
    ],
    tags: ["Java", "REST Assured", "JUnit 5", "Allure", "Jenkins", "Docker"],
    link: { label: "GitHub", href: "https://github.com/pascaleli?tab=repositories" },
  },
];

export const skills = [
  {
    domain: "Offensive Security",
    items: ["Burp Suite", "OWASP ZAP", "Metasploit", "Kali Linux", "Fuzzing", "API Pen Testing", "BOLA / BFLA", "JWT & OAuth 2.0", "Insomnia"],
  },
  {
    domain: "Defense & Audit",
    items: ["Splunk (SIEM)", "Nessus", "OpenVAS", "Threat Investigation", "Security Auditing", "Zero Trust", "Policy & Procedure", "Risk Assessment", "Incident Response", "Encryption & Cryptography"],
  },
  {
    domain: "AI-Assisted Engineering",
    items: ["Claude", "Claude Code", "Agentic Workflows", "MCP", "Prompt Injection Testing", "LLM Threat Modeling"],
  },
  {
    domain: "Quality & Automation",
    items: ["Playwright", "Cypress", "Selenium", "JUnit", "Postman", "Swagger", "Jira / Xray", "TestRail", "BDD / Gherkin", "Database Testing"],
  },
  {
    domain: "Cloud & DevOps",
    items: ["Docker", "Jenkins", "CI/CD Security", "GitHub Actions", "BigQuery", "Airflow / ETL"],
  },
  {
    domain: "Development",
    items: ["TypeScript", "Java", "Spring Security", "Python", "Node.js", "SQL / MySQL", "PHP / Laravel"],
  },
];

export const certifications = [
  { name: "CISSP", issuer: "ISC2", status: "In progress" },
  { name: "Security+ ce", issuer: "CompTIA", status: "Nov 2024" },
  { name: "Certified in Cybersecurity (CC)", issuer: "ISC2", status: "Nov 2024" },
  { name: "Cybersecurity Specialization", issuer: "Google", status: "Oct 2024" },
  { name: "Data Engineering", issuer: "LinkedIn", status: "Jan 2023" },
  { name: "Cyber & IT Security", issuer: "EXIN", status: "Feb 2020" },
];

export type Job = {
  role: string;
  org: string;
  period: string;
  location: string;
  current?: boolean;
  /** Earlier titles at the same org, newest first */
  progression?: { title: string; period: string }[];
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Co-Founder, Lead Cybersecurity Consultant & Instructor",
    org: "ParoCyber",
    period: "Jan 2024 – Present",
    location: "Accra, Ghana",
    current: true,
    points: [
      "Lead security auditing initiatives across client applications, identifying security gaps and compliance risks",
      "Work closely with developers to remediate vulnerabilities and improve application security",
      "Fuzzing and testing with Burp Suite; discovered multiple bugs and ran in-depth security analyses",
      "Execute automated and manual security testing methodologies",
      "Manage SIEM tooling such as Splunk",
      "Lead instructor: grew the student base through hands-on AppSec and OWASP training",
    ],
  },
  {
    role: "Senior Software Quality Engineer, Automation & API / Security Test",
    org: "Purple Wave Auction",
    period: "Apr 2025 – Present",
    location: "Accra, Ghana · Hybrid",
    current: true,
    progression: [
      { title: "Senior Software Quality Engineer (Automation Eng & API / Security Test)", period: "May 2026 – Present" },
      { title: "Software QA Engineer, Automation Eng (Finance & Accounting Systems)", period: "Apr 2025 – Sep 2026" },
    ],
    points: [
      "Own QA operations and SOPs across two business units, Accounting & Finance and CRM, to de-risk sensitive financial products",
      "API and service-level security testing against the OWASP Top 10 with Burp Suite, Postman and Insomnia",
      "Deep authentication and authorization testing to block unauthorized access and privilege escalation on financial data",
      "Scale enterprise Playwright frameworks, automating 100+ critical test scenarios with the team",
      "Integrate AI-driven testing to accelerate pipelines and generate high-quality tests",
      "Coordinate weekly global releases with distributed teams across the US, India and Ghana",
      "Validate security patches and core system upgrades; mentor teams through talks on testing, automation and AppSec",
    ],
  },
  {
    role: "QA Engineer",
    org: "DevOps Africa Limited",
    period: "Mar 2025 – Present",
    location: "On-site",
    current: true,
    points: ["Software quality engineering and test automation"],
  },
  {
    role: "QA Engineer II, Lead Automation Engineer",
    org: "Viamo",
    period: "Oct 2020 – Jul 2025",
    location: "Accra, Ghana · Hybrid",
    progression: [
      { title: "QA Engineer II, Lead Automation Engineer", period: "Jul 2024 – Jul 2025" },
      { title: "QA Engineer", period: "Apr 2022 – Nov 2024" },
      { title: "QA Associate", period: "Oct 2020 – Mar 2022" },
    ],
    points: [
      "Led quality engineering for a cross-functional crew across multiple large-scale ICT4D projects",
      "Designed and built automation frameworks and contributed to CI/CD workflow design",
      "Ran security tests across multiple apps; API and integration testing with platforms like Meta and Turn.io",
      "Automation in Python/Selenium and Cypress across mobile, web and call-center applications",
      "Data quality validation across pipelines and ML models, with extensive BigQuery and ETL work",
      "Coordinated release engineering for reliable, low-downtime deployments",
    ],
  },
  {
    role: "Software Developer",
    org: "Sedla Company Limited",
    period: "Mar 2020 – Nov 2020",
    location: "Accra, Ghana · Hybrid",
    points: [
      "Developed and deployed the company web app (PHP, Laravel) for an agribusiness platform linking Ghana and US agric transactions",
      "Coordinated IT decisions with the team",
    ],
  },
  {
    role: "Faculty Assistant & IT Support",
    org: "University of Professional Studies, Accra",
    period: "Aug 2019 – Sep 2020",
    location: "Accra, Ghana",
    points: ["Managed course allocation and supported lecturers and students across the department", "Office management and IT support"],
  },
  {
    role: "Network Technician",
    org: "Microchip Technology",
    period: "May 2017 – Aug 2017",
    location: "Accra, Ghana",
    points: ["Set up network topologies, cable termination and router troubleshooting"],
  },
];

export const education = [
  { degree: "MSc Computer Science", school: "University of Ghana", year: "2022 – 2024" },
  { degree: "BSc Information Technology", school: "University of Cape Coast", year: "2015 – 2019" },
];

export const testimonials = [
  {
    quote:
      "Pascal is a highly skilled and valuable QA Engineer. During our time working together at Viamo, I was consistently impressed by his dedication to quality. He possesses a remarkable ability to thoroughly test my tickets, uncovering bugs that would have otherwise slipped through. His bug reports are always clear, detailed, and easy to understand.",
    name: "Alex Safian",
    title: "Senior Software Engineer",
    context: "Worked together at Viamo",
  },
  {
    quote:
      "A truly outstanding individual who has consistently demonstrated a remarkable array of skills. Pascal is a well-rounded professional who excels in numerous areas, making him an invaluable asset to any team. In a fast-paced work environment, he consistently maintains a high level of order and structure, ensuring that tasks are executed efficiently and with precision.",
    name: "Oumar Diallo",
    title: "Software Quality & Automation Engineer",
    context: "Managed Pascal directly",
  },
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#ai", label: "AI Workflow" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
