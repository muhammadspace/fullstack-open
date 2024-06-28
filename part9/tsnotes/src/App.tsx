import React, { useEffect, useState } from "react";
import { Note } from "./types";
import noteService from "./noteService";

function App() {
    const [newNote, setNewNote] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        noteService
            .getAllNotes()
            .then(allNotes => setNotes(allNotes));
    }, []);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        noteService
            .createNote({ content: newNote })
            .then(note => setNotes(notes.concat(note)));
        setNewNote("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        name="content"
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                </label>
                <button type="submit">save</button>
            </form>
            <ul>
            {
                notes.map(note => <p key={note.id}>{note.content}</p>)
            }
            </ul>
        </div>
    );
}

export default App;
