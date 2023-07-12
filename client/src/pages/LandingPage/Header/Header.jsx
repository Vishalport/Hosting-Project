import { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
export default function Header() {

  //context
  const [auth,setAuth] = useAuth() 
  console.log(auth,">>>>auth from landing")
  const [menuOpened, setMenuOpened] = useState(false);
  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }

  };
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <h1 className="primaryText">EstateExpress</h1>
        {/* <img src='./logo.png' alt='logo' width={100}/> */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <Link to="/home">Get started</Link>
            {auth?.token==="" && auth?.refreshToken==="" && <Link to="/login">Login</Link>}
            <button className="button" href="">
              Contact
            </button>
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpened(!menuOpened)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}
