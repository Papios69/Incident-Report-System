import express from "express";
import incidentCtrl from "../controllers/incident.controller.js";
import Incident from "../models/incident.model.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();


router.get("/api/incidents/total", async (req, res) => {
  try {
    const total = await Incident.countDocuments();
    res.json({ total });
  } catch (error) {
    console.error("Error getting total incidents:", error);
    res.status(500).json({ error: "Error getting total incidents" });
  }
});

router
  .route("/api/incidents")
  .get(incidentCtrl.list)
  .post(authCtrl.requireSignin, incidentCtrl.create);

router
  .route("/api/incidents/:incidentId")
  .get(incidentCtrl.read)
  .put(authCtrl.requireSignin, incidentCtrl.update)
  .delete(authCtrl.requireSignin, incidentCtrl.remove);

router.param("incidentId", incidentCtrl.incidentByID);

export default router;
