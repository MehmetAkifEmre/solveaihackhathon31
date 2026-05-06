from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.request import Request
from app.models.schemas import RequestCreate, RequestDraftUpdate, RequestRead
from app.services.workflow_engine import WorkflowEngine


router = APIRouter(prefix="/requests", tags=["requests"])


@router.post("", response_model=RequestRead, status_code=status.HTTP_201_CREATED)
def create_request(payload: RequestCreate, db: Session = Depends(get_db)) -> Request:
    try:
        return WorkflowEngine().create_request(db, payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Talep AI workflow içinde işlenemedi.") from exc


@router.get("", response_model=list[RequestRead])
def list_requests(db: Session = Depends(get_db)) -> list[Request]:
    return db.query(Request).order_by(Request.created_at.desc()).all()


@router.get("/{request_id}", response_model=RequestRead)
def get_request(request_id: int, db: Session = Depends(get_db)) -> Request:
    request = db.get(Request, request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Talep bulunamadı.")
    return request


@router.patch("/{request_id}/draft", response_model=RequestRead)
def update_draft(request_id: int, payload: RequestDraftUpdate, db: Session = Depends(get_db)) -> Request:
    request = db.get(Request, request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Talep bulunamadi.")
    if request.status != "waiting_approval":
        raise HTTPException(status_code=409, detail="Sadece onay bekleyen taslaklar duzenlenebilir.")
    request.draft_response = payload.draft_response
    db.commit()
    db.refresh(request)
    return request


@router.post("/{request_id}/approve", response_model=RequestRead)
def approve_request(request_id: int, db: Session = Depends(get_db)) -> Request:
    request = db.get(Request, request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Talep bulunamadı.")
    if request.status not in {"waiting_approval", "rejected"}:
        raise HTTPException(status_code=409, detail="Bu talep onay için uygun durumda değil.")
    request.status = "approved"
    db.commit()
    db.refresh(request)
    return request


@router.post("/{request_id}/reject", response_model=RequestRead)
def reject_request(request_id: int, db: Session = Depends(get_db)) -> Request:
    request = db.get(Request, request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Talep bulunamadı.")
    if request.status not in {"waiting_approval", "approved"}:
        raise HTTPException(status_code=409, detail="Bu talep reddetme için uygun durumda değil.")
    request.status = "rejected"
    db.commit()
    db.refresh(request)
    return request
