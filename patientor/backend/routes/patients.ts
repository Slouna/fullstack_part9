import express from 'express';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNoSSNPatients();
  res.send(data);
});

/*
router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});
*/
export default router;

