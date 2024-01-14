export type DiagnosesType = {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry{

}

export type PatientsType = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type NewPatientType = Omit<PatientsType, 'id'>

export type NonSensitivePatientsDataType = Omit<PatientsType, 'ssn' | 'entries'>

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}