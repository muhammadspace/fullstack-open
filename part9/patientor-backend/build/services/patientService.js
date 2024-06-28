"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const getPatients = () => patients_1.default;
const getSecurePatients = () => {
    const securePatients = patients_1.default.map(patient => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        };
    });
    return securePatients;
};
const addPatient = (patient) => {
    const newPatient = patient;
    newPatient.id = (0, uuid_1.v1)();
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getSecurePatients,
    addPatient,
};
