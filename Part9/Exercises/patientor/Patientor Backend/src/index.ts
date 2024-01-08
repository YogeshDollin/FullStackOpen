import diagnosesData from "./data/diagnoses";
import diagnosesRouter from "./routes/diagnosesRoute";
import patientsRouter from "./routes/patientsRoute";

const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send('pong');
});

app.get('/api/diagnoses', (_req: any, res: any) => {
    res.send(diagnosesData)
})
app.use('/api',diagnosesRouter)
app.use('/api', patientsRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);    
});