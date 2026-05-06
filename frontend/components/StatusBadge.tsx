import type { WorkflowStatus } from "@/lib/api";

const statusLabels: Record<WorkflowStatus, string> = {
  received: "Received",
  classified: "Classified",
  extracted: "Extracted",
  draft_created: "Draft Created",
  waiting_approval: "Waiting Approval",
  approved: "Approved",
  rejected: "Rejected",
  failed: "Failed",
};

export function StatusBadge({ status }: { status: WorkflowStatus }) {
  return <span className={`badge status-${status}`}>{statusLabels[status]}</span>;
}
