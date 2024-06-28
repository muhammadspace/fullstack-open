import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import diaryEntries from "../data/diaryEntries";

const getDiaryEntries = (): DiaryEntry[] => diaryEntries; 

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
    const entries: NonSensitiveDiaryEntry[] = diaryEntries.map(entry => {
        return {
            id: entry.id,
            date: entry.date,
            weather: entry.weather,
            visibility: entry.visibility
        };
    });

    return entries;
};

const findById = (id: number): DiaryEntry | undefined => {
    return diaryEntries.find(entry => entry.id === id);
};

const writeDiaryEntry = (entry: NewDiaryEntry): DiaryEntry => {
    const newEntry: DiaryEntry = {
        id: Math.max(...diaryEntries.map(entry => entry.id)) + 1,
        ...entry
    };

    diaryEntries.push(newEntry);

    return newEntry;
};

export default {
    getDiaryEntries,
    getNonSensitiveDiaryEntries,
    findById,
    writeDiaryEntry,
};