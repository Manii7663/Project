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
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);


const Schedule = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const [trainers, setTrainers] = useState([]);

    const [Session, setSession] = useState([]);
    const [isMobile, setIsMobile] = useState(false);


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
            <Box sx={{ height: 500, width: isMobile ? "100%" : "80%" }}>
              <Calendar
                localizer={localizer}
                events={currentEvents}
                startAccessor="start"
                views={['month', 'day','agenda']}
                endAccessor="end"
                style={{ margin: "10px" }}
              />
            </Box>
          </Box>
        </Box>
      );
};

export default Schedule;

