export enum Gender {
    Male = "male",
    Female = "female"
}

export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
};

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
};

export type NewPatient = Omit<Patient, "id">;

export type SecurePatient = Omit<Patient, "ssn">;