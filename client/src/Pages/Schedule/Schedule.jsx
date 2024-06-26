import { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import { AddCircleOutline } from "@mui/icons-material";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../context/theme";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);


const Schedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [Session, setSession] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event
  const [isMobile, setIsMobile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [trainings, setTrainings] = useState([]);

  const [AddEventForm, setAddEventForm] = useState(false);

  const [selectedTraining, setSelectedTraining] = useState("");

  const [formData, setFormData] = useState({
    Startdatetime: '',
    Enddatetime: '',
    venue: '',
    trainee: '',
    programId: '',
    programName: ''

  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`http://localhost:3001/get-training-sessions`);
        if (response.ok) {
          const data = await response.json();
          setSession(data)
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
    const eventsWithNames = Session.filter(session => session.status === "pending").map((session) => {
      const startLocalTime = new Date(session.Startdatetime);
      const endLocalTime = new Date(session.Enddatetime);

      // Adjust for timezone offset
      startLocalTime.setMinutes(startLocalTime.getMinutes() + startLocalTime.getTimezoneOffset());
      endLocalTime.setMinutes(endLocalTime.getMinutes() + endLocalTime.getTimezoneOffset());

      return {
        id: session._id,
        title: session.programName,
        start: startLocalTime,
        end: endLocalTime,
        allDay: false,
        status: session.status, // Include status in event data
        venue: session.venue
      }
    });
    setCurrentEvents(eventsWithNames);
  }, [Session]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(`http://localhost:3001/get-training`);
        if (response.ok) {
          const data = await response.json();
          setTrainings(data); // Set the fetched data directly to the state
        } else {
          console.error('Failed to fetch trainings data');
        }
      } catch (error) {
        console.error('Error fetching trainings data:', error);
      }
    };

    fetchTrainings();
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };



  const fetchUsersByRole = async (role) => {
    try {
      // Fetch all users
      console.log(role)
      const response = await fetch('http://localhost:3001/get-users');
      if (response.ok) {
        const allUsers = await response.json();
        // Filter users based on the specified role
        const filteredUsers = allUsers.filter(user => user.role === role);
        console.log(filteredUsers)
        return filteredUsers;
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const handleAddEventForm = () => {
    setAddEventForm(!AddEventForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentTraining = trainings.find(training => training._id === value)
    setSelectedTraining(value)
    console.log(selectedTraining)
    console.log("Before_formData:", formData);
    setFormData({
      ...formData,
      programId: value,
      programName: currentTraining.programName,
      trainers: currentTraining.trainerId
    })
  };


  const handleAddNewEvent = async () => {
    handleAddEventForm()

    try {
      // Fetch users with the selected trainee role
      const traineeRole = formData.trainee;
      const traineeUsers = await fetchUsersByRole(traineeRole);

      // Call API to create multiple sessions
      const response = await fetch('http://localhost:3001/create-multiple-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formData,
          traineeIds: traineeUsers.map(user => user._id),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create sessions');
      }

      // Reset form state or handle success as needed
      console.log('Sessions created successfully');
      window.location.reload();
    } catch (error) {
      // Handle error...
      
      console.error('Error:', error);
    }

  };


  const handleEventClick = (event) => {
    console.log(event);
    setSelectedEvent(event); // Set the selected event
    setOpenDialog(true); // Open the dialog
  };

  return (
    <Box m="5px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
        <Header title="Calendar" />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => setAddEventForm(true)}
        >
          Add
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        {!isMobile && currentEvents.length !== 0 && (
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="10px"
            borderRadius="4px"
          >
            <Typography variant="h4">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}{" "}
                        -
                        {formatDate(event.end, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* CALENDAR */}
        <Box sx={{ height: 450, width: isMobile ? "100%" : "100%" }}>
          <Calendar
            localizer={localizer}
            events={currentEvents}
            startAccessor="start"
            views={['month', 'agenda']}
            endAccessor="end"
            style={{ margin: "10px" }}
            onSelectEvent={handleEventClick}
          />
        </Box>
      </Box>
      {/* Dialog to display event details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle><Typography variant="h4">
          {selectedEvent?.title}
        </Typography></DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <b>Start:</b> {selectedEvent?.start.toString()}
          </Typography>
          <Typography variant="body1">
            <b>End:</b> {selectedEvent?.end.toString()}
          </Typography>

          <Typography variant="body1">
            <b>Venue:</b> {selectedEvent?.venue}
          </Typography>
          <Typography variant="body1">
            <b>Status:</b> {selectedEvent?.status}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            <b> Close</b>
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog to add new event  */}
      <Dialog open={AddEventForm} onClose={handleAddEventForm}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <FormControl fullWidth sx={{ gridColumn: "span 3" }} required>
              <InputLabel id="training-select-label">Select Training</InputLabel>
              <Select
                labelId="training-select-label"
                id="training-select"
                name="Training"
                value={selectedTraining}
                onChange={handleChange}
              >
                {trainings.map(training => (
                  <MenuItem key={training._id} value={training._id}>
                    {training.programName}
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
                value={formData.trainee}
                name="trainee"
                onChange={(e) => setFormData({ ...formData, trainee: e.target.value })}
                required
              >
                {["Employee", "Intern"].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="Venue"
              name="venue"
              label="Venue"
              type="text"
              fullWidth
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            />

            <TextField
              id="Startdatetime"
              name="Startdatetime"
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              sx={{ gridColumn: "span 2" }}
              required
              value={formData.Startdatetime}
              onChange={(e) => setFormData({ ...formData, Startdatetime: e.target.value })}
            />

            <TextField
              id="Enddatetime"
              name="Enddatetime"
              label="End Date & Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              sx={{ gridColumn: "span 2" }}
              required
              value={formData.Enddatetime}
              onChange={(e) => setFormData({ ...formData, Enddatetime: e.target.value })}
            />

            {/* Add other form fields similarly */}

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

