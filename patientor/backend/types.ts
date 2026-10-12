import {z} from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;


const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry{
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
  
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Patient extends NewPatientEntry{
  id: string;
  entries: Entry[];
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
    occupation: z.string(),
});  

const NewBaseEntrySchema = z.object({
  
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const NewHealthCheckEntrySchema = NewBaseEntrySchema.safeExtend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const NewHospitalEntrySchema = NewBaseEntrySchema.safeExtend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
});

const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.safeExtend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.optional(z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }))
});

export const NewEntrySchema = z.discriminatedUnion("type", [
    NewHealthCheckEntrySchema,
    NewHospitalEntrySchema,
    NewOccupationalHealthcareEntrySchema
]);

export type NewEntryItem = z.infer<typeof NewEntrySchema>;

export type Gender = typeof Gender [keyof typeof Gender];