import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Header from "../../Components/Header";
import { useParams,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const { userId } = useParams();
    const [editedUser, setEditedUser] = useState({});
    const {User}=useAuth();

    const navigate=useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/get-user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleEdit = () => {
        setEditing(true);
        setEditedUser(user); // Set editedUser state to the current user data
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(editedUser);
            const response = await axios.put(`http://localhost:3001/update-user`, editedUser);
    
            console.log(response.data);
            setUser(editedUser); // Update user state with edited data
            setEditing(false); // Exit editing mode
            if(userId !== User.id)
            {
                navigate("/users")
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
    
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Header title={"PROFILE"} />
                {user && (
                    <Button
                        onClick={handleEdit}
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                )}
            </Box>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" gutterBottom>
                        User Profile
                    </Typography>
                </Grid>
                {editing ? (
                    <>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={editedUser.name || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={editedUser.email || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Role"
                                name="role"
                                value={editedUser.role || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Designation"
                                name="Designation"
                                value={editedUser.Designation || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ "fontWeight": "Bold" }}>
                                Name:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {user && user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ "fontWeight": "Bold" }}>
                                Email:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {user && user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ "fontWeight": "Bold" }} gutterBottom>
                                Role:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {user && user.role}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ "fontWeight": "Bold" }} gutterBottom>
                                Designation:
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {user && user.Designation}
                            </Typography>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default UserProfile;
