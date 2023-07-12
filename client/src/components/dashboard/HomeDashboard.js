import React, { useState, useEffect } from 'react';
import './Assets/HomeDashboard.css';
import axios from 'axios';

export default function HomeDashboard() {

    //use state
    const [buyers, setBuyers] = useState(0)
    const [sellers, setSellers] = useState(0)
    const [agents, setAgents] = useState(0)
    const [sell, setSell] = useState(0)
    const [rent, setRent] = useState(0)

    //agent length
    useEffect(() => {
        fetchAllAgents();
        fetchAllUsers();
        fetchAllSellProperty();
        fetchAllRentProperty();
    }, [])

    const fetchAllAgents = async() => {
        const {data} = await axios.get('/Admin/ListActiveAgent');
        await setAgents(data?.result?.length);
        console.log("===", agents)
    }

    //buyer and seller length
    const fetchAllUsers = async() => {
        const {data} = await axios.get('/user/UserList');
        await setBuyers(data?.result?.length);
        setSellers(data?.result?.length);
    }


    // sell property
    const fetchAllSellProperty = async() => {
        const {data} = await axios.get('/property/ListSellProperty');
        console.log("===sell====>>", data);
        setSell(data?.result?.length);
    }

    // rent property
    const fetchAllRentProperty = async() => {
        const {data} = await axios.get('/property/ListRentProperty');
        console.log("====rent===>>", data);
        setRent(data?.result?.length);
    }



  return (
    <div className='cbuig-div'>

        <div className='d-flex container-div'>
            <div className="card text-bg-primary mb-3 m-5 mycolor" style={{maxWidth: '18rem',height:"14rem"}}>
                
                <div className="card-body">
                <h5 className="card-title center-heading">Total Active Buyers</h5>
                <p className="card-text center-heading">{buyers}</p>
                </div>
            </div>
            <div className="card text-bg-secondary mb-3 m-5" style={{maxWidth: '18rem',height:"14rem"}}>
                <div className="card-body">
                <h5 className="card-title center-heading">Total Active Sellers</h5>
                <p className="card-text center-heading">{sellers}</p>
                </div>
            </div>
            <div className="card text-bg-success mb-3 m-5 mycolor" style={{maxWidth: '18rem',height:"14rem"}}>
                
                <div className="card-body">
                <h5 className="card-title center-heading">Total Active Properties for Sell</h5>
                <p className="card-text center-heading">{sell}</p>
                </div>
            </div>
            
            <div className="card text-bg-secondary mb-3 m-5" style={{maxWidth: '18rem',height:"14rem"}}>
              
                <div className="card-body">
                <h5 className="card-title center-heading">Total Active Properties for Rent</h5>
                <p className="card-text center-heading">{rent}</p>
                </div>
            </div>
            <div className="card text-bg-secondary mb-3 m-5 mycolor" style={{maxWidth: '18rem',height:"14rem"}}>
                
                <div className="card-body">
                <h5 className="card-title center-heading">Total Authorised Agents</h5>
                <p className="card-text center-heading">{agents}</p>
                </div>
            </div>
        </div>

    </div>
  )
}
