# AI for Builders

*Stuckhere Academy, Subject 5: design, build and ship reliable AI features for real problems*

## Chapter 0: Course Overview

### 0.1 What This Subject Covers

#### 0.1.1 The one-line idea

AI is a tool for solving verified problems, not a goal in itself. This subject teaches how to add language-model features, such as a problem solver copilot, that are useful, safe, affordable and testable.

#### 0.1.2 What you will be able to do

- Explain how large language models work and where they fail
- Write clear prompts and structured outputs
- Call a model API from a secure back end
- Ground answers in your own data with retrieval
- Add tools and simple agent workflows
- Evaluate quality, safety and cost before launch

### 0.2 Prerequisites

#### 0.2.1 Basic programming

#### 0.2.2 Subject 3 (Full-Stack Cloud) strongly recommended

#### 0.2.3 Subjects 1 and 2 help you choose problems that deserve AI

### 0.3 How to Use This Material

#### 0.3.1 Suggested path (15 to 20 hours with practice)

#### 0.3.2 Chapter format: Concept, Code, Exercise, Checkpoint Quiz

#### 0.3.3 Building one AI feature across all chapters

## Chapter 1: AI Foundations for Builders

### 1.1 Key Terms

#### 1.1.1 AI, machine learning, deep learning

#### 1.1.2 Generative AI and large language models

#### 1.1.3 Models, training, inference

### 1.2 Types of AI Tasks

#### 1.2.1 Classification and prediction

#### 1.2.2 Generation (text, images, code)

#### 1.2.3 Extraction and summarisation

#### 1.2.4 Search, ranking and recommendation

### 1.3 When AI Is the Right Tool

#### 1.3.1 Fuzzy, language-heavy, high-volume tasks

#### 1.3.2 When rules or a spreadsheet are better

#### 1.3.3 The cost of being wrong

### 1.4 Using Your Problem Dossier

#### 1.4.1 Which workflow step could AI improve?

#### 1.4.2 Defining success in measurable terms

### 1.5 Chapter Practice

#### 1.5.1 Exercise: list five AI opportunities and rate them

#### 1.5.2 Checkpoint quiz

## Chapter 2: How Large Language Models Work

### 2.1 Text as Tokens

#### 2.1.1 What a token is

#### 2.1.2 Why token counts drive cost and limits

### 2.2 Prediction at Scale

#### 2.2.1 Next-token prediction in plain language

#### 2.2.2 Pretraining and fine-tuning

#### 2.2.3 Instruction tuning and human feedback

### 2.3 Context Window

#### 2.3.1 What the model can see at once

#### 2.3.2 Long inputs and what gets lost

### 2.4 Sampling and Settings

#### 2.4.1 Temperature and randomness

#### 2.4.2 Max output length

#### 2.4.3 Stop sequences

### 2.5 Strengths and Limits

#### 2.5.1 Strong at drafting, explaining, restructuring

#### 2.5.2 Hallucination: confident but wrong

#### 2.5.3 Weak at precise arithmetic and up-to-date facts

#### 2.5.4 Knowledge cutoffs

### 2.6 Choosing a Model

#### 2.6.1 Capability, speed and price trade-offs

#### 2.6.2 Small vs. large models

#### 2.6.3 Avoiding vendor lock-in

### 2.7 Chapter Practice

#### 2.7.1 Exercise: compare two models on five tasks

#### 2.7.2 Checkpoint quiz

## Chapter 3: Prompt Engineering

### 3.1 Anatomy of a Prompt

#### 3.1.1 System instructions

#### 3.1.2 User input

#### 3.1.3 Context and examples

#### 3.1.4 Output format

### 3.2 Core Techniques

#### 3.2.1 Be specific about role, audience and goal

#### 3.2.2 Give examples (few-shot)

#### 3.2.3 Ask for step-by-step reasoning when needed

#### 3.2.4 Set constraints and say what to avoid

#### 3.2.5 Separate instructions from data with clear delimiters

### 3.3 Structured Outputs

#### 3.3.1 Requesting JSON

#### 3.3.2 Schemas and validation

#### 3.3.3 Handling malformed responses

### 3.4 Prompt Patterns for Stuckhere-Style Features

#### 3.4.1 Technical architecture suggestion

#### 3.4.2 Interview script generator

#### 3.4.3 Sprint roadmap generator

#### 3.4.4 Outreach email drafter

### 3.5 Iterating on Prompts

#### 3.5.1 Versioning prompts

#### 3.5.2 Testing changes against a fixed set of examples

### 3.6 Chapter Practice

#### 3.6.1 Exercise: improve a weak prompt through three revisions

#### 3.6.2 Checkpoint quiz

## Chapter 4: Calling Model APIs

### 4.1 API Basics

#### 4.1.1 Requests, messages and roles

