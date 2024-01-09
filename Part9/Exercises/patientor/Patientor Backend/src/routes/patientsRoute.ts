import express from 'express';
import { addPatient, getNonSensitivePatientsData } from '../services/patientService';
import toNewPatientEntry from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/patients', (_req, res) => {
    res.send(getNonSensitivePatientsData());
});

patientsRouter.post('/patients', (req, res) => {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
})

export default patientsRouter;