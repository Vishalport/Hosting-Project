import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { useAuth } from "../../context/auth";


export default function SendOtp() {

    //context
    const [auth, setAuth] = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const sendOtp = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const { data } = await axios.post(`/user/resendOTP`,{
            email
        });
        console.log("res-from-send-otp", data);
        toast.success("Otp sended successfully");
        setAuth({...auth, user: email});
        setLoading(false);
        navigate("/verification");
    }catch(err){
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.responseMessage);
    }
  }


  return (
    <div>
      <NavBar />
      <div className="otp-container">
        <div className="signup-form">
          <h2>Enter the email</h2>
          <form onSubmit={sendOtp}>
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                placeholder="Enter your register email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="sign-btn sign-btn-primaryy"
              disabled={loading}
            >
              {loading ? (
                <RingLoader color={"#ffffff"} loading={loading} size={24} />
              ) : (
                "Send Otp"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
