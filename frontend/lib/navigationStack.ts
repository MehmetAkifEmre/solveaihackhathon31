// AI Traceability:
// Skills Agent assisted in structuring this UI component for demo clarity.
// Human review required before merge.

const navigationStackKey = "ai-ops-navigation-stack";
const maxStackSize = 12;
type RouterWithReplace = {
  replace: (path: string) => void;
};

export function readNavigationStack(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(navigationStackKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function pushNavigationPath(path: string) {
  if (typeof window === "undefined") {
    return;
  }

  const stack = readNavigationStack();
  const lastPath = stack.at(-1);
  if (lastPath === path) {
    return;
  }

  const nextStack = [...stack, path].slice(-maxStackSize);
  window.sessionStorage.setItem(navigationStackKey, JSON.stringify(nextStack));
}

export function replaceWithLastUsefulPath(
  router: RouterWithReplace,
  options: {
    currentPath: string;
    fallbackPath: string;
    disallowedPaths?: string[];
  },
) {
  const disallowed = new Set([options.currentPath, ...(options.disallowedPaths ?? [])]);
  const stack = readNavigationStack();
  const target = [...stack].reverse().find((path) => !disallowed.has(path)) ?? options.fallbackPath;

  router.replace(target);
}
