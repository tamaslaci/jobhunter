/* eslint-disable react/prop-types */
import { Container, Divider, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, Alert } from "@mui/material";
import { SaveAltOutlined } from "@mui/icons-material";
import Headline from "../components/Headline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateJob } from "../store/jobsList/joblistSlice";

export default function SelectedAdvertisement({advertisement}){
    const [company, setCompany] = useState(advertisement.company);
    const [position, setPosition] = useState(advertisement.position);
    const [description, setDescription] = useState(advertisement.description);
    const [salaryFrom, setSalaryFrom] = useState(advertisement.salaryFrom);
    const [salaryTo, setSalaryTo] = useState(advertisement.salaryTo);
    const [city, setCity] = useState(advertisement.city);
    const [type, setType] = useState(advertisement.type);
    const [homeOffice, setHomeOffice] = useState(advertisement.homeOffice);
    const [onSaveSuccess, setOnSaveSucces] = useState(false);
    const [onSaveError, setOnSaveError] = useState(false);
    const dispatch = useDispatch();

    const validation = company && position && description && salaryFrom && salaryTo && city && type;

    return (
        <Container sx={{marginBottom: 5}}>
            <Headline text="Álláshirdetés készítése" />
            <Divider />
            <Container>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Cég neve" fullWidth value={company} onChange={
                            (event) => {setCompany(event.target.value)}
                        } />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Pozíció" fullWidth value={position} onChange={
                            (event) => {setPosition(event.target.value)}
                        } />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Leírás" fullWidth multiline rows={5} value={description} onChange={
                            (event) => {setDescription(event.target.value)}
                        } />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField variant="outlined" label="Fizetési sáv alja" fullWidth value={salaryFrom} onChange={
                            (event) => {
                                if(!isNaN(Number(event.target.value))){
                                    setSalaryFrom(Number(event.target.value));
                                }
                            }
                        } />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField variant="outlined" label="Fizetési sáv teteje" fullWidth value={salaryTo} onChange={
                            (event) => {
                                if(!isNaN(Number(event.target.value))){
                                    setSalaryTo(Number(event.target.value));
                                }
                            }
                        } />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField variant="outlined" label="Település" fullWidth value={city} onChange={
                            (event) => {setCity(event.target.value)}
                        } />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth >
                            <InputLabel id="select-label">Foglalkoztatás típusa</InputLabel>
                            <Select labelId="select-label" label="Foglalkoztatás típusa"
                                value={type} onChange={(event) => {setType(event.target.value)}}>
                                <MenuItem value="Teljes munkaidő">Teljes munkaidő</MenuItem>
                                <MenuItem value="Részmunkaidő">Részmunkaidő</MenuItem>
                                <MenuItem value="Gyakornok">Gyakornok</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControlLabel control={ <Checkbox checked={homeOffice} onChange={
                        () => {setHomeOffice(!homeOffice)}} />
                        } label="Home office lehetőség" />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" startIcon={<SaveAltOutlined />}
                            color={onSaveSuccess ? "success" : (onSaveError ? "error" : "primary")}
                            fullWidth size="large" onClick={
                            () => {
                                if(validation){
                                    const updatedAdvertisement = {
                                        "id": advertisement.id,
                                        "company": company,
                                        "position": position,
                                        "description": description,
                                        "salaryFrom": salaryFrom,
                                        "salaryTo": salaryTo,
                                        "type": type,
                                        "city": city,
                                        "homeOffice": homeOffice,
                                        "userId": advertisement.userId,
                                        "applicants": advertisement.applicants
                                    };
                                    dispatch(updateJob(updatedAdvertisement));
                                    setOnSaveError(false);
                                    setOnSaveSucces(true);
                                }else{
                                    setOnSaveSucces(false);
                                    setOnSaveError(true);
                                }
                            }
                        }>
                            Hirdetés mentése
                        </Button>
                        {onSaveSuccess && <Alert severity="success">Sikeres mentés!</Alert>}
                        {onSaveError && <Alert severity="error">Sikertelen mentés! Hiányos űrlap!</Alert>}
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}