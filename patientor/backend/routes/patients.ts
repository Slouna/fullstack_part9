import express from 'express';
import patientService from '../services/patientService.ts';
import parsedPatientEntry from '../utils.ts';


const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNoSSNPatients();
  res.send(data);
});


router.post('/', (req, res) => {
  try {
    const newPatient = parsedPatientEntry(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown){
    let errorMessage = 'something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

export default router;

