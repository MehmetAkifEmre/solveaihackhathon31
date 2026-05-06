"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

import { approveRequest, rejectRequest, WorkflowStatus } from "@/lib/api";

export function Actions({ id, status }: { id: number; status: WorkflowStatus }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<"approve" | "reject" | null>(null);
  const canAct = status === "waiting_approval" || status === "approved" || status === "rejected";

  async function run(action: "approve" | "reject") {
    setBusyAction(action);
    setError(null);
    try {
      if (action === "approve") {
        await approveRequest(id);
      } else {
        await rejectRequest(id);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Islem tamamlanamadi.");
    } finally {
      setBusyAction(null);
    }
  }

  return (
    <div className="grid">
      {error ? <div className="error">{error}</div> : null}
      <div className="actions">
        <button className="button" type="button" onClick={() => run("approve")} disabled={!canAct || busyAction !== null}>
          <CheckCircle2 size={18} />
          {busyAction === "approve" ? "Approving..." : "Approve"}
        </button>
        <button className="dangerButton" type="button" onClick={() => run("reject")} disabled={!canAct || busyAction !== null}>
          <XCircle size={18} />
          {busyAction === "reject" ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}
