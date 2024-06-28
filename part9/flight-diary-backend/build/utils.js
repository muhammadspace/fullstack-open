"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewDiaryEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    if (typeof text === "string" || text instanceof String)
        return true;
    throw new Error("Value is not a valid string: " + text);
};
const parseComment = (comment) => {
    if (!comment || !isString(comment))
        throw new Error("Invalid comment: " + comment);
    return comment;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Invalid date: " + date);
    return date;
};
const isWeather = (weather) => {
    return Object.values(types_1.Weather).map(v => v.toString()).includes(weather);
};
const parseWeather = (weather) => {
    if (!weather || !isString(weather) || !isWeather(weather))
        throw new Error("Invalid weather:" + weather);
    return weather;
};
const isVisibility = (visibility) => {
    return Object.values(types_1.Visibility).map(v => v.toString()).includes(visibility);
};
const parseVisibility = (visibility) => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility))
        throw new Error("Invalid visiblity: " + visibility);
    return visibility;
};
const toNewDiaryEntry = (obj) => {
    if (obj && typeof obj === "object") {
        if ("date" in obj && "weather" in obj && "visibility" in obj && "comment" in obj) {
            const entry = {
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
exports.toNewDiaryEntry = toNewDiaryEntry;
