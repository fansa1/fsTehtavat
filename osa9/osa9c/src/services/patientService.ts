import { v4 as uuidv4 } from 'uuid'
import patientData from '../../data/patients';
import {Patient, newPatient, Entry, newEntry} from '../types/types';

const getEntriesPublic = (): Omit<Patient, 'ssn' | 'entries'>[] => {

  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntriesSinglePatient = (id: string): Patient => {

const patientToReturn = patientData.filter(o=> o.id===id)[0]
return(
    patientToReturn
)
};

const addPatient = (addPatient: newPatient): Patient => {

const newPatient = {
    id : uuidv4(),
    name: addPatient.name,
    dateOfBirth: addPatient.dateOfBirth,
    ssn: addPatient.ssn,
    gender: addPatient.gender,
    occupation: addPatient.occupation,
    entries: []
}

patientData.push(newPatient)
return newPatient ;
};


const addEntry = (addEntry: newEntry, id: string): Entry | undefined => {
const objectIndex = patientData.findIndex(obj => obj.id === id)
//let patientToChange = patientData.filter(o=> o.id === id)
//let restOfData = patientData.filter(o=> o.id !== id)

switch(addEntry.type){
            case "HealthCheck":
            patientData[objectIndex].entries.push({id: uuidv4(), description: addEntry.description, date: addEntry.date, specialist: addEntry.specialist, diagnosisCodes: addEntry.diagnosisCodes, healthCheckRating: addEntry.healthCheckRating, type: addEntry.type})
            console.log(patientData[objectIndex].entries)
            return  {id: uuidv4(), description: addEntry.description, date: addEntry.date, specialist: addEntry.specialist, diagnosisCodes: addEntry.diagnosisCodes, healthCheckRating: addEntry.healthCheckRating, type: addEntry.type}
            case "Hospital":
            patientData[objectIndex].entries.push({id: uuidv4(), discharge: addEntry.discharge, description: addEntry.description, date: addEntry.date, specialist: addEntry.specialist, diagnosisCodes: addEntry.diagnosisCodes, type: addEntry.type})
           console.log(patientData[objectIndex].entries)
            return {id: uuidv4(), discharge: addEntry.discharge, description: addEntry.description, date: addEntry.date, specialist: addEntry.specialist, diagnosisCodes: addEntry.diagnosisCodes, type: addEntry.type}
            case "OccupationalHealthcare":
            patientData[objectIndex].entries.push({id: uuidv4(), sickLeave: addEntry.sickLeave, employerName: addEntry.employerName, description: addEntry.description, date: addEntry.date, specialist: addEntry.specialist, diagnosisCodes: addEntry.diagnosisCodes, type: addEntry.type})
            return {id: uuidv4(), sickLeave: addEntry.sickLeave, employerName: addEntry.employerName, description: addEntry.description, date: addEntry.date, specialist: addEntry.specialist, diagnosisCodes: addEntry.diagnosisCodes, type: addEntry.type}
            default:
            return undefined

}



}

export {getEntriesPublic, getEntriesSinglePatient, addPatient, addEntry};
  