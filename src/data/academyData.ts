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
import { COURSE_6_PARTS, COURSE_6_CHAPTERS } from "./course6Data";
export { COURSE_3_PARTS, COURSE_3_CHAPTERS, COURSE_4_PARTS, COURSE_4_CHAPTERS, COURSE_5_PARTS, COURSE_5_CHAPTERS, COURSE_6_PARTS, COURSE_6_CHAPTERS };

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
  {
    id: "course-6",
    n: 6,
    slug: "startup-fundamentals",
    title: "Startup Fundamentals",
    level: "Founder",
    live: true,
    meta: "18 chapters · 104 sections",
    chaptersCount: 18,
    sectionsCount: 104,
    description: "Turn a validated prototype into a sustainable, scalable venture. Master business models, founder equity, legal setups, runway modeling, sales pipelines, and investor fundraising.",
    parts: COURSE_6_PARTS,
  },
];

import { COURSE_1_CHAPTERS } from "./course1Data";
import { COURSE_2_CHAPTERS } from "./course2Data";

export { COURSE_1_CHAPTERS, COURSE_2_CHAPTERS };

export const ACADEMY_CHAPTERS: AcademyChapter[] = COURSE_1_CHAPTERS;

export const ACADEMY_MODULES = ACADEMY_COURSES;

export function getCourse(slugOrId?: string): AcademyCourse {
  if (!slugOrId) return ACADEMY_COURSES[0];
  const cleaned = slugOrId.toLowerCase().trim();
  const found = ACADEMY_COURSES.find(
    (c) =>
      c.slug.toLowerCase() === cleaned ||
      c.id.toLowerCase() === cleaned ||
      ((cleaned.includes("startup") || cleaned.includes("fundamental")) && c.id === "course-6") ||
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
  if (cleaned.includes("startup") || cleaned.includes("fundamental") || cleaned === "course-6") {
    return COURSE_6_CHAPTERS;
  }
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
  if (cleaned.includes("startup") || cleaned.includes("fundamental") || cleaned === "course-6") {
    return COURSE_6_PARTS;
  }
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
