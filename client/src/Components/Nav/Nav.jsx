import React from "react";

import BurguerMenu from "../BurguerMenu/BurguerMenu"
import "../../styles/components/_nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <BurguerMenu  pageWrapId={"page-wrap"} outerContainerId={"App"} width="100%"/>
      <div>Logo</div>
      <div>AVATAR</div>
    </nav>
  )
};

export default Nav; 