export type DiagnosesType = {
    code: string;
    name: string;
    latin?: string;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

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

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesType['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: healthCheckRating;
}

export type Discharge = {
    date: string,
    criteria: string
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export type SickLeave = {
    startDate: string,
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: SickLeave
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;