import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import "./Signup.css";
import { useAuth } from "../../context/auth";

const OtpVerify = () => {
  //context
  const [auth, setAuth] = useAuth('');
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("--auth->", auth)

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {     
      const { data } = await axios.post(`/user/verifyOTP`,{
      email: auth?.user,
      otp 
      });
       console.log("otp response", data);
        toast.success("Verified Successfully");
        setLoading(false);
        navigate("/login");
        setAuth("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.responseMessage);
      setLoading(false);
    }
  };

  const resendOtp = async() => {
    try{
        const { data } = await axios.post(`/user/resendOTP`,{
            email: auth?.user
        });
        toast.success("Otp resend successfully");
    }catch(err){
        console.log(err);
        toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <NavBar />
      <div className="otp-container">
        <div className="signup-form">
          <h2>Verify Your Email</h2>
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                value={otp}
                placeholder="Enter Otp sent on your register email"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="time-otp">
                <div className="time">Valid for : 3 mins</div>
                <div className="resend" onClick={resendOtp}>Resend Otp</div>
            </div>
            
            <button
              type="submit"
              className="sign-btn sign-btn-primaryy"
              disabled={loading}
            >
              {loading ? (
                <RingLoader color={"#ffffff"} loading={loading} size={24} />
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
