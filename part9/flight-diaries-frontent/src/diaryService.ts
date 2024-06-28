import axios, { AxiosError } from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseurl = "http://localhost:3000/api/diaries";

const getAllDiaryEntries = async () => {
    return (await axios.get<DiaryEntry[]>(baseurl)).data;
};

const writeEntry = async (entry: NewDiaryEntry, setError: React.Dispatch<AxiosError>) => {
    try
    {
        const data = (await axios.post<DiaryEntry>(baseurl, entry)).data;

        return data;
    }
    catch (error: unknown)
    {
        if (axios.isAxiosError(error))
        {
            setError(error);
        }
    }
}

export default {
    getAllDiaryEntries,
    writeEntry,
}