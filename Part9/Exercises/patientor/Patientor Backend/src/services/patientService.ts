import patientsData from "../data/patients";
import { NewPatientType, NonSensitivePatientsDataType, PatientsType } from "../types";
import {v1 as uuid} from 'uuid';

export const getPatients = (): PatientsType[] => {
    return patientsData;
};

export const addPatient = (newPatient: NewPatientType): PatientsType => {
    const newPatientEntry = {
        id: uuid(),
        ...newPatient
    };
    patientsData.concat(newPatientEntry);
    return newPatientEntry;
};

export const getNonSensitivePatientsData = (): NonSensitivePatientsDataType[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
};

export const getPatient = (id: string): PatientsType | null => {
    const patient = patientsData.find(p => p.id === id);
    return patient ? patient : null;
}