import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard'; // Redirect to dashboard if token exists
    }
  }, []);

  const loginValidate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/logIn", {
        email,
        password,
      });
      if (res.status === 201) {
        console.log("validated successfully");
        const { token } = res.data; // Corrected: res, not response
        console.log(res.data)
        console.log(token)
        if (token) {
          localStorage.setItem('token', token);
          navigate("/dashboard");
        } else {
          console.error("Token not received in response.");
          alert("Token not received. Please try again.");
        }
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("error encountered");
      console.log(err);
      if (err.response && (err.response.status === 401 || err.response.status === 402)) {
        alert(err.response.data.error);
      } else {
        alert("Internal Server Error");
      }
    }
  };
  

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-1 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
              Welcome, <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Where Learning Fuels Innovation
              </span>
            </h1>

          </div>

          <div className="col-lg-5 mb-5 mb-lg-0  position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong "></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <div className="text-center mb-4">
                  <h2 className="mb-0">Log In</h2>
                </div>
                <form onSubmit={loginValidate}>

                  <div className="form-field d-flex align-items-center form-outline mb-4">
                    <span class="far fa-user"></span>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>

                  <div className="form-outline mb-4 d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                  </div>
                  <button type="submit" class="btn btn-primary btn-block mb-4 mx-auto d-block" style={{ width: '100px' }}>Log In</button>

                  

                    </form>
                
                <div class="forgot-password-link text-end" >
                    <a href="#" style={{ color: 'red' }}>Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
