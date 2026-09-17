import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    try{
        res.send(
            {
                "weight": weight,
                "height": height,
                "bmi": String(calculateBmi(height,weight))
            }
        );
    } catch(e: unknown){
        if (e instanceof Error){
            res.status(400).send({"error": e.message});
        }
    }    
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {target, daily_exercises} = req.body;

    if(target === undefined || daily_exercises === undefined){
        return res.status(400).send({error: "parameters missing"});
    }

    if(isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(hours => isNaN(Number(hours)))){
        return res.status(400).send({error: "malformatted parameters"});
    }

    const result = calculateExercises(daily_exercises as number[], Number(target));
    
    return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});