import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { list } from "./api-incident.js";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setIncidents(data);
      }
    });

    return () => abortController.abort();
  }, []);

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
        Incidents
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/incidents/new"
        sx={{ mb: 2 }}
      >
        Report New Incident
      </Button>

      <List dense>
        {incidents && incidents.length === 0 && (
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            No incidents recorded yet.
          </Typography>
        )}

        {incidents.map((incident) => (
          <ListItem
            key={incident._id}
            button
            component={RouterLink}
            to={`/incidents/${incident._id}`}
          >
            <ListItemText
              primary={incident.title}
              secondary={`Severity: ${incident.severity} | Status: ${incident.status}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
