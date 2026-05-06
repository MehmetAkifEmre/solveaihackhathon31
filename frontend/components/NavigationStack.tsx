// AI Traceability:
// Skills Agent assisted in structuring this UI component for demo clarity.
// Human review required before merge.

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { pushNavigationPath } from "@/lib/navigationStack";

export function NavigationStack() {
  const pathname = usePathname();

  useEffect(() => {
    pushNavigationPath(`${pathname}${window.location.search}`);
  }, [pathname]);

  return null;
}
