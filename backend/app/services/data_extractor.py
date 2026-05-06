import re
from typing import Any


# AI Traceability:
# Skills Agent assisted in designing deterministic extraction heuristics.
# Human review completed by Feature Developer.
class DataExtractor:
    def extract(self, title: str, content: str, category: str) -> dict[str, Any]:
        text = f"{title}\n{content}"
        fields: dict[str, Any] = {
            "summary": self._summarize(content),
            "category_hint": category,
        }

        patterns = {
            "email": r"[\w.+-]+@[\w-]+\.[\w.-]+",
            "phone": r"(\+?\d[\d\s()-]{8,}\d)",
            "order_id": r"\b(?:ORD|SIP|ORDER)-?\d+\b",
            "contract_id": r"\b(?:FIN|CON|CTR)-?\d{3,}(?:-\d+)?\b",
            "employee_id": r"\b(?:HR|EMP)-?\d+\b",
            "error_code": r"\b[45]\d{2}\b",
        }

        for key, pattern in patterns.items():
            match = re.search(pattern, text, flags=re.IGNORECASE)
            if match:
                fields[key] = match.group(0)

        date_range = re.search(r"\b\d{1,2}\s*-\s*\d{1,2}\s*[A-Za-zÇĞİÖŞÜçğıöşü]+\b", text)
        if date_range:
            fields["date_range"] = date_range.group(0)

        user_count = re.search(r"\b\d+\s*(?:kullanıcı|kullanici|user)\b", text, flags=re.IGNORECASE)
        if user_count:
            fields["user_count"] = user_count.group(0)

        return fields

    def _summarize(self, content: str) -> str:
        cleaned = " ".join(content.split())
        if len(cleaned) <= 140:
            return cleaned
        return f"{cleaned[:137]}..."
