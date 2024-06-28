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
const writeDiaryEntry = (entry) => {
    console.log(entry);
};
exports.default = {
    getDiaryEntries,
    getNonSensitiveDiaryEntries,
    writeDiaryEntry
};
