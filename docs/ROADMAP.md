# Roadmap

## Plan Agent Output

Goal: deliver a measurable MVP that demonstrates at least 50% operational workload reduction by comparing manual handling estimates against AI-assisted workflow estimates.

## Milestones

1. **Project Foundation**
   - Create monorepo structure.
   - Add Docker and local run instructions.
   - Define code standards and GitHub Flow.

2. **Backend MVP**
   - Build FastAPI service.
   - Implement request persistence and seed data.
   - Add AI service facade with mock provider.
   - Expose request and metrics endpoints.

3. **Frontend MVP**
   - Build dashboard metrics screen.
   - Build request submission form.
   - Build request list and approval detail screens.
   - Surface AI classification, extracted fields, and draft response.

4. **Documentation and Review**
   - Complete architecture, prompt, traceability, and final review docs.
   - Run AI-assisted refactoring and optimization checklist.
   - Prepare demo flow.

## GitHub Issues

### #1 Initialize monorepo structure
- Create `frontend`, `backend`, and `docs` folders.
- Add `.gitignore`, `.cursorrules`, `docker-compose.yml`, and root README.
- Branch: `feature/project-setup`

### #2 Add backend FastAPI project
- Add FastAPI app entrypoint.
- Configure CORS and health behavior.
- Branch: `feature/backend-api`

### #3 Implement request data model
- Add SQLAlchemy model and Pydantic schemas.
- Include workflow status and source enums.
- Branch: `feature/backend-api`

### #4 Implement AI classification service
- Add provider interface and mock classification.
- Keep real LLM provider extension point.
- Branch: `feature/ai-services`

### #5 Implement workflow engine
- Orchestrate classify, extract, draft, persist status transitions.
- Branch: `feature/workflow-engine`

### #6 Implement request API endpoints
- Add create/list/detail/approve/reject endpoints.
- Branch: `feature/backend-api`

### #7 Add metrics endpoint
- Return manual and automated step/time savings.
- Branch: `feature/demo-metrics`

### #8 Build dashboard UI
- Show KPI cards and savings summary.
- Branch: `feature/frontend-dashboard`

### #9 Build new request form
- Add title, content, source selector, and submit behavior.
- Branch: `feature/frontend-dashboard`

### #10 Build request detail approval screen
- Display original request, AI outputs, approve/reject actions.
- Branch: `feature/approval-flow`

### #11 Add demo seed data
- Seed at least five representative requests.
- Branch: `feature/demo-metrics`

### #12 Write architecture and roadmap docs
- Complete `ARCHITECTURE.md` and `ROADMAP.md`.
- Branch: `feature/documentation`

### #13 Add AI traceability documentation
- Document AI-assisted modules and human review method.
- Branch: `feature/documentation`

### #14 Run final refactoring and optimization review
- Complete final checklist and record known risks.
- Branch: `fix/final-review`

## Team Distribution

| Role | Owner | Responsibilities |
| --- | --- | --- |
| Lead Developer / Maintainer | Team Member 1 | Main repository, PR reviews, standards, release readiness |
| Feature Developer A | Team Member 2 | Backend API, AI services, workflow engine |
| Feature Developer B | Team Member 3 | Frontend dashboard, approval flow, demo polish |

## Branch Plan

- `feature/project-setup`
- `feature/backend-api`
- `feature/ai-services`
- `feature/workflow-engine`
- `feature/frontend-dashboard`
- `feature/approval-flow`
- `feature/demo-metrics`
- `feature/documentation`
- `fix/final-review`

## Pull Request Rules

- No direct push to `main`.
- Each feature branch opens a PR into `main`.
- At least one teammate reviews each PR.
- Commit messages use present-tense technical wording, for example `feat: add request classification service`.
