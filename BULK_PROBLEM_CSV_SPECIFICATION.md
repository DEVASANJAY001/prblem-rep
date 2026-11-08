# Universal Single CSV Format Specification (Export, Import & Sample Template)

This specification defines the **Single Universal CSV Format** for the **prblms** platform.
The format provides **100% round-trip fidelity and symmetry** across:
1. **Sample Template CSV** (`public/sample-problems-template.csv` and "Download Sample CSV")
2. **Export CSV** (the "Export CSV" and "Export Selected" buttons in `/admin/problems`)
3. **Bulk Import CSV** (the "Bulk Import (CSV)" upload/paste modal in `/admin/problems`)

Any problem statement exported from the platform can be edited in Excel or Google Sheets and re-imported directly back into the platform without losing or altering any data across the **6 modules**.

---

## 1. Overview of the 6-Module Architecture

Every problem dossier on the platform contains data distributed across six primary modules:

1. **Module 1: Core Narrative & Operational Context** — The core issue headline, description, industry, severity, geographic location, occurrence frequency, affected personas, workflow triggers, operational frictions, current workarounds, submitter attribution, and platform credit sources.
2. **Module 2: Evidence & Statistical Telemetry** — Quantitative data points (`metric` + `label`), attached evidence whitepapers/reports (`title` + `url` + `description` + `type`), and reference links.
3. **Module 3: Market Telemetry & Impact** — TAM (Total Addressable Market), current solution penetration %, annual wasted inefficiency cost, citizens/users affected, audience size, and willingness to pay.
4. **Module 4: Research & Competitor Landscape** — Empirical key findings, research methodology, academic publications, and structured competitor analysis (`solution` + `pros` + `cons`).
5. **Module 5: Suggested MVP & Tech Specs** — Core MVP feature scope, technical architecture & latency requirements, and compliance standards (HIPAA, SOC2, FHIR, etc.).
6. **Module 6: Startup Mode & Venture Blueprint** — Venture hypothesis, target customer ICP segments, value proposition draft, existing solution gaps (`name` + `description` + `weaknessType` + `weakness`), venture exploration directions (`type` + `title` + `description` + `pros` + `cons` + `techStack`), validation questions, customer interview prompts, strategic angles, and risks.

---

## 2. Complete Column Mapping Table

