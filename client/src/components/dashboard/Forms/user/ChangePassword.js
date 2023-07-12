import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { useAuth } from "../../../../context/auth";
import NavBar from "../../../navbar/Navbar";

const ChangePassword = () => {
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmNewPassword) {
      toast.error("new password not match!");
      setLoading(false);
      return;
    } else {
      try {
        setLoading(true);
        const { data } = axios.put(`/user/changePassword`, {
          newPassword: newPassword,
          oldPassword: currentPassword,
          headers: {
            token: auth?.token,
          },
        });
        if (data?.error) {
          toast.error(data.responseMessage);
          setLoading(false);
        } else {
          toast.success("password changed successufully");
          setLoading(false)
          setConfirmNewPassword("")
          setCurrentPassword("")
          setNewPassword("")
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  //state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="login-container">
      <NavBar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="heading">Update Password</h2>

        <div className="form-group">
          <label>Current Password:</label>
          <input
            required
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            required
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Re-Enter New Password:</label>
          <input
            required
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            "Change Password"
          )}
        </button>

        <div className="forgot-password">
          <Link to="/send-otp">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
