import patientsData from "../data/patients";
import { Entry, EntryWithoutId, NewPatientType, NonSensitivePatientsDataType, PatientsType } from "../types";
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

export const addEntry = (id: string, entry : EntryWithoutId): PatientsType => {
    const newEntry: Entry = {
        id: uuid(),
        ...entry
    }

    let patientIndex = -1;
    for(let i = 0; i < patientsData.length; i++){
        if(patientsData[i].id === id){
            patientIndex = i;
            break;
        }
    }
    if(!patientIndex) throw new Error('Patient not found');
    patientsData[patientIndex].entries = patientsData[patientIndex].entries.concat(newEntry);
    return patientsData[patientIndex];

    // const patient = patientsData.find(p => p.id === id);
    // if(!patient) throw new Error('Patient not found');
    // patient.entries.concat(newEntry);
    // return patient;
}