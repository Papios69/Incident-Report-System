const API_BASE = "/api/incidents";

const handleResponse = async (response) => {
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to parse response JSON:", err);
    throw err;
  }
};

const handleError = (err) => {
  console.error("API call failed:", err);
  throw err;
};

// LIST all incidents (public)
const list = async (signal) => {
  try {
    const response = await fetch(API_BASE, {
      method: "GET",
      signal,
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

// READ single incident (public)
const read = async ({ incidentId }, signal) => {
  try {
    const response = await fetch(`${API_BASE}/${incidentId}`, {
      method: "GET",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

// CREATE incident (protected)
const create = async (incident, { t }) => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(incident),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

// UPDATE incident (protected)
const update = async ({ incidentId }, { t }, incident) => {
  try {
    const response = await fetch(`${API_BASE}/${incidentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(incident),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

// DELETE incident (protected)
const remove = async ({ incidentId }, { t }) => {
  try {
    const response = await fetch(`${API_BASE}/${incidentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

export { list, read, create, update, remove };
