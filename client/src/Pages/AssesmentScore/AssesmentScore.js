import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../context/authContext";
import { Box,useTheme } from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../context/theme";

const AssessmentScorePage = () => {
  const { User } = useAuth(); 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [assessmentScores, setAssessmentScores] = useState([]);

  useEffect(() => {
    const fetchAssessmentScores = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-ass-scores");
        if (response.ok) {
          const data = await response.json();
          const scoresWithIds = data.map((score, index) => ({
            ...score,
            id: index + 1,
          }));
          setAssessmentScores(scoresWithIds);
          console.log(data);
          console.log(User);
        } else {
          console.error("Failed to fetch assessment scores");
        }
      } catch (error) {
        console.error("Error fetching assessment scores:", error);
      }
    };

    fetchAssessmentScores();
  }, []);

  // Filter assessment scores for the specific user
  const filteredAssessmentScores = assessmentScores.filter(
    (score) => score.userId === User._id
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, // Hide the id column
    { field: "sessionName", headerName: "Assessment Name", flex: 2 },
    { field: "maxScore", headerName: "Max Score", flex: 1 },
    { field: "score", headerName: "Score", flex: 1 },
  ];

  return (
    <Box m="10px">
         <Box m="10px 0px"><Header title={"Assesment Scores"} /></Box>
      <Box
        width="100%"
        height="100%"
      >
        <DataGrid
          rows={filteredAssessmentScores}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default AssessmentScorePage;
