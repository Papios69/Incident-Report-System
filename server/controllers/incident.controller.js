import Incident from "../models/incident.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";


// Create a new incident.
// Uses req.auth._id from auth.controller (requireSignin)

const create = async (req, res) => {
  try {
    const incident = new Incident({
      ...req.body,
      reportedBy: req.auth && req.auth._id,
    });

    await incident.save();
    return res.status(200).json({
      message: "Incident created successfully",
      incident,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


// Middleware to load incident by ID

const incidentByID = async (req, res, next, id) => {
  try {
    const incident = await Incident.findById(id).populate(
      "reportedBy",
      "name email"
    );
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

/**
 * Read one incident (already loaded by incidentByID)
 */
const read = (req, res) => {
  return res.json(req.incident);
};


// List all incidents 
const list = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("reportedBy", "name email")
      .sort("-created");
    return res.json(incidents);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


// Update an incident
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


// Remove an incident
const remove = async (req, res) => {
  try {
    const incident = req.incident;
    await incident.deleteOne();
    return res.json({
      message: "Incident deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


// Authorization: only reporter can update/delete this incident

const isReporter = (req, res, next) => {
  const isReporter =
    req.incident &&
    req.auth &&
    req.incident.reportedBy &&
    req.incident.reportedBy._id.toString() === req.auth._id;

  if (!isReporter) {
    return res.status(403).json({
      error: "User is not authorized to modify this incident",
    });
  }
  next();
};

export default {
  create,
  incidentByID,
  read,
  list,
  update,
  remove,
  isReporter,
};
