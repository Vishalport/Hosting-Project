import React, { useEffect } from 'react';
import "./Profile.css";
import NavBar from '../../components/navbar/Navbar';
import { useAuth } from '../../context/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';



export default function Profile() {

    //use context
    const [auth, setAuth] = useAuth();
    //use states
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [phone, setPhone] = useState();
    const [dob, setDob] = useState();
    const [about, setAbout] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState();
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [loading, setLoading] = useState();

    //use effect
    useEffect(()=>{
        setFirstName(auth.user?.firstName);
        setLastName(auth.user?.lastName);
        setUserName(auth.user?.userName);
        setPhone(auth.user?.mobileNumber);
        setDob(auth.user?.dateOfBirth);
        setAddress(auth.user?.address);
        setCity(auth.user?.city);
        setPincode(auth.user?.pinCode);
        setState(auth.user?.state);
        setPhoto(auth.user?.profilePic);
        setAbout(auth.user?.about);
    }, [])
    
 const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    console.log("==>", city,firstName, lastName, userName, phone);
    try{
        const {data} = await axios.put('/user/editProfile', {
            firstName,
            lastName,
            mobileNumber: phone,
            state,
            address,
            pinCode: pincode,
            dateOfBirth: dob,
            city,
            userName,
            images: photo,
            about
        })
        setAuth({...data, user: data?.result});
        console.log("----data sam after submiting -->", data);
        toast.success("Profile updated successfully !!!");

        //update localstorage
        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data?.result;
        localStorage.setItem("auth", JSON.stringify(fromLS));

        console.log("---- auth  -->", auth);
        setLoading(false);
    }catch(err){
        console.log(err);
        toast.error(err.response.data.responseMessage);
        setLoading(false);
    }
 }   

 //handle pic upload
  const handleUpload = async(e) => {
    e.preventDefault();
    setUploading(true);
    try{
        // console.log(e.target.files);
        const {data} = await axios.post('/file/uploadSingleFiles', e.target?.files);
        console.log("---> data of image", data);
        setPhoto(data?.result);
        toast.success("Pic uploaded")
        setUploading(false);
    }catch(err){
        console.log(err);
        setUploading(false);
        toast.error(err.response?.data?.responseMessage);
    }
  }


  return (
    <div>
        <NavBar />
        <div class="container pro142">
        <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 aside_section">
            <div className="card h-100">
            <div className="card-body">
                <div className="account-settings">
                <div className="user-profile">
                    <div className="user-avatar">
                    <img 
                    src={auth.user?.images ? auth.user?.images : "https://bootdey.com/img/Content/avatar/avatar7.png"} 
                    alt="uploaded-pic" 
                    className='m-auto'/>
                    </div>
                    <h5 className="user-name">{auth.user?.userName}</h5>
                    <h6 className="user-email">{auth.user?.email}</h6>
                </div>
                <div className="about">
                    <h5 className='p-color'>About</h5>
                    <p className='text-muted'>{auth.user?.about ? auth.user?.about : "I am single, not merried yet but lives with my family and looking for a property"}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
            <div className="card-body">
                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary p-color">Personal Details</h6>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mr-10">
                    <div className="form-group d-flex">

                    <input 
                    className="form-control mt-4 mb-4 upload-pic col-8"
                    onChange={handleUpload} type="file" 
                    accept="image/*" 
                    placeholder=''
                    />

                     {uploading ? <p className='text-m'>Uploading...</p> : ""}
                    </div>
                    
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                    <label >Username</label>
                    <input type="email" 
                    className="form-control" 
                    placeholder="Enter Username" 
                    value={userName}
                    onChange={e=> setUserName(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" 
                    className="form-control" 
                    id="phone" 
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={e=> setPhone(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mr-10">
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
                <div className="col-xl-11 col-lg-11 col-md-12 col-sm-6 col-12">
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
                    <h6 className="mt-3 mb-2 text-primary p-color">Address</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                    <label htmlFor="Street">Address</label>
                    <input type="name" 
                    className="form-control" 
                    id="Street" 
                    placeholder="Enter Address" 
                    value={address}
                    onChange={e=> setAddress(e.target.value)}
                    />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
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
                    <div className="text-right mt-4">
                    {/* <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button> */}
                    <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Updating..." : "Update" }</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
         
    </div>
  )
}
