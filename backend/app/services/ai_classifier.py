import os
from dataclasses import dataclass


# AI Traceability:
# Skills Agent assisted in designing this classification fallback logic.
# Human review completed by Feature Developer.
@dataclass(frozen=True)
class ClassificationResult:
    category: str
    priority: str
    department: str


class AIClassifier:
    def classify(self, title: str, content: str) -> ClassificationResult:
        raise NotImplementedError


class MockAIClassifier(AIClassifier):
    def classify(self, title: str, content: str) -> ClassificationResult:
        text = f"{title} {content}".lower()

        if any(keyword in text for keyword in ["fatura", "ödeme", "odeme", "ücret", "ucret", "invoice"]):
            return ClassificationResult("billing", self._priority(text, default="high"), "Finance")
        if any(keyword in text for keyword in ["hata", "bug", "500", "teknik", "giriş", "giris", "erişim", "erisim"]):
            return ClassificationResult("technical_support", self._priority(text, default="urgent"), "Support")
        if any(keyword in text for keyword in ["teklif", "satış", "satis", "lisans", "demo", "fiyat"]):
            return ClassificationResult("sales", self._priority(text, default="medium"), "Sales")
        if any(keyword in text for keyword in ["izin", "maaş", "maas", "çalışan", "calisan", "ik", "hr"]):
            return ClassificationResult("hr", self._priority(text, default="low"), "HR")
        if any(keyword in text for keyword in ["teslimat", "operasyon", "gecikme", "sevkiyat", "sipariş", "siparis"]):
            return ClassificationResult("operations", self._priority(text, default="high"), "Operations")

        return ClassificationResult("operations", self._priority(text, default="medium"), "Operations")

    def _priority(self, text: str, default: str) -> str:
        if any(keyword in text for keyword in ["acil", "kritik", "bugün", "bugun", "urgent", "hemen"]):
            return "urgent"
        if any(keyword in text for keyword in ["şikayet", "sikayet", "gecikme", "itiraz", "hata"]):
            return "high"
        if any(keyword in text for keyword in ["bilgi", "uygun olduğunda", "uygun oldugunda"]):
            return "low"
        return default


def get_classifier() -> AIClassifier:
    provider = os.getenv("AI_PROVIDER", "mock").lower()
    if provider != "mock" and not os.getenv("LLM_API_KEY"):
        return MockAIClassifier()
    return MockAIClassifier()
