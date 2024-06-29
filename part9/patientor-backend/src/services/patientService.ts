import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { NewPatient, Patient, NonSensetivePatient, Entry, NewEntry } from "../types";
import { toNewEntry } from "../utils";

const getPatients = (): Patient[] => patients;

const getSecurePatients = (): NonSensetivePatient[] => {
    const securePatients: NonSensetivePatient[] = patients.map(patient => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
        };
    });

    return securePatients;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient = patient as Patient;
    newPatient.id = uuid();
    patients.push(newPatient);

    return newPatient;
};

const addPatientEntry = (patientId: string, entry: NewEntry): Entry => {
    const newEntry = toNewEntry(entry) as Entry;
    newEntry.id = uuid();

    patients.find(p => p.id === patientId)?.entries.push(newEntry);

    return newEntry;
};

export default {
    getPatients,
    getSecurePatients,
    addPatient,
    addPatientEntry
};