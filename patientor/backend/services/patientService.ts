import patientData from '../data/patients.ts' with { type: "json" };
import type { NoSSNPatient, NewPatientEntry, Gender } from '../types.ts';
import {v1 as uuid} from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

const patients: Patient[] = patientData.map(patient => ({
  ...patient,
  entries: []
}));

const findById = (id:string): Patient | null =>{
  const patient = patients.find(p => p.id === id);
  if (patient){
    return patient;
  }else {
    return null;
  }
}

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
    ...entry,
    entries: []
  };
  return newPatient;
};

export default {
  getPatients,
  getNoSSNPatients,
  addNewPatient,
  findById
};