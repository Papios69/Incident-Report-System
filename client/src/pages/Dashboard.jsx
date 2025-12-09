import { useEffect, useState } from "react";
import IncidentTable from "../components/IncidentTable";
import IncidentForm from "../components/IncidentForm";
import { listIncidents, createIncident, deleteIncident, getTotalIncidents } from "../services/IncidentService";
import './dashboard.css'
import { isAuthenticated } from "../services/AuthService";


const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalIncidents, setTotalIncidents] = useState(0);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [data, total] = await Promise.all([
        listIncidents(),
        getTotalIncidents()
      ]);

      setIncidents(data);
      setTotalIncidents(total);
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
      <p className="dashboard-total"><strong>Total Incidents:</strong> {totalIncidents}</p>

      {error && <p className="dashboard-error">{error}</p>}

      {loading ? (
        <p className="dashboard-loading">Loading…</p>
      ) : (
        <IncidentTable incidents={incidents} onDelete={handleDelete} />
      )}

      {isAuthenticated() ? (
        <IncidentForm onSubmit={handleCreate} />
      ) : (
        <p className="dashboard-error">
          You must be signed in to report a new incident.
        </p>
      )}
    </div>
  );
};


export default Dashboard;
