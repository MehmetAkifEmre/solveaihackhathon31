import Link from "next/link";
import { ArrowRight, Clock, Gauge, Inbox, TimerReset } from "lucide-react";

import { getMetrics, getRequests } from "@/lib/api";
import { RequestTable } from "@/components/RequestTable";

export default async function DashboardPage() {
  const [metrics, requests] = await Promise.all([getMetrics(), getRequests()]);
  const recent = requests.slice(0, 5);

  return (
    <>
      <section className="pageHeader">
        <div>
          <p className="eyebrow">Operational workflow</p>
          <h1>AI Destekli Operasyon Talep Paneli</h1>
          <p className="muted">
            Talepleri sınıflandır, alanları çıkar, cevap taslağını hazırla ve insan onayına sun.
          </p>
        </div>
        <Link href="/requests/new" className="primaryLink">
          New Request
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="grid statsGrid">
        <article className="card">
          <div className="statLabel">Toplam Talep</div>
          <div className="statValue">{metrics.processed_request_count}</div>
        </article>
        <article className="card">
          <div className="statLabel">Onay Bekleyen</div>
          <div className="statValue">{metrics.waiting_approval_count}</div>
        </article>
        <article className="card">
          <div className="statLabel">Manuel Ortalama</div>
          <div className="statValue">{metrics.average_manual_minutes} dk</div>
        </article>
        <article className="card">
          <div className="statLabel">AI Sonrası Ortalama</div>
          <div className="statValue">{metrics.average_automated_minutes} dk</div>
        </article>
      </section>

      <section className="savingsBand">
        <div>
          <h2>Demo tasarruf ölçümü</h2>
          <p className="muted">
            Manuel süreç {metrics.manual_steps} adım / {metrics.manual_minutes} dakika, otomasyon sonrası{" "}
            {metrics.automated_steps} adım / {metrics.automated_minutes} dakika.
          </p>
        </div>
        <div className="actions">
          <span className="badge">
            <TimerReset size={16} /> %{metrics.time_reduction_percent} zaman
          </span>
          <span className="badge">
            <Gauge size={16} /> %{metrics.step_reduction_percent} adım
          </span>
        </div>
        <div className="savingsValue">%{metrics.time_reduction_percent}</div>
      </section>

      <section className="grid twoCol">
        <article className="card">
          <h2>Son talepler</h2>
          <RequestTable requests={recent} />
        </article>
        <article className="card">
          <h2>Kritik demo noktaları</h2>
          <p className="muted">
            Bu MVP mock AI provider ile çalışır; gerçek API anahtarı olmadan kategori, öncelik,
            departman, alan çıkarımı ve Türkçe cevap taslağı üretir.
          </p>
          <div className="grid">
            <span className="badge">
              <Inbox size={16} /> {metrics.processed_request_count} işlenmiş kayıt
            </span>
            <span className="badge">
              <Clock size={16} /> %{metrics.time_reduction_percent}+ hedef görünür
            </span>
          </div>
        </article>
      </section>
    </>
  );
}
