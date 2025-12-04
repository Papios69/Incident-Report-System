import express from "express";
import incidentCtrl from "../controllers/incident.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// List all incidents, or create a new one
router
  .route("/api/incidents")
  .get(incidentCtrl.list)
  .post(authCtrl.requireSignin, incidentCtrl.create);

// Single incident: read, update, delete
router
  .route("/api/incidents/:incidentId")
  .get(incidentCtrl.read)
  .put(authCtrl.requireSignin, incidentCtrl.isReporter, incidentCtrl.update)
  .delete(authCtrl.requireSignin, incidentCtrl.isReporter, incidentCtrl.remove);

// Mount param middleware
router.param("incidentId", incidentCtrl.incidentByID);

export default router;
