export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningSection {
  id: string;
  title: string;
  content: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  callout?: {
    type: "note" | "tip" | "warning" | "formula";
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LearningArticle {
  slug: string;
  title: string;
  subtitle: string;
  moduleId: string;
  moduleTitle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  lastUpdated: string;
  diagramType: "feedback-loop" | "severity-ladder" | "shadowing-map" | "workaround-teardown" | "tam-funnel" | "pain-formula" | "wtp-ladder" | "nosql-schema" | "rbac-flow" | "bundle-pipeline";
  keyTakeaways: string[];
  sections: LearningSection[];
  quiz: QuizQuestion;
  relatedCategory: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  iconName: string;
  articles: string[]; // slugs
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "problem-discovery",
    title: "1. Problem Discovery & Validation",
    description: "Systematic frameworks to extract, verify, and validate acute industry bottlenecks.",
    iconName: "Compass",
    articles: [
      "the-problem-first-mindset",
      "5-levels-problem-severity",
      "operator-shadowing-protocol",
      "incumbent-workaround-teardown",
    ],
  },
  {
    id: "market-sizing",
    title: "2. Market Sizing & Quantitative Economics",
    description: "Mathematical models for bottom-up TAM, algorithmic pain scoring, and willingness-to-pay.",
    iconName: "BarChart3",
    articles: [
      "bottom-up-tam-formula",
      "pain-score-algorithm",
      "willingness-to-pay-experiments",
    ],
  },
  {
    id: "full-stack-architecture",
    title: "3. Scalable Full-Stack Engineering",
    description: "Modern cloud patterns: cost-effective NoSQL querying, hardened RBAC, and zero-downtime SPAs.",
    iconName: "Cpu",
    articles: [
      "nosql-firestore-modeling-for-startups",
      "securing-serverless-apps-rbac",
      "production-performance-code-splitting",
    ],
  },
];

export const LEARNING_ARTICLES: Record<string, LearningArticle> = {
  "the-problem-first-mindset": {
    slug: "the-problem-first-mindset",
    title: "The Problem-First vs. Idea-First Paradigm",
    subtitle: "Why 42% of startups fail from 'No Market Need' and how to invert the venture development cycle.",
    moduleId: "problem-discovery",
    moduleTitle: "1. Problem Discovery & Validation",
    difficulty: "Beginner",
    readTime: "6 min read",
    lastUpdated: "November 2026",
    diagramType: "feedback-loop",
    relatedCategory: "SaaS & Enterprise",
    keyTakeaways: [
      "Idea-first builders start with technology and hunt for a customer; problem-first builders start with acute customer friction.",
      "The number one autopsy reason for startup collapse is building software nobody actually needs (CB Insights 42%).",
      "A great problem statement defines the victim, the frequency of loss, the failed workaround, and the economic consequence.",
    ],
    sections: [
      {
        id: "the-fatal-trap",
        title: "The Fatal Trap: Solution in Search of a Problem",
        content: [
          "Most startup ideas begin with excitement over a novel mechanism: 'What if we built an AI copilot for doctors?' or 'What if we used smart contracts for real estate escrows?'. This is the solution-first trap.",
          "When you begin with a solution, every interview with a prospective customer turns into a sales pitch. Founders ask leading questions like 'Wouldn't it be cool if an AI did your notes?' to which polite practitioners naturally reply 'Sure!'.",
          "This generates false validation. True validation occurs when you discover an existing, painful, budget-bleeding problem that the practitioner is already desperately hacking together a solution for.",
        ],
        callout: {
          type: "warning",
          title: "The Polite Interview Bias",
          text: "Never ask potential users what they think of your idea. Instead, ask them about the last time they performed the task, how much time it took, what broke, and what they paid to patch the issue.",
        },
      },
      {
        id: "anatomy-of-problem",
        title: "Anatomy of an Empirical Problem Statement",
        content: [
          "A verified problem statement is not an idea or a wishlist. It is a precise documentation of systemic economic or operational drag.",
          "To be listed in the Stuckhere registry, a problem statement must articulate four empirical dimensions:",
        ],
        table: {
          headers: ["Dimension", "Weak Formulation (Vague)", "Strong Formulation (Empirical)"],
          rows: [
            ["Who Suffers", "Clinics and doctors", "Rural clinic billing coordinators managing Medicare Part B claims"],
            ["Recurrence", "Sometimes paperwork gets delayed", "Occurs on 35% of all bi-weekly claim batches submitted"],
            ["Current Patch", "They use spreadsheets and calls", "Staff manually cross-references faxed PDFs against 2018 Excel fee tables"],
            ["Quantified Loss", "It takes a lot of time", "14 technician hours lost weekly; $38,000 average annual write-offs"],
          ],
        },
      },
      {
        id: "the-inversion-method",
        title: "The Inversion Method: Working Backwards From Friction",
        content: [
          "Instead of brainstorming startup ideas in an incubator, problem-first founders begin with an audit of broken enterprise workflows.",
          "Look for symptoms of acute friction: manual copy-pasting between disconnected software suites, complex conditional formatting in spreadsheets, or temp agency budgets hired solely for data entry.",
          "Once you confirm the friction is recurrent and costly, developing the software architecture becomes straightforward because the specification is written by the customer's pain.",
        ],
        callout: {
          type: "tip",
          title: "Rule of Thumb",
          text: "If a company has a dedicated full-time employee whose entire job is moving data from System A to System B in Excel, you have found an enterprise software opportunity.",
        },
      },
    ],
    quiz: {
      question: "Which of the following is the strongest indicator of genuine market demand for a new software product?",
      options: [
        "A user in an interview says 'That sounds like an amazing idea, I would definitely use that!'",
        "The prospective customer is already spending $2,000/month on junior staff to manually stitch spreadsheets together",
        "The industry has a projected CAGR of 18.5% over the next decade according to an analyst report",
        "A competitor in the space just raised a $10M Series A round",
      ],
      correctIndex: 1,
      explanation: "Active expenditure of money and labor on an ugly workaround is the single most reliable indicator of real willingness-to-pay and acute problem severity.",
    },
  },

  "5-levels-problem-severity": {
    slug: "5-levels-problem-severity",
    title: "The 5 Levels of Problem Severity",
    subtitle: "Classifying problem severity from cosmetic nuisance to existential enterprise outages.",
    moduleId: "problem-discovery",
    moduleTitle: "1. Problem Discovery & Validation",
    difficulty: "Beginner",
    readTime: "7 min read",
    lastUpdated: "November 2026",
    diagramType: "severity-ladder",
    relatedCategory: "Venture Architecture",
    keyTakeaways: [
      "Level 1 (Nuisance) problems suffer from high churn and near-zero pricing power.",
      "Level 3 (Compliance) and Level 4 (Direct Revenue Leak) represent the sweet spot for rapid B2B SaaS adoption.",
      "Level 5 (Fatal Outages) commands inelastic enterprise budgets and board-level procurement speed.",
    ],
    sections: [
      {
        id: "the-hierarchy",
        title: "The Problem Severity Hierarchy",
        content: [
          "In enterprise software and B2B services, willingness-to-pay is directly proportional to the severity level of the problem.",
          "When founders struggle with slow sales cycles (6–12 months) or high customer churn (>3% monthly), the root cause is almost always that they are solving a Level 1 or Level 2 problem.",
          "Let's break down the 5 levels of severity and their economic dynamics:",
        ],
        table: {
          headers: ["Level", "Category", "Operational Impact", "Willingness to Pay (WTP)", "Procurement Velocity"],
          rows: [
            ["Level 1", "Cosmetic Nuisance", "Subjective annoyance, visual clutter", "Near Zero / Free tier only", "Slow (>6 months) or never"],
            ["Level 2", "Workflow Drag", "1–3 hours lost per week on repetitive tasks", "Low ($10–$50/user/mo)", "Moderate (Departmental)"],
            ["Level 3", "Compliance & Audit", "Statutory fines, audit failures, legal liability", "High ($10k–$50k/yr)", "Fast (Risk/Legal driven)"],
            ["Level 4", "Direct Revenue Leak", "Abandoned transactions, unbilled deliverables", "Very High (10–30% of recovered cash)", "Immediate (ROI under 30 days)"],
            ["Level 5", "Fatal Outage / Loss", "Production line halt, clinical catastrophe, breach", "Inelastic ($100k+ / Board Level)", "Instantaneous emergency spend"],
          ],
        },
      },
      {
        id: "diagnosing-level",
        title: "How to Diagnose Problem Level During Customer Discovery",
        content: [
          "To identify which level a problem belongs to, ask the customer: 'What happens if you do not solve this problem for the next 12 months?'",
          "If the answer is 'Well, it would be annoying, but our team would manage', it is a Level 1 or 2. If the answer is 'We would be fined $500,000 by the EPA' or 'We would lose our ISO-27001 certification', you are at Level 3 or higher.",
        ],
        callout: {
          type: "formula",
          title: "The Budget Inelasticity Rule",
          text: "When Problem Severity ≥ Level 3, the buyer does not compare your price to software alternatives; they compare your price to the cost of catastrophic failure.",
        },
      },
    ],
    quiz: {
      question: "A hospital clinic administrator states: 'If our cold-chain monitors fail, an entire batch of $120,000 oncology biologics spoils within 4 hours.' What problem level is this?",
      options: [
        "Level 1: Cosmetic Nuisance",
        "Level 2: Workflow Drag",
        "Level 4: Direct Revenue Leak / Spoilage",
        "Level 5: Existential Clinical & Asset Loss",
      ],
      correctIndex: 3,
      explanation: "Direct spoilage of life-saving biologics carries both clinical peril and catastrophic asset loss ($120k in hours), categorizing it as Level 5 Surgery.",
    },
  },

  "operator-shadowing-protocol": {
    slug: "operator-shadowing-protocol",
    title: "The Operator Shadowing Protocol",
    subtitle: "A step-by-step diagnostic technique to uncover silent manual workarounds and workflow debt.",
    moduleId: "problem-discovery",
    moduleTitle: "1. Problem Discovery & Validation",
    difficulty: "Intermediate",
    readTime: "8 min read",
    lastUpdated: "November 2026",
    diagramType: "shadowing-map",
    relatedCategory: "Customer Discovery",
    keyTakeaways: [
      "Operators develop unconscious muscle memory for broken software and rarely mention their workarounds in boardroom meetings.",
      "Look for physical cues: sticky notes, printed spreadsheets, dual-screen copy-pasting, and desktop bookmark bars.",
      "Always document the 'Exception Path' — the 15% of transactions that cause 80% of manual delay.",
    ],
    sections: [
      {
        id: "why-shadowing",
        title: "Why Traditional Interviews Fail",
        content: [
          "When you ask an operations manager 'How does your inventory intake work?', they will recite the official company SOP (Standard Operating Procedure).",
          "They will say: 'A shipment arrives, the clerk scans the barcode in SAP, and the ledger updates automatically.'",
          "When you physically sit next to the clerk in the warehouse for 2 hours, you observe the reality: 40% of vendor barcodes fail to scan, forcing the clerk to write tracking codes on a legal pad, type them into Google Sheets, and email the file to a supervisor at 5:00 PM for manual reconciliation.",
          "The official SOP is what executives think happens. The legal pad and the spreadsheet is where your startup lives.",
        ],
      },
      {
        id: "shadowing-checklist",
        title: "The 5 Physical Artifacts to Look For",
        content: [
          "During an operator shadowing session, keep your notebook open and track the following high-signal friction artifacts:",
        ],
        table: {
          headers: ["Friction Artifact", "What It Signifies", "Startup Opportunity"],
          rows: [
            ["Sticky Notes on Monitors", "Forgotten codes, passwords, or mapping rules", "Automated validation / metadata lookup"],
            ["Printed Paper Routing Slips", "Breakdown in digital handoffs between departments", "Unified status workflow engine"],
            ["Side-by-Side Dual Browsers", "Manual data re-entry between legacy tools", "Bi-directional API middleware"],
            ["Color-Coded Excel Columns", "Unstructured triage or priority queue management", "Intelligent dispatch or task routing"],
            ["End-of-Day Email Reports", "Lack of real-time visibility for leadership", "Automated executive telemetry dashboard"],
          ],
        },
      },
    ],
    quiz: {
      question: "Why is observing the 'Exception Path' in an operational workflow crucial for problem validation?",
      options: [
        "Because exception paths never occur in real enterprise operations",
        "Because standard paths are already automated by legacy tools, while exceptions cause 80% of labor waste and error risk",
        "Because exception paths reduce customer acquisition costs",
        "Because exception paths require zero compliance review",
      ],
      correctIndex: 1,
      explanation: "Standard paths are usually solved by incumbent ERPs; the edge cases and broken exceptions are where manual labor, delays, and huge economic losses accumulate.",
    },
  },

  "incumbent-workaround-teardown": {
    slug: "incumbent-workaround-teardown",
    title: "Reverse-Engineering Broken Workarounds",
    subtitle: "How to deconstruct Excel sheets, Zapier duct tape, and shadow IT into a defensible software thesis.",
    moduleId: "problem-discovery",
    moduleTitle: "1. Problem Discovery & Validation",
    difficulty: "Intermediate",
    readTime: "7 min read",
    lastUpdated: "November 2026",
    diagramType: "workaround-teardown",
    relatedCategory: "Competitive Intelligence",
    keyTakeaways: [
      "Every successful B2B SaaS company is simply an Excel sheet or Access database turned into multi-tenant software.",
      "Workarounds prove market demand, willingness to expend effort, and user feature priorities.",
      "Analyze where the spreadsheet breaks: version control collisions, formula corruption, and permission leaks.",
    ],
    sections: [
      {
        id: "excel-precursor",
        title: "Excel as the Precursor to Software",
        content: [
          "Salesforce replaced sales contact spreadsheets. Carta replaced capitalization table spreadsheets. Flexport replaced freight forwarding spreadsheets. Notion replaced personal note spreadsheets.",
          "Spreadsheets are the ultimate sandbox for workflow prototyping. When you encounter a spreadsheet with more than 15 columns, color-coded tabs, and a dedicated 'DO NOT EDIT' warning row, you are looking at a validated software product waiting to be engineered.",
        ],
        callout: {
          type: "tip",
          title: "The Spreadsheet Deconstruction Heuristic",
          text: "Each tab is a database entity. Each column is a schema attribute. Each VLOOKUP is a relational foreign key join. Each macro is a background worker job.",
        },
      },
    ],
    quiz: {
      question: "What is the primary indicator that an internal spreadsheet workaround has outgrown its utility and is ready for dedicated software?",
      options: [
        "The spreadsheet uses simple SUM formulas",
        "Multiple operators experience version collisions, sync locks, and accidental formula overwrites causing financial discrepancies",
        "The file is saved on a local desktop drive",
        "The user downloaded a free template online",
      ],
      correctIndex: 1,
      explanation: "Concurrency conflicts, broken formula logic, and lack of audit trails are the tipping points where companies actively allocate budget to replace spreadsheets.",
    },
  },

  "bottom-up-tam-formula": {
    slug: "bottom-up-tam-formula",
    title: "The Bottom-Up TAM Calculation Formula",
    subtitle: "Ditching top-down analyst reports for rigorous unit-economic market sizing.",
    moduleId: "market-sizing",
    moduleTitle: "2. Market Sizing & Quantitative Economics",
    difficulty: "Intermediate",
    readTime: "8 min read",
    lastUpdated: "November 2026",
    diagramType: "tam-funnel",
    relatedCategory: "Market Economics",
    keyTakeaways: [
      "Top-down TAM ('The global healthcare market is $10 Trillion and we need 1%') is an instant red flag for investors and operators.",
      "Bottom-up TAM multiplies the exact number of qualified target buyers by validated Annual Contract Value (ACV).",
      "Stuckhere enforces bottom-up sizing based on verified employee counts, facility populations, and quantifiable waste.",
    ],
    sections: [
      {
        id: "top-down-vs-bottom-up",
        title: "Why Top-Down TAM is Meaningless",
        content: [
          "A top-down market size takes an astronomical industry figure from a research firm (Gartner, IDC) and claims that capturing a tiny fraction creates a venture-scale company.",
          "For example: 'The global logistics industry is $9.6 Trillion. If we capture 0.1%, we are a $9.6 Billion company!'",
          "This calculation ignores buyer willingness-to-pay, sales channel constraints, regulatory jurisdiction, and software displacement costs.",
        ],
      },
      {
        id: "the-formula",
        title: "The Mathematical Bottom-Up Formula",
        content: [
          "Bottom-up sizing computes market size from the ground up using verified unit economics:",
        ],
        callout: {
          type: "formula",
          title: "Mathematical Formula",
          text: "TAM = N × ACV\nWhere:\n• N = Total number of addressable economic buyer entities globally\n• ACV = Annual Contract Value (Validated Annual Willingness to Pay per entity)",
        },
        codeSnippet: {
          language: "typescript",
          code: `// Bottom-Up TAM Calculation Example: Rural Clinic Telehealth\nconst eligibleClinics = 45000; // Total certified community health centers in target regions\nconst penetrationRate = 0.35;  // SAM: Clinics with EHR integration capability\nconst annualWTP = 12000;       // Validated ACV ($1,000/month per clinic)\n\nconst totalAddressableMarket = eligibleClinics * annualWTP; // $540,000,000 ($540M TAM)\nconst serviceableMarket = eligibleClinics * penetrationRate * annualWTP; // $189,000,000 ($189M SAM)`,
        },
      },
    ],
    quiz: {
      question: "Which of the following describes a true Bottom-Up TAM calculation?",
      options: [
        "Multiplying total worldwide eCommerce volume by 1.5%",
        "Counting 12,000 target community banks multiplied by their validated $45,000 annual compliance budget",
        "Referencing a Grand View Research report showing a $25B market size",
        "Assuming every smartphone user will download the app",
      ],
      correctIndex: 1,
      explanation: "Bottom-up sizing explicitly multiplies the concrete count of addressable entities (12,000 banks) by their validated annual contract value ($45,000).",
    },
  },

  "pain-score-algorithm": {
    slug: "pain-score-algorithm",
    title: "Deconstructing the 0–100 Pain Score Algorithm",
    subtitle: "The mathematical model powering Stuckhere's severity indexing.",
    moduleId: "market-sizing",
    moduleTitle: "2. Market Sizing & Quantitative Economics",
    difficulty: "Advanced",
    readTime: "9 min read",
    lastUpdated: "November 2026",
    diagramType: "pain-formula",
    relatedCategory: "Mathematical Modeling",
    keyTakeaways: [
      "Pain Score is an objective, normalized 0–100 index eliminating subjective hype.",
      "The formula balances Frequency (30%), Financial/Compliance Severity (30%), Workaround Failure (25%), and Switching Urgency (15%).",
      "Scores ≥ 80 qualify as 'High-Velocity Venture Theses' with verified urgency.",
    ],
    sections: [
      {
        id: "algorithmic-components",
        title: "The 4 Core Scoring Vectors",
        content: [
          "To rank problems objectively across disparate industries (e.g. comparing a hospital ICU alarm problem with an agricultural irrigation bottleneck), Stuckhere normalizes four core vectors onto a 0–100 scale:",
        ],
        table: {
          headers: ["Vector", "Weight", "Scale Definition", "Key Metric Captured"],
          rows: [
            ["F (Frequency)", "30%", "1 (Annual) to 100 (Continuous Hourly)", "How often does the practitioner face the friction?"],
            ["S (Severity)", "30%", "1 (Minor) to 100 (Existential / Fine)", "Dollar loss, regulatory penalty, or safety hazard?"],
            ["W (Workaround Failure)", "25%", "1 (Smooth) to 100 (Completely Broken)", "How brittle and hated are existing spreadsheets/tools?"],
            ["U (Switching Urgency)", "15%", "1 (Backlog) to 100 (Immediate Q1 Budget)", "Is budget allocated right now to replace the workflow?"],
          ],
        },
        callout: {
          type: "formula",
          title: "Exact Algorithmic Equation",
          text: "PainScore = (0.30 × F) + (0.30 × S) + (0.25 × W) + (0.15 × U)",
        },
      },
    ],
    quiz: {
      question: "If a problem occurs continuously (F=95), carries severe regulatory audit fines (S=90), has broken spreadsheets (W=85), but budget allocation is deferred (U=50), what is its approximate Pain Score?",
      options: [
        "Around 62",
        "Around 84",
        "Around 98",
        "Around 45",
      ],
      correctIndex: 1,
      explanation: "PainScore = (0.30×95) + (0.30×90) + (0.25×85) + (0.15×50) = 28.5 + 27.0 + 21.25 + 7.5 = 84.25 (High-Severity Opportunity).",
    },
  },

  "willingness-to-pay-experiments": {
    slug: "willingness-to-pay-experiments",
    title: "Validating Willingness-to-Pay (LOIs & Pilot Deposits)",
    subtitle: "Testing commercial intent with pre-orders and pilot agreements before building software.",
    moduleId: "market-sizing",
    moduleTitle: "2. Market Sizing & Quantitative Economics",
    difficulty: "Intermediate",
    readTime: "7 min read",
    lastUpdated: "November 2026",
    diagramType: "wtp-ladder",
    relatedCategory: "Sales Engineering",
    keyTakeaways: [
      "Compliments in customer interviews have zero correlation with revenue.",
      "The Ladder of Customer Commitment escalates from Time -> Data -> Reputation -> Money.",
      "A signed Letter of Intent (LOI) with price terms proves commercial viability before code.",
    ],
    sections: [
      {
        id: "the-commitment-ladder",
        title: "The 4 Rungs of the Customer Commitment Ladder",
        content: [
          "When validating problem demand, demand commitment from the prospect at increasing tiers of friction:",
        ],
        table: {
          headers: ["Rung", "Commitment Type", "Test Criterion", "Signal Strength"],
          rows: [
            ["Rung 1", "Time Commitment", "Agreeing to a 45-minute workflow deep-dive", "Low (Politeness threshold)"],
            ["Rung 2", "Data Commitment", "Providing anonymized historical invoices or audit logs", "Medium (Demonstrates genuine trust)"],
            ["Rung 3", "Reputational Commitment", "Introducing you to their department VP or procurement head", "High (Puts their credibility on the line)"],
            ["Rung 4", "Financial Commitment", "Signed non-binding LOI with exact pricing, or refundable $500 pilot deposit", "Very High (Proven Commercial Intent)"],
          ],
        },
      },
    ],
    quiz: {
      question: "Which action provides the highest fidelity proof of willingness-to-pay during customer discovery?",
      options: [
        "The customer signs up for your free email newsletter",
        "The customer gives you positive feedback on a Figma mockup",
        "The customer signs a pilot LOI specifying price and conditions for commercial rollout",
        "The customer follows your company on LinkedIn",
      ],
      correctIndex: 2,
      explanation: "A signed LOI with explicit pricing terms and rollout milestones tests real financial and legal intent, filtering out casual compliments.",
    },
  },

  "nosql-firestore-modeling-for-startups": {
    slug: "nosql-firestore-modeling-for-startups",
    title: "Scalable NoSQL Data Modeling in Cloud Firestore",
    subtitle: "Preventing read storms, denormalizing safely, and optimizing serverless costs.",
    moduleId: "full-stack-architecture",
    moduleTitle: "3. Scalable Full-Stack Engineering",
    difficulty: "Advanced",
    readTime: "9 min read",
    lastUpdated: "November 2026",
    diagramType: "nosql-schema",
    relatedCategory: "Cloud Architecture",
    keyTakeaways: [
      "In Cloud Firestore, you pay per document read; fetching 1,000 documents on every page reload causes billing spikes.",
      "Denormalize high-frequency summary data (e.g. author name, avatar, upvote count) directly onto parent documents.",
      "Always paginate queries with `limit()` and cursor timestamps (`startAfter()`) to maintain sub-100ms render speeds.",
    ],
    sections: [
      {
        id: "firestore-cost-rule",
        title: "The Golden Rule of NoSQL Cloud Firestore",
        content: [
          "Unlike relational databases (PostgreSQL, MySQL) where CPU/RAM defines server cost, Cloud Firestore is billed primarily on Document Reads, Document Writes, and Document Deletes.",
          "If 100 users visit your homepage and your query performs `getDocs(collection('problems'))` across 5,000 items, you just consumed 500,000 reads in seconds.",
          "To scale economically on the free tier and beyond, architect collections around read patterns rather than relational normal form.",
        ],
        codeSnippet: {
          language: "typescript",
          code: `// Optimized Firestore Cursor Query with Pagination\nimport { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";\nimport { db } from "@/lib/firebase";\n\nexport async function fetchProblemsPaginated(lastDoc: any, pageSize = 20) {\n  const baseQuery = query(\n    collection(db, "problems"),\n    orderBy("painScore", "desc"),\n    limit(pageSize)\n  );\n\n  const paginatedQuery = lastDoc\n    ? query(baseQuery, startAfter(lastDoc))\n    : baseQuery;\n\n  const snapshot = await getDocs(paginatedQuery);\n  const lastVisible = snapshot.docs[snapshot.docs.length - 1];\n  const problems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));\n\n  return { problems, lastVisible };\n}`,
        },
      },
    ],
    quiz: {
      question: "Why should you store an author's displayName and photoURL directly on a problem document in Firestore instead of querying a separate 'users' collection?",
      options: [
        "Because Firestore does not support users",
        "To avoid an N+1 read storm where displaying 25 problems requires 25 additional user lookups",
        "Because NoSQL databases cannot store strings",
        "To increase the Firestore bill",
      ],
      correctIndex: 1,
      explanation: "Denormalizing author data saves 25 read operations per page load, drastically lowering latency and database billing.",
    },
  },

  "securing-serverless-apps-rbac": {
    slug: "securing-serverless-apps-rbac",
    title: "Hardened Multi-Route RBAC & Zero-Trust Authentication",
    subtitle: "Protecting sensitive administrative perimeters and preventing role-spoofing in SPAs.",
    moduleId: "full-stack-architecture",
    moduleTitle: "3. Scalable Full-Stack Engineering",
    difficulty: "Advanced",
    readTime: "8 min read",
    lastUpdated: "November 2026",
    diagramType: "rbac-flow",
    relatedCategory: "App Security",
    keyTakeaways: [
      "Client-side checks (e.g. `user.role === 'admin'`) in React are cosmetic; real authorization happens at the database rule layer.",
      "Never store user roles solely in `localStorage` — attackers can edit keys using Chrome DevTools.",
      "Enforce immutable fields in `firestore.rules` so users cannot elevate their own permission level or credit balance.",
    ],
    sections: [
      {
        id: "client-vs-database-rules",
        title: "The Fallacy of Client-Side Route Protection",
        content: [
          "In a single-page application (SPA), any user can open Chrome DevTools, modify JavaScript variables, or manipulate `localStorage`.",
          "If your app protects an admin route only with `<AdminRoute />`, an attacker can bypass the redirect. However, if your Cloud Firestore rules check authoritative tokens, any attempt to read or write sensitive admin collections will fail with `PERMISSION_DENIED`.",
        ],
        codeSnippet: {
          language: "javascript",
          code: `// Secure Firestore Rule: Enforcing Role Verification & Immutable Fields\nmatch /problems/{problemId} {\n  allow read: if true; // Public catalog\n  \n  // Only authenticated users can submit; status must default to 'pending'\n  allow create: if request.auth != null\n    && request.resource.data.status == 'pending'\n    && request.resource.data.authorId == request.auth.uid;\n    \n  // Only verified admins can approve or edit status\n  allow update: if request.auth != null && (\n    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'\n  );\n}`,
        },
      },
    ],
    quiz: {
      question: "What prevents an unauthorized user from modifying another user's problem statement in a properly secured serverless app?",
      options: [
        "A hidden CSS button in React",
        "Firestore security rules validating request.auth.uid against the document's authorId",
        "Saving the user ID in sessionStorage",
        "A console.log warning",
      ],
      correctIndex: 1,
      explanation: "Server-side declarative security rules in Firestore validate the cryptographic auth token (`request.auth.uid`), guaranteeing access control regardless of client-side modifications.",
    },
  },

  "production-performance-code-splitting": {
    slug: "production-performance-code-splitting",
    title: "Resilient Code Splitting & Stale Deployment Handling",
    subtitle: "Eliminating chunk load errors and maintaining sub-100kB bundle sizes.",
    moduleId: "full-stack-architecture",
    moduleTitle: "3. Scalable Full-Stack Engineering",
    difficulty: "Advanced",
    readTime: "8 min read",
    lastUpdated: "November 2026",
    diagramType: "bundle-pipeline",
    relatedCategory: "Performance Engineering",
    keyTakeaways: [
      "Single large JavaScript bundles (>500kB) kill mobile LCP and SEO crawl efficiency.",
      "When a new production build deploys, older client tabs trigger `ChunkLoadError` when requesting deleted chunk hashes.",
      "The `lazyWithRetry` pattern gracefully auto-refreshes the browser session once, ensuring seamless user experience.",
    ],
    sections: [
      {
        id: "the-stale-chunk-problem",
        title: "The Stale Chunk Problem in Continuous Deployment",
        content: [
          "When you run `npm run build`, Vite produces fingerprinted assets like `Home-MOg453xF.js`. On Vercel or Netlify, previous deployment hashes are purged.",
          "If a user is browsing your website when you deploy a new commit, and they click a link to `/dashboard`, React attempts to fetch the old chunk hash which now returns a 404.",
          "Without resilient wrapper logic, the React app crashes to a blank white screen.",
        ],
        codeSnippet: {
          language: "typescript",
          code: `// Resilient Dynamic Import with Auto-Reload on Stale Deployments\nexport function lazyWithRetry<T extends React.ComponentType<any>>(\n  factory: () => Promise<{ default: T }>\n) {\n  return React.lazy(async () => {\n    const sessionKey = "app_chunk_retry";\n    const hasRetried = sessionStorage.getItem(sessionKey);\n\n    try {\n      const module = await factory();\n      sessionStorage.removeItem(sessionKey);\n      return module;\n    } catch (error: any) {\n      const isChunkError =\n        error?.message?.includes("Failed to fetch dynamically imported module") ||\n        error?.name === "ChunkLoadError";\n\n      if (isChunkError && !hasRetried) {\n        sessionStorage.setItem(sessionKey, "true");\n        window.location.reload();\n        return new Promise<{ default: T }>(() => {});\n      }\n      throw error;\n    }\n  });\n}`,
        },
      },
    ],
    quiz: {
      question: "What causes a 'Failed to fetch dynamically imported module' (ChunkLoadError) in a React SPA?",
      options: [
        "A syntax error in a CSS file",
        "A user in an older session tries to fetch a lazy route chunk whose hash was removed after a new production deployment",
        "The user lost internet connection for 1 millisecond",
        "React does not support lazy loading",
      ],
      correctIndex: 1,
      explanation: "Continuous deployments replace previous chunk hashes on the server; an existing client requesting the old hash encounters a 404 unless handled by a retry/reload wrapper.",
    },
  },
};
