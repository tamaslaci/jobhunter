/* eslint-disable react/prop-types */
import { Button, Container, Divider, Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import Headline from "../components/Headline";
import { Link } from "react-router-dom";
import { RefreshOutlined } from "@mui/icons-material";

export default function EmployeeView({user}){
    const experienceList = [];
    
    user.experience.map((line) => {
        const experience = {};
        const parts = line.split(";");
        experience.company = parts[0];
        experience.position = parts[1];
        experience.period = parts[2];
        experienceList.push(experience);
    });

    return (
        <Container sx={{marginBottom: 5}}>
            <Headline text="Álláskeresői profil nézet" />
            <Divider />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 600}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h5" sx={{fontWeight: "bold"}}>Személyes adatok</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Link to="/employer">
                                    <Button variant="outlined" startIcon={<RefreshOutlined />}>
                                        Vissza az álláshirdetői profilhoz
                                    </Button>
                                </Link>
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