import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { } from "@mui/material";
import axios from "axios";
import { Container, useTheme, Typography, Paper, TextField, Button, Grid, Link } from '@mui/material';
import { tokens } from "../../context/theme";
import "./Login.css"
import { useAuth } from "../../context/authContext";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {setIsAuthenticated}= useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/logIn", {
        email,
        password,
      });
      if (res.status === 201) {
        console.log("validated successfully");
        const { user } = res.data;
        console.log(res.data)
        console.log(user)
        setIsAuthenticated(true)
        
        if (user) {
          localStorage.setItem('user', user);
          navigate("/");

        } else {
          console.error("user not received in response.");
          alert("user not received. Please try again.");
        }

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
                <Container maxWidth="xs">

                  <Typography variant="h1" align="center" gutterBottom sx={{ color: 'primary.main' }}>
                    Log In
                  </Typography>
                  <form onSubmit={handleLogin}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="email"
                          label="Email"
                          variant="outlined"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          InputProps={{ style: { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Password"
                          variant="outlined"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          InputProps={{ style: { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ borderRadius: '12px' }}>
                          Log In
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Link href="/forgetPassword" variant="body2" color="secondary">
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                  </form>

                </Container>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}


export default Login;
