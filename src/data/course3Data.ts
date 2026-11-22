import type { AcademyChapter, AcademyPart } from './academyData';

export const COURSE_3_PARTS: AcademyPart[] = [
  { name: 'All', startChapter: 0, endChapter: 17 },
  {
    name: 'Foundations & Front-End',
    title: 'Web Architecture, TypeScript & Modern React',
    meta: 'Chapters 0 to 5 · 6 chapters',
    items: 'Cloud architecture, semantic HTML, modern TypeScript, React component state, routing and tokenized styling.',
    startChapter: 0,
    endChapter: 5,
  },
  {
    name: 'Back-End & Data',
    title: 'APIs, Firestore NoSQL & Cloud Security',
    meta: 'Chapters 6 to 9 · 4 chapters',
    items: 'FastAPI REST services, Firestore query-first modeling, Firebase Auth RBAC, and zero-trust security rules.',
    startChapter: 6,
    endChapter: 9,
  },
  {
    name: 'AI & Operations',
    title: 'Copilots, CI/CD, Performance & Testing',
    meta: 'Chapters 10 to 13 · 4 chapters',
    items: 'LLM copilot integration, automated Vercel CI/CD, Core Web Vitals, cost control, and Playwright E2E suites.',
    startChapter: 10,
    endChapter: 13,
  },
  {
    name: 'Production & Capstone',
    title: 'SEO/GEO, Observability, Capstone & Production Checklists',
    meta: 'Chapters 14 to 17 · 4 chapters',
    items: 'Generative Engine Optimization, live telemetry, capstone application submission, and 20-point launch checklists.',
    startChapter: 14,
    endChapter: 17,
  },
];

