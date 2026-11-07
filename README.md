# GRANTLY – Scholarship Discovery & Application Assistance Platform

> **"Your Future. Your Opportunities."**

GRANTLY is a modern, responsive, and student-first EdTech platform designed to simplify how students discover scholarships, understand complex eligibility criteria, prepare required documentation, follow official educational news, and track application deadlines.

---

## 🌟 Key Product Highlights & Features

1. **Brand Identity & Design System**:
   - Deep Purple (`#8055D9`), Secondary Purple (`#A78BFA`), Lavender (`#EDE5FC`), Background (`#F8F6FC`), Text (`#252039`), White (`#FFFFFF`).
   - Accessible dark theme equivalents with live toggle and localStorage persistence.
   - Distinctive typography using Google Fonts (Poppins for headings, Inter for body).
   - Fluid responsive layouts across desktop, tablet, and mobile with accessible focus states.

2. **100% Provenance & Verified Data Integrity**:
   - Real scholarship records verified against official government gazettes, department portals (National Scholarship Portal scholarships.gov.in, AICTE, KSB), and global bodies (Chevening UK, Fulbright-Nehru USIEF, DAAD Germany, Erasmus Mundus).
   - Provenance provenance metadata: official URL, issuing authority, last verified timestamp, and auditor notes.
   - Clear separation between verified records and clearly labelled specimen demo entries.

3. **Multi-Step Adaptive Student Onboarding**:
   - Step 1: Personal details with automated age calculation from Date of Birth and voluntary gender disclosure.
   - Step 2: Educational Level selection (School Student 6th–12th, Undergraduate, Postgraduate).
   - Step 3: Adaptive academic forms:
     - School: Class 6th–12th, board, marksheet performance.
     - Undergraduate: Degree, branch, semester, CGPA (10-scale or %), Class 10th & 12th percentiles.
     - Postgraduate: Degree, UG percentage, work experience, research records.
   - Step 4: Means-tested criteria (family annual income ceiling, state domicile, voluntary category & disability status, and minor safeguards).
   - Step 5: Study preferences (India / International / Both, field of study, provider types).
   - Step 6: Visual review with edit shortcuts and instant profile generation.

4. **Transparent Algorithmic Eligibility Checker & "What-If" Simulator**:
   - No opaque black boxes: calculates exact match scores (0–100%) and itemized criterion-by-criterion status (`Eligible`, `Potentially Eligible`, `Additional Information Required`, `Not Eligible`).
   - Interactive standalone simulator: allows students to test "what-if" scenarios by sliding marks (40%–100%) or income thresholds to see real-time eligibility shifts.

5. **Guided 9-Step Application Assistant**:
   - Step 1: Formal eligibility review against student profile.
   - Step 2: Official scheme rules & warning against fraudulent fees.
   - Step 3: Official required documents list.
   - Step 4: Candidate profile preview.
   - Step 5: Document upload checklist with simulated file upload and size tracking.
   - Step 6: Pre-submission audit.
   - Step 7: Official verified application link & anti-phishing advisory.
   - Step 8: Direct link out to launch genuine external portal (NSP / Chevening / USIEF / DAAD).
   - Step 9: Self-reported submission logger capturing portal acknowledgement numbers and dates.

6. **Application Tracker Dashboard**:
   - Real-time pipeline with status filters (Draft, Preparing, Ready to Apply, Submitted, Under Review, Approved, Rejected).
   - Provenance tags distinguishing self-reported from provider-confirmed statuses.
   - Historical activity log timeline.

7. **AI Scholarship Assistant**:
   - Dual interface: Floating interactive widget throughout the app + full-page dedicated AI assistant.
   - Grounded in verified scholarship facts with official source citations.
   - Strict guardrails: never guarantees approvals, never fabricates dead links, and reminds users that final submissions take place on official portals.

8. **Education News & Policy Bulletins**:
   - Categorized press dispatches (Government Schemes, International Fellowships, Policy Updates, Deadlines).
   - Dedicated article details page with primary publisher citations.

9. **Multilingual Architecture**:
   - Built on `i18next` and `react-i18next` with complete translation key separation.
   - Ships with English and full Hindi (`हिंदी`) translation ready.

---

## 📁 Project Architecture & Folder Structure

