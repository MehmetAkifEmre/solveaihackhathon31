// AI Traceability:
// Skills Agent assisted in structuring this UI component for demo clarity.
// Human review required before merge.

import Link from "next/link";
import { ArrowRight, Gauge, TimerReset } from "lucide-react";

import { RoleGate } from "@/components/RoleGate";
import { RequestTable } from "@/components/RequestTable";
import { MetricsCharts } from "@/components/MetricsCharts";
import { getMetrics, getRequests } from "@/lib/api";

export default async function DashboardPage() {
  const [metrics, requests] = await Promise.all([getMetrics(), getRequests()]);
  const recent = requests.slice(0, 5);

  return (
    <RoleGate allowed={["sales"]} fallbackTitle="Sales / Ops girisi gerekli">
      <section className="pageHeader">
        <div>
          <p className="eyebrow">Operational workflow</p>
          <h1>AI Destekli Operasyon Talep Paneli</h1>
          <p className="muted">
            Talepleri siniflandir, alanlari cikar, cevap taslagini hazirla ve insan onayina sun.
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
          <div className="statLabel">AI Sonrasi Ortalama</div>
          <div className="statValue">{metrics.average_automated_minutes} dk</div>
        </article>
      </section>

      <section className="savingsBand">
        <div>
          <h2>Demo tasarruf olcumu</h2>
          <p className="muted">
            Manuel surec {metrics.manual_steps} adim / {metrics.manual_minutes} dakika, otomasyon sonrasi{" "}
            {metrics.automated_steps} adim / {metrics.automated_minutes} dakika.
          </p>
          <p className="muted">
            Bu workflow, manuel süreci 7 adımdan 3 adıma indirerek yaklaşık %57 adım azaltımı ve 10 dakikadan 4
            dakikaya indirerek %60 zaman tasarrufu sağlar.
          </p>
        </div>
        <div className="actions">
          <span className="badge">
            <TimerReset size={16} /> %{metrics.time_reduction_percent} zaman
          </span>
          <span className="badge">
            <Gauge size={16} /> %{metrics.step_reduction_percent} adim
          </span>
        </div>
        <div className="savingsValue">%{metrics.time_reduction_percent}</div>
      </section>

      <MetricsCharts metrics={metrics} requests={requests} />

      <section className="grid">
        <article className="card">
          <h2>Son talepler</h2>
          <RequestTable requests={recent} />
        </article>
      </section>
    </RoleGate>
  );
}
