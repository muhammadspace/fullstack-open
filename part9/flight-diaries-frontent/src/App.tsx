import React, { useEffect, useState } from "react";
import diaryService from "./diaryService";
import { DiaryEntry } from "./types";
import { AxiosError } from "axios";

function App() {
    const [newEntryDate, setNewEntryDate] = useState("");
    const [newEntryComment, setNewEntryComment] = useState("");
    const [newEntryWeaether, setNewEntryWeather] = useState("");
    const [newEntryVisibility, setNewEntryVisibility] = useState("");
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        diaryService
            .getAllDiaryEntries()
            .then(entries => setDiaryEntries(entries));
    }, []);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        diaryService.writeEntry({
            date: newEntryDate,
            comment: newEntryComment,
            weather: newEntryWeaether,
            visibility: newEntryVisibility,
        }, setError);

        setNewEntryDate("");
        setNewEntryComment("");
        setNewEntryWeather("");
        setNewEntryVisibility("");
    };

    return (
        <div>
            <h1>Add new entry</h1>
            {
                error && <p style={{ color: "red" }}>Could not write diary: {error.response?.data as string}</p>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        date
                        <input
                            type="date"
                            value={newEntryDate}
                            onChange={(e) => setNewEntryDate(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        comment
                        <input
                            type="text"
                            value={newEntryComment}
                            onChange={(e) => setNewEntryComment(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    visibility
                    <label>
                        <input
                            id="great"
                            name="visibility"
                            type="radio"
                            value="great"
                            onChange={(e) => setNewEntryVisibility(e.target.value)}
                        />
                        great
                    </label>
                    <label>
                        <input
                            id="good"
                            name="visibility"
                            type="radio"
                            value="good"
                            onChange={(e) => setNewEntryVisibility(e.target.value)}
                        />
                        good
                    </label>
                    <label>
                        <input
                            id="ok"
                            name="visibility"
                            type="radio"
                            value="ok"
                            onChange={(e) => setNewEntryVisibility(e.target.value)}
                        />
                        ok
                    </label>
                    <label>
                        <input
                            id="poor"
                            name="visibility"
                            type="radio"
                            value="poor"
                            onChange={(e) => setNewEntryVisibility(e.target.validationMessage)}
                        />
                        poor
                    </label>
                </div>
                <div>
                    weather
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="sunny"
                            onChange={(e) => setNewEntryWeather(e.target.value)}
                        />
                        sunny
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="rainy"
                            onChange={(e) => setNewEntryWeather(e.target.value)}
                        />
                        rainy
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="cloudy"
                            onChange={(e) => setNewEntryWeather(e.target.value)}
                        />
                        cloudy
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="stormy"
                            onChange={(e) => setNewEntryWeather(e.target.value)}
                        />
                        stormy
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="windy"
                            onChange={(e) => setNewEntryWeather(e.target.value)}
                        />
                        windy
                    </label>
                </div>
                <button type="submit">write</button>
            </form>
            <h1>Diary entries</h1>
            {
                diaryEntries.map(entry => (
                    <div key={entry.id}>
                        <h2>{entry.date}</h2>
                        <p>{entry.comment}</p>
                        <p>visibility: {entry.visibility}</p>
                        <p>weather: {entry.weather}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default App
