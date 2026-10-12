import patientData from '../data/patients.ts' with { type: "json" };
import { type NoSSNPatient, type NewPatientEntry, type Gender, type Entry, type NewEntryItem } from '../types.ts';
import {v1 as uuid} from 'uuid';




export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

const patients: Patient[] = patientData;

const findById = (id:string): Patient | null =>{
  const patient = patients.find(p => p.id === id);
  if (patient){
    return patient;
  }else {
    return null;
  }
};

const getPatients = (): NoSSNPatient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: []
  };
  return newPatient;
};

const addNewEntryForPatient = (id: string, entry: NewEntryItem) => {
  const patient = findById(id);
  if(!patient){
    return;
  }
  const newEntry = {
    ...entry,
    id: uuid()
  };
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNoSSNPatients,
  addNewPatient,
  findById,
  addNewEntryForPatient
};