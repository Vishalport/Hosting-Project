import React, { useState, useEffect } from 'react';
import './Assets/UserRequest.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


export default function UserRequest() {

  //use state
  const [requests, setRequests] = useState();

  useEffect(() => {
    fetchAllUserRequest();
    
  }, [])

  

  // fetch user details
  const fetchAllUserRequest = async() => {
      const {data} = await axios.get('/Admin/listPending_UserRequest_forAgent');
      await setRequests(data?.result);
      console.log("----user requested data--->", data);
      console.log("===", requests)
  }

  return (
    <div className='p-4'>
      <div className='mb-4 d-flex justify-content-between'>
        <div><h1 className="user-heading">All User's Request</h1></div>
        <div><button className={`length-btn mt-2 mr-2 `}>Total Request : {requests?.length}</button></div>
      </div>
        <div className='d-flex user-div'>

            {requests?.map((request)=> (
                <div className="card mb-3 user-card" style={{minWidth: "95%"}} >
                <div className="row g-0">
                    <div className="col-md-2">
                    <img src={request?.images ? request?.images : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="user pics" className="m-auto"/>
                    </div>
                    <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title user-name-font">Name: {request?.name}</h5>
                        <p className="card-text user-username-font text-muted mb-1 mt-1">
                        {request?.mobileNumber && (<p>+91 {request?.mobileNumber} </p>)}
                        </p>
                        <p className="card-text user-username-font text-muted">
                          <b>Message : </b>{request?.message}
                        </p>
                        <p className="card-text text-muted user-joined mt-1">
                          Request Raised {dayjs(request.createdAt).fromNow()}
                        </p>
                    </div>
                    </div>

                   {/* property details */}
                    <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title user-name-font">Property Name: {request?.propertyId[0]?.name}</h5>
                        <p className="card-text user-username-font text-muted mb-1 mt-1">
                        Price: {request?.propertyId[0]?.price}
                        </p>
                        <p className="card-text user-username-font text-muted">
                          <b>Address: </b>{request?.propertyId[0]?.address}
                        </p>
                        <p className="card-text text-muted user-joined mt-1">
                          Property added {dayjs(request?.propertyId[0]?.createdAt).fromNow()}
                        </p>
                    </div>
                    </div>
                
                    <div className="col-md-2">
                    <div className="card-body text-center">                        
                        <Link to={`/view-profile/${request?.userId}`} ><button className='user-btn btn_d123'> User Profile</button> </Link>
                        <Link to={`/properties/${request?.propertyId[0]?._id}`} ><button className='user-btn btn_d123'> View Property</button> </Link>
                        <Link to={`/view-profile/${request?.userId}`} ><button className='user-btn text-center btn_d123'>Assign Agent</button> </Link>
                    </div>
                    </div>
                </div>
                </div>                
            ))}

        </div>
      </div>
  )
}