export const COURSE_3_CHAPTERS: AcademyChapter[] = [
  {
    "num": 0,
    "title": "Course Overview: The Full-Stack Cloud Roadmap",
    "shortTitle": "Course Overview",
    "slug": "course-overview",
    "sectionsCount": 4,
    "part": "Foundations & Front-End",
    "coverColor": "#1e40af",
    "subs": "Full-stack cloud roadmap \u00b7 Modern stack selection \u00b7 Development prerequisites \u00b7 Capstone blueprint",
    "lead": "Once an authentic problem is verified in Course 1 and sized in Course 2, you must engineer software that solves it reliably. This subject teaches the complete journey from browser to cloud database to continuous deployment.",
    "inThisChapter": "What this subject covers \u00b7 Modern stack selection \u00b7 Development prerequisites \u00b7 How to construct your capstone web app",
    "practicePrompt": "Initialize a clean Vite + React + TypeScript workspace to prepare your capstone engineering environment.",
    "sections": [
      {
        "id": "c3-s01",
        "sectionNumber": "0.1",
        "title": "What this subject covers",
        "content": [
          "Building production-grade web software requires mastering the entire path of data: rendering responsive interfaces in the browser, enforcing type safety across component boundaries, authenticating users securely, persisting data to resilient cloud databases, and invoking artificial intelligence models through structured APIs.",
          "In this 18-chapter curriculum, you will build and deploy a production web application using the exact modern stack powering the Stuckhere platform. You will not build toy counter widgets or throwaway tutorials; you will build a scalable problem discovery and resolution platform from scratch."
        ],
        "points": [
          {
            "bold": "Front-End Mastery:",
            "text": "React 18+, TypeScript strict mode, Vite tooling, and Tailwind CSS design tokens."
          },
          {
            "bold": "Cloud Data & Identity:",
            "text": "Firebase Authentication with multi-role RBAC, Cloud Firestore query-first NoSQL modeling, and zero-trust security rules."
          },
          {
            "bold": "AI Copilot Integration:",
            "text": "Streaming LLM responses, JSON-mode prompt engineering, and context-window optimization using Claude and Gemini APIs."
          },
          {
            "bold": "Production Engineering:",
            "text": "Automated Playwright end-to-end testing, Core Web Vitals optimization, and continuous deployment via Vercel."
          }
        ],
        "callout": {
          "boldPrefix": "The Engineer's Axiom:",
          "text": "Code is a liability; features are an ongoing maintenance cost. Great software engineers build the simplest, most secure architecture that solves the customer's verified problem."
        }
      },
      {
        "id": "c3-s02",
        "sectionNumber": "0.2",
        "title": "The stack at a glance",
        "content": [
          "Modern web engineering has converged on a high-velocity, low-maintenance architecture that separates fast edge hosting from elastic managed backend services.",
          "Rather than maintaining fragile virtual private servers or complex Kubernetes clusters, you will leverage managed serverless infrastructure that scales from zero users to millions automatically without fixed operational overhead."
        ],
        "table": {
          "headers": [
            "Layer",
            "Technology",
            "Production Role"
          ],
          "rows": [
            {
              "label": "Front-End",
              "text": "React 18 + TypeScript + Vite",
              "text2": "Component-driven reactive client UI with compile-time type safety"
            },
            {
              "label": "Styling",
              "text": "Tailwind CSS + CSS Variables",
              "text2": "Tokenized design system with responsive breakpoints and dual themes"
            },
            {
              "label": "Auth & Roles",
              "text": "Firebase Auth + Custom Claims",
              "text2": "Secure JWT tokens, Google OAuth, and multi-tenant RBAC"
            },
            {
              "label": "Cloud Database",
              "text": "Cloud Firestore (NoSQL)",
              "text2": "Real-time, document-oriented serverless database with index isolation"
            },
            {
              "label": "Back-End APIs",
              "text": "FastAPI (Python) / Cloud Functions",
              "text2": "Secure microservices for secret handling and heavy data jobs"
            },
            {
              "label": "AI Intelligence",
              "text": "Claude / Gemini API",
              "text2": "Structured LLM extraction, problem analysis, and copilot generation"
            },
            {
              "label": "Hosting & CI/CD",
              "text": "Vercel / GitHub Actions",
              "text2": "Global edge CDN, preview URLs on PRs, and instant rollbacks"
            },
            {
              "label": "Quality Assurance",
              "text": "Playwright + Vitest",
              "text2": "Automated headless browser validation across desktop & mobile viewports"
            }
          ]
        }
      },
      {
        "id": "c3-s03",
        "sectionNumber": "0.3",
        "title": "Prerequisites and development environment",
        "content": [
          "To succeed in this curriculum, you should be comfortable with fundamental programming concepts: variables, conditional branches, loops, functions, and basic object manipulation.",
          "Prior completion of Course 1 (Problem Discovery & Validation) and Course 2 (Market Sizing & Opportunity Analysis) is strongly advised, as your capstone project will directly turn a validated market problem into deployed software."
        ],
        "points": [
          {
            "bold": "Node.js Environment:",
            "text": "Node.js LTS (v18+ or v20+) and npm or pnpm installed on your machine."
          },
          {
            "bold": "Code Editor:",
            "text": "VS Code or Antigravity IDE with TypeScript and Tailwind CSS IntelliSense extensions."
          },
          {
            "bold": "Cloud Accounts:",
            "text": "A free Firebase account (Google Cloud Console) and a free Vercel account."
          },
          {
            "bold": "Version Control:",
            "text": "A GitHub account and local git CLI configured with SSH or personal access tokens."
          }
        ]
      },
      {
        "id": "c3-s04",
        "sectionNumber": "0.4",
        "title": "How to use this material",
        "content": [
          "Every chapter in this course follows a four-part educational cadence designed for high retention: Theoretical Foundations, Production Code Examples, Practical Exercise, and Checkpoint Quiz.",
          "As you advance through the 18 chapters, you will build one continuous application: a high-performance Problem & Solution Hub where verified problems can be viewed, voted upon, filtered by industry, analyzed by an AI copilot, and moderated through secure role-based portals."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Why do modern founders prefer managed serverless databases over self-hosted SQL instances for initial products?",
            "answer": "Managed serverless services like Firestore provide automatic scaling, built-in edge caching, high availability, zero server maintenance patching, and generous free tiers that prevent fixed hosting bills before market traction is proven."
          },
          {
            "question": "What is the primary role of TypeScript in a full-stack codebase?",
            "answer": "TypeScript catches syntax, type mismatches, null pointer exceptions, and interface drift at compile time before code ever runs in a user browser or production server."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which architectural tier in the Stuckhere modern stack is responsible for protecting proprietary secrets and communicating with AI foundation models?",
      "options": [
        {
          "key": "A",
          "label": "Client-side React components running in the user browser",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Secure back-end services (FastAPI / Serverless Functions) with server-side environment variables",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Public Firestore database security rules without backend APIs",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Vite bundling configuration files",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Client-side browser code can always be inspected by end users. Proprietary API keys and sensitive processing must always live in secure server-side environments.",
      "feedbackIncorrect": "Review Section 0.2: Client bundles are visible in browser DevTools. Sensitive credentials must be handled by secure server endpoints."
    }
  },
  {
    "num": 1,
    "title": "The Big Picture of a Cloud Web App",
    "shortTitle": "Cloud Web Architecture",
    "slug": "cloud-web-app-architecture",
    "sectionsCount": 5,
    "part": "Foundations & Front-End",
    "coverColor": "#0284c7",
    "subs": "Client-server model \u00b7 HTTP lifecycle \u00b7 Full-stack topology \u00b7 Direct-to-cloud vs. APIs \u00b7 Cost awareness",
    "lead": "Before writing code, understand where code executes. Modern cloud web apps split responsibilities across global CDNs, client browser runtimes, managed document databases, and serverless compute functions.",
    "inThisChapter": "How browsers request and receive resources \u00b7 What full-stack means in 2026 \u00b7 Architecture of a modern problem platform \u00b7 The boring tech rule",
    "practicePrompt": "Draft a data flow diagram identifying where each piece of your problem data lives and who can read or write it.",
    "sections": [
      {
        "id": "c3-s11",
        "sectionNumber": "1.1",
        "title": "How the web works: browser, server, request and response",
        "content": [
          "At its core, the World Wide Web operates on a request-response protocol over TCP/IP. When a user navigates to your application (e.g., stuckhere.davns.com), the browser queries DNS to resolve the hostname into an IP address, establishes a TLS encrypted connection (HTTPS), and dispatches an HTTP GET request.",
          "The hosting server or Edge CDN returns an HTML document, which instructs the browser to parse and load compiled JavaScript bundles, CSS stylesheets, images, and web fonts. Once the JavaScript executes, your single-page application (SPA) mounts and takes control of rendering."
        ],
        "points": [
          {
            "bold": "HTTP Verbs:",
            "text": "GET retrieves data; POST creates records; PUT/PATCH updates existing documents; DELETE removes them."
          },
          {
            "bold": "Status Codes:",
            "text": "2xx represents success (200 OK, 201 Created); 3xx represents redirection (301, 304 Not Modified); 4xx indicates client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found); 5xx indicates server failure (500 Internal Server Error, 503 Unavailable)."
          },
          {
            "bold": "Security with HTTPS:",
            "text": "TLS encrypts payloads between browser and server, preventing eavesdropping and man-in-the-middle attacks."
          }
        ]
      },
      {
        "id": "c3-s12",
        "sectionNumber": "1.2",
        "title": "What 'full-stack' means in modern web engineering",
        "content": [
          "Historically, 'full-stack' meant writing front-end HTML/CSS/jQuery and back-end PHP or Ruby on Rails code connected to a local MySQL database running on a dedicated Linux VPS.",
          "Today, full-stack describes an integrated distributed system where the client browser executes rich business logic, while the cloud tier provides managed authentication, real-time reactive data stores, serverless API endpoints, and AI inference engines."
        ],
        "points": [
          {
            "bold": "Client-Side Rendering (CSR):",
            "text": "Fast, app-like transitions after initial bundle load. Perfect for dashboards, portals, and interactive workspaces."
          },
          {
            "bold": "Server-Side Rendering (SSR) & Static Generation:",
            "text": "Pages rendered on the server or at build time for fast initial content delivery and optimal search indexing."
          },
          {
            "bold": "Serverless Infrastructure:",
            "text": "Zero server provisioning, auto-scaling up and down to zero, and pay-per-execution economics."
          }
        ]
      },
      {
        "id": "c3-s13",
        "sectionNumber": "1.3",
        "title": "Architecture of a modern problem platform",
        "content": [
          "The architecture of the Stuckhere platform demonstrates an elegant, highly performant hybrid pattern: client browsers communicate directly with Cloud Firestore for read queries and writes governed by robust security rules.",
          "However, whenever an action requires confidential API credentials (such as invoking Gemini or Claude LLMs), verifying payment webhooks, or running heavy data aggregations, the browser calls an authenticated microservice endpoint."
        ],
        "callout": {
          "boldPrefix": "Direct-to-Database Pattern:",
          "text": "By allowing authenticated clients to query Firestore directly through granular Security Rules, you eliminate hundreds of boilerplate CRUD endpoints and achieve sub-50ms latency."
        }
      },
      {
        "id": "c3-s14",
        "sectionNumber": "1.4",
        "title": "Choosing tools as a beginner: boring tech beats clever tech",
        "content": [
          "As a software builder, your scarcest resource is cognitive bandwidth. Novel, unproven libraries have undocumented bugs, scarce StackOverflow threads, and breaking changes that stall momentum.",
          "Choose well-documented, mainstream technology with active ecosystems. React, TypeScript, Tailwind, and Firebase are battle-tested by millions of developers worldwide. They offer predictable performance, extensive libraries, and seamless AI coding assistant support."
        ],
        "points": [
          {
            "bold": "Free Tier Budgeting:",
            "text": "Vercel offers 100GB edge bandwidth monthly for free; Firebase offers 50,000 document reads, 20,000 writes, and 1GB storage daily at zero cost."
          },
          {
            "bold": "Community Resilience:",
            "text": "Mainstream tooling ensures any error message you encounter has already been solved and documented."
          }
        ]
      },
      {
        "id": "c3-s15",
        "sectionNumber": "1.5",
        "title": "Chapter practice: architectural blueprint",
        "content": [
          "Before writing a line of code for your application, articulate the architectural boundary between public data, private user state, and protected AI server calls.",
          "Document the data entities (e.g. Problems, Users, Votes, Comments), identify which operations execute directly against Firestore, and specify which operations require an authenticated backend service."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the key difference between a 401 Unauthorized status and a 403 Forbidden status?",
            "answer": "A 401 status means authentication credentials are missing or invalid (the server does not know who you are). A 403 status means the server knows who you are, but you lack permission to access the requested resource."
          },
          {
            "question": "Why is it dangerous to store third-party AI API keys in a client-side .env file?",
            "answer": "Any environment variable bundled into front-end code (such as VITE_* variables) is transmitted as plain text to every user's browser, allowing anyone to inspect the source and steal your API quota."
          }
        ]
      }
    ],
    "quiz": {
      "question": "In a modern serverless web app, where should an LLM API call that requires an API key be executed?",
      "options": [
        {
          "key": "A",
          "label": "Directly inside a React useEffect hook in the user's browser",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Inside a secure server-side endpoint or cloud function where the key remains private",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Within a public Firestore security rule condition",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "In a client-side localStorage cache",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Client browsers cannot keep secrets. API keys must reside in secure server environments.",
      "feedbackIncorrect": "Review Section 1.3: Client-side secrets are exposed to anyone opening browser DevTools."
    }
  },
  {
    "num": 2,
    "title": "Front-End Foundations: HTML, CSS & Modern TypeScript",
    "shortTitle": "Front-End Foundations",
    "slug": "front-end-foundations",
    "sectionsCount": 5,
    "part": "Foundations & Front-End",
    "coverColor": "#0d9488",
    "subs": "Semantic HTML \u00b7 CSS box model & flexbox \u00b7 Modern JavaScript ES6+ \u00b7 TypeScript strict mode",
    "lead": "Before mastering React component lifecycles, you need rock-solid foundations in semantic markup, responsive CSS layout paradigms, and TypeScript type safety.",
    "inThisChapter": "Semantic elements and accessibility \u00b7 Box model and flexbox \u00b7 Async JavaScript and Promises \u00b7 TypeScript interfaces for cloud data",
    "practicePrompt": "Create a fully typed TypeScript interface representing a Stuckhere problem record and render it with semantic HTML.",
    "sections": [
      {
        "id": "c3-s21",
        "sectionNumber": "2.1",
        "title": "Semantic HTML and accessibility",
        "content": [
          "HTML is the skeleton of the web. Using generic `<div>` tags for everything damages search engine indexing, screen-reader navigation, and keyboard accessibility.",
          "Semantic elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` describe the meaning of content to browsers, assistive technologies, and web crawlers."
        ],
        "points": [
          {
            "bold": "Landmark Tags:",
            "text": "Use `<header>` for top branding/navigation, `<main>` for primary unique page content, and `<footer>` for legal and secondary links."
          },
          {
            "bold": "Accessible Forms:",
            "text": "Always connect `<label for='id'>` to `<input id='id'>` so clicking the label activates the input and screen readers announce the input purpose."
          },
          {
            "bold": "Keyboard Focus:",
            "text": "Ensure interactive elements like buttons and links have visible `:focus-visible` outline styles for keyboard navigation."
          }
        ]
      },
      {
        "id": "c3-s22",
        "sectionNumber": "2.2",
        "title": "CSS layout: box model, flexbox and CSS grid",
        "content": [
          "Every HTML element in the browser is rendered as a rectangular box governed by the CSS Box Model: content area, padding, border, and margin.",
          "Always configure `box-sizing: border-box` across your entire stylesheet so that padding and border widths do not unexpectedly increase the rendered dimensions of elements."
        ],
        "table": {
          "headers": [
            "CSS Model",
            "Primary Purpose",
            "Best Use Case"
          ],
          "rows": [
            {
              "label": "Flexbox (1D)",
              "text": "Laying out elements along a single axis (row or column)",
              "text2": "Navbars, button groups, avatar-and-text pairs, vertical lists"
            },
            {
              "label": "Grid (2D)",
              "text": "Laying out items across both rows and columns simultaneously",
              "text2": "Problem card grids, responsive dashboard layouts, complex tables"
            },
            {
              "label": "Position: Sticky",
              "text": "Scrolling with content until hitting a specified boundary",
              "text2": "Sticky headers, sticky table of contents sidebars"
            }
          ]
        }
      },
      {
        "id": "c3-s23",
        "sectionNumber": "2.3",
        "title": "JavaScript essentials: ES modules, async/await and immutability",
        "content": [
          "Modern web applications rely heavily on modern ECMAScript features: destructuring, arrow functions, template literals, array transformations (`map`, `filter`, `reduce`), and asynchronous promises.",
          "Because React re-renders depend on reference equality, you must practice immutable state operations: never mutate arrays with `.push()` or objects with direct assignment; use the spread operator (`[...items, newItem]`, `{ ...user, role: 'admin' }`)."
        ],
        "templateBox": "// Fetching data cleanly with async/await\nasync function fetchProblem(id: string): Promise<Problem> {\n  try {\n    const response = await fetch(`/api/problems/${id}`);\n    if (!response.ok) {\n      throw new Error(`Failed to load problem: ${response.status}`);\n    }\n    return await response.json();\n  } catch (error) {\n    console.error('Data fetch error:', error);\n    throw error;\n  }\n}"
      },
      {
        "id": "c3-s24",
        "sectionNumber": "2.4",
        "title": "TypeScript: preventing runtime bugs with compile-time types",
        "content": [
          "JavaScript is dynamically typed, meaning variable types are only evaluated at runtime. A typo in a property name like `problem.tilte` fails silently or causes a runtime crash in front of users.",
          "TypeScript adds compile-time types. In strict mode, TypeScript validates that data structures adhere to explicitly defined contracts, autocompletes fields in your IDE, and refactors code across hundreds of files safely."
        ],
        "templateBox": "export interface ProblemSubmission {\n  id: string;\n  title: string;\n  summary: string;\n  industry: 'Healthcare' | 'Fintech' | 'Logistics' | 'SaaS';\n  painScore: number;\n  upvotesCount: number;\n  verified: boolean;\n  author: {\n    uid: string;\n    displayName: string;\n    handle: string;\n  };\n  createdAt: string;\n}"
      },
      {
        "id": "c3-s25",
        "sectionNumber": "2.5",
        "title": "Chapter practice: typed problem card component",
        "content": [
          "Combine semantic HTML, responsive flexbox layout, and TypeScript to create a self-contained Problem Card UI. The card must display an industry tag, problem title, pain score indicator, and upvote button.",
          "Ensure the component enforces proper TypeScript props and passes accessibility checks for contrast and keyboard focus."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Why should you use an interface over type alias for extensible domain models?",
            "answer": "Interfaces support declaration merging and provide clearer error messages in IDE tooltips, making them ideal for shared domain data models."
          },
          {
            "question": "What is the danger of using 'any' in TypeScript code?",
            "answer": "The 'any' type disables all TypeScript compiler type checks for that variable, removing type safety and re-introducing the risk of runtime null pointer exceptions."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which CSS property ensures padding and border dimensions are included within the element's specified width rather than added on top?",
      "options": [
        {
          "key": "A",
          "label": "display: flex",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "box-sizing: border-box",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "overflow: hidden",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "margin: auto",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Setting box-sizing: border-box ensures the width represents the full border-to-border size.",
      "feedbackIncorrect": "Review Section 2.2: box-sizing: border-box is the universal standard for predictable layouts."
    }
  },
  {
    "num": 3,
    "title": "React Fundamentals: Components, State & Effects",
    "shortTitle": "React Fundamentals",
    "slug": "react-fundamentals",
    "sectionsCount": 6,
    "part": "Foundations & Front-End",
    "coverColor": "#15803d",
    "subs": "Thinking in components \u00b7 useState & immutability \u00b7 useEffect & cleanup \u00b7 Context API \u00b7 Problem explorer UI",
    "lead": "React transforms declarative state into dynamic user interfaces. By mastering components, state lifting, effect lifecycles, and context providers, you can build snappy, data-driven web applications.",
    "inThisChapter": "Component composition and props \u00b7 useState and form handling \u00b7 useEffect lifecycles and race conditions \u00b7 Custom hooks and context",
    "practicePrompt": "Build an interactive problem explorer featuring live search, industry filter pills, and optimistic voting.",
    "sections": [
      {
        "id": "c3-s31",
        "sectionNumber": "3.1",
        "title": "Thinking in components and passing props",
        "content": [
          "React interfaces are built from composable, reusable building blocks called components. Each component receives read-only input data via `props` and returns JSX describing what should appear on screen.",
          "Follow the single-responsibility principle: small, focused components (e.g. `PainScoreBadge`, `UpvoteButton`, `SearchInput`) are easier to test, style, and reuse across pages."
        ],
        "points": [
          {
            "bold": "Unidirectional Data Flow:",
            "text": "Data flows down from parent components to children via props; events flow up via callback functions."
          },
          {
            "bold": "Composition with Children:",
            "text": "Use the `children` prop to create generic shell containers like modal dialogs, cards, and page layouts."
          }
        ]
      },
      {
        "id": "c3-s32",
        "sectionNumber": "3.2",
        "title": "State management with useState and controlled forms",
        "content": [
          "State represents values that change over time in response to user actions or network events. When state updates via its setter function, React re-renders the component and updates the DOM.",
          "In controlled inputs, the form element's value is driven by React state (`value={query}`), and modifications are handled via `onChange={(e) => setQuery(e.target.value)}`."
        ],
        "templateBox": "function SearchFilter() {\n  const [query, setQuery] = useState('');\n  const [industry, setIndustry] = useState<string>('All');\n\n  return (\n    <div className=\"flex gap-4 p-4\">\n      <input\n        value={query}\n        onChange={(e) => setQuery(e.target.value)}\n        placeholder=\"Search verified problems...\"\n        className=\"border px-3 py-2 rounded-lg\"\n      />\n    </div>\n  );\n}"
      },
      {
        "id": "c3-s33",
        "sectionNumber": "3.3",
        "title": "Effects and data loading with useEffect",
        "content": [
          "The `useEffect` hook synchronizes your component with external systems: fetching data over HTTP, subscribing to real-time events, or manipulating browser document titles.",
          "Always specify dependency arrays accurately to prevent infinite re-render loops. When an effect subscribes to a stream, timer, or socket, return a cleanup function to prevent memory leaks."
        ],
        "callout": {
          "boldPrefix": "Race Condition Warning:",
          "text": "When fetching data in useEffect based on user input, rapid changes can result in slow requests resolving AFTER newer requests. Use an active flag or AbortController to discard stale network responses."
        }
      },
      {
        "id": "c3-s34",
        "sectionNumber": "3.4",
        "title": "Sharing global state: React Context and custom hooks",
        "content": [
          "When data must be accessed by many deeply nested components (such as the currently logged-in user or active theme), passing props down through intermediary components ('prop drilling') becomes cumbersome.",
          "React Context provides a way to broadcast data down the component tree without manual prop drilling. Package your context logic inside custom hooks like `useAuth()` or `useTheme()` for clean consumer ergonomics."
        ]
      },
      {
        "id": "c3-s35",
        "sectionNumber": "3.5",
        "title": "Building the problem explorer with optimistic updates",
        "content": [
          "In a responsive problem explorer, users expect instant feedback when clicking upvote buttons. Waiting 400ms for a cloud database confirmation makes an application feel sluggish.",
          "With optimistic UI updates, your component immediately increments the vote counter in local state. If the cloud database write fails, you roll back the change and display a non-intrusive error notification."
        ]
      },
      {
        "id": "c3-s36",
        "sectionNumber": "3.6",
        "title": "Chapter practice: stateful problem explorer",
        "content": [
          "Build a functional problem explorer component that renders a list of mock problems, supports live text search and industry filtering, and updates vote totals optimistically on button click.",
          "Ensure error states and empty search results ('No problems found') are handled gracefully with clear visual cues."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What happens if you mutate React state directly instead of using the setter function?",
            "answer": "React detects state changes by shallow reference comparison. Direct mutation alters the internal object without changing its reference, so React fails to trigger a re-render and your UI remains stale."
          },
          {
            "question": "When does the cleanup function returned by useEffect run?",
            "answer": "It runs immediately before the component unmounts from the DOM, and also before the effect re-runs on subsequent state/prop changes."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Why is an empty dependency array `[]` passed to useEffect when loading initial data?",
      "options": [
        {
          "key": "A",
          "label": "To instruct the effect to run on every single component render",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To run the effect only once when the component initially mounts",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To disable asynchronous code execution",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "To prevent child components from accessing props",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! An empty dependency array indicates the effect has no reactive dependencies and runs once on mount.",
      "feedbackIncorrect": "Review Section 3.3: Passing [] tells React the effect depends on nothing and should only execute when mounting."
    }
  },
  {
    "num": 4,
    "title": "Tooling, Routing & Code Splitting",
    "shortTitle": "Tooling & Routing",
    "slug": "tooling-routing-and-code-splitting",
    "sectionsCount": 5,
    "part": "Foundations & Front-End",
    "coverColor": "#7c3aed",
    "subs": "Vite dev server & bundling \u00b7 React Router v6 \u00b7 Code splitting with React.lazy \u00b7 Stale chunk recovery",
    "lead": "Modern frontend development requires fast bundlers and intelligent routing. Vite delivers sub-second Hot Module Replacement (HMR), while React Router and lazy-loaded chunks ensure users only download the code they need.",
    "inThisChapter": "Vite bundling and environment variables \u00b7 Nested layouts and protected routes \u00b7 Lazy loading with Suspense \u00b7 Handling stale chunk deployment errors",
    "practicePrompt": "Configure a multi-route application with lazy-loaded pages and an automatic stale-chunk retry error boundary.",
    "sections": [
      {
        "id": "c3-s41",
        "sectionNumber": "4.1",
        "title": "Vite: lightning-fast development and optimized production builds",
        "content": [
          "Traditional bundlers like Webpack bundled your entire application into memory before serving the first page. As projects grew to hundreds of files, dev startup took minutes.",
          "Vite uses native browser ES modules (ESM) during development to serve source files unbundled on demand with instant Hot Module Replacement. In production, Vite leverages Rollup to produce heavily optimized, tree-shaken static assets."
        ],
        "points": [
          {
            "bold": "Environment Variables:",
            "text": "Variables prefixed with `VITE_` (e.g. `VITE_FIREBASE_API_KEY`) are exposed to client code via `import.meta.env`."
          },
          {
            "bold": "Tree Shaking:",
            "text": "Vite automatically removes unused code exports from third-party packages, minimizing production download size."
          }
        ]
      },
      {
        "id": "c3-s42",
        "sectionNumber": "4.2",
        "title": "Routing with React Router: layouts, dynamic segments and guards",
        "content": [
          "Single-page applications do not request fresh HTML files when users click navigation links. Instead, client-side routers update the browser URL bar via the HTML5 History API (`pushState`) and render the corresponding component.",
          "React Router enables nested layout routes (where headers and sidebars persist while child outlets change), dynamic URL parameters (e.g. `/problems/:id`), and protected route guards that redirect unauthenticated users to `/login`."
        ]
      },
      {
        "id": "c3-s43",
        "sectionNumber": "4.3",
        "title": "Code splitting with React.lazy and Suspense",
        "content": [
          "Loading an entire application\u2014including administrative desks, analytics charts, and settings forms\u2014in a single bundle bloats your initial JavaScript payload to megabytes, hurting mobile load times.",
          "With dynamic imports and `React.lazy()`, you split routes into distinct chunks loaded only when the user navigates to them, displaying a lightweight fallback spinner with `<Suspense fallback={<LoadingSpinner />}>`."
        ]
      },
      {
        "id": "c3-s44",
        "sectionNumber": "4.4",
        "title": "The stale chunk problem and resilient retry wrappers",
        "content": [
          "When you deploy a new version to Vercel, previous JavaScript chunk hashes are deleted from the host. If an active user with an open browser tab clicks a lazy link, the browser attempts to fetch the old chunk and throws an unhandled `ChunkLoadError`.",
          "To prevent user-facing broken screens, wrap lazy imports with a resilient retry wrapper that detects failed network loads and triggers an automatic window reload to fetch the new deployment manifest."
        ],
        "templateBox": "export function lazyRetry(componentImport: () => Promise<any>) {\n  return React.lazy(async () => {\n    const pageHasBeenForceRefreshed = window.sessionStorage.getItem('page-refreshed');\n    try {\n      return await componentImport();\n    } catch (error) {\n      if (!pageHasBeenForceRefreshed) {\n        window.sessionStorage.setItem('page-refreshed', 'true');\n        window.location.reload();\n      }\n      throw error;\n    }\n  });\n}"
      },
      {
        "id": "c3-s45",
        "sectionNumber": "4.5",
        "title": "Chapter practice: routing architecture",
        "content": [
          "Configure a complete routing layout with React Router: a public layout with header/footer, an authenticated dashboard layout with a sticky sidebar, dynamic routes for problem details, and lazy code-split boundaries.",
          "Verify that navigating between routes does not trigger full page reloads and that the browser back/forward buttons function seamlessly."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the primary benefit of code splitting by route?",
            "answer": "It significantly reduces the initial bundle size downloaded on first visit, yielding faster Time to Interactive (TTI) and superior Core Web Vitals on mobile devices."
          },
          {
            "question": "Why does a 404 error occur when refreshing a route like /dashboard on a standard static host without rewrite rules?",
            "answer": "Static web servers look for a physical file at /dashboard/index.html. For client-side routing, you must configure a rewrite rule that routes all requests back to /index.html."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the cause of a ChunkLoadError in production after a new release is pushed to Vercel?",
      "options": [
        {
          "key": "A",
          "label": "The user's computer ran out of memory",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The browser requested an old hashed chunk filename that was replaced in the new deployment",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "React Router encountered a route that does not exist in the route table",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The user lost internet connectivity entirely",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Deploying new code generates new chunk hashes; users on stale tabs request obsolete hashes until a refresh.",
      "feedbackIncorrect": "Review Section 4.4: Stale chunk errors occur when new deployments replace older chunk filenames on the CDN."
    }
  },
  {
    "num": 5,
    "title": "Styling, Design Tokens & Themes",
    "shortTitle": "Styling & Themes",
    "slug": "styling-design-tokens-and-themes",
    "sectionsCount": 5,
    "part": "Foundations & Front-End",
    "coverColor": "#c026d3",
    "subs": "Utility-first CSS \u00b7 Design tokens & CSS variables \u00b7 Dark mode architecture \u00b7 Micro-animations",
    "lead": "Design is not just decoration; it is clear communication. By establishing a tokenized design system with Tailwind CSS and CSS variables, you ensure visual consistency, accessibility, and effortless dark-mode support.",
    "inThisChapter": "Utility-first design with Tailwind \u00b7 Design tokens for colors, typography, and spacing \u00b7 Dynamic dark mode with CSS variables \u00b7 Accessible transitions and motion",
    "practicePrompt": "Implement a tokenized design system supporting instant light/dark mode switching and reduced motion preferences.",
    "sections": [
      {
        "id": "c3-s51",
        "sectionNumber": "5.1",
        "title": "Utility-first CSS with Tailwind: scaling stylesheets without conflict",
        "content": [
          "In traditional CSS or BEM naming conventions, stylesheets grow continuously over time as engineers invent new class names (`.problem-card-header__title--highlight`). Teams fear deleting old styles, resulting in CSS bloat.",
          "Tailwind CSS uses utility classes directly in JSX (`flex items-center gap-3 p-4 rounded-xl bg-white`). Because utilities are fixed, your production stylesheet stops growing regardless of how many new pages you add."
        ],
        "points": [
          {
            "bold": "Responsive Variants:",
            "text": "Prefix utilities with breakpoints (`sm:`, `md:`, `lg:`) to adjust layouts responsively without writing separate media queries."
          },
          {
            "bold": "State Modifiers:",
            "text": "Style hover, focus, and active states inline using `hover:bg-blue-600 focus-visible:ring-2`."
          }
        ]
      },
      {
        "id": "c3-s52",
        "sectionNumber": "5.2",
        "title": "Design tokens: color, typography and spacing systems",
        "content": [
          "Professional applications do not pick random hex colors or arbitrary pixel margins on a whim. They define design tokens\u2014a restricted palette of harmonious values representing intent.",
          "In the Stuckhere design system, primary actions use `--primary: #003bcb`, neutral text uses `--ink: #1a1c20`, muted hints use `--muted: #5b606b`, and surfaces use `--bg: #f9f9ff`."
        ],
        "table": {
          "headers": [
            "Token Category",
            "Design Scale",
            "Semantic Usage"
          ],
          "rows": [
            {
              "label": "Color Scale",
              "text": "50, 100, 200 ... 900",
              "text2": "50 for subtle tints, 500/600 for primary actions, 900 for dark text"
            },
            {
              "label": "Spacing Scale",
              "text": "4px grid (4, 8, 12, 16, 24, 32px)",
              "text2": "Consistent margins, padding, and flexbox gap values"
            },
            {
              "label": "Typography",
              "text": "Inter / Poppins / JetBrains Mono",
              "text2": "Display headings, readable body copy, and monospaced data figures"
            },
            {
              "label": "Elevation",
              "text": "0, 1, 2, 3 shadows",
              "text2": "Cards, dropdown menus, floating toolbars, and modal overlays"
            }
          ]
        }
      },
      {
        "id": "c3-s53",
        "sectionNumber": "5.3",
        "title": "Dark mode architecture with CSS custom properties",
        "content": [
          "Hardcoding dark mode classes like `dark:bg-slate-900 dark:text-white` on every single DOM element creates brittle, noisy markup that is difficult to maintain.",
          "A cleaner architecture defines semantic CSS variables on `:root` and `.dark`. When the dark theme is active, background and text tokens swap values automatically across all components."
        ],
        "templateBox": ":root {\n  --color-bg: #f9f9ff;\n  --color-card: #ffffff;\n  --color-ink: #1a1c20;\n  --color-line: #dae1ed;\n}\n\n.dark {\n  --color-bg: #0f141a;\n  --color-card: #1a202c;\n  --color-ink: #f7fafc;\n  --color-line: #2d3748;\n}"
      },
      {
        "id": "c3-s54",
        "sectionNumber": "5.4",
        "title": "Micro-interactions and animation accessibility",
        "content": [
          "Subtle animations make an interface feel responsive and alive: buttons scale slightly on press, badges fade smoothly when filtered, and accordions expand gracefully.",
          "Always animate composite-friendly CSS properties (`transform` and `opacity`) rather than layout-triggering properties (`width`, `height`, `margin`) to prevent jank, and always respect `@media (prefers-reduced-motion)` for vestibular accessibility."
        ]
      },
      {
        "id": "c3-s55",
        "sectionNumber": "5.5",
        "title": "Chapter practice: responsive themed component library",
        "content": [
          "Build a reusable component kit consisting of a Button (primary, soft, outline), a Badge (status pills with glowing dot indicators), and an interactive Card with elevation transitions on hover.",
          "Test your components across light and dark modes, and verify that all text meets WCAG AA contrast standards (minimum 4.5:1 for normal text)."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Why does animating transform and opacity yield 60fps performance while animating width or margin often stutters?",
            "answer": "Transform and opacity can be handled entirely by the GPU compositor thread without forcing the browser CPU to recalculate document layout and repaint pixels."
          },
          {
            "question": "What is the WCAG AA minimum contrast ratio required for standard body text?",
            "answer": "A minimum contrast ratio of 4.5:1 against the background (or 3:1 for large text 18pt+ or bold 14pt+)."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which CSS properties are safe to animate without triggering expensive browser layout recalculations and repaints?",
      "options": [
        {
          "key": "A",
          "label": "width and height",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "transform and opacity",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "margin and padding",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "top and left",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! transform and opacity are composited directly on the GPU, avoiding CPU reflows and repaints.",
      "feedbackIncorrect": "Review Section 5.4: Only transform and opacity skip layout reflow and repaint phases."
    }
  },
  {
    "num": 6,
    "title": "Back-End Concepts & APIs",
    "shortTitle": "Back-End & APIs",
    "slug": "back-end-concepts-and-apis",
    "sectionsCount": 5,
    "part": "Back-End & Data",
    "coverColor": "#0891b2",
    "subs": "Managed cloud vs. custom back end \u00b7 REST principles \u00b7 FastAPI microservices \u00b7 External APIs & secrets",
    "lead": "While modern clients can read directly from Cloud Firestore, proprietary business logic, AI orchestration, and third-party API secrets demand a secure back-end service.",
    "inThisChapter": "When a dedicated API server is required \u00b7 RESTful interface design \u00b7 Fast asynchronous Python with FastAPI \u00b7 Secure third-party integrations",
    "practicePrompt": "Build and run a FastAPI microservice endpoint that validates and computes a Pain Score with Pydantic.",
    "sections": [
      {
        "id": "c3-s61",
        "sectionNumber": "6.1",
        "title": "Do you need a back end? Managed services vs. custom servers",
        "content": [
          "A common trap for new founders is building a sprawling back-end server before validating if managed cloud services already do the job better.",
          "If you only need authenticated users to read and write records with role validation, Cloud Firestore and Firebase Auth handle this natively with zero server code. However, a dedicated back-end is strictly required when you must hold private credentials, run heavy compute, or orchestrate complex multi-step workflows."
        ],
        "points": [
          {
            "bold": "Direct-to-Cloud Scenarios:",
            "text": "Public problem viewing, user profile updates, upvotes, and comment submissions governed by Firestore rules."
          },
          {
            "bold": "Custom API Scenarios:",
            "text": "Invoking LLM models (Claude/Gemini), processing Stripe webhooks, generating PDF reports, and sanitizing user attachments."
          }
        ]
      },
      {
        "id": "c3-s62",
        "sectionNumber": "6.2",
        "title": "REST API design: resources, HTTP verbs and predictable errors",
        "content": [
          "Representational State Transfer (REST) organizes functionality around nouns (resources) rather than verbs (actions). For example, use `GET /problems` to list problems and `POST /problems` to submit a new problem, rather than `/getAllProblems` or `/saveNewProblem`.",
          "Always return standard JSON envelopes with predictable error payloads containing an error code, message, and timestamp to simplify client-side handling."
        ],
        "templateBox": "{\n  \"error\": {\n    \"code\": \"INVALID_PAYLOAD\",\n    \"message\": \"Pain score must be an integer between 0 and 100.\",\n    \"details\": [{ \"field\": \"painScore\", \"issue\": \"value out of bounds\" }]\n  }\n}"
      },
      {
        "id": "c3-s63",
        "sectionNumber": "6.3",
        "title": "Building an API with FastAPI: asynchronous Python and Pydantic",
        "content": [
          "FastAPI has become the modern standard for high-performance Python microservices. Built on Starlette and Pydantic, it provides native async/await concurrency, automatic OpenAPI documentation, and compile-time data validation.",
          "When an incoming HTTP request arrives, Pydantic automatically validates query parameters and JSON payloads against Python type hints, rejecting malformed data before executing your handler."
        ],
        "templateBox": "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, Field\n\napp = FastAPI(title='Stuckhere Scoring API')\n\nclass ProblemSubmission(BaseModel):\n    title: str = Field(..., min_length=10, max_length=150)\n    frequency: int = Field(..., ge=1, le=5)\n    workaround_cost: float = Field(..., ge=0)\n\n@app.post('/api/score')\nasync def calculate_pain_score(data: ProblemSubmission):\n    score = min(100, int((data.frequency * 12) + (data.workaround_cost / 100)))\n    return {'painScore': score, 'verdict': 'Painkiller' if score >= 60 else 'Vitamin'}"
      },
      {
        "id": "c3-s64",
        "sectionNumber": "6.4",
        "title": "Calling third-party services safely: timeouts, retries and backoff",
        "content": [
          "Third-party external APIs (payment processors, SMS gateways, and LLM providers) will inevitably experience temporary network blips, 502 gateways, or rate limiting.",
          "Never make unconstrained HTTP requests without timeouts. Always configure explicit connect and read timeouts (e.g. 5-10 seconds), and implement exponential backoff with jitter on transient failures."
        ],
        "callout": {
          "boldPrefix": "Secret Hygiene Rule:",
          "text": "Never commit secrets into git repositories or container images. Store API keys in environment variables injected at runtime by your hosting provider."
        }
      },
      {
        "id": "c3-s65",
        "sectionNumber": "6.5",
        "title": "Chapter practice: building the scoring microservice",
        "content": [
          "Develop a local FastAPI application that exposes two endpoints: a health check endpoint (`GET /health`) and a scoring calculation endpoint (`POST /score`).",
          "Verify with Swagger UI (`/docs`) that submitting invalid numbers or empty strings returns an automatic HTTP 422 Unprocessable Entity error."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the key advantage of asynchronous async/await endpoints in FastAPI?",
            "answer": "When an endpoint waits for external I/O (like a database query or LLM call), the server thread is released to process other incoming requests, achieving high concurrency with low memory usage."
          },
          {
            "question": "Why is it important to include jitter when retrying failed requests?",
            "answer": "Jitter adds random time variation to retries, preventing the 'thundering herd' problem where thousands of failed clients retry simultaneously and crash recovering servers."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What is the primary architectural purpose of using Pydantic in a FastAPI back-end?",
      "options": [
        {
          "key": "A",
          "label": "To render HTML templates into the browser",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "To parse, validate, and serialize data with strict Python type hints",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "To manage database index creation in Postgres",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "To serve static CSS files",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Pydantic automatically validates incoming request payloads and serializes responses based on Python types.",
      "feedbackIncorrect": "Review Section 6.3: Pydantic handles automatic data parsing, validation, and schema generation."
    }
  },
  {
    "num": 7,
    "title": "Data Modelling with Cloud Firestore",
    "shortTitle": "Firestore Data Modeling",
    "slug": "data-modelling-with-cloud-firestore",
    "sectionsCount": 7,
    "part": "Back-End & Data",
    "coverColor": "#d97706",
    "subs": "NoSQL document fundamentals \u00b7 Query-first modeling \u00b7 Denormalization \u00b7 Real-time listeners \u00b7 Aggregations",
    "lead": "Cloud Firestore scales effortlessly to millions of documents, but only if you design schemas around your queries. By mastering denormalization and aggregation patterns, you keep queries sub-millisecond and cloud bills near zero.",
    "inThisChapter": "Document-oriented NoSQL fundamentals \u00b7 Designing collections for UI queries \u00b7 Denormalization to prevent N+1 reads \u00b7 Real-time onSnapshot listeners",
    "practicePrompt": "Design the production collections schema for your problem application and write query indexes for sorting and filtering.",
    "sections": [
      {
        "id": "c3-s71",
        "sectionNumber": "7.1",
        "title": "NoSQL document basics: collections, documents and billing mechanics",
        "content": [
          "In relational databases like PostgreSQL, data is structured into rigid tables with foreign keys and SQL `JOIN` clauses. Cloud Firestore is a NoSQL document database: data lives in documents organized into collections.",
          "Firestore billing is driven by operations: each document read, write, and delete incurs a metered count. Therefore, database architecture is not judged by 3NF normalization; it is judged by how many documents a user screen must read to render."
        ],
        "callout": {
          "boldPrefix": "The Firestore Billing Law:",
          "text": "Reading 100 documents to display a single webpage costs 100 read operations. Reading 1 pre-aggregated document costs 1 read operation. Always design for minimum document reads."
        }
      },
      {
        "id": "c3-s72",
        "sectionNumber": "7.2",
        "title": "Designing for your queries: list the screens, then the data",
        "content": [
          "In SQL, you normalize first and write complex JOIN queries later. In Firestore, you work backward: list every screen in your application, identify the exact filters and sorting rules each screen needs, and design collections that satisfy those queries directly.",
          "Firestore queries can only filter and sort on indexed fields. Single-field indexes are created automatically, while compound queries (e.g. `where('industry', '==', 'Fintech').orderBy('painScore', 'desc')`) require composite indexes created in Firebase Console or `firestore.indexes.json`."
        ]
      },
      {
        "id": "c3-s73",
        "sectionNumber": "7.3",
        "title": "Denormalization: copying author data to avoid the N+1 read trap",
        "content": [
          "The most common mistake by relational engineers in Firestore is storing only a foreign `authorId` on problem documents, requiring the client to issue 20 separate user profile reads for a list of 20 problems (the notorious N+1 query problem).",
          "In Firestore, you denormalize: copy the author's public name, avatar, and handle directly into the problem document at creation time. One query reads 20 problems and all author details in exactly 20 reads."
        ],
        "templateBox": "// Denormalized Problem Document Schema\n{\n  \"id\": \"prob_8829\",\n  \"title\": \"Kirana store inventory loss\",\n  \"painScore\": 84,\n  \"status\": \"approved\",\n  \"author\": {\n    \"uid\": \"usr_102\",\n    \"name\": \"deva Sanjay\",\n    \"handle\": \"@devasanjay\",\n    \"avatarUrl\": \"https://...\"\n  },\n  \"metrics\": {\n    \"upvotes\": 142,\n    \"comments\": 18\n  },\n  \"createdAt\": \"2026-11-20T10:00:00Z\"\n}"
      },
      {
        "id": "c3-s74",
        "sectionNumber": "7.4",
        "title": "Core collections for a problem platform",
        "content": [
          "A production problem hub requires a clear schema topology separating public catalog items from private user state and audit trails.",
          "The core collections include `users` (private profile data), `problems` (published and moderated problem dossiers), `votes` (subcollection or top-level junction records preventing double voting), and `moderationQueue` (restricted admin queue)."
        ]
      },
      {
        "id": "c3-s75",
        "sectionNumber": "7.5",
        "title": "Counters and aggregates: atomic increments and getCountFromServer",
        "content": [
          "Never calculate the total count of documents in a collection by reading all documents into client memory\u2014doing so across 10,000 problems consumes 10,000 paid reads.",
          "Use the Firestore server aggregation API `getCountFromServer(query)` which executes server-side and costs a single aggregation read, or use atomic `FieldValue.increment(1)` for real-time vote totals."
        ]
      },
      {
        "id": "c3-s76",
        "sectionNumber": "7.6",
        "title": "Real-time listeners vs. one-time fetches",
        "content": [
          "Firestore supports both one-time queries (`getDocs()`) and reactive real-time listeners (`onSnapshot()`). Real-time listeners automatically push updates whenever documents change in the cloud.",
          "Use `onSnapshot` sparingly on live collaborative screens, and always save the unsubscribe callback and execute it in `useEffect` cleanup to avoid runaway background reads."
        ]
      },
      {
        "id": "c3-s77",
        "sectionNumber": "7.7",
        "title": "Chapter practice: schema blueprint and composite indexing",
        "content": [
          "Write out your complete collection schema definitions in TypeScript. Create composite index definitions for filtering problems by industry while sorting by pain score descending.",
          "Test that querying with `limit(10)` returns exact page sizes with minimal document reads."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Why is querying with limit(10) superior to fetching all documents and slicing in JavaScript?",
            "answer": "Firestore charges per document read. Fetching 1,000 documents and slicing to 10 in JS incurs 1,000 paid reads, whereas limit(10) instructs the database to read only 10 documents."
          },
          {
            "question": "What is the purpose of FieldValue.increment(1)?",
            "answer": "It performs an atomic increment directly on the server without reading the current value first, preventing race conditions when multiple users vote concurrently."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What happens if a query requires filtering on field 'status' and sorting on field 'createdAt' descending, but no composite index exists?",
      "options": [
        {
          "key": "A",
          "label": "Firestore performs a slow full table scan and charges 10x reads",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Firestore rejects the query with an error containing a direct link to generate the required index",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Firestore randomly returns unordered documents",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The query succeeds but ignores the sorting requirement",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Firestore strictly requires composite indexes for multi-field queries and provides a one-click generation URL in the error message.",
      "feedbackIncorrect": "Review Section 7.2: Firestore prevents un-indexed queries from running to guarantee consistent sub-millisecond query performance."
    }
  },
  {
    "num": 8,
    "title": "Authentication & Authorization",
    "shortTitle": "Auth & Authorization",
    "slug": "authentication-and-authorization",
    "sectionsCount": 6,
    "part": "Back-End & Data",
    "coverColor": "#e11d48",
    "subs": "Auth vs. authorization \u00b7 Firebase Auth providers \u00b7 RBAC & custom claims \u00b7 Guest anonymous mode",
    "lead": "Authentication proves who a user is; authorization determines what they are allowed to do. Learn to implement multi-provider sign-in, manage session persistence, and enforce role-based access control.",
    "inThisChapter": "Authentication versus authorization concepts \u00b7 Google OAuth and email sign-in \u00b7 Role-based access control (RBAC) with custom claims \u00b7 Frictionless guest on-boarding",
    "practicePrompt": "Implement a complete auth provider with role checks that guards an administrative reviewer portal.",
    "sections": [
      {
        "id": "c3-s81",
        "sectionNumber": "8.1",
        "title": "Concepts: authentication vs. authorization and JWT mechanics",
        "content": [
          "Authentication (AuthN) verifies the identity of an entity: confirming that the person holding a session is indeed `user_123` via password verification or cryptographic OAuth handshakes.",
          "Authorization (AuthZ) verifies permissions: answering whether `user_123` has the right to delete a problem, review pending submissions, or ban a disruptive account. Tokens (JSON Web Tokens - JWTs) carry digitally signed claims asserting identity and roles."
        ]
      },
      {
        "id": "c3-s82",
        "sectionNumber": "8.2",
        "title": "Implementing Firebase Auth: Google OAuth and session persistence",
        "content": [
          "Firebase Authentication handles identity securely without storing raw passwords in your database. It manages cryptographic key rotation, email verification, password reset workflows, and token refresh lifecycles automatically.",
          "Using `signInWithPopup(auth, googleProvider)` enables one-click onboarding, while `onAuthStateChanged()` listens to session states across multiple browser tabs."
        ],
        "templateBox": "import { getAuth, onAuthStateChanged, User } from 'firebase/auth';\n\nexport function useAuthListener() {\n  const [currentUser, setCurrentUser] = useState<User | null>(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {\n      setCurrentUser(user);\n      setLoading(false);\n    });\n    return () => unsubscribe();\n  }, []);\n\n  return { currentUser, loading };\n}"
      },
      {
        "id": "c3-s83",
        "sectionNumber": "8.3",
        "title": "Roles and custom claims: user, reviewer, and admin",
        "content": [
          "Never trust client-stored role attributes like `localStorage.getItem('isAdmin')`. Malicious users can open browser DevTools and set this value to `true`.",
          "Real authorization uses Firebase Custom Claims: cryptographic attributes baked into the user's signed JWT token on the backend via Firebase Admin SDK. Security rules and APIs can inspect `request.auth.token.role == 'admin'` with complete cryptographic certainty."
        ]
      },
      {
        "id": "c3-s84",
        "sectionNumber": "8.4",
        "title": "Guest mode: anonymous authentication and account linking",
        "content": [
          "Forcing users to sign up before experiencing your app creates high bounce rates. With Firebase Anonymous Authentication (`signInAnonymously`), visitors receive a temporary UID immediately.",
          "They can upvote problems, bookmark items, or draft submissions as a guest. When they subsequently sign in with Google, Firebase links the anonymous credentials to the permanent account, preserving all bookmarks and drafts seamlessly."
        ]
      },
      {
        "id": "c3-s85",
        "sectionNumber": "8.5",
        "title": "Protecting admin and reviewer areas",
        "content": [
          "Restricted pages (such as moderation desks or administrative analytics) require dual-layer protection: client-side route guards that prevent rendering UI components, and cloud security rules that prevent database queries even if someone bypasses the UI.",
          "If an unauthorized user navigates directly to `/admin`, the route guard redirects them to `/dashboard` with an informative error toast."
        ]
      },
      {
        "id": "c3-s86",
        "sectionNumber": "8.6",
        "title": "Chapter practice: reviewer route guard",
        "content": [
          "Create a `<RequireRole role='reviewer'>` wrapper component that inspects the current user's claims. If authorized, render the child route; if unauthenticated, redirect to sign-in; if unauthorized, show an access denied banner.",
          "Test with both regular user accounts and simulated reviewer accounts."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Can a user forge or alter custom claims inside their own browser?",
            "answer": "No. Custom claims are embedded inside a cryptographically signed JWT. Any tampering invalidates the signature, causing Firebase and security rules to reject the token immediately."
          },
          {
            "question": "Why is client-side route protection alone insufficient for security?",
            "answer": "Client code runs in the user's browser where JavaScript can be modified or inspected. True security must be enforced on the server or database rules level."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Where must custom claims (such as { role: 'admin' }) be set to ensure cryptographic security?",
      "options": [
        {
          "key": "A",
          "label": "In client-side localStorage during login",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "On the server using the privileged Firebase Admin SDK",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "In the client Vite configuration file",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Inside a public URL query parameter",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Custom claims can only be set via the privileged Firebase Admin SDK in trusted server environments.",
      "feedbackIncorrect": "Review Section 8.3: Client-side claims cannot be trusted; only the Firebase Admin SDK can set verified claims."
    }
  },
  {
    "num": 9,
    "title": "Security: Threat Thinking & Security Rules",
    "shortTitle": "Cloud Security",
    "slug": "security",
    "sectionsCount": 7,
    "part": "Back-End & Data",
    "coverColor": "#4f46e5",
    "subs": "Zero-trust client principle \u00b7 Firestore rules syntax \u00b7 XSS & CSP \u00b7 Secrets hygiene \u00b7 Abuse mitigation",
    "lead": "In cloud architectures, the client is hostile. Anyone can send arbitrary network payloads to your database endpoints. By writing ironclad Firestore security rules and defensive web headers, you protect your data from tampering.",
    "inThisChapter": "Zero-trust client mindset \u00b7 Firestore security rule syntax and assertions \u00b7 Preventing XSS and CSRF \u00b7 Secrets isolation and rate limiting",
    "practicePrompt": "Write and test a production firestore.rules file enforcing data schemas, immutable fields, and ownership checks.",
    "sections": [
      {
        "id": "c3-s91",
        "sectionNumber": "9.1",
        "title": "Threat thinking: the client is never trusted",
        "content": [
          "The golden rule of web security is simple: Never trust data coming from the browser. Form validation in React is for user experience, not security; an attacker does not use your forms\u2014they use curl, Postman, or automated scripts.",
          "Assume every request payload has been manipulated. Every business rule, data shape check, and permission gate must be validated by the database security rules or back-end API."
        ],
        "callout": {
          "boldPrefix": "The Zero-Trust Mindset:",
          "text": "If a user can change their own role from 'member' to 'admin' by sending a modified JSON payload, your architecture has failed. Enforce immutability at the database layer."
        }
      },
      {
        "id": "c3-s92",
        "sectionNumber": "9.2",
        "title": "Firestore security rules: match, allow, and conditions",
        "content": [
          "Firestore security rules execute in a secure sandbox on Google Cloud before any document is read or written. Rules define `match` paths and specify `allow` conditions for `read`, `create`, `update`, and `delete`.",
          "Use `request.auth` to inspect user identity and `request.resource.data` to inspect incoming write data against existing document data (`resource.data`)."
        ],
        "templateBox": "rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /problems/{problemId} {\n      // Anyone can read approved problems\n      allow read: if resource.data.status == 'approved' || request.auth.uid == resource.data.author.uid;\n      \n      // Authenticated users can create problems with valid shapes\n      allow create: if request.auth != null\n        && request.resource.data.author.uid == request.auth.uid\n        && request.resource.data.title is string\n        && request.resource.data.title.size() >= 10\n        && request.resource.data.status == 'pending';\n        \n      // Authors cannot approve their own submissions or alter vote counts directly\n      allow update: if request.auth != null\n        && request.resource.data.status == resource.data.status\n        && request.resource.data.author.uid == resource.data.author.uid;\n    }\n  }\n}"
      },
      {
        "id": "c3-s93",
        "sectionNumber": "9.3",
        "title": "Web security basics: XSS, CSRF and Content Security Policy",
        "content": [
          "Cross-Site Scripting (XSS) occurs when an application renders unsanitized user-generated content containing executable JavaScript. While React escapes strings by default, using `dangerouslySetInnerHTML` bypasses protection.",
          "Deploy strict HTTP response headers: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Content-Type-Options, and X-Frame-Options to prevent clickjacking and script injection."
        ]
      },
      {
        "id": "c3-s94",
        "sectionNumber": "9.4",
        "title": "Secrets and keys: separating client credentials from server keys",
        "content": [
          "Firebase config values (e.g. `apiKey`, `projectId`) are public identifiers, not secret keys. They identify your project to Google Cloud, and access is governed by Security Rules.",
          "In contrast, AI API keys (Anthropic, OpenAI, Gemini), payment secret keys, and database service account keys are highly confidential. Exposing them in client code allows anyone to deplete your billing account."
        ]
      },
      {
        "id": "c3-s95",
        "sectionNumber": "9.5",
        "title": "Abuse prevention and spam mitigation",
        "content": [
          "Public submission forms inevitably attract automated spam bots. Defend your application with layered mitigation: invisible honeypot fields, rate limiting on submission endpoints, and IP reputation filtering.",
          "For high-value actions, incorporate Cloudflare Turnstile or reCAPTCHA v3 to detect automated traffic without introducing annoying image puzzle friction."
        ]
      },
      {
        "id": "c3-s96",
        "sectionNumber": "9.6",
        "title": "Privacy and compliance: handling PII and data deletion",
        "content": [
          "Complying with privacy regulations (such as GDPR and CCPA) requires clear data ownership: collect only necessary personally identifiable information (PII), encrypt data at rest, and implement an automated account deletion routine.",
          "When a user deletes their account, delete their private user profile and anonymize their public submissions so platform integrity is preserved while PII is purged."
        ]
      },
      {
        "id": "c3-s97",
        "sectionNumber": "9.7",
        "title": "Chapter practice: security audit and rule verification",
        "content": [
          "Run the Firebase Local Emulator Suite and execute automated unit tests verifying that unauthenticated users cannot write records, regular users cannot approve their own submissions, and field sizes are enforced.",
          "Audit your repository with `git grep` to confirm zero secret keys exist in committed files."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Are Firebase API keys found in index.html considered confidential secrets?",
            "answer": "No. Firebase API keys are public client identifiers. Security is enforced by Firestore Security Rules, not by keeping the API key secret."
          },
          {
            "question": "How does an invisible honeypot form field stop spam bots?",
            "answer": "A honeypot is an input hidden from human users with CSS. Automated bots fill in all form fields indiscriminately; if the honeypot contains any text upon submission, the server discards the payload as spam."
          }
        ]
      }
    ],
    "quiz": {
      "question": "In Firestore security rules, what does request.resource represent compared to resource?",
      "options": [
        {
          "key": "A",
          "label": "request.resource is the incoming proposed document data; resource is the existing document data currently in the database",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "request.resource is the user's auth token; resource is the database collection name",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "There is no difference between them",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "request.resource is only available during read operations",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! request.resource contains the future document state if the write succeeds, while resource represents the existing document.",
      "feedbackIncorrect": "Review Section 9.2: request.resource is the pending write payload; resource is the existing document on the server."
    }
  },
  {
    "num": 10,
    "title": "Adding AI Features & Copilots",
    "shortTitle": "AI Features & Copilots",
    "slug": "adding-ai-features",
    "sectionsCount": 6,
    "part": "AI & Operations",
    "coverColor": "#9333ea",
    "subs": "LLM strengths & limits \u00b7 Claude/Gemini API calls \u00b7 Structured JSON output \u00b7 Streaming responses \u00b7 Cost limits",
    "lead": "Artificial intelligence foundation models are force multipliers when integrated thoughtfully. Learn how to invoke LLMs through secure APIs, structure prompts for deterministic outputs, stream tokens to the UI, and guard against hallucinations.",
    "inThisChapter": "What LLMs excel at in SaaS applications \u00b7 Calling Claude and Gemini via backend endpoints \u00b7 Deterministic prompt design and JSON schema extraction \u00b7 Building a Problem Solver Copilot",
    "practicePrompt": "Connect an AI endpoint to generate structured solution proposals and market objections for any verified problem.",
    "sections": [
      {
        "id": "c3-s101",
        "sectionNumber": "10.1",
        "title": "What LLMs are good at (and what they are bad at)",
        "content": [
          "Large Language Models (LLMs) are statistical pattern engines, not infallible reasoning databases. They excel at unstructured text transformation: summarizing interview notes, extracting structured key-value entities, categorizing industries, and drafting initial solution hypotheses.",
          "Conversely, LLMs struggle with precise arithmetic (never ask an LLM to calculate TAM or LTV directly\u2014use deterministic Python/JS for math) and frequently hallucinate citations when asked for ungrounded factual statistics."
        ],
        "table": {
          "headers": [
            "Task Category",
            "LLM Suitability",
            "Best Engineering Approach"
          ],
          "rows": [
            {
              "label": "Interview Synthesis",
              "text": "Exceptional",
              "text2": "Extract recurring pain points and quote verbatim operator complaints"
            },
            {
              "label": "Data Extraction",
              "text": "High",
              "text2": "Convert free-form paragraphs into strict JSON schemas with Pydantic"
            },
            {
              "label": "Mathematical Sizing",
              "text": "Poor",
              "text2": "Use Python/JS arithmetic functions; let LLMs provide input variables"
            },
            {
              "label": "Real-time Verification",
              "text": "Moderate",
              "text2": "Ground with retrieval-augmented context (RAG) from verified databases"
            }
          ]
        }
      },
      {
        "id": "c3-s102",
        "sectionNumber": "10.2",
        "title": "Calling a foundation model through an API",
        "content": [
          "Never call an LLM API directly from browser code; your API key would be exposed immediately. Route all AI interactions through your secure backend service (e.g. FastAPI or Next.js Route Handlers).",
          "The backend validates user authentication, enforces rate limits, constructs the system and user prompts, and invokes the model using official SDKs (such as Anthropic's Python SDK or Google's `@google/genai`)."
        ],
        "templateBox": "import anthropic\n\nclient = anthropic.Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])\n\ndef analyze_problem_statement(statement: str):\n    message = client.messages.create(\n        model='claude-3-5-sonnet-20241022',\n        max_tokens=1000,\n        temperature=0.2,\n        system='You are an enterprise problem architect. Analyze problem statements and extract root causes.',\n        messages=[{'role': 'user', 'content': statement}]\n    )\n    return message.content[0].text"
      },
      {
        "id": "c3-s103",
        "sectionNumber": "10.3",
        "title": "Prompt design: few-shot prompting and strict JSON schema output",
        "content": [
          "Free-form conversational responses are difficult to render reliably in user interfaces. To build robust AI features, force the model to respond in strict, machine-readable JSON schemas.",
          "Use system instructions to anchor role and constraints, provide 2-3 high-quality few-shot input/output examples, and set temperature low (0.0 to 0.2) to eliminate creative variance."
        ]
      },
      {
        "id": "c3-s104",
        "sectionNumber": "10.4",
        "title": "Building a Problem Solver Copilot with streaming responses",
        "content": [
          "Waiting 15 seconds for a complete AI response to generate causes users to think the application has frozen. Modern AI interfaces stream tokens progressively via Server-Sent Events (SSE).",
          "As chunks arrive over the HTTP stream, the React client appends tokens to state, providing immediate visual feedback and rendering markdown formatting in real time."
        ]
      },
      {
        "id": "c3-s105",
        "sectionNumber": "10.5",
        "title": "Safety, quality and cost control",
        "content": [
          "AI models bill per token (chunks of characters processed in prompts and outputs). Unchecked AI endpoints can lead to surprise cloud bills if malicious users script high-volume requests.",
          "Implement strict guardrails: hard cap maximum output tokens (`max_tokens=1024`), enforce user-level daily generation quotas (e.g., 10 generations per user per day), and cache identical problem analyses in Firestore so identical requests cost zero model tokens."
        ],
        "callout": {
          "boldPrefix": "The Caching Dividend:",
          "text": "By caching the AI analysis of each approved problem document in Firestore, subsequent visits by thousands of users consume standard Firestore reads instead of expensive LLM API tokens."
        }
      },
      {
        "id": "c3-s106",
        "sectionNumber": "10.6",
        "title": "Chapter practice: interactive problem analysis copilot",
        "content": [
          "Build an end-to-end AI copilot panel on the Problem Detail page: when a user clicks 'Analyze with Copilot', the client calls your backend endpoint, streams the analysis, and renders structured suggestions for technical solutions.",
          "Ensure error states (e.g. rate limit reached, service unavailable) are handled gracefully."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Why is setting a low temperature (e.g. 0.1) essential when extracting JSON from LLMs?",
            "answer": "Low temperature minimizes randomness, ensuring the model adheres strictly to the required schema syntax and avoids conversational chit-chat."
          },
          {
            "question": "What is the primary benefit of streaming LLM responses via Server-Sent Events?",
            "answer": "Streaming reduces perceived latency dramatically: users see the first words within 500ms instead of staring at a blank screen for 10-15 seconds."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which strategy most effectively prevents runaway token costs when providing AI features to public users?",
      "options": [
        {
          "key": "A",
          "label": "Increasing model temperature to 1.0",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Caching AI results in Firestore and imposing per-user daily rate limits",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Using longer system prompts",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Allowing client-side JavaScript to invoke the model directly",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Caching reusable outputs and capping daily user quotas protects your billing account from runaway spikes.",
      "feedbackIncorrect": "Review Section 10.5: Caching responses in Firestore and enforcing daily per-user limits is the proven defense against cost overruns."
    }
  },
  {
    "num": 11,
    "title": "Deployment & CI/CD Pipelines",
    "shortTitle": "Deployment & CI/CD",
    "slug": "deployment-and-ci-cd",
    "sectionsCount": 5,
    "part": "AI & Operations",
    "coverColor": "#059669",
    "subs": "Hosting architectures \u00b7 Git to Vercel automation \u00b7 Custom domains & TLS \u00b7 Safe releases & rollbacks",
    "lead": "Software that exists only on your local machine creates zero customer value. Master automated continuous integration and continuous deployment (CI/CD) to turn every git commit into an immutable production release with instant rollback capabilities.",
    "inThisChapter": "Comparing static and edge hosting platforms \u00b7 Connecting GitHub to Vercel for zero-config CI/CD \u00b7 Configuring apex domains and automated SSL \u00b7 Safe release engineering and instant rollbacks",
    "practicePrompt": "Deploy your application to a public Vercel production domain with branch preview environments and automated build checks.",
    "sections": [
      {
        "id": "c3-s111",
        "sectionNumber": "11.1",
        "title": "Hosting options: edge CDNs, serverless and containers",
        "content": [
          "Deploying modern web applications no longer requires configuring Apache or Nginx on a self-managed Linux virtual machine.",
          "Vercel, Netlify, and Cloudflare Pages distribute your static bundles to hundreds of global edge locations, ensuring sub-50ms Time to First Byte (TTFB) worldwide while handling automated SSL certificates and DDoS protection out of the box."
        ]
      },
      {
        "id": "c3-s112",
        "sectionNumber": "11.2",
        "title": "From git commit to production: CI/CD automation",
        "content": [
          "Continuous Integration and Continuous Deployment (CI/CD) automates build and verification steps. When a developer pushes code to GitHub, automated webhooks notify Vercel to pull the commit, run `npm run build`, and deploy the resulting assets to an isolated preview URL.",
          "Pull requests receive dedicated Preview Deployments, allowing collaborators and stakeholders to test the exact running build before merging into the `main` branch."
        ],
        "points": [
          {
            "bold": "Preview Deployments:",
            "text": "Every pull request gets a unique, shareable URL for QA and testing."
          },
          {
            "bold": "Build Caching:",
            "text": "Vercel caches node_modules and unchanged build artifacts, reducing build times from minutes to seconds."
          },
          {
            "bold": "Environment Injections:",
            "text": "Different environment variables can be bound to Development, Preview, and Production tiers."
          }
        ]
      },
      {
        "id": "c3-s113",
        "sectionNumber": "11.3",
        "title": "Domains, DNS and automated HTTPS certificates",
        "content": [
          "To point your custom domain (e.g. `stuckhere.com`) to Vercel, configure DNS records at your domain registrar: an `A` record pointing the apex domain (`@`) to Vercel's anycast IP (`76.76.21.21`), and a `CNAME` record pointing the `www` subdomain to `cname.vercel-dns.com`.",
          "Vercel automatically provisions and renews Let's Encrypt TLS certificates, enforcing modern HTTPS with HSTS headers."
        ]
      },
      {
        "id": "c3-s114",
        "sectionNumber": "11.4",
        "title": "Safe releases and instant rollbacks",
        "content": [
          "In traditional server environments, deploying buggy code required frantic git reverts and rebuilds. Modern edge deployments are immutable: every deployment generates a permanent snapshot.",
          "If a release introduces a critical bug, Vercel allows an Instant Rollback: clicking 'Rollback' in the dashboard repoints the production DNS traffic to the previous healthy deployment snapshot in under 300 milliseconds without rebuilding."
        ],
        "callout": {
          "boldPrefix": "The Immutable Rule:",
          "text": "Never modify production servers or files in place. Every release is an immutable artifact. If you make a mistake, roll back instantly, fix locally, and deploy a new snapshot."
        }
      },
      {
        "id": "c3-s115",
        "sectionNumber": "11.5",
        "title": "Chapter practice: production deployment",
        "content": [
          "Link your GitHub repository to Vercel. Configure production environment variables for your Firebase configuration. Trigger a production build and verify that the application loads over HTTPS with zero console errors.",
          "Open a test pull request on a branch to verify that a preview deployment is automatically created."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the primary operational advantage of immutable deployments?",
            "answer": "Because previous deployments remain preserved exactly as they were, you can roll back to a known healthy state instantly if a newly deployed build has an unexpected bug."
          },
          {
            "question": "Why should environment variables like database credentials differ between Preview and Production?",
            "answer": "Separating environments ensures testing on preview branches does not corrupt or overwrite real production user data or deplete production quotas."
          }
        ]
      }
    ],
    "quiz": {
      "question": "How quickly can an instant rollback be executed on modern edge hosting platforms like Vercel?",
      "options": [
        {
          "key": "A",
          "label": "Instantaneous (sub-second) because the previous immutable build artifact already exists",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "Between 15 and 30 minutes because all packages must be recompiled",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Only after re-registering your domain name",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Rollbacks are impossible; you must write fresh code",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Because deployments are immutable snapshots, rollbacks simply update edge routing pointers in milliseconds.",
      "feedbackIncorrect": "Review Section 11.4: Immutable deployments allow instant sub-second rollbacks without rebuilding code."
    }
  },
  {
    "num": 12,
    "title": "Performance & Cost Optimization",
    "shortTitle": "Performance & Cost",
    "slug": "performance-and-cost",
    "sectionsCount": 5,
    "part": "AI & Operations",
    "coverColor": "#0284c7",
    "subs": "Core Web Vitals \u00b7 Firestore read optimization \u00b7 Free-tier economics \u00b7 Worked costing model",
    "lead": "Fast web apps convert visitors into engaged users; efficient cloud architectures protect your margins. Master Core Web Vitals optimization and cloud billing mechanics to deliver sub-second experiences while remaining inside free tiers.",
    "inThisChapter": "Measuring Core Web Vitals (LCP, INP, CLS) \u00b7 Reducing Firestore read operations through smarter caching \u00b7 Free tier limits and budget alerts \u00b7 Worked costing calculation for 10,000 active users",
    "practicePrompt": "Conduct a Lighthouse performance audit on your app and implement image lazy loading and query limits to minimize bandwidth and database reads.",
    "sections": [
      {
        "id": "c3-s121",
        "sectionNumber": "12.1",
        "title": "Web performance: mastering Core Web Vitals",
        "content": [
          "Google measures real-world user experience using three Core Web Vitals: Largest Contentful Paint (LCP - how fast main content appears, target < 2.5s), Interaction to Next Paint (INP - responsiveness to clicks, target < 200ms), and Cumulative Layout Shift (CLS - visual stability, target < 0.1).",
          "Achieving excellent Core Web Vitals requires splitting JavaScript bundles, compressing images into modern WebP/AVIF formats, defining explicit width and height on image tags, and preloading critical web fonts."
        ]
      },
      {
        "id": "c3-s122",
        "sectionNumber": "12.2",
        "title": "Data performance: fewer, smarter queries",
        "content": [
          "Network latency between browser and cloud database is the number one source of perceived user sluggishness. Reduce round-trips by co-locating data, using pagination cursors (`startAfter`), and caching invariant reference data in client memory.",
          "When listing items, always provide an explicit `limit(10)` or `limit(20)`. Never request open-ended queries without limits; as your database grows from 50 to 50,000 records, unconstrained queries will freeze user browsers and deplete read quotas."
        ]
      },
      {
        "id": "c3-s123",
        "sectionNumber": "12.3",
        "title": "Cost control: staying inside free tiers and setting budget alerts",
        "content": [
          "Firebase and Vercel offer exceptionally generous free tiers: 50,000 daily Firestore reads, 20,000 writes, 1GB stored data, and 100GB monthly edge bandwidth. A lean startup can operate for months without spending a single dollar.",
          "To prevent accidental runaway expenses from infinite loops or DDoS bots, configure GCP Cloud Billing Budget Alerts with email triggers at $10, $50, and $100 thresholds."
        ]
      },
      {
        "id": "c3-s124",
        "sectionNumber": "12.4",
        "title": "Worked example: costing 1,000 daily active users",
        "content": [
          "Let us calculate the exact monthly cost of operating our Problem Platform with 1,000 Daily Active Users (DAUs) using a denormalized schema.",
          "Assume each user visits the homepage (10 reads for top problems), opens 3 problem dossiers (3 reads), and casts 1 vote (1 write). Over 1,000 DAUs, this equals 13,000 reads/day and 1,000 writes/day\u2014well beneath Firebase's free threshold of 50,000 reads/day. Monthly database bill: $0.00."
        ],
        "table": {
          "headers": [
            "Resource",
            "Daily Usage (1,000 DAUs)",
            "Firebase Free Tier",
            "Monthly Cost"
          ],
          "rows": [
            {
              "label": "Firestore Reads",
              "text": "13,000 / day",
              "text2": "50,000 / day",
              "highlight": true
            },
            {
              "label": "Firestore Writes",
              "text": "1,000 / day",
              "text2": "20,000 / day",
              "highlight": true
            },
            {
              "label": "Storage",
              "text": "120 MB",
              "text2": "1,000 MB (1GB)",
              "highlight": true
            },
            {
              "label": "Edge Bandwidth",
              "text": "1.2 GB / month",
              "text2": "100 GB / month",
              "highlight": true
            }
          ]
        }
      },
      {
        "id": "c3-s125",
        "sectionNumber": "12.5",
        "title": "Chapter practice: performance and cost audit",
        "content": [
          "Run Google Lighthouse on your deployed web application across both Mobile and Desktop profiles. Address any identified layout shifts, eliminate unused JavaScript, and verify that bundle size remains below 200KB gzipped.",
          "Set up a GCP billing alert to notify you of any unexpected consumption."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the primary cause of high Cumulative Layout Shift (CLS)?",
            "answer": "Images, banners, or dynamic embeds rendered without explicit aspect-ratio, width, or height attributes, causing content below them to suddenly jump when they load."
          },
          {
            "question": "At what point does Cloud Firestore begin charging for document reads?",
            "answer": "Only after exceeding the free tier allocation of 50,000 document reads in a single UTC day."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which Core Web Vital metric evaluates an application's visual stability and prevents content from jarringly jumping during page load?",
      "options": [
        {
          "key": "A",
          "label": "Largest Contentful Paint (LCP)",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Cumulative Layout Shift (CLS)",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Interaction to Next Paint (INP)",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Time to First Byte (TTFB)",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Cumulative Layout Shift (CLS) measures layout shifts that cause visual instability for users.",
      "feedbackIncorrect": "Review Section 12.1: CLS measures unwanted layout shifting during page rendering."
    }
  },
  {
    "num": 13,
    "title": "Testing & Quality Assurance",
    "shortTitle": "Testing & Quality",
    "slug": "testing-and-quality",
    "sectionsCount": 6,
    "part": "AI & Operations",
    "coverColor": "#16a34a",
    "subs": "Testing pyramid \u00b7 Vitest for unit logic \u00b7 Playwright E2E automation \u00b7 Security rules tests \u00b7 CI test runs",
    "lead": "Untested code is broken code waiting to surprise you. Learn to build a pragmatic testing suite using Vitest for pure business logic and Playwright for automated browser end-to-end tests that verify critical user journeys.",
    "inThisChapter": "The testing pyramid for modern SaaS \u00b7 Unit testing mathematical functions and score models with Vitest \u00b7 Writing resilient browser automation tests with Playwright \u00b7 Testing Firestore security rules in local emulators",
    "practicePrompt": "Write an automated Playwright test suite that executes search, filter, and submission flows across desktop and mobile viewports.",
    "sections": [
      {
        "id": "c3-s131",
        "sectionNumber": "13.1",
        "title": "Why test: the true cost of production regressions",
        "content": [
          "Discovering a bug while writing code takes 30 seconds to fix. Discovering a bug in production causes customer churn, corrupts databases, disrupts founder focus, and damages brand credibility.",
          "A balanced testing suite acts as an automated safety harness, giving you the confidence to refactor code, upgrade dependencies, and ship updates multiple times per day without fear."
        ],
        "points": [
          {
            "bold": "Unit Tests:",
            "text": "Blazing fast tests verifying pure functions (e.g. Pain Score math, currency formatting, validation algorithms)."
          },
          {
            "bold": "Integration Tests:",
            "text": "Verifying that components render, fire events, and update state as expected."
          },
          {
            "bold": "End-to-End (E2E) Tests:",
            "text": "Real headless browsers driving the complete user experience from page load to database write."
          }
        ]
      },
      {
        "id": "c3-s132",
        "sectionNumber": "13.2",
        "title": "Unit and component tests with Vitest",
        "content": [
          "Vitest is a modern unit test runner built on top of Vite. It shares the same configuration, plugins, and transform pipeline as your dev server, running TypeScript tests in milliseconds.",
          "Write unit tests for core domain logic: score calculations, filter algorithms, and date formatting utilities. Keep unit tests isolated and deterministic without mocking external networks unnecessarily."
        ],
        "templateBox": "import { describe, it, expect } from 'vitest';\nimport { calculatePainScore } from './scoring';\n\ndescribe('calculatePainScore', () => {\n  it('returns maximum 100 for extreme daily operational waste', () => {\n    const score = calculatePainScore({ frequency: 5, hourlyLoss: 500 });\n    expect(score).toBe(100);\n  });\n\n  it('classifies scores under 40 as vitamins', () => {\n    const score = calculatePainScore({ frequency: 1, hourlyLoss: 10 });\n    expect(score).toBeLessThan(40);\n  });\n});"
      },
      {
        "id": "c3-s133",
        "sectionNumber": "13.3",
        "title": "End-to-end testing with Playwright: headless browser automation",
        "content": [
          "Playwright by Microsoft is the gold standard for browser automation. It tests your actual production bundle inside real Chromium, Firefox, and WebKit browser engines across desktop and mobile viewports.",
          "Write resilient selectors that mirror how real humans interact with your app: prefer role and text selectors (`page.getByRole('button', { name: 'Submit' })`) over brittle CSS classes that change during redesigns."
        ]
      },
      {
        "id": "c3-s134",
        "sectionNumber": "13.4",
        "title": "Security rules testing with the Firebase emulator",
        "content": [
          "Never test security rules in live production. Use `@firebase/rules-unit-testing` against the local Firebase Emulator Suite to execute fast, automated unit tests verifying security assertions.",
          "Write positive tests (confirming authors can edit their own drafts) and negative tests (asserting that non-admins cannot approve submissions or modify vote tallies)."
        ]
      },
      {
        "id": "c3-s135",
        "sectionNumber": "13.5",
        "title": "Running tests automatically in CI: GitHub Actions",
        "content": [
          "Automate your test suite using GitHub Actions. Configure a workflow that runs on every pull request, executing lint checks, TypeScript type checking (`tsc --noEmit`), and Playwright test suites.",
          "Block pull request merging if any test fails, guaranteeing that broken code never reaches the production branch."
        ]
      },
      {
        "id": "c3-s136",
        "sectionNumber": "13.6",
        "title": "Chapter practice: five critical E2E tests",
        "content": [
          "Write five Playwright end-to-end tests covering the core platform flows: 1) Homepage renders header and problem list, 2) Search filters items accurately, 3) Clicking a card opens detail page, 4) Upvoting requires authentication or increments counter, 5) Mobile drawer opens cleanly on small viewports.",
          "Execute the tests in headless mode and verify 100% pass rate."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Why are role-based selectors (getByRole) superior to CSS class selectors in E2E tests?",
            "answer": "Role-based selectors test accessibility and user-perceived behavior. CSS classes frequently change during styling updates, causing tests to break even when functionality remains intact."
          },
          {
            "question": "What is the purpose of testing security rules in the local emulator?",
            "answer": "It allows you to simulate malicious attacks and unauthorized writes instantly in an isolated local sandbox without modifying production databases or incurring billing charges."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which selector strategy in Playwright provides the highest resilience against visual redesigns?",
      "options": [
        {
          "key": "A",
          "label": "div > span.css-194kf8",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "page.getByRole('button', { name: 'Submit Problem' })",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "xpath=//div[3]/form/button[1]",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "page.locator('.btn-primary')",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! User-facing accessible roles and names survive redesigns and encourage accessible markup.",
      "feedbackIncorrect": "Review Section 13.3: Accessible role and name selectors mirror real human behavior and survive styling refactors."
    }
  },
  {
    "num": 14,
    "title": "SEO & AI Search Visibility (GEO)",
    "shortTitle": "SEO & AI Visibility",
    "slug": "seo-and-ai-search-visibility",
    "sectionsCount": 6,
    "part": "Production & Capstone",
    "coverColor": "#0891b2",
    "subs": "SPA indexing mechanics \u00b7 Technical meta tags \u00b7 JSON-LD schemas \u00b7 Generative Engine Optimization (GEO) \u00b7 llms.txt",
    "lead": "Building great software is half the battle; ensuring operators and AI search assistants find it is the other. Learn how to optimize single-page applications for search engines and generative AI retrieval systems.",
    "inThisChapter": "How search engines crawl modern SPAs \u00b7 On-page meta tags, canonical links, and sitemaps \u00b7 Schema.org structured data (Article, Course, FAQPage) \u00b7 Optimizing for LLM search (GEO and llms.txt)",
    "practicePrompt": "Generate a dynamic sitemap.xml and embed JSON-LD Course and FAQPage schemas into your public academy and problem pages.",
    "sections": [
      {
        "id": "c3-s141",
        "sectionNumber": "14.1",
        "title": "How search finds your pages: crawling, indexing and rendering",
        "content": [
          "Search engines like Google use automated bots (Googlebot) to crawl the web. While Googlebot executes JavaScript, rendering client-side SPAs consumes crawl budget and can delay indexing by days or weeks.",
          "To ensure immediate indexing, provide pre-rendered HTML metadata, fast server response times, and avoid rendering critical textual content solely behind user click interactions."
        ]
      },
      {
        "id": "c3-s142",
        "sectionNumber": "14.2",
        "title": "On-page technical SEO: titles, descriptions and canonical URLs",
        "content": [
          "Every public page must specify unique, descriptive `<title>` and `<meta name='description'>` tags. Titles should lead with the primary problem keyword followed by brand branding (e.g. `Kirana Inventory Reconciliation Problem \u2014 Stuckhere`).",
          "Always specify `<link rel='canonical'>` to indicate the preferred URL and prevent duplicate content penalties across query parameters and tracking tags."
        ]
      },
      {
        "id": "c3-s143",
        "sectionNumber": "14.3",
        "title": "Structured data with Schema.org and JSON-LD",
        "content": [
          "Search engines extract semantic understanding from structured JSON-LD scripts embedded in the page `<head>`. Using official Schema.org vocabularies enables rich search snippets in Google search results.",
          "For Stuckhere, implement `Course` schemas on academy modules, `Article` schemas on problem dossiers, `FAQPage` schemas on Q&A sections, and `BreadcrumbList` for hierarchical navigation."
        ],
        "templateBox": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Course\",\n  \"name\": \"Full-Stack Cloud Development\",\n  \"description\": \"Build, secure, ship and scale production web apps.\",\n  \"provider\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Stuckhere Academy\",\n    \"sameAs\": \"https://stuckhere.davns.com\"\n  }\n}"
      },
      {
        "id": "c3-s144",
        "sectionNumber": "14.4",
        "title": "Visibility in AI search: Generative Engine Optimization (GEO)",
        "content": [
          "Users increasingly discover solutions by querying AI search engines like Perplexity, ChatGPT Search, and Google Gemini Overviews. These systems synthesize answers by extracting quotes from authoritative, structured source pages.",
          "To optimize for GEO: write clear factual definitions in the opening paragraph of each section, support claims with numerical data, organize content into structured bullet points, and publish a machine-readable `/llms.txt` file at your domain root."
        ],
        "callout": {
          "boldPrefix": "The GEO Format Rule:",
          "text": "AI models prioritize pages with structured lists, clear headers, and unambiguous definitions. Conversational fluff is ignored; high-density factual summaries get quoted."
        }
      },
      {
        "id": "c3-s145",
        "sectionNumber": "14.5",
        "title": "Content strategy: courses as high-intent discovery funnels",
        "content": [
          "Educational course content serves as high-authority evergreen traffic. Founders searching for 'how to calculate TAM' or 'how to secure Firestore rules' discover Stuckhere Academy.",
          "Weave internal cross-links between course chapters and real verified problem dossiers in the catalog, transforming readers into active problem solvers and platform contributors."
        ]
      },
      {
        "id": "c3-s146",
        "sectionNumber": "14.6",
        "title": "Chapter practice: structured data and llms.txt implementation",
        "content": [
          "Add an SEOHead component to your app that injects dynamic canonical tags and JSON-LD Course schema markup into `document.head`. Create a static `public/llms.txt` file summarizing your application's public datasets and educational curriculum.",
          "Test your markup using Google's Rich Results Test tool."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the purpose of llms.txt?",
            "answer": "It provides a standardized, lightweight markdown file for LLM crawlers to discover high-level summaries and direct links to documentation without parsing heavy HTML stylesheets."
          },
          {
            "question": "Why is JSON-LD preferred over Microdata or RDFa for structured data?",
            "answer": "JSON-LD lives cleanly inside an isolated <script> tag in the header, keeping data completely decoupled from user-facing HTML presentation."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which Schema.org entity type is most appropriate for tagging individual educational curriculum modules in Stuckhere Academy?",
      "options": [
        {
          "key": "A",
          "label": "Course",
          "isCorrect": true
        },
        {
          "key": "B",
          "label": "LocalBusiness",
          "isCorrect": false
        },
        {
          "key": "C",
          "label": "Product",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "JobPosting",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Schema.org/Course enables Google to present course metadata, syllabus parts, and provider details directly in rich search results.",
      "feedbackIncorrect": "Review Section 14.3: Course is the standard Schema.org type for educational curricula."
    }
  },
  {
    "num": 15,
    "title": "Monitoring, Observability & Maintenance",
    "shortTitle": "Monitoring & Maintenance",
    "slug": "monitoring-and-maintenance",
    "sectionsCount": 4,
    "part": "Production & Capstone",
    "coverColor": "#475569",
    "subs": "Observability & telemetry \u00b7 Sentry error tracking \u00b7 Privacy-first analytics \u00b7 Maintenance runbooks",
    "lead": "Deploying software is only the beginning of its lifecycle. Production systems experience unexpected edge cases and browser incompatibilities. Master modern observability to capture errors, analyze user funnels, and maintain high uptime.",
    "inThisChapter": "Logs, metrics, and error tracing \u00b7 Client-side error tracking with Sentry \u00b7 Privacy-conscious product analytics \u00b7 Dependency hygiene and incident response",
    "practicePrompt": "Integrate client error logging and construct an operational runbook for scheduled dependency audits.",
    "sections": [
      {
        "id": "c3-s151",
        "sectionNumber": "15.1",
        "title": "Observability: logs, errors and client-side telemetry",
        "content": [
          "In a distributed cloud app, silent frontend errors leave users stranded on blank screens without notifying your team. Real observability captures exceptions automatically with contextual breadcrumbs.",
          "Tools like Sentry or Datadog capture unhandled promise rejections, console errors, user browser versions, and network trace histories, alerting your team in real time before users complain."
        ]
      },
      {
        "id": "c3-s152",
        "sectionNumber": "15.2",
        "title": "Privacy-first analytics and user conversion funnels",
        "content": [
          "Understanding user behavior does not require invading personal privacy or loading bloated cookie tracking scripts. Lightweight, privacy-first analytics tools (like Plausible or PostHog) track key product events anonymously.",
          "Track the core founder funnel: Visit Homepage \u2192 View Problem Dossier \u2192 Click 'Submit Solution' \u2192 Complete Sign-Up \u2192 Publish Solution. Analyzing drop-off rates pinpoints UX friction."
        ]
      },
      {
        "id": "c3-s153",
        "sectionNumber": "15.3",
        "title": "Maintenance routines: dependencies, security audits and backups",
        "content": [
          "Software rot is a real phenomenon: third-party npm packages receive security vulnerability patches and deprecate legacy APIs constantly. Establish a disciplined bi-weekly maintenance cadence.",
          "Run `npm audit` to identify known Common Vulnerabilities and Exposures (CVEs), update packages cautiously, and verify that automated Firebase backups export database snapshots to secure Cloud Storage buckets."
        ],
        "points": [
          {
            "bold": "npm audit fix:",
            "text": "Automatically resolves minor patch-level security advisories in transitive dependencies."
          },
          {
            "bold": "Automated Backups:",
            "text": "Configure Cloud Functions or GCP Cloud Scheduler to trigger nightly Firestore document exports."
          },
          {
            "bold": "Incident Runbook:",
            "text": "Document clear step-by-step instructions for rollbacks, credential rotation, and user notification during outages."
          }
        ]
      },
      {
        "id": "c3-s154",
        "sectionNumber": "15.4",
        "title": "Chapter practice: error tracking and incident checklist",
        "content": [
          "Add a global React Error Boundary that renders a friendly recovery screen ('Something went wrong') with a 'Reload' button when unhandled component errors occur.",
          "Document an incident runbook outlining the exact steps to roll back a release and restore database backups."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "What is the purpose of a React Error Boundary?",
            "answer": "It catches JavaScript errors anywhere in its child component tree, logs the error, and displays a fallback UI instead of crashing the entire React application into a blank white screen."
          },
          {
            "question": "Why should database backups be automated to an independent storage bucket?",
            "answer": "To protect against accidental mass deletions, rogue scripts, or administrative errors by maintaining an immutable historical copy."
          }
        ]
      }
    ],
    "quiz": {
      "question": "What happens when an unhandled JavaScript exception occurs inside a React component without an Error Boundary?",
      "options": [
        {
          "key": "A",
          "label": "React automatically refreshes the browser page",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "The entire React component tree unmounts, leaving a blank white screen for the user",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "The browser displays a native alert dialog",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "The error is silently ignored and the user notices nothing",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Without an Error Boundary, unhandled rendering errors crash the React fiber tree, rendering a blank screen.",
      "feedbackIncorrect": "Review Section 15.4: Uncaught rendering errors unmount the whole UI tree unless caught by an Error Boundary."
    }
  },
  {
    "num": 16,
    "title": "Capstone Project: Production Cloud Platform",
    "shortTitle": "Capstone Project",
    "slug": "capstone-project",
    "sectionsCount": 5,
    "part": "Production & Capstone",
    "coverColor": "#1e3a8a",
    "subs": "Capstone brief \u00b7 Feature requirements \u00b7 Production quality standards \u00b7 Evaluation rubric \u00b7 Showcase",
    "lead": "Theory without execution is meaningless. In this capstone project, you synthesize all 16 previous chapters into a deployed, fully tested, and secure cloud web application solving a real validated problem.",
    "inThisChapter": "The comprehensive capstone brief \u00b7 Required core features and user flows \u00b7 Security, accessibility and testing standards \u00b7 Complete grading rubric \u00b7 Submitting your build to the Stuckhere Community Showcase",
    "practicePrompt": "Finalize your production application, run the full Playwright test suite, and submit your live URL to the Stuckhere registry.",
    "sections": [
      {
        "id": "c3-s161",
        "sectionNumber": "16.1",
        "title": "The capstone brief: build and ship a production problem solver",
        "content": [
          "Your mission is to build and deploy a production-grade problem discovery and resolution application. You may either build a verticalized platform for the specific market problem you validated in Course 1, or build an industry problem hub for a sector you care about (e.g. Healthcare, Retail, Agriculture).",
          "The application must be fully functional, deployed to a public URL on Vercel, connected to Cloud Firestore, protected by Security Rules, and powered by at least one AI copilot capability."
        ]
      },
      {
        "id": "c3-s162",
        "sectionNumber": "16.2",
        "title": "Required features and user flows",
        "content": [
          "To qualify for your Stuckhere Full-Stack Cloud Certification badge, your application must satisfy seven mandatory feature specifications.",
          "Each feature tests a distinct layer of the modern cloud web stack."
        ],
        "points": [
          {
            "bold": "1. Public Feed & Filters:",
            "text": "Responsive listing of verified problems with live text search and category filter pills."
          },
          {
            "bold": "2. Detailed Problem Dossier:",
            "text": "Individual problem pages rendering the validated Pain Score, customer quotes, and current workarounds."
          },
          {
            "bold": "3. Authentication & RBAC:",
            "text": "Sign-in with Google/Email supporting at least two distinct roles (Standard Member and Reviewer/Admin)."
          },
          {
            "bold": "4. Submission Flow:",
            "text": "Multi-step form allowing users to submit new problem statements with instant client validation."
          },
          {
            "bold": "5. Moderation Workflow:",
            "text": "A protected reviewer portal where pending submissions can be approved or rejected with notes."
          },
          {
            "bold": "6. AI Copilot Integration:",
            "text": "An AI-powered feature that synthesizes problem statements or drafts technical solution proposals."
          },
          {
            "bold": "7. Zero-Trust Security:",
            "text": "Tested Firestore security rules that prevent unauthorized writes and protect user roles."
          }
        ]
      },
      {
        "id": "c3-s163",
        "sectionNumber": "16.3",
        "title": "Quality, testing and accessibility requirements",
        "content": [
          "Engineering excellence is measured by quality and reliability, not just feature counts.",
          "Your build must pass five automated Playwright E2E tests, achieve Lighthouse scores above 85 in Performance, Accessibility, and Best Practices, feature zero unhandled console warnings, and support responsive viewports down to 360px mobile widths."
        ]
      },
      {
        "id": "c3-s164",
        "sectionNumber": "16.4",
        "title": "Grading rubric and evaluation criteria",
        "content": [
          "Submissions are evaluated on a 100-point scale across five balanced engineering pillars. A score of 75+ is required to earn the official Stuckhere Full-Stack Cloud Architect badge."
        ],
        "table": {
          "headers": [
            "Evaluation Pillar",
            "Points",
            "Evaluation Criteria"
          ],
          "rows": [
            {
              "label": "Functionality & Flow",
              "text": "25 pts",
              "text2": "All 7 required features work flawlessly end-to-end without crashes"
            },
            {
              "label": "Data & Cloud Security",
              "text": "25 pts",
              "text2": "Denormalized Firestore schema with rigorous security rules"
            },
            {
              "label": "Code Structure & Types",
              "text": "15 pts",
              "text2": "TypeScript strict mode, modular component hierarchy, custom hooks"
            },
            {
              "label": "UX & Accessibility",
              "text": "15 pts",
              "text2": "Tokenized Tailwind styling, light/dark themes, keyboard accessible"
            },
            {
              "label": "Testing & Deployment",
              "text": "20 pts",
              "text2": "5 passing Playwright E2E tests, automated CI/CD pipeline, public HTTPS URL"
            }
          ]
        }
      },
      {
        "id": "c3-s165",
        "sectionNumber": "16.5",
        "title": "Submitting to the Stuckhere Showcase",
        "content": [
          "Once your application is live on Vercel and your test suite passes, submit your project through the Stuckhere Academy Capstone Portal.",
          "Include your live public URL, GitHub repository link, and a 2-minute Loom screen demonstration. Outstanding capstone projects are featured on the Stuckhere homepage and connected directly with startup accelerators and angel sponsors."
        ]
      }
    ],
    "quiz": {
      "question": "What is the minimum passing score required on the Stuckhere Capstone Rubric to earn the Full-Stack Cloud Architect certification badge?",
      "options": [
        {
          "key": "A",
          "label": "50 points",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "75 points",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "95 points",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "100 points only",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! A score of 75/100 across the five engineering pillars certifies your production readiness.",
      "feedbackIncorrect": "Review Section 16.4: The passing threshold is 75 points across the five evaluation pillars."
    }
  },
  {
    "num": 17,
    "title": "Appendices, Glossaries & Production Checklists",
    "shortTitle": "Appendices & Checklists",
    "slug": "appendices-and-production-checklist",
    "sectionsCount": 7,
    "part": "Production & Capstone",
    "coverColor": "#334155",
    "subs": "Master terminology glossary \u00b7 Project starter checklist \u00b7 20-point security audit \u00b7 Cost estimation sheet \u00b7 FAQ",
    "lead": "Keep these reference appendices bookmarked. They contain the master developer glossary, setup commands, pre-flight security checklists, cost worksheets, and architectural FAQs for building cloud applications.",
    "inThisChapter": "Essential full-stack cloud terminology glossary \u00b7 Project starter commands and directory structure \u00b7 20-point pre-launch security checklist \u00b7 Interactive cloud cost worksheet \u00b7 Frequently asked engineering questions",
    "practicePrompt": "Audit your deployed application against the 20-point pre-launch security checklist before releasing to public traffic.",
    "sections": [
      {
        "id": "c3-s171",
        "sectionNumber": "17.1",
        "title": "Master full-stack cloud glossary",
        "content": [
          "Reference definitions for the core acronyms and concepts in modern cloud web engineering."
        ],
        "points": [
          {
            "bold": "SPA (Single-Page Application):",
            "text": "A web app that loads a single HTML page and dynamically updates content via client JavaScript without full page reloads."
          },
          {
            "bold": "SSR (Server-Side Rendering):",
            "text": "Rendering HTML pages on a server on each request before sending to the client."
          },
          {
            "bold": "CDN (Content Delivery Network):",
            "text": "A globally distributed network of edge cache servers delivering static assets close to users."
          },
          {
            "bold": "JWT (JSON Web Token):",
            "text": "A cryptographically signed, compact token asserting claims and identity."
          },
          {
            "bold": "RBAC (Role-Based Access Control):",
            "text": "Restricting system access to authorized users based on designated roles (e.g. member, reviewer, admin)."
          },
          {
            "bold": "Denormalization:",
            "text": "The intentional duplication of data in NoSQL databases to optimize read performance and minimize billable document queries."
          },
          {
            "bold": "E2E (End-to-End Testing):",
            "text": "Testing an entire software application from user interface to database in a real headless browser environment."
          },
          {
            "bold": "CI/CD:",
            "text": "Continuous Integration and Continuous Deployment; automating code testing, building, and deployment."
          }
        ]
      },
      {
        "id": "c3-s172",
        "sectionNumber": "17.2",
        "title": "Project starter checklist: first-day setup commands",
        "content": [
          "Commands to initialize a modern, production-ready full-stack cloud application with Vite, React, TypeScript, and Tailwind CSS."
        ],
        "templateBox": "# 1. Initialize Vite project with React + TypeScript\nnpm create vite@latest my-problem-app -- --template react-ts\ncd my-problem-app\n\n# 2. Install dependencies\nnpm install firebase lucide-react react-router-dom\nnpm install -D tailwindcss postcss autoprefixer vitest @playwright/test\nnpx tailwindcss init -p\n\n# 3. Configure git and start dev server\ngit init\ngit add .\ngit commit -m \"chore: initial project scaffold\"\nnpm run dev"
      },
      {
        "id": "c3-s173",
        "sectionNumber": "17.3",
        "title": "The 20-point pre-launch security checklist",
        "content": [
          "Before launching your application to public users and search engines, verify these 20 critical security safeguards."
        ],
        "points": [
          {
            "bold": "1. Zero Secret Leaks:",
            "text": "No AI API keys, Stripe secret keys, or service account credentials committed to git."
          },
          {
            "bold": "2. Rules Active:",
            "text": "Firestore security rules deployed; no collections have open `allow read, write: if true;` rules."
          },
          {
            "bold": "3. Role Immutability:",
            "text": "Rules strictly prevent users from modifying their own `role` or `author.uid` fields."
          },
          {
            "bold": "4. Field Validation:",
            "text": "Rules assert string types and maximum lengths on user input fields."
          },
          {
            "bold": "5. Query Limits:",
            "text": "All client queries include explicit `limit()` constraints to prevent runaway reads."
          },
          {
            "bold": "6. HTTPS Enforced:",
            "text": "HTTP automatically redirects to HTTPS with HSTS headers."
          },
          {
            "bold": "7. CSP Configured:",
            "text": "Content-Security-Policy headers restrict script execution sources."
          },
          {
            "bold": "8. Auth Persistence:",
            "text": "Firebase session persistence verified across browser restarts and multiple tabs."
          },
          {
            "bold": "9. Budget Alerts:",
            "text": "GCP Cloud Billing budget alerts active at $10 and $50 thresholds."
          }
        ]
      },
      {
        "id": "c3-s174",
        "sectionNumber": "17.4",
        "title": "Cloud infrastructure cost estimation worksheet",
        "content": [
          "Use this worksheet to model your operational expenses as your application scales from early pilot to commercial traction."
        ],
        "table": {
          "headers": [
            "Metric",
            "Early Pilot (100 DAU)",
            "Growth (1,000 DAU)",
            "Scale (10,000 DAU)"
          ],
          "rows": [
            {
              "label": "Daily Document Reads",
              "text": "1,300 reads / day",
              "text2": "13,000 reads / day",
              "highlight": false
            },
            {
              "label": "Daily Document Writes",
              "text": "100 writes / day",
              "text2": "1,000 writes / day",
              "highlight": false
            },
            {
              "label": "Firestore Monthly Cost",
              "text": "$0.00 (Free Tier)",
              "text2": "$0.00 (Free Tier)",
              "highlight": true
            },
            {
              "label": "Vercel Hosting Cost",
              "text": "$0.00 (Hobby Plan)",
              "text2": "$0.00 (Hobby Plan)",
              "highlight": true
            },
            {
              "label": "AI Inference Costs",
              "text": "< $1.00 / month",
              "text2": "$8.00 / month",
              "highlight": false
            },
            {
              "label": "Total Infrastructure Bill",
              "text": "< $1.00 / mo",
              "text2": "< $10.00 / mo",
              "highlight": true
            }
          ]
        }
      },
      {
        "id": "c3-s175",
        "sectionNumber": "17.5",
        "title": "Master certification quiz bank",
        "content": [
          "A comprehensive 10-question self-test assessing your full-stack cloud architectural readiness."
        ],
        "points": [
          {
            "bold": "Q1:",
            "text": "Why must AI API keys stay on a backend service? (A: Browsers expose all client code and environment variables to users)."
          },
          {
            "bold": "Q2:",
            "text": "What is the primary formula for Firestore billing? (A: Total document reads, writes, and deletes metered per operation)."
          },
          {
            "bold": "Q3:",
            "text": "How do you prevent N+1 queries in Firestore? (A: Denormalize author information directly onto problem records)."
          },
          {
            "bold": "Q4:",
            "text": "What does box-sizing: border-box do? (A: Includes padding and borders in element width/height calculations)."
          },
          {
            "bold": "Q5:",
            "text": "What is the advantage of getCountFromServer? (A: Computes aggregate document counts on the server for a single read operation)."
          }
        ]
      },
      {
        "id": "c3-s176",
        "sectionNumber": "17.6",
        "title": "Curated documentation and deep reading",
        "content": [
          "Essential official references to deepen your engineering mastery:"
        ],
        "points": [
          {
            "bold": "React Official Docs (react.dev):",
            "text": "The authoritative guide to modern hooks, state lifting, and component lifecycles."
          },
          {
            "bold": "Cloud Firestore Guide (firebase.google.com/docs/firestore):",
            "text": "In-depth indexing, transaction rules, and security syntax reference."
          },
          {
            "bold": "Playwright Automation (playwright.dev):",
            "text": "Comprehensive browser automation testing guides, assertions, and CI recipes."
          },
          {
            "bold": "Vite Build Tooling (vitejs.dev):",
            "text": "Deep dive into Rollup bundling, code splitting, and asset optimization."
          }
        ]
      },
      {
        "id": "c3-s177",
        "sectionNumber": "17.7",
        "title": "Production engineering FAQ",
        "content": [
          "Answers to the most frequently asked questions by engineers building full-stack cloud applications."
        ],
        "subheading": "Check yourself",
        "detailsQuestions": [
          {
            "question": "Do I need a custom backend if I use Firebase?",
            "answer": "Not for standard CRUD operations and user profiles, which Firestore and Security Rules handle directly. You only need a backend (like FastAPI or Cloud Functions) for private API keys, payment webhooks, or heavy AI generation."
          },
          {
            "question": "Is NoSQL always cheaper than SQL?",
            "answer": "NoSQL is vastly cheaper and often completely free at low-to-medium volumes due to zero fixed server hosting fees. However, poorly designed schemas with un-indexed queries or N+1 reads can become expensive at massive scale."
          },
          {
            "question": "How do I prevent users from editing their own roles in Firestore?",
            "answer": "In Firestore security rules, enforce that request.resource.data.role == resource.data.role on updates, or manage roles via cryptographically signed custom claims set exclusively by the Firebase Admin SDK."
          }
        ]
      }
    ],
    "quiz": {
      "question": "Which security measure guarantees that client users cannot tamper with their assigned role or administrative permissions?",
      "options": [
        {
          "key": "A",
          "label": "Storing the role in browser localStorage",
          "isCorrect": false
        },
        {
          "key": "B",
          "label": "Using Firestore security rules that require request.auth.token.role == 'admin' set by the Firebase Admin SDK",
          "isCorrect": true
        },
        {
          "key": "C",
          "label": "Hiding the admin navigation link with CSS",
          "isCorrect": false
        },
        {
          "key": "D",
          "label": "Encrypting the client-side JavaScript bundle",
          "isCorrect": false
        }
      ],
      "feedbackCorrect": "Correct! Cryptographically signed custom claims verified in Security Rules provide unshakeable role enforcement.",
      "feedbackIncorrect": "Review Section 17.3: Security must be verified via Firebase custom claims and Security Rules, never client storage."
    }
  }
];
