import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";
import { setPatientList, setDiagnosesList } from "./state/reducer"

import PatientListPage from "./PatientListPage";
import SinglePatientPage from "./SinglePatientPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientListAndDiagnoses = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesListFromApi));
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientListAndDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
            <Route exact path="/" render={() => <PatientListPage />} />
            <Route path="/patients/" render={() => <SinglePatientPage />} />
        </Container>
      </Router>
    </div>
  );
};

export default App;
