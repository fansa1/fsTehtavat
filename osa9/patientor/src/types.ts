export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
   startDate: string;
   endDate: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface newBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface newHealthCheckEntry extends newBaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface newHospitalEntry extends newBaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface newOccupationalHealthCareEntry extends newBaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry

export type newEntry = newHospitalEntry | newOccupationalHealthCareEntry | newHealthCheckEntry


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface newPatient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
  
