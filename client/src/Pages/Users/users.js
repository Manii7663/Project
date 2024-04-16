import { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../context/theme";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { mockDataTeam } from "../../data/mockData";

import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Header from "../../Components/Header";
import { AddCircleOutline } from "@mui/icons-material";
import { useRef } from "react";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);

  const dataGridRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");


  // const { search } = useParams();
  // console.log("searching ", search);

  useEffect(() => {
    // Fetch users from the backend API
    fetch("http://localhost:3001/get-users")
      .then((response) => response.json())
      .then((data) => {
        // Filter users based on the search prop
        if (search) {
          const filtered = data.filter(
            (user) => user.name.toLowerCase() === search.toLowerCase()
          );
          setUsers(filtered);
        } else {
          setUsers(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [search]); // Depend on search to refetch users when search changes

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "Name" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "Designation", headerName: "Designation", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="50%"
            m="10px 0"
            p="5px"
            display="flex"
            justifyContent={"center"}
            backgroundColor={
              role === "Admin"
                ? colors.greenAccent[600]
                : role === "Employee"
                ? colors.greenAccent[700]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
            className="centered-content"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          m="10px 0 0 0"
        >
          <Button
            startIcon={<EditOutlined />}
            onClick={() => handleEditClick(params)}
            sx={{ color: "#1976d2" }}
          />
          <Button
            startIcon={<DeleteOutline />}
            onClick={() => handleDeleteClick(params)}
            sx={{ color: "#f44336" }}
          />
        </Box>
      ),
    },
  ];
  const navigate = useNavigate();

  const handleAddNewMember = () => {
    // Redirect to the page for adding a new member
    navigate("/adduser");
  };

  const handleEditClick = (params) => {
    const userId = params.row.id; // Assuming 'id' is the field containing the userId
    navigate(`/userprofile/${userId}`);
  };

  const deleteUser = (_id) => {
    fetch(`http://localhost:3001/delete-user/${_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful deletion, e.g., remove the user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
        alert("User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again.");
      });
  };

  const handleDeleteClick = (params) => {
    const _id = params.row._id; // Assuming 'id' is the field containing the userId
    const userName = params.row.name; // Assuming 'name' is the field containing the userName

    const userConfirmed = window.confirm(
      `Do you really want to delete ${userName}?`
    );

    if (userConfirmed) {
      deleteUser(_id);
    }
  };

  return (
    <Box m="20px 10px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Header title={"USERS"} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={handleAddNewMember}
        >
          Add
        </Button>
      </Box>
      <Box
        height="100vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.grey[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            aligntext: "center",
          },
          "& .MuiDataGrid-topContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          ref={dataGridRef}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
  );
};

export default Users;
