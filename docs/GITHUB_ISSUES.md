# GitHub Issues

## #1 Initialize monorepo structure

Create the required `frontend`, `backend`, and `docs` monorepo folders. Add baseline config files, README, Docker Compose, and Git ignore rules.

Branch: `feature/project-setup`

## #2 Add backend FastAPI project

Create the FastAPI application, CORS configuration, root health endpoint, dependency setup, and backend README.

Branch: `feature/backend-api`

## #3 Implement request data model

Add SQLAlchemy `Request` model and Pydantic schemas for request creation, response payloads, workflow statuses, source types, and metrics.

Branch: `feature/backend-api`

## #4 Implement AI classification service

Add AI provider interface and default mock classifier that returns category, priority, and department without requiring an API key.

Branch: `feature/ai-services`

## #5 Implement workflow engine

Create service orchestration for received, classified, extracted, draft created, and waiting approval statuses.

Branch: `feature/workflow-engine`

## #6 Implement request API endpoints

Add create, list, detail, approve, and reject endpoints with understandable error responses.

Branch: `feature/backend-api`

## #7 Add metrics endpoint

Expose demo metrics for manual and automated steps/minutes, savings percentages, processed count, approved count, and waiting approval count.

Branch: `feature/demo-metrics`

## #8 Build dashboard UI

Build dashboard KPI cards and savings section showing total requests, waiting approval count, average manual minutes, average automated minutes, time reduction, and step reduction.

Branch: `feature/frontend-dashboard`

## #9 Build new request form

Build form for title, content, source type, and submit action that creates a request through the backend API.

Branch: `feature/frontend-dashboard`

## #10 Build request detail approval screen

Build detail view for original content, AI classification, extracted fields, draft response, approve button, and reject button.

Branch: `feature/approval-flow`

## #11 Add demo seed data

Seed at least five requests: billing dispute, technical support, sales quote, HR leave request, and delivery delay.

Branch: `feature/demo-metrics`

## #12 Write architecture and roadmap docs

Document system architecture, workflow state machine, API endpoints, milestones, issue list, team roles, and branch plan.

Branch: `feature/documentation`

## #13 Add AI traceability documentation

Document AI-assisted modules, Plan Agent output, Skills Agent output, and human verification process.

Branch: `feature/documentation`

## #14 Run final refactoring and optimization review

Run final checklist covering readability, API handling, data model, security, demo risks, and known gaps.

Branch: `fix/final-review`
