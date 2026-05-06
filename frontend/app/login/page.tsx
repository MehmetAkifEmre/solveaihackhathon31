"use client";

import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Headphones, LogIn } from "lucide-react";

import { storeUser, UserRole } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  function login(role: UserRole) {
    storeUser(role);
    window.dispatchEvent(new Event("demo-session-change"));
    router.push(role === "customer" ? "/requests/new" : "/");
  }

  return (
    <>
      <section className="pageHeader">
        <div>
          <p className="eyebrow">Demo login</p>
          <h1>Kullanici rolunu sec</h1>
          <p className="muted">Ayni urun icinde musteri talep acar, Sales / Ops ekibi AI ciktisini duzenleyip onaylar.</p>
        </div>
      </section>

      <section className="grid twoCol">
        <article className="card roleCard">
          <Headphones size={34} />
          <h2>Customer User</h2>
          <p className="muted">Talep basligi, icerigi ve kaynak tipi girerek yeni operasyon talebi olusturur.</p>
          <button className="button" type="button" onClick={() => login("customer")}>
            <LogIn size={18} />
            Customer olarak gir
          </button>
        </article>

        <article className="card roleCard">
          <BriefcaseBusiness size={34} />
          <h2>Sales / Ops User</h2>
          <p className="muted">Dashboard metriklerini, request listesini ve approval ekranindaki edit/approve/reject aksiyonlarini yonetir.</p>
          <button className="button" type="button" onClick={() => login("sales")}>
            <LogIn size={18} />
            Sales / Ops olarak gir
          </button>
        </article>
      </section>
    </>
  );
}
