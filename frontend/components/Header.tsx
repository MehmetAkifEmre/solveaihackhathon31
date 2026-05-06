import Link from "next/link";
import { BarChart3, Inbox, PlusCircle } from "lucide-react";

export function Header() {
  return (
    <header className="topbar">
      <Link href="/" className="brand">
        AI Ops Assistant
      </Link>
      <nav className="nav">
        <Link href="/" className="navLink" title="Dashboard">
          <BarChart3 size={18} />
          Dashboard
        </Link>
        <Link href="/requests" className="navLink" title="Requests">
          <Inbox size={18} />
          Requests
        </Link>
        <Link href="/requests/new" className="primaryLink" title="New request">
          <PlusCircle size={18} />
          New Request
        </Link>
      </nav>
    </header>
  );
}
