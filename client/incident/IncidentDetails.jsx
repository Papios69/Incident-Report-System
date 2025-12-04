import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { read, remove } from "./api-incident.js";
import auth from "../lib/auth-helper.js";

export default function IncidentDetails() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ incidentId }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setIncident(data);
      }
    });

    return () => abortController.abort();
  }, [incidentId]);

  const isReporter = () => {
    const jwt = auth.isAuthenticated();
    return (
      jwt &&
      jwt.user &&
      incident &&
      incident.reportedBy &&
      jwt.user._id === incident.reportedBy._id
    );
  };

  const clickDelete = () => {
    const jwt = auth.isAuthenticated();
    if (!jwt) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this incident?"
    );
    if (!confirmDelete) return;

    remove({ incidentId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        navigate("/incidents");
      }
    });
  };

  if (!incident) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        {incident.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Severity: {incident.severity} | Status: {incident.status}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ whiteSpace: "pre-line", mb: 2 }}>
        {incident.description}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Incident Date:{" "}
        {incident.incidentDate &&
          new Date(incident.incidentDate).toLocaleDateString()}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Reported by: {incident.reportedBy?.name || "Unknown"}
      </Typography>

      {isReporter() && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/incidents/edit/${incident._id}`}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={clickDelete}>
            Delete
          </Button>
        </Stack>
      )}
    </Paper>
  );
}
