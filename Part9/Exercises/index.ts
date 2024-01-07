import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises, exerciseCalculatorParseArguments } from "./exerciseCalculator";
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!!!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    
    if(!isNaN(Number(height)) && !isNaN(Number(weight))){
        res.json(calculateBmi(Number(height), Number(weight)));
    }else{
        throw new Error('Malformed parameters');
    }
});

app.get('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const inputsArgs = exerciseCalculatorParseArguments(daily_exercises, target);
    res.json(calculateExercises(inputsArgs.exercises, inputsArgs.target));
});

const PORT=3003;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);    
});