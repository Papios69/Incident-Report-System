import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { create, read, update } from "./api-incident.js";
import auth from "../lib/auth-helper.js";

export default function IncidentForm() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(incidentId);

  const [values, setValues] = useState({
    title: "",
    description: "",
    severity: "Low",
    status: "Open",
    incidentDate: "",
    error: "",
  });

  useEffect(() => {
    if (!isEdit) return;

    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ incidentId }, signal).then((data) => {
      if (data && data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          title: data.title || "",
          description: data.description || "",
          severity: data.severity || "Low",
          status: data.status || "Open",
          incidentDate: data.incidentDate
            ? data.incidentDate.slice(0, 10)
            : "",
        }));
      }
    });

    return () => abortController.abort();
  }, [incidentId, isEdit]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    if (!jwt) {
      setValues({ ...values, error: "You must be signed in" });
      return;
    }

    const incident = {
      title: values.title || undefined,
      description: values.description || undefined,
      severity: values.severity || "Low",
      status: values.status || "Open",
      incidentDate: values.incidentDate || undefined,
    };

    const credentials = { t: jwt.token };

    const action = isEdit
      ? update({ incidentId }, credentials, incident)
      : create(incident, credentials);

    action.then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        navigate("/incidents");
      }
    });
  };

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
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Edit Incident" : "Report New Incident"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          id="title"
          label="Title"
          fullWidth
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          id="description"
          label="Description"
          fullWidth
          multiline
          minRows={4}
          value={values.description}
          onChange={handleChange("description")}
        />

        <TextField
          id="severity"
          select
          label="Severity"
          value={values.severity}
          onChange={handleChange("severity")}
          sx={{ maxWidth: 200 }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
        </TextField>

        <TextField
          id="status"
          select
          label="Status"
          value={values.status}
          onChange={handleChange("status")}
          sx={{ maxWidth: 200 }}
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </TextField>

        <TextField
          id="incidentDate"
          label="Incident Date"
          type="date"
          value={values.incidentDate}
          onChange={handleChange("incidentDate")}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ maxWidth: 250 }}
        />

        {values.error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {values.error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={clickSubmit}
          sx={{ mt: 1 }}
        >
          {isEdit ? "Update Incident" : "Create Incident"}
        </Button>
      </Stack>
    </Paper>
  );
}
