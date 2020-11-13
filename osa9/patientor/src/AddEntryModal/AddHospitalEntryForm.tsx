import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField,  DiagnosisSelection, NumberField } from "./FormField";
import { newEntry, newHospitalEntry} from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 *
 */

export type EntryFormValues = newHospitalEntry;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        type:"Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {date: "", criteria: ""}
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge.date) {
          errors.dischargeDate= requiredError;
        }
         if (!values.discharge.criteria) {
          errors.dischargeCriteria= requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />

            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
