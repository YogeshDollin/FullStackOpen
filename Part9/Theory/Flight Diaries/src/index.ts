import express from 'express';
import diaryRouter from './routes/diariesRoutes';
const app = express();
app.use(express.json());

app.get('/ping', ( _, res: { send: (arg0: string) => void; }) => {
    console.log('Someone pinged here.');
    res.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT=3003;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);    
});