// --- Promise state management for Suspense (exported for test control) ---
let _initPromise: Promise<void> | null = null;
let _statusPromise: "pending" | "fulfilled" | "rejected" | null = null;

export function resetAuthInitializerPromiseState() {
  _initPromise = null;
  _statusPromise = null;
}

export function setAuthInitializerPromise(
  p: Promise<void> | null,
  status: "pending" | "fulfilled" | "rejected" | null
) {
  _initPromise = p;
  _statusPromise = status;
}

export function getInitPromise() {
  return _initPromise;
}

export function getStatusPromise() {
  return _statusPromise;
}
