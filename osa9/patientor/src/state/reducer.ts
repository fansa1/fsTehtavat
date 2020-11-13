import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
     | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };

  export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  }
}

export const setDiagnosesList = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesListFromApi
  }
}

  export const setAddPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  }
}

  export const setUpdatePatient = (patientToUpdate: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patientToUpdate
  }
}


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
        case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "UPDATE_PATIENT":
     //console.log([action.payload])
     const filteredPatients = Object.fromEntries(Object.entries(state.patients).filter(([k,v]) => k!==action.payload.id));
      
      return {
        ...state,
        patients: {
          ...filteredPatients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }


};
