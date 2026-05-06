export type UserRole = "customer" | "sales";

export type DemoUser = {
  role: UserRole;
  name: string;
};

export const demoUsers: Record<UserRole, DemoUser> = {
  customer: {
    role: "customer",
    name: "Customer User",
  },
  sales: {
    role: "sales",
    name: "Sales / Ops User",
  },
};

export const sessionStorageKey = "ai-ops-demo-user";

export function getStoredUser(): DemoUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(sessionStorageKey);
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as DemoUser;
    if (parsed.role === "customer" || parsed.role === "sales") {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function storeUser(role: UserRole) {
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(demoUsers[role]));
}

export function clearUser() {
  window.localStorage.removeItem(sessionStorageKey);
}
