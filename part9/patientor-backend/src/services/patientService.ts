import patientsEntries from "../../data/patients";
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatient, Patient, NewPatient } from "../types";

const patients:NonSensitivePatient[] = patientsEntries.map(
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

const getAllPatients = ():NonSensitivePatient[] => {
  return patients;
}

const getOnePatient = (id:string):NonSensitivePatient|undefined => {
  return patients.find(patient => patient.id === id)
}

const addPatient = (entry:NewPatient):Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };
  patients.push(newPatient)
  return newPatient;
};

export default {
  getAllPatients,
  getOnePatient,
  addPatient
}