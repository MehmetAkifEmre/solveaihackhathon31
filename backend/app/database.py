import os
from datetime import datetime
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ai_ops_assistant.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    from app.models.request import Request

    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        if db.query(Request).count() > 0:
            return

        seed_requests = [
            Request(
                title="Fatura itirazı",
                content="Mart ayı faturamızda beklenenden yüksek tutar görünüyor. Sözleşme numaramız FIN-2026-184, kontrol edilmesini rica ederiz.",
                source="email",
                category="billing",
                priority="high",
                department="Finance",
                extracted_fields={"contract_id": "FIN-2026-184", "topic": "fatura itirazi"},
                draft_response="Merhaba, fatura itirazınızı aldık. Finans ekibimiz sözleşme ve dönem detaylarını kontrol ederek size en kısa sürede dönüş yapacaktır.",
                status="waiting_approval",
            ),
            Request(
                title="Teknik destek isteği",
                content="Panel girişinde 500 hatası alıyoruz. Kullanıcı e-postası ops@example.com, sorun bu sabah başladı.",
                source="form",
                category="technical_support",
                priority="urgent",
                department="Support",
                extracted_fields={"email": "ops@example.com", "error": "500", "started": "bu sabah"},
                draft_response="Merhaba, yaşadığınız giriş sorununu aldık. Destek ekibimiz 500 hata kayıtlarını inceleyip öncelikli olarak dönüş yapacaktır.",
                status="waiting_approval",
            ),
            Request(
                title="Satış teklifi talebi",
                content="50 kullanıcı için yıllık kurumsal lisans teklifi almak istiyoruz. Telefon: +90 555 111 22 33.",
                source="email",
                category="sales",
                priority="medium",
                department="Sales",
                extracted_fields={"user_count": "50", "phone": "+90 555 111 22 33"},
                draft_response="Merhaba, kurumsal lisans talebinizi aldık. Satış ekibimiz 50 kullanıcı için yıllık teklif seçeneklerini paylaşacaktır.",
                status="waiting_approval",
            ),
            Request(
                title="İnsan kaynakları izin talebi",
                content="12-16 Mayıs tarihleri arasında yıllık izin kullanmak istiyorum. Çalışan numaram HR-1024.",
                source="manual",
                category="hr",
                priority="low",
                department="HR",
                extracted_fields={"employee_id": "HR-1024", "date_range": "12-16 Mayis"},
                draft_response="Merhaba, izin talebinizi aldık. İnsan Kaynakları ekibimiz takvim uygunluğunu kontrol ederek onay sürecini tamamlayacaktır.",
                status="waiting_approval",
            ),
            Request(
                title="Operasyon teslimat gecikmesi",
                content="ORD-7781 numaralı teslimatımız planlanan tarihte ulaşmadı. Müşteri bugün bilgilendirme bekliyor.",
                source="document",
                category="operations",
                priority="high",
                department="Operations",
                extracted_fields={"order_id": "ORD-7781", "deadline": "bugun"},
                draft_response="Merhaba, teslimat gecikmesi bildiriminizi aldık. Operasyon ekibimiz ORD-7781 numaralı kaydı inceleyip güncel durumu paylaşacaktır.",
                status="waiting_approval",
            ),
        ]

        now = datetime.utcnow()
        for request in seed_requests:
            request.manual_minutes_estimate = 10
            request.automated_minutes_estimate = 4
            request.created_at = now
            request.updated_at = now
            db.add(request)
        db.commit()
