import { Container } from "@mui/material"

import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Employee from "./pages/Employee"
import Employer from "./pages/Employer"
import Advertisement from "./pages/Advertisement"
import UserContext from "./context/UserContext"
import { useState } from "react"
import { Provider } from "react-redux"
import { store } from "./store/store"

function App() {
  const [user, setUser] = useState("");

  return (
    <Provider store={store}>
      <UserContext.Provider value={[user, setUser]}>
        <Container>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/:employeeId" element={<Employee />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/advertisement" element={<Advertisement />} />
            <Route path="/advertisement/:advertisementId" element={<Advertisement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainPage />} />
          </Routes>
          <Footer />
        </Container>
      </UserContext.Provider>
    </Provider>
  )
}

export default App
