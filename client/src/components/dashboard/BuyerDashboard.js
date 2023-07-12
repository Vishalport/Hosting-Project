import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerDashboard.css'; 
import { useAuth } from '../../context/auth';
import NavBar from '../navbar/Navbar';

const BuyerDashboard = () => {

  const[auth, setAuth] = useAuth()
  const [availableProperties, setAvailableProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [enquiredProperties, setEnquiredProperties] = useState([]);
  const [agent, setAgent] = useState([]);
  const [property, setProperty] = useState([]);

  useEffect(() => {
    axios
      .get('/api/buyer/dashboard')
      .then((response) => {
        const data = response.data;
        setAvailableProperties(data.availableProperties);
        setWishlist(data.wishlist);
        setEnquiredProperties(data.enquiredProperties);
      })
      .catch((error) => {
        console.error('Error fetching buyer dashboard data:', error);
      });
  }, []);

  return (
    <div className="buyer-dashboard">
      {/* <NavBar/> */}
      <h2 className="buyer-dashboard-title">{auth?.email}Dashboard</h2>
      <div className="buyer-properties">
        {availableProperties.map((property) => (
          <div key={property.id} className="property-card">
            {/* Render property card */}
          </div>
        ))}
      </div>
      <div className="buyer-summary">
        <div className="summary-item">
          <h4>Wishlist</h4>
          <span className="summary-value">{wishlist.length}</span>
        </div>
        <div className="summary-item">
          <h4>Enquired Properties</h4>
          <span className="summary-value">{enquiredProperties.length}</span>
        </div>
      </div>

      <br/><hr/><br/>

      <div className="buyer-summary">
        <div className="summary-item">
          <h4>Assign Agent</h4>
          <span className="summary-value">{agent.length}</span>
        </div>
        <div className="summary-item">
          <h4>totale Buy Proeprty</h4>
          <span className="summary-value">{property.length}</span>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
