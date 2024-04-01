import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginValidate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/logIn", {
        email,
        password,
      });
      if (res.status === 201) {
        console.log("validated successfully");
        navigate("/");
      }
    } catch (err) {
      console.log("error encountered");
      console.log(err);
      if (err.response.status === 401 || err.response.status === 402) {
        alert(err.response.data.error);
      } else {
        alert("Internal Server Error");
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus, expedita iusto veniam atque, magni tempora mollitia
              dolorum consequatur nulla, neque debitis eos reprehenderit quasi
              ab ipsum nisi dolorem modi. Quos?
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass ">
              <div className="card-body px-4 py-0 px-md-2 "></div>
              
              <form class="p-5 mt-0" onSubmit={loginValidate}>
              <div class="text-center name">Log In</div>
                <div class="form-field d-flex align-items-center">
                  <span class="far fa-user"></span>
                  <input
                    type="email"
                    name="userName"
                    id="userName"
                    placeholder="Username"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-field d-flex align-items-center">
                  <span class="fas fa-key"></span>
                  <input
                    type="password"
                    name="password"
                    id="pwd"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-4">
                Sign in
              </button>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
