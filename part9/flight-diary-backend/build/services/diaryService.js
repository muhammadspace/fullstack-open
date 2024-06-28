"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaryEntries_1 = __importDefault(require("../data/diaryEntries"));
const getDiaryEntries = () => diaryEntries_1.default;
const getNonSensitiveDiaryEntries = () => {
    const entries = diaryEntries_1.default.map(entry => {
        return {
            id: entry.id,
            date: entry.date,
            weather: entry.weather,
            visibility: entry.visibility
        };
    });
    return entries;
};
const findById = (id) => {
    return diaryEntries_1.default.find(entry => entry.id === id);
};
const writeDiaryEntry = (entry) => {
    const newEntry = Object.assign({ id: Math.max(...diaryEntries_1.default.map(entry => entry.id)) + 1 }, entry);
    diaryEntries_1.default.push(newEntry);
    return newEntry;
};
exports.default = {
    getDiaryEntries,
    getNonSensitiveDiaryEntries,
    findById,
    writeDiaryEntry,
};
