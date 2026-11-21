export interface ChapterSection {
  id: string;
  sectionNumber: string;
  title: string;
  content: string[];
  subheading?: string;
  subcontent?: string[];
  table?: {
    headers: string[];
    rows: { label: string; text: string; highlight?: boolean }[];
  };
  callout?: {
    boldPrefix: string;
    text: string;
    linkUrl?: string;
    linkText?: string;
  };
  points?: { bold: string; text: string }[];
  templateBox?: string;
  templateComparison?: { weak: string; strong: string };
  exercisePrompt?: string;
  detailsQuestions?: { question: string; answer: string }[];
}

export interface ChapterQuizOption {
  key: string;
  label: string;
  isCorrect: boolean;
}

export interface ChapterQuiz {
  question: string;
  options: ChapterQuizOption[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface AcademyChapter {
  num: number;
  title: string;
  shortTitle: string;
  slug: string;
  sectionsCount: number;
  subs: string;
  part: string;
  coverColor: string;
  lead: string;
  inThisChapter: string;
  sections: ChapterSection[];
  quiz: ChapterQuiz;
  practicePrompt: string;
}

export interface SyllabusPart {
  name: string;
  startChapter: number;
  endChapter: number;
  title: string;
  meta: string;
  items: string;
}

export const ACADEMY_COLORS = ["#0056d2", "#00419e", "#0b6b83", "#3c4a9e"];

export const ACADEMY_PARTS: SyllabusPart[] = [
  {
    name: "All",
    startChapter: 0,
    endChapter: 14,
    title: "All Chapters",
    meta: "Chapters 0 to 14",
    items: "All 15 chapters of Problem Discovery & Validation",
  },
  {
    name: "Foundations",
    startChapter: 0,
    endChapter: 3,
    title: "Foundations",
    meta: "Chapters 0 to 3",
    items: "Course overview · What is a problem · Why startups fail · Vitamin, painkiller, surgery",
  },
  {
    name: "Discover",
    startChapter: 4,
    endChapter: 6,
    title: "Discover",
    meta: "Chapters 4 to 6",
    items: "Where to find real problems · Customer discovery interviews · The problem dossier",
  },
  {
    name: "Measure and validate",
    startChapter: 7,
    endChapter: 10,
    title: "Measure and validate",
    meta: "Chapters 7 to 10",
    items: "Measuring pain · Validation signals · Workarounds and competitors · Sizing the opportunity",
  },
  {
    name: "Apply",
    startChapter: 11,
    endChapter: 14,
    title: "Apply",
    meta: "Chapters 11 to 14",
    items: "Solution hypothesis · Bias, ethics and mistakes · Capstone project · Appendices",
  },
];

export const ACADEMY_MODULES = [
  {
    id: "module-1",
    n: 1,
    title: "Problem Discovery & Validation",
    level: "Beginner",
    live: true,
    meta: "15 chapters · 78 sections",
    chaptersCount: 15,
    sectionsCount: 78,
  },
  {
    id: "module-2",
    n: 2,
    title: "Market Sizing & Opportunity",
    level: "Intermediate",
    live: false,
    meta: "Coming soon",
    chaptersCount: 8,
    sectionsCount: 36,
  },
  {
    id: "module-3",
    n: 3,
    title: "Full-Stack Cloud for Founders",
    level: "Advanced",
    live: false,
    meta: "Coming soon",
    chaptersCount: 10,
    sectionsCount: 42,
  },
];

export const ACADEMY_CHAPTERS: AcademyChapter[] = [
  {
    num: 0,
    title: "Course Overview",
    shortTitle: "Course Overview",
    slug: "course-overview",
    sectionsCount: 3,
    part: "Foundations",
    coverColor: "#0056d2",
    subs: "What this subject covers · Who it is for · How to use this material",
    lead: "Reading concise chapters beats watching hours of video. One concept at a time, then test it on real problems in the registry.",
    inThisChapter: "What this subject covers · Who this course is for · How to read and apply each chapter",
    practicePrompt: "Explore three random problem statements from the catalog.",
    sections: [
      {
        id: "s01",
        sectionNumber: "0.1",
        title: "What this subject covers",
        content: [
          "This course covers the discipline of problem discovery, evidence documentation, pain scoring, and early validation before building code.",
          "Every chapter is designed for fast, active reading: concept, real-world case study, exercise, and checkpoint quiz.",
        ],
      },
      {
        id: "s02",
        sectionNumber: "0.2",
        title: "Who it is for",
        content: [
          "Engineers, researchers, solo founders, and product builders who want to stop building things nobody uses.",
          "No technical background required. The course focuses on human behaviour, operational workflows, and economic pain.",
        ],
      },
      {
        id: "s03",
        sectionNumber: "0.3",
        title: "How to use this material",
        content: [
          "Read chapters in sequence, or jump directly to the technique you need for your current project.",
          "Apply the templates directly to real problems submitted on Stuckhere.",
        ],
        detailsQuestions: [
          {
            question: "Do I need coding experience to finish this course?",
            answer: "No. The entire curriculum focuses on discovering real friction, interviewing operators, and measuring economic pain.",
          },
        ],
      },
    ],
    quiz: {
      question: "What is the primary objective of the Stuckhere Academy course?",
      options: [
        { key: "A", label: "To teach you how to write Python code", isCorrect: false },
        { key: "B", label: "To teach you how to discover and validate high-pain problems worth solving", isCorrect: true },
        { key: "C", label: "To show you how to raise venture capital immediately", isCorrect: false },
      ],
      feedbackCorrect: "Correct. The entire academy focuses on discovering and validating high-severity problems before building.",
      feedbackIncorrect: "Not quite. The course teaches problem discovery, validation, and market sizing.",
    },
  },
  {
    num: 1,
    title: "Foundations: What Is a Problem?",
    shortTitle: "What Is a Problem?",
    slug: "what-is-a-problem",
    sectionsCount: 4,
    part: "Foundations",
    coverColor: "#00419e",
    subs: "Problem vs idea vs solution · Anatomy of a problem statement · Statement template · Practice",
    lead: "Most builders start with a solution and go looking for a problem. This chapter gives you the words to tell the two apart.",
    inThisChapter: "The difference between a problem, an idea and a solution · The five parts of a good problem statement · A fill-in template · Practice",
    practicePrompt: "Identify five problem statements with verified primary evidence.",
    sections: [
      {
        id: "s11",
        sectionNumber: "1.1",
        title: "Problem, idea, solution",
        content: [
          "A problem is a situation where someone's goal is blocked. An idea is a guess about what might help. A solution is something that actually removes the block. People mix them up because ideas arrive faster than understanding.",
        ],
        table: {
          headers: ["Concept", "Example"],
          rows: [
            { label: "Problem", text: "Clinic staff lose part of every week rebuilding the doctor schedule by hand.", highlight: true },
            { label: "Idea", text: "Maybe a scheduling app could fix it." },
            { label: "Solution", text: "A tool that rebuilds the schedule after a no-show, tested with real staff." },
          ],
        },
        subheading: "The solution in disguise",
        subcontent: [
          "\"The problem is that we lack an app\" is not a problem. It is a solution wearing a problem's clothes. Ask what the app would let someone do that they cannot do today.",
        ],
      },
      {
        id: "s12",
        sectionNumber: "1.2",
        title: "A good problem statement",
        content: [
          "Good statements are specific enough that two people would picture the same situation. Cover five things:",
        ],
        points: [
          { bold: "Who", text: "faces it. A specific role, not \"everyone\"." },
          { bold: "What happens.", text: "Behaviour you could observe." },
          { bold: "When, and how often.", text: "Recurring problems matter most." },
          { bold: "What it costs.", text: "Time, money, risk or stress." },
          { bold: "What they do today.", text: "The current workaround." },
        ],
      },
      {
        id: "s13",
        sectionNumber: "1.3",
        title: "The template",
        content: [],
        templateBox: "[Role] at [type of workplace] struggle to [goal] because [blocker]. It happens [how often] and costs [time, money or risk]. Today they [workaround].",
        templateComparison: {
          weak: "Hospitals need better software.",
          strong: "Clinic managers at small clinics struggle to keep the doctor schedule full because no-shows arrive without warning. It happens [how often] and costs [hours per week]. Today they rebuild the schedule by hand in a spreadsheet.",
        },
      },
      {
        id: "s14",
        sectionNumber: "1.4",
        title: "Practice",
        content: [],
        exercisePrompt: "Pick five frustrations from your own week. Rewrite each one using the template above. Cross out any that name a solution.",
        subheading: "Check yourself",
        detailsQuestions: [
          {
            question: "1. Is \"we need a mobile app for our shop\" a problem statement?",
            answer: "No. It names a solution. Ask what the shop owner cannot do today.",
          },
          {
            question: "2. Which of the five parts is missing: \"Nurses struggle with handover notes\"?",
            answer: "How often it happens, what it costs and what they do today are all missing.",
          },
        ],
      },
    ],
    quiz: {
      question: "Which of the following represents a true problem statement rather than an idea?",
      options: [
        { key: "A", label: "We should build an Uber for logistics freight", isCorrect: false },
        { key: "B", label: "Cold-chain vaccine shippers lose $42,000 annually per fleet due to uncalibrated temperature logger disconnects", isCorrect: true },
        { key: "C", label: "Blockchain smart contracts will modernize supply chains", isCorrect: false },
      ],
      feedbackCorrect: "Correct. Option B specifies the victim, the trigger, and the quantified financial loss.",
      feedbackIncorrect: "Not quite. Remember that true problems quantify loss rather than proposing speculative technology.",
    },
  },
  {
    num: 2,
    title: "Why Startups Fail",
    shortTitle: "Why Startups Fail",
    slug: "why-startups-fail",
    sectionsCount: 5,
    part: "Foundations",
    coverColor: "#0b6b83",
    subs: "The 42% failure data · Anatomy of a wasted build · Case patterns · Discovery-first mindset · Practice",
    lead: "CB Insights analyzed over 400 startup post-mortems: the #1 reason startups die (42%) is 'No Market Need'—building something nobody wanted.",
    inThisChapter: "Post-mortem analysis data · The false validation trap · The discovery-first mindset · Real-world autopsy patterns",
    practicePrompt: "Review five closed companies on Crunchbase and trace their root cause to unverified assumptions.",
    sections: [
      {
        id: "s21",
        sectionNumber: "2.1",
        title: "The 42% failure rate",
        content: [
          "Building is intoxicating. Writing code, setting up databases, and picking landing page fonts gives the immediate illusion of productivity. But building without verified pain creates shelfware.",
        ],
      },
      {
        id: "s22",
        sectionNumber: "2.2",
        title: "Anatomy of a wasted build",
        content: [
          "Founder has an idea in the shower → Writes code for 6 months in isolation → Launches on Product Hunt → A few upvotes, zero paying users → Founders run out of runway or motivation.",
          "Discovery-first flips this cycle: Verify the pain exists and that operators are already paying or hacking workarounds before committing code.",
        ],
        callout: {
          boldPrefix: "Rule of Thumb.",
          text: "If you cannot find five people willing to talk for 20 minutes about their existing workaround, nobody will pay for your software.",
        },
      },
      {
        id: "s23",
        sectionNumber: "2.3",
        title: "Check yourself",
        content: [],
        detailsQuestions: [
          {
            question: "Why do friendly user surveys often produce false validation?",
            answer: "Surveys ask hypothetical future questions ('Would you buy this?'). People are polite and say yes. Only past behaviour and current workarounds prove genuine demand.",
          },
        ],
      },
    ],
    quiz: {
      question: "According to empirical startup post-mortems, what is the single most common cause of early-stage company failure?",
      options: [
        { key: "A", label: "Running out of cash due to high marketing spend", isCorrect: false },
        { key: "B", label: "No market need (building something nobody actually needs)", isCorrect: true },
        { key: "C", label: "Technical scalability failures and database outages", isCorrect: false },
      ],
      feedbackCorrect: "Correct! 42% of startups fail simply because they build products for non-existent or low-priority problems.",
      feedbackIncorrect: "Incorrect. The leading cause is building products nobody actually wants or is willing to pay for.",
    },
  },
  {
    num: 3,
    title: "Vitamin, Painkiller, Surgery",
    shortTitle: "Vitamin, Painkiller, Surgery",
    slug: "vitamin-painkiller-surgery",
    sectionsCount: 4,
    part: "Foundations",
    coverColor: "#3c4a9e",
    subs: "Triage framework · Telling them apart · Choosing for your context · Practice",
    lead: "Before you build anything, decide how badly people need it fixed. Every problem sits somewhere between nice to have and cannot ignore.",
    inThisChapter: "The triage framework · Telling vitamins from painkillers · Selecting the right depth for your resources · Check yourself",
    practicePrompt: "Practice: triage ten problems from the registry into Vitamin, Painkiller, or Surgery.",
    sections: [
      {
        id: "s31",
        sectionNumber: "3.1",
        title: "The triage framework",
        content: [
          "Every problem sits somewhere between nice to have and cannot ignore. Three labels make that visible.",
        ],
        table: {
          headers: ["Category", "Description"],
          rows: [
            { label: "Vitamin", text: "Nice to have. People say 'that would be cool' and do nothing." },
            { label: "Painkiller", text: "Felt daily. People already patch it, or pay, for relief.", highlight: true },
            { label: "Surgery", text: "Critical and high stakes. Needs deep change and a long sales cycle." },
          ],
        },
      },
      {
        id: "s32",
        sectionNumber: "3.2",
        title: "Telling them apart",
        content: [
          "Look for spreadsheets, paper registers and WhatsApp groups holding a process together. A workaround is evidence of pain. If nobody has bothered to patch it, it is probably a vitamin.",
        ],
        callout: {
          boldPrefix: "On Stuckhere.",
          text: "Open any problem in the registry and read its Pain Score and workarounds before you read the rest.",
          linkUrl: "/explore",
          linkText: "Open the registry",
        },
      },
      {
        id: "s33",
        sectionNumber: "3.3",
        title: "Choosing for your context",
        content: [
          "Hackathon teams need fast, demo-able painkillers. Solo founders do best with problems that carry little compliance. Funded teams can afford surgery.",
        ],
      },
      {
        id: "s34",
        sectionNumber: "3.4",
        title: "Check yourself",
        content: [
          "A clinic pays staff overtime every week to rebuild a schedule by hand. What kind of problem is this?",
        ],
        detailsQuestions: [
          {
            question: "Why is a messy Excel sheet often the best signal of a painkiller problem?",
            answer: "Because someone took time out of their busy day to build and maintain a custom workaround without being forced to. That proves active, recurring pain.",
          },
        ],
      },
    ],
    quiz: {
      question: "A regional dental clinic pays staff 8 hours of overtime every Friday to manually reconcile insurance payments. Which category is this?",
      options: [
        { key: "A", label: "Vitamin (a nice-to-have cosmetic upgrade)", isCorrect: false },
        { key: "B", label: "Painkiller (active recurring financial and operational pain)", isCorrect: true },
        { key: "C", label: "Surgery (organization-wide existential transformation)", isCorrect: false },
      ],
      feedbackCorrect: "Correct! They are already actively bleeding cash and time every single week, proving an acute painkiller need.",
      feedbackIncorrect: "Not quite. Because they are already spending cash on overtime, it is a classic painkiller problem.",
    },
  },
  {
    num: 4,
    title: "Where to Find Real Problems",
    shortTitle: "Where to Find Real Problems",
    slug: "where-to-find-problems",
    sectionsCount: 6,
    part: "Discover",
    coverColor: "#0056d2",
    subs: "Lived experience · Observing work · Industry domains · Online sources · Using the Problem Hub · Practice",
    lead: "The most lucrative problems aren't discussed on Twitter or TechCrunch. They live inside unglamorous back-offices, supply warehouses, and regulatory filing desks.",
    inThisChapter: "First-hand friction · Shadowing professionals · B2B trade forums · Mining 1-star reviews · The Stuckhere Registry",
    practicePrompt: "Spend 2 hours shadowing an operator or read 20 detailed reviews on G2/Capterra for B2B tools in logistics.",
    sections: [
      {
        id: "s41",
        sectionNumber: "4.1",
        title: "Lived experience & operational shadows",
        content: [
          "The best problems come from work you or someone close to you actually did for 40 hours a week.",
          "When you observe an operator clicking 17 times to export a CSV, emailing it to a colleague, and pasting it into another tool—you have struck gold.",
        ],
      },
      {
        id: "s42",
        sectionNumber: "4.2",
        title: "Finding problems in the wild",
        content: [
          "Specialized industry forums, compliance updates from government regulators, and 2-star reviews of enterprise software are treasure troves of genuine friction.",
        ],
        callout: {
          boldPrefix: "On Stuckhere.",
          text: "Browse problems submitted directly by domain specialists across 140+ industries.",
          linkUrl: "/explore",
          linkText: "Explore verified industries",
        },
      },
    ],
    quiz: {
      question: "Where is an aspiring B2B founder most likely to find an acute, unaddressed workflow problem?",
      options: [
        { key: "A", label: "In the comments section of viral consumer social apps", isCorrect: false },
        { key: "B", label: "By shadowing clinic billing coordinators or warehouse shipping managers during peak operations", isCorrect: true },
        { key: "C", label: "By brainstorming in a coffee shop with other developers", isCorrect: false },
      ],
      feedbackCorrect: "Correct. Shadowing operational workflows reveals the silent workarounds people perform every day.",
      feedbackIncorrect: "Incorrect. Real problems hide in everyday operational friction, not casual brainstorming.",
    },
  },
  {
    num: 5,
    title: "Customer Discovery Interviews",
    shortTitle: "Customer Discovery Interviews",
    slug: "customer-discovery-interviews",
    sectionsCount: 7,
    part: "Discover",
    coverColor: "#00419e",
    subs: "Why interviews · Mom Test principles · Preparing · Five core questions · Running the conversation · After the interview · Practice",
    lead: "Customer interviews are not sales pitches. The moment you mention your product idea, the customer stops giving you truth and starts giving you politeness.",
    inThisChapter: "The Mom Test framework · The 5 diagnostic questions · How to avoid leading questions · Turning notes into empirical evidence",
    practicePrompt: "Conduct two 15-minute diagnostic conversations without ever mentioning your idea.",
    sections: [
      {
        id: "s51",
        sectionNumber: "5.1",
        title: "The Golden Rule: Never pitch your idea",
        content: [
          "Talk about their life, not your idea.",
          "Ask about specific past actions rather than generic opinions or future promises.",
          "Listen far more than you speak (80/20 rule).",
        ],
      },
      {
        id: "s52",
        sectionNumber: "5.2",
        title: "The five core diagnostic questions",
        content: [
          "1. What is the hardest part about [doing process X]?",
          "2. Can you tell me about the last time that happened?",
          "3. Why was that so hard?",
          "4. What, if anything, have you tried to do to fix that?",
          "5. What don't you love about the solutions you've already tried?",
        ],
      },
    ],
    quiz: {
      question: "Which of the following is a Mom-Test-compliant customer interview question?",
      options: [
        { key: "A", label: "\"Would you pay $50/month for an automated scheduling bot?\"", isCorrect: false },
        { key: "B", label: "\"Can you walk me through what happened the last time a patient didn't show up?\"", isCorrect: true },
        { key: "C", label: "\"Don't you agree that hospital EHR systems are clunky?\"", isCorrect: false },
      ],
      feedbackCorrect: "Correct! Asking about the last time an event occurred grounds the answer in observable historical reality.",
      feedbackIncorrect: "Not quite. Questions asking for hypothetical future opinions or leading agreement produce false validation.",
    },
  },
  {
    num: 6,
    title: "The Problem Dossier",
    shortTitle: "The Problem Dossier",
    slug: "the-problem-dossier",
    sectionsCount: 5,
    part: "Discover",
    coverColor: "#0b6b83",
    subs: "Why structure matters · Dossier sections · Writing rules · Worked example · Practice",
    lead: "Loose thoughts don't survive contact with reality. A structured Problem Dossier forces rigor onto every assumption.",
    inThisChapter: "Dossier structure · Operational narrative · Incumbent workarounds · Quantified loss metrics · Stuckhere standard template",
    practicePrompt: "Draft a complete 1-page Problem Dossier for a problem you encountered this week.",
    sections: [
      {
        id: "s61",
        sectionNumber: "6.1",
        title: "Why structure matters",
        content: [
          "When you write down the exact victim, the trigger, and the workaround in structured sections, vague ideas collapse and real problems stand out in high definition.",
        ],
      },
    ],
    quiz: {
      question: "What is the primary role of the 'Incumbent Workaround' section in a Problem Dossier?",
      options: [
        { key: "A", label: "To show what software your competitors are raising funding for", isCorrect: false },
        { key: "B", label: "To prove that operators care enough about the friction to spend time or money patching it today", isCorrect: true },
        { key: "C", label: "To list patents that might block your product", isCorrect: false },
      ],
      feedbackCorrect: "Correct! The existing workaround is the single most definitive proof of genuine problem severity.",
      feedbackIncorrect: "Incorrect. Workarounds demonstrate that the customer is already active and desperate for a fix.",
    },
  },
  {
    num: 7,
    title: "Measuring Pain",
    shortTitle: "Measuring Pain",
    slug: "measuring-pain",
    sectionsCount: 6,
    part: "Measure and validate",
    coverColor: "#3c4a9e",
    subs: "Why measure · 10-point diagnostic · Pain Score formula · Worked calculation · Limits · Practice",
    lead: "Not all problems are created equal. Quantifying friction into an objective Pain Score (0-100) lets you rank opportunities dispassionately.",
    inThisChapter: "The Stuckhere Pain Score formula · Frequency, Financial impact, Workaround cost, Urgency · Benchmark calculations",
    practicePrompt: "Calculate the Pain Score for three problems in the Stuckhere registry using the interactive formula.",
    sections: [
      {
        id: "s71",
        sectionNumber: "7.1",
        title: "The Pain Score formula",
        content: [
          "Pain Score = (Frequency × 0.25) + (Financial Loss × 0.35) + (Workaround Inefficiency × 0.20) + (Regulatory/Operational Urgency × 0.20)",
          "Problems with Pain Scores above 75 represent acute commercial opportunities.",
        ],
      },
    ],
    quiz: {
      question: "Which component of the Pain Score carries the heaviest weight in determining commercial viability?",
      options: [
        { key: "A", label: "Social media buzz and hashtag volume", isCorrect: false },
        { key: "B", label: "Direct quantified financial loss or billable hours wasted", isCorrect: true },
        { key: "C", label: "The aesthetic complexity of the user interface", isCorrect: false },
      ],
      feedbackCorrect: "Correct. Budget holders pay when measurable capital or high-cost employee hours are actively being incinerated.",
      feedbackIncorrect: "Incorrect. Quantified financial loss is the primary driver of enterprise purchasing decisions.",
    },
  },
  {
    num: 8,
    title: "Validation: Evidence and Signals",
    shortTitle: "Validation Signals",
    slug: "validation-signals",
    sectionsCount: 7,
    part: "Measure and validate",
    coverColor: "#0056d2",
    subs: "What validation means · Community signals · Behavioural signals · Commitment signals · Experiments · Go, pivot, stop · Practice",
    lead: "Talk is cheap. True validation requires irreversible commitment signals: access to data, letters of intent, or financial pre-payments.",
    inThisChapter: "Hierarchy of validation evidence · Behavioral signals vs opinion · Running smoke tests · Go/Pivot/Stop scorecard",
    practicePrompt: "Design an experiment to test customer willingness to grant access to workflow data.",
    sections: [
      {
        id: "s81",
        sectionNumber: "8.1",
        title: "The Hierarchy of Evidence",
        content: [
          "Level 1: Someone says 'Cool idea!' (Worthless)",
          "Level 2: Someone fills out a waitlist form with their email (Weak)",
          "Level 3: An operator shares their messy internal spreadsheet or logs (Strong)",
          "Level 4: A pilot agreement or signed LOI with explicit acceptance criteria (Very Strong)",
          "Level 5: A company card charge or pre-payment deposit (Ironclad)",
        ],
      },
    ],
    quiz: {
      question: "Which of the following constitutes the strongest evidence of early customer validation?",
      options: [
        { key: "A", label: "500 upvotes on an indie builder forum", isCorrect: false },
        { key: "B", label: "A clinic manager sending you their redacted Excel schedule and spending 45 minutes on a screen-share", isCorrect: true },
        { key: "C", label: "A VC tweeting about your industry space", isCorrect: false },
      ],
      feedbackCorrect: "Correct! Time and proprietary workflow data are substantial investments that operators only make for real pain.",
      feedbackIncorrect: "Incorrect. Social media upvotes do not translate into verified problem severity or customer willingness to engage.",
    },
  },
  {
    num: 9,
    title: "Workarounds and Competitors",
    shortTitle: "Workarounds & Competitors",
    slug: "workarounds-and-competitors",
    sectionsCount: 5,
    part: "Measure and validate",
    coverColor: "#00419e",
    subs: "The real competitor is the workaround · Mapping the landscape · Teardown · Why solutions fail · Practice",
    lead: "Your primary competitor is almost never another startup. It is the status quo: inertia, 'good enough' Excel sheets, and email chains.",
    inThisChapter: "Why founders misidentify competitors · The 10x improvement threshold · Switching costs and cognitive friction",
    practicePrompt: "Map the competitive landscape for a problem, placing 'Do Nothing' and 'Spreadsheet' in the center.",
    sections: [
      {
        id: "s91",
        sectionNumber: "9.1",
        title: "The real competitor is inertia",
        content: [
          "Customers do not switch software for a 10% improvement. Moving to a new product requires onboarding, security reviews, training colleagues, and changing ingrained habits.",
          "Your solution must be 10x faster, cheaper, or less painful than the incumbent workaround to overcome switching inertia.",
        ],
      },
    ],
    quiz: {
      question: "When launching a new B2B workflow tool, what is usually the biggest obstacle to customer adoption?",
      options: [
        { key: "A", label: "Enterprise competitors filing lawsuits", isCorrect: false },
        { key: "B", label: "Customer inertia and the comfort of their existing 'good enough' workaround", isCorrect: true },
        { key: "C", label: "Cloud hosting server pricing", isCorrect: false },
      ],
      feedbackCorrect: "Correct. Inertia and the switching cost of changing habits are what kill most early B2B products.",
      feedbackIncorrect: "Incorrect. Overcoming inertia and current habituated workarounds is the hardest challenge.",
    },
  },
  {
    num: 10,
    title: "Sizing the Opportunity",
    shortTitle: "Sizing the Opportunity",
    slug: "sizing-the-opportunity",
    sectionsCount: 6,
    part: "Measure and validate",
    coverColor: "#0b6b83",
    subs: "Why size a problem · Top-down vs bottom-up · TAM, SAM, SOM · Willingness to pay · Worked example · Practice",
    lead: "Forget $100 Billion Gartner market reports. Real builders size markets from the bottom up: (Number of target operators) × (Proven annual budget).",
    inThisChapter: "Bottom-up sizing methodology · Estimating unit economics · Finding the Serviceable Obtainable Market (SOM)",
    practicePrompt: "Calculate the bottom-up market size for a specialized niche problem with under 10,000 potential buyers.",
    sections: [
      {
        id: "s101",
        sectionNumber: "10.1",
        title: "Bottom-up vs Top-down",
        content: [
          "Top-down: 'The global healthcare market is $8 trillion. If we capture 0.1%, we are an $8 billion company!' (Fictional fantasy).",
          "Bottom-up: 'There are 14,000 licensed dialysis clinics in the US. Each has 2 compliance managers. They currently pay $600/month for legacy audits. SOM = 14,000 × $7,200 = $100.8M.' (Empirical reality).",
        ],
      },
    ],
    quiz: {
      question: "Which market sizing technique provides credible, buildable guidance for early-stage founders?",
      options: [
        { key: "A", label: "Taking 1% of a global research firm's multi-trillion-dollar macroeconomic estimate", isCorrect: false },
        { key: "B", label: "Bottom-up counting of verified qualifying target entities multiplied by demonstrated willingness to pay", isCorrect: true },
        { key: "C", label: "Guessing based on the number of smartphone users in the world", isCorrect: false },
      ],
      feedbackCorrect: "Correct! Bottom-up calculations grounded in verified entity counts and realistic price points are reliable.",
      feedbackIncorrect: "Not quite. Macro top-down calculations are notoriously disconnected from operational reality.",
    },
  },
  {
    num: 11,
    title: "Problem to Solution Hypothesis",
    shortTitle: "Solution Hypothesis",
    slug: "solution-hypothesis",
    sectionsCount: 6,
    part: "Apply",
    coverColor: "#3c4a9e",
    subs: "ICP · Solution hypothesis · Smallest test · 14-day sprint · Pilot outreach · Practice",
    lead: "Now—and only now—can we speak of solutions. The solution is the minimal wedge that directly breaks the identified blocker.",
    inThisChapter: "The Ideal Customer Profile (ICP) · Minimal viable wedge · The Concierge MVP test · Designing a 14-day discovery sprint",
    practicePrompt: "Outline a Concierge MVP test where you perform the service manually before writing software.",
    sections: [
      {
        id: "s111",
        sectionNumber: "11.1",
        title: "The Minimal Viable Wedge",
        content: [
          "Do not build the full platform. Build the single thinnest knife-blade that removes the most excruciating 20% of the friction that causes 80% of the delay.",
        ],
      },
    ],
    quiz: {
      question: "What is the primary advantage of a 'Concierge MVP' (doing the work manually for the first 3 customers)?",
      options: [
        { key: "A", label: "You learn the edge cases of the problem intimately without wasting months of engineering time", isCorrect: true },
        { key: "B", label: "You can charge $1M immediately without any software", isCorrect: false },
        { key: "C", label: "It guarantees that investors will fund your seed round", isCorrect: false },
      ],
      feedbackCorrect: "Correct! Running the process manually exposes all hidden workflow friction before committing code to concrete.",
      feedbackIncorrect: "Incorrect. The main goal of a Concierge MVP is rapid learning and observing real operational corner cases.",
    },
  },
  {
    num: 12,
    title: "Bias, Ethics and Mistakes",
    shortTitle: "Bias, Ethics & Mistakes",
    slug: "bias-ethics-mistakes",
    sectionsCount: 4,
    part: "Apply",
    coverColor: "#0056d2",
    subs: "Cognitive biases · Ethical practice · Top 10 mistakes · Practice",
    lead: "Our brains are wired to see patterns that don't exist and fall in love with our own creations. Learn the cognitive defense mechanisms.",
    inThisChapter: "Confirmation bias in customer discovery · The sunk cost fallacy · Responsible data collection · Top 10 founder traps",
    practicePrompt: "Conduct a pre-mortem on your own project: assume it failed in 12 months and explain exactly why.",
    sections: [
      {
        id: "s121",
        sectionNumber: "12.1",
        title: "The Confirmation Bias Trap",
        content: [
          "When you love an idea, you hear what you want to hear. If 9 people say 'I don't need this' and 1 says 'Sounds interesting', your brain will obsess over the 1.",
          "Keep an objective tally sheet during interviews. Treat disconfirming evidence as gold.",
        ],
      },
    ],
    quiz: {
      question: "How should an evidence-driven founder respond when three prospective customers tell them a problem is not a priority?",
      options: [
        { key: "A", label: "Assume the customers are unintelligent and look for better people to interview", isCorrect: false },
        { key: "B", label: "Log the disconfirming evidence objectively and investigate whether to pivot or narrow the ICP", isCorrect: true },
        { key: "C", label: "Offer them a 90% discount before they leave", isCorrect: false },
      ],
      feedbackCorrect: "Correct. Disconfirming evidence is invaluable because it prevents you from wasting 6 months building the wrong thing.",
      feedbackIncorrect: "Not quite. Negative feedback is high-signal information that saves you time and resources.",
    },
  },
  {
    num: 13,
    title: "Capstone Project",
    shortTitle: "Capstone Project",
    slug: "capstone-project",
    sectionsCount: 4,
    part: "Apply",
    coverColor: "#00419e",
    subs: "Brief · Deliverables · Grading rubric · Submit to Stuckhere",
    lead: "Synthesize everything you've learned into a real-world, verified problem submission that meets Stuckhere's verified intelligence standard.",
    inThisChapter: "Capstone project brief · Required deliverables · Assessment rubric · Submitting for community peer review",
    practicePrompt: "Prepare and submit your verified problem statement to the Stuckhere registry for community scoring.",
    sections: [
      {
        id: "s131",
        sectionNumber: "13.1",
        title: "The Deliverables",
        content: [
          "1. Structured Problem Dossier with complete empirical evidence.",
          "2. Documentation of at least 3 customer discovery interviews with real operators.",
          "3. Pain Score calculation with verified financial or operational loss metrics.",
          "4. Incumbent workaround analysis detailing why existing tools fail.",
        ],
      },
    ],
    quiz: {
      question: "What makes a problem statement ready to be published as a Verified Problem on Stuckhere?",
      options: [
        { key: "A", label: "It contains primary interview notes, quantified loss metrics, and an active workaround", isCorrect: true },
        { key: "B", label: "It has a slick logo and catchy marketing tagline", isCorrect: false },
        { key: "C", label: "It was generated by ChatGPT in 10 seconds", isCorrect: false },
      ],
      feedbackCorrect: "Correct! Only submissions backed by primary empirical evidence earn verified badge credentials.",
      feedbackIncorrect: "Incorrect. Verified status requires primary evidence, documented losses, and observed workarounds.",
    },
  },
  {
    num: 14,
    title: "Appendices",
    shortTitle: "Appendices",
    slug: "appendices",
    sectionsCount: 6,
    part: "Apply",
    coverColor: "#0b6b83",
    subs: "Glossary · Templates · Cheat sheet · Quiz bank · Further reading · FAQ",
    lead: "Reference library containing interview cheat sheets, dossier markdown templates, glossary of terms, and recommended books.",
    inThisChapter: "Glossary of discovery terminology · Markdown templates for dossiers · The Mom Test cheat sheet · Curated reading list",
    practicePrompt: "Bookmark this appendix and download the markdown templates for your next project.",
    sections: [
      {
        id: "s141",
        sectionNumber: "14.1",
        title: "Templates & Resources",
        content: [
          "Downloadable Problem Dossier template in Markdown.",
          "Customer Discovery interview script and question bank.",
          "Pain Score calculation spreadsheet template.",
        ],
      },
    ],
    quiz: {
      question: "Where can you find real-world verified problems to practice your analysis skills on right now?",
      options: [
        { key: "A", label: "The Stuckhere Explore Registry", isCorrect: true },
        { key: "B", label: "Social media video reels", isCorrect: false },
        { key: "C", label: "Generic stock photography sites", isCorrect: false },
      ],
      feedbackCorrect: "Correct! The Stuckhere registry houses real-world verified problems with documented loss metrics and workarounds.",
      feedbackIncorrect: "Incorrect. The Stuckhere Explore Registry contains hundreds of verified real-world opportunities.",
    },
  },
];
