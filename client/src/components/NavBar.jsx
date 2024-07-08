import { Button, Divider, Stack } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home'
import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function NavBar() {
    const [user, setUser] = useContext(UserContext);

    const loggedInAsEmployee = user && user.role === "jobseeker";
    const loggedInAsEmployer = user && user.role === "company";

    const logout = () => setUser("");

    return (
        <Stack direction="row" spacing={1}>
            <Link to="/">
                <Button variant="contained" startIcon={<HomeIcon />} sx={{fontWeight: "bold"}}>JobHunter</Button>
            </Link>
            <Divider orientation="vertical" flexItem/>
            {user === "" && <Link to="/registration">
                <Button variant="outlined" sx={{fontWeight: "bold"}}>Regisztráció</Button>
            </Link>}
            {loggedInAsEmployee && <Link to="/employee">
                <Button variant="outlined" sx={{fontWeight: "bold"}}>Profilom</Button>
            </Link>}
            {loggedInAsEmployer && <Link to="/employer">
                <Button variant="outlined" sx={{fontWeight: "bold"}}>Profilom</Button>
            </Link>}
            {loggedInAsEmployer && <Link to="/advertisement">
                <Button variant="outlined" sx={{fontWeight: "bold"}}>Álláshirdetés hozzáadása</Button>
            </Link>}
            {user === "" && <Link to="/login">
                <Button variant="outlined" sx={{fontWeight: "bold"}}>Bejelentkezés</Button>
            </Link>}
            {user !== "" && <Button variant="outlined" sx={{fontWeight: "bold"}} onClick={logout}>Kijelentkezés</Button>}
        </Stack>
    );
}