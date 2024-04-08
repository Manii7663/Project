import React, { useState, useEffect } from 'react';
import { CircularProgress, Card, Typography, Box } from '@mui/material';
import { useAuth } from '../../context/authContext';
import { ResponsivePie } from '@nivo/pie'; // Import the ResponsivePie component

const MyProgress = () => {
  const { User } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [scores, setScores] = useState([]);
  const [pieData, setPieData] = useState([]); // State to hold pie chart data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sessions data
        const sessionsResponse = await fetch('http://localhost:3001/get-training-sessions');
        if (sessionsResponse.ok) {
          const sessionsData = await sessionsResponse.json();
          setSessions(sessionsData);
        } else {
          console.error('Failed to fetch sessions data');
        }

        // Fetch scores data
        const scoresResponse = await fetch('http://localhost:3001/get-ass-scores');
        if (scoresResponse.ok) {
          const scoresData = await scoresResponse.json();
          setScores(scoresData);
        } else {
          console.error('Failed to fetch scores data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate percentage of work pending
  const calculateWorkPendingPercentage = () => {
    const pendingSessions = sessions.filter(session => session.status === 'pending');
    const totalSessions = sessions.length;
    return ((pendingSessions.length / totalSessions) * 100).toFixed(2);
  };

  // Calculate data for the pie chart
  const calculatePieData = () => {
    const pendingPercentage = calculateWorkPendingPercentage();
    const completedPercentage = 100 - pendingPercentage;

    return [
      { id: 'Pending', value: Number(pendingPercentage) },
      { id: 'Completed', value: Number(completedPercentage) },
    ];
  };

  useEffect(() => {
    // Update pie data when sessions change
    setPieData(calculatePieData());
  }, [sessions]);

  return (
    <Box m="20px">
      <Box>
      <Typography variant="h5" gutterBottom>Work Pending</Typography>
      <Box margin="10px" padding="10px" display={"flex"} alignItems={"center"}> {/* Adjust height and width as needed */}
        <ResponsivePie
          data={pieData}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          sliceLabel={({ value }) => `${value}%`}          
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          radialLabelsTextFormatter={value => value.id} // Custom label formatter
        />
      </Box>
      </Box>
      {/* Add other progress components here */}
    </Box>
  );
};

export default MyProgress;
