import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RoleGate } from "@/components/RoleGate";
import { StatusBadge } from "@/components/StatusBadge";
import { getRequest } from "@/lib/api";
import { Actions } from "./Actions";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await getRequest(id);

  return (
    <RoleGate allowed={["sales"]} fallbackTitle="Approval detayi icin Sales / Ops girisi gerekli">
      <section className="pageHeader">
        <div>
          <p className="eyebrow">Request detail</p>
          <h1>{request.title}</h1>
          <p className="muted">
            {request.department ?? "Unassigned"} departmani icin AI destekli inceleme ciktisi.
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
          <h2>AI siniflandirmasi</h2>
          <p>
            <strong>Kategori:</strong> {request.category ?? "-"}
          </p>
          <p>
            <strong>Oncelik:</strong> {request.priority ?? "-"}
          </p>
          <p>
            <strong>Departman:</strong> {request.department ?? "-"}
          </p>
          <p>
            <strong>Tahmini sure:</strong> {request.manual_minutes_estimate} dk manuel /{" "}
            {request.automated_minutes_estimate} dk AI sonrasi
          </p>
        </aside>
      </section>

      <section className="grid twoCol" style={{ marginTop: 16 }}>
        <article className="card">
          <h2>Cikarilan alanlar</h2>
          <pre className="jsonBlock">{JSON.stringify(request.extracted_fields, null, 2)}</pre>
        </article>

        <article className="card">
          <h2>AI cevap taslagi</h2>
          <Actions id={request.id} status={request.status} draftResponse={request.draft_response ?? ""} />
        </article>
      </section>
    </RoleGate>
  );
}
