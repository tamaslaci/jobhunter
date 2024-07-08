/* eslint-disable react/prop-types */
import { Box, Button, Container, Divider, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import Headline from "../components/Headline";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCircleOutlined, DeleteOutlined, EditRounded, HomeWorkOutlined, PaidOutlined, PlaceOutlined, StoreOutlined, VisibilityRounded, WatchLaterOutlined } from "@mui/icons-material";
import { deleteJob } from "../store/jobsList/joblistSlice";
import { updateUser } from "../store/userList/userlistSlice";

function ViewModal({job, openModal, handleCloseModal}){
    const users = useSelector(state => state.userlist);

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 2/5,
                bgcolor: "background.paper",
                border: "1px solid black",
                boxShadow: 36,
                p: 4,
                display: "flex",
                flexDirection: "column"
            }}>
                <Typography variant="h4" fontWeight="bold">Jelentkezők</Typography>
                <Divider />
                {users.filter((user) => job.applicants.includes(user.id))
                    .map((applicant, index) => (
                        <Grid key={index} container sx={{mt: 2}}>
                            <Grid item xs={10}>
                                <Typography variant="h6">{applicant.fullname}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Link to={"/employee/" + applicant.id}>
                                    <Button variant="outlined">
                                        Adatok
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    ))}
            </Box>
        </Modal>
    );
}

export default function Employer(){
    const [user, ] = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const jobs = useSelector(state => state.joblist.filter((job) => (job.userId === user.id)));
    const users = useSelector(state => state.userlist);
    const dispatch = useDispatch();

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
            <Headline text="Álláshirdetői profil" />
            <Divider />
            <Stack direction="row" spacing={1} alignItems="center" m={5} textAlign="center">
                <Typography variant="h4" fontWeight="bold" color="primary">Hirdetéseid</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography variant="h6">{user.fullname}</Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography variant="h6">{user.email}</Typography>
            </Stack>
            <Stack direction="column" spacing={2} width={4/5} margin="auto">
                {jobs.map((job) => (
                    <Paper key={job.id} sx={{width: 1, pl:1, pt: 3, pb: 3}} elevation={6}>
                        <Grid container>
                            <Grid item xs={5.5}>
                                <Typography variant="h5" fontWeight="bold" color="primary">{job.position}</Typography>
                            </Grid>
                            <Grid item xs={6.5}>
                                <Link to={"/advertisement/" + job.id}>
                                    <Button variant="outlined" startIcon={<EditRounded />} sx={{ml: 1}}>
                                        Szerkesztés
                                    </Button>
                                </Link>
                                <Button variant="outlined" startIcon={<VisibilityRounded />} sx={{ml: 1}}
                                    onClick={handleOpenModal}>
                                    Megtekintés
                                </Button>
                                <Button variant="outlined" startIcon={<DeleteOutlined />} color="error" sx={{ml: 1}}
                                    onClick={() => {
                                        users.filter((u) => job.applicants.includes(u.id)).map((user) => {
                                            const updatedUser = {...user, applications: [...user.applications.filter((i) => i !== job.id)]};
                                            dispatch(updateUser(updatedUser));
                                        })
                                        dispatch(deleteJob(job));
                                    }}>
                                    Törlés
                                </Button>
                            </Grid>
                            <Grid item xs={2.5} sx={{mt: 3, display: "inline-flex"}}>
                                <StoreOutlined />
                                <Typography variant="body2" fontWeight="bold">{job.company}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{mt: 3, display: "inline-flex"}}>
                                <PlaceOutlined />
                                <Typography variant="body2">{job.city}</Typography>
                            </Grid>
                            <Grid item xs={2.5} sx={{mt: 3, display: "inline-flex"}}>
                                <WatchLaterOutlined />
                                <Typography variant="body2">{job.type}</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{mt: 3, display: "inline-flex"}}>
                                <PaidOutlined />
                                <Typography variant="body2">{job.salaryFrom + "Ft - " + job.salaryTo + "Ft"}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{mt: 3, display: "inline-flex"}}>
                                <HomeWorkOutlined />
                                <Typography variant="body2">{job.homeOffice ? "Home office van" : "Home office nincs"}</Typography>
                            </Grid>
                        </Grid>
                        <ViewModal job={job} openModal={openModal} handleCloseModal={handleCloseModal} />
                    </Paper>
                ))}
            </Stack>
            <Link to="/advertisement">
                <Button variant="contained" startIcon={<AddCircleOutlined />} fullWidth sx={{mt: 5}}>
                    Hirdetés hozzáadása
                </Button>
            </Link>
        </Container>
    )
}