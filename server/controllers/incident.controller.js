// server/controllers/incident.controller.js
import Incident from "../models/incident.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

// Create a new incident
const create = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    return res.status(200).json(incident);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Middleware to load incident by ID
const incidentByID = async (req, res, next, id) => {
  try {
    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(400).json({ error: "Incident not found" });
    }
    req.incident = incident;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve incident",
    });
  }
};

// Read one
const read = (req, res) => {
  return res.json(req.incident);
};

// List all
const list = async (req, res) => {
  try {
    const incidents = await Incident.find().sort("-created");
    return res.json(incidents);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Update
const update = async (req, res) => {
  try {
    let incident = req.incident;
    incident = extend(incident, req.body);
    incident.updated = Date.now();
    await incident.save();
    return res.json(incident);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Remove
const remove = async (req, res) => {
  try {
    const incident = req.incident;
    await incident.deleteOne();
    return res.json({ message: "Incident deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  incidentByID,
  read,
  list,
  update,
  remove,
};
