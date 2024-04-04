import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Pages/Global/Topbar";
import Sidebar from "./Pages/Global/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home";
import Users from "./Pages/Users/users";
import Trainings from "./Pages/Trainings/trainings";


import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/CreateUser/CreateUser";
import "bootstrap/dist/css/bootstrap.min.css";

import {Routes, Route, BrowserRouter } from "react-router-dom";
import ForgetPassword from "./Pages/ResetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { AuthProvider } from "./context/example";


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/adduser" element={<CreateUser />}></Route>
              <Route path="/trainings" element={<Trainings />}></Route>
              <Route path="/login" element={<Login />}></Route>
              
              {/* <Route path="/login" element={<Login />}></Route>
              <Route
                path="/forgetPassword"
                element={<ForgetPassword />}
              ></Route>
              <Route
                path="/resetPassword/:id/:token"
                element={<ResetPassword />}
              ></Route> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </AuthProvider>
    </ColorModeContext.Provider>
    // <BrowserRouter>

    // </BrowserRouter>
  );
}

export default App;
