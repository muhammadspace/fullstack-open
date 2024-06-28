"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    if (typeof text === "string" || text instanceof String)
        return true;
    throw new Error("Invalid string: " + text);
};
const parseString = (text) => {
    if (!text || !isString(text))
        throw new Error("Invalid string: " + text);
    return text;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (isString(date) && isDate(date))
        return date;
    throw new Error("Invalid date: " + date);
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
};
const parseGender = (gender) => {
    if (isString(gender) && isGender(gender))
        return gender;
    throw new Error("Invalid gender: " + gender);
};
const toNewPatient = (obj) => {
    if (obj && typeof obj === "object") {
        if ("name" in obj && "occupation" in obj && "dateOfBirth" in obj && "ssn" in obj && "gender" in obj) {
            const patient = {
                name: parseString(obj.name),
                occupation: parseString(obj.occupation),
                dateOfBirth: parseDate(obj.dateOfBirth),
                ssn: parseString(obj.ssn),
                gender: parseGender(obj.gender)
            };
            return patient;
        }
    }
    throw new Error("Invalid patient; missing or invalid data.");
};
exports.toNewPatient = toNewPatient;
