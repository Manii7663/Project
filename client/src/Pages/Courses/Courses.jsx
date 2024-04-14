import { Box, Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { tokens } from "../../context/theme";
import { AddCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import { useAuth } from "../../context/authContext";



const Courses = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { User } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const role = (User) ? User.role : null;

    const [formData, setFormData] = useState({
        coeName: "",
        description: "",
        coeHead: User?User._id:""
    });

    useEffect(() => {
        setFormData({
            ...formData,
            coeHead: User?User._id:""
        })
    }, [])



    const CustomLink = ({ ...props }) => (
        <Link {...props} style={{ textDecoration: 'none' }}>

        </Link>
    );

    const handleopenDialog = () => {
        setOpenDialog(true)
    }

    const handlecloseDialog = () => {
        setOpenDialog(false)
    }

    const [Coes, setCoes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/get-coe")
            .then((response) => response.json())
            .then((data) => setCoes(data))
            .catch((error) => console.error("Error fetching COE data", error))
    }, []);

    const handleSubmit = async () => {
        console.log(formData);
    
        try {
            const response = await fetch('http://localhost:3001/create-coe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
    
            console.log('Form submitted successfully');
            window.location.reload();
            // Optionally, you can handle the response here
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle errors here
        }
    };
    

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Header title={"Courses"} />
                {role === "Admin" && <Button
                    onClick={handleopenDialog}
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutline />}
                >
                    Add
                </Button>}
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

            {/* COE Form Dialog */}
            <Dialog style={{ padding: '10px' }} open={openDialog} onClose={handlecloseDialog}>
                <DialogTitle>Add COE</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="coeName"
                        label="COE Name"
                        type="text"
                        fullWidth
                        value={formData.coeName}
                        onChange={(e) => setFormData({ ...formData, coeName: e.target.value })}
                    />
                    <TextField
                        // Adjust the height here
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handlecloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Courses;
