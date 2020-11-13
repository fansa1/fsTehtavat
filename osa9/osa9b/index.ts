/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from 'express';
import {calculateBmi, parseArguments1} from './bmiCalculator';
import {exerciseCalculator, parseArguments2} from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
  });


app.get('/bmi', (req, res) => {
  const weightAndHeight: Array<string>= [String(req.query.height),String(req.query.weight)];
  try {
  console.log(weightAndHeight);
  const bmiParameters = parseArguments1(weightAndHeight);
  if(bmiParameters===undefined){
  throw new Error('Either the values for weight or height are missing or malformatted');
  }
  res.json({
    weight: req.query.weight,
    height: req.query.height,
    bmi: calculateBmi(bmiParameters[0],bmiParameters[1])
  });
  } catch (e) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.status(400).json({ error: e.message});
}
});


app.post('/exercises', (req, res) => {
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exerciseData = req.body;

  //console.log(req.body);
 try {
 res.json(
 exerciseCalculator(parseArguments2(exerciseData)));
 } catch (e) {
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
res.status(400).json({ error: e.message});
 }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});