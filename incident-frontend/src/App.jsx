import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import IncidentDetail from "./pages/IncidentDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/incidents" />} />
        <Route path="/incidents" element={<Dashboard />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
