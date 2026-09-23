import {z} from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient extends NewPatientEntry{
  id: string;
}

export type NoSSNPatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string()
});  
export type Gender = typeof Gender [keyof typeof Gender];