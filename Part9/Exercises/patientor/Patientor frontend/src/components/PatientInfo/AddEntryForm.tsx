import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react"
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnosisService";

const AddEntryForm = ({onSubmit, onCancel}: {onSubmit: (healthCheckEntry: {description: string, date: string, specialist:string, healthCheckRating:string, diagnosisCodes:string[]}) => void, onCancel: () => void}) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    useEffect(() => {
        diagnosisService.getDiagnoseData()
            .then(data => setDiagnosis(data));
    }, []);

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        onSubmit({description, date, specialist, healthCheckRating, diagnosisCodes});
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
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
                    <InputLabel>Healthcheck rating</InputLabel>
                    <Select value={healthCheckRating} onChange={({target}) => setHealthCheckRating(target.value)}>
                        <MenuItem value="Healthy">Healthy</MenuItem>
                        <MenuItem value="LowRisk">Low Risk</MenuItem>
                        <MenuItem value="HighRisk">High Risk</MenuItem>
                        <MenuItem value="CriticalRisk">Critical Risk</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Diagnosis Code</InputLabel>
                    {/* <Input value={diagnosisCodes} onChange={({target}) => setDiagnosisCodes(target.value)}/> */}
                    <Select multiple value={diagnosisCodes} onChange={onChangeDiagnosisHandler}>
                        {diagnosis.map(d => <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>)}
                    </Select>
                </FormControl>
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