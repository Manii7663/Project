import { useState,useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../context/theme";
import { useAuth } from "../../context/authContext";


const Calendar = () => {
  const { User } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const role = User ? User.role : 'Intern';

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
    // Add event only if the user has permission
    if (role === 'Admin') {
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
    } else {
      alert("You don't have permission to add events.");
    }
  };

  const handleEventClick = (selected) => {
    // Remove event only if the user has permission
    if (role === 'Admin') {
      if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
        selected.event.remove();
      }
    } else {
      alert("You don't have permission to delete events.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
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
                      -{formatDate(event.end, {
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
            editable={role === 'Admin'} // Allow editing only for admin
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
          
          />
        </Box>
      </Box>
    </Box>
  );
};


export default Calendar;
