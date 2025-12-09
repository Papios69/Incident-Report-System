// server/models/incident.model.js
import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["Open", "In progress", "Closed"],
    default: "Open",
  },
  assignedTo: {
    type: String,
    trim: true,
    default: "",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Incident", IncidentSchema);
