import express from 'express';
import patientService from '../services/patientService.ts';
import {z} from 'zod';
import {  NewEntrySchema, NewPatientSchema } from '../types.ts';



const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNoSSNPatients();
  res.send(data);
});

router.get('/:id', (req, res)=> {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    res.status(400).send('Could not find the patient');
  }
  res.status(200).json(patient);
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

//TODO: mitä halutaan palauttaa? patient?/entries?
router.post('/:id/entries', (req, res) => {
  
  try {
    const id = req.params.id;
    console.log("-------------");
    console.log(req.body);
    console.log('-------------');

    const newEntry = NewEntrySchema.parse(req.body);
  
    const addedEntry = patientService.addNewEntryForPatient(id, newEntry);
    res.json(addedEntry);
  } catch(error){
    if(error instanceof z.ZodError){
      res.status(400).send({error: error.issues});
    }
    res.status(400).send({error: 'unknown error'});
  }
  

});

export default router;

