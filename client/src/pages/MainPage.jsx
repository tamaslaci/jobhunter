/* eslint-disable react/prop-types */
import { Alert, Box, Button, Card, CardHeader, Checkbox, Container, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import Headline from "../components/Headline"
import { useContext, useState } from "react";
import { EditRounded, RefreshOutlined, SearchOutlined, WorkOffOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import UserContext from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userList/userlistSlice";
import { updateJob } from "../store/jobsList/joblistSlice";

function JobListItem({ad}){
    const [user, setUser] = useContext(UserContext);
    const [openJob, setOpenJob] = useState(false);
    const [applySuccess, setApplySuccess] = useState(false);
    const dispatch = useDispatch();

    const openJobModal = () => setOpenJob(true);
    const closeJobModal = () => setOpenJob(false);

    const loggedInAsEmployee = user && user.role === "jobseeker";

    const userApplied = user && loggedInAsEmployee && ad.applicants.includes(user.id);

    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <Card variant="outlined" sx={{width: 2/3, textAlign: "center", m: 1, p: 2}}>
                <CardHeader title={ad.position} subheader={
                    <>
                        <Typography variant="h6">{ad.city + ", " + ad.company}</Typography>
                        <Typography variant="body1">{ad.salaryFrom + " HUF - " + ad.salaryTo + " HUF"}</Typography>
                        <Typography variant="body2">{ad.type}</Typography>
                    </>
                    } />
                {!userApplied && <Button variant="outlined" size="small" 
                    onClick={openJobModal} startIcon={<WorkOutlineOutlined />} disabled={!loggedInAsEmployee}>
                    <Typography variant="body2" fontWeight="bold">
                        {loggedInAsEmployee ? "Kattints a jelentkezéshez!" : "Jelentkezz be munkavállalóként!"}
                    </Typography>
                </Button>}
                {userApplied && <Button variant="outlined" size="small" startIcon={<WorkOffOutlined />}
                    color="error" onClick={
                        () => {
                            const updatedUser = {...user, applications: [...user.applications.filter((i) => i !== ad.id)]};
                            setUser(updatedUser);
                            dispatch(updateUser(updatedUser));
                            const updatedAd = {...ad, applicants: [...ad.applicants.filter((i) => i !== user.id)]};
                            dispatch(updateJob(updatedAd));
                            setApplySuccess(false);
                        }
                    }>
                    <Typography variant="body2" fontWeight="bold">
                        Állásjelentkezés visszavonása
                    </Typography>
                </Button>}
            </Card>
            <Modal open={openJob} onClose={closeJobModal}>
                <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 3/5,
                        bgcolor: "background.paper",
                        border: "1px solid black",
                        boxShadow: 36,
                        p: 4,
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <Typography variant="h5" fontWeight="bold">{ad.position + " álláshirdetés a(z) " + ad.company + " cégnél"}</Typography>
                    <Typography variant="h6">Részletek:</Typography>
                    <Typography variant="body1">{"Helyszín: " + ad.city }</Typography>
                    <Typography variant="body1">{"Fizetési igény: " + ad.salaryFrom + " HUF - " + ad.salaryTo + " HUF"}</Typography>
                    <Typography variant="body1">{"Típus: " + ad.type}</Typography>
                    <Typography variant="body1">{"Home office: " + (ad.homeOffice ? "van" : "nincs")}</Typography>
                    <Typography variant="body1">{"Leírás: " + ad.description}</Typography>
                    <Typography variant="body1" sx={{p: 2, fontWeight: "bold"}}>Leadod a jelentkezésed?</Typography>
                    <Button variant="contained" color={applySuccess ? "success" : "primary"} onClick={() => {
                        const updatedUser = {...user, applications: [...user.applications, ad.id]};
                        setUser(updatedUser);
                        dispatch(updateUser(updatedUser));
                        const updatedAd = {...ad, applicants: [...ad.applicants, user.id]};
                        dispatch(updateJob(updatedAd));
                        setApplySuccess(true);
                    }}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                            Jelentkezés leadása
                        </Typography>
                    </Button>
                    {applySuccess && <Alert severity="success">Sikeres Jelentkezés!</Alert>}
                </Box>
            </Modal>
        </Box>
    );
}

export default function MainPage(){
    const [filterText, setFilterText] = useState("");
    const [filteredList, setFilteredList] = useState();
    const [openFilter, setOpenFilter] = useState(false);
    const [salaryFrom, setSalaryFrom] = useState(0);
    const [salaryTo, setSalaryTo] = useState(0);
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [homeOffice, setHomeOffice] = useState(false);

    const openFilterModal = () => setOpenFilter(true);
    const closeFilterModal = () => setOpenFilter(false);

    const joblist = useSelector((state) => state.joblist);
    
    const searchAdvertisements = () => {
        let searchList = joblist.filter(job => job.position.includes(filterText));
        searchList = salaryFrom ? searchList.filter(i => i.salaryFrom >= salaryFrom) : searchList;
        searchList = salaryTo ? searchList.filter(i => i.salaryTo <= salaryTo) : searchList;
        searchList = type ? searchList.filter(i => i.type === type) : searchList;
        searchList = city ? searchList.filter(i => i.city === city) : searchList;
        searchList = homeOffice ? searchList.filter(i => i.homeOffice === homeOffice) : searchList;
        setFilteredList(searchList);
    };
    const resetJobList = () => {
        setFilteredList(joblist);
        setFilterText("");
    };

    const list = (filteredList ? filteredList : joblist).map((ad, index) => 
        <JobListItem key={index} ad={ad} index={index} />
    );

    return (
        <Container sx={{marginBottom: 5}}>
            <Headline text="Álláskeresési főoldal" />
            <Divider />
            <Box sx={{margin: 2}}>
                <Typography variant="h6">Böngéssz az állások között:</Typography>
                <TextField label="Keresés pozíció szerint" variant="outlined" value={filterText} onChange={
                    (event) => setFilterText(event.target.value)
                } margin="normal" size="small" fullWidth />
                <Button variant="outlined" onClick={searchAdvertisements} startIcon={<SearchOutlined />}>Keresés</Button>
                <Button variant="outlined" onClick={openFilterModal} startIcon={<EditRounded />} sx={{ml: 1}}>Szűrés</Button>
                <Button variant="outlined" onClick={resetJobList} startIcon={<RefreshOutlined />} sx={{ml: 1}}>Visszaállítás</Button>
                <Modal open={openFilter} onClose={closeFilterModal}>
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 1/3,
                        bgcolor: "background.paper",
                        border: "1px solid black",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography variant="h4">Szűrők</Typography>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={6}>
                                <TextField label="Fizetési sáv alja" variant="outlined" 
                                    value={salaryFrom} onChange={
                                    (event) => {
                                        if(!isNaN(Number(event.target.value))){
                                            setSalaryFrom(Number(event.target.value));
                                        }
                                    }
                                    } sx={{minWidth: 1}} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Fizetési sáv teteje" variant="outlined" 
                                    value={salaryTo} onChange={
                                        (event) => {
                                            if(!isNaN(Number(event.target.value))){
                                                setSalaryTo(Number(event.target.value));
                                            }
                                        }
                                    } sx={{minWidth: 1}} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{minWidth: 1}}>
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
                                <TextField label="Település" variant="outlined" 
                                    value={city} onChange={
                                        (event) => {setCity(event.target.value)}
                                    } sx={{minWidth: 1}} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={homeOffice} onChange={() => {setHomeOffice(!homeOffice)}} />
                                    } label="Home office lehetőség" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={
                                    () => {
                                            closeFilterModal();
                                            searchAdvertisements();
                                        }
                                    } startIcon={<SearchOutlined />} fullWidth>
                                    Keresés
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </Box>
            {list}
        </Container>
    );
}