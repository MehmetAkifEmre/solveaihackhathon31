"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

import { createRequest, SourceType } from "@/lib/api";

const sources: SourceType[] = ["email", "form", "document", "manual"];

export default function NewRequestPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState<SourceType>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const request = await createRequest({ title, content, source });
      router.push(`/requests/${request.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Talep oluşturulamadı.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="pageHeader">
        <div>
          <p className="eyebrow">New workflow</p>
          <h1>New Request</h1>
          <p className="muted">Talep metnini girin; sistem sınıflandırma, çıkarım ve cevap taslağını hazırlasın.</p>
        </div>
      </section>

      <form className="card form" onSubmit={onSubmit}>
        {error ? <div className="error">{error}</div> : null}

        <div className="field">
          <label htmlFor="title">Başlık</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Örn. Teslimat gecikmesi bildirimi"
            required
            minLength={2}
            maxLength={160}
          />
        </div>

        <div className="field">
          <label htmlFor="content">Talep içeriği</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Müşteri talebi, operasyon notu, e-posta metni veya belge içeriği..."
            required
            minLength={5}
          />
        </div>

        <div className="field">
          <label htmlFor="source">Kaynak tipi</label>
          <select id="source" value={source} onChange={(event) => setSource(event.target.value as SourceType)}>
            {sources.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="actions">
          <button className="button" type="submit" disabled={isSubmitting}>
            <Send size={18} />
            {isSubmitting ? "Processing..." : "Gönder"}
          </button>
        </div>
      </form>
    </>
  );
}
