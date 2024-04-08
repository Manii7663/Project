import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/users";
import CreateUser from "./Pages/CreateUser/CreateUser";
import Trainings from "./Pages/Trainings/trainings";
import Login from "./Pages/Login/Login";
import Calendar from "./Pages/Calendar/Calendar";
import Schedule from "./Pages/Schedule/Schedule";
import TrainingDetails from "./Pages/Trainings/TrainingDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";
import ForgetPassword from "./Pages/ResetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AuthStatus from "./Components/AuthStatus";
import AssesmentScore from './Pages/AssesmentScore/AssesmentScore';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProgress from './Pages/MyProgress/Progress';


import Topbar from "./Pages/Global/Topbar";
import Sidebar from "./Pages/Global/Sidebar";
import { ColorModeContext, useMode } from "./context/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  const {isAuthenticated} = useAuth();
  console.log("app",isAuthenticated)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar />} {/* Sidebar rendered only if user is authenticated */}
          <main className="content">
            {isAuthenticated && <Topbar />} {/* Topbar rendered only if user is authenticated */}
            <Routes>
              {isAuthenticated ? ( // Private routes for authenticated users
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/adduser" element={<CreateUser />} />
                  <Route path="/trainings" element={<Trainings />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/training-details/:coeId?" element={<TrainingDetails />} />
                  <Route path="/userprofile/:userId" element={<UserProfile />} />
                  <Route path="/authstatus" element={<AuthStatus />} />
                  <Route path="/my-progress" element={<MyProgress />} />
                  <Route path="/assesment-scores" element={<AssesmentScore />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect authenticated user to dashboard */}
                </>
              ) : ( // Public routes for unauthenticated users
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/forgetPassword" element={<ForgetPassword />} />
                  <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
