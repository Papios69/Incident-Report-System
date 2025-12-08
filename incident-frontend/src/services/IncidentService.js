let MOCK = [
  { id: "1", title: "Server down", status: "Open", priority: "High", assignedTo: "Juan" },
  { id: "2", title: "Login error", status: "In progress", priority: "Medium", assignedTo: "Ana" }
];

export const listIncidents = async () => Promise.resolve(MOCK);

export const getIncident = async (id) =>
  Promise.resolve(MOCK.find(i => i.id === id));

export const createIncident = async (data) => {
  const newItem = { id: String(Date.now()), ...data };
  MOCK = [newItem, ...MOCK];
  return Promise.resolve(newItem);
};

export const updateIncident = async (id, data) => {
  MOCK = MOCK.map(i => (i.id === id ? { ...i, ...data } : i));
  return Promise.resolve(MOCK.find(i => i.id === id));
};

export const deleteIncident = async (id) => {
  MOCK = MOCK.filter(i => i.id !== id);
  return Promise.resolve({ ok: true });
};
