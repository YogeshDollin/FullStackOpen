import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string | undefined) => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (entryObject: {id: string | undefined, entry: EntryWithoutId}) => {
  const {data} = await axios.post<Patient> (
    `${apiBaseUrl}/patients/${entryObject.id}/entries`,
    entryObject.entry
  )
  return data;
}

export default {
  getAll, getPatient, create, addEntry
};

