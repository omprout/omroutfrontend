import React from "react";
import "./Error404.css";
import { NavLink } from "react-router-dom";


const Error404 = () => {
  return (
    <div className="Error404">
      <img className="ErrorImage" src="https://i.imgur.com/qIufhof.png" alt="404Image" />
          <div id="info">
              <h1 className="fourZeroFour">404</h1>
              <h3>This page could not be found</h3>
              <NavLink className="navlink" exact activeClassName to="/">🔗 Go back to Home Page </NavLink>
      </div>
    </div>
  );
};

export default Error404;
