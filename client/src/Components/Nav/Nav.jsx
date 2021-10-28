import React from "react";
import { Link } from 'react-router-dom';

import BurguerMenu from "../BurguerMenu/BurguerMenu"
import "../../styles/components/_nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__burguermenu">
        <BurguerMenu pageWrapId={"page-wrap"} outerContainerId={"App"} width="375px" />
      </div>
      <div className="nav__logo">
        <img className="nav__logo__logo1" src="/assets/images/gaviota_logo.png" alt="Digital And Nomads" />
        <img className="nav__logo__logo2" src="/assets/images/Naming.png" alt="Digital And Nomads" />
      </div>
      <div className="nav__login_button">
        <Link className="nav__login_button_link" to={"/login"}>Log in</Link>
      </div>
    </nav>
  )
};

export default Nav;