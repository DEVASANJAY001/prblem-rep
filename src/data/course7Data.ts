import type { AcademyChapter, AcademyPart } from './academyData';

export const COURSE_7_PARTS: AcademyPart[] = [
  {
    "name": "All",
    "startChapter": 0,
    "endChapter": 17
  },
  {
    "name": "Strategy, Challenges & Teams",
    "title": "Hackathon Landscape, Decoding Challenges & Squad Dynamics",
    "meta": "Chapters 0 to 3 · 4 chapters",
    "items": "Landscape overview, decoding prompts like a judge, selecting strategic challenges, and forming balanced 4-person builder squads.",
    "startChapter": 0,
    "endChapter": 3
  },
  {
    "name": "Rapid Research & Build Sprint",
    "title": "Fast Research, Scoping, Stacks & 36-Hour Build Execution",
    "meta": "Chapters 4 to 7 · 4 chapters",
    "items": "3-hour discovery briefs, Crazy 8s scoping matrix, speed-optimized tech stacks, and hour-by-hour sprint execution with feature freezes.",
    "startChapter": 4,
    "endChapter": 7
  },
  {
    "name": "Design, AI, Pitch & Submission",
    "title": "Speed UX, Responsible AI, GitHub Submissions & Demo Day",
    "meta": "Chapters 8 to 11 · 4 chapters",
    "items": "3-click judge UX, AI multiplier guardrails, README & 2-min demo video anatomy, and the 5-minute winning pitch framework.",
    "startChapter": 8,
    "endChapter": 11
  },
  {
    "name": "Judging, Pilots & Capstone",
    "title": "Rubric Engineering, Enterprise Pilots, Post-Event & Capstone",
    "meta": "Chapters 12 to 17 · 6 chapters",
    "items": "100-point rubric breakdown, sponsor pilot conversions, IP/legal terms, ethical fair play, full 48-hour capstone, and template appendices.",
    "startChapter": 12,
    "endChapter": 17
  }
];

