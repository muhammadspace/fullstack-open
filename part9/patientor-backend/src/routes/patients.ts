import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(patientService.getSecurePatients());
});

router.post('/', (req, res) => {
    try
    {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.status(201).send(addedPatient);
    }
    catch (error: unknown)
    {
        if (error instanceof Error)
            res.status(400).send("Bad data: " + error.message);
    }
});

export default router;