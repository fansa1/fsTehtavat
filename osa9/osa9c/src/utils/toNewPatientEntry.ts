import { newPatient, Gender} from '../types/types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: any): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
}

const parseDate = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
}


const parseDescription = (description: any): void => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
}

const parseSpecialist = (specialist: any): void => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
}


//const parseDiagnosis = (diagnosisCodes: any | undefined): Array<string> => {
//if(!diagnosCodes instanceof Array  || diagnosisCodes.forEach(o=> isString(o))) {
//    throw new Error('Incorrect diagnosis');
//  }
//  return diagnosisCodes;
//}

const parseHealthCheckRating = (healthCheckRating: any): void => {
  if (!isNumber(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
}

const parseEntryDate = (dateOfBirth: any): void => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
};


const parseDischarge = (discharge: any): void => {
  if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
      throw new Error('Incorrect or missing discharge date: ' + discharge.daate);
  }
   if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge criteria: ' + discharge.criteria);
  }
};

const parseEmployer = (employerName: any): void => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer: ' + employerName);
  }
}


const toNewPatientEntry = (object: any): newPatient => {
  
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};


const toNewEntry = (object: any): any=> {
switch(object.type){
  case "HealthCheck":
  parseEntryDate(object.date)
  parseDescription(object.description)
  parseSpecialist(object.specialist)
  parseHealthCheckRating(object.healthCheckRating)
  return object
  case "Hospital":
  parseEntryDate(object.date)
  parseDescription(object.description)
  parseSpecialist(object.specialist)
  parseDischarge(object.discharge)
  return object
  case "OccupationalHealthcare":
  parseEntryDate(object.date)
  parseDescription(object.description)
  parseSpecialist(object.specialist)
  parseEmployer(object.employerName)
  return object
  }
  }


export {toNewPatientEntry, toNewEntry}