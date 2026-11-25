import { AcademyChapter } from "./academyData";

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
