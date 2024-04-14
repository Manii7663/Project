import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress,useTheme } from '@mui/material';
import Header from '../../Components/Header';
import { useAuth } from '../../context/authContext';
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
      const sessionsResponse = await fetch('http://localhost:3001/get-training-sessions');
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json();
        setSessions(sessionsData);
      } else {
        console.error('Failed to fetch sessions data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateWorkProgress = () => {
      const pendingSessions = sessions.filter(session => session.status === 'pending');
      const completedSessions = sessions.filter(session => session.status === 'completed');
      const totalSessions = sessions.length;

      const pendingPercentage = ((pendingSessions.length / totalSessions) * 100).toFixed(2);
      const completedPercentage = ((completedSessions.length / totalSessions) * 100).toFixed(2);

      setPendingPercentage(pendingPercentage);
      setCompletedPercentage(completedPercentage);
    };

    calculateWorkProgress();
  }, [sessions]);

  return (
    <Box m="20px">
      <Header title={"My Progress"} />
      <Box>
        <Typography variant="h5" gutterBottom>Work Progress</Typography>
        <Box margin="10px" padding="10px">
          <Typography variant="subtitle1">Pending: {pendingPercentage}%</Typography>
          <LinearProgress variant="determinate" value={parseFloat(pendingPercentage)} color="warning" />
        </Box>
        <Box margin="10px" padding="10px">
          <Typography variant="subtitle1">Completed: {completedPercentage}%</Typography>
          <LinearProgress variant="determinate" value={parseFloat(completedPercentage)} color="success" />
        </Box>
      </Box>
    </Box>
  );
};

export default MyProgress;
