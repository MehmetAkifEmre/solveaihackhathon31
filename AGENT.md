# AGENTS.md

# AI Destekli Operasyon Talep İşleme Paneli

## 1. Project Overview

**Project name:** AI Destekli Operasyon Talep İşleme Paneli

This project is developed for **SolveX AI Hackathon 2026** as an AI-augmented workflow product for operational request processing.

The main objective is to reduce repetitive manual operations work by **at least 50%**. In many companies, customer support messages, invoice disputes, sales requests, HR requests, and operational notifications are manually read, classified, routed to the correct department, entered into a table or system, and answered with a draft response. This project automates that workflow with an AI-supported panel while keeping humans in the approval loop.

The system:

- Reads request content
- Determines category
- Determines priority
- Assigns department
- Extracts important fields
- Generates a draft response
- Sends the result to human approval
- Shows time and step reduction on the dashboard

Main message:

> "İnsanlar tekrar eden işleri yapmakla değil, karar vermekle uğraşsın."

## 2. Hackathon Compliance Rules

- GitHub Flow must be used.
- The `main` branch represents the stable and demo-ready version.
- Direct pushes to `main` are not allowed.
- Every new task must use a branch in one of these formats:
  - `feature/task-name`
  - `fix/bug-name`
  - `docs/document-name`
- Merge is allowed only through Pull Requests.
- Every PR must be reviewed by at least one teammate.
- Commit messages must be clear, technical, and written in present tense.
- The AI-Augmented Development process must be documented.
- Plan Agent outputs must be stored in `docs/ARCHITECTURE.md` and `docs/ROADMAP.md`.
- Skills Agent usage must be explained in `docs/AI_TRACEABILITY.md`.
- AI-assisted code sections must include traceability comments.
- Final refactoring and optimization review must be stored in `docs/FINAL_REVIEW.md`.

## 3. Team Roles

### A. Lead Developer / Maintainer

Responsibilities:

- Sets up the repository structure.
- Protects the `main` branch.
- Manages the PR review process.
- Owns documentation.
- Checks GitHub Flow compliance.
- Performs final integration.
- Prepares the demo flow.

Owned files:

- `README.md`
- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/AI_TRACEABILITY.md`
- `docs/PROMPTS.md`
- `docs/FINAL_REVIEW.md`
- `docs/ISSUES.md`
- `docs/PR_CHECKLIST.md`
- `.cursorrules`
- `docker-compose.yml`

Suggested branch:

- `feature/project-setup`

### B. Backend Feature Developer

Responsibilities:

- Develops the FastAPI backend.
- Creates the request data model.
- Writes the workflow engine.
- Writes the Mock AI provider.
- Develops AI classification, data extraction, and draft response services.
- Writes the metrics endpoint.
- Adds demo seed data.
- Writes the backend README.
- Adds AI traceability comments to backend code.

Owned folder:

- `backend/`

Suggested branch:

- `feature/backend-api`

### C. Frontend Feature Developer

Responsibilities:

- Develops the Next.js frontend.
- Builds the dashboard screen.
- Builds the New Request form.
- Builds the request list and detail screens.
- Builds the approval/reject flow.
- Writes the API client.
- Writes the frontend README.
- Adds AI traceability comments to frontend code.

Owned folder:

- `frontend/`

Suggested branch:

- `feature/frontend-dashboard`

## 4. Product Scope

### MVP Scope

The MVP focuses on a reliable demo workflow that proves measurable operational efficiency. It should be simple, deterministic, understandable, and easy to run without external AI API keys.

Manual process:

1. Read request
2. Determine category
3. Determine priority
4. Find department
5. Enter record into system/database
6. Write response
7. Follow up

Automated process:

1. Request is submitted
2. AI analyzes and prepares the result
3. Human approves or rejects

Measurable impact:

```text
manual_steps = 7
automated_steps = 3
step_reduction_percent = 57
manual_minutes = 10
automated_minutes = 4
time_reduction_percent = 60
```

These metrics must be displayed clearly on the dashboard.

## 5. Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Fetch API
- Simple CSS or Tailwind

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- SQLite, PostgreSQL, or in-memory fallback

### AI Layer

- Mock AI Provider by default
- Optional real LLM provider
- API keys must not be hardcoded
- Secrets must be managed through environment variables

### Database

- In-memory or SQLite for MVP
- PostgreSQL/Supabase for the extended version

## 6. Required Repository Structure

```text
ai-ops-assistant/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── README.md
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py
│   │   ├── models/
│   │   │   └── request_model.py
│   │   ├── services/
│   │   │   ├── ai_provider.py
│   │   │   ├── ai_classifier.py
│   │   │   ├── data_extractor.py
│   │   │   ├── draft_generator.py
│   │   │   ├── workflow_engine.py
│   │   │   └── metrics_service.py
│   │   ├── seed.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── AI_TRACEABILITY.md
│   ├── PROMPTS.md
│   ├── FINAL_REVIEW.md
│   ├── ISSUES.md
│   └── PR_CHECKLIST.md
├── AGENTS.md
├── .cursorrules
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 7. Backend Requirements

