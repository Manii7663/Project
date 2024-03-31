import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { password });
      console.log("Response:", response.data);
      if (response.data.msg === "Password updated successfully") {
        console.log("Password updated successfully");
        setIsPasswordUpdated(true); // Set the state to indicate password updated successfully
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        {isPasswordUpdated ? (
          <div>
            <p>Password updated successfully!</p>
            <Link to="/">Go back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
