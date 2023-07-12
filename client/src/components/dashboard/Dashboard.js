import React from 'react';
import { useAuth } from '../../context/auth';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import './Dashboard.css'; 

const Dashboard = () => {
  const [auth] = useAuth(); 

  const getDashboardHeading = () => {
    let heading = 'Dashboard';

    switch (auth.userType) {
      case 'SELLER':
        heading = 'Seller Dashboard';
        break;
      case 'BUYER':
        heading = 'Buyer Dashboard';
        break;
      case 'ADMIN':
        heading = 'Admin Dashboard';
        break;
      default:
        break;
    }

    return heading;
  };

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-title">{getDashboardHeading()}</h1> */}
      <div className="dashboard-content">
        <div className="dashboard-section">
        <AdminDashboard/>
        {/* <BuyerDashboard/> */}
          {auth.userType === 'SELLER' && <SellerDashboard />}
          {auth.userType === 'BUYER' && <BuyerDashboard />}
          {auth.userType === 'ADMIN' && <AdminDashboard />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
    




