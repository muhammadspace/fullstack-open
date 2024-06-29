import express from "express";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.status(200).send(diagnosisService.getDiagnosesData());
});

export default router;