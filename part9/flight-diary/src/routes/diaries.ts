import express from "express";
import diaryService from "../services/diaryService";
import { toNewDiaryEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(diaryService.getNonSensitiveDiaryEntries());
});

router.get("/:id", (req, res) => {
    const entry = diaryService.findById(Number(req.params.id));
    if (entry)
        res.status(200).send(entry);
    else
        res.status(404).send("No entry found");
});

router.post('/', (req, res) => {
    try
    {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.writeDiaryEntry(newDiaryEntry);

        res.status(200).send(addedEntry);
    }
    catch (error: unknown)
    {
        if (error instanceof Error)
            res.status(418).send(error.message);
    }
});

export default router;