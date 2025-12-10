import { getAuth } from "./AuthService";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const mapIncident = (raw) => ({
  id: raw._id,
  title: raw.title,
  status: raw.status,
  priority: raw.priority,
  assignedTo: raw.assignedTo,
});


export const listIncidents = async () => {
  const res = await fetch(`${API_BASE}/api/incidents`);
  if (!res.ok) throw new Error("Failed to load incidents");
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected response");
  return data.map(mapIncident);
};

export const getIncident = async (id) => {
  const res = await fetch(`${API_BASE}/api/incidents/${id}`);
  if (!res.ok) throw new Error("Failed to load incident");
  const data = await res.json();
  return mapIncident(data);
};

// total incidents
export async function getTotalIncidents() {
  const res = await fetch(`${API_BASE}/api/incidents/total`);
  if (!res.ok) {
    throw new Error("Total incidents could not be loaded");
  }
  const data = await res.json();
  return data.total;
}


//add new incident
export const createIncident = async (payload) => {
  const auth = getAuth();
  const token = auth?.token;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/api/incidents`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("You must be signed in to create an incident");
    }
    throw new Error("Failed to create incident");
  }

  const data = await res.json();
  return mapIncident(data);
};


export const updateIncident = async (id, payload) => {
  const res = await fetch(`${API_BASE}/api/incidents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update incident");
  const data = await res.json();
  return mapIncident(data);
};

export const deleteIncident = async (id) => {
  const auth = getAuth();
  const token = auth?.token;

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/api/incidents/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("You must be signed in to delete an incident");
    }
    throw new Error("Failed to delete incident");
  }

  return { ok: true };
};


