import React, { useState } from "react";
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import patientService from "../services/patients";
import { useField } from "../hooks";
import { MenuItem, Select } from "@mui/material";

const EntryForm = ({ patient, setPatient }: { patient: Patient, setPatient: React.Dispatch<Patient> }) => {
    const type = useField<Entry["type"]>("Hospital");
    const date = useField("");
    const specialist = useField("");
    const description = useField("");
    const diagnosisCodes = useField<string[]>([]);
    const [error, setError] = useState("");

    const dischargeDate = useField("");
    const dischargeCriteria = useField("");

    const rating = useField<HealthCheckRating>(0);

    const employer = useField("");
    const start = useField("");
    const end = useField("");

    const HospitalFields = () => {
        return (
            <>
                <label>
                    discharge date: 
                    <input
                        type="date"
                        value={dischargeDate.value}
                        onChange={dischargeDate.onChange}
                    />
                </label>
                <label>
                    discharge criteria: 
                    <input
                        value={dischargeCriteria.value}
                        onChange={dischargeCriteria.onChange}
                    />
                </label>
            </>
        );
    };

    const HealthCheckFields = () => {
        return (
            <>
                <label>
                    health check rating: 
                    <input
                        value={rating.value}
                        onChange={rating.onChange}
                    />
                </label>
            </>
        );
    };

    const OccupationalHealthcareFields = () => {
        return (
            <>
                <label>
                    employer name:
                    <input
                        value={employer.value}
                        onChange={employer.onChange}
                    />
                </label>
                <label>
                    sick leave start: 
                    <input
                        value={start.value}
                        onChange={start.onChange}
                    />
                </label>
                <label>
                    sick leave end: 
                    <input
                        value={end.value}
                        onChange={end.onChange}
                    />
                </label>
            </>
        );
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let newEntry;
        switch (type.value)
        {
            case "Hospital":
                newEntry = await patientService.addEntry<HospitalEntry>(patient.id, setError, {
                    date: date.value,
                    specialist: specialist.value,
                    description: description.value,
                    diagnosisCodes: diagnosisCodes.value,
                    type: "Hospital",
                    discharge: {
                        criteria: dischargeCriteria.value,
                        date: dischargeDate.value,
                    }
                });
                if (newEntry)
                {
                    setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
                    setError("");
                }
                break;
            case "HealthCheck":
                newEntry = await patientService.addEntry<HealthCheckEntry>(patient.id, setError, {
                    date: date.value,
                    specialist: specialist.value,
                    description: description.value,
                    diagnosisCodes: diagnosisCodes.value,
                    healthCheckRating: rating.value,
                    type: "HealthCheck",
                });
                if (newEntry)
                {
                    setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
                    setError("");
                }
                break;
            case "OccupationalHealthcare":
                newEntry = await patientService.addEntry<OccupationalHealthcareEntry>(patient.id, setError, {
                    date: date.value,
                    specialist: specialist.value,
                    description: description.value,
                    diagnosisCodes: diagnosisCodes.value,
                    employerName: employer.value,
                    sickLeave: {
                        startDate: start.value,
                        endDate: end.value
                    },
                    type: "OccupationalHealthcare",
                });
                if (newEntry)
                {
                    setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
                    setError("");
                }
                break;
            default:
                return setError("Invalid entry type. Could not submit");
        }

    };

    return (
        <form onSubmit={handleSubmit} >
            {
                error && 
                <p style={{ background: "pink", border: "1px solid red", color: "red" }}>{error}</p>
            }
            <div>
                <label>
                    type: 
                    <input
                        value={type.value}
                        onChange={type.onChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    specialist: 
                    <input
                        value={specialist.value}
                        onChange={specialist.onChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    description: 
                    <input
                        value={description.value}
                        onChange={description.onChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    date: 
                    <input
                        type="date"
                        value={date.value}
                        onChange={date.onChange}
                    />
                </label>
            </div>
            <div>
            {
                type.value === "Hospital"
                    ? <HospitalFields />
                    : type.value === "HealthCheck"
                        ? <HealthCheckFields />
                        : type.value === "OccupationalHealthcare"
                            ? <OccupationalHealthcareFields />
                            : <p>Please select a valid type</p>
            }
            </div>
            <div>
                <label>
                    diagnosisCodes: 
                    <Select multiple value={diagnosisCodes.value} onChange={(e) => diagnosisCodes.setValue(e.target.value as string[])}>
                        <MenuItem value="Z57.1">Z57.1</MenuItem>
                        <MenuItem value="Z74.3">Z74.3</MenuItem>
                        <MenuItem value="M51.2">M51.2</MenuItem>
                    </Select>
                </label>
            </div>
            <button type="submit">add</button>
        </form>
    );
};

export default EntryForm;