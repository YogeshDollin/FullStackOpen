import { DiagnosesType, Discharge, EntryWithoutId, Gender, HealthCheckEntry, HospitalEntry, NewPatientType, OccupationalHealthcareEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!isString(name)){
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if(!isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation: unknown): string =>{
    if(!isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientType => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect or missing data');
};

export const parseDiagnosisCodes = (object: unknown): Array<DiagnosesType['code']> => {
    if(!object || typeof object !== 'object' || !('diagnosisCodes' in object)){
        return [] as Array<DiagnosesType['code']>;
    }
    return object.diagnosisCodes as Array<DiagnosesType['code']>;
};

export const parseEntry = (object: unknown): EntryWithoutId => {
    console.log(object);
    if(!object || typeof object !== 'object' || !('description' in object) || !('date' in object) || !('specialist' in object) || !('type' in object)){
        throw new Error('Invalid or required parameters (description, date, specialist, type) must be provided');
    }
    switch (object.type) {
        case 'Hospital':
            return parseHospitalEntry(object as HospitalEntry);
        case 'HealthCheck':
            return parseHealthCheckEntry(object as HealthCheckEntry);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(object as OccupationalHealthcareEntry);
        default:
            throw new Error('Invalid entry type');
    }
}

const parseDischarge = (object: Omit<HospitalEntry, 'id'>): Discharge => {
    if(!('date' in object.discharge) || !('criteria' in object.discharge)){
        throw new Error('date and criteria is required');
    }
    return {date: object.discharge.date, criteria: object.discharge.criteria};
}

const parseHospitalEntry = (object: Omit<HospitalEntry, 'id'>): Omit<HospitalEntry, 'id'> => {
    if(!('discharge' in object)){
        throw new Error(`'discharge parameter is required`);
    }
    return {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: parseDiagnosisCodes(object),
        type: object.type,
        discharge: parseDischarge(object)
    }
}

const parseHealthCheckEntry = (object: Omit<HealthCheckEntry, 'id'>) : Omit<HealthCheckEntry, 'id'> => {
    if(!('healthCheckRating' in object)){
        throw new Error('healthCheckRating parameter is required.');
    }
    return {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: parseDiagnosisCodes(object),
        type: object.type,
        healthCheckRating: object.healthCheckRating
    }
}

const parseOccupationalHealthcareEntry = (object: Omit<OccupationalHealthcareEntry, 'id'>): Omit<OccupationalHealthcareEntry, 'id'> => {
    if(!('employerName' in object)){
        throw new Error('employerName is required');
    }
    return {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: parseDiagnosisCodes(object),
        type: object.type,
        employerName: object.employerName,
        sickLeave: object.sickLeave
    };
}

