import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, TableCell, TableRow } from '@mui/material';

const TrainingDetails = () => {
  const [trainings, setTrainings] = useState([]);
  
  const {coeId}=useParams();

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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'programName', headerName: 'Program Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    
  ];

  // Handler function for trainer ID change
  const handleTrainerIdChange = (event, rowId) => {
    const { value } = event.target;
    // Update the trainersId in your data state
    const updatedTrainings = trainings.map((training) =>
      training.id === rowId ? { ...training, trainersId: value } : training
    );
    setTrainings(updatedTrainings);
  };

  return (
    <div style={{ height: '60%', width: '100%' }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default TrainingDetails;
