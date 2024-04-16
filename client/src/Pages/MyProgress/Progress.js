import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, useTheme } from "@mui/material";
import Header from "../../Components/Header";
import { useAuth } from "../../context/authContext";
import { tokens } from "../../context/theme";

const MyProgress = () => {
  const { User } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sessions, setSessions] = useState([]);
  const [pendingPercentage, setPendingPercentage] = useState(0);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const sessionsResponse = await fetch(
        "http://localhost:3001/get-training-sessions"
      );
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json();
        setSessions(
          sessionsData.filter((session) => session.trainee === User._id)
        );
      } else {
        console.error("Failed to fetch sessions data");
      }
    };

    fetchData();
  }, [User]);

  const pendingAssessments = sessions.filter(
    (session) => session.status === "pending"
  );

  useEffect(() => {
    const calculateWorkProgress = () => {
      const pendingSessions = sessions.filter(
        (session) => session.status === "pending"
      );
      const completedSessions = sessions.filter(
        (session) => session.status === "completed"
      );
      const totalSessions = sessions.length;

      const pendingPercentage = (
        (pendingSessions.length / totalSessions) *
        100
      ).toFixed(2);
      const completedPercentage = (
        (completedSessions.length / totalSessions) *
        100
      ).toFixed(2);

      setPendingPercentage(pendingPercentage);
      setCompletedPercentage(completedPercentage);
    };

    calculateWorkProgress();
  }, [sessions]);

  return (
    <Box m="10px">
    <Header title={"My Progress"} />
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="20px" m="10px">
      {/* Work Progress Section */}
      <Box
          border="1px solid black"
          p="5px"
        >
          <Typography variant="h5" gutterBottom>
            Work Progress
          </Typography>
          <Box margin="10px" padding="10px">
            <Typography variant="subtitle1">
              Pending: {pendingPercentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={parseFloat(pendingPercentage)}
              color="warning"
            />
          </Box>

          <Box margin="10px" padding="10px">
            <Typography variant="subtitle1">
              Completed: {completedPercentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={parseFloat(completedPercentage)}
              color="success"
            />
          </Box>
        </Box>
        <Box
          border="1px solid black"
          p="5px"
        >
          <Typography variant="h5" gutterBottom>
            Pending Sessions
          </Typography>
          {pendingAssessments.length ? (
            <ol>
              {pendingAssessments.map((session) => (
                <li key={session.id}>{session.programName}</li>
              ))}
            </ol>
          ) : (
            <Typography variant="subtitle1">No pending assessments.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProgress;
