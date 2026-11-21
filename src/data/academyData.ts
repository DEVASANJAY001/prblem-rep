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

export interface AcademyCourse {
  id: string;
  n: number;
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  live: boolean;
  meta: string;
  chaptersCount: number;
  sectionsCount: number;
}

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
  },
  {
    id: "course-2",
    n: 2,
    slug: "market-sizing-and-opportunity",
    title: "Market Sizing & Opportunity",
    level: "Intermediate",
    live: false,
    meta: "Coming soon",
    chaptersCount: 8,
    sectionsCount: 36,
  },
  {
    id: "course-3",
    n: 3,
    slug: "full-stack-cloud-for-founders",
    title: "Full-Stack Cloud for Founders",
    level: "Advanced",
    live: false,
    meta: "Coming soon",
    chaptersCount: 10,
    sectionsCount: 42,
  },
];

export const ACADEMY_MODULES = ACADEMY_COURSES;

export const ACADEMY_CHAPTERS: AcademyChapter[] = [
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
