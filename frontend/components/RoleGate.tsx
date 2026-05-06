"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import { DemoUser, getStoredUser, UserRole } from "@/lib/auth";

export function RoleGate({
  allowed,
  children,
  fallbackTitle = "Yetki gerekli",
}: {
  allowed: UserRole[];
  children: ReactNode;
  fallbackTitle?: string;
}) {
  const [user, setUser] = useState<DemoUser | null | undefined>(undefined);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (user === undefined) {
    return <div className="card muted">Loading session...</div>;
  }

  if (!user || !allowed.includes(user.role)) {
    return (
      <section className="card accessPanel">
        <LockKeyhole size={28} />
        <div>
          <h2>{fallbackTitle}</h2>
          <p className="muted">Bu ekran demo rol ayrimina bagli. Customer talep acar; Sales / Ops talepleri yonetir.</p>
          <Link href="/login" className="primaryLink">
            Login
          </Link>
        </div>
      </section>
    );
  }

  return children;
}
