import type { AcademyChapter, AcademyPart } from './academyData';

export const COURSE_5_PARTS: AcademyPart[] = [
  { name: 'All', startChapter: 0, endChapter: 17 },
  {
    name: 'Foundations & Prompting',
    title: 'AI Foundations, Model Architecture & Prompt Engineering',
    meta: 'Chapters 0 to 3 · 4 chapters',
    items: 'AI taxonomy, token mechanics, context windows, sampling settings, system prompts, few-shot framing, and structured JSON outputs.',
    startChapter: 0,
    endChapter: 3,
  },
  {
    name: 'APIs, RAG & Copilots',
    title: 'Model APIs, Grounding with RAG, Tool Use & Problem Copilots',
    meta: 'Chapters 4 to 7 · 4 chapters',
    items: 'Streaming Server-Sent Events, vector embeddings, vector databases, chunking strategies, function calling, agent loops, and Problem Solver Copilot.',
    startChapter: 4,
    endChapter: 7,
  },
  {
    name: 'Evaluation, Safety & Scale',
    title: 'Empirical Evals, Safety Defense, Latency & Economic Scaling',
    meta: 'Chapters 8 to 11 · 4 chapters',
    items: 'Golden test sets, LLM-as-a-judge, prompt injection defense, PII redaction, token economics, semantic caching, model cascading, and data flywheels.',
    startChapter: 8,
    endChapter: 11,
  },
  {
    name: 'ML, Products & Capstone',
    title: 'Classical ML, UX Design, AI Tooling, Real Domains & Capstone',
    meta: 'Chapters 12 to 17 · 6 chapters',
    items: 'Tabular scoring models, perceived latency heuristics, AI developer velocity, high-stakes domain deployments, capstone portfolio, and cheat sheets.',
    startChapter: 12,
    endChapter: 17,
  },
];

