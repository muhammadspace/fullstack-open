import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import Entry from "./Entry";
import EntryForm from "./EntryForm";

const PatientDetailsPage = () => {
    const params = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        if (params.id && typeof params.id === "string")
        {
            patientService
                .getPatient(params.id)
                .then(response => setPatient(response.data));

            diagnosisService
                .getAll()
                .then(data => setDiagnoses(data));
        }
    }, []);

    if (!patient)
        return <h1>loading...</h1>;

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>

            <h3>Entries</h3>
            <EntryForm patient={patient} setPatient={setPatient} />
            {
                patient.entries.map(entry => (
                    <Entry
                        diagnoses={diagnoses}
                        entry={entry}
                        key={entry.id}
                    />
                ))
            }
        </div>
    );
};

export default PatientDetailsPage;