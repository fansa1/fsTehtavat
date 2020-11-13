import express from 'express';
import {toNewPatientEntry, toNewEntry} from '../utils/toNewPatientEntry';
import  {getEntriesPublic, getEntriesSinglePatient, addPatient, addEntry}  from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.json(getEntriesPublic());
});

patientRouter.get('/:id', (req, res) => {
  res.json(getEntriesSinglePatient(req.params.id));
});

patientRouter.post('/:id/entries', (req, res) => {
  try { 
const newEntry = addEntry(toNewEntry(req.body), req.params.id) 
res.json(newEntry)
 } catch (e) {
    res.status(400).send(e.message);
  }
});


patientRouter.post('/', (req, res) => {
  try { 
const newPatient = addPatient(toNewPatientEntry(req.body)) 
res.json(newPatient)
 } catch (e) {
    res.status(400).send(e.message);
  }
});


export default patientRouter;