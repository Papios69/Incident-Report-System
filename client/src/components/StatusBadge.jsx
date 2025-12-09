import './statusBadge.css'
const map = {
  "Open": "status-open",
  "In progress": "status-inprogress",
  "Closed": "status-closed",
};

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${map[status] || "status-default"}`}>
    {status}
  </span>
);


export default StatusBadge;
