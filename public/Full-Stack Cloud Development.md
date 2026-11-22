# Full-Stack Cloud Development

*Stuckhere Academy, Subject 3: build, secure, ship and scale the solution to a verified problem*

## Chapter 0: Course Overview

### 0.1 What This Subject Covers

#### 0.1.1 The one-line idea

Once a problem is verified and sized, you need to build something real. This subject teaches the full path from browser to database to deployment, using the same modern stack that powers Stuckhere itself.

#### 0.1.2 What you will be able to do

- Build a responsive React and TypeScript front end
- Design a Firestore data model that stays fast and cheap
- Add secure sign-in, roles and database rules
- Connect an AI model to power a copilot feature
- Test, deploy and monitor your app

### 0.2 The Stack at a Glance

#### 0.2.1 Front end: React, TypeScript, Vite, Tailwind CSS

#### 0.2.2 Back end and data: Firebase Auth, Cloud Firestore, optional FastAPI service

#### 0.2.3 AI layer: Claude or Gemini models through an API

#### 0.2.4 Hosting and delivery: Vercel

#### 0.2.5 Quality: Playwright end-to-end tests

### 0.3 Prerequisites

#### 0.3.1 Basic programming (variables, loops, functions)

#### 0.3.2 Subjects 1 and 2 recommended (you build for a validated problem)

### 0.4 How to Use This Material

#### 0.4.1 Suggested path (20 to 30 hours with practice)

#### 0.4.2 Chapter format: Concept, Code, Exercise, Checkpoint Quiz

#### 0.4.3 Building one running project across all chapters

## Chapter 1: The Big Picture of a Cloud Web App

### 1.1 How the Web Works

#### 1.1.1 Browser, server, request and response

#### 1.1.2 HTTP methods, status codes and headers

#### 1.1.3 DNS, domains and HTTPS

### 1.2 What "Full-Stack" Means

#### 1.2.1 Front end, back end, database

#### 1.2.2 Client-side vs. server-side rendering

#### 1.2.3 Serverless and managed services

### 1.3 Architecture of a Problem Platform

#### 1.3.1 A browser app that talks directly to managed services

#### 1.3.2 Where a custom API service is still needed

#### 1.3.3 Data flow diagram: user, app, auth, database, AI

### 1.4 Choosing Tools as a Beginner

#### 1.4.1 Boring and popular beats new and clever

#### 1.4.2 Free tiers and cost awareness

### 1.5 Chapter Practice

#### 1.5.1 Exercise: draw the architecture for your own problem solution

#### 1.5.2 Checkpoint quiz

## Chapter 2: Front-End Foundations

### 2.1 HTML

#### 2.1.1 Semantic elements (header, main, section, article, nav)

#### 2.1.2 Forms and inputs

#### 2.1.3 Accessibility basics (labels, alt text, keyboard focus)

### 2.2 CSS

#### 2.2.1 Box model, flexbox and grid

#### 2.2.2 Responsive design and breakpoints

#### 2.2.3 Colour, typography and spacing

### 2.3 JavaScript Essentials

#### 2.3.1 Variables, functions, arrays and objects

#### 2.3.2 Modules (import and export)

#### 2.3.3 Async code: promises and async/await

#### 2.3.4 Fetching data from an API

### 2.4 TypeScript

#### 2.4.1 Why types prevent bugs

#### 2.4.2 Interfaces and type aliases

#### 2.4.3 Typing API responses and database documents

### 2.5 Chapter Practice

#### 2.5.1 Exercise: build a static, responsive problem card

#### 2.5.2 Checkpoint quiz

## Chapter 3: React Fundamentals

### 3.1 Components and Props

#### 3.1.1 Thinking in components

#### 3.1.2 Passing data with props

#### 3.1.3 Composition and children

### 3.2 State

#### 3.2.1 useState and re-rendering

#### 3.2.2 Lifting state up

#### 3.2.3 Controlled form inputs

### 3.3 Effects and Data Loading

#### 3.3.1 useEffect and its dependency list

#### 3.3.2 Loading, error and empty states

#### 3.3.3 Cleaning up subscriptions

### 3.4 Sharing State

#### 3.4.1 Context for auth and theme

#### 3.4.2 Custom hooks

#### 3.4.3 When to reach for a state library

### 3.5 Building the Problem Explorer

#### 3.5.1 List, search and filter

#### 3.5.2 Detail page with a Pain Score dial

#### 3.5.3 Voting buttons with optimistic updates

### 3.6 Chapter Practice

#### 3.6.1 Exercise: build the explorer with mock data

#### 3.6.2 Checkpoint quiz

## Chapter 4: Tooling, Routing and Code Splitting

### 4.1 Vite

#### 4.1.1 Project setup and dev server

#### 4.1.2 Environment variables

