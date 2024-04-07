import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../context/theme";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";


const Trainings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleAddCoe = () => {
        // Redirect to the page for adding a new member
        navigate("/addCoe");
    };

    const CustomLink = ({ ...props }) => (
        <Link {...props} style={{ textDecoration: 'none' }}>

        </Link>
    );

    const [Coes, setCoes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-coe")
            .then((response) => response.json())
            .then((data) => setCoes(data))
            .catch((error) => console.error("Error fetching COE data", error))
    }, []);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box  display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Header title={"TRAININGS"}/>
                <Button
                    onClick={handleAddCoe}
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutline />}
                >
                    Add
                </Button>
            </Box>

            {/* MAIN CONTENT  */}
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} >
                {/* Training COEs */}
                {Coes.map((coe) => (
                    <Box
                        key={coe._id}
                        component={CustomLink} // Use Link component
                        to={`/training-details/${coe._id}`}
                        bgcolor={colors.blueAccent[500]}
                        color={colors.grey[100]}
                        p={3}
                        borderRadius={2}
                        position={"relative"}
                    >
                        <Typography variant="h5" fontWeight="bold" gutterBottom>{coe.coeName}</Typography>
                        <Typography variant="subtitle1" mb={2}>{coe.description}</Typography>
                        <Typography variant="body2" position="absolute" bottom="10px" right="10px">COE Head: {coe.coeHead}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Trainings;
