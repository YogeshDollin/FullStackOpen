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

export type NonSensitivePatientsDataType = Omit<PatientsType, 'ssn'>