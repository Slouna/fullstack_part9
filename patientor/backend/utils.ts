import { type NewPatientEntry, NewPatientSchema } from "./types.ts";


const parsedPatientEntry = (object: unknown): NewPatientEntry =>{
    return NewPatientSchema.parse(object);
/*
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'ssn' in object && 'dateOfBirth' in object
        && 'gender' in object && 'occupation' in object){
        const newEntry: NewPatientEntry = {
            name: z.string().parse(object.name),
            ssn: z.string().parse(object.ssn),
            dateOfBirth: z.iso.date().parse(object.dateOfBirth),
            gender: z.enum(Gender).parse(object.gender),
            occupation: z.string().parse(object.occupation)
        };
        return newEntry;
    }
       
    throw new Error('Incorrect data!'); 
    */
};

/*
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
*/
export default parsedPatientEntry;