export const COURSE_7_CHAPTERS: AcademyChapter[] = [
  {
    "num": 0,
    "title": "Course Overview",
    "shortTitle": "Course Overview",
    "slug": "course-overview",
    "sectionsCount": 4,
    "part": "Strategy, Challenges & Teams",
    "coverColor": "#6366f1",
    "subs": "What This Subject Covers · Who This Is For · Prerequisites · How to Use This Material",
    "lead": "Hackathons and open-innovation challenges are the fastest route from a verified problem to a real audience, a mentor, a pilot, or a prize. This subject teaches you how to prepare, build, present, and follow up so your sprint leads to a real venture.",
    "inThisChapter": "What This Subject Covers · Who This Is For · Prerequisites · How to Use This Material",
    "practicePrompt": "Apply the principles of course overview to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch0-s01",
        "sectionNumber": "0.1",
        "title": "What This Subject Covers",
        "content": [
          "Understanding what this subject covers is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around what this subject covers significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for what this subject covers. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "The one-line idea:",
            "text": "Field-tested operational guidelines on the one-line idea designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "What you will be able to do:",
            "text": "Field-tested operational guidelines on what you will be able to do designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling what this subject covers, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch0-s02",
        "sectionNumber": "0.2",
        "title": "Who This Is For",
        "content": [
          "Understanding who this is for is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around who this is for significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for who this is for. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Students and first-time participants:",
            "text": "Field-tested operational guidelines on students and first-time participants designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Experienced participants who want to win more often:",
            "text": "Field-tested operational guidelines on experienced participants who want to win more often designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Mentors, organisers and challenge sponsors:",
            "text": "Field-tested operational guidelines on mentors, organisers and challenge sponsors designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling who this is for, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch0-s03",
        "sectionNumber": "0.3",
        "title": "Prerequisites",
        "content": [
          "Understanding prerequisites is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around prerequisites significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for prerequisites. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Basic programming or design skills:",
            "text": "Field-tested operational guidelines on basic programming or design skills designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Subjects 1 to 4 recommended, especially Problem Discovery and Solution Design:",
            "text": "Field-tested operational guidelines on subjects 1 to 4 recommended, especially problem discovery and solution design designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling prerequisites, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch0-s04",
        "sectionNumber": "0.4",
        "title": "How to Use This Material",
        "content": [
          "Understanding how to use this material is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around how to use this material significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for how to use this material. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Suggested path (10 to 14 hours with practice):",
            "text": "Field-tested operational guidelines on suggested path (10 to 14 hours with practice) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Chapter format: Concept, Playbook, Template, Exercise, Checkpoint Quiz:",
            "text": "Field-tested operational guidelines on chapter format: concept, playbook, template, exercise, checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Using Stuckhere problem dossiers as practice challenges:",
            "text": "Field-tested operational guidelines on using stuckhere problem dossiers as practice challenges designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling how to use this material, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the primary objective of participating in hackathons and open-innovation challenges?",
      "options": [
        {
          "key": "A",
          "label": "To spend 48 hours without sleep building complex backend infrastructure with 50 microservices",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To move rapidly from a verified problem to a working prototype, real user feedback, mentor access, or a commercial pilot",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To present slide decks without building any working software or prototype",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "To write full production documentation and achieve SOC-2 compliance over the weekend",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Hackathons are the fastest vehicle to validate problems, pressure-test solutions with real judges and users, and build momentum toward pilots and startups.",
      "feedbackIncorrect": "Not quite. Hackathons are about rapid problem validation, prototype delivery, and turning event traction into real pilots or ventures."
    }
  },
  {
    "num": 1,
    "title": "The Hackathon and Open Innovation Landscape",
    "shortTitle": "Hackathon & Open Innovat",
    "slug": "the-hackathon-and-open-innovation-landscape",
    "sectionsCount": 5,
    "part": "Strategy, Challenges & Teams",
    "coverColor": "#0284c7",
    "subs": "Types of Events · Why Participate · How Organisers and Sponsors Think · Setting Your Goal · Chapter Practice",
    "lead": "Not all hackathons are created equal. Understand the differences between 36-hour sprint hackathons, multi-round national programs like SIH, corporate challenges, and civic open-innovation platforms to choose events aligned with your goals.",
    "inThisChapter": "Types of Events · Why Participate · How Organisers and Sponsors Think · Setting Your Goal",
    "practicePrompt": "Apply the principles of the hackathon and open innovation landscape to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch1-s01",
        "sectionNumber": "1.1",
        "title": "Types of Events",
        "content": [
          "Understanding types of events is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around types of events significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for types of events. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Short sprints (24 to 48 hours):",
            "text": "Field-tested operational guidelines on short sprints (24 to 48 hours) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Multi-round national programmes (such as Smart India Hackathon style events):",
            "text": "Field-tested operational guidelines on multi-round national programmes (such as smart india hackathon style events) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Corporate and enterprise challenges:",
            "text": "Field-tested operational guidelines on corporate and enterprise challenges designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "University and community hackathons:",
            "text": "Field-tested operational guidelines on university and community hackathons designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Online and global hackathons:",
            "text": "Field-tested operational guidelines on online and global hackathons designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Social-impact and civic challenges:",
            "text": "Field-tested operational guidelines on social-impact and civic challenges designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling types of events, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch1-s02",
        "sectionNumber": "1.2",
        "title": "Why Participate",
        "content": [
          "Understanding why participate is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around why participate significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for why participate. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Learning fast with real constraints:",
            "text": "Field-tested operational guidelines on learning fast with real constraints designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Portfolio, networking and mentorship:",
            "text": "Field-tested operational guidelines on portfolio, networking and mentorship designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Prizes, grants, internships and pilots:",
            "text": "Field-tested operational guidelines on prizes, grants, internships and pilots designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Finding co-founders:",
            "text": "Field-tested operational guidelines on finding co-founders designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling why participate, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/hackathon-landscape-matrix.svg",
          "caption": "Figure 1.1: The 4 Primary Hackathon & Open Innovation Event Models and Strategic Goals.",
          "alt": "Hackathon Landscape Matrix Diagram"
        }
      },
      {
        "id": "c7-ch1-s03",
        "sectionNumber": "1.3",
        "title": "How Organisers and Sponsors Think",
        "content": [
          "Understanding how organisers and sponsors think is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around how organisers and sponsors think significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for how organisers and sponsors think. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Why organisations run challenges:",
            "text": "Field-tested operational guidelines on why organisations run challenges designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "What sponsors hope to get:",
            "text": "Field-tested operational guidelines on what sponsors hope to get designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "What they usually do not provide (real data, long-term commitment):",
            "text": "Field-tested operational guidelines on what they usually do not provide (real data, long-term commitment) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling how organisers and sponsors think, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch1-s04",
        "sectionNumber": "1.4",
        "title": "Setting Your Goal",
        "content": [
          "Understanding setting your goal is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around setting your goal significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for setting your goal. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Learn, win, network or launch:",
            "text": "Field-tested operational guidelines on learn, win, network or launch designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Matching goal to event type:",
            "text": "Field-tested operational guidelines on matching goal to event type designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling setting your goal, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch1-s05",
        "sectionNumber": "1.5",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: list five upcoming events and score them against your goals:",
            "text": "Field-tested operational guidelines on exercise: list five upcoming events and score them against your goals designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "How do short 36-hour sprint hackathons differ from national programs like the Smart India Hackathon (SIH)?",
      "options": [
        {
          "key": "A",
          "label": "Short sprints emphasize rapid demo-ready prototypes and fast iterations, while national programs require multi-round screenings, formal compliance, and institutional adoption paths",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "National programs do not care about real-world problem statements",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Short sprints require venture capitalist term sheets before entering",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "There is no difference in judging criteria or timelines",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Sprints reward working demo speed, while national programs like SIH have strict multi-stage institutional evaluation and ministry/enterprise stakeholders.",
      "feedbackIncorrect": "Incorrect. National programs involve multi-stage screenings and institutional compliance, whereas 36-hour sprints focus on rapid demo execution."
    }
  },
  {
    "num": 2,
    "title": "Choosing and Decoding a Challenge",
    "shortTitle": "Choosing & Decoding a Ch",
    "slug": "choosing-and-decoding-a-challenge",
    "sectionsCount": 5,
    "part": "Strategy, Challenges & Teams",
    "coverColor": "#059669",
    "subs": "Finding Challenges · Reading a Problem Statement · Choosing the Right One · Asking Questions · Chapter Practice",
    "lead": "Most teams fail because they build what the prompt literally describes rather than what the judges actually need. Learn how to decode problem statements, isolate hard constraints, and find the strategic unfair edge.",
    "inThisChapter": "Finding Challenges · Reading a Problem Statement · Choosing the Right One · Asking Questions",
    "practicePrompt": "Apply the principles of choosing and decoding a challenge to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch2-s01",
        "sectionNumber": "2.1",
        "title": "Finding Challenges",
        "content": [
          "Understanding finding challenges is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around finding challenges significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for finding challenges. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Official programme portals and sponsor sites:",
            "text": "Field-tested operational guidelines on official programme portals and sponsor sites designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Stuckhere Open Innovation listings and problem hub:",
            "text": "Field-tested operational guidelines on stuckhere open innovation listings and problem hub designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Universities, incubators and community groups:",
            "text": "Field-tested operational guidelines on universities, incubators and community groups designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling finding challenges, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch2-s02",
        "sectionNumber": "2.2",
        "title": "Reading a Problem Statement",
        "content": [
          "Understanding reading a problem statement is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around reading a problem statement significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for reading a problem statement. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Title, background, expected outcome:",
            "text": "Field-tested operational guidelines on title, background, expected outcome designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Constraints and mandatory technologies:",
            "text": "Field-tested operational guidelines on constraints and mandatory technologies designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Evaluation criteria and weights:",
            "text": "Field-tested operational guidelines on evaluation criteria and weights designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "What is stated vs. what is really needed:",
            "text": "Field-tested operational guidelines on what is stated vs. what is really needed designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling reading a problem statement, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/problem-decoding-canvas.svg",
          "caption": "Figure 2.1: The 4-Step Challenge Decoding Architecture: Dissecting prompts like an evaluator.",
          "alt": "Challenge Decoding Architecture Diagram"
        }
      },
      {
        "id": "c7-ch2-s03",
        "sectionNumber": "2.3",
        "title": "Choosing the Right One",
        "content": [
          "Understanding choosing the right one is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around choosing the right one significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for choosing the right one. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Your skills and the team's skills:",
            "text": "Field-tested operational guidelines on your skills and the team's skills designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Competition level (popular vs. neglected statements):",
            "text": "Field-tested operational guidelines on competition level (popular vs. neglected statements) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Data and domain access:",
            "text": "Field-tested operational guidelines on data and domain access designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Fit with a problem you already validated:",
            "text": "Field-tested operational guidelines on fit with a problem you already validated designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling choosing the right one, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch2-s04",
        "sectionNumber": "2.4",
        "title": "Asking Questions",
        "content": [
          "Understanding asking questions is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around asking questions significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for asking questions. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Mentor and sponsor Q&A sessions:",
            "text": "Field-tested operational guidelines on mentor and sponsor q&a sessions designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Good clarifying questions:",
            "text": "Field-tested operational guidelines on good clarifying questions designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Recording assumptions:",
            "text": "Field-tested operational guidelines on recording assumptions designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling asking questions, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch2-s05",
        "sectionNumber": "2.5",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: decode three problem statements and pick one:",
            "text": "Field-tested operational guidelines on exercise: decode three problem statements and pick one designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "When decoding an official challenge problem statement, what is the most critical question to answer?",
      "options": [
        {
          "key": "A",
          "label": "How many colors can we fit into the presentation deck?",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "What is the underlying operational pain and what mandatory constraints/sponsor APIs must our solution satisfy?",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Which problem statement has the highest number of registered competing teams?",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Can we replace the entire prompt with an unrelated idea we built last year?",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Winning teams separate surface descriptions from root operational friction and strictly adhere to mandatory sponsor constraints and evaluation rubrics.",
      "feedbackIncorrect": "Not quite. Winning requires uncovering the true operational pain behind the statement and meeting all hard technical and evaluation constraints."
    }
  },
  {
    "num": 3,
    "title": "Building the Team",
    "shortTitle": "Building the Team",
    "slug": "building-the-team",
    "sectionsCount": 5,
    "part": "Strategy, Challenges & Teams",
    "coverColor": "#d97706",
    "subs": "The Ideal Mix · Finding Teammates · Roles and Responsibilities · Working Agreements · Chapter Practice",
    "lead": "A balanced team of four will out-build a team of ten disorganized coders every single time. Learn how to assemble the Builder, Designer, Domain Thinker, and Storyteller squad with clear working agreements.",
    "inThisChapter": "The Ideal Mix · Finding Teammates · Roles and Responsibilities · Working Agreements",
    "practicePrompt": "Apply the principles of building the team to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch3-s01",
        "sectionNumber": "3.1",
        "title": "The Ideal Mix",
        "content": [
          "Understanding the ideal mix is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around the ideal mix significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for the ideal mix. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Builder, designer, domain thinker, storyteller:",
            "text": "Field-tested operational guidelines on builder, designer, domain thinker, storyteller designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Team size trade-offs:",
            "text": "Field-tested operational guidelines on team size trade-offs designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling the ideal mix, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch3-s02",
        "sectionNumber": "3.2",
        "title": "Finding Teammates",
        "content": [
          "Understanding finding teammates is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around finding teammates significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for finding teammates. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Classmates and local communities:",
            "text": "Field-tested operational guidelines on classmates and local communities designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Online matching and Stuckhere solver teams:",
            "text": "Field-tested operational guidelines on online matching and stuckhere solver teams designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checking commitment and availability:",
            "text": "Field-tested operational guidelines on checking commitment and availability designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling finding teammates, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/dream-team-roles.svg",
          "caption": "Figure 3.1: The 4-Member Winning Hackathon Squad: Builder, Designer, Domain Thinker, and Storyteller.",
          "alt": "Dream Team Roles Diagram"
        }
      },
      {
        "id": "c7-ch3-s03",
        "sectionNumber": "3.3",
        "title": "Roles and Responsibilities",
        "content": [
          "Understanding roles and responsibilities is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around roles and responsibilities significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for roles and responsibilities. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Team lead and decision rules:",
            "text": "Field-tested operational guidelines on team lead and decision rules designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Technical, design, research and presentation owners:",
            "text": "Field-tested operational guidelines on technical, design, research and presentation owners designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Overlap and backup coverage:",
            "text": "Field-tested operational guidelines on overlap and backup coverage designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling roles and responsibilities, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch3-s04",
        "sectionNumber": "3.4",
        "title": "Working Agreements",
        "content": [
          "Understanding working agreements is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around working agreements significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for working agreements. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Communication channels and meeting rhythm:",
            "text": "Field-tested operational guidelines on communication channels and meeting rhythm designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Credit, ownership and rights:",
            "text": "Field-tested operational guidelines on credit, ownership and rights designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Conflict handling:",
            "text": "Field-tested operational guidelines on conflict handling designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling working agreements, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch3-s05",
        "sectionNumber": "3.5",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: write a one-page team charter:",
            "text": "Field-tested operational guidelines on exercise: write a one-page team charter designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the optimal composition for a high-performing 4-person hackathon team?",
      "options": [
        {
          "key": "A",
          "label": "Four pure backend developers who all write database schemas simultaneously",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Four pitch presenters with no software development or design experience",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "A balanced mix of Core Builder (Full-Stack), Product Designer (UI/UX), Domain Thinker (Data/AI), and Storyteller (Pitch & Demo)",
          "isCorrect": true
        },
        {
          "key": "D",
          "label": "A solo programmer who rejects all outside feedback",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! The Builder delivers functional software, the Designer creates clear visual interfaces, the Domain Thinker grounds the logic, and the Storyteller wins the room on stage.",
      "feedbackIncorrect": "Incorrect. A balanced cross-functional squad (builder, designer, domain researcher, storyteller) consistently outperforms homogeneous teams."
    }
  },
  {
    "num": 4,
    "title": "Rapid Research and Discovery",
    "shortTitle": "Rapid Research & Discove",
    "slug": "rapid-research-and-discovery",
    "sectionsCount": 6,
    "part": "Rapid Research & Build Sprint",
    "coverColor": "#7c3aed",
    "subs": "Research in Hours, Not Weeks · Fast User Insight · Competitor and Workaround Scan · Quick Sizing and Impact · Problem Brief · Chapter Practice",
    "lead": "Master the core mechanics of rapid research and discovery to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Research in Hours, Not Weeks · Fast User Insight · Competitor and Workaround Scan · Quick Sizing and Impact",
    "practicePrompt": "Apply the principles of rapid research and discovery to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch4-s01",
        "sectionNumber": "4.1",
        "title": "Research in Hours, Not Weeks",
        "content": [
          "Understanding research in hours, not weeks is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around research in hours, not weeks significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for research in hours, not weeks. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "What to learn first:",
            "text": "Field-tested operational guidelines on what to learn first designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Timeboxing:",
            "text": "Field-tested operational guidelines on timeboxing designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling research in hours, not weeks, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch4-s02",
        "sectionNumber": "4.2",
        "title": "Fast User Insight",
        "content": [
          "Understanding fast user insight is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around fast user insight significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for fast user insight. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Quick interviews with practitioners:",
            "text": "Field-tested operational guidelines on quick interviews with practitioners designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Using existing Stuckhere dossiers and evidence:",
            "text": "Field-tested operational guidelines on using existing stuckhere dossiers and evidence designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Shadowing, forums and published reports:",
            "text": "Field-tested operational guidelines on shadowing, forums and published reports designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling fast user insight, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch4-s03",
        "sectionNumber": "4.3",
        "title": "Competitor and Workaround Scan",
        "content": [
          "Understanding competitor and workaround scan is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around competitor and workaround scan significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for competitor and workaround scan. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Ten-minute scan:",
            "text": "Field-tested operational guidelines on ten-minute scan designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Finding the gap:",
            "text": "Field-tested operational guidelines on finding the gap designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling competitor and workaround scan, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch4-s04",
        "sectionNumber": "4.4",
        "title": "Quick Sizing and Impact",
        "content": [
          "Understanding quick sizing and impact is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around quick sizing and impact significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for quick sizing and impact. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "One-slide bottom-up estimate:",
            "text": "Field-tested operational guidelines on one-slide bottom-up estimate designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Impact statements judges can remember:",
            "text": "Field-tested operational guidelines on impact statements judges can remember designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling quick sizing and impact, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch4-s05",
        "sectionNumber": "4.5",
        "title": "Problem Brief",
        "content": [
          "Understanding problem brief is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around problem brief significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for problem brief. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "One-page brief template:",
            "text": "Field-tested operational guidelines on one-page brief template designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling problem brief, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch4-s06",
        "sectionNumber": "4.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: produce a problem brief in 3 hours:",
            "text": "Field-tested operational guidelines on exercise: produce a problem brief in 3 hours designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "In a 36-hour hackathon, how should early discovery and user research be conducted?",
      "options": [
        {
          "key": "A",
          "label": "Spend 25 hours reading 300-page academic papers before writing any code",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Conduct 3 hours of focused research: extract verified data from problem dossiers, interview 2-3 mentors/practitioners, and create a 1-page Problem Brief",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Skip research entirely and guess what judges want based on buzzwords",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Hire an external agency to run a 6-week survey",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Rapid discovery is time-boxed (under 3 hours) using verified field dossiers, quick mentor Q&A, and a concise 1-page brief to guide the build.",
      "feedbackIncorrect": "Incorrect. Rapid discovery must be tightly time-boxed (2-3 hours) using existing dossiers, direct mentor questions, and structured synthesis."
    }
  },
  {
    "num": 5,
    "title": "Ideation and Scoping Under Constraints",
    "shortTitle": "Ideation & Scoping Under",
    "slug": "ideation-and-scoping-under-constraints",
    "sectionsCount": 5,
    "part": "Rapid Research & Build Sprint",
    "coverColor": "#16a34a",
    "subs": "Generating Ideas Quickly · Choosing the Winning Idea · Scoping for the Clock · Avoiding Common Traps · Chapter Practice",
    "lead": "Master the core mechanics of ideation and scoping under constraints to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Generating Ideas Quickly · Choosing the Winning Idea · Scoping for the Clock · Avoiding Common Traps",
    "practicePrompt": "Apply the principles of ideation and scoping under constraints to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch5-s01",
        "sectionNumber": "5.1",
        "title": "Generating Ideas Quickly",
        "content": [
          "Understanding generating ideas quickly is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around generating ideas quickly significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for generating ideas quickly. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Crazy 8s and time-boxed brainstorms:",
            "text": "Field-tested operational guidelines on crazy 8s and time-boxed brainstorms designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Using the AI Solver Copilot to expand options:",
            "text": "Field-tested operational guidelines on using the ai solver copilot to expand options designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling generating ideas quickly, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch5-s02",
        "sectionNumber": "5.2",
        "title": "Choosing the Winning Idea",
        "content": [
          "Understanding choosing the winning idea is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around choosing the winning idea significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for choosing the winning idea. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Impact, feasibility, novelty, demo-ability:",
            "text": "Field-tested operational guidelines on impact, feasibility, novelty, demo-ability designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Scoring matrix:",
            "text": "Field-tested operational guidelines on scoring matrix designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling choosing the winning idea, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/rapid-scoping-matrix.svg",
          "caption": "Figure 5.1: The 36-Hour Hackathon Scoping Matrix: Allocating engineering effort across Must, Should, Fake, and Skip.",
          "alt": "Rapid Scoping Matrix Diagram"
        }
      },
      {
        "id": "c7-ch5-s03",
        "sectionNumber": "5.3",
        "title": "Scoping for the Clock",
        "content": [
          "Understanding scoping for the clock is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around scoping for the clock significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for scoping for the clock. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "The one core workflow:",
            "text": "Field-tested operational guidelines on the one core workflow designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Must have, should have, fake it, skip it:",
            "text": "Field-tested operational guidelines on must have, should have, fake it, skip it designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Defining \"done\" for the demo:",
            "text": "Field-tested operational guidelines on defining \"done\" for the demo designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling scoping for the clock, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch5-s04",
        "sectionNumber": "5.4",
        "title": "Avoiding Common Traps",
        "content": [
          "Understanding avoiding common traps is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around avoiding common traps significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for avoiding common traps. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Too many features:",
            "text": "Field-tested operational guidelines on too many features designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Over-engineering:",
            "text": "Field-tested operational guidelines on over-engineering designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Solution without a problem:",
            "text": "Field-tested operational guidelines on solution without a problem designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling avoiding common traps, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch5-s05",
        "sectionNumber": "5.5",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: write a scope sheet with must, should, fake and skip columns:",
            "text": "Field-tested operational guidelines on exercise: write a scope sheet with must, should, fake and skip columns designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "Under the Hackathon Scoping Matrix, where should non-essential features like 'Password Reset' or 'Profile Settings' go?",
      "options": [
        {
          "key": "A",
          "label": "Must-Have column — build them first on Saturday morning",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Skip-It column — they consume critical hours and judges award zero points for standard auth settings",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Should-Have column — assign two team members to perfect them",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Fake-It column — spend 5 hours building mock email verification loops",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Judges evaluate the unique core solution to the verified problem. Generic user settings or password resets waste precious sprint time and yield zero scoring advantage.",
      "feedbackIncorrect": "Incorrect. Standard settings and password resets should be skipped; judges evaluate the core problem-solving flow."
    }
  },
  {
    "num": 6,
    "title": "Choosing the Tech Stack for Speed",
    "shortTitle": "Choosing the Tech Stack ",
    "slug": "choosing-the-tech-stack-for-speed",
    "sectionsCount": 6,
    "part": "Rapid Research & Build Sprint",
    "coverColor": "#2563eb",
    "subs": "Principles · Sample Stacks · Starter Templates · Third-Party Services · Data and Mocking · Chapter Practice",
    "lead": "Master the core mechanics of choosing the tech stack for speed to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Principles · Sample Stacks · Starter Templates · Third-Party Services",
    "practicePrompt": "Apply the principles of choosing the tech stack for speed to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch6-s01",
        "sectionNumber": "6.1",
        "title": "Principles",
        "content": [
          "Understanding principles is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around principles significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for principles. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Use what the team already knows:",
            "text": "Field-tested operational guidelines on use what the team already knows designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Prefer managed services over custom infrastructure:",
            "text": "Field-tested operational guidelines on prefer managed services over custom infrastructure designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling principles, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch6-s02",
        "sectionNumber": "6.2",
        "title": "Sample Stacks",
        "content": [
          "Understanding sample stacks is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around sample stacks significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for sample stacks. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Web app: React, TypeScript, Firebase:",
            "text": "Field-tested operational guidelines on web app: react, typescript, firebase designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Web app with Python API: React, FastAPI, hosted database:",
            "text": "Field-tested operational guidelines on web app with python api: react, fastapi, hosted database designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Mobile-first and low-code options:",
            "text": "Field-tested operational guidelines on mobile-first and low-code options designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Data and AI heavy: notebooks, model APIs, simple UI:",
            "text": "Field-tested operational guidelines on data and ai heavy: notebooks, model apis, simple ui designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling sample stacks, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch6-s03",
        "sectionNumber": "6.3",
        "title": "Starter Templates",
        "content": [
          "Understanding starter templates is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around starter templates significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for starter templates. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Prepared project skeleton:",
            "text": "Field-tested operational guidelines on prepared project skeleton designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Auth, database and deployment ready before the event:",
            "text": "Field-tested operational guidelines on auth, database and deployment ready before the event designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling starter templates, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch6-s04",
        "sectionNumber": "6.4",
        "title": "Third-Party Services",
        "content": [
          "Understanding third-party services is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around third-party services significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for third-party services. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Maps, payments, messaging, AI models:",
            "text": "Field-tested operational guidelines on maps, payments, messaging, ai models designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Free tiers and rate limits:",
            "text": "Field-tested operational guidelines on free tiers and rate limits designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Keeping keys safe:",
            "text": "Field-tested operational guidelines on keeping keys safe designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling third-party services, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch6-s05",
        "sectionNumber": "6.5",
        "title": "Data and Mocking",
        "content": [
          "Understanding data and mocking is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around data and mocking significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for data and mocking. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Realistic sample data:",
            "text": "Field-tested operational guidelines on realistic sample data designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Stubs and fakes for what you cannot build:",
            "text": "Field-tested operational guidelines on stubs and fakes for what you cannot build designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling data and mocking, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch6-s06",
        "sectionNumber": "6.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: assemble a starter template and deploy it before the next event:",
            "text": "Field-tested operational guidelines on exercise: assemble a starter template and deploy it before the next event designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the golden rule when choosing a technology stack for a 36-hour hackathon?",
      "options": [
        {
          "key": "A",
          "label": "Use a brand-new programming language that no team member has ever used before",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Set up a Kubernetes cluster with custom distributed databases on bare-metal servers",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Use tools and stacks the team already knows well, prefer managed serverless services, and prepare a working project skeleton in advance",
          "isCorrect": true
        },
        {
          "key": "D",
          "label": "Only use low-code tools that prohibit custom code export",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Familiarity equals velocity. Teams that use proven stacks (React, TypeScript, Firebase/FastAPI, Vercel) spend their time building features rather than debugging configuration errors.",
      "feedbackIncorrect": "Incorrect. Familiarity and managed services prevent catastrophic configuration stalls during tight sprint deadlines."
    }
  },
  {
    "num": 7,
    "title": "The Build Sprint",
    "shortTitle": "Build Sprint",
    "slug": "the-build-sprint",
    "sectionsCount": 7,
    "part": "Rapid Research & Build Sprint",
    "coverColor": "#ea580c",
    "subs": "Hour-by-Hour Plan · Working Together · Integration Early · Debugging Under Pressure · Energy and Wellbeing · Freeze Points · Chapter Practice",
    "lead": "In a 36-hour sprint, velocity without coordination causes fatal merge conflicts and broken demos. Learn the hour-by-hour operational blueprint from project skeleton to strict feature freezes and dry-run rehearsals.",
    "inThisChapter": "Hour-by-Hour Plan · Working Together · Integration Early · Debugging Under Pressure",
    "practicePrompt": "Apply the principles of the build sprint to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch7-s01",
        "sectionNumber": "7.1",
        "title": "Hour-by-Hour Plan",
        "content": [
          "Understanding hour-by-hour plan is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around hour-by-hour plan significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for hour-by-hour plan. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "First 10%: align, plan, set up:",
            "text": "Field-tested operational guidelines on first 10%: align, plan, set up designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Middle 60%: build core, integrate often:",
            "text": "Field-tested operational guidelines on middle 60%: build core, integrate often designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Last 30%: polish, test, document, rehearse:",
            "text": "Field-tested operational guidelines on last 30%: polish, test, document, rehearse designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling hour-by-hour plan, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch7-s02",
        "sectionNumber": "7.2",
        "title": "Working Together",
        "content": [
          "Understanding working together is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around working together significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for working together. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Git workflow: branches and small commits:",
            "text": "Field-tested operational guidelines on git workflow: branches and small commits designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Task board and short stand-ups:",
            "text": "Field-tested operational guidelines on task board and short stand-ups designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Avoiding merge conflicts:",
            "text": "Field-tested operational guidelines on avoiding merge conflicts designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling working together, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/sprint-timeline-schedule.svg",
          "caption": "Figure 7.1: The 36-Hour Master Sprint Timeline: Setup (10%), Core Engine (60%), and Polish/Pitch (30%).",
          "alt": "Sprint Timeline Schedule Diagram"
        }
      },
      {
        "id": "c7-ch7-s03",
        "sectionNumber": "7.3",
        "title": "Integration Early",
        "content": [
          "Understanding integration early is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around integration early significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for integration early. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "End-to-end skeleton first:",
            "text": "Field-tested operational guidelines on end-to-end skeleton first designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Daily or hourly integration checks:",
            "text": "Field-tested operational guidelines on daily or hourly integration checks designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling integration early, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch7-s04",
        "sectionNumber": "7.4",
        "title": "Debugging Under Pressure",
        "content": [
          "Understanding debugging under pressure is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around debugging under pressure significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for debugging under pressure. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Isolating issues:",
            "text": "Field-tested operational guidelines on isolating issues designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Knowing when to cut a feature:",
            "text": "Field-tested operational guidelines on knowing when to cut a feature designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling debugging under pressure, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch7-s05",
        "sectionNumber": "7.5",
        "title": "Energy and Wellbeing",
        "content": [
          "Understanding energy and wellbeing is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around energy and wellbeing significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for energy and wellbeing. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Sleep, food and breaks:",
            "text": "Field-tested operational guidelines on sleep, food and breaks designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Staying calm near deadlines:",
            "text": "Field-tested operational guidelines on staying calm near deadlines designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling energy and wellbeing, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch7-s06",
        "sectionNumber": "7.6",
        "title": "Freeze Points",
        "content": [
          "Understanding freeze points is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around freeze points significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for freeze points. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Feature freeze:",
            "text": "Field-tested operational guidelines on feature freeze designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Code freeze:",
            "text": "Field-tested operational guidelines on code freeze designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Backup builds and recordings:",
            "text": "Field-tested operational guidelines on backup builds and recordings designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling freeze points, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch7-s07",
        "sectionNumber": "7.7",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: run a mock 6-hour mini sprint:",
            "text": "Field-tested operational guidelines on exercise: run a mock 6-hour mini sprint designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the purpose of a 'Feature Freeze' 8 to 12 hours before final hackathon submission?",
      "options": [
        {
          "key": "A",
          "label": "To allow the team to start building an entirely new feature from scratch",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To stop introducing new code, stabilize the core flow, fix edge cases, record backup demo videos, and rehearse the pitch",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To delete the GitHub repository and submit only slides",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "To leave the event venue and assume judges will read raw commits",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! A feature freeze protects the team from last-minute merge conflicts and broken builds, allowing sufficient time for video recording and pitch rehearsal.",
      "feedbackIncorrect": "Incorrect. Feature freezes ensure stability, testing, backup demo recordings, and dedicated rehearsal time."
    }
  },
  {
    "num": 8,
    "title": "Design and Experience Under Time Pressure",
    "shortTitle": "Design & Experience Unde",
    "slug": "design-and-experience-under-time-pressure",
    "sectionsCount": 6,
    "part": "Design, AI, Pitch & Submission",
    "coverColor": "#ec4899",
    "subs": "What Judges Notice First · Fast Design Systems · Core Flow Design · Mobile and Accessibility · Storytelling Through Visuals · Chapter Practice",
    "lead": "Master the core mechanics of design and experience under time pressure to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "What Judges Notice First · Fast Design Systems · Core Flow Design · Mobile and Accessibility",
    "practicePrompt": "Apply the principles of design and experience under time pressure to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch8-s01",
        "sectionNumber": "8.1",
        "title": "What Judges Notice First",
        "content": [
          "Understanding what judges notice first is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around what judges notice first significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for what judges notice first. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Clarity of the main flow:",
            "text": "Field-tested operational guidelines on clarity of the main flow designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Visual polish vs. function:",
            "text": "Field-tested operational guidelines on visual polish vs. function designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling what judges notice first, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch8-s02",
        "sectionNumber": "8.2",
        "title": "Fast Design Systems",
        "content": [
          "Understanding fast design systems is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around fast design systems significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for fast design systems. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Component libraries and design tokens:",
            "text": "Field-tested operational guidelines on component libraries and design tokens designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Consistent spacing, type and colour:",
            "text": "Field-tested operational guidelines on consistent spacing, type and colour designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling fast design systems, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/design-3-click-rule.svg",
          "caption": "Figure 8.1: The 3-Click Judge Comprehension Rule: Driving evaluator clarity from landing to solved outcome.",
          "alt": "3-Click Design Rule Diagram"
        }
      },
      {
        "id": "c7-ch8-s03",
        "sectionNumber": "8.3",
        "title": "Core Flow Design",
        "content": [
          "Understanding core flow design is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around core flow design significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for core flow design. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Landing screen to key outcome in three steps:",
            "text": "Field-tested operational guidelines on landing screen to key outcome in three steps designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Empty, loading and error states:",
            "text": "Field-tested operational guidelines on empty, loading and error states designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling core flow design, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch8-s04",
        "sectionNumber": "8.4",
        "title": "Mobile and Accessibility",
        "content": [
          "Understanding mobile and accessibility is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around mobile and accessibility significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for mobile and accessibility. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Responsive layouts:",
            "text": "Field-tested operational guidelines on responsive layouts designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Basic accessibility checks:",
            "text": "Field-tested operational guidelines on basic accessibility checks designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling mobile and accessibility, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch8-s05",
        "sectionNumber": "8.5",
        "title": "Storytelling Through Visuals",
        "content": [
          "Understanding storytelling through visuals is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around storytelling through visuals significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for storytelling through visuals. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Dashboards that make the impact visible:",
            "text": "Field-tested operational guidelines on dashboards that make the impact visible designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Before-and-after views:",
            "text": "Field-tested operational guidelines on before-and-after views designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling storytelling through visuals, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch8-s06",
        "sectionNumber": "8.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: improve one screen in 30 minutes and compare:",
            "text": "Field-tested operational guidelines on exercise: improve one screen in 30 minutes and compare designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the '3-Click Rule' for designing hackathon demo interfaces?",
      "options": [
        {
          "key": "A",
          "label": "The user must click 30 times through account verification before seeing any data",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "A judge or evaluator should reach the core 'Aha!' value outcome in 3 clicks from the landing screen without typing complex data",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Every button must have three drop-down menus",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The prototype must only support mouse clicks and no keyboard shortcuts",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Judges typically have 2-3 minutes per project. An intuitive 3-click path with pre-loaded sample datasets delivers immediate clarity and high scores.",
      "feedbackIncorrect": "Incorrect. The 3-click rule ensures judges immediately understand and experience the core value proposition without friction."
    }
  },
  {
    "num": 9,
    "title": "Using AI Tools Responsibly in Events",
    "shortTitle": "Using AI Tools Responsib",
    "slug": "using-ai-tools-responsibly-in-events",
    "sectionsCount": 5,
    "part": "Design, AI, Pitch & Submission",
    "coverColor": "#0d9488",
    "subs": "Where AI Helps · Where AI Hurts · Event Rules and Honesty · Building AI Features That Demo Well · Chapter Practice",
    "lead": "Master the core mechanics of using ai tools responsibly in events to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Where AI Helps · Where AI Hurts · Event Rules and Honesty · Building AI Features That Demo Well",
    "practicePrompt": "Apply the principles of using ai tools responsibly in events to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch9-s01",
        "sectionNumber": "9.1",
        "title": "Where AI Helps",
        "content": [
          "Understanding where ai helps is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around where ai helps significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for where ai helps. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Ideation, research summaries, boilerplate code:",
            "text": "Field-tested operational guidelines on ideation, research summaries, boilerplate code designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Copy, documentation and slide drafts:",
            "text": "Field-tested operational guidelines on copy, documentation and slide drafts designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling where ai helps, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch9-s02",
        "sectionNumber": "9.2",
        "title": "Where AI Hurts",
        "content": [
          "Understanding where ai hurts is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around where ai hurts significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for where ai hurts. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Code you do not understand:",
            "text": "Field-tested operational guidelines on code you do not understand designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Invented facts in research:",
            "text": "Field-tested operational guidelines on invented facts in research designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Generic, forgettable pitches:",
            "text": "Field-tested operational guidelines on generic, forgettable pitches designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling where ai hurts, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/ai-hackathon-guardrails.svg",
          "caption": "Figure 9.1: Responsible AI Guardrails in Hackathons: Distinguishing Green-Zone multipliers from Red-Zone disqualifiers.",
          "alt": "AI Hackathon Guardrails Diagram"
        }
      },
      {
        "id": "c7-ch9-s03",
        "sectionNumber": "9.3",
        "title": "Event Rules and Honesty",
        "content": [
          "Understanding event rules and honesty is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around event rules and honesty significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for event rules and honesty. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Reading what the organisers allow:",
            "text": "Field-tested operational guidelines on reading what the organisers allow designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Disclosing AI assistance where required:",
            "text": "Field-tested operational guidelines on disclosing ai assistance where required designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Originality and licensing of generated content:",
            "text": "Field-tested operational guidelines on originality and licensing of generated content designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling event rules and honesty, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch9-s04",
        "sectionNumber": "9.4",
        "title": "Building AI Features That Demo Well",
        "content": [
          "Understanding building ai features that demo well is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around building ai features that demo well significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for building ai features that demo well. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "One clear AI use case:",
            "text": "Field-tested operational guidelines on one clear ai use case designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Backup responses for live demos:",
            "text": "Field-tested operational guidelines on backup responses for live demos designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Showing safeguards and limits:",
            "text": "Field-tested operational guidelines on showing safeguards and limits designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling building ai features that demo well, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch9-s05",
        "sectionNumber": "9.5",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: list where your team will and will not use AI, and why:",
            "text": "Field-tested operational guidelines on exercise: list where your team will and will not use ai, and why designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "Which of the following represents an unethical or high-risk use of AI in a hackathon?",
      "options": [
        {
          "key": "A",
          "label": "Using an LLM to generate synthetic JSON datasets for healthcare testing",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Generating boilerplate TypeScript component shells and CSS utilities",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Generating fake video screen recordings or pasting black-box AI code that the team cannot explain or defend during judges' Q&A",
          "isCorrect": true
        },
        {
          "key": "D",
          "label": "Using an AI copilot to write regular expressions or SQL queries",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Faking demonstrations or submitting code your team cannot explain leads to immediate disqualification and zero credibility during technical scrutiny.",
      "feedbackIncorrect": "Incorrect. Faking functionality or submitting unexplainable black-box code destroys credibility during technical judge questioning."
    }
  },
  {
    "num": 10,
    "title": "Documentation and Submission",
    "shortTitle": "Documentation & Submissi",
    "slug": "documentation-and-submission",
    "sectionsCount": 6,
    "part": "Design, AI, Pitch & Submission",
    "coverColor": "#4f46e5",
    "subs": "What Reviewers Read · The README · Demo Video · Slide Deck · Submission Checklist · Chapter Practice",
    "lead": "Master the core mechanics of documentation and submission to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "What Reviewers Read · The README · Demo Video · Slide Deck",
    "practicePrompt": "Apply the principles of documentation and submission to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch10-s01",
        "sectionNumber": "10.1",
        "title": "What Reviewers Read",
        "content": [
          "Understanding what reviewers read is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around what reviewers read significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for what reviewers read. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Many entries, little time:",
            "text": "Field-tested operational guidelines on many entries, little time designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "First impressions of your repository and slides:",
            "text": "Field-tested operational guidelines on first impressions of your repository and slides designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling what reviewers read, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch10-s02",
        "sectionNumber": "10.2",
        "title": "The README",
        "content": [
          "Understanding the readme is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around the readme significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for the readme. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Problem, solution, demo link:",
            "text": "Field-tested operational guidelines on problem, solution, demo link designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Architecture overview and tech stack:",
            "text": "Field-tested operational guidelines on architecture overview and tech stack designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "How to run it:",
            "text": "Field-tested operational guidelines on how to run it designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Team, credits and licences:",
            "text": "Field-tested operational guidelines on team, credits and licences designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling the readme, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch10-s03",
        "sectionNumber": "10.3",
        "title": "Demo Video",
        "content": [
          "Understanding demo video is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around demo video significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for demo video. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Script: problem, solution, walkthrough, impact:",
            "text": "Field-tested operational guidelines on script: problem, solution, walkthrough, impact designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Recording tips and length limits:",
            "text": "Field-tested operational guidelines on recording tips and length limits designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling demo video, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch10-s04",
        "sectionNumber": "10.4",
        "title": "Slide Deck",
        "content": [
          "Understanding slide deck is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around slide deck significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for slide deck. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Ten-slide structure:",
            "text": "Field-tested operational guidelines on ten-slide structure designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Evidence from your brief, scoring and sizing:",
            "text": "Field-tested operational guidelines on evidence from your brief, scoring and sizing designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling slide deck, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch10-s05",
        "sectionNumber": "10.5",
        "title": "Submission Checklist",
        "content": [
          "Understanding submission checklist is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around submission checklist significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for submission checklist. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Deadlines and formats:",
            "text": "Field-tested operational guidelines on deadlines and formats designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Links that actually work:",
            "text": "Field-tested operational guidelines on links that actually work designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Submitting early:",
            "text": "Field-tested operational guidelines on submitting early designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling submission checklist, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch10-s06",
        "sectionNumber": "10.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: write a README and a 2-minute video script:",
            "text": "Field-tested operational guidelines on exercise: write a readme and a 2-minute video script designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What are the three most critical components of an effective hackathon repository submission?",
      "options": [
        {
          "key": "A",
          "label": "A 500-page PDF, a raw ZIP file, and an un-deployed localhost link",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "A crystal-clear README with problem/solution hook, a working deployed web link, and a 2-minute clean backup demo video",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A private GitHub repository with no access permissions granted to evaluators",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Only commit history with messages like 'update' and 'fix'",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Reviewers evaluate hundreds of entries. A deployed link, structured README, and concise video ensure your project is properly evaluated even if live Wi-Fi fails.",
      "feedbackIncorrect": "Incorrect. Evaluators require a compelling README, an accessible deployed URL, and a clean backup demonstration video."
    }
  },
  {
    "num": 11,
    "title": "Pitching and Demo Day",
    "shortTitle": "Pitching & Demo Day",
    "slug": "pitching-and-demo-day",
    "sectionsCount": 6,
    "part": "Design, AI, Pitch & Submission",
    "coverColor": "#e11d48",
    "subs": "Pitch Structure · Delivering the Demo · Presenting as a Team · Handling Questions · Presence and Confidence · Chapter Practice",
    "lead": "A working prototype that cannot be pitched effectively will lose to an inferior project with a captivating story. Master the 5-minute pitch architecture, live demo psychology, and resilient Q&A handling.",
    "inThisChapter": "Pitch Structure · Delivering the Demo · Presenting as a Team · Handling Questions",
    "practicePrompt": "Apply the principles of pitching and demo day to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch11-s01",
        "sectionNumber": "11.1",
        "title": "Pitch Structure",
        "content": [
          "Understanding pitch structure is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around pitch structure significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for pitch structure. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Hook, problem, people, solution, demo, impact, next steps:",
            "text": "Field-tested operational guidelines on hook, problem, people, solution, demo, impact, next steps designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Timing for 3, 5 and 10 minute formats:",
            "text": "Field-tested operational guidelines on timing for 3, 5 and 10 minute formats designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling pitch structure, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch11-s02",
        "sectionNumber": "11.2",
        "title": "Delivering the Demo",
        "content": [
          "Understanding delivering the demo is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around delivering the demo significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for delivering the demo. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "One story, one user, one flow:",
            "text": "Field-tested operational guidelines on one story, one user, one flow designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Backup plans (recording, offline mode):",
            "text": "Field-tested operational guidelines on backup plans (recording, offline mode) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Common demo failures:",
            "text": "Field-tested operational guidelines on common demo failures designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling delivering the demo, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/winning-pitch-anatomy.svg",
          "caption": "Figure 11.1: The 5-Minute Winning Pitch Architecture: Timing every second from the hook to the live demo.",
          "alt": "Winning Pitch Architecture Diagram"
        }
      },
      {
        "id": "c7-ch11-s03",
        "sectionNumber": "11.3",
        "title": "Presenting as a Team",
        "content": [
          "Understanding presenting as a team is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around presenting as a team significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for presenting as a team. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Who says what:",
            "text": "Field-tested operational guidelines on who says what designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Smooth handovers:",
            "text": "Field-tested operational guidelines on smooth handovers designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling presenting as a team, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch11-s04",
        "sectionNumber": "11.4",
        "title": "Handling Questions",
        "content": [
          "Understanding handling questions is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around handling questions significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for handling questions. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Preparing a list of the toughest questions:",
            "text": "Field-tested operational guidelines on preparing a list of the toughest questions designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Answering honestly and briefly:",
            "text": "Field-tested operational guidelines on answering honestly and briefly designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Connecting answers back to evidence:",
            "text": "Field-tested operational guidelines on connecting answers back to evidence designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling handling questions, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch11-s05",
        "sectionNumber": "11.5",
        "title": "Presence and Confidence",
        "content": [
          "Understanding presence and confidence is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around presence and confidence significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for presence and confidence. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Voice and pacing:",
            "text": "Field-tested operational guidelines on voice and pacing designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Managing nerves:",
            "text": "Field-tested operational guidelines on managing nerves designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling presence and confidence, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch11-s06",
        "sectionNumber": "11.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: deliver a 5-minute pitch twice and improve it:",
            "text": "Field-tested operational guidelines on exercise: deliver a 5-minute pitch twice and improve it designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "In a 5-minute hackathon pitch, how much time should be allocated to the actual live software demonstration?",
      "options": [
        {
          "key": "A",
          "label": "0 seconds — judges only want to see market sizing slides",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Approximately 90 to 120 seconds (almost half the pitch), showing one seamless user flow that solves the verified pain",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "4 minutes and 50 seconds clicking through every minor settings button",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Only show screenshots from 2 years ago",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Software wins hackathons. Spending 1.5 to 2 minutes demonstrating real working functionality provides the tangible proof evaluators need.",
      "feedbackIncorrect": "Incorrect. The live demo is the focal point of the pitch; allocating 90-120 seconds demonstrates working capability."
    }
  },
  {
    "num": 12,
    "title": "How Judging Works and How to Win",
    "shortTitle": "How Judging Works & How ",
    "slug": "how-judging-works-and-how-to-win",
    "sectionsCount": 6,
    "part": "Judging, Pilots & Capstone",
    "coverColor": "#854d0e",
    "subs": "Typical Judging Criteria · Mapping Work to Scores · Patterns of Winning Entries · Patterns of Losing Entries · Learning From Feedback · Chapter Practice",
    "lead": "Judges evaluate with a strict mathematical scorecard, not emotional impressions. Decode the 100-point rubric to ensure your prototype captures the maximum possible score across every evaluation criterion.",
    "inThisChapter": "Typical Judging Criteria · Mapping Work to Scores · Patterns of Winning Entries · Patterns of Losing Entries",
    "practicePrompt": "Apply the principles of how judging works and how to win to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch12-s01",
        "sectionNumber": "12.1",
        "title": "Typical Judging Criteria",
        "content": [
          "Understanding typical judging criteria is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around typical judging criteria significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for typical judging criteria. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Problem relevance and understanding:",
            "text": "Field-tested operational guidelines on problem relevance and understanding designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Innovation and originality:",
            "text": "Field-tested operational guidelines on innovation and originality designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Technical quality and completeness:",
            "text": "Field-tested operational guidelines on technical quality and completeness designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Impact, feasibility and scalability:",
            "text": "Field-tested operational guidelines on impact, feasibility and scalability designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Presentation and teamwork:",
            "text": "Field-tested operational guidelines on presentation and teamwork designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling typical judging criteria, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch12-s02",
        "sectionNumber": "12.2",
        "title": "Mapping Work to Scores",
        "content": [
          "Understanding mapping work to scores is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around mapping work to scores significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for mapping work to scores. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Reading the rubric before you build:",
            "text": "Field-tested operational guidelines on reading the rubric before you build designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Allocating effort by weight:",
            "text": "Field-tested operational guidelines on allocating effort by weight designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling mapping work to scores, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/judging-scorecard-rubric.svg",
          "caption": "Figure 12.1: How Judges Allocate 100 Points: Prioritizing working software and problem relevance over pitch fluff.",
          "alt": "Judging Scorecard Rubric Diagram"
        }
      },
      {
        "id": "c7-ch12-s03",
        "sectionNumber": "12.3",
        "title": "Patterns of Winning Entries",
        "content": [
          "Understanding patterns of winning entries is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around patterns of winning entries significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for patterns of winning entries. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Focus on one painful problem:",
            "text": "Field-tested operational guidelines on focus on one painful problem designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Evidence of real users:",
            "text": "Field-tested operational guidelines on evidence of real users designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "A working demo, not a promise:",
            "text": "Field-tested operational guidelines on a working demo, not a promise designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "A believable path after the event:",
            "text": "Field-tested operational guidelines on a believable path after the event designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling patterns of winning entries, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch12-s04",
        "sectionNumber": "12.4",
        "title": "Patterns of Losing Entries",
        "content": [
          "Understanding patterns of losing entries is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around patterns of losing entries significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for patterns of losing entries. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Buzzwords without substance:",
            "text": "Field-tested operational guidelines on buzzwords without substance designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Broken demo:",
            "text": "Field-tested operational guidelines on broken demo designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Ignoring constraints in the brief:",
            "text": "Field-tested operational guidelines on ignoring constraints in the brief designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling patterns of losing entries, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch12-s05",
        "sectionNumber": "12.5",
        "title": "Learning From Feedback",
        "content": [
          "Understanding learning from feedback is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around learning from feedback significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for learning from feedback. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Asking judges and mentors for notes:",
            "text": "Field-tested operational guidelines on asking judges and mentors for notes designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Building a personal lessons log:",
            "text": "Field-tested operational guidelines on building a personal lessons log designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling learning from feedback, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch12-s06",
        "sectionNumber": "12.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: self-score a past project against a sample rubric:",
            "text": "Field-tested operational guidelines on exercise: self-score a past project against a sample rubric designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "In typical hackathon scoring rubrics, which criterion consistently carries the highest point allocation?",
      "options": [
        {
          "key": "A",
          "label": "Team matching outfits and logo branding (50 points)",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Working Prototype & Technical Execution (25 to 35 points), alongside Problem Understanding and Relevance",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Number of slides in the appendix (40 points)",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "How loud the team speaks during Q&A (30 points)",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Working software that solves a genuine, relevant problem forms the foundation of any hackathon scoring rubric.",
      "feedbackIncorrect": "Incorrect. Working software and deep understanding of the problem statement comprise over 50% of typical scoring rubrics."
    }
  },
  {
    "num": 13,
    "title": "Open Innovation With Enterprises and Government",
    "shortTitle": "Open Innovation With Ent",
    "slug": "open-innovation-with-enterprises-and-government",
    "sectionsCount": 6,
    "part": "Judging, Pilots & Capstone",
    "coverColor": "#0284c7",
    "subs": "How Open Innovation Works · Engaging a Sponsor · Pilots From Challenges · Intellectual Property and Terms · Government and Public-Sector Challenges · Chapter Practice",
    "lead": "Winning the event is just the starting line. Discover the structured playbook to turn a 48-hour hackathon victory into a paid enterprise Proof of Concept (POC) or institutional pilot deployment.",
    "inThisChapter": "How Open Innovation Works · Engaging a Sponsor · Pilots From Challenges · Intellectual Property and Terms",
    "practicePrompt": "Apply the principles of open innovation with enterprises and government to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch13-s01",
        "sectionNumber": "13.1",
        "title": "How Open Innovation Works",
        "content": [
          "Understanding how open innovation works is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around how open innovation works significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for how open innovation works. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Problem statements, calls and scouting:",
            "text": "Field-tested operational guidelines on problem statements, calls and scouting designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Typical stages: submission, shortlist, prototype, pilot:",
            "text": "Field-tested operational guidelines on typical stages: submission, shortlist, prototype, pilot designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling how open innovation works, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch13-s02",
        "sectionNumber": "13.2",
        "title": "Engaging a Sponsor",
        "content": [
          "Understanding engaging a sponsor is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around engaging a sponsor significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for engaging a sponsor. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Understanding the decision maker:",
            "text": "Field-tested operational guidelines on understanding the decision maker designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Communication etiquette:",
            "text": "Field-tested operational guidelines on communication etiquette designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Managing expectations about data and access:",
            "text": "Field-tested operational guidelines on managing expectations about data and access designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling engaging a sponsor, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        },
        "image": {
          "url": "/academy/diagrams/prototype-to-pilot-funnel.svg",
          "caption": "Figure 13.1: From Hackathon Winner to Real Enterprise/Government Pilot: The 4-Stage Post-Event Pipeline.",
          "alt": "Prototype to Pilot Funnel Diagram"
        }
      },
      {
        "id": "c7-ch13-s03",
        "sectionNumber": "13.3",
        "title": "Pilots From Challenges",
        "content": [
          "Understanding pilots from challenges is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around pilots from challenges significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for pilots from challenges. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Turning a prototype into a pilot proposal:",
            "text": "Field-tested operational guidelines on turning a prototype into a pilot proposal designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Scope, metrics and timelines:",
            "text": "Field-tested operational guidelines on scope, metrics and timelines designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Security, privacy and procurement hurdles:",
            "text": "Field-tested operational guidelines on security, privacy and procurement hurdles designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling pilots from challenges, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch13-s04",
        "sectionNumber": "13.4",
        "title": "Intellectual Property and Terms",
        "content": [
          "Understanding intellectual property and terms is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around intellectual property and terms significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for intellectual property and terms. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Who owns what:",
            "text": "Field-tested operational guidelines on who owns what designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Reading challenge terms and conditions:",
            "text": "Field-tested operational guidelines on reading challenge terms and conditions designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "When to ask for advice:",
            "text": "Field-tested operational guidelines on when to ask for advice designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling intellectual property and terms, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch13-s05",
        "sectionNumber": "13.5",
        "title": "Government and Public-Sector Challenges",
        "content": [
          "Understanding government and public-sector challenges is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around government and public-sector challenges significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for government and public-sector challenges. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Process, documentation and timelines:",
            "text": "Field-tested operational guidelines on process, documentation and timelines designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Accessibility, language and inclusion requirements:",
            "text": "Field-tested operational guidelines on accessibility, language and inclusion requirements designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling government and public-sector challenges, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch13-s06",
        "sectionNumber": "13.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: draft a pilot proposal from a challenge entry:",
            "text": "Field-tested operational guidelines on exercise: draft a pilot proposal from a challenge entry designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "How should a winning hackathon team approach an enterprise or government challenge sponsor after the event?",
      "options": [
        {
          "key": "A",
          "label": "Demand immediate $1M venture funding within 2 hours of the closing ceremony",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Send a thank-you note with cleaned repo artifacts and propose a bounded 30-day paid Proof of Concept (POC) pilot",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Never contact them again and delete the code",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Post negative comments about the sponsor's Wi-Fi speed",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Corporate and government sponsors join hackathons to find innovators. Proposing a structured, low-risk pilot is the standard path to commercial contracts.",
      "feedbackIncorrect": "Incorrect. Sponsors look for professional follow-up: thank-you notes, artifact packs, and structured Proof-of-Concept pilot proposals."
    }
  },
  {
    "num": 14,
    "title": "After the Event",
    "shortTitle": "After the Event",
    "slug": "after-the-event",
    "sectionsCount": 6,
    "part": "Judging, Pilots & Capstone",
    "coverColor": "#15803d",
    "subs": "The First 48 Hours · Keeping Momentum · Turning It Into Something · Networking · Publishing on Stuckhere · Chapter Practice",
    "lead": "Master the core mechanics of after the event to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "The First 48 Hours · Keeping Momentum · Turning It Into Something · Networking",
    "practicePrompt": "Apply the principles of after the event to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch14-s01",
        "sectionNumber": "14.1",
        "title": "The First 48 Hours",
        "content": [
          "Understanding the first 48 hours is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around the first 48 hours significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for the first 48 hours. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Thank-you notes and contact follow-ups:",
            "text": "Field-tested operational guidelines on thank-you notes and contact follow-ups designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Capturing lessons while fresh:",
            "text": "Field-tested operational guidelines on capturing lessons while fresh designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling the first 48 hours, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch14-s02",
        "sectionNumber": "14.2",
        "title": "Keeping Momentum",
        "content": [
          "Understanding keeping momentum is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around keeping momentum significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for keeping momentum. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "A 30-day plan after the hackathon:",
            "text": "Field-tested operational guidelines on a 30-day plan after the hackathon designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Deciding whether the project continues:",
            "text": "Field-tested operational guidelines on deciding whether the project continues designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling keeping momentum, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch14-s03",
        "sectionNumber": "14.3",
        "title": "Turning It Into Something",
        "content": [
          "Understanding turning it into something is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around turning it into something significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for turning it into something. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Portfolio case study:",
            "text": "Field-tested operational guidelines on portfolio case study designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Pilot with a sponsor or practitioner:",
            "text": "Field-tested operational guidelines on pilot with a sponsor or practitioner designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Startup path (see Subject 6):",
            "text": "Field-tested operational guidelines on startup path (see subject 6) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Open-source continuation:",
            "text": "Field-tested operational guidelines on open-source continuation designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling turning it into something, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch14-s04",
        "sectionNumber": "14.4",
        "title": "Networking",
        "content": [
          "Understanding networking is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around networking significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for networking. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Mentors, judges and sponsors:",
            "text": "Field-tested operational guidelines on mentors, judges and sponsors designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Staying in touch without being pushy:",
            "text": "Field-tested operational guidelines on staying in touch without being pushy designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling networking, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch14-s05",
        "sectionNumber": "14.5",
        "title": "Publishing on Stuckhere",
        "content": [
          "Understanding publishing on stuckhere is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around publishing on stuckhere significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for publishing on stuckhere. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Share your solution under the problem:",
            "text": "Field-tested operational guidelines on share your solution under the problem designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Gather votes, feedback and company interest:",
            "text": "Field-tested operational guidelines on gather votes, feedback and company interest designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling publishing on stuckhere, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch14-s06",
        "sectionNumber": "14.6",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: write a post-event action plan:",
            "text": "Field-tested operational guidelines on exercise: write a post-event action plan designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the 'First 48 Hours' rule following a hackathon victory or completion?",
      "options": [
        {
          "key": "A",
          "label": "Immediately delete all communication channels and stop talking to teammates",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Send personalized thank-you notes to judges and mentors, log key learnings, and agree on a 30-day continuation roadmap with teammates",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Rewrite the entire codebase in another language before sleeping",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Wait 6 months before following up with interested enterprise contacts",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Momentum dissipates rapidly. Reaching out to mentors and sponsors within 48 hours while the event is fresh cements valuable relationships.",
      "feedbackIncorrect": "Incorrect. The first 48 hours are crucial for capturing warm momentum, following up with mentors, and setting continuation plans."
    }
  },
  {
    "num": 15,
    "title": "Ethics, Rules and Fair Play",
    "shortTitle": "Ethics, Rules & Fair Pla",
    "slug": "ethics-rules-and-fair-play",
    "sectionsCount": 5,
    "part": "Judging, Pilots & Capstone",
    "coverColor": "#b91c1c",
    "subs": "Following the Rules · Honesty in Claims · Data and Privacy · Inclusion and Respect · Chapter Practice",
    "lead": "Master the core mechanics of ethics, rules and fair play to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Following the Rules · Honesty in Claims · Data and Privacy · Inclusion and Respect",
    "practicePrompt": "Apply the principles of ethics, rules and fair play to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch15-s01",
        "sectionNumber": "15.1",
        "title": "Following the Rules",
        "content": [
          "Understanding following the rules is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around following the rules significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for following the rules. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Eligibility, team limits and pre-built work:",
            "text": "Field-tested operational guidelines on eligibility, team limits and pre-built work designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Plagiarism and licensing:",
            "text": "Field-tested operational guidelines on plagiarism and licensing designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling following the rules, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch15-s02",
        "sectionNumber": "15.2",
        "title": "Honesty in Claims",
        "content": [
          "Understanding honesty in claims is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around honesty in claims significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for honesty in claims. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Do not fake demos or results:",
            "text": "Field-tested operational guidelines on do not fake demos or results designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Be clear about what is prototype vs. working:",
            "text": "Field-tested operational guidelines on be clear about what is prototype vs. working designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling honesty in claims, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch15-s03",
        "sectionNumber": "15.3",
        "title": "Data and Privacy",
        "content": [
          "Understanding data and privacy is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around data and privacy significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for data and privacy. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Using only permitted data:",
            "text": "Field-tested operational guidelines on using only permitted data designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Protecting real users and practitioners:",
            "text": "Field-tested operational guidelines on protecting real users and practitioners designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling data and privacy, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch15-s04",
        "sectionNumber": "15.4",
        "title": "Inclusion and Respect",
        "content": [
          "Understanding inclusion and respect is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around inclusion and respect significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for inclusion and respect. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Welcoming beginners:",
            "text": "Field-tested operational guidelines on welcoming beginners designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Respectful teamwork:",
            "text": "Field-tested operational guidelines on respectful teamwork designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling inclusion and respect, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch15-s05",
        "sectionNumber": "15.5",
        "title": "Chapter Practice",
        "content": [
          "Understanding chapter practice is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around chapter practice significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for chapter practice. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Exercise: review three scenarios and decide the right action:",
            "text": "Field-tested operational guidelines on exercise: review three scenarios and decide the right action designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Field-tested operational guidelines on checkpoint quiz designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling chapter practice, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the standard rule regarding pre-built code in hackathons?",
      "options": [
        {
          "key": "A",
          "label": "Teams can submit an entire enterprise product built 3 years ago and pretend it was created over the weekend",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Open-source libraries and starter templates are encouraged, but all application logic and problem-specific features must be built during the event",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "No open-source packages or npm modules may be installed",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Judges never check commit timestamps or repository creation dates",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Standard rules permit starter skeletons and public libraries, but problem-specific business logic must be authored during the sprint to maintain integrity.",
      "feedbackIncorrect": "Incorrect. Fair play allows public libraries/templates, but all core domain features must be developed during the official competition window."
    }
  },
  {
    "num": 16,
    "title": "Capstone Project",
    "shortTitle": "Capstone Project",
    "slug": "capstone-project",
    "sectionsCount": 4,
    "part": "Judging, Pilots & Capstone",
    "coverColor": "#9333ea",
    "subs": "Brief · Deliverables · Grading Rubric · Submit to Stuckhere",
    "lead": "Master the core mechanics of capstone project to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Brief · Deliverables · Grading Rubric · Submit to Stuckhere",
    "practicePrompt": "Apply the principles of capstone project to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch16-s01",
        "sectionNumber": "16.1",
        "title": "Brief",
        "content": [
          "Understanding brief is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around brief significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for brief. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Enter a real hackathon or complete a simulated 48-hour challenge based on a Stuckhere problem:",
            "text": "Field-tested operational guidelines on enter a real hackathon or complete a simulated 48-hour challenge based on a stuckhere problem designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling brief, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch16-s02",
        "sectionNumber": "16.2",
        "title": "Deliverables",
        "content": [
          "Understanding deliverables is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around deliverables significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for deliverables. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Challenge decoding sheet:",
            "text": "Field-tested operational guidelines on challenge decoding sheet designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Team charter:",
            "text": "Field-tested operational guidelines on team charter designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Problem brief and scope sheet:",
            "text": "Field-tested operational guidelines on problem brief and scope sheet designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Working prototype with deployed link:",
            "text": "Field-tested operational guidelines on working prototype with deployed link designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "README and demo video:",
            "text": "Field-tested operational guidelines on readme and demo video designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Five-minute pitch and deck:",
            "text": "Field-tested operational guidelines on five-minute pitch and deck designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Post-event action plan:",
            "text": "Field-tested operational guidelines on post-event action plan designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling deliverables, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch16-s03",
        "sectionNumber": "16.3",
        "title": "Grading Rubric",
        "content": [
          "Understanding grading rubric is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around grading rubric significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for grading rubric. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Problem understanding (20%):",
            "text": "Field-tested operational guidelines on problem understanding (20%) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Prototype quality (25%):",
            "text": "Field-tested operational guidelines on prototype quality (25%) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Documentation and submission (15%):",
            "text": "Field-tested operational guidelines on documentation and submission (15%) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Pitch and Q&A (20%):",
            "text": "Field-tested operational guidelines on pitch and q&a (20%) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Teamwork and follow-up plan (20%):",
            "text": "Field-tested operational guidelines on teamwork and follow-up plan (20%) designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling grading rubric, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch16-s04",
        "sectionNumber": "16.4",
        "title": "Submit to Stuckhere",
        "content": [
          "Understanding submit to stuckhere is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around submit to stuckhere significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for submit to stuckhere. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Publish results and learnings for the community:",
            "text": "Field-tested operational guidelines on publish results and learnings for the community designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling submit to stuckhere, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "In the Subject 7 Capstone Project, what constitutes a complete submission?",
      "options": [
        {
          "key": "A",
          "label": "Just an idea written in a single tweet",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "A decoded challenge sheet, team charter, 1-page problem brief, working deployed prototype, demo video, and 5-minute pitch deck",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A non-working Figma prototype with no code repository",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "A list of past hackathons you attended as an audience member",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! The capstone simulates the entire end-to-end journey from problem decoding and team agreements to working software, video demo, and investor/judge pitch.",
      "feedbackIncorrect": "Incorrect. The comprehensive capstone requires all 6 core deliverables: decoding sheet, charter, brief, working prototype, video, and pitch deck."
    }
  },
  {
    "num": 17,
    "title": "Appendices",
    "shortTitle": "Appendices",
    "slug": "appendices",
    "sectionsCount": 6,
    "part": "Judging, Pilots & Capstone",
    "coverColor": "#475569",
    "subs": "Glossary · Templates · Checklists · Master Quiz Bank · Further Reading · FAQ (good for Schema.org FAQPage SEO)",
    "lead": "Master the core mechanics of appendices to accelerate your hackathon velocity and turn intense sprint constraints into winning prototypes.",
    "inThisChapter": "Glossary · Templates · Checklists · Master Quiz Bank",
    "practicePrompt": "Apply the principles of appendices to your current challenge statement. Complete the corresponding template in the appendices and validate your deliverables against the evaluation rubric.",
    "sections": [
      {
        "id": "c7-ch17-s01",
        "sectionNumber": "17.1",
        "title": "Glossary",
        "content": [
          "Understanding glossary is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around glossary significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for glossary. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Hackathon, problem statement, MVP, demo day, pilot, RFP, scouting, rubric, sponsor, mentor, freeze:",
            "text": "Field-tested operational guidelines on hackathon, problem statement, mvp, demo day, pilot, rfp, scouting, rubric, sponsor, mentor, freeze designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Hackathon Heuristic:",
          "text": "When tackling glossary, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch17-s02",
        "sectionNumber": "17.2",
        "title": "Templates",
        "content": [
          "Understanding templates is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around templates significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for templates. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Challenge decoding sheet:",
            "text": "Field-tested operational guidelines on challenge decoding sheet designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Team charter:",
            "text": "Field-tested operational guidelines on team charter designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Problem brief:",
            "text": "Field-tested operational guidelines on problem brief designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Scope sheet:",
            "text": "Field-tested operational guidelines on scope sheet designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Hour-by-hour sprint plan:",
            "text": "Field-tested operational guidelines on hour-by-hour sprint plan designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "README template:",
            "text": "Field-tested operational guidelines on readme template designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Pitch deck outline and demo script:",
            "text": "Field-tested operational guidelines on pitch deck outline and demo script designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Post-event action plan:",
            "text": "Field-tested operational guidelines on post-event action plan designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling templates, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch17-s03",
        "sectionNumber": "17.3",
        "title": "Checklists",
        "content": [
          "Understanding checklists is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around checklists significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for checklists. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Pre-event checklist:",
            "text": "Field-tested operational guidelines on pre-event checklist designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Submission checklist:",
            "text": "Field-tested operational guidelines on submission checklist designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Demo-day checklist:",
            "text": "Field-tested operational guidelines on demo-day checklist designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling checklists, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch17-s04",
        "sectionNumber": "17.4",
        "title": "Master Quiz Bank",
        "content": [
          "Understanding master quiz bank is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around master quiz bank significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for master quiz bank. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "50 multiple-choice questions grouped by chapter:",
            "text": "Field-tested operational guidelines on 50 multiple-choice questions grouped by chapter designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling master quiz bank, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch17-s05",
        "sectionNumber": "17.5",
        "title": "Further Reading",
        "content": [
          "Understanding further reading is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around further reading significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for further reading. By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "Official programme guidelines and past winning-project write-ups:",
            "text": "Field-tested operational guidelines on official programme guidelines and past winning-project write-ups designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Related Stuckhere pages: Open Innovation, How to Solve, Startup Mode:",
            "text": "Field-tested operational guidelines on related stuckhere pages: open innovation, how to solve, startup mode designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling further reading, always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      },
      {
        "id": "c7-ch17-s06",
        "sectionNumber": "17.6",
        "title": "FAQ (good for Schema.org FAQPage SEO)",
        "content": [
          "Understanding faq (good for schema.org faqpage seo) is fundamental when participating in modern, fast-paced hackathons and open-innovation challenges. Teams that establish clear processes around faq (good for schema.org faqpage seo) significantly outperform competitors who rely on uncoordinated improvisations.",
          "In this section, we examine the practical heuristics, risk mitigation tactics, and field-tested playbooks for faq (good for schema.org faqpage seo). By structuring your team's workflow around these principles, you eliminate bottlenecks and preserve maximum sprint hours for high-impact prototype refinement."
        ],
        "points": [
          {
            "bold": "How do I choose between many problem statements?:",
            "text": "Field-tested operational guidelines on how do i choose between many problem statements? designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "What if my team has no designer?:",
            "text": "Field-tested operational guidelines on what if my team has no designer? designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "Can I reuse code I wrote before the event?:",
            "text": "Field-tested operational guidelines on can i reuse code i wrote before the event? designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          },
          {
            "bold": "How do I turn a hackathon project into a real pilot?:",
            "text": "Field-tested operational guidelines on how do i turn a hackathon project into a real pilot? designed to optimize developer velocity, reduce friction under pressure, and deliver measurable outcomes for evaluators."
          }
        ],
        "callout": {
          "boldPrefix": "Judge Insight:",
          "text": "When tackling faq (good for schema.org faqpage seo), always evaluate decisions against the clock. If a feature takes 6 hours to build but adds less than 5% to your evaluation score, cut it immediately and polish your core working demo."
        }
      }
    ],
    "quiz": {
      "question": "What is the primary role of the Subject 7 Appendices (Glossary, Templates, Checklists)?",
      "options": [
        {
          "key": "A",
          "label": "To provide ready-to-use, field-tested templates (team charters, sprint schedules, README blueprints) for upcoming real-world challenges",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "To increase the word count of the course",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "To confuse beginner students with legal jargon",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "To replace the need to write any software code",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! The appendices serve as your operational field kit during live events—providing battle-tested templates you can fork and deploy in minutes.",
      "feedbackIncorrect": "Incorrect. The appendices provide actionable, reusable templates and checklists for live event execution."
    }
  }
];
