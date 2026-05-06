from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.request import Request
from app.models.schemas import MetricsRead


router = APIRouter(tags=["metrics"])


@router.get("/metrics", response_model=MetricsRead)
def get_metrics(db: Session = Depends(get_db)) -> MetricsRead:
    requests = db.query(Request).all()
    count = len(requests)
    approved = len([item for item in requests if item.status == "approved"])
    waiting = len([item for item in requests if item.status == "waiting_approval"])

    manual_steps = 7
    automated_steps = 3
    manual_minutes = 10
    automated_minutes = 4

    average_manual = (
        sum(item.manual_minutes_estimate for item in requests) / count if count else float(manual_minutes)
    )
    average_automated = (
        sum(item.automated_minutes_estimate for item in requests) / count
        if count
        else float(automated_minutes)
    )

    return MetricsRead(
        manual_steps=manual_steps,
        automated_steps=automated_steps,
        step_reduction_percent=round((manual_steps - automated_steps) / manual_steps * 100),
        manual_minutes=manual_minutes,
        automated_minutes=automated_minutes,
        time_reduction_percent=round((manual_minutes - automated_minutes) / manual_minutes * 100),
        processed_request_count=count,
        approved_request_count=approved,
        waiting_approval_count=waiting,
        average_manual_minutes=round(average_manual, 1),
        average_automated_minutes=round(average_automated, 1),
    )
