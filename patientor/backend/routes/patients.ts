import express from 'express';
import patientService from '../services/patientService.ts';
import {z} from 'zod';
import { NewPatientSchema } from '../types.ts';
import { id } from 'zod/locales';


const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNoSSNPatients();
  res.send(data);
});

router.get('/:id', async (req, res)=> {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    res.status(400).send('Could not find the patient')
  }
  res.status(200).json(patient);
})


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

