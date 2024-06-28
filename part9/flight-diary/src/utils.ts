import { NewDiaryEntry, Visibility, Weather } from "./types";

const isString = (text: unknown): text is string => {
    if (typeof text === "string" || text instanceof String)
        return true;

    throw new Error("Value is not a valid string: " + text);
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment))
        throw new Error("Invalid comment: " + comment);

    return comment;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Invalid date: " + date);

    return date;
};

const isWeather = (weather: string): weather is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(weather);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather))
        throw new Error("Invalid weather:" + weather);

    return weather;
};

const isVisibility = (visibility: string): visibility is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(visibility);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility))
        throw new Error("Invalid visiblity: " + visibility);

    return visibility;
};

const toNewDiaryEntry = (obj: unknown): NewDiaryEntry => {
    if (obj && typeof obj === "object")
    {
        if ("date" in obj && "weather" in obj && "visibility" in obj && "comment" in obj)
        {
            const entry: NewDiaryEntry = {
                comment: parseComment(obj.comment),
                date: parseDate(obj.date),
                weather: parseWeather(obj.weather),
                visibility: parseVisibility(obj.visibility)
            };

            return entry;
        }
    }

    throw new Error("Invalid or missing fields");
};

export {
    toNewDiaryEntry
};