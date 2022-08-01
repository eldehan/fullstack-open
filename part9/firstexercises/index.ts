import express from 'express';
import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import { parseExerciseArguments, calculateExerciseHours } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const [ weight, height ] = [ req.query.weight, req.query.height ];
  
  if(!weight || !height) {
    res.status(400);
    res.send({ error: 'missing required parameters of weight or height'});
  } else {
    try {
      const { heightInCm, weightInKg } = parseBmiArguments(
        Number(height),
        Number(weight)
      );

      const bmi = calculateBmi(heightInCm, weightInKg);
      res.send({
        weight: weightInKg,
        height: heightInCm,
        bmi: bmi
      });
    } catch (error) {
      res.status(400);
      // eslint-disable-next-line
      res.send({ error: error.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  const dailyExercises:Array<number> = req.body.daily_exercises;
  // eslint-disable-next-line
  const dailyTarget:number = req.body.target;

  if (!dailyExercises || !dailyTarget) {
    res.status(400);
    res.send({ error: 'missing parameter daily_exercises or target' });
  } else {
    try {
      const { target, dailyExerciseHours } = parseExerciseArguments(
        dailyTarget,
        dailyExercises
      );
      res.send(calculateExerciseHours(target, dailyExerciseHours));
    } catch (e) {
      res.status(400);
      // eslint-disable-next-line
      res.send({ error: e.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});