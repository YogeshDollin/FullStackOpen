import express from 'express';
import { getDiagnoseData } from '../services/diagnosesService';
const diagnosesRouter = express.Router();

diagnosesRouter.get('/diagnoses', (_req, res) => {
    res.send(getDiagnoseData());
});

export default diagnosesRouter;