import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react"
import { Diagnosis, EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, healthCheckRating } from "../../types";
import diagnosisService from "../../services/diagnosisService";

const AddEntryForm = ({onSubmit, onCancel}: {onSubmit: (healthCheckEntry: EntryWithoutId) => void, onCancel: () => void}) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<healthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');

    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
    const [entryType, setEntryType] = useState<HealthCheckEntry['type'] | HospitalEntry['type'] | OccupationalHealthcareEntry['type']>('HealthCheck')

    useEffect(() => {
        diagnosisService.getDiagnoseData()
            .then(data => setDiagnosis(data));
    }, []);

    const getEntryTypeObject = (): EntryWithoutId => {
        let obj: EntryWithoutId | null = null;
        switch (entryType) {
            case "HealthCheck":
                obj = {description, date, specialist, healthCheckRating, diagnosisCodes, type: entryType as HealthCheckEntry['type']};
                break;
            case "Hospital":
                obj = {description, date, specialist, diagnosisCodes, type: entryType as HospitalEntry['type'], discharge: {date: dischargeDate, criteria}};
                break;
            case "OccupationalHealthcare":
                obj = {description, date, specialist, diagnosisCodes, type: entryType as OccupationalHealthcareEntry['type'], employerName, sickLeave: {startDate: sickLeaveStartDate, endDate: sickLeaveEndDate}};
                break;
            default:
                break;
        }
        return obj as EntryWithoutId;
    }

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        onSubmit(getEntryTypeObject());
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating(0);
        setDiagnosisCodes([]);
    }

    const onChangeDiagnosisHandler = (event: SelectChangeEvent<Diagnosis['code'][]>) => {
        const {target: {value}} = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(','): value)
    }

    return (
        <Box sx={{border: 3, padding: 3}}>
            <form onSubmit={submitHandler}>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Type</InputLabel>
                    <Select value={entryType} onChange={({target}) => setEntryType(target.value as HealthCheckEntry['type'] | HospitalEntry['type'] | OccupationalHealthcareEntry['type'])}>
                        <MenuItem value="HealthCheck">Health Check</MenuItem>
                        <MenuItem value="Hospital">Hospital</MenuItem>
                        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Description</InputLabel>
                    <Input value={description} onChange={({target}) => setDescription(target.value)}/>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Date</InputLabel>
                    <Input value={date} type='date' onChange={({target}) => setDate(target.value)}/>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Specialist</InputLabel>
                    <Input value={specialist} onChange={({target}) => setSpecialist(target.value)}/>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Diagnosis Code</InputLabel>
                    {/* <Input value={diagnosisCodes} onChange={({target}) => setDiagnosisCodes(target.value)}/> */}
                    <Select multiple value={diagnosisCodes} onChange={onChangeDiagnosisHandler}>
                        {diagnosis.map(d => <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>)}
                    </Select>
                </FormControl>
                {
                    entryType === 'HealthCheck' && 
                    <FormControl fullWidth variant="standard">
                        <InputLabel>Healthcheck rating</InputLabel>
                        <Select value={healthCheckRating} onChange={({target}) => setHealthCheckRating(Number(target.value))}>
                            <MenuItem value="0">Healthy</MenuItem>
                            <MenuItem value="1">Low Risk</MenuItem>
                            <MenuItem value="2">High Risk</MenuItem>
                            <MenuItem value="3">Critical Risk</MenuItem>
                        </Select>
                    </FormControl>
                }
                {
                    entryType === 'Hospital' &&
                    <>
                        <InputLabel sx={{mt:3}}>Discharge</InputLabel>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Date</InputLabel>
                            <Input type="date" value={dischargeDate} onChange={({target}) => setDischargeDate(target.value)}/>
                        </FormControl>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Criteria</InputLabel>
                            <Input value={criteria} onChange={({target}) => setCriteria(target.value)}/>
                        </FormControl>
                    </>
                }
                {
                    entryType === 'OccupationalHealthcare' &&
                    <>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Employer Name</InputLabel>
                            <Input value={employerName} onChange={({target}) => setEmployerName(target.value)}/>
                        </FormControl>
                        <InputLabel sx={{mt:3}}>Sick Leave</InputLabel>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Start date</InputLabel>
                            <Input type="date" value={sickLeaveStartDate} onChange={({target}) => setSickLeaveStartDate(target.value)}/>
                        </FormControl>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>End date</InputLabel>
                            <Input type="date" value={sickLeaveEndDate} onChange={({target}) => setSickLeaveEndDate(target.value)}/>
                        </FormControl>
                    </>
                }
                <Grid sx={{marginTop: 3, marginBottom: 8}}>
                    <Grid item>
                        <Button color="error" variant="contained" style={{float: 'left'}} type="button" onClick={onCancel}>CANCEL</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" style={{float: 'right'}} type="submit">ADD</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddEntryForm;