from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.metrics import router as metrics_router
from app.api.requests import router as requests_router
from app.database import init_db


app = FastAPI(title="AI Ops Assistant API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "ai-ops-assistant"}


app.include_router(requests_router)
app.include_router(metrics_router)
