import { Diagnosis, Entry as EntryType } from "../types";

const assertNever = (entry: never): never => {
    throw new Error("Unhandled discriminated union type: " + JSON.parse(entry));
};

const Entry = ({ entry, diagnoses }: { entry: EntryType; diagnoses: Diagnosis[] }) => {
    switch (entry.type)
    {
        case "Hospital":
            return (
                <div key={entry.id}>
                    <p>{entry.date} <i>{entry.description}</i></p>
                    <p>specialist: {entry.specialist}</p>
                    <p>discharged on {entry.discharge.date} - {entry.discharge.criteria}</p>
                    {
                        entry.diagnosisCodes &&
                        <ul>
                        {
                            entry.diagnosisCodes.map(code => (
                                <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                            ))
                        }
                        </ul>
                    }
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div key={entry.id}>
                    <p>{entry.date} <i>{entry.description}</i></p>
                    <p>specialist: {entry.specialist}</p>
                    <p>employer name: {entry.employerName}</p>
                    {
                        entry.sickLeave &&
                        <p>sick leave starting from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
                    }
                    {
                        entry.diagnosisCodes &&
                        <ul>
                        {
                            entry.diagnosisCodes.map(code => (
                                <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                            ))
                        }
                        </ul>
                    }
                </div>
            );
        case "HealthCheck":
            return (
                <div key={entry.id}>
                    <p>{entry.date} <i>{entry.description}</i></p>
                    <p>specialist: {entry.specialist}</p>
                    <p>health check rating: {entry.healthCheckRating}</p>
                    {
                        entry.diagnosisCodes &&
                        <ul>
                        {
                            entry.diagnosisCodes.map(code => (
                                <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                            ))
                        }
                        </ul>
                    }
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default Entry;