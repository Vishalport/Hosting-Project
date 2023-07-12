import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RiBuilding2Line,
  RiUserLine,
  RiAccountCircleLine,
  RiLogoutCircleLine,
  RiAddLine,
} from "react-icons/ri";
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import "./SellerDashboard.css";
import { useAuth } from "../../context/auth";
import NavBar from "../navbar/Navbar";
import AdPropertyForm from "./Forms/AdProperty";

import { IonToggle } from "@ionic/react";

const SellerDashboard = () => {
  const [totalActiveSellProperties, setTotalActiveSellProperties] = useState(0);
  const [totalActiveRentProperties, setTotalActiveRentProperties] = useState(0);
  const [totalSoldSellProperties, setTotalSoldSellProperties] = useState(0);
  const [totalSoldRentProperties, setTotalSoldRentProperties] = useState(0);
  const [totalBlockedSellProperties, setTotalBlockedSellProperties] =
    useState(0);
  const [totalBlockedRentProperties, setTotalBlockedRentProperties] =
    useState(0);
  const [activeItem, setActiveItem] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sideBarOff, setSideBarOn] = useState(true);
  const [showAdPropertyForm, setShowAdPropertyForm] = useState(false); // New state

  //context
  const [auth, setAuth] = useAuth();

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
      .get("/api/seller/dashboard")
      .then((response) => {
        const {
          totalActiveSellProperties,
          totalActiveRentProperties,
          totalSoldSellProperties,
          totalSoldRentProperties,
          totalBlockedSellProperties,
          totalBlockedRentProperties,
        } = response.data;
        setTotalActiveSellProperties(totalActiveSellProperties);
        setTotalActiveRentProperties(totalActiveRentProperties);
        setTotalSoldSellProperties(totalSoldSellProperties);
        setTotalSoldRentProperties(totalSoldRentProperties);
        setTotalBlockedSellProperties(totalBlockedSellProperties);
        setTotalBlockedRentProperties(totalBlockedRentProperties);
      })
      .catch((error) => {
        console.error("Error fetching seller dashboard data:", error);
      });
  }, []);

  const handleItemClick = (item) => {
    setActiveItem((prevItem) => (prevItem === item ? "" : item));
    if (showAdPropertyForm === true) {
      setShowAdPropertyForm(false);
    }
  };

  const logoutHandler = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
  };

  const handleSidebarToggle = () => {
    setSideBarOn(!sideBarOff);
    setShowSidebar(!showSidebar);
  };

  const handleAddPropertyClick = () => {
    setActiveItem("addProperty");
    setShowAdPropertyForm(!showAdPropertyForm);
  };

  return (
    <>
      <NavBar />
      <h2 className="admin-dashboard-title">Seller Dashboard</h2>

      {sidebarVisible && window.innerWidth <= 768 ? (
        <button>
          {sideBarOff ? (
            <BsToggleOff
              className="toggle-icon"
              onClick={handleSidebarToggle}
            />
          ) : (
            <BsToggleOn className="toggle-icon" onClick={handleSidebarToggle} />
          )}
        </button>
      ) : null}
      <div className="seller-dashboard-container">
        {showSidebar && (
          <div className="sidebar">
            {/* Sidebar items */}
            <div
              className={`sidebar-item ${
                activeItem === "activeProperties" ? "active" : ""
              }`}
              onClick={() => handleItemClick("activeProperties")}
            >
              <span className="sidebar-icon">
                <RiBuilding2Line />
              </span>
              Active Properties
              {activeItem === "activeProperties" && (
                <div className="sub-menu">
                  <button>Sell</button>
                  <button>Rent</button>
                </div>
              )}
            </div>

            <div
              className={`sidebar-item ${
                activeItem === "soldProperties" ? "active" : ""
              }`}
              onClick={() => handleItemClick("soldProperties")}
            >
              <span className="sidebar-icon">
                <RiBuilding2Line />
              </span>
              Sold Properties
              {activeItem === "soldProperties" && (
                <div className="sub-menu">
                  <button>Sell</button>
                  <button>Rent</button>
                </div>
              )}
            </div>

            <div className="sidebar-item">
              <span className="sidebar-icon">
                <RiBuilding2Line />
              </span>
              Blocked Properties
              {activeItem === "blockedProperties" && (
                <div className="sub-menu">
                  <button>Sell</button>
                  <button>Rent</button>
                </div>
              )}
            </div>

            <div className="sidebar-item" onClick={handleAddPropertyClick}>
              <span className="sidebar-icon">
                <RiAddLine />
              </span>
              Add Property
            </div>

            <div className="sidebar-item">
              <span className="sidebar-icon">
                <RiAccountCircleLine />
              </span>
              Account
            </div>
            <div className="sidebar-item" onClick={logoutHandler}>
              <span className="sidebar-icon">
                <RiLogoutCircleLine />
              </span>
              Logout
            </div>
          </div>
        )}

        <div className="main-content">
          {/* Display content based on selected menu */}
        </div>
        <div class="side-form">
          {showAdPropertyForm && <AdPropertyForm className="adForm" />}
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
