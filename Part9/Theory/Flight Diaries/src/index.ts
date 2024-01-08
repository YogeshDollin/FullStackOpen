const express = require('express')
import diaryRouter from './routes/diaries';
const app = express()

app.get('/ping', (_req: any, res: { send: (arg0: string) => void; }) => {
    console.log('Someone pinged here.');
    res.send('pong')
})

app.use('/api/diaries', diaryRouter);

const PORT=3003
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);    
})