#### 4.1.3 Production builds

### 4.2 Routing with React Router

#### 4.2.1 Routes, links and nested layouts

#### 4.2.2 URL parameters (for example /problems/:id)

#### 4.2.3 Protected routes

### 4.3 Lazy Loading

#### 4.3.1 Splitting bundles per page

#### 4.3.2 Suspense fallbacks

#### 4.3.3 The stale chunk problem after a new deployment

#### 4.3.4 Retry-and-refresh pattern for failed chunk loads

### 4.4 Project Structure

#### 4.4.1 Folders for pages, components, hooks, services, types

#### 4.4.2 Naming and import conventions

### 4.5 Chapter Practice

#### 4.5.1 Exercise: add lazy routes and a retry wrapper

#### 4.5.2 Checkpoint quiz

## Chapter 5: Styling, Design Tokens and Themes

### 5.1 Utility-First CSS with Tailwind

#### 5.1.1 Why utilities scale well

#### 5.1.2 Responsive and state variants

#### 5.1.3 Avoiding class soup with components

### 5.2 Design Tokens

#### 5.2.1 Colour, spacing, radius and type scales

#### 5.2.2 Defining tokens in the theme layer

#### 5.2.3 Semantic names (surface, on-surface, primary)

### 5.3 Light and Dark Mode

#### 5.3.1 prefers-color-scheme and a manual toggle

#### 5.3.2 Contrast and readability checks

### 5.4 Motion and Visual Effects

#### 5.4.1 Subtle transitions that help usability

#### 5.4.2 When to use canvas or WebGL, and when not to

#### 5.4.3 Respecting reduced-motion settings

### 5.5 Chapter Practice

#### 5.5.1 Exercise: theme your explorer in light and dark

#### 5.5.2 Checkpoint quiz

## Chapter 6: Back-End Concepts and APIs

### 6.1 Do You Need a Back End?

#### 6.1.1 Managed services vs. your own server

#### 6.1.2 Signs you need a custom API (secrets, heavy compute, third-party calls)

### 6.2 REST API Design

#### 6.2.1 Resources, routes and verbs

#### 6.2.2 Request validation and error responses

#### 6.2.3 Pagination and filtering

### 6.3 Building an API with FastAPI

#### 6.3.1 Project setup and first endpoint

#### 6.3.2 Pydantic models for validation

#### 6.3.3 Auth checks with verified tokens

#### 6.3.4 CORS and rate limiting

### 6.4 Calling Third-Party Services Safely

#### 6.4.1 Keeping API keys on the server

#### 6.4.2 Timeouts, retries and fallbacks

### 6.5 Chapter Practice

#### 6.5.1 Exercise: build a small endpoint that scores a problem

#### 6.5.2 Checkpoint quiz

## Chapter 7: Data Modelling with Cloud Firestore

### 7.1 NoSQL Basics

#### 7.1.1 Collections, documents and fields

#### 7.1.2 Document vs. relational thinking

#### 7.1.3 Reads, writes and how billing works

### 7.2 Designing for Your Queries

#### 7.2.1 List the screens, then the queries

#### 7.2.2 Indexes and composite indexes

#### 7.2.3 Pagination with cursors

### 7.3 Denormalisation

#### 7.3.1 Copying author and company info onto problem documents

#### 7.3.2 Avoiding the N+1 read problem

#### 7.3.3 Keeping copies in sync

### 7.4 Core Collections for a Problem Platform

#### 7.4.1 users and profiles

#### 7.4.2 problems and dossiers

#### 7.4.3 votes and reactions

#### 7.4.4 submissions and moderation queue

#### 7.4.5 companies and challenges

### 7.5 Counters and Aggregates

#### 7.5.1 Vote counts with transactions

#### 7.5.2 Avoiding hot documents

### 7.6 Real-Time Listeners

#### 7.6.1 When to subscribe and when to fetch once

#### 7.6.2 Unsubscribing to control cost

### 7.7 Chapter Practice

#### 7.7.1 Exercise: model and seed your problems collection

#### 7.7.2 Checkpoint quiz

## Chapter 8: Authentication and Authorization

### 8.1 Concepts

#### 8.1.1 Authentication vs. authorization

#### 8.1.2 Sessions, tokens and expiry

### 8.2 Firebase Auth

#### 8.2.1 Google sign-in

#### 8.2.2 Email and password with verification

#### 8.2.3 Sign-out and session persistence

#### 8.2.4 Handling auth state in React

### 8.3 Roles and Custom Claims

#### 8.3.1 Roles: visitor, member, solver, company, moderator, admin

#### 8.3.2 Setting claims from a trusted server

#### 8.3.3 Why you never trust roles stored in localStorage

### 8.4 Guest Mode

#### 8.4.1 What anonymous users can do

#### 8.4.2 Upgrading a guest to a full account

