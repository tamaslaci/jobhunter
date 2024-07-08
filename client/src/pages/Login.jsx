import { Alert, AlertTitle, Box, Button, Container, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import Headline from "../components/Headline";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Login(){
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const users = useSelector(state => state.userlist);

    if(user){
        return (
            <Navigate to="/" replace />
        );
    }
    
    return (
        <Container sx={{marginBottom: 5}}>
            <Headline text="Bejelentkezés" />
            <Divider />
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column", p: 15}}>
                <TextField label="E-mail" variant="outlined" value={email} onChange={
                    (event) => setEmail(event.target.value)
                } sx={{m: 2}} />
                <FormControl sx={{ m: 2 }} variant="outlined">
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
                <Button variant="contained" onClick={() => {
                    const actualUser = users.find((u) => u.email === email);
                    if(actualUser !== undefined && actualUser.password === password){
                        setUser(actualUser);
                    }else{
                        setWrongPassword(true);
                    }
                }} color={wrongPassword ? "error" : "primary"} sx={{m: 2}} >
                    <Typography variant="body1">Bejelentkezés</Typography>
                </Button>
                {wrongPassword ? <Alert severity="error">
                    <AlertTitle>Hiba</AlertTitle>
                    Hibás felhasználónév, vagy jelszó!
                </Alert> : ""}
            </Box>
        </Container>
    );
}