### `POST /requests`

Creates a new operational request, runs the AI-supported workflow, and returns the processed request.

Input:

```json
{
  "title": "string",
  "content": "string",
  "source": "email"
}
```

Allowed `source` values:

- `email`
- `form`
- `document`
- `manual`

Output fields:

- `id`
- `title`
- `content`
- `source`
- `category`
- `priority`
- `department`
- `extracted_fields`
- `draft_response`
- `status`
- `manual_minutes_estimate`
- `automated_minutes_estimate`
- `created_at`
- `updated_at`

### `GET /requests`

Returns all requests.

### `GET /requests/{id}`

Returns a single request.

### `POST /requests/{id}/approve`

Sets the request `status` value to `approved`.

### `POST /requests/{id}/reject`

Sets the request `status` value to `rejected`.

### `GET /metrics`

Returns:

- `manual_steps`
- `automated_steps`
- `step_reduction_percent`
- `manual_minutes`
- `automated_minutes`
- `time_reduction_percent`
- `processed_request_count`
- `approved_request_count`
- `waiting_approval_count`

## 8. Workflow Status Values

Allowed workflow status values:

- `received`
- `classified`
- `extracted`
- `draft_created`
- `waiting_approval`
- `approved`
- `rejected`
- `failed`

Typical flow:

```text
received → classified → extracted → draft_created → waiting_approval → approved/rejected
```

## 9. AI Provider Rules

Default provider:

- `MockAIProvider`

`MockAIProvider` must produce:

- `category`
- `priority`
- `department`
- `extracted_fields`
- `draft_response`

Keyword-based fallback rules:

- `fatura`, `ödeme`, `ücret`, `iade` → `billing` / `Finance`
- `hata`, `giriş`, `sistem`, `çalışmıyor` → `technical_support` / `Support`
- `teklif`, `fiyat`, `demo`, `satın alma` → `sales` / `Sales`
- `izin`, `maaş`, `bordro`, `insan kaynakları` → `hr` / `HR`
- `teslimat`, `stok`, `operasyon`, `gecikme` → `operations` / `Operations`
- If there is no match → `operations` / `Operations` / `medium`

## 10. Frontend Requirements

### Dashboard Route: `/`

Display:

- Total request count
- Waiting approval count
- Approved request count
- Manual minutes
- Automated minutes
- Time reduction percent
- Step reduction percent

The dashboard must clearly show this text:

> "Bu workflow, manuel süreci 7 adımdan 3 adıma indirerek yaklaşık %57 adım azaltımı ve 10 dakikadan 4 dakikaya indirerek %60 zaman tasarrufu sağlar."

### New Request Route: `/new-request`

Form fields:

- `title`
- `content`
- `source`

After submit, call `POST /requests`.

### Requests List Route: `/requests`

Table fields:

- `title`
- `category`
- `priority`
- `department`
- `status`
- `detail link`

### Request Detail Route: `/requests/[id]`

Display:

- Original request text
- Source
- AI category
- AI priority
- AI department
- Extracted fields
- AI draft response
- Workflow status
- Approve button
- Reject button

## 11. Required Frontend Components

- `MetricCard.tsx`
- `RequestTable.tsx`
- `RequestForm.tsx`
- `StatusBadge.tsx`
- `ApprovalPanel.tsx`

## 12. Required Frontend API Client

The file `frontend/lib/api.ts` must include:

- `getMetrics()`
- `getRequests()`
- `getRequest(id)`
- `createRequest(data)`
- `approveRequest(id)`
- `rejectRequest(id)`

Default backend URL:

```text
http://localhost:8000
```

Environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## 13. Demo Seed Data

At least 5 sample requests must be included.

### Fatura İtirazı

Geçen ay tarafımıza kesilen faturada fazla ücret yansıtıldığını düşünüyoruz. Kontrol edilmesini ve iade süreci hakkında bilgi verilmesini rica ederiz.

### Teknik Destek İsteği

Kullanıcı paneline giriş yapamıyoruz. Sistem hata veriyor ve işlem tamamlanmıyor.

### Satış Teklifi Talebi

Kurumsal paketiniz için fiyat teklifi ve demo toplantısı talep ediyoruz.

### İnsan Kaynakları İzin Talebi

Önümüzdeki hafta için yıllık izin talebimi iletmek istiyorum. İzin günlerimin kontrol edilmesini rica ederim.

### Operasyon Teslimat Gecikmesi