| # | Column Header (Aliases Accepted) | Canonical Key | Module | Required | Format / Delimiter | Description & Example |
|---|---|---|---|---|---|---|
| 1 | `Problem Title` | `title` | 1. Core Narrative | **Yes** | Plain text | Specific headline. *e.g. "Data Interoperability Failure in Rural Clinics"* |
| 2 | `Description` | `description` | 1. Core Narrative | **Yes** | Plain text / multiline | Core issue summary and operational context. |
| 3 | `Industry` | `industry` | 1. Core Narrative | No | Plain text | Category name (*e.g. Healthcare, Logistics, Fintech, AI, Climate Tech*). Defaults to `Healthcare`. |
| 4 | `Severity` | `severity` | 1. Core Narrative | No | Enum | `minor`, `medium`, `major`, or `critical`. Defaults to `major`. |
| 5 | `Location` | `location` | 1. Core Narrative | No | Plain text | Geographic region (*e.g. "Rural United States", "Global", "India"*). Defaults to `Global`. |
| 6 | `Frequency` | `frequency` | 1. Core Narrative | No | Plain text | `Daily`, `Weekly`, `Monthly`, `Continuous`, or `Rare / Critical`. Defaults to `Daily`. |
| 7 | `Who Faces It` | `whoFacesIt` | 1. Core Narrative | No | Plain text | Target roles experiencing friction (*e.g. "Rural clinic administrators, primary care physicians"*). |
| 8 | `When It Happens` | `whenItHappens` | 1. Core Narrative | No | Plain text | Operational trigger (*e.g. "During patient intake and multi-specialty referrals"*). |
| 9 | `Why Frustrating` | `whyFrustrating` | 1. Core Narrative | No | Plain text | Human pain point (*e.g. "Staff spend hours manually tracking faxed documents"*). |
| 10 | `Current Solution` | `currentSolution` | 1. Core Narrative | No | Plain text | Status-quo tools (*e.g. "Legacy thermal fax machines, paper couriers"*). |
| 11 | `Submitter Name` | `submitterName` | 1. Core Narrative | No | Plain text | Name of author/scout (*e.g. "Dr. Sarah Chen, MD"*). Defaults to active admin. |
| 12 | `Submitter Role` | `submitterRole` | 1. Core Narrative | No | Plain text | Professional role (*e.g. "Rural Clinic Medical Director"*). |
| 13 | `Is Anonymous` | `isAnonymous` | 1. Core Narrative | No | Boolean | `true` or `false`. Defaults to `false`. |
| 14 | `Credits / Source` | `psFrom` | 1. Core Narrative | No | Delimited by `;` or `\|` | Origin tags (*e.g. "Own Thinking; Smart India Hackathon (SIH); Hack2skill"*). |
| 15 | `Custom Source Notes` | `psFromCustom` | 1. Core Narrative | No | Plain text | Attribution or survey reference notes. |
| 16 | `Data Points` | `dataPoints` | 2. Evidence & Data | No | `metric::label \| ...` or JSON | Statistical metrics. *e.g. "64%::Clinics relying on manual fax \| 4.2 hrs::Average latency \| $1.8B::Annual wasted cost"* |
| 17 | `Evidence Documents` | `evidenceDocuments` | 2. Evidence & Data | No | `title::url::desc::type \| ...` or JSON | Reports. *e.g. "CMS Standards::https://www.healthit.gov::Official survey::pdf"* |
| 18 | `Evidence URLs` | `evidenceUrls` | 2. Evidence & Data | No | Delimited by `;` or `\|` | Reference URLs. *e.g. "https://healthit.gov; https://ruralhealthinfo.org"* |
| 19 | `TAM` | `tam` | 3. Market & Impact | No | Currency string | Total Addressable Market. *e.g. "$4.8B"* |
| 20 | `Current Penetration` | `currentPenetration` | 3. Market & Impact | No | Number (0-100) | Penetration %. *e.g. 35* |
| 21 | `Wasted Cost` | `wastedCost` | 3. Market & Impact | No | Currency string | Economic waste. *e.g. "$1.8B"* |
| 22 | `Citizens Affected` | `citizensAffected` | 3. Market & Impact | No | Plain text | People impacted. *e.g. "46 million"* |
| 23 | `Audience Size` | `audienceSize` | 3. Market & Impact | No | Plain text | Demographic size. *e.g. "4,500+ clinics & 28,000 specialists"* |
| 24 | `Willingness To Pay` | `willingnessToPay` | 3. Market & Impact | No | Plain text | Pricing expectation. *e.g. "$150/mo per practitioner"* |
| 25 | `Key Findings` | `keyFindings` | 4. Research & Rivals | No | Delimited by `\|` or `;` | Research findings. *e.g. "Legacy EHRs charge export fees \| 22% burnout"* |
| 26 | `Research Methodology` | `researchMethodology` | 4. Research & Rivals | No | Plain text | Methodology description. |
| 27 | `Academic References` | `academicReferences` | 4. Research & Rivals | No | Delimited by `\|` or `;` | Academic papers. *e.g. "Journal of Rural Health (2024) \| Health Affairs (2024)"* |
| 28 | `Competitors` | `competitors` | 4. Research & Rivals | No | `solution::pros::cons \| ...` or JSON | Competitor breakdown. *e.g. "Epic::Seamless sync::Prohibitively expensive \| Fax::Universal::No parsing"* |
| 29 | `MVP Features` | `mvpFeatures` | 5. MVP Specs | No | Delimited by `\|` or `;` | MVP features. *e.g. "Bidirectional FHIR bridge \| Offline SQLite cache \| Web portal"* |
| 30 | `Technical Requirements` | `technicalRequirements` | 5. MVP Specs | No | Plain text | Architecture specs. *e.g. "SOC2 Type II, sub-200ms latency"* |
| 31 | `Compliance Standards` | `complianceStandards` | 5. MVP Specs | No | Delimited by `;` or `\|` | Certifications. *e.g. "HIPAA BAA Compliant; SOC2 Type II Ready; FHIR Validated"* |
| 32 | `Startup Mode Enabled` | `hasStartupMode` | 6. Startup Mode | No | Boolean | `true` or `false`. Defaults to `true`. |
| 33 | `Startup Thesis` | `startupThesis` | 6. Startup Mode | No | Plain text | Investment & venture thesis. |
| 34 | `Startup Target Segments` | `startupTargetSegments` | 6. Startup Mode | No | Delimited by `;` or `\|` | Beachhead ICP segments. *e.g. "Rural Clinic Admins; Independent Specialists"* |
| 35 | `Startup Value Prop` | `startupValueProp` | 6. Startup Mode | No | Plain text | One-sentence value proposition. |
| 36 | `Startup Solutions Gaps` | `startupSolutionsGaps` | 6. Startup Mode | No | `name::desc::weaknessType::weakness \| ...` | Solution gaps. *e.g. "Epic::Hospital standard::Weakness::Expensive ($50k+/yr)"* |
| 37 | `Startup Directions` | `startupDirections` | 6. Startup Mode | No | `type::title::desc::pros::cons::techStack \| ...` | Execution paths (*software*, *service*, *hardware*, *hybrid*). |
| 38 | `Startup Validation Questions` | `startupValidationQuestions` | 6. Startup Mode | No | Delimited by `\|` or `;` | Founder validation checklist questions. |
| 39 | `Discovery Interview Prompt` | `discoveryInterviewPrompt` | 6. Startup Mode | No | Plain text | Customer discovery interview question. |
| 40 | `Suggested Angles` | `suggestedAngles` | 6. Startup Mode | No | Delimited by `\|` or `;` | Strategic expansion and product angles. |
| 41 | `Key Risks` | `keyRisks` | 6. Startup Mode | No | Delimited by `\|` or `;` | Venture risks & moats. |
| 42 | `Status` | `status` | Metadata | No | Enum | `approved`, `pending`, `under_review`. Defaults to `approved` for admin bulk import. |

