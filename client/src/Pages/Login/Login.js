import React from "react";
import './Login.css';
import  axios  from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


function Login() {

    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

    const loginValidate = async (e) => {
		e.preventDefault()
		try {
            
			const res = await axios.post("http://localhost:3001/logIn", { email, password })
			if (res.status === 201) {
				// localStorage.setItem('id', res.data.user._id)
				// localStorage.setItem('name', res.data.user.name)
                console.log("validated succesfully")
				navigate('/')
			}
		} catch (err) {
            console.log("error encounterd")
			console.log(err)
			if (err.response.status === 401 || err.response.status === 402) {
				alert(err.response.data.error)
			}
			else {
				alert("Internal Server Error")
			}
		}
	}
  return (
  <div>
    <div class="wrapper">
        <div class="text-center mt-4 name">
            Log In
        </div>
        <form class="p-3 mt-3" onSubmit={loginValidate}>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="email" name="userName" id="userName" placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button class="btn mt-3" type="submit">Login</button>
        </form>
        <div class="text-center fs-6">
            <a href="#">Forget password?</a> or <a href="#">Sign up</a>
        </div>
    </div>
  </div>
  );
}

export default Login;
