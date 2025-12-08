import { useEffect, useState } from "react";
import IncidentTable from "../components/IncidentTable";
import IncidentForm from "../components/IncidentForm";
import { listIncidents, createIncident, deleteIncident } from "../services/IncidentService";
import './dashboard.css'

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listIncidents();
      setIncidents(data);
    } catch {
      setError("The incidents could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    await createIncident(payload);
    load();
  };

  const handleDelete = async (id) => {
    await deleteIncident(id);
    load();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Incident Management</h1>
        <img src="./logoop.png" alt="StackByte Logo" className="dashboard-logo" />
      </div>

      {error && <p className="dashboard-error">{error}</p>}

      {/* Tabla primero */}
      {loading ? (
        <p className="dashboard-loading">Loading…</p>
      ) : (
        <IncidentTable incidents={incidents} onDelete={handleDelete} />
      )}

      {/* Formulario debajo */}
      <IncidentForm onSubmit={handleCreate} />
    </div>
  );
};

export default Dashboard;
