import type { AcademyChapter, AcademyPart } from './academyData';

export const COURSE_4_PARTS: AcademyPart[] = [
  { name: 'All', startChapter: 0, endChapter: 17 },
  {
    name: 'Understand & Frame',
    title: 'Human-Centered Mindset, User Research & Problem Framing',
    meta: 'Chapters 0 to 3 · 4 chapters',
    items: 'Human-centered design principles, observation techniques, personas, journey mapping, and How Might We reframing.',
    startChapter: 0,
    endChapter: 3,
  },
  {
    name: 'Ideate & Prioritise',
    title: 'Ideation Techniques, Prioritisation & User Flows',
    meta: 'Chapters 4 to 6 · 3 chapters',
    items: 'Crazy 8s, SCAMPER, RICE and MoSCoW prioritization, information architecture, wireframing, and accessibility.',
    startChapter: 4,
    endChapter: 6,
  },
  {
    name: 'Prototype, MVP & Test',
    title: 'Rapid Prototyping, MVP Scoping & Pilot Execution',
    meta: 'Chapters 7 to 10 · 4 chapters',
    items: 'Figma prototypes, 14-day build sprints, riskiest assumption testing, usability benchmarking, and real-world pilot agreements.',
    startChapter: 7,
    endChapter: 10,
  },
  {
    name: 'Launch, Scale & Capstone',
    title: 'Product Metrics, Pitching, Sponsor Innovation & Capstone',
    meta: 'Chapters 11 to 17 · 7 chapters',
    items: 'Cohort retention, pitch decks, open innovation challenges, ethical AI safeguards, capstone submission, and template banks.',
    startChapter: 11,
    endChapter: 17,
  },
];

