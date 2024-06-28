import axios from "axios";
import { NewNote, Note } from "./types";

const baseurl = "http://localhost:3001/notes";

const getAllNotes = () => {
    return axios.get<Note[]>(baseurl).then(response => response.data);
};

const createNote = (obj: NewNote) => {
    return axios.post<Note>(baseurl, obj).then(response => response.data);
};

export default {
    getAllNotes,
    createNote
};