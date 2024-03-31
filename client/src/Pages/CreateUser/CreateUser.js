import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    email: "",
    password: "",
    role: "",
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

    const { id,name, email, password, role } = formData;

    axios
      .post("http://localhost:3001/newUser", {
        id:id,
        name: name,
        email: email,
        password: password,
        role: role,
      })
      .then(async (result) => {
        console.log("User created successfully:", result.data);
        
        const sendEmailResult = await axios.post("http://localhost:3001/sendEmail", {
        userEmail: email,
        name:name
        // Include any additional parameters required for sending the email
      });

      console.log("Email sent successfully:", sendEmailResult.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        // TODO: Handle error (e.g., display an error message to the user)
      });
  };

  return (
    <div className="container mt-5">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            className="form-control"
            name="id"
            placeholder="Enter id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="intern">Intern</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
