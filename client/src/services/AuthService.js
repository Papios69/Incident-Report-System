const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function signup({ name, email, password }) {
  const res = await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }
  return data;
}

export async function signin({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Signin failed");
  }

  // Save token + user in localStorage
  localStorage.setItem("auth", JSON.stringify(data));
  return data;
}

export function signout() {
  const auth = getAuth();
  localStorage.removeItem("auth");

  const API = API_BASE;
  fetch(`${API}/auth/signout`, { method: "GET" }).catch(() => {});
}

export function getAuth() {
  const raw = localStorage.getItem("auth");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getAuth();
}
