param(
  [string]$Repo = "MehmetAkifEmre/solveaihackhathon31",
  [string]$Token = $env:GITHUB_TOKEN
)

if (-not $Token) {
  Write-Error "Set GITHUB_TOKEN with repo issue write permission, then rerun this script."
  exit 1
}

$headers = @{
  Authorization = "Bearer $Token"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}

$issues = @(
  @{
    title = "Initialize monorepo structure"
    branch = "feature/project-setup"
    body = "Create frontend, backend, and docs folders. Add baseline config files, README, Docker Compose, and Git ignore rules."
  },
  @{
    title = "Add backend FastAPI project"
    branch = "feature/backend-api"
    body = "Create the FastAPI application, CORS configuration, root health endpoint, dependency setup, and backend README."
  },
  @{
    title = "Implement request data model"
    branch = "feature/backend-api"
    body = "Add SQLAlchemy Request model and Pydantic schemas for request creation, response payloads, workflow statuses, source types, and metrics."
  },
  @{
    title = "Implement AI classification service"
    branch = "feature/ai-services"
    body = "Add AI provider interface and default mock classifier that returns category, priority, and department without requiring an API key."
  },
  @{
    title = "Implement workflow engine"
    branch = "feature/workflow-engine"
    body = "Create service orchestration for received, classified, extracted, draft created, and waiting approval statuses."
  },
  @{
    title = "Implement request API endpoints"
    branch = "feature/backend-api"
    body = "Add create, list, detail, approve, and reject endpoints with understandable error responses."
  },
  @{
    title = "Add metrics endpoint"
    branch = "feature/demo-metrics"
    body = "Expose demo metrics for manual and automated steps/minutes, savings percentages, processed count, approved count, and waiting approval count."
  },
  @{
    title = "Build dashboard UI"
    branch = "feature/frontend-dashboard"
    body = "Build dashboard KPI cards and savings section showing total requests, waiting approval count, average minutes, time reduction, and step reduction."
  },
  @{
    title = "Build new request form"
    branch = "feature/frontend-dashboard"
    body = "Build form for title, content, source type, and submit action that creates a request through the backend API."
  },
  @{
    title = "Build request detail approval screen"
    branch = "feature/approval-flow"
    body = "Build detail view for original content, AI classification, extracted fields, draft response, approve button, and reject button."
  },
  @{
    title = "Add demo seed data"
    branch = "feature/demo-metrics"
    body = "Seed at least five requests: billing dispute, technical support, sales quote, HR leave request, and delivery delay."
  },
  @{
    title = "Write architecture and roadmap docs"
    branch = "feature/documentation"
    body = "Document system architecture, workflow state machine, API endpoints, milestones, issue list, team roles, and branch plan."
  },
  @{
    title = "Add AI traceability documentation"
    branch = "feature/documentation"
    body = "Document AI-assisted modules, Plan Agent output, Skills Agent output, and human verification process."
  },
  @{
    title = "Run final refactoring and optimization review"
    branch = "fix/final-review"
    body = "Run final checklist covering readability, API handling, data model, security, demo risks, and known gaps."
  }
)

foreach ($issue in $issues) {
  $payload = @{
    title = $issue.title
    body = @"
## Scope
$($issue.body)

## Acceptance Criteria
- Scope is implemented or documented.
- Changes are reviewed through Pull Request.
- Demo flow remains stable.

## Suggested Branch
``$($issue.branch)``
"@
  } | ConvertTo-Json

  $response = Invoke-RestMethod `
    -Method Post `
    -Uri "https://api.github.com/repos/$Repo/issues" `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $payload

  Write-Host "#$($response.number) $($response.title)"
}
