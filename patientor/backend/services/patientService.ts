import patientData from '../data/patients.ts' with { type: "json" };
import type { NoSSNPatient, Patient } from '../types.ts';

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

export default {
  getPatients,
  getNoSSNPatients
};