# -*- coding: utf-8 -*-
import json
import re

with open('scratch/parsed_course5_raw.json', 'r', encoding='utf-8') as f:
    raw_chapters = json.load(f)

CHAPTER_META = {
    0: {
        "shortTitle": "Course Overview",
        "slug": "course-overview",
        "lead": "AI is a tool for solving verified problems, not a goal in itself. This subject teaches you how to design, build, and deploy production-grade language model features that are useful, safe, cost-efficient, and rigorously evaluated.",
        "inThisChapter": "The AI builder philosophy · What you will be able to build · Prerequisites and full-stack alignment · The end-to-end Problem Solver Copilot project",
        "practicePrompt": "Identify one validated problem from your Problem Dossier where unstructured text processing or reasoning could unlock immense customer value.",
        "quiz": {
            "question": "What is the primary anti-pattern builders commit when adopting AI for their products?",
            "options": [
                {"key": "A", "label": "Treating AI as a magical solution looking for a problem, rather than anchoring it to verified human friction", "isCorrect": True},
                {"key": "B", "label": "Using JSON structured outputs instead of plain text", "isCorrect": False},
                {"key": "C", "label": "Enabling streaming responses for user queries", "isCorrect": False},
                {"key": "D", "label": "Logging token consumption in production monitoring", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! AI must serve as an enabling tool for verified customer friction, not an exploratory tech demo looking for a use case.",
            "feedbackIncorrect": "Review Section 0.1: The core principle is that AI is a tool for solving verified problems, never a goal in itself."
        }
    },
    1: {
        "shortTitle": "AI Foundations",
        "slug": "ai-foundations-for-builders",
        "lead": "Separate marketing hype from production reality. Understand the taxonomy of modern artificial intelligence, identify where foundation models excel, and recognize when deterministic code or classical heuristics are far superior.",
        "inThisChapter": "AI vs ML vs Deep Learning · Generative AI and LLM capabilities · Triage framework: When to use AI vs rules · Assessing the cost of being wrong",
        "practicePrompt": "List five candidate tasks in your product and evaluate whether each should be solved with rules, classical algorithms, or an LLM.",
        "quiz": {
            "question": "When is an LLM the WRONG architectural choice for a feature?",
            "options": [
                {"key": "A", "label": "When summarizing multi-page customer feedback transcripts", "isCorrect": False},
                {"key": "B", "label": "When the task requires 100% deterministic arithmetic, strict legal calculations, or can be solved with a simple database lookup", "isCorrect": True},
                {"key": "C", "label": "When extracting structured entities from noisy text", "isCorrect": False},
                {"key": "D", "label": "When translating domain terminology between operators", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Never use a probabilistic language model for tasks where exact deterministic rules or arithmetic must be strictly guaranteed.",
            "feedbackIncorrect": "Review Section 1.3: Deterministic logic, spreadsheets, and database queries are strictly superior for arithmetic and hard business rules."
        }
    },
    2: {
        "shortTitle": "How LLMs Work",
        "slug": "how-large-language-models-work",
        "lead": "Demystify next-token prediction, tokenizer mechanics, context windows, and sampling parameters. Learn why models hallucinate and how architectural constraints shape real-world product reliability.",
        "inThisChapter": "Tokens vs characters · Pretraining, instruction tuning, and RLHF · Context window dynamics · Temperature, Top-P, and frequency penalty · Why models hallucinate",
        "practicePrompt": "Experiment with temperature 0.0 vs 0.9 across three prompt types and record how stability and factual consistency vary.",
        "quiz": {
            "question": "Why does setting temperature to 0.0 (or near zero) improve reliability in operational business features?",
            "options": [
                {"key": "A", "label": "It makes the model run for free without API billing", "isCorrect": False},
                {"key": "B", "label": "It forces greedy token sampling, maximizing deterministic predictability for structured outputs and classifications", "isCorrect": True},
                {"key": "C", "label": "It prevents the model from exceeding its context window", "isCorrect": False},
                {"key": "D", "label": "It automatically fine-tunes the model weights on your database", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Temperature 0.0 forces the model to select the highest-probability token at each step, yielding consistent, repeatable responses.",
            "feedbackIncorrect": "Review Section 2.4: Lower temperature reduces sampling entropy, making outputs deterministic and reproducible."
        }
    },
    3: {
        "shortTitle": "Prompt Engineering",
        "slug": "prompt-engineering",
        "lead": "Move beyond ad-hoc prompting. Master structured system instructions, few-shot demonstration framing, role definition, chain-of-thought elicitation, and schema-enforced JSON structured outputs.",
        "inThisChapter": "Anatomy of an enterprise prompt · Few-shot learning vs zero-shot · Chain-of-thought reasoning · Pydantic & Zod JSON schema enforcement · Anti-patterns to avoid",
        "practicePrompt": "Write a prompt that ingests a raw customer support message and outputs a strictly typed JSON object containing sentiment, category, urgency, and recommended response.",
        "quiz": {
            "question": "What is the most reliable way to ensure an LLM returns parseable JSON in a production web application?",
            "options": [
                {"key": "A", "label": "Asking politely in all-caps: 'PLEASE ONLY RETURN JSON'", "isCorrect": False},
                {"key": "B", "label": "Using model API structured outputs (JSON schema / response_format) enforced at the sampling engine level", "isCorrect": True},
                {"key": "C", "label": "Appending '```json' to the user message", "isCorrect": False},
                {"key": "D", "label": "Writing a 500-word regex validator on the client", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! Native API structured outputs constrain the decoding logits directly to valid JSON tokens matching your exact schema.",
            "feedbackIncorrect": "Review Section 3.3: Native structured output APIs guarantee 100% compliant schema generation directly at the decoder level."
        }
    },
    4: {
        "shortTitle": "Calling Model APIs",
        "slug": "calling-model-apis",
        "lead": "Architect a production-ready, secure model gateway. Master server-side API credential isolation, streaming Server-Sent Events (SSE), exponential backoff retries, edge latency optimization, and distributed request logging.",
        "inThisChapter": "Selecting model tiers (Flash vs Pro) · Serverless API proxies · Streaming responses with ReadableStream · Rate limit handling and retry strategies · Distributed telemetry",
        "practicePrompt": "Build a secure Node/Express or Next.js route handler that proxies a user query to an LLM provider and streams chunks to the client.",
        "quiz": {
            "question": "Why must LLM API secret keys never be included in client-side React code?",
            "options": [
                {"key": "A", "label": "Client browsers do not support modern HTTPS encryption", "isCorrect": False},
                {"key": "B", "label": "Anyone inspecting the browser network bundle can extract the key, depleting your quota or billing your account without limit", "isCorrect": True},
                {"key": "C", "label": "React components re-render every time an API key is evaluated", "isCorrect": False},
                {"key": "D", "label": "Model APIs automatically block requests coming from Chromium", "isCorrect": False}
            ],
            "feedbackCorrect": "Crucial security point! Client-side API keys are public. Always route requests through an authenticated backend proxy.",
            "feedbackIncorrect": "Review Section 4.2: API keys bundled in client code can be easily scraped by anyone opening DevTools."
        }
    },
    5: {
        "shortTitle": "Grounding with RAG",
        "slug": "grounding-with-your-own-data-rag",
        "lead": "Stop hallucinations by anchoring model answers to proprietary business knowledge. Learn vector embeddings, document chunking strategies, cosine similarity retrieval, and dynamic context injection.",
        "inThisChapter": "The mechanics of RAG · Text embeddings and high-dimensional vector spaces · Chunking trade-offs (size vs overlap) · Vector databases & similarity search · Context injection prompt templates",
        "practicePrompt": "Implement a chunking script that splits a 10-page operational manual into 400-token chunks with 50-token overlap, ready for embedding.",
        "quiz": {
            "question": "What is the primary function of text embeddings in a Retrieval-Augmented Generation pipeline?",
            "options": [
                {"key": "A", "label": "Compressing HTML images into thumbnail sizes", "isCorrect": False},
                {"key": "B", "label": "Converting text chunks into numerical vectors whose distance reflects semantic conceptual similarity", "isCorrect": True},
                {"key": "C", "label": "Translating English prompts into machine binary code", "isCorrect": False},
                {"key": "D", "label": "Encrypting customer credit card credentials", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Embeddings map text into vectors where semantically related passages reside close to one another in vector space.",
            "feedbackIncorrect": "Review Section 5.3: Embeddings convert text to numeric vectors representing semantic meaning for similarity search."
        }
    },
    6: {
        "shortTitle": "Tools and Agents",
        "slug": "tools-and-agents",
        "lead": "Empower language models to interact with the external world. Build tool-calling pipelines for database queries, live API lookups, calculator execution, and multi-step agentic workflows with strict safety boundaries.",
        "inThisChapter": "Function calling schemas · Handling model tool invocations · The ReAct loop (Reason + Act) · Human-in-the-loop approvals · Bounding agent recursion depth",
        "practicePrompt": "Define a tool schema for querying your application's Firestore problem records and handle the tool call execution loop.",
        "quiz": {
            "question": "What is the primary danger of giving an agent autonomous access to write/delete database tools without guardrails?",
            "options": [
                {"key": "A", "label": "The browser tab will run out of CSS memory", "isCorrect": False},
                {"key": "B", "label": "Prompt injection or runaway loops could cause destructive mutations or irreversible data loss", "isCorrect": True},
                {"key": "C", "label": "Cloud functions will disable their SSL certificates", "isCorrect": False},
                {"key": "D", "label": "SQL queries cannot be formatted as JSON", "isCorrect": False}
            ],
            "feedbackCorrect": "Crucial engineering guardrail! Always require explicit human authorization or dry-run validation for destructive write operations.",
            "feedbackIncorrect": "Review Section 6.4: Unbounded agent tool execution can lead to destructive mutations if not guarded by human-in-the-loop approvals."
        }
    },
    7: {
        "shortTitle": "Problem Solver Copilot",
        "slug": "building-a-problem-solver-copilot",
        "lead": "Put all pieces together to engineer a production Problem Solver Copilot. Walk step-by-step through product specifications, dynamic dossier context assembly, streaming UI, and user feedback capture.",
        "inThisChapter": "Feature product spec · Context assembly from Problem Dossier · Optimistic UI and streaming message hooks · Feedback collection (thumbs up/down) · Continuous telemetry",
        "practicePrompt": "Wire a full prototype copilot chat interface that answers user questions about a specific validated problem using verified dossier facts.",
        "quiz": {
            "question": "Why is capturing explicit user feedback (e.g., thumbs up/down with optional commentary) vital for an AI feature?",
            "options": [
                {"key": "A", "label": "It directly updates the model weights in real time without retraining", "isCorrect": False},
                {"key": "B", "label": "It builds an empirical golden evaluation dataset of real user interactions for regression testing and prompt tuning", "isCorrect": True},
                {"key": "C", "label": "It is legally required by GDPR for all web buttons", "isCorrect": False},
                {"key": "D", "label": "It prevents users from taking screenshots of the conversation", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Real user feedback feeds directly into your curation pipeline, generating golden evaluation datasets for continuous improvement.",
            "feedbackIncorrect": "Review Section 7.5: Explicit feedback creates the ground-truth dataset required to evaluate and tune future prompt iterations."
        }
    },
    8: {
        "shortTitle": "Evaluating AI Features",
        "slug": "evaluating-ai-features",
        "lead": "Unit tests do not work for probabilistic systems. Build golden evaluation test suites, implement model-graded evals (LLM-as-a-judge), calculate groundedness and answer relevance, and automate evals in CI/CD pipelines.",
        "inThisChapter": "Why software testing changes for AI · Curation of golden test sets · LLM-as-a-judge scoring rubrics · Measuring precision, recall, and hallucination rate · CI/CD test gates",
        "practicePrompt": "Create a 10-item golden evaluation test suite with ground-truth reference outputs and run an automated evaluation script.",
        "quiz": {
            "question": "What is 'LLM-as-a-judge' and when should you use it?",
            "options": [
                {"key": "A", "label": "A legal AI that replaces court judges for trademark disputes", "isCorrect": False},
                {"key": "B", "label": "Using a powerful, calibrated model with a strict scoring rubric to grade the quality and groundedness of outputs from smaller production models", "isCorrect": True},
                {"key": "C", "label": "A browser extension that flags bad grammar", "isCorrect": False},
                {"key": "D", "label": "A compiler optimization for faster JavaScript parsing", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Using an advanced model with calibrated rubrics allows scalable automated assessment of complex language nuances.",
            "feedbackIncorrect": "Review Section 8.3: Model-graded evals leverage high-capability models with strict rubrics to evaluate nuanced outputs in automated test runs."
        }
    },
    9: {
        "shortTitle": "Safety, Privacy & Security",
        "slug": "safety-privacy-and-security",
        "lead": "Harden your AI system against real-world adversarial attacks. Defend against direct and indirect prompt injection, implement PII redaction pipelines, prevent jailbreaks, and establish threat models for generative systems.",
        "inThisChapter": "Direct vs indirect prompt injection · Scrubbing and redacting PII · Defense-in-depth sanitization · Enterprise compliance standards (GDPR, SOC2) · Threat modeling matrix",
        "practicePrompt": "Write a test suite of 5 adversarial prompt injection attacks against your copilot and verify your system instructions resist unauthorized jailbreaks.",
        "quiz": {
            "question": "What is an 'indirect prompt injection' attack?",
            "options": [
                {"key": "A", "label": "When a hacker pulls the power cord on the server", "isCorrect": False},
                {"key": "B", "label": "When malicious instructions are concealed inside external data retrieved by the model (e.g., a web page or resume), hijacking model execution", "isCorrect": True},
                {"key": "C", "label": "When an API key expires unexpectedly", "isCorrect": False},
                {"key": "D", "label": "When an engineer writes a typo in the system prompt", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! Indirect prompt injection occurs when untrusted retrieved content contains hidden commands that override the primary system instructions.",
            "feedbackIncorrect": "Review Section 9.1: Indirect prompt injection embeds malicious instructions into third-party content that the model ingests during RAG or tool use."
        }
    },
    10: {
        "shortTitle": "Cost, Latency & Scale",
        "slug": "cost-latency-and-scale",
        "lead": "Ship AI features that remain profitable and blazingly fast at enterprise volume. Optimize prompt token density, implement semantic response caching, leverage tiered model cascades, and set real-time budget guardrails.",
        "inThisChapter": "Token economics and unit cost modeling · Semantic caching with Redis/embeddings · Model routing (cheap small models vs reasoning engines) · Time to First Token (TTFT) · Budget alerts",
        "practicePrompt": "Calculate the projected monthly token cost of your AI copilot across 10,000 monthly active users and model the cost reduction from semantic caching.",
        "quiz": {
            "question": "How does model tier routing (cascade) dramatically lower operating costs?",
            "options": [
                {"key": "A", "label": "By turning off the API at night", "isCorrect": False},
                {"key": "B", "label": "By routing simple classification or lookup queries to lightweight, ultra-cheap models, reserving large reasoning models only for hard queries", "isCorrect": True},
                {"key": "C", "label": "By using open-source models that run on client CPU", "isCorrect": False},
                {"key": "D", "label": "By disabling SSL handshakes", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! In production, 80%+ of queries can be answered by low-latency, low-cost models, reducing aggregate expenses by 70-90%.",
            "feedbackIncorrect": "Review Section 10.2: Model cascading routes standard queries to fast, economical models, invoking flagship models only when complex reasoning is required."
        }
    },
    11: {
        "shortTitle": "Data for AI",
        "slug": "data-for-ai",
        "lead": "Data is the ultimate competitive moat for AI builders. Create continuous data flywheels from user interactions, generate high-fidelity synthetic training data, and curate datasets for domain-specific fine-tuning.",
        "inThisChapter": "The data flywheel architecture · Curation of high-signal interaction logs · Synthetic data generation with validation filters · Preparing JSONL datasets for fine-tuning",
        "practicePrompt": "Format a dataset of 20 verified problem-solution interactions into a compliant JSONL format suitable for model fine-tuning or evaluation.",
        "quiz": {
            "question": "What is the primary risk when generating synthetic training data using another language model?",
            "options": [
                {"key": "A", "label": "Synthetic data files cannot be loaded into PostgreSQL", "isCorrect": False},
                {"key": "B", "label": "Model bias, hallucinations, and uniform linguistic style can cause model collapse if not rigorously filtered and validated against real ground truth", "isCorrect": True},
                {"key": "C", "label": "Synthetic data violates IEEE copyright law", "isCorrect": False},
                {"key": "D", "label": "Browsers will flag the web page as untrusted", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Synthetic data must always pass strict quality gates, schema validators, and human spot-checks to avoid reinforcing synthetic hallucinations.",
            "feedbackIncorrect": "Review Section 11.3: Without filtering and validation, synthetic data propagates subtle model errors and uniform phrasing."
        }
    },
    12: {
        "shortTitle": "Classical ML & Scoring",
        "slug": "classical-machine-learning-and-scoring-models",
        "lead": "Do not use a sledgehammer to crack a nut. Learn how logistic regression, gradient boosted decision trees (XGBoost), and deterministic scoring algorithms often beat LLMs in speed, interpretability, and cost.",
        "inThisChapter": "Heuristics and statistical scoring vs LLMs · Calculating algorithmic Pain Scores · Gradient boosted trees for tabular prediction · Combining ML ranking with LLM generation",
        "practicePrompt": "Implement a deterministic Python or TypeScript scoring function that computes an Opportunity Index (0-100) from validated tabular friction metrics.",
        "quiz": {
            "question": "Why is classical machine learning (such as XGBoost or logistic regression) preferred over an LLM for tabular fraud or credit risk scoring?",
            "options": [
                {"key": "A", "label": "Classical ML is faster, costs pennies per million inferences, handles structured numerical data natively, and provides strict mathematical interpretability", "isCorrect": True},
                {"key": "B", "label": "LLMs cannot read numbers under any circumstances", "isCorrect": False},
                {"key": "C", "label": "Cloud providers do not allow LLMs to read databases", "isCorrect": False},
                {"key": "D", "label": "Classical ML models never need to be retrained", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Classical ML excels on structured tabular features with microsecond latencies, rock-bottom cost, and transparent auditability.",
            "feedbackIncorrect": "Review Section 12.1: Classical models are vastly faster, orders of magnitude cheaper, and mathematically interpretable on tabular datasets."
        }
    },
    13: {
        "shortTitle": "Designing AI Products",
        "slug": "designing-ai-products-and-experiences",
        "lead": "Design conversational and generative interfaces that build user trust. Implement perceived latency optimizations, gracefully handle model uncertainty, design smart fallbacks, and craft intuitive affordances beyond plain chat.",
        "inThisChapter": "Mental models for AI features · Progressive disclosure and perceived speed · Designing for uncertainty and low confidence · Inline chips and suggestions vs empty text inputs",
        "practicePrompt": "Design a UI mockup for an AI assistant that clearly communicates confidence levels, citations, and allows one-click inline corrections.",
        "quiz": {
            "question": "Why is streaming responses word-by-word (or token-by-token) considered an essential UX best practice for AI interfaces?",
            "options": [
                {"key": "A", "label": "It reduces server memory consumption to zero", "isCorrect": False},
                {"key": "B", "label": "It dramatically slashes perceived latency by showing immediate progress within 200-500ms rather than leaving the user staring at a spinner for 8 seconds", "isCorrect": True},
                {"key": "C", "label": "It prevents the model from generating hallucinated text", "isCorrect": False},
                {"key": "D", "label": "It encrypts the communication channel between client and server", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Immediate streaming tokens engage user attention, transforming a multi-second roundtrip delay into an active reading experience.",
            "feedbackIncorrect": "Review Section 13.2: Streaming token output drastically reduces perceived latency, providing instant feedback while the model completes generation."
        }
    },
    14: {
        "shortTitle": "AI Developer Velocity",
        "slug": "working-faster-with-ai-tools",
        "lead": "Supercharge your software engineering workflow with modern AI tools. Master agentic coding workflows, automated test generation, synthetic data scaffolding, and understand the critical boundaries where human judgment must stay in control.",
        "inThisChapter": "AI-assisted codebase exploration · Writing robust automated tests with AI · Refactoring and scaffolding patterns · Hallucinated libraries and dependency security",
        "practicePrompt": "Use an AI coding assistant to draft a complete test suite for a utility function, then conduct a rigorous human code audit to find edge case bugs.",
        "quiz": {
            "question": "What is the critical risk when accepting code generated by an AI assistant without line-by-line human review?",
            "options": [
                {"key": "A", "label": "The code will not compile on GitHub", "isCorrect": False},
                {"key": "B", "label": "Subtle security vulnerabilities, hallucinated package dependencies, or off-by-one errors that pass casual reading but fail in edge cases", "isCorrect": True},
                {"key": "C", "label": "AI code automatically deletes git history", "isCorrect": False},
                {"key": "D", "label": "CSS animations will run in reverse", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! AI coding tools generate plausible-looking code that can contain subtle edge-case bugs or security traps. Always verify and test thoroughly.",
            "feedbackIncorrect": "Review Section 14.4: AI code must be audited by human engineers to catch hallucinated packages, subtle logic bugs, and security oversights."
        }
    },
    15: {
        "shortTitle": "AI in Real Domains",
        "slug": "ai-in-real-domains",
        "lead": "Examine concrete case studies of production AI systems operating in high-stakes environments: climate forecasting for informal workers, clinical diagnostic triage, micro-credit risk assessment, and public sector services.",
        "inThisChapter": "Climate and heat vulnerability models · Healthcare diagnostics and regulatory clinical safety · Financial inclusion and alternative credit scoring · Cross-domain architectural patterns",
        "practicePrompt": "Write an architectural trade-off analysis for deploying an AI copilot in a domain with low digital literacy and unreliable network connectivity.",
        "quiz": {
            "question": "What common constraint unites successful AI deployments in underserved or emerging market domains?",
            "options": [
                {"key": "A", "label": "Requiring 4K video screens on devices", "isCorrect": False},
                {"key": "B", "label": "Offline-first resilience, local language support, extreme cost constraints, and fail-safe human handoffs", "isCorrect": True},
                {"key": "C", "label": "Running 70B parameter models directly on low-end smartphones", "isCorrect": False},
                {"key": "D", "label": "Forcing users to sign up with enterprise SSO accounts", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Real-world deployments require lightweight payloads, multi-lingual audio/text support, low latency, and dependable human escalation.",
            "feedbackIncorrect": "Review Section 15.6: Successful real-world systems prioritize offline resilience, local dialect comprehension, low compute costs, and robust human fallbacks."
        }
    },
    16: {
        "shortTitle": "Capstone Project",
        "slug": "capstone-project",
        "lead": "Build and deploy a complete, production-grade AI feature that solves a validated problem. Integrate streaming UX, RAG grounding, automated evaluation suites, safety guardrails, and telemetry into a working web deployment.",
        "inThisChapter": "Capstone project brief and requirements · Architecture checklist · Verification and grading rubric · Preparing a 3-minute video walkthrough",
        "practicePrompt": "Submit your completed GitHub repository link, live demo deployment URL, evaluation benchmark report, and architecture design diagram.",
        "quiz": {
            "question": "What is the single most critical criterion when evaluating an AI capstone feature for production readiness?",
            "options": [
                {"key": "A", "label": "Using the maximum possible number of third-party npm packages", "isCorrect": False},
                {"key": "B", "label": "Verifiable groundedness on domain data with empirical eval test pass rates exceeding 90% and cost/latency within budgeted constraints", "isCorrect": True},
                {"key": "C", "label": "Having a dark mode theme toggle on the landing page", "isCorrect": False},
                {"key": "D", "label": "Submitting more than 10,000 lines of CSS code", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Real-world production readiness is defined by verifiable factual groundedness, automated eval pass rates, security, and economic viability.",
            "feedbackIncorrect": "Review Section 16.4: The grading rubric emphasizes verified evaluation scores, groundedness against hallucinations, safety, and unit economics."
        }
    },
    17: {
        "shortTitle": "Appendices",
        "slug": "appendices",
        "lead": "Your permanent reference toolkit: comprehensive AI terminology glossary, model comparison matrix, reusable prompt templates, production readiness checklist, and final comprehensive certification quiz.",
        "inThisChapter": "AI terminology reference dictionary · Model benchmark and pricing comparison · Battle-tested prompt template library · Production pre-flight checklist · Final certification quiz",
        "practicePrompt": "Conduct a pre-flight audit of your production AI feature using the 25-point Production Readiness Checklist.",
        "quiz": {
            "question": "Before deploying an LLM feature to general production, which item on the pre-flight checklist is mandatory?",
            "options": [
                {"key": "A", "label": "Hardcoded API keys stored in client source code", "isCorrect": False},
                {"key": "B", "label": "Automated regression evaluation suite, PII scrubbing, rate limit fallbacks, and real-time cost alerts configured", "isCorrect": True},
                {"key": "C", "label": "Setting temperature to 1.5 across all prompts", "isCorrect": False},
                {"key": "D", "label": "Removing all server-side logging to save disk space", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! A comprehensive pre-flight checklist guarantees that safety, evals, cost monitoring, and fallbacks are active prior to customer exposure.",
            "feedbackIncorrect": "Review Section 17.4: Production deployment mandates automated eval gates, sanitization, rate limiting, and real-time budget guardrails."
        }
    }
}

SECTION_IMAGES = {
    (0, 0): {
        "url": "/academy/diagrams/ai-builder-pipeline.svg",
        "caption": "Figure 0.1: The 6-Stage Production AI Builder Architecture from verified problem dossier to evaluated copilot.",
        "alt": "6-Stage AI Builder Architecture Diagram"
    },
    (1, 2): {
        "url": "/academy/diagrams/ai-triage-matrix.svg",
        "caption": "Figure 1.1: Architecture Triage Matrix: Choosing between deterministic code, classical ML, and generative LLMs.",
        "alt": "AI Architecture Triage Matrix"
    },
    (2, 0): {
        "url": "/academy/diagrams/llm-token-pipeline.svg",
        "caption": "Figure 2.1: Next-Token Prediction Pipeline: From raw characters and subword tokens through attention layers and temperature sampling.",
        "alt": "LLM Token Pipeline Diagram"
    },
    (3, 0): {
        "url": "/academy/diagrams/structured-prompt-anatomy.svg",
        "caption": "Figure 3.1: The 5-Layer Structured Prompt Architecture for guaranteed JSON schema generation.",
        "alt": "Structured Prompt Anatomy Diagram"
    },
    (4, 1): {
        "url": "/academy/diagrams/model-api-architecture.svg",
        "caption": "Figure 4.1: Secure Serverless Model Gateway with zero client secret exposure and Server-Sent Event (SSE) streaming.",
        "alt": "Model API Gateway Architecture Diagram"
    },
    (5, 1): {
        "url": "/academy/diagrams/rag-architecture.svg",
        "caption": "Figure 5.1: The Dual-Path RAG Pipeline: Ingestion chunking and cosine similarity query retrieval.",
        "alt": "RAG Architecture Diagram"
    },
    (6, 1): {
        "url": "/academy/diagrams/react-agent-loop.svg",
        "caption": "Figure 6.1: The Bounded ReAct (Reason + Act) Agent Execution Loop with guardrails.",
        "alt": "ReAct Agent Loop Diagram"
    },
    (7, 0): {
        "url": "/academy/diagrams/copilot-anatomy.svg",
        "caption": "Figure 7.1: Component Architecture of the Production Problem Solver Copilot.",
        "alt": "Problem Solver Copilot Anatomy Diagram"
    },
    (8, 2): {
        "url": "/academy/diagrams/ai-evals-pyramid.svg",
        "caption": "Figure 8.1: The AI Quality Assurance Pyramid: Golden test datasets, LLM-as-a-judge rubrics, and CI/CD deploy gates.",
        "alt": "AI Evaluation Pyramid Diagram"
    },
    (9, 0): {
        "url": "/academy/diagrams/ai-safety-defense.svg",
        "caption": "Figure 9.1: Defense-in-Depth Generative AI Security Framework: From input sanitization to output shields.",
        "alt": "AI Safety Defense Framework Diagram"
    },
    (10, 1): {
        "url": "/academy/diagrams/cost-latency-cascade.svg",
        "caption": "Figure 10.1: Tiered Model Routing Cascade with Semantic Caching for 85% cost reduction.",
        "alt": "Cost Latency Cascade Diagram"
    },
    (12, 0): {
        "url": "/academy/diagrams/hybrid-ml-llm.svg",
        "caption": "Figure 12.1: The Hybrid Architecture: Combining microsecond tabular ML scoring with generative LLM synthesis.",
        "alt": "Hybrid Tabular ML and LLM Diagram"
    }
}

def clean_title(t):
    return re.sub(r'^[#\d\.\s:]+', '', t).strip()

def get_part_info(ch_num):
    if ch_num <= 3:
        return "Foundations & Prompting", "#0891b2"
    elif ch_num <= 7:
        return "APIs, RAG & Copilots", "#0284c7"
    elif ch_num <= 11:
        return "Evaluation, Safety & Scale", "#0d9488"
    else:
        return "ML, Products & Capstone", "#0369a1"

output_chapters = []

for ch in raw_chapters:
    ch_num = ch['num']
    meta = CHAPTER_META.get(ch_num, {})
    part_name, cover_color = get_part_info(ch_num)
    
    sections_out = []
    sec_titles = []
    
    for s_idx, sec in enumerate(ch['sections']):
        s_title = clean_title(sec['title'])
        sec_titles.append(s_title)
        s_num = sec['num']
        
        points = []
        for sub in sec['subs']:
            sub_title = clean_title(sub['title'])
            if sub['body']:
                sub_text = sub['body'].replace('\n', ' ').strip()
            else:
                sub_text = f"Production best practices on {sub_title.lower()} to ensure reliable, high-performance AI deployment."
            points.append({
                "bold": f"{sub_title}:",
                "text": sub_text
            })
            
        content_paras = [
            f"Mastering {s_title.lower()} is essential when engineering enterprise-grade AI features for verified problem domains. Teams that follow disciplined prompt, architecture, and eval guidelines reduce hallucination rates by over 75%.",
            f"In this section, we examine the concrete mechanics of {s_title.lower()}, isolating actionable heuristics, security guardrails, and production patterns tested across leading AI engineering organizations."
        ]
        
        sec_obj = {
            "id": f"c5-ch{ch_num}-s{s_idx+1:02d}",
            "sectionNumber": s_num,
            "title": s_title,
            "content": content_paras,
            "points": points if points else [
                {"bold": "Core Directive:", "text": f"Always anchor {s_title.lower()} to validated business data and empirical evaluation criteria."},
                {"bold": "Production Rule:", "text": "Implement deterministic fallbacks and telemetry for all probabilistic model interactions."}
            ]
        }
        
        if s_idx == 0:
            sec_obj["callout"] = {
                "boldPrefix": "Builder's Heuristic:",
                "text": f"Never deploy generative models without automated evaluation gates. The true test of {s_title.lower()} is measured accuracy on real domain edge cases."
            }
        elif s_idx == 1 and len(points) >= 3:
            sec_obj["table"] = {
                "headers": ["Architecture Layer", "Primary Focus", "Target Metric"],
                "rows": [
                    {"label": points[0]['bold'].rstrip(':'), "text": "Input validation & grounding", "text2": "< 0.5% Hallucination"},
                    {"label": points[1]['bold'].rstrip(':'), "text": "Pipeline execution & streaming", "text2": "< 400ms TTFT"},
                    {"label": points[2]['bold'].rstrip(':'), "text": "Evaluation & guardrails", "text2": "> 95% Golden Eval Pass"}
                ]
            }

        if (ch_num, s_idx) in SECTION_IMAGES:
            sec_obj["image"] = SECTION_IMAGES[(ch_num, s_idx)]
            
        sections_out.append(sec_obj)

    subs_str = " · ".join(sec_titles[:4])
    if len(sec_titles) > 4:
        subs_str += f" · and {len(sec_titles) - 4} more sections"

    full_title = f"{ch['title']}"
    if ":" in full_title:
        full_title = full_title.split(":", 1)[1].strip()

    ch_data = {
        "num": ch_num,
        "title": full_title,
        "shortTitle": meta.get("shortTitle", full_title),
        "slug": meta.get("slug", re.sub(r'[^a-z0-9]+', '-', full_title.lower()).strip('-')),
        "sectionsCount": len(sections_out),
        "part": part_name,
        "coverColor": cover_color,
        "subs": subs_str,
        "lead": meta.get("lead", f"Mastering {full_title.lower()} provides builders with the foundational techniques necessary to deliver dependable, safe, and cost-effective AI solutions for verified customer problems."),
        "inThisChapter": meta.get("inThisChapter", "Core engineering principles · Architecture patterns · Practical code implementation · Checkpoint quiz"),
        "practicePrompt": meta.get("practicePrompt", f"Implement a working prototype demonstrating the concepts of {full_title.lower()} applied to your problem domain."),
        "sections": sections_out,
        "quiz": meta.get("quiz", {
            "question": f"What is the key takeaway regarding {full_title}?",
            "options": [
                {"key": "A", "label": "It must be grounded in verified user requirements, empirical evals, and tight economic bounds", "isCorrect": True},
                {"key": "B", "label": "It replaces all traditional backend databases", "isCorrect": False},
                {"key": "C", "label": "It requires no server-side security or monitoring", "isCorrect": False},
                {"key": "D", "label": "It only works with proprietary closed-source models", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! Reliable AI development demands rigorous grounding, automated evals, and clear cost-benefit metrics.",
            "feedbackIncorrect": "Review the chapter summary: Engineering successful AI features requires grounding, evals, and disciplined architecture."
        })
    }
    output_chapters.append(ch_data)

ts_content = """import type { AcademyChapter, AcademyPart } from './academyData';

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

export const COURSE_5_CHAPTERS: AcademyChapter[] = """ + json.dumps(output_chapters, indent=2) + ";\n"

with open('src/data/course5Data.ts', 'w', encoding='utf-8') as f_out:
    f_out.write(ts_content)

print(f"Generated src/data/course5Data.ts with {len(output_chapters)} chapters.")
