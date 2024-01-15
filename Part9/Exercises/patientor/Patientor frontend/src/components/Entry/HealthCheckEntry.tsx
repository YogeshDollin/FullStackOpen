import { HealthCheckEntry, healthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const HealthCheckEntryComponent = ({entry} : {entry: HealthCheckEntry}) => {
    const healthRatingIcon = (healthRating: healthCheckRating) => {
        switch (healthRating) {
            case healthCheckRating.Healthy:
                return <FavoriteIcon color="success"/>;
            case healthCheckRating.LowRisk:
                return <FavoriteIcon color="warning"/>;
            case healthCheckRating.HighRisk:
                return <FavoriteIcon sx={{color: 'orange'}}/>;
            default:
                return <FavoriteIcon color="error"/>;
        }
    };
    return (
        <div>
            <p>{entry.date} <MonitorHeartIcon/></p>
            <p>{entry.description}</p>
            {healthRatingIcon(entry.healthCheckRating)}
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
}

export default HealthCheckEntryComponent;