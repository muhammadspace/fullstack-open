import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosesData = (): Diagnosis[] => diagnosesData;

export default {
    getDiagnosesData
};