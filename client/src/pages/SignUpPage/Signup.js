import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER } from "../../config/config";
import slugify from 'slugify';
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { API } from "../../config/config";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import "./Signup.css";
import { useAuth } from "../../context/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //context
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== reEnterPassword) {
        toast.error("Password and Confirm Password are not same.")
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        toast.error("Password is too short.")
        setLoading(false);
        return;
      }
      const { data } = await axios.post(`/user/Register`, {
        email,
        password,
        confirmPassword: reEnterPassword,
        userName: username,
      });
      console.log("------>", data);
      // if (data?.response?.data.responseMessage) {
      //   toast.error(data?.response?.data.responseMessage); //this will come from backend
      //   setLoading(false);
      // } else {
      //   console.log("hello from success");
      //   toast.success("sign up successfully");
      //   setLoading(false);
      //   navigate("/login");
      // }
      console.log("hello from success");
      toast.success("Check your Email for Otp verification");
      setLoading(false);
      setAuth({ ...auth, user: email });
      navigate("/otp-verify");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.responseMessage);
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="signup-container">
        <div className="signup-form">
          <h2 className="heading">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                required
                type="text"
                id="name"
                value={username}
                placeholder="Enter your user name"
                onChange={(e) => setUserName(slugify(e.target.value.toLowerCase()))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                required
                type="password"
                id="password"
                value={reEnterPassword}
                placeholder="Re-Enter your password"
                onChange={(e) => setReEnterPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="sign-btn sign-btn-primaryy rounded-2xl"
              disabled={loading}
            >
              {loading ? (
                <RingLoader color={"#ffffff"} loading={loading} size={24} />
              ) : (
                "Sign Up"
              )}
            </button>
             <div className="login-link">
              Already have an account?{" "}
              <Link to="/login" className="login-link-text">
                Log in
              </Link>
            </div>
            
          <div className="login-link">
          By continuing, you agree to{" "}
              <Link to="/Privacy-Notice" className="login-link-text">
              Our Conditions
              </Link> of Use and Privacy Notice.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
