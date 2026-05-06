# AI Ops Assistant

AI Destekli Operasyon Talep İşleme Paneli, şirketlerde müşteri talepleri, operasyon istekleri, e-posta metinleri ve belge içeriklerinin sınıflandırılması, ilgili departmana yönlendirilmesi ve cevap taslağı hazırlanması için geliştirilmiş demo-ready bir MVP'dir.

## Problem

Operasyon ekipleri talepleri manuel okuyup sınıflandırıyor, kritik alanları tabloya işliyor, ilgili departmana yönlendiriyor ve cevap taslağı hazırlıyor. Bu süreç tekrar eden, ölçülebilir ve otomasyona uygun bir iş yükü yaratıyor.

## Solution

Kullanıcı talep metni girer. Sistem mock AI provider ile:

- Talebi sınıflandırır.
- Öncelik seviyesini belirler.
- Departmanı tahmin eder.
- Gerekli alanları JSON olarak çıkarır.
- Veritabanına kayıt açar.
- Türkçe cevap taslağı üretir.
- Talebi insan onayı için dashboard'a düşürür.
- Manuel ve otomasyon sonrası süreç tasarrufunu gösterir.

## %50+ Workload Reduction

Demo metriği manuel süreci 7 adım / 10 dakika, otomasyon sonrası süreci 3 adım / 4 dakika kabul eder.

- Step reduction: `(7 - 3) / 7 = 57%`
- Time reduction: `(10 - 4) / 10 = 60%`

Bu değerler `/metrics` endpointinden ve dashboard ekranından izlenir.

## Tech Stack

- Frontend: Next.js, React, TypeScript
- Backend: FastAPI, Python
- Database: SQLite fallback, PostgreSQL-ready `DATABASE_URL`
- AI Layer: Mock provider by default, real LLM provider extension point
- Deployment: Docker Compose

## Setup

Backend:

```bash
cd backend
python -m venv .venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

For PostgreSQL, install a compatible SQLAlchemy driver and set `DATABASE_URL`.

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Use Node.js 22 or a current Node.js 20 LTS patch release for the latest frontend toolchain.

Docker:

```bash
docker compose up --build
```

## Run

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## Demo Flow

1. Open dashboard and show request count plus 60% time savings.
2. Open New Request and submit a realistic customer/operations message.
3. Open generated request detail.
4. Show category, priority, department, extracted fields, and Turkish draft response.
5. Approve or reject the draft.
6. Return to dashboard and show updated metrics.

## Team Roles

- Lead Developer / Maintainer: main repository, code standards, PR review, release readiness.
- Feature Developer A: backend API, data model, AI services, workflow engine.
- Feature Developer B: frontend dashboard, forms, approval screens, demo polish.

## GitHub Flow

- `main` is always stable and deployment-ready.
- Direct push to `main` is not allowed.
- Feature branches use `feature/gorev-adi`.
- Bug/final review branches use `fix/gorev-adi`.
- Commit messages are technical and present tense, for example `feat: add request classification service`.
- Each PR requires at least one teammate review before merge.

## AI-Augmented Development

Plan Agent produced architecture and roadmap documents. Skills Agent assisted AI classification fallback logic, data extraction heuristics, response drafting templates, and workflow state transitions. Traceability details live in `docs/AI_TRACEABILITY.md`.