### 8.5 Admin Areas

#### 8.5.1 Route guards plus server-side enforcement

#### 8.5.2 Audit trails for moderation actions

### 8.6 Chapter Practice

#### 8.6.1 Exercise: add sign-in and a protected admin page

#### 8.6.2 Checkpoint quiz

## Chapter 9: Security

### 9.1 Threat Thinking

#### 9.1.1 Who might attack, and what they want

#### 9.1.2 The client is never trusted

### 9.2 Firestore Security Rules

#### 9.2.1 Rule structure: match, allow, conditions

#### 9.2.2 Read rules for public vs. private data

#### 9.2.3 Field immutability (users cannot change their own role or author fields)

#### 9.2.4 Validating data shape and size

#### 9.2.5 Testing rules with the emulator

### 9.3 Web Security Basics

#### 9.3.1 XSS and safe rendering

#### 9.3.2 CSRF and token handling

#### 9.3.3 Content Security Policy headers

#### 9.3.4 HTTPS-only and secure headers on the host

### 9.4 Secrets and Keys

#### 9.4.1 What is safe in front-end code and what is not

#### 9.4.2 Environment variables and secret managers

#### 9.4.3 Rotating leaked keys

### 9.5 Abuse and Spam

#### 9.5.1 Rate limits and quotas

#### 9.5.2 Moderation queue before publishing

### 9.6 Privacy and Compliance

#### 9.6.1 Collect only what you need

#### 9.6.2 Consent, deletion and data export

### 9.7 Chapter Practice

#### 9.7.1 Exercise: write and test rules for three collections

#### 9.7.2 Checkpoint quiz

## Chapter 10: Adding AI Features

### 10.1 What LLMs Are Good At

#### 10.1.1 Drafting, summarising, structuring, explaining

#### 10.1.2 What they get wrong (made-up facts, weak arithmetic)

### 10.2 Calling a Model Through an API

#### 10.2.1 Messages, system prompts and parameters

#### 10.2.2 Streaming responses

#### 10.2.3 Server-side calls to protect keys

### 10.3 Prompt Design

#### 10.3.1 Clear role, context and output format

#### 10.3.2 Examples and constraints

#### 10.3.3 Requesting structured JSON and validating it

### 10.4 Building a Problem Solver Copilot

#### 10.4.1 Technical architecture suggestions

#### 10.4.2 Discovery interview script generator

#### 10.4.3 14-day sprint roadmap generator

#### 10.4.4 Pilot outreach email drafter

### 10.5 Safety, Quality and Cost

#### 10.5.1 Grounding answers in the problem dossier

#### 10.5.2 Guardrails and human review

#### 10.5.3 Caching, token limits and budgets

### 10.6 Chapter Practice

#### 10.6.1 Exercise: build one copilot module end to end

#### 10.6.2 Checkpoint quiz

## Chapter 11: Deployment and CI/CD

### 11.1 Hosting Options

#### 11.1.1 Static and edge hosting with Vercel

#### 11.1.2 Where an API service can run

### 11.2 From Git to Production

#### 11.2.1 Git basics and branching

#### 11.2.2 Preview deployments for every pull request

#### 11.2.3 Environment variables per environment

### 11.3 Domains and HTTPS

#### 11.3.1 Connecting a custom domain

#### 11.3.2 Redirects and rewrites for a single-page app

### 11.4 Safe Releases

#### 11.4.1 Build checks before deploy

#### 11.4.2 Rolling back a bad release

#### 11.4.3 Cache headers and stale assets

### 11.5 Chapter Practice

#### 11.5.1 Exercise: deploy your project with a preview URL

#### 11.5.2 Checkpoint quiz

## Chapter 12: Performance and Cost

### 12.1 Web Performance

#### 12.1.1 Core metrics: load speed, interactivity, layout stability

#### 12.1.2 Bundle analysis and keeping initial chunks small

#### 12.1.3 Image formats, lazy images and fonts

### 12.2 Data Performance

#### 12.2.1 Fewer, smarter queries

#### 12.2.2 Caching on the client

#### 12.2.3 Pagination and limits

### 12.3 Cost Control

#### 12.3.1 Estimating reads and writes per user per day

#### 12.3.2 Staying inside free tiers

#### 12.3.3 Budget alerts

### 12.4 Worked Example

#### 12.4.1 Costing 100 daily users on a denormalised data model

### 12.5 Chapter Practice

#### 12.5.1 Exercise: measure and reduce your own page weight

#### 12.5.2 Checkpoint quiz

## Chapter 13: Testing and Quality

### 13.1 Why Test

#### 13.1.1 The cost of bugs in production

#### 13.1.2 The testing pyramid

### 13.2 Unit and Component Tests

#### 13.2.1 Testing pure functions (for example the Pain Score)

