import "./App.css";
import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/CreateUser/CreateUser";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ForgetPassword from "./Pages/ResetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<CreateUser />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
        <Route path="/resetPassword/:id/:token" element={<ResetPassword />}></Route>      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
