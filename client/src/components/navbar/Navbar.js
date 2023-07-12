import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/auth";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '@media (min-width: 768px)': {
    // Keep the same styles for screens larger than 768px
    top: '23%',
    left: '85%',
    transform: 'translate(-50%, -50%)',
  },
};

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //hooks
  const navigate = useNavigate();
  //context
  const [auth, setAuth] = useAuth();
  console.log(" from nav----->auth", auth);

  const loginHandler = () => {
    setShowLogin(true);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setAuth("");
    localStorage.removeItem("auth");
    navigate("/");
  };

  
  return (
    <div className="nav-container">
      <nav className="nav">
        <div className="logo">
          <h2 className="app-name">EstateExpress</h2>
          <p className="slogan">
            Unlock Your Dream Property with EstateExpress!
          </p>
        </div>

        <div className="seh-bar">
          <input className="search-input" type="text" placeholder="Enter City" />
          <button className="search-button rounded-2xl">
            <i class="fa-solid fa-magnifying-glass" />
          </button>
        </div>

        <div className={`nav-links ${showMenu ? "show" : ""}`}>
          {auth?.token  ? (
             auth?.user?.userType === "USER" ? (
              <div className="navlink-items">
              {/* <NavLink className="nav-link" to="/search">
                Search
              </NavLink> */}

              <NavLink className="nav-link" to="/buy">
                Buy
              </NavLink>

              <NavLink className="nav-link" to="/Rent">
                Rent
              </NavLink>

                <NavLink className="nav-link">
                <FontAwesomeIcon onClick={handleOpen} icon={faBell} />
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Notifications
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    📢📢📢📢📢📢📢📢
                    {/* render notification card here */}
                    </Typography>
                  </Box>
                </Modal>
              </NavLink>

              <button
                type="button"
                className="btn user-icon-btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-user" />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <span className="span-username">
                    {auth?.user?.name ? auth?.user?.name : auth?.user?.userName}
                  </span>
                </li>
                <li>
                  <Link className="dropdown-item" to="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                
                <li>
                  <Link className="dropdown-item" to="/sellProperty">
                    Sell Property
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/wishlist">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/changePassword">
                    Settings
                  </Link>
                </li>

                <li className=" dropdown-item" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
            ) : (
              <div className="navlink-items">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>

                <NavLink className="nav-link" to="/Dashboard">
                  Dashboard
                </NavLink>
              </div>
            )
            
          ) : (
            <div className="auth-buttons">
              <NavLink className="nav-link" to="/adminLogin">
                Admin Login
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
        <div
          className={`menu-toggle ${showMenu ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
