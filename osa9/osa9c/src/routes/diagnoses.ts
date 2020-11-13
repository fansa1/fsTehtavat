import express from 'express';
import  getEntries  from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  console.log(getEntries());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.json(getEntries());
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a diagnosis');
});

export default diagnoseRouter;