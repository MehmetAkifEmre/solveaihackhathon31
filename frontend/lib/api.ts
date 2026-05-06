export type SourceType = "email" | "form" | "document" | "manual";

export type WorkflowStatus =
  | "received"
  | "classified"
  | "extracted"
  | "draft_created"
  | "waiting_approval"
  | "approved"
  | "rejected"
  | "failed";

export type OpsRequest = {
  id: number;
  title: string;
  content: string;
  source: SourceType;
  category: string | null;
  priority: string | null;
  department: string | null;
  extracted_fields: Record<string, unknown>;
  draft_response: string | null;
  status: WorkflowStatus;
  manual_minutes_estimate: number;
  automated_minutes_estimate: number;
  created_at: string;
  updated_at: string;
};

export type Metrics = {
  manual_steps: number;
  automated_steps: number;
  step_reduction_percent: number;
  manual_minutes: number;
  automated_minutes: number;
  time_reduction_percent: number;
  processed_request_count: number;
  approved_request_count: number;
  waiting_approval_count: number;
  average_manual_minutes: number;
  average_automated_minutes: number;
};

const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const API_BASE_URL =
  typeof window === "undefined" ? process.env.INTERNAL_API_BASE_URL ?? publicApiBaseUrl : publicApiBaseUrl;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Beklenmeyen hata olustu." }));
    throw new Error(toErrorMessage(error.detail));
  }

  return response.json() as Promise<T>;
}

function toErrorMessage(detail: unknown): string {
  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }
        if (item && typeof item === "object" && "msg" in item) {
          return String((item as { msg: unknown }).msg);
        }
        return JSON.stringify(item);
      })
      .join(" ");
  }

  if (detail && typeof detail === "object") {
    return JSON.stringify(detail);
  }

  return "Beklenmeyen hata olustu.";
}

export function getRequests() {
  return request<OpsRequest[]>("/requests");
}

export function getRequest(id: string) {
  return request<OpsRequest>(`/requests/${id}`);
}

export function createRequest(payload: { title: string; content: string; source: SourceType }) {
  return request<OpsRequest>("/requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function approveRequest(id: number) {
  return request<OpsRequest>(`/requests/${id}/approve`, { method: "POST" });
}

export function updateDraftResponse(id: number, draftResponse: string) {
  return request<OpsRequest>(`/requests/${id}/draft`, {
    method: "PATCH",
    body: JSON.stringify({ draft_response: draftResponse }),
  });
}

export function rejectRequest(id: number) {
  return request<OpsRequest>(`/requests/${id}/reject`, { method: "POST" });
}

export function getMetrics() {
  return request<Metrics>("/metrics");
}
