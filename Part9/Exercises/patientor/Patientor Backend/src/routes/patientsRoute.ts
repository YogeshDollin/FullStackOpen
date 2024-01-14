import express from 'express';
import { addPatient, getNonSensitivePatientsData, getPatient } from '../services/patientService';
import toNewPatientEntry from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/patients', (_req, res) => {
    res.send(getNonSensitivePatientsData());
});

patientsRouter.get('/patients/:id', (req, res) => {
    const patient = getPatient(req.params.id);
    if(patient){
        res.send(patient);
    }else{
        res.status(404);
    }
});

patientsRouter.post('/patients', (req, res) => {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
})

export default patientsRouter;