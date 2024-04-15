import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const ForgetPassword = () => {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/forget-password', { email })
            .then(res => {
                
                if (res.data.msg) {
                    alert(res.data.msg)                   
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }


    return (
        <div className="container d-flex flex-column">
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-4">
                                <h5>Forgot Password?</h5>
                                <p className="mb-2">Enter your registered email ID to reset the password</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control" name="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3 d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Reset Password
                                    </button>
                                </div>
                                <span>Don't have an account? <a href="sign-in.html">sign in</a></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ForgetPassword;
