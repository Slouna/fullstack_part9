import { type NewPatientEntry, NewPatientSchema } from "./types.ts";


const parsedPatientEntry = (object: unknown): NewPatientEntry =>{
    return NewPatientSchema.parse(object);

};
export default parsedPatientEntry;