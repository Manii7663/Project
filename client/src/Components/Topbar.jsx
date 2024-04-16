import { Box, IconButton, useTheme,Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useContext,useState } from "react";
import { ColorModeContext, tokens } from "../context/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link,useNavigate } from 'react-router-dom';
import {useAuth} from "../context/authContext"

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate=useNavigate();
  const {setIsAuthenticated,User}=useAuth();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const userId = User?User.id:null;
  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem('user');
    // Redirect to login page
    setIsAuthenticated(false);
    window.location.href = "/";
  };


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton component={Link} to={`/userprofile/${userId}`}>
        <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => setLogoutDialogOpen(true)}>
          
          <ExitToAppIcon />
        </IconButton>
        
      </Box>
      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogActions>
          <Button onClick={handleLogout}>Yes</Button>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Topbar;