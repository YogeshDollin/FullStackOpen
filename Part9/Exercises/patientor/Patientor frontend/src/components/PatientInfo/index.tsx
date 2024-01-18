import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Diagnosis, Entry, Gender, HealthCheckEntry, Patient } from "../../types";
import patientService from "../../services/patientService";
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import diagnosisService from "../../services/diagnosisService";
import HospitalEntryComponent from "../Entry/HospitalEntry";
import OccupationalHealthcareEntryComponent from "../Entry/OccupationHealthcareEntry";
import HealthCheckEntryComponent from "../Entry/HealthCheckEntry";
import { Alert, Box, Button, Link } from "@mui/material";
import AddEntryForm from "./AddEntryForm";

const PatientInfo = () => {
    const {id} = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
       patientService.getPatient(id)
        .then(data => setPatient(data));
        diagnosisService.getDiagnoseData()
            .then(data => setDiagnosis(data));
    }, []);
    

    if(!patient) return null;

    const getEntryComponent = (entry: Entry) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntryComponent entry={entry}/>;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntryComponent entry={entry}/>;
            default:
                return <HealthCheckEntryComponent entry={entry}/>;
        }
    }

    const NotifyError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 5000);
    }

    const onSubmit = (healthCheckEntry: {description: string, date: string, specialist:string, healthCheckRating:string, diagnosisCodes:string[] | null}) =>{
        patientService.addEntry({...healthCheckEntry, type: 'HealthCheck', id})
            .then(data => setPatient(data))
            .catch(error => NotifyError(error.message))
    }

    const onCancel = () => {
        setShowEntryForm(false);
    }

    return (
        <div>
            <h2>{patient.name} {patient.gender === Gender.Male ? <MaleOutlinedIcon/> : patient.gender === Gender.Female ? <FemaleOutlinedIcon/> : null}</h2>

            <br></br>

            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {error && <Alert severity="error">{error}</Alert>}
            {showEntryForm && <AddEntryForm onSubmit={onSubmit} onCancel={onCancel}/>}

            <br></br>

            <h2>entries</h2>
            <br></br>
            {/* {patient.entries.map(entry => (
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map((d,i) => <li key={i}> {d} <i>{diagnosis?.find(diagnose => diagnose.code === d)?.name}</i></li>)}
                    </ul>
                </div>
            ))} */}
            {
                patient.entries.map(entry => <Box key={entry.id} sx={{border: 2, marginTop: 3, marginBottom: 3, padding: 3}} >{getEntryComponent(entry)}</Box>)
            }
            <Button variant="contained" color="primary" onClick={() => setShowEntryForm(true)}>ADD NEW ENTRY</Button>
        </div>
    );
}

export default PatientInfo;