```
c:\Users\dell3\OneDrive\Documents\Grantly\
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── logo.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types/
    │   └── index.ts                 # Strongly typed models (Scholarship, StudentProfile, Application, News, AI)
    ├── styles/
    │   └── index.css                # CSS custom properties, responsive breakpoints & dark mode
    ├── i18n/
    │   ├── index.ts                 # i18next configuration
    │   └── locales/
    │       ├── en.json              # English UI copy
    │       └── hi.json              # Hindi UI copy
    ├── contexts/
    │   ├── AuthContext.tsx          # Authentication & demo persistence
    │   ├── ThemeContext.tsx         # Light / Dark theme management
    │   └── SavedScholarshipsContext.tsx # Shortlist bookmark state
    ├── services/
    │   ├── auth/authService.ts      # Demo auth & profile persistence
    │   ├── scholarships/scholarshipService.ts # Catalog search, filtering, and sorting
    │   ├── eligibility/eligibilityService.ts  # Transparent rule engine
    │   ├── applications/applicationService.ts # Application tracker & 9-step assistant
    │   ├── ai/aiService.ts          # Grounded AI guidance adapter
    │   └── news/newsService.ts      # Education press service
    ├── data/
    │   ├── scholarships/index.ts    # Authentic verified scholarship records
    │   └── news/index.ts            # Official education press releases
    ├── layouts/
    │   ├── PublicLayout.tsx         # Navbar + Main + Footer
    │   └── DashboardLayout.tsx      # Collapsible Left Sidebar + Topbar + Floating AI
    ├── components/
    │   ├── navigation/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   └── assistant/
    │       └── FloatingAIAssistant.tsx
    ├── pages/
    │   ├── public/
    │   │   ├── HomePage.tsx         # Landing page (Hero, Problem/Solution, Steps, Features, Testimonials)
    │   │   ├── AboutPage.tsx        # Mission & provenance integrity
    │   │   ├── VisionMissionPage.tsx
    │   │   ├── HowItWorksPage.tsx
    │   │   ├── ContactPage.tsx
    │   │   ├── PrivacyPage.tsx
    │   │   └── TermsPage.tsx
    │   ├── auth/
    │   │   ├── SignInPage.tsx
    │   │   ├── SignUpPage.tsx
    │   │   └── ForgotPasswordPage.tsx
    │   ├── onboarding/
    │   │   └── OnboardingPage.tsx   # 6-step adaptive student registration
    │   ├── dashboard/
    │   │   └── DashboardOverviewPage.tsx # Recharts charts, KPIs, recommendations & deadlines
    │   ├── scholarships/
    │   │   ├── ScholarshipListPage.tsx
    │   │   ├── ScholarshipDetailsPage.tsx
    │   │   ├── EligibilityCheckerPage.tsx
    │   │   └── SavedScholarshipsPage.tsx
    │   ├── applications/
    │   │   ├── ApplicationAssistantPage.tsx # 9-step guided workflow
    │   │   └── ApplicationTrackerPage.tsx   # Pipeline table & timeline
    │   ├── assistant/
    │   │   └── AIAssistantPage.tsx  # Full-page AI chat
    │   ├── news/
    │   │   ├── NewsListPage.tsx
    │   │   └── NewsArticleDetailsPage.tsx
    │   └── profile/
    │       ├── StudentProfilePage.tsx # Edit profile details & recalculate
    │       └── SettingsPage.tsx       # Theme, language, alerts & LocalStorage reset
    └── routes/
        └── index.tsx                # Client-side router configuration
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
- Node.js (v18 or higher; tested on Node v24)
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will start at `http://localhost:3000` (or the next available port).

### 4. Build for Production
```bash
npm run build
```

---

## 🧪 Demonstration Mode & Walkthrough

1. **Quick Sign-In**:
   - On the `/signin` screen, click **"Sign In as Demo Student"** to instantly test the platform with a pre-configured 3rd-year engineering student profile (Aarav Mehta, NIT, 8.4 CGPA, verified ₹3.5L household income).
   - Alternatively, click **"Get Started"** on the landing page to experience the 6-step adaptive onboarding from scratch.

2. **Adaptive Onboarding**:
   - Enter DOB to see age auto-calculated.
   - Switch between **School**, **Undergraduate**, and **Postgraduate** in Step 2 to observe dynamic form fields in Step 3.
   - Complete Step 4 and review everything in Step 6 to transition directly into your tailored dashboard.

3. **Check Eligibility & What-If Simulator**:
   - Visit `/app/eligibility` to select any scholarship and drag the score slider from 75% to 85% to see the match status shift live from "Additional Info Required" or "Not Eligible" to "Eligible (100% Match)".

4. **Guided Application Assistant**:
   - From any scholarship details page or recommendation, click **"Start Preparation"**.
   - Navigate through the 9 steps, simulate document uploads, review portal safety warnings, and record your simulated application acknowledgement number.

---

## 🔌 Future Backend & External Integrations Roadmap

While this release operates fully as an interactive frontend with LocalStorage demo persistence and modular service abstractions, it is architected for seamless transition to production services:

| Layer | Frontend Demo Simulation | Production Backend Integration |
|---|---|---|
| **Authentication** | `authService.ts` via LocalStorage & Demo JWT | Supabase Auth / Firebase / OAuth2 / DigiLocker Single-Sign-On |
| **Scholarship Data** | `scholarshipService.ts` from curated verified records | National Scholarship Portal (NSP) API, AICTE API, University RSS/JSON feeds |
| **Eligibility Engine** | Client-side rule engine in `eligibilityService.ts` | Microservice with state revenue API integrations for automated income/caste verification |
| **AI Assistant** | `aiService.ts` mock retrieval with source citations | Gemini 1.5 Pro / Flash via backend secure endpoint with LangChain / RAG index |
| **News & Alerts** | `newsService.ts` from press dispatches | Webhooks from Ministry of Education and university press feeds |
| **Application Submission** | 9-step checklist with official portal links | DigiLocker API document pull & official API webhooks where permitted |

