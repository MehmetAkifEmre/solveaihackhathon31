import Link from "next/link";
import { Eye } from "lucide-react";

import type { OpsRequest } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";

export function RequestTable({ requests }: { requests: OpsRequest[] }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Department</th>
            <th>Status</th>
            <th aria-label="Detail" />
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.title}</td>
              <td>{request.category ?? "-"}</td>
              <td>{request.priority ?? "-"}</td>
              <td>{request.department ?? "-"}</td>
              <td>
                <StatusBadge status={request.status} />
              </td>
              <td>
                <Link href={`/requests/${request.id}`} className="iconButton" title="Detail">
                  <Eye size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
