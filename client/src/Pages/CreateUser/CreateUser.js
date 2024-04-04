import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header";

const initialValues = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: "",
  Designation: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
});

const CreateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "hello",
    role: "",
    Designation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    const { id, name, email, password, role, Designation } = formData;

    axios
      .post("http://localhost:3001/new-user", {
        id: id,
        name: name,
        email: email,
        password: password,
        role: role,
        Designation: Designation,
      })
      .then(async (result) => {
        console.log("User created successfully:", result.data);
        window.alert("User created successfully");

        const sendEmailResult = await axios.post(
          "http://localhost:3001/send-email",
          {
            userEmail: email,
            name: name,
            // Include any additional parameters required for sending the email
          }
        );

        console.log("Email sent successfully:", sendEmailResult.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating user:", err.response.data.error);
        window.alert(err.response.data.error);

        // TODO: Handle error (e.g., display an error message to the user)
      });
  };
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.id}
                name="id"
                error={!!touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2" }}
                required
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.name}
                name="name"
                sx={{ gridColumn: "span 2" }}
                required
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.email}
                name="email"
                sx={{ gridColumn: "span 3" }}
                required
              />

              <FormControl
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                required
              >
                <InputLabel>Role:</InputLabel>
                <Select
                  value={formData.role}
                  onChange={handleChange}
                  name="role"
                  required
                >
                  {["Admin", "Employee", "Intern"].map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                onBlur={handleBlur}
                variant="filled"
                required
              >
                <InputLabel>Designation:</InputLabel>
                <Select
                  value={formData.Designation}
                  onChange={handleChange}
                  name="Designation"
                  required
                >
                  {[
                    "Manager",
                    "Software Engineer",
                    "Data Analyst",
                    "Solution Enabler",
                    "Solution Consultant",
                    "Senior Software Engineer",
                    "Data Engineer",
                    "Trainee Engineer",
                    "Developer",
                  ].map((designation) => (
                    <MenuItem key={designation} value={designation}>
                      {designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUser;
