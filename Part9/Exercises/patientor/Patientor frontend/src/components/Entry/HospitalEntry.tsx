import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryComponent = ({entry} : {entry: HospitalEntry}) => {
    return (
        <div>
            <p>{entry.date} <LocalHospitalIcon/> </p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
}

export default HospitalEntryComponent;