#### 4.1.2 Responses and usage data

#### 4.1.3 Errors, rate limits and retries

### 4.2 Keeping Keys Safe

#### 4.2.1 Never call a paid API with a key in browser code

#### 4.2.2 A server or edge function as a proxy

#### 4.2.3 Authenticating your own users first

### 4.3 Streaming

#### 4.3.1 Why streaming feels faster

#### 4.3.2 Handling streams in a React front end

### 4.4 Multi-Turn Conversations

#### 4.4.1 Sending history

#### 4.4.2 Summarising old turns to save tokens

### 4.5 Files and Images

#### 4.5.1 Sending documents and images as input

#### 4.5.2 Limits and costs

### 4.6 Building a Simple Endpoint

#### 4.6.1 Request validation

#### 4.6.2 Prompt assembly

#### 4.6.3 Response parsing and error fallback

### 4.7 Chapter Practice

#### 4.7.1 Exercise: build a secure endpoint that drafts a pilot email

#### 4.7.2 Checkpoint quiz

## Chapter 5: Grounding With Your Own Data (RAG)

### 5.1 Why Grounding

#### 5.1.1 Reducing hallucination

#### 5.1.2 Using private and fresh information

### 5.2 Embeddings and Similarity

#### 5.2.1 Turning text into vectors

#### 5.2.2 Cosine similarity in plain language

### 5.3 The RAG Pipeline

#### 5.3.1 Collect and clean documents

#### 5.3.2 Chunking strategies

#### 5.3.3 Indexing in a vector store

#### 5.3.4 Retrieve, assemble context, generate

### 5.4 Improving Retrieval

#### 5.4.1 Metadata filters

#### 5.4.2 Hybrid keyword and vector search

#### 5.4.3 Re-ranking

### 5.5 Citing Sources

#### 5.5.1 Showing which dossier or document an answer came from

#### 5.5.2 Saying "I don't know" when context is missing

### 5.6 Example: Problem Dossier Q&A

#### 5.6.1 Indexing verified problems

#### 5.6.2 Answering a builder's questions with citations

### 5.7 Chapter Practice

#### 5.7.1 Exercise: build a small RAG demo over ten documents

#### 5.7.2 Checkpoint quiz

## Chapter 6: Tools and Agents

### 6.1 Tool Use

#### 6.1.1 Letting a model call functions

#### 6.1.2 Describing tools with schemas

#### 6.1.3 Validating tool arguments

### 6.2 Common Tools

#### 6.2.1 Database lookup

#### 6.2.2 Calculator and code execution

#### 6.2.3 Web search

#### 6.2.4 Sending email or creating records (with approval)

### 6.3 Agent Workflows

#### 6.3.1 Plan, act, observe loops

#### 6.3.2 Workflows vs. fully autonomous agents

#### 6.3.3 When not to use an agent

### 6.4 Controlling Agents

#### 6.4.1 Step and cost limits

#### 6.4.2 Human approval for risky actions

#### 6.4.3 Logging every tool call

### 6.5 Chapter Practice

#### 6.5.1 Exercise: add a scoring tool to your copilot

#### 6.5.2 Checkpoint quiz

## Chapter 7: Building a Problem Solver Copilot

### 7.1 Define the Copilot's Job

#### 7.1.1 Users and tasks

#### 7.1.2 What it should never do

### 7.2 Copilot Modules

#### 7.2.1 Technical architecture module

#### 7.2.2 Discovery interview module

#### 7.2.3 14-day sprint module

#### 7.2.4 Pilot outreach module

### 7.3 Architecture

#### 7.3.1 Front end panel

#### 7.3.2 Back end endpoint and prompt builder

#### 7.3.3 Data sources (dossier, market sizing, competitors)

#### 7.3.4 Response storage and history

### 7.4 Context Assembly

#### 7.4.1 Selecting relevant dossier fields

#### 7.4.2 Staying within token budgets

### 7.5 User Experience

#### 7.5.1 Loading, streaming and error states

#### 7.5.2 Edit, copy, regenerate and feedback buttons

#### 7.5.3 Showing limits and disclaimers

### 7.6 Chapter Practice

#### 7.6.1 Exercise: build two copilot modules end to end

#### 7.6.2 Checkpoint quiz

## Chapter 8: Evaluating AI Features

### 8.1 Why Evaluation Is Hard

#### 8.1.1 No single right answer

#### 8.1.2 Quality drifts when prompts or models change

### 8.2 Building a Test Set

#### 8.2.1 20 to 50 real examples

#### 8.2.2 Including hard and adversarial cases

#### 8.2.3 Expected behaviours, not exact answers

### 8.3 Evaluation Methods

#### 8.3.1 Human review with a rubric

#### 8.3.2 Automated checks (format, length, banned content)

