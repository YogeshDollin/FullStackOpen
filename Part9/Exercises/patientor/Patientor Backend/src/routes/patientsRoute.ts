import express from 'express';
import { getNonSensitivePatientsData } from '../services/patientService';
const patientsRouter = express.Router();

patientsRouter.get('/patients', (_req, res) => {
    res.send(getNonSensitivePatientsData());
});

export default patientsRouter;