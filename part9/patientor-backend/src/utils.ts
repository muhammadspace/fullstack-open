import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    if (typeof text === "string" || text instanceof String)
        return true;

    throw new Error("Invalid string: " + text);
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text))
        throw new Error("Invalid string: " + text);

    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (isString(date) && isDate(date))
        return date;

    throw new Error("Invalid date: " + date);
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (isString(gender) && isGender(gender))
        return gender;

    throw new Error("Invalid gender: " + gender);
};

const toNewPatient = (obj: unknown): NewPatient => {
    if (obj && typeof obj === "object")
    {
        if ("name" in obj &&  "occupation" in obj &&  "dateOfBirth" in obj &&  "ssn" in obj &&  "gender" in obj)
        {
            const patient: NewPatient = {
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

export {
    toNewPatient
};