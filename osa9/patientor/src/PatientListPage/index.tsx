import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { setAddPatient, setUpdatePatient } from "../state/reducer"

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const history = useHistory();


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch(setAddPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


   const showSinglePatient = async (id: string) => {
     const filteredPatient = Object.fromEntries(Object.entries(patients).filter(([k,v]) => k===id));
     if(filteredPatient[id].ssn){
       history.push(`/patients/${id}`)
     }else{
    try {
      const { data: newPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`);
      dispatch(setUpdatePatient(newPatient));
      //console.log(newPatient.entries)
      history.push(`/patients/${id}`)
          } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
     }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell onClick={()=> showSinglePatient(patient.id) }>{patient.name}</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;