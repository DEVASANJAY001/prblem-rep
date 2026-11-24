export interface ChapterImage {
  url?: string;
  svg?: string;
  caption?: string;
  alt: string;
}

export interface ChapterSection {
  id: string;
  sectionNumber: string;
  title: string;
  content: string[];
  subheading?: string;
  subcontent?: string[];
  image?: ChapterImage;
  table?: {
    headers: string[];
    rows: { label: string; text: string; text2?: string; highlight?: boolean }[];
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
  lead: string;
  inThisChapter?: string;
  practicePrompt?: string;
  sections: ChapterSection[];
  quiz: ChapterQuiz;
  part: string;
  coverColor: string;
}

export interface AcademyPart {
  name: string;
  title?: string;
  meta?: string;
  items?: string;
  startChapter: number;
  endChapter: number;
}

export interface AcademyCourse {
  id: string;
  n: number;
  slug: string;
  title: string;
  level: string;
  live: boolean;
  meta: string;
  chaptersCount: number;
  sectionsCount: number;
  description: string;
  parts: AcademyPart[];
}

export const COURSE_1_PARTS: AcademyPart[] = [
  { name: "All", startChapter: 0, endChapter: 14 },
  {
    name: "Foundations",
    title: "Foundations of Problem Discovery",
    meta: "Chapters 0 to 3 · 4 chapters",
    items: "What a problem is, why startups fail, and how to classify severity.",
    startChapter: 0,
    endChapter: 3,
  },
  {
    name: "Discover",
    title: "Discovery, Interviews & Dossiers",
    meta: "Chapters 4 to 6 · 3 chapters",
    items: "Where to look, how to conduct Mom Test interviews, and building structured dossiers.",
    startChapter: 4,
    endChapter: 6,
  },
  {
    name: "Measure and validate",
    title: "Pain Scoring & Early Validation",
    meta: "Chapters 7 to 10 · 4 chapters",
    items: "Scoring pain mathematically, gathering primary signals, and competitor anatomy.",
    startChapter: 7,
    endChapter: 10,
  },
  {
    name: "Apply",
    title: "Validation Sprints & Submission",
    meta: "Chapters 11 to 14 · 4 chapters",
    items: "Smoke tests, decision gates, Stuckhere submissions, and the 14-day discovery capstone.",
    startChapter: 11,
    endChapter: 14,
  },
];

export const COURSE_2_PARTS: AcademyPart[] = [
  { name: "All", startChapter: 0, endChapter: 17 },
  {
    name: "Foundations",
    title: "Foundations of Market Sizing",
    meta: "Chapters 0 to 3 · 4 chapters",
    items: "Why sizing matters, core TAM/SAM/SOM vocabulary, and the three estimation methods.",
    startChapter: 0,
    endChapter: 3,
  },
  {
    name: "Customer & Pricing",
    title: "Customer Counting & Value-Based Pricing",
    meta: "Chapters 4 to 7 · 4 chapters",
    items: "Defining the buyer triad, official registries, value-based pricing, and ACV/LTV.",
    startChapter: 4,
    endChapter: 7,
  },
  {
    name: "Sizing & Economics",
    title: "Bottom-Up Modeling & Unit Economics",
    meta: "Chapters 8 to 11 · 4 chapters",
    items: "Step-by-step bottom-up TAM, market timing, obtaining SOM, and the 3:1 LTV:CAC ratio.",
    startChapter: 8,
    endChapter: 11,
  },
  {
    name: "Execution & Capstone",
    title: "Scenarios, India Markets & Capstone",
    meta: "Chapters 12 to 17 · 6 chapters",
    items: "Bear/Base/Bull sensitivity, Indian MSME context, 6-box one-pager, and complete capstone.",
    startChapter: 12,
    endChapter: 17,
  },
];

import { COURSE_3_PARTS, COURSE_3_CHAPTERS } from "./course3Data";
import { COURSE_4_PARTS, COURSE_4_CHAPTERS } from "./course4Data";
import { COURSE_5_PARTS, COURSE_5_CHAPTERS } from "./course5Data";
export { COURSE_3_PARTS, COURSE_3_CHAPTERS, COURSE_4_PARTS, COURSE_4_CHAPTERS, COURSE_5_PARTS, COURSE_5_CHAPTERS };

export const ACADEMY_PARTS = COURSE_1_PARTS;

export const ACADEMY_COLORS: Record<string, string> = {
  blue: "#0056d2",
  darkBlue: "#00419e",
  cyan: "#0b6b83",
  indigo: "#3c4a9e",
  emerald: "#0d6832",
  gray: "#5b606b",
  lightBg: "#f5f8ff",
  border: "#dae1ed",
  textPrimary: "#1f1f1f",
  textSecondary: "#3d424d",
};

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: "course-1",
    n: 1,
    slug: "problem-discovery-and-validation",
    title: "Problem Discovery & Validation",
    level: "Beginner",
    live: true,
    meta: "15 chapters · 78 sections",
    chaptersCount: 15,
    sectionsCount: 78,
    description: "From raw friction to a verified, buildable problem. Learn to find, document, score and test problems before you write a line of code.",
    parts: COURSE_1_PARTS,
  },
  {
    id: "course-2",
    n: 2,
    slug: "market-sizing-and-opportunity",
    title: "Market Sizing & Opportunity Analysis",
    level: "Intermediate",
    live: true,
    meta: "18 chapters · 76 sections",
    chaptersCount: 18,
    sectionsCount: 76,
    description: "How big is the problem, and is it worth solving? Sizing TAM, SAM, SOM, bottom-up economics and defensible opportunity analysis.",
    parts: COURSE_2_PARTS,
  },
  {
    id: "course-3",
    n: 3,
    slug: "full-stack-cloud-development",
    title: "Full-Stack Cloud Development",
    level: "Advanced",
    live: true,
    meta: "18 chapters · 99 sections",
    chaptersCount: 18,
    sectionsCount: 99,
    description: "Build, secure, ship and scale the production web solution to a verified problem using React, TypeScript, Firestore, and AI copilots.",
    parts: COURSE_3_PARTS,
  },
  {
    id: "course-4",
    n: 4,
    slug: "solution-design-and-mvp-building",
    title: "Solution Design & MVP Building",
    level: "Builder",
    live: true,
    meta: "18 chapters · 101 sections",
    chaptersCount: 18,
    sectionsCount: 101,
    description: "Turn a validated, sized problem into a tested product people will actually use. Master user flows, rapid prototyping, MVP scoping, pilots, and pitch execution.",
    parts: COURSE_4_PARTS,
  },
  {
    id: "course-5",
    n: 5,
    slug: "ai-for-builders",
    title: "AI for Builders",
    level: "Advanced AI",
    live: true,
    meta: "18 chapters · 101 sections",
    chaptersCount: 18,
    sectionsCount: 101,
    description: "Design, build and ship reliable AI features for real problems. Master prompt engineering, model APIs, RAG, tool calling, evaluation, safety, and agent workflows.",
    parts: COURSE_5_PARTS,
  },
];

