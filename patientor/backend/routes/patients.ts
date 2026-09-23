import express from 'express';
import patientService from '../services/patientService.ts';
import {z} from 'zod';
import { NewPatientSchema } from '../types.ts';


const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNoSSNPatients();
  res.send(data);
});


router.post('/', (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown){
    if (error instanceof z.ZodError) {
      res.status(400).send({error: error.issues});
    }
    res.status(400).send({error: 'unknown error'});
  }
  
});

export default router;

