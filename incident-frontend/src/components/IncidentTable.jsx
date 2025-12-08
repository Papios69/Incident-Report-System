import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import './incidentTable.css'


const headers = ["ID", "Title", "Status", "Priority", "Asigned", "Actions"];

const IncidentTable = ({ incidents, onDelete }) => {
  return (
    <table className="incident-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assigned To</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((i) => (
          <tr key={i.id}>
            <td>{i.id}</td>
            <td>{i.title}</td>
            <td><StatusBadge status={i.status} /></td>
            <td>{i.priority}</td>
            <td>{i.assignedTo}</td>
            <td>
              <button className="btn-delete" onClick={() => onDelete(i.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default IncidentTable;
