import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open",
  },
  incidentDate: {
    type: Date,
    default: Date.now,
  },
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "Reporter is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Incident", IncidentSchema);
