import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { AddCircleOutline } from "@mui/icons-material";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
    InputLabel,
    FormControl,
    Select,
    Button,
    TextField,
    MenuItem
} from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../context/theme";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from 'axios';

const Schedule = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const [trainers, setTrainers] = useState([]);

    const [Session, setSession] = useState([]);


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`http://localhost:3001/get-training-sessions`);
                if (response.ok) {
                    const data = await response.json();
                    setSession(data)
                    console.log("session", Session)
                } else {
                    console.error('Failed to fetch Session data');
                }
            } catch (error) {
                console.error('Error fetching Session data:', error);
            }
        };

        fetchSession();
    }, []);

    useEffect(() => {
        const eventsWithNames = Session.map(session => ({
            id: session._id,
            title: session.programName,
            start: session.Startdatetime,
            end: session.Enddatetime,
            allDay: false,
        }));
        setCurrentEvents(eventsWithNames);
    }, [Session]);



    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const [AddEventForm, setAddEventForm] = useState(false);

    const handleAddEventForm = () => {
        setAddEventForm(!AddEventForm);
    };

    const handleAddNewEvent = () => {
        // Add logic to handle adding a new event
        // For simplicity, I'm just setting the form visibility to false here
        handleAddEventForm();
    };


    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    return (
        <Box m="10px">
            <Box display={"flex"} justifyContent={"space-between"} mb="5px">
                <Header title="Calendar" />
                <Button
                    onClick={handleAddNewEvent}
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "4px 10px",
                    }}
                >
                    <AddCircleOutline sx={{ mr: "10px" }} />
                    Add
                </Button>
            </Box>

            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                <Box
                    flex="1 1 20%"
                    backgroundColor={colors.primary[400]}
                    p="15px"
                    borderRadius="4px"
                >
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {console.log("items:", currentEvents)}
                        {currentEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    margin: "5px 0",
                                    borderRadius: "2px",
                                    padding: "2px 2px"
                                }}
                            >
                                <ListItemText
                                    primary={event.title}

                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={currentEvents}
                        initialEvents={[
                            {
                                id: "12315",
                                title: "All day repeating event",
                                start: "2024-04-02",
                                end: "2024-04-05",
                            },
                            {
                                id: "5123",
                                title: "All-day event non repeating",
                                date: "2024-04-28",
                            },
                            {
                                id: "5123",
                                title: "Particular time nOn repeating",
                                date: "2024-04-28",
                            },

                            {
                                id: "51",
                                title: "My repeating event",
                                startTime: "11:00:00", // Start on April 6, 2024
                                endTime: "11:30:00",
                                daysOfWeek: [3, 5], // Repeat every Wednesday (0=Sunday, 1=Monday, ..., 6=Saturday)
                                startRecur: "2024-04-06", // Repeat starting from April 6, 2024
                                endRecur: "2024-04-20", // Repeat until April 20, 2024
                                allDay: false
                            },
                        ]}
                    />
                </Box>
            </Box>

            <Dialog open={AddEventForm} onClose={handleAddEventForm}>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogContent>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"


                    >
                        <FormControl
                            fullWidth
                            required
                            sx={{ gridColumn: "span 2" }}

                        >
                            <InputLabel>Training</InputLabel>
                            <Select
                                name="trainingName"
                                required
                            >
                                {[
                                    "Data Science Fundamentals",
                                    "Advanced Machine Learning",
                                    "Figma",
                                    "UI/UX Design Essentials",
                                    "Backend Development Bootcamp",
                                    "Cloud Computing Fundamentals",
                                    "Data Engineering Essentials",
                                    "Data Analytics Bootcamp",
                                    "Automation Essentials"
                                ].map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            required
                            sx={{ gridColumn: "span 2" }}
                        >
                            <InputLabel>Trainees</InputLabel>
                            <Select

                                name="role"
                                required
                            >
                                {["Employee", "Intern"].map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth required sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="trainers-label">Trainers</InputLabel>
                            <Select
                                labelId="trainers-label"
                                id="trainers"
                                multiple

                            >
                                {trainers.map((trainer) => (
                                    <MenuItem key={trainer} value={trainer}>
                                        {trainer}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField

                            id="Venue"
                            label="Venue"
                            type="text"
                            fullWidth

                        />
                        <TextField
                            id="Startdatetime"
                            label="Start Date & Time"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{ gridColumn: "span 2" }}
                            required
                        />
                        <TextField
                            id="Enddatetime"
                            label="End Date & Time"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{ gridColumn: "span 2" }}
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddEventForm} color="primary">Cancel</Button>
                    <Button onClick={handleAddNewEvent} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Schedule;

