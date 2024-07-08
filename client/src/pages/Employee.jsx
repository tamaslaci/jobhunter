/* eslint-disable react/prop-types */
import { Button, Container, Divider, Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Modal, Box, TextField, Alert } from "@mui/material";
import Headline from "../components/Headline";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import { EditRounded, SaveAltOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import EmployeeView from "./EmployeeView";
import { updateUser } from "../store/userList/userlistSlice";

export default function Employee(){
    const [user, setUser] = useContext(UserContext);
    const [userExperience, setUserExperience] = useState(user.experience);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const {employeeId} = useParams();

    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSaveSuccess(false);
        setSaveError(false);
    }
    const users = useSelector(state => state.userlist);
    const dispatch = useDispatch();

    if(!user){
        return (
            <Navigate to="/" replace />
        );
    }
    if((user.role !== "jobseeker" && !employeeId)){
        return (
            <Navigate to="/" replace />
        );
    }

    if(employeeId){
        const selectedUser = users.find((user) => String(user.id) === employeeId);
        if(selectedUser){
            return ( <EmployeeView user={selectedUser} /> );
        }else{
            return (
                <Typography variant="h3" fontWeight="bold" color="error" sx={{m: 5, textAlign: "center"}}>
                    Nem található a felhasználó!
                </Typography>
            )
        }
    }

    const experienceList = [];
    
    user.experience.map((line) => {
        const experience = {};
        const parts = line.split(";");
        experience.company = parts[0];
        experience.position = parts[1];
        experience.period = parts[2];
        experienceList.push(experience);
    });

    const handleEditSave = () => {
        if(userExperience.length >= 1 && userExperience[0]){
            const updatedUser = {...user, experience: userExperience};
            setUser(updatedUser);
            dispatch(updateUser(updatedUser));
            setSaveError(false);
            setSaveSuccess(true);
        }else{
            setSaveSuccess(false);
            setSaveError(true);
        }
    };

    return (
        <Container sx={{marginBottom: 5}}>
            <Headline text="Álláskeresői profil" />
            <Divider />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 600}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h5" sx={{fontWeight: "bold"}}>Személyes adatok</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" startIcon={<EditRounded />} onClick={handleOpenEditModal}>
                                    Tapasztalatok szerkesztése
                                </Button>
                                <Modal open={openEditModal} onClose={handleCloseEditModal}>
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
                                        <Typography variant="h6" sx={{mb: 2}}>
                                            Tapasztalatok szerkesztése
                                        </Typography>
                                        <TextField variant="outlined" label="Munkatapasztalat"
                                            value={userExperience.join("\n")} onChange={
                                                (event) => setUserExperience(event.target.value.split("\n"))}
                                            fullWidth multiline rows={5} sx={{mb: 2}} />
                                        <Button variant="contained" startIcon={<SaveAltOutlined />} onClick={
                                            handleEditSave} color={saveSuccess ? "success" : (saveError ? "error" : "primary")}
                                            fullWidth>
                                            Mentés
                                        </Button>
                                        {saveSuccess && <Alert severity="success">Sikeres mentés!</Alert>}
                                        {saveError && <Alert severity="error">Sikertelen mentés! Hiányos űrlapmező!</Alert>}
                                    </Box>
                                </Modal>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="body1">Név</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="body1">{user.fullname}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="body1">E-mail</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="body1">{user.email}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="body1">Státusz</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="body1">
                                    {user.role === "jobseeker" ? "Munkavállaló" : "Munkáltató"}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="body1" sx={{fontWeight: "bold"}}>Munkatapasztalat</Typography>
                            </TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                        {experienceList.map((experience, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{experience.company}</TableCell>
                                <TableCell align="left">{experience.period + " " + experience.position}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}