import React, { useEffect } from 'react';
import "./Assets/ViewProfile.css";
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import NavBar from '../navbar/Navbar';



export default function ViewProfile() {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const params = useParams();

    console.log("====", params.id)

    //use effect
    useEffect(()=>{
        ViewProfile();
    }, [])
    
 const ViewProfile = async() => {
    try{
        const {data} = await axios.get(`/Admin/getAgentProfile/${params.id}`)
        console.log("====----->", data);

        setUser(data?.result);
        setLoading(false);
    }catch(err){
        console.log(err);
        setLoading(false);
    }
 }   



  return (
    <div className='my-body'>
        <NavBar />
        {loading ? <p>Loading ...</p> : (
            <div class="container mt-5 pt-5">
            <div className="row gutters">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 aside_section">
                <div className="card h-100">
                <div className="card-body">
                    <div className="account-settings">
                    <div className="user-profile">
                        <div className="user-avatar">
                        <img 
                        src={user?.images ? user?.images : "https://bootdey.com/img/Content/avatar/avatar7.png"} 
                        alt="uploaded-pic" 
                        className='m-auto'/>
                        </div>
                        {user?.pan ? 
                        <h5 className="user-name id-text"><b>Agent Id :</b> {user?._id}</h5> : 
                        <h5 className="user-name">{user?.firstName} {user?.lastName}</h5>
                        }
                        <h6 className="user-email">{user?.email}</h6>
                    </div>
                    <div className="about">
                        <h5 className='p-color'>About</h5>
                        <p className='text-muted'>{user?.about ? user?.about : "I am single, not merried yet but lives with my family and looking for a property"}</p>
                    </div>
                    {user?.pan ? "" : (
                        <div className="about d-flex m-auto mt-4 justify-content-center">
                            <h5 className='fxnx-heading'>Total Property Liked : </h5>
                            <h5 className='fxnx-heading'> {user?.wishlist?.length}</h5>
                        </div>
                    )}
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
    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label>First Name</label>
                        <p>{user?.firstName}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label>Last Name</label>
                        <p>{user?.lastName}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label >Username</label>
                        <p>{user?.userName}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <p>{user?.mobileNumber}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mr-10">
                        <div className="form-group">
                        <label htmlFor="website">Date of Birth</label>
                        <p>{user?.dateOfBirth}</p>
                        </div>
                    </div>
                    <div className="col-xl-11 col-lg-11 col-md-12 col-sm-6 col-12">
                        <div className="form-group">
                        <label>About</label>
                        <p>{user?.about}</p>
                        </div>
                    </div>
                    </div>

                    {user?.adhar && (
                        <div className="row gutters mt-4 mb-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-2 text-primary p-color">Id Details</h6>
                        </div>
        
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label>Adhaar Number</label>
                            <p>{user?.adhar}</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                            <label>Pan Card Number</label>
                            <p>{user?.pan}</p>
                            </div>
                        </div>
                        </div>
                    )}
    
                    <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary p-color">Address Details</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label htmlFor="Street">Street</label>
                        <p>{user?.address}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label htmlFor="ciTy">City</label>
                        <p>{user?.city}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label htmlFor="sTate">State</label>
                        <p>{user?.state}</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                        <label htmlFor="zIp">Zip Code</label>
                        <p>{user?.pinCode}</p>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        ) }         
    </div>
  )
}
