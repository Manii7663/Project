import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Header from '../../Components/Header';

const TrainingDetails = () => {
  const [trainings, setTrainings] = useState([]);

  const { coeId } = useParams();

  // Fetch trainings data based on COE ID
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(`http://localhost:3001/get-training/${coeId}`);
        if (response.ok) {
          const data = await response.json();
          // Add a unique id to each training object
          const trainingsWithId = data.map((training, index) => ({
            ...training,
            id: index + 1,
          }));
          setTrainings(trainingsWithId);
        } else {
          console.error('Failed to fetch trainings data');
        }
      } catch (error) {
        console.error('Error fetching trainings data:', error);
      }
    };

    fetchTrainings();
  }, []);
  // Fetch data when COE ID changes

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'programName', headerName: 'Program Name', flex: 2 },
    { field: 'description', headerName: 'Description',flex: 2 },

  ];

  return (
    <Box m="10px 0px">
      <Header title={"Training"} />
      <Box
        width="100%"
        height="100%"
      >
        <DataGrid
          rows={trainings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default TrainingDetails;
