import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/userContext';


import BurguerMenu from "../BurguerMenu/BurguerMenu"
import "../../styles/components/_nav.scss";

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="nav">
      <div className="nav__burguermenu">
        <BurguerMenu pageWrapId={"page-wrap"} outerContainerId={"App"} width="375px" />
      </div>
      <div className="nav__logo">
        <img className="nav__logo__logo1" src="/assets/images/gaviota_logo.png" alt="Digital And Nomads" />
        <img className="nav__logo__logo2" src="/assets/images/Naming.png" alt="Digital And Nomads" />
      </div>
      {(user.isLoggedIn === false) ?
        (
          <div className="nav__login_button">
            <Link className="nav__login_button_link" to={"/login"}>Log in</Link>
          </div>
        )
        : (
          <Link className="nav__login_button_link" to={"/profile"}><img src={user.avatar} alt={user.name} className="map_avatar" /></Link>
          
        )
      }




    </nav>
  )
};

export default Nav;