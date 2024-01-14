import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Gender, Patient } from "../../types";
import patientService from "../../services/patientService";
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';

const PatientInfo = () => {
    const {id} = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
       patientService.getPatient(id)
        .then(data => setPatient(data));
    }, []);

    if(!patient) return null;

    return (
        <div>
            <h2>{patient.name} {patient.gender === Gender.Male ? <MaleOutlinedIcon/> : patient.gender === Gender.Female ? <FemaleOutlinedIcon/> : null}</h2>

            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
    );
}

export default PatientInfo;