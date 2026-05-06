import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { RequestTable } from "@/components/RequestTable";
import { getRequests } from "@/lib/api";

export default async function RequestsPage() {
  const requests = await getRequests();

  return (
    <>
      <section className="pageHeader">
        <div>
          <p className="eyebrow">Approval queue</p>
          <h1>Requests</h1>
          <p className="muted">AI tarafından işlenen talepleri ve onay durumlarını takip edin.</p>
        </div>
        <Link href="/requests/new" className="primaryLink">
          <PlusCircle size={18} />
          New Request
        </Link>
      </section>
      <RequestTable requests={requests} />
    </>
  );
}
