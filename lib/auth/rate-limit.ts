// In-memory rate limiter — intentionally simple.
// Resets on server restart, which is acceptable for this use case
// (school website, not a high-value attack target). No external dependency needed.

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface Entry {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const store = new Map<string, Entry>();

export function checkRateLimit(key: string): { allowed: boolean; remainingMinutes?: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) return { allowed: true };

  if (entry.blockedUntil && now < entry.blockedUntil) {
    const remainingMinutes = Math.ceil((entry.blockedUntil - now) / 60_000);
    return { allowed: false, remainingMinutes };
  }

  // Window expired — reset
  if (now - entry.firstAttempt > WINDOW_MS) {
    store.delete(key);
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const blockedUntil = entry.firstAttempt + WINDOW_MS;
    store.set(key, { ...entry, blockedUntil });
    const remainingMinutes = Math.ceil((blockedUntil - now) / 60_000);
    return { allowed: false, remainingMinutes };
  }

  return { allowed: true };
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, firstAttempt: now });
    return;
  }

  // Reset if previous window expired
  if (now - entry.firstAttempt > WINDOW_MS) {
    store.set(key, { count: 1, firstAttempt: now });
    return;
  }

  store.set(key, { ...entry, count: entry.count + 1 });
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}
