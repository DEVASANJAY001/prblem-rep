# -*- coding: utf-8 -*-
import os

DIAGRAMS = {
    "ai-builder-pipeline.svg": """<svg viewBox="0 0 800 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="170" rx="12" fill="#F8FAFC"/>
  <text x="400" y="28" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The 6-Stage Production AI Builder Architecture</text>
  
  <rect x="18" y="50" width="112" height="96" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.8"/>
  <text x="74" y="74" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. Problem</text>
  <text x="74" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Dossier Context</text>
  <text x="74" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Verified Friction</text>
  <text x="74" y="132" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Zero Hype</text>

  <path d="M132 98H146" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="148" y="50" width="112" height="96" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8"/>
  <text x="204" y="74" fill="#0284C7" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. Prompting</text>
  <text x="204" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Few-Shot &amp; CoT</text>
  <text x="204" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">System Rules</text>
  <text x="204" y="132" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">JSON Schemas</text>

  <path d="M262 98H276" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="278" y="50" width="112" height="96" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8"/>
  <text x="334" y="74" fill="#2563EB" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. Gateway</text>
  <text x="334" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">API Proxies</text>
  <text x="334" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">SSE Streaming</text>
  <text x="334" y="132" fill="#2563EB" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Secret Isolation</text>

  <path d="M392 98H406" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="408" y="50" width="112" height="96" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.8"/>
  <text x="464" y="74" fill="#7C3AED" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. Grounding</text>
  <text x="464" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Vector Search</text>
  <text x="464" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">RAG Chunks</text>
  <text x="464" y="132" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Zero Hallucination</text>

  <path d="M522 98H536" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="538" y="50" width="112" height="96" rx="8" fill="#FFFFFF" stroke="#D97706" stroke-width="1.8"/>
  <text x="594" y="74" fill="#D97706" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5. Tools &amp; Ops</text>
  <text x="594" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Function Calling</text>
  <text x="594" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Agent ReAct</text>
  <text x="594" y="132" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Bounded Actions</text>

  <path d="M652 98H666" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="668" y="50" width="114" height="96" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="1.8"/>
  <text x="725" y="74" fill="#059669" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">6. Evals &amp; Cost</text>
  <text x="725" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">LLM-as-a-Judge</text>
  <text x="725" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Golden CI Gates</text>
  <text x="725" y="132" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Semantic Cache</text>
</svg>""",

    "ai-triage-matrix.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="28" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Architecture Triage: Choosing the Right Engine</text>

  <rect x="24" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#64748B" stroke-width="1.5"/>
  <text x="40" y="74" fill="#475569" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">⚙️ RULES &amp; CODE</text>
  <text x="40" y="96" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Arithmetic &amp; billing formulas</text>
  <text x="40" y="114" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• 100% deterministic logic</text>
  <text x="40" y="136" fill="#64748B" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Cost: $0 · Latency: 0.1ms</text>

  <rect x="268" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
  <text x="284" y="74" fill="#0284C7" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">📊 CLASSICAL ML</text>
  <text x="284" y="96" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Tabular data &amp; fraud scoring</text>
  <text x="284" y="114" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Ranking &amp; recommendations</text>
  <text x="284" y="136" fill="#0284C7" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Cost: $0.0001/1k · Latency: 5ms</text>

  <rect x="512" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="2"/>
  <text x="528" y="74" fill="#0891B2" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">🤖 GENERATIVE LLM</text>
  <text x="528" y="96" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">• Unstructured language &amp; docs</text>
  <text x="528" y="114" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">• Semantic synthesis &amp; reasoning</text>
  <text x="528" y="136" fill="#0891B2" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Cost: $0.50-$15/1M · Latency: 300ms+</text>
</svg>""",

    "llm-token-pipeline.svg": """<svg viewBox="0 0 780 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="780" height="160" rx="12" fill="#F8FAFC"/>
  <text x="390" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Next-Token Prediction &amp; Sampling Mechanics</text>

  <rect x="20" y="46" width="130" height="96" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.5"/>
  <text x="85" y="72" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. Raw Text</text>
  <text x="85" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">"Solve pain"</text>
  <text x="85" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">10 characters</text>
  <text x="85" y="130" fill="#0891B2" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">User Prompt</text>

  <path d="M152 94H170" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="172" y="46" width="130" height="96" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
  <text x="237" y="72" fill="#0284C7" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. Tokenizer</text>
  <text x="237" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">[1823, 8912]</text>
  <text x="237" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">BPE Subwords</text>
  <text x="237" y="130" fill="#0284C7" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">~4 chars/token</text>

  <path d="M304 94H322" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="324" y="46" width="140" height="96" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="394" y="72" fill="#7C3AED" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. Attention</text>
  <text x="394" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Context Window</text>
  <text x="394" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Transformer Layers</text>
  <text x="394" y="130" fill="#7C3AED" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Compute Logits</text>

  <path d="M466 94H484" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="486" y="46" width="130" height="96" rx="8" fill="#FFFFFF" stroke="#EA580C" stroke-width="1.5"/>
  <text x="551" y="72" fill="#EA580C" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. Sampling</text>
  <text x="551" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Temp: 0.0 - 0.7</text>
  <text x="551" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Top-P: 0.95</text>
  <text x="551" y="130" fill="#EA580C" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Greedy vs Random</text>

  <path d="M618 94H636" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="638" y="46" width="124" height="96" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="700" y="72" fill="#059669" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5. Emit Token</text>
  <text x="700" y="92" fill="#1E293B" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">" directly"</text>
  <text x="700" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Append &amp; Repeat</text>
  <text x="700" y="130" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">SSE Streaming</text>
</svg>""",

    "structured-prompt-anatomy.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The 5-Layer Structured Prompt Architecture</text>

  <rect x="24" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.6"/>
  <text x="90" y="70" fill="#0891B2" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. SYSTEM ROLE</text>
  <text x="90" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">"You are an expert</text>
  <text x="90" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">problem discovery</text>
  <text x="90" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">analyst..."</text>
  <text x="90" y="142" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Persona &amp; Guardrails</text>

  <rect x="170" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.6"/>
  <text x="236" y="70" fill="#0284C7" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. CONTEXT</text>
  <text x="236" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Retrieved RAG chunks</text>
  <text x="236" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Dossier metrics</text>
  <text x="236" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">User history facts</text>
  <text x="236" y="142" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Grounding Source</text>

  <rect x="316" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.6"/>
  <text x="382" y="70" fill="#2563EB" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. FEW-SHOT</text>
  <text x="382" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">2-3 golden input</text>
  <text x="382" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">to output examples</text>
  <text x="382" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">demonstrating format</text>
  <text x="382" y="142" fill="#2563EB" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Calibration</text>

  <rect x="462" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.6"/>
  <text x="528" y="70" fill="#7C3AED" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. REASONING</text>
  <text x="528" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">"Think step-by-step</text>
  <text x="528" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">in &lt;thinking&gt; tags</text>
  <text x="528" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">before answering"</text>
  <text x="528" y="142" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Chain-of-Thought</text>

  <rect x="608" y="46" width="130" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="673" y="70" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5. JSON SCHEMA</text>
  <text x="673" y="92" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Zod / Pydantic</text>
  <text x="673" y="108" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Strict Types</text>
  <text x="673" y="124" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">No Markdown fence</text>
  <text x="673" y="142" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">100% Reliable Parse</text>
</svg>""",

    "model-api-architecture.svg": """<svg viewBox="0 0 780 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="780" height="160" rx="12" fill="#F8FAFC"/>
  <text x="390" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Secure Serverless Model Gateway &amp; Streaming Architecture</text>

  <rect x="24" y="46" width="150" height="96" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.6"/>
  <text x="99" y="72" fill="#0284C7" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Client Browser</text>
  <text x="99" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">React 18 + Vite</text>
  <text x="99" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">ReadableStream hook</text>
  <text x="99" y="128" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Zero API Keys in bundle</text>

  <path d="M176 80H234" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
  <text x="205" y="74" fill="#0284C7" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">HTTPS POST</text>
  <path d="M234 104H176" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
  <text x="205" y="118" fill="#059669" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">SSE Stream</text>

  <rect x="236" y="46" width="220" height="96" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="2"/>
  <text x="346" y="68" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">API Route Proxy (Next / Node)</text>
  <text x="346" y="88" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">• Verify Session &amp; Rate Limits</text>
  <text x="346" y="104" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">• Inject `process.env.API_SECRET`</text>
  <text x="346" y="120" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">• Semantic Caching &amp; Token Audit</text>
  <text x="346" y="136" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Server-Side Security Isolation</text>

  <path d="M458 80H516" stroke="#0891B2" stroke-width="2" stroke-linecap="round"/>
  <text x="487" y="74" fill="#0891B2" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Model Req</text>
  <path d="M516 104H458" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
  <text x="487" y="118" fill="#059669" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Chunks</text>

  <rect x="518" y="46" width="238" height="96" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.6"/>
  <text x="637" y="72" fill="#7C3AED" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Model Provider API</text>
  <text x="637" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Gemini / Claude / OpenAI</text>
  <text x="637" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Next-Token Inference Engine</text>
  <text x="637" y="128" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Tiered Flash &amp; Pro Models</text>
</svg>""",

    "rag-architecture.svg": """<svg viewBox="0 0 780 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="780" height="170" rx="12" fill="#F8FAFC"/>
  <text x="390" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The Dual-Path RAG Pipeline: Ingestion &amp; Semantic Retrieval</text>

  <rect x="20" y="46" width="136" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.5"/>
  <text x="88" y="70" fill="#0891B2" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. DOCUMENTS</text>
  <text x="88" y="90" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">PDFs, Dossiers,</text>
  <text x="88" y="106" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">interviews, manuals</text>
  <text x="88" y="122" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Raw Unstructured</text>
  <text x="88" y="140" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Domain Knowledge</text>

  <path d="M158 98H172" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="174" y="46" width="136" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
  <text x="242" y="70" fill="#0284C7" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. CHUNKING</text>
  <text x="242" y="90" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">400-token chunks</text>
  <text x="242" y="106" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">50-token overlap</text>
  <text x="242" y="122" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Preserve context</text>
  <text x="242" y="140" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Text Normalization</text>

  <path d="M312 98H326" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="328" y="46" width="136" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="396" y="70" fill="#7C3AED" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. EMBEDDINGS</text>
  <text x="396" y="90" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">768 or 1536-dim</text>
  <text x="396" y="106" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">numerical vectors</text>
  <text x="396" y="122" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Dense representation</text>
  <text x="396" y="140" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Semantic Geometry</text>

  <path d="M466 98H480" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="482" y="46" width="136" height="106" rx="8" fill="#FFFFFF" stroke="#EA580C" stroke-width="1.5"/>
  <text x="550" y="70" fill="#EA580C" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. VECTOR DB</text>
  <text x="550" y="90" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Pinecone / pgvector</text>
  <text x="550" y="106" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">HNSW Indexing</text>
  <text x="550" y="122" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Cosine Similarity</text>
  <text x="550" y="140" fill="#EA580C" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Top-K Nearest Docs</text>

  <path d="M620 98H634" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="636" y="46" width="124" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="698" y="70" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5. GROUNDED</text>
  <text x="698" y="90" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Context Injection</text>
  <text x="698" y="106" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Exact Citations</text>
  <text x="698" y="122" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">&lt;0.5% Hallucination</text>
  <text x="698" y="140" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Accurate Synthesis</text>
</svg>""",

    "react-agent-loop.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The Bounded ReAct (Reason + Act) Agent Execution Loop</text>

  <rect x="24" y="46" width="156" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.8"/>
  <text x="102" y="70" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. THOUGHT</text>
  <text x="102" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Model reasons about goal</text>
  <text x="102" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">"I need the operator's</text>
  <text x="102" y="126" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">recorded heat score..."</text>
  <text x="102" y="144" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CoT Internal Plan</text>

  <path d="M182 80H234" stroke="#0891B2" stroke-width="2" stroke-linecap="round"/>
  <text x="208" y="74" fill="#0891B2" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">tool_call</text>

  <rect x="236" y="46" width="168" height="106" rx="8" fill="#FFFFFF" stroke="#D97706" stroke-width="1.8"/>
  <text x="320" y="70" fill="#D97706" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. ACTION (TOOL USE)</text>
  <text x="320" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">`get_problem_record(id)`</text>
  <text x="320" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">External DB / Weather API</text>
  <text x="320" y="126" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Human-in-Loop on writes</text>
  <text x="320" y="144" fill="#D97706" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Schema-Validated Args</text>

  <path d="M406 80H458" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
  <text x="432" y="74" fill="#D97706" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">result</text>

  <rect x="460" y="46" width="144" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.8"/>
  <text x="532" y="70" fill="#7C3AED" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. OBSERVATION</text>
  <text x="532" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Tool output injected</text>
  <text x="532" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">`{ temp: 42, pain: 84 }`</text>
  <text x="532" y="126" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Depth limit: &lt;= 5 steps</text>
  <text x="532" y="144" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Loop Termination</text>

  <path d="M606 98H628" stroke="#059669" stroke-width="2" stroke-linecap="round"/>

  <rect x="630" y="46" width="106" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="683" y="70" fill="#059669" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. FINISH</text>
  <text x="683" y="92" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Synthesised</text>
  <text x="683" y="108" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">verified</text>
  <text x="683" y="124" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">response</text>
  <text x="683" y="144" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Complete</text>
</svg>""",

    "copilot-anatomy.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Problem Solver Copilot Component Architecture</text>

  <rect x="24" y="46" width="168" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.6"/>
  <text x="108" y="70" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Dossier Context Engine</text>
  <text x="108" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Pulls validated problem facts</text>
  <text x="108" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Pain score, interviews &amp; TAM</text>
  <text x="108" y="128" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Dynamic context window assembly</text>
  <text x="108" y="144" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Grounding Source</text>

  <path d="M194 98H210" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="212" y="46" width="170" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.6"/>
  <text x="297" y="70" fill="#0284C7" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Streaming UI Interface</text>
  <text x="297" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Chunk-by-chunk token render</text>
  <text x="297" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">&lt; 350ms Time-to-First-Token</text>
  <text x="297" y="128" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Inline citations &amp; source tags</text>
  <text x="297" y="144" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Human-Centered UX</text>

  <path d="M384 98H400" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="402" y="46" width="170" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.6"/>
  <text x="487" y="70" fill="#7C3AED" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Tool Dispatch Gateway</text>
  <text x="487" y="92" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Function calling router</text>
  <text x="487" y="110" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Database query execution</text>
  <text x="487" y="128" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">External climate &amp; pricing APIs</text>
  <text x="487" y="144" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Action Execution</text>

  <path d="M574 98H590" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="592" y="46" width="144" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="664" y="70" fill="#059669" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Feedback &amp; Telemetry</text>
  <text x="664" y="92" fill="#1E293B" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Thumbs Up / Down</text>
  <text x="664" y="110" fill="#1E293B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Golden dataset curation</text>
  <text x="664" y="128" fill="#1E293B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Continuous improvement</text>
  <text x="664" y="144" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Data Flywheel</text>
</svg>""",

    "ai-evals-pyramid.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The AI Quality Assurance &amp; Evaluation Pyramid</text>

  <rect x="24" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.6"/>
  <text x="40" y="72" fill="#0891B2" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">1. GOLDEN DATASET</text>
  <text x="40" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• 50-100 real customer queries</text>
  <text x="40" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Human ground-truth expected answers</text>
  <text x="40" y="134" fill="#0891B2" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Foundation of all AI testing</text>

  <rect x="268" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.8"/>
  <text x="284" y="72" fill="#7C3AED" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">2. LLM-AS-A-JUDGE</text>
  <text x="284" y="94" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">• Calibrated scoring rubrics (1-5)</text>
  <text x="284" y="112" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">• Faithfulness, Groundedness, Toxicity</text>
  <text x="284" y="134" fill="#7C3AED" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Automated, reproducible grading</text>

  <rect x="512" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="528" y="72" fill="#059669" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">3. CI/CD DEPLOY GATE</text>
  <text x="528" y="94" fill="#1E293B" font-size="11" font-family="system-ui, sans-serif">• Runs on every GitHub pull request</text>
  <text x="528" y="112" fill="#1E293B" font-size="11" font-family="system-ui, sans-serif">• Blocks merge if accuracy drops &gt;2%</text>
  <text x="528" y="134" fill="#059669" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Zero regression deployments</text>
</svg>""",

    "ai-safety-defense.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Defense-in-Depth Generative AI Security Framework</text>

  <rect x="24" y="46" width="168" height="106" rx="8" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.8"/>
  <text x="108" y="70" fill="#DC2626" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. INPUT SANITIZATION</text>
  <text x="108" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Block Prompt Injections</text>
  <text x="108" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Detect Jailbreak strings</text>
  <text x="108" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Scrub PII (emails, cards)</text>
  <text x="108" y="142" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Pre-Flight Filter</text>

  <path d="M194 98H210" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="212" y="46" width="170" height="106" rx="8" fill="#FFFFFF" stroke="#D97706" stroke-width="1.8"/>
  <text x="297" y="70" fill="#D97706" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. SYSTEM BOUNDS</text>
  <text x="297" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Immutable system persona</text>
  <text x="297" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Strict role non-override</text>
  <text x="297" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Tagged user context delimiters</text>
  <text x="297" y="142" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Instruction Fortress</text>

  <path d="M384 98H400" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="402" y="46" width="170" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.8"/>
  <text x="487" y="70" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. TOOL PERMISSIONS</text>
  <text x="487" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Read-only default access</text>
  <text x="487" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Strict parameter schemas</text>
  <text x="487" y="124" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Human confirmation on mutates</text>
  <text x="487" y="142" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Action Safeguards</text>

  <path d="M574 98H590" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>

  <rect x="592" y="46" width="144" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="664" y="70" fill="#059669" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. OUTPUT SHIELDS</text>
  <text x="664" y="92" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Regex secret leak audit</text>
  <text x="664" y="108" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Toxicity &amp; refusal filters</text>
  <text x="664" y="124" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">JSON schema enforcement</text>
  <text x="664" y="142" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Clean Client Payload</text>
</svg>""",

    "cost-latency-cascade.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Tiered Model Routing Cascade with Semantic Caching</text>

  <rect x="24" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="40" y="72" fill="#059669" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">1. SEMANTIC CACHE</text>
  <text x="40" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Vector similarity on past queries</text>
  <text x="40" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Serves 30-40% of repetitive asks</text>
  <text x="40" y="134" fill="#059669" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Cost: $0.00 · Latency: 15ms</text>

  <rect x="268" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8"/>
  <text x="284" y="72" fill="#0284C7" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">2. FLASH / FAST MODEL</text>
  <text x="284" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Handles classifications &amp; summaries</text>
  <text x="284" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Resolves 50%+ of unique prompts</text>
  <text x="284" y="134" fill="#0284C7" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Cost: $0.15/1M · Latency: 350ms</text>

  <rect x="512" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.6"/>
  <text x="528" y="72" fill="#7C3AED" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">3. REASONING ENGINE</text>
  <text x="528" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Reserved for hard multi-step tasks</text>
  <text x="528" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Deep analytical synthesis</text>
  <text x="528" y="134" fill="#7C3AED" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Cost: $5.00/1M · Latency: 2500ms</text>
</svg>""",

    "hybrid-ml-llm.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The Hybrid Architecture: Tabular Scoring + Generative LLM</text>

  <rect x="24" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8"/>
  <text x="40" y="72" fill="#0284C7" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">1. TABULAR FEATURES</text>
  <text x="40" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Frequency, duration, wasted hours</text>
  <text x="40" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Direct operator financial cost</text>
  <text x="40" y="134" fill="#0284C7" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Raw Quantitative Metrics</text>

  <rect x="268" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.8"/>
  <text x="284" y="72" fill="#0891B2" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">2. GRADIENT BOOSTING / ML</text>
  <text x="284" y="94" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">• Computes Pain Score (0-100)</text>
  <text x="284" y="112" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">• Instant, explainable ranking</text>
  <text x="284" y="134" fill="#0891B2" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Microsecond Determinism</text>

  <rect x="512" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.8"/>
  <text x="528" y="72" fill="#7C3AED" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">3. GENERATIVE COPILOT</text>
  <text x="528" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Ingests calculated score + context</text>
  <text x="528" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">• Drafts customer-ready proposals</text>
  <text x="528" y="134" fill="#7C3AED" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Natural Language Synthesis</text>
</svg>"""
}

target_dir = "public/academy/diagrams"
os.makedirs(target_dir, exist_ok=True)

for fname, svg_content in DIAGRAMS.items():
    filepath = os.path.join(target_dir, fname)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content.strip())
    print(f"Created {filepath}")

print("All 12 Course 5 diagrams created successfully.")
