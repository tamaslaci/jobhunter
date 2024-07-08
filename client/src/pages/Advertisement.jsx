import { Container, Divider, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, Typography, Alert,  } from "@mui/material";
import { SaveAltOutlined } from "@mui/icons-material";
import Headline from "../components/Headline";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SelectedAdvertisement from "./SelectedAdvertisement";
import { addJob } from "../store/jobsList/joblistSlice";

export default function Advertisement(){
    const [user, ] = useContext(UserContext);
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [salaryFrom, setSalaryFrom] = useState(0);
    const [salaryTo, setSalaryTo] = useState(0);
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [homeOffice, setHomeOffice] = useState(false);
    const [onSaveSuccess, setOnSaveSucces] = useState(false);
    const [onSaveError, setOnSaveError] = useState(false);

    const validation = company && position && description && salaryFrom && salaryTo && city && type;

    const {advertisementId} = useParams();
    const joblist = useSelector(state => state.joblist);
    const sortedJoblist = joblist.toSorted((a, b) => b.id - a.id);
    const nextId = sortedJoblist[0].id;
    const dispatch = useDispatch();

    if(advertisementId){
        const selectedJob = joblist.find(job => String(job.id) === advertisementId);
        if(selectedJob){
            return ( <SelectedAdvertisement advertisement={selectedJob} /> );
        }else{
            return (
                <Typography variant="h3" fontWeight="bold" color="error" sx={{m: 5, textAlign: "center"}}>
                    Nem található a hirdetés!
                </Typography>
            );
        }
    }

    if(user && user.role !== "company"){
        return (
            <Navigate to="/" replace />
        );
    }
    if(!user){
        return (
            <Navigate to="/" replace />
        );
    }

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
                                    const newAdvertisement = {
                                        "id": nextId + 1,
                                        "company": company,
                                        "position": position,
                                        "description": description,
                                        "salaryFrom": salaryFrom,
                                        "salaryTo": salaryTo,
                                        "type": type,
                                        "city": city,
                                        "homeOffice": homeOffice,
                                        "userId": user.id,
                                        "applicants": []
                                    }
                                    dispatch(addJob(newAdvertisement));
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