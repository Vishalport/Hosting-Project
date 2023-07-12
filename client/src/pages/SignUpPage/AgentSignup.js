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

const AgentSignup = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [phone, setPhone] = useState();    
    const [email, setEmail] = useState();
    const [dob, setDob] = useState();
    const [about, setAbout] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState();
    const [photo, setPhoto] = useState(null);
    const [panCard, setPanCard] = useState();
    const [adhaar, setAdhaar] = useState();
    const [uploading, setUploading] = useState(false);

    const [loading, setLoading] = useState();
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");

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
      const { data } = await axios.post(`/agent/agentRegister`, {
        email,
        password,
        confirmPassword: reEnterPassword,
        userName,
        adhar: adhaar,
        pan: panCard,
        firstName,
        lastName,
        state,
        city,
        mobileNumber: phone,
        pinCode: pincode,
        about,
        address
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
      <div class="container pro142 agent-signup ">
        <div className="row gutters">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 w-100">
            <div className="card h-100 w-100">
            <div className="card-body">
                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-5 text-primary p-color agent_signup-heading">Agent  Personal Details</h6>
                </div>

                {/* <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 mr-10">

                    <div className="form-group d-flex">

                    <input 
                    className="form-control mt-4 mb-4 upload-pic col-8"
                    onChange={handleUpload} type="file" 
                    accept="image/*" 
                    placeholder=''
                    />

                     {uploading ? <p className='text-m'>Uploading...</p> : ""}
                    </div>
                    
                </div> */}

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label>First Name</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter first name" 
                    value={firstName}
                    onChange={e=> setFirstName(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter last name" 
                    value={lastName}
                    onChange={e=> setLastName(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label >Username</label>
                    <input type="email" 
                    className="form-control" 
                    placeholder="Enter Username" 
                    value={userName}
                    onChange={e=> setUserName(slugify(e.target.value.toLowerCase()))}
                    />
                    </div>
                </div>
                
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="phone">Adhaar</label>
                    <input type="text" 
                    className="form-control" 
                    id="phone" 
                    placeholder="Enter Adhaar number"
                    value={adhaar}
                    onChange={e=> setAdhaar(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="phone">Pan Card</label>
                    <input type="text" 
                    className="form-control" 
                    id="phone" 
                    placeholder="Enter Pan number"
                    value={panCard}
                    onChange={e=> setPanCard(slugify(e.target.value.toUpperCase()))}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="website">Date of Birth</label>
                    <input type="date" 
                    className="form-control" 
                    id="website" 
                    placeholder="11/11/1950" 
                    value={dob}
                    onChange={e=> setDob(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label>About</label>
                    <textarea 
                    className="form-control "
                    placeholder="Enter about yourself" 
                    value={about}
                    onChange={e=> setAbout(e.target.value)}
                    />
                    </div>
                </div>
                </div>

                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-4 text-bold text-primary p-color">Contact Information</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="Street">Email</label>
                    <input type="email" 
                    className="form-control" 
                    id="Street" 
                    placeholder="Enter Email Address" 
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" 
                    className="form-control" 
                    id="phone" 
                    placeholder="Enter Phone number"
                    value={phone}
                    onChange={e=> setPhone(e.target.value)}
                    />
                    </div>
                </div>
                </div>



                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-4 text-primary p-color">Address</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="Street">Street Address</label>
                    <input type="name" 
                    className="form-control" 
                    id="Street" 
                    placeholder="Enter Address" 
                    value={address}
                    onChange={e=> setAddress(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="ciTy">City</label>
                    <input type="name" 
                    className="form-control" 
                    id="ciTy" 
                    placeholder="Enter City" 
                    value={city}
                    onChange={e=> setCity(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12">
                    <div className="form-group">
                    <label htmlFor="sTate">State</label>
                    <input type="text" 
                    className="form-control" 
                    id="sTate" 
                    placeholder="Enter State" 
                    value={state}
                    onChange={e=> setState(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12">
                    <div className="form-group">
                    <label htmlFor="zIp">Zip Code</label>
                    <input type="text" 
                    className="form-control" 
                    id="zIp" 
                    placeholder="Zip Code" 
                    value={pincode}
                    onChange={e=> setPincode(e.target.value)}
                    />
                    </div>
                </div>
                </div>
                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-4 text-bold text-primary p-color">Set Password</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12">
                    <div className="form-group">
                    <label htmlFor="Street">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="Street" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                    <label htmlFor="Street"> Confirm Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="Street" 
                    placeholder="ReEnter Password" 
                    value={reEnterPassword}
                    onChange={e=> setReEnterPassword(e.target.value)}
                    />
                    </div>
                </div>
                </div>
                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="sign-btn sign-btn-primaryy rounded-2xl w-50 mt-4 mb-5"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <RingLoader color={"#ffffff"} loading={loading} size={24} />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                    {/* <button type="button" id="submit" name="submit" onClick={handleSubmit} className="btn btn-primary w-80 mb-5 mt4" onClick={handleSubmit} disabled={loading}>{loading ? "Signing..." : "Sign Up" }</button> */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default AgentSignup;
