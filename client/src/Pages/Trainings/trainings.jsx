import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../Components/Header"
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


const Trainings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    const handleAddCoe = () => {
        // Redirect to the page for adding a new member
        navigate("/addCoe");
    };

    const [Coes, setCoes] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/get-coe")
            .then((response) => response.json())
            .then((data) => setCoes(data))
            .catch((error) => console.error("Error fetching COE data", error))
    }, []);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Trainings" subtitle="Welcome to your Trainings" />

                <Box>
                    <Button
                        onClick={handleAddCoe}
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <AddCircleOutline sx={{ mr: "10px" }} />
                        Add
                    </Button>
                </Box>
            </Box>


            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}

                {Coes.map((coe) => (
                    <Box
                        key={coe._id}
                        gridColumn="span 4  "
                        gridRow="span 2"
                        backgroundColor={colors.blueAccent[500]}
                        padding="20px"
                        borderRadius="8px"
                        position="relative"
                    >
                        <Typography variant="h3" fontWeight="600">
                            {coe.coeName}
                        </Typography>
                        <Typography variant="h6" mt="10px">
                            {coe.description}
                        </Typography>
                        <Typography
                            variant="body2"
                            position="absolute" // Position absolutely within the Box
                            bottom="10px" // Align at the bottom
                            right="10px" // Align at the right
                        >
                            COE Head: {coe.coeHead}
                        </Typography>
                    </Box>
                ))}


            </Box>
        </Box>
    );
};

export default Trainings;