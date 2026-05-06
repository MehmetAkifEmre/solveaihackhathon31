// AI Traceability:
// Skills Agent assisted in structuring this UI component for demo clarity.
// Human review required before merge.

import { Activity, Clock3, PieChart } from "lucide-react";

import type { Metrics, OpsRequest } from "@/lib/api";

type Slice = {
  label: string;
  value: number;
  color: string;
};

type Point = {
  label: string;
  manual: number;
  automated: number;
};

export function MetricsCharts({ metrics, requests }: { metrics: Metrics; requests: OpsRequest[] }) {
  const slices = buildStatusSlices(metrics, requests);
  const points = buildTimePoints(metrics, requests);
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const approvedPercent = total > 0 ? Math.round(((metrics.approved_request_count ?? 0) / total) * 100) : 0;

  return (
    <section className="grid chartGrid" aria-label="Operasyon istatistik grafikleri">
      <article className="card chartCard">
        <div className="chartHeading">
          <span className="chartIcon">
            <PieChart size={18} />
          </span>
          <div>
            <h2>Durum dagilimi</h2>
            <p className="muted">Onay, bekleme ve diger workflow durumlari.</p>
          </div>
        </div>
        <div className="donutLayout">
          <div className="donutChart" style={{ background: toConicGradient(slices) }} aria-hidden="true">
            <div className="donutCenter">
              <strong>%{approvedPercent}</strong>
              <span>onay</span>
            </div>
          </div>
          <div className="legendList">
            {slices.map((slice) => (
              <div className="legendItem" key={slice.label}>
                <span className="legendDot" style={{ background: slice.color }} />
                <span>{slice.label}</span>
                <strong>{slice.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="card chartCard">
        <div className="chartHeading">
          <span className="chartIcon">
            <Activity size={18} />
          </span>
          <div>
            <h2>Zaman kazanci trendi</h2>
            <p className="muted">Son taleplerde manuel sure ile AI sonrasi sure karsilastirmasi.</p>
          </div>
        </div>
        <LineChart points={points} />
        <div className="chartFooter">
          <span className="lineKey manualKey">
            <Clock3 size={14} /> Manuel
          </span>
          <span className="lineKey automatedKey">
            <Clock3 size={14} /> AI sonrasi
          </span>
        </div>
      </article>
    </section>
  );
}

function buildStatusSlices(metrics: Metrics, requests: OpsRequest[]): Slice[] {
  const rejected = requests.filter((request) => request.status === "rejected").length;
  const known = metrics.waiting_approval_count + metrics.approved_request_count + rejected;
  const other = Math.max(metrics.processed_request_count - known, 0);

  return [
    { label: "Onay bekleyen", value: metrics.waiting_approval_count, color: "#fbbc04" },
    { label: "Onaylanan", value: metrics.approved_request_count, color: "#34a853" },
    { label: "Reddedilen", value: rejected, color: "#ea4335" },
    { label: "Diger", value: other, color: "#4285f4" },
  ].filter((slice) => slice.value > 0);
}

function buildTimePoints(metrics: Metrics, requests: OpsRequest[]): Point[] {
  const requestPoints = [...requests]
    .sort((left, right) => new Date(left.created_at).getTime() - new Date(right.created_at).getTime())
    .slice(-6)
    .map((request, index) => ({
      label: `#${index + 1}`,
      manual: request.manual_minutes_estimate,
      automated: request.automated_minutes_estimate,
    }));

  if (requestPoints.length > 0) {
    return requestPoints;
  }

  return [
    { label: "Manual", manual: metrics.manual_minutes, automated: metrics.automated_minutes },
    { label: "AI", manual: metrics.manual_minutes, automated: metrics.automated_minutes },
  ];
}

function toConicGradient(slices: Slice[]) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  if (total === 0) {
    return "conic-gradient(#d6e8ff 0deg 360deg)";
  }

  let cursor = 0;
  const stops = slices.map((slice) => {
    const start = cursor;
    const end = cursor + (slice.value / total) * 360;
    cursor = end;
    return `${slice.color} ${start}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function LineChart({ points }: { points: Point[] }) {
  const width = 560;
  const height = 220;
  const padding = 28;
  const values = points.flatMap((point) => [point.manual, point.automated]);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 1);

  function coords(key: "manual" | "automated") {
    return points.map((point, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(points.length - 1, 1);
      const y = height - padding - ((point[key] - min) / range) * (height - padding * 2);
      return { x, y, value: point[key], label: point.label };
    });
  }

  const manualCoords = coords("manual");
  const automatedCoords = coords("automated");

  return (
    <div className="lineChartWrap">
      <svg className="lineChart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Zaman kazanci cizgi grafigi">
        <line className="chartAxis" x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} />
        <line className="chartAxis" x1={padding} x2={padding} y1={padding} y2={height - padding} />
        {[0.25, 0.5, 0.75].map((ratio) => {
          const y = padding + ratio * (height - padding * 2);
          return <line className="chartGridLine" key={ratio} x1={padding} x2={width - padding} y1={y} y2={y} />;
        })}
        <polyline className="manualLine" points={manualCoords.map((point) => `${point.x},${point.y}`).join(" ")} />
        <polyline
          className="automatedLine"
          points={automatedCoords.map((point) => `${point.x},${point.y}`).join(" ")}
        />
        {manualCoords.map((point) => (
          <g key={`manual-${point.label}`}>
            <circle className="manualPoint" cx={point.x} cy={point.y} r="5" />
            <text className="chartValue" x={point.x} y={point.y - 10}>
              {point.value}
            </text>
          </g>
        ))}
        {automatedCoords.map((point) => (
          <g key={`automated-${point.label}`}>
            <circle className="automatedPoint" cx={point.x} cy={point.y} r="5" />
            <text className="chartLabel" x={point.x} y={height - 8}>
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