#### 8.3.3 Model-as-judge and its biases

#### 8.3.4 Comparing versions side by side

### 8.4 Metrics

#### 8.4.1 Accuracy and groundedness

#### 8.4.2 Usefulness ratings from users

#### 8.4.3 Latency and cost per request

### 8.5 Continuous Monitoring

#### 8.5.1 Logging prompts and outputs responsibly

#### 8.5.2 User feedback loops

#### 8.5.3 Regression checks before every change

### 8.6 Chapter Practice

#### 8.6.1 Exercise: create a 25-case test set and score two prompt versions

#### 8.6.2 Checkpoint quiz

## Chapter 9: Safety, Privacy and Security

### 9.1 Risks Specific to AI Features

#### 9.1.1 Wrong or invented answers

#### 9.1.2 Harmful or biased outputs

#### 9.1.3 Over-reliance by users

### 9.2 Prompt Injection

#### 9.2.1 Instructions hidden in user input or documents

#### 9.2.2 Separating trusted instructions from untrusted content

#### 9.2.3 Limiting what tools can do

### 9.3 Data Privacy

#### 9.3.1 Minimising personal data sent to models

#### 9.3.2 Consent and retention

#### 9.3.3 Sensitive domains such as health and finance

### 9.4 Abuse Prevention

#### 9.4.1 Rate limits per user

#### 9.4.2 Spend caps and alerts

#### 9.4.3 Content filters and moderation

### 9.5 Responsible AI Practice

#### 9.5.1 Transparency: tell users when AI is used

#### 9.5.2 Human oversight for important decisions

#### 9.5.3 Fairness testing across user groups

### 9.6 Chapter Practice

#### 9.6.1 Exercise: red-team your copilot with 15 attack prompts

#### 9.6.2 Checkpoint quiz

## Chapter 10: Cost, Latency and Scale

### 10.1 Understanding Costs

#### 10.1.1 Input and output token pricing

#### 10.1.2 Estimating cost per request and per user

### 10.2 Reducing Cost

#### 10.2.1 Shorter prompts and tighter context

#### 10.2.2 Caching repeated answers

#### 10.2.3 Using smaller models for easy tasks

#### 10.2.4 Batching

### 10.3 Improving Speed

#### 10.3.1 Streaming

#### 10.3.2 Parallel calls

#### 10.3.3 Precomputing common outputs

### 10.4 Reliability

#### 10.4.1 Timeouts and retries with backoff

#### 10.4.2 Fallback models and graceful degradation

### 10.5 Pricing Your AI Feature

#### 10.5.1 Linking cost to the unit economics from Subject 2

#### 10.5.2 Free limits and paid tiers

### 10.6 Chapter Practice

#### 10.6.1 Exercise: build a cost model for 1,000 daily users

#### 10.6.2 Checkpoint quiz

## Chapter 11: Data for AI

### 11.1 Where Data Comes From

#### 11.1.1 Your own product data

#### 11.1.2 Public datasets

#### 11.1.3 User-submitted content

### 11.2 Data Quality

#### 11.2.1 Cleaning and deduplicating

#### 11.2.2 Consistent structure

#### 11.2.3 Handling missing and noisy values

### 11.3 Labelling

#### 11.3.1 Simple labelling guidelines

#### 11.3.2 Agreement between labellers

### 11.4 Legal and Ethical Use

#### 11.4.1 Licences and terms of use

#### 11.4.2 Personal data and consent

#### 11.4.3 Bias in datasets

### 11.5 Chapter Practice

#### 11.5.1 Exercise: clean and label a 50-row dataset

#### 11.5.2 Checkpoint quiz

## Chapter 12: Classical Machine Learning and Scoring Models

### 12.1 Rules, Scores and Models

#### 12.1.1 Weighted scores such as the Pain Score

#### 12.1.2 When a simple formula beats machine learning

### 12.2 Supervised Learning Basics

#### 12.2.1 Features and labels

#### 12.2.2 Training, validation and test sets

#### 12.2.3 Overfitting

### 12.3 Common Models

#### 12.3.1 Linear and logistic regression

#### 12.3.2 Decision trees and forests

#### 12.3.3 Clustering for grouping similar problems

### 12.4 Measuring Performance

#### 12.4.1 Accuracy, precision and recall

#### 12.4.2 Confusion matrix

#### 12.4.3 Choosing the right metric for the job

### 12.5 Use Cases on a Problem Platform

#### 12.5.1 Duplicate problem detection

#### 12.5.2 Auto-tagging domains and industries

#### 12.5.3 Suggested pain score from submission text

### 12.6 Chapter Practice

#### 12.6.1 Exercise: build a simple tagger and measure it

#### 12.6.2 Checkpoint quiz

## Chapter 13: Designing AI Products and Experiences

