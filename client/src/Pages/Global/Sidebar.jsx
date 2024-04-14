import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../context/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";



import { useAuth } from "../../context/authContext";



const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};
const Sidebar = () => {
    const {User}= useAuth();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');


    const role =(User)?User.role:null;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 900); // Adjust the breakpoint as needed
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);


      useEffect(()=> {
        setIsCollapsed(isMobile);
      },[isMobile])

      const sidebarStyles = {
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    };


    return (
        <Box
            sx={{                
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed} style={sidebarStyles}
             width="250px">
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "5px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                style={{ position: "absolute",margin: "2px 4px 2px 0", right: "0", top: "0" }}
                            >
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent={"center"} alignItems={"center"}>
                                <img alt="Logo"
                                    width="100px"
                                    height="100px"
                                    src={"/logo.png"}
                                    style={{ cursor: "pointer", borderRadius: "50%" }} />
                            </Box>
                            <Box textAlign={"center"}>
                                <Typography variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}> Welcome</Typography>
                                <Typography variant="h5"
                                    color={colors.greenAccent[500]}
                                >To The Training Module</Typography>
                            </Box>
                        </Box>


                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "8%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        
                        {role === 'Admin' && (
                            <Item
                                title="Schedule"
                                to="/schedule"
                                icon={<CalendarTodayOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {role !== 'Admin' && (
                            <Item
                                title="Calendar"
                                to="/calendar"
                                icon={<CalendarTodayOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {role !== 'Admin' && (
                            <Item
                                title="Assessment Score"
                                to="/assesment-scores"
                                icon={<AssessmentOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {role !== 'Admin' && (
                            <Item
                                title="My Progress"
                                to="/my-progress"
                                icon={<TrendingUpOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        
                        
                        {role === 'Admin' && (
                            <Item
                                title="Users"
                                to="/users"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
        
                            <Item
                                title="Trainings"
                                to="/trainings"
                                icon={<SchoolIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        {role === 'Admin' && (
                            <Item
                                title="Reports & Analytics"
                                to="/reports"
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                    
    


                    </Box>
                </Menu>
            </ProSidebar>

        </Box>

    );
}

export default Sidebar;