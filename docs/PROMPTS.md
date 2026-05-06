# Prompts

## Plan Agent Prompt

```text
SolveX AI Hackathon 2026 şartnamesine uygun, GitHub Flow ile yönetilecek, çalışan ve demo edilebilir bir AI destekli operasyon talep işleme MVP'si için mimari plan, roadmap, issue listesi, branch stratejisi ve 3 kişilik görev dağılımı hazırla.
```

## Skills Agent Prompt

```text
FastAPI, SQLite/PostgreSQL ve mock LLM provider kullanan bir operasyon talep workflow sistemi için sınıflandırma, veri çıkarımı, cevap taslağı üretimi, durum geçişleri ve hata yönetimini modüler servisler halinde tasarla.
```

## Classification Prompt

```text
Aşağıdaki talebi oku. Sadece şu kategorilerden birini seç: billing, technical_support, sales, hr, operations. Önceliği low, medium, high veya urgent olarak belirle. İlgili departmanı Finance, Support, Sales, HR veya Operations olarak döndür.
Başlık: {{title}}
İçerik: {{content}}
JSON çıktı: { "category": "...", "priority": "...", "department": "..." }
```

## Data Extraction Prompt

```text
Talep metninden operasyon ekibinin aksiyon alması için gerekli alanları çıkar. E-posta, telefon, sipariş numarası, sözleşme numarası, çalışan numarası, tarih aralığı, hata kodu ve kısa özet alanlarını yakala. Bilinmeyen alanları uydurma.
İçerik: {{content}}
JSON çıktı üret.
```

## Draft Response Prompt

```text
Talep sahibine gönderilmek üzere profesyonel, kısa ve Türkçe bir cevap taslağı hazırla. Kesin taahhüt verme; ilgili departmanın inceleyeceğini ve insan onayından sonra gönderileceğini belirt.
Kategori: {{category}}
Öncelik: {{priority}}
Departman: {{department}}
Talep: {{content}}
```