### 13.1 Human-in-the-Loop

#### 13.1.1 AI suggests, human decides

#### 13.1.2 Easy editing and undo

### 13.2 Building Trust

#### 13.2.1 Showing sources and reasoning

#### 13.2.2 Communicating uncertainty

#### 13.2.3 Setting realistic expectations

### 13.3 Interface Patterns

#### 13.3.1 Chat vs. buttons vs. inline suggestions

#### 13.3.2 Templates and guided inputs

#### 13.3.3 Onboarding for AI features

### 13.4 Handling Failure

#### 13.4.1 Wrong answers: report and recover

#### 13.4.2 Empty or refused responses

#### 13.4.3 Offline and slow states

### 13.5 Chapter Practice

#### 13.5.1 Exercise: redesign an AI feature screen for trust and clarity

#### 13.5.2 Checkpoint quiz

## Chapter 14: Working Faster With AI Tools

### 14.1 AI for Coding

#### 14.1.1 Code assistants and agents

#### 14.1.2 Reviewing generated code

#### 14.1.3 Tests as your safety net

### 14.2 AI for Research and Writing

#### 14.2.1 Summarising interviews

#### 14.2.2 Drafting documents with human editing

#### 14.2.3 Checking facts and sources

### 14.3 AI for Design and Prototyping

#### 14.3.1 Generating layouts and copy

#### 14.3.2 Limits and cleanup

### 14.4 Good Habits

#### 14.4.1 Never paste secrets or private data

#### 14.4.2 Keep a log of important prompts

#### 14.4.3 Learn the basics yourself first

### 14.5 Chapter Practice

#### 14.5.1 Exercise: build a small feature with AI help and document what you changed

#### 14.5.2 Checkpoint quiz

## Chapter 15: AI in Real Domains

### 15.1 Healthcare and Clinics

#### 15.1.1 Scheduling, documentation and triage support

#### 15.1.2 Safety and regulation

### 15.2 Logistics and Operations

#### 15.2.1 Route and dispatch support

#### 15.2.2 Document extraction (invoices, bills of lading)

### 15.3 Education

#### 15.3.1 Tutoring and feedback

#### 15.3.2 Academic integrity concerns

### 15.4 Finance and Small Business

#### 15.4.1 Bookkeeping and reconciliation

#### 15.4.2 Compliance and accuracy needs

### 15.5 India and Multilingual Contexts

#### 15.5.1 Indian languages and code-mixed text

#### 15.5.2 Voice and low-bandwidth use

#### 15.5.3 Government and public-sector use cases

### 15.6 Chapter Practice

#### 15.6.1 Exercise: design an AI workflow for one problem in your domain

#### 15.6.2 Checkpoint quiz

## Chapter 16: Capstone Project

### 16.1 Brief

#### 16.1.1 Add one AI feature to the solution you built in Subject 3 or 4

### 16.2 Requirements

#### 16.2.1 Clear job statement and success metrics

#### 16.2.2 Secure back-end endpoint

#### 16.2.3 Grounded answers with sources

#### 16.2.4 Structured output with validation

#### 16.2.5 25-case evaluation set and results

#### 16.2.6 Safety tests and a cost model

#### 16.2.7 A user-facing explanation of limits

### 16.3 Grading Rubric

#### 16.3.1 Problem fit and design (20%)

#### 16.3.2 Implementation quality (25%)

#### 16.3.3 Evaluation rigour (25%)

#### 16.3.4 Safety and privacy (15%)

#### 16.3.5 Cost awareness and UX (15%)

### 16.4 Submit to Stuckhere

#### 16.4.1 Publish a demo and write-up for the community

## Chapter 17: Appendices

### 17.1 Glossary

#### 17.1.1 Token, context window, temperature, prompt, embedding, RAG, agent, tool call, hallucination, fine-tuning, evaluation, prompt injection

### 17.2 Templates

#### 17.2.1 Prompt template

#### 17.2.2 Evaluation rubric

#### 17.2.3 Test-case sheet

#### 17.2.4 Red-team checklist

#### 17.2.5 Cost estimation sheet

### 17.3 Pre-Launch Checklist

#### 17.3.1 20 checks across quality, safety, privacy and cost

### 17.4 Master Quiz Bank

#### 17.4.1 60 multiple-choice questions grouped by chapter

### 17.5 Further Reading

#### 17.5.1 Official model provider documentation and prompting guides

#### 17.5.2 Related Stuckhere pages: Methodology, Startup Mode, Full-Stack Cloud

### 17.6 FAQ (good for Schema.org FAQPage SEO)

#### 17.6.1 Do I need to train my own model?

#### 17.6.2 How do I stop an AI feature from making things up?

#### 17.6.3 How much does an AI feature cost per user?

#### 17.6.4 Is it safe to send user data to a model API?
