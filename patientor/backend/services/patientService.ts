import patientData from '../data/patients.ts' with { type: "json" };
import type { NoSSNPatient, Patient, NewPatientEntry } from '../types.ts';
import {v1 as uuid} from 'uuid';



const patients: Patient[] = patientData;

const getPatients = (): NoSSNPatient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };
  return newPatient;
};

export default {
  getPatients,
  getNoSSNPatients,
  addNewPatient
};