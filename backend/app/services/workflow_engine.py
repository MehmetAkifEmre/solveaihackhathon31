from sqlalchemy.orm import Session

from app.models.request import Request
from app.models.schemas import RequestCreate
from app.services.ai_classifier import get_classifier
from app.services.data_extractor import DataExtractor
from app.services.draft_generator import DraftGenerator


# AI Traceability:
# Skills Agent assisted in designing the workflow transitions and fallback safety path.
# Human review completed by Feature Developer.
class WorkflowEngine:
    def __init__(self) -> None:
        self.classifier = get_classifier()
        self.extractor = DataExtractor()
        self.draft_generator = DraftGenerator()

    def create_request(self, db: Session, payload: RequestCreate) -> Request:
        request = Request(
            title=payload.title,
            content=payload.content,
            source=payload.source.value,
            status="received",
            manual_minutes_estimate=10,
            automated_minutes_estimate=4,
        )
        db.add(request)
        db.flush()

        try:
            classification = self.classifier.classify(payload.title, payload.content)
            request.category = classification.category
            request.priority = classification.priority
            request.department = classification.department
            request.status = "classified"

            request.extracted_fields = self.extractor.extract(
                payload.title, payload.content, classification.category
            )
            request.status = "extracted"

            request.draft_response = self.draft_generator.generate(
                payload.title, payload.content, classification
            )
            request.status = "draft_created"
            request.status = "waiting_approval"
        except Exception:
            request.status = "failed"
            raise
        finally:
            db.commit()
            db.refresh(request)

        return request
