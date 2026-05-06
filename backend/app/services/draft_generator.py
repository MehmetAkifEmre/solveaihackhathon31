from app.services.ai_classifier import ClassificationResult


# AI Traceability:
# Skills Agent assisted in designing professional Turkish response templates.
# Human review completed by Feature Developer.
class DraftGenerator:
    def generate(self, title: str, content: str, classification: ClassificationResult) -> str:
        templates = {
            "billing": "Finans ekibimiz fatura ve ödeme detaylarını inceleyerek size doğrulanmış bilgi ile dönüş yapacaktır.",
            "technical_support": "Destek ekibimiz teknik kayıtları inceleyip öncelik seviyesine göre çözüm adımlarını paylaşacaktır.",
            "sales": "Satış ekibimiz ihtiyacınıza uygun teklif seçeneklerini hazırlayıp sizinle paylaşacaktır.",
            "hr": "İnsan Kaynakları ekibimiz talebinizi iç süreçlere göre değerlendirip sonucu bildirecektir.",
            "operations": "Operasyon ekibimiz ilgili kayıtları kontrol ederek güncel durum ve sonraki adımları paylaşacaktır.",
        }
        action = templates.get(classification.category, templates["operations"])

        return (
            f"Merhaba,\n\n"
            f"'{title}' başlıklı talebinizi aldık. Talebiniz {classification.department} departmanına "
            f"{classification.priority} öncelik seviyesiyle yönlendirilmiştir. {action}\n\n"
            f"Bu taslak insan onayından sonra gönderilecektir.\n\n"
            f"Saygılarımızla,\nOperasyon Ekibi"
        )
