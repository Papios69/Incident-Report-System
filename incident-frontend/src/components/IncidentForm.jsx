import { useState } from "react";
import './incidentsForm.css' 

const IncidentForm = ({ initial = {}, onSubmit }) => {
  const [title, setTitle] = useState(initial.title || "");
  const [priority, setPriority] = useState(initial.priority || "Medium");
  const [status, setStatus] = useState(initial.status || "Open");
  const [assignedTo, setAssignedTo] = useState(initial.assignedTo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, priority, status, assignedTo });
  };

   return (
    <form onSubmit={handleSubmit} className="incident-form-card">
      <div className="incident-form-wrapper">
      <h2 className="incident-form-title">Entry Incident Information:</h2>
  <input
    className="incident-input"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <div className="incident-row">
    <select
      className="incident-select"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

    <select
      className="incident-select"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option>Open</option>
      <option>In progress</option>
      <option>Closed</option>
    </select>
  </div>

  <input
    className="incident-input"
    placeholder="Assigned to"
    value={assignedTo}
    onChange={(e) => setAssignedTo(e.target.value)}
  />

  <button className="incident-button">Save</button>
  </div>
</form>

  );

};

export default IncidentForm;
