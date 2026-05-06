"use client";

import Link from "next/link";
import { BarChart3, Inbox, LogIn, LogOut, PlusCircle, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { clearUser, DemoUser, getStoredUser } from "@/lib/auth";

export function Header() {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());

    function onStorage() {
      setUser(getStoredUser());
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("demo-session-change", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("demo-session-change", onStorage);
    };
  }, []);

  function logout() {
    clearUser();
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        AI Ops Assistant
      </Link>
      <nav className="nav">
        {user?.role === "sales" ? (
          <>
            <Link href="/" className="navLink" title="Dashboard">
              <BarChart3 size={18} />
              Dashboard
            </Link>
            <Link href="/requests" className="navLink" title="Requests">
              <Inbox size={18} />
              Requests
            </Link>
          </>
        ) : null}
        {user ? (
          <Link href="/requests/new" className="primaryLink" title="New request">
            <PlusCircle size={18} />
            New Request
          </Link>
        ) : null}
        {user ? (
          <>
            <span className="sessionBadge" title="Active demo user">
              <UserRound size={16} />
              {user.name}
            </span>
            <button className="secondaryButton" type="button" onClick={logout}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="primaryLink" title="Login">
            <LogIn size={18} />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
