import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  RiBuilding2Line,
  RiUserLine,
  RiAccountCircleLine,
  RiLogoutCircleLine,
  RiUserStarLine,
} from "react-icons/ri";
import { BsPeople } from "react-icons/bs";

import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import "./AdminDashboard.css";
import { useAuth } from "../../context/auth";
import NavBar from "../navbar/Navbar";
import Notification from "./Notification";
import Profile from "../../pages/Profile/Profile";
import AllUsers from "./AllUsers";
import AllAgents from "./AllAgents";
import HomeDashboard from "./HomeDashboard";

// import { IonToggle } from "@ionic/react";

const AdminDashboard = () => {
  const [totalActiveSellers, setTotalActiveSellers] = useState(0);
  const [totalActiveBuyers, setTotalActiveBuyers] = useState(0);
  const [totalSoldProperties, setTotalSoldProperties] = useState(0);
  const [totalActiveProperties, setTotalActiveProperties] = useState(0);
  const [totalSoldRentProperties, setTotalSoldRentProperties] = useState([]);
  const [totalSoldSellProperties, setTotalSoldSellProperties] = useState([]);
  const [showSoldRentProperties, setShowSoldRentProperties] = useState(false);
  const [showSoldSellProperties, setShowSoldSellProperties] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [agents, setAgents] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sideBarOff, setSideBarOn] = useState(true);
  const [activeSubItem, setActiveSubItem] = useState("");

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
      .get("/api/admin/dashboard")
      .then((response) => {
        const {
          totalActiveSellers,
          totalActiveBuyers,
          totalSoldProperties,
          totalActiveProperties,
        } = response.data;
        setTotalActiveSellers(totalActiveSellers);
        setTotalActiveBuyers(totalActiveBuyers);
        setTotalSoldProperties(totalSoldProperties);
        setTotalActiveProperties(totalActiveProperties);
      })
      .catch((error) => {
        console.error("Error fetching admin dashboard data:", error);
      });

    axios
      .get("/api/admin/sold-properties")
      .then((response) => {
        const { soldRentProperties, soldSellProperties } = response.data;
        setTotalSoldRentProperties(soldRentProperties);
        setTotalSoldSellProperties(soldSellProperties);
        setShowSoldRentProperties(true);
        setShowSoldSellProperties(true);
      })
      .catch((error) => {
        console.error("Error fetching sold properties:", error);
      });

    axios
      .get("/api/admin/user-management")
      .then((response) => {
        setUsers(response.data.users);
        setShowUserManagement(true);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    axios
      .get("/api/admin/agents")
      .then((response) => {
        const agentsData = response.data;
        setAgents(agentsData);
        setShowAgents(true);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, []);

  // const handleSoldPropertiesClick = () => {
  //   axios
  //     .get("/api/admin/sold-properties")
  //     .then((response) => {
  //       const { soldRentProperties, soldSellProperties } = response.data;
  //       setTotalSoldRentProperties(soldRentProperties);
  //       setTotalSoldSellProperties(soldSellProperties);
  //       setShowSoldRentProperties(true);
  //       setShowSoldSellProperties(true);
  //       setShowUserManagement(false);
  //       setShowAgents(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching sold properties:", error);
  //     });
  // };

  // const handleUserManagementClick = (userType) => {
  //   axios
  //     .get(`/api/admin/user-management/${userType}`)
  //     .then((response) => {
  //       setUsers(response.data.users);
  //       setShowUserManagement(true);
  //       setShowSoldRentProperties(false);
  //       setShowSoldSellProperties(false);
  //       setShowAgents(false);
  //       setActiveSubItem(userType); // Add this line to set the activeSubItem state
  //       console.log(activeSubItem)
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //     });
  // };

  // const handleUserManagementSubMenuClick = (usertype) => {
  //   setActiveItem("user");
  //   setActiveSubItem(usertype);
  // };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const logoutHandler = () => {
    setAuth("");
    localStorage.removeItem("auth");
    navigate("/adminLogin");
  };

  // const handleSidebarToggle = () => {
  //   setSideBarOn(!sideBarOff);
  //   setShowSidebar(!showSidebar);
  // };

  const handleActivePropertiesSubMenuClick = (propertyType) => {
    setActiveItem("properties");
    setActiveSubItem(propertyType);
  };

  // const handleAgentsClick = () => {
  //   axios
  //     .get("/api/admin/agents")
  //     .then((response) => {
  //       const agentsData = response.data;
  //       setAgents(agentsData);
  //       setShowAgents(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching agents:", error);
  //     });
  // };

  const handleSoldPropertiesSubMenuClick = (propertyType) => {
    setActiveItem("soldProperties");
    setActiveSubItem(propertyType);
  };

  return (
    <>
      {/* sidebars and display screen */}
      <NavBar />
      <div className="d-flex">
        <div>
          <div className="sidebar-admin mt-10 dash-cont">
            <div
              className="sidebar-item mt-2 mb-4 not_dash"
              onClick={() => handleItemClick("")}
            >
              <span className="sidebar-icon mr-2">
                <i class="fa-solid fa-home" />
              </span>
              Data
            </div>

            <div

              className={`sidebar-item mt-2 mb-4 not_dash d-flex ${
                activeItem === "properties" ? "active" : ""
              }`}
              onClick={() => handleItemClick("properties")}
            >
              <span className="sidebar-icon mr-2">
                <RiBuilding2Line />
              </span>
              Active Properties
              {activeItem === "properties" && (
                <div className="sub-menu">
                  <button
                    onClick={() => handleActivePropertiesSubMenuClick("sell")}
                  >
                    Sell
                  </button>

                  <button
                    onClick={() => handleActivePropertiesSubMenuClick("rent")}
                  >
                    Rent
                  </button>
                </div>
              )}
            </div>

            <div
              className={`sidebar-item mt-2 mb-4 not_dash d-flex ${
                activeItem === "soldProperties" ? "active" : ""
              }`}
              onClick={() => handleItemClick("soldProperties")}
            >
              <span className="sidebar-icon mr-2">
                <RiBuilding2Line />
              </span>
              Sold Properties
              {activeItem === "soldProperties" && (
                <div className="sub-menu">
                  <button
                    onClick={() => handleSoldPropertiesSubMenuClick("sell")}
                  >
                    Sell
                  </button>

                  <button
                    onClick={() => handleSoldPropertiesSubMenuClick("rent")}
                  >
                    Rent
                  </button>
                </div>
              )}
            </div>




            {/* notification */}

            <div
              className="sidebar-item mt-2 mb-4 not_dash"
              onClick={() => handleItemClick("notification")}
            >
              <span className=" mr-2">
                <i class="fa-solid fa-bell" />
              </span>
              Notification
            </div>

            <div
              className="mt-2 mb-4 not_dash d-flex sidebar-item"
              onClick={() => handleItemClick("user")}
            >
              <span className="sidebar-icon mr-2 pt-1">
                <RiUserLine />
              </span>
              Users
            </div>

            <div
              className="mt-2 mb-4 not_dash d-flex sidebar-item"
              onClick={() => handleItemClick("agents")}
            >
              <span className="sidebar-icon mr-2 pt-1">
                <BsPeople />
              </span>
              Agents
            </div>

            <div
              className="sidebar-item mt-2 mb-4 not_dash d-flex"
              onClick={() => handleItemClick("account")}
            >
              <span className="sidebar-icon mr-2">
                <RiAccountCircleLine />
              </span>
              Account
            </div>

            <div
              className="sidebar-item mt-2 mb-4 not_dash d-flex"
              onClick={logoutHandler}
            >
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
            {activeItem === "" && (
              <div className="agent-management">
                <HomeDashboard />
              </div>
            )}

            {activeItem === "properties" && (
              <div className="active-properties">
                <h3>Active Properties</h3>

                {activeSubItem === "sell" && (
                  <div>
                    {/* Render active sell properties */}active sell property
                  </div>
                )}

                {activeSubItem === "rent" && (
                  <div>
                    {/* Render active rent properties */}active rent property
                  </div>
                )}
              </div>
            )}

            {activeItem === "soldProperties" && (
              <div className="sold-properties">
                <h3>Sold Properties</h3>

                {activeSubItem === "sell" && (
                  <div>
                    {/* Render sold sell properties */}sold sell property
                  </div>
                )}

                {activeSubItem === "rent" && (
                  <div>
                    {/* Render sold rent properties */}sold rent property
                  </div>
                )}
              </div>
            )}

            {activeItem === "notification" && <Notification />}

            {activeItem === "account" && (
              <div className="pro-dash">
                <Profile />
              </div>
            )}

            {activeItem === "user" && (
              <div className="user-management">
                {" "}
                <AllUsers />{" "}
              </div>
            )}

            {activeItem === "agents" && (
              <div className="agent-management">
                <AllAgents />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// internal css
const styles = {
  dashContent: {
    width: "72vw",
    backgroundColor: "white",
    top: "20vh",
    left: "26vw",
  },
};

export default AdminDashboard;
