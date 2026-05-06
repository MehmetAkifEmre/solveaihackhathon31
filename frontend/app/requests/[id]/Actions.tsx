"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Pencil, Save, X, XCircle } from "lucide-react";

import { approveRequest, rejectRequest, updateDraftResponse, WorkflowStatus } from "@/lib/api";

export function Actions({
  id,
  status,
  draftResponse,
}: {
  id: number;
  status: WorkflowStatus;
  draftResponse: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState(draftResponse);
  const [isEditing, setIsEditing] = useState(false);
  const [busyAction, setBusyAction] = useState<"approve" | "reject" | "save" | null>(null);
  const canDecide = status === "waiting_approval" || status === "approved" || status === "rejected";
  const canEdit = status === "waiting_approval";

  async function runDecision(action: "approve" | "reject") {
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

  async function saveDraft() {
    setBusyAction("save");
    setError(null);
    try {
      await updateDraftResponse(id, draft);
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Taslak kaydedilemedi.");
    } finally {
      setBusyAction(null);
    }
  }

  function cancelEdit() {
    setDraft(draftResponse);
    setIsEditing(false);
    setError(null);
  }

  return (
    <div className="grid">
      {isEditing ? (
        <div className="field">
          <label htmlFor="draftResponse">AI cevap taslagi</label>
          <textarea
            id="draftResponse"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            minLength={10}
          />
        </div>
      ) : (
        <p className="detailBlock">{draftResponse || "Taslak uretilemedi."}</p>
      )}

      {error ? <div className="error">{error}</div> : null}

      {isEditing ? (
        <div className="actions">
          <button className="button" type="button" onClick={saveDraft} disabled={busyAction !== null || draft.length < 10}>
            <Save size={18} />
            {busyAction === "save" ? "Saving..." : "Save"}
          </button>
          <button className="secondaryButton" type="button" onClick={cancelEdit} disabled={busyAction !== null}>
            <X size={18} />
            Cancel
          </button>
        </div>
      ) : (
        <div className="actions">
          <button
            className="secondaryButton"
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={!canEdit || busyAction !== null}
          >
            <Pencil size={18} />
            Edit
          </button>
          <button
            className="button"
            type="button"
            onClick={() => runDecision("approve")}
            disabled={!canDecide || busyAction !== null}
          >
            <CheckCircle2 size={18} />
            {busyAction === "approve" ? "Approving..." : "Approve"}
          </button>
          <button
            className="dangerButton"
            type="button"
            onClick={() => runDecision("reject")}
            disabled={!canDecide || busyAction !== null}
          >
            <XCircle size={18} />
            {busyAction === "reject" ? "Rejecting..." : "Reject"}
          </button>
        </div>
      )}
    </div>
  );
}
