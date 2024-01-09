export type DiagnosesType = {
    code: string;
    name: string;
    latin?: string;
}

export type PatientsType = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NewPatientType = Omit<PatientsType, 'id'>

export type NonSensitivePatientsDataType = Omit<PatientsType, 'ssn'>

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}