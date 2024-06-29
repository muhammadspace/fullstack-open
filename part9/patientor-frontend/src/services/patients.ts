import axios, { isAxiosError } from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string) => {
    const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return patient;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async <T>(patientId: string, setError: React.Dispatch<string>, entry: Omit<T, "id">) => {
    try
    {
        const data = (await axios.post<T>(`${apiBaseUrl}/patients/${patientId}/entries`, entry)).data;
        return data;
    }
    catch (err: unknown)
    {
        if (isAxiosError(err))
            setError(err.response?.data);
    }
};

export default {
  getAll, getPatient, create, addEntry
};

