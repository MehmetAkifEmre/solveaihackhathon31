// AI Traceability:
// Skills Agent assisted in structuring this UI component for demo clarity.
// Human review required before merge.

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, Headphones, Inbox, LogIn, Sparkles } from "lucide-react";

import { getStoredUser, storeUser, UserRole } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      router.replace(user.role === "customer" ? "/requests/new" : "/");
    }
  }, [router]);

  function login(role: UserRole) {
    storeUser(role);
    window.dispatchEvent(new Event("demo-session-change"));
    router.replace(role === "customer" ? "/requests/new" : "/");
  }

  return (
    <section className="loginScene">
      <div className="loginHero">
        <div className="loginCopy">
          <p className="eyebrow">AI Ops Demo Gateway</p>
          <h1>Operasyon talebini AI ile isleyen demo akisini baslat</h1>
          <p className="muted">
            Musteri talebi olusturur, AI siniflandirir, Sales / Ops ekibi taslagi kontrol edip onaya tasir.
          </p>
          <div className="loginStats">
            <span>
              <strong>7 → 3</strong>
              adim
            </span>
            <span>
              <strong>%60</strong>
              zaman tasarrufu
            </span>
            <span>
              <strong>5</strong>
              demo talep
            </span>
          </div>
        </div>

        <div className="loginPreview" aria-label="Demo workflow preview">
          <div className="mailPreviewTop">
            <span className="mailDot redDot" />
            <span className="mailDot yellowDot" />
            <span className="mailDot greenDot" />
          </div>
          <div className="mailPreviewRow strongRow">
            <Inbox size={18} />
            <span>Fatura itirazi</span>
            <strong>Finance</strong>
          </div>
          <div className="mailPreviewRow">
            <Bot size={18} />
            <span>AI kategori + oncelik cikardi</span>
            <strong>high</strong>
          </div>
          <div className="mailPreviewRow">
            <Sparkles size={18} />
            <span>Cevap taslagi hazir</span>
            <CheckCircle2 size={18} />
          </div>
        </div>
      </div>

      <div className="grid loginRoleGrid">
        <article className="card roleCard livelyRoleCard customerRole">
          <span className="roleIcon">
            <Headphones size={30} />
          </span>
          <div>
            <h2>Customer User</h2>
            <p className="muted">Talep basligi, icerigi ve kaynak tipi girerek yeni operasyon talebi olusturur.</p>
          </div>
          <div className="roleSteps">
            <span>Talep yaz</span>
            <ArrowRight size={16} />
            <span>AI queue</span>
          </div>
          <button className="button" type="button" onClick={() => login("customer")}>
            <LogIn size={18} />
            Customer olarak gir
          </button>
        </article>

        <article className="card roleCard livelyRoleCard salesRole">
          <span className="roleIcon">
            <BriefcaseBusiness size={30} />
          </span>
          <div>
            <h2>Sales / Ops User</h2>
            <p className="muted">Dashboard, request listesi, taslak duzenleme ve approve/reject akisini yonetir.</p>
          </div>
          <div className="roleSteps">
            <span>Incele</span>
            <ArrowRight size={16} />
            <span>Karar ver</span>
          </div>
          <button className="button" type="button" onClick={() => login("sales")}>
            <LogIn size={18} />
            Sales / Ops olarak gir
          </button>
        </article>
      </div>
    </section>
  );
}
