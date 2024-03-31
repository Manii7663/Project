import React, { useState } from "react";
import "./SignUp.css";
import axios from 'axios';

function SignUp() {
  const [name,setName]= useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [number,setNumber]=useState()

  const handleSubmit= (e) => {
    e.preventDefault()
    console.log("handlesubmit function")
    axios.post('http://localhost:3001/register',{name,email,password,number})
    .then(result => console.log(result))
    .catch(err=> console.log(err))
  }
  

  return (
    <div className="Signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left d-none d-md-flex">
                {/* <!-- Background image for card set in CSS! --> */}
              </div>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Register
                </h5>
                <form onSubmit={handleSubmit}> 
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputUsername"
                      placeholder="myusername"
                      onChange={(e) => setName(e.target.value)}
                      required
                      autofocus
                    />
                    <label for="floatingInputUsername">Username</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floatingInputEmail">Email address</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="Mobile Number"
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    <label for="floatingInputEmail">Mobile Number</label>
                  </div>

                  
                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  <a className="d-block text-center mt-2 small" href="#">
                    Have an account? Sign In
                  </a>

                  <hr className="my-4" />

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-google btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      <i className="fab fa-google me-2"></i> Sign up with Google
                    </button>
                  </div>

                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
