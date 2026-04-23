// Tiny API helper. Works both on the Emergent preview (REACT_APP_BACKEND_URL set)
// and on Vercel (relative /api). No external deps — uses fetch.

const RAW_BASE = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
export const API_BASE = `${RAW_BASE}/api`;

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.detail || data?.error || `Request failed (${res.status})`;
    throw new Error(typeof msg === "string" ? msg : "Request failed");
  }
  return data;
}

export const api = {
  // Contact
  submitMessage: (payload) => request("/contact", { method: "POST", body: payload }),

  // Stats
  getStats: () => request("/stats"),
  bumpVisit: () => request("/stats/visit", { method: "POST", body: {} }),
  bumpResumeDownload: () =>
    request("/stats/resume-download", { method: "POST", body: {} }),
};

// Fire-and-forget helper — never throws.
export const fireAndForget = (fn) => {
  try {
    Promise.resolve(fn()).catch(() => {});
  } catch {
    /* ignore */
  }
};
