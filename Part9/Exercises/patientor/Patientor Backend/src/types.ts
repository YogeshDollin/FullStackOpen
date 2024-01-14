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

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesType['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: healthCheckRating;
}

type Discharge = {
    date: string,
    criteria: string
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

type SickLeave = {
    startDate: string,
    endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: SickLeave
}