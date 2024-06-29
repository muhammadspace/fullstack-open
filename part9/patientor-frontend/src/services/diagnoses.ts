import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import axios from "axios";

const getAll = async () => {
    return (await axios.get(`${apiBaseUrl}/diagnoses`)).data;
};

export default {
    getAll
};