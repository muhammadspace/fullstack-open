import { Diagnosis, Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    if (typeof text === "string" || text instanceof String)
        return true;

    throw new Error("Invalid or empty string: " + text);
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text))
        throw new Error("Invalid or empty string: " + text);

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
                gender: parseGender(obj.gender),
                entries: [],
            };

            return patient;
        }
    }

    throw new Error("Invalid patient; missing or invalid data.");
};

const assertEntryNever = (entry: never): never => 
{
    throw new Error(
        "Unhandled discriminated union entry: " + JSON.stringify(entry)
    );
};

const isNewEntry = (obj: unknown): obj is NewEntry => {
    if (
        obj && typeof obj === "object" &&
        "description" in obj && "date" in obj && "specialist" in obj && "type" in obj &&
        isString(obj.type) && isEntryType(obj.type)
    )
        return true;

    throw new Error("Invalid patient entry object: " + JSON.stringify(obj));
};

const parseDiagnosisCodes = (obj: unknown): Array<Diagnosis["code"]> => {
    if (!obj || typeof obj !== "object" || !("diagnosisCodes" in obj))
        return [] as Array<Diagnosis["code"]>;

    return obj.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isEntryType = (type: string): type is NewEntry["type"] => {
    if (
        type === "HealthCheck" ||
        type === "Hospital" ||
        type === "OccupationalHealthcare"
    )
        return true;

    throw new Error("Invalid entry type: " + type);
};


const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => Number(v)).includes(rating);
};

const isNumber = (num: unknown): num is number => {
    if (num instanceof Number || typeof num === "number" || !isNaN(Number(num)))
        return true;

    throw new Error("Invalid number: " + num);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (isNumber(rating) && isHealthCheckRating(rating))
        return rating;

    throw new Error("Invalid health check rating: " + rating);
};

const toNewEntry = (obj: unknown): NewEntry => {
    if (isNewEntry(obj))
    {
        switch (obj.type)
        {
            case "HealthCheck":
                return {
                    description: parseString(obj.description),
                    date: parseDate(obj.date),
                    specialist: parseString(obj.specialist),
                    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
                    type: obj.type,
                    healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
                };
            case "Hospital":
                return {
                    description: parseString(obj.description),
                    date: parseDate(obj.date),
                    specialist: parseString(obj.specialist),
                    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
                    type: obj.type,
                    discharge: {
                        date: parseDate(obj.discharge.date),
                        criteria: parseString(obj.discharge.criteria)
                    }
                };
            case "OccupationalHealthcare":
                return {
                    description: parseString(obj.description),
                    date: parseDate(obj.date),
                    specialist: parseString(obj.specialist),
                    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
                    type: obj.type,
                    employerName: parseString(obj.employerName),
                    sickLeave: {
                        startDate: parseDate(obj.sickLeave?.startDate),
                        endDate: parseDate(obj.sickLeave?.endDate)
                    }
                };
            default:
                assertEntryNever(obj);
        }
    }

    throw new Error("Invalid entry: " + JSON.stringify(obj));
};

export {
    toNewPatient,
    toNewEntry
};