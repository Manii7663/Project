import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Reports from './Pages/Reports/Reports';

import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import { ColorModeContext, useMode } from "./context/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


function App() {
  const [theme, colorMode] = useMode();
  const { isAuthenticated, User } = useAuth();

  const allRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/', element: <Dashboard /> },
    { path: '/users/:search?', element: <Users /> },
    { path: '/adduser', element: <CreateUser /> },
    { path: '/reports', element: <Reports /> },
    { path: '/schedule', element: <Schedule /> },
    { path: '/trainings', element: <Trainings /> },
    { path: '/calendar', element: <Calendar /> },   
    { path: '/training-details/:coeId?', element: <TrainingDetails /> },
    { path: '/userprofile/:userId?', element: <UserProfile /> },
    { path: '/my-progress', element: <MyProgress /> },
    { path: '/assesment-scores', element: <AssesmentScore /> },
    { path: '/authstatus', element: <AuthStatus /> },
    // Add other admin routes here
  ];

  const userRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/trainings', element: <Trainings /> },
    { path: '/calendar', element: <Calendar /> },   
    { path: '/training-details/:coeId?', element: <TrainingDetails /> },
    { path: '/userprofile/:userId?', element: <UserProfile /> },
    { path: '/my-progress', element: <MyProgress /> },
    { path: '/assesment-scores', element: <AssesmentScore /> },
    { path: '/', element: <Dashboard /> }
    
    // Add other user routes here
  ];

  const publicRoutes = [
    { path: '/', element: <Login /> },
    { path: '/forgetPassword', element: <ForgetPassword /> },
    { path: '/resetPassword/:id/:token', element: <ResetPassword /> },
  ];

  const routes = isAuthenticated ? 
    (User && (User.role === 'Intern' || User.role === 'Employee' ) ? userRoutes : allRoutes) 
    : publicRoutes;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar />}
          <main className="content">
            {isAuthenticated && <Topbar />}
            <Routes>
              {routes && routes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
