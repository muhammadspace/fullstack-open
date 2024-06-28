"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.status(200).send(diaryService_1.default.getNonSensitiveDiaryEntries());
});
router.get("/:id", (req, res) => {
    const entry = diaryService_1.default.findById(Number(req.params.id));
    if (entry)
        res.status(200).send(entry);
    else
        res.status(404).send("No entry found");
});
router.post('/', (req, res) => {
    try {
        const newDiaryEntry = (0, utils_1.toNewDiaryEntry)(req.body);
        const addedEntry = diaryService_1.default.writeDiaryEntry(newDiaryEntry);
        res.status(200).send(addedEntry);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(418).send(error.message);
    }
});
exports.default = router;
