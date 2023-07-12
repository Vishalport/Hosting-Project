import React, { useState, useEffect } from 'react';
import "./Assets/AllAgents.css";
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';


dayjs.extend(relativeTime);


export default function AllAgents() {
    //use state
    const [agents, setAgents] = useState();

    useEffect(() => {
        fetchAllAgents();
    }, [])

    const fetchAllAgents = async() => {
        const {data} = await axios.get('/Admin/ListActiveAgent');
        await setAgents(data?.result);
        console.log("----Agent data--->", data);
        console.log("===", agents)
    }


  return (
    <div>
        <div className='mb-4 d-flex justify-content-between'>
            <div><h1 className="user-heading">All Authorised Agents</h1></div>
            <div><button className={`length-btn mt-2 mr-2 `}>Total Agents : {agents?.length}</button></div>
        </div>
        <div className='d-flex user-div'>

            {agents?.map((user)=> (
                <div className="card mb-3 user-card" style={{minWidth: "95%"}} >
                <div className="row g-0">
                    <div className="col-md-2">
                    <img src={user?.images ? user?.images : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="user pics" className="m-auto"/>
                    </div>
                    <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title user-name-font">{user?.firstName} {user?.lastName}</h5>
                        <p className="card-text user-username-font">
                        {user?.userName}
                        </p>
                        <p className="card-text user-username-font text-muted mb-1 mt-1 font-agent">
                        {user?.mobileNumber && (<p>+91 {user?.mobileNumber} </p>)}
                        </p>
                        <p className="card-text user-name-font font-agent">
                        {user?.email}
                        </p>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="card-body">
                      <p className="card-text user-username-font text-agent ">
                        <b>Adhaar id :</b> {user?.adhar}
                        </p>

                        <p className="card-text user-username-font text-muted text-agent mt-1 mb-1">
                         <b>Pan Card :</b> {user?.pan}
                        </p>

                        <p className="card-text user-username-font text-muted text-agent">
                         <b>Address :</b> {user?.address}
                        </p>
                        
                        <p className="card-text user-username-font text-muted text-agent">
                        {user?.state}
                        </p>
                    </div>
                    </div>
                    <div className="col-md-2">
                    <div className="card-body">                        
                        <Link to={`/view-profile/${user?._id}`} ><button className='user-btn'>View Profile</button> </Link>
                        <p className="card-text text-muted user-joined mt-1">
                          Joined {dayjs(user.createdAt).fromNow()}
                        </p>
                    </div>
                    </div>
                </div>
                </div>                
            ))}

        </div>
    </div>
  )
}