#### 13.2.2 Testing React components

### 13.3 End-to-End Tests with Playwright

#### 13.3.1 Installing and writing your first test

#### 13.3.2 Selectors that survive redesigns

#### 13.3.3 Testing desktop and mobile viewports

#### 13.3.4 Auth flows and test data

### 13.4 Rules and Security Tests

#### 13.4.1 Emulator tests for database rules

#### 13.4.2 Negative tests: things users must not be able to do

### 13.5 Running Tests Automatically

#### 13.5.1 Run on every pull request

#### 13.5.2 Keeping tests fast and reliable

### 13.6 Chapter Practice

#### 13.6.1 Exercise: write five E2E tests for your explorer

#### 13.6.2 Checkpoint quiz

## Chapter 14: SEO and AI Search Visibility

### 14.1 How Search Finds Your Pages

#### 14.1.1 Crawling, indexing and ranking

#### 14.1.2 Single-page app challenges and fixes

### 14.2 On-Page Basics

#### 14.2.1 Titles, descriptions and headings

#### 14.2.2 Clean URLs and internal links

#### 14.2.3 Sitemaps and robots.txt

### 14.3 Structured Data

#### 14.3.1 JSON-LD basics

#### 14.3.2 Article, HowTo, FAQPage and BreadcrumbList

#### 14.3.3 Validating your markup

### 14.4 Visibility in AI Search (GEO)

#### 14.4.1 Writing content that AI systems can quote

#### 14.4.2 llms.txt and clear source pages

#### 14.4.3 Authority, freshness and citations

### 14.5 Content Strategy for the Academy

#### 14.5.1 Course pages as long-term traffic

#### 14.5.2 Internal links between courses and the problem hub

### 14.6 Chapter Practice

#### 14.6.1 Exercise: add structured data to one course page

#### 14.6.2 Checkpoint quiz

## Chapter 15: Monitoring and Maintenance

### 15.1 Observability

#### 15.1.1 Logs, errors and metrics

#### 15.1.2 Error tracking in the browser

### 15.2 Analytics

#### 15.2.1 Privacy-friendly usage analytics

#### 15.2.2 Funnels: visit, sign-up, submit, return

### 15.3 Maintenance Routines

#### 15.3.1 Dependency updates and audits

#### 15.3.2 Backups and recovery

#### 15.3.3 Incident response checklist

### 15.4 Chapter Practice

#### 15.4.1 Exercise: set up error tracking and a weekly check

#### 15.4.2 Checkpoint quiz

## Chapter 16: Capstone Project

### 16.1 Brief

#### 16.1.1 Build a mini problem platform or a solution for the problem you validated in Subject 1

### 16.2 Required Features

#### 16.2.1 Public list and detail pages

#### 16.2.2 Sign-in and at least two roles

#### 16.2.3 Submit form with a moderation step

#### 16.2.4 Voting or reactions

#### 16.2.5 One AI-powered feature

#### 16.2.6 Secure database rules

#### 16.2.7 Light and dark themes

### 16.3 Quality Requirements

#### 16.3.1 Five or more E2E tests

#### 16.3.2 Deployed with a public URL

#### 16.3.3 Basic SEO and structured data

### 16.4 Grading Rubric

#### 16.4.1 Functionality (25%)

#### 16.4.2 Data model and security (25%)

#### 16.4.3 Code quality and structure (15%)

#### 16.4.4 UX and responsiveness (15%)

#### 16.4.5 Testing and deployment (20%)

### 16.5 Submit to Stuckhere

#### 16.5.1 Share your build with the problem's community and sponsors

## Chapter 17: Appendices

### 17.1 Glossary

#### 17.1.1 API, SPA, SSR, CDN, CORS, CSP, JWT, claim, index, denormalisation, E2E, CI/CD

### 17.2 Project Starter Checklist

#### 17.2.1 Repo, folders, lint, types, env files

#### 17.2.2 First-day setup commands

### 17.3 Security Checklist

#### 17.3.1 Pre-launch list of 20 checks

### 17.4 Cost Estimation Worksheet

#### 17.4.1 Reads, writes, storage, AI calls per user

### 17.5 Master Quiz Bank

#### 17.5.1 60 multiple-choice questions grouped by chapter

### 17.6 Further Reading

#### 17.6.1 Official documentation for React, Vite, Tailwind, Firebase, FastAPI, Playwright

#### 17.6.2 Related Stuckhere pages: How to Solve, Methodology, Startup Mode

### 17.7 FAQ (good for Schema.org FAQPage SEO)

#### 17.7.1 Do I need a back end if I use Firebase?

#### 17.7.2 Is NoSQL always cheaper than SQL?

#### 17.7.3 How do I stop users from editing their own role?

#### 17.7.4 How do I keep AI costs under control?
