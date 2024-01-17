import { Box, Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { SyntheticEvent, useState } from "react"

const AddEntryForm = ({onSubmit, onCancel}: {onSubmit: (healthCheckEntry: {description: string, date: string, specialist:string, healthCheckRating:string, diagnosisCodes:string}) => void, onCancel: () => void}) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        onSubmit({description, date, specialist, healthCheckRating, diagnosisCodes});
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes('');
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
                    <Input value={date} onChange={({target}) => setDate(target.value)}/>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Specialist</InputLabel>
                    <Input value={specialist} onChange={({target}) => setSpecialist(target.value)}/>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Healthcheck rating</InputLabel>
                    <Input value={healthCheckRating} onChange={({target}) => setHealthCheckRating(target.value)}/>
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <InputLabel>Diagnosis Code</InputLabel>
                    <Input value={diagnosisCodes} onChange={({target}) => setDiagnosisCodes(target.value)}/>
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