---

## 3. Delimiter & Formatting Rules

- **Header names are case-insensitive**: `Problem Title`, `title`, `problem_title`, `ProblemStatementTitle` are all mapped identically.
- **Lists**: Items can be separated by `|`, `;`, or newlines.
- **Compound objects (Metric + Label, Solution + Pros + Cons, etc.)**:
  - `metric::label` for Data Points: `"64%::Clinics relying on manual fax | 4.2 hrs::Average latency"`
  - `solution::pros::cons` for Competitors: `"Epic Care Everywhere::Seamless sync::Expensive for clinics"`
  - `name::description::weaknessType::weakness` for Startup Solution Gaps: `"Epic::Hospital EHR::Weakness::Too costly"`
  - `type::title::description::pros::cons::techStack` for Startup Directions: `"software::FHIR Bridge::Cloud OCR microservice::90% margins::Requires HIPAA::Next.js, Python, AWS Textract"`
- **Native JSON support**: Any cell containing a valid JSON array or object (`[{"metric":"64%","label":"..."}]`) is automatically parsed as JSON without needing delimiters.
- **Standard RFC 4180 Multiline Quotes**: Cells containing commas, quotes, or newlines must be enclosed in double quotes (`"..."`), and internal quotes escaped as `""`.

---

## 4. Admin Feature Workflow (`/admin/problems`)

1. **Accessing the Bulk Importer**:
   - Navigate to `/admin/problems` in the Admin Console.
   - Click the **"Bulk Import (CSV)"** button in the top action bar.
2. **Uploading / Pasting Data**:
   - **Upload Tab**: Drag & drop any `.csv` file or click "Browse Files".
   - **Paste Tab**: Paste raw tabular CSV text directly from Microsoft Excel or Google Sheets.
   - **Demo Button**: Click "Load 3 Production Demo Statements" for instant testing with complete real-world dossiers.
   - **Template Download**: Click "Download Sample CSV" to get a pre-populated `.csv` file.
3. **Configuration**:
   - Set **Default Publication Status** to *Approved & Verified* (immediately live on platform) or *Pending* (sent to review queue).
   - Set **Submitter Attribution** to custom name or current admin user.
4. **Validation & Inspection**:
   - System performs instant RFC-4180 parsing and checks required fields (`title`, `description`).
   - Summary stat cards display total rows, valid rows, and any errors.
   - Expand any row to inspect all 6 modules before posting.
   - Select or deselect specific rows.
5. **Execution & Live Progress**:
   - Click **"Import & Publish X Problems"**.
   - Displays real-time progress bar. Each problem statement is saved to Cloud Firestore and local storage, with AI scores, pain scores, and opportunity scores automatically calculated.
   - Completion screen lists all newly created IDs with direct links to "Edit in Studio" or "Open Live Public Dossier".
6. **Exporting Existing Data**:
   - Click **"Export CSV"** in `/admin/problems` header to export all statements.
   - Or select specific rows using the table checkboxes and click **"Export Selected"**.

