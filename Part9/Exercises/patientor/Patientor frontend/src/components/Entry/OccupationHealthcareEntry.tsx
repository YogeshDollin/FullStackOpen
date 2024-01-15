import { OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const OccupationalHealthcareEntryComponent = ({entry} : {entry: OccupationalHealthcareEntry}) => {
    return (
        <div>
            <p>{entry.date} <MedicalInformationIcon/> {entry.employerName}</p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
}

export default OccupationalHealthcareEntryComponent;