export const COURSE_4_CHAPTERS: AcademyChapter[] = [
  {
    "num": 0,
    "title": "Course Overview",
    "shortTitle": "Course Overview",
    "slug": "course-overview",
    "sectionsCount": 4,
    "part": "Understand & Frame",
    "coverColor": "#ea580c",
    "subs": "What This Subject Covers · The Five-Stage Solver Roadmap · Prerequisites · How to Use This Material",
    "lead": "A verified and sized problem still requires a thoughtful, user-validated solution. This subject guides you through the human-centered methodology of turning pain points into wireframes, clickable prototypes, scoped MVPs, and converted customer pilots.",
    "inThisChapter": "The 5-stage solver roadmap · Transitioning from problem discovery to product design · Prerequisites and tools · The capstone portfolio project",
    "practicePrompt": "Select one validated problem from the Stuckhere open directory to serve as your case study throughout this course.",
    "sections": [
      {
        "id": "c4-ch0-s01",
        "sectionNumber": "0.1",
        "title": "What This Subject Covers",
        "content": [
          "Mastering what this subject covers is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of what this subject covers, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "The one-line idea:",
            "text": "A verified problem still needs a well-designed answer. This subject teaches a human-centered way to go from problem to prototype to pilot without wasting months on features nobody needs."
          },
          {
            "bold": "What you will be able to do:",
            "text": "- Build user personas and journey maps from real interviews - Reframe a problem into clear design questions - Generate, compare and prioritise solution ideas - Wireframe and prototype quickly - Define and ship a minimum viable product - Test with users and run a pilot with a real customer - Pitch the result to judges, sponsors and customers"
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of what this subject covers is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch0-s02",
        "sectionNumber": "0.2",
        "title": "The Five-Stage Solver Roadmap",
        "content": [
          "Mastering the five-stage solver roadmap is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of the five-stage solver roadmap, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Stage 1: Understand:",
            "text": "Practical guidance on stage 1: understand to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Stage 2: Define:",
            "text": "Practical guidance on stage 2: define to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Stage 3: Ideate and prioritise:",
            "text": "Practical guidance on stage 3: ideate and prioritise to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Stage 4: Prototype and test:",
            "text": "Practical guidance on stage 4: prototype and test to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Stage 5: Pilot and iterate:",
            "text": "Practical guidance on stage 5: pilot and iterate to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Stage 1: Understand",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Stage 2: Define",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Stage 3: Ideate and prioritise",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch0-s03",
        "sectionNumber": "0.3",
        "title": "Prerequisites",
        "content": [
          "Mastering prerequisites is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of prerequisites, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Subject 1: Problem Discovery & Validation:",
            "text": "Practical guidance on subject 1: problem discovery & validation to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Subject 2: Market Sizing & Opportunity Analysis:",
            "text": "Practical guidance on subject 2: market sizing & opportunity analysis to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Subject 3 (Full-Stack Cloud) is helpful but not required; no-code paths are covered:",
            "text": "Practical guidance on subject 3 (full-stack cloud) is helpful but not required; no-code paths are covered to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch0-s04",
        "sectionNumber": "0.4",
        "title": "How to Use This Material",
        "content": [
          "Mastering how to use this material is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of how to use this material, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Suggested path (12 to 16 hours with practice):",
            "text": "Practical guidance on suggested path (12 to 16 hours with practice) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Chapter format: Concept, Method, Template, Exercise, Checkpoint Quiz:",
            "text": "Practical guidance on chapter format: concept, method, template, exercise, checkpoint quiz to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Working on one real problem from the Stuckhere catalog throughout:",
            "text": "Practical guidance on working on one real problem from the stuckhere catalog throughout to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary danger of jumping straight into full-scale software development immediately after validating a problem?",
      "options": [
        {
          "key": "A",
          "label": "Building complex features that users do not actually need or use in their daily workflow",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "Cloud hosting costs automatically triple on day one",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "You cannot file for trademark protection without wireframes",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "No-code tools refuse to connect to SQL databases",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Without human-centered prototyping and MVP testing, teams routinely waste months engineering features that solve secondary issues rather than core bottlenecks.",
      "feedbackIncorrect": "Review Section 0.1: The main risk of rushing past solution design is building unnecessary features that real operators won't adopt."
    }
  },
  {
    "num": 1,
    "title": "The Human-Centered Mindset",
    "shortTitle": "Human-Centered Mindset",
    "slug": "human-centered-mindset",
    "sectionsCount": 5,
    "part": "Understand & Frame",
    "coverColor": "#ea580c",
    "subs": "Why Technology-First Fails · Principles of Human-Centered Design · The Double Diamond · Solving Within Constraints · and 1 more sections",
    "lead": "Technology is only valuable when it improves a human's lived experience or workplace outcome. Human-centered design prevents builders from falling in love with clever technology rather than practical utility.",
    "inThisChapter": "Why technology-first approaches fail · The 4 core principles of HCD · The Double Diamond model · Designing within strict real-world constraints",
    "practicePrompt": "Audit one digital product you use weekly. Identify two features that feel engineered for demos rather than real human workflows.",
    "sections": [
      {
        "id": "c4-ch1-s01",
        "sectionNumber": "1.1",
        "title": "Why Technology-First Fails",
        "content": [
          "Mastering why technology-first fails is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of why technology-first fails, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Building what is easy rather than what is needed:",
            "text": "Practical guidance on building what is easy rather than what is needed to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Features nobody asked for:",
            "text": "Practical guidance on features nobody asked for to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Products that work in demos but not in workplaces:",
            "text": "Practical guidance on products that work in demos but not in workplaces to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of why technology-first fails is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch1-s02",
        "sectionNumber": "1.2",
        "title": "Principles of Human-Centered Design",
        "content": [
          "Mastering principles of human-centered design is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of principles of human-centered design, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Start with people, not technology:",
            "text": "Practical guidance on start with people, not technology to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Design with users, not for them:",
            "text": "Practical guidance on design with users, not for them to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Test early with rough versions:",
            "text": "Practical guidance on test early with rough versions to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Iterate in short cycles:",
            "text": "Practical guidance on iterate in short cycles to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Start with people, not technology",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Design with users, not for them",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Test early with rough versions",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch1-s03",
        "sectionNumber": "1.3",
        "title": "The Double Diamond",
        "content": [
          "Mastering the double diamond is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of the double diamond, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Diverge and converge on the problem:",
            "text": "Practical guidance on diverge and converge on the problem to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Diverge and converge on the solution:",
            "text": "Practical guidance on diverge and converge on the solution to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Mapping it to the five-stage roadmap:",
            "text": "Practical guidance on mapping it to the five-stage roadmap to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch1-s04",
        "sectionNumber": "1.4",
        "title": "Solving Within Constraints",
        "content": [
          "Mastering solving within constraints is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of solving within constraints, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Time, money, skills and data:",
            "text": "Practical guidance on time, money, skills and data to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Regulation, privacy and safety:",
            "text": "Practical guidance on regulation, privacy and safety to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Constraints as a source of creativity:",
            "text": "Practical guidance on constraints as a source of creativity to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch1-s05",
        "sectionNumber": "1.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: audit a product you use for human-centered failures:",
            "text": "Practical guidance on exercise: audit a product you use for human-centered failures to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "In the Double Diamond design framework, what does the first diamond represent?",
      "options": [
        {
          "key": "A",
          "label": "Coding the frontend and backend simultaneously",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Diverging and converging to ensure you are solving the right problem before creating solutions",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Securing seed funding before hiring engineers",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Running two parallel marketing campaigns",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! The first diamond focuses on discovering and defining the genuine human problem before designing any answers.",
      "feedbackIncorrect": "Review Section 1.3: The first diamond diverts and converges on understanding the right problem."
    }
  },
  {
    "num": 2,
    "title": "Understanding Users Deeply",
    "shortTitle": "Understanding Users",
    "slug": "understanding-users-deeply",
    "sectionsCount": 6,
    "part": "Understand & Frame",
    "coverColor": "#ea580c",
    "subs": "Revisiting Your Research · Observation Methods · Personas · Journey Maps · and 2 more sections",
    "lead": "Great design starts with empathy grounded in hard observational evidence. Learn how to shadow operators, extract behavioral patterns, construct evidence-based personas, and map the user's emotional journey.",
    "inThisChapter": "Extracting design cues from discovery interviews · Shadowing and contextual inquiry · Evidence-based personas vs fictional stereotypes · Jobs To Be Done (JTBD) framing",
    "practicePrompt": "Create a persona card and a 5-stage customer journey map with emotional highs and lows for your target problem.",
    "sections": [
      {
        "id": "c4-ch2-s01",
        "sectionNumber": "2.1",
        "title": "Revisiting Your Research",
        "content": [
          "Mastering revisiting your research is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of revisiting your research, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Pulling insights from Subject 1 interviews:",
            "text": "Practical guidance on pulling insights from subject 1 interviews to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Filling gaps with a short second round:",
            "text": "Practical guidance on filling gaps with a short second round to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of revisiting your research is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch2-s02",
        "sectionNumber": "2.2",
        "title": "Observation Methods",
        "content": [
          "Mastering observation methods is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of observation methods, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Shadowing and day-in-the-life studies:",
            "text": "Practical guidance on shadowing and day-in-the-life studies to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Contextual inquiry:",
            "text": "Practical guidance on contextual inquiry to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Artifact review (spreadsheets, forms, registers, chat groups):",
            "text": "Practical guidance on artifact review (spreadsheets, forms, registers, chat groups) to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Shadowing and day-in-the-life studies",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Contextual inquiry",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Artifact review (spreadsheets, forms, registers, chat groups)",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch2-s03",
        "sectionNumber": "2.3",
        "title": "Personas",
        "content": [
          "Mastering personas is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of personas, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "What a useful persona contains (role, goals, frustrations, environment, tech comfort):",
            "text": "Practical guidance on what a useful persona contains (role, goals, frustrations, environment, tech comfort) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Evidence-based vs. imagined personas:",
            "text": "Practical guidance on evidence-based vs. imagined personas to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Primary, secondary and buyer personas:",
            "text": "Practical guidance on primary, secondary and buyer personas to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch2-s04",
        "sectionNumber": "2.4",
        "title": "Journey Maps",
        "content": [
          "Mastering journey maps is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of journey maps, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Stages, actions, thoughts, emotions:",
            "text": "Practical guidance on stages, actions, thoughts, emotions to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Marking pain points and opportunities:",
            "text": "Practical guidance on marking pain points and opportunities to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Current-state vs. future-state maps:",
            "text": "Practical guidance on current-state vs. future-state maps to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch2-s05",
        "sectionNumber": "2.5",
        "title": "Jobs To Be Done",
        "content": [
          "Mastering jobs to be done is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of jobs to be done, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "\"When I..., I want to..., so I can...\":",
            "text": "Practical guidance on \"when i..., i want to..., so i can...\" to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Functional, emotional and social jobs:",
            "text": "Practical guidance on functional, emotional and social jobs to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch2-s06",
        "sectionNumber": "2.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: create one persona and one journey map:",
            "text": "Practical guidance on exercise: create one persona and one journey map to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which component is essential in an evidence-based user persona?",
      "options": [
        {
          "key": "A",
          "label": "A fictional stock photo and imaginary celebrity hobbies",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Observable workplace behaviors, concrete pain triggers, and tech comfort verified by interview data",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "An astrology sign and favorite color",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The user's personal political opinions",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exact! Personas must synthesize real behavioral data and verifiable operational context, not superficial creative fiction.",
      "feedbackIncorrect": "Review Section 2.3: Evidence-based personas document real behaviors, environmental barriers, and concrete frustrations."
    }
  },
  {
    "num": 3,
    "title": "Framing the Design Challenge",
    "shortTitle": "Framing Challenge",
    "slug": "framing-the-design-challenge",
    "sectionsCount": 6,
    "part": "Understand & Frame",
    "coverColor": "#ea580c",
    "subs": "From Insight to Opportunity · Problem Reframing · How Might We Questions · Success Criteria · and 2 more sections",
    "lead": "A problem well-stated is a problem half-solved. Transform raw discovery findings into actionable How Might We statements, establish measurable success criteria, and write an airtight one-page design brief.",
    "inThisChapter": "Affinity mapping and pattern synthesis · The Five Whys for root-cause isolation · Crafting calibrated How Might We questions · Writing the one-page design brief",
    "practicePrompt": "Draft 5 How Might We questions for your problem, choose the single best one, and write a one-page design brief.",
    "sections": [
      {
        "id": "c4-ch3-s01",
        "sectionNumber": "3.1",
        "title": "From Insight to Opportunity",
        "content": [
          "Mastering from insight to opportunity is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of from insight to opportunity, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Clustering findings into themes:",
            "text": "Practical guidance on clustering findings into themes to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Affinity mapping:",
            "text": "Practical guidance on affinity mapping to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of from insight to opportunity is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch3-s02",
        "sectionNumber": "3.2",
        "title": "Problem Reframing",
        "content": [
          "Mastering problem reframing is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of problem reframing, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Five Whys:",
            "text": "Practical guidance on five whys to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Separating symptoms from root causes:",
            "text": "Practical guidance on separating symptoms from root causes to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Widening and narrowing the scope:",
            "text": "Practical guidance on widening and narrowing the scope to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Five Whys",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Separating symptoms from root causes",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Widening and narrowing the scope",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch3-s03",
        "sectionNumber": "3.3",
        "title": "How Might We Questions",
        "content": [
          "Mastering how might we questions is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of how might we questions, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Writing good HMW statements:",
            "text": "Practical guidance on writing good hmw statements to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Too broad, too narrow, just right:",
            "text": "Practical guidance on too broad, too narrow, just right to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch3-s04",
        "sectionNumber": "3.4",
        "title": "Success Criteria",
        "content": [
          "Mastering success criteria is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of success criteria, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "What must be true for users to say it worked:",
            "text": "Practical guidance on what must be true for users to say it worked to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Measurable outcomes (time saved, errors reduced, cost cut):",
            "text": "Practical guidance on measurable outcomes (time saved, errors reduced, cost cut) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Non-goals: what you will not solve:",
            "text": "Practical guidance on non-goals: what you will not solve to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch3-s05",
        "sectionNumber": "3.5",
        "title": "The Design Brief",
        "content": [
          "Mastering the design brief is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of the design brief, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "One-page brief template:",
            "text": "Practical guidance on one-page brief template to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch3-s06",
        "sectionNumber": "3.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: write five HMW questions and a design brief:",
            "text": "Practical guidance on exercise: write five hmw questions and a design brief to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the key characteristic of an effective 'How Might We' (HMW) statement?",
      "options": [
        {
          "key": "A",
          "label": "It specifies the exact software technology and database schema upfront",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It is broad enough to allow creative exploration but narrow enough to provide clear boundary conditions",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "It contains at least three legal disclaimers",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "It can be answered with a simple 'Yes' or 'No'",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! A well-framed HMW strikes the sweet spot: inspiring multiple potential solutions while keeping the team grounded in the validated friction.",
      "feedbackIncorrect": "Review Section 3.3: Good HMW questions avoid prescribing a specific tool while keeping the scope tightly focused on the pain point."
    }
  },
  {
    "num": 4,
    "title": "Ideation",
    "shortTitle": "Ideation Techniques",
    "slug": "ideation-techniques",
    "sectionsCount": 6,
    "part": "Ideate & Prioritise",
    "coverColor": "#d97706",
    "subs": "Ground Rules · Ideation Techniques · Solution Patterns · Non-Software Solutions · and 2 more sections",
    "lead": "Quantity breeds quality. Break out of obvious, incremental thinking using structured ideation frameworks like Crazy 8s, SCAMPER, cross-industry analogies, and AI-assisted solution blueprinting.",
    "inThisChapter": "Psychological safety and deferral of judgement · Crazy 8s rapid sketching · SCAMPER mutation method · Architectural solution archetypes · AI copilot ideation prompts",
    "practicePrompt": "Run a 10-minute Crazy 8s sketching sprint for your chosen design brief. Generate 8 distinct visual concept sketches.",
    "sections": [
      {
        "id": "c4-ch4-s01",
        "sectionNumber": "4.1",
        "title": "Ground Rules",
        "content": [
          "Mastering ground rules is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of ground rules, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Quantity before quality:",
            "text": "Practical guidance on quantity before quality to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Defer judgement:",
            "text": "Practical guidance on defer judgement to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Build on others' ideas:",
            "text": "Practical guidance on build on others' ideas to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of ground rules is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch4-s02",
        "sectionNumber": "4.2",
        "title": "Ideation Techniques",
        "content": [
          "Mastering ideation techniques is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of ideation techniques, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Brainstorming and brainwriting:",
            "text": "Practical guidance on brainstorming and brainwriting to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Crazy 8s:",
            "text": "Practical guidance on crazy 8s to ensure robust customer-aligned solution design."
          },
          {
            "bold": "SCAMPER:",
            "text": "Practical guidance on scamper to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Analogies from other industries:",
            "text": "Practical guidance on analogies from other industries to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Reverse brainstorming:",
            "text": "Practical guidance on reverse brainstorming to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Brainstorming and brainwriting",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Crazy 8s",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "SCAMPER",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch4-s03",
        "sectionNumber": "4.3",
        "title": "Solution Patterns",
        "content": [
          "Mastering solution patterns is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of solution patterns, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Digitising a manual workflow:",
            "text": "Practical guidance on digitising a manual workflow to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Automating repetitive steps:",
            "text": "Practical guidance on automating repetitive steps to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Connecting two sides (marketplace):",
            "text": "Practical guidance on connecting two sides (marketplace) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Alerts, dashboards and analytics:",
            "text": "Practical guidance on alerts, dashboards and analytics to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Decision-support with AI:",
            "text": "Practical guidance on decision-support with ai to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch4-s04",
        "sectionNumber": "4.4",
        "title": "Non-Software Solutions",
        "content": [
          "Mastering non-software solutions is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of non-software solutions, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Process or policy changes:",
            "text": "Practical guidance on process or policy changes to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Training and checklists:",
            "text": "Practical guidance on training and checklists to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Hardware or hybrid solutions:",
            "text": "Practical guidance on hardware or hybrid solutions to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch4-s05",
        "sectionNumber": "4.5",
        "title": "Using the AI Solver Copilot",
        "content": [
          "Mastering using the ai solver copilot is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of using the ai solver copilot, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Generating technical blueprints:",
            "text": "Practical guidance on generating technical blueprints to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checking ideas against the dossier:",
            "text": "Practical guidance on checking ideas against the dossier to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Keeping human judgement in charge:",
            "text": "Practical guidance on keeping human judgement in charge to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch4-s06",
        "sectionNumber": "4.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: produce 20 ideas and cluster them:",
            "text": "Practical guidance on exercise: produce 20 ideas and cluster them to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the foundational rule during the initial divergence phase of solution ideation?",
      "options": [
        {
          "key": "A",
          "label": "Critique every flaw immediately to save time",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Defer judgement and maximize the quantity and variety of ideas first",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Calculate financial ROI before sketching an idea",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Only accept ideas that use generative AI",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Premature evaluation kills radical innovation. Generate volume and diversity before applying evaluation filters.",
      "feedbackIncorrect": "Review Section 4.1: The primary ground rule of ideation is deferring judgement to produce maximum volume and variety."
    }
  },
  {
    "num": 5,
    "title": "Choosing What to Build",
    "shortTitle": "Choosing What to Build",
    "slug": "choosing-what-to-build",
    "sectionsCount": 6,
    "part": "Ideate & Prioritise",
    "coverColor": "#d97706",
    "subs": "Why Prioritisation Matters · Prioritisation Frameworks · Riskiest Assumption Testing · Feasibility Checks · and 2 more sections",
    "lead": "You cannot build everything at once. Use rigorous prioritisation frameworks like RICE, MoSCoW, and the Impact-Effort matrix to filter candidate ideas and isolate your riskiest unproven assumptions.",
    "inThisChapter": "The true cost of building the wrong feature · Impact vs Effort mapping · RICE scoring formulas · Riskiest Assumption Testing (RAT) across desirability, feasibility, viability",
    "practicePrompt": "Score 5 solution concepts using the RICE matrix (Reach × Impact × Confidence / Effort) and rank them objectively.",
    "sections": [
      {
        "id": "c4-ch5-s01",
        "sectionNumber": "5.1",
        "title": "Why Prioritisation Matters",
        "content": [
          "Mastering why prioritisation matters is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of why prioritisation matters, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "The cost of building the wrong thing:",
            "text": "Practical guidance on the cost of building the wrong thing to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of why prioritisation matters is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch5-s02",
        "sectionNumber": "5.2",
        "title": "Prioritisation Frameworks",
        "content": [
          "Mastering prioritisation frameworks is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of prioritisation frameworks, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Impact vs. effort matrix:",
            "text": "Practical guidance on impact vs. effort matrix to ensure robust customer-aligned solution design."
          },
          {
            "bold": "RICE (reach, impact, confidence, effort):",
            "text": "Practical guidance on rice (reach, impact, confidence, effort) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "MoSCoW (must, should, could, will not):",
            "text": "Practical guidance on moscow (must, should, could, will not) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Kano model (basic, performance, delight):",
            "text": "Practical guidance on kano model (basic, performance, delight) to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Impact vs. effort matrix",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "RICE (reach, impact, confidence, effort)",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "MoSCoW (must, should, could, will not)",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch5-s03",
        "sectionNumber": "5.3",
        "title": "Riskiest Assumption Testing",
        "content": [
          "Mastering riskiest assumption testing is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of riskiest assumption testing, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Desirability, feasibility, viability:",
            "text": "Practical guidance on desirability, feasibility, viability to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Listing and ranking assumptions:",
            "text": "Practical guidance on listing and ranking assumptions to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Designing the cheapest test for each:",
            "text": "Practical guidance on designing the cheapest test for each to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch5-s04",
        "sectionNumber": "5.4",
        "title": "Feasibility Checks",
        "content": [
          "Mastering feasibility checks is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of feasibility checks, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Team skills and time:",
            "text": "Practical guidance on team skills and time to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Data access and integrations:",
            "text": "Practical guidance on data access and integrations to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Compliance and safety risks:",
            "text": "Practical guidance on compliance and safety risks to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch5-s05",
        "sectionNumber": "5.5",
        "title": "Making the Final Choice",
        "content": [
          "Mastering making the final choice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of making the final choice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "A decision log:",
            "text": "Practical guidance on a decision log to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Agreeing as a team:",
            "text": "Practical guidance on agreeing as a team to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch5-s06",
        "sectionNumber": "5.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: score your ideas with two frameworks:",
            "text": "Practical guidance on exercise: score your ideas with two frameworks to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "In the RICE scoring model, how is the final priority score calculated?",
      "options": [
        {
          "key": "A",
          "label": "(Reach + Impact + Confidence) / Effort",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "(Reach × Impact × Confidence) / Effort",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Effort / (Reach × Impact)",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Revenue × Cost × Engineers",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exactly right! (Reach × Impact × Confidence) / Effort balances scale, magnitude, and certainty against implementation cost.",
      "feedbackIncorrect": "Review Section 5.2: The RICE formula multiplies Reach, Impact, and Confidence, then divides the product by Effort."
    }
  },
  {
    "num": 6,
    "title": "User Flows and Wireframes",
    "shortTitle": "User Flows & Wireframes",
    "slug": "user-flows-and-wireframes",
    "sectionsCount": 6,
    "part": "Ideate & Prioritise",
    "coverColor": "#d97706",
    "subs": "Information Architecture · User Flows · Wireframing · Interface Design Basics · and 2 more sections",
    "lead": "Translate prioritized features into clear step-by-step screen sequences. Master low-fidelity wireframing, information architecture, cognitive load reduction, and MNC accessibility guidelines.",
    "inThisChapter": "Information architecture hierarchy · Happy path and edge case flowcharts · Low-fidelity paper and digital wireframing · WCAG 2.1 AA accessibility and light theme design tokens",
    "practicePrompt": "Map the 4-step user flow of your core action and draw low-fidelity wireframes for the two primary screens.",
    "sections": [
      {
        "id": "c4-ch6-s01",
        "sectionNumber": "6.1",
        "title": "Information Architecture",
        "content": [
          "Mastering information architecture is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of information architecture, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Listing screens and content:",
            "text": "Practical guidance on listing screens and content to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Navigation structures:",
            "text": "Practical guidance on navigation structures to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of information architecture is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch6-s02",
        "sectionNumber": "6.2",
        "title": "User Flows",
        "content": [
          "Mastering user flows is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of user flows, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Happy path:",
            "text": "Practical guidance on happy path to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Edge cases and errors:",
            "text": "Practical guidance on edge cases and errors to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Drawing a flow diagram:",
            "text": "Practical guidance on drawing a flow diagram to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Happy path",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Edge cases and errors",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Drawing a flow diagram",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch6-s03",
        "sectionNumber": "6.3",
        "title": "Wireframing",
        "content": [
          "Mastering wireframing is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of wireframing, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Paper sketches:",
            "text": "Practical guidance on paper sketches to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Low-fidelity digital wireframes:",
            "text": "Practical guidance on low-fidelity digital wireframes to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Layout, hierarchy and spacing:",
            "text": "Practical guidance on layout, hierarchy and spacing to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch6-s04",
        "sectionNumber": "6.4",
        "title": "Interface Design Basics",
        "content": [
          "Mastering interface design basics is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of interface design basics, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Clarity over decoration:",
            "text": "Practical guidance on clarity over decoration to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Forms that people finish:",
            "text": "Practical guidance on forms that people finish to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Mobile-first thinking:",
            "text": "Practical guidance on mobile-first thinking to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Colour, type and contrast:",
            "text": "Practical guidance on colour, type and contrast to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch6-s05",
        "sectionNumber": "6.5",
        "title": "Accessibility and Inclusion",
        "content": [
          "Mastering accessibility and inclusion is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of accessibility and inclusion, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Screen readers, keyboard use and colour blindness:",
            "text": "Practical guidance on screen readers, keyboard use and colour blindness to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Low-literacy and local-language design:",
            "text": "Practical guidance on low-literacy and local-language design to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Low bandwidth and older devices:",
            "text": "Practical guidance on low bandwidth and older devices to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch6-s06",
        "sectionNumber": "6.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: wireframe the core flow in five screens:",
            "text": "Practical guidance on exercise: wireframe the core flow in five screens to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why should initial wireframes be created in low fidelity (grayscale, basic boxes) rather than pixel-perfect color designs?",
      "options": [
        {
          "key": "A",
          "label": "Because designers do not know what colors look good",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It keeps feedback focused on structure, hierarchy, and flow rather than aesthetic minutiae",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Low-fidelity wireframes load faster in web browsers",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "It is required by international patent treaties",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Low-fidelity wireframes prevent premature debates about button colors and fonts, focusing stakeholder attention on workflow logic.",
      "feedbackIncorrect": "Review Section 6.3: Grayscale wireframing centers discussion on user goals, information hierarchy, and navigation flow."
    }
  },
  {
    "num": 7,
    "title": "Prototyping",
    "shortTitle": "Prototyping",
    "slug": "prototyping-methods",
    "sectionsCount": 6,
    "part": "Prototype, MVP & Test",
    "coverColor": "#c2410c",
    "subs": "Why Prototype · Types of Prototypes · Tools · Prototype Planning · and 2 more sections",
    "lead": "If a picture is worth a thousand words, a prototype is worth a thousand meetings. Learn how to construct clickable Figma prototypes, paper simulations, and interactive mockups in rapid 14-day sprint cycles.",
    "inThisChapter": "The Prototype Fidelity Ladder · Clickable Figma interactions · Wizard of Oz and concierge testing · Planning the 14-day sprint roadmap",
    "practicePrompt": "Connect your 4 wireframe screens into a clickable prototype link with interactive tap/click transitions.",
    "sections": [
      {
        "id": "c4-ch7-s01",
        "sectionNumber": "7.1",
        "title": "Why Prototype",
        "content": [
          "Mastering why prototype is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of why prototype, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Learn before you build:",
            "text": "Practical guidance on learn before you build to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Fidelity: matching effort to the question:",
            "text": "Practical guidance on fidelity: matching effort to the question to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of why prototype is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch7-s02",
        "sectionNumber": "7.2",
        "title": "Types of Prototypes",
        "content": [
          "Mastering types of prototypes is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of types of prototypes, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Paper and clickable mockups:",
            "text": "Practical guidance on paper and clickable mockups to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Concierge: do the service manually:",
            "text": "Practical guidance on concierge: do the service manually to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Wizard of Oz: looks automated, run by hand:",
            "text": "Practical guidance on wizard of oz: looks automated, run by hand to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Landing page and smoke tests:",
            "text": "Practical guidance on landing page and smoke tests to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Working code spike:",
            "text": "Practical guidance on working code spike to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Paper and clickable mockups",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Concierge: do the service manually",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Wizard of Oz: looks automated, run by hand",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch7-s03",
        "sectionNumber": "7.3",
        "title": "Tools",
        "content": [
          "Mastering tools is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of tools, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Design and prototyping tools:",
            "text": "Practical guidance on design and prototyping tools to ensure robust customer-aligned solution design."
          },
          {
            "bold": "No-code and low-code platforms:",
            "text": "Practical guidance on no-code and low-code platforms to ensure robust customer-aligned solution design."
          },
          {
            "bold": "AI-assisted prototyping and its limits:",
            "text": "Practical guidance on ai-assisted prototyping and its limits to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch7-s04",
        "sectionNumber": "7.4",
        "title": "Prototype Planning",
        "content": [
          "Mastering prototype planning is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of prototype planning, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "One question per prototype:",
            "text": "Practical guidance on one question per prototype to ensure robust customer-aligned solution design."
          },
          {
            "bold": "What to fake and what to make real:",
            "text": "Practical guidance on what to fake and what to make real to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch7-s05",
        "sectionNumber": "7.5",
        "title": "The 14-Day Sprint Revisited",
        "content": [
          "Mastering the 14-day sprint revisited is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of the 14-day sprint revisited, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Where prototyping fits in days 4 to 7:",
            "text": "Practical guidance on where prototyping fits in days 4 to 7 to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch7-s06",
        "sectionNumber": "7.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: build a clickable prototype of the core flow:",
            "text": "Practical guidance on exercise: build a clickable prototype of the core flow to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What defines a 'Wizard of Oz' prototype?",
      "options": [
        {
          "key": "A",
          "label": "A fully automated backend built in Python",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "A front-end interface that appears automated to the user but is operated manually behind the scenes by a human",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A 3D virtual reality simulation of a computer",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "A mobile application designed exclusively for tablets",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! The Wizard of Oz method validates whether users find the automated value proposition compelling before engineering the complex backend.",
      "feedbackIncorrect": "Review Section 7.2: A Wizard of Oz prototype simulates automated logic manually to test user appetite cheaply."
    }
  },
  {
    "num": 8,
    "title": "Defining the MVP",
    "shortTitle": "Defining the MVP",
    "slug": "defining-the-mvp",
    "sectionsCount": 6,
    "part": "Prototype, MVP & Test",
    "coverColor": "#c2410c",
    "subs": "What an MVP Is and Is Not · Scoping an MVP · Build, Buy or Borrow · Technical Planning for Small Teams · and 2 more sections",
    "lead": "An MVP is not a half-baked product; it is the smallest complete package of functionality that delivers real customer value. Learn how to scope ruthlessly, decide build vs buy, and timebox development.",
    "inThisChapter": "The true definition of an MVP (Earliest Testable Product) · The skateboard-to-car metaphor · Build vs Buy vs Borrow matrix · 14-day technical timeboxing",
    "practicePrompt": "List all features you initially envisioned for your product. Cut 70% of them to establish your strict Day 1 MVP scope.",
    "sections": [
      {
        "id": "c4-ch8-s01",
        "sectionNumber": "8.1",
        "title": "What an MVP Is and Is Not",
        "content": [
          "Mastering what an mvp is and is not is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of what an mvp is and is not, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Minimum means smallest test of the core value:",
            "text": "Practical guidance on minimum means smallest test of the core value to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Viable means it actually solves the job:",
            "text": "Practical guidance on viable means it actually solves the job to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Common myths (\"MVP means low quality\"):",
            "text": "Practical guidance on common myths (\"mvp means low quality\") to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of what an mvp is and is not is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch8-s02",
        "sectionNumber": "8.2",
        "title": "Scoping an MVP",
        "content": [
          "Mastering scoping an mvp is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of scoping an mvp, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Core value in one sentence:",
            "text": "Practical guidance on core value in one sentence to ensure robust customer-aligned solution design."
          },
          {
            "bold": "The one workflow that must work end to end:",
            "text": "Practical guidance on the one workflow that must work end to end to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Feature cut list: what to leave out:",
            "text": "Practical guidance on feature cut list: what to leave out to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Core value in one sentence",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "The one workflow that must work end to end",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Feature cut list: what to leave out",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch8-s03",
        "sectionNumber": "8.3",
        "title": "Build, Buy or Borrow",
        "content": [
          "Mastering build, buy or borrow is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of build, buy or borrow, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "No-code and templates:",
            "text": "Practical guidance on no-code and templates to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Third-party APIs and services:",
            "text": "Practical guidance on third-party apis and services to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Custom code only where it differentiates:",
            "text": "Practical guidance on custom code only where it differentiates to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch8-s04",
        "sectionNumber": "8.4",
        "title": "Technical Planning for Small Teams",
        "content": [
          "Mastering technical planning for small teams is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of technical planning for small teams, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Simple architecture:",
            "text": "Practical guidance on simple architecture to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Data you must store vs. data you can avoid:",
            "text": "Practical guidance on data you must store vs. data you can avoid to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Hooking into the Subject 3 stack:",
            "text": "Practical guidance on hooking into the subject 3 stack to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch8-s05",
        "sectionNumber": "8.5",
        "title": "Estimation and Timeboxing",
        "content": [
          "Mastering estimation and timeboxing is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of estimation and timeboxing, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Breaking work into small tasks:",
            "text": "Practical guidance on breaking work into small tasks to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Weekly goals and demos:",
            "text": "Practical guidance on weekly goals and demos to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Handling scope creep:",
            "text": "Practical guidance on handling scope creep to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch8-s06",
        "sectionNumber": "8.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: write an MVP spec with a must-have list and a cut list:",
            "text": "Practical guidance on exercise: write an mvp spec with a must-have list and a cut list to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "According to Henrik Kniberg's classic MVP metaphor, what is the correct way to iteratively build toward a car?",
      "options": [
        {
          "key": "A",
          "label": "Build a single tire, then an axle, then a chassis, then a car",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Build a skateboard, then a scooter, then a bicycle, then a motorcycle, then a car",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Build an entire car in secret over 5 years",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Purchase a Ferrari and rebadge it",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Brilliant! Every iteration must be a self-contained, working transportation solution that delivers immediate utility and generates user feedback.",
      "feedbackIncorrect": "Review Section 8.1: A true MVP delivers functional end-to-end value at each stage (skateboard -> bike -> car)."
    }
  },
  {
    "num": 9,
    "title": "Usability Testing",
    "shortTitle": "Usability Testing",
    "slug": "usability-testing",
    "sectionsCount": 6,
    "part": "Prototype, MVP & Test",
    "coverColor": "#c2410c",
    "subs": "Why Test With Real Users · Planning a Test · Running a Session · Measuring Usability · and 2 more sections",
    "lead": "Watching 5 real users interact with your prototype reveals 85% of usability bottlenecks. Learn how to write unbiased test scripts, run think-aloud test sessions, and measure task completion rates.",
    "inThisChapter": "Jakob Nielsen's 5-user rule · Think-aloud testing protocol · Writing task-based scenario prompts · System Usability Scale (SUS) benchmarking · Synthesizing feedback into rapid design fixes",
    "practicePrompt": "Conduct a 20-minute usability test with one peer using your clickable prototype. Note 3 moments of hesitation or confusion.",
    "sections": [
      {
        "id": "c4-ch9-s01",
        "sectionNumber": "9.1",
        "title": "Why Test With Real Users",
        "content": [
          "Mastering why test with real users is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of why test with real users, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "You are not your user:",
            "text": "Practical guidance on you are not your user to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Finding problems before launch:",
            "text": "Practical guidance on finding problems before launch to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of why test with real users is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch9-s02",
        "sectionNumber": "9.2",
        "title": "Planning a Test",
        "content": [
          "Mastering planning a test is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of planning a test, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Goals and hypotheses:",
            "text": "Practical guidance on goals and hypotheses to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Recruiting 5 to 8 representative users:",
            "text": "Practical guidance on recruiting 5 to 8 representative users to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Writing task scenarios:",
            "text": "Practical guidance on writing task scenarios to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Goals and hypotheses",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Recruiting 5 to 8 representative users",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Writing task scenarios",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch9-s03",
        "sectionNumber": "9.3",
        "title": "Running a Session",
        "content": [
          "Mastering running a session is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of running a session, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Think-aloud protocol:",
            "text": "Practical guidance on think-aloud protocol to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Staying neutral and silent:",
            "text": "Practical guidance on staying neutral and silent to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Recording and consent:",
            "text": "Practical guidance on recording and consent to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch9-s04",
        "sectionNumber": "9.4",
        "title": "Measuring Usability",
        "content": [
          "Mastering measuring usability is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of measuring usability, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Task success and time on task:",
            "text": "Practical guidance on task success and time on task to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Error counts:",
            "text": "Practical guidance on error counts to ensure robust customer-aligned solution design."
          },
          {
            "bold": "System Usability Scale (SUS):",
            "text": "Practical guidance on system usability scale (sus) to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch9-s05",
        "sectionNumber": "9.5",
        "title": "Analysing and Acting",
        "content": [
          "Mastering analysing and acting is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of analysing and acting, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Issue logs and severity ratings:",
            "text": "Practical guidance on issue logs and severity ratings to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Fixing the top three issues first:",
            "text": "Practical guidance on fixing the top three issues first to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Retesting:",
            "text": "Practical guidance on retesting to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch9-s06",
        "sectionNumber": "9.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: run five tests on your prototype and report results:",
            "text": "Practical guidance on exercise: run five tests on your prototype and report results to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the single most important rule when facilitating a think-aloud usability testing session?",
      "options": [
        {
          "key": "A",
          "label": "Explain to the user how clever the software is whenever they get stuck",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Remain silent, observe the user's natural struggles, and ask them to verbalize their thoughts without leading them",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Fill in the form fields for them so the test finishes faster",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Argue with the user if they click the wrong button",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exactly right! Facilitators must never defend or explain the design; your only job is to observe where the interface fails to communicate intuitively.",
      "feedbackIncorrect": "Review Section 9.3: Keep quiet, avoid leading questions, and prompt the user to speak their thoughts aloud."
    }
  },
  {
    "num": 10,
    "title": "Running a Pilot",
    "shortTitle": "Running a Pilot",
    "slug": "running-a-pilot",
    "sectionsCount": 7,
    "part": "Prototype, MVP & Test",
    "coverColor": "#c2410c",
    "subs": "What a Pilot Is · Finding a Pilot Partner · Pilot Proposal · Pilot Agreement Basics · and 3 more sections",
    "lead": "A prototype tests usability; a pilot tests real operational commitment. Learn how to secure design partners, draft a mutually protective pilot agreement, manage the 30-day live test, and convert pilots into paid contracts.",
    "inThisChapter": "Design partner recruitment criteria · The 3-part pilot proposal · Non-disclosure and data privacy fundamentals · Weekly operational cadences · Conversion criteria into paid annual contracts",
    "practicePrompt": "Draft a one-page Pilot Agreement Letter outlining customer responsibilities, launch dates, and success criteria for conversion.",
    "sections": [
      {
        "id": "c4-ch10-s01",
        "sectionNumber": "10.1",
        "title": "What a Pilot Is",
        "content": [
          "Mastering what a pilot is is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of what a pilot is, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "A small, real-world trial with a real organisation:",
            "text": "Practical guidance on a small, real-world trial with a real organisation to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Pilot vs. demo vs. full rollout:",
            "text": "Practical guidance on pilot vs. demo vs. full rollout to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of what a pilot is is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch10-s02",
        "sectionNumber": "10.2",
        "title": "Finding a Pilot Partner",
        "content": [
          "Mastering finding a pilot partner is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of finding a pilot partner, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Interviewees who offered to help:",
            "text": "Practical guidance on interviewees who offered to help to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Companies interested in the Stuckhere problem:",
            "text": "Practical guidance on companies interested in the stuckhere problem to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Sponsors and challenge owners:",
            "text": "Practical guidance on sponsors and challenge owners to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Interviewees who offered to help",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Companies interested in the Stuckhere problem",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Sponsors and challenge owners",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch10-s03",
        "sectionNumber": "10.3",
        "title": "Pilot Proposal",
        "content": [
          "Mastering pilot proposal is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of pilot proposal, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Objective, scope, duration:",
            "text": "Practical guidance on objective, scope, duration to ensure robust customer-aligned solution design."
          },
          {
            "bold": "What the partner provides and what you provide:",
            "text": "Practical guidance on what the partner provides and what you provide to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Success metrics agreed in advance:",
            "text": "Practical guidance on success metrics agreed in advance to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Pricing and commitment for the next step:",
            "text": "Practical guidance on pricing and commitment for the next step to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch10-s04",
        "sectionNumber": "10.4",
        "title": "Pilot Agreement Basics",
        "content": [
          "Mastering pilot agreement basics is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of pilot agreement basics, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Data handling and confidentiality:",
            "text": "Practical guidance on data handling and confidentiality to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Intellectual property and ownership:",
            "text": "Practical guidance on intellectual property and ownership to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Liability and support expectations:",
            "text": "Practical guidance on liability and support expectations to ensure robust customer-aligned solution design."
          },
          {
            "bold": "When to get legal advice:",
            "text": "Practical guidance on when to get legal advice to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch10-s05",
        "sectionNumber": "10.5",
        "title": "Running the Pilot",
        "content": [
          "Mastering running the pilot is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of running the pilot, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Onboarding users:",
            "text": "Practical guidance on onboarding users to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Weekly check-ins:",
            "text": "Practical guidance on weekly check-ins to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Logging issues and wins:",
            "text": "Practical guidance on logging issues and wins to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch10-s06",
        "sectionNumber": "10.6",
        "title": "Closing and Converting",
        "content": [
          "Mastering closing and converting is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of closing and converting, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Results report:",
            "text": "Practical guidance on results report to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Converting to a paid contract or extended pilot:",
            "text": "Practical guidance on converting to a paid contract or extended pilot to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Learning from failed pilots:",
            "text": "Practical guidance on learning from failed pilots to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch10-s07",
        "sectionNumber": "10.7",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: write a one-page pilot proposal:",
            "text": "Practical guidance on exercise: write a one-page pilot proposal to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What must be established BEFORE kicking off an enterprise or SMB product pilot?",
      "options": [
        {
          "key": "A",
          "label": "A multimillion-dollar insurance policy",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Objective, quantifiable success criteria that define when the pilot converts into a commercial engagement",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A television advertising campaign",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The founder's personal guarantee of 100% uptime",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! An unstructured pilot becomes endless free consulting. Define success benchmarks upfront that trigger commercial conversion.",
      "feedbackIncorrect": "Review Section 10.3: Never start a pilot without mutually agreed metrics that trigger paid conversion upon completion."
    }
  },
  {
    "num": 11,
    "title": "Measuring Product Success",
    "shortTitle": "Measuring Product Success",
    "slug": "measuring-product-success",
    "sectionsCount": 6,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "Choosing Metrics · Core Product Metrics · Business Metrics · Feedback Loops · and 2 more sections",
    "lead": "Vanity metrics make you feel good; actionable product metrics keep your company alive. Understand the difference between activation, retention cohorts, engagement loops, and net promoter economics.",
    "inThisChapter": "The Pirate Metrics framework (AARRR) · North Star Metric identification · Measuring weekly cohort retention curves · Qualitative customer feedback loops · Continuous A/B experimentation",
    "practicePrompt": "Define the single North Star Metric for your product and identify the 3 leading input metrics that drive it.",
    "sections": [
      {
        "id": "c4-ch11-s01",
        "sectionNumber": "11.1",
        "title": "Choosing Metrics",
        "content": [
          "Mastering choosing metrics is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of choosing metrics, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Outcome metrics vs. vanity metrics:",
            "text": "Practical guidance on outcome metrics vs. vanity metrics to ensure robust customer-aligned solution design."
          },
          {
            "bold": "One north-star metric:",
            "text": "Practical guidance on one north-star metric to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of choosing metrics is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch11-s02",
        "sectionNumber": "11.2",
        "title": "Core Product Metrics",
        "content": [
          "Mastering core product metrics is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of core product metrics, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Activation:",
            "text": "Practical guidance on activation to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Engagement and frequency:",
            "text": "Practical guidance on engagement and frequency to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Retention and churn:",
            "text": "Practical guidance on retention and churn to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Customer satisfaction and NPS:",
            "text": "Practical guidance on customer satisfaction and nps to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Activation",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Engagement and frequency",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Retention and churn",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch11-s03",
        "sectionNumber": "11.3",
        "title": "Business Metrics",
        "content": [
          "Mastering business metrics is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of business metrics, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Revenue, conversion and payback:",
            "text": "Practical guidance on revenue, conversion and payback to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Linking back to Subject 2 unit economics:",
            "text": "Practical guidance on linking back to subject 2 unit economics to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch11-s04",
        "sectionNumber": "11.4",
        "title": "Feedback Loops",
        "content": [
          "Mastering feedback loops is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of feedback loops, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "In-product feedback:",
            "text": "Practical guidance on in-product feedback to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Regular user calls:",
            "text": "Practical guidance on regular user calls to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Turning feedback into a roadmap:",
            "text": "Practical guidance on turning feedback into a roadmap to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch11-s05",
        "sectionNumber": "11.5",
        "title": "Experimentation",
        "content": [
          "Mastering experimentation is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of experimentation, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "A/B tests with small samples:",
            "text": "Practical guidance on a/b tests with small samples to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Qualitative signals when data is thin:",
            "text": "Practical guidance on qualitative signals when data is thin to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch11-s06",
        "sectionNumber": "11.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: define a metrics dashboard for your MVP:",
            "text": "Practical guidance on exercise: define a metrics dashboard for your mvp to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which metric is the single most definitive indicator of genuine Product-Market Fit (PMF)?",
      "options": [
        {
          "key": "A",
          "label": "Total cumulative user signups since launch",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "A flattening cohort retention curve where a stable percentage of users continue using the product month after month",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "The number of followers on the company's social media page",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The number of media press releases published",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Precisely! Retention is the ultimate proof of value. If users stop returning after day 30, no amount of marketing can save the product.",
      "feedbackIncorrect": "Review Section 11.2: A flat cohort retention curve proves that users derive sustained, recurring value from the product."
    }
  },
  {
    "num": 12,
    "title": "Teamwork and Hackathon Execution",
    "shortTitle": "Teamwork & Hackathons",
    "slug": "teamwork-and-hackathon-execution",
    "sectionsCount": 5,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "Forming a Team · Roles and Collaboration · Planning a 24 to 48 Hour Build · Long-Form Programmes · and 1 more sections",
    "lead": "Building great products is a team sport. Learn how to divide roles effectively across Product, Design, and Engineering, coordinate rapid 24-48 hour hackathon sprints, and execute multi-week acceleration programs.",
    "inThisChapter": "The Hacker/Hustler/Hipster trio · Clear division of ownership and decision rights · Rapid 24-hour sprint milestones · Managing burnout and feature creep during competitions",
    "practicePrompt": "Create a 48-hour sprint milestone schedule allocating specific 4-hour build blocks for design, frontend, and demo preparation.",
    "sections": [
      {
        "id": "c4-ch12-s01",
        "sectionNumber": "12.1",
        "title": "Forming a Team",
        "content": [
          "Mastering forming a team is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of forming a team, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Skills mix: builder, designer, domain expert, storyteller:",
            "text": "Practical guidance on skills mix: builder, designer, domain expert, storyteller to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Finding teammates through Stuckhere:",
            "text": "Practical guidance on finding teammates through stuckhere to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of forming a team is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch12-s02",
        "sectionNumber": "12.2",
        "title": "Roles and Collaboration",
        "content": [
          "Mastering roles and collaboration is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of roles and collaboration, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Clear ownership:",
            "text": "Practical guidance on clear ownership to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Shared task board and daily check-ins:",
            "text": "Practical guidance on shared task board and daily check-ins to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Resolving disagreements:",
            "text": "Practical guidance on resolving disagreements to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Clear ownership",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Shared task board and daily check-ins",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Resolving disagreements",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch12-s03",
        "sectionNumber": "12.3",
        "title": "Planning a 24 to 48 Hour Build",
        "content": [
          "Mastering planning a 24 to 48 hour build is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of planning a 24 to 48 hour build, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Hour-by-hour plan:",
            "text": "Practical guidance on hour-by-hour plan to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Freeze points for scope and code:",
            "text": "Practical guidance on freeze points for scope and code to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Managing energy and sleep:",
            "text": "Practical guidance on managing energy and sleep to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch12-s04",
        "sectionNumber": "12.4",
        "title": "Long-Form Programmes",
        "content": [
          "Mastering long-form programmes is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of long-form programmes, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Smart India Hackathon style multi-round challenges:",
            "text": "Practical guidance on smart india hackathon style multi-round challenges to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Mentor sessions and review rounds:",
            "text": "Practical guidance on mentor sessions and review rounds to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Staying consistent over weeks:",
            "text": "Practical guidance on staying consistent over weeks to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch12-s05",
        "sectionNumber": "12.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: write a team charter and a 48-hour plan:",
            "text": "Practical guidance on exercise: write a team charter and a 48-hour plan to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "During a high-stakes 48-hour hackathon or startup sprint, when should the team finalize the live product demo script?",
      "options": [
        {
          "key": "A",
          "label": "5 minutes before presenting to the judges",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "At the halfway mark (Hour 24), so that engineering focuses only on screens shown in the demo",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "After the competition has concluded",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Demo scripts are completely unnecessary for good coders",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exactly! Locking the demo story early prevents teams from wasting hours coding back-office settings screens that judges will never inspect.",
      "feedbackIncorrect": "Review Section 12.3: Finalizing the demo narrative midway ensures all engineering effort is focused directly on the winning presentation."
    }
  },
  {
    "num": 13,
    "title": "Pitching and Demonstrating",
    "shortTitle": "Pitching & Demos",
    "slug": "pitching-and-demonstrating",
    "sectionsCount": 6,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "The Story Structure · Slide Deck · Live Demo · Delivery · and 2 more sections",
    "lead": "A brilliant solution poorly demonstrated will lose to an average solution pitched with clarity and conviction. Master the 10-slide narrative arc, execute bulletproof live demos, and handle hostile judge Q&A with poise.",
    "inThisChapter": "The 3-act narrative pitch structure · The 10-slide investor & judge deck · Bulletproof live demo guidelines · Handling tough Q&A without defensiveness",
    "practicePrompt": "Record a 3-minute video pitch demonstrating your prototype, following the Problem -> Solution -> Proof -> Next Steps format.",
    "sections": [
      {
        "id": "c4-ch13-s01",
        "sectionNumber": "13.1",
        "title": "The Story Structure",
        "content": [
          "Mastering the story structure is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of the story structure, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Problem, people, insight, solution, proof, ask:",
            "text": "Practical guidance on problem, people, insight, solution, proof, ask to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of the story structure is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch13-s02",
        "sectionNumber": "13.2",
        "title": "Slide Deck",
        "content": [
          "Mastering slide deck is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of slide deck, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Ten slides that cover everything:",
            "text": "Practical guidance on ten slides that cover everything to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Visuals that carry the story:",
            "text": "Practical guidance on visuals that carry the story to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Using evidence from your dossier, Pain Score and market sizing:",
            "text": "Practical guidance on using evidence from your dossier, pain score and market sizing to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Ten slides that cover everything",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Visuals that carry the story",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Using evidence from your dossier, Pain Score and market sizing",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch13-s03",
        "sectionNumber": "13.3",
        "title": "Live Demo",
        "content": [
          "Mastering live demo is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of live demo, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Showing one flow, end to end:",
            "text": "Practical guidance on showing one flow, end to end to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Backup plans (video, offline mode):",
            "text": "Practical guidance on backup plans (video, offline mode) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Common demo disasters and how to avoid them:",
            "text": "Practical guidance on common demo disasters and how to avoid them to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch13-s04",
        "sectionNumber": "13.4",
        "title": "Delivery",
        "content": [
          "Mastering delivery is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of delivery, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Voice, pacing and body language:",
            "text": "Practical guidance on voice, pacing and body language to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Team handovers:",
            "text": "Practical guidance on team handovers to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Staying within time:",
            "text": "Practical guidance on staying within time to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch13-s05",
        "sectionNumber": "13.5",
        "title": "Q&A",
        "content": [
          "Mastering q&a is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of q&a, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Predicting the toughest questions:",
            "text": "Practical guidance on predicting the toughest questions to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Answering honestly when you do not know:",
            "text": "Practical guidance on answering honestly when you do not know to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch13-s06",
        "sectionNumber": "13.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: deliver a five-minute pitch and collect feedback:",
            "text": "Practical guidance on exercise: deliver a five-minute pitch and collect feedback to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the recommended fallback strategy for a live software demonstration during an investor pitch or demo day?",
      "options": [
        {
          "key": "A",
          "label": "Apologize repeatedly and attempt to debug live on the projector",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Have an offline, pre-recorded high-resolution video walkthrough ready to play with one keystroke",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Blame the conference venue's Wi-Fi network and walk off stage",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Refuse to show any software until contracts are signed",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Live conference Wi-Fi fails frequently. Experienced founders always maintain an offline backup screencast ready to play instantly.",
      "feedbackIncorrect": "Review Section 13.3: Always carry an offline 60-second backup video to guarantee your pitch succeeds even if networks crash."
    }
  },
  {
    "num": 14,
    "title": "Open Innovation and Working With Sponsors",
    "shortTitle": "Open Innovation",
    "slug": "open-innovation-and-sponsors",
    "sectionsCount": 5,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "What Open Innovation Is · Reading a Challenge Brief · Submitting Strong Entries · After the Challenge · and 1 more sections",
    "lead": "Enterprises and venture studios post real friction points to source innovative solutions. Learn how to decode challenge briefs, align with corporate sponsor priorities, and license or spin out your venture.",
    "inThisChapter": "How open innovation programs operate · Deconstructing corporate problem briefs · Crafting winning competition proposals · Post-challenge IP licensing and venture incubation",
    "practicePrompt": "Review an active corporate problem brief on Stuckhere and list 3 specific sponsor priorities you would highlight in your submission.",
    "sections": [
      {
        "id": "c4-ch14-s01",
        "sectionNumber": "14.1",
        "title": "What Open Innovation Is",
        "content": [
          "Mastering what open innovation is is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of what open innovation is, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Organisations posting problems for outside solvers:",
            "text": "Practical guidance on organisations posting problems for outside solvers to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Why enterprises and governments use it:",
            "text": "Practical guidance on why enterprises and governments use it to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of what open innovation is is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch14-s02",
        "sectionNumber": "14.2",
        "title": "Reading a Challenge Brief",
        "content": [
          "Mastering reading a challenge brief is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of reading a challenge brief, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Objectives, constraints and evaluation criteria:",
            "text": "Practical guidance on objectives, constraints and evaluation criteria to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Spotting the real need behind the brief:",
            "text": "Practical guidance on spotting the real need behind the brief to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Questions to ask the sponsor:",
            "text": "Practical guidance on questions to ask the sponsor to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Objectives, constraints and evaluation criteria",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Spotting the real need behind the brief",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Questions to ask the sponsor",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch14-s03",
        "sectionNumber": "14.3",
        "title": "Submitting Strong Entries",
        "content": [
          "Mastering submitting strong entries is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of submitting strong entries, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Matching your solution to scoring criteria:",
            "text": "Practical guidance on matching your solution to scoring criteria to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Documentation and demo requirements:",
            "text": "Practical guidance on documentation and demo requirements to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch14-s04",
        "sectionNumber": "14.4",
        "title": "After the Challenge",
        "content": [
          "Mastering after the challenge is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of after the challenge, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Pilots, procurement and grants:",
            "text": "Practical guidance on pilots, procurement and grants to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Keeping IP and relationships clear:",
            "text": "Practical guidance on keeping ip and relationships clear to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch14-s05",
        "sectionNumber": "14.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: analyse a sample challenge brief and plan a response:",
            "text": "Practical guidance on exercise: analyse a sample challenge brief and plan a response to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary motivation for global corporations to run open innovation competitions and problem bounty programs?",
      "options": [
        {
          "key": "A",
          "label": "They lack computers in their own offices",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To access agile, unconstrained external talent that can prototype solutions faster than internal corporate bureaucracies",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To avoid paying software licenses",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "To fill empty conference rooms",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exactly! Large organizations sponsor problem challenges to discover disruptive approaches that internal corporate silos struggle to incubate.",
      "feedbackIncorrect": "Review Section 14.1: Sponsors leverage open innovation to discover breakthrough thinking unencumbered by legacy corporate processes."
    }
  },
  {
    "num": 15,
    "title": "Responsible and Inclusive Design",
    "shortTitle": "Responsible Design",
    "slug": "responsible-and-inclusive-design",
    "sectionsCount": 5,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "Ethics in Product Decisions · Data and Privacy · Responsible AI · Inclusion · and 1 more sections",
    "lead": "Design decisions carry ethical weight. Learn how to protect vulnerable user data, avoid algorithmic bias, design for low-connectivity environments, and adhere to international privacy regulations.",
    "inThisChapter": "Ethical product frameworks · Data minimization and privacy by design (GDPR/DPDP) · Mitigating bias in AI-driven decisions · Designing for low-bandwidth and multilingual contexts",
    "practicePrompt": "Conduct an ethical risk audit for your solution. Identify one potential unintended consequence and document a mitigation safeguard.",
    "sections": [
      {
        "id": "c4-ch15-s01",
        "sectionNumber": "15.1",
        "title": "Ethics in Product Decisions",
        "content": [
          "Mastering ethics in product decisions is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of ethics in product decisions, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Who benefits and who might be harmed:",
            "text": "Practical guidance on who benefits and who might be harmed to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Consent and dark patterns:",
            "text": "Practical guidance on consent and dark patterns to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of ethics in product decisions is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch15-s02",
        "sectionNumber": "15.2",
        "title": "Data and Privacy",
        "content": [
          "Mastering data and privacy is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of data and privacy, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Collect less, protect more:",
            "text": "Practical guidance on collect less, protect more to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Sensitive data in health, finance and education:",
            "text": "Practical guidance on sensitive data in health, finance and education to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch15-s03",
        "sectionNumber": "15.3",
        "title": "Responsible AI",
        "content": [
          "Mastering responsible ai is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of responsible ai, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Bias in data and outputs:",
            "text": "Practical guidance on bias in data and outputs to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Transparency and human oversight:",
            "text": "Practical guidance on transparency and human oversight to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Handling errors and fallbacks:",
            "text": "Practical guidance on handling errors and fallbacks to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch15-s04",
        "sectionNumber": "15.4",
        "title": "Inclusion",
        "content": [
          "Mastering inclusion is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of inclusion, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Language, literacy and disability:",
            "text": "Practical guidance on language, literacy and disability to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Affordability and access:",
            "text": "Practical guidance on affordability and access to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch15-s05",
        "sectionNumber": "15.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Exercise: write a short risk and mitigation table for your MVP:",
            "text": "Practical guidance on exercise: write a short risk and mitigation table for your mvp to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Practical guidance on checkpoint quiz to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What does the principle of 'Data Minimization' require in software product design?",
      "options": [
        {
          "key": "A",
          "label": "Storing all customer data on small USB drives",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Collecting and storing only the specific data strictly necessary to deliver the immediate user value",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Deleting all database records every 24 hours",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Hiding user profiles from search engines",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Data you do not hold cannot be leaked or misused. Responsible design minimizes collection to what is essential for user utility.",
      "feedbackIncorrect": "Review Section 15.2: Data minimization mandates collecting only what is strictly necessary to fulfill the intended function."
    }
  },
  {
    "num": 16,
    "title": "Capstone Project",
    "shortTitle": "Capstone Project",
    "slug": "capstone-project",
    "sectionsCount": 4,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "Brief · Deliverables · Grading Rubric · Submit to Stuckhere",
    "lead": "Apply the complete 17-chapter curriculum to build, test, and publish a comprehensive Solution Dossier and prototype for a verified problem from the Stuckhere open registry.",
    "inThisChapter": "Comprehensive capstone brief · Required deliverables: Persona, HMW, Clickable Prototype, Pilot Plan · 100-point grading rubric · Publishing to the Stuckhere showcase",
    "practicePrompt": "Compile your user research, wireframes, prototype link, and pilot metrics into your final Capstone Solution Dossier.",
    "sections": [
      {
        "id": "c4-ch16-s01",
        "sectionNumber": "16.1",
        "title": "Brief",
        "content": [
          "Mastering brief is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of brief, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Take your validated and sized problem from Subjects 1 and 2:",
            "text": "Practical guidance on take your validated and sized problem from subjects 1 and 2 to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Deliver a tested prototype or MVP with pilot plan:",
            "text": "Practical guidance on deliver a tested prototype or mvp with pilot plan to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of brief is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch16-s02",
        "sectionNumber": "16.2",
        "title": "Deliverables",
        "content": [
          "Mastering deliverables is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of deliverables, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Persona, journey map and design brief:",
            "text": "Practical guidance on persona, journey map and design brief to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Idea list and prioritisation sheet:",
            "text": "Practical guidance on idea list and prioritisation sheet to ensure robust customer-aligned solution design."
          },
          {
            "bold": "User flows and wireframes:",
            "text": "Practical guidance on user flows and wireframes to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Clickable prototype or working MVP:",
            "text": "Practical guidance on clickable prototype or working mvp to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Usability test report from five users:",
            "text": "Practical guidance on usability test report from five users to ensure robust customer-aligned solution design."
          },
          {
            "bold": "One-page pilot proposal:",
            "text": "Practical guidance on one-page pilot proposal to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Five-minute pitch and deck:",
            "text": "Practical guidance on five-minute pitch and deck to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Persona, journey map and design brief",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Idea list and prioritisation sheet",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "User flows and wireframes",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch16-s03",
        "sectionNumber": "16.3",
        "title": "Grading Rubric",
        "content": [
          "Mastering grading rubric is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of grading rubric, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "User understanding (20%):",
            "text": "Practical guidance on user understanding (20%) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Problem framing and prioritisation (15%):",
            "text": "Practical guidance on problem framing and prioritisation (15%) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Design and prototype quality (20%):",
            "text": "Practical guidance on design and prototype quality (20%) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Testing evidence and iteration (25%):",
            "text": "Practical guidance on testing evidence and iteration (25%) to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Pitch and pilot readiness (20%):",
            "text": "Practical guidance on pitch and pilot readiness (20%) to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch16-s04",
        "sectionNumber": "16.4",
        "title": "Submit to Stuckhere",
        "content": [
          "Mastering submit to stuckhere is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of submit to stuckhere, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Publish your solution page under the problem:",
            "text": "Practical guidance on publish your solution page under the problem to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Share with interested companies and sponsors:",
            "text": "Practical guidance on share with interested companies and sponsors to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which artifact is NOT a mandatory requirement for the Stuckhere Academy Course 4 Capstone submission?",
      "options": [
        {
          "key": "A",
          "label": "An evidence-grounded user persona and journey map",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "A clickable interactive prototype link (Figma or web application)",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "A signed multimillion-dollar venture capital term sheet",
          "isCorrect": true
        },
        {
          "key": "D",
          "label": "A structured Pilot Proposal with measurable success criteria",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! While commercial traction is wonderful, the capstone grades your methodology: empathy, framing, prototyping, and testing rigor.",
      "feedbackIncorrect": "Review Section 16.2: The capstone requires personas, prototypes, and pilot plans—venture capital term sheets are not a prerequisite!"
    }
  },
  {
    "num": 17,
    "title": "Appendices",
    "shortTitle": "Appendices & Templates",
    "slug": "appendices-and-templates",
    "sectionsCount": 6,
    "part": "Launch, Scale & Capstone",
    "coverColor": "#b45309",
    "subs": "Glossary · Templates · One-Page Cheat Sheet · Master Quiz Bank · and 2 more sections",
    "lead": "A permanent reference library of product design templates, wireframe cheat sheets, pilot contracts, usability test scripts, and the master FAQ.",
    "inThisChapter": "Complete Product & Design Glossary · Ready-to-use Figma and Notion templates · The One-Page Solution Cheat Sheet · Master Quiz Bank and FAQ",
    "practicePrompt": "Bookmark this reference chapter to access production templates whenever you kick off a new venture build.",
    "sections": [
      {
        "id": "c4-ch17-s01",
        "sectionNumber": "17.1",
        "title": "Glossary",
        "content": [
          "Mastering glossary is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of glossary, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Persona, journey map, JTBD, HMW, wireframe, prototype, MVP, pilot, SUS, NPS, retention, scope creep:",
            "text": "Practical guidance on persona, journey map, jtbd, hmw, wireframe, prototype, mvp, pilot, sus, nps, retention, scope creep to ensure robust customer-aligned solution design."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Compass:",
          "text": "Never build what can be tested faster with a prototype. The goal of glossary is maximizing learning velocity per dollar spent."
        }
      },
      {
        "id": "c4-ch17-s02",
        "sectionNumber": "17.2",
        "title": "Templates",
        "content": [
          "Mastering templates is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of templates, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Persona canvas:",
            "text": "Practical guidance on persona canvas to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Journey map grid:",
            "text": "Practical guidance on journey map grid to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Design brief:",
            "text": "Practical guidance on design brief to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Prioritisation sheet:",
            "text": "Practical guidance on prioritisation sheet to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Usability test script and issue log:",
            "text": "Practical guidance on usability test script and issue log to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Pilot proposal:",
            "text": "Practical guidance on pilot proposal to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Pitch deck outline:",
            "text": "Practical guidance on pitch deck outline to ensure robust customer-aligned solution design."
          }
        ],
        "table": {
          "headers": [
            "Stage / Element",
            "Focus",
            "Key Output"
          ],
          "rows": [
            {
              "label": "Persona canvas",
              "text": "Primary user requirements",
              "text2": "Dossier alignment"
            },
            {
              "label": "Journey map grid",
              "text": "Design & execution",
              "text2": "Working prototype"
            },
            {
              "label": "Design brief",
              "text": "Validation & metrics",
              "text2": "Pilot conversion"
            }
          ]
        }
      },
      {
        "id": "c4-ch17-s03",
        "sectionNumber": "17.3",
        "title": "One-Page Cheat Sheet",
        "content": [
          "Mastering one-page cheat sheet is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of one-page cheat sheet, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "The loop: Understand, Define, Ideate, Prioritise, Prototype, Test, Pilot, Measure:",
            "text": "Practical guidance on the loop: understand, define, ideate, prioritise, prototype, test, pilot, measure to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch17-s04",
        "sectionNumber": "17.4",
        "title": "Master Quiz Bank",
        "content": [
          "Mastering master quiz bank is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of master quiz bank, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "multiple-choice questions grouped by chapter:",
            "text": "Practical guidance on multiple-choice questions grouped by chapter to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch17-s05",
        "sectionNumber": "17.5",
        "title": "Further Reading",
        "content": [
          "Mastering further reading is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of further reading, isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "Books on design thinking, lean product development and usability:",
            "text": "Practical guidance on books on design thinking, lean product development and usability to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Related Stuckhere pages: How to Solve, Startup Mode, Open Innovation:",
            "text": "Practical guidance on related stuckhere pages: how to solve, startup mode, open innovation to ensure robust customer-aligned solution design."
          }
        ]
      },
      {
        "id": "c4-ch17-s06",
        "sectionNumber": "17.6",
        "title": "FAQ (good for Schema.org FAQPage SEO)",
        "content": [
          "Mastering faq (good for schema.org faqpage seo) is vital when translating validated market friction into a high-utility solution. Teams that follow disciplined design principles reduce time to initial customer adoption by over 60%.",
          "In this section, we examine the concrete mechanics of faq (good for schema.org faqpage seo), isolating actionable heuristics, risk mitigation strategies, and industry best practices tested across venture studios and high-growth startups."
        ],
        "points": [
          {
            "bold": "How many users do I need to test with?:",
            "text": "Practical guidance on how many users do i need to test with? to ensure robust customer-aligned solution design."
          },
          {
            "bold": "Should my MVP be coded or no-code?:",
            "text": "Practical guidance on should my mvp be coded or no-code? to ensure robust customer-aligned solution design."
          },
          {
            "bold": "How do I find a pilot partner as a student team?:",
            "text": "Practical guidance on how do i find a pilot partner as a student team? to ensure robust customer-aligned solution design."
          },
          {
            "bold": "What if users do not behave the way I expected?:",
            "text": "Practical guidance on what if users do not behave the way i expected? to ensure robust customer-aligned solution design."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary benefit of maintaining standard design and testing templates across all product experiments?",
      "options": [
        {
          "key": "A",
          "label": "It eliminates the need to interview any users",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It enforces consistent rigor, speeds up execution cycles, and allows apples-to-apples comparison of ideas",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "It guarantees that software will never contain bugs",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "It automatically files patents in all 50 US states",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Brilliant! Standardized templates accelerate testing velocity while ensuring no critical discovery or validation step is forgotten.",
      "feedbackIncorrect": "Review Section 17.2: Standard templates enforce rigorous quality and eliminate friction when kicking off new build sprints."
    }
  }
];
