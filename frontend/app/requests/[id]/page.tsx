import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { StatusBadge } from "@/components/StatusBadge";
import { getRequest } from "@/lib/api";
import { Actions } from "./Actions";

export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const request = await getRequest(params.id);

  return (
    <>
      <section className="pageHeader">
        <div>
          <p className="eyebrow">Request detail</p>
          <h1>{request.title}</h1>
          <p className="muted">
            {request.department ?? "Unassigned"} departmanı için AI destekli inceleme çıktısı.
          </p>
        </div>
        <Link href="/requests" className="secondaryButton">
          <ArrowLeft size={18} />
          Back
        </Link>
      </section>

      <section className="grid twoCol">
        <article className="card">
          <h2>Orijinal talep metni</h2>
          <p className="detailBlock">{request.content}</p>
          <div className="actions">
            <StatusBadge status={request.status} />
            <span className="badge">{request.source}</span>
          </div>
        </article>

        <aside className="card">
          <h2>AI sınıflandırması</h2>
          <p>
            <strong>Kategori:</strong> {request.category ?? "-"}
          </p>
          <p>
            <strong>Öncelik:</strong> {request.priority ?? "-"}
          </p>
          <p>
            <strong>Departman:</strong> {request.department ?? "-"}
          </p>
          <p>
            <strong>Tahmini süre:</strong> {request.manual_minutes_estimate} dk manuel /{" "}
            {request.automated_minutes_estimate} dk AI sonrası
          </p>
        </aside>
      </section>

      <section className="grid twoCol" style={{ marginTop: 16 }}>
        <article className="card">
          <h2>Çıkarılan alanlar</h2>
          <pre className="jsonBlock">{JSON.stringify(request.extracted_fields, null, 2)}</pre>
        </article>

        <article className="card">
          <h2>AI cevap taslağı</h2>
          <p className="detailBlock">{request.draft_response ?? "Taslak üretilemedi."}</p>
          <Actions id={request.id} status={request.status} />
        </article>
      </section>
    </>
  );
}
