"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";

import { createRequest, OpsRequest, SourceType } from "@/lib/api";
import { DemoUser, getStoredUser } from "@/lib/auth";

const sources: SourceType[] = ["email", "form", "document", "manual"];

export default function NewRequestPage() {
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState<SourceType>("email");
  const [createdRequest, setCreatedRequest] = useState<OpsRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setCreatedRequest(null);

    try {
      const request = await createRequest({ title, content, source });
      if (user?.role === "sales") {
        router.push(`/requests/${request.id}`);
        router.refresh();
        return;
      }

      setCreatedRequest(request);
      setTitle("");
      setContent("");
      setSource("email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Talep olusturulamadi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (user === undefined) {
    return <div className="card muted">Loading session...</div>;
  }

  if (!user) {
    return (
      <section className="card accessPanel">
        <div>
          <h2>Login gerekli</h2>
          <p className="muted">Talep olusturmak icin Customer veya Sales / Ops roluyle giris yap.</p>
          <Link href="/login" className="primaryLink">
            Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pageHeader">
        <div>
          <p className="eyebrow">{user.role === "customer" ? "Customer portal" : "Internal workflow"}</p>
          <h1>New Request</h1>
          <p className="muted">
            {user.role === "customer"
              ? "Musteri talebini girer; AI analiz eder ve Sales / Ops approval queue ekranina dusurur."
              : "Ic ekip manuel veya test talebi olusturup dogrudan approval detayina gecebilir."}
          </p>
        </div>
      </section>

      <form className="card form" onSubmit={onSubmit}>
        {createdRequest ? (
          <div className="successPanel">
            <CheckCircle2 size={22} />
            <div>
              <strong>Talep alindi.</strong>
              <p className="muted">
                #{createdRequest.id} numarali kayit {createdRequest.department} departmani icin{" "}
                {createdRequest.status} durumuna alindi.
              </p>
            </div>
          </div>
        ) : null}

        {error ? <div className="error">{error}</div> : null}

        <div className="field">
          <label htmlFor="title">Baslik</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Orn. Teslimat gecikmesi bildirimi"
            required
            minLength={2}
            maxLength={160}
          />
        </div>

        <div className="field">
          <label htmlFor="content">Talep icerigi</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Musteri talebi, operasyon notu, e-posta metni veya belge icerigi..."
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
            {isSubmitting ? "Processing..." : "Gonder"}
          </button>
          {user.role === "sales" ? (
            <Link href="/requests" className="secondaryButton">
              Approval queue
            </Link>
          ) : null}
        </div>
      </form>
    </>
  );
}
