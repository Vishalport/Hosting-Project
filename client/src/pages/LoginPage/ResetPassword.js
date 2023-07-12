import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { useAuth } from "../../context/auth";

export default function ResetPassword() {
      //context
  const [auth, setAuth] = useAuth('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

//   console.log("--auth in reset->", auth)

  const handleSet = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {     
        if(password.length < 6){
            toast.error("Password is less than 6 char");
            setLoading(false);
            return;
        }
        if(password !== confirmPassword){
            toast.error("Password and Re-Entered Password are not same");
            setLoading(false);
            return ;
        }
      const { data } = await axios.put(`/user/resetPassword/${auth?.token}`,{
        newPassword: password
      });
        // console.log("otp response", data);
        toast.success("Reset Successfully");
        setLoading(false);
        navigate("/login");
        setAuth("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.responseMessage);
      setLoading(false);
    }
  };


  return (
    <div>
      <NavBar />
      <div className="otp-container">
        <div className="signup-form">
          <h2>Set the Password</h2>
          <form onSubmit={handleSet}>
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                value={confirmPassword}
                placeholder="Re-Enter Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                "Set the Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
