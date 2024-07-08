import { Alert, Button, Container, Divider, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import Headline from "../components/Headline"
import { useContext, useState } from "react"
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userList/userlistSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Registration(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("");
    const [experiences, setExperiences] = useState([]);
    const [registrationError, setRegistrationError] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const nextId = useSelector(state => state.userlist.length);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validation = name && email && password && 
        ((role === "company") || (role === "jobseeker" && experiences.length >= 1 && experiences[0]));

    if(user){
        return (
            <Navigate to="/" replace />
        );
    }

    return (
        <Container sx={{marginBottom: 5}}>
            <Headline text="Regisztráció" />
            <Divider />
            <Stack alignItems="center" spacing={2} sx={{
                pt: 10, pl: 25, pr: 25
            }}>
                <TextField variant="outlined" label="Név" value={name} onChange={
                    (event) => setName(event.target.value)
                } fullWidth />
                <TextField variant="outlined" label="E-mail" value={email} onChange={
                    (event) => setEmail(event.target.value)
                } fullWidth />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Jelszó</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={
                            (event) => setPassword(event.target.value)
                        } 
                    />
                </FormControl>
                <FormControl>
                    <RadioGroup value={role} onChange={(event) => setRole(event.target.value)}>
                        <FormControlLabel value="company" control={<Radio />} label="Munkáltató" />
                        <FormControlLabel value="jobseeker" control={<Radio />} label="Munkavállaló" />
                    </RadioGroup>
                </FormControl>
                {role === "jobseeker" && <TextField variant="outlined" label="Munkatapasztalat"
                    value={experiences.join("\n")} onChange={
                        (event) => setExperiences(event.target.value.split("\n"))
                } fullWidth multiline rows={5} />}
                <Button variant="contained" color={ registrationError ? "error" : "primary" }
                    onClick={() => {
                    if(validation){
                        setRegistrationError(false);
                        const newUser = {
                            "id": nextId + 1,
                            "accessToken": null,
                            "email": email,
                            "password": password,
                            "fullname": name,
                            "role": role,
                            "experience": experiences,
                            "applications": [],
                            "advertisements": []
                        }
                        setUser(newUser);
                        dispatch(addUser(newUser));
                    }else{
                        setRegistrationError(true);
                    }
                }} fullWidth >
                    <Typography variant="body1">Regisztráció</Typography>
                </Button>
                {registrationError && <Alert severity="error">Sikertelen regisztráció! Hiányos űrlap!</Alert>}
            </Stack>
        </Container>
    )
}