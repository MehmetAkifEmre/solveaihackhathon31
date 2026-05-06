from datetime import datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class SourceType(StrEnum):
    email = "email"
    form = "form"
    document = "document"
    manual = "manual"


class WorkflowStatus(StrEnum):
    received = "received"
    classified = "classified"
    extracted = "extracted"
    draft_created = "draft_created"
    waiting_approval = "waiting_approval"
    approved = "approved"
    rejected = "rejected"
    failed = "failed"


class RequestCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=160)
    content: str = Field(..., min_length=5)
    source: SourceType


class RequestRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    source: SourceType
    category: str | None
    priority: str | None
    department: str | None
    extracted_fields: dict[str, Any]
    draft_response: str | None
    status: WorkflowStatus
    manual_minutes_estimate: int
    automated_minutes_estimate: int
    created_at: datetime
    updated_at: datetime


class MetricsRead(BaseModel):
    manual_steps: int
    automated_steps: int
    step_reduction_percent: int
    manual_minutes: int
    automated_minutes: int
    time_reduction_percent: int
    processed_request_count: int
    approved_request_count: int
    waiting_approval_count: int
    average_manual_minutes: float
    average_automated_minutes: float
