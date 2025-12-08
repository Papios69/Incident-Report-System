import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIncident, updateIncident } from "../services/IncidentService";
import IncidentForm from "../components/IncidentForm";
import './incidentDetail.css'

const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    getIncident(id).then(setIncident);
  }, [id]);

  const handleUpdate = async (payload) => {
    await updateIncident(id, payload);
    navigate("/incidents");
  };

  if (!incident) return <div className="incident-detail-loading">Loading…</div>;

  return (
    <div className="incident-detail-container">
      <h2 className="incident-detail-title">Incident #{incident.id}</h2>
      <IncidentForm initial={incident} onSubmit={handleUpdate} />
    </div>
  );

};

export default IncidentDetail;
