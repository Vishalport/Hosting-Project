import React, { useState, useEffect } from 'react';
import "./Assets/AllUser.css";
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';


dayjs.extend(relativeTime);


export default function AllUsers() {
    //use state
    const [users, setUsers] = useState();

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async() => {
        const {data} = await axios.get('/user/UserList');
        await setUsers(data?.result);
        console.log("----user data--->", data);
        console.log("===", users)
    }


  return (
    <div>
        <div className='mb-4 d-flex justify-content-between'>
            <div><h1 className="user-heading">All Users</h1></div>
            <div><button className={`length-btn mt-2 mr-2 `}>Total Users : {users?.length}</button></div>
        </div>
        <div className='d-flex user-div'>

            {users?.map((user)=> (
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
                        <p className="card-text user-username-font text-muted mb-1 mt-1">
                        {user?.mobileNumber && (<p>+91 {user?.mobileNumber} </p>)}
                        </p>
                        <p className="card-text user-name-font">
                        {user?.email}
                        </p>
                    </div>
                    </div>
                    <div className="col-md-4">
                    <div className="card-body">
                      <p className="card-text user-username-font">
                        Total Liked Property : {user?.wishlist?.length}
                        </p>
                        <p className="card-text user-username-font text-muted">
                         <b>Address -</b> {user?.address}
                        </p>
                        <p className="card-text user-username-font text-muted">
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
