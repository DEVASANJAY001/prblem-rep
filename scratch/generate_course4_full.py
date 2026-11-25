# -*- coding: utf-8 -*-
import json
import re

with open('scratch/parsed_course4_raw.json', 'r', encoding='utf-8') as f:
    raw_chapters = json.load(f)

# Chapter metadata dictionary with tailored leads, shortTitles, quizzes, and callouts
CHAPTER_META = {
    0: {
        "shortTitle": "Course Overview",
        "slug": "course-overview",
        "lead": "A verified and sized problem still requires a thoughtful, user-validated solution. This subject guides you through the human-centered methodology of turning pain points into wireframes, clickable prototypes, scoped MVPs, and converted customer pilots.",
        "inThisChapter": "The 5-stage solver roadmap · Transitioning from problem discovery to product design · Prerequisites and tools · The capstone portfolio project",
        "practicePrompt": "Select one validated problem from the Stuckhere open directory to serve as your case study throughout this course.",
        "quiz": {
            "question": "What is the primary danger of jumping straight into full-scale software development immediately after validating a problem?",
            "options": [
                {"key": "A", "label": "Building complex features that users do not actually need or use in their daily workflow", "isCorrect": True},
                {"key": "B", "label": "Cloud hosting costs automatically triple on day one", "isCorrect": False},
                {"key": "C", "label": "You cannot file for trademark protection without wireframes", "isCorrect": False},
                {"key": "D", "label": "No-code tools refuse to connect to SQL databases", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! Without human-centered prototyping and MVP testing, teams routinely waste months engineering features that solve secondary issues rather than core bottlenecks.",
            "feedbackIncorrect": "Review Section 0.1: The main risk of rushing past solution design is building unnecessary features that real operators won't adopt."
        }
    },
    1: {
        "shortTitle": "Human-Centered Mindset",
        "slug": "human-centered-mindset",
        "lead": "Technology is only valuable when it improves a human's lived experience or workplace outcome. Human-centered design prevents builders from falling in love with clever technology rather than practical utility.",
        "inThisChapter": "Why technology-first approaches fail · The 4 core principles of HCD · The Double Diamond model · Designing within strict real-world constraints",
        "practicePrompt": "Audit one digital product you use weekly. Identify two features that feel engineered for demos rather than real human workflows.",
        "quiz": {
            "question": "In the Double Diamond design framework, what does the first diamond represent?",
            "options": [
                {"key": "A", "label": "Coding the frontend and backend simultaneously", "isCorrect": False},
                {"key": "B", "label": "Diverging and converging to ensure you are solving the right problem before creating solutions", "isCorrect": True},
                {"key": "C", "label": "Securing seed funding before hiring engineers", "isCorrect": False},
                {"key": "D", "label": "Running two parallel marketing campaigns", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! The first diamond focuses on discovering and defining the genuine human problem before designing any answers.",
            "feedbackIncorrect": "Review Section 1.3: The first diamond diverts and converges on understanding the right problem."
        }
    },
    2: {
        "shortTitle": "Understanding Users",
        "slug": "understanding-users-deeply",
        "lead": "Great design starts with empathy grounded in hard observational evidence. Learn how to shadow operators, extract behavioral patterns, construct evidence-based personas, and map the user's emotional journey.",
        "inThisChapter": "Extracting design cues from discovery interviews · Shadowing and contextual inquiry · Evidence-based personas vs fictional stereotypes · Jobs To Be Done (JTBD) framing",
        "practicePrompt": "Create a persona card and a 5-stage customer journey map with emotional highs and lows for your target problem.",
        "quiz": {
            "question": "Which component is essential in an evidence-based user persona?",
            "options": [
                {"key": "A", "label": "A fictional stock photo and imaginary celebrity hobbies", "isCorrect": False},
                {"key": "B", "label": "Observable workplace behaviors, concrete pain triggers, and tech comfort verified by interview data", "isCorrect": True},
                {"key": "C", "label": "An astrology sign and favorite color", "isCorrect": False},
                {"key": "D", "label": "The user's personal political opinions", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Personas must synthesize real behavioral data and verifiable operational context, not superficial creative fiction.",
            "feedbackIncorrect": "Review Section 2.3: Evidence-based personas document real behaviors, environmental barriers, and concrete frustrations."
        }
    },
    3: {
        "shortTitle": "Framing Challenge",
        "slug": "framing-the-design-challenge",
        "lead": "A problem well-stated is a problem half-solved. Transform raw discovery findings into actionable How Might We statements, establish measurable success criteria, and write an airtight one-page design brief.",
        "inThisChapter": "Affinity mapping and pattern synthesis · The Five Whys for root-cause isolation · Crafting calibrated How Might We questions · Writing the one-page design brief",
        "practicePrompt": "Draft 5 How Might We questions for your problem, choose the single best one, and write a one-page design brief.",
        "quiz": {
            "question": "What is the key characteristic of an effective 'How Might We' (HMW) statement?",
            "options": [
                {"key": "A", "label": "It specifies the exact software technology and database schema upfront", "isCorrect": False},
                {"key": "B", "label": "It is broad enough to allow creative exploration but narrow enough to provide clear boundary conditions", "isCorrect": True},
                {"key": "C", "label": "It contains at least three legal disclaimers", "isCorrect": False},
                {"key": "D", "label": "It can be answered with a simple 'Yes' or 'No'", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! A well-framed HMW strikes the sweet spot: inspiring multiple potential solutions while keeping the team grounded in the validated friction.",
            "feedbackIncorrect": "Review Section 3.3: Good HMW questions avoid prescribing a specific tool while keeping the scope tightly focused on the pain point."
        }
    },
    4: {
        "shortTitle": "Ideation Techniques",
        "slug": "ideation-techniques",
        "lead": "Quantity breeds quality. Break out of obvious, incremental thinking using structured ideation frameworks like Crazy 8s, SCAMPER, cross-industry analogies, and AI-assisted solution blueprinting.",
        "inThisChapter": "Psychological safety and deferral of judgement · Crazy 8s rapid sketching · SCAMPER mutation method · Architectural solution archetypes · AI copilot ideation prompts",
        "practicePrompt": "Run a 10-minute Crazy 8s sketching sprint for your chosen design brief. Generate 8 distinct visual concept sketches.",
        "quiz": {
            "question": "What is the foundational rule during the initial divergence phase of solution ideation?",
            "options": [
                {"key": "A", "label": "Critique every flaw immediately to save time", "isCorrect": False},
                {"key": "B", "label": "Defer judgement and maximize the quantity and variety of ideas first", "isCorrect": True},
                {"key": "C", "label": "Calculate financial ROI before sketching an idea", "isCorrect": False},
                {"key": "D", "label": "Only accept ideas that use generative AI", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Premature evaluation kills radical innovation. Generate volume and diversity before applying evaluation filters.",
            "feedbackIncorrect": "Review Section 4.1: The primary ground rule of ideation is deferring judgement to produce maximum volume and variety."
        }
    },
    5: {
        "shortTitle": "Choosing What to Build",
        "slug": "choosing-what-to-build",
        "lead": "You cannot build everything at once. Use rigorous prioritisation frameworks like RICE, MoSCoW, and the Impact-Effort matrix to filter candidate ideas and isolate your riskiest unproven assumptions.",
        "inThisChapter": "The true cost of building the wrong feature · Impact vs Effort mapping · RICE scoring formulas · Riskiest Assumption Testing (RAT) across desirability, feasibility, viability",
        "practicePrompt": "Score 5 solution concepts using the RICE matrix (Reach × Impact × Confidence / Effort) and rank them objectively.",
        "quiz": {
            "question": "In the RICE scoring model, how is the final priority score calculated?",
            "options": [
                {"key": "A", "label": "(Reach + Impact + Confidence) / Effort", "isCorrect": False},
                {"key": "B", "label": "(Reach × Impact × Confidence) / Effort", "isCorrect": True},
                {"key": "C", "label": "Effort / (Reach × Impact)", "isCorrect": False},
                {"key": "D", "label": "Revenue × Cost × Engineers", "isCorrect": False}
            ],
            "feedbackCorrect": "Exactly right! (Reach × Impact × Confidence) / Effort balances scale, magnitude, and certainty against implementation cost.",
            "feedbackIncorrect": "Review Section 5.2: The RICE formula multiplies Reach, Impact, and Confidence, then divides the product by Effort."
        }
    },
    6: {
        "shortTitle": "User Flows & Wireframes",
        "slug": "user-flows-and-wireframes",
        "lead": "Translate prioritized features into clear step-by-step screen sequences. Master low-fidelity wireframing, information architecture, cognitive load reduction, and MNC accessibility guidelines.",
        "inThisChapter": "Information architecture hierarchy · Happy path and edge case flowcharts · Low-fidelity paper and digital wireframing · WCAG 2.1 AA accessibility and light theme design tokens",
        "practicePrompt": "Map the 4-step user flow of your core action and draw low-fidelity wireframes for the two primary screens.",
        "quiz": {
            "question": "Why should initial wireframes be created in low fidelity (grayscale, basic boxes) rather than pixel-perfect color designs?",
            "options": [
                {"key": "A", "label": "Because designers do not know what colors look good", "isCorrect": False},
                {"key": "B", "label": "It keeps feedback focused on structure, hierarchy, and flow rather than aesthetic minutiae", "isCorrect": True},
                {"key": "C", "label": "Low-fidelity wireframes load faster in web browsers", "isCorrect": False},
                {"key": "D", "label": "It is required by international patent treaties", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! Low-fidelity wireframes prevent premature debates about button colors and fonts, focusing stakeholder attention on workflow logic.",
            "feedbackIncorrect": "Review Section 6.3: Grayscale wireframing centers discussion on user goals, information hierarchy, and navigation flow."
        }
    },
    7: {
        "shortTitle": "Prototyping",
        "slug": "prototyping-methods",
        "lead": "If a picture is worth a thousand words, a prototype is worth a thousand meetings. Learn how to construct clickable Figma prototypes, paper simulations, and interactive mockups in rapid 14-day sprint cycles.",
        "inThisChapter": "The Prototype Fidelity Ladder · Clickable Figma interactions · Wizard of Oz and concierge testing · Planning the 14-day sprint roadmap",
        "practicePrompt": "Connect your 4 wireframe screens into a clickable prototype link with interactive tap/click transitions.",
        "quiz": {
            "question": "What defines a 'Wizard of Oz' prototype?",
            "options": [
                {"key": "A", "label": "A fully automated backend built in Python", "isCorrect": False},
                {"key": "B", "label": "A front-end interface that appears automated to the user but is operated manually behind the scenes by a human", "isCorrect": True},
                {"key": "C", "label": "A 3D virtual reality simulation of a computer", "isCorrect": False},
                {"key": "D", "label": "A mobile application designed exclusively for tablets", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! The Wizard of Oz method validates whether users find the automated value proposition compelling before engineering the complex backend.",
            "feedbackIncorrect": "Review Section 7.2: A Wizard of Oz prototype simulates automated logic manually to test user appetite cheaply."
        }
    },
    8: {
        "shortTitle": "Defining the MVP",
        "slug": "defining-the-mvp",
        "lead": "An MVP is not a half-baked product; it is the smallest complete package of functionality that delivers real customer value. Learn how to scope ruthlessly, decide build vs buy, and timebox development.",
        "inThisChapter": "The true definition of an MVP (Earliest Testable Product) · The skateboard-to-car metaphor · Build vs Buy vs Borrow matrix · 14-day technical timeboxing",
        "practicePrompt": "List all features you initially envisioned for your product. Cut 70% of them to establish your strict Day 1 MVP scope.",
        "quiz": {
            "question": "According to Henrik Kniberg's classic MVP metaphor, what is the correct way to iteratively build toward a car?",
            "options": [
                {"key": "A", "label": "Build a single tire, then an axle, then a chassis, then a car", "isCorrect": False},
                {"key": "B", "label": "Build a skateboard, then a scooter, then a bicycle, then a motorcycle, then a car", "isCorrect": True},
                {"key": "C", "label": "Build an entire car in secret over 5 years", "isCorrect": False},
                {"key": "D", "label": "Purchase a Ferrari and rebadge it", "isCorrect": False}
            ],
            "feedbackCorrect": "Brilliant! Every iteration must be a self-contained, working transportation solution that delivers immediate utility and generates user feedback.",
            "feedbackIncorrect": "Review Section 8.1: A true MVP delivers functional end-to-end value at each stage (skateboard -> bike -> car)."
        }
    },
    9: {
        "shortTitle": "Usability Testing",
        "slug": "usability-testing",
        "lead": "Watching 5 real users interact with your prototype reveals 85% of usability bottlenecks. Learn how to write unbiased test scripts, run think-aloud test sessions, and measure task completion rates.",
        "inThisChapter": "Jakob Nielsen's 5-user rule · Think-aloud testing protocol · Writing task-based scenario prompts · System Usability Scale (SUS) benchmarking · Synthesizing feedback into rapid design fixes",
        "practicePrompt": "Conduct a 20-minute usability test with one peer using your clickable prototype. Note 3 moments of hesitation or confusion.",
        "quiz": {
            "question": "What is the single most important rule when facilitating a think-aloud usability testing session?",
            "options": [
                {"key": "A", "label": "Explain to the user how clever the software is whenever they get stuck", "isCorrect": False},
                {"key": "B", "label": "Remain silent, observe the user's natural struggles, and ask them to verbalize their thoughts without leading them", "isCorrect": True},
                {"key": "C", "label": "Fill in the form fields for them so the test finishes faster", "isCorrect": False},
                {"key": "D", "label": "Argue with the user if they click the wrong button", "isCorrect": False}
            ],
            "feedbackCorrect": "Exactly right! Facilitators must never defend or explain the design; your only job is to observe where the interface fails to communicate intuitively.",
            "feedbackIncorrect": "Review Section 9.3: Keep quiet, avoid leading questions, and prompt the user to speak their thoughts aloud."
        }
    },
    10: {
        "shortTitle": "Running a Pilot",
        "slug": "running-a-pilot",
        "lead": "A prototype tests usability; a pilot tests real operational commitment. Learn how to secure design partners, draft a mutually protective pilot agreement, manage the 30-day live test, and convert pilots into paid contracts.",
        "inThisChapter": "Design partner recruitment criteria · The 3-part pilot proposal · Non-disclosure and data privacy fundamentals · Weekly operational cadences · Conversion criteria into paid annual contracts",
        "practicePrompt": "Draft a one-page Pilot Agreement Letter outlining customer responsibilities, launch dates, and success criteria for conversion.",
        "quiz": {
            "question": "What must be established BEFORE kicking off an enterprise or SMB product pilot?",
            "options": [
                {"key": "A", "label": "A multimillion-dollar insurance policy", "isCorrect": False},
                {"key": "B", "label": "Objective, quantifiable success criteria that define when the pilot converts into a commercial engagement", "isCorrect": True},
                {"key": "C", "label": "A television advertising campaign", "isCorrect": False},
                {"key": "D", "label": "The founder's personal guarantee of 100% uptime", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! An unstructured pilot becomes endless free consulting. Define success benchmarks upfront that trigger commercial conversion.",
            "feedbackIncorrect": "Review Section 10.3: Never start a pilot without mutually agreed metrics that trigger paid conversion upon completion."
        }
    },
    11: {
        "shortTitle": "Measuring Product Success",
        "slug": "measuring-product-success",
        "lead": "Vanity metrics make you feel good; actionable product metrics keep your company alive. Understand the difference between activation, retention cohorts, engagement loops, and net promoter economics.",
        "inThisChapter": "The Pirate Metrics framework (AARRR) · North Star Metric identification · Measuring weekly cohort retention curves · Qualitative customer feedback loops · Continuous A/B experimentation",
        "practicePrompt": "Define the single North Star Metric for your product and identify the 3 leading input metrics that drive it.",
        "quiz": {
            "question": "Which metric is the single most definitive indicator of genuine Product-Market Fit (PMF)?",
            "options": [
                {"key": "A", "label": "Total cumulative user signups since launch", "isCorrect": False},
                {"key": "B", "label": "A flattening cohort retention curve where a stable percentage of users continue using the product month after month", "isCorrect": True},
                {"key": "C", "label": "The number of followers on the company's social media page", "isCorrect": False},
                {"key": "D", "label": "The number of media press releases published", "isCorrect": False}
            ],
            "feedbackCorrect": "Precisely! Retention is the ultimate proof of value. If users stop returning after day 30, no amount of marketing can save the product.",
            "feedbackIncorrect": "Review Section 11.2: A flat cohort retention curve proves that users derive sustained, recurring value from the product."
        }
    },
    12: {
        "shortTitle": "Teamwork & Hackathons",
        "slug": "teamwork-and-hackathon-execution",
        "lead": "Building great products is a team sport. Learn how to divide roles effectively across Product, Design, and Engineering, coordinate rapid 24-48 hour hackathon sprints, and execute multi-week acceleration programs.",
        "inThisChapter": "The Hacker/Hustler/Hipster trio · Clear division of ownership and decision rights · Rapid 24-hour sprint milestones · Managing burnout and feature creep during competitions",
        "practicePrompt": "Create a 48-hour sprint milestone schedule allocating specific 4-hour build blocks for design, frontend, and demo preparation.",
        "quiz": {
            "question": "During a high-stakes 48-hour hackathon or startup sprint, when should the team finalize the live product demo script?",
            "options": [
                {"key": "A", "label": "5 minutes before presenting to the judges", "isCorrect": False},
                {"key": "B", "label": "At the halfway mark (Hour 24), so that engineering focuses only on screens shown in the demo", "isCorrect": True},
                {"key": "C", "label": "After the competition has concluded", "isCorrect": False},
                {"key": "D", "label": "Demo scripts are completely unnecessary for good coders", "isCorrect": False}
            ],
            "feedbackCorrect": "Exactly! Locking the demo story early prevents teams from wasting hours coding back-office settings screens that judges will never inspect.",
            "feedbackIncorrect": "Review Section 12.3: Finalizing the demo narrative midway ensures all engineering effort is focused directly on the winning presentation."
        }
    },
    13: {
        "shortTitle": "Pitching & Demos",
        "slug": "pitching-and-demonstrating",
        "lead": "A brilliant solution poorly demonstrated will lose to an average solution pitched with clarity and conviction. Master the 10-slide narrative arc, execute bulletproof live demos, and handle hostile judge Q&A with poise.",
        "inThisChapter": "The 3-act narrative pitch structure · The 10-slide investor & judge deck · Bulletproof live demo guidelines · Handling tough Q&A without defensiveness",
        "practicePrompt": "Record a 3-minute video pitch demonstrating your prototype, following the Problem -> Solution -> Proof -> Next Steps format.",
        "quiz": {
            "question": "What is the recommended fallback strategy for a live software demonstration during an investor pitch or demo day?",
            "options": [
                {"key": "A", "label": "Apologize repeatedly and attempt to debug live on the projector", "isCorrect": False},
                {"key": "B", "label": "Have an offline, pre-recorded high-resolution video walkthrough ready to play with one keystroke", "isCorrect": True},
                {"key": "C", "label": "Blame the conference venue's Wi-Fi network and walk off stage", "isCorrect": False},
                {"key": "D", "label": "Refuse to show any software until contracts are signed", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Live conference Wi-Fi fails frequently. Experienced founders always maintain an offline backup screencast ready to play instantly.",
            "feedbackIncorrect": "Review Section 13.3: Always carry an offline 60-second backup video to guarantee your pitch succeeds even if networks crash."
        }
    },
    14: {
        "shortTitle": "Open Innovation",
        "slug": "open-innovation-and-sponsors",
        "lead": "Enterprises and venture studios post real friction points to source innovative solutions. Learn how to decode challenge briefs, align with corporate sponsor priorities, and license or spin out your venture.",
        "inThisChapter": "How open innovation programs operate · Deconstructing corporate problem briefs · Crafting winning competition proposals · Post-challenge IP licensing and venture incubation",
        "practicePrompt": "Review an active corporate problem brief on Stuckhere and list 3 specific sponsor priorities you would highlight in your submission.",
        "quiz": {
            "question": "What is the primary motivation for global corporations to run open innovation competitions and problem bounty programs?",
            "options": [
                {"key": "A", "label": "They lack computers in their own offices", "isCorrect": False},
                {"key": "B", "label": "To access agile, unconstrained external talent that can prototype solutions faster than internal corporate bureaucracies", "isCorrect": True},
                {"key": "C", "label": "To avoid paying software licenses", "isCorrect": False},
                {"key": "D", "label": "To fill empty conference rooms", "isCorrect": False}
            ],
            "feedbackCorrect": "Exactly! Large organizations sponsor problem challenges to discover disruptive approaches that internal corporate silos struggle to incubate.",
            "feedbackIncorrect": "Review Section 14.1: Sponsors leverage open innovation to discover breakthrough thinking unencumbered by legacy corporate processes."
        }
    },
    15: {
        "shortTitle": "Responsible Design",
        "slug": "responsible-and-inclusive-design",
        "lead": "Design decisions carry ethical weight. Learn how to protect vulnerable user data, avoid algorithmic bias, design for low-connectivity environments, and adhere to international privacy regulations.",
        "inThisChapter": "Ethical product frameworks · Data minimization and privacy by design (GDPR/DPDP) · Mitigating bias in AI-driven decisions · Designing for low-bandwidth and multilingual contexts",
        "practicePrompt": "Conduct an ethical risk audit for your solution. Identify one potential unintended consequence and document a mitigation safeguard.",
        "quiz": {
            "question": "What does the principle of 'Data Minimization' require in software product design?",
            "options": [
                {"key": "A", "label": "Storing all customer data on small USB drives", "isCorrect": False},
                {"key": "B", "label": "Collecting and storing only the specific data strictly necessary to deliver the immediate user value", "isCorrect": True},
                {"key": "C", "label": "Deleting all database records every 24 hours", "isCorrect": False},
                {"key": "D", "label": "Hiding user profiles from search engines", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Data you do not hold cannot be leaked or misused. Responsible design minimizes collection to what is essential for user utility.",
            "feedbackIncorrect": "Review Section 15.2: Data minimization mandates collecting only what is strictly necessary to fulfill the intended function."
        }
    },
    16: {
        "shortTitle": "Capstone Project",
        "slug": "capstone-project",
        "lead": "Apply the complete 17-chapter curriculum to build, test, and publish a comprehensive Solution Dossier and prototype for a verified problem from the Stuckhere open registry.",
        "inThisChapter": "Comprehensive capstone brief · Required deliverables: Persona, HMW, Clickable Prototype, Pilot Plan · 100-point grading rubric · Publishing to the Stuckhere showcase",
        "practicePrompt": "Compile your user research, wireframes, prototype link, and pilot metrics into your final Capstone Solution Dossier.",
        "quiz": {
            "question": "Which artifact is NOT a mandatory requirement for the Stuckhere Academy Course 4 Capstone submission?",
            "options": [
                {"key": "A", "label": "An evidence-grounded user persona and journey map", "isCorrect": False},
                {"key": "B", "label": "A clickable interactive prototype link (Figma or web application)", "isCorrect": False},
                {"key": "C", "label": "A signed multimillion-dollar venture capital term sheet", "isCorrect": True},
                {"key": "D", "label": "A structured Pilot Proposal with measurable success criteria", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! While commercial traction is wonderful, the capstone grades your methodology: empathy, framing, prototyping, and testing rigor.",
            "feedbackIncorrect": "Review Section 16.2: The capstone requires personas, prototypes, and pilot plans—venture capital term sheets are not a prerequisite!"
        }
    },
    17: {
        "shortTitle": "Appendices & Templates",
        "slug": "appendices-and-templates",
        "lead": "A permanent reference library of product design templates, wireframe cheat sheets, pilot contracts, usability test scripts, and the master FAQ.",
        "inThisChapter": "Complete Product & Design Glossary · Ready-to-use Figma and Notion templates · The One-Page Solution Cheat Sheet · Master Quiz Bank and FAQ",
        "practicePrompt": "Bookmark this reference chapter to access production templates whenever you kick off a new venture build.",
        "quiz": {
            "question": "What is the primary benefit of maintaining standard design and testing templates across all product experiments?",
            "options": [
                {"key": "A", "label": "It eliminates the need to interview any users", "isCorrect": False},
                {"key": "B", "label": "It enforces consistent rigor, speeds up execution cycles, and allows apples-to-apples comparison of ideas", "isCorrect": True},
                {"key": "C", "label": "It guarantees that software will never contain bugs", "isCorrect": False},
                {"key": "D", "label": "It automatically files patents in all 50 US states", "isCorrect": False}
            ],
            "feedbackCorrect": "Brilliant! Standardized templates accelerate testing velocity while ensuring no critical discovery or validation step is forgotten.",
            "feedbackIncorrect": "Review Section 17.2: Standard templates enforce rigorous quality and eliminate friction when kicking off new build sprints."
        }
    }
}

print("Loaded CHAPTER_META for all 18 chapters.")
