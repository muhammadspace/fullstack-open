import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.status(200).send(patientService.getSecurePatients());
});

router.get("/:id", (req, res) => {
    const patient = patientService.getPatients().find(p => p.id === req.params.id);

    if (patient)
        res.status(200).send(patient);
    else
        res.status(404).send("Patient not found.");
});

router.post("/", (req, res) => {
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

router.post("/:id/entries", (req, res) => {
    try
    {
        const newEntry = toNewEntry(req.body);
        const savedEntry = patientService.addPatientEntry(req.params.id, newEntry);

        res.status(201).send(savedEntry);
    }
    catch (err: unknown)
    {
        if (err instanceof Error)
        {
            console.log(err.message)
            res.status(400).send("Could not write entry: " + err.message);
        }
    }
});

export default router;