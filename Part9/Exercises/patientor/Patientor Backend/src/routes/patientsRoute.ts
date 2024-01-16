import express from 'express';
import { addEntry, addPatient, getNonSensitivePatientsData, getPatient } from '../services/patientService';
import {parseEntry, toNewPatientEntry} from '../utils';
import { EntryWithoutId } from '../types';
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

patientsRouter.post('/patients/:id/entries', (req, res) => {
    const id = req.params.id;
    const newEntry: EntryWithoutId = parseEntry(req.body);
    const patientWithAddedEntry = addEntry(id, newEntry);
    res.json(patientWithAddedEntry);
})

export default patientsRouter;