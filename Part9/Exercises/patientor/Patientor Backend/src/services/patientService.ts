import patientsData from "../data/patients";
import { NonSensitivePatientsDataType, PatientsType } from "../types";

export const getPatients = (): PatientsType[] => {
    return patientsData;
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