export const COURSE_5_CHAPTERS: AcademyChapter[] = [
  {
    "num": 0,
    "title": "Course Overview",
    "shortTitle": "Course Overview",
    "slug": "course-overview",
    "sectionsCount": 3,
    "part": "Foundations & Prompting",
    "coverColor": "#0891b2",
    "subs": "What This Subject Covers \u00b7 Prerequisites \u00b7 How to Use This Material",
    "lead": "AI is a tool for solving verified problems, not a goal in itself. This subject teaches you how to design, build, and deploy production-grade language model features that are useful, safe, cost-efficient, and rigorously evaluated.",
    "inThisChapter": "The AI builder philosophy \u00b7 What you will be able to build \u00b7 Prerequisites and full-stack alignment \u00b7 The end-to-end Problem Solver Copilot project",
    "practicePrompt": "Identify one validated problem from your Problem Dossier where unstructured text processing or reasoning could unlock immense customer value.",
    "sections": [
      {
        "id": "c5-ch0-s01",
        "sectionNumber": "0.1",
        "title": "What This Subject Covers",
        "content": [
          "Mastering what this subject covers is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of what this subject covers, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "The one-line idea:",
            "text": "AI is a tool for solving verified problems, not a goal in itself. This subject teaches how to add language-model features, such as a problem solver copilot, that are useful, safe, affordable and testable."
          },
          {
            "bold": "What you will be able to do:",
            "text": "- Explain how large language models work and where they fail - Write clear prompts and structured outputs - Call a model API from a secure back end - Ground answers in your own data with retrieval - Add tools and simple agent workflows - Evaluate quality, safety and cost before launch"
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of what this subject covers is measured accuracy on real domain edge cases."
        },
        "image": {
          "url": "/academy/diagrams/ai-builder-pipeline.svg",
          "caption": "Figure 0.1: The 6-Stage Production AI Builder Architecture from verified problem dossier to evaluated copilot.",
          "alt": "6-Stage AI Builder Architecture Diagram"
        }
      },
      {
        "id": "c5-ch0-s02",
        "sectionNumber": "0.2",
        "title": "Prerequisites",
        "content": [
          "Mastering prerequisites is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of prerequisites, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Basic programming:",
            "text": "Production best practices on basic programming to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Subject 3 (Full-Stack Cloud) strongly recommended:",
            "text": "Production best practices on subject 3 (full-stack cloud) strongly recommended to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Subjects 1 and 2 help you choose problems that deserve AI:",
            "text": "Production best practices on subjects 1 and 2 help you choose problems that deserve ai to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Basic programming",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Subject 3 (Full-Stack Cloud) strongly recommended",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Subjects 1 and 2 help you choose problems that deserve AI",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch0-s03",
        "sectionNumber": "0.3",
        "title": "How to Use This Material",
        "content": [
          "Mastering how to use this material is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of how to use this material, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Suggested path (15 to 20 hours with practice):",
            "text": "Production best practices on suggested path (15 to 20 hours with practice) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Chapter format: Concept, Code, Exercise, Checkpoint Quiz:",
            "text": "Production best practices on chapter format: concept, code, exercise, checkpoint quiz to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Building one AI feature across all chapters:",
            "text": "Production best practices on building one ai feature across all chapters to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary anti-pattern builders commit when adopting AI for their products?",
      "options": [
        {
          "key": "A",
          "label": "Treating AI as a magical solution looking for a problem, rather than anchoring it to verified human friction",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "Using JSON structured outputs instead of plain text",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Enabling streaming responses for user queries",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Logging token consumption in production monitoring",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! AI must serve as an enabling tool for verified customer friction, not an exploratory tech demo looking for a use case.",
      "feedbackIncorrect": "Review Section 0.1: The core principle is that AI is a tool for solving verified problems, never a goal in itself."
    }
  },
  {
    "num": 1,
    "title": "AI Foundations for Builders",
    "shortTitle": "AI Foundations",
    "slug": "ai-foundations-for-builders",
    "sectionsCount": 5,
    "part": "Foundations & Prompting",
    "coverColor": "#0891b2",
    "subs": "Key Terms \u00b7 Types of AI Tasks \u00b7 When AI Is the Right Tool \u00b7 Using Your Problem Dossier \u00b7 and 1 more sections",
    "lead": "Separate marketing hype from production reality. Understand the taxonomy of modern artificial intelligence, identify where foundation models excel, and recognize when deterministic code or classical heuristics are far superior.",
    "inThisChapter": "AI vs ML vs Deep Learning \u00b7 Generative AI and LLM capabilities \u00b7 Triage framework: When to use AI vs rules \u00b7 Assessing the cost of being wrong",
    "practicePrompt": "List five candidate tasks in your product and evaluate whether each should be solved with rules, classical algorithms, or an LLM.",
    "sections": [
      {
        "id": "c5-ch1-s01",
        "sectionNumber": "1.1",
        "title": "Key Terms",
        "content": [
          "Mastering key terms is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of key terms, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "AI, machine learning, deep learning:",
            "text": "Production best practices on ai, machine learning, deep learning to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Generative AI and large language models:",
            "text": "Production best practices on generative ai and large language models to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Models, training, inference:",
            "text": "Production best practices on models, training, inference to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of key terms is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch1-s02",
        "sectionNumber": "1.2",
        "title": "Types of AI Tasks",
        "content": [
          "Mastering types of ai tasks is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of types of ai tasks, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Classification and prediction:",
            "text": "Production best practices on classification and prediction to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Generation (text, images, code):",
            "text": "Production best practices on generation (text, images, code) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Extraction and summarisation:",
            "text": "Production best practices on extraction and summarisation to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Search, ranking and recommendation:",
            "text": "Production best practices on search, ranking and recommendation to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Classification and prediction",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Generation (text, images, code)",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Extraction and summarisation",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch1-s03",
        "sectionNumber": "1.3",
        "title": "When AI Is the Right Tool",
        "content": [
          "Mastering when ai is the right tool is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of when ai is the right tool, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Fuzzy, language-heavy, high-volume tasks:",
            "text": "Production best practices on fuzzy, language-heavy, high-volume tasks to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "When rules or a spreadsheet are better:",
            "text": "Production best practices on when rules or a spreadsheet are better to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "The cost of being wrong:",
            "text": "Production best practices on the cost of being wrong to ensure reliable, high-performance AI deployment."
          }
        ],
        "image": {
          "url": "/academy/diagrams/ai-triage-matrix.svg",
          "caption": "Figure 1.1: Architecture Triage Matrix: Choosing between deterministic code, classical ML, and generative LLMs.",
          "alt": "AI Architecture Triage Matrix"
        }
      },
      {
        "id": "c5-ch1-s04",
        "sectionNumber": "1.4",
        "title": "Using Your Problem Dossier",
        "content": [
          "Mastering using your problem dossier is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of using your problem dossier, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Which workflow step could AI improve?:",
            "text": "Production best practices on which workflow step could ai improve? to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Defining success in measurable terms:",
            "text": "Production best practices on defining success in measurable terms to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch1-s05",
        "sectionNumber": "1.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: list five AI opportunities and rate them:",
            "text": "Production best practices on exercise: list five ai opportunities and rate them to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "When is an LLM the WRONG architectural choice for a feature?",
      "options": [
        {
          "key": "A",
          "label": "When summarizing multi-page customer feedback transcripts",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "When the task requires 100% deterministic arithmetic, strict legal calculations, or can be solved with a simple database lookup",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "When extracting structured entities from noisy text",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "When translating domain terminology between operators",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Never use a probabilistic language model for tasks where exact deterministic rules or arithmetic must be strictly guaranteed.",
      "feedbackIncorrect": "Review Section 1.3: Deterministic logic, spreadsheets, and database queries are strictly superior for arithmetic and hard business rules."
    }
  },
  {
    "num": 2,
    "title": "How Large Language Models Work",
    "shortTitle": "How LLMs Work",
    "slug": "how-large-language-models-work",
    "sectionsCount": 7,
    "part": "Foundations & Prompting",
    "coverColor": "#0891b2",
    "subs": "Text as Tokens \u00b7 Prediction at Scale \u00b7 Context Window \u00b7 Sampling and Settings \u00b7 and 3 more sections",
    "lead": "Demystify next-token prediction, tokenizer mechanics, context windows, and sampling parameters. Learn why models hallucinate and how architectural constraints shape real-world product reliability.",
    "inThisChapter": "Tokens vs characters \u00b7 Pretraining, instruction tuning, and RLHF \u00b7 Context window dynamics \u00b7 Temperature, Top-P, and frequency penalty \u00b7 Why models hallucinate",
    "practicePrompt": "Experiment with temperature 0.0 vs 0.9 across three prompt types and record how stability and factual consistency vary.",
    "sections": [
      {
        "id": "c5-ch2-s01",
        "sectionNumber": "2.1",
        "title": "Text as Tokens",
        "content": [
          "Mastering text as tokens is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of text as tokens, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "What a token is:",
            "text": "Production best practices on what a token is to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Why token counts drive cost and limits:",
            "text": "Production best practices on why token counts drive cost and limits to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of text as tokens is measured accuracy on real domain edge cases."
        },
        "image": {
          "url": "/academy/diagrams/llm-token-pipeline.svg",
          "caption": "Figure 2.1: Next-Token Prediction Pipeline: From raw characters and subword tokens through attention layers and temperature sampling.",
          "alt": "LLM Token Pipeline Diagram"
        }
      },
      {
        "id": "c5-ch2-s02",
        "sectionNumber": "2.2",
        "title": "Prediction at Scale",
        "content": [
          "Mastering prediction at scale is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of prediction at scale, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Next-token prediction in plain language:",
            "text": "Production best practices on next-token prediction in plain language to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Pretraining and fine-tuning:",
            "text": "Production best practices on pretraining and fine-tuning to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Instruction tuning and human feedback:",
            "text": "Production best practices on instruction tuning and human feedback to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Next-token prediction in plain language",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Pretraining and fine-tuning",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Instruction tuning and human feedback",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch2-s03",
        "sectionNumber": "2.3",
        "title": "Context Window",
        "content": [
          "Mastering context window is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of context window, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "What the model can see at once:",
            "text": "Production best practices on what the model can see at once to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Long inputs and what gets lost:",
            "text": "Production best practices on long inputs and what gets lost to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch2-s04",
        "sectionNumber": "2.4",
        "title": "Sampling and Settings",
        "content": [
          "Mastering sampling and settings is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of sampling and settings, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Temperature and randomness:",
            "text": "Production best practices on temperature and randomness to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Max output length:",
            "text": "Production best practices on max output length to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Stop sequences:",
            "text": "Production best practices on stop sequences to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch2-s05",
        "sectionNumber": "2.5",
        "title": "Strengths and Limits",
        "content": [
          "Mastering strengths and limits is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of strengths and limits, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Strong at drafting, explaining, restructuring:",
            "text": "Production best practices on strong at drafting, explaining, restructuring to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Hallucination: confident but wrong:",
            "text": "Production best practices on hallucination: confident but wrong to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Weak at precise arithmetic and up-to-date facts:",
            "text": "Production best practices on weak at precise arithmetic and up-to-date facts to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Knowledge cutoffs:",
            "text": "Production best practices on knowledge cutoffs to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch2-s06",
        "sectionNumber": "2.6",
        "title": "Choosing a Model",
        "content": [
          "Mastering choosing a model is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of choosing a model, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Capability, speed and price trade-offs:",
            "text": "Production best practices on capability, speed and price trade-offs to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Small vs. large models:",
            "text": "Production best practices on small vs. large models to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Avoiding vendor lock-in:",
            "text": "Production best practices on avoiding vendor lock-in to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch2-s07",
        "sectionNumber": "2.7",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: compare two models on five tasks:",
            "text": "Production best practices on exercise: compare two models on five tasks to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why does setting temperature to 0.0 (or near zero) improve reliability in operational business features?",
      "options": [
        {
          "key": "A",
          "label": "It makes the model run for free without API billing",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It forces greedy token sampling, maximizing deterministic predictability for structured outputs and classifications",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "It prevents the model from exceeding its context window",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "It automatically fine-tunes the model weights on your database",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exact! Temperature 0.0 forces the model to select the highest-probability token at each step, yielding consistent, repeatable responses.",
      "feedbackIncorrect": "Review Section 2.4: Lower temperature reduces sampling entropy, making outputs deterministic and reproducible."
    }
  },
  {
    "num": 3,
    "title": "Prompt Engineering",
    "shortTitle": "Prompt Engineering",
    "slug": "prompt-engineering",
    "sectionsCount": 6,
    "part": "Foundations & Prompting",
    "coverColor": "#0891b2",
    "subs": "Anatomy of a Prompt \u00b7 Core Techniques \u00b7 Structured Outputs \u00b7 Prompt Patterns for Stuckhere-Style Features \u00b7 and 2 more sections",
    "lead": "Move beyond ad-hoc prompting. Master structured system instructions, few-shot demonstration framing, role definition, chain-of-thought elicitation, and schema-enforced JSON structured outputs.",
    "inThisChapter": "Anatomy of an enterprise prompt \u00b7 Few-shot learning vs zero-shot \u00b7 Chain-of-thought reasoning \u00b7 Pydantic & Zod JSON schema enforcement \u00b7 Anti-patterns to avoid",
    "practicePrompt": "Write a prompt that ingests a raw customer support message and outputs a strictly typed JSON object containing sentiment, category, urgency, and recommended response.",
    "sections": [
      {
        "id": "c5-ch3-s01",
        "sectionNumber": "3.1",
        "title": "Anatomy of a Prompt",
        "content": [
          "Mastering anatomy of a prompt is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of anatomy of a prompt, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "System instructions:",
            "text": "Production best practices on system instructions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "User input:",
            "text": "Production best practices on user input to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Context and examples:",
            "text": "Production best practices on context and examples to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Output format:",
            "text": "Production best practices on output format to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of anatomy of a prompt is measured accuracy on real domain edge cases."
        },
        "image": {
          "url": "/academy/diagrams/structured-prompt-anatomy.svg",
          "caption": "Figure 3.1: The 5-Layer Structured Prompt Architecture for guaranteed JSON schema generation.",
          "alt": "Structured Prompt Anatomy Diagram"
        }
      },
      {
        "id": "c5-ch3-s02",
        "sectionNumber": "3.2",
        "title": "Core Techniques",
        "content": [
          "Mastering core techniques is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of core techniques, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Be specific about role, audience and goal:",
            "text": "Production best practices on be specific about role, audience and goal to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Give examples (few-shot):",
            "text": "Production best practices on give examples (few-shot) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Ask for step-by-step reasoning when needed:",
            "text": "Production best practices on ask for step-by-step reasoning when needed to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Set constraints and say what to avoid:",
            "text": "Production best practices on set constraints and say what to avoid to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Separate instructions from data with clear delimiters:",
            "text": "Production best practices on separate instructions from data with clear delimiters to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Be specific about role, audience and goal",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Give examples (few-shot)",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Ask for step-by-step reasoning when needed",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch3-s03",
        "sectionNumber": "3.3",
        "title": "Structured Outputs",
        "content": [
          "Mastering structured outputs is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of structured outputs, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Requesting JSON:",
            "text": "Production best practices on requesting json to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Schemas and validation:",
            "text": "Production best practices on schemas and validation to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Handling malformed responses:",
            "text": "Production best practices on handling malformed responses to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch3-s04",
        "sectionNumber": "3.4",
        "title": "Prompt Patterns for Stuckhere-Style Features",
        "content": [
          "Mastering prompt patterns for stuckhere-style features is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of prompt patterns for stuckhere-style features, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Technical architecture suggestion:",
            "text": "Production best practices on technical architecture suggestion to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Interview script generator:",
            "text": "Production best practices on interview script generator to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Sprint roadmap generator:",
            "text": "Production best practices on sprint roadmap generator to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Outreach email drafter:",
            "text": "Production best practices on outreach email drafter to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch3-s05",
        "sectionNumber": "3.5",
        "title": "Iterating on Prompts",
        "content": [
          "Mastering iterating on prompts is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of iterating on prompts, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Versioning prompts:",
            "text": "Production best practices on versioning prompts to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Testing changes against a fixed set of examples:",
            "text": "Production best practices on testing changes against a fixed set of examples to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch3-s06",
        "sectionNumber": "3.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: improve a weak prompt through three revisions:",
            "text": "Production best practices on exercise: improve a weak prompt through three revisions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the most reliable way to ensure an LLM returns parseable JSON in a production web application?",
      "options": [
        {
          "key": "A",
          "label": "Asking politely in all-caps: 'PLEASE ONLY RETURN JSON'",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Using model API structured outputs (JSON schema / response_format) enforced at the sampling engine level",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Appending '```json' to the user message",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Writing a 500-word regex validator on the client",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Native API structured outputs constrain the decoding logits directly to valid JSON tokens matching your exact schema.",
      "feedbackIncorrect": "Review Section 3.3: Native structured output APIs guarantee 100% compliant schema generation directly at the decoder level."
    }
  },
  {
    "num": 4,
    "title": "Calling Model APIs",
    "shortTitle": "Calling Model APIs",
    "slug": "calling-model-apis",
    "sectionsCount": 7,
    "part": "APIs, RAG & Copilots",
    "coverColor": "#0284c7",
    "subs": "API Basics \u00b7 Keeping Keys Safe \u00b7 Streaming \u00b7 Multi-Turn Conversations \u00b7 and 3 more sections",
    "lead": "Architect a production-ready, secure model gateway. Master server-side API credential isolation, streaming Server-Sent Events (SSE), exponential backoff retries, edge latency optimization, and distributed request logging.",
    "inThisChapter": "Selecting model tiers (Flash vs Pro) \u00b7 Serverless API proxies \u00b7 Streaming responses with ReadableStream \u00b7 Rate limit handling and retry strategies \u00b7 Distributed telemetry",
    "practicePrompt": "Build a secure Node/Express or Next.js route handler that proxies a user query to an LLM provider and streams chunks to the client.",
    "sections": [
      {
        "id": "c5-ch4-s01",
        "sectionNumber": "4.1",
        "title": "API Basics",
        "content": [
          "Mastering api basics is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of api basics, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Requests, messages and roles:",
            "text": "Production best practices on requests, messages and roles to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Responses and usage data:",
            "text": "Production best practices on responses and usage data to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Errors, rate limits and retries:",
            "text": "Production best practices on errors, rate limits and retries to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of api basics is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch4-s02",
        "sectionNumber": "4.2",
        "title": "Keeping Keys Safe",
        "content": [
          "Mastering keeping keys safe is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of keeping keys safe, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Never call a paid API with a key in browser code:",
            "text": "Production best practices on never call a paid api with a key in browser code to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "A server or edge function as a proxy:",
            "text": "Production best practices on a server or edge function as a proxy to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Authenticating your own users first:",
            "text": "Production best practices on authenticating your own users first to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Never call a paid API with a key in browser code",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "A server or edge function as a proxy",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Authenticating your own users first",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        },
        "image": {
          "url": "/academy/diagrams/model-api-architecture.svg",
          "caption": "Figure 4.1: Secure Serverless Model Gateway with zero client secret exposure and Server-Sent Event (SSE) streaming.",
          "alt": "Model API Gateway Architecture Diagram"
        }
      },
      {
        "id": "c5-ch4-s03",
        "sectionNumber": "4.3",
        "title": "Streaming",
        "content": [
          "Mastering streaming is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of streaming, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Why streaming feels faster:",
            "text": "Production best practices on why streaming feels faster to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Handling streams in a React front end:",
            "text": "Production best practices on handling streams in a react front end to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch4-s04",
        "sectionNumber": "4.4",
        "title": "Multi-Turn Conversations",
        "content": [
          "Mastering multi-turn conversations is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of multi-turn conversations, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Sending history:",
            "text": "Production best practices on sending history to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Summarising old turns to save tokens:",
            "text": "Production best practices on summarising old turns to save tokens to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch4-s05",
        "sectionNumber": "4.5",
        "title": "Files and Images",
        "content": [
          "Mastering files and images is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of files and images, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Sending documents and images as input:",
            "text": "Production best practices on sending documents and images as input to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Limits and costs:",
            "text": "Production best practices on limits and costs to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch4-s06",
        "sectionNumber": "4.6",
        "title": "Building a Simple Endpoint",
        "content": [
          "Mastering building a simple endpoint is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of building a simple endpoint, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Request validation:",
            "text": "Production best practices on request validation to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Prompt assembly:",
            "text": "Production best practices on prompt assembly to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Response parsing and error fallback:",
            "text": "Production best practices on response parsing and error fallback to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch4-s07",
        "sectionNumber": "4.7",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: build a secure endpoint that drafts a pilot email:",
            "text": "Production best practices on exercise: build a secure endpoint that drafts a pilot email to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why must LLM API secret keys never be included in client-side React code?",
      "options": [
        {
          "key": "A",
          "label": "Client browsers do not support modern HTTPS encryption",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Anyone inspecting the browser network bundle can extract the key, depleting your quota or billing your account without limit",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "React components re-render every time an API key is evaluated",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Model APIs automatically block requests coming from Chromium",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Crucial security point! Client-side API keys are public. Always route requests through an authenticated backend proxy.",
      "feedbackIncorrect": "Review Section 4.2: API keys bundled in client code can be easily scraped by anyone opening DevTools."
    }
  },
  {
    "num": 5,
    "title": "Grounding With Your Own Data (RAG)",
    "shortTitle": "Grounding with RAG",
    "slug": "grounding-with-your-own-data-rag",
    "sectionsCount": 7,
    "part": "APIs, RAG & Copilots",
    "coverColor": "#0284c7",
    "subs": "Why Grounding \u00b7 Embeddings and Similarity \u00b7 The RAG Pipeline \u00b7 Improving Retrieval \u00b7 and 3 more sections",
    "lead": "Stop hallucinations by anchoring model answers to proprietary business knowledge. Learn vector embeddings, document chunking strategies, cosine similarity retrieval, and dynamic context injection.",
    "inThisChapter": "The mechanics of RAG \u00b7 Text embeddings and high-dimensional vector spaces \u00b7 Chunking trade-offs (size vs overlap) \u00b7 Vector databases & similarity search \u00b7 Context injection prompt templates",
    "practicePrompt": "Implement a chunking script that splits a 10-page operational manual into 400-token chunks with 50-token overlap, ready for embedding.",
    "sections": [
      {
        "id": "c5-ch5-s01",
        "sectionNumber": "5.1",
        "title": "Why Grounding",
        "content": [
          "Mastering why grounding is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of why grounding, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Reducing hallucination:",
            "text": "Production best practices on reducing hallucination to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Using private and fresh information:",
            "text": "Production best practices on using private and fresh information to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of why grounding is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch5-s02",
        "sectionNumber": "5.2",
        "title": "Embeddings and Similarity",
        "content": [
          "Mastering embeddings and similarity is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of embeddings and similarity, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Turning text into vectors:",
            "text": "Production best practices on turning text into vectors to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Cosine similarity in plain language:",
            "text": "Production best practices on cosine similarity in plain language to ensure reliable, high-performance AI deployment."
          }
        ],
        "image": {
          "url": "/academy/diagrams/rag-architecture.svg",
          "caption": "Figure 5.1: The Dual-Path RAG Pipeline: Ingestion chunking and cosine similarity query retrieval.",
          "alt": "RAG Architecture Diagram"
        }
      },
      {
        "id": "c5-ch5-s03",
        "sectionNumber": "5.3",
        "title": "The RAG Pipeline",
        "content": [
          "Mastering the rag pipeline is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of the rag pipeline, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Collect and clean documents:",
            "text": "Production best practices on collect and clean documents to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Chunking strategies:",
            "text": "Production best practices on chunking strategies to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Indexing in a vector store:",
            "text": "Production best practices on indexing in a vector store to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Retrieve, assemble context, generate:",
            "text": "Production best practices on retrieve, assemble context, generate to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch5-s04",
        "sectionNumber": "5.4",
        "title": "Improving Retrieval",
        "content": [
          "Mastering improving retrieval is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of improving retrieval, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Metadata filters:",
            "text": "Production best practices on metadata filters to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Hybrid keyword and vector search:",
            "text": "Production best practices on hybrid keyword and vector search to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Re-ranking:",
            "text": "Production best practices on re-ranking to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch5-s05",
        "sectionNumber": "5.5",
        "title": "Citing Sources",
        "content": [
          "Mastering citing sources is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of citing sources, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Showing which dossier or document an answer came from:",
            "text": "Production best practices on showing which dossier or document an answer came from to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Saying \"I don't know\" when context is missing:",
            "text": "Production best practices on saying \"i don't know\" when context is missing to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch5-s06",
        "sectionNumber": "5.6",
        "title": "Example: Problem Dossier Q&A",
        "content": [
          "Mastering example: problem dossier q&a is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of example: problem dossier q&a, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Indexing verified problems:",
            "text": "Production best practices on indexing verified problems to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Answering a builder's questions with citations:",
            "text": "Production best practices on answering a builder's questions with citations to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch5-s07",
        "sectionNumber": "5.7",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: build a small RAG demo over ten documents:",
            "text": "Production best practices on exercise: build a small rag demo over ten documents to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary function of text embeddings in a Retrieval-Augmented Generation pipeline?",
      "options": [
        {
          "key": "A",
          "label": "Compressing HTML images into thumbnail sizes",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Converting text chunks into numerical vectors whose distance reflects semantic conceptual similarity",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Translating English prompts into machine binary code",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Encrypting customer credit card credentials",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Embeddings map text into vectors where semantically related passages reside close to one another in vector space.",
      "feedbackIncorrect": "Review Section 5.3: Embeddings convert text to numeric vectors representing semantic meaning for similarity search."
    }
  },
  {
    "num": 6,
    "title": "Tools and Agents",
    "shortTitle": "Tools and Agents",
    "slug": "tools-and-agents",
    "sectionsCount": 5,
    "part": "APIs, RAG & Copilots",
    "coverColor": "#0284c7",
    "subs": "Tool Use \u00b7 Common Tools \u00b7 Agent Workflows \u00b7 Controlling Agents \u00b7 and 1 more sections",
    "lead": "Empower language models to interact with the external world. Build tool-calling pipelines for database queries, live API lookups, calculator execution, and multi-step agentic workflows with strict safety boundaries.",
    "inThisChapter": "Function calling schemas \u00b7 Handling model tool invocations \u00b7 The ReAct loop (Reason + Act) \u00b7 Human-in-the-loop approvals \u00b7 Bounding agent recursion depth",
    "practicePrompt": "Define a tool schema for querying your application's Firestore problem records and handle the tool call execution loop.",
    "sections": [
      {
        "id": "c5-ch6-s01",
        "sectionNumber": "6.1",
        "title": "Tool Use",
        "content": [
          "Mastering tool use is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of tool use, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Letting a model call functions:",
            "text": "Production best practices on letting a model call functions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Describing tools with schemas:",
            "text": "Production best practices on describing tools with schemas to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Validating tool arguments:",
            "text": "Production best practices on validating tool arguments to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of tool use is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch6-s02",
        "sectionNumber": "6.2",
        "title": "Common Tools",
        "content": [
          "Mastering common tools is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of common tools, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Database lookup:",
            "text": "Production best practices on database lookup to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Calculator and code execution:",
            "text": "Production best practices on calculator and code execution to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Web search:",
            "text": "Production best practices on web search to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Sending email or creating records (with approval):",
            "text": "Production best practices on sending email or creating records (with approval) to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Database lookup",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Calculator and code execution",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Web search",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        },
        "image": {
          "url": "/academy/diagrams/react-agent-loop.svg",
          "caption": "Figure 6.1: The Bounded ReAct (Reason + Act) Agent Execution Loop with guardrails.",
          "alt": "ReAct Agent Loop Diagram"
        }
      },
      {
        "id": "c5-ch6-s03",
        "sectionNumber": "6.3",
        "title": "Agent Workflows",
        "content": [
          "Mastering agent workflows is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of agent workflows, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Plan, act, observe loops:",
            "text": "Production best practices on plan, act, observe loops to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Workflows vs. fully autonomous agents:",
            "text": "Production best practices on workflows vs. fully autonomous agents to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "When not to use an agent:",
            "text": "Production best practices on when not to use an agent to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch6-s04",
        "sectionNumber": "6.4",
        "title": "Controlling Agents",
        "content": [
          "Mastering controlling agents is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of controlling agents, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Step and cost limits:",
            "text": "Production best practices on step and cost limits to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Human approval for risky actions:",
            "text": "Production best practices on human approval for risky actions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Logging every tool call:",
            "text": "Production best practices on logging every tool call to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch6-s05",
        "sectionNumber": "6.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: add a scoring tool to your copilot:",
            "text": "Production best practices on exercise: add a scoring tool to your copilot to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary danger of giving an agent autonomous access to write/delete database tools without guardrails?",
      "options": [
        {
          "key": "A",
          "label": "The browser tab will run out of CSS memory",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Prompt injection or runaway loops could cause destructive mutations or irreversible data loss",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Cloud functions will disable their SSL certificates",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "SQL queries cannot be formatted as JSON",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Crucial engineering guardrail! Always require explicit human authorization or dry-run validation for destructive write operations.",
      "feedbackIncorrect": "Review Section 6.4: Unbounded agent tool execution can lead to destructive mutations if not guarded by human-in-the-loop approvals."
    }
  },
  {
    "num": 7,
    "title": "Building a Problem Solver Copilot",
    "shortTitle": "Problem Solver Copilot",
    "slug": "building-a-problem-solver-copilot",
    "sectionsCount": 6,
    "part": "APIs, RAG & Copilots",
    "coverColor": "#0284c7",
    "subs": "Define the Copilot's Job \u00b7 Copilot Modules \u00b7 Architecture \u00b7 Context Assembly \u00b7 and 2 more sections",
    "lead": "Put all pieces together to engineer a production Problem Solver Copilot. Walk step-by-step through product specifications, dynamic dossier context assembly, streaming UI, and user feedback capture.",
    "inThisChapter": "Feature product spec \u00b7 Context assembly from Problem Dossier \u00b7 Optimistic UI and streaming message hooks \u00b7 Feedback collection (thumbs up/down) \u00b7 Continuous telemetry",
    "practicePrompt": "Wire a full prototype copilot chat interface that answers user questions about a specific validated problem using verified dossier facts.",
    "sections": [
      {
        "id": "c5-ch7-s01",
        "sectionNumber": "7.1",
        "title": "Define the Copilot's Job",
        "content": [
          "Mastering define the copilot's job is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of define the copilot's job, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Users and tasks:",
            "text": "Production best practices on users and tasks to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "What it should never do:",
            "text": "Production best practices on what it should never do to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of define the copilot's job is measured accuracy on real domain edge cases."
        },
        "image": {
          "url": "/academy/diagrams/copilot-anatomy.svg",
          "caption": "Figure 7.1: Component Architecture of the Production Problem Solver Copilot.",
          "alt": "Problem Solver Copilot Anatomy Diagram"
        }
      },
      {
        "id": "c5-ch7-s02",
        "sectionNumber": "7.2",
        "title": "Copilot Modules",
        "content": [
          "Mastering copilot modules is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of copilot modules, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Technical architecture module:",
            "text": "Production best practices on technical architecture module to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Discovery interview module:",
            "text": "Production best practices on discovery interview module to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "-day sprint module:",
            "text": "Production best practices on -day sprint module to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Pilot outreach module:",
            "text": "Production best practices on pilot outreach module to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Technical architecture module",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Discovery interview module",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "-day sprint module",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch7-s03",
        "sectionNumber": "7.3",
        "title": "Architecture",
        "content": [
          "Mastering architecture is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of architecture, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Front end panel:",
            "text": "Production best practices on front end panel to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Back end endpoint and prompt builder:",
            "text": "Production best practices on back end endpoint and prompt builder to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Data sources (dossier, market sizing, competitors):",
            "text": "Production best practices on data sources (dossier, market sizing, competitors) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Response storage and history:",
            "text": "Production best practices on response storage and history to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch7-s04",
        "sectionNumber": "7.4",
        "title": "Context Assembly",
        "content": [
          "Mastering context assembly is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of context assembly, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Selecting relevant dossier fields:",
            "text": "Production best practices on selecting relevant dossier fields to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Staying within token budgets:",
            "text": "Production best practices on staying within token budgets to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch7-s05",
        "sectionNumber": "7.5",
        "title": "User Experience",
        "content": [
          "Mastering user experience is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of user experience, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Loading, streaming and error states:",
            "text": "Production best practices on loading, streaming and error states to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Edit, copy, regenerate and feedback buttons:",
            "text": "Production best practices on edit, copy, regenerate and feedback buttons to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Showing limits and disclaimers:",
            "text": "Production best practices on showing limits and disclaimers to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch7-s06",
        "sectionNumber": "7.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: build two copilot modules end to end:",
            "text": "Production best practices on exercise: build two copilot modules end to end to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is capturing explicit user feedback (e.g., thumbs up/down with optional commentary) vital for an AI feature?",
      "options": [
        {
          "key": "A",
          "label": "It directly updates the model weights in real time without retraining",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It builds an empirical golden evaluation dataset of real user interactions for regression testing and prompt tuning",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "It is legally required by GDPR for all web buttons",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "It prevents users from taking screenshots of the conversation",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exact! Real user feedback feeds directly into your curation pipeline, generating golden evaluation datasets for continuous improvement.",
      "feedbackIncorrect": "Review Section 7.5: Explicit feedback creates the ground-truth dataset required to evaluate and tune future prompt iterations."
    }
  },
  {
    "num": 8,
    "title": "Evaluating AI Features",
    "shortTitle": "Evaluating AI Features",
    "slug": "evaluating-ai-features",
    "sectionsCount": 6,
    "part": "Evaluation, Safety & Scale",
    "coverColor": "#0d9488",
    "subs": "Why Evaluation Is Hard \u00b7 Building a Test Set \u00b7 Evaluation Methods \u00b7 Metrics \u00b7 and 2 more sections",
    "lead": "Unit tests do not work for probabilistic systems. Build golden evaluation test suites, implement model-graded evals (LLM-as-a-judge), calculate groundedness and answer relevance, and automate evals in CI/CD pipelines.",
    "inThisChapter": "Why software testing changes for AI \u00b7 Curation of golden test sets \u00b7 LLM-as-a-judge scoring rubrics \u00b7 Measuring precision, recall, and hallucination rate \u00b7 CI/CD test gates",
    "practicePrompt": "Create a 10-item golden evaluation test suite with ground-truth reference outputs and run an automated evaluation script.",
    "sections": [
      {
        "id": "c5-ch8-s01",
        "sectionNumber": "8.1",
        "title": "Why Evaluation Is Hard",
        "content": [
          "Mastering why evaluation is hard is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of why evaluation is hard, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "No single right answer:",
            "text": "Production best practices on no single right answer to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Quality drifts when prompts or models change:",
            "text": "Production best practices on quality drifts when prompts or models change to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of why evaluation is hard is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch8-s02",
        "sectionNumber": "8.2",
        "title": "Building a Test Set",
        "content": [
          "Mastering building a test set is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of building a test set, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "to 50 real examples:",
            "text": "Production best practices on to 50 real examples to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Including hard and adversarial cases:",
            "text": "Production best practices on including hard and adversarial cases to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Expected behaviours, not exact answers:",
            "text": "Production best practices on expected behaviours, not exact answers to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "to 50 real examples",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Including hard and adversarial cases",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Expected behaviours, not exact answers",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch8-s03",
        "sectionNumber": "8.3",
        "title": "Evaluation Methods",
        "content": [
          "Mastering evaluation methods is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of evaluation methods, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Human review with a rubric:",
            "text": "Production best practices on human review with a rubric to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Automated checks (format, length, banned content):",
            "text": "Production best practices on automated checks (format, length, banned content) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Model-as-judge and its biases:",
            "text": "Production best practices on model-as-judge and its biases to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Comparing versions side by side:",
            "text": "Production best practices on comparing versions side by side to ensure reliable, high-performance AI deployment."
          }
        ],
        "image": {
          "url": "/academy/diagrams/ai-evals-pyramid.svg",
          "caption": "Figure 8.1: The AI Quality Assurance Pyramid: Golden test datasets, LLM-as-a-judge rubrics, and CI/CD deploy gates.",
          "alt": "AI Evaluation Pyramid Diagram"
        }
      },
      {
        "id": "c5-ch8-s04",
        "sectionNumber": "8.4",
        "title": "Metrics",
        "content": [
          "Mastering metrics is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of metrics, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Accuracy and groundedness:",
            "text": "Production best practices on accuracy and groundedness to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Usefulness ratings from users:",
            "text": "Production best practices on usefulness ratings from users to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Latency and cost per request:",
            "text": "Production best practices on latency and cost per request to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch8-s05",
        "sectionNumber": "8.5",
        "title": "Continuous Monitoring",
        "content": [
          "Mastering continuous monitoring is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of continuous monitoring, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Logging prompts and outputs responsibly:",
            "text": "Production best practices on logging prompts and outputs responsibly to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "User feedback loops:",
            "text": "Production best practices on user feedback loops to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Regression checks before every change:",
            "text": "Production best practices on regression checks before every change to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch8-s06",
        "sectionNumber": "8.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: create a 25-case test set and score two prompt versions:",
            "text": "Production best practices on exercise: create a 25-case test set and score two prompt versions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is 'LLM-as-a-judge' and when should you use it?",
      "options": [
        {
          "key": "A",
          "label": "A legal AI that replaces court judges for trademark disputes",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Using a powerful, calibrated model with a strict scoring rubric to grade the quality and groundedness of outputs from smaller production models",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "A browser extension that flags bad grammar",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "A compiler optimization for faster JavaScript parsing",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Using an advanced model with calibrated rubrics allows scalable automated assessment of complex language nuances.",
      "feedbackIncorrect": "Review Section 8.3: Model-graded evals leverage high-capability models with strict rubrics to evaluate nuanced outputs in automated test runs."
    }
  },
  {
    "num": 9,
    "title": "Safety, Privacy and Security",
    "shortTitle": "Safety, Privacy & Security",
    "slug": "safety-privacy-and-security",
    "sectionsCount": 6,
    "part": "Evaluation, Safety & Scale",
    "coverColor": "#0d9488",
    "subs": "Risks Specific to AI Features \u00b7 Prompt Injection \u00b7 Data Privacy \u00b7 Abuse Prevention \u00b7 and 2 more sections",
    "lead": "Harden your AI system against real-world adversarial attacks. Defend against direct and indirect prompt injection, implement PII redaction pipelines, prevent jailbreaks, and establish threat models for generative systems.",
    "inThisChapter": "Direct vs indirect prompt injection \u00b7 Scrubbing and redacting PII \u00b7 Defense-in-depth sanitization \u00b7 Enterprise compliance standards (GDPR, SOC2) \u00b7 Threat modeling matrix",
    "practicePrompt": "Write a test suite of 5 adversarial prompt injection attacks against your copilot and verify your system instructions resist unauthorized jailbreaks.",
    "sections": [
      {
        "id": "c5-ch9-s01",
        "sectionNumber": "9.1",
        "title": "Risks Specific to AI Features",
        "content": [
          "Mastering risks specific to ai features is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of risks specific to ai features, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Wrong or invented answers:",
            "text": "Production best practices on wrong or invented answers to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Harmful or biased outputs:",
            "text": "Production best practices on harmful or biased outputs to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Over-reliance by users:",
            "text": "Production best practices on over-reliance by users to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of risks specific to ai features is measured accuracy on real domain edge cases."
        },
        "image": {
          "url": "/academy/diagrams/ai-safety-defense.svg",
          "caption": "Figure 9.1: Defense-in-Depth Generative AI Security Framework: From input sanitization to output shields.",
          "alt": "AI Safety Defense Framework Diagram"
        }
      },
      {
        "id": "c5-ch9-s02",
        "sectionNumber": "9.2",
        "title": "Prompt Injection",
        "content": [
          "Mastering prompt injection is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of prompt injection, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Instructions hidden in user input or documents:",
            "text": "Production best practices on instructions hidden in user input or documents to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Separating trusted instructions from untrusted content:",
            "text": "Production best practices on separating trusted instructions from untrusted content to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Limiting what tools can do:",
            "text": "Production best practices on limiting what tools can do to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Instructions hidden in user input or documents",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Separating trusted instructions from untrusted content",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Limiting what tools can do",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch9-s03",
        "sectionNumber": "9.3",
        "title": "Data Privacy",
        "content": [
          "Mastering data privacy is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of data privacy, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Minimising personal data sent to models:",
            "text": "Production best practices on minimising personal data sent to models to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Consent and retention:",
            "text": "Production best practices on consent and retention to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Sensitive domains such as health and finance:",
            "text": "Production best practices on sensitive domains such as health and finance to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch9-s04",
        "sectionNumber": "9.4",
        "title": "Abuse Prevention",
        "content": [
          "Mastering abuse prevention is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of abuse prevention, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Rate limits per user:",
            "text": "Production best practices on rate limits per user to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Spend caps and alerts:",
            "text": "Production best practices on spend caps and alerts to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Content filters and moderation:",
            "text": "Production best practices on content filters and moderation to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch9-s05",
        "sectionNumber": "9.5",
        "title": "Responsible AI Practice",
        "content": [
          "Mastering responsible ai practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of responsible ai practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Transparency: tell users when AI is used:",
            "text": "Production best practices on transparency: tell users when ai is used to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Human oversight for important decisions:",
            "text": "Production best practices on human oversight for important decisions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Fairness testing across user groups:",
            "text": "Production best practices on fairness testing across user groups to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch9-s06",
        "sectionNumber": "9.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: red-team your copilot with 15 attack prompts:",
            "text": "Production best practices on exercise: red-team your copilot with 15 attack prompts to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is an 'indirect prompt injection' attack?",
      "options": [
        {
          "key": "A",
          "label": "When a hacker pulls the power cord on the server",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "When malicious instructions are concealed inside external data retrieved by the model (e.g., a web page or resume), hijacking model execution",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "When an API key expires unexpectedly",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "When an engineer writes a typo in the system prompt",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Indirect prompt injection occurs when untrusted retrieved content contains hidden commands that override the primary system instructions.",
      "feedbackIncorrect": "Review Section 9.1: Indirect prompt injection embeds malicious instructions into third-party content that the model ingests during RAG or tool use."
    }
  },
  {
    "num": 10,
    "title": "Cost, Latency and Scale",
    "shortTitle": "Cost, Latency & Scale",
    "slug": "cost-latency-and-scale",
    "sectionsCount": 6,
    "part": "Evaluation, Safety & Scale",
    "coverColor": "#0d9488",
    "subs": "Understanding Costs \u00b7 Reducing Cost \u00b7 Improving Speed \u00b7 Reliability \u00b7 and 2 more sections",
    "lead": "Ship AI features that remain profitable and blazingly fast at enterprise volume. Optimize prompt token density, implement semantic response caching, leverage tiered model cascades, and set real-time budget guardrails.",
    "inThisChapter": "Token economics and unit cost modeling \u00b7 Semantic caching with Redis/embeddings \u00b7 Model routing (cheap small models vs reasoning engines) \u00b7 Time to First Token (TTFT) \u00b7 Budget alerts",
    "practicePrompt": "Calculate the projected monthly token cost of your AI copilot across 10,000 monthly active users and model the cost reduction from semantic caching.",
    "sections": [
      {
        "id": "c5-ch10-s01",
        "sectionNumber": "10.1",
        "title": "Understanding Costs",
        "content": [
          "Mastering understanding costs is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of understanding costs, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Input and output token pricing:",
            "text": "Production best practices on input and output token pricing to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Estimating cost per request and per user:",
            "text": "Production best practices on estimating cost per request and per user to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of understanding costs is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch10-s02",
        "sectionNumber": "10.2",
        "title": "Reducing Cost",
        "content": [
          "Mastering reducing cost is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of reducing cost, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Shorter prompts and tighter context:",
            "text": "Production best practices on shorter prompts and tighter context to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Caching repeated answers:",
            "text": "Production best practices on caching repeated answers to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Using smaller models for easy tasks:",
            "text": "Production best practices on using smaller models for easy tasks to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Batching:",
            "text": "Production best practices on batching to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Shorter prompts and tighter context",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Caching repeated answers",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Using smaller models for easy tasks",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        },
        "image": {
          "url": "/academy/diagrams/cost-latency-cascade.svg",
          "caption": "Figure 10.1: Tiered Model Routing Cascade with Semantic Caching for 85% cost reduction.",
          "alt": "Cost Latency Cascade Diagram"
        }
      },
      {
        "id": "c5-ch10-s03",
        "sectionNumber": "10.3",
        "title": "Improving Speed",
        "content": [
          "Mastering improving speed is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of improving speed, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Streaming:",
            "text": "Production best practices on streaming to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Parallel calls:",
            "text": "Production best practices on parallel calls to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Precomputing common outputs:",
            "text": "Production best practices on precomputing common outputs to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch10-s04",
        "sectionNumber": "10.4",
        "title": "Reliability",
        "content": [
          "Mastering reliability is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of reliability, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Timeouts and retries with backoff:",
            "text": "Production best practices on timeouts and retries with backoff to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Fallback models and graceful degradation:",
            "text": "Production best practices on fallback models and graceful degradation to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch10-s05",
        "sectionNumber": "10.5",
        "title": "Pricing Your AI Feature",
        "content": [
          "Mastering pricing your ai feature is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of pricing your ai feature, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Linking cost to the unit economics from Subject 2:",
            "text": "Production best practices on linking cost to the unit economics from subject 2 to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Free limits and paid tiers:",
            "text": "Production best practices on free limits and paid tiers to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch10-s06",
        "sectionNumber": "10.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: build a cost model for 1,000 daily users:",
            "text": "Production best practices on exercise: build a cost model for 1,000 daily users to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "How does model tier routing (cascade) dramatically lower operating costs?",
      "options": [
        {
          "key": "A",
          "label": "By turning off the API at night",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "By routing simple classification or lookup queries to lightweight, ultra-cheap models, reserving large reasoning models only for hard queries",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "By using open-source models that run on client CPU",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "By disabling SSL handshakes",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! In production, 80%+ of queries can be answered by low-latency, low-cost models, reducing aggregate expenses by 70-90%.",
      "feedbackIncorrect": "Review Section 10.2: Model cascading routes standard queries to fast, economical models, invoking flagship models only when complex reasoning is required."
    }
  },
  {
    "num": 11,
    "title": "Data for AI",
    "shortTitle": "Data for AI",
    "slug": "data-for-ai",
    "sectionsCount": 5,
    "part": "Evaluation, Safety & Scale",
    "coverColor": "#0d9488",
    "subs": "Where Data Comes From \u00b7 Data Quality \u00b7 Labelling \u00b7 Legal and Ethical Use \u00b7 and 1 more sections",
    "lead": "Data is the ultimate competitive moat for AI builders. Create continuous data flywheels from user interactions, generate high-fidelity synthetic training data, and curate datasets for domain-specific fine-tuning.",
    "inThisChapter": "The data flywheel architecture \u00b7 Curation of high-signal interaction logs \u00b7 Synthetic data generation with validation filters \u00b7 Preparing JSONL datasets for fine-tuning",
    "practicePrompt": "Format a dataset of 20 verified problem-solution interactions into a compliant JSONL format suitable for model fine-tuning or evaluation.",
    "sections": [
      {
        "id": "c5-ch11-s01",
        "sectionNumber": "11.1",
        "title": "Where Data Comes From",
        "content": [
          "Mastering where data comes from is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of where data comes from, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Your own product data:",
            "text": "Production best practices on your own product data to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Public datasets:",
            "text": "Production best practices on public datasets to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "User-submitted content:",
            "text": "Production best practices on user-submitted content to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of where data comes from is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch11-s02",
        "sectionNumber": "11.2",
        "title": "Data Quality",
        "content": [
          "Mastering data quality is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of data quality, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Cleaning and deduplicating:",
            "text": "Production best practices on cleaning and deduplicating to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Consistent structure:",
            "text": "Production best practices on consistent structure to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Handling missing and noisy values:",
            "text": "Production best practices on handling missing and noisy values to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Cleaning and deduplicating",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Consistent structure",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Handling missing and noisy values",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch11-s03",
        "sectionNumber": "11.3",
        "title": "Labelling",
        "content": [
          "Mastering labelling is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of labelling, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Simple labelling guidelines:",
            "text": "Production best practices on simple labelling guidelines to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Agreement between labellers:",
            "text": "Production best practices on agreement between labellers to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch11-s04",
        "sectionNumber": "11.4",
        "title": "Legal and Ethical Use",
        "content": [
          "Mastering legal and ethical use is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of legal and ethical use, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Licences and terms of use:",
            "text": "Production best practices on licences and terms of use to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Personal data and consent:",
            "text": "Production best practices on personal data and consent to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Bias in datasets:",
            "text": "Production best practices on bias in datasets to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch11-s05",
        "sectionNumber": "11.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: clean and label a 50-row dataset:",
            "text": "Production best practices on exercise: clean and label a 50-row dataset to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary risk when generating synthetic training data using another language model?",
      "options": [
        {
          "key": "A",
          "label": "Synthetic data files cannot be loaded into PostgreSQL",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Model bias, hallucinations, and uniform linguistic style can cause model collapse if not rigorously filtered and validated against real ground truth",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Synthetic data violates IEEE copyright law",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Browsers will flag the web page as untrusted",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exact! Synthetic data must always pass strict quality gates, schema validators, and human spot-checks to avoid reinforcing synthetic hallucinations.",
      "feedbackIncorrect": "Review Section 11.3: Without filtering and validation, synthetic data propagates subtle model errors and uniform phrasing."
    }
  },
  {
    "num": 12,
    "title": "Classical Machine Learning and Scoring Models",
    "shortTitle": "Classical ML & Scoring",
    "slug": "classical-machine-learning-and-scoring-models",
    "sectionsCount": 6,
    "part": "ML, Products & Capstone",
    "coverColor": "#0369a1",
    "subs": "Rules, Scores and Models \u00b7 Supervised Learning Basics \u00b7 Common Models \u00b7 Measuring Performance \u00b7 and 2 more sections",
    "lead": "Do not use a sledgehammer to crack a nut. Learn how logistic regression, gradient boosted decision trees (XGBoost), and deterministic scoring algorithms often beat LLMs in speed, interpretability, and cost.",
    "inThisChapter": "Heuristics and statistical scoring vs LLMs \u00b7 Calculating algorithmic Pain Scores \u00b7 Gradient boosted trees for tabular prediction \u00b7 Combining ML ranking with LLM generation",
    "practicePrompt": "Implement a deterministic Python or TypeScript scoring function that computes an Opportunity Index (0-100) from validated tabular friction metrics.",
    "sections": [
      {
        "id": "c5-ch12-s01",
        "sectionNumber": "12.1",
        "title": "Rules, Scores and Models",
        "content": [
          "Mastering rules, scores and models is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of rules, scores and models, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Weighted scores such as the Pain Score:",
            "text": "Production best practices on weighted scores such as the pain score to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "When a simple formula beats machine learning:",
            "text": "Production best practices on when a simple formula beats machine learning to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of rules, scores and models is measured accuracy on real domain edge cases."
        },
        "image": {
          "url": "/academy/diagrams/hybrid-ml-llm.svg",
          "caption": "Figure 12.1: The Hybrid Architecture: Combining microsecond tabular ML scoring with generative LLM synthesis.",
          "alt": "Hybrid Tabular ML and LLM Diagram"
        }
      },
      {
        "id": "c5-ch12-s02",
        "sectionNumber": "12.2",
        "title": "Supervised Learning Basics",
        "content": [
          "Mastering supervised learning basics is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of supervised learning basics, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Features and labels:",
            "text": "Production best practices on features and labels to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Training, validation and test sets:",
            "text": "Production best practices on training, validation and test sets to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Overfitting:",
            "text": "Production best practices on overfitting to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Features and labels",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Training, validation and test sets",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Overfitting",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch12-s03",
        "sectionNumber": "12.3",
        "title": "Common Models",
        "content": [
          "Mastering common models is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of common models, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Linear and logistic regression:",
            "text": "Production best practices on linear and logistic regression to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Decision trees and forests:",
            "text": "Production best practices on decision trees and forests to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Clustering for grouping similar problems:",
            "text": "Production best practices on clustering for grouping similar problems to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch12-s04",
        "sectionNumber": "12.4",
        "title": "Measuring Performance",
        "content": [
          "Mastering measuring performance is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of measuring performance, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Accuracy, precision and recall:",
            "text": "Production best practices on accuracy, precision and recall to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Confusion matrix:",
            "text": "Production best practices on confusion matrix to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Choosing the right metric for the job:",
            "text": "Production best practices on choosing the right metric for the job to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch12-s05",
        "sectionNumber": "12.5",
        "title": "Use Cases on a Problem Platform",
        "content": [
          "Mastering use cases on a problem platform is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of use cases on a problem platform, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Duplicate problem detection:",
            "text": "Production best practices on duplicate problem detection to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Auto-tagging domains and industries:",
            "text": "Production best practices on auto-tagging domains and industries to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Suggested pain score from submission text:",
            "text": "Production best practices on suggested pain score from submission text to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch12-s06",
        "sectionNumber": "12.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: build a simple tagger and measure it:",
            "text": "Production best practices on exercise: build a simple tagger and measure it to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is classical machine learning (such as XGBoost or logistic regression) preferred over an LLM for tabular fraud or credit risk scoring?",
      "options": [
        {
          "key": "A",
          "label": "Classical ML is faster, costs pennies per million inferences, handles structured numerical data natively, and provides strict mathematical interpretability",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "LLMs cannot read numbers under any circumstances",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Cloud providers do not allow LLMs to read databases",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Classical ML models never need to be retrained",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Classical ML excels on structured tabular features with microsecond latencies, rock-bottom cost, and transparent auditability.",
      "feedbackIncorrect": "Review Section 12.1: Classical models are vastly faster, orders of magnitude cheaper, and mathematically interpretable on tabular datasets."
    }
  },
  {
    "num": 13,
    "title": "Designing AI Products and Experiences",
    "shortTitle": "Designing AI Products",
    "slug": "designing-ai-products-and-experiences",
    "sectionsCount": 5,
    "part": "ML, Products & Capstone",
    "coverColor": "#0369a1",
    "subs": "Human-in-the-Loop \u00b7 Building Trust \u00b7 Interface Patterns \u00b7 Handling Failure \u00b7 and 1 more sections",
    "lead": "Design conversational and generative interfaces that build user trust. Implement perceived latency optimizations, gracefully handle model uncertainty, design smart fallbacks, and craft intuitive affordances beyond plain chat.",
    "inThisChapter": "Mental models for AI features \u00b7 Progressive disclosure and perceived speed \u00b7 Designing for uncertainty and low confidence \u00b7 Inline chips and suggestions vs empty text inputs",
    "practicePrompt": "Design a UI mockup for an AI assistant that clearly communicates confidence levels, citations, and allows one-click inline corrections.",
    "sections": [
      {
        "id": "c5-ch13-s01",
        "sectionNumber": "13.1",
        "title": "Human-in-the-Loop",
        "content": [
          "Mastering human-in-the-loop is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of human-in-the-loop, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "AI suggests, human decides:",
            "text": "Production best practices on ai suggests, human decides to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Easy editing and undo:",
            "text": "Production best practices on easy editing and undo to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of human-in-the-loop is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch13-s02",
        "sectionNumber": "13.2",
        "title": "Building Trust",
        "content": [
          "Mastering building trust is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of building trust, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Showing sources and reasoning:",
            "text": "Production best practices on showing sources and reasoning to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Communicating uncertainty:",
            "text": "Production best practices on communicating uncertainty to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Setting realistic expectations:",
            "text": "Production best practices on setting realistic expectations to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Showing sources and reasoning",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Communicating uncertainty",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Setting realistic expectations",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch13-s03",
        "sectionNumber": "13.3",
        "title": "Interface Patterns",
        "content": [
          "Mastering interface patterns is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of interface patterns, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Chat vs. buttons vs. inline suggestions:",
            "text": "Production best practices on chat vs. buttons vs. inline suggestions to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Templates and guided inputs:",
            "text": "Production best practices on templates and guided inputs to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Onboarding for AI features:",
            "text": "Production best practices on onboarding for ai features to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch13-s04",
        "sectionNumber": "13.4",
        "title": "Handling Failure",
        "content": [
          "Mastering handling failure is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of handling failure, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Wrong answers: report and recover:",
            "text": "Production best practices on wrong answers: report and recover to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Empty or refused responses:",
            "text": "Production best practices on empty or refused responses to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Offline and slow states:",
            "text": "Production best practices on offline and slow states to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch13-s05",
        "sectionNumber": "13.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: redesign an AI feature screen for trust and clarity:",
            "text": "Production best practices on exercise: redesign an ai feature screen for trust and clarity to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is streaming responses word-by-word (or token-by-token) considered an essential UX best practice for AI interfaces?",
      "options": [
        {
          "key": "A",
          "label": "It reduces server memory consumption to zero",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "It dramatically slashes perceived latency by showing immediate progress within 200-500ms rather than leaving the user staring at a spinner for 8 seconds",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "It prevents the model from generating hallucinated text",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "It encrypts the communication channel between client and server",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exact! Immediate streaming tokens engage user attention, transforming a multi-second roundtrip delay into an active reading experience.",
      "feedbackIncorrect": "Review Section 13.2: Streaming token output drastically reduces perceived latency, providing instant feedback while the model completes generation."
    }
  },
  {
    "num": 14,
    "title": "Working Faster With AI Tools",
    "shortTitle": "AI Developer Velocity",
    "slug": "working-faster-with-ai-tools",
    "sectionsCount": 5,
    "part": "ML, Products & Capstone",
    "coverColor": "#0369a1",
    "subs": "AI for Coding \u00b7 AI for Research and Writing \u00b7 AI for Design and Prototyping \u00b7 Good Habits \u00b7 and 1 more sections",
    "lead": "Supercharge your software engineering workflow with modern AI tools. Master agentic coding workflows, automated test generation, synthetic data scaffolding, and understand the critical boundaries where human judgment must stay in control.",
    "inThisChapter": "AI-assisted codebase exploration \u00b7 Writing robust automated tests with AI \u00b7 Refactoring and scaffolding patterns \u00b7 Hallucinated libraries and dependency security",
    "practicePrompt": "Use an AI coding assistant to draft a complete test suite for a utility function, then conduct a rigorous human code audit to find edge case bugs.",
    "sections": [
      {
        "id": "c5-ch14-s01",
        "sectionNumber": "14.1",
        "title": "AI for Coding",
        "content": [
          "Mastering ai for coding is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of ai for coding, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Code assistants and agents:",
            "text": "Production best practices on code assistants and agents to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Reviewing generated code:",
            "text": "Production best practices on reviewing generated code to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Tests as your safety net:",
            "text": "Production best practices on tests as your safety net to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of ai for coding is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch14-s02",
        "sectionNumber": "14.2",
        "title": "AI for Research and Writing",
        "content": [
          "Mastering ai for research and writing is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of ai for research and writing, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Summarising interviews:",
            "text": "Production best practices on summarising interviews to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Drafting documents with human editing:",
            "text": "Production best practices on drafting documents with human editing to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checking facts and sources:",
            "text": "Production best practices on checking facts and sources to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Summarising interviews",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Drafting documents with human editing",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Checking facts and sources",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch14-s03",
        "sectionNumber": "14.3",
        "title": "AI for Design and Prototyping",
        "content": [
          "Mastering ai for design and prototyping is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of ai for design and prototyping, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Generating layouts and copy:",
            "text": "Production best practices on generating layouts and copy to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Limits and cleanup:",
            "text": "Production best practices on limits and cleanup to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch14-s04",
        "sectionNumber": "14.4",
        "title": "Good Habits",
        "content": [
          "Mastering good habits is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of good habits, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Never paste secrets or private data:",
            "text": "Production best practices on never paste secrets or private data to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Keep a log of important prompts:",
            "text": "Production best practices on keep a log of important prompts to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Learn the basics yourself first:",
            "text": "Production best practices on learn the basics yourself first to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch14-s05",
        "sectionNumber": "14.5",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: build a small feature with AI help and document what you changed:",
            "text": "Production best practices on exercise: build a small feature with ai help and document what you changed to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the critical risk when accepting code generated by an AI assistant without line-by-line human review?",
      "options": [
        {
          "key": "A",
          "label": "The code will not compile on GitHub",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Subtle security vulnerabilities, hallucinated package dependencies, or off-by-one errors that pass casual reading but fail in edge cases",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "AI code automatically deletes git history",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "CSS animations will run in reverse",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! AI coding tools generate plausible-looking code that can contain subtle edge-case bugs or security traps. Always verify and test thoroughly.",
      "feedbackIncorrect": "Review Section 14.4: AI code must be audited by human engineers to catch hallucinated packages, subtle logic bugs, and security oversights."
    }
  },
  {
    "num": 15,
    "title": "AI in Real Domains",
    "shortTitle": "AI in Real Domains",
    "slug": "ai-in-real-domains",
    "sectionsCount": 6,
    "part": "ML, Products & Capstone",
    "coverColor": "#0369a1",
    "subs": "Healthcare and Clinics \u00b7 Logistics and Operations \u00b7 Education \u00b7 Finance and Small Business \u00b7 and 2 more sections",
    "lead": "Examine concrete case studies of production AI systems operating in high-stakes environments: climate forecasting for informal workers, clinical diagnostic triage, micro-credit risk assessment, and public sector services.",
    "inThisChapter": "Climate and heat vulnerability models \u00b7 Healthcare diagnostics and regulatory clinical safety \u00b7 Financial inclusion and alternative credit scoring \u00b7 Cross-domain architectural patterns",
    "practicePrompt": "Write an architectural trade-off analysis for deploying an AI copilot in a domain with low digital literacy and unreliable network connectivity.",
    "sections": [
      {
        "id": "c5-ch15-s01",
        "sectionNumber": "15.1",
        "title": "Healthcare and Clinics",
        "content": [
          "Mastering healthcare and clinics is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of healthcare and clinics, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Scheduling, documentation and triage support:",
            "text": "Production best practices on scheduling, documentation and triage support to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Safety and regulation:",
            "text": "Production best practices on safety and regulation to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of healthcare and clinics is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch15-s02",
        "sectionNumber": "15.2",
        "title": "Logistics and Operations",
        "content": [
          "Mastering logistics and operations is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of logistics and operations, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Route and dispatch support:",
            "text": "Production best practices on route and dispatch support to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Document extraction (invoices, bills of lading):",
            "text": "Production best practices on document extraction (invoices, bills of lading) to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch15-s03",
        "sectionNumber": "15.3",
        "title": "Education",
        "content": [
          "Mastering education is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of education, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Tutoring and feedback:",
            "text": "Production best practices on tutoring and feedback to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Academic integrity concerns:",
            "text": "Production best practices on academic integrity concerns to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch15-s04",
        "sectionNumber": "15.4",
        "title": "Finance and Small Business",
        "content": [
          "Mastering finance and small business is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of finance and small business, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Bookkeeping and reconciliation:",
            "text": "Production best practices on bookkeeping and reconciliation to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Compliance and accuracy needs:",
            "text": "Production best practices on compliance and accuracy needs to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch15-s05",
        "sectionNumber": "15.5",
        "title": "India and Multilingual Contexts",
        "content": [
          "Mastering india and multilingual contexts is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of india and multilingual contexts, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Indian languages and code-mixed text:",
            "text": "Production best practices on indian languages and code-mixed text to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Voice and low-bandwidth use:",
            "text": "Production best practices on voice and low-bandwidth use to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Government and public-sector use cases:",
            "text": "Production best practices on government and public-sector use cases to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch15-s06",
        "sectionNumber": "15.6",
        "title": "Chapter Practice",
        "content": [
          "Mastering chapter practice is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of chapter practice, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Exercise: design an AI workflow for one problem in your domain:",
            "text": "Production best practices on exercise: design an ai workflow for one problem in your domain to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Checkpoint quiz:",
            "text": "Production best practices on checkpoint quiz to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What common constraint unites successful AI deployments in underserved or emerging market domains?",
      "options": [
        {
          "key": "A",
          "label": "Requiring 4K video screens on devices",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Offline-first resilience, local language support, extreme cost constraints, and fail-safe human handoffs",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Running 70B parameter models directly on low-end smartphones",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Forcing users to sign up with enterprise SSO accounts",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! Real-world deployments require lightweight payloads, multi-lingual audio/text support, low latency, and dependable human escalation.",
      "feedbackIncorrect": "Review Section 15.6: Successful real-world systems prioritize offline resilience, local dialect comprehension, low compute costs, and robust human fallbacks."
    }
  },
  {
    "num": 16,
    "title": "Capstone Project",
    "shortTitle": "Capstone Project",
    "slug": "capstone-project",
    "sectionsCount": 4,
    "part": "ML, Products & Capstone",
    "coverColor": "#0369a1",
    "subs": "Brief \u00b7 Requirements \u00b7 Grading Rubric \u00b7 Submit to Stuckhere",
    "lead": "Build and deploy a complete, production-grade AI feature that solves a validated problem. Integrate streaming UX, RAG grounding, automated evaluation suites, safety guardrails, and telemetry into a working web deployment.",
    "inThisChapter": "Capstone project brief and requirements \u00b7 Architecture checklist \u00b7 Verification and grading rubric \u00b7 Preparing a 3-minute video walkthrough",
    "practicePrompt": "Submit your completed GitHub repository link, live demo deployment URL, evaluation benchmark report, and architecture design diagram.",
    "sections": [
      {
        "id": "c5-ch16-s01",
        "sectionNumber": "16.1",
        "title": "Brief",
        "content": [
          "Mastering brief is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of brief, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Add one AI feature to the solution you built in Subject 3 or 4:",
            "text": "Production best practices on add one ai feature to the solution you built in subject 3 or 4 to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of brief is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch16-s02",
        "sectionNumber": "16.2",
        "title": "Requirements",
        "content": [
          "Mastering requirements is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of requirements, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Clear job statement and success metrics:",
            "text": "Production best practices on clear job statement and success metrics to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Secure back-end endpoint:",
            "text": "Production best practices on secure back-end endpoint to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Grounded answers with sources:",
            "text": "Production best practices on grounded answers with sources to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Structured output with validation:",
            "text": "Production best practices on structured output with validation to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "-case evaluation set and results:",
            "text": "Production best practices on -case evaluation set and results to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Safety tests and a cost model:",
            "text": "Production best practices on safety tests and a cost model to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "A user-facing explanation of limits:",
            "text": "Production best practices on a user-facing explanation of limits to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Clear job statement and success metrics",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Secure back-end endpoint",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Grounded answers with sources",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch16-s03",
        "sectionNumber": "16.3",
        "title": "Grading Rubric",
        "content": [
          "Mastering grading rubric is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of grading rubric, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Problem fit and design (20%):",
            "text": "Production best practices on problem fit and design (20%) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Implementation quality (25%):",
            "text": "Production best practices on implementation quality (25%) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Evaluation rigour (25%):",
            "text": "Production best practices on evaluation rigour (25%) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Safety and privacy (15%):",
            "text": "Production best practices on safety and privacy (15%) to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Cost awareness and UX (15%):",
            "text": "Production best practices on cost awareness and ux (15%) to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch16-s04",
        "sectionNumber": "16.4",
        "title": "Submit to Stuckhere",
        "content": [
          "Mastering submit to stuckhere is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of submit to stuckhere, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Publish a demo and write-up for the community:",
            "text": "Production best practices on publish a demo and write-up for the community to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the single most critical criterion when evaluating an AI capstone feature for production readiness?",
      "options": [
        {
          "key": "A",
          "label": "Using the maximum possible number of third-party npm packages",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Verifiable groundedness on domain data with empirical eval test pass rates exceeding 90% and cost/latency within budgeted constraints",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Having a dark mode theme toggle on the landing page",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Submitting more than 10,000 lines of CSS code",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Exact! Real-world production readiness is defined by verifiable factual groundedness, automated eval pass rates, security, and economic viability.",
      "feedbackIncorrect": "Review Section 16.4: The grading rubric emphasizes verified evaluation scores, groundedness against hallucinations, safety, and unit economics."
    }
  },
  {
    "num": 17,
    "title": "Appendices",
    "shortTitle": "Appendices",
    "slug": "appendices",
    "sectionsCount": 6,
    "part": "ML, Products & Capstone",
    "coverColor": "#0369a1",
    "subs": "Glossary \u00b7 Templates \u00b7 Pre-Launch Checklist \u00b7 Master Quiz Bank \u00b7 and 2 more sections",
    "lead": "Your permanent reference toolkit: comprehensive AI terminology glossary, model comparison matrix, reusable prompt templates, production readiness checklist, and final comprehensive certification quiz.",
    "inThisChapter": "AI terminology reference dictionary \u00b7 Model benchmark and pricing comparison \u00b7 Battle-tested prompt template library \u00b7 Production pre-flight checklist \u00b7 Final certification quiz",
    "practicePrompt": "Conduct a pre-flight audit of your production AI feature using the 25-point Production Readiness Checklist.",
    "sections": [
      {
        "id": "c5-ch17-s01",
        "sectionNumber": "17.1",
        "title": "Glossary",
        "content": [
          "Mastering glossary is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of glossary, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Token, context window, temperature, prompt, embedding, RAG, agent, tool call, hallucination, fine-tuning, evaluation, prompt injection:",
            "text": "Production best practices on token, context window, temperature, prompt, embedding, rag, agent, tool call, hallucination, fine-tuning, evaluation, prompt injection to ensure reliable, high-performance AI deployment."
          }
        ],
        "callout": {
          "boldPrefix": "Builder's Heuristic:",
          "text": "Never deploy generative models without automated evaluation gates. The true test of glossary is measured accuracy on real domain edge cases."
        }
      },
      {
        "id": "c5-ch17-s02",
        "sectionNumber": "17.2",
        "title": "Templates",
        "content": [
          "Mastering templates is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of templates, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Prompt template:",
            "text": "Production best practices on prompt template to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Evaluation rubric:",
            "text": "Production best practices on evaluation rubric to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Test-case sheet:",
            "text": "Production best practices on test-case sheet to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Red-team checklist:",
            "text": "Production best practices on red-team checklist to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Cost estimation sheet:",
            "text": "Production best practices on cost estimation sheet to ensure reliable, high-performance AI deployment."
          }
        ],
        "table": {
          "headers": [
            "Architecture Layer",
            "Primary Focus",
            "Target Metric"
          ],
          "rows": [
            {
              "label": "Prompt template",
              "text": "Input validation & grounding",
              "text2": "< 0.5% Hallucination"
            },
            {
              "label": "Evaluation rubric",
              "text": "Pipeline execution & streaming",
              "text2": "< 400ms TTFT"
            },
            {
              "label": "Test-case sheet",
              "text": "Evaluation & guardrails",
              "text2": "> 95% Golden Eval Pass"
            }
          ]
        }
      },
      {
        "id": "c5-ch17-s03",
        "sectionNumber": "17.3",
        "title": "Pre-Launch Checklist",
        "content": [
          "Mastering pre-launch checklist is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of pre-launch checklist, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "checks across quality, safety, privacy and cost:",
            "text": "Production best practices on checks across quality, safety, privacy and cost to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch17-s04",
        "sectionNumber": "17.4",
        "title": "Master Quiz Bank",
        "content": [
          "Mastering master quiz bank is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of master quiz bank, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "multiple-choice questions grouped by chapter:",
            "text": "Production best practices on multiple-choice questions grouped by chapter to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch17-s05",
        "sectionNumber": "17.5",
        "title": "Further Reading",
        "content": [
          "Mastering further reading is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of further reading, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Official model provider documentation and prompting guides:",
            "text": "Production best practices on official model provider documentation and prompting guides to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Related Stuckhere pages: Methodology, Startup Mode, Full-Stack Cloud:",
            "text": "Production best practices on related stuckhere pages: methodology, startup mode, full-stack cloud to ensure reliable, high-performance AI deployment."
          }
        ]
      },
      {
        "id": "c5-ch17-s06",
        "sectionNumber": "17.6",
        "title": "FAQ (good for Schema.org FAQPage SEO)",
        "content": [
          "Mastering faq (good for schema.org faqpage seo) is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
          "In this section, we examine the concrete mechanics of faq (good for schema.org faqpage seo), isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ],
        "points": [
          {
            "bold": "Do I need to train my own model?:",
            "text": "Production best practices on do i need to train my own model? to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "How do I stop an AI feature from making things up?:",
            "text": "Production best practices on how do i stop an ai feature from making things up? to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "How much does an AI feature cost per user?:",
            "text": "Production best practices on how much does an ai feature cost per user? to ensure reliable, high-performance AI deployment."
          },
          {
            "bold": "Is it safe to send user data to a model API?:",
            "text": "Production best practices on is it safe to send user data to a model api? to ensure reliable, high-performance AI deployment."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Before deploying an LLM feature to general production, which item on the pre-flight checklist is mandatory?",
      "options": [
        {
          "key": "A",
          "label": "Hardcoded API keys stored in client source code",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Automated regression evaluation suite, PII scrubbing, rate limit fallbacks, and real-time cost alerts configured",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Setting temperature to 1.5 across all prompts",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Removing all server-side logging to save disk space",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Spot on! A comprehensive pre-flight checklist guarantees that safety, evals, cost monitoring, and fallbacks are active prior to customer exposure.",
      "feedbackIncorrect": "Review Section 17.4: Production deployment mandates automated eval gates, sanitization, rate limiting, and real-time budget guardrails."
    }
  }
];
