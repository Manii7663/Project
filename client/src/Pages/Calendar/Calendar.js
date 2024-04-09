import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import Header from "../../Components/Header";
import { tokens } from "../../context/theme";
import { useAuth } from "../../context/authContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  const { User } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [Session, setSession] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event
  const [isMobile, setIsMobile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/get-training-sessions`
        );
        if (response.ok) {
          const data = await response.json();
          setSession(data);
        } else {
          console.error("Failed to fetch Session data");
        }
      } catch (error) {
        console.error("Error fetching Session data:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const eventsWithNames = Session.filter(session => session.trainee === User._id && session.status === "pending").map((session) => ({
      id: session._id,
      title: session.programName,
      start: new Date(session.Startdatetime),
      end: new Date(session.Enddatetime),
      allDay: false,
      status: session.status, // Include status in event data
      venue: session.venue
    }));
    setCurrentEvents(eventsWithNames);
  }, [Session, User]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    // Customize event style based on status
    if (event.status === 'pending') {
      return {
        style: {
          backgroundColor: 'red',
          borderColor: 'red'
        }
      };
    } else {
      // Default style for other events
      return {};
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };


  const handleEventClick = (event) => {
    console.log(event);
    setSelectedEvent(event); // Set the selected event
    setOpenDialog(true); // Open the dialog
  };

  return (
    <Box m="10px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        {!isMobile && (
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="10px"
            borderRadius="4px"
          >
            <Typography variant="h4">To Do</Typography>
            <List>
              {currentEvents.filter(event => event.status === "pending").map(event => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.redAccent[700],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {

                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}{" "}
                        -
                        {formatDate(event.end, {

                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
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
        <Box sx={{ height: 500, width: isMobile ? "100%" : "80%" }}>
          <Calendar
            localizer={localizer}
            events={currentEvents}
            eventPropGetter={eventStyleGetter}
            startAccessor="start"
            views={['month', 'day', 'agenda']}
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
    </Box>
  );
};

export default MyCalendar;
