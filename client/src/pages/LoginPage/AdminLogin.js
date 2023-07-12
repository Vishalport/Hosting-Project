import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";
import { API } from "../../config/config";
import { RingLoader } from "react-spinners";
import { USER } from "../../config/config";

import NavBar from "../../components/navbar/Navbar";
import "./Login.css";
import { useAuth } from "../../context/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password.length < 6) {
        toast.error("Password is too short.");
        setLoading(false);
        return;
      }
      console.log(email, password);
      const { data } = await axios.post('/Admin/adminLogin', {
        email,
        password,
      });

      console.log("----->>>>>>admin data",data)

      if (data?.error) {
        toast.error(data.responseMessage);
        setLoading(false);
      } else {
        setAuth(data?.result);
        localStorage.setItem("auth", JSON.stringify(data?.result));
        toast.success(data.responseMessage);

        // Check the user type and navigate accordingly
        const userType = data?.result?.user.userType;
        console.log(">>>>>>>>>>user type",userType)
        if (userType === "ADMIN") {
          navigate("/Dashboard");
        } else if (userType === "SELLER") {
          navigate("/SellerDashboard");
        } else {
          navigate("/home");
        }

        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.responseMessage);
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/forgot-password`, {
        email: resetEmail,
      });

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Password reset email sent successfully");
        setResetEmail(""); // Clear the email input
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="heading">Admin Login</h2>

          <div className="form-group">
            <label>Email:</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-btn login-btn-primary rounded-2xl"
            disabled={loading}
          >
            {loading ? (
              <RingLoader color={"#ffffff"} loading={loading} size={24} />
            ) : (
              "Login"
            )}
          </button>
          <div className="d-flex justify-content-between">
          <div className="forgot-password">
            <div><Link to="/send-otp">Forgot Password?</Link></div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
