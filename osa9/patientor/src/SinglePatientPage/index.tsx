import React from "react";
import { useHistory} from "react-router-dom";
import { Container, Icon, Message, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis, SickLeave, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import {AddEntryModal, AddHospitalEntryModal, AddOccupationalHealthCareEntryModal} from "../AddEntryModal/index";
import axios from "axios";
import { Patient, newEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { setUpdatePatient } from "../state/reducer"

 
const SinglePatientPage: React.FC = () => {
   let history = useHistory()
   const id = String(history.location.pathname).slice(10)
   const [{ patients, diagnoses}, dispatch] = useStateValue(); 
   const patient = Object.fromEntries(Object.entries(patients).filter(([k,v]) => k===id))[id]

   const [healthCheckmodalOpen, setHealthCheckModalOpen] = React.useState<boolean>(false);
   const [occupationalHealthCaremodalOpen, setOccupationalHealthCareModalOpen] = React.useState<boolean>(false);
   const [hospitalmodalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
   const [error, setError] = React.useState<string | undefined>();

   const healthCheckModalOpen = (): void => setHealthCheckModalOpen(true);
   const healthCheckcloseModal = (): void => {
    setHealthCheckModalOpen(false);
    setOccupationalHealthCareModalOpen(false);
    setHospitalModalOpen(false);
    setError(undefined);
  };

  const occupationalHealthCareModalOpen = (): void => {
  
  setOccupationalHealthCareModalOpen(true);
  };

  const occupationalHealthCarecloseModal = (): void => {
   setHealthCheckModalOpen(false);
    setOccupationalHealthCareModalOpen(false);
    setHospitalModalOpen(false);
    setError(undefined);
  };

   const hospitalModalOpen = (): void => setHospitalModalOpen(true);
    const hospitalcloseModal = (): void => {
    setHealthCheckModalOpen(false);
    setOccupationalHealthCareModalOpen(false);
    setHospitalModalOpen(false);
    setError(undefined);
  };
 
   const nameOfDiagnose = (code: string): string => {
   const name = Object.fromEntries(Object.entries(diagnoses).filter(([k,v]) => k===code))[code].name
   //console.log(name)
   return(
       name
   );
   };

   const assertNever = (value: never): never => {
  throw new Error(
  `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


 const showDiagnoses = (diagnosisCodes: Array<Diagnosis['code']> | undefined) => {
      if(!diagnosisCodes){
       return(
              <p></p>
          )
  }else{
      return(
      <div>
      <p>Diagnoses:</p>
      {diagnosisCodes.map(code => {
      return(          
          <p key={code}> {code} {nameOfDiagnose(code)}</p>
      )})}
      </div>
      )
 }}

     


 
 const ShowHealthCheckEntry: React.FC<HealthCheckEntry>= ({type, healthCheckRating, id, description, date, specialist, diagnosisCodes}: HealthCheckEntry) => {
 
  const heartElement = (healthCheckRating: number) =>{
         switch(healthCheckRating){
         case 0:
         return <p>Rating: <Icon className="heart" color="green"></Icon></p>
         case 1:
         return <p>Rating: <Icon className="heart" color="yellow"></Icon></p>
         case 2:
         return <p>Rating: <Icon className="heart" color="red"></Icon></p>
         case 4:
         return <p>Rating: <Icon className="heart" color="black"></Icon></p>
         default:
         return <p></p>
        }}
  

     return(
         <Message>
         <p style={{fontWeight: "bold"}}> {date} Health check <Icon className="heartbeat icon"></Icon> </p> 
         <p>{description}</p>
         {heartElement(healthCheckRating)}
         {showDiagnoses(diagnosisCodes)}
         </Message>
     )
 }

  const ShowHospitalEntry: React.FC<HospitalEntry>= ({type, discharge, id, description, date, specialist, diagnosisCodes}: HospitalEntry) => {

 
     return(
         <Message>
         <p style={{fontWeight: "bold"}}> {date} Hospital visit <Icon className="hospital outline icon"></Icon> </p> 
         <p>{description}</p>
         <p>Discharge criteria: {discharge.criteria}</p>
         <p>Discharge date: {discharge.date} </p>
         {showDiagnoses(diagnosisCodes)}
         </Message>
     )
 }

   const ShowOccupationalHealthCareEntry: React.FC<OccupationalHealthCareEntry>= ({type, employerName, sickLeave, id, description, date, specialist, diagnosisCodes}: OccupationalHealthCareEntry) => {
   const showSickLeave = (sickLeave: SickLeave | undefined) =>{
     if(sickLeave){
         return(
             <p>Sickleave: from {sickLeave.startDate} to {sickLeave.endDate}</p>
         )
     }else{
         return(
             <p></p>
         )
     }}

     return(
         <Message>
         <p style={{fontWeight: "bold"}}> {date} Occupational health care visit <Icon className="stethoscope icon"></Icon> </p> 
         <p>{description}</p>
         <p>Employer: {employerName}</p>
         {showSickLeave(sickLeave)}
         {showDiagnoses(diagnosisCodes)}
         </Message>
     )
 }

  const submitNewEntryHealthCheck = async (values: newEntry) => {
    try {
         await axios.post<newEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
 const { data: patientToUpdate } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`);

      dispatch(setUpdatePatient(patientToUpdate));
      healthCheckcloseModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

 if(patient===undefined || patient.ssn===undefined){
     return(
         <div>
         ...loading
         </div>
     )
 }

 return(
      <Container>
      <h2>{patient.name}<Icon className={patient.gender}></Icon></h2>
       <p>ssn: {patient.ssn} </p>
       <p>occupation: {patient.occupation} </p>
       <Button onClick={() => healthCheckModalOpen()}>Add New Healtcheck Entry</Button>
       <Button className="primary" onClick={() => occupationalHealthCareModalOpen()}>Add New Occupational Healthcare Entry</Button>
       <Button className="secondary" onClick={() => hospitalModalOpen()}>Add New Hospital Entry</Button>
       <h3>entries</h3>
       {patient.entries.map(entry =>{
        switch(entry.type){
            case "HealthCheck":
            return <ShowHealthCheckEntry key={entry.id} id={entry.id} type={entry.type} healthCheckRating={entry.healthCheckRating} diagnosisCodes={entry.diagnosisCodes} description={entry.description} date={entry.date} specialist={entry.specialist}/>
            case "Hospital":
            return <ShowHospitalEntry key={entry.id} id={entry.id} type={entry.type} discharge={entry.discharge} description={entry.description} date={entry.date} diagnosisCodes={entry.diagnosisCodes} specialist={entry.specialist}/>
            case "OccupationalHealthcare":
            return <ShowOccupationalHealthCareEntry key={entry.id} id={entry.id} type={entry.type} sickLeave={entry.sickLeave} description={entry.description} diagnosisCodes={entry.diagnosisCodes} employerName={entry.employerName} date={entry.date} specialist={entry.specialist}/>
            default:
            return assertNever(entry)
            }})} 
        <AddEntryModal
        modalOpen={healthCheckmodalOpen}
        onSubmit={submitNewEntryHealthCheck}
        error={error}
        onClose={healthCheckcloseModal}
      /> 
      <AddHospitalEntryModal
        modalOpen={hospitalmodalOpen}
        onSubmit={submitNewEntryHealthCheck}
        error={error}
        onClose={hospitalcloseModal}
      />  
       <AddOccupationalHealthCareEntryModal
        modalOpen={occupationalHealthCaremodalOpen}
        onSubmit={submitNewEntryHealthCheck}
        error={error}
        onClose={occupationalHealthCarecloseModal}
      />          
    </Container>
  );
 }

export default SinglePatientPage;
