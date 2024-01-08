import diagnosesData from "./data/diagnoses";

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

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);    
});