Siparişimizin teslimatı gecikti. Stok ve operasyon durumu hakkında bilgi almak istiyoruz.

## 14. AI Traceability Rules

Backend files must start with this comment format:

```python
# AI Traceability:
# Skills Agent assisted in designing this module for the hackathon MVP.
# Human review required before merge.
```

Frontend files must start with this comment format:

```typescript
// AI Traceability:
// Skills Agent assisted in structuring this UI component for demo clarity.
// Human review required before merge.
```

PR descriptions must include:

```markdown
AI Traceability:
- Agent used:
- Purpose:
- Human review:
- Risk:
```

## 15. Plan Agent Instructions

Plan Agent must produce:

- Architecture overview
- Roadmap
- Milestones
- GitHub issue list
- Subtasks
- Role distribution
- Branch plan
- Demo strategy

These outputs must be stored in:

- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

## 16. Skills Agent Instructions

Skills Agent may be used for:

- Backend API design
- Workflow state machine
- AI classification logic
- Data extraction logic
- Draft response generation
- Metrics calculation
- Frontend dashboard clarity
- Error handling
- Refactoring
- Optimization

Skills Agent outputs must be documented in:

- `docs/AI_TRACEABILITY.md`

## 17. Coding Standards

### General Rules

- Keep the MVP simple.
- Prioritize demo reliability.
- Do not add unnecessary dependencies.
- Do not hardcode secrets.
- Use environment variables.
- Keep code readable and modular.
- Use clear function names.
- Add simple error handling.
- Keep JSON responses predictable.
- The project must run without an external AI API key.

### Backend Rules

- Use FastAPI routers.
- Use Pydantic models.
- Keep AI services separate from API routes.
- Keep workflow logic in `workflow_engine.py`.
- Keep metrics logic in `metrics_service.py`.
- Enable CORS for frontend development.
- The mock provider must run deterministically for demo reliability.

### Frontend Rules

- Use TypeScript types.
- Include loading states.
- Include error states.
- Keep the UI clean and demo-focused.
- Make the 50%+ reduction message visible.
- Do not add authentication before the MVP is complete.

## 18. Metrics Calculation

Formulas:

```python
step_reduction_percent = round(((manual_steps - automated_steps) / manual_steps) * 100)
time_reduction_percent = round(((manual_minutes - automated_minutes) / manual_minutes) * 100)
```

Demo values:

```text
manual_steps = 7
automated_steps = 3
step_reduction_percent = 57
manual_minutes = 10
automated_minutes = 4
time_reduction_percent = 60
```

## 19. Demo Flow

3-minute demo flow:

1. Open the dashboard.
2. Show 7 manual steps, 3 automation steps, and 57% step reduction.
3. Show 10 minutes manual time, 4 minutes automated time, and 60% time savings.
4. Open the New Request page.
5. Submit a sample customer request.
6. Show AI category, priority, department, extracted fields, and draft response.
7. Approve the request.
8. Return to the dashboard.
9. Show the updated request count.

Core demo message:

> "Bu proje çalışanı süreçten çıkarmıyor; çalışanı tekrarlı işi yapan kişi olmaktan çıkarıp karar veren kişiye dönüştürüyor."

## 20. Definition of Done

A task is complete only when:

- Code runs locally.
- No direct push has been made to `main`.
- A feature branch has been used.
- PR description has been completed.
- AI traceability note has been added.
- Docs have been updated if needed.
- No secret has been hardcoded.
- Demo flow remains intact.
- At least one teammate has reviewed the PR.

## 21. Final Review Checklist

Before delivery, verify:

- Backend starts successfully
- Frontend starts successfully
- Dashboard loads metrics
- New request can be created
- Mock AI analysis runs
- Request detail page displays analysis
- Approve action works
- Reject action works
- Metrics show more than 50% reduction
- README is complete
- `ARCHITECTURE.md` is complete
- `ROADMAP.md` is complete
- `AI_TRACEABILITY.md` is complete
- `PROMPTS.md` is complete
- `FINAL_REVIEW.md` is complete
- `PR_CHECKLIST.md` is complete
- GitHub Flow is documented
- AI-assisted modules contain traceability comments

## 22. Do Not Do

- Do not build a large and complex product.
- Do not depend on a paid external service for the demo.
- Do not hardcode API keys.
- Do not skip documentation.
- Do not push directly to `main`.
- Do not hide AI usage.
- Do not write vague commit messages.
- Do not add authentication before the MVP is complete.
- Do not let UI complexity overshadow the core value proposition.
- Do not forget to show the 50%+ reduction.

## 23. Priority Order

If time is limited, follow this priority order:

1. Backend request workflow
2. Mock AI provider
3. Metrics endpoint
4. Dashboard
5. New request form
6. Request detail approval screen
7. Documentation
8. Docker
9. Optional styling improvements