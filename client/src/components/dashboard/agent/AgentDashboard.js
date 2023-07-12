import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  RiBuilding2Line,
  RiUserLine,
  RiAccountCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import "./AgentDashboard.css";
import { useAuth } from "../../../context/auth";
import AgentProfile from "./AgentProfile";
import Notification from "../Notification";

const AgentDashboard = () => {
  const [totalActiveVisiting, setTotalActiveVisiting] = useState([]);
  const [totalSoldVisiting, setTotalSoldVisiting] = useState([]);
  const [showActiveVisiting, setShowActiveVisiting] = useState(true);
  const [showSoldVisiting, setShowSoldVisiting] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPendings, setShowPendings] = useState(false);

  const [showAccount, setShowAccount] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sideBarOff, setSideBarOn] = useState(true);

  // context
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
        setShowSidebar(true);
      }
    };
    handleResize();
  }, []);

  useEffect(() => {
    axios
      .get("/api/agent/dashboard")
      .then((response) => {
        const { totalActiveVisiting, totalSoldVisiting } = response.data;
        setTotalActiveVisiting(totalActiveVisiting);
        setTotalSoldVisiting(totalSoldVisiting);
      })
      .catch((error) => {
        console.error("Error fetching agent dashboard data:", error);
      });
  }, []);

  const handleVisitingClick = () => {
    if (showSoldVisiting) {
      setShowSoldVisiting(false);
    }
  };

  const logoutHandler = () => {
    setAuth("");
    localStorage.removeItem("auth");
    navigate("/adminLogin");
  };

  const handleSidebarToggle = () => {
    setSideBarOn(!sideBarOff);
    setShowSidebar(!showSidebar);
  };

  const handleSoldVisitingClick = () => {
    setShowNotifications(false);
    setShowAccount(false);
    setShowActiveVisiting(false);
    setShowSoldVisiting(true);
    setShowPendings(false);
  };
  const handleActiveVisitingClick = () => {
    setShowNotifications(false);
    setShowAccount(false);
    setShowPendings(false);

    setShowActiveVisiting(true);
    setShowSoldVisiting(false);
  };
  const handleVisitingItemClick = () => {
    setShowNotifications(false);
    setShowAccount(false);
    setShowPendings(false);
  };

  const handleNotificationsItemClick = () => {
    setShowActiveVisiting(false);
    setShowSoldVisiting(false);
    setShowNotifications(true);
    setShowPendings(false);

    setShowAccount(false);
  };

  const handlePendingItemClick = () => {
    setShowActiveVisiting(false);
    setShowSoldVisiting(false);
    setShowNotifications(false);
    setShowPendings(true);
    setShowAccount(false);
  };

  const handleAccountItemClick = () => {
    setShowActiveVisiting(false);
    setShowSoldVisiting(false);
    setShowNotifications(false);
    setShowAccount(true);
    setShowPendings(false);
  };

  return (
    <>
      <div className="agent-dashboard">
        {/* sidebars and display screen */}
        <div className="d-flex">
          <div>
            <div className={`sidebar-agent ${showSidebar ? "active" : ""}`}>
              <div className="sidebar-item" onClick={handleVisitingItemClick}>
                <span className="sidebar-icon mr-2">
                  <RiBuilding2Line />
                </span>
                Total Visiting
              </div>

              <div className="sidebar-item" onClick={handlePendingItemClick}>
                <span className="sidebar-icon mr-2">
                  <RiBuilding2Line />
                </span>
                Pending Visiting
              </div>

              <div
                className="sidebar-item"
                onClick={handleNotificationsItemClick}
              >
                <span className="sidebar-icon mr-2">
                  <RiUserLine />
                </span>
                Notifications
              </div>

              <div className="sidebar-item" onClick={handleAccountItemClick}>
                <span className="sidebar-icon mr-2">
                  <RiAccountCircleLine />
                </span>
                Account
              </div>
              <div className="sidebar-item" onClick={logoutHandler}>
                <span className="sidebar-icon mr-2">
                  <RiLogoutCircleLine />
                </span>
                Logout
              </div>
            </div>
          </div>

          <div>
            {/* content displays */}
            <div className="display-content dash-content">
              <div className="notification-display">
                {showNotifications && <h1>notifications</h1>}
              </div>

              {showAccount && (
                <div className="pro-dash">
                  <AgentProfile />
                </div>
              )}

              {showPendings && <h1>pending visiting</h1>}
              {!showNotifications && !showAccount && !showPendings && (
                <div className="visiting-properties">
                  <button
                    className={`btn mt-2 button_dash ${
                      showActiveVisiting ? "active" : ""
                    }`}
                    onClick={handleActiveVisitingClick}
                  >
                    Active Visiting
                  </button>
                  <button
                    className={`btn mt-2 ml-2 button_dash ${
                      showSoldVisiting ? "active" : ""
                    }`}
                    onClick={handleSoldVisitingClick}
                  >
                    Sold Visiting
                  </button>

                  {showSoldVisiting ? (
                    <div>
                      <h1>Sold</h1>
                      {/* Render sold visiting properties */}
                      {totalSoldVisiting.map((property) => (
                        <div key={property.id}>
                          {/* Render property details */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h1>Active</h1>
                      {/* Render active visiting properties */}
                      {totalActiveVisiting.map((property) => (
                        <div key={property.id}>
                          {/* Render property details */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;
