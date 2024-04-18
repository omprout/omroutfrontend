import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [showMediaIcons, setMediaIcons] = useState(false);

  const handleToggleMediaIcons = () => {
    setMediaIcons(!showMediaIcons);
  };

  return (
    <div className="Navbar">
      <div className="navChild">
        <div className="logo">OPR.</div>

        <ul className={showMediaIcons ? "mobile_list" : "list"}>
          <li>
            <NavLink exact activeClassName to="/">Home</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName to="/About">About</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName to="/Skills">Skills</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName to="/Projects">Projects</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName to="/Contact">Contact</NavLink>
          </li>
        </ul>
        {showMediaIcons ? (
          <div className="cros_menu" onClick={handleToggleMediaIcons}>
            <RxCross2 />
          </div>
        ) : (
          <div className="hamburger_menu" onClick={handleToggleMediaIcons}>
            <GiHamburgerMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