export const COURSE_1_CHAPTERS: AcademyChapter[] = [
  {
    "num": 0,
    "title": "Course Overview",
    "shortTitle": "Course Overview",
    "slug": "course-overview",
    "sectionsCount": 3,
    "part": "Foundations",
    "coverColor": "#0056d2",
    "subs": "What this subject covers \u00b7 Who it is for \u00b7 How to use this material",
    "lead": "Reading concise chapters beats watching hours of video. One concept at a time, then test it on real problems in the registry.",
    "inThisChapter": "What this subject covers \u00b7 Who this course is for \u00b7 How to read and apply each chapter",
    "practicePrompt": "Explore three random problem statements from the catalog.",
    "sections": [
      {
        "id": "s01",
        "sectionNumber": "0.1",
        "title": "What this subject covers",
        "content": [
          "Most builders start with a solution and hunt for a problem. This subject teaches the reverse: find a real, painful, recurring problem first, prove it, then build.",
          "By the end of this course, you will be able to spot problems in real workplaces, interview operators without pitching, document a problem as a structured dossier, score pain objectively (0 to 100), and decide whether a problem deserves a software build."
        ],
        "points": [
          {
            "bold": "Spot problems:",
            "text": "Identify active friction in real workplaces and daily workflows."
          },
          {
            "bold": "Interview operators:",
            "text": "Conduct Mom-Test diagnostic interviews without pitching features."
          },
          {
            "bold": "Document dossiers:",
            "text": "Structure observations into empirical, verifiable problem records."
          },
          {
            "bold": "Score pain objectively:",
            "text": "Apply a 4-part weighted formula to calculate Pain Scores from 0 to 100."
          },
          {
            "bold": "Validate before building:",
            "text": "Design cheap experiments and secure commitment before writing code."
          }
        ],
        "image": {
          "url": "/academy/diagrams/discovery-loop.svg",
          "caption": "Figure 0.1: The 8-Step Discovery Loop from raw friction to verified buildable solution hypothesis.",
          "alt": "The 8-Step Discovery Loop Diagram"
        }
      },
      {
        "id": "s02",
        "sectionNumber": "0.2",
        "title": "Who it is for",
        "content": [
          "Engineers, researchers, solo founders, and product builders who want to stop building things nobody uses.",
          "1. Students & Hackathon Teams: Stop building clone apps. Win competitions by starting with a verified, documented pain statement.",
          "2. Early Founders & Indie Builders: Save 6 months of unpaid development by testing willingness-to-pay before writing the first line of code.",
          "3. Domain Practitioners: Doctors, logistics managers, accountants, and educators who want to report their operational pain and collaborate with builders."
        ]
      },
      {
        "id": "s03",
        "sectionNumber": "0.3",
        "title": "How to use this material",
        "content": [
          "Suggested path: 8 to 10 hours total. Read chapters in sequence, or jump directly to the specific technique you need today.",
          "Every chapter follows a four-part format: Concept, Real-World Example, Practical Exercise, and Checkpoint Quiz.",
          "Pair this curriculum with the Stuckhere Problem Hub: when you learn a concept, search the live problem registry to inspect how community founders document real pain."
        ],
        "detailsQuestions": [
          {
            "question": "Do I need coding experience to complete this course?",
            "answer": "No. The entire curriculum focuses on human behaviour, operational workflows, customer interviews, and economic pain measurement."
          },
          {
            "question": "How does this link with the AI Solver Copilot?",
            "answer": "The AI Solver Copilot uses the exact same dossier templates, Pain Score equations, and competitor teardowns taught in this course."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary objective of the Stuckhere Academy course?",
      "options": [
        {
          "key": "A",
          "label": "To teach you how to write Python and React code",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To teach you how to discover and validate high-pain problems worth solving before building",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To show you how to raise venture capital immediately on speculative ideas",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct. The entire academy focuses on discovering and validating high-severity problems before building.",
      "feedbackIncorrect": "Not quite. The course teaches problem discovery, validation, and market sizing."
    }
  },
  {
    "num": 1,
    "title": "Foundations: What Is a Problem?",
    "shortTitle": "What Is a Problem?",
    "slug": "what-is-a-problem",
    "sectionsCount": 4,
    "part": "Foundations",
    "coverColor": "#00419e",
    "subs": "Problem vs idea vs solution \u00b7 Anatomy of a problem statement \u00b7 Statement template \u00b7 Practice",
    "lead": "Most builders start with a solution and go looking for a problem. This chapter gives you the words to tell the two apart.",
    "inThisChapter": "The difference between a problem, an idea and a solution \u00b7 The five parts of a good problem statement \u00b7 A fill-in template \u00b7 Practice",
    "practicePrompt": "Identify five problem statements with verified primary evidence.",
    "sections": [
      {
        "id": "s11",
        "sectionNumber": "1.1",
        "title": "Problem, idea, solution",
        "content": [
          "A problem is a situation where someone's goal is blocked. An idea is a guess about what might help. A solution is something that actually removes the block. People mix them up because ideas arrive faster than understanding."
        ],
        "table": {
          "headers": [
            "Concept",
            "Definition",
            "Example"
          ],
          "rows": [
            {
              "label": "Problem",
              "text": "A blocked goal with measurable consequences. Clinic staff lose 6 hours weekly manually rescheduling doctor appointments.",
              "highlight": true
            },
            {
              "label": "Idea",
              "text": "A speculative guess. Maybe an automated WhatsApp scheduling bot could fix it."
            },
            {
              "label": "Solution",
              "text": "A tested mechanism that proves to eliminate the block. An integrated tool tested with clinic staff that recovers 5.2 hours weekly."
            }
          ]
        },
        "subheading": "The solution-in-disguise trap",
        "subcontent": [
          "\"The problem is that we lack an app\" is not a problem. It is a solution wearing a problem's clothes. Whenever someone says 'the problem is a lack of X', ask what X would enable an operator to accomplish that they cannot do today."
        ],
        "image": {
          "url": "/academy/diagrams/problem-idea-solution.svg",
          "caption": "Figure 1.1: Always separate the verified problem from speculative ideas and tested solutions.",
          "alt": "Problem vs Idea vs Solution Diagram"
        }
      },
      {
        "id": "s12",
        "sectionNumber": "1.2",
        "title": "Anatomy of a good problem statement",
        "content": [
          "Good statements are specific enough that two independent people would picture the exact same situation. Every rigorous problem statement covers five elements:"
        ],
        "points": [
          {
            "bold": "Who faces it:",
            "text": "A specific operational role (e.g. 'Clinic billing coordinators at 3-doctor practices'), never 'everyone' or 'people'."
          },
          {
            "bold": "What happens:",
            "text": "Concrete, observable behaviour you could film with a camera."
          },
          {
            "bold": "When and how often:",
            "text": "The precise triggering cadence (e.g. 'Every Friday afternoon after 3 PM')."
          },
          {
            "bold": "What it costs:",
            "text": "Quantified pain in hours wasted, dollars lost, compliance risks, or customer churn."
          },
          {
            "bold": "What they do today:",
            "text": "The current messy workaround (e.g. spreadsheets, WhatsApp messages, paper logs)."
          }
        ]
      },
      {
        "id": "s13",
        "sectionNumber": "1.3",
        "title": "Problem statement template",
        "content": [
          "Use this standardized fill-in-the-blank template whenever submitting or refining a problem statement:"
        ],
        "templateBox": "[Role] at [type of workplace] struggle to [goal] because [blocker]. It happens [how often] and costs [time, money, risk or stress]. Today they [workaround].",
        "templateComparison": {
          "weak": "Hospitals need better software for managing patients.",
          "strong": "Clinic managers at private pediatric clinics struggle to keep doctor schedules full because no-shows arrive without warning. It happens 4 times daily and costs $1,800/week in vacant doctor hours. Today staff rebuild the schedule manually using a shared spreadsheet."
        }
      },
      {
        "id": "s14",
        "sectionNumber": "1.4",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Pick five frustrations from your own past month of work or study. Rewrite each one using the 5-part template above. Cross out any statement that smuggles in an app or technology solution."
        ],
        "exercisePrompt": "Draft 3 problem statements using the formula and test them against the 'solution-in-disguise' filter.",
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Is 'we need a mobile app for our shop' a problem statement?",
            "answer": "No. It names a solution. Ask what the shop owner cannot do today (e.g. unable to track low inventory after closing)."
          },
          {
            "question": "2. Which of the five parts is missing: 'Nurses struggle with handover notes'?",
            "answer": "How often it happens, what it costs (error rate, time), and what workaround they use today are all missing."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following represents a true problem statement rather than an idea?",
      "options": [
        {
          "key": "A",
          "label": "We should build an Uber for logistics freight",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Cold-chain vaccine shippers lose $42,000 annually per fleet due to uncalibrated temperature logger disconnects",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Blockchain smart contracts will modernize supply chains",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct. Option B specifies the victim, the trigger, and the quantified financial loss.",
      "feedbackIncorrect": "Not quite. Remember that true problems quantify loss rather than proposing speculative technology."
    }
  },
  {
    "num": 2,
    "title": "Why Startups Fail",
    "shortTitle": "Why Startups Fail",
    "slug": "why-startups-fail",
    "sectionsCount": 5,
    "part": "Foundations",
    "coverColor": "#0b6b83",
    "subs": "The 42% failure data \u00b7 Anatomy of a wasted build \u00b7 Case patterns \u00b7 Discovery-first mindset \u00b7 Practice",
    "lead": "CB Insights analyzed over 400 startup post-mortems: the #1 reason startups die (42%) is 'No Market Need'\u2014building something nobody wanted.",
    "inThisChapter": "Post-mortem analysis data \u00b7 The false validation trap \u00b7 The discovery-first mindset \u00b7 Real-world autopsy patterns",
    "practicePrompt": "Review five closed companies on Crunchbase and trace their root cause to unverified assumptions.",
    "sections": [
      {
        "id": "s21",
        "sectionNumber": "2.1",
        "title": "The failure data",
        "content": [
          "Building is intoxicating. Writing code, setting up databases, and picking landing page fonts gives the immediate illusion of productivity. But building without verified pain creates shelfware.",
          "According to empirical post-mortems of failed startups, 42% of startups fail directly because there was no market need. They built a solution for a problem that was either non-existent, too minor to pay for, or already adequately solved by a spreadsheet."
        ],
        "image": {
          "url": "/academy/diagrams/startup-failure-rates.svg",
          "caption": "Figure 2.1: 42% of startups fail from 'No Market Need'\u2014far more than running out of money or competition.",
          "alt": "Startup Failure Reasons Bar Chart"
        }
      },
      {
        "id": "s22",
        "sectionNumber": "2.2",
        "title": "Anatomy of a wasted build",
        "content": [
          "Founder has an idea in the shower \u2192 Writes code for 6 months in isolation \u2192 Launches on Product Hunt \u2192 A few upvotes, zero paying users \u2192 Founders run out of runway or motivation.",
          "The true cost is not just money; it is months of youth, creative energy, and team morale spent building features that solve problems that only existed in the founder's head."
        ],
        "callout": {
          "boldPrefix": "Rule of Thumb.",
          "text": "If you cannot find five operators willing to talk for 20 minutes about their existing workaround, nobody will pay for your software."
        }
      },
      {
        "id": "s23",
        "sectionNumber": "2.3",
        "title": "Four failure case patterns",
        "content": [
          "Study these four recurring failure patterns so you can diagnose your own ideas before coding:"
        ],
        "points": [
          {
            "bold": "Pattern 1: Solution looking for a problem.",
            "text": "E.g. 'Let's put real estate deeds on blockchain.' Cool tech, zero operational buyer urgency."
          },
          {
            "bold": "Pattern 2: Real problem, no budget.",
            "text": "The user is genuinely suffering, but has zero purchasing power (e.g. elementary school teachers paying out of pocket)."
          },
          {
            "bold": "Pattern 3: Real problem, too rare.",
            "text": "Happens once every 3 years. Not worth onboarding new software when a manual email suffices."
          },
          {
            "bold": "Pattern 4: Workaround is good enough.",
            "text": "A free Excel sheet or WhatsApp group solves 80% of the pain without recurring software costs."
          }
        ]
      },
      {
        "id": "s24",
        "sectionNumber": "2.4",
        "title": "The discovery-first mindset",
        "content": [
          "1. Fall in love with the problem, not your solution.",
          "2. Prioritize evidence over opinion: what customers do with their checkbooks matters infinitely more than what they say in a survey.",
          "3. Run cheap tests before expensive builds: interview, shadow, document, and test willingness-to-pay before opening a code editor."
        ]
      },
      {
        "id": "s25",
        "sectionNumber": "2.5",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Pick three failed tech startups from the past 5 years. Categorize their failure into one of the four patterns (Solution looking for problem, No budget, Too rare, or Good-enough workaround)."
        ],
        "detailsQuestions": [
          {
            "question": "Why do friendly user surveys often produce false validation?",
            "answer": "Surveys ask hypothetical future questions ('Would you buy this?'). People are polite and say yes. Only past behaviour and current workarounds prove genuine demand."
          }
        ]
      }
    ],
    "quiz": {
      "question": "According to empirical startup post-mortems, what is the single most common cause of early-stage company failure?",
      "options": [
        {
          "key": "A",
          "label": "Running out of cash due to high marketing spend",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "No market need (building something nobody actually needs)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Technical scalability failures and database outages",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! 42% of startups fail simply because they build products for non-existent or low-priority problems.",
      "feedbackIncorrect": "Incorrect. The leading cause is building products nobody actually wants or is willing to pay for."
    }
  },
  {
    "num": 3,
    "title": "Vitamin, Painkiller, Surgery",
    "shortTitle": "Vitamin, Painkiller, Surgery",
    "slug": "vitamin-painkiller-surgery",
    "sectionsCount": 4,
    "part": "Foundations",
    "coverColor": "#3c4a9e",
    "subs": "Triage framework \u00b7 Telling them apart \u00b7 Choosing for your context \u00b7 Practice",
    "lead": "Before you build anything, decide how badly people need it fixed. Every problem sits somewhere between nice to have and cannot ignore.",
    "inThisChapter": "The triage framework \u00b7 Telling vitamins from painkillers \u00b7 Selecting the right depth for your resources \u00b7 Check yourself",
    "practicePrompt": "Practice: triage ten problems from the registry into Vitamin, Painkiller, or Surgery.",
    "sections": [
      {
        "id": "s31",
        "sectionNumber": "3.1",
        "title": "The triage framework",
        "content": [
          "Every problem sits somewhere between nice to have and cannot ignore. Three labels make that visible."
        ],
        "table": {
          "headers": [
            "Category",
            "Urgency",
            "Buyer Reaction",
            "Example"
          ],
          "rows": [
            {
              "label": "Vitamin",
              "text": "Low urgency. People say 'that would be cool' and never use or pay for it. Casual habit-tracking apps."
            },
            {
              "label": "Painkiller",
              "text": "Urgent, recurring, felt daily. People already hack manual workarounds or pay overtime. Clinic no-show recovery.",
              "highlight": true
            },
            {
              "label": "Surgery",
              "text": "Critical, existential stakes. Core infrastructure replacement. Hospital Electronic Health Record migration."
            }
          ]
        },
        "image": {
          "url": "/academy/diagrams/triage-matrix.svg",
          "caption": "Figure 3.1: The Triage Matrix. Target Painkillers for fast validation and early revenue.",
          "alt": "Problem Triage Matrix Diagram"
        }
      },
      {
        "id": "s32",
        "sectionNumber": "3.2",
        "title": "Telling them apart",
        "content": [
          "Look for spreadsheets, paper registers and WhatsApp groups holding a process together. A workaround is concrete evidence of pain. If nobody has bothered to patch it, it is probably a vitamin."
        ],
        "points": [
          {
            "bold": "Signals of a painkiller:",
            "text": "People already pay for partial fixes, complain loudly during shifts, or assign dedicated staff to manual reconciliation."
          },
          {
            "bold": "Signals of a vitamin:",
            "text": "Prospects smile, say 'we could see ourselves using that', but never follow up or allocate budget."
          },
          {
            "bold": "Signals of surgery:",
            "text": "Heavy regulatory compliance (HIPAA, SOC2, FDA), requires enterprise committee sign-off, and carries massive replacement risk."
          }
        ]
      },
      {
        "id": "s33",
        "sectionNumber": "3.3",
        "title": "Choosing for your context",
        "content": [
          "Hackathon teams need fast, demo-able painkillers where the friction and solution can be demonstrated in 3 minutes.",
          "Solo founders do best with painkiller problems that carry low compliance hurdles and fast feedback loops (e.g. small business workflows).",
          "Well-funded teams can afford to take on surgery problems where enterprise contracts justify 9-month procurement cycles."
        ]
      },
      {
        "id": "s34",
        "sectionNumber": "3.4",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Open the Stuckhere Problem Registry. Find 5 problems and classify each into Vitamin, Painkiller, or Surgery. Justify your classification based on existing workarounds."
        ],
        "detailsQuestions": [
          {
            "question": "Why is a messy Excel sheet often the best signal of a painkiller problem?",
            "answer": "Because someone took hours out of their busy schedule to build and maintain a custom workaround without being forced to. That proves active, recurring pain."
          }
        ]
      }
    ],
    "quiz": {
      "question": "A regional dental clinic pays staff 8 hours of overtime every Friday to manually reconcile insurance payments. Which category is this?",
      "options": [
        {
          "key": "A",
          "label": "Vitamin (a nice-to-have cosmetic upgrade)",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Painkiller (active recurring financial and operational pain)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Surgery (organization-wide existential transformation)",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! They are already actively bleeding cash and time every single week, proving an acute painkiller need.",
      "feedbackIncorrect": "Not quite. Because they are already spending cash on overtime, it is a classic painkiller problem."
    }
  },
  {
    "num": 4,
    "title": "Where to Find Real Problems",
    "shortTitle": "Where to Find Real Problems",
    "slug": "where-to-find-problems",
    "sectionsCount": 6,
    "part": "Discover",
    "coverColor": "#0056d2",
    "subs": "Lived experience \u00b7 Observing work \u00b7 Industry domains \u00b7 Online sources \u00b7 Using the Problem Hub \u00b7 Practice",
    "lead": "The most lucrative problems aren't discussed on Twitter or TechCrunch. They live inside unglamorous back-offices, supply warehouses, and regulatory filing desks.",
    "inThisChapter": "First-hand friction \u00b7 Shadowing professionals \u00b7 B2B trade forums \u00b7 Mining 1-star reviews \u00b7 The Stuckhere Registry",
    "practicePrompt": "Spend 2 hours shadowing an operator or read 20 detailed reviews on G2/Capterra for B2B tools in logistics.",
    "sections": [
      {
        "id": "s41",
        "sectionNumber": "4.1",
        "title": "Lived experience and annoyance journals",
        "content": [
          "The best problems come from work you or someone close to you actually did for 40 hours a week.",
          "Keep an 'Annoyance Journal': for 7 days, log every moment you sigh, open a spreadsheet, copy-paste across tabs, or wait for someone to email you a report."
        ]
      },
      {
        "id": "s42",
        "sectionNumber": "4.2",
        "title": "Observing work and workarounds",
        "content": [
          "Shadowing an operator for half a day beats 100 brainstorming sessions. Look for physical notes taped to monitors, Excel files with 30 tabs named 'MASTER_V4_FINAL.xlsx', and WhatsApp groups used for shift handovers.",
          "Every workaround is an unpaid software product holding a broken workflow together."
        ]
      },
      {
        "id": "s43",
        "sectionNumber": "4.3",
        "title": "High-friction industry domains",
        "content": [
          "Frontier industries with acute operational pain:"
        ],
        "points": [
          {
            "bold": "Healthcare & Clinics:",
            "text": "Doctor no-shows, medical equipment calibration logs, insurance pre-authorizations."
          },
          {
            "bold": "Logistics & Dispatch:",
            "text": "Cold-chain temperature logging, driver detention time disputes, gate check-in delays."
          },
          {
            "bold": "Manufacturing & Factory Floors:",
            "text": "Spare parts inventory stockouts, manual shift maintenance checklists, shift change handovers."
          },
          {
            "bold": "Accounting & Small Business:",
            "text": "Vendor GST reconciliation, paper invoice scanning, late payment chase sequences."
          }
        ]
      },
      {
        "id": "s44",
        "sectionNumber": "4.4",
        "title": "Online and data sources",
        "content": [
          "1. 1-Star & 2-Star Software Reviews: Filter G2, Capterra, or Trustpilot for enterprise tools to see repeated customer complaints.",
          "2. Specialized Trade Subreddits: Browse r/logistics, r/accounting, r/nursing for weekly rants about software that fails them.",
          "3. Job Posts as Hidden Problems: When a company hires three junior coordinators to 'manually verify invoices', they are publishing an automated workflow RFP."
        ]
      },
      {
        "id": "s45",
        "sectionNumber": "4.5",
        "title": "Using the Stuckhere Problem Hub",
        "content": [
          "The Stuckhere Explore registry catalogs verified, peer-reviewed problem statements submitted by industry operators across 140+ sectors.",
          "Read problem dossiers, upvote validated issues, and inspect the verified evidence submitted by domain practitioners."
        ],
        "callout": {
          "boldPrefix": "On Stuckhere.",
          "text": "Browse problems submitted directly by domain specialists across 140+ industries.",
          "linkUrl": "/explore",
          "linkText": "Explore verified industries"
        }
      },
      {
        "id": "s46",
        "sectionNumber": "4.6",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Create an Annoyance Journal entry with 10 operational frictions you observe this week. Rank them by frequency."
        ],
        "detailsQuestions": [
          {
            "question": "Why are sticky notes on an office monitor a positive signal for software founders?",
            "answer": "They indicate that the official software has missing functionality or poor UX, forcing the operator to create a physical cheat sheet."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Where is an aspiring B2B founder most likely to find an acute, unaddressed workflow problem?",
      "options": [
        {
          "key": "A",
          "label": "In the comments section of viral consumer social apps",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "By shadowing clinic billing coordinators or warehouse shipping managers during peak operations",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "By brainstorming in a coffee shop with other developers",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct. Shadowing operational workflows reveals the silent workarounds people perform every day.",
      "feedbackIncorrect": "Incorrect. Real problems hide in everyday operational friction, not casual brainstorming."
    }
  },
  {
    "num": 5,
    "title": "Customer Discovery Interviews",
    "shortTitle": "Customer Discovery Interviews",
    "slug": "customer-discovery-interviews",
    "sectionsCount": 7,
    "part": "Discover",
    "coverColor": "#00419e",
    "subs": "Why interviews \u00b7 Mom Test principles \u00b7 Preparing \u00b7 Five core questions \u00b7 Running the conversation \u00b7 After the interview \u00b7 Practice",
    "lead": "Customer interviews are not sales pitches. The moment you mention your product idea, the customer stops giving you truth and starts giving you politeness.",
    "inThisChapter": "The Mom Test framework \u00b7 The 5 diagnostic questions \u00b7 How to avoid leading questions \u00b7 Turning notes into empirical evidence",
    "practicePrompt": "Conduct two 15-minute diagnostic conversations without ever mentioning your idea.",
    "sections": [
      {
        "id": "s51",
        "sectionNumber": "5.1",
        "title": "Why interviews beat surveys at this stage",
        "content": [
          "Surveys give shallow data over broad samples. At the problem discovery stage, you need deep, forensic qualitative evidence.",
          "People lie politely on surveys about what they might do in the future. In an interview, you can anchor them to what they actually did last Tuesday."
        ]
      },
      {
        "id": "s52",
        "sectionNumber": "5.2",
        "title": "The Mom Test principles",
        "content": [
          "Based on Rob Fitzpatrick's 'The Mom Test': frame conversations so that even your mother cannot lie to you to protect your feelings."
        ],
        "points": [
          {
            "bold": "Talk about their life, not your idea:",
            "text": "Never pitch your solution. Keep the spotlight 100% on their workflow."
          },
          {
            "bold": "Ask about the past, not hypotheticals:",
            "text": "'When was the last time this happened?' vs 'Would you like a feature that...'."
          },
          {
            "bold": "Seek specifics, not opinions:",
            "text": "Ask for exact numbers, dates, hours, and software screenshots."
          },
          {
            "bold": "Listen 80%, speak 20%:",
            "text": "Embrace uncomfortable silences so the customer fills the void with raw truth."
          }
        ],
        "image": {
          "url": "/academy/diagrams/mom-test-questions.svg",
          "caption": "Figure 5.1: The Mom Test Rule. Avoid hypothetical leading questions; anchor exclusively to past actions.",
          "alt": "Mom Test Good vs Bad Questions"
        }
      },
      {
        "id": "s53",
        "sectionNumber": "5.3",
        "title": "Preparing the interview guide",
        "content": [
          "Aim for 5 to 10 interviews with practitioners who currently execute the workflow. Keep your interview guide to a single index card with five core diagnostic questions."
        ]
      },
      {
        "id": "s54",
        "sectionNumber": "5.4",
        "title": "The five core diagnostic questions",
        "content": [
          "Memorize and deploy these five questions in order:",
          "1. \"Walk me through the last time [event X] happened.\" (Anchors to concrete facts)",
          "2. \"What did you do about it?\" (Reveals their actual current workaround)",
          "3. \"What did that cost you in time, money or stress?\" (Quantifies pain severity)",
          "4. \"What have you tried or paid for in the past to fix this?\" (Tests commercial motivation)",
          "5. \"Who else in your industry deals with this?\" (Expands your discovery network)"
        ]
      },
      {
        "id": "s55",
        "sectionNumber": "5.5",
        "title": "Running the conversation and handling fluff",
        "content": [
          "When an interviewee says 'Oh that would be awesome!', deflect compliments immediately: 'Compliments are nice, but what specifically failed the last time you tried software for this?'",
          "Never defend your idea. If they tell you something that contradicts your thesis, celebrate: you just saved 3 months of writing useless code."
        ]
      },
      {
        "id": "s56",
        "sectionNumber": "5.6",
        "title": "After the interview: coding notes and patterns",
        "content": [
          "Transcribe quotes immediately within 30 minutes of the call. Code for three signals: Direct Quotes, Quantified Losses ($ or hours), and Existing Workarounds.",
          "When you interview 5 operators and begin anticipating their exact answers before they finish speaking, you have reached saturation."
        ]
      },
      {
        "id": "s57",
        "sectionNumber": "5.7",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Conduct two 15-minute diagnostic conversations with someone in your network who works in operations. Use only the 5 diagnostic questions without ever pitching."
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following is a Mom-Test-compliant customer interview question?",
      "options": [
        {
          "key": "A",
          "label": "\"Would you pay $50/month for an automated scheduling bot?\"",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "\"Can you walk me through what happened the last time a patient didn't show up?\"",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "\"Don't you agree that hospital EHR systems are clunky?\"",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Asking about the last time an event occurred grounds the answer in observable historical reality.",
      "feedbackIncorrect": "Not quite. Questions asking for hypothetical future opinions or leading agreement produce false validation."
    }
  },
  {
    "num": 6,
    "title": "The Problem Dossier",
    "shortTitle": "The Problem Dossier",
    "slug": "the-problem-dossier",
    "sectionsCount": 5,
    "part": "Discover",
    "coverColor": "#0b6b83",
    "subs": "Why structure matters \u00b7 Dossier sections \u00b7 Writing rules \u00b7 Worked example \u00b7 Practice",
    "lead": "Loose thoughts don't survive contact with reality. A structured Problem Dossier forces rigor onto every assumption.",
    "inThisChapter": "Dossier structure \u00b7 Operational narrative \u00b7 Incumbent workarounds \u00b7 Quantified loss metrics \u00b7 Stuckhere standard template",
    "practicePrompt": "Draft a complete 1-page Problem Dossier for a problem you encountered this week.",
    "sections": [
      {
        "id": "s61",
        "sectionNumber": "6.1",
        "title": "Why structure matters",
        "content": [
          "Unstructured ideas sound great at happy hour but crumble under analysis. A standardized Problem Dossier allows investors, engineers, and customers to evaluate friction objectively."
        ]
      },
      {
        "id": "s62",
        "sectionNumber": "6.2",
        "title": "The seven dossier sections",
        "content": [
          "Every verified Stuckhere dossier contains these standardized sections:"
        ],
        "points": [
          {
            "bold": "1. Core Issue:",
            "text": "One sentence naming the blocked goal and immediate consequence."
          },
          {
            "bold": "2. Trigger & Timing:",
            "text": "When and how frequently the friction occurs."
          },
          {
            "bold": "3. Victim Role:",
            "text": "Exact job title and company profile facing the issue."
          },
          {
            "bold": "4. Operational Frustration:",
            "text": "Step-by-step narrative of what breaks."
          },
          {
            "bold": "5. Incumbent Workarounds:",
            "text": "Current manual process, tools, spreadsheets, or third-party hacks."
          },
          {
            "bold": "6. Supporting Evidence:",
            "text": "Audit reports, photos, screenshots, or interview transcripts."
          },
          {
            "bold": "7. Key Loss Metrics:",
            "text": "Dollars lost, hours wasted, error percentages, or safety risks."
          }
        ],
        "image": {
          "url": "/academy/diagrams/dossier-architecture.svg",
          "caption": "Figure 6.1: The 7 Pillars of a verified Problem Dossier.",
          "alt": "Problem Dossier Architecture"
        }
      },
      {
        "id": "s63",
        "sectionNumber": "6.3",
        "title": "Writing quality rules",
        "content": [
          "Rule 1: Be quantified. 'Loses time' is rejected; 'Loses 4.5 hours per week per clinic' is accepted.",
          "Rule 2: Zero solutions allowed in problem dossiers. If you write 'they need an AI dashboard', your dossier will be rejected.",
          "Rule 3: Protect proprietary data and individual privacy. Sanitize patient health info, employee names, and confidential enterprise credentials."
        ]
      },
      {
        "id": "s64",
        "sectionNumber": "6.4",
        "title": "Worked example: raw complaint vs. finished dossier",
        "content": [
          "Raw complaint: 'Our medical clinic has a terrible scheduling system and patients hate waiting.'",
          "Finished dossier: 'Front-desk coordinators at 4-provider cardiology clinics experience 14% same-day appointment cancellations without automated notification. This leaves doctors idle for 3.2 billable hours weekly ($960 loss per provider/week). Staff currently maintain duplicate entries across an on-premise desktop scheduler and paper cancellation clipboards.'"
        ]
      },
      {
        "id": "s65",
        "sectionNumber": "6.5",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Take one problem from your work or university. Draft all 7 sections of a complete Problem Dossier."
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary role of the 'Incumbent Workaround' section in a Problem Dossier?",
      "options": [
        {
          "key": "A",
          "label": "To show what software your competitors are raising funding for",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To prove that operators care enough about the friction to spend time or money patching it today",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To list patents that might block your product",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! The existing workaround is the single most definitive proof of genuine problem severity.",
      "feedbackIncorrect": "Incorrect. Workarounds demonstrate that the customer is already active and desperate for a fix."
    }
  },
  {
    "num": 7,
    "title": "Measuring Pain",
    "shortTitle": "Measuring Pain",
    "slug": "measuring-pain",
    "sectionsCount": 6,
    "part": "Measure and validate",
    "coverColor": "#3c4a9e",
    "subs": "Why measure \u00b7 10-point diagnostic \u00b7 Pain Score formula \u00b7 Worked calculation \u00b7 Limits \u00b7 Practice",
    "lead": "Not all problems are created equal. Quantifying friction into an objective Pain Score (0-100) lets you rank opportunities dispassionately.",
    "inThisChapter": "The Stuckhere Pain Score formula \u00b7 Frequency, Financial impact, Workaround cost, Urgency \u00b7 Benchmark calculations",
    "practicePrompt": "Calculate the Pain Score for three problems in the Stuckhere registry using the interactive formula.",
    "sections": [
      {
        "id": "s71",
        "sectionNumber": "7.1",
        "title": "Why measure pain",
        "content": [
          "Founders often pick problems based on personal excitement rather than commercial severity. An objective score eliminates founder bias and ranks opportunities by willingness-to-pay."
        ]
      },
      {
        "id": "s72",
        "sectionNumber": "7.2",
        "title": "The 10-point diagnostic",
        "content": [
          "Evaluate 10 diagnostic questions covering four dimensions: Recurrence Frequency (how often), Economic Severity (how expensive), Workaround Inefficiency (how broken the patch is), and Switching Urgency (how fast they need a fix)."
        ]
      },
      {
        "id": "s73",
        "sectionNumber": "7.3",
        "title": "The Pain Score formula (0 to 100)",
        "content": [
          "The Stuckhere Pain Score evaluates four weighted pillars:"
        ],
        "points": [
          {
            "bold": "Recurrence Frequency (30% weight):",
            "text": "Daily = 100, Weekly = 75, Monthly = 40, Rare/Annual = 10."
          },
          {
            "bold": "Economic Severity (30% weight):",
            "text": "Direct cash burn, billable labor lost, or compliance penalty."
          },
          {
            "bold": "Workaround Inefficiency (25% weight):",
            "text": "How fragile, slow, or error-prone the current patch is."
          },
          {
            "bold": "Switching Urgency (15% weight):",
            "text": "Regulatory deadline, immediate audit risk, or burning operational bottleneck."
          }
        ],
        "image": {
          "url": "/academy/diagrams/pain-score-formula.svg",
          "caption": "Figure 7.1: The weighted equation used by Stuckhere to evaluate problem commercial viability.",
          "alt": "Pain Score Equation Breakdown"
        }
      },
      {
        "id": "s74",
        "sectionNumber": "7.4",
        "title": "Worked calculation",
        "content": [
          "Case Study: Clinic doctor schedule rebuilding.",
          "\u2022 Frequency: Daily recurrence = 95/100 (weighted: 28.5)",
          "\u2022 Economic Loss: $1,800/week in vacant doctor hours = 85/100 (weighted: 25.5)",
          "\u2022 Workaround: Fragile manual spreadsheet = 80/100 (weighted: 20.0)",
          "\u2022 Urgency: High burnout risk among staff = 70/100 (weighted: 10.5)",
          "Total Pain Score: 28.5 + 25.5 + 20.0 + 10.5 = 84.5 / 100 (Critical Opportunity Tier)."
        ]
      },
      {
        "id": "s75",
        "sectionNumber": "7.5",
        "title": "Limits of the score",
        "content": [
          "Be aware of self-report bias: operators occasionally exaggerate emotional frustration. Always cross-check qualitative claims against audited financials and actual timestamps."
        ]
      },
      {
        "id": "s76",
        "sectionNumber": "7.6",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Calculate the Pain Score for three different problems in the Stuckhere Explore registry and compare your results."
        ]
      }
    ],
    "quiz": {
      "question": "Which component of the Pain Score carries the heaviest combined weight in determining commercial viability?",
      "options": [
        {
          "key": "A",
          "label": "Social media buzz and hashtag volume",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Recurrence Frequency and Quantified Economic Loss (each 30%, totaling 60%)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "The aesthetic complexity of the user interface",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct. Recurrence Frequency and Economic Loss form 60% of the score and drive enterprise willingness to pay.",
      "feedbackIncorrect": "Incorrect. Quantified financial loss and daily recurrence are the primary drivers of purchase decisions."
    }
  },
  {
    "num": 8,
    "title": "Validation: Evidence and Signals",
    "shortTitle": "Validation Signals",
    "slug": "validation-signals",
    "sectionsCount": 7,
    "part": "Measure and validate",
    "coverColor": "#0056d2",
    "subs": "What validation means \u00b7 Community signals \u00b7 Behavioural signals \u00b7 Commitment signals \u00b7 Experiments \u00b7 Decisions \u00b7 Practice",
    "lead": "Validation isn't a badge or an upvote. It is a hierarchy of evidence that culminates in cold, hard customer commitment.",
    "inThisChapter": "The Evidence Ladder \u00b7 Community upvotes vs actual validation \u00b7 Pilot agreements & Letters of Intent \u00b7 Lightweight experiments",
    "practicePrompt": "Design a $0 validation experiment with a defined quantifiable stop/pivot threshold.",
    "sections": [
      {
        "id": "s81",
        "sectionNumber": "8.1",
        "title": "What validation means: the evidence ladder",
        "content": [
          "Problem validation confirms that the friction is real and urgent. Solution validation confirms that your specific proposed mechanism relieves it.",
          "Move up the Evidence Ladder: from cheap opinions to active behaviour, and finally to hard financial commitment."
        ],
        "image": {
          "url": "/academy/diagrams/evidence-ladder.svg",
          "caption": "Figure 8.1: Never mistake Step 1 (Opinions) for Step 4 (Actual Financial Commitment).",
          "alt": "The Evidence Ladder"
        }
      },
      {
        "id": "s82",
        "sectionNumber": "8.2",
        "title": "Community signals on Stuckhere",
        "content": [
          "On Stuckhere, track three distinct signals:",
          "\u2022 'I face this' votes: Domain practitioners affirming they experience the friction.",
          "\u2022 'I'd build this' votes: Engineers indicating interest in solving it.",
          "\u2022 Pilot offers: Companies requesting pilot trials for their operational teams."
        ]
      },
      {
        "id": "s83",
        "sectionNumber": "8.3",
        "title": "Behavioural signals",
        "content": [
          "Existing spend on workarounds is the single greatest predictor of future revenue. If they spend $500/month on manual temp workers, you know a $200/month software solution has budget headroom."
        ]
      },
      {
        "id": "s84",
        "sectionNumber": "8.4",
        "title": "Commitment signals: LOIs and deposits",
        "content": [
          "A Letter of Intent (LOI) states: 'If Company X builds a tool that achieves metric Y within 60 days, we agree to pilot for $Z/month.'",
          "An LOI or a $100 refundable pre-order deposit eliminates 99% of false positive survey responses."
        ]
      },
      {
        "id": "s85",
        "sectionNumber": "8.5",
        "title": "Lightweight validation experiments",
        "content": [
          "1. Concierge MVP: Perform the entire service manually behind the scenes. Prove value before automating with code.",
          "2. Wizard-of-Oz: Build a simple UI where the backend is human operators completing tasks.",
          "3. Landing Page Test with clear call-to-action: Measure actual email submissions or schedule requests."
        ]
      },
      {
        "id": "s86",
        "sectionNumber": "8.6",
        "title": "Go, Pivot, or Stop decisions",
        "content": [
          "Always set quantitative kill-criteria before running an experiment. E.g. 'If fewer than 3 of 10 interviewed clinic managers agree to review prototype wireframes, we STOP and pivot.'"
        ]
      },
      {
        "id": "s87",
        "sectionNumber": "8.7",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Draft a 1-page Letter of Intent (LOI) template for your chosen problem with clear performance criteria."
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following is the strongest proof of problem validation?",
      "options": [
        {
          "key": "A",
          "label": "500 upvotes on a social media post praising your concept",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Two operations managers signing a Letter of Intent to pilot for $300/mo if the tool meets success criteria",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A positive email from a business school professor",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Signed commercial intent and budget allocation are the definitive gold standard.",
      "feedbackIncorrect": "Not quite. Upvotes and compliments cost nothing; signed commitments prove real demand."
    }
  },
  {
    "num": 9,
    "title": "Workarounds and Competitor Analysis",
    "shortTitle": "Workarounds & Competitors",
    "slug": "workarounds-and-competitors",
    "sectionsCount": 5,
    "part": "Measure and validate",
    "coverColor": "#00419e",
    "subs": "Real competitor is workaround \u00b7 Mapping landscape \u00b7 Competitor teardown \u00b7 Why solutions fail \u00b7 Practice",
    "lead": "Your primary competitor is almost never another startup. It is the messy Excel spreadsheet, WhatsApp group, or manual phone call people use today.",
    "inThisChapter": "Incumbent workaround analysis \u00b7 Direct vs indirect competitors \u00b7 Mining competitor negative reviews \u00b7 Finding whitespaces",
    "practicePrompt": "Construct a 4x4 Competitor Matrix featuring incumbent software, spreadsheets, and manual labor.",
    "sections": [
      {
        "id": "s91",
        "sectionNumber": "9.1",
        "title": "The real competitor is the current workaround",
        "content": [
          "When founders say 'we have no competitors', it almost always means there is no problem.",
          "If people aren't currently hacking a solution with Google Sheets, WhatsApp, paper registers, or manual phone calls, the friction is not severe enough to change habits."
        ]
      },
      {
        "id": "s92",
        "sectionNumber": "9.2",
        "title": "Mapping the competitive landscape",
        "content": [
          "Map competitors across three buckets:",
          "1. Direct competitors: Companies offering modern software addressing the exact workflow.",
          "2. Indirect competitors: Legacy enterprise ERPs (SAP, Oracle) that claim to solve it but are too clunky.",
          "3. Inertia & Workarounds: The current spreadsheet and manual staff effort."
        ]
      },
      {
        "id": "s93",
        "sectionNumber": "9.3",
        "title": "Competitor teardown and negative review mining",
        "content": [
          "Read 1-star and 2-star reviews of existing solutions on G2 and Capterra. Look for repeated complaints: 'Requires 4 months of training', 'Crashes on mobile', 'Costs $20,000 upfront'.",
          "Your entry wedge is the specific friction point that existing incumbents refuse or fail to solve."
        ]
      },
      {
        "id": "s94",
        "sectionNumber": "9.4",
        "title": "Why existing solutions fail",
        "content": [
          "Incumbents fail for predictable reasons: bloated feature sets, extortionate pricing models that exclude small clinics, or interfaces built for management reporting rather than frontline staff productivity."
        ]
      },
      {
        "id": "s95",
        "sectionNumber": "9.5",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Build a 4-column competitor comparison table (Direct, Legacy, Spreadsheets, Your Thesis) for your target problem."
        ]
      }
    ],
    "quiz": {
      "question": "If a founder claims 'our startup has literally zero competitors in the market', what is usually true?",
      "options": [
        {
          "key": "A",
          "label": "The founder has found a once-in-a-generation blue ocean monopoly",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The problem either does not exist, or the founder failed to recognize that existing workarounds (like Excel) are the competitor",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "The market is too crowded to name everyone",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! In 99% of cases, 'no competitors' means there is no customer pain or the founder missed the spreadsheet workaround.",
      "feedbackIncorrect": "Incorrect. Every real problem has existing workarounds that customers are using right now."
    }
  },
  {
    "num": 10,
    "title": "Sizing the Opportunity",
    "shortTitle": "Sizing the Opportunity",
    "slug": "sizing-the-opportunity",
    "sectionsCount": 6,
    "part": "Measure and validate",
    "coverColor": "#0b6b83",
    "subs": "Why size \u00b7 Top-down vs bottom-up \u00b7 TAM, SAM, SOM \u00b7 Willingness to pay \u00b7 Worked example \u00b7 Practice",
    "lead": "Is the prize worth the effort? Market sizing isn't for pitching VCs; it is for deciding whether you should dedicate the next 3 years of your life to this problem.",
    "inThisChapter": "Top-down vs bottom-up modeling \u00b7 TAM SAM SOM in plain language \u00b7 Calculating willingness-to-pay from savings",
    "practicePrompt": "Calculate the bottom-up TAM for your target problem using verified business counts.",
    "sections": [
      {
        "id": "s101",
        "sectionNumber": "10.1",
        "title": "Why size a problem",
        "content": [
          "A problem can be intensely painful to one clinic manager, but if only 40 such clinics exist in your country, it is a consulting gig, not a scalable venture.",
          "Market sizing verifies that enough potential customers exist with identical pain to justify building software."
        ]
      },
      {
        "id": "s102",
        "sectionNumber": "10.2",
        "title": "Top-down vs. bottom-up sizing",
        "content": [
          "Avoid top-down 'Gartner estimates the healthcare market is $3 Trillion and if we get 1%...' This is fantasy math.",
          "Use bottom-up calculations: Number of Customers \u00d7 Price per Year \u00d7 Purchase Frequency."
        ]
      },
      {
        "id": "s103",
        "sectionNumber": "10.3",
        "title": "TAM, SAM, SOM in plain language",
        "content": [
          "Demystifying the three acronyms:"
        ],
        "points": [
          {
            "bold": "TAM (Total Addressable Market):",
            "text": "Every business on earth that could ever experience this problem."
          },
          {
            "bold": "SAM (Serviceable Addressable Market):",
            "text": "The segment that fits your specific target geography and scale (e.g. pediatric clinics with 2-5 doctors in Tier 1 & 2 cities)."
          },
          {
            "bold": "SOM (Serviceable Obtainable Market):",
            "text": "The realistic slice you can capture in Year 1 with your direct sales reach (e.g. 50 clinics)."
          }
        ],
        "image": {
          "url": "/academy/diagrams/tam-sam-som.svg",
          "caption": "Figure 10.1: Concentric TAM SAM SOM Market Sizing Model.",
          "alt": "TAM SAM SOM Sizing Model"
        }
      },
      {
        "id": "s104",
        "sectionNumber": "10.4",
        "title": "Willingness to pay (WTP)",
        "content": [
          "Price against value delivered, not server hosting costs. If your tool recovers $1,800/month of lost doctor billing, charging $200/month is a no-brainer 9x ROI for the clinic owner."
        ]
      },
      {
        "id": "s105",
        "sectionNumber": "10.5",
        "title": "Worked example: bottom-up clinic TAM",
        "content": [
          "8,500 target clinics in region \u00d7 $2,400 annual subscription = $20,400,000 Serviceable Addressable Market."
        ]
      },
      {
        "id": "s106",
        "sectionNumber": "10.6",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Calculate the bottom-up TAM, SAM, and Year-1 SOM for your problem thesis."
        ]
      }
    ],
    "quiz": {
      "question": "Which market sizing approach is considered rigorous and credible by serious builders and investors?",
      "options": [
        {
          "key": "A",
          "label": "Top-down: 'Global healthcare is $4T, so 1% is $40B'",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Bottom-up: Number of verified target customers \u00d7 Annual price anchored in savings",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Copying venture capital fundraising pitch decks from different industries",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Bottom-up unit economics anchored in verified customer counts provide defensible numbers.",
      "feedbackIncorrect": "Not quite. Top-down percentages are speculative; bottom-up math is grounded in reality."
    }
  },
  {
    "num": 11,
    "title": "Problem to Solution Hypothesis",
    "shortTitle": "Solution Hypothesis",
    "slug": "solution-hypothesis",
    "sectionsCount": 6,
    "part": "Apply",
    "coverColor": "#3c4a9e",
    "subs": "Ideal customer profile \u00b7 Hypothesis statement \u00b7 Scoping smallest test \u00b7 14-day sprint \u00b7 Pilot outreach \u00b7 Practice",
    "lead": "You've proven the problem exists. Now formulate a crisp testable hypothesis and launch a rapid 14-day discovery-to-pilot sprint.",
    "inThisChapter": "Defining the ICP \u00b7 The formal Solution Hypothesis formula \u00b7 Minimum viable workflow \u00b7 14-day sprint roadmap",
    "practicePrompt": "Write a 1-sentence solution hypothesis and draft a 14-day sprint execution plan.",
    "sections": [
      {
        "id": "s111",
        "sectionNumber": "11.1",
        "title": "Defining the Ideal Customer Profile (ICP)",
        "content": [
          "Separate the Pain Sufferer from the Economic Buyer. A clinic nurse suffers from scheduling chaos, but the Managing Partner doctor holds the credit card.",
          "Define role, company size, existing software stack, and geographic location."
        ]
      },
      {
        "id": "s112",
        "sectionNumber": "11.2",
        "title": "Writing a solution hypothesis",
        "content": [
          "State your thesis with scientific precision using this standard formulation:"
        ],
        "templateBox": "We believe [specific customer ICP] will [observable new behaviour / adoption] when provided with [minimal solution mechanism], achieving [quantified outcome metric], because [empirical interview evidence]."
      },
      {
        "id": "s113",
        "sectionNumber": "11.3",
        "title": "Scoping the smallest test (Minimum Viable Workflow)",
        "content": [
          "Do not build user authentication, billing systems, dark mode, or admin settings in week one. Build only the single core interaction that removes the blocker."
        ]
      },
      {
        "id": "s114",
        "sectionNumber": "11.4",
        "title": "The 14-day discovery sprint",
        "content": [
          "A structured roadmap to go from verified problem to active pilot:"
        ],
        "points": [
          {
            "bold": "Days 1 to 3: Problem Lock.",
            "text": "Complete 5 interviews and finalize the Problem Dossier."
          },
          {
            "bold": "Days 4 to 7: Wireframes & Concierge Workflow.",
            "text": "Create clickable wireframes or run manual pilot."
          },
          {
            "bold": "Days 8 to 11: Real User Pilot.",
            "text": "Deploy lightweight test with 2 initial target operators."
          },
          {
            "bold": "Days 12 to 14: Learnings & Pilot Proposal.",
            "text": "Synthesize metrics and present commercial pilot agreement."
          }
        ],
        "image": {
          "url": "/academy/diagrams/14-day-sprint.svg",
          "caption": "Figure 11.1: The 14-Day Sprint framework to test hypotheses before building code.",
          "alt": "14-Day Sprint Roadmap"
        }
      },
      {
        "id": "s115",
        "sectionNumber": "11.5",
        "title": "Pilot outreach and cold messaging",
        "content": [
          "Keep outreach short and problem-centered: 'Hi [Name], I noticed clinic managers at small practices spend ~6 hrs weekly rebuilding schedules after cancellations. We researched this across 8 clinics and built a lightweight test workflow. Would you be open to a 10-minute feedback call?'"
        ]
      },
      {
        "id": "s116",
        "sectionNumber": "11.6",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Draft your own 14-day sprint schedule and write a 3-sentence cold email to 5 potential pilot operators."
        ]
      }
    ],
    "quiz": {
      "question": "In a rapid discovery sprint, what should be built during Days 4 to 7?",
      "options": [
        {
          "key": "A",
          "label": "A scalable microservice architecture with OAuth authentication",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The minimum viable workflow (wireframes or concierge process) that directly tests the core relief assumption",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A full marketing website with affiliate tracking",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Focus strictly on the single interaction that eliminates the friction.",
      "feedbackIncorrect": "Not quite. Building backend architecture before testing the core interaction wastes critical time."
    }
  },
  {
    "num": 12,
    "title": "Bias, Ethics and Common Mistakes",
    "shortTitle": "Bias & Mistakes",
    "slug": "bias-ethics-and-mistakes",
    "sectionsCount": 4,
    "part": "Apply",
    "coverColor": "#0056d2",
    "subs": "Cognitive biases \u00b7 Ethical discovery \u00b7 Top 10 mistakes \u00b7 Practice",
    "lead": "Discovery is easy to corrupt with confirmation bias. Master the mental hygiene required to hear the painful truth.",
    "inThisChapter": "Confirmation & survivorship bias \u00b7 Ethical research standards \u00b7 The Top 10 founder discovery mistakes",
    "practicePrompt": "Audit your own problem discovery notes against the Top 10 Mistakes checklist.",
    "sections": [
      {
        "id": "s121",
        "sectionNumber": "12.1",
        "title": "Cognitive biases in discovery",
        "content": [
          "Confirmation Bias: You only hear answers that validate your pre-existing idea and disregard warning signs.",
          "Survivorship Bias: You study successful companies and mimic their current features, forgetting the 100 failed startups that did the exact same thing.",
          "Leading Question Bias: Phrasing questions to beg for agreement ('Wouldn't it be great if...?')."
        ]
      },
      {
        "id": "s122",
        "sectionNumber": "12.2",
        "title": "Ethical discovery practice",
        "content": [
          "Never deceive operators about being a student when you are pitching commercial services. Always protect confidential business records, employee rosters, and patient healthcare data.",
          "Give credit: if an operator shares a brilliant workflow insight, credit them in your dossier."
        ]
      },
      {
        "id": "s123",
        "sectionNumber": "12.3",
        "title": "The top 10 discovery mistakes",
        "content": [
          "Check your process against the top 10 failure traps:"
        ],
        "points": [
          {
            "bold": "1. Pitching in interviews:",
            "text": "Talking about your product instead of their life."
          },
          {
            "bold": "2. Interviewing only friends:",
            "text": "Relying on friendly polite feedback."
          },
          {
            "bold": "3. Non-recurring problems:",
            "text": "Solving something that happens once every 2 years."
          },
          {
            "bold": "4. Ignoring the economic buyer:",
            "text": "Talking only to users who have zero budget."
          },
          {
            "bold": "5. Treating compliments as validation:",
            "text": "Confusing 'that's cool' with real willingness to pay."
          },
          {
            "bold": "6. Skipping competitor analysis:",
            "text": "Failing to analyze existing spreadsheets and hacks."
          },
          {
            "bold": "7. Over-scoping the first build:",
            "text": "Spending 6 months building before testing."
          },
          {
            "bold": "8. Not recording empirical evidence:",
            "text": "Relying on hazy memory instead of transcript quotes."
          },
          {
            "bold": "9. Giving up after 2 conversations:",
            "text": "Quitting before reaching pattern saturation."
          },
          {
            "bold": "10. Never closing the loop:",
            "text": "Failing to follow up with operators who helped you."
          }
        ]
      },
      {
        "id": "s124",
        "sectionNumber": "12.4",
        "title": "Chapter Practice",
        "content": [
          "Exercise: Audit your last two customer discovery interviews against the Top 10 Mistakes list. Grade your performance."
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following represents the most dangerous cognitive bias for an early product team?",
      "options": [
        {
          "key": "A",
          "label": "Confirmation bias (filtering customer conversations to only hear praise for your idea)",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "Color contrast bias in web design",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Database normalization bias",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Confirmation bias blinds founders to fatal flaws until after months of wasted engineering.",
      "feedbackIncorrect": "Incorrect. Confirmation bias causes teams to build products that nobody actually needs."
    }
  },
  {
    "num": 13,
    "title": "Capstone Project",
    "shortTitle": "Capstone Project",
    "slug": "capstone-project",
    "sectionsCount": 4,
    "part": "Apply",
    "coverColor": "#00419e",
    "subs": "Project brief \u00b7 Deliverables \u00b7 Grading rubric \u00b7 Submitting to Stuckhere",
    "lead": "Synthesize everything you've learned into a complete, verified Problem Validation Package submitted to the Stuckhere community.",
    "inThisChapter": "Capstone project brief \u00b7 Six required deliverables \u00b7 Grading rubric \u00b7 Publishing for solver collaboration",
    "practicePrompt": "Complete all 6 deliverables for your verified problem dossier and submit for review.",
    "sections": [
      {
        "id": "s131",
        "sectionNumber": "13.1",
        "title": "Capstone brief",
        "content": [
          "Select one authentic, unverified problem from your workplace, local surroundings, or from the Stuckhere Unverified Pool.",
          "Execute the full 8-step discovery loop and publish a complete Validation Package."
        ]
      },
      {
        "id": "s132",
        "sectionNumber": "13.2",
        "title": "The six required deliverables",
        "content": [
          "Your submission must contain:",
          "1. Problem Dossier: Standard 7-section document with quantified metrics.",
          "2. Five Interview Summaries: Mom-Test transcripts with direct quotes and timestamps.",
          "3. Pain Score Worksheet: Step-by-step scoring calculation (0-100).",
          "4. Competitor & Workaround Matrix: Analysis of existing hacks and legacy tools.",
          "5. Bottom-Up TAM Model: Defensible market sizing calculation.",
          "6. Solution Hypothesis & Sprint Plan: 14-day execution roadmap."
        ]
      },
      {
        "id": "s133",
        "sectionNumber": "13.3",
        "title": "Evaluation rubric",
        "content": [
          "Submissions are evaluated on five pillars:"
        ],
        "points": [
          {
            "bold": "Clarity of Problem (20%):",
            "text": "Is the victim, trigger, and loss crisp and quantifiable?"
          },
          {
            "bold": "Quality of Evidence (30%):",
            "text": "Are interview quotes authentic and grounded in past behaviour?"
          },
          {
            "bold": "Scoring & Sizing Rigor (20%):",
            "text": "Is the bottom-up TAM and Pain Score calculation defended?"
          },
          {
            "bold": "Decision Quality (20%):",
            "text": "Did the student establish clear kill-criteria and pivot thresholds?"
          },
          {
            "bold": "Presentation (10%):",
            "text": "Clean formatting and adherence to the Stuckhere standards."
          }
        ]
      },
      {
        "id": "s134",
        "sectionNumber": "13.4",
        "title": "Publishing to Stuckhere",
        "content": [
          "Submit your completed dossier to Stuckhere. High-scoring dossiers receive community verification badges and are matched with solver engineering teams and sponsors."
        ],
        "callout": {
          "boldPrefix": "Publish on Stuckhere.",
          "text": "Submit your finished capstone dossier to receive peer reviews and connect with solver teams.",
          "linkUrl": "/submit",
          "linkText": "Submit your problem dossier"
        }
      }
    ],
    "quiz": {
      "question": "Which component of the Capstone project carries the highest evaluation weight (30%)?",
      "options": [
        {
          "key": "A",
          "label": "Visual design of the pitch deck slides",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Quality and authenticity of primary customer interview evidence",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Total number of code commits on GitHub",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Real primary evidence from operators forms the foundation of all valid discoveries.",
      "feedbackIncorrect": "Not quite. Primary customer evidence is weighted at 30% as the most vital pillar."
    }
  },
  {
    "num": 14,
    "title": "Appendices",
    "shortTitle": "Appendices",
    "slug": "appendices",
    "sectionsCount": 6,
    "part": "Apply",
    "coverColor": "#0b6b83",
    "subs": "Glossary \u00b7 Templates \u00b7 Cheat sheet \u00b7 Master quiz bank \u00b7 Further reading \u00b7 FAQ",
    "lead": "Reference templates, glossary definitions, the 1-page master cheat sheet, and frequently asked questions for your discovery toolkit.",
    "inThisChapter": "Glossary of terms \u00b7 Copy-paste templates \u00b7 8-step cheat sheet \u00b7 Master quiz review \u00b7 FAQ",
    "practicePrompt": "Bookmark the templates and review the 8-Step Discovery Loop cheat sheet.",
    "sections": [
      {
        "id": "s141",
        "sectionNumber": "14.1",
        "title": "Glossary of key terms",
        "content": [
          "\u2022 ICP (Ideal Customer Profile): The specific role and company profile experiencing the acute pain.",
          "\u2022 TAM / SAM / SOM: Total, Serviceable, and Obtainable market sizes calculated bottom-up.",
          "\u2022 Workaround: The manual spreadsheet, WhatsApp group, or physical paper process currently used as a patch.",
          "\u2022 Pain Score: An objective 0-100 rating combining frequency, economic loss, workaround failure, and urgency.",
          "\u2022 Mom Test: Interviewing customers about past actions rather than pitching speculative future ideas.",
          "\u2022 LOI (Letter of Intent): A non-binding commercial commitment outlining pilot terms and willingness to pay."
        ]
      },
      {
        "id": "s142",
        "sectionNumber": "14.2",
        "title": "Copy-paste templates",
        "content": [
          "Template 1: Problem Statement",
          "[Role] at [type of workplace] struggle to [goal] because [blocker]. It happens [how often] and costs [time, money, risk or stress]. Today they [workaround].",
          "Template 2: 5-Question Interview Guide",
          "1. What is the hardest part about [process]? 2. When was the last time that happened? 3. What did that cost you? 4. What have you already tried? 5. Who else faces this?"
        ]
      },
      {
        "id": "s143",
        "sectionNumber": "14.3",
        "title": "The 8-step discovery cheat sheet",
        "content": [
          "1. Observe real workflows \u2192 2. Interview with Mom Test \u2192 3. Document 7-part dossier \u2192 4. Score pain (0-100) \u2192 5. Validate with LOIs/deposits \u2192 6. Compare workarounds \u2192 7. Size bottom-up TAM \u2192 8. Hypothesize & run 14-day sprint."
        ],
        "image": {
          "url": "/academy/diagrams/discovery-loop.svg",
          "caption": "Figure 14.1: The master 8-step reference framework for rapid problem discovery.",
          "alt": "Master 8-Step Discovery Loop"
        }
      },
      {
        "id": "s144",
        "sectionNumber": "14.4",
        "title": "Master quiz bank",
        "content": [
          "Use the checkpoint quizzes at the end of each chapter to review and test your mastery across all 15 chapters."
        ]
      },
      {
        "id": "s145",
        "sectionNumber": "14.5",
        "title": "Further reading",
        "content": [
          "Recommended literature:",
          "\u2022 'The Mom Test' by Rob Fitzpatrick (The definitive guide to customer conversations)",
          "\u2022 'The Lean Startup' by Eric Ries (Build-Measure-Learn feedback loops)",
          "\u2022 'Competing Against Luck' by Clayton Christensen (Jobs to Be Done theory)",
          "\u2022 Stuckhere Methodology Guide: stuckhere.davns.com/methodology"
        ]
      },
      {
        "id": "s146",
        "sectionNumber": "14.6",
        "title": "Frequently asked questions (FAQ)",
        "content": [
          "Q: How many interviews are enough?",
          "A: Usually 5 to 10 within a single ICP. When you hear the same stories and can predict their answers, you've reached saturation.",
          "Q: Can a problem be good if it has a low Pain Score?",
          "A: No. Low Pain Scores indicate vitamins that lack commercial urgency. Build painkillers instead.",
          "Q: What if a big competitor already exists?",
          "A: Excellent news. It proves market demand. Find the specific 20% friction point their users complain about on G2 and build a focused wedge."
        ]
      }
    ],
    "quiz": {
      "question": "What is the recommended response when you discover that an established competitor already exists in your target space?",
      "options": [
        {
          "key": "A",
          "label": "Abandon the market immediately because it is impossible to compete",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Treat it as positive proof of market demand, and mine their negative customer reviews for unmet whitespace",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Copy all their features line-by-line",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Competitors prove customers pay for solutions; their 1-star reviews reveal your product wedge.",
      "feedbackIncorrect": "Not quite. Competitors prove willingness to pay; inspect their weaknesses to win a focused wedge."
    }
  }
];

export const COURSE_2_CHAPTERS: AcademyChapter[] = [
  {
    "num": 0,
    "title": "Course Overview: How Big Is the Problem?",
    "shortTitle": "Course Overview",
    "slug": "course-overview",
    "sectionsCount": 3,
    "part": "Foundations",
    "coverColor": "#0b6b83",
    "subs": "What this subject covers \u00b7 Prerequisites \u00b7 How to use this material",
    "lead": "A verified problem is only a good opportunity if enough people will pay enough, often enough. Market sizing turns a Pain Score into a number you can defend.",
    "inThisChapter": "What this subject covers \u00b7 Prerequisites \u00b7 How to read and apply each chapter \u00b7 Connecting to the Stuckhere dossier",
    "practicePrompt": "Select a verified problem from the Stuckhere catalog and outline your preliminary market hypotheses.",
    "sections": [
      {
        "id": "c2-s01",
        "sectionNumber": "0.1",
        "title": "What this subject covers",
        "content": [
          "A verified problem is only a viable venture if the market is deep enough to sustain a business. In Course 1, you learned how to isolate authentic friction and compute a Pain Score. In Course 2, you convert that qualitative pain into quantified market revenue.",
          "Through this 18-chapter curriculum, you will build bottom-up market sizing models from verified inputs, anchor pricing to operator losses, stress-test your numbers with sensitivity analysis, and produce an executive one-page opportunity dossier."
        ],
        "points": [
          {
            "bold": "Bottom-Up Modeling:",
            "text": "Calculate TAM, SAM, and SOM using real verifiable inputs rather than broad macro analyst reports."
          },
          {
            "bold": "Defensible Pricing:",
            "text": "Anchor your ACV (Annual Contract Value) to the measured economic damage of the problem."
          },
          {
            "bold": "Unit Economics:",
            "text": "Model CAC, LTV, gross margins, and payback periods to ensure healthy business fundamentals."
          },
          {
            "bold": "Communicating the Opportunity:",
            "text": "Present your findings in a structured, transparent format that stands up to critical scrutiny."
          }
        ],
        "image": {
          "url": "/academy/diagrams/tam-sam-som.svg",
          "caption": "Figure 0.1: Market sizing layers: TAM (Addressable), SAM (Serviceable), and SOM (Obtainable).",
          "alt": "TAM SAM SOM Concentric Circles"
        }
      },
      {
        "id": "c2-s02",
        "sectionNumber": "0.2",
        "title": "Prerequisites",
        "content": [
          "This subject builds directly on the foundations established in Course 1: Problem Discovery & Validation.",
          "We recommend completing Course 1 or having a verified problem statement with identified operators and measured costs before sizing. Only basic arithmetic and spreadsheet competence (addition, multiplication, percentages) are required\u2014no complex advanced mathematics."
        ],
        "table": {
          "headers": [
            "Prerequisite",
            "Minimum Requirement",
            "Recommended Background"
          ],
          "rows": [
            {
              "label": "Problem Definition",
              "text": "A structured 5-part problem statement from Course 1",
              "highlight": true
            },
            {
              "label": "Primary Evidence",
              "text": "At least 3-5 operator interviews confirming friction",
              "highlight": false
            },
            {
              "label": "Arithmetic",
              "text": "Percentages, weighted averages, and multiplication",
              "highlight": false
            },
            {
              "label": "Tools",
              "text": "Any standard spreadsheet (Google Sheets or Excel)",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s03",
        "sectionNumber": "0.3",
        "title": "How to use this material",
        "content": [
          "The curriculum is designed for 6 to 8 hours of total study. Each chapter follows our signature actionable structure: Core Concept, Worked Real-World Example, Practical Exercise, and Checkpoint Quiz.",
          "As you complete the chapters, apply each step directly to a target problem from the Stuckhere catalog or your own research."
        ],
        "exercisePrompt": "Download or create a blank spreadsheet with tabs for Inputs, Calculations, Scenarios, and Sources.",
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why should you never begin market sizing before problem validation?",
            "answer": "Because sizing an unverified problem creates mathematically precise models for an illusion. If the pain is trivial or fictitious, the real market size is zero regardless of what analyst reports say."
          },
          {
            "question": "2. What is the fundamental difference between top-down and bottom-up sizing?",
            "answer": "Top-down takes a massive macro industry figure and carves out an arbitrary percentage. Bottom-up starts with verified individual buyers, multiplies by price, and builds up from operational facts."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary objective of market sizing in the Stuckhere framework?",
      "options": [
        {
          "key": "A",
          "label": "To impress investors with the largest multi-billion dollar headline figure possible",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To determine whether enough qualified buyers will pay enough money, often enough, to build a sustainable business",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To predict the exact quarterly revenue of a startup three years into the future",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct. Market sizing is an estimation filter to determine if the verified problem can support a viable commercial operation.",
      "feedbackIncorrect": "Not quite. Remember that market sizing is about defensible commercial viability, not arbitrary multi-billion dollar exaggerations."
    }
  },
  {
    "num": 1,
    "title": "Why Market Sizing Matters: A Real Problem vs. A Real Market",
    "shortTitle": "Why Sizing Matters",
    "slug": "why-market-sizing-matters",
    "sectionsCount": 4,
    "part": "Foundations",
    "coverColor": "#0b6b83",
    "subs": "Real problem vs real market \u00b7 What sizing decides \u00b7 Sizing as estimation \u00b7 Practice",
    "lead": "A real problem is not always a real market. Builders fail when they solve authentic pain for an audience that cannot or will not pay.",
    "inThisChapter": "The 3 common disconnects between pain and markets \u00b7 Key strategic decisions driven by sizing \u00b7 Order of magnitude estimation \u00b7 Practice",
    "practicePrompt": "List three genuine frustrations you have observed and evaluate whether each represents a viable commercial market.",
    "sections": [
      {
        "id": "c2-s11",
        "sectionNumber": "1.1",
        "title": "A real problem is not always a real market",
        "content": [
          "Just because a problem is real and painful does not mean it is a viable commercial market. Many founders spend years building software for authentic pain, only to discover three fatal structural roadblocks:"
        ],
        "points": [
          {
            "bold": "Too few customers:",
            "text": "The problem is excruciating, but only 40 organizations in the entire country experience it. Unless each contract pays millions, the company will starve."
          },
          {
            "bold": "Customers who cannot or will not pay:",
            "text": "The victims feel high pain, but have zero budget authority (e.g. students, volunteers, low-margin sole proprietors)."
          },
          {
            "bold": "Too infrequent to sustain a business:",
            "text": "The friction occurs only once every five years (e.g. relocating office headquarters), requiring continuous expensive customer re-acquisition."
          }
        ]
      },
      {
        "id": "c2-s12",
        "sectionNumber": "1.2",
        "title": "What market sizing decides",
        "content": [
          "Market sizing is not an academic paper. It is an operational decision gate that dictates resource allocation:"
        ],
        "table": {
          "headers": [
            "Decision Area",
            "If Market Is Small (<$5M)",
            "If Market Is Substantial (>$50M)"
          ],
          "rows": [
            {
              "label": "Build Decision",
              "text": "Open-source tool, internal script, or lean side project",
              "text2": "Full-time dedicated venture or venture-backed entity",
              "highlight": true
            },
            {
              "label": "Initial Target",
              "text": "Single niche consulting service with high rates",
              "text2": "Scalable software or standardized platform",
              "highlight": false
            },
            {
              "label": "Capital Strategy",
              "text": "Bootstrapped from revenue / customer deposits",
              "text2": "Institutional venture capital or growth debt",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s13",
        "sectionNumber": "1.3",
        "title": "Sizing as estimation, not prediction",
        "content": [
          "Market sizing is about establishing the correct order of magnitude. Is this a $2M opportunity, a $20M opportunity, or a $200M opportunity?",
          "As legendary economist John Maynard Keynes observed: 'It is better to be roughly right than precisely wrong.' Do not waste weeks debating whether a market is $43.2M or $44.1M when the foundational question is whether it exceeds $10M."
        ]
      },
      {
        "id": "c2-s14",
        "sectionNumber": "1.4",
        "title": "Chapter practice & review",
        "content": [
          "Exercise: Identify two problems you personally encountered this week. For each, determine if the victim has a dedicated corporate credit card or budget to eliminate it.",
          "Rule of thumb: If eliminating the friction does not either protect existing revenue or eliminate concrete cash costs, getting paid will be an uphill battle."
        ],
        "exercisePrompt": "Analyze a non-profit or volunteer workflow problem against the 'willingness to pay' filter.",
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Can a problem with a Pain Score of 90/100 still have a market size of zero?",
            "answer": "Yes. If the sufferers have no purchasing power, no budget, and no sponsor willing to subsidize them, the commercial market size is effectively zero."
          },
          {
            "question": "2. Why is order-of-magnitude estimation sufficient for early validation?",
            "answer": "Because the early goal is deciding whether the opportunity is large enough to warrant spending 6 months of your life on it, not setting five-year wall-street guidance."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which scenario illustrates a real problem that is NOT a viable software market?",
      "options": [
        {
          "key": "A",
          "label": "Hospitals spend $12,000 monthly on manual paper records and need compliant digital archives",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "University students struggle to find campus bike parking spots 3 weeks per semester and have no willingness to pay a monthly fee",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Trucking fleets lose $800 per breakdown and actively purchase roadside assistance dispatch software",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct. High seasonal friction with zero purchasing budget or willingness to pay makes it commercially non-viable.",
      "feedbackIncorrect": "Look for the example where sufferers lack the budget authority, recurring cadence, or willingness to pay."
    }
  },
  {
    "num": 2,
    "title": "Core Vocabulary: TAM, SAM, SOM Demystified",
    "shortTitle": "Core Vocabulary",
    "slug": "core-vocabulary",
    "sectionsCount": 4,
    "part": "Foundations",
    "coverColor": "#0b6b83",
    "subs": "Three market layers \u00b7 Units of measurement \u00b7 Key financial terms \u00b7 Practice",
    "lead": "Master the fundamental vocabulary of market sizing so your numbers are unambiguous to operators, investors, and partners.",
    "inThisChapter": "Precise definitions of TAM, SAM, and SOM \u00b7 Avoiding unit confusion \u00b7 ARPU, ACV, and CAGR \u00b7 Practice",
    "practicePrompt": "Classify 5 market sizing statements from startup pitches into TAM, SAM, or SOM.",
    "sections": [
      {
        "id": "c2-s21",
        "sectionNumber": "2.1",
        "title": "The three market layers",
        "content": [
          "Market sizing is universally structured into three nested layers. Visualizing them as concentric circles prevents conflating the global universe with what you can actually capture:"
        ],
        "points": [
          {
            "bold": "TAM (Total Addressable Market):",
            "text": "The total worldwide revenue opportunity if you had 100% market share and zero competitors across every conceivable segment that has the problem."
          },
          {
            "bold": "SAM (Serviceable Addressable Market):",
            "text": "The subset of TAM that fits your specific geographic reach, language, technological constraints, regulatory scope, and product tier today."
          },
          {
            "bold": "SOM (Serviceable Obtainable Market):",
            "text": "The realistic slice of SAM you can actually win in the next 1 to 3 years with your current sales team, marketing budget, and production capacity."
          }
        ],
        "image": {
          "url": "/academy/diagrams/tam-sam-som.svg",
          "caption": "Figure 2.1: The three nested market sizing layers: TAM -> SAM -> SOM.",
          "alt": "Concentric TAM SAM SOM Diagram"
        }
      },
      {
        "id": "c2-s22",
        "sectionNumber": "2.2",
        "title": "Units you must keep straight",
        "content": [
          "Confusion arises when founders mix units. Always specify both the currency unit and the time dimension:"
        ],
        "table": {
          "headers": [
            "Metric",
            "Good Unambiguous Formulation",
            "Ambiguous / Confusing"
          ],
          "rows": [
            {
              "label": "Revenue",
              "text": "$14.2M Annual Recurring Revenue (ARR)",
              "highlight": true
            },
            {
              "label": "Accounts",
              "text": "3,400 active paying businesses (organizations)",
              "highlight": false
            },
            {
              "label": "Seats / Users",
              "text": "18,200 individual operators across all accounts",
              "highlight": false
            },
            {
              "label": "Transactions",
              "text": "450,000 processed shipments per month",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s23",
        "sectionNumber": "2.3",
        "title": "Related terms: ACV, ARPU, and ICP",
        "content": [
          "To communicate effectively with commercial partners, understand these standard operational acronyms:"
        ],
        "points": [
          {
            "bold": "ACV (Annual Contract Value):",
            "text": "The annualized revenue generated by a single customer contract (e.g. $1,800/year)."
          },
          {
            "bold": "ARPU (Average Revenue Per User):",
            "text": "Total revenue divided by the total number of users or accounts in a given timeframe."
          },
          {
            "bold": "ICP (Ideal Customer Profile):",
            "text": "The description of the specific company archetype that gets value fastest and pays most reliably."
          },
          {
            "bold": "CAGR (Compound Annual Growth Rate):",
            "text": "The geometric annual growth rate of the broader sector over a specified period."
          }
        ]
      },
      {
        "id": "c2-s24",
        "sectionNumber": "2.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Read the following pitch claim: 'There are 100,000 restaurants in Germany. If each pays $100/mo, our market is $120M. We will capture 5% in year 1 ($6M).' Identify the TAM, SAM, and SOM in this statement."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. What is wrong with defining your TAM as 'Global Healthcare is $8 Trillion'?",
            "answer": "It is uselessly broad. Your software does not sell pharmaceuticals, perform cardiac surgeries, or build MRI machines. TAM must represent the total spend on solving your specific problem."
          },
          {
            "question": "2. Which of the three numbers (TAM, SAM, SOM) dictates your Year 1-2 hiring and revenue plan?",
            "answer": "SOM. Your operational cash flow and immediate sales capacity depend strictly on the obtainable market, not theoretical global addressability."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following correctly defines the Serviceable Obtainable Market (SOM)?",
      "options": [
        {
          "key": "A",
          "label": "The global annual spending of all corporations on IT and cloud services",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The realistic share of qualified, reachable customers you can win within 1 to 3 years",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "The theoretical maximum revenue if every business in the world adopted your product",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! SOM is your near-term realistic target governed by execution capacity.",
      "feedbackIncorrect": "Remember that SOM is the innermost circle representing reachable near-term execution."
    }
  },
  {
    "num": 3,
    "title": "Three Ways to Size a Market: Top-Down vs. Bottom-Up vs. Value-Theory",
    "shortTitle": "Three Sizing Methods",
    "slug": "three-ways-to-size-a-market",
    "sectionsCount": 4,
    "part": "Foundations",
    "coverColor": "#0b6b83",
    "subs": "Top-down \u00b7 Bottom-up \u00b7 Value-theory \u00b7 Combining methods",
    "lead": "Top-down analyst reports mislead. Bottom-up math builds conviction. Understand when and how to combine all three sizing approaches.",
    "inThisChapter": "The hazards of top-down Gartner percentages \u00b7 The bottom-up arithmetic framework \u00b7 Value-theory for novel markets \u00b7 Practice",
    "practicePrompt": "Calculate the market size of a local service using both top-down and bottom-up methods, and compare the discrepancy.",
    "sections": [
      {
        "id": "c2-s31",
        "sectionNumber": "3.1",
        "title": "Top-down sizing and its fatal flaws",
        "content": [
          "Top-down sizing begins with a large macro research report (e.g. IDC, Gartner, Statista) and asserts: 'The global market for X is $40 Billion. If we capture just 1%, we will be a $400 Million business!'",
          "This is known as the '1% of China' fallacy. It fails because capturing 1% of a fragmented market requires real distribution, real competitive displacement, and real buyer intent that top-down percentages completely ignore."
        ],
        "image": {
          "url": "/academy/diagrams/three-sizing-methods.svg",
          "caption": "Figure 3.1: The three market sizing methodologies compared.",
          "alt": "Three Sizing Methods Comparison"
        }
      },
      {
        "id": "c2-s32",
        "sectionNumber": "3.2",
        "title": "Bottom-up sizing: The gold standard",
        "content": [
          "Bottom-up sizing builds from granular, demonstrable unit facts: Count of reachable buyers (N) multiplied by Annual Contract Value (P).",
          "Because every number in a bottom-up model can be audited against primary evidence, it is the only methodology accepted by institutional operators and rigorous evaluators."
        ],
        "points": [
          {
            "bold": "N (Count of Qualified Buyers):",
            "text": "Obtained from registries, census data, or systematic directories."
          },
          {
            "bold": "P (Price per Buyer):",
            "text": "Anchored to the quantified cost of the problem or existing workarounds."
          },
          {
            "bold": "TAM Formula:",
            "text": "TAM = N \u00d7 P (Annualized)."
          }
        ]
      },
      {
        "id": "c2-s33",
        "sectionNumber": "3.3",
        "title": "Value-theory for new and nascent categories",
        "content": [
          "When Uber or Airbnb launched, there was no historical market report for 'on-demand ride-hailing' or 'peer-to-peer apartment lodging'.",
          "Value-theory estimates how much value, speed, or cost savings you unlock for operators, and assumes capturing a reasonable proportion (typically 10% to 25%) of that newly created economic surplus."
        ]
      },
      {
        "id": "c2-s34",
        "sectionNumber": "3.4",
        "title": "Choosing and combining methods",
        "content": [
          "Use bottom-up as your primary foundation. Use value-theory to sanity-check your pricing ceiling, and top-down reports strictly as background industry context.",
          "If your bottom-up TAM exceeds the entire top-down industry report, one of your assumptions is fatally flawed."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why do seasoned evaluators discount '1% of a huge market' claims?",
            "answer": "Because achieving 1% of an existing market requires winning thousands of specific sales battles against incumbents. It proves nothing about who the buyer actually is or why they would switch."
          },
          {
            "question": "2. When is value-theory sizing most appropriate?",
            "answer": "When creating a completely new product category or substituting a manual workaround that has no existing commercial software line item."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is bottom-up sizing preferred over top-down sizing in early venture evaluation?",
      "options": [
        {
          "key": "A",
          "label": "It always yields a significantly larger market valuation number",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It requires counting verified customer archetypes and multiplying by demonstrable unit prices",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "It relies entirely on published research reports from Wall Street investment banks",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Bottom-up math is verifiable and auditable against unit economics.",
      "feedbackIncorrect": "Bottom-up sizing is preferred because it is grounded in observable unit arithmetic."
    }
  },
  {
    "num": 4,
    "title": "Defining Who Is in the Market: Segmentation & The Triad",
    "shortTitle": "Who Is in the Market",
    "slug": "defining-who-is-in-the-market",
    "sectionsCount": 4,
    "part": "Customer & Pricing",
    "coverColor": "#0b6b83",
    "subs": "Dossier input \u00b7 Segmentation \u00b7 User vs Buyer vs Payer \u00b7 Beachhead selection",
    "lead": "Never size for 'everyone'. Ground your customer definition in the operational roles and workplace constraints identified during discovery.",
    "inThisChapter": "Translating problem dossiers into buyer profiles \u00b7 The User-Buyer-Payer triad \u00b7 Beachhead market criteria \u00b7 Practice",
    "practicePrompt": "Define the Beachhead segment and Buyer Triad for a problem in local municipal logistics.",
    "sections": [
      {
        "id": "c2-s41",
        "sectionNumber": "4.1",
        "title": "Start from the problem dossier",
        "content": [
          "A great market sizing begins with the specific persona documented in your Course 1 Problem Dossier.",
          "If your dossier says: 'Clinic managers at 2-to-5 doctor outpatient clinics who manually confirm appointments', you have a concrete boundary for counting. If your definition is 'Healthcare professionals', counting is impossible."
        ]
      },
      {
        "id": "c2-s42",
        "sectionNumber": "4.2",
        "title": "The operational triad: User vs. Buyer vs. Payer",
        "content": [
          "In enterprise and B2B workflows, the person experiencing the pain is rarely the person who writes the check:"
        ],
        "image": {
          "url": "/academy/diagrams/user-buyer-payer.svg",
          "caption": "Figure 4.1: The operational triad: User vs. Buyer vs. Payer.",
          "alt": "User Buyer Payer Diagram"
        },
        "points": [
          {
            "bold": "The User:",
            "text": "Suffers daily operational friction. Cares about clicks, stress, and work hours."
          },
          {
            "bold": "The Buyer (Decider):",
            "text": "Has organizational authority to select a solution. Cares about workflow reliability, team throughput, and compliance."
          },
          {
            "bold": "The Payer (Budget Owner):",
            "text": "Approves the budget or sign-off. Cares about payback periods, contract terms, and ROI."
          }
        ]
      },
      {
        "id": "c2-s43",
        "sectionNumber": "4.3",
        "title": "Choosing your beachhead segment",
        "content": [
          "A beachhead market is a small, tightly bounded customer group where the pain is so intense that they will adopt an imperfect early version without demanding dozens of custom integrations.",
          "Winning a beachhead gives you word-of-mouth references, case studies, and cash flow to expand into adjacent segments."
        ],
        "table": {
          "headers": [
            "Beachhead Factor",
            "Strong Indicator (High Fit)",
            "Weak Indicator (Avoid Early)"
          ],
          "rows": [
            {
              "label": "Pain Intensity",
              "text": "Pain Score > 80; losing revenue every week",
              "highlight": true
            },
            {
              "label": "Sales Cycle",
              "text": "Decider can approve contract in under 14 days",
              "highlight": false
            },
            {
              "label": "Competition",
              "text": "Incumbents ignore segment because accounts are 'too small'",
              "highlight": false
            },
            {
              "label": "Channel Access",
              "text": "Can reach directly via LinkedIn or direct email",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s44",
        "sectionNumber": "4.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Pick a school management problem. Identify the User (Teacher), the Buyer (Principal), and the Payer (School District Board / Finance Director). Formulate one value pitch for each role."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. What happens if you pitch the user's benefits to the payer?",
            "answer": "The pitch fails. The payer does not care that the software has a slick dark mode or takes two fewer clicks; the payer cares about total budget impact, security, and net cost recovery."
          },
          {
            "question": "2. Why is a narrow beachhead safer than a broad multi-segment launch?",
            "answer": "Because limited resources are concentrated on solving one specific problem completely, making you the undisputed best choice for that niche."
          }
        ]
      }
    ],
    "quiz": {
      "question": "In a hospital clinic software sale, who is typically 'The Buyer' (Decider)?",
      "options": [
        {
          "key": "A",
          "label": "The patients booking their annual checkup",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The Clinic Practice Manager or Head of Operations",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "The junior nurse administering vaccinations",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! The Practice Manager holds departmental authority over operational software.",
      "feedbackIncorrect": "Identify the person who has organizational decision-making authority over clinic tools."
    }
  },
  {
    "num": 5,
    "title": "Counting Customers: Data Sources & Building a Population",
    "shortTitle": "Counting Customers",
    "slug": "counting-customers",
    "sectionsCount": 4,
    "part": "Customer & Pricing",
    "coverColor": "#0b6b83",
    "subs": "Data sources \u00b7 Step-by-step count \u00b7 Missing data & proxies \u00b7 Source tiers",
    "lead": "Stop guessing market populations. Use reliable census data, industry registries, regulatory filings, and systematic bottom-up counts.",
    "inThisChapter": "Reliable public data repositories \u00b7 Applying filtering funnels \u00b7 Proxy metrics when data is scarce \u00b7 Data confidence tiers \u00b7 Practice",
    "practicePrompt": "Count the number of independent dental practices in your target state using government registries.",
    "sections": [
      {
        "id": "c2-s51",
        "sectionNumber": "5.1",
        "title": "Where numbers come from",
        "content": [
          "Reliable bottom-up counts do not come from pitch decks. They come from public regulatory filings, national census bureaus, licensing registries, and verified business databases:"
        ],
        "points": [
          {
            "bold": "Government Registries:",
            "text": "US Census County Business Patterns, MCA (Ministry of Corporate Affairs) India, Companies House UK."
          },
          {
            "bold": "Licensing Boards:",
            "text": "State medical boards, department of transportation commercial fleet licenses, liquor licensing boards."
          },
          {
            "bold": "Trade Associations:",
            "text": "National Restaurant Association, Trucking Federation annual reports, Dental Association directories."
          }
        ]
      },
      {
        "id": "c2-s52",
        "sectionNumber": "5.2",
        "title": "Building a count step by step: The filtering funnel",
        "content": [
          "Never use the raw gross number from a registry. Apply disqualifying filters to reach the true addressable population:"
        ],
        "table": {
          "headers": [
            "Funnel Step",
            "Filter Description",
            "Example (Clinics)"
          ],
          "rows": [
            {
              "label": "Gross Population",
              "text": "Total registered outpatient establishments",
              "highlight": false
            },
            {
              "label": "Size Filter",
              "text": "Exclude solo practices and massive hospital systems (2-5 docs only)",
              "highlight": false
            },
            {
              "label": "Tech Filter",
              "text": "Exclude facilities with zero digital scheduling (already on spreadsheets)",
              "highlight": true
            },
            {
              "label": "Qualified Total",
              "text": "Final qualified addressable accounts for TAM",
              "highlight": true
            }
          ]
        }
      },
      {
        "id": "c2-s53",
        "sectionNumber": "5.3",
        "title": "When no direct data exists: Proxy sizing",
        "content": [
          "When sizing an emerging or informal sector where no clean registry exists, use parallel proxies (e.g. counting cold-storage trucks by tracking refrigeration compressor sales or diesel permits)."
        ]
      },
      {
        "id": "c2-s54",
        "sectionNumber": "5.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Pick a niche industry (e.g. independent coffee roasters). Find two independent public sources that document the business count in your target country and calculate the variance between them."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why is applying a size filter essential when counting corporate buyers?",
            "answer": "Because a 2-person shop and a 20,000-employee enterprise have completely different budgets, sales cycles, and operational workflows; they cannot be counted as identical unit accounts."
          },
          {
            "question": "2. What constitutes a Tier 1 data source?",
            "answer": "Official regulatory filings, national statutory census data, or primary customer account sampling."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following is considered a Tier 1 authoritative data source for counting commercial businesses?",
      "options": [
        {
          "key": "A",
          "label": "A random marketing blog post summarizing a forum thread",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Official national business census or statutory regulatory licensing filings",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A competitor's homepage marketing copy claiming to serve 'millions of users'",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Statutory registries and census data provide auditable legal records.",
      "feedbackIncorrect": "Look for legally audited government or regulatory filings."
    }
  },
  {
    "num": 6,
    "title": "Pricing and Willingness to Pay: Anchoring to Pain",
    "shortTitle": "Pricing & Willingness to Pay",
    "slug": "pricing-and-willingness-to-pay",
    "sectionsCount": 5,
    "part": "Customer & Pricing",
    "coverColor": "#0b6b83",
    "subs": "Pricing difficulty \u00b7 Existing spend evidence \u00b7 Value-based pricing \u00b7 Pricing models \u00b7 Testing price",
    "lead": "Price is the most sensitive multiplier in market sizing. Learn to anchor pricing to verified operational loss rather than arbitrary cost-plus.",
    "inThisChapter": "The psychology of business software pricing \u00b7 Finding budget line items \u00b7 Value-based pricing formula \u00b7 SaaS vs Usage models \u00b7 Practice",
    "practicePrompt": "Calculate a defensible price for a tool that eliminates $24,000 in annual overtime payroll.",
    "sections": [
      {
        "id": "c2-s61",
        "sectionNumber": "6.1",
        "title": "Why price is the hardest input",
        "content": [
          "A 20% change in your estimated price increases or decreases your TAM by 20%. Yet founders frequently guess pricing based on competitor websites or arbitrary round numbers.",
          "To build a robust model, you must find concrete evidence of what operators already pay to manage or tolerate the problem."
        ],
        "image": {
          "url": "/academy/diagrams/pricing-value-ladder.svg",
          "caption": "Figure 6.1: Cost-plus vs. Competitor benchmark vs. Value-based pricing.",
          "alt": "Pricing Value Ladder Diagram"
        }
      },
      {
        "id": "c2-s62",
        "sectionNumber": "6.2",
        "title": "Evidence of what people already spend",
        "content": [
          "Before asking 'what would you pay for new software?', investigate their current actual cash outlays:"
        ],
        "points": [
          {
            "bold": "Overtime labor:",
            "text": "Paying staff $25/hr for 4 hours every Saturday to reconcile paper records ($5,200/yr)."
          },
          {
            "bold": "Dispute penalties:",
            "text": "Paying $400 in late shipping fines each month ($4,800/yr)."
          },
          {
            "bold": "Consultant fees:",
            "text": "Hiring an external accountant for quarterly data cleanup ($3,000/yr)."
          }
        ]
      },
      {
        "id": "c2-s63",
        "sectionNumber": "6.3",
        "title": "The value-based pricing formula",
        "content": [
          "The most defensible pricing strategy in B2B is capturing 10% to 20% of the verified economic waste you eliminate.",
          "If your software eliminates $18,000 in annual no-show doctor losses, charging $1,800 to $3,600 per year ($150 to $300/month) offers the clinic an irresistible 5x to 10x Return on Investment (ROI)."
        ]
      },
      {
        "id": "c2-s64",
        "sectionNumber": "6.4",
        "title": "Pricing models: Subscription vs. Usage",
        "content": [
          "Select a model aligned with the problem's natural operational cadence:"
        ],
        "table": {
          "headers": [
            "Model",
            "Best Suited For",
            "Predictability"
          ],
          "rows": [
            {
              "label": "Flat SaaS Monthly",
              "text": "Continuous daily utility (e.g. appointment management)",
              "highlight": true
            },
            {
              "label": "Per-Seat License",
              "text": "Individual operator productivity (e.g. CRM, design)",
              "highlight": false
            },
            {
              "label": "Usage / Per-Transaction",
              "text": "Volatile batch events (e.g. SMS dispatches, invoices generated)",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s65",
        "sectionNumber": "6.5",
        "title": "Chapter practice",
        "content": [
          "Exercise: A warehouse loses $40,000 annually due to misrouted packages. Using the 15% value-capture rule, compute the defensible annual subscription price."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why should you avoid cost-plus pricing in software?",
            "answer": "Because software has near-zero marginal reproduction cost. Pricing based on server costs leaves 95% of customer value uncaptured."
          },
          {
            "question": "2. What is the standard value capture percentage in B2B enterprise software?",
            "answer": "Between 10% and 20% of the verified cost savings or revenue upside."
          }
        ]
      }
    ],
    "quiz": {
      "question": "If your tool saves a logistics dispatch firm $50,000 annually in fuel waste, what is a standard value-based annual price?",
      "options": [
        {
          "key": "A",
          "label": "$15 per year because server costs are low",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "$5,000 to $10,000 per year (capturing 10% to 20% of verified savings)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "$50,000 per year capturing 100% of all savings",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Capturing 10-20% leaves an overwhelming 5x to 10x ROI for the customer.",
      "feedbackIncorrect": "Remember the 10% to 20% value capture rule of thumb."
    }
  },
  {
    "num": 7,
    "title": "Usage, Frequency and Revenue per Customer (ACV & LTV)",
    "shortTitle": "Usage & Frequency",
    "slug": "usage-frequency-and-revenue-per-customer",
    "sectionsCount": 4,
    "part": "Customer & Pricing",
    "coverColor": "#0b6b83",
    "subs": "Recurring vs one-time \u00b7 Annual contract value \u00b7 Customer retention \u00b7 LTV formula",
    "lead": "How often does the pain trigger? Calculate Annual Contract Value (ACV) and customer lifetime based on recurring operational rhythm.",
    "inThisChapter": "The mathematics of recurring operational friction \u00b7 ACV calculation \u00b7 Churn and retention \u00b7 Customer Lifetime Value (LTV) \u00b7 Practice",
    "practicePrompt": "Calculate the ACV and LTV for a SaaS tool with $200/mo price, 85% gross margin, and 2% monthly churn.",
    "sections": [
      {
        "id": "c2-s71",
        "sectionNumber": "7.1",
        "title": "Recurring vs. one-time problems",
        "content": [
          "Problems with high daily or monthly recurrence produce high-retention SaaS businesses. Problems that happen once every several years require continuous re-acquisition.",
          "In your sizing spreadsheet, categorize your revenue into Annual Contract Value (ACV) so monthly and annual contracts can be normalized."
        ]
      },
      {
        "id": "c2-s72",
        "sectionNumber": "7.2",
        "title": "Calculating Annual Contract Value (ACV)",
        "content": [
          "ACV represents the annualized revenue from one account: ACV = Monthly Recurring Revenue (MRR) \u00d7 12. For usage-based products: ACV = (Expected monthly transaction volume \u00d7 Unit price) \u00d7 12."
        ]
      },
      {
        "id": "c2-s73",
        "sectionNumber": "7.3",
        "title": "Customer lifetime and churn",
        "content": [
          "Customer Lifetime (in months) is calculated as: 1 / (Monthly Churn Rate). If 2% of your customer accounts cancel each month, the average customer stays for 50 months (over 4 years)."
        ]
      },
      {
        "id": "c2-s74",
        "sectionNumber": "7.4",
        "title": "The Lifetime Value (LTV) formula",
        "content": [
          "LTV is the cumulative gross profit generated by a customer relationship: LTV = (Annual ACV \u00d7 Gross Margin %) / Annual Churn Rate. LTV tells you how much you can spend to acquire a customer."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. What happens to LTV if monthly churn increases from 1% to 4%?",
            "answer": "LTV drops by 75% because customer lifespan falls from 100 months to 25 months."
          },
          {
            "question": "2. Why must gross margin percentage be included in LTV calculations?",
            "answer": "Because revenue is not cash profit. Software with 80% gross margin generates $80 of gross profit per $100 revenue to service customer support and servers."
          }
        ]
      }
    ],
    "quiz": {
      "question": "If a customer pays $100/month with an 80% gross margin and 2% monthly churn, what is their approximate LTV?",
      "options": [
        {
          "key": "A",
          "label": "$4,000 ($80 gross profit \u00d7 50 months lifespan)",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "$100",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "$10,000",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! 1 / 0.02 = 50 months. 50 months \u00d7 $80 gross margin = $4,000 LTV.",
      "feedbackIncorrect": "Calculate lifespan first (1 / 0.02 = 50 months), then multiply by monthly gross profit ($80)."
    }
  },
  {
    "num": 8,
    "title": "Bottom-Up TAM: Step by Step with 3 Worked Examples",
    "shortTitle": "Bottom-Up TAM Step by Step",
    "slug": "bottom-up-tam-step-by-step",
    "sectionsCount": 5,
    "part": "Sizing & Economics",
    "coverColor": "#0b6b83",
    "subs": "Formula \u00b7 Worked Example A (Clinics) \u00b7 Worked Example B (Logistics) \u00b7 Worked Example C (Govt) \u00b7 Template",
    "lead": "Assemble the pieces into an unshakeable mathematical model with three concrete worked examples from real industries.",
    "inThisChapter": "The core arithmetic formula \u00b7 Step-by-step clinic case study \u00b7 Fleet logistics case study \u00b7 Municipal tender case study \u00b7 Spreadsheet architecture \u00b7 Practice",
    "practicePrompt": "Construct a full bottom-up TAM, SAM, and SOM model for one of the worked examples in your spreadsheet.",
    "sections": [
      {
        "id": "c2-s81",
        "sectionNumber": "8.1",
        "title": "The core bottom-up formula",
        "content": [
          "With qualified customer counts and defensible annual pricing established, the bottom-up formula unites them into an auditable equation:"
        ],
        "image": {
          "url": "/academy/diagrams/bottom-up-formula.svg",
          "caption": "Figure 8.1: The Bottom-Up Market Sizing Formula: Count \u00d7 Volume \u00d7 Price.",
          "alt": "Bottom Up Formula Diagram"
        },
        "points": [
          {
            "bold": "TAM:",
            "text": "Total Qualified Accounts Worldwide \u00d7 Full Product ACV"
          },
          {
            "bold": "SAM:",
            "text": "Qualified Accounts in Reachable Geography & Segment \u00d7 Target ACV"
          },
          {
            "bold": "SOM:",
            "text": "Reachable Accounts \u00d7 Projected Sales Conversion Rate (Year 1-3)"
          }
        ]
      },
      {
        "id": "c2-s82",
        "sectionNumber": "8.2",
        "title": "Worked Example A: Clinic appointment no-shows",
        "content": [
          "Let's size the market for automated SMS/WhatsApp appointment rebooking for independent medical clinics:"
        ],
        "table": {
          "headers": [
            "Metric",
            "Input Assumption",
            "Calculation / Result"
          ],
          "rows": [
            {
              "label": "Qualified Clinics (N)",
              "text": "2-5 doctor outpatient clinics in US & UK",
              "text2": "14,200 clinics",
              "highlight": false
            },
            {
              "label": "Annual Price (P)",
              "text": "$150/month (saves ~$1,800/wk in lost fees)",
              "text2": "$1,800 ACV",
              "highlight": false
            },
            {
              "label": "TAM Result",
              "text": "14,200 clinics \u00d7 $1,800 ACV",
              "text2": "$25,560,000 ($25.5M)",
              "highlight": true
            },
            {
              "label": "SAM (English Metro)",
              "text": "Top 25 metro areas (45% of clinics)",
              "text2": "$11.5M SAM",
              "highlight": false
            },
            {
              "label": "SOM (Year 2 Target)",
              "text": "Capture 4% of SAM via direct inside sales",
              "text2": "$460,000 ARR (255 clinics)",
              "highlight": true
            }
          ]
        }
      },
      {
        "id": "c2-s83",
        "sectionNumber": "8.3",
        "title": "Worked Example B: Fleet logistics dispatch tracking",
        "content": [
          "Small logistics fleets (5 to 20 trucks) losing hours to manual driver phone calls:",
          "Qualified operators in country: 8,500 fleets (averaging 12 trucks each). Pricing: $25/truck/month ($300/truck/yr = $3,600 ACV per fleet). TAM = 8,500 \u00d7 $3,600 = $30.6M. SOM (Year 1, 150 fleets) = $540,000 ARR."
        ]
      },
      {
        "id": "c2-s84",
        "sectionNumber": "8.4",
        "title": "Worked Example C: Municipal public works tenders",
        "content": [
          "When the customer is a municipal public works department, the unit is not a private company, but a city budget line item.",
          "N = 1,200 municipalities with population 20k to 100k. Average tender contract = $18,000/yr. TAM = 1,200 \u00d7 $18,000 = $21.6M."
        ]
      },
      {
        "id": "c2-s85",
        "sectionNumber": "8.5",
        "title": "The spreadsheet template",
        "content": [
          "A transparent model separates raw inputs, assumptions with sources, formulas, and final summary outputs into distinct sections. Never hardcode numbers into calculation cells."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. In Worked Example A, why is the SOM $460k rather than the full $25M TAM?",
            "answer": "Because a startup cannot contact, pitch, and onboard 14,000 clinics in Year 2. SOM reflects real sales capacity and pipeline conversion."
          },
          {
            "question": "2. What happens to the TAM if clinic price is raised to $250/mo?",
            "answer": "TAM increases proportionally to $42.6M (14,200 \u00d7 $3,000), provided clinics are still willing to pay that rate."
          }
        ]
      }
    ],
    "quiz": {
      "question": "If there are 6,000 qualified fleet operators and each pays an ACV of $3,000, what is the bottom-up TAM?",
      "options": [
        {
          "key": "A",
          "label": "$1.8 Million",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "$18 Million (6,000 \u00d7 $3,000)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "$180 Million",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! 6,000 \u00d7 $3,000 = $18,000,000.",
      "feedbackIncorrect": "Multiply 6,000 qualified operators by $3,000 annual price."
    }
  },
  {
    "num": 9,
    "title": "Growth, Trends and Timing: Why Now?",
    "shortTitle": "Growth & Timing: Why Now?",
    "slug": "growth-trends-and-timing",
    "sectionsCount": 4,
    "part": "Sizing & Economics",
    "coverColor": "#0b6b83",
    "subs": "CAGR analysis \u00b7 The 'Why Now?' inflection \u00b7 3-to-5 year projections \u00b7 Practice",
    "lead": "A static market size is half the picture. Explore market momentum, regulatory mandates, and inflection points that create urgent timing.",
    "inThisChapter": "Understanding CAGR \u00b7 Regulatory triggers \u00b7 Technology inflection points \u00b7 Building 3-to-5 year scenario projections \u00b7 Practice",
    "practicePrompt": "Write a one-page 'Why Now' memo for an environmental compliance problem statement.",
    "sections": [
      {
        "id": "c2-s91",
        "sectionNumber": "9.1",
        "title": "Is the market growing or shrinking?",
        "content": [
          "A $20M market growing at 30% annually is far more attractive than a $100M market contracting at 5% per year.",
          "Look for leading indicators of market velocity: capital equipment purchases, job openings for specific operator roles, search volume trends, and new regulatory compliance deadlines."
        ]
      },
      {
        "id": "c2-s92",
        "sectionNumber": "9.2",
        "title": "The 'Why Now?' inflection",
        "content": [
          "Every venture pitch must answer: Why was this impossible or unviable three years ago, and why is today the optimal moment to build?"
        ],
        "points": [
          {
            "bold": "Regulatory Mandates:",
            "text": "New government laws requiring digital audit logs by 2026."
          },
          {
            "bold": "Infrastructure Shifts:",
            "text": "Ubiquitous smartphone adoption, cheap 5G data, or real-time payment rails (UPI, FedNow)."
          },
          {
            "bold": "AI & Model Breakthroughs:",
            "text": "Tasks that previously required manual human transcription can now run autonomously at cents per call."
          }
        ]
      },
      {
        "id": "c2-s93",
        "sectionNumber": "9.3",
        "title": "Projecting over three to five years",
        "content": [
          "Avoid the classic 'hockey stick' projection curve where revenue stays flat for two years and miraculously jumps to $50M in Year 4.",
          "Model customer acquisition based on realistic sales rep quotas, marketing channel saturation, and natural account churn."
        ]
      },
      {
        "id": "c2-s94",
        "sectionNumber": "9.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Pick a problem in cold-chain logistics. Identify two technological shifts and one regulatory change in the past 24 months that created an urgent 'Why Now?' opportunity."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why are regulatory compliance deadlines powerful catalysts for early sales?",
            "answer": "Because compliance is non-discretionary. Budgets are guaranteed and deadlines are immutable, drastically reducing customer hesitation."
          },
          {
            "question": "2. What is the danger of relying on macro CAGR alone?",
            "answer": "A macro industry can grow 15% overall while the specific sub-segment you are targeting remains stagnant or commoditized."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary purpose of the 'Why Now?' section in opportunity evaluation?",
      "options": [
        {
          "key": "A",
          "label": "To explain why current technology, regulatory, or behavioral shifts create a unique window of opportunity today",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "To apologize for not starting the company five years earlier",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "To predict the exact inflation rate of the next decade",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! 'Why Now?' identifies the catalytic change unlocking the market today.",
      "feedbackIncorrect": "Focus on the environmental, technological, or regulatory catalysts that create urgent timing."
    }
  },
  {
    "num": 10,
    "title": "Obtainable Market (SOM) and Go-to-Market Realities",
    "shortTitle": "Obtainable Market (SOM)",
    "slug": "obtainable-market-and-go-to-market",
    "sectionsCount": 4,
    "part": "Sizing & Economics",
    "coverColor": "#0b6b83",
    "subs": "From SAM to SOM \u00b7 Sales funnel math \u00b7 Channel selection \u00b7 Competition and share",
    "lead": "From theoretical SAM to reachable SOM. How your distribution channels, sales capacity, and conversion funnel determine reachable revenue in years 1-3.",
    "inThisChapter": "The bridge from SAM to SOM \u00b7 Conversion funnel benchmarking \u00b7 Direct vs Partner distribution \u00b7 Defensible market share \u00b7 Practice",
    "practicePrompt": "Calculate the Year 1 SOM for a B2B SaaS startup with two inside sales reps and a 12-week sales cycle.",
    "sections": [
      {
        "id": "c2-s101",
        "sectionNumber": "10.1",
        "title": "From SAM to SOM: Grounding in execution",
        "content": [
          "Your Serviceable Obtainable Market (SOM) is not a mathematical formula; it is an execution constraint.",
          "Even if there are 10,000 qualified clinics in your SAM ($18M), two founders can only run 20 demos a week. If 15% convert, you can close at most 150 clinics in Year 1 ($270k ARR). That $270k is your true Year 1 SOM."
        ]
      },
      {
        "id": "c2-s102",
        "sectionNumber": "10.2",
        "title": "The sales funnel arithmetic",
        "content": [
          "Map the conversion ratios required to achieve your target SOM:"
        ],
        "table": {
          "headers": [
            "Funnel Stage",
            "Conversion Rate",
            "Required Volume (for 100 Wins)"
          ],
          "rows": [
            {
              "label": "Outreach / Leads",
              "text": "10% reply / interest rate",
              "text2": "5,000 Target Accounts",
              "highlight": false
            },
            {
              "label": "Discovery Calls",
              "text": "40% qualified to demo",
              "text2": "500 Completed Calls",
              "highlight": false
            },
            {
              "label": "Product Demos",
              "text": "50% issue trial or LOI",
              "text2": "200 Formal Demos",
              "highlight": false
            },
            {
              "label": "Closed Won",
              "text": "50% finalize paid contract",
              "text2": "100 Live Paid Accounts",
              "highlight": true
            }
          ]
        }
      },
      {
        "id": "c2-s103",
        "sectionNumber": "10.3",
        "title": "Channel selection and capacity",
        "content": [
          "Match your channel to your ACV: Low ACV (<$1,000/yr) requires self-serve inbound or product-led viral loops. Medium ACV ($2,000 - $10,000/yr) supports targeted inside sales and email outreach. High ACV (>$50,000/yr) requires field enterprise reps."
        ]
      },
      {
        "id": "c2-s104",
        "sectionNumber": "10.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: A startup charges $2,400/year and wants to achieve $240,000 in Year 1 SOM (100 accounts). Calculate how many outbound discovery calls their sales rep must conduct weekly assuming standard conversion rates."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why is an outside sales rep with high base salary unviable for a $500/yr product?",
            "answer": "Because the CAC will dwarf the customer revenue. A sales rep costing $100k/yr would need to close 300+ accounts annually just to break even on their own salary."
          },
          {
            "question": "2. What is a healthy benchmark demo-to-close conversion rate for qualified B2B leads?",
            "answer": "Typically between 20% and 35% for qualified inbound or targeted account-based leads."
          }
        ]
      }
    ],
    "quiz": {
      "question": "If your sales team can complete 40 demos per month with a 25% close rate at $2,000 ACV, what is your annualized sales capacity?",
      "options": [
        {
          "key": "A",
          "label": "$240,000 ARR added per year (10 wins/mo \u00d7 $2,000 \u00d7 12)",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "$24,000 ARR",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "$2,400,000 ARR",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! 40 demos \u00d7 25% = 10 new clients/month \u00d7 $2,000 ACV = $20,000 new ARR/mo = $240k/yr.",
      "feedbackIncorrect": "Multiply monthly closed deals (10) by ACV ($2,000) and annualize by 12."
    }
  },
  {
    "num": 11,
    "title": "Unit Economics: CAC, LTV and Break-Even",
    "shortTitle": "Unit Economics: LTV & CAC",
    "slug": "unit-economics",
    "sectionsCount": 5,
    "part": "Sizing & Economics",
    "coverColor": "#0b6b83",
    "subs": "CAC \u00b7 LTV:CAC ratio \u00b7 Margins and costs \u00b7 Break-even & payback \u00b7 Practice",
    "lead": "A large TAM will not save a business with broken unit economics. Ensure each customer generates substantially more cash than they cost to acquire.",
    "inThisChapter": "Measuring true Customer Acquisition Cost (CAC) \u00b7 The 3:1 LTV:CAC golden ratio \u00b7 Gross vs Contribution margins \u00b7 Payback periods \u00b7 Practice",
    "practicePrompt": "Model the unit economics for an enterprise B2B subscription and compute the break-even payback period.",
    "sections": [
      {
        "id": "c2-s111",
        "sectionNumber": "11.1",
        "title": "Customer Acquisition Cost (CAC)",
        "content": [
          "CAC is the total loaded cost of sales and marketing (salaries, commissions, ad spend, software licenses) divided by the number of new customers acquired during that period.",
          "Founders often undercount CAC by omitting founder salaries, travel expenses, or demo software tools."
        ],
        "image": {
          "url": "/academy/diagrams/unit-economics-ltv-cac.svg",
          "caption": "Figure 11.1: Unit economics: LTV, CAC, and the 3:1 healthy ratio benchmark.",
          "alt": "Unit Economics LTV CAC Diagram"
        }
      },
      {
        "id": "c2-s112",
        "sectionNumber": "11.2",
        "title": "The golden LTV to CAC ratio",
        "content": [
          "The ratio of Lifetime Value to Acquisition Cost determines business health:"
        ],
        "points": [
          {
            "bold": "< 1.0x (Value Destruction):",
            "text": "You lose cash on every customer you win. Scaling accelerates bankruptcy."
          },
          {
            "bold": "1.0x to 2.5x (Dangerous):",
            "text": "Vulnerable to unexpected churn or minor marketing price inflation."
          },
          {
            "bold": "3.0x to 5.0x (Golden Benchmark):",
            "text": "Healthy, highly investable business with strong cash reinvestment capacity."
          },
          {
            "bold": "> 5.0x (Under-Investing):",
            "text": "You are growing too cautiously and leaving market share open to aggressive competitors."
          }
        ]
      },
      {
        "id": "c2-s113",
        "sectionNumber": "11.3",
        "title": "Margins and Cost of Goods Sold (COGS)",
        "content": [
          "Pure software typically enjoys 75% to 85% gross margins. Products requiring human review, hardware sensors, or telecommunications SMS gateways often see gross margins of 50% to 65%."
        ]
      },
      {
        "id": "c2-s114",
        "sectionNumber": "11.4",
        "title": "CAC Payback period",
        "content": [
          "Payback period is the number of months of customer subscription revenue needed to recover the cash spent acquiring them. Target a CAC payback period under 12 months for cash efficiency."
        ]
      },
      {
        "id": "c2-s115",
        "sectionNumber": "11.5",
        "title": "Chapter practice",
        "content": [
          "Exercise: A startup spends $15,000 on sales and marketing in Q1 and acquires 30 clinics paying $150/mo. Calculate their CAC and payback period (assuming 80% gross margin)."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why is a 12-month CAC payback period considered optimal in venture SaaS?",
            "answer": "Because standard annual upfront contracts immediately refund the acquisition cash, allowing the company to fund its own sales expansion without dilutive capital."
          },
          {
            "question": "2. What is the formula for CAC Payback Period?",
            "answer": "CAC / (Monthly Revenue per Account \u00d7 Gross Margin %)."
          }
        ]
      }
    ],
    "quiz": {
      "question": "If your CAC is $600 and a customer generates $100/month at 75% gross margin, what is the payback period?",
      "options": [
        {
          "key": "A",
          "label": "6 months",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "8 months ($600 / $75 monthly gross margin)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "12 months",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! $600 / ($100 \u00d7 0.75) = $600 / $75 = 8 months.",
      "feedbackIncorrect": "Divide CAC ($600) by the monthly gross profit ($75)."
    }
  },
  {
    "num": 12,
    "title": "Sanity Checks, Ranges and Sensitivity Analysis",
    "shortTitle": "Sanity Checks & Ranges",
    "slug": "sanity-checks-ranges-and-sensitivity",
    "sectionsCount": 4,
    "part": "Execution & Capstone",
    "coverColor": "#0b6b83",
    "subs": "Reality checks \u00b7 Scenario ranges \u00b7 Sensitivity analysis \u00b7 Practice",
    "lead": "Replace false single-number certainty with robust scenario models: Bear, Base, and Bull cases tested against sensitive variables.",
    "inThisChapter": "Cross-checking against industry IT spend \u00b7 Bear, Base, and Bull models \u00b7 Identifying the single most sensitive variable \u00b7 Practice",
    "practicePrompt": "Build a 3-scenario sensitivity table varying price and conversion rate for your target market.",
    "sections": [
      {
        "id": "c2-s121",
        "sectionNumber": "12.1",
        "title": "Reality checks and common sense filters",
        "content": [
          "Before publishing your market size, run these common sense tests:",
          "1. Wallet Share Filter: Does your estimated price exceed 2% of the customer's total annual operational revenue?",
          "2. Incumbent Comparison: What does the market leader in this vertical generate in annual revenue? If your TAM is 10x larger than the public market leader's revenue after 15 years, your assumptions need pruning."
        ]
      },
      {
        "id": "c2-s122",
        "sectionNumber": "12.2",
        "title": "Ranges instead of single point numbers",
        "content": [
          "No market in the real world behaves as a single number. Build three clear scenarios in your spreadsheet:"
        ],
        "image": {
          "url": "/academy/diagrams/sensitivity-tornado.svg",
          "caption": "Figure 12.1: Scenario modeling: Bear, Base, and Bull case ranges.",
          "alt": "Scenario and Sensitivity Analysis Diagram"
        },
        "points": [
          {
            "bold": "Bear Case (Conservative):",
            "text": "Lower pricing, higher churn, slow sales conversion. Demonstrates survival baseline."
          },
          {
            "bold": "Base Case (Expected):",
            "text": "Your realistic operating plan grounded in verified primary interview data."
          },
          {
            "bold": "Bull Case (Expansion):",
            "text": "Rapid viral referral, product upsells, and international geographic expansion."
          }
        ]
      },
      {
        "id": "c2-s123",
        "sectionNumber": "12.3",
        "title": "Sensitivity analysis: Finding the linchpin",
        "content": [
          "Test which input variable swings your SOM the most. In most SaaS models, churn rate and sales conversion velocity have far greater impact on terminal valuation than raw market population."
        ]
      },
      {
        "id": "c2-s124",
        "sectionNumber": "12.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Take your bottom-up spreadsheet model. Increase churn by 1.5% and decrease price by 20%. Note the compound effect on Year 3 SOM."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why are evaluators suspicious of pitch decks with zero scenario ranges?",
            "answer": "Because a single precise number implies false certainty about an unpredictable future. Providing ranges signals intellectual honesty and operational maturity."
          },
          {
            "question": "2. What is the 'Wallet Share Filter'?",
            "answer": "A sanity test ensuring software subscription price does not exceed an unrealistic fraction of the client's overall operating margins."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary objective of a Bear Case scenario in market sizing?",
      "options": [
        {
          "key": "A",
          "label": "To prove that the venture can still survive and remain cash-flow viable even under conservative conversion and pricing assumptions",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "To discourage investors from funding the company",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "To predict the worst-case macroeconomic recession",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! The Bear case proves downside resilience and baseline commercial viability.",
      "feedbackIncorrect": "Focus on downside commercial viability and stress-testing the business model."
    }
  },
  {
    "num": 13,
    "title": "Sizing in India and Emerging Markets: High Volume, Low ARPU",
    "shortTitle": "India & Emerging Markets",
    "slug": "sizing-in-india-and-emerging-markets",
    "sectionsCount": 4,
    "part": "Execution & Capstone",
    "coverColor": "#0b6b83",
    "subs": "Local context \u00b7 Data sources for India \u00b7 Sales realities \u00b7 Government procurement",
    "lead": "Western sizing models fail in high-volume, lower-ARPU economies. Learn the nuances of sizing for Indian MSMEs, Bharat users, and informal sectors.",
    "inThisChapter": "The high-volume low-ARPU equation \u00b7 Udyam, MCA, and GSTN data sources \u00b7 WhatsApp workflows \u00b7 GeM public procurement \u00b7 Practice",
    "practicePrompt": "Size the market for inventory tracking among tier-2 Indian retail pharmacy distributors.",
    "sections": [
      {
        "id": "c2-s131",
        "sectionNumber": "13.1",
        "title": "Local context changes the mathematics",
        "content": [
          "Copying Silicon Valley SaaS metrics into India or Southeast Asia leads to false conclusions. US clinics might happily pay $250/mo ($3,000/yr), whereas Indian tier-2 clinics often expect pricing between \u20b91,500 and \u20b93,500/mo ($250 to $500/yr).",
          "However, the sheer volume of addressable enterprises in India (over 63 million MSMEs) means substantial multi-million dollar venture scale is achieved through volume, digital payment rails (UPI), and low distribution costs."
        ]
      },
      {
        "id": "c2-s132",
        "sectionNumber": "13.2",
        "title": "Authoritative data sources for India",
        "content": [
          "Use these authoritative repositories for verifiable Indian business populations:"
        ],
        "points": [
          {
            "bold": "Udyam Registration Portal:",
            "text": "Official MSME ministry database classifying micro, small, and medium enterprises by investment and turnover."
          },
          {
            "bold": "MCA (Ministry of Corporate Affairs):",
            "text": "Audited registrar filings for all incorporated Private Limited and LLP entities."
          },
          {
            "bold": "GSTN (Goods & Services Tax Network):",
            "text": "Active registered tax-paying business counts by state and turnover band."
          }
        ]
      },
      {
        "id": "c2-s133",
        "sectionNumber": "13.3",
        "title": "Sales realities and collection cycles",
        "content": [
          "Self-serve credit card subscriptions have low adoption among Indian MSMEs. High-performing Indian B2B ventures utilize inside sales teams using WhatsApp for customer success, automated UPI AutoPay, and annual advance discounts."
        ]
      },
      {
        "id": "c2-s134",
        "sectionNumber": "13.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Pick an Indian logistics problem. Compare the addressable account counts between registered GSTN filers and informal unorganized fleet operators."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why must Indian market sizing account for the distinction between registered and informal businesses?",
            "answer": "Because informal operators often lack GST registration, formal bank accounts, or digital credit instruments, requiring completely different payment collection mechanisms."
          },
          {
            "question": "2. What is the role of the GeM portal in Indian market sizing?",
            "answer": "The Government e-Marketplace (GeM) provides transparent public data on central and state government tender volumes and procurement contract pricing."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which regulatory platform provides the most authoritative statutory database of registered MSMEs in India?",
      "options": [
        {
          "key": "A",
          "label": "Random trade directory listings",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The Udyam Registration Portal and GSTN database",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A marketing agency blog post",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Udyam and GSTN are statutory government registries.",
      "feedbackIncorrect": "Look for the official Indian government MSME registry portal."
    }
  },
  {
    "num": 14,
    "title": "Communicating the Opportunity: The Executive One-Pager",
    "shortTitle": "Communicating Opportunity",
    "slug": "communicating-the-opportunity",
    "sectionsCount": 4,
    "part": "Execution & Capstone",
    "coverColor": "#0b6b83",
    "subs": "One-page market summary \u00b7 Narrative with numbers \u00b7 Visuals \u00b7 Tailoring for audiences",
    "lead": "Distill complex sizing models into a crystal-clear, executive one-pager that convinces co-founders, operators, and evaluators.",
    "inThisChapter": "The 6-box opportunity architecture \u00b7 Connecting human pain to economic dollars \u00b7 Clean charts \u00b7 Audience tailoring \u00b7 Practice",
    "practicePrompt": "Draft a complete 6-box opportunity summary card for your verified problem.",
    "sections": [
      {
        "id": "c2-s141",
        "sectionNumber": "14.1",
        "title": "The 6-box opportunity architecture",
        "content": [
          "Never hand an evaluator a 40-tab spreadsheet without an executive synthesis. The Stuckhere One-Page Market Summary condenses your entire analysis into 6 structured blocks:"
        ],
        "image": {
          "url": "/academy/diagrams/opportunity-one-pager.svg",
          "caption": "Figure 14.1: The Stuckhere 6-box executive opportunity summary layout.",
          "alt": "Opportunity One Pager Diagram"
        },
        "points": [
          {
            "bold": "1. Verified Problem & Pain Score:",
            "text": "Specific blocked goal and measured dollar consequence."
          },
          {
            "bold": "2. Beachhead Buyer (ICP):",
            "text": "Specific operational role, firmographic filters, and decision rights."
          },
          {
            "bold": "3. Pricing & Value Metric:",
            "text": "Annual Contract Value (ACV) anchored to verified economic savings."
          },
          {
            "bold": "4. Market Sizing (TAM/SAM/SOM):",
            "text": "Auditable bottom-up numbers with documented sources."
          },
          {
            "bold": "5. Unit Economics:",
            "text": "Estimated CAC, LTV, LTV:CAC ratio, and payback timeline."
          },
          {
            "bold": "6. Decision Gate Verdict:",
            "text": "Explicit Go / Pivot / Kill recommendation with next milestone."
          }
        ]
      },
      {
        "id": "c2-s142",
        "sectionNumber": "14.2",
        "title": "Telling the story with numbers",
        "content": [
          "Numbers without narrative are forgettable; narrative without numbers is unconvincing. Walk the reader from the operational agony of the frontline operator to the aggregate millions of dollars lost annually across the industry."
        ]
      },
      {
        "id": "c2-s143",
        "sectionNumber": "14.3",
        "title": "Tailoring for different audiences",
        "content": [
          "Angel investors care about founder velocity and beachhead customer obsession. Growth funds care about TAM depth and LTV:CAC expansion. Co-founders care about whether the business can generate sustainable revenue to leave their jobs."
        ]
      },
      {
        "id": "c2-s144",
        "sectionNumber": "14.4",
        "title": "Chapter practice",
        "content": [
          "Exercise: Format your target problem into the 6-box template. Limit each section to exactly 3 bullet points."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. Why is the Decision Gate Verdict a mandatory section of the one-pager?",
            "answer": "Because market analysis exists to drive an action: whether to commit months of engineering time, pivot the beachhead segment, or discard the concept."
          },
          {
            "question": "2. What is the most common visual mistake founders make in market slides?",
            "answer": "Showing giant arbitrary circles without labeling the actual unit counts, prices, or primary data sources."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What are the six core elements of the Stuckhere Executive Opportunity Summary?",
      "options": [
        {
          "key": "A",
          "label": "Mission, Vision, Culture, Office locations, Swag, Tech stack",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Verified Problem, Beachhead ICP, Pricing/ACV, Sizing (TAM/SAM/SOM), Unit Economics, Decision Verdict",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Macro GDP, Stock market trends, Global population, Internet users, Hacker News rank",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! These six boxes provide an institutional-grade opportunity synthesis.",
      "feedbackIncorrect": "Focus on the 6 structured operational blocks defined in Section 14.1."
    }
  },
  {
    "num": 15,
    "title": "Common Mistakes and Honest Practice",
    "shortTitle": "Common Mistakes",
    "slug": "common-mistakes-and-honest-practice",
    "sectionsCount": 3,
    "part": "Execution & Capstone",
    "coverColor": "#0b6b83",
    "subs": "Top 10 mistakes \u00b7 Intellectual honesty \u00b7 Practice",
    "lead": "The top 10 market sizing traps that destroy founder credibility, and how rigorous intellectual honesty protects your venture.",
    "inThisChapter": "The 10 fatal sizing errors \u00b7 Detecting confirmation bias \u00b7 When to kill an unviable problem \u00b7 Practice",
    "practicePrompt": "Audit a peer's market sizing model and identify at least two unverified assumptions.",
    "sections": [
      {
        "id": "c2-s151",
        "sectionNumber": "15.1",
        "title": "The top 10 market sizing mistakes",
        "content": [
          "Avoid these ten recurring credibility traps seen in startup submissions:"
        ],
        "points": [
          {
            "bold": "1. The 1% of China fallacy:",
            "text": "Claiming 1% of a multi-billion dollar macro category without explaining distribution."
          },
          {
            "bold": "2. Counting non-buyers:",
            "text": "Including consumers or operators who have zero budget authority."
          },
          {
            "bold": "3. Cost-plus pricing in software:",
            "text": "Underpricing by pegging rates to hosting fees rather than customer savings."
          },
          {
            "bold": "4. Zero churn assumption:",
            "text": "Projecting cumulative account growth without factoring in account cancellations."
          },
          {
            "bold": "5. Conflating revenue with market volume:",
            "text": "Mixing the total gross transaction volume (GMV) with your software fee."
          },
          {
            "bold": "6. TAM as a single year:",
            "text": "Confusing cumulative multi-year spending with Annual Addressable Market."
          },
          {
            "bold": "7. Omitting loaded sales salaries:",
            "text": "Calculating CAC using only ad clicks while ignoring human sales salaries."
          },
          {
            "bold": "8. Double-counting market layers:",
            "text": "Counting both the enterprise software buyer and the consumer end-user."
          },
          {
            "bold": "9. Unverifiable sources:",
            "text": "Citing anonymous blogs or AI-generated hallucinations as factual data."
          },
          {
            "bold": "10. Inability to say 'Kill':",
            "text": "Refusing to abandon an idea when the math proves the market is too small."
          }
        ]
      },
      {
        "id": "c2-s152",
        "sectionNumber": "15.2",
        "title": "Intellectual honesty and the courage to stop",
        "content": [
          "The ultimate purpose of Stuckhere Academy is to save you from wasting years of your life. If your bottom-up math reveals that the total addressable market is only $400,000, celebrate! You just saved yourself 18 months of unpaid engineering work."
        ]
      },
      {
        "id": "c2-s153",
        "sectionNumber": "15.3",
        "title": "Chapter practice",
        "content": [
          "Exercise: Review your own sizing model against the Top 10 Mistakes list. Mark every assumption as 'Verified Primary', 'Secondary Regulatory', or 'Unverified Guess'."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. What is the difference between GMV and Net Revenue?",
            "answer": "Gross Merchandise Value (GMV) is the total dollar value of goods transacted through the platform; Net Revenue is the actual software take-rate or subscription fee your company retains."
          },
          {
            "question": "2. Why is discovering a tiny market a successful outcome?",
            "answer": "Because it frees your time and capital to pivot immediately to a problem with substantial scale, before incurring irreversible development and hiring costs."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the '1% of China' fallacy?",
      "options": [
        {
          "key": "A",
          "label": "Asserting that capturing a tiny arbitrary percentage of an enormous macro market proves commercial viability without explaining how specific customers are won",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "Refusing to export products internationally",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Investing exactly 1% of company capital in foreign equities",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! It hides the absence of a viable distribution and sales mechanism.",
      "feedbackIncorrect": "The fallacy refers to claiming an arbitrary fraction of a massive market without a real distribution plan."
    }
  },
  {
    "num": 16,
    "title": "Capstone Project: The Complete Market Sizing Dossier",
    "shortTitle": "Capstone Project",
    "slug": "capstone-project",
    "sectionsCount": 4,
    "part": "Execution & Capstone",
    "coverColor": "#0b6b83",
    "subs": "Project brief \u00b7 Deliverables \u00b7 Evaluation rubric \u00b7 Publishing to Stuckhere",
    "lead": "Synthesize everything: Select a verified Stuckhere problem and produce a complete, defensible Bottom-Up Market Sizing Dossier.",
    "inThisChapter": "Capstone specifications \u00b7 Required mathematical models \u00b7 The 4-pillar grading rubric \u00b7 Submitting to the platform \u00b7 Practice",
    "practicePrompt": "Submit your completed Market Sizing Dossier to the Stuckhere peer review queue.",
    "sections": [
      {
        "id": "c2-s161",
        "sectionNumber": "16.1",
        "title": "Capstone project brief",
        "content": [
          "Select any published problem statement from the Stuckhere registry that has an established Pain Score of at least 65/100.",
          "Your mission is to perform a rigorous opportunity analysis: identify the beachhead ICP, count qualified buyers using public registries, compute defensible ACV, calculate TAM/SAM/SOM, model unit economics, and formulate an executive recommendation."
        ]
      },
      {
        "id": "c2-s162",
        "sectionNumber": "16.2",
        "title": "Required deliverables",
        "content": [
          "Your capstone submission must contain three core assets:",
          "1. Executive One-Pager (PDF or Markdown): The structured 6-box summary from Chapter 14.",
          "2. The Bottom-Up Spreadsheet: Live calculations with documented inputs, assumptions, and formulas.",
          "3. Source Audit Sheet: Direct URLs and citations for all census data, regulatory registries, and pricing benchmarks."
        ]
      },
      {
        "id": "c2-s163",
        "sectionNumber": "16.3",
        "title": "The evaluation rubric",
        "content": [
          "Submissions are evaluated on four distinct criteria (25 points each, 100 points total):"
        ],
        "table": {
          "headers": [
            "Criterion",
            "What Evaluators Look For",
            "Points"
          ],
          "rows": [
            {
              "label": "Data Integrity",
              "text": "Use of Tier 1/2 verifiable sources; no arbitrary guesses",
              "highlight": true
            },
            {
              "label": "Pricing Logic",
              "text": "Anchored to documented operational pain and ROI",
              "highlight": false
            },
            {
              "label": "Unit Economics",
              "text": "Realistic LTV:CAC (>3:1) and under 12-month payback",
              "highlight": false
            },
            {
              "label": "Decision Honesty",
              "text": "Clear Go / Pivot / Kill verdict with explicit conditions",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s164",
        "sectionNumber": "16.4",
        "title": "Submitting to Stuckhere",
        "content": [
          "Upon completion, link your Opportunity Analysis directly to the problem dossier in the Stuckhere platform. Verified submissions receive platform recognition and unlock contributor credentials."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. What score is required on the evaluation rubric to earn verified badge status?",
            "answer": "A minimum composite score of 80/100 across all four rubric pillars."
          },
          {
            "question": "2. Can a project receive a top score if its final recommendation is to 'KILL' the idea?",
            "answer": "Absolutely. High-quality analysis that arrives at an honest 'Kill' verdict saves capital and receives full credit for intellectual rigor."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which of the following is true regarding the Capstone grading rubric?",
      "options": [
        {
          "key": "A",
          "label": "Projects are only approved if they claim a TAM greater than $1 Billion",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Rigorously reasoned 'Kill' decisions receive full marks for intellectual honesty and methodology",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Evaluators check only the visual design, not the spreadsheet calculations",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Methodological rigor and honest decision-making are valued above artificial optimism.",
      "feedbackIncorrect": "The Stuckhere rubric rewards methodological rigor and honest conclusions."
    }
  },
  {
    "num": 17,
    "title": "Appendices, Formulas and Master Glossary",
    "shortTitle": "Appendices & Formulas",
    "slug": "appendices-and-formula-cheat-sheet",
    "sectionsCount": 4,
    "part": "Execution & Capstone",
    "coverColor": "#0b6b83",
    "subs": "Glossary \u00b7 Formula cheat sheet \u00b7 Spreadsheet template \u00b7 Master quiz bank",
    "lead": "The definitive reference manual: equations, spreadsheet formulas, glossary of terms, and master FAQ for opportunity sizing.",
    "inThisChapter": "Complete market sizing glossary \u00b7 Ready-to-use spreadsheet formulas \u00b7 Master equation reference \u00b7 FAQ \u00b7 Practice",
    "practicePrompt": "Bookmark this reference chapter for your ongoing market validation sprints.",
    "sections": [
      {
        "id": "c2-s171",
        "sectionNumber": "17.1",
        "title": "Master formula cheat sheet",
        "content": [
          "Bookmark these mathematical formulas for all opportunity sizing calculations:"
        ],
        "points": [
          {
            "bold": "Bottom-Up TAM:",
            "text": "Qualified Target Accounts (N) \u00d7 Annual Price (P)"
          },
          {
            "bold": "SAM:",
            "text": "TAM \u00d7 Reachable Geographic % \u00d7 Product Capability %"
          },
          {
            "bold": "SOM (Year N):",
            "text": "SAM \u00d7 Sales Conversion Rate % (or Sales Rep Capacity \u00d7 Win Rate)"
          },
          {
            "bold": "Annual Contract Value (ACV):",
            "text": "Monthly Recurring Revenue (MRR) \u00d7 12"
          },
          {
            "bold": "Customer Lifespan (Months):",
            "text": "1 / (Monthly Account Churn Rate %)"
          },
          {
            "bold": "Customer Lifetime Value (LTV):",
            "text": "(Annual ACV \u00d7 Gross Margin %) / (Annual Churn Rate %)"
          },
          {
            "bold": "Customer Acquisition Cost (CAC):",
            "text": "(Total Sales & Marketing Spend) / (New Accounts Acquired)"
          },
          {
            "bold": "LTV to CAC Ratio:",
            "text": "LTV / CAC (Target: > 3.0x)"
          },
          {
            "bold": "CAC Payback Period (Months):",
            "text": "CAC / (Monthly ACV \u00d7 Gross Margin %)"
          }
        ]
      },
      {
        "id": "c2-s172",
        "sectionNumber": "17.2",
        "title": "Complete market sizing glossary",
        "content": [
          "Key definitions for quick reference across your teams and stakeholders:"
        ],
        "table": {
          "headers": [
            "Term",
            "Definition",
            "Standard Benchmark"
          ],
          "rows": [
            {
              "label": "TAM",
              "text": "Total Addressable Market (100% theoretical share)",
              "highlight": true
            },
            {
              "label": "SAM",
              "text": "Serviceable Addressable Market (Reachable geography/tier)",
              "highlight": false
            },
            {
              "label": "SOM",
              "text": "Serviceable Obtainable Market (Realistic 1-3 year target)",
              "highlight": false
            },
            {
              "label": "ICP",
              "text": "Ideal Customer Profile (The highest-affinity buyer archetype)",
              "highlight": false
            },
            {
              "label": "LTV",
              "text": "Cumulative gross profit over full customer lifespan",
              "highlight": false
            },
            {
              "label": "CAC",
              "text": "Loaded marketing and sales cost to win one client",
              "highlight": false
            },
            {
              "label": "Payback",
              "text": "Months of gross profit needed to repay acquisition cost",
              "highlight": false
            }
          ]
        }
      },
      {
        "id": "c2-s173",
        "sectionNumber": "17.3",
        "title": "Frequently Asked Questions (FAQ)",
        "content": [
          "Q: What if our TAM is less than $100 Million? Can we still build a great business?",
          "A: Absolutely. A $25 Million TAM where you capture 20% market share generates $5 Million in high-margin recurring annual revenue\u2014an extraordinary bootstrapped or family-held software business.",
          "Q: How do we size an entirely new market where customers currently use pen and paper?",
          "A: Use Value-Theory sizing from Chapter 3. Measure the hours and cash wasted on the paper process and price your tool to capture 10% to 20% of that measured waste."
        ]
      },
      {
        "id": "c2-s174",
        "sectionNumber": "17.4",
        "title": "Next steps in Stuckhere Academy",
        "content": [
          "Congratulations on completing Course 2! You now possess the tools to tell whether an authentic problem is worth dedicating your career to solving.",
          "Continue your journey with Course 3: Full-Stack Cloud for Founders to turn verified opportunities into production software."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "1. What is the single most important rule of thumb across all 18 chapters?",
            "answer": "Always build bottom-up from verified unit facts, anchor price to operational loss, and maintain the intellectual honesty to kill ideas when the math does not support them."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary formula for calculating Customer Lifetime Value (LTV)?",
      "options": [
        {
          "key": "A",
          "label": "(Annual ACV \u00d7 Gross Margin %) / Annual Churn Rate %",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "Total company funding divided by employee count",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Monthly revenue multiplied by Twitter followers",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! LTV measures cumulative gross profit across the customer relationship duration.",
      "feedbackIncorrect": "Review Section 17.1 for the LTV formula."
    }
  }
];

export const ACADEMY_CHAPTERS: AcademyChapter[] = COURSE_1_CHAPTERS;

export const ACADEMY_MODULES = ACADEMY_COURSES;

export function getCourse(slugOrId?: string): AcademyCourse {
  if (!slugOrId) return ACADEMY_COURSES[0];
  const cleaned = slugOrId.toLowerCase().trim();
  const found = ACADEMY_COURSES.find(
    (c) =>
      c.slug.toLowerCase() === cleaned ||
      c.id.toLowerCase() === cleaned ||
      ((cleaned.includes("ai") || cleaned.includes("builder")) && c.id === "course-5") ||
      ((cleaned.includes("solution") || cleaned.includes("mvp")) && c.id === "course-4") ||
      ((cleaned.includes("cloud") || cleaned.includes("full-stack")) && c.id === "course-3") ||
      (cleaned.includes("market") && c.id === "course-2") ||
      (cleaned.includes("discovery") && c.id === "course-1")
  );
  return found || ACADEMY_COURSES[0];
}

export function getCourseChapters(courseSlug?: string): AcademyChapter[] {
  if (!courseSlug) return COURSE_1_CHAPTERS;
  const cleaned = courseSlug.toLowerCase().trim();
  if (cleaned.includes("ai") || cleaned.includes("builder") || cleaned === "course-5") {
    return COURSE_5_CHAPTERS;
  }
  if (cleaned.includes("solution") || cleaned.includes("mvp") || cleaned === "course-4") {
    return COURSE_4_CHAPTERS;
  }
  if (cleaned.includes("cloud") || cleaned.includes("full-stack") || cleaned === "course-3") {
    return COURSE_3_CHAPTERS;
  }
  if (cleaned.includes("market-sizing") || cleaned === "course-2") {
    return COURSE_2_CHAPTERS;
  }
  return COURSE_1_CHAPTERS;
}

export function getCourseParts(courseSlug?: string): AcademyPart[] {
  if (!courseSlug) return COURSE_1_PARTS;
  const cleaned = courseSlug.toLowerCase().trim();
  if (cleaned.includes("ai") || cleaned.includes("builder") || cleaned === "course-5") {
    return COURSE_5_PARTS;
  }
  if (cleaned.includes("solution") || cleaned.includes("mvp") || cleaned === "course-4") {
    return COURSE_4_PARTS;
  }
  if (cleaned.includes("cloud") || cleaned.includes("full-stack") || cleaned === "course-3") {
    return COURSE_3_PARTS;
  }
  if (cleaned.includes("market-sizing") || cleaned === "course-2") {
    return COURSE_2_PARTS;
  }
  return COURSE_1_PARTS;
}

export function getChapter(
  courseSlug?: string,
  chapterSlugOrNum?: string
): AcademyChapter | undefined {
  const chapters = getCourseChapters(courseSlug);
  if (!chapterSlugOrNum) return chapters[0];

  const foundBySlug = chapters.find((c) => c.slug === chapterSlugOrNum);
  if (foundBySlug) return foundBySlug;

  const num = parseInt(chapterSlugOrNum, 10);
  if (!isNaN(num) && chapters[num]) return chapters[num];

